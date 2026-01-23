<template>
  <div
    class="z-10 bg-[url('images/bg2.jpg')] bg-cover bg-center bg-no-repeat h-screen"
  >
    <!-- Hero -->
    <div class="relative overflow-hidden">
      <div class="relative z-10">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div class="max-w-2xl text-center mx-auto">
            <!-- Announcement Banner -->
            <div class="flex justify-center">
              <a
                class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-600 dark:focus:border-neutral-600"
                href="#"
              >
                PRO release - Join to waitlist
                <span
                  class="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-neutral-700 dark:text-neutral-400"
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
            </div>
            <!-- End Announcement Banner -->

            <!-- Title -->
            <div class="mt-5 max-w-2xl">
              <h1
                class="block text-white text-4xl md:text-5xl lg:text-5xl "
              >
                Play your guitar. Level up your skills.
              </h1>
            </div>
            <!-- End Title -->

            <div class="mt-5 max-w-3xl">
              <p class="text-lg text-white">
                Preline UI is an open-source set of prebuilt UI components,
                ready-to-use examples and Figma design system based on the
                utility-first Tailwind CSS framework.
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
              <Button variant="" class="">
                <svg
                  class="shrink-0 size-4"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.875 18C8.531 18 9.875 16.656 9.875 15V12H6.875C5.219 12 3.875 13.344 3.875 15C3.875 16.656 5.219 18 6.875 18Z"
                    fill="#0ACF83"
                  ></path>
                  <path
                    d="M3.875 9C3.875 7.344 5.219 6 6.875 6H9.875V12H6.875C5.219 12 3.875 10.656 3.875 9Z"
                    fill="#A259FF"
                  ></path>
                  <path
                    d="M3.875 3C3.875 1.344 5.219 0 6.875 0H9.875V6H6.875C5.219 6 3.875 4.656 3.875 3Z"
                    fill="#F24E1E"
                  ></path>
                  <path
                    d="M9.87501 0H12.875C14.531 0 15.875 1.344 15.875 3C15.875 4.656 14.531 6 12.875 6H9.87501V0Z"
                    fill="#FF7262"
                  ></path>
                  <path
                    d="M15.875 9C15.875 10.656 14.531 12 12.875 12C11.219 12 9.87501 10.656 9.87501 9C9.87501 7.344 11.219 6 12.875 6C14.531 6 15.875 7.344 15.875 9Z"
                    fill="#1ABCFE"
                  ></path>
                </svg>
                Preline Figma
              </Button>
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
