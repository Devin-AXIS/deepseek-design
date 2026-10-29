import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  SKILL_SLUG
} from "./chunk-HVW7ABXD.js";
import {
  flushSync,
  trackEvent
} from "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import "./chunk-USDEMXXL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/events.ts
var ALLOWED_EVENTS = ["skill_invoked", "skill_completed"];
var ALLOWED_OUTCOMES = ["success", "error", "abort"];
var events_default = defineCommand({
  meta: {
    name: "events",
    description: "Emit an anonymous skill-usage telemetry event (skills report their own invocation/outcome). Honors DO_NOT_TRACK / telemetry opt-out."
  },
  args: {
    skill: {
      type: "string",
      description: "Authoring skill slug, e.g. product-launch-video"
    },
    event: {
      type: "string",
      description: "Event name: skill_invoked | skill_completed (default: skill_invoked)",
      default: "skill_invoked"
    },
    outcome: {
      type: "string",
      description: "Optional outcome for completion events: success | error | abort"
    }
  },
  async run({ args }) {
    try {
      const skill = typeof args.skill === "string" ? args.skill.trim() : "";
      if (!SKILL_SLUG.test(skill)) return;
      const event = ALLOWED_EVENTS.includes(args.event) ? args.event : "skill_invoked";
      const props = { authoring_skill: skill };
      if (args.outcome && ALLOWED_OUTCOMES.includes(args.outcome)) {
        props["outcome"] = args.outcome;
      }
      trackEvent(event, props);
      flushSync();
    } catch {
    }
  }
});
export {
  events_default as default
};
