<template>
  <div>studio</div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const context = new AudioContext();

  setupContext();

  async function setupContext() {
    const guitar = await getGuitar();
    if (context.state === "suspended") {
      await context.resume;
    }
    const source = context.createMediaStreamSource(guitar);
    source.connect(context.destination);
  }

  function getGuitar() {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    });
  }
});
</script>
