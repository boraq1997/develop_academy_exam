<script setup lang="ts">
// ============================================================
// modules/Dashboard/Users/pages/UsersListPage.vue
// ============================================================
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import Message from 'primevue/message'
import { useToast } from 'primevue/usetoast'
import UserTable from '../components/UserTable.vue'
import UserDeleteDialog from '../components/UserDeleteDialog.vue'
import { useUsersList } from '../composables/useUserList'
import type { User } from '../types/users.types'

const router = useRouter()
const toast  = useToast()

const {
  users,
  pagination,
  loading,
  error,
  loadUsers,
  changePage,
  handleDelete,
} = useUsersList()

// ============================================================
// Delete Dialog
// ============================================================
const deleteDialog  = ref(false)
const deleteLoading = ref(false)
const selectedUser  = ref<User | null>(null)

function openDeleteDialog(id: number) {
  selectedUser.value = users.value.find(u => u.id === id) ?? null
  deleteDialog.value = true
}

async function confirmDelete() {
  if (!selectedUser.value) return
  deleteLoading.value = true
  try {
    await handleDelete(selectedUser.value.id)
    toast.add({ severity: 'success', summary: 'تم', detail: 'تم حذف المستخدم بنجاح', life: 3000 })
    deleteDialog.value = false
  } catch {
    toast.add({ severity: 'error', summary: 'خطأ', detail: 'فشل حذف المستخدم', life: 3000 })
  } finally {
    deleteLoading.value = false
    selectedUser.value = null
  }
}

onMounted(() => loadUsers())
</script>

<template>
  <div class="p-4">

    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">المستخدمون</h1>
      <div class="flex gap-2">
        <Button
          label="المؤرشفون"
          icon="pi pi-inbox"
          severity="secondary"
          outlined
          @click="router.push({ name: 'users.archived' })"
        />
        <Button
          label="إضافة مستخدم"
          icon="pi pi-plus"
          @click="router.push({ name: 'users.create' })"
        />
      </div>
    </div>

    <!-- Error -->
    <Message v-if="error" severity="error" class="mb-4">{{ error }}</Message>

    <!-- Table -->
    <UserTable
      :users="users"
      :loading="loading"
      @view="router.push({ name: 'users.show', params: { id: $event } })"
      @edit="router.push({ name: 'users.edit', params: { id: $event } })"
      @delete="openDeleteDialog($event)"
    />

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="flex justify-center mt-4">
      <Paginator
        :rows="pagination.per_page"
        :totalRecords="pagination.total"
        :first="(pagination.current_page - 1) * pagination.per_page"
        @page="changePage($event.page + 1)"
      />
    </div>

    <!-- Delete Dialog -->
    <UserDeleteDialog
      v-model:visible="deleteDialog"
      :loading="deleteLoading"
      :userName="selectedUser?.name"
      @confirm="confirmDelete"
      @cancel="deleteDialog = false"
    />

  </div>
</template>