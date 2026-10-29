import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  __commonJS
} from "./chunk-M2WBOQ2Q.js";

// ../../node_modules/.bun/bpm-detective@2.0.5/node_modules/bpm-detective/lib/detect.js
var require_detect = __commonJS({
  "../../node_modules/.bun/bpm-detective@2.0.5/node_modules/bpm-detective/lib/detect.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = detect;
    var OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    function detect(buffer) {
      var source = getLowPassSource(buffer);
      source.start(0);
      return [findPeaks, identifyIntervals, groupByTempo(buffer.sampleRate), getTopCandidate].reduce(function(state, fn) {
        return fn(state);
      }, source.buffer.getChannelData(0));
    }
    function getTopCandidate(candidates) {
      return candidates.sort(function(a, b) {
        return b.count - a.count;
      }).splice(0, 5)[0].tempo;
    }
    function getLowPassSource(buffer) {
      var length = buffer.length, numberOfChannels = buffer.numberOfChannels, sampleRate = buffer.sampleRate;
      var context = new OfflineContext(numberOfChannels, length, sampleRate);
      var source = context.createBufferSource();
      source.buffer = buffer;
      var filter = context.createBiquadFilter();
      filter.type = "lowpass";
      source.connect(filter);
      filter.connect(context.destination);
      return source;
    }
    function findPeaks(data) {
      var peaks = [];
      var threshold = 0.9;
      var minThresold = 0.3;
      var minPeaks = 15;
      while (peaks.length < minPeaks && threshold >= minThresold) {
        peaks = findPeaksAtThreshold(data, threshold);
        threshold -= 0.05;
      }
      if (peaks.length < minPeaks) {
        throw new Error("Could not find enough samples for a reliable detection.");
      }
      return peaks;
    }
    function findPeaksAtThreshold(data, threshold) {
      var peaks = [];
      for (var i = 0, l = data.length; i < l; i += 1) {
        if (data[i] > threshold) {
          peaks.push(i);
          i += 1e4;
        }
      }
      return peaks;
    }
    function identifyIntervals(peaks) {
      var intervals = [];
      peaks.forEach(function(peak, index) {
        var _loop = function _loop2(i2) {
          var interval = peaks[index + i2] - peak;
          var foundInterval = intervals.some(function(intervalCount) {
            if (intervalCount.interval === interval) {
              return intervalCount.count += 1;
            }
          });
          if (!foundInterval) {
            intervals.push({
              interval,
              count: 1
            });
          }
        };
        for (var i = 0; i < 10; i += 1) {
          _loop(i);
        }
      });
      return intervals;
    }
    function groupByTempo(sampleRate) {
      return function(intervalCounts) {
        var tempoCounts = [];
        intervalCounts.forEach(function(intervalCount) {
          if (intervalCount.interval !== 0) {
            var theoreticalTempo = 60 / (intervalCount.interval / sampleRate);
            while (theoreticalTempo < 90) {
              theoreticalTempo *= 2;
            }
            while (theoreticalTempo > 180) {
              theoreticalTempo /= 2;
            }
            theoreticalTempo = Math.round(theoreticalTempo);
            var foundTempo = tempoCounts.some(function(tempoCount) {
              if (tempoCount.tempo === theoreticalTempo) {
                return tempoCount.count += intervalCount.count;
              }
            });
            if (!foundTempo) {
              tempoCounts.push({
                tempo: theoreticalTempo,
                count: intervalCount.count
              });
            }
          }
        });
        return tempoCounts;
      };
    }
  }
});

// ../../node_modules/.bun/bpm-detective@2.0.5/node_modules/bpm-detective/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/.bun/bpm-detective@2.0.5/node_modules/bpm-detective/lib/index.js"(exports, module) {
    module.exports = require_detect().default;
  }
});
export default require_lib();
