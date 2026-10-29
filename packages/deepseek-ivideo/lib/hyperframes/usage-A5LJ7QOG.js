import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  require_code,
  require_codegen,
  require_compile,
  require_core,
  require_names,
  require_ref,
  require_ref_error,
  require_types,
  require_util,
  require_validate,
  require_validation_error
} from "./chunk-3PWCGB42.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  __commonJS,
  __toESM
} from "./chunk-M2WBOQ2Q.js";

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/metadata.js
var require_metadata = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkMetadata = void 0;
    var util_1 = require_util();
    var def = {
      keyword: "metadata",
      schemaType: "object",
      code(cxt) {
        checkMetadata(cxt);
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        const valid = gen.name("valid");
        cxt.subschema({ keyword: "metadata", jtdMetadata: true }, valid);
        cxt.ok(valid);
      }
    };
    function checkMetadata({ it, keyword }, metadata) {
      if (it.jtdMetadata !== metadata) {
        throw new Error(`JTD: "${keyword}" cannot be used in this schema location`);
      }
    }
    exports.checkMetadata = checkMetadata;
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/ref.js
var require_ref2 = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasRef = void 0;
    var compile_1 = require_compile();
    var codegen_1 = require_codegen();
    var ref_error_1 = require_ref_error();
    var names_1 = require_names();
    var ref_1 = require_ref();
    var metadata_1 = require_metadata();
    var def = {
      keyword: "ref",
      schemaType: "string",
      code(cxt) {
        (0, metadata_1.checkMetadata)(cxt);
        const { gen, data, schema: ref, parentSchema, it } = cxt;
        const { schemaEnv: { root } } = it;
        const valid = gen.name("valid");
        if (parentSchema.nullable) {
          gen.var(valid, (0, codegen_1._)`${data} === null`);
          gen.if((0, codegen_1.not)(valid), validateJtdRef);
        } else {
          gen.var(valid, false);
          validateJtdRef();
        }
        cxt.ok(valid);
        function validateJtdRef() {
          var _a;
          const refSchema = (_a = root.schema.definitions) === null || _a === void 0 ? void 0 : _a[ref];
          if (!refSchema) {
            throw new ref_error_1.default(it.opts.uriResolver, "", ref, `No definition ${ref}`);
          }
          if (hasRef(refSchema) || !it.opts.inlineRefs)
            callValidate(refSchema);
          else
            inlineRefSchema(refSchema);
        }
        function callValidate(schema) {
          const sch = compile_1.compileSchema.call(it.self, new compile_1.SchemaEnv({ schema, root, schemaPath: `/definitions/${ref}` }));
          const v = (0, ref_1.getValidate)(cxt, sch);
          const errsCount = gen.const("_errs", names_1.default.errors);
          (0, ref_1.callRef)(cxt, v, sch, sch.$async);
          gen.assign(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        }
        function inlineRefSchema(schema) {
          const schName = gen.scopeValue("schema", it.opts.code.source === true ? { ref: schema, code: (0, codegen_1.stringify)(schema) } : { ref: schema });
          cxt.subschema({
            schema,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: `/definitions/${ref}`
          }, valid);
        }
      }
    };
    function hasRef(schema) {
      for (const key in schema) {
        let sch;
        if (key === "ref" || typeof (sch = schema[key]) == "object" && hasRef(sch))
          return true;
      }
      return false;
    }
    exports.hasRef = hasRef;
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/runtime/timestamp.js
var require_timestamp = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/runtime/timestamp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DT_SEPARATOR = /t|\s/i;
    var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    var TIME = /^(\d\d):(\d\d):(\d\d)(?:\.\d+)?(?:z|([+-]\d\d)(?::?(\d\d))?)$/i;
    var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function validTimestamp(str, allowDate) {
      const dt = str.split(DT_SEPARATOR);
      return dt.length === 2 && validDate(dt[0]) && validTime(dt[1]) || allowDate && dt.length === 1 && validDate(dt[0]);
    }
    exports.default = validTimestamp;
    function validDate(str) {
      const matches = DATE.exec(str);
      if (!matches)
        return false;
      const y = +matches[1];
      const m = +matches[2];
      const d = +matches[3];
      return m >= 1 && m <= 12 && d >= 1 && (d <= DAYS[m] || // leap year: https://tools.ietf.org/html/rfc3339#appendix-C
      m === 2 && d === 29 && (y % 100 === 0 ? y % 400 === 0 : y % 4 === 0));
    }
    function validTime(str) {
      const matches = TIME.exec(str);
      if (!matches)
        return false;
      const hr = +matches[1];
      const min = +matches[2];
      const sec = +matches[3];
      const tzH = +(matches[4] || 0);
      const tzM = +(matches[5] || 0);
      return hr <= 23 && min <= 59 && sec <= 59 || // leap second
      hr - tzH === 23 && min - tzM === 59 && sec === 60;
    }
    validTimestamp.code = 'require("ajv/dist/runtime/timestamp").default';
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/error.js
var require_error = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.typeErrorParams = exports.typeErrorMessage = exports.typeError = void 0;
    var codegen_1 = require_codegen();
    function typeError(t) {
      return {
        message: (cxt) => typeErrorMessage(cxt, t),
        params: (cxt) => typeErrorParams(cxt, t)
      };
    }
    exports.typeError = typeError;
    function typeErrorMessage({ parentSchema }, t) {
      return (parentSchema === null || parentSchema === void 0 ? void 0 : parentSchema.nullable) ? `must be ${t} or null` : `must be ${t}`;
    }
    exports.typeErrorMessage = typeErrorMessage;
    function typeErrorParams({ parentSchema }, t) {
      return (0, codegen_1._)`{type: ${t}, nullable: ${!!(parentSchema === null || parentSchema === void 0 ? void 0 : parentSchema.nullable)}}`;
    }
    exports.typeErrorParams = typeErrorParams;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/type.js
var require_type = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.intRange = void 0;
    var codegen_1 = require_codegen();
    var timestamp_1 = require_timestamp();
    var util_1 = require_util();
    var metadata_1 = require_metadata();
    var error_1 = require_error();
    exports.intRange = {
      int8: [-128, 127, 3],
      uint8: [0, 255, 3],
      int16: [-32768, 32767, 5],
      uint16: [0, 65535, 5],
      int32: [-2147483648, 2147483647, 10],
      uint32: [0, 4294967295, 10]
    };
    var error = {
      message: (cxt) => (0, error_1.typeErrorMessage)(cxt, cxt.schema),
      params: (cxt) => (0, error_1.typeErrorParams)(cxt, cxt.schema)
    };
    function timestampCode(cxt) {
      const { gen, data, it } = cxt;
      const { timestamp, allowDate } = it.opts;
      if (timestamp === "date")
        return (0, codegen_1._)`${data} instanceof Date `;
      const vts = (0, util_1.useFunc)(gen, timestamp_1.default);
      const allowDateArg = allowDate ? (0, codegen_1._)`, true` : codegen_1.nil;
      const validString = (0, codegen_1._)`typeof ${data} == "string" && ${vts}(${data}${allowDateArg})`;
      return timestamp === "string" ? validString : (0, codegen_1.or)((0, codegen_1._)`${data} instanceof Date`, validString);
    }
    var def = {
      keyword: "type",
      schemaType: "string",
      error,
      code(cxt) {
        (0, metadata_1.checkMetadata)(cxt);
        const { data, schema, parentSchema, it } = cxt;
        let cond;
        switch (schema) {
          case "boolean":
          case "string":
            cond = (0, codegen_1._)`typeof ${data} == ${schema}`;
            break;
          case "timestamp": {
            cond = timestampCode(cxt);
            break;
          }
          case "float32":
          case "float64":
            cond = (0, codegen_1._)`typeof ${data} == "number"`;
            break;
          default: {
            const sch = schema;
            cond = (0, codegen_1._)`typeof ${data} == "number" && isFinite(${data}) && !(${data} % 1)`;
            if (!it.opts.int32range && (sch === "int32" || sch === "uint32")) {
              if (sch === "uint32")
                cond = (0, codegen_1._)`${cond} && ${data} >= 0`;
            } else {
              const [min, max] = exports.intRange[sch];
              cond = (0, codegen_1._)`${cond} && ${data} >= ${min} && ${data} <= ${max}`;
            }
          }
        }
        cxt.pass(parentSchema.nullable ? (0, codegen_1.or)((0, codegen_1._)`${data} === null`, cond) : cond);
      }
    };
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/nullable.js
var require_nullable = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/nullable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkNullableObject = exports.checkNullable = void 0;
    var codegen_1 = require_codegen();
    function checkNullable({ gen, data, parentSchema }, cond = codegen_1.nil) {
      const valid = gen.name("valid");
      if (parentSchema.nullable) {
        gen.let(valid, (0, codegen_1._)`${data} === null`);
        cond = (0, codegen_1.not)(valid);
      } else {
        gen.let(valid, false);
      }
      return [valid, cond];
    }
    exports.checkNullable = checkNullable;
    function checkNullableObject(cxt, cond) {
      const [valid, cond_] = checkNullable(cxt, cond);
      return [valid, (0, codegen_1._)`${cond_} && typeof ${cxt.data} == "object" && !Array.isArray(${cxt.data})`];
    }
    exports.checkNullableObject = checkNullableObject;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/enum.js
var require_enum = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var metadata_1 = require_metadata();
    var nullable_1 = require_nullable();
    var error = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      error,
      code(cxt) {
        (0, metadata_1.checkMetadata)(cxt);
        const { gen, data, schema, schemaValue, parentSchema, it } = cxt;
        if (schema.length === 0)
          throw new Error("enum must have non-empty array");
        if (schema.length !== new Set(schema).size)
          throw new Error("enum items must be unique");
        let valid;
        const isString = (0, codegen_1._)`typeof ${data} == "string"`;
        if (schema.length >= it.opts.loopEnum) {
          let cond;
          [valid, cond] = (0, nullable_1.checkNullable)(cxt, isString);
          gen.if(cond, loopEnum);
        } else {
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          valid = (0, codegen_1.and)(isString, (0, codegen_1.or)(...schema.map((value) => (0, codegen_1._)`${data} === ${value}`)));
          if (parentSchema.nullable)
            valid = (0, codegen_1.or)((0, codegen_1._)`${data} === null`, valid);
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.forOf("v", schemaValue, (v) => gen.if((0, codegen_1._)`${valid} = ${data} === ${v}`, () => gen.break()));
        }
      }
    };
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/elements.js
var require_elements = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/elements.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var code_1 = require_code();
    var codegen_1 = require_codegen();
    var metadata_1 = require_metadata();
    var nullable_1 = require_nullable();
    var error_1 = require_error();
    var def = {
      keyword: "elements",
      schemaType: "object",
      error: (0, error_1.typeError)("array"),
      code(cxt) {
        (0, metadata_1.checkMetadata)(cxt);
        const { gen, data, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        const [valid] = (0, nullable_1.checkNullable)(cxt);
        gen.if((0, codegen_1.not)(valid), () => gen.if((0, codegen_1._)`Array.isArray(${data})`, () => gen.assign(valid, (0, code_1.validateArray)(cxt)), () => cxt.error()));
        cxt.ok(valid);
      }
    };
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/properties.js
var require_properties = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/properties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateProperties = exports.error = void 0;
    var code_1 = require_code();
    var util_1 = require_util();
    var codegen_1 = require_codegen();
    var metadata_1 = require_metadata();
    var nullable_1 = require_nullable();
    var error_1 = require_error();
    var PropError;
    (function(PropError2) {
      PropError2["Additional"] = "additional";
      PropError2["Missing"] = "missing";
    })(PropError || (PropError = {}));
    exports.error = {
      message: (cxt) => {
        const { params } = cxt;
        return params.propError ? params.propError === PropError.Additional ? "must NOT have additional properties" : `must have property '${params.missingProperty}'` : (0, error_1.typeErrorMessage)(cxt, "object");
      },
      params: (cxt) => {
        const { params } = cxt;
        return params.propError ? params.propError === PropError.Additional ? (0, codegen_1._)`{error: ${params.propError}, additionalProperty: ${params.additionalProperty}}` : (0, codegen_1._)`{error: ${params.propError}, missingProperty: ${params.missingProperty}}` : (0, error_1.typeErrorParams)(cxt, "object");
      }
    };
    var def = {
      keyword: "properties",
      schemaType: "object",
      error: exports.error,
      code: validateProperties
    };
    function validateProperties(cxt) {
      (0, metadata_1.checkMetadata)(cxt);
      const { gen, data, parentSchema, it } = cxt;
      const { additionalProperties, nullable } = parentSchema;
      if (it.jtdDiscriminator && nullable)
        throw new Error("JTD: nullable inside discriminator mapping");
      if (commonProperties()) {
        throw new Error("JTD: properties and optionalProperties have common members");
      }
      const [allProps, properties] = schemaProperties("properties");
      const [allOptProps, optProperties] = schemaProperties("optionalProperties");
      if (properties.length === 0 && optProperties.length === 0 && additionalProperties) {
        return;
      }
      const [valid, cond] = it.jtdDiscriminator === void 0 ? (0, nullable_1.checkNullableObject)(cxt, data) : [gen.let("valid", false), true];
      gen.if(cond, () => gen.assign(valid, true).block(() => {
        validateProps(properties, "properties", true);
        validateProps(optProperties, "optionalProperties");
        if (!additionalProperties)
          validateAdditional();
      }));
      cxt.pass(valid);
      function commonProperties() {
        const props = parentSchema.properties;
        const optProps = parentSchema.optionalProperties;
        if (!(props && optProps))
          return false;
        for (const p in props) {
          if (Object.prototype.hasOwnProperty.call(optProps, p))
            return true;
        }
        return false;
      }
      function schemaProperties(keyword) {
        const schema = parentSchema[keyword];
        const allPs = schema ? (0, code_1.allSchemaProperties)(schema) : [];
        if (it.jtdDiscriminator && allPs.some((p) => p === it.jtdDiscriminator)) {
          throw new Error(`JTD: discriminator tag used in ${keyword}`);
        }
        const ps = allPs.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        return [allPs, ps];
      }
      function validateProps(props, keyword, required) {
        const _valid = gen.var("valid");
        for (const prop of props) {
          gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => applyPropertySchema(prop, keyword, _valid), () => missingProperty(prop));
          cxt.ok(_valid);
        }
        function missingProperty(prop) {
          if (required) {
            gen.assign(_valid, false);
            cxt.error(false, { propError: PropError.Missing, missingProperty: prop }, { schemaPath: prop });
          } else {
            gen.assign(_valid, true);
          }
        }
      }
      function applyPropertySchema(prop, keyword, _valid) {
        cxt.subschema({
          keyword,
          schemaProp: prop,
          dataProp: prop
        }, _valid);
      }
      function validateAdditional() {
        gen.forIn("key", data, (key) => {
          const addProp = isAdditional(key, allProps, "properties", it.jtdDiscriminator);
          const addOptProp = isAdditional(key, allOptProps, "optionalProperties");
          const extra = addProp === true ? addOptProp : addOptProp === true ? addProp : (0, codegen_1.and)(addProp, addOptProp);
          gen.if(extra, () => {
            if (it.opts.removeAdditional) {
              gen.code((0, codegen_1._)`delete ${data}[${key}]`);
            } else {
              cxt.error(false, { propError: PropError.Additional, additionalProperty: key }, { instancePath: key, parentSchema: true });
              if (!it.opts.allErrors)
                gen.break();
            }
          });
        });
      }
      function isAdditional(key, props, keyword, jtdDiscriminator) {
        let additional;
        if (props.length > 8) {
          const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema[keyword], keyword);
          additional = (0, codegen_1.not)((0, code_1.isOwnProperty)(gen, propsSchema, key));
          if (jtdDiscriminator !== void 0) {
            additional = (0, codegen_1.and)(additional, (0, codegen_1._)`${key} !== ${jtdDiscriminator}`);
          }
        } else if (props.length || jtdDiscriminator !== void 0) {
          const ps = jtdDiscriminator === void 0 ? props : [jtdDiscriminator].concat(props);
          additional = (0, codegen_1.and)(...ps.map((p) => (0, codegen_1._)`${key} !== ${p}`));
        } else {
          additional = true;
        }
        return additional;
      }
    }
    exports.validateProperties = validateProperties;
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/optionalProperties.js
var require_optionalProperties = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/optionalProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var properties_1 = require_properties();
    var def = {
      keyword: "optionalProperties",
      schemaType: "object",
      error: properties_1.error,
      code(cxt) {
        if (cxt.parentSchema.properties)
          return;
        (0, properties_1.validateProperties)(cxt);
      }
    };
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/discriminator.js
var require_discriminator = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/discriminator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var metadata_1 = require_metadata();
    var nullable_1 = require_nullable();
    var error_1 = require_error();
    var types_1 = require_types();
    var error = {
      message: (cxt) => {
        const { schema, params } = cxt;
        return params.discrError ? params.discrError === types_1.DiscrError.Tag ? `tag "${schema}" must be string` : `value of tag "${schema}" must be in mapping` : (0, error_1.typeErrorMessage)(cxt, "object");
      },
      params: (cxt) => {
        const { schema, params } = cxt;
        return params.discrError ? (0, codegen_1._)`{error: ${params.discrError}, tag: ${schema}, tagValue: ${params.tag}}` : (0, error_1.typeErrorParams)(cxt, "object");
      }
    };
    var def = {
      keyword: "discriminator",
      schemaType: "string",
      implements: ["mapping"],
      error,
      code(cxt) {
        (0, metadata_1.checkMetadata)(cxt);
        const { gen, data, schema, parentSchema } = cxt;
        const [valid, cond] = (0, nullable_1.checkNullableObject)(cxt, data);
        gen.if(cond);
        validateDiscriminator();
        gen.elseIf((0, codegen_1.not)(valid));
        cxt.error();
        gen.endIf();
        cxt.ok(valid);
        function validateDiscriminator() {
          const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(schema)}`);
          gen.if((0, codegen_1._)`${tag} === undefined`);
          cxt.error(false, { discrError: types_1.DiscrError.Tag, tag });
          gen.elseIf((0, codegen_1._)`typeof ${tag} == "string"`);
          validateMapping(tag);
          gen.else();
          cxt.error(false, { discrError: types_1.DiscrError.Tag, tag }, { instancePath: schema });
          gen.endIf();
        }
        function validateMapping(tag) {
          gen.if(false);
          for (const tagValue in parentSchema.mapping) {
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
            gen.assign(valid, applyTagSchema(tagValue));
          }
          gen.else();
          cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag }, { instancePath: schema, schemaPath: "mapping", parentSchema: true });
          gen.endIf();
        }
        function applyTagSchema(schemaProp) {
          const _valid = gen.name("valid");
          cxt.subschema({
            keyword: "mapping",
            schemaProp,
            jtdDiscriminator: schema
          }, _valid);
          return _valid;
        }
      }
    };
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/values.js
var require_values = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/values.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var codegen_1 = require_codegen();
    var metadata_1 = require_metadata();
    var nullable_1 = require_nullable();
    var error_1 = require_error();
    var def = {
      keyword: "values",
      schemaType: "object",
      error: (0, error_1.typeError)("object"),
      code(cxt) {
        (0, metadata_1.checkMetadata)(cxt);
        const { gen, data, schema, it } = cxt;
        const [valid, cond] = (0, nullable_1.checkNullableObject)(cxt, data);
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          gen.if((0, codegen_1.not)((0, codegen_1.or)(cond, valid)), () => cxt.error());
        } else {
          gen.if(cond);
          gen.assign(valid, validateMap());
          gen.elseIf((0, codegen_1.not)(valid));
          cxt.error();
          gen.endIf();
        }
        cxt.ok(valid);
        function validateMap() {
          const _valid = gen.name("valid");
          if (it.allErrors) {
            const validMap = gen.let("valid", true);
            validateValues(() => gen.assign(validMap, false));
            return validMap;
          }
          gen.var(_valid, true);
          validateValues(() => gen.break());
          return _valid;
          function validateValues(notValid) {
            gen.forIn("key", data, (key) => {
              cxt.subschema({
                keyword: "values",
                dataProp: key,
                dataPropType: util_1.Type.Str
              }, _valid);
              gen.if((0, codegen_1.not)(_valid), notValid);
            });
          }
        }
      }
    };
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/union.js
var require_union = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/union.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code();
    var def = {
      keyword: "union",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: { message: "must match a schema in union" }
    };
    exports.default = def;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/index.js
var require_jtd = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/vocabularies/jtd/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ref_1 = require_ref2();
    var type_1 = require_type();
    var enum_1 = require_enum();
    var elements_1 = require_elements();
    var properties_1 = require_properties();
    var optionalProperties_1 = require_optionalProperties();
    var discriminator_1 = require_discriminator();
    var values_1 = require_values();
    var union_1 = require_union();
    var metadata_1 = require_metadata();
    var jtdVocabulary = [
      "definitions",
      ref_1.default,
      type_1.default,
      enum_1.default,
      elements_1.default,
      properties_1.default,
      optionalProperties_1.default,
      discriminator_1.default,
      values_1.default,
      union_1.default,
      metadata_1.default,
      { keyword: "additionalProperties", schemaType: "boolean" },
      { keyword: "nullable", schemaType: "boolean" }
    ];
    exports.default = jtdVocabulary;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/refs/jtd-schema.js
var require_jtd_schema = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/refs/jtd-schema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var shared = (root) => {
      const sch = {
        nullable: { type: "boolean" },
        metadata: {
          optionalProperties: {
            union: { elements: { ref: "schema" } }
          },
          additionalProperties: true
        }
      };
      if (root)
        sch.definitions = { values: { ref: "schema" } };
      return sch;
    };
    var emptyForm = (root) => ({
      optionalProperties: shared(root)
    });
    var refForm = (root) => ({
      properties: {
        ref: { type: "string" }
      },
      optionalProperties: shared(root)
    });
    var typeForm = (root) => ({
      properties: {
        type: {
          enum: [
            "boolean",
            "timestamp",
            "string",
            "float32",
            "float64",
            "int8",
            "uint8",
            "int16",
            "uint16",
            "int32",
            "uint32"
          ]
        }
      },
      optionalProperties: shared(root)
    });
    var enumForm = (root) => ({
      properties: {
        enum: { elements: { type: "string" } }
      },
      optionalProperties: shared(root)
    });
    var elementsForm = (root) => ({
      properties: {
        elements: { ref: "schema" }
      },
      optionalProperties: shared(root)
    });
    var propertiesForm = (root) => ({
      properties: {
        properties: { values: { ref: "schema" } }
      },
      optionalProperties: {
        optionalProperties: { values: { ref: "schema" } },
        additionalProperties: { type: "boolean" },
        ...shared(root)
      }
    });
    var optionalPropertiesForm = (root) => ({
      properties: {
        optionalProperties: { values: { ref: "schema" } }
      },
      optionalProperties: {
        additionalProperties: { type: "boolean" },
        ...shared(root)
      }
    });
    var discriminatorForm = (root) => ({
      properties: {
        discriminator: { type: "string" },
        mapping: {
          values: {
            metadata: {
              union: [propertiesForm(false), optionalPropertiesForm(false)]
            }
          }
        }
      },
      optionalProperties: shared(root)
    });
    var valuesForm = (root) => ({
      properties: {
        values: { ref: "schema" }
      },
      optionalProperties: shared(root)
    });
    var schema = (root) => ({
      metadata: {
        union: [
          emptyForm,
          refForm,
          typeForm,
          enumForm,
          elementsForm,
          propertiesForm,
          optionalPropertiesForm,
          discriminatorForm,
          valuesForm
        ].map((s) => s(root))
      }
    });
    var jtdMetaSchema = {
      definitions: {
        schema: schema(false)
      },
      ...schema(true)
    };
    exports.default = jtdMetaSchema;
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/compile/jtd/types.js
var require_types2 = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/compile/jtd/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.jtdForms = void 0;
    exports.jtdForms = [
      "elements",
      "values",
      "discriminator",
      "properties",
      "optionalProperties",
      "enum",
      "type",
      "ref"
    ];
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/runtime/quote.js
var require_quote = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/runtime/quote.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var rxEscapable = (
      // eslint-disable-next-line no-control-regex, no-misleading-character-class
      /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
    );
    var escaped = {
      "\b": "\\b",
      "	": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    };
    function quote(s) {
      rxEscapable.lastIndex = 0;
      return '"' + (rxEscapable.test(s) ? s.replace(rxEscapable, (a) => {
        const c = escaped[a];
        return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
      }) : s) + '"';
    }
    exports.default = quote;
    quote.code = 'require("ajv/dist/runtime/quote").default';
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/compile/jtd/serialize.js
var require_serialize = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/compile/jtd/serialize.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var types_1 = require_types2();
    var __1 = require_compile();
    var codegen_1 = require_codegen();
    var ref_error_1 = require_ref_error();
    var names_1 = require_names();
    var code_1 = require_code();
    var ref_1 = require_ref2();
    var util_1 = require_util();
    var quote_1 = require_quote();
    var genSerialize = {
      elements: serializeElements,
      values: serializeValues,
      discriminator: serializeDiscriminator,
      properties: serializeProperties,
      optionalProperties: serializeProperties,
      enum: serializeString,
      type: serializeType,
      ref: serializeRef
    };
    function compileSerializer(sch, definitions) {
      const _sch = __1.getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      const serializeName = gen.scopeName("serialize");
      const cxt = {
        self: this,
        gen,
        schema: sch.schema,
        schemaEnv: sch,
        definitions,
        data: names_1.default.data
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        sch.serializeName = serializeName;
        gen.func(serializeName, names_1.default.data, false, () => {
          gen.let(names_1.default.json, (0, codegen_1.str)``);
          serializeCode(cxt);
          gen.return(names_1.default.json);
        });
        gen.optimize(this.opts.code.optimize);
        const serializeFuncCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${serializeFuncCode}`;
        const makeSerialize = new Function(`${names_1.default.scope}`, sourceCode);
        const serialize = makeSerialize(this.scope.get());
        this.scope.value(serializeName, { ref: serialize });
        sch.serialize = serialize;
      } catch (e) {
        if (sourceCode)
          this.logger.error("Error compiling serializer, function code:", sourceCode);
        delete sch.serialize;
        delete sch.serializeName;
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
      return sch;
    }
    exports.default = compileSerializer;
    function serializeCode(cxt) {
      let form;
      for (const key of types_1.jtdForms) {
        if (key in cxt.schema) {
          form = key;
          break;
        }
      }
      serializeNullable(cxt, form ? genSerialize[form] : serializeEmpty);
    }
    function serializeNullable(cxt, serializeForm) {
      const { gen, schema, data } = cxt;
      if (!schema.nullable)
        return serializeForm(cxt);
      gen.if((0, codegen_1._)`${data} === undefined || ${data} === null`, () => gen.add(names_1.default.json, (0, codegen_1._)`"null"`), () => serializeForm(cxt));
    }
    function serializeElements(cxt) {
      const { gen, schema, data } = cxt;
      gen.add(names_1.default.json, (0, codegen_1.str)`[`);
      const first = gen.let("first", true);
      gen.forOf("el", data, (el) => {
        addComma(cxt, first);
        serializeCode({ ...cxt, schema: schema.elements, data: el });
      });
      gen.add(names_1.default.json, (0, codegen_1.str)`]`);
    }
    function serializeValues(cxt) {
      const { gen, schema, data } = cxt;
      gen.add(names_1.default.json, (0, codegen_1.str)`{`);
      const first = gen.let("first", true);
      gen.forIn("key", data, (key) => serializeKeyValue(cxt, key, schema.values, first));
      gen.add(names_1.default.json, (0, codegen_1.str)`}`);
    }
    function serializeKeyValue(cxt, key, schema, first) {
      const { gen, data } = cxt;
      addComma(cxt, first);
      serializeString({ ...cxt, data: key });
      gen.add(names_1.default.json, (0, codegen_1.str)`:`);
      const value = gen.const("value", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(key)}`);
      serializeCode({ ...cxt, schema, data: value });
    }
    function serializeDiscriminator(cxt) {
      const { gen, schema, data } = cxt;
      const { discriminator } = schema;
      gen.add(names_1.default.json, (0, codegen_1.str)`{${JSON.stringify(discriminator)}:`);
      const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(discriminator)}`);
      serializeString({ ...cxt, data: tag });
      gen.if(false);
      for (const tagValue in schema.mapping) {
        gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
        const sch = schema.mapping[tagValue];
        serializeSchemaProperties({ ...cxt, schema: sch }, discriminator);
      }
      gen.endIf();
      gen.add(names_1.default.json, (0, codegen_1.str)`}`);
    }
    function serializeProperties(cxt) {
      const { gen } = cxt;
      gen.add(names_1.default.json, (0, codegen_1.str)`{`);
      serializeSchemaProperties(cxt);
      gen.add(names_1.default.json, (0, codegen_1.str)`}`);
    }
    function serializeSchemaProperties(cxt, discriminator) {
      const { gen, schema, data } = cxt;
      const { properties, optionalProperties } = schema;
      const props = keys(properties);
      const optProps = keys(optionalProperties);
      const allProps = allProperties(props.concat(optProps));
      let first = !discriminator;
      let firstProp;
      for (const key of props) {
        if (first)
          first = false;
        else
          gen.add(names_1.default.json, (0, codegen_1.str)`,`);
        serializeProperty(key, properties[key], keyValue(key));
      }
      if (first)
        firstProp = gen.let("first", true);
      for (const key of optProps) {
        const value = keyValue(key);
        gen.if((0, codegen_1.and)((0, codegen_1._)`${value} !== undefined`, (0, code_1.isOwnProperty)(gen, data, key)), () => {
          addComma(cxt, firstProp);
          serializeProperty(key, optionalProperties[key], value);
        });
      }
      if (schema.additionalProperties) {
        gen.forIn("key", data, (key) => gen.if(isAdditional(key, allProps), () => serializeKeyValue(cxt, key, {}, firstProp)));
      }
      function keys(ps) {
        return ps ? Object.keys(ps) : [];
      }
      function allProperties(ps) {
        if (discriminator)
          ps.push(discriminator);
        if (new Set(ps).size !== ps.length) {
          throw new Error("JTD: properties/optionalProperties/disciminator overlap");
        }
        return ps;
      }
      function keyValue(key) {
        return gen.const("value", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(key)}`);
      }
      function serializeProperty(key, propSchema, value) {
        gen.add(names_1.default.json, (0, codegen_1.str)`${JSON.stringify(key)}:`);
        serializeCode({ ...cxt, schema: propSchema, data: value });
      }
      function isAdditional(key, ps) {
        return ps.length ? (0, codegen_1.and)(...ps.map((p) => (0, codegen_1._)`${key} !== ${p}`)) : true;
      }
    }
    function serializeType(cxt) {
      const { gen, schema, data } = cxt;
      switch (schema.type) {
        case "boolean":
          gen.add(names_1.default.json, (0, codegen_1._)`${data} ? "true" : "false"`);
          break;
        case "string":
          serializeString(cxt);
          break;
        case "timestamp":
          gen.if((0, codegen_1._)`${data} instanceof Date`, () => gen.add(names_1.default.json, (0, codegen_1._)`'"' + ${data}.toISOString() + '"'`), () => serializeString(cxt));
          break;
        default:
          serializeNumber(cxt);
      }
    }
    function serializeString({ gen, data }) {
      gen.add(names_1.default.json, (0, codegen_1._)`${(0, util_1.useFunc)(gen, quote_1.default)}(${data})`);
    }
    function serializeNumber({ gen, data, self }) {
      const condition = (0, codegen_1._)`${data} === Infinity || ${data} === -Infinity || ${data} !== ${data}`;
      if (self.opts.specialNumbers === void 0 || self.opts.specialNumbers === "fast") {
        gen.add(names_1.default.json, (0, codegen_1._)`"" + ${data}`);
      } else {
        gen.if(condition, () => gen.add(names_1.default.json, (0, codegen_1._)`null`), () => gen.add(names_1.default.json, (0, codegen_1._)`"" + ${data}`));
      }
    }
    function serializeRef(cxt) {
      const { gen, self, data, definitions, schema, schemaEnv } = cxt;
      const { ref } = schema;
      const refSchema = definitions[ref];
      if (!refSchema)
        throw new ref_error_1.default(self.opts.uriResolver, "", ref, `No definition ${ref}`);
      if (!(0, ref_1.hasRef)(refSchema))
        return serializeCode({ ...cxt, schema: refSchema });
      const { root } = schemaEnv;
      const sch = compileSerializer.call(self, new __1.SchemaEnv({ schema: refSchema, root }), definitions);
      gen.add(names_1.default.json, (0, codegen_1._)`${getSerialize(gen, sch)}(${data})`);
    }
    function getSerialize(gen, sch) {
      return sch.serialize ? gen.scopeValue("serialize", { ref: sch.serialize }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.serialize`;
    }
    function serializeEmpty({ gen, data }) {
      gen.add(names_1.default.json, (0, codegen_1._)`JSON.stringify(${data})`);
    }
    function addComma({ gen }, first) {
      if (first) {
        gen.if(first, () => gen.assign(first, false), () => gen.add(names_1.default.json, (0, codegen_1.str)`,`));
      } else {
        gen.add(names_1.default.json, (0, codegen_1.str)`,`);
      }
    }
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/runtime/parseJson.js
var require_parseJson = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/runtime/parseJson.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseJsonString = exports.parseJsonNumber = exports.parseJson = void 0;
    var rxParseJson = /position\s(\d+)(?: \(line \d+ column \d+\))?$/;
    function parseJson(s, pos) {
      let endPos;
      parseJson.message = void 0;
      let matches;
      if (pos)
        s = s.slice(pos);
      try {
        parseJson.position = pos + s.length;
        return JSON.parse(s);
      } catch (e) {
        matches = rxParseJson.exec(e.message);
        if (!matches) {
          parseJson.message = "unexpected end";
          return void 0;
        }
        endPos = +matches[1];
        const c = s[endPos];
        s = s.slice(0, endPos);
        parseJson.position = pos + endPos;
        try {
          return JSON.parse(s);
        } catch (e1) {
          parseJson.message = `unexpected token ${c}`;
          return void 0;
        }
      }
    }
    exports.parseJson = parseJson;
    parseJson.message = void 0;
    parseJson.position = 0;
    parseJson.code = 'require("ajv/dist/runtime/parseJson").parseJson';
    function parseJsonNumber(s, pos, maxDigits) {
      let numStr = "";
      let c;
      parseJsonNumber.message = void 0;
      if (s[pos] === "-") {
        numStr += "-";
        pos++;
      }
      if (s[pos] === "0") {
        numStr += "0";
        pos++;
      } else {
        if (!parseDigits(maxDigits)) {
          errorMessage();
          return void 0;
        }
      }
      if (maxDigits) {
        parseJsonNumber.position = pos;
        return +numStr;
      }
      if (s[pos] === ".") {
        numStr += ".";
        pos++;
        if (!parseDigits()) {
          errorMessage();
          return void 0;
        }
      }
      if (c = s[pos], c === "e" || c === "E") {
        numStr += "e";
        pos++;
        if (c = s[pos], c === "+" || c === "-") {
          numStr += c;
          pos++;
        }
        if (!parseDigits()) {
          errorMessage();
          return void 0;
        }
      }
      parseJsonNumber.position = pos;
      return +numStr;
      function parseDigits(maxLen) {
        let digit = false;
        while (c = s[pos], c >= "0" && c <= "9" && (maxLen === void 0 || maxLen-- > 0)) {
          digit = true;
          numStr += c;
          pos++;
        }
        return digit;
      }
      function errorMessage() {
        parseJsonNumber.position = pos;
        parseJsonNumber.message = pos < s.length ? `unexpected token ${s[pos]}` : "unexpected end";
      }
    }
    exports.parseJsonNumber = parseJsonNumber;
    parseJsonNumber.message = void 0;
    parseJsonNumber.position = 0;
    parseJsonNumber.code = 'require("ajv/dist/runtime/parseJson").parseJsonNumber';
    var escapedChars = {
      b: "\b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "	",
      '"': '"',
      "/": "/",
      "\\": "\\"
    };
    var CODE_A = "a".charCodeAt(0);
    var CODE_0 = "0".charCodeAt(0);
    function parseJsonString(s, pos) {
      let str = "";
      let c;
      parseJsonString.message = void 0;
      while (true) {
        c = s[pos++];
        if (c === '"')
          break;
        if (c === "\\") {
          c = s[pos];
          if (c in escapedChars) {
            str += escapedChars[c];
            pos++;
          } else if (c === "u") {
            pos++;
            let count = 4;
            let code = 0;
            while (count--) {
              code <<= 4;
              c = s[pos];
              if (c === void 0) {
                errorMessage("unexpected end");
                return void 0;
              }
              c = c.toLowerCase();
              if (c >= "a" && c <= "f") {
                code += c.charCodeAt(0) - CODE_A + 10;
              } else if (c >= "0" && c <= "9") {
                code += c.charCodeAt(0) - CODE_0;
              } else {
                errorMessage(`unexpected token ${c}`);
                return void 0;
              }
              pos++;
            }
            str += String.fromCharCode(code);
          } else {
            errorMessage(`unexpected token ${c}`);
            return void 0;
          }
        } else if (c === void 0) {
          errorMessage("unexpected end");
          return void 0;
        } else {
          if (c.charCodeAt(0) >= 32) {
            str += c;
          } else {
            errorMessage(`unexpected token ${c}`);
            return void 0;
          }
        }
      }
      parseJsonString.position = pos;
      return str;
      function errorMessage(msg) {
        parseJsonString.position = pos;
        parseJsonString.message = msg;
      }
    }
    exports.parseJsonString = parseJsonString;
    parseJsonString.message = void 0;
    parseJsonString.position = 0;
    parseJsonString.code = 'require("ajv/dist/runtime/parseJson").parseJsonString';
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/compile/jtd/parse.js
var require_parse = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/compile/jtd/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var types_1 = require_types2();
    var __1 = require_compile();
    var codegen_1 = require_codegen();
    var ref_error_1 = require_ref_error();
    var names_1 = require_names();
    var code_1 = require_code();
    var ref_1 = require_ref2();
    var type_1 = require_type();
    var parseJson_1 = require_parseJson();
    var util_1 = require_util();
    var timestamp_1 = require_timestamp();
    var genParse = {
      elements: parseElements,
      values: parseValues,
      discriminator: parseDiscriminator,
      properties: parseProperties,
      optionalProperties: parseProperties,
      enum: parseEnum,
      type: parseType,
      ref: parseRef
    };
    function compileParser(sch, definitions) {
      const _sch = __1.getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      const parseName = gen.scopeName("parse");
      const cxt = {
        self: this,
        gen,
        schema: sch.schema,
        schemaEnv: sch,
        definitions,
        data: names_1.default.data,
        parseName,
        char: gen.name("c")
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        sch.parseName = parseName;
        parserFunction(cxt);
        gen.optimize(this.opts.code.optimize);
        const parseFuncCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${parseFuncCode}`;
        const makeParse = new Function(`${names_1.default.scope}`, sourceCode);
        const parse = makeParse(this.scope.get());
        this.scope.value(parseName, { ref: parse });
        sch.parse = parse;
      } catch (e) {
        if (sourceCode)
          this.logger.error("Error compiling parser, function code:", sourceCode);
        delete sch.parse;
        delete sch.parseName;
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
      return sch;
    }
    exports.default = compileParser;
    var undef = (0, codegen_1._)`undefined`;
    function parserFunction(cxt) {
      const { gen, parseName, char } = cxt;
      gen.func(parseName, (0, codegen_1._)`${names_1.default.json}, ${names_1.default.jsonPos}, ${names_1.default.jsonPart}`, false, () => {
        gen.let(names_1.default.data);
        gen.let(char);
        gen.assign((0, codegen_1._)`${parseName}.message`, undef);
        gen.assign((0, codegen_1._)`${parseName}.position`, undef);
        gen.assign(names_1.default.jsonPos, (0, codegen_1._)`${names_1.default.jsonPos} || 0`);
        gen.const(names_1.default.jsonLen, (0, codegen_1._)`${names_1.default.json}.length`);
        parseCode(cxt);
        skipWhitespace(cxt);
        gen.if(names_1.default.jsonPart, () => {
          gen.assign((0, codegen_1._)`${parseName}.position`, names_1.default.jsonPos);
          gen.return(names_1.default.data);
        });
        gen.if((0, codegen_1._)`${names_1.default.jsonPos} === ${names_1.default.jsonLen}`, () => gen.return(names_1.default.data));
        jsonSyntaxError(cxt);
      });
    }
    function parseCode(cxt) {
      let form;
      for (const key of types_1.jtdForms) {
        if (key in cxt.schema) {
          form = key;
          break;
        }
      }
      if (form)
        parseNullable(cxt, genParse[form]);
      else
        parseEmpty(cxt);
    }
    var parseBoolean = parseBooleanToken(true, parseBooleanToken(false, jsonSyntaxError));
    function parseNullable(cxt, parseForm) {
      const { gen, schema, data } = cxt;
      if (!schema.nullable)
        return parseForm(cxt);
      tryParseToken(cxt, "null", parseForm, () => gen.assign(data, null));
    }
    function parseElements(cxt) {
      const { gen, schema, data } = cxt;
      parseToken(cxt, "[");
      const ix = gen.let("i", 0);
      gen.assign(data, (0, codegen_1._)`[]`);
      parseItems(cxt, "]", () => {
        const el = gen.let("el");
        parseCode({ ...cxt, schema: schema.elements, data: el });
        gen.assign((0, codegen_1._)`${data}[${ix}++]`, el);
      });
    }
    function parseValues(cxt) {
      const { gen, schema, data } = cxt;
      parseToken(cxt, "{");
      gen.assign(data, (0, codegen_1._)`{}`);
      parseItems(cxt, "}", () => parseKeyValue(cxt, schema.values));
    }
    function parseItems(cxt, endToken, block) {
      tryParseItems(cxt, endToken, block);
      parseToken(cxt, endToken);
    }
    function tryParseItems(cxt, endToken, block) {
      const { gen } = cxt;
      gen.for((0, codegen_1._)`;${names_1.default.jsonPos}<${names_1.default.jsonLen} && ${jsonSlice(1)}!==${endToken};`, () => {
        block();
        tryParseToken(cxt, ",", () => gen.break(), hasItem);
      });
      function hasItem() {
        tryParseToken(cxt, endToken, () => {
        }, jsonSyntaxError);
      }
    }
    function parseKeyValue(cxt, schema) {
      const { gen } = cxt;
      const key = gen.let("key");
      parseString({ ...cxt, data: key });
      parseToken(cxt, ":");
      parsePropertyValue(cxt, key, schema);
    }
    function parseDiscriminator(cxt) {
      const { gen, data, schema } = cxt;
      const { discriminator, mapping } = schema;
      parseToken(cxt, "{");
      gen.assign(data, (0, codegen_1._)`{}`);
      const startPos = gen.const("pos", names_1.default.jsonPos);
      const value = gen.let("value");
      const tag = gen.let("tag");
      tryParseItems(cxt, "}", () => {
        const key = gen.let("key");
        parseString({ ...cxt, data: key });
        parseToken(cxt, ":");
        gen.if(
          (0, codegen_1._)`${key} === ${discriminator}`,
          () => {
            parseString({ ...cxt, data: tag });
            gen.assign((0, codegen_1._)`${data}[${key}]`, tag);
            gen.break();
          },
          () => parseEmpty({ ...cxt, data: value })
          // can be discarded/skipped
        );
      });
      gen.assign(names_1.default.jsonPos, startPos);
      gen.if((0, codegen_1._)`${tag} === undefined`);
      parsingError(cxt, (0, codegen_1.str)`discriminator tag not found`);
      for (const tagValue in mapping) {
        gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
        parseSchemaProperties({ ...cxt, schema: mapping[tagValue] }, discriminator);
      }
      gen.else();
      parsingError(cxt, (0, codegen_1.str)`discriminator value not in schema`);
      gen.endIf();
    }
    function parseProperties(cxt) {
      const { gen, data } = cxt;
      parseToken(cxt, "{");
      gen.assign(data, (0, codegen_1._)`{}`);
      parseSchemaProperties(cxt);
    }
    function parseSchemaProperties(cxt, discriminator) {
      const { gen, schema, data } = cxt;
      const { properties, optionalProperties, additionalProperties } = schema;
      parseItems(cxt, "}", () => {
        const key = gen.let("key");
        parseString({ ...cxt, data: key });
        parseToken(cxt, ":");
        gen.if(false);
        parseDefinedProperty(cxt, key, properties);
        parseDefinedProperty(cxt, key, optionalProperties);
        if (discriminator) {
          gen.elseIf((0, codegen_1._)`${key} === ${discriminator}`);
          const tag = gen.let("tag");
          parseString({ ...cxt, data: tag });
        }
        gen.else();
        if (additionalProperties) {
          parseEmpty({ ...cxt, data: (0, codegen_1._)`${data}[${key}]` });
        } else {
          parsingError(cxt, (0, codegen_1.str)`property ${key} not allowed`);
        }
        gen.endIf();
      });
      if (properties) {
        const hasProp = (0, code_1.hasPropFunc)(gen);
        const allProps = (0, codegen_1.and)(...Object.keys(properties).map((p) => (0, codegen_1._)`${hasProp}.call(${data}, ${p})`));
        gen.if((0, codegen_1.not)(allProps), () => parsingError(cxt, (0, codegen_1.str)`missing required properties`));
      }
    }
    function parseDefinedProperty(cxt, key, schemas = {}) {
      const { gen } = cxt;
      for (const prop in schemas) {
        gen.elseIf((0, codegen_1._)`${key} === ${prop}`);
        parsePropertyValue(cxt, key, schemas[prop]);
      }
    }
    function parsePropertyValue(cxt, key, schema) {
      parseCode({ ...cxt, schema, data: (0, codegen_1._)`${cxt.data}[${key}]` });
    }
    function parseType(cxt) {
      const { gen, schema, data, self } = cxt;
      switch (schema.type) {
        case "boolean":
          parseBoolean(cxt);
          break;
        case "string":
          parseString(cxt);
          break;
        case "timestamp": {
          parseString(cxt);
          const vts = (0, util_1.useFunc)(gen, timestamp_1.default);
          const { allowDate, parseDate } = self.opts;
          const notValid = allowDate ? (0, codegen_1._)`!${vts}(${data}, true)` : (0, codegen_1._)`!${vts}(${data})`;
          const fail = parseDate ? (0, codegen_1.or)(notValid, (0, codegen_1._)`(${data} = new Date(${data}), false)`, (0, codegen_1._)`isNaN(${data}.valueOf())`) : notValid;
          gen.if(fail, () => parsingError(cxt, (0, codegen_1.str)`invalid timestamp`));
          break;
        }
        case "float32":
        case "float64":
          parseNumber(cxt);
          break;
        default: {
          const t = schema.type;
          if (!self.opts.int32range && (t === "int32" || t === "uint32")) {
            parseNumber(cxt, 16);
            if (t === "uint32") {
              gen.if((0, codegen_1._)`${data} < 0`, () => parsingError(cxt, (0, codegen_1.str)`integer out of range`));
            }
          } else {
            const [min, max, maxDigits] = type_1.intRange[t];
            parseNumber(cxt, maxDigits);
            gen.if((0, codegen_1._)`${data} < ${min} || ${data} > ${max}`, () => parsingError(cxt, (0, codegen_1.str)`integer out of range`));
          }
        }
      }
    }
    function parseString(cxt) {
      parseToken(cxt, '"');
      parseWith(cxt, parseJson_1.parseJsonString);
    }
    function parseEnum(cxt) {
      const { gen, data, schema } = cxt;
      const enumSch = schema.enum;
      parseToken(cxt, '"');
      gen.if(false);
      for (const value of enumSch) {
        const valueStr = JSON.stringify(value).slice(1);
        gen.elseIf((0, codegen_1._)`${jsonSlice(valueStr.length)} === ${valueStr}`);
        gen.assign(data, (0, codegen_1.str)`${value}`);
        gen.add(names_1.default.jsonPos, valueStr.length);
      }
      gen.else();
      jsonSyntaxError(cxt);
      gen.endIf();
    }
    function parseNumber(cxt, maxDigits) {
      const { gen } = cxt;
      skipWhitespace(cxt);
      gen.if((0, codegen_1._)`"-0123456789".indexOf(${jsonSlice(1)}) < 0`, () => jsonSyntaxError(cxt), () => parseWith(cxt, parseJson_1.parseJsonNumber, maxDigits));
    }
    function parseBooleanToken(bool, fail) {
      return (cxt) => {
        const { gen, data } = cxt;
        tryParseToken(cxt, `${bool}`, () => fail(cxt), () => gen.assign(data, bool));
      };
    }
    function parseRef(cxt) {
      const { gen, self, definitions, schema, schemaEnv } = cxt;
      const { ref } = schema;
      const refSchema = definitions[ref];
      if (!refSchema)
        throw new ref_error_1.default(self.opts.uriResolver, "", ref, `No definition ${ref}`);
      if (!(0, ref_1.hasRef)(refSchema))
        return parseCode({ ...cxt, schema: refSchema });
      const { root } = schemaEnv;
      const sch = compileParser.call(self, new __1.SchemaEnv({ schema: refSchema, root }), definitions);
      partialParse(cxt, getParser(gen, sch), true);
    }
    function getParser(gen, sch) {
      return sch.parse ? gen.scopeValue("parse", { ref: sch.parse }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.parse`;
    }
    function parseEmpty(cxt) {
      parseWith(cxt, parseJson_1.parseJson);
    }
    function parseWith(cxt, parseFunc, args) {
      partialParse(cxt, (0, util_1.useFunc)(cxt.gen, parseFunc), args);
    }
    function partialParse(cxt, parseFunc, args) {
      const { gen, data } = cxt;
      gen.assign(data, (0, codegen_1._)`${parseFunc}(${names_1.default.json}, ${names_1.default.jsonPos}${args ? (0, codegen_1._)`, ${args}` : codegen_1.nil})`);
      gen.assign(names_1.default.jsonPos, (0, codegen_1._)`${parseFunc}.position`);
      gen.if((0, codegen_1._)`${data} === undefined`, () => parsingError(cxt, (0, codegen_1._)`${parseFunc}.message`));
    }
    function parseToken(cxt, tok) {
      tryParseToken(cxt, tok, jsonSyntaxError);
    }
    function tryParseToken(cxt, tok, fail, success) {
      const { gen } = cxt;
      const n = tok.length;
      skipWhitespace(cxt);
      gen.if((0, codegen_1._)`${jsonSlice(n)} === ${tok}`, () => {
        gen.add(names_1.default.jsonPos, n);
        success === null || success === void 0 ? void 0 : success(cxt);
      }, () => fail(cxt));
    }
    function skipWhitespace({ gen, char: c }) {
      gen.code((0, codegen_1._)`while((${c}=${names_1.default.json}[${names_1.default.jsonPos}],${c}===" "||${c}==="\\n"||${c}==="\\r"||${c}==="\\t"))${names_1.default.jsonPos}++;`);
    }
    function jsonSlice(len) {
      return len === 1 ? (0, codegen_1._)`${names_1.default.json}[${names_1.default.jsonPos}]` : (0, codegen_1._)`${names_1.default.json}.slice(${names_1.default.jsonPos}, ${names_1.default.jsonPos}+${len})`;
    }
    function jsonSyntaxError(cxt) {
      parsingError(cxt, (0, codegen_1._)`"unexpected token " + ${names_1.default.json}[${names_1.default.jsonPos}]`);
    }
    function parsingError({ gen, parseName }, msg) {
      gen.assign((0, codegen_1._)`${parseName}.message`, msg);
      gen.assign((0, codegen_1._)`${parseName}.position`, names_1.default.jsonPos);
      gen.return(undef);
    }
  }
});

