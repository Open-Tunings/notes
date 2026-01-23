<template>
  <div
    class="z-10 bg-[url('/images/bg2.jpg')] bg-cover bg-center bg-no-repeat h-screen"
  >
    <div class="bg-neutral-900">
      <div class="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto text-center">
        <!-- Announcement Banner -->
        <a
          class="group inline-flex flex-wrap items-center bg-white/10 hover:bg-white/10 focus:outline-hidden focus:bg-white/10 border border-white/10 p-1 ps-4 rounded-full shadow-md"
          href="../auth/login"
        >
          <p class="me-2 text-white text-sm">Sign In to play</p>
          <span
            class="group-hover:bg-white/10 group-focus:bg-white/10 py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm"
          >
            <svg
              class="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </a>
        <!-- End Announcement Banner -->
      </div>
    </div>
    <!-- Hero -->
    <div class="mt-7 relative overflow-hidden">
      <div class="relative z-10">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div class="max-w-2xl text-center mx-auto">
            <!-- Title -->
            <div class="mt-5 max-w-2xl">
              <h1 class="block text-neutral-200 text-4xl md:text-5xl lg:text-5xl">
                Play your guitar. Level up your skills.
              </h1>
            </div>
            <!-- End Title -->

            <div class="mt-5 max-w-3xl">
              <p class="text-lg text-neutral-200">
                OpenTunings is an interactive platform for learning and
                practicing guitar. It offers engaging multiplayer challenges,
                and curated practice sessions, it combines fun gameplay with
                practical learning, making it easier than ever to improve your
                skills and connect with other guitar enthusiasts.
              </p>
            </div>

            <!-- Buttons -->
            <div class="mt-8 gap-3 flex justify-center">
              <Button class="">
                Get started
                <svg
                  class="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
              <Button variant="" class=""> Preline Figma </Button>
            </div>
            <!-- End Buttons -->
          </div>
        </div>
      </div>
    </div>
    <!-- End Hero -->
  </div>
</template>

<script setup>
import Button from "@/components/ui/button/Button.vue";
</script>
