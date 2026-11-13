// Visual component data parser, derived from the existing Stage component protocol.
// Kept locally so installed plugins do not depend on the Stage application.
function parseComponentTextList(value, separators) {
  if (value.trimStart().startsWith("[")) {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed) || !parsed.every((s) => typeof s === "string")) {
      throw Error("List must be a JSON array of texts");
    }
    return parsed;
  }
  return Array.from(value, (ch) => separators.includes(ch) ? `
` : ch).join("").split(`
`).map((s) => s.trim()).filter(Boolean);
}

function readObjectValue(value, key) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return;
  return Reflect.get(value, key);
}
function findColumn(contract, roles, fallbackIndex) {
  return contract.columns.find((column) => roles.includes(column.role)) ?? contract.columns[fallbackIndex];
}
function parseCell(raw, column) {
  if (column.type === "number") {
    if (typeof raw !== "number" && typeof raw !== "string")
      return;
    if (typeof raw === "string" && raw.trim() === "")
      return;
    const numberValue = typeof raw === "number" ? raw : Number(raw);
    return Number.isFinite(numberValue) ? numberValue : undefined;
  }
  return typeof raw === "string" ? raw.trim() : undefined;
}
function normalizeRows(rawRows, contract) {
  const rows = [];
  const issues = [];
  for (const [rowIndex, rawRow] of rawRows.entries()) {
    const row = {};
    for (const column of contract.columns) {
      const raw = readObjectValue(rawRow, column.id);
      const cell = parseCell(raw, column);
      if (cell === undefined || cell === "") {
        if (column.required) {
          issues.push({
            path: `rows.${rowIndex}.${column.id}`,
            message: `${column.label} is required`
          });
        } else if (cell === undefined && raw !== undefined && !(typeof raw === "string" && raw.trim() === "")) {
          issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} must be a valid ${column.type}` });
        }
        continue;
      }
      row[column.id] = cell;
      if (typeof cell === "number" && (column.min !== undefined && cell < column.min || column.max !== undefined && cell > column.max)) {
        issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} must be within ${column.min ?? "−∞"}–${column.max ?? "∞"}` });
      }
      if (typeof cell === "number" && column.integer && !Number.isInteger(cell)) {
        issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} must be an integer` });
      }
      if (typeof cell === "string") {
        if (column.maxLength !== undefined && Array.from(cell).length > column.maxLength) {
          issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} allows at most ${column.maxLength} characters` });
        }
        if (column.list) {
          const limit = column.list;
          let list = [];
          try {
            list = parseComponentTextList(cell, limit.separators);
          } catch {
            issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} must be a list of texts` });
          }
          if (list.length > limit.maxItems || list.some((item) => Array.from(item).length > limit.itemMaxLength || !item.trim())) {
            issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} allows at most ${limit.maxItems} items and ${limit.itemMaxLength} characters per item` });
          }
        }
      }
      if (column.options && !column.options.some((option) => option.value === cell)) {
        issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} is not an available option` });
      }
    }
    const hiddenRowId = readObjectValue(rawRow, contract.rowId);
    if (row[contract.rowId] === undefined && (typeof hiddenRowId === "string" || typeof hiddenRowId === "number")) {
      row[contract.rowId] = hiddenRowId;
    }
    rows.push(row);
  }
  const minRows = contract.minRows ?? 0;
  if (rows.length < minRows) {
    issues.push({ path: "rows", message: `At least ${minRows} rows are required` });
  }
  if (contract.maxRows !== undefined && rows.length > contract.maxRows) {
    issues.push({ path: "rows", message: `At most ${contract.maxRows} rows are allowed` });
  }
  const seenIds = new Set;
  for (const [rowIndex, row] of rows.entries()) {
    const rowId = row[contract.rowId];
    if (rowId === undefined)
      continue;
    if (seenIds.has(rowId)) {
      issues.push({ path: `rows.${rowIndex}.${contract.rowId}`, message: "Row id must be unique" });
    }
    seenIds.add(rowId);
  }
  return { document: { version: 1, kind: contract.kind, rows }, issues };
}
function parseJsonRows(value, contract) {
  try {
    const parsed = JSON.parse(value);
    const version = readObjectValue(parsed, "version");
    const kind = readObjectValue(parsed, "kind");
    const rows = readObjectValue(parsed, "rows");
    if (version !== 1 || kind !== contract.kind || !Array.isArray(rows)) {
      return {
        document: { version: 1, kind: contract.kind, rows: [] },
        issues: [{ path: "data", message: "Data document does not match this component contract" }]
      };
    }
    return normalizeRows(rows, contract);
  } catch {
    return {
      document: { version: 1, kind: contract.kind, rows: [] },
      issues: [{ path: "data", message: "Data document is not valid JSON" }]
    };
  }
}
function parseKeyValueRows(value, contract) {
  const keyColumn = findColumn(contract, ["id", "label"], 0);
  const valueColumn = findColumn(contract, ["value"], 1);
  if (!keyColumn || !valueColumn) {
    return {
      document: { version: 1, kind: contract.kind, rows: [] },
      issues: [{ path: "columns", message: "Key-value data needs two columns" }]
    };
  }
  const rows = value.split(",").map((entry) => {
    const separator = entry.lastIndexOf(":");
    return {
      [keyColumn.id]: entry.slice(0, separator).trim(),
      [valueColumn.id]: separator >= 0 ? entry.slice(separator + 1).trim() : ""
    };
  }).filter((row) => row[keyColumn.id] !== "");
  return normalizeRows(rows, contract);
}
function parseRouteRows(value, contract) {
  const sourceColumn = findColumn(contract, ["source"], 0);
  const targetColumn = findColumn(contract, ["target"], 1);
  const valueColumn = findColumn(contract, ["value"], 2);
  if (!sourceColumn || !targetColumn || !valueColumn) {
    return {
      document: { version: 1, kind: contract.kind, rows: [] },
      issues: [{ path: "columns", message: "Route data needs source, target, and value columns" }]
    };
  }
  const rows = value.split(",").map((entry) => {
    const valueSeparator = entry.lastIndexOf(":");
    const route = entry.slice(0, valueSeparator).split(">");
    return {
      [sourceColumn.id]: (route[0] ?? "").trim(),
      [targetColumn.id]: (route[1] ?? "").trim(),
      [valueColumn.id]: valueSeparator >= 0 ? entry.slice(valueSeparator + 1).trim() : "",
      [contract.rowId]: `${(route[0] ?? "").trim()}>${(route[1] ?? "").trim()}`
    };
  }).filter((row) => row[sourceColumn.id] !== "" || row[targetColumn.id] !== "");
  return normalizeRows(rows, contract);
}
function parseLabelDetailRows(value, contract) {
  const labelColumn = findColumn(contract, ["id", "label"], 0);
  const detailColumn = findColumn(contract, ["value"], 1);
  if (!labelColumn || !detailColumn) {
    return {
      document: { version: 1, kind: contract.kind, rows: [] },
      issues: [{ path: "columns", message: "Label-detail data needs two columns" }]
    };
  }
  const rows = value.split("|").map((entry) => {
    const separator = entry.indexOf("::");
    return {
      [labelColumn.id]: (separator >= 0 ? entry.slice(0, separator) : entry).trim(),
      [detailColumn.id]: (separator >= 0 ? entry.slice(separator + 2) : "").trim()
    };
  }).filter((row) => row[labelColumn.id] !== "");
  return normalizeRows(rows, contract);
}
function parseVisualComponentData(contract, value) {
  if (contract.binding.encoding === "json")
    return parseJsonRows(value, contract);
  if (contract.binding.encoding === "route-value-list")
    return parseRouteRows(value, contract);
  if (contract.binding.encoding === "label-detail-list")
    return parseLabelDetailRows(value, contract);
  return parseKeyValueRows(value, contract);
}
function serializeVisualComponentData(contract, document) {
  if (contract.binding.encoding === "json")
    return JSON.stringify(document);
  if (contract.binding.encoding === "route-value-list") {
    const sourceColumn = findColumn(contract, ["source"], 0);
    const targetColumn = findColumn(contract, ["target"], 1);
    const valueColumn2 = findColumn(contract, ["value"], 2);
    if (!sourceColumn || !targetColumn || !valueColumn2)
      return "";
    return document.rows.map((row) => `${row[sourceColumn.id] ?? ""}>${row[targetColumn.id] ?? ""}:${row[valueColumn2.id] ?? ""}`).join(",");
  }
  if (contract.binding.encoding === "label-detail-list") {
    const labelColumn = findColumn(contract, ["id", "label"], 0);
    const detailColumn = findColumn(contract, ["value"], 1);
    if (!labelColumn || !detailColumn)
      return "";
    return document.rows.map((row) => `${row[labelColumn.id] ?? ""}::${row[detailColumn.id] ?? ""}`).join("|");
  }
  const keyColumn = findColumn(contract, ["id", "label"], 0);
  const valueColumn = findColumn(contract, ["value"], 1);
  if (!keyColumn || !valueColumn)
    return "";
  return document.rows.map((row) => `${row[keyColumn.id] ?? ""}:${row[valueColumn.id] ?? ""}`).join(",");
}
function createVisualComponentDataRow(contract) {
  const row = {};
  for (const column of contract.columns)
    row[column.id] = column.options?.[0]?.value ?? (column.type === "number" ? 0 : "");
  return row;
}
function formatVisualComponentDataForAi(contract, value) {
  const parsed = parseVisualComponentData(contract, value);
  return JSON.stringify({
    contractVersion: 1,
    kind: contract.kind,
    mode: contract.mode,
    rowId: contract.rowId,
    columns: contract.columns,
    minRows: contract.minRows,
    maxRows: contract.maxRows,
    valueFormat: contract.valueFormat,
    allowedOperations: [
      "set",
      "upsertRows",
      "removeRows",
      ...contract.highlightVariable ? ["setHighlight"] : []
    ],
    data: parsed.document,
    validation: { valid: parsed.issues.length === 0, issues: parsed.issues }
  }, null, 2);
}
export {
  serializeVisualComponentData,
  parseVisualComponentData,
  formatVisualComponentDataForAi,
  createVisualComponentDataRow
};
