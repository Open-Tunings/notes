<script setup>
import SignupForm from "@/components/signup-04/components/SignupForm.vue";
import { authRepository } from "~~/repository/auth";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const auth = authRepository(client);
const isLoading = ref(false);

const handleRegister = async (credentials) => {
  isLoading.value = true;
  try {
    await auth.register(credentials);
    alert("registration successful");
    await navigateTo("/");
  } catch (error) {
    alert(error.message || "An error occurred during registration");
  } finally {
    isLoading.value = false;
  }
};
</script>

<script setup lang="ts"></script>

<template>
  <div
    class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
  >
    <div class="w-full max-w-sm md:max-w-4xl">
      <SignupForm @submit="handleRegister" :loading="isLoading" />
    </div>
  </div>
</template>
