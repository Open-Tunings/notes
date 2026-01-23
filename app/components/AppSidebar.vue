<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  BookOpen,
  Bot,
  Command,
  Ear,
  Frame,
  LifeBuoy,
  Map,
  Music,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next"

import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavSecondary from '@/components/NavSecondary.vue'
import NavUser from '@/components/NavUser.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: "inset",
})

const data = {
  user: {
    name: "Donald Edwin",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Technique",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Basic fingerpicking",
          url: "#",
        },
        {
          title: "Strumming patterns",
          url: "#",
        },
        {
          title: "Open Chords",
          url: "#",
        },
        {
          title: "Power Chords",
          url: "#",
        },
        {
          title: "Switching Chords",
          url: "#",
        },
        {
          title: "Basic Picking",
          url: "#",
        },
      ],
    },
    {
      title: "Fretboard Knowledge",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Open String names",
          url: "#",
        },
        {
          title: "Natural notes",
          url: "#",
        },
        {
          title: "Note Memorization",
          url: "#",
        },
        {
          title: "Understanding steps",
          url: "#",
        },
      ],
    },
    {
      title: "Music Theory",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Major Scale",
          url: "#",
        },
        {
          title: "Chord Construction",
          url: "#",
        },
        {
          title: "Keys",
          url: "#",
        },
        {
          title: "Chord Progressions",
          url: "#",
        },
      ],
    },
    {
      title: "Ear Training",
      url: "#",
      icon: Ear,
      items: [
        {
          title: "Basic Intervals",
          url: "#",
        },
        {
          title: "Major vs Minor",
          url: "#",
        },
        {
          title: "Transcription",
          url: "#",
        },
        
      ],
    },
     {
      title: "Musical Expressions",
      url: "#",
      icon: Music,
      items: [
        {
          title: "Dynamics",
          url: "#",
        },
        {
          title: "slide, hammer-ons, pull-offs",
          url: "#",
        },
        {
          title: "vibrato & bends",
          url: "#",
        },
        
      ],
    },
     {
      title: "Creativity",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Simple riffs",
          url: "#",
        },
        {
          title: "Backing tracks",
          url: "#",
        },
        {
          title: "Improvisation",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Beginner",
      url: "#",
      icon: Frame,
    },
    {
      name: "Intermediate",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Master",
      url: "#",
      icon: Map,
    },
    {
      name: "John Mayer",
      url: "#",
      icon: Map,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <!-- <a href="#">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Command class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">Acme Inc</span>
                <span class="truncate text-xs">Enterprise</span>
              </div>
            </a> -->
            <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
  </Sidebar>
</template>
