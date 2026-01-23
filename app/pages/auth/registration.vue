<script setup>
import SignupForm from "@/components/signup-04/components/SignupForm.vue";
import { useAuth } from "~~/composables/useAuth";

definePageMeta({
  layout: "auth",
});

const { register, loginWithGoogle, isLoading, error } = useAuth();

const handleRegister = async (credentials) => {
  const data = await register(credentials);
  if (data) {
    navigateTo("/");
  }
};

const handleGoogleSignup = async () => {
  const success = await loginWithGoogle();
  if (success) {
    navigateTo("/");
  }
};
</script>

<template>
  <div class="bg-muted flex min-h-svh items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-4xl">
      <SignupForm
        @submit="handleRegister"
        @google-signup="handleGoogleSignup"
        :loading="isLoading"
        :error="error"
      />
    </div>
  </div>
</template>
