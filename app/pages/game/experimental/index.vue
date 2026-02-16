<script setup >
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

      <ContextMenu>
        <ContextMenuTrigger
          class="mt-20 bg-[url('/game/game_images/game2.jpg')] bg-cover bg-center flex h-[40vh] w-[25vw] items-center justify-center rounded-md border border-dashed text-sm"
        >
        </ContextMenuTrigger>
        <ContextMenuContent class="w-52">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset> More Tools </ContextMenuSubTrigger>
            <ContextMenuSubContent class="w-44">
              <ContextMenuItem inset>
                Save Page...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <PlusIcon />
                Create Shortcut...
              </ContextMenuItem>
              <ContextMenuItem inset> Name Window... </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Code2Icon />
                Developer Tools
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <TrashIcon />
                Delete
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem :model-value="true">
            Show Bookmarks
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup model-value="pedro">
            <ContextMenuLabel inset> People </ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">
              Colm Tuite
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger
          class="mt-20 bg-[url('/game/game_images/game3.jpg')] bg-cover bg-center flex h-[40vh] w-[25vw] items-center justify-center rounded-md border border-dashed text-sm"
        >
        </ContextMenuTrigger>
        <ContextMenuContent class="w-52">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset> More Tools </ContextMenuSubTrigger>
            <ContextMenuSubContent class="w-44">
              <ContextMenuItem inset>
                Save Page...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <PlusIcon />
                Create Shortcut...
              </ContextMenuItem>
              <ContextMenuItem inset> Name Window... </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Code2Icon />
                Developer Tools
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <TrashIcon />
                Delete
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem :model-value="true">
            Show Bookmarks
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup model-value="pedro">
            <ContextMenuLabel inset> People </ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">
              Colm Tuite
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger
          class="mt-20 bg-[url('/game/game_images/game4.jpg')] bg-cover bg-center flex h-[40vh] w-[25vw] items-center justify-center rounded-md border border-dashed text-sm"
        >
        </ContextMenuTrigger>
        <ContextMenuContent class="w-52">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset> More Tools </ContextMenuSubTrigger>
            <ContextMenuSubContent class="w-44">
              <ContextMenuItem inset>
                Save Page...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <PlusIcon />
                Create Shortcut...
              </ContextMenuItem>
              <ContextMenuItem inset> Name Window... </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Code2Icon />
                Developer Tools
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <TrashIcon />
                Delete
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem :model-value="true">
            Show Bookmarks
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup model-value="pedro">
            <ContextMenuLabel inset> People </ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">
              Colm Tuite
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  </div>
</template>
