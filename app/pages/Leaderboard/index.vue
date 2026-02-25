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

      <Button @click="start" :disabled="!selectedId">Start</Button>
      <Button @click="stop">Stop</Button>

      <p>Last note: {{ lastNote || "—" }}</p>
    </div>
  </client-only>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const inputs = ref([]);
const selectedId = ref("");
const lastNote = ref(null);

let listener = null;
let _createPitchListener = null;

onMounted(async () => {
  if (!import.meta.client) return;

  // dynamic import keeps all Web Audio code off the server
  const { listAudioInputs, createPitchListener } =
    await import("note-listener");
  _createPitchListener = createPitchListener;

  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    inputs.value = await listAudioInputs();
    console.log("Audio inputs:", inputs.value);
  } catch (err) {
    console.error("Microphone access denied or unavailable", err);
  }
});

async function start() {
  if (!selectedId.value || !_createPitchListener) return;
  if (listener) listener.stop();

  listener = await _createPitchListener({
    deviceId: selectedId.value,
    minEnergy: 0.01,
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
