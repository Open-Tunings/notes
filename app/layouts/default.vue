<template>
  <div @click.once="enableSound">
    <!-- <audio ref="audio" src="/audio/audio1.mp3" autoplay muted loop /> -->

    <Navbar />
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Navbar from "~/components/Navbar.vue";

const audio = ref(null);
const unmuted = ref(false);

const max_vol = 0.3;

onMounted(() => {
  if (audio.value) {
    audio.value.volume = max_vol;
    audio.value?.play();
  }
});

const enableSound = () => {
  if (!audio.value) return;
  audio.value.muted = false;
  audio.value.volume = max_vol;
  unmuted.value = true;
};
</script>
