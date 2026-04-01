<script setup lang="ts">
// ============================================================
// modules/Dashboard/Users/pages/UserEditPage.vue
// ============================================================
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import { useToast } from 'primevue/usetoast'
import UserForm from '../components/UserForm.vue'
import { useUserForm } from '../composables/useUserForm'
import { usersService } from '../services/users.service'
import { usePermissionsStore } from '../../Permissions/store/permissions.store'
import { useStagesStore } from '../../Stages/store/stages.store'
import { useSubjectsStore } from '../../Subjects/store/subjects.store'

const route  = useRoute()
const router = useRouter()
const toast  = useToast()

const userId = Number(route.params.id)

const permissionsStore = usePermissionsStore()
const stagesStore      = useStagesStore()
const subjectsStore    = useSubjectsStore()

const typeUsers = computed(() => permissionsStore.typeUsers ?? [])
const stages    = computed(() => stagesStore.stages?.data ?? [])
const subjects  = computed(() => subjectsStore.subjects?.data ?? [])

const { form, loading, error, loadForEdit, submit } = useUserForm(userId)

onMounted(() => loadForEdit(userId))

async function handleSubmit() {
  const errors = usersService.validateUpdatePayload(form.value)
  if (errors.length) {
    errors.forEach(e =>
      toast.add({ severity: 'warn', summary: 'تحقق من البيانات', detail: e, life: 3000 })
    )
    return
  }
  try {
    await submit()
    toast.add({ severity: 'success', summary: 'تم', detail: 'تم تعديل المستخدم بنجاح', life: 3000 })
    router.push({ name: 'users.index' })
  } catch {
    // الخطأ يظهر من store.error
  }
}
</script>

<template>
  <div class="p-4 max-w-2xl mx-auto">

    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <Button icon="pi pi-arrow-right" text rounded @click="router.back()" />
      <h1 class="text-2xl font-bold">تعديل المستخدم</h1>
    </div>

    <!-- Loading (جلب بيانات المستخدم) -->
    <div v-if="loading && !form.name" class="flex justify-center py-20">
      <ProgressSpinner />
    </div>

    <template v-else>

      <!-- Error -->
      <Message v-if="error" severity="error" class="mb-4">{{ error }}</Message>

      <!-- Form Card -->
      <div class="card p-6">
        <UserForm
          v-model="form"
          :typeUsers="typeUsers"
          :stages="stages"
          :subjects="subjects"
          :isEditMode="true"
        />

        <!-- Buttons -->
        <div class="flex gap-3 justify-end mt-6 pt-4 border-t">
          <Button label="إلغاء" severity="secondary" outlined @click="router.back()" />
          <Button
            label="حفظ التعديلات"
            icon="pi pi-check"
            :loading="loading"
            @click="handleSubmit"
          />
        </div>
      </div>

    </template>
  </div>
</template>