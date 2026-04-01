<script setup lang="ts">
// ============================================================
// modules/Dashboard/Users/pages/UserShowPage.vue
// ============================================================
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import UserInfoCard from '../components/UserInfoCard.vue'
import { useUserShow } from '../composables/useUserShow'

const route  = useRoute()
const router = useRouter()
const userId = Number(route.params.id)

const { user, loading, error, loadUser } = useUserShow(userId)

onMounted(() => loadUser())
</script>

<template>
  <div class="p-4 max-w-2xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <Button icon="pi pi-arrow-right" text rounded @click="router.back()" />
        <h1 class="text-2xl font-bold">تفاصيل المستخدم</h1>
      </div>
      <Button
        v-if="user"
        label="تعديل"
        icon="pi pi-pencil"
        severity="warning"
        outlined
        @click="router.push({ name: 'users.edit', params: { id: userId } })"
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <ProgressSpinner />
    </div>

    <!-- Error -->
    <Message v-else-if="error" severity="error">{{ error }}</Message>

    <!-- Card -->
    <UserInfoCard v-else-if="user" :user="user" />

  </div>
</template>