import { defineStore } from "pinia";
import { useSupabaseClient } from "#imports";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    session: null,
    loading: true,
    error: null,
    isLoading: false,
  }),

  actions: {
    init() {
      const supabase = useSupabaseClient();

      supabase.auth.getSession().then(({ data }) => {
        this.session = data.session;
        this.user = data.session?.user ?? null;
        this.loading = false;
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        this.session = session;
        this.user = session?.user ?? null;
      });
    },

    setUser(user) {
      this.user = user;
    },

    clearUser() {
      this.user = null;
    },

    setError(error) {
      this.error = error;
    },

    clearError() {
      this.error = null;
    },

    async signOut() {
      const supabase = useSupabaseClient();
      await supabase.auth.signOut();
      this.user = null;
      this.session = null;
    },
  },
});
