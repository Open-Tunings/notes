<script setup>
import { Code2Icon, PlusIcon, TrashIcon } from "lucide-vue-next";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
</script>

<template>
  <div>
    <div>
      <h1
        class="scroll-m-20 mt-4 text-center text-4xl font-extrabold tracking-tight text-balance"
      >
        Experimental Games
      </h1>
      <p class="leading-7 text-center [&:not(:first-child)]:mt-6">
        Right click to check details on the games.
      </p>
    </div>

    <div class="grid grid-cols-3 py-4 px-10">
      <NuxtLink to="/game/experimental/games/samurai">
        <ContextMenu>
          <ContextMenuTrigger
            class="mt-20 bg-[url('/game/game_images/game1.jpg')] bg-cover bg-center flex h-[40vh] w-[25vw] items-center justify-center rounded-md border border-dashed text-sm"
          >
          </ContextMenuTrigger>
          <ContextMenuContent class="w-52">
            <ContextMenuItem inset> Triad Samurai </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger inset> Topics </ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-44">
                <ContextMenuItem> Triads </ContextMenuItem>
                <ContextMenuItem> Dexterity </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger inset> references </ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-44">
                <ContextMenuItem> Triads </ContextMenuItem>
                <ContextMenuItem> Dexterity </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </NuxtLink>

      <NuxtLink to="/game/experimental/games/samurai">
        <ContextMenu>
          <ContextMenuTrigger
            class="mt-20 bg-[url('/game/game_images/game2.jpg')] bg-cover bg-center flex h-[40vh] w-[25vw] items-center justify-center rounded-md border border-dashed text-sm"
          >
          </ContextMenuTrigger>
          <ContextMenuContent class="w-52">
            <ContextMenuItem inset> Interval Queen </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger inset> Topics </ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-44">
                <ContextMenuItem> Intervals </ContextMenuItem>
                <ContextMenuItem> Creativity </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger inset> references </ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-44">
                <ContextMenuItem> Intervals </ContextMenuItem>
                <ContextMenuItem> Creativity </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </NuxtLink>
      <NuxtLink to="/game/experimental/games/samurai">
        <ContextMenu>
          <ContextMenuTrigger
            class="mt-20 bg-[url('/game/game_images/game3.jpg')] bg-cover bg-center flex h-[40vh] w-[25vw] items-center justify-center rounded-md border border-dashed text-sm"
          >
          </ContextMenuTrigger>
          <ContextMenuContent class="w-52">
            <ContextMenuItem inset> CAGED Cowboy </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger inset> Topics </ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-44">
                <ContextMenuItem> CAGED system </ContextMenuItem>
                <ContextMenuItem> Fretboard Mastery </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger inset> references </ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-44">
                <ContextMenuItem> CAGED system </ContextMenuItem>
                <ContextMenuItem> Fretboard Mastery </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </NuxtLink>
      <NuxtLink to="/game/experimental/games/samurai">
        <ContextMenu>
          <ContextMenuTrigger
            class="mt-20 bg-[url('/game/game_images/game4.jpg')] bg-cover bg-center flex h-[40vh] w-[25vw] items-center justify-center rounded-md border border-dashed text-sm"
          >
          </ContextMenuTrigger>
          <ContextMenuContent class="w-52">
            <ContextMenuItem inset> Speed Corpse </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger inset> Topics </ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-44">
                <ContextMenuItem> Speed </ContextMenuItem>
                <ContextMenuItem> Dexterity </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger inset> references </ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-44">
                <ContextMenuItem> Speed </ContextMenuItem>
                <ContextMenuItem> Dexterity </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </NuxtLink>
    </div>
  </div>
</template>