// ../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/jtd.js
var require_jtd2 = __commonJS({
  "../../node_modules/.bun/ajv@8.20.0/node_modules/ajv/dist/jtd.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    var core_1 = require_core();
    var jtd_1 = require_jtd();
    var jtd_schema_1 = require_jtd_schema();
    var serialize_1 = require_serialize();
    var parse_1 = require_parse();
    var META_SCHEMA_ID = "JTD-meta-schema";
    var Ajv3 = class extends core_1.default {
      constructor(opts = {}) {
        super({
          ...opts,
          jtd: true
        });
      }
      _addVocabularies() {
        super._addVocabularies();
        this.addVocabulary(jtd_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        this.addMetaSchema(jtd_schema_1.default, META_SCHEMA_ID, false);
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
      compileSerializer(schema) {
        const sch = this._addSchema(schema);
        return sch.serialize || this._compileSerializer(sch);
      }
      compileParser(schema) {
        const sch = this._addSchema(schema);
        return sch.parse || this._compileParser(sch);
      }
      _compileSerializer(sch) {
        serialize_1.default.call(this, sch, sch.schema.definitions || {});
        if (!sch.serialize)
          throw new Error("ajv implementation error");
        return sch.serialize;
      }
      _compileParser(sch) {
        parse_1.default.call(this, sch, sch.schema.definitions || {});
        if (!sch.parse)
          throw new Error("ajv implementation error");
        return sch.parse;
      }
    };
    exports.Ajv = Ajv3;
    module.exports = exports = Ajv3;
    module.exports.Ajv = Ajv3;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv3;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  }
});

// src/utils/harnessUsage.ts
var import_jtd2 = __toESM(require_jtd2(), 1);
import { execFile } from "child_process";
import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { homedir, userInfo } from "os";
import { join } from "path";
import { promisify } from "util";

// src/utils/usageBudget.ts
var import_jtd = __toESM(require_jtd2(), 1);
var windowSchema = {
  nullable: true,
  properties: { utilization: { type: "float64" } },
  optionalProperties: { resets_at: { type: "string", nullable: true } },
  additionalProperties: true
};
var usageSchema = {
  properties: { five_hour: windowSchema, seven_day: windowSchema },
  additionalProperties: true
};
var parseUsage = new import_jtd.default().compileParser(usageSchema);
var unknownUsage = (reason) => ({ status: "unknown", reason });
function parseHarnessUsage(text) {
  const usage = parseUsage(text);
  if (!usage) return unknownUsage("invalid_usage_response");
  const normalize = (window) => {
    if (window === null) return null;
    return {
      usedPercent: window.utilization,
      remainingPercent: 100 - window.utilization,
      resetsAt: window.resets_at ?? null
    };
  };
  const session = normalize(usage.five_hour);
  const weekly = normalize(usage.seven_day);
  return knownUsage("claude-code", session, weekly);
}
function knownUsage(harness, session, weekly, planTier = null) {
  const windows = [session, weekly].filter((window) => window !== null);
  if (!windows.length || windows.some(
    (window) => !Number.isFinite(window.remainingPercent) || window.remainingPercent < 0 || window.remainingPercent > 100
  ))
    return unknownUsage("invalid_usage_response");
  return { status: "known", harness, session, weekly, planTier };
}
var codexWindowSchema = {
  nullable: true,
  properties: { used_percent: { type: "float64" } },
  optionalProperties: {
    limit_window_seconds: { type: "float64" },
    reset_at: { type: "float64" },
    reset_after_seconds: { type: "float64" }
  },
  additionalProperties: true
};
var codexSchema = {
  optionalProperties: { plan_type: { type: "string", nullable: true } },
  properties: {
    rate_limit: {
      optionalProperties: {
        primary_window: codexWindowSchema,
        secondary_window: codexWindowSchema
      },
      additionalProperties: true
    }
  },
  additionalProperties: true
};
var grokSchema = {
  properties: {
    config: {
      properties: {
        currentPeriod: {
          properties: {
            type: { type: "string" },
            start: { type: "string" },
            end: { type: "string" }
          },
          additionalProperties: true
        }
      },
      optionalProperties: { creditUsagePercent: { type: "float64" } },
      additionalProperties: true
    }
  },
  additionalProperties: true
};
var parser = new import_jtd.default();
var parseCodex = parser.compileParser(codexSchema);
var parseGrok = parser.compileParser(grokSchema);
function codexWindowKind(seconds, index) {
  switch (seconds) {
    case 18e3:
      return "session";
    case 604800:
      return "weekly";
    case void 0:
      return index === 0 ? "session" : "weekly";
    default:
      return "unknown";
  }
}
function normalizeCodexWindow(raw, now) {
  const reset = raw.reset_at ?? (raw.reset_after_seconds === void 0 ? void 0 : now / 1e3 + raw.reset_after_seconds);
  if (reset !== void 0 && (!Number.isFinite(reset) || Math.abs(reset * 1e3) > 864e13))
    return null;
  return {
    usedPercent: raw.used_percent,
    remainingPercent: 100 - raw.used_percent,
    resetsAt: reset === void 0 ? null : new Date(reset * 1e3).toISOString()
  };
}
function parseCodexUsage(text, now = Date.now()) {
  const usage = parseCodex(text);
  if (!usage) return unknownUsage("invalid_usage_response");
  const windows = {
    session: null,
    weekly: null
  };
  for (const [index, raw] of [
    usage.rate_limit.primary_window,
    usage.rate_limit.secondary_window
  ].entries()) {
    if (!raw) continue;
    const kind = codexWindowKind(raw.limit_window_seconds, index);
    if (kind === "unknown") return unknownUsage("unsupported_usage_window");
    const window = normalizeCodexWindow(raw, now);
    if (window === null || windows[kind] !== null) return unknownUsage("invalid_usage_response");
    windows[kind] = window;
  }
  return knownUsage("codex", windows.session, windows.weekly, usage.plan_type ?? null);
}
function parseGrokUsage(text) {
  const usage = parseGrok(text);
  if (!usage) return unknownUsage("invalid_usage_response");
  const period = usage.config.currentPeriod;
  const start = Date.parse(period.start);
  const end = Date.parse(period.end);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start)
    return unknownUsage("invalid_usage_response");
  if (period.type !== "USAGE_PERIOD_TYPE_WEEKLY") return unknownUsage("unsupported_usage_window");
  return knownUsage("grok", null, {
    usedPercent: usage.config.creditUsagePercent ?? 0,
    remainingPercent: 100 - (usage.config.creditUsagePercent ?? 0),
    resetsAt: new Date(end).toISOString()
  });
}

