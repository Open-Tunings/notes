<script setup>
import LoginForm from "@/components/login-04/components/LoginForm.vue";
import { authRepository } from '~~/repository/auth'
definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient()
const auth = authRepository(client)
const isLoading = ref(false)

const handleLogin = async (credentials) => {
    isLoading.value = true
    try {
        await auth.login(credentials)
        await navigateTo('/')
    } catch (error) {
        alert(error.message || "An error occurred during login")
    } finally {
        isLoading.value = false
    }
}
</script>

<script setup lang="ts"></script>

<template>
  <div
    class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
  >
    <div class="w-full max-w-sm md:max-w-4xl">
      <LoginForm @submit="handleLogin" :loading="isLoading"/>
    </div>
  </div>
</template>
