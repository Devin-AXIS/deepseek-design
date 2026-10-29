import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  __commonJS,
  __require
} from "./chunk-M2WBOQ2Q.js";

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/unesc.js
var require_unesc = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/unesc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = unesc;
    function gobbleHex(str) {
      var lower = str.toLowerCase();
      var hex = "";
      var spaceTerminated = false;
      for (var i = 0; i < 6 && lower[i] !== void 0; i++) {
        var code = lower.charCodeAt(i);
        var valid = code >= 97 && code <= 102 || code >= 48 && code <= 57;
        spaceTerminated = code === 32;
        if (!valid) {
          break;
        }
        hex += lower[i];
      }
      if (hex.length === 0) {
        return void 0;
      }
      var codePoint = parseInt(hex, 16);
      var isSurrogate = codePoint >= 55296 && codePoint <= 57343;
      if (isSurrogate || codePoint === 0 || codePoint > 1114111) {
        return ["\uFFFD", hex.length + (spaceTerminated ? 1 : 0)];
      }
      return [String.fromCodePoint(codePoint), hex.length + (spaceTerminated ? 1 : 0)];
    }
    var CONTAINS_ESCAPE = /\\/;
    function unesc(str) {
      var needToProcess = CONTAINS_ESCAPE.test(str);
      if (!needToProcess) {
        return str;
      }
      var ret = "";
      for (var i = 0; i < str.length; i++) {
        if (str[i] === "\\") {
          var gobbled = gobbleHex(str.slice(i + 1, i + 7));
          if (gobbled !== void 0) {
            ret += gobbled[0];
            i += gobbled[1];
            continue;
          }
          if (str[i + 1] === "\\") {
            ret += "\\";
            i++;
            continue;
          }
          if (str.length === i + 1) {
            ret += str[i];
          }
          continue;
        }
        ret += str[i];
      }
      return ret;
    }
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/getProp.js
var require_getProp = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/getProp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = getProp;
    function getProp(obj) {
      var props = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        props[_i - 1] = arguments[_i];
      }
      while (props.length > 0) {
        var prop = props.shift();
        if (!obj[prop]) {
          return void 0;
        }
        obj = obj[prop];
      }
      return obj;
    }
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/ensureObject.js
var require_ensureObject = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/ensureObject.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ensureObject;
    function ensureObject(obj) {
      var props = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        props[_i - 1] = arguments[_i];
      }
      while (props.length > 0) {
        var prop = props.shift();
        if (!obj[prop]) {
          obj[prop] = {};
        }
        obj = obj[prop];
      }
    }
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/stripComments.js
var require_stripComments = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/stripComments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = stripComments;
    function stripComments(str) {
      var s = "";
      var commentStart = str.indexOf("/*");
      var lastEnd = 0;
      while (commentStart >= 0) {
        s = s + str.slice(lastEnd, commentStart);
        var commentEnd = str.indexOf("*/", commentStart + 2);
        if (commentEnd < 0) {
          return s;
        }
        lastEnd = commentEnd + 2;
        commentStart = str.indexOf("/*", lastEnd);
      }
      s = s + str.slice(lastEnd);
      return s;
    }
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/maxNestingDepth.js
var require_maxNestingDepth = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/maxNestingDepth.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MAX_NESTING_DEPTH = void 0;
    exports.default = resolveMaxNestingDepth;
    exports.MAX_NESTING_DEPTH = 256;
    function resolveMaxNestingDepth(value) {
      return Number.isSafeInteger(value) && value >= 0 ? value : exports.MAX_NESTING_DEPTH;
    }
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/index.js
var require_util = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/util/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MAX_NESTING_DEPTH = exports.resolveMaxNestingDepth = exports.stripComments = exports.ensureObject = exports.getProp = exports.unesc = void 0;
    var unesc_1 = require_unesc();
    Object.defineProperty(exports, "unesc", { enumerable: true, get: function() {
      return __importDefault(unesc_1).default;
    } });
    var getProp_1 = require_getProp();
    Object.defineProperty(exports, "getProp", { enumerable: true, get: function() {
      return __importDefault(getProp_1).default;
    } });
    var ensureObject_1 = require_ensureObject();
    Object.defineProperty(exports, "ensureObject", { enumerable: true, get: function() {
      return __importDefault(ensureObject_1).default;
    } });
    var stripComments_1 = require_stripComments();
    Object.defineProperty(exports, "stripComments", { enumerable: true, get: function() {
      return __importDefault(stripComments_1).default;
    } });
    var maxNestingDepth_1 = require_maxNestingDepth();
    Object.defineProperty(exports, "resolveMaxNestingDepth", { enumerable: true, get: function() {
      return __importDefault(maxNestingDepth_1).default;
    } });
    Object.defineProperty(exports, "MAX_NESTING_DEPTH", { enumerable: true, get: function() {
      return maxNestingDepth_1.MAX_NESTING_DEPTH;
    } });
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/node.js
var require_node = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var cloneNode = function(obj, parent, depth) {
      if (depth === void 0) {
        depth = 0;
      }
      if (depth > util_1.MAX_NESTING_DEPTH) {
        throw new Error("Cannot clone selector: nesting depth exceeds the maximum of ".concat(util_1.MAX_NESTING_DEPTH, "."));
      }
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }
      var cloned = new obj.constructor();
      for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
          continue;
        }
        var value = obj[i];
        var type = typeof value;
        if (i === "parent" && type === "object") {
          if (parent) {
            cloned[i] = parent;
          }
        } else if (value instanceof Array) {
          cloned[i] = value.map(function(j) {
            return cloneNode(j, cloned, depth + 1);
          });
        } else {
          cloned[i] = cloneNode(value, cloned, depth + 1);
        }
      }
      return cloned;
    };
    var Node = (
      /** @class */
      (function() {
        function Node2(opts) {
          if (opts === void 0) {
            opts = {};
          }
          Object.assign(this, opts);
          this.spaces = this.spaces || {};
          this.spaces.before = this.spaces.before || "";
          this.spaces.after = this.spaces.after || "";
        }
        Node2.prototype.remove = function() {
          if (this.parent) {
            this.parent.removeChild(this);
          }
          this.parent = void 0;
          return this;
        };
        Node2.prototype.replaceWith = function() {
          if (this.parent) {
            for (var index in arguments) {
              this.parent.insertBefore(this, arguments[index]);
            }
            this.remove();
          }
          return this;
        };
        Node2.prototype.next = function() {
          return this.parent.at(this.parent.index(this) + 1);
        };
        Node2.prototype.prev = function() {
          return this.parent.at(this.parent.index(this) - 1);
        };
        Node2.prototype.clone = function(overrides) {
          if (overrides === void 0) {
            overrides = {};
          }
          var cloned = cloneNode(this);
          for (var name in overrides) {
            cloned[name] = overrides[name];
          }
          return cloned;
        };
        Node2.prototype.appendToPropertyAndEscape = function(name, value, valueEscaped) {
          if (!this.raws) {
            this.raws = {};
          }
          var originalValue = this[name];
          var originalEscaped = this.raws[name];
          this[name] = originalValue + value;
          if (originalEscaped || valueEscaped !== value) {
            this.raws[name] = (originalEscaped || originalValue) + valueEscaped;
          } else {
            delete this.raws[name];
          }
        };
        Node2.prototype.setPropertyAndEscape = function(name, value, valueEscaped) {
          if (!this.raws) {
            this.raws = {};
          }
          this[name] = value;
          this.raws[name] = valueEscaped;
        };
        Node2.prototype.setPropertyWithoutEscape = function(name, value) {
          this[name] = value;
          if (this.raws) {
            delete this.raws[name];
          }
        };
        Node2.prototype.isAtPosition = function(line, column) {
          if (this.source && this.source.start && this.source.end) {
            if (this.source.start.line > line) {
              return false;
            }
            if (this.source.end.line < line) {
              return false;
            }
            if (this.source.start.line === line && this.source.start.column > column) {
              return false;
            }
            if (this.source.end.line === line && this.source.end.column < column) {
              return false;
            }
            return true;
          }
          return void 0;
        };
        Node2.prototype.stringifyProperty = function(name) {
          return this.raws && this.raws[name] || this[name];
        };
        Object.defineProperty(Node2.prototype, "rawSpaceBefore", {
          get: function() {
            var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.before;
            if (rawSpace === void 0) {
              rawSpace = this.spaces && this.spaces.before;
            }
            return rawSpace || "";
          },
          set: function(raw) {
            (0, util_1.ensureObject)(this, "raws", "spaces");
            this.raws.spaces.before = raw;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Node2.prototype, "rawSpaceAfter", {
          get: function() {
            var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.after;
            if (rawSpace === void 0) {
              rawSpace = this.spaces.after;
            }
            return rawSpace || "";
          },
          set: function(raw) {
            (0, util_1.ensureObject)(this, "raws", "spaces");
            this.raws.spaces.after = raw;
          },
          enumerable: false,
          configurable: true
        });
        Node2.prototype.valueToString = function() {
          return String(this.stringifyProperty("value"));
        };
        Node2.prototype.toString = function() {
          return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
        };
        Node2.prototype._stringify = function() {
          return this.toString();
        };
        return Node2;
      })()
    );
    exports.default = Node;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/types.js
var require_types = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UNIVERSAL = exports.ATTRIBUTE = exports.CLASS = exports.COMBINATOR = exports.COMMENT = exports.ID = exports.NESTING = exports.PSEUDO = exports.ROOT = exports.SELECTOR = exports.STRING = exports.TAG = void 0;
    exports.TAG = "tag";
    exports.STRING = "string";
    exports.SELECTOR = "selector";
    exports.ROOT = "root";
    exports.PSEUDO = "pseudo";
    exports.NESTING = "nesting";
    exports.ID = "id";
    exports.COMMENT = "comment";
    exports.COMBINATOR = "combinator";
    exports.CLASS = "class";
    exports.ATTRIBUTE = "attribute";
    exports.UNIVERSAL = "universal";
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/container.js
var require_container = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/container.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __values = exports && exports.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var node_1 = __importDefault(require_node());
    var types = __importStar(require_types());
    var Container = (
      /** @class */
      (function(_super) {
        __extends(Container2, _super);
        function Container2(opts) {
          var _this = _super.call(this, opts) || this;
          if (!_this.nodes) {
            _this.nodes = [];
          }
          return _this;
        }
        Container2.prototype.append = function(selector) {
          selector.parent = this;
          this.nodes.push(selector);
          return this;
        };
        Container2.prototype.prepend = function(selector) {
          selector.parent = this;
          this.nodes.unshift(selector);
          for (var id in this.indexes) {
            this.indexes[id]++;
          }
          return this;
        };
        Container2.prototype.at = function(index) {
          return this.nodes[index];
        };
        Container2.prototype.index = function(child) {
          if (typeof child === "number") {
            return child;
          }
          return this.nodes.indexOf(child);
        };
        Object.defineProperty(Container2.prototype, "first", {
          get: function() {
            return this.at(0);
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Container2.prototype, "last", {
          get: function() {
            return this.at(this.length - 1);
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Container2.prototype, "length", {
          get: function() {
            return this.nodes.length;
          },
          enumerable: false,
          configurable: true
        });
        Container2.prototype.removeChild = function(child) {
          child = this.index(child);
          this.at(child).parent = void 0;
          this.nodes.splice(child, 1);
          var index;
          for (var id in this.indexes) {
            index = this.indexes[id];
            if (index >= child) {
              this.indexes[id] = index - 1;
            }
          }
          return this;
        };
        Container2.prototype.removeAll = function() {
          var e_1, _a;
          try {
            for (var _b = __values(this.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
              var node = _c.value;
              node.parent = void 0;
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          this.nodes = [];
          return this;
        };
        Container2.prototype.empty = function() {
          return this.removeAll();
        };
        Container2.prototype.insertAfter = function(oldNode, newNode) {
          var _a;
          newNode.parent = this;
          var oldIndex = this.index(oldNode);
          var resetNode = [];
          for (var i = 2; i < arguments.length; i++) {
            resetNode.push(arguments[i]);
          }
          (_a = this.nodes).splice.apply(_a, __spreadArray([oldIndex + 1, 0, newNode], __read(resetNode), false));
          newNode.parent = this;
          var index;
          for (var id in this.indexes) {
            index = this.indexes[id];
            if (oldIndex < index) {
              this.indexes[id] = index + arguments.length - 1;
            }
          }
          return this;
        };
        Container2.prototype.insertBefore = function(oldNode, newNode) {
          var _a;
          newNode.parent = this;
          var oldIndex = this.index(oldNode);
          var resetNode = [];
          for (var i = 2; i < arguments.length; i++) {
            resetNode.push(arguments[i]);
          }
          (_a = this.nodes).splice.apply(_a, __spreadArray([oldIndex, 0, newNode], __read(resetNode), false));
          newNode.parent = this;
          var index;
          for (var id in this.indexes) {
            index = this.indexes[id];
            if (index >= oldIndex) {
              this.indexes[id] = index + arguments.length - 1;
            }
          }
          return this;
        };
        Container2.prototype._findChildAtPosition = function(line, col) {
          var found = void 0;
          this.each(function(node) {
            if (node.atPosition) {
              var foundChild = node.atPosition(line, col);
              if (foundChild) {
                found = foundChild;
                return false;
              }
            } else if (node.isAtPosition(line, col)) {
              found = node;
              return false;
            }
          });
          return found;
        };
        Container2.prototype.atPosition = function(line, col) {
          if (this.isAtPosition(line, col)) {
            return this._findChildAtPosition(line, col) || this;
          } else {
            return void 0;
          }
        };
        Container2.prototype._inferEndPosition = function() {
          if (this.last && this.last.source && this.last.source.end) {
            this.source = this.source || {};
            this.source.end = this.source.end || {};
            Object.assign(this.source.end, this.last.source.end);
          }
        };
        Container2.prototype.each = function(callback) {
          if (!this.lastEach) {
            this.lastEach = 0;
          }
          if (!this.indexes) {
            this.indexes = {};
          }
          this.lastEach++;
          var id = this.lastEach;
          this.indexes[id] = 0;
          if (!this.length) {
            return void 0;
          }
          var index, result;
          while (this.indexes[id] < this.length) {
            index = this.indexes[id];
            result = callback(this.at(index), index);
            if (result === false) {
              break;
            }
            this.indexes[id] += 1;
          }
          delete this.indexes[id];
          if (result === false) {
            return false;
          }
        };
        Container2.prototype.walk = function(callback, depth) {
          if (depth === void 0) {
            depth = 0;
          }
          if (depth > util_1.MAX_NESTING_DEPTH) {
            throw new Error("Cannot walk selector: nesting depth exceeds the maximum of ".concat(util_1.MAX_NESTING_DEPTH, "."));
          }
          return this.each(function(node, i) {
            var result = callback(node, i);
            if (result !== false && node.length) {
              result = node.walk(callback, depth + 1);
            }
            if (result === false) {
              return false;
            }
          });
        };
        Container2.prototype.walkAttributes = function(callback) {
          var _this = this;
          return this.walk(function(selector) {
            if (selector.type === types.ATTRIBUTE) {
              return callback.call(_this, selector);
            }
          });
        };
        Container2.prototype.walkClasses = function(callback) {
          var _this = this;
          return this.walk(function(selector) {
            if (selector.type === types.CLASS) {
              return callback.call(_this, selector);
            }
          });
        };
        Container2.prototype.walkCombinators = function(callback) {
          var _this = this;
          return this.walk(function(selector) {
            if (selector.type === types.COMBINATOR) {
              return callback.call(_this, selector);
            }
          });
        };
        Container2.prototype.walkComments = function(callback) {
          var _this = this;
          return this.walk(function(selector) {
            if (selector.type === types.COMMENT) {
              return callback.call(_this, selector);
            }
          });
        };
        Container2.prototype.walkIds = function(callback) {
          var _this = this;
          return this.walk(function(selector) {
            if (selector.type === types.ID) {
              return callback.call(_this, selector);
            }
          });
        };
        Container2.prototype.walkNesting = function(callback) {
          var _this = this;
          return this.walk(function(selector) {
            if (selector.type === types.NESTING) {
              return callback.call(_this, selector);
            }
          });
        };
        Container2.prototype.walkPseudos = function(callback) {
          var _this = this;
          return this.walk(function(selector) {
            if (selector.type === types.PSEUDO) {
              return callback.call(_this, selector);
            }
          });
        };
        Container2.prototype.walkTags = function(callback) {
          var _this = this;
          return this.walk(function(selector) {
            if (selector.type === types.TAG) {
              return callback.call(_this, selector);
            }
          });
        };
        Container2.prototype.walkUniversals = function(callback) {
          var _this = this;
          return this.walk(function(selector) {
            if (selector.type === types.UNIVERSAL) {
              return callback.call(_this, selector);
            }
          });
        };
        Container2.prototype.split = function(callback) {
          var _this = this;
          var current = [];
          return this.reduce(function(memo, node, index) {
            var split = callback.call(_this, node);
            current.push(node);
            if (split) {
              memo.push(current);
              current = [];
            } else if (index === _this.length - 1) {
              memo.push(current);
            }
            return memo;
          }, []);
        };
        Container2.prototype.map = function(callback) {
          return this.nodes.map(callback);
        };
        Container2.prototype.reduce = function(callback, memo) {
          return this.nodes.reduce(callback, memo);
        };
        Container2.prototype.every = function(callback) {
          return this.nodes.every(callback);
        };
        Container2.prototype.some = function(callback) {
          return this.nodes.some(callback);
        };
        Container2.prototype.filter = function(callback) {
          return this.nodes.filter(callback);
        };
        Container2.prototype.sort = function(callback) {
          return this.nodes.sort(callback);
        };
        Container2.prototype.toString = function(options) {
          if (options === void 0) {
            options = {};
          }
          return this._stringify(options, 0, (0, util_1.resolveMaxNestingDepth)(options.maxNestingDepth));
        };
        Container2.prototype._stringify = function(options, depth, max) {
          var _this = this;
          return this.map(function(child) {
            return _this._stringifyChild(child, options, depth, max);
          }).join("");
        };
        Container2.prototype._stringifyChild = function(child, options, depth, max) {
          return typeof child._stringify === "function" ? child._stringify(options, depth, max) : String(child);
        };
        return Container2;
      })(node_1.default)
    );
    exports.default = Container;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/root.js
var require_root = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/root.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var container_1 = __importDefault(require_container());
    var types_1 = require_types();
    var Root = (
      /** @class */
      (function(_super) {
        __extends(Root2, _super);
        function Root2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.ROOT;
          return _this;
        }
        Root2.prototype._stringify = function(options, depth, max) {
          var _this = this;
          var str = this.reduce(function(memo, selector) {
            memo.push(_this._stringifyChild(selector, options, depth, max));
            return memo;
          }, []).join(",");
          return this.trailingComma ? str + "," : str;
        };
        Root2.prototype.error = function(message, options) {
          if (this._error) {
            return this._error(message, options);
          } else {
            return new Error(message);
          }
        };
        Object.defineProperty(Root2.prototype, "errorGenerator", {
          set: function(handler) {
            this._error = handler;
          },
          enumerable: false,
          configurable: true
        });
        return Root2;
      })(container_1.default)
    );
    exports.default = Root;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/selector.js
var require_selector = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/selector.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var container_1 = __importDefault(require_container());
    var types_1 = require_types();
    var Selector = (
      /** @class */
      (function(_super) {
        __extends(Selector2, _super);
        function Selector2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.SELECTOR;
          return _this;
        }
        return Selector2;
      })(container_1.default)
    );
    exports.default = Selector;
  }
});

// ../../node_modules/.bun/cssesc@3.0.0/node_modules/cssesc/cssesc.js
var require_cssesc = __commonJS({
  "../../node_modules/.bun/cssesc@3.0.0/node_modules/cssesc/cssesc.js"(exports, module) {
    "use strict";
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var merge = function merge2(options, defaults) {
      if (!options) {
        return defaults;
      }
      var result = {};
      for (var key in defaults) {
        result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
      }
      return result;
    };
    var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
    var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
    var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
    var cssesc = function cssesc2(string, options) {
      options = merge(options, cssesc2.options);
      if (options.quotes != "single" && options.quotes != "double") {
        options.quotes = "single";
      }
      var quote = options.quotes == "double" ? '"' : "'";
      var isIdentifier = options.isIdentifier;
      var firstChar = string.charAt(0);
      var output = "";
      var counter = 0;
      var length = string.length;
      while (counter < length) {
        var character = string.charAt(counter++);
        var codePoint = character.charCodeAt();
        var value = void 0;
        if (codePoint < 32 || codePoint > 126) {
          if (codePoint >= 55296 && codePoint <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              codePoint = ((codePoint & 1023) << 10) + (extra & 1023) + 65536;
            } else {
              counter--;
            }
          }
          value = "\\" + codePoint.toString(16).toUpperCase() + " ";
        } else {
          if (options.escapeEverything) {
            if (regexAnySingleEscape.test(character)) {
              value = "\\" + character;
            } else {
              value = "\\" + codePoint.toString(16).toUpperCase() + " ";
            }
          } else if (/[\t\n\f\r\x0B]/.test(character)) {
            value = "\\" + codePoint.toString(16).toUpperCase() + " ";
          } else if (character == "\\" || !isIdentifier && (character == '"' && quote == character || character == "'" && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
            value = "\\" + character;
          } else {
            value = character;
          }
        }
        output += value;
      }
      if (isIdentifier) {
        if (/^-[-\d]/.test(output)) {
          output = "\\-" + output.slice(1);
        } else if (/\d/.test(firstChar)) {
          output = "\\3" + firstChar + " " + output.slice(1);
        }
      }
      output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
        if ($1 && $1.length % 2) {
          return $0;
        }
        return ($1 || "") + $2;
      });
      if (!isIdentifier && options.wrap) {
        return quote + output + quote;
      }
      return output;
    };
    cssesc.options = {
      "escapeEverything": false,
      "isIdentifier": false,
      "quotes": "single",
      "wrap": false
    };
    cssesc.version = "3.0.0";
    module.exports = cssesc;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/className.js
var require_className = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/className.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var cssesc_1 = __importDefault(require_cssesc());
    var util_1 = require_util();
    var node_1 = __importDefault(require_node());
    var types_1 = require_types();
    var ClassName = (
      /** @class */
      (function(_super) {
        __extends(ClassName2, _super);
        function ClassName2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.CLASS;
          _this._constructed = true;
          return _this;
        }
        Object.defineProperty(ClassName2.prototype, "value", {
          get: function() {
            return this._value;
          },
          set: function(v) {
            if (this._constructed) {
              var escaped = (0, cssesc_1.default)(v, { isIdentifier: true });
              if (escaped !== v) {
                (0, util_1.ensureObject)(this, "raws");
                this.raws.value = escaped;
              } else if (this.raws) {
                delete this.raws.value;
              }
            }
            this._value = v;
          },
          enumerable: false,
          configurable: true
        });
        ClassName2.prototype.valueToString = function() {
          return "." + _super.prototype.valueToString.call(this);
        };
        return ClassName2;
      })(node_1.default)
    );
    exports.default = ClassName;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/comment.js
var require_comment = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/comment.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = __importDefault(require_node());
    var types_1 = require_types();
    var Comment = (
      /** @class */
      (function(_super) {
        __extends(Comment2, _super);
        function Comment2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.COMMENT;
          return _this;
        }
        return Comment2;
      })(node_1.default)
    );
    exports.default = Comment;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/id.js
var require_id = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/id.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = __importDefault(require_node());
    var types_1 = require_types();
    var ID = (
      /** @class */
      (function(_super) {
        __extends(ID2, _super);
        function ID2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.ID;
          return _this;
        }
        ID2.prototype.valueToString = function() {
          return "#" + _super.prototype.valueToString.call(this);
        };
        return ID2;
      })(node_1.default)
    );
    exports.default = ID;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/namespace.js
var require_namespace = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/namespace.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var cssesc_1 = __importDefault(require_cssesc());
    var util_1 = require_util();
    var node_1 = __importDefault(require_node());
    var Namespace = (
      /** @class */
      (function(_super) {
        __extends(Namespace2, _super);
        function Namespace2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Namespace2.prototype, "namespace", {
          get: function() {
            return this._namespace;
          },
          set: function(namespace) {
            if (namespace === true || namespace === "*" || namespace === "&") {
              this._namespace = namespace;
              if (this.raws) {
                delete this.raws.namespace;
              }
              return;
            }
            var escaped = (0, cssesc_1.default)(namespace, { isIdentifier: true });
            this._namespace = namespace;
            if (escaped !== namespace) {
              (0, util_1.ensureObject)(this, "raws");
              this.raws.namespace = escaped;
            } else if (this.raws) {
              delete this.raws.namespace;
            }
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Namespace2.prototype, "ns", {
          get: function() {
            return this._namespace;
          },
          set: function(namespace) {
            this.namespace = namespace;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Namespace2.prototype, "namespaceString", {
          get: function() {
            if (this.namespace) {
              var ns = this.stringifyProperty("namespace");
              if (ns === true) {
                return "";
              } else {
                return ns;
              }
            } else {
              return "";
            }
          },
          enumerable: false,
          configurable: true
        });
        Namespace2.prototype.qualifiedName = function(value) {
          if (this.namespace) {
            return "".concat(this.namespaceString, "|").concat(value);
          } else {
            return value;
          }
        };
        Namespace2.prototype.valueToString = function() {
          return this.qualifiedName(_super.prototype.valueToString.call(this));
        };
        return Namespace2;
      })(node_1.default)
    );
    exports.default = Namespace;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/tag.js
var require_tag = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/tag.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var namespace_1 = __importDefault(require_namespace());
    var types_1 = require_types();
    var Tag = (
      /** @class */
      (function(_super) {
        __extends(Tag2, _super);
        function Tag2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.TAG;
          return _this;
        }
        return Tag2;
      })(namespace_1.default)
    );
    exports.default = Tag;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/string.js
var require_string = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/string.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String2(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = __importDefault(require_node());
    var types_1 = require_types();
    var String2 = (
      /** @class */
      (function(_super) {
        __extends(String3, _super);
        function String3(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.STRING;
          return _this;
        }
        return String3;
      })(node_1.default)
    );
    exports.default = String2;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/pseudo.js
var require_pseudo = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/pseudo.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var container_1 = __importDefault(require_container());
    var types_1 = require_types();
    var Pseudo = (
      /** @class */
      (function(_super) {
        __extends(Pseudo2, _super);
        function Pseudo2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.PSEUDO;
          return _this;
        }
        Pseudo2.prototype._stringify = function(options, depth, max) {
          var _this = this;
          if (depth >= max) {
            throw new Error("Cannot serialize selector: nesting depth exceeds the maximum of ".concat(max, "."));
          }
          var params = this.length ? "(" + this.map(function(child) {
            return _this._stringifyChild(child, options, depth + 1, max);
          }).join(",") + ")" : "";
          return [this.rawSpaceBefore, this.stringifyProperty("value"), params, this.rawSpaceAfter].join("");
        };
        return Pseudo2;
      })(container_1.default)
    );
    exports.default = Pseudo;
  }
});

// ../../node_modules/.bun/util-deprecate@1.0.2/node_modules/util-deprecate/node.js
var require_node2 = __commonJS({
  "../../node_modules/.bun/util-deprecate@1.0.2/node_modules/util-deprecate/node.js"(exports, module) {
    "use strict";
    module.exports = __require("util").deprecate;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/attribute.js
var require_attribute = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/attribute.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unescapeValue = unescapeValue;
    var cssesc_1 = __importDefault(require_cssesc());
    var unesc_1 = __importDefault(require_unesc());
    var namespace_1 = __importDefault(require_namespace());
    var types_1 = require_types();
    var deprecate = require_node2();
    var WRAPPED_IN_QUOTES = /^('|")([^]*)\1$/;
    var warnOfDeprecatedValueAssignment = deprecate(function() {
    }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead.");
    var warnOfDeprecatedQuotedAssignment = deprecate(function() {
    }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");
    var warnOfDeprecatedConstructor = deprecate(function() {
    }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
    function unescapeValue(value) {
      var deprecatedUsage = false;
      var quoteMark = null;
      var unescaped = value;
      var m = unescaped.match(WRAPPED_IN_QUOTES);
      if (m) {
        quoteMark = m[1];
        unescaped = m[2];
      }
      unescaped = (0, unesc_1.default)(unescaped);
      if (unescaped !== value) {
        deprecatedUsage = true;
      }
      return {
        deprecatedUsage,
        unescaped,
        quoteMark
      };
    }
    function handleDeprecatedContructorOpts(opts) {
      if (opts.quoteMark !== void 0) {
        return opts;
      }
      if (opts.value === void 0) {
        return opts;
      }
      warnOfDeprecatedConstructor();
      var _a2 = unescapeValue(opts.value), quoteMark = _a2.quoteMark, unescaped = _a2.unescaped;
      if (!opts.raws) {
        opts.raws = {};
      }
      if (opts.raws.value === void 0) {
        opts.raws.value = opts.value;
      }
      opts.value = unescaped;
      opts.quoteMark = quoteMark;
      return opts;
    }
    var Attribute = (
      /** @class */
      (function(_super) {
        __extends(Attribute2, _super);
        function Attribute2(opts) {
          if (opts === void 0) {
            opts = {};
          }
          var _this = _super.call(this, handleDeprecatedContructorOpts(opts)) || this;
          _this.type = types_1.ATTRIBUTE;
          _this.raws = _this.raws || {};
          Object.defineProperty(_this.raws, "unquoted", {
            get: deprecate(function() {
              return _this.value;
            }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
            set: deprecate(function() {
              return _this.value;
            }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
          });
          _this._constructed = true;
          return _this;
        }
        Attribute2.prototype.getQuotedValue = function(options) {
          if (options === void 0) {
            options = {};
          }
          var quoteMark = this._determineQuoteMark(options);
          var cssescopts = CSSESC_QUOTE_OPTIONS[quoteMark];
          var escaped = (0, cssesc_1.default)(this._value, cssescopts);
          return escaped;
        };
        Attribute2.prototype._determineQuoteMark = function(options) {
          return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
        };
        Attribute2.prototype.setValue = function(value, options) {
          if (options === void 0) {
            options = {};
          }
          this._value = value;
          this._quoteMark = this._determineQuoteMark(options);
          this._syncRawValue();
        };
        Attribute2.prototype.smartQuoteMark = function(options) {
          var v = this.value;
          var numSingleQuotes = v.replace(/[^']/g, "").length;
          var numDoubleQuotes = v.replace(/[^"]/g, "").length;
          if (numSingleQuotes + numDoubleQuotes === 0) {
            var escaped = (0, cssesc_1.default)(v, { isIdentifier: true });
            if (escaped === v) {
              return Attribute2.NO_QUOTE;
            } else {
              var pref = this.preferredQuoteMark(options);
              if (pref === Attribute2.NO_QUOTE) {
                var quote = this.quoteMark || options.quoteMark || Attribute2.DOUBLE_QUOTE;
                var opts = CSSESC_QUOTE_OPTIONS[quote];
                var quoteValue = (0, cssesc_1.default)(v, opts);
                if (quoteValue.length < escaped.length) {
                  return quote;
                }
              }
              return pref;
            }
          } else if (numDoubleQuotes === numSingleQuotes) {
            return this.preferredQuoteMark(options);
          } else if (numDoubleQuotes < numSingleQuotes) {
            return Attribute2.DOUBLE_QUOTE;
          } else {
            return Attribute2.SINGLE_QUOTE;
          }
        };
        Attribute2.prototype.preferredQuoteMark = function(options) {
          var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;
          if (quoteMark === void 0) {
            quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
          }
          if (quoteMark === void 0) {
            quoteMark = Attribute2.DOUBLE_QUOTE;
          }
          return quoteMark;
        };
        Object.defineProperty(Attribute2.prototype, "quoted", {
          get: function() {
            var qm = this.quoteMark;
            return qm === "'" || qm === '"';
          },
          set: function(value) {
            warnOfDeprecatedQuotedAssignment();
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Attribute2.prototype, "quoteMark", {
          /**
           * returns a single (`'`) or double (`"`) quote character if the value is quoted.
           * returns `null` if the value is not quoted.
           * returns `undefined` if the quotation state is unknown (this can happen when
           * the attribute is constructed without specifying a quote mark.)
           */
          get: function() {
            return this._quoteMark;
          },
          /**
           * Set the quote mark to be used by this attribute's value.
           * If the quote mark changes, the raw (escaped) value at `attr.raws.value` of the attribute
           * value is updated accordingly.
           *
           * @param {"'" | '"' | null} quoteMark The quote mark or `null` if the value should be unquoted.
           */
          set: function(quoteMark) {
            if (!this._constructed) {
              this._quoteMark = quoteMark;
              return;
            }
            if (this._quoteMark !== quoteMark) {
              this._quoteMark = quoteMark;
              this._syncRawValue();
            }
          },
          enumerable: false,
          configurable: true
        });
        Attribute2.prototype._syncRawValue = function() {
          var rawValue = (0, cssesc_1.default)(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);
          if (rawValue === this._value) {
            if (this.raws) {
              delete this.raws.value;
            }
          } else {
            this.raws.value = rawValue;
          }
        };
        Object.defineProperty(Attribute2.prototype, "qualifiedAttribute", {
          get: function() {
            return this.qualifiedName(this.raws.attribute || this.attribute);
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Attribute2.prototype, "insensitiveFlag", {
          get: function() {
            return this.insensitive ? "i" : "";
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Attribute2.prototype, "value", {
          get: function() {
            return this._value;
          },
          /**
           * Before 3.0, the value had to be set to an escaped value including any wrapped
           * quote marks. In 3.0, the semantics of `Attribute.value` changed so that the value
           * is unescaped during parsing and any quote marks are removed.
           *
           * Because the ambiguity of this semantic change, if you set `attr.value = newValue`,
           * a deprecation warning is raised when the new value contains any characters that would
           * require escaping (including if it contains wrapped quotes).
           *
           * Instead, you should call `attr.setValue(newValue, opts)` and pass options that describe
           * how the new value is quoted.
           */
          set: function(v) {
            if (this._constructed) {
              var _a2 = unescapeValue(v), deprecatedUsage = _a2.deprecatedUsage, unescaped = _a2.unescaped, quoteMark = _a2.quoteMark;
              if (deprecatedUsage) {
                warnOfDeprecatedValueAssignment();
              }
              if (unescaped === this._value && quoteMark === this._quoteMark) {
                return;
              }
              this._value = unescaped;
              this._quoteMark = quoteMark;
              this._syncRawValue();
            } else {
              this._value = v;
            }
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Attribute2.prototype, "insensitive", {
          get: function() {
            return this._insensitive;
          },
          /**
           * Set the case insensitive flag.
           * If the case insensitive flag changes, the raw (escaped) value at `attr.raws.insensitiveFlag`
           * of the attribute is updated accordingly.
           *
           * @param {true | false} insensitive true if the attribute should match case-insensitively.
           */
          set: function(insensitive) {
            if (!insensitive) {
              this._insensitive = false;
              if (this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i")) {
                this.raws.insensitiveFlag = void 0;
              }
            }
            this._insensitive = insensitive;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Attribute2.prototype, "attribute", {
          get: function() {
            return this._attribute;
          },
          set: function(name) {
            this._handleEscapes("attribute", name);
            this._attribute = name;
          },
          enumerable: false,
          configurable: true
        });
        Attribute2.prototype._handleEscapes = function(prop, value) {
          if (this._constructed) {
            var escaped = (0, cssesc_1.default)(value, { isIdentifier: true });
            if (escaped !== value) {
              this.raws[prop] = escaped;
            } else {
              delete this.raws[prop];
            }
          }
        };
        Attribute2.prototype._spacesFor = function(name) {
          var attrSpaces = { before: "", after: "" };
          var spaces = this.spaces[name] || {};
          var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
          return Object.assign(attrSpaces, spaces, rawSpaces);
        };
        Attribute2.prototype._stringFor = function(name, spaceName, concat) {
          if (spaceName === void 0) {
            spaceName = name;
          }
          if (concat === void 0) {
            concat = defaultAttrConcat;
          }
          var attrSpaces = this._spacesFor(spaceName);
          return concat(this.stringifyProperty(name), attrSpaces);
        };
        Attribute2.prototype.offsetOf = function(name) {
          var count = 1;
          var attributeSpaces = this._spacesFor("attribute");
          count += attributeSpaces.before.length;
          if (name === "namespace" || name === "ns") {
            return this.namespace ? count : -1;
          }
          if (name === "attributeNS") {
            return count;
          }
          count += this.namespaceString.length;
          if (this.namespace) {
            count += 1;
          }
          if (name === "attribute") {
            return count;
          }
          count += this.stringifyProperty("attribute").length;
          count += attributeSpaces.after.length;
          var operatorSpaces = this._spacesFor("operator");
          count += operatorSpaces.before.length;
          var operator = this.stringifyProperty("operator");
          if (name === "operator") {
            return operator ? count : -1;
          }
          count += operator.length;
          count += operatorSpaces.after.length;
          var valueSpaces = this._spacesFor("value");
          count += valueSpaces.before.length;
          var value = this.stringifyProperty("value");
          if (name === "value") {
            return value ? count : -1;
          }
          count += value.length;
          count += valueSpaces.after.length;
          var insensitiveSpaces = this._spacesFor("insensitive");
          count += insensitiveSpaces.before.length;
          if (name === "insensitive") {
            return this.insensitive ? count : -1;
          }
          return -1;
        };
        Attribute2.prototype.toString = function() {
          var _this = this;
          var selector = [this.rawSpaceBefore, "["];
          selector.push(this._stringFor("qualifiedAttribute", "attribute"));
          if (this.operator && (this.value || this.value === "")) {
            selector.push(this._stringFor("operator"));
            selector.push(this._stringFor("value"));
            selector.push(this._stringFor("insensitiveFlag", "insensitive", function(attrValue, attrSpaces) {
              if (attrValue.length > 0 && !_this.quoted && attrSpaces.before.length === 0 && !(_this.spaces.value && _this.spaces.value.after)) {
                attrSpaces.before = " ";
              }
              return defaultAttrConcat(attrValue, attrSpaces);
            }));
          }
          selector.push("]");
          selector.push(this.rawSpaceAfter);
          return selector.join("");
        };
        Attribute2.NO_QUOTE = null;
        Attribute2.SINGLE_QUOTE = "'";
        Attribute2.DOUBLE_QUOTE = '"';
        return Attribute2;
      })(namespace_1.default)
    );
    exports.default = Attribute;
    var CSSESC_QUOTE_OPTIONS = (_a = {
      "'": { quotes: "single", wrap: true },
      '"': { quotes: "double", wrap: true }
    }, _a[null] = { isIdentifier: true }, _a);
    function defaultAttrConcat(attrValue, attrSpaces) {
      return "".concat(attrSpaces.before).concat(attrValue).concat(attrSpaces.after);
    }
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/universal.js
var require_universal = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/universal.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var namespace_1 = __importDefault(require_namespace());
    var types_1 = require_types();
    var Universal = (
      /** @class */
      (function(_super) {
        __extends(Universal2, _super);
        function Universal2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.UNIVERSAL;
          _this.value = "*";
          return _this;
        }
        return Universal2;
      })(namespace_1.default)
    );
    exports.default = Universal;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/combinator.js
var require_combinator = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/combinator.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = __importDefault(require_node());
    var types_1 = require_types();
    var Combinator = (
      /** @class */
      (function(_super) {
        __extends(Combinator2, _super);
        function Combinator2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.COMBINATOR;
          return _this;
        }
        return Combinator2;
      })(node_1.default)
    );
    exports.default = Combinator;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/nesting.js
var require_nesting = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/nesting.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = __importDefault(require_node());
    var types_1 = require_types();
    var Nesting = (
      /** @class */
      (function(_super) {
        __extends(Nesting2, _super);
        function Nesting2(opts) {
          var _this = _super.call(this, opts) || this;
          _this.type = types_1.NESTING;
          _this.value = "&";
          return _this;
        }
        return Nesting2;
      })(node_1.default)
    );
    exports.default = Nesting;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/sortAscending.js
var require_sortAscending = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/sortAscending.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = sortAscending;
    function sortAscending(list) {
      return list.sort(function(a, b) {
        return a - b;
      });
    }
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/tokenTypes.js
var require_tokenTypes = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/tokenTypes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.combinator = exports.word = exports.comment = exports.str = exports.tab = exports.newline = exports.feed = exports.cr = exports.backslash = exports.bang = exports.slash = exports.doubleQuote = exports.singleQuote = exports.space = exports.greaterThan = exports.pipe = exports.equals = exports.plus = exports.caret = exports.tilde = exports.dollar = exports.closeSquare = exports.openSquare = exports.closeParenthesis = exports.openParenthesis = exports.semicolon = exports.colon = exports.comma = exports.at = exports.asterisk = exports.ampersand = void 0;
    exports.ampersand = 38;
    exports.asterisk = 42;
    exports.at = 64;
    exports.comma = 44;
    exports.colon = 58;
    exports.semicolon = 59;
    exports.openParenthesis = 40;
    exports.closeParenthesis = 41;
    exports.openSquare = 91;
    exports.closeSquare = 93;
    exports.dollar = 36;
    exports.tilde = 126;
    exports.caret = 94;
    exports.plus = 43;
    exports.equals = 61;
    exports.pipe = 124;
    exports.greaterThan = 62;
    exports.space = 32;
    exports.singleQuote = 39;
    exports.doubleQuote = 34;
    exports.slash = 47;
    exports.bang = 33;
    exports.backslash = 92;
    exports.cr = 13;
    exports.feed = 12;
    exports.newline = 10;
    exports.tab = 9;
    exports.str = exports.singleQuote;
    exports.comment = -1;
    exports.word = -2;
    exports.combinator = -3;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/tokenize.js
var require_tokenize = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/tokenize.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i2 = 0; i2 < k.length; i2++) if (k[i2] !== "default") __createBinding(result, mod, k[i2]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var _a;
    var _b;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FIELDS = void 0;
    exports.default = tokenize;
    var t = __importStar(require_tokenTypes());
    var unescapable = (_a = {}, _a[t.tab] = true, _a[t.newline] = true, _a[t.cr] = true, _a[t.feed] = true, _a);
    var wordDelimiters = (_b = {}, _b[t.space] = true, _b[t.tab] = true, _b[t.newline] = true, _b[t.cr] = true, _b[t.feed] = true, _b[t.ampersand] = true, _b[t.asterisk] = true, _b[t.bang] = true, _b[t.comma] = true, _b[t.colon] = true, _b[t.semicolon] = true, _b[t.openParenthesis] = true, _b[t.closeParenthesis] = true, _b[t.openSquare] = true, _b[t.closeSquare] = true, _b[t.singleQuote] = true, _b[t.doubleQuote] = true, _b[t.plus] = true, _b[t.pipe] = true, _b[t.tilde] = true, _b[t.greaterThan] = true, _b[t.equals] = true, _b[t.dollar] = true, _b[t.caret] = true, _b[t.slash] = true, _b);
    var hex = {};
    var hexChars = "0123456789abcdefABCDEF";
    for (i = 0; i < hexChars.length; i++) {
      hex[hexChars.charCodeAt(i)] = true;
    }
    var i;
    function consumeWord(css, start) {
      var next = start;
      var code;
      do {
        code = css.charCodeAt(next);
        if (wordDelimiters[code]) {
          return next - 1;
        } else if (code === t.backslash) {
          next = consumeEscape(css, next) + 1;
        } else {
          next++;
        }
      } while (next < css.length);
      return next - 1;
    }
    function consumeEscape(css, start) {
      var next = start;
      var code = css.charCodeAt(next + 1);
      if (unescapable[code]) {
      } else if (hex[code]) {
        var hexDigits = 0;
        do {
          next++;
          hexDigits++;
          code = css.charCodeAt(next + 1);
        } while (hex[code] && hexDigits < 6);
        if (hexDigits < 6 && code === t.space) {
          next++;
        }
      } else {
        next++;
      }
      return next;
    }
    exports.FIELDS = {
      TYPE: 0,
      START_LINE: 1,
      START_COL: 2,
      END_LINE: 3,
      END_COL: 4,
      START_POS: 5,
      END_POS: 6
    };
    function tokenize(input) {
      var tokens = [];
      var css = input.css.valueOf();
      var length = css.length;
      var offset = -1;
      var line = 1;
      var start = 0;
      var end = 0;
      var code, content, endColumn, endLine, escaped, escapePos, last, lines, next, nextLine, nextOffset, quote, tokenType;
      function unclosed(what, fix) {
        if (input.safe) {
          css += fix;
          next = css.length - 1;
        } else {
          throw input.error("Unclosed " + what, line, start - offset, start);
        }
      }
      while (start < length) {
        code = css.charCodeAt(start);
        if (code === t.newline) {
          offset = start;
          line += 1;
        }
        switch (code) {
          case t.space:
          case t.tab:
          case t.newline:
          case t.cr:
          case t.feed:
            next = start;
            do {
              next += 1;
              code = css.charCodeAt(next);
              if (code === t.newline) {
                offset = next;
                line += 1;
              }
            } while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);
            tokenType = t.space;
            endLine = line;
            endColumn = next - offset - 1;
            end = next;
            break;
          case t.plus:
          case t.greaterThan:
          case t.tilde:
          case t.pipe:
            next = start;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);
            tokenType = t.combinator;
            endLine = line;
            endColumn = start - offset;
            end = next;
            break;
          // Consume these characters as single tokens.
          case t.asterisk:
          case t.ampersand:
          case t.bang:
          case t.comma:
          case t.equals:
          case t.dollar:
          case t.caret:
          case t.openSquare:
          case t.closeSquare:
          case t.colon:
          case t.semicolon:
          case t.openParenthesis:
          case t.closeParenthesis:
            next = start;
            tokenType = code;
            endLine = line;
            endColumn = start - offset;
            end = next + 1;
            break;
          case t.singleQuote:
          case t.doubleQuote:
            quote = code === t.singleQuote ? "'" : '"';
            next = start;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                unclosed("quote", quote);
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === t.backslash) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            tokenType = t.str;
            endLine = line;
            endColumn = start - offset;
            end = next + 1;
            break;
          default:
            if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
              next = css.indexOf("*/", start + 2) + 1;
              if (next === 0) {
                unclosed("comment", "*/");
              }
              content = css.slice(start, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              tokenType = t.comment;
              line = nextLine;
              endLine = nextLine;
              endColumn = next - nextOffset;
            } else if (code === t.slash) {
              next = start;
              tokenType = code;
              endLine = line;
              endColumn = start - offset;
              end = next + 1;
            } else {
              next = consumeWord(css, start);
              tokenType = t.word;
              endLine = line;
              endColumn = next - offset;
            }
            end = next + 1;
            break;
        }
        tokens.push([
          tokenType,
          // [0] Token type
          line,
          // [1] Starting line
          start - offset,
          // [2] Starting column
          endLine,
          // [3] Ending line
          endColumn,
          // [4] Ending column
          start,
          // [5] Start position / Source index
          end
          // [6] End position
        ]);
        if (nextOffset) {
          offset = nextOffset;
          nextOffset = null;
        }
        start = end;
      }
      return tokens;
    }
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/parser.js
var require_parser = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/parser.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    var _b;
    Object.defineProperty(exports, "__esModule", { value: true });
    var root_1 = __importDefault(require_root());
    var selector_1 = __importDefault(require_selector());
    var className_1 = __importDefault(require_className());
    var comment_1 = __importDefault(require_comment());
    var id_1 = __importDefault(require_id());
    var tag_1 = __importDefault(require_tag());
    var string_1 = __importDefault(require_string());
    var pseudo_1 = __importDefault(require_pseudo());
    var attribute_1 = __importStar(require_attribute());
    var universal_1 = __importDefault(require_universal());
    var combinator_1 = __importDefault(require_combinator());
    var nesting_1 = __importDefault(require_nesting());
    var sortAscending_1 = __importDefault(require_sortAscending());
    var tokenize_1 = __importStar(require_tokenize());
    var tokens = __importStar(require_tokenTypes());
    var types = __importStar(require_types());
    var util_1 = require_util();
    var WHITESPACE_TOKENS = (_a = {}, _a[tokens.space] = true, _a[tokens.cr] = true, _a[tokens.feed] = true, _a[tokens.newline] = true, _a[tokens.tab] = true, _a);
    var WHITESPACE_EQUIV_TOKENS = __assign(__assign({}, WHITESPACE_TOKENS), (_b = {}, _b[tokens.comment] = true, _b));
    function tokenStart(token) {
      return {
        line: token[tokenize_1.FIELDS.START_LINE],
        column: token[tokenize_1.FIELDS.START_COL]
      };
    }
    function tokenEnd(token) {
      return {
        line: token[tokenize_1.FIELDS.END_LINE],
        column: token[tokenize_1.FIELDS.END_COL]
      };
    }
    function getSource(startLine, startColumn, endLine, endColumn) {
      return {
        start: {
          line: startLine,
          column: startColumn
        },
        end: {
          line: endLine,
          column: endColumn
        }
      };
    }
    function getTokenSource(token) {
      return getSource(token[tokenize_1.FIELDS.START_LINE], token[tokenize_1.FIELDS.START_COL], token[tokenize_1.FIELDS.END_LINE], token[tokenize_1.FIELDS.END_COL]);
    }
    function getTokenSourceSpan(startToken, endToken) {
      if (!startToken) {
        return void 0;
      }
      return getSource(startToken[tokenize_1.FIELDS.START_LINE], startToken[tokenize_1.FIELDS.START_COL], endToken[tokenize_1.FIELDS.END_LINE], endToken[tokenize_1.FIELDS.END_COL]);
    }
    function unescapeProp(node, prop) {
      var value = node[prop];
      if (typeof value !== "string") {
        return;
      }
      if (value.indexOf("\\") !== -1) {
        (0, util_1.ensureObject)(node, "raws");
        node[prop] = (0, util_1.unesc)(value);
        if (node.raws[prop] === void 0) {
          node.raws[prop] = value;
        }
      }
      return node;
    }
    function indexesOf(array, item) {
      var i = -1;
      var indexes = [];
      while ((i = array.indexOf(item, i + 1)) !== -1) {
        indexes.push(i);
      }
      return indexes;
    }
    function uniqs() {
      var list = Array.prototype.concat.apply([], arguments);
      return list.filter(function(item, i) {
        return i === list.indexOf(item);
      });
    }
    var Parser = (
      /** @class */
      (function() {
        function Parser2(rule, options) {
          if (options === void 0) {
            options = {};
          }
          this.rule = rule;
          this.options = Object.assign({ lossy: false, safe: false }, options);
          this.position = 0;
          this.nestingDepth = 0;
          this.maxNestingDepth = (0, util_1.resolveMaxNestingDepth)(this.options.maxNestingDepth);
          this.css = typeof this.rule === "string" ? this.rule : this.rule.selector;
          this.tokens = (0, tokenize_1.default)({
            css: this.css,
            error: this._errorGenerator(),
            safe: this.options.safe
          });
          var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
          this.root = new root_1.default({ source: rootSource });
          this.root.errorGenerator = this._errorGenerator();
          var selector = new selector_1.default({
            source: { start: { line: 1, column: 1 } },
            sourceIndex: 0
          });
          this.root.append(selector);
          this.current = selector;
          this.loop();
        }
        Parser2.prototype._errorGenerator = function() {
          var _this = this;
          return function(message, errorOptions) {
            if (typeof _this.rule === "string") {
              return new Error(message);
            }
            return _this.rule.error(message, errorOptions);
          };
        };
        Parser2.prototype.attribute = function() {
          var attr = [];
          var startingToken = this.currToken;
          this.position++;
          while (this.position < this.tokens.length && this.currToken[tokenize_1.FIELDS.TYPE] !== tokens.closeSquare) {
            attr.push(this.currToken);
            this.position++;
          }
          if (!this.currToken) {
            return this.expected("closing square bracket", startingToken[tokenize_1.FIELDS.START_POS]);
          }
          if (this.currToken[tokenize_1.FIELDS.TYPE] !== tokens.closeSquare) {
            return this.expected("closing square bracket", this.currToken[tokenize_1.FIELDS.START_POS]);
          }
          var len = attr.length;
          var node = {
            source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
            sourceIndex: startingToken[tokenize_1.FIELDS.START_POS]
          };
          if (len === 1 && !~[tokens.word].indexOf(attr[0][tokenize_1.FIELDS.TYPE])) {
            return this.expected("attribute", attr[0][tokenize_1.FIELDS.START_POS]);
          }
          var pos = 0;
          var spaceBefore = "";
          var commentBefore = "";
          var lastAdded = null;
          var spaceAfterMeaningfulToken = false;
          while (pos < len) {
            var token = attr[pos];
            var content = this.content(token);
            var next = attr[pos + 1];
            switch (token[tokenize_1.FIELDS.TYPE]) {
              case tokens.space:
                spaceAfterMeaningfulToken = true;
                if (this.options.lossy) {
                  break;
                }
                if (lastAdded) {
                  (0, util_1.ensureObject)(node, "spaces", lastAdded);
                  var prevContent = node.spaces[lastAdded].after || "";
                  node.spaces[lastAdded].after = prevContent + content;
                  var existingComment = (0, util_1.getProp)(node, "raws", "spaces", lastAdded, "after") || null;
                  if (existingComment) {
                    node.raws.spaces[lastAdded].after = existingComment + content;
                  }
                } else {
                  spaceBefore = spaceBefore + content;
                  commentBefore = commentBefore + content;
                }
                break;
              case tokens.asterisk:
                if (next[tokenize_1.FIELDS.TYPE] === tokens.equals) {
                  node.operator = content;
                  lastAdded = "operator";
                } else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
                  if (spaceBefore) {
                    (0, util_1.ensureObject)(node, "spaces", "attribute");
                    node.spaces.attribute.before = spaceBefore;
                    spaceBefore = "";
                  }
                  if (commentBefore) {
                    (0, util_1.ensureObject)(node, "raws", "spaces", "attribute");
                    node.raws.spaces.attribute.before = commentBefore;
                    commentBefore = "";
                  }
                  node.namespace = (node.namespace || "") + content;
                  var rawValue = (0, util_1.getProp)(node, "raws", "namespace") || null;
                  if (rawValue) {
                    node.raws.namespace += content;
                  }
                  lastAdded = "namespace";
                }
                spaceAfterMeaningfulToken = false;
                break;
              case tokens.dollar:
                if (lastAdded === "value") {
                  var oldRawValue = (0, util_1.getProp)(node, "raws", "value");
                  node.value += "$";
                  if (oldRawValue) {
                    node.raws.value = oldRawValue + "$";
                  }
                  break;
                }
              // Falls through
              case tokens.caret:
                if (next[tokenize_1.FIELDS.TYPE] === tokens.equals) {
                  node.operator = content;
                  lastAdded = "operator";
                }
                spaceAfterMeaningfulToken = false;
                break;
              case tokens.combinator:
                if (content === "~" && next[tokenize_1.FIELDS.TYPE] === tokens.equals) {
                  node.operator = content;
                  lastAdded = "operator";
                }
                if (content !== "|") {
                  spaceAfterMeaningfulToken = false;
                  break;
                }
                if (next[tokenize_1.FIELDS.TYPE] === tokens.equals) {
                  node.operator = content;
                  lastAdded = "operator";
                } else if (!node.namespace && !node.attribute) {
                  node.namespace = true;
                }
                spaceAfterMeaningfulToken = false;
                break;
              case tokens.word:
                if (next && this.content(next) === "|" && attr[pos + 2] && attr[pos + 2][tokenize_1.FIELDS.TYPE] !== tokens.equals && // this look-ahead probably fails with comment nodes involved.
                !node.operator && !node.namespace) {
                  node.namespace = content;
                  lastAdded = "namespace";
                } else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
                  if (spaceBefore) {
                    (0, util_1.ensureObject)(node, "spaces", "attribute");
                    node.spaces.attribute.before = spaceBefore;
                    spaceBefore = "";
                  }
                  if (commentBefore) {
                    (0, util_1.ensureObject)(node, "raws", "spaces", "attribute");
                    node.raws.spaces.attribute.before = commentBefore;
                    commentBefore = "";
                  }
                  node.attribute = (node.attribute || "") + content;
                  var rawValue = (0, util_1.getProp)(node, "raws", "attribute") || null;
                  if (rawValue) {
                    node.raws.attribute += content;
                  }
                  lastAdded = "attribute";
                } else if (!node.value && node.value !== "" || lastAdded === "value" && !(spaceAfterMeaningfulToken || node.quoteMark)) {
                  var unescaped_1 = (0, util_1.unesc)(content);
                  var oldRawValue = (0, util_1.getProp)(node, "raws", "value") || "";
                  var oldValue = node.value || "";
                  node.value = oldValue + unescaped_1;
                  node.quoteMark = null;
                  if (unescaped_1 !== content || oldRawValue) {
                    (0, util_1.ensureObject)(node, "raws");
                    node.raws.value = (oldRawValue || oldValue) + content;
                  }
                  lastAdded = "value";
                } else {
                  var insensitive = content === "i" || content === "I";
                  if ((node.value || node.value === "") && (node.quoteMark || spaceAfterMeaningfulToken)) {
                    node.insensitive = insensitive;
                    if (!insensitive || content === "I") {
                      (0, util_1.ensureObject)(node, "raws");
                      node.raws.insensitiveFlag = content;
                    }
                    lastAdded = "insensitive";
                    if (spaceBefore) {
                      (0, util_1.ensureObject)(node, "spaces", "insensitive");
                      node.spaces.insensitive.before = spaceBefore;
                      spaceBefore = "";
                    }
                    if (commentBefore) {
                      (0, util_1.ensureObject)(node, "raws", "spaces", "insensitive");
                      node.raws.spaces.insensitive.before = commentBefore;
                      commentBefore = "";
                    }
                  } else if (node.value || node.value === "") {
                    lastAdded = "value";
                    node.value += content;
                    if (node.raws.value) {
                      node.raws.value += content;
                    }
                  }
                }
                spaceAfterMeaningfulToken = false;
                break;
              case tokens.str:
                if (!node.attribute || !node.operator) {
                  return this.error("Expected an attribute followed by an operator preceding the string.", {
                    index: token[tokenize_1.FIELDS.START_POS]
                  });
                }
                var _a2 = (0, attribute_1.unescapeValue)(content), unescaped = _a2.unescaped, quoteMark = _a2.quoteMark;
                node.value = unescaped;
                node.quoteMark = quoteMark;
                lastAdded = "value";
                (0, util_1.ensureObject)(node, "raws");
                node.raws.value = content;
                spaceAfterMeaningfulToken = false;
                break;
              case tokens.equals:
                if (!node.attribute) {
                  return this.expected("attribute", token[tokenize_1.FIELDS.START_POS], content);
                }
                if (node.value) {
                  return this.error('Unexpected "=" found; an operator was already defined.', {
                    index: token[tokenize_1.FIELDS.START_POS]
                  });
                }
                node.operator = node.operator ? node.operator + content : content;
                lastAdded = "operator";
                spaceAfterMeaningfulToken = false;
                break;
              case tokens.comment:
                if (lastAdded) {
                  if (spaceAfterMeaningfulToken || next && next[tokenize_1.FIELDS.TYPE] === tokens.space || lastAdded === "insensitive") {
                    var lastComment = (0, util_1.getProp)(node, "spaces", lastAdded, "after") || "";
                    var rawLastComment = (0, util_1.getProp)(node, "raws", "spaces", lastAdded, "after") || lastComment;
                    (0, util_1.ensureObject)(node, "raws", "spaces", lastAdded);
                    node.raws.spaces[lastAdded].after = rawLastComment + content;
                  } else {
                    var lastValue = node[lastAdded] || "";
                    var rawLastValue = (0, util_1.getProp)(node, "raws", lastAdded) || lastValue;
                    (0, util_1.ensureObject)(node, "raws");
                    node.raws[lastAdded] = rawLastValue + content;
                  }
                } else {
                  commentBefore = commentBefore + content;
                }
                break;
              default:
                return this.error('Unexpected "'.concat(content, '" found.'), { index: token[tokenize_1.FIELDS.START_POS] });
            }
            pos++;
          }
          unescapeProp(node, "attribute");
          unescapeProp(node, "namespace");
          this.newNode(new attribute_1.default(node));
          this.position++;
        };
        Parser2.prototype.parseWhitespaceEquivalentTokens = function(stopPosition) {
          if (stopPosition < 0) {
            stopPosition = this.tokens.length;
          }
          var startPosition = this.position;
          var nodes = [];
          var space = "";
          var lastComment = void 0;
          do {
            if (WHITESPACE_TOKENS[this.currToken[tokenize_1.FIELDS.TYPE]]) {
              if (!this.options.lossy) {
                space += this.content();
              }
            } else if (this.currToken[tokenize_1.FIELDS.TYPE] === tokens.comment) {
              var spaces = {};
              if (space) {
                spaces.before = space;
                space = "";
              }
              lastComment = new comment_1.default({
                value: this.content(),
                source: getTokenSource(this.currToken),
                sourceIndex: this.currToken[tokenize_1.FIELDS.START_POS],
                spaces
              });
              nodes.push(lastComment);
            }
          } while (++this.position < stopPosition);
          if (space) {
            if (lastComment) {
              lastComment.spaces.after = space;
            } else if (!this.options.lossy) {
              var firstToken = this.tokens[startPosition];
              var lastToken = this.tokens[this.position - 1];
              nodes.push(new string_1.default({
                value: "",
                source: getSource(firstToken[tokenize_1.FIELDS.START_LINE], firstToken[tokenize_1.FIELDS.START_COL], lastToken[tokenize_1.FIELDS.END_LINE], lastToken[tokenize_1.FIELDS.END_COL]),
                sourceIndex: firstToken[tokenize_1.FIELDS.START_POS],
                spaces: { before: space, after: "" }
              }));
            }
          }
          return nodes;
        };
        Parser2.prototype.convertWhitespaceNodesToSpace = function(nodes, requiredSpace) {
          var _this = this;
          if (requiredSpace === void 0) {
            requiredSpace = false;
          }
          var space = "";
          var rawSpace = "";
          nodes.forEach(function(n) {
            var spaceBefore = _this.lossySpace(n.spaces.before, requiredSpace);
            var rawSpaceBefore = _this.lossySpace(n.rawSpaceBefore, requiredSpace);
            space += spaceBefore + _this.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
            rawSpace += spaceBefore + n.value + _this.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
          });
          if (rawSpace === space) {
            rawSpace = void 0;
          }
          var result = { space, rawSpace };
          return result;
        };
        Parser2.prototype.isNamedCombinator = function(position) {
          if (position === void 0) {
            position = this.position;
          }
          return this.tokens[position + 0] && this.tokens[position + 0][tokenize_1.FIELDS.TYPE] === tokens.slash && this.tokens[position + 1] && this.tokens[position + 1][tokenize_1.FIELDS.TYPE] === tokens.word && this.tokens[position + 2] && this.tokens[position + 2][tokenize_1.FIELDS.TYPE] === tokens.slash;
        };
        Parser2.prototype.namedCombinator = function() {
          if (this.isNamedCombinator()) {
            var nameRaw = this.content(this.tokens[this.position + 1]);
            var name = (0, util_1.unesc)(nameRaw).toLowerCase();
            var raws = {};
            if (name !== nameRaw) {
              raws.value = "/".concat(nameRaw, "/");
            }
            var node = new combinator_1.default({
              value: "/".concat(name, "/"),
              source: getSource(this.currToken[tokenize_1.FIELDS.START_LINE], this.currToken[tokenize_1.FIELDS.START_COL], this.tokens[this.position + 2][tokenize_1.FIELDS.END_LINE], this.tokens[this.position + 2][tokenize_1.FIELDS.END_COL]),
              sourceIndex: this.currToken[tokenize_1.FIELDS.START_POS],
              raws
            });
            this.position = this.position + 3;
            return node;
          } else {
            this.unexpected();
          }
        };
        Parser2.prototype.combinator = function() {
          var _this = this;
          if (this.content() === "|") {
            return this.namespace();
          }
          var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);
          if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][tokenize_1.FIELDS.TYPE] === tokens.comma || this.tokens[nextSigTokenPos][tokenize_1.FIELDS.TYPE] === tokens.closeParenthesis) {
            var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
            if (nodes.length > 0) {
              var last = this.current.last;
              if (last) {
                var _a2 = this.convertWhitespaceNodesToSpace(nodes), space = _a2.space, rawSpace = _a2.rawSpace;
                if (rawSpace !== void 0) {
                  last.rawSpaceAfter += rawSpace;
                }
                last.spaces.after += space;
              } else {
                nodes.forEach(function(n) {
                  return _this.newNode(n);
                });
              }
            }
            return;
          }
          var firstToken = this.currToken;
          var spaceOrDescendantSelectorNodes = void 0;
          if (nextSigTokenPos > this.position) {
            spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
          }
          var node;
          if (this.isNamedCombinator()) {
            node = this.namedCombinator();
          } else if (this.currToken[tokenize_1.FIELDS.TYPE] === tokens.combinator) {
            node = new combinator_1.default({
              value: this.content(),
              source: getTokenSource(this.currToken),
              sourceIndex: this.currToken[tokenize_1.FIELDS.START_POS]
            });
            this.position++;
          } else if (WHITESPACE_TOKENS[this.currToken[tokenize_1.FIELDS.TYPE]]) {
          } else if (!spaceOrDescendantSelectorNodes) {
            this.unexpected();
          }
          if (node) {
            if (spaceOrDescendantSelectorNodes) {
              var _b2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes), space = _b2.space, rawSpace = _b2.rawSpace;
              node.spaces.before = space;
              node.rawSpaceBefore = rawSpace;
            }
          } else {
            var _c = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true), space = _c.space, rawSpace = _c.rawSpace;
            if (!rawSpace) {
              rawSpace = space;
            }
            var spaces = {};
            var raws = { spaces: {} };
            if (space.endsWith(" ") && rawSpace.endsWith(" ")) {
              spaces.before = space.slice(0, space.length - 1);
              raws.spaces.before = rawSpace.slice(0, rawSpace.length - 1);
            } else if (space[0] === " " && rawSpace[0] === " ") {
              spaces.after = space.slice(1);
              raws.spaces.after = rawSpace.slice(1);
            } else {
              raws.value = rawSpace;
            }
            node = new combinator_1.default({
              value: " ",
              source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
              sourceIndex: firstToken[tokenize_1.FIELDS.START_POS],
              spaces,
              raws
            });
          }
          if (this.currToken && this.currToken[tokenize_1.FIELDS.TYPE] === tokens.space) {
            node.spaces.after = this.optionalSpace(this.content());
            this.position++;
          }
          return this.newNode(node);
        };
        Parser2.prototype.comma = function() {
          if (this.position === this.tokens.length - 1) {
            this.root.trailingComma = true;
            this.position++;
            return;
          }
          this.current._inferEndPosition();
          var selector = new selector_1.default({
            source: {
              start: tokenStart(this.tokens[this.position + 1])
            },
            sourceIndex: this.tokens[this.position + 1][tokenize_1.FIELDS.START_POS]
          });
          this.current.parent.append(selector);
          this.current = selector;
          this.position++;
        };
        Parser2.prototype.comment = function() {
          var current = this.currToken;
          this.newNode(new comment_1.default({
            value: this.content(),
            source: getTokenSource(current),
            sourceIndex: current[tokenize_1.FIELDS.START_POS]
          }));
          this.position++;
        };
        Parser2.prototype.error = function(message, opts) {
          throw this.root.error(message, opts);
        };
        Parser2.prototype.missingBackslash = function() {
          return this.error("Expected a backslash preceding the semicolon.", {
            index: this.currToken[tokenize_1.FIELDS.START_POS]
          });
        };
        Parser2.prototype.missingParenthesis = function() {
          return this.expected("opening parenthesis", this.currToken[tokenize_1.FIELDS.START_POS]);
        };
        Parser2.prototype.missingSquareBracket = function() {
          return this.expected("opening square bracket", this.currToken[tokenize_1.FIELDS.START_POS]);
        };
        Parser2.prototype.unexpected = function() {
          return this.error("Unexpected '".concat(this.content(), "'. Escaping special characters with \\ may help."), this.currToken[tokenize_1.FIELDS.START_POS]);
        };
        Parser2.prototype.unexpectedPipe = function() {
          return this.error("Unexpected '|'.", this.currToken[tokenize_1.FIELDS.START_POS]);
        };
        Parser2.prototype.namespace = function() {
          var prev = this.prevToken;
          var before = prev && (prev[tokenize_1.FIELDS.TYPE] === tokens.word || prev[tokenize_1.FIELDS.TYPE] === tokens.asterisk || prev[tokenize_1.FIELDS.TYPE] === tokens.ampersand) ? this.content(prev) : true;
          if (!this.nextToken) {
            return this.unexpectedPipe();
          }
          if (this.nextToken[tokenize_1.FIELDS.TYPE] === tokens.word) {
            this.position++;
            return this.word(before);
          } else if (this.nextToken[tokenize_1.FIELDS.TYPE] === tokens.asterisk) {
            this.position++;
            return this.universal(before);
          }
          this.unexpectedPipe();
        };
        Parser2.prototype.nesting = function() {
          if (this.nextToken) {
            var nextContent = this.content(this.nextToken);
            if (nextContent === "|") {
              this.position++;
              return;
            }
          }
          var current = this.currToken;
          this.newNode(new nesting_1.default({
            value: this.content(),
            source: getTokenSource(current),
            sourceIndex: current[tokenize_1.FIELDS.START_POS]
          }));
          this.position++;
        };
        Parser2.prototype.parentheses = function() {
          var last = this.current.last;
          var unbalanced = 1;
          var openingToken = this.currToken;
          this.position++;
          if (last && last.type === types.PSEUDO) {
            var selector = new selector_1.default({
              source: { start: tokenStart(this.tokens[this.position]) },
              sourceIndex: this.tokens[this.position][tokenize_1.FIELDS.START_POS]
            });
            var cache = this.current;
            last.append(selector);
            this.current = selector;
            this.nestingDepth++;
            try {
              if (this.nestingDepth > this.maxNestingDepth) {
                this.error("Cannot parse selector: nesting depth exceeds the maximum of ".concat(this.maxNestingDepth, "."), { index: this.currToken[tokenize_1.FIELDS.START_POS] });
              }
              while (this.position < this.tokens.length && unbalanced) {
                if (this.currToken[tokenize_1.FIELDS.TYPE] === tokens.openParenthesis) {
                  unbalanced++;
                }
                if (this.currToken[tokenize_1.FIELDS.TYPE] === tokens.closeParenthesis) {
                  unbalanced--;
                }
                if (unbalanced) {
                  this.parse();
                } else {
                  this.current.source.end = tokenEnd(this.currToken);
                  this.current.parent.source.end = tokenEnd(this.currToken);
                  this.position++;
                }
              }
            } finally {
              this.nestingDepth--;
            }
            this.current = cache;
          } else {
            var parenStart = this.currToken;
            var parenValue = "(";
            var parenEnd = void 0;
            while (this.position < this.tokens.length && unbalanced) {
              if (this.currToken[tokenize_1.FIELDS.TYPE] === tokens.openParenthesis) {
                unbalanced++;
              }
              if (this.currToken[tokenize_1.FIELDS.TYPE] === tokens.closeParenthesis) {
                unbalanced--;
              }
              parenEnd = this.currToken;
              parenValue += this.parseParenthesisToken(this.currToken);
              this.position++;
            }
            if (last) {
              last.appendToPropertyAndEscape("value", parenValue, parenValue);
            } else {
              this.newNode(new string_1.default({
                value: parenValue,
                source: getSource(parenStart[tokenize_1.FIELDS.START_LINE], parenStart[tokenize_1.FIELDS.START_COL], parenEnd[tokenize_1.FIELDS.END_LINE], parenEnd[tokenize_1.FIELDS.END_COL]),
                sourceIndex: parenStart[tokenize_1.FIELDS.START_POS]
              }));
            }
          }
          if (unbalanced) {
            return this.expected("closing parenthesis", (this.currToken || openingToken)[tokenize_1.FIELDS.START_POS]);
          }
        };
        Parser2.prototype.pseudo = function() {
          var _this = this;
          var pseudoStr = "";
          var startingToken = this.currToken;
          while (this.currToken && this.currToken[tokenize_1.FIELDS.TYPE] === tokens.colon) {
            pseudoStr += this.content();
            this.position++;
          }
          if (!this.currToken) {
            return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
          }
          if (this.currToken[tokenize_1.FIELDS.TYPE] === tokens.word) {
            this.splitWord(false, function(first, length) {
              pseudoStr += first;
              _this.newNode(new pseudo_1.default({
                value: pseudoStr,
                source: getTokenSourceSpan(startingToken, _this.currToken),
                sourceIndex: startingToken[tokenize_1.FIELDS.START_POS]
              }));
              if (length > 1 && _this.nextToken && _this.nextToken[tokenize_1.FIELDS.TYPE] === tokens.openParenthesis) {
                _this.error("Misplaced parenthesis.", {
                  index: _this.nextToken[tokenize_1.FIELDS.START_POS]
                });
              }
            });
          } else {
            return this.expected(["pseudo-class", "pseudo-element"], this.currToken[tokenize_1.FIELDS.START_POS]);
          }
        };
        Parser2.prototype.space = function() {
          var content = this.content();
          if (this.position === 0 || this.prevToken[tokenize_1.FIELDS.TYPE] === tokens.comma || this.prevToken[tokenize_1.FIELDS.TYPE] === tokens.openParenthesis || this.current.nodes.every(function(node) {
            return node.type === "comment";
          })) {
            this.spaces = this.optionalSpace(content);
            this.position++;
          } else if (this.position === this.tokens.length - 1 || this.nextToken[tokenize_1.FIELDS.TYPE] === tokens.comma || this.nextToken[tokenize_1.FIELDS.TYPE] === tokens.closeParenthesis) {
            this.current.last.spaces.after = this.optionalSpace(content);
            this.position++;
          } else {
            this.combinator();
          }
        };
        Parser2.prototype.string = function() {
          var current = this.currToken;
          this.newNode(new string_1.default({
            value: this.content(),
            source: getTokenSource(current),
            sourceIndex: current[tokenize_1.FIELDS.START_POS]
          }));
          this.position++;
        };
        Parser2.prototype.universal = function(namespace) {
          var nextToken = this.nextToken;
          if (nextToken && this.content(nextToken) === "|") {
            this.position++;
            return this.namespace();
          }
          var current = this.currToken;
          this.newNode(new universal_1.default({
            value: this.content(),
            source: getTokenSource(current),
            sourceIndex: current[tokenize_1.FIELDS.START_POS]
          }), namespace);
          this.position++;
        };
        Parser2.prototype.splitWord = function(namespace, firstCallback) {
          var _this = this;
          var nextToken = this.nextToken;
          var word = this.content();
          while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[tokenize_1.FIELDS.TYPE])) {
            this.position++;
            var current = this.content();
            word += current;
            if (current.lastIndexOf("\\") === current.length - 1) {
              var next = this.nextToken;
              if (next && next[tokenize_1.FIELDS.TYPE] === tokens.space) {
                word += this.requiredSpace(this.content(next));
                this.position++;
              }
            }
            nextToken = this.nextToken;
          }
          var hasClass = indexesOf(word, ".").filter(function(i) {
            var escapedDot = word[i - 1] === "\\";
            var isKeyframesPercent = /^\d+\.\d+%$/.test(word);
            return !escapedDot && !isKeyframesPercent;
          });
          var hasId = indexesOf(word, "#").filter(function(i) {
            return word[i - 1] !== "\\";
          });
          var interpolations = indexesOf(word, "#{");
          if (interpolations.length) {
            hasId = hasId.filter(function(hashIndex) {
              return !~interpolations.indexOf(hashIndex);
            });
          }
          var indices = (0, sortAscending_1.default)(uniqs(__spreadArray(__spreadArray([0], __read(hasClass), false), __read(hasId), false)));
          indices.forEach(function(ind, i) {
            var index = indices[i + 1] || word.length;
            var value = word.slice(ind, index);
            if (i === 0 && firstCallback) {
              return firstCallback.call(_this, value, indices.length);
            }
            var node;
            var current2 = _this.currToken;
            var sourceIndex = current2[tokenize_1.FIELDS.START_POS] + indices[i];
            var source = getSource(current2[1], current2[2] + ind, current2[3], current2[2] + (index - 1));
            if (~hasClass.indexOf(ind)) {
              var classNameOpts = {
                value: value.slice(1),
                source,
                sourceIndex
              };
              node = new className_1.default(unescapeProp(classNameOpts, "value"));
            } else if (~hasId.indexOf(ind)) {
              var idOpts = {
                value: value.slice(1),
                source,
                sourceIndex
              };
              node = new id_1.default(unescapeProp(idOpts, "value"));
            } else {
              var tagOpts = {
                value,
                source,
                sourceIndex
              };
              unescapeProp(tagOpts, "value");
              node = new tag_1.default(tagOpts);
            }
            _this.newNode(node, namespace);
            namespace = null;
          });
          this.position++;
        };
        Parser2.prototype.word = function(namespace) {
          var nextToken = this.nextToken;
          if (nextToken && this.content(nextToken) === "|") {
            this.position++;
            return this.namespace();
          }
          return this.splitWord(namespace);
        };
        Parser2.prototype.loop = function() {
          while (this.position < this.tokens.length) {
            this.parse(true);
          }
          this.current._inferEndPosition();
          return this.root;
        };
        Parser2.prototype.parse = function(throwOnParenthesis) {
          switch (this.currToken[tokenize_1.FIELDS.TYPE]) {
            case tokens.space:
              this.space();
              break;
            case tokens.comment:
              this.comment();
              break;
            case tokens.openParenthesis:
              this.parentheses();
              break;
            case tokens.closeParenthesis:
              if (throwOnParenthesis) {
                this.missingParenthesis();
              }
              break;
            case tokens.openSquare:
              this.attribute();
              break;
            case tokens.dollar:
            case tokens.caret:
            case tokens.equals:
            case tokens.word:
              this.word();
              break;
            case tokens.colon:
              this.pseudo();
              break;
            case tokens.comma:
              this.comma();
              break;
            case tokens.asterisk:
              this.universal();
              break;
            case tokens.ampersand:
              this.nesting();
              break;
            case tokens.slash:
            case tokens.combinator:
              this.combinator();
              break;
            case tokens.str:
              this.string();
              break;
            // These cases throw; no break needed.
            case tokens.closeSquare:
              this.missingSquareBracket();
            case tokens.semicolon:
              this.missingBackslash();
            default:
              this.unexpected();
          }
        };
        Parser2.prototype.expected = function(description, index, found) {
          if (Array.isArray(description)) {
            var last = description.pop();
            description = "".concat(description.join(", "), " or ").concat(last);
          }
          var an = /^[aeiou]/.test(description[0]) ? "an" : "a";
          if (!found) {
            return this.error("Expected ".concat(an, " ").concat(description, "."), { index });
          }
          return this.error("Expected ".concat(an, " ").concat(description, ', found "').concat(found, '" instead.'), { index });
        };
        Parser2.prototype.requiredSpace = function(space) {
          return this.options.lossy ? " " : space;
        };
        Parser2.prototype.optionalSpace = function(space) {
          return this.options.lossy ? "" : space;
        };
        Parser2.prototype.lossySpace = function(space, required) {
          if (this.options.lossy) {
            return required ? " " : "";
          } else {
            return space;
          }
        };
        Parser2.prototype.parseParenthesisToken = function(token) {
          var content = this.content(token);
          if (token[tokenize_1.FIELDS.TYPE] === tokens.space) {
            return this.requiredSpace(content);
          } else {
            return content;
          }
        };
        Parser2.prototype.newNode = function(node, namespace) {
          if (namespace) {
            if (/^ +$/.test(namespace)) {
              if (!this.options.lossy) {
                this.spaces = (this.spaces || "") + namespace;
              }
              namespace = true;
            }
            node.namespace = namespace;
            unescapeProp(node, "namespace");
          }
          if (this.spaces) {
            node.spaces.before = this.spaces;
            this.spaces = "";
          }
          return this.current.append(node);
        };
        Parser2.prototype.content = function(token) {
          if (token === void 0) {
            token = this.currToken;
          }
          return this.css.slice(token[tokenize_1.FIELDS.START_POS], token[tokenize_1.FIELDS.END_POS]);
        };
        Object.defineProperty(Parser2.prototype, "currToken", {
          get: function() {
            return this.tokens[this.position];
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Parser2.prototype, "nextToken", {
          get: function() {
            return this.tokens[this.position + 1];
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Parser2.prototype, "prevToken", {
          get: function() {
            return this.tokens[this.position - 1];
          },
          enumerable: false,
          configurable: true
        });
        Parser2.prototype.locateNextMeaningfulToken = function(startPosition) {
          if (startPosition === void 0) {
            startPosition = this.position + 1;
          }
          var searchPosition = startPosition;
          while (searchPosition < this.tokens.length) {
            if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][tokenize_1.FIELDS.TYPE]]) {
              searchPosition++;
              continue;
            } else {
              return searchPosition;
            }
          }
          return -1;
        };
        return Parser2;
      })()
    );
    exports.default = Parser;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/processor.js
var require_processor = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/processor.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var parser_1 = __importDefault(require_parser());
    var Processor = (
      /** @class */
      (function() {
        function Processor2(func, options) {
          this.func = func || function noop() {
          };
          this.funcRes = null;
          this.options = options;
        }
        Processor2.prototype._shouldUpdateSelector = function(rule, options) {
          if (options === void 0) {
            options = {};
          }
          var merged = Object.assign({}, this.options, options);
          if (merged.updateSelector === false) {
            return false;
          } else {
            return typeof rule !== "string";
          }
        };
        Processor2.prototype._isLossy = function(options) {
          if (options === void 0) {
            options = {};
          }
          var merged = Object.assign({}, this.options, options);
          if (merged.lossless === false) {
            return true;
          } else {
            return false;
          }
        };
        Processor2.prototype._root = function(rule, options) {
          if (options === void 0) {
            options = {};
          }
          var parser = new parser_1.default(rule, this._parseOptions(options));
          return parser.root;
        };
        Processor2.prototype._parseOptions = function(options) {
          var merged = Object.assign({}, this.options, options);
          return {
            lossy: this._isLossy(merged),
            maxNestingDepth: merged.maxNestingDepth
          };
        };
        Processor2.prototype._stringifyOptions = function(options) {
          var merged = Object.assign({}, this.options, options);
          return {
            maxNestingDepth: merged.maxNestingDepth
          };
        };
        Processor2.prototype._run = function(rule, options) {
          var _this = this;
          if (options === void 0) {
            options = {};
          }
          return new Promise(function(resolve, reject) {
            try {
              var root_1 = _this._root(rule, options);
              Promise.resolve(_this.func(root_1)).then(function(transform) {
                var string = void 0;
                if (_this._shouldUpdateSelector(rule, options)) {
                  string = root_1.toString(_this._stringifyOptions(options));
                  rule.selector = string;
                }
                return { transform, root: root_1, string };
              }).then(resolve, reject);
            } catch (e) {
              reject(e);
              return;
            }
          });
        };
        Processor2.prototype._runSync = function(rule, options) {
          if (options === void 0) {
            options = {};
          }
          var root = this._root(rule, options);
          var transform = this.func(root);
          if (transform && typeof transform.then === "function") {
            throw new Error("Selector processor returned a promise to a synchronous call.");
          }
          var string = void 0;
          if (options.updateSelector && typeof rule !== "string") {
            string = root.toString(this._stringifyOptions(options));
            rule.selector = string;
          }
          return { transform, root, string };
        };
        Processor2.prototype.ast = function(rule, options) {
          return this._run(rule, options).then(function(result) {
            return result.root;
          });
        };
        Processor2.prototype.astSync = function(rule, options) {
          return this._runSync(rule, options).root;
        };
        Processor2.prototype.transform = function(rule, options) {
          return this._run(rule, options).then(function(result) {
            return result.transform;
          });
        };
        Processor2.prototype.transformSync = function(rule, options) {
          return this._runSync(rule, options).transform;
        };
        Processor2.prototype.process = function(rule, options) {
          var _this = this;
          return this._run(rule, options).then(function(result) {
            return result.string || result.root.toString(_this._stringifyOptions(options));
          });
        };
        Processor2.prototype.processSync = function(rule, options) {
          var result = this._runSync(rule, options);
          return result.string || result.root.toString(this._stringifyOptions(options));
        };
        return Processor2;
      })()
    );
    exports.default = Processor;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/constructors.js
var require_constructors = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/constructors.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = void 0;
    var attribute_1 = __importDefault(require_attribute());
    var className_1 = __importDefault(require_className());
    var combinator_1 = __importDefault(require_combinator());
    var comment_1 = __importDefault(require_comment());
    var id_1 = __importDefault(require_id());
    var nesting_1 = __importDefault(require_nesting());
    var pseudo_1 = __importDefault(require_pseudo());
    var root_1 = __importDefault(require_root());
    var selector_1 = __importDefault(require_selector());
    var string_1 = __importDefault(require_string());
    var tag_1 = __importDefault(require_tag());
    var universal_1 = __importDefault(require_universal());
    var attribute = function(opts) {
      return new attribute_1.default(opts);
    };
    exports.attribute = attribute;
    var className = function(opts) {
      return new className_1.default(opts);
    };
    exports.className = className;
    var combinator = function(opts) {
      return new combinator_1.default(opts);
    };
    exports.combinator = combinator;
    var comment = function(opts) {
      return new comment_1.default(opts);
    };
    exports.comment = comment;
    var id = function(opts) {
      return new id_1.default(opts);
    };
    exports.id = id;
    var nesting = function(opts) {
      return new nesting_1.default(opts);
    };
    exports.nesting = nesting;
    var pseudo = function(opts) {
      return new pseudo_1.default(opts);
    };
    exports.pseudo = pseudo;
    var root = function(opts) {
      return new root_1.default(opts);
    };
    exports.root = root;
    var selector = function(opts) {
      return new selector_1.default(opts);
    };
    exports.selector = selector;
    var string = function(opts) {
      return new string_1.default(opts);
    };
    exports.string = string;
    var tag = function(opts) {
      return new tag_1.default(opts);
    };
    exports.tag = tag;
    var universal = function(opts) {
      return new universal_1.default(opts);
    };
    exports.universal = universal;
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/guards.js
var require_guards = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/guards.js"(exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = exports.isPseudo = exports.isNesting = exports.isIdentifier = exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = void 0;
    exports.isNode = isNode;
    exports.isPseudoElement = isPseudoElement;
    exports.isPseudoClass = isPseudoClass;
    exports.isContainer = isContainer;
    exports.isNamespace = isNamespace;
    var types_1 = require_types();
    var IS_TYPE = (_a = {}, _a[types_1.ATTRIBUTE] = true, _a[types_1.CLASS] = true, _a[types_1.COMBINATOR] = true, _a[types_1.COMMENT] = true, _a[types_1.ID] = true, _a[types_1.NESTING] = true, _a[types_1.PSEUDO] = true, _a[types_1.ROOT] = true, _a[types_1.SELECTOR] = true, _a[types_1.STRING] = true, _a[types_1.TAG] = true, _a[types_1.UNIVERSAL] = true, _a);
    function isNode(node) {
      return typeof node === "object" && IS_TYPE[node.type];
    }
    function isNodeType(type, node) {
      return isNode(node) && node.type === type;
    }
    exports.isAttribute = isNodeType.bind(null, types_1.ATTRIBUTE);
    exports.isClassName = isNodeType.bind(null, types_1.CLASS);
    exports.isCombinator = isNodeType.bind(null, types_1.COMBINATOR);
    exports.isComment = isNodeType.bind(null, types_1.COMMENT);
    exports.isIdentifier = isNodeType.bind(null, types_1.ID);
    exports.isNesting = isNodeType.bind(null, types_1.NESTING);
    exports.isPseudo = isNodeType.bind(null, types_1.PSEUDO);
    exports.isRoot = isNodeType.bind(null, types_1.ROOT);
    exports.isSelector = isNodeType.bind(null, types_1.SELECTOR);
    exports.isString = isNodeType.bind(null, types_1.STRING);
    exports.isTag = isNodeType.bind(null, types_1.TAG);
    exports.isUniversal = isNodeType.bind(null, types_1.UNIVERSAL);
    function isPseudoElement(node) {
      return (0, exports.isPseudo)(node) && node.value && (node.value.startsWith("::") || node.value.toLowerCase() === ":before" || node.value.toLowerCase() === ":after" || node.value.toLowerCase() === ":first-letter" || node.value.toLowerCase() === ":first-line");
    }
    function isPseudoClass(node) {
      return (0, exports.isPseudo)(node) && !isPseudoElement(node);
    }
    function isContainer(node) {
      return !!(isNode(node) && node.walk);
    }
    function isNamespace(node) {
      return (0, exports.isAttribute)(node) || (0, exports.isTag)(node);
    }
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/index.js
var require_selectors = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/selectors/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_types(), exports);
    __exportStar(require_constructors(), exports);
    __exportStar(require_guards(), exports);
  }
});

// ../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.bun/postcss-selector-parser@7.1.5/node_modules/postcss-selector-parser/dist/index.js"(exports, module) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var processor_1 = __importDefault(require_processor());
    var selectors = __importStar(require_selectors());
    var parser = function(processor) {
      return new processor_1.default(processor);
    };
    Object.assign(parser, selectors);
    delete parser.__esModule;
    module.exports = parser;
  }
});

export {
  require_dist
};
/*! Bundled license information:

cssesc/cssesc.js:
  (*! https://mths.be/cssesc v3.0.0 by @mathias *)
*/