// src/utils/harnessUsage.ts
var credentialSchema = {
  properties: {
    claudeAiOauth: {
      properties: { accessToken: { type: "string" } },
      optionalProperties: {
        expiresAt: { type: "float64" },
        scopes: { elements: { type: "string" } },
        subscriptionType: { type: "string", nullable: true }
      },
      additionalProperties: true
    }
  },
  additionalProperties: true
};
var parseCredentials = new import_jtd2.default().compileParser(
  credentialSchema
);
var exec = promisify(execFile);
async function readHarnessUsage(harness) {
  switch (harness) {
    case "claude-code":
      return readClaudeUsage();
    case "codex":
    case "grok":
      return readOtherHarness(harness);
    default:
      return unknownUsage("unsupported_harness");
  }
}
async function readClaudeUsage() {
  if ([
    "ANTHROPIC_API_KEY",
    "ANTHROPIC_AUTH_TOKEN",
    "ANTHROPIC_BASE_URL",
    "CLAUDE_CODE_CUSTOM_OAUTH_URL",
    "USE_LOCAL_OAUTH",
    "USE_STAGING_OAUTH"
  ].some((key) => process.env[key]))
    return unknownUsage("unsupported_auth");
  const candidates = await readClaudeCandidates(process.env.CLAUDE_CONFIG_DIR);
  let reason = "no_subscription_login";
  for (const text of candidates) {
    const login = claudeLogin(text);
    if (login.status === "unavailable") {
      reason = login.reason;
      continue;
    }
    const usage = await requestUsage("claude-code", login.credential);
    if (usage.status === "unknown" && ["http_401", "http_403"].includes(usage.reason)) {
      reason = usage.reason;
      continue;
    }
    return usage;
  }
  return unknownUsage(reason);
}
async function readClaudeCandidates(configDir) {
  const candidates = [];
  if (process.platform === "darwin") {
    let service = "Claude Code-credentials";
    if (configDir)
      service += `-${createHash("sha256").update(configDir.normalize("NFC")).digest("hex").slice(0, 8)}`;
    for (const accountArgs of [["-a", userInfo().username], []]) {
      try {
        const { stdout } = await exec(
          "/usr/bin/security",
          ["find-generic-password", "-s", service, ...accountArgs, "-w"],
          {
            timeout: 2e3,
            maxBuffer: 1024 * 1024
          }
        );
        candidates.push(stdout);
      } catch {
      }
    }
  }
  try {
    candidates.push(
      await readFile(join(configDir ?? join(homedir(), ".claude"), ".credentials.json"), "utf8")
    );
  } catch {
  }
  return candidates;
}
var authParser = new import_jtd2.default();
var codexAuthSchema = {
  properties: {
    tokens: {
      properties: { access_token: { type: "string" } },
      optionalProperties: { account_id: { type: "string" } },
      additionalProperties: true
    }
  },
  additionalProperties: true
};
var grokAuthSchema = {
  values: {
    optionalProperties: {
      key: { type: "string" },
      auth_mode: { type: "string" },
      oidc_issuer: { type: "string" },
      expires_at: { type: "string" },
      expires: { type: "string" }
    },
    additionalProperties: true
  }
};
var jwtSchema = {
  optionalProperties: { exp: { type: "float64" } },
  additionalProperties: true
};
var parseCodexAuth = authParser.compileParser(codexAuthSchema);
var parseGrokAuth = authParser.compileParser(grokAuthSchema);
var parseJwt = authParser.compileParser(jwtSchema);
var grokSettingsSchema = {
  optionalProperties: { subscription_tier_display: { type: "string", nullable: true } },
  additionalProperties: true
};
var parseGrokSettings = authParser.compileParser(grokSettingsSchema);
function tokenExpiry(token) {
  const parts = token.split(".");
  const payload = parts[1];
  if (parts.length !== 3 || payload === void 0) return void 0;
  const expiry = parseJwt(Buffer.from(payload, "base64url").toString("utf8"))?.exp;
  return expiry === void 0 ? void 0 : expiry * 1e3;
}
function validLogin(credential, now) {
  if (credential.expiresAt !== void 0) {
    if (!Number.isFinite(credential.expiresAt))
      return { status: "unavailable", reason: "invalid_login" };
    if (credential.expiresAt <= now) return { status: "unavailable", reason: "expired_login" };
  }
  return { status: "ready", credential };
}
function claudeLogin(text) {
  const auth = parseCredentials(text)?.claudeAiOauth;
  if (!auth?.accessToken.trim()) return { status: "unavailable", reason: "no_subscription_login" };
  if (auth.scopes !== void 0 && !auth.scopes.includes("user:profile"))
    return { status: "unavailable", reason: "missing_profile_scope" };
  return validLogin(
    {
      token: auth.accessToken.trim(),
      headers: { "anthropic-beta": "oauth-2025-04-20" },
      expiresAt: auth.expiresAt,
      planTier: auth.subscriptionType ?? void 0
    },
    Date.now()
  );
}
function codexLogin(text) {
  const auth = parseCodexAuth(text)?.tokens;
  if (!auth?.access_token.trim()) return { status: "unavailable", reason: "no_subscription_login" };
  const token = auth.access_token.trim();
  const headers = {};
  if (auth.account_id) headers["ChatGPT-Account-Id"] = auth.account_id;
  return validLogin({ token, headers, expiresAt: tokenExpiry(token) }, Date.now());
}
function grokLogin(text) {
  const auth = parseGrokAuth(text);
  if (!auth) return { status: "unavailable", reason: "invalid_login" };
  const candidates = Object.values(auth).flatMap((entry2) => {
    const token2 = entry2.key?.trim();
    if (!token2 || !["oidc", "external"].includes(entry2.auth_mode ?? "") || entry2.oidc_issuer !== "https://auth.x.ai")
      return [];
    return [{ entry: entry2, token: token2 }];
  });
  if (!candidates.length) return { status: "unavailable", reason: "unsupported_auth" };
  const candidate = candidates[0];
  if (candidates.length !== 1 || candidate === void 0)
    return { status: "unavailable", reason: "ambiguous_login" };
  const { entry, token } = candidate;
  const storedExpiry = entry.expires_at ?? entry.expires;
  const expiresAt = tokenExpiry(token) ?? (storedExpiry === void 0 ? void 0 : Date.parse(storedExpiry));
  return validLogin(
    { token, headers: { "X-XAI-Token-Auth": "xai-grok-cli" }, expiresAt },
    Date.now()
  );
}
async function readOtherHarness(harness) {
  const path = harness === "codex" ? join(process.env.CODEX_HOME || join(homedir(), ".codex"), "auth.json") : process.env.GROK_AUTH_PATH || join(process.env.GROK_HOME || join(homedir(), ".grok"), "auth.json");
  let text;
  try {
    text = await readFile(path, "utf8");
  } catch {
    return unknownUsage("no_subscription_login");
  }
  const login = harness === "codex" ? codexLogin(text) : grokLogin(text);
  if (login.status === "unavailable") return unknownUsage(login.reason);
  return requestUsage(harness, login.credential);
}
var providers = {
  "claude-code": { url: "https://api.anthropic.com/api/oauth/usage", parse: parseHarnessUsage },
  codex: { url: "https://chatgpt.com/backend-api/wham/usage", parse: parseCodexUsage },
  grok: { url: "https://cli-chat-proxy.grok.com/v1/billing?format=credits", parse: parseGrokUsage }
};
async function requestUsage(harness, credential) {
  let response;
  let body;
  try {
    ({ response, body } = await requestProvider(providers[harness].url, credential));
  } catch {
    return unknownUsage("usage_request_failed");
  }
  if (!response.ok) {
    if (harness === "grok" && response.status === 412 && body.toLowerCase().includes("no personal team"))
      return unknownUsage("team_quota_unavailable");
    return unknownUsage(`http_${response.status}`);
  }
  const usage = providers[harness].parse(body);
  if (usage.status === "unknown") return usage;
  if (harness === "grok") return { ...usage, planTier: await readGrokPlanTier(credential) };
  return { ...usage, planTier: credential.planTier ?? usage.planTier };
}
async function requestProvider(url, credential) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      ...credential.headers,
      Authorization: `Bearer ${credential.token}`
    },
    signal: AbortSignal.timeout(5e3),
    redirect: "error"
  });
  return { response, body: await response.text() };
}
async function readGrokPlanTier(credential) {
  let result;
  try {
    result = await requestProvider("https://cli-chat-proxy.grok.com/v1/settings", credential);
  } catch {
    return null;
  }
  if (!result.response.ok) return null;
  return parseGrokSettings(result.body)?.subscription_tier_display?.trim() || null;
}

// src/commands/usage.ts
var usage_default = defineCommand({
  meta: {
    name: "usage",
    description: "Read remaining harness subscription usage without telemetry"
  },
  args: {
    harness: {
      type: "string",
      description: "Harness to read (claude-code, codex, grok); otherwise detect the current harness"
    },
    json: { type: "boolean", description: "Print subscription usage as JSON", default: false }
  },
  async run({ args }) {
    const harness = args.harness ?? detectHarness();
    const usage = await readHarnessUsage(harness);
    if (args.json) console.log(JSON.stringify(usage));
    else if (usage.status === "unknown") console.log(`Usage unknown (${usage.reason}).`);
    else console.log(JSON.stringify(usage, null, 2));
  }
});
function detectHarness() {
  if (process.env.CODEX_THREAD_ID) return "codex";
  if (process.env.GROK_AGENT === "1") return "grok";
  if (process.env.CLAUDECODE) return "claude-code";
  return "unknown";
}
export {
  usage_default as default
};
