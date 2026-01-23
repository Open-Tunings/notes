// composables/useAuth.js
import { ref, computed } from "vue";
import { useSupabaseClient, useSupabaseUser } from "#imports"; 
import { authRepository } from "~~/repositories/auth";

export const useAuth = () => {
  const supabase = useSupabaseClient();
  const repo = authRepository(supabase); 

  const user = useSupabaseUser();
  const isLoading = ref(false);
  const error = ref(null);

  // Login
  async function login(email, password) {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await repo.login({ email, password });
      return data;
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }

  // Register
  async function register(email, password) {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await repo.register({ email, password });
      return data;
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }

  // Google login
  async function loginWithGoogle() {
    isLoading.value = true;
    error.value = null;
    try {
      await repo.signInWithGoogle();
      return true;
    } catch (e) {
      error.value = e;
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  const isLoggedIn = computed(() => !!user.value);

  return {
    login,
    register,
    loginWithGoogle,
    logout,
    isLoggedIn,
    isLoading,
    error,
    user,
  };
};
