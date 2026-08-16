(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

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

  // ../core/src/beats/beatDetection.ts
  var bpmDetectivePromise = null;
  function loadBpmDetective() {
    if (!bpmDetectivePromise) {
      bpmDetectivePromise = Promise.resolve().then(() => __toESM(require_lib(), 1)).then((m) => (m.default ?? m) || null).catch(() => null);
    }
    return bpmDetectivePromise;
  }
  var WINDOW_SIZE = 1024;
  var HOP_SIZE = 512;
  var STRENGTH_WINDOW_S = 0.05;
  function computeRmsAt(channelData, sampleRate, time) {
    const halfWindow = Math.floor(sampleRate * STRENGTH_WINDOW_S);
    const center = Math.floor(time * sampleRate);
    const start = Math.max(0, center - halfWindow);
    const end = Math.min(channelData.length, center + halfWindow);
    let sum = 0;
    for (let i = start; i < end; i++) {
      const s = channelData[i] ?? 0;
      sum += s * s;
    }
    return Math.sqrt(sum / Math.max(end - start, 1));
  }
  async function detectBeats(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const energies = [];
    for (let i = 0; i < channelData.length - WINDOW_SIZE; i += HOP_SIZE) {
      let sum = 0;
      for (let j = 0; j < WINDOW_SIZE; j++) {
        const sample = channelData[i + j];
        sum += sample * sample;
      }
      energies.push(sum / WINDOW_SIZE);
    }
    const beats = [];
    const localWindowSize = 20;
    for (let i = localWindowSize; i < energies.length - localWindowSize; i++) {
      let localMean = 0;
      for (let j = i - localWindowSize; j < i + localWindowSize; j++) {
        localMean += energies[j];
      }
      localMean /= localWindowSize * 2;
      const threshold = localMean * 1.5;
      const current = energies[i];
      if (current > threshold && current > (energies[i - 1] ?? 0) && current > (energies[i + 1] ?? 0)) {
        const timeInSeconds = i * HOP_SIZE / sampleRate;
        if (beats.length === 0 || timeInSeconds - beats[beats.length - 1] > 0.1) {
          beats.push(Math.round(timeInSeconds * 1e3) / 1e3);
        }
      }
    }
    return beats;
  }
  function computeBpmFromBeats(beatTimes) {
    if (beatTimes.length < 4) return null;
    const iois = [];
    for (let i = 1; i < beatTimes.length; i++) {
      iois.push(beatTimes[i] - beatTimes[i - 1]);
    }
    const sorted = [...iois].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const medianIoi = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    if (medianIoi <= 0) return null;
    return Math.round(60 / medianIoi * 10) / 10;
  }
  function canonicalizeBpm(bpm) {
    let b = bpm;
    while (b > 120) b /= 2;
    while (b < 60) b *= 2;
    return b;
  }
  function octaveAlignBpm(bpm, reference) {
    const candidates = [bpm / 2, bpm, bpm * 2];
    let best = bpm;
    let bestDist = Number.POSITIVE_INFINITY;
    for (const c of candidates) {
      if (c <= 0) continue;
      const dist = Math.abs(c - reference);
      if (dist < bestDist) {
        bestDist = dist;
        best = c;
      }
    }
    return best;
  }
  function regularizeBeats(rawBeats, bpm, duration) {
    if (rawBeats.length === 0 || bpm <= 0 || duration <= 0) return rawBeats;
    const beatInterval = 60 / bpm;
    if (beatInterval < 0.125) return rawBeats;
    const threshold = beatInterval * 0.25;
    let bestOffset = 0;
    let bestScore = -1;
    for (const anchor of rawBeats.slice(0, 10)) {
      const offset = (anchor % beatInterval + beatInterval) % beatInterval;
      let score = 0;
      for (const rb of rawBeats) {
        const phase = (rb % beatInterval + beatInterval) % beatInterval;
        const dist = Math.min(Math.abs(phase - offset), beatInterval - Math.abs(phase - offset));
        if (dist < threshold) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        bestOffset = offset;
      }
    }
    const beats = [];
    for (let t = bestOffset; t <= duration + 1e-3; t += beatInterval) {
      beats.push(Math.round(t * 1e3) / 1e3);
    }
    return beats;
  }
  function gateBeatsBySilence(beats, channelData, sampleRate) {
    if (beats.length === 0) return { times: beats, strengths: [], peak: 1e-6 };
    const energies = beats.map((t) => computeRmsAt(channelData, sampleRate, t));
    const peak = Math.max(...energies, 1e-6);
    const threshold = peak * 0.12;
    const times = [];
    const strengths = [];
    for (let i = 0; i < beats.length; i++) {
      if (energies[i] >= threshold) {
        times.push(beats[i]);
        strengths.push(Math.min(1, energies[i] / peak));
      }
    }
    return { times, strengths, peak };
  }
  async function analyzeMusicFromBuffer(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const duration = audioBuffer.duration;
    const rawBeats = await detectBeats(audioBuffer);
    const onsetBpm = computeBpmFromBeats(rawBeats);
    let detectiveBpm = null;
    try {
      const detect = await loadBpmDetective();
      if (detect) detectiveBpm = detect(audioBuffer);
    } catch {
    }
    let bpm = onsetBpm;
    let confidence = "uncertain";
    let regularizeBpm = null;
    if (onsetBpm !== null && detectiveBpm !== null) {
      const pctDiff = Math.abs(canonicalizeBpm(onsetBpm) - canonicalizeBpm(detectiveBpm)) / canonicalizeBpm(detectiveBpm);
      if (pctDiff < 0.05) {
        bpm = octaveAlignBpm(detectiveBpm, onsetBpm);
        confidence = "high";
        regularizeBpm = bpm;
      } else if (pctDiff < 0.1) {
        bpm = Math.round((onsetBpm + detectiveBpm) / 2);
        confidence = "low";
        regularizeBpm = bpm;
      } else {
        bpm = onsetBpm;
        confidence = "uncertain";
      }
    } else if (onsetBpm !== null) {
      bpm = onsetBpm;
      confidence = "low";
      regularizeBpm = onsetBpm;
    } else if (detectiveBpm !== null) {
      bpm = detectiveBpm;
      confidence = "low";
      regularizeBpm = detectiveBpm;
    }
    const gridBeats = regularizeBpm !== null ? regularizeBeats(rawBeats, regularizeBpm, duration) : rawBeats;
    const gated = gateBeatsBySilence(gridBeats, channelData, sampleRate);
    return {
      beatTimes: gated.times,
      beatStrengths: gated.strengths,
      bpm,
      bpmConfidence: confidence,
      channelData,
      sampleRate,
      peak: gated.peak
    };
  }

  // <stdin>
  globalThis.__hfAnalyze = analyzeMusicFromBuffer;
})();
