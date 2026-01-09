<template>
  <div
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="text-xs tracking-widest opacity-60">GUITAR TUNER</span>
        <div
          v-if="isLoading"
          class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
        ></div>
      </div>

      <!-- ON / OFF -->
      <!-- <button
        @click="togglePower"
        class="text-xs px-3 py-1 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95"
        :class="
          isOn
            ? 'text-green-400 border-green-400/30 bg-green-400/10'
            : 'text-red-400 border-red-400/30 bg-red-400/10'
        "
        :aria-label="isOn ? 'Turn tuner off' : 'Turn tuner on'"
        :aria-pressed="isOn"
      >
        {{ isOn ? "ON" : "OFF" }}
      </button> -->

      <Switch @click="togglePower" />
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="mb-3 p-2 bg-red-900/30 border border-red-400/30 rounded-lg"
    >
      <p class="text-xs text-red-300">{{ errorMessage }}</p>
      <button
        @click="errorMessage = ''"
        class="text-xs text-red-400 hover:text-red-300 mt-1"
      >
        Dismiss
      </button>
    </div>

    <!-- Tuning selector -->
    <div class="mb-3">
      <select
        v-model="selectedTuning"
        :disabled="!isOn"
        class="w-full text-xs bg-black/50 border border-white/20 rounded-full px-3 py-2 transition-all hover:border-white/30 disabled:opacity-50"
      >
        <option v-for="t in Object.keys(tunings)" :key="t">
          {{ t }}
        </option>
      </select>
      <p class="text-[10px] opacity-50 mt-1 ml-1">
        {{ Object.keys(currentTuning).join(" • ") }}
      </p>
    </div>

    <!-- String Indicators -->
    <div class="grid grid-cols-6 gap-1 mb-3">
      <div
        v-for="(stringName, idx) in Object.keys(currentTuning)"
        :key="idx"
        class="string-indicator text-center py-1 rounded transition-all duration-300"
        :class="{
          'bg-green-900/40 ring-1 ring-green-400/30':
            currentString === stringName && isOn,
          'bg-white/5': currentString !== stringName || !isOn,
        }"
      >
        <span class="text-xs font-semibold">{{
          stringName.replace(/\d/g, "")
        }}</span>
        <div class="text-[10px] opacity-60">
          {{ Math.round(currentTuning[stringName]) }}
        </div>
      </div>
    </div>

    <!-- Accuracy Meter -->
    <div class="relative h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
      <div
        class="absolute h-full transition-all duration-300 ease-out"
        :class="accuracyColor"
        :style="{
          width: accuracyWidth + '%',
          left: '50%',
          transform: 'translateX(-50%)',
          transformOrigin: 'center',
        }"
      />
    </div>

    <!-- Note Display -->
    <div class="text-center mb-2">
      <p class="text-xs tracking-[0.25em] uppercase opacity-60 mb-1">
        {{ isOn ? currentString || "Play a string" : "Tuner Off" }}
      </p>
      <h1
        class="text-4xl font-bold mb-1"
        :class="isOn ? noteColor : 'opacity-30'"
      >
        {{ isOn ? note || "—" : "—" }}
      </h1>
      <p class="text-sm font-semibold" :class="statusColor">
        {{ statusText }}
      </p>
    </div>

    <!-- Needle -->
    <div class="relative h-28 mb-3">
      <!-- Center line -->
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-white/20 rounded-full"
      />

      <!-- Ticks -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20">
        <div
          v-for="tick in [-45, -30, -15, 0, 15, 30, 45]"
          :key="tick"
          class="absolute bottom-0 w-px h-3 bg-white/20"
          :style="{
            left: '50%',
            transform: `translateX(-50%) rotate(${tick}deg)`,
          }"
        />
      </div>

      <!-- Needle -->
      <div
        class="absolute bottom-0 left-1/2 w-1 h-20 origin-bottom rounded-full transition-transform duration-200 ease-out"
        :class="needleColor"
        :style="{
          transform: `translateX(-50%) rotate(${needleRotation}deg)`,
          boxShadow: '0 0 10px currentColor',
        }"
      />

      <!-- Center dot -->
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"
      />
    </div>

    <!-- Info Row -->
    <div class="flex justify-between items-center">
      <div class="text-left">
        <p class="text-[10px] tracking-widest opacity-50">
          {{ frequency ? frequency.toFixed(1) + " Hz" : "— Hz" }}
        </p>
        <p v-if="isOn" class="text-[10px] tracking-widest opacity-50">
          {{
            Math.abs(cents) > 0.1 ? cents.toFixed(1) + " cents" : "±0.0 cents"
          }}
        </p>
      </div>

      <!-- Sensitivity Control -->
      <div class="text-right">
        <div class="flex items-center gap-2">
          <span class="text-[10px] opacity-50">Sens</span>
          <input
            type="range"
            v-model="sensitivity"
            min="0.001"
            max="0.05"
            step="0.001"
            class="w-16 accent-green-500 opacity-70 hover:opacity-100"
            :disabled="!isOn"
          />
        </div>
        <p class="text-[10px] opacity-50 mt-1">RMS: {{ rms.toFixed(4) }}</p>
      </div>
    </div>

    <!-- Strobe Indicator -->
    <div
      v-if="isOn && Math.abs(cents) <= IN_TUNE_RANGE && frequency"
      class="strobe-indicator mt-2 flex justify-center"
    >
      <div
        class="strobe-light w-2 h-2 rounded-full"
        :style="{
          animationDuration: `${0.5 + Math.abs(cents) / 50}s`,
          backgroundColor: statusColor,
        }"
      />
    </div>

    <!-- Accessibility Announcement (hidden) -->
    <div role="status" aria-live="polite" class="sr-only">
      {{ accessibilityAnnouncement }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import Switch from "./ui/switch/Switch.vue";

/* ------------------ STATE ------------------ */
const isOn = ref(true);
const isLoading = ref(false);
const errorMessage = ref("");
const frequency = ref(null);
const note = ref(null);
const currentString = ref(null);
const selectedTuning = ref("Standard (E)");
const sensitivity = ref(0.2);
const rms = ref(0);

let audioContext;
let analyser;
let buffer;
let stream;
let animationId;
let lastUpdateTime = 0;

let smoothedFreq = null;
let smoothedCents = 0;
let lastValidFreq = null;
const history = [];
const HISTORY_SIZE = 10;

/* ------------------ CONFIG ------------------ */
const IN_TUNE_RANGE = 5; // ± cents
const UPDATE_INTERVAL = 50; // ms

const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

/* ------------------ TUNINGS ------------------ */
const tunings = {
  "Standard (E)": {
    E2: 82.41,
    A2: 110.0,
    D3: 146.83,
    G3: 196.0,
    B3: 246.94,
    E4: 329.63,
  },
  "Drop D": {
    D2: 73.42,
    A2: 110.0,
    D3: 146.83,
    G3: 196.0,
    B3: 246.94,
    E4: 329.63,
  },
  "Drop C": {
    C2: 65.41,
    G2: 98.0,
    C3: 130.81,
    F3: 174.61,
    A3: 220.0,
    D4: 293.66,
  },
  "Open G": {
    D2: 73.42,
    G2: 98.0,
    D3: 146.83,
    G3: 196.0,
    B3: 246.94,
    D4: 293.66,
  },
  DADGAD: {
    D2: 73.42,
    A2: 110.0,
    D3: 146.83,
    G3: 196.0,
    A3: 220.0,
    D4: 293.66,
  },
  //   "Half Step Down": {
  //     D#2: 77.78,
  //     G#2: 103.83,
  //     C#3: 138.59,
  //     F#3: 185.0,
  //     A#3: 233.08,
  //     D#4: 311.13,
  //   },
};

/* ------------------ COMPUTED ------------------ */
const currentTuning = computed(() => tunings[selectedTuning.value]);

const cents = computed(() => {
  if (
    !frequency.value ||
    !currentString.value ||
    !currentTuning.value[currentString.value]
  ) {
    return 0;
  }
  return getCents(frequency.value, currentTuning.value[currentString.value]);
});

const needleRotation = computed(() => {
  const target = Math.max(-45, Math.min(45, cents.value));
  smoothedCents = smoothedCents * 0.8 + target * 0.2;
  return smoothedCents;
});

const statusText = computed(() => {
  if (!isOn.value) return "OFF";
  if (!frequency.value) return "Play a note";
  if (Math.abs(cents.value) <= IN_TUNE_RANGE) return "✓ In Tune";
  return cents.value < 0 ? "Flat" : "Sharp";
});

const statusColor = computed(() => {
  if (!isOn.value || !frequency.value) return "text-gray-400";
  if (Math.abs(cents.value) <= IN_TUNE_RANGE) return "text-green-400";
  return cents.value < 0 ? "text-blue-400" : "text-red-400";
});

const needleColor = computed(() => {
  if (!isOn.value || !frequency.value) return "bg-gray-400";
  if (Math.abs(cents.value) <= IN_TUNE_RANGE) return "bg-green-400";
  return cents.value < 0 ? "bg-blue-400" : "bg-red-400";
});

const noteColor = computed(() => {
  if (!isOn.value || !frequency.value) return "text-gray-400";
  if (Math.abs(cents.value) <= IN_TUNE_RANGE) return "text-green-400";
  return "text-white";
});

const accuracyWidth = computed(() => {
  const centsAbs = Math.abs(cents.value);
  const maxCents = 50;
  return Math.max(0, 100 - (centsAbs / maxCents) * 100);
});

const accuracyColor = computed(() => {
  if (Math.abs(cents.value) <= IN_TUNE_RANGE)
    return "bg-gradient-to-r from-transparent via-green-400 to-transparent";
  return cents.value < 0
    ? "bg-gradient-to-r from-transparent via-blue-400 to-transparent"
    : "bg-gradient-to-r from-transparent via-red-400 to-transparent";
});

const accessibilityAnnouncement = computed(() => {
  if (!isOn.value) return "Tuner is off";
  if (!currentString.value) return "Listening for guitar sound";
  return `${currentString.value} string, ${
    note.value
  }, ${statusText.value.replace("✓ ", "")}`;
});

/* ------------------ LIFECYCLE ------------------ */
onMounted(() => {
  // Add CSS animation dynamically
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes strobe {
        from { opacity: 0.3; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1.2); }
      }
      .strobe-light {
        animation: strobe 0.5s infinite alternate;
        animation-timing-function: ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }

  if (isOn.value) {
    start();
  }
});

