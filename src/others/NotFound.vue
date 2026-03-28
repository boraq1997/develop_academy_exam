<template>
  <div class="flex align-items-center justify-content-center min-h-screen bg-gray-100">
    <Card class="p-fluid text-center">
      <template #title>404 - Page Not Found</template>
      <template #content>
        <p>The page you are looking for does not exist.</p>
        <Button label="Go to Home" @click="$router.push({ name: 'Home' })" class="mt-3" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
</script>
