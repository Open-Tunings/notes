export const authRepository = (supabase) => ({
  async login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  },

  async register({ email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return data;
  },

  async signInWithGoogle() {
    // Dynamically generate the redirect URL based on the current environment
    const origin = process.client
      ? window.location.origin
      : config.public.siteUrl;
    const redirectToUrl = `${origin}`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectToUrl,
        scopes: "email profile", 
      },
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
      return { error };
    }
    return { error: null };
  },
});