onUnmounted(() => {
  stop();
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});

watch(isOn, (val) => {
  val ? start() : stop();
});

/* ------------------ POWER CONTROL ------------------ */
async function start() {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Your browser doesn't support audio input");
    }

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        latency: 0,
      },
    });

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048; // Increased for better accuracy
    analyser.smoothingTimeConstant = 0.8;
    buffer = new Float32Array(analyser.fftSize);

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    detect();
    isLoading.value = false;
  } catch (err) {
    console.error("Tuner error:", err);
    errorMessage.value = err.message.includes("denied")
      ? "Microphone access denied. Please allow microphone access to use the tuner."
      : `Error: ${err.message}`;
    isOn.value = false;
    isLoading.value = false;
  }
}

function stop() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }

  if (audioContext && audioContext.state !== "closed") {
    audioContext.close();
  }

  frequency.value = null;
  note.value = null;
  currentString.value = null;
  smoothedFreq = null;
  lastValidFreq = null;
  history.length = 0;
}

function togglePower() {
  isOn.value = !isOn.value;
}

/* ------------------ MAIN DETECTION LOOP ------------------ */
function detect(timestamp) {
  if (!isOn.value) return;

  // Throttle updates
  if (timestamp - lastUpdateTime < UPDATE_INTERVAL) {
    animationId = requestAnimationFrame(detect);
    return;
  }
  lastUpdateTime = timestamp;

  analyser.getFloatTimeDomainData(buffer);

  // Calculate RMS for silence detection
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  rms.value = Math.sqrt(sum / buffer.length);

  if (rms.value > sensitivity.value) {
    const freq = autoCorrelateImproved(buffer, audioContext.sampleRate);

    if (freq !== -1 && freq >= 60 && freq <= 1400) {
      lastValidFreq = freq;

      // Apply median filter from history
      history.push(freq);
      if (history.length > HISTORY_SIZE) {
        history.shift();
      }

      const medianFreq = getMedian(history);
      frequency.value = smoothFrequency(medianFreq);
      note.value = frequencyToNote(frequency.value);
      currentString.value = getClosestString(frequency.value);
    }
  } else {
    // Fade out display when silent
    if (frequency.value) {
      frequency.value *= 0.95;
      if (frequency.value < 70) {
        frequency.value = null;
        note.value = null;
        currentString.value = null;
      } else {
        note.value = frequencyToNote(frequency.value);
        currentString.value = getClosestString(frequency.value);
      }
    }
  }

  animationId = requestAnimationFrame(detect);
}

