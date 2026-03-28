<template>
  <router-view />
  <Toast />
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Corrected import
import { useAuthStore } from './modules/Auth/store/auth.store'; // Corrected import

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      console.error('Failed to re-authenticate on app load:', error);
      router.push({ name: 'Login' });
    }
  }
});
</script>

<style>
/* Global styles can go here or be imported from src/assets/styles/main.css */
</style>
