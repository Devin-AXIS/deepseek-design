/** Local visual markup for the current preview; never changes the source document. */
import * as React from "react";
import {
  ImagePlus,
  Pencil,
  Redo2,
  Scan,
  Undo2,
  X,
} from "lucide-react";
import { DesignAiPrompt } from "./design-ai-prompt.tsx";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { t } from "@/i18n";
import styles from "./design-markup.module.css";

type Point = { x: number; y: number };
type Mark =
  | { id: number; kind: "rect"; start: Point; end: Point }
  | { id: number; kind: "pen"; points: Point[] }
  | { id: number; kind: "image"; start: Point; end: Point; source: string };
type Gesture =
  | { kind: "draw"; pointerId: number; mark: Mark }
  | { kind: "move"; pointerId: number; start: Point; mark: Mark }
  | { kind: "resize"; pointerId: number; anchor: Point; mark: Mark };
type History = { entries: Mark[][]; index: number };

function bounds(mark: Mark) {
  const points = mark.kind === "pen" ? mark.points : [mark.start, mark.end];
  const xs = points.map((point) => point.x),
    ys = points.map((point) => point.y);
  return {
    x: Math.min(...xs),
    y: Math.min(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  };
}

function moved(mark: Mark, dx: number, dy: number): Mark {
  const offset = (point: Point) => ({ x: point.x + dx, y: point.y + dy });
  return mark.kind === "pen"
    ? { ...mark, points: mark.points.map(offset) }
    : { ...mark, start: offset(mark.start), end: offset(mark.end) };
}

function Tool({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={styles.tool}
            style={{ color: "inherit" }}
            aria-label={label}
            aria-pressed={active}
            disabled={disabled}
            onClick={onClick}
          >
            {children}
          </Button>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

/** Preserve markup while hidden; the parent remounts this component when the preview changes. */
export function DesignMarkup({
  open,
  onClose,
  capturePreview,
  onSend,
}: {
  open: boolean;
  onClose: () => void;
  capturePreview: () => Promise<HTMLCanvasElement>;
  onSend?: (instruction: string, image: File) => Promise<void>;
}) {
  const [tool, setTool] = React.useState<"rect" | "pen">("rect");
  const [history, setHistory] = React.useState<History>({
    entries: [[]],
    index: 0,
  });
  const [gesture, setGesture] = React.useState<Gesture | null>(null);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");
  const [instruction, setInstruction] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const sendingRef = React.useRef(false);
  const input = React.useRef<HTMLInputElement>(null);
  const surface = React.useRef<SVGSVGElement>(null);
  const nextId = React.useRef(0);
  const importGeneration = React.useRef(0);
  const marks = history.entries[history.index];
  const commit = (next: Mark[]) =>
    setHistory((current) => ({
      entries: [...current.entries.slice(0, current.index + 1), next],
      index: current.index + 1,
    }));
  React.useEffect(
    () => () => {
      importGeneration.current++;
    },
    [],
  );
  React.useEffect(() => {
    if (!open) {
      setGesture(null);
      importGeneration.current++;
    }
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const keydown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        (event.target.isContentEditable ||
          /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))
      )
        return;
      if (event.key === "Escape" && !sendingRef.current) {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        selected !== null
      ) {
        event.preventDefault();
        setHistory((current) => ({
          entries: [
            ...current.entries.slice(0, current.index + 1),
            current.entries[current.index].filter(
              (mark) => mark.id !== selected,
            ),
          ],
          index: current.index + 1,
        }));
        setSelected(null);
      }
    };
    window.addEventListener("keydown", keydown, true);
    return () => window.removeEventListener("keydown", keydown, true);
  }, [onClose, open, selected]);
  const position = (event: React.PointerEvent): Point => {
    const box = surface.current!.getBoundingClientRect();
    return {
      x: Math.max(
        0,
        Math.min(1000, ((event.clientX - box.left) / box.width) * 1000),
      ),
      y: Math.max(
        0,
        Math.min(1000, ((event.clientY - box.top) / box.height) * 1000),
      ),
    };
  };
  const updateGesture = (current: Gesture, point: Point): Mark => {
    if (current.kind === "move")
      return moved(
        current.mark,
        point.x - current.start.x,
        point.y - current.start.y,
      );
    if (current.kind === "resize" && current.mark.kind !== "pen")
      return { ...current.mark, start: current.anchor, end: point };
    return current.mark.kind === "pen"
      ? { ...current.mark, points: [...current.mark.points, point] }
      : { ...current.mark, end: point };
  };
  const start = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.button !== 0 || sendingRef.current) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = position(event);
    const target = event.target instanceof Element ? event.target : null;
    const found = marks.find(
      (mark) => String(mark.id) === target?.getAttribute("data-mark"),
    );
    const corner = target?.getAttribute("data-corner");
    if (found && corner && found.kind !== "pen") {
      const box = bounds(found),
        anchor = {
          x: box.x + (corner.includes("w") ? box.width : 0),
          y: box.y + (corner.includes("n") ? box.height : 0),
        };
      setGesture({
        kind: "resize",
        pointerId: event.pointerId,
        anchor,
        mark: found,
      });
    } else if (found && tool === "rect") {
      setSelected(found.id);
      setGesture({
        kind: "move",
        pointerId: event.pointerId,
        start: point,
        mark: found,
      });
    } else {
      const id = ++nextId.current;
      setSelected(id);
      setGesture({
        kind: "draw",
        pointerId: event.pointerId,
        mark:
          tool === "rect"
            ? { id, kind: "rect", start: point, end: point }
            : { id, kind: "pen", points: [point] },
      });
    }
  };
  const finish = (
    event: React.PointerEvent<SVGSVGElement>,
    cancelled = false,
  ) => {
    if (!gesture || event.pointerId !== gesture.pointerId) return;
    if (!cancelled) {
      const mark = updateGesture(gesture, position(event));
      const box = bounds(mark);
      if (box.width > 2 || box.height > 2)
        commit(
          gesture.kind === "draw"
            ? [...marks, mark]
            : marks.map((item) => (item.id === mark.id ? mark : item)),
        );
    }
    setGesture(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const addImage = async (file?: File) => {
    if (!file) return;
    const generation = ++importGeneration.current;
    setError("");
    try {
      if (!file.type.startsWith("image/") || file.size > 20 * 1024 * 1024)
        throw new Error(t("design.markup.image_error"));
      const reader = new FileReader();
      const source = await new Promise<string>((resolve, reject) => {
        reader.onload = () =>
          typeof reader.result === "string"
            ? resolve(reader.result)
            : reject(new Error(t("design.markup.image_error")));
        reader.onerror = () =>
          reject(new Error(t("design.markup.image_error")));
        reader.readAsDataURL(file);
      });
      const bitmap = await createImageBitmap(file);
      const box = surface.current?.getBoundingClientRect();
      const width = 360,
        height = box
          ? Math.min(
              700,
              (((width * box.width) / box.height) * bitmap.height) /
                bitmap.width,
            )
          : 360;
      bitmap.close();
      if (generation !== importGeneration.current) return;
      const id = ++nextId.current;
      const mark: Mark = {
        id,
        kind: "image",
        source,
        start: { x: 500 - width / 2, y: 500 - height / 2 },
        end: { x: 500 + width / 2, y: 500 + height / 2 },
      };
      setHistory((current) => ({
        entries: [
          ...current.entries.slice(0, current.index + 1),
          [...current.entries[current.index], mark],
        ],
        index: current.index + 1,
      }));
      setSelected(id);
      setTool("rect");
    } catch {
      if (generation === importGeneration.current)
        setError(t("design.markup.image_error"));
    }
  };
  const send = async () => {
    if (!onSend || !instruction.trim() || sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    setError("");
    try {
      const canvas = await capturePreview();
      const context = canvas.getContext("2d");
      if (!context) throw new Error(t("design.markup.send_error"));
      const box = surface.current!.getBoundingClientRect();
      for (const mark of marks) {
        const rect = bounds(mark);
        const x = (rect.x / 1000) * canvas.width,
          y = (rect.y / 1000) * canvas.height;
        const width = (rect.width / 1000) * canvas.width,
          height = (rect.height / 1000) * canvas.height;
        context.strokeStyle = "#e65054";
        context.lineWidth = (2.5 * canvas.width) / box.width;
        context.lineCap = "round";
        context.lineJoin = "round";
        if (mark.kind === "rect") {
          context.fillStyle = "rgba(230,80,84,0.06)";
          context.fillRect(x, y, width, height);
          context.strokeRect(x, y, width, height);
        } else if (mark.kind === "pen") {
          context.beginPath();
          mark.points.forEach((point, index) => {
            const px = (point.x / 1000) * canvas.width,
              py = (point.y / 1000) * canvas.height;
            if (index === 0) context.moveTo(px, py);
            else context.lineTo(px, py);
          });
          context.stroke();
        } else {
          const bitmap = await createImageBitmap(
            await (await fetch(mark.source)).blob(),
          );
          const scale = Math.min(width / bitmap.width, height / bitmap.height);
          context.drawImage(
            bitmap,
            x + (width - bitmap.width * scale) / 2,
            y + (height - bitmap.height * scale) / 2,
            bitmap.width * scale,
            bitmap.height * scale,
          );
          bitmap.close();
        }
      }
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (value) =>
            value
              ? resolve(value)
              : reject(new Error(t("design.markup.send_error"))),
          "image/png",
        ),
      );
      await onSend(
        instruction.trim(),
        new File([blob], "design-markup.png", { type: "image/png" }),
      );
      setInstruction("");
      setHistory({ entries: [[]], index: 0 });
      setSelected(null);
      onClose();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : t("design.markup.send_error"),
      );
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };
  const visibleMarks = gesture
    ? gesture.kind === "draw"
      ? [...marks, gesture.mark]
      : marks.map((mark) => (mark.id === gesture.mark.id ? gesture.mark : mark))
    : marks;
  return (
    <div
      className={styles.overlay}
      hidden={!open}
      data-testid="design-markup"
      role="region"
      aria-label={t("design.markup.label")}
    >
      <svg
        ref={surface}
        className={styles.surface}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-label={t("design.markup.canvas")}
        onPointerDown={start}
        onPointerMove={(event) => {
          if (gesture && gesture.pointerId === event.pointerId)
            setGesture({
              ...gesture,
              mark: updateGesture(gesture, position(event)),
              ...(gesture.kind === "move" ? { start: position(event) } : {}),
            });
        }}
        onPointerUp={(event) => finish(event)}
        onPointerCancel={(event) => finish(event, true)}
      >
        {visibleMarks.map((mark) => {
          const box = bounds(mark),
            props = {
              "data-mark": mark.id,
              stroke: "#e65054",
              strokeWidth: 2.5,
              vectorEffect: "non-scaling-stroke" as const,
            };
          return (
            <g key={mark.id}>
              {mark.kind === "rect" ? (
                <rect {...props} {...box} fill="rgba(230,80,84,0.06)" />
              ) : mark.kind === "pen" ? (
                <polyline
                  {...props}
                  points={mark.points
                    .map((point) => `${point.x},${point.y}`)
                    .join(" ")}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <image
                  data-mark={mark.id}
                  href={mark.source}
                  {...box}
                  preserveAspectRatio="xMidYMid meet"
                />
              )}
              {selected === mark.id &&
              tool === "rect" &&
              mark.kind !== "pen" ? (
                <>
                  <rect
                    {...box}
                    fill="none"
                    stroke="var(--foreground)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                  />
                  {(["nw", "ne", "sw", "se"] as const).map((corner) => (
                    <rect
                      key={corner}
                      data-mark={mark.id}
                      data-corner={corner}
                      x={box.x + (corner.includes("e") ? box.width : 0) - 4}
                      y={box.y + (corner.includes("s") ? box.height : 0) - 4}
                      width="8"
                      height="8"
                      fill="var(--background)"
                      stroke="var(--foreground)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      style={{ cursor: `${corner}-resize` }}
                    />
                  ))}
                </>
              ) : null}
            </g>
          );
        })}
      </svg>
      <fieldset
        disabled={sending}
        className={styles.bar}
        role="toolbar"
        aria-label={t("design.markup.tools")}
      >
        <Tool
          label={t("design.markup.rectangle")}
          active={tool === "rect"}
          onClick={() => setTool("rect")}
        >
          <Scan />
        </Tool>
        <Tool
          label={t("design.markup.pen")}
          active={tool === "pen"}
          onClick={() => {
            setTool("pen");
            setSelected(null);
          }}
        >
          <Pencil />
        </Tool>
        <span className={styles.divider} />
        <Tool
          label={t("design.markup.undo")}
          disabled={history.index === 0}
          onClick={() => {
            setHistory((current) => ({ ...current, index: current.index - 1 }));
            setSelected(null);
          }}
        >
          <Undo2 />
        </Tool>
        <Tool
          label={t("design.markup.redo")}
          disabled={history.index === history.entries.length - 1}
          onClick={() => {
            setHistory((current) => ({ ...current, index: current.index + 1 }));
            setSelected(null);
          }}
        >
          <Redo2 />
        </Tool>
        <span className={styles.divider} />
        <Tool
          label={t("design.markup.add_image")}
          onClick={() => input.current?.click()}
        >
          <ImagePlus />
        </Tool>
        <span className={styles.contextChip}>{t("design.markup.context")}</span>
        <DesignAiPrompt value={instruction} onChange={setInstruction} onSubmit={()=>void send()} pending={sending} disabled={!onSend}/>
        <Tool
          label={t("design.markup.close")}
          disabled={sending}
          onClick={onClose}
        >
          <X />
        </Tool>
        <input
          ref={input}
          type="file"
          accept="image/*"
          hidden
          aria-label={t("design.markup.add_image")}
          onChange={(event) => {
            void addImage(event.currentTarget.files?.[0]);
            event.currentTarget.value = "";
          }}
        />
      </fieldset>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