/* ------------------ HELPERS ------------------ */
function smoothFrequency(freq) {
  if (!smoothedFreq) return (smoothedFreq = freq);
  smoothedFreq = smoothedFreq * 0.7 + freq * 0.3;
  return smoothedFreq;
}

function frequencyToNote(freq) {
  const n = Math.round(12 * Math.log2(freq / 440) + 69);
  const octave = Math.floor(n / 12) - 1;
  return `${noteNames[n % 12]}${octave}`;
}

function getClosestString(freq) {
  const tuning = currentTuning.value;
  const strings = Object.keys(tuning);
  let closest = strings[0];
  let minDiff = Infinity;

  for (const string of strings) {
    const diff = Math.abs(freq - tuning[string]);
    if (diff < minDiff) {
      minDiff = diff;
      closest = string;
    }
  }

  return closest;
}

function getCents(freq, target) {
  return 1200 * Math.log2(freq / target);
}

function getMedian(arr) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/* ------------------ IMPROVED AUTOCORRELATION ------------------ */
function autoCorrelateImproved(buf, sampleRate) {
  // Calculate RMS
  let sum = 0;
  for (let i = 0; i < buf.length; i++) {
    sum += buf[i] * buf[i];
  }
  const rms = Math.sqrt(sum / buf.length);
  if (rms < sensitivity.value) return -1;

  // Find zero crossings for rough estimate
  let zeroCrossings = 0;
  for (let i = 1; i < buf.length; i++) {
    if (buf[i] * buf[i - 1] < 0) {
      zeroCrossings++;
    }
  }

  const zeroCrossingFreq = (zeroCrossings / 2) * (sampleRate / buf.length);

  // Use zero crossing frequency to guide autocorrelation search
  const minLag = Math.max(20, Math.floor(sampleRate / 1400)); // Guitar max freq ~1400Hz
  const maxLag = Math.min(1000, Math.floor(sampleRate / 60)); // Guitar min freq ~60Hz

  let bestLag = -1;
  let bestCorr = -Infinity;

  // Search around zero crossing estimate
  const estimatedLag = Math.floor(sampleRate / zeroCrossingFreq);
  const searchStart = Math.max(minLag, estimatedLag - 50);
  const searchEnd = Math.min(maxLag, estimatedLag + 50);

  for (let lag = searchStart; lag < searchEnd; lag++) {
    let corr = 0;
    for (let i = 0; i < buf.length - lag; i++) {
      corr += buf[i] * buf[i + lag];
    }
    if (corr > bestCorr) {
      bestCorr = corr;
      bestLag = lag;
    }
  }

  // Calculate frequency from best lag
  if (bestLag > 0 && bestCorr > rms * 10) {
    const freq = sampleRate / bestLag;

    // Validate frequency is in guitar range
    if (freq >= 60 && freq <= 1400) {
      return freq;
    }
  }

  return -1;
}
</script>

<style scoped>
/* Additional styles */
.string-indicator {
  transition: all 0.3s ease;
}

.string-indicator:hover {
  transform: translateY(-1px);
}

select:disabled {
  cursor: not-allowed;
}

input[type="range"] {
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.1);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  cursor: pointer;
}

input[type="range"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
