<script setup lang="ts">
// ============================================================
// modules/Dashboard/Users/pages/UsersArchivedPage.vue
// ============================================================
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useToast } from 'primevue/usetoast'
import UserTable from '../components/UserTable.vue'
import { useUsersArchived } from '../composables/useUsersArchived'

const router = useRouter()
const toast  = useToast()

const {
  archivedUsers,
  loading,
  error,
  loadArchivedUsers,
  handleRestore,
} = useUsersArchived()

async function onRestore(id: number) {
  try {
    await handleRestore(id)
    toast.add({ severity: 'success', summary: 'تم', detail: 'تم استعادة المستخدم بنجاح', life: 3000 })
  } catch {
    toast.add({ severity: 'error', summary: 'خطأ', detail: 'فشل استعادة المستخدم', life: 3000 })
  }
}

onMounted(() => loadArchivedUsers())
</script>

<template>
  <div class="p-4">

    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-3">
        <Button icon="pi pi-arrow-right" text rounded @click="router.back()" />
        <h1 class="text-2xl font-bold">المستخدمون المؤرشفون</h1>
      </div>
    </div>

    <!-- Error -->
    <Message v-if="error" severity="error" class="mb-4">{{ error }}</Message>

    <!-- Table -->
    <UserTable
      :users="archivedUsers"
      :loading="loading"
      :showRestore="true"
      @restore="onRestore($event)"
    />

  </div>
</template>