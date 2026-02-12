export const lessonsRepository = (supabase) => ({
  async getTopicsByLevel(levelId) {
    // Topics are shared across levels, so levelId can be ignored
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .is("parent_id", null)
      .order("order_index", { ascending: true, nullsFirst: true });

    if (error) throw error;
    return data;
  },

  async getLessonsByTopic(topicId, levelId) {
    let query = supabase.from("lessons").select("*").eq("parent_id", topicId);

    if (levelId != null) {
      query = query.eq("level_id", levelId);
    }

    const { data, error } = await query.order("order_index", { ascending: true });


    if (error) throw error;
    return data;
  },

  async getLessonById(lessonId) {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("id", lessonId)
      .single();

    if (error) throw error;
    return data;
  },
});
