import { defineStore } from "pinia";

export const useCareerStore = defineStore("career", {
  state: () => ({
    selectedLevelId: null,
    selectedTopicId: null,
    selectedLessonId: null,
  }),

  actions: {
    setSelectedLevel(levelId) {
      this.selectedLevelId = levelId;
    },
    setSelectedTopic(topicId) { 
      this.selectedTopicId = topicId;
    },
    setSelectedLesson(lessonId) { 
      this.selectedLessonId = lessonId;
    },

    clearSelectedLevel() {
      this.selectedLevelId = null;
      this.selectedTopicId = null;
      this.selectedLessonId = null;
    },
  },

  persist: {
    enabled: true,
  },
});
