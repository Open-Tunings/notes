<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useLessons } from "~~/composables/useLessons";
import { useLevels } from "~~/composables/useLevels";
import NavMain from "@/components/NavMain.vue";
import NavProjects from "@/components/NavProjects.vue";
import NavSecondary from "@/components/NavSecondary.vue";
import NavUser from "@/components/NavUser.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Frame,
  PieChart,
  Map,
  LifeBuoy,
  Send,
  SquareTerminal,
} from "lucide-vue-next";
import { useAuthStore } from "~~/stores/auth";
import { useCareerStore } from "~~/stores/career";

const auth = useAuthStore();
const careerStore = useCareerStore();
const userName = computed(
  () => auth.user?.user_metadata?.name || auth.user?.email,
);

// composables
const { levels: dbLevels, fetchLevels } = useLevels();
const { topics, lessonsByTopic, fetchTopics, fetchAllLessonsForLevel } =
  useLessons();

onMounted(async () => {
  await fetchLevels();

  // use stored level or default to first level
  if (!careerStore.selectedLevelId) {
    careerStore.setSelectedLevel(dbLevels.value?.[0]?.id || null);
  }

  if (careerStore.selectedLevelId) {
    await fetchTopics(); // fetch all topics (shared)
    await fetchAllLessonsForLevel(careerStore.selectedLevelId); // fetch lessons for the selected level
  }


});

// handle level click (no URL change)
const selectLevel = async (levelId: number) => {
  if (careerStore.selectedLevelId === levelId) return;
  careerStore.setSelectedLevel(levelId);
  await fetchAllLessonsForLevel(levelId);
};

const selectTopic = async (topicId: number) => {
  if (careerStore.selectedTopicId === topicId) return;
  careerStore.setSelectedTopic(topicId);
};

const selectLesson = async (lessonId: number) => {
  if (careerStore.selectedLessonId === lessonId) return;
  careerStore.setSelectedLesson(lessonId);
};

// build sidebar navMain dynamically
const navMain = computed(() => {
  return topics.value.map((topic) => ({
    id: topic.id,
    title: topic.title,
    icon: SquareTerminal,
    isActive: careerStore.selectedTopicId === topic.id,
    items: (lessonsByTopic.value[topic.id] || []).map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      url: "#",
      isActive: careerStore.selectedLessonId === lesson.id,
    })),
  }));
});

// build levels nav for sidebar
const levelsNav = computed(() => {
  return dbLevels.value.map((level) => ({
    id: level.id,
    name: level.title,
    icon:
      level.title === "Beginner"
        ? Frame
        : level.title === "Intermediate"
          ? PieChart
          : Map,
    isActive: careerStore.selectedLevelId === level.id,
  }));
});

// final data for sidebar components
const data = computed(() => ({
  user: { name: userName.value, avatar: "/avatars/shadcn.jpg" },
  navMain: navMain.value,
  navSecondary: [
    { title: "Support", url: "#", icon: LifeBuoy },
    { title: "Feedback", url: "#", icon: Send },
  ],
  levels: levelsNav.value,
}));
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
      <NavMain
        @select-topic="selectTopic"
        @select-lesson="selectLesson"
        :items="data.navMain"
      />
      <NavProjects @select-level="selectLevel" :projects="data.levels" />
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
  </Sidebar>
</template>
