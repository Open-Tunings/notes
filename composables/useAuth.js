import { useSupabaseClient } from "#imports";
import { authRepository } from "~~/repositories/auth";
import { useAuthStore } from "~~/stores/auth";

export const useAuth = () => {
  const supabase = useSupabaseClient();
  const repo = authRepository(supabase);

  const authStore = useAuthStore();

  async function login(email, password) {
    authStore.isLoading = true;
    authStore.clearError();

    try {
      const data = await repo.login({ email, password });
      if (data.user) {
        authStore.setUser(data.user);
      }
      return data;
    } catch (e) {
      authStore.setError(e.message ?? e);
      throw e;
    } finally {
      authStore.isLoading = false;
    }
  }

  async function register(email, password) {
    authStore.isLoading = true;
    authStore.clearError();

    try {
      return await repo.register({ email, password });
    } catch (e) {
      authStore.setError(e.message ?? e);
      throw e;
    } finally {
      authStore.isLoading = false;
    }
  }

  async function loginWithGoogle() {
    authStore.isLoading = true;
    authStore.clearError();

    try {
      const { error } = await repo.signInWithGoogle();
      if (error) throw error;
      return true;
    } catch (e) {
      authStore.setError(e.message ?? e);
      return false;
    } finally {
      authStore.isLoading = false;
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    authStore.clearUser();
  }

  return {
    login,
    register,
    loginWithGoogle,
    logout,
  };
};
