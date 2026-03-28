<template>
  <div class="p-4">
    <h1>Welcome to the Home Page!</h1>
    <p>You are successfully logged in.</p>
    <Button label="Logout" @click="handleLogout" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../modules/Auth/store/auth.store';
import Button from 'primevue/button';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push({ name: 'Login' });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>
