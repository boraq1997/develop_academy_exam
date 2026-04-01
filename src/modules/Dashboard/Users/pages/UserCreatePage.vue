<script setup lang="ts">
// ============================================================
// modules/Dashboard/Users/pages/UserCreatePage.vue
// ============================================================
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useToast } from 'primevue/usetoast'
import UserForm from '../components/userForm.vue'
import { useUserForm } from '../composables/useUserForm'
import { usersService } from '../services/users.service'

// ---- بيانات مساعدة (typeUsers, stages, subjects) ستأتي من stores مخصصة لها ----
import { computed } from 'vue'
import { usePermissionsStore } from '../../Permissions/store/permissions.store'
import { useStagesStore } from '../../Stages/store/stages.store'
import { useSubjectsStore } from '../../Subjects/store/subjects.store'

const router = useRouter()
const toast  = useToast()

const permissionsStore = usePermissionsStore()
const stagesStore      = useStagesStore()
const subjectsStore    = useSubjectsStore()

const typeUsers = computed(() => permissionsStore.typeUsers ?? [])
const stages    = computed(() => stagesStore.stages?.data ?? [])
const subjects  = computed(() => subjectsStore.subjects?.data ?? [])

const { form, loading, error, submit } = useUserForm()

async function handleSubmit() {
  const errors = usersService.validateStorePayload(form.value)
  if (errors.length) {
    errors.forEach(e =>
      toast.add({ severity: 'warn', summary: 'تحقق من البيانات', detail: e, life: 3000 })
    )
    return
  }
  try {
    await submit()
    toast.add({ severity: 'success', summary: 'تم', detail: 'تم إنشاء المستخدم بنجاح', life: 3000 })
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
      <h1 class="text-2xl font-bold">إضافة مستخدم جديد</h1>
    </div>

    <!-- Error -->
    <Message v-if="error" severity="error" class="mb-4">{{ error }}</Message>

    <!-- Form Card -->
    <div class="card p-6">
      <UserForm
        v-model="form"
        :typeUsers="typeUsers"
        :stages="stages"
        :subjects="subjects"
      />

      <!-- Buttons -->
      <div class="flex gap-3 justify-end mt-6 pt-4 border-t">
        <Button label="إلغاء" severity="secondary" outlined @click="router.back()" />
        <Button
          label="حفظ"
          icon="pi pi-check"
          :loading="loading"
          @click="handleSubmit"
        />
      </div>
    </div>

  </div>
</template>