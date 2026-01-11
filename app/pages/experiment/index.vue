<template>
  <div>
    <Button @click="playBTN">Play</Button>
  </div>
</template>

<script setup>
import * as Tone from "tone";

const playBTN = async () => {
  const synth = new Tone.Synth();
//   const feedbackDelay = new Tone.FeedbackDelay('8n.', '0.7');
  const feedbackDelay = new Tone.FeedbackDelay({
    delayTime: 2,
    feedback: 0.3,
    maxDelayL: 2,
  });

  synth.connect(feedbackDelay);
  feedbackDelay.toDestination();
  if (Tone.context.state != "running") {
    await Tone.start();
  }
  synth.triggerAttackRelease("C4", "8n");
};
</script>
