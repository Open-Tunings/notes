<template>
  <div>
    <!-- <div v-if="auth.user" class="user-info">
      Welcome, {{ auth.user.user_metadata?.name || auth.user.email }}!
      
    </div> -->
    <NuxtLayout>
      <NuxtPage />

      <Toaster />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { Toaster } from "vue-sonner";
import { useAuthStore } from "~~/stores/auth";
const auth = useAuthStore();


onMounted(() => {
  auth.init();
});

watch(
  () => auth.loading,
  (loading) => {
    if (!loading) {
      console.log("Auth User in App.vue:", auth.user);
    }
  },
);
</script>
