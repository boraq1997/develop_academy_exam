<script setup lang="ts">
// ============================================================
// modules/Dashboard/Users/components/UserDeleteDialog.vue
// نافذة تأكيد الحذف
// ============================================================
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

// ============================================================
// Props & Emits
// ============================================================
defineProps<{
  visible: boolean
  loading?: boolean
  userName?: string
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    header="تأكيد الحذف"
    :style="{ width: '400px' }"
    @update:visible="emit('update:visible', $event)"
  >
    <div class="flex flex-col items-center gap-4 py-4">
      <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <i class="pi pi-exclamation-triangle text-3xl text-red-500" />
      </div>
      <p class="text-center text-gray-700">
        هل أنت متأكد من حذف المستخدم
        <strong v-if="userName"> "{{ userName }}"</strong>؟
        <br />
        <span class="text-sm text-gray-400">سيتم نقله إلى الأرشيف ويمكن استعادته لاحقاً.</span>
      </p>
    </div>

    <template #footer>
      <div class="flex gap-2 justify-end">
        <Button
          label="إلغاء"
          severity="secondary"
          outlined
          @click="emit('cancel')"
        />
        <Button
          label="تأكيد الحذف"
          severity="danger"
          icon="pi pi-trash"
          :loading="loading"
          @click="emit('confirm')"
        />
      </div>
    </template>
  </Dialog>
</template>