<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useLevels } from "~~/composables/useLevels";
import { useLessons } from "~~/composables/useLessons";
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
const { getLesson } = useLessons();
const currentLesson = ref(null);

const userName = computed(
  () => auth.user?.user_metadata?.name || auth.user?.email,
);

const extractVideoId = (url) => {
  // Regex for YouTube variants
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const youtubeEmbedUrl = computed(() => {
  if (!currentLesson.value?.youtube_url) return null;
  const videoId = extractVideoId(currentLesson.value.youtube_url);
  return videoId ? `https://www.youtube.com/embed/${videoId}?si=rZgBTu02Raysp2c3` : null;
});

watch(() => careerStore.selectedLessonId, async (newId) => {
  if (newId) {
    currentLesson.value = await getLesson(newId);
  } else {
    currentLesson.value = null;
  }
}, { immediate: true });

</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <iframe
          v-if="youtubeEmbedUrl"
          width="100%"
          height="70%"
          :src="youtubeEmbedUrl"
          title="YouTube video player"
          frameborder="0"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share;
          "
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <div v-else class="flex items-center justify-center h-[70%] bg-muted/20 rounded-xl">
             <p class="text-muted-foreground">Select a lesson to view the video</p>
        </div>
        <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
