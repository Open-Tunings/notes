<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="text-xs tracking-widest opacity-60">METRONOME</span>
        <div
          v-if="isPlaying"
          class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
        ></div>
      </div>

      <!-- ON / OFF -->
      <!-- <button
        @click="togglePlay"
        class="text-xs px-3 py-1 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95"
        :class="isPlaying 
          ? 'text-green-400 border-green-400/30 bg-green-400/10' 
          : 'text-red-400 border-red-400/30 bg-red-400/10'
        "
        :aria-label="isPlaying ? 'Stop metronome' : 'Start metronome'"
        :aria-pressed="isPlaying"
      >
        {{ isPlaying ? "ON" : "OFF" }}
      </button> -->

      <Switch @click="togglePlay" />
    </div>

    <!-- Tempo Display -->
    <div class="text-center mb-3">
      <p class="text-xs tracking-[0.25em] uppercase opacity-60 mb-1">Tempo</p>
      <h1
        class="text-4xl font-bold mb-1"
        :class="isPlaying ? 'text-green-400' : 'opacity-30'"
      >
        {{ tempo }}
      </h1>
      <p class="text-sm font-semibold" :class="beatColor">
        {{ beatText }}
      </p>
    </div>

    <!-- Tempo Controls -->
    <div class="mb-4">
      <div class="flex items-center justify-center gap-4 mb-2">
        <button
          @click="decrementTempo"
          :disabled="!isPlaying"
          class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 disabled:opacity-30"
        >
          <span class="text-lg">−</span>
        </button>

        <input
          type="range"
          v-model="tempo"
          min="40"
          max="240"
          step="1"
          class="flex-1 accent-green-500"
          :disabled="!isPlaying"
        />

        <button
          @click="incrementTempo"
          :disabled="!isPlaying"
          class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 disabled:opacity-30"
        >
          <span class="text-lg">+</span>
        </button>
      </div>
      <div class="flex justify-between text-[10px] opacity-50">
        <span>40 BPM</span>
        <span>240 BPM</span>
      </div>
    </div>

    <!-- Time Signature -->
    <div class="mb-3">
      <p
        class="text-xs tracking-[0.25em] uppercase opacity-60 mb-2 text-center"
      >
        Time Signature
      </p>
      <div class="flex items-center justify-center gap-3">
        <select
          v-model="timeSignatureTop"
          :disabled="!isPlaying"
          class="w-16 text-center text-sm bg-black/50 border border-white/20 rounded-lg px-2 py-1"
        >
          <option v-for="n in [2, 3, 4, 5, 6, 7, 8]" :key="n">{{ n }}</option>
        </select>
        <span class="text-lg opacity-60">/</span>
        <select
          v-model="timeSignatureBottom"
          :disabled="!isPlaying"
          class="w-16 text-center text-sm bg-black/50 border border-white/20 rounded-lg px-2 py-1"
        >
          <option v-for="n in [2, 4, 8, 16]" :key="n">{{ n }}</option>
        </select>
      </div>
    </div>

    <!-- Visual Beat Indicator -->
    <div class="relative h-24 mb-4">
      <!-- Beat Circle -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="relative w-20 h-20">
          <!-- Beat markers -->
          <div
            v-for="(beat, index) in parseInt(timeSignatureTop)"
            :key="index"
            class="absolute w-2 h-2 rounded-full"
            :class="{
              'bg-green-400': isPlaying && currentBeat === index,
              'bg-white/20': !isPlaying || currentBeat !== index,
            }"
            :style="{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${
                index * (360 / parseInt(timeSignatureTop))
              }deg) translateY(-30px) rotate(-${
                index * (360 / parseInt(timeSignatureTop))
              }deg)`,
            }"
          />

          <!-- Center pulse -->
          <div
            class="absolute inset-0 rounded-full border-2 transition-all duration-100"
            :class="beatPulseClass"
          />
        </div>
      </div>

      <!-- Current Beat Display -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div class="text-center">
          <p class="text-xs opacity-60 mb-1">Beat</p>
          <div
            class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-400/30"
          >
            <span class="text-xl font-bold">{{ currentBeat + 1 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls Row -->
    <div class="flex justify-between items-center mb-2">
      <!-- Volume Control -->
      <div class="text-left">
        <div class="flex items-center gap-2">
          <span class="text-[10px] opacity-50">Vol</span>
          <input
            type="range"
            v-model="volume"
            min="0"
            max="100"
            step="1"
            class="w-12 accent-green-500"
          />
        </div>
        <p class="text-[10px] opacity-50 mt-1">{{ volume }}%</p>
      </div>

      <!-- Tap Tempo -->
      <div class="text-center">
        <button
          @click="tapTempo"
          class="text-xs px-3 py-1 rounded-full border border-green-400/30 bg-green-400/10 hover:bg-green-400/20 transition-all"
        >
          Tap Tempo
        </button>
        <p class="text-[10px] opacity-50 mt-1">{{ tapCount }} taps</p>
      </div>

      <!-- Presets -->
      <div class="text-right">
        <select
          v-model="selectedPreset"
          class="text-xs bg-black/50 border border-white/20 rounded-full px-2 py-1"
          :disabled="!isPlaying"
        >
          <option value="custom">Custom</option>
          <option value="slow">Slow (60 BPM)</option>
          <option value="medium">Medium (120 BPM)</option>
          <option value="fast">Fast (180 BPM)</option>
        </select>
        <p class="text-[10px] opacity-50 mt-1">Preset</p>
      </div>
    </div>

    <!-- Subdivision Control -->
    <div class="mt-3">
      <p
        class="text-xs tracking-[0.25em] uppercase opacity-60 mb-2 text-center"
      >
        Subdivision
      </p>
      <div class="flex justify-center gap-2">
        <button
          v-for="sub in subdivisions"
          :key="sub.value"
          @click="selectSubdivision(sub.value)"
          :disabled="!isPlaying"
          class="text-xs px-3 py-1 rounded-full border transition-all"
          :class="{
            'border-green-400/30 bg-green-400/20':
              subdivision === sub.value && isPlaying,
            'border-white/20 bg-white/5':
              subdivision !== sub.value || !isPlaying,
            'opacity-30': !isPlaying,
          }"
        >
          {{ sub.label }}
        </button>
      </div>
    </div>

    <!-- Status Info -->
    <div class="mt-3 pt-3 border-t border-white/10">
      <div class="flex justify-between text-[10px] opacity-50">
        <div>
          <p>Interval: {{ beatInterval }}ms</p>
          <p>Total Beats: {{ totalBeats }}</p>
        </div>
        <div class="text-right">
          <p>Next: {{ timeUntilNext }}ms</p>
          <p>Subdivision: {{ subdivision }}</p>
        </div>
      </div>
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
const isPlaying = ref(false);
const tempo = ref(120);
const timeSignatureTop = ref(4);
const timeSignatureBottom = ref(4);
const volume = ref(80);
const currentBeat = ref(0);
const subdivision = ref(1);
const selectedPreset = ref("custom");
const tapTimes = ref([]);
const tapCount = ref(0);
const totalBeats = ref(0);

let audioContext;
let timer;
let nextBeatTime = 0; // <-- Fixed: Now only declared once
let startedAt = 0;

/* ------------------ CONFIG ------------------ */
const subdivisions = [
  { value: 1, label: "¼" },
  { value: 2, label: "⅛" },
  { value: 3, label: "¾" },
  { value: 4, label: "¹⁄₁₆" },
];

/* ------------------ COMPUTED ------------------ */
const beatInterval = computed(() => {
  return 60000 / tempo.value / subdivision.value;
});

const beatText = computed(() => {
  if (!isPlaying.value) return "Stopped";
  return `Beat ${currentBeat.value + 1} of ${timeSignatureTop.value}`;
});

const beatColor = computed(() => {
  if (!isPlaying.value) return "text-gray-400";
  if (currentBeat.value === 0) return "text-green-400"; // First beat
  return "text-blue-400"; // Other beats
});

const beatPulseClass = computed(() => {
  if (!isPlaying.value) return "border-green-400/10";

  const baseClass = "border-green-400";
  const intensity = currentBeat.value === 0 ? 100 : 30;
  return `${baseClass} border-opacity-${intensity}`;
});

const timeUntilNext = computed(() => {
  if (!isPlaying.value) return 0;
  const now = performance.now();
  return Math.max(0, Math.round(nextBeatTime - now));
});

const accessibilityAnnouncement = computed(() => {
  if (!isPlaying.value) return "Metronome stopped";
  return `Playing at ${tempo.value} BPM, beat ${currentBeat.value + 1} of ${
    timeSignatureTop.value
  }`;
});

/* ------------------ LIFECYCLE ------------------ */
onMounted(() => {
  // Initialize audio context
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Add CSS for pulse animation
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      .pulse-animation {
        animation: pulse 0.1s ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }
});

onUnmounted(() => {
  stop();
  if (audioContext) {
    audioContext.close();
  }
});

/* ------------------ WATCHERS ------------------ */
watch(selectedPreset, (newPreset) => {
  switch (newPreset) {
    case "slow":
      tempo.value = 60;
      break;
    case "medium":
      tempo.value = 120;
      break;
    case "fast":
      tempo.value = 180;
      break;
  }
});

watch(isPlaying, (playing) => {
  if (playing) {
    start();
  } else {
    stop();
  }
});

/* ------------------ AUDIO FUNCTIONS ------------------ */
function playBeat(beatNumber) {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  // Different frequency for first beat
  const frequency = beatNumber === 0 ? 800 : 400;
  oscillator.frequency.value = frequency;

  // Set volume
  gainNode.gain.value = (volume.value / 100) * (beatNumber === 0 ? 0.8 : 0.5);

  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Envelope for click sound
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(
    gainNode.gain.value,
    audioContext.currentTime + 0.001
  );
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.1
  );

  // Play the sound
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}

/* ------------------ METRONOME FUNCTIONS ------------------ */
function start() {
  if (!isPlaying.value) return;

  startedAt = performance.now();
  nextBeatTime = startedAt; // <-- Fixed: Using the variable, not redeclaring
  currentBeat.value = 0;
  totalBeats.value = 0;

  scheduleBeat();
}

function stop() {
  clearTimeout(timer);
  currentBeat.value = 0;
  totalBeats.value = 0;
}

function togglePlay() {
  isPlaying.value = !isPlaying.value;
}

function scheduleBeat() {
  if (!isPlaying.value) return;

  const now = performance.now();

  // Calculate when the next beat should occur
  while (nextBeatTime < now + 100) {
    // Look ahead 100ms
    // Play the beat
    playBeat(currentBeat.value);

    // Update beat counter
    currentBeat.value =
      (currentBeat.value + 1) % parseInt(timeSignatureTop.value);
    totalBeats.value++;

    // Schedule next beat
    nextBeatTime += beatInterval.value;
  }

  // Schedule next check
  const timeUntilNextBeat = nextBeatTime - now; // <-- Fixed: Different variable name
  timer = setTimeout(scheduleBeat, Math.max(0, timeUntilNextBeat - 50));
}

/* ------------------ CONTROLS ------------------ */
function incrementTempo() {
  if (tempo.value < 240) {
    tempo.value += 1;
  }
}

function decrementTempo() {
  if (tempo.value > 40) {
    tempo.value -= 1;
  }
}

function tapTempo() {
  const now = Date.now();
  tapTimes.value.push(now);

  // Keep only last 5 taps
  if (tapTimes.value.length > 5) {
    tapTimes.value.shift();
  }

  tapCount.value = tapTimes.value.length;

  // Calculate average tempo if we have at least 2 taps
  if (tapTimes.value.length >= 2) {
    const intervals = [];
    for (let i = 1; i < tapTimes.value.length; i++) {
      intervals.push(tapTimes.value[i] - tapTimes.value[i - 1]);
    }

    const averageInterval =
      intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const calculatedTempo = Math.round(60000 / averageInterval);

    // Clamp to valid range
    tempo.value = Math.max(40, Math.min(240, calculatedTempo));
  }
}

function selectSubdivision(value) {
  subdivision.value = value;
}

/* ------------------ UTILITIES ------------------ */
function resetTap() {
  tapTimes.value = [];
  tapCount.value = 0;
}

// Watch for tempo changes to reset tap tempo
watch(tempo, () => {
  resetTap();
});
</script>

<style scoped>
/* Additional styles */
input[type="range"] {
  -webkit-appearance: none;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #22c55e;
  cursor: pointer;
  border: 2px solid #000;
}

input[type="range"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

select:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
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

/* Beat pulse animation */
@keyframes beat-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.pulse-animation {
  animation: beat-pulse 0.1s ease-in-out;
}
</style>
