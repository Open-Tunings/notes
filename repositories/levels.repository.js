export const levelsRepository = (supabase) => ({
  async getAllLevels() {
    const { data, error } = await supabase
      .from("levels")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;

    return data;
  },
});
