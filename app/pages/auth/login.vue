<script setup>
import LoginForm from "@/components/login-04/components/LoginForm.vue";
import { useAuth } from "~~/composables/useAuth";

definePageMeta({
  layout: "auth",
});


const { login, loginWithGoogle, isLoading, error, isLoggedIn } = useAuth();

const handleLogin = async (credentials) => {
  try {
    const data = await login(credentials.email, credentials.password);
    if (data) {
      navigateTo("/"); 
    }
  } catch (e) {
    alert(e.message || "Login failed");
  }
};


const handleGoogleLogin = async () => {
  try {
    const success = await loginWithGoogle();
    if (success) {
      navigateTo("/");
    } else {
      alert("Google login failed");
    }
  } catch (e) {
    alert(e.message || "Google login failed");
  }
};
</script>

<template>
  <div class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-4xl">
      <LoginForm 
        @submit="handleLogin" 
        @google-login="handleGoogleLogin" 
        :loading="isLoading" 
        :error="error"
      />
    </div>
  </div>
</template>
