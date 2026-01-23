<template>
  <div class="grid grid-cols-4 gap-0.5 h-screen overflow-hidden">
    <div
      class="group relative border overflow-hidden bg-[url('images/studio1.jpg')] bg-cover bg-center text-white filter grayscale brightness-75 transition-all duration-300 ease-out hover:grayscale-0 hover:brightness-100 hover:scale-105"
    >
      <div
        class="font-carbon absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-2xl transition-transform duration-300 group-hover:scale-110"
      >
        Multiplayer
      </div>
    </div>

    <NuxtLink
      to="/game/career"
      class="group relative border overflow-hidden bg-[url('images/studio22.png')] bg-cover bg-center text-white filter grayscale brightness-75 transition-all duration-300 ease-out hover:grayscale-0 hover:brightness-100 hover:scale-105"
    >
      <div
        class="font-carbon absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-2xl"
      >
        Career
      </div>
    </NuxtLink>

    <div
      class="group relative border overflow-hidden bg-[url('images/studio33.png')] bg-cover bg-center text-white filter grayscale brightness-75 transition-all duration-300 ease-out hover:grayscale-0 hover:brightness-100 hover:scale-105"
    >
      <div
        class="font-carbon absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-2xl"
      >
        Practise
      </div>
    </div>

    <div
      class="group relative border overflow-hidden bg-[url('images/studio4.jpg')] bg-cover bg-center text-white filter grayscale brightness-75 transition-all duration-300 ease-out hover:grayscale-0 hover:brightness-100 hover:scale-105"
    >
      <div
        class="font-carbon absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-2xl"
      >
        Community
      </div>
    </div>
  </div>
</template>
