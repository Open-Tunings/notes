<template>
  <div>
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent class="min-w-[55rem]">
        <DialogHeader>
          <DialogTitle>Tools</DialogTitle>
        </DialogHeader>

        <div class="grid grid-cols-2">
          <Tuner
            class="sm:w-[18rem] rounded-2xl border border-white/10 bg-gradient-to-br from-black/90 via-black/80 to-black/70 backdrop-blur-xl shadow-2xl px-4 py-4 text-white select-none"
          />
          <Meteronome
            class="sm:w-[18rem] rounded-2xl border border-white/10 bg-gradient-to-br from-black/90 via-black/80 to-black/70 backdrop-blur-xl shadow-2xl px-4 py-4 text-white select-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import Tuner from "~/components/Tuner.vue";
import Meteronome from "~/components/Metronome.vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
</script>
