import { ref } from "vue";
import { lessonsRepository } from "~~/repositories/lessons.repository";
import { useSupabaseClient } from "#imports";

export const useLessons = () => {
  const supabase = useSupabaseClient();
  const repo = lessonsRepository(supabase);

  const topics = ref([]);
  const lessonsByTopic = ref({});
  const loading = ref(false);
  const error = ref(null);

  // fetch shared topics
  const fetchTopics = async () => {
    try {
      loading.value = true;
      const allTopics = await repo.getTopicsByLevel(null);
      topics.value = allTopics;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  // fetch sub-lessons for each topic filtered by level
  const fetchAllLessonsForLevel = async (levelId) => {
    try {
      loading.value = true;
      lessonsByTopic.value = {};

      for (const topic of topics.value) {
        const subLessons = await repo.getLessonsByTopic(topic.id, levelId);
        lessonsByTopic.value[topic.id] = subLessons;
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const getLesson = async (lessonId) => {
    try {
      loading.value = true;
      return await repo.getLessonById(lessonId);
    } catch (err) {
      error.value = err;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    topics,
    lessonsByTopic,
    loading,
    error,
    fetchTopics,
    fetchAllLessonsForLevel,
    getLesson,
  };
};
