<template>
  <client-only>
    <div>
      <h3>Select audio input</h3>

      <select v-model="selectedId">
        <option disabled value="">-- choose input --</option>
        <option v-for="d in inputs" :key="d.deviceId" :value="d.deviceId">
          {{ d.label }}
        </option>
      </select>

      <div>
        <label>Sensitivity (minEnergy): {{ minEnergy }}</label>
        <input
          type="range"
          v-model.number="minEnergy"
          min="0.001"
          max="0.2"
          step="0.001"
        />
      </div>

      <button @click="start" :disabled="!selectedId">Start</button>
      <button @click="stop">Stop</button>

      <p>Last note: {{ lastNote || "—" }}</p>
    </div>
  </client-only>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const inputs = ref([]);
const selectedId = ref("");
const lastNote = ref(null);
const minEnergy = ref(0.01); // ← start low, user drags up until noise stops

let listener = null;
let _createPitchListener = null;

onMounted(async () => {
  if (!import.meta.client) return;

  const { listAudioInputs, createPitchListener } =
    await import("note-listener");
  _createPitchListener = createPitchListener;

  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    inputs.value = await listAudioInputs();
  } catch (err) {
    console.error("Microphone access denied or unavailable", err);
  }
});

async function start() {
  if (!selectedId.value || !_createPitchListener) return;
  if (listener) listener.stop();

  listener = await _createPitchListener({
    deviceId: selectedId.value,
    minEnergy: minEnergy.value, // ← from the slider
    onNotes(notes) {
      lastNote.value = notes
        .map((n) => `${n.note} (${n.cents > 0 ? "+" : ""}${n.cents}¢)`)
        .join(", ");
      console.log("Detected notes:", notes);
    },
  });

  listener.start();
}

function stop() {
  if (listener) listener.stop();
  listener = null;
}

onBeforeUnmount(stop);
</script>
