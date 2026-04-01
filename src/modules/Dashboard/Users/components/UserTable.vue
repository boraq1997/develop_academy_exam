<script setup lang="ts">
// ============================================================
// modules/Dashboard/Users/components/UserTable.vue
// جدول المستخدمين — قابل للاستخدام في القائمة والأرشيف
// ============================================================
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type { User } from '../types/users.types'
import { usersService } from '../services/users.service'

// ============================================================
// Props
// ============================================================
interface Props {
  users: User[]
  loading?: boolean
  showRestore?: boolean   // صفحة الأرشيف
  showActions?: boolean   // إخفاء أزرار الإجراءات
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showRestore: false,
  showActions: true,
})

// ============================================================
// Emits
// ============================================================
const emit = defineEmits<{
  view:    [id: number]
  edit:    [id: number]
  delete:  [id: number]
  restore: [id: number]
}>()
</script>

<template>
  <DataTable
    :value="users"
    :loading="loading"
    stripedRows
    showGridlines
    responsiveLayout="scroll"
    class="w-full"
  >

    <Column field="id" header="#" style="width: 60px" />

    <Column field="name" header="الاسم" />

    <Column field="email" header="البريد الإلكتروني" />

    <Column header="النوع">
      <template #body="{ data }">
        <span>{{ usersService.getUserTypeLabel(data) }}</span>
      </template>
    </Column>

    <Column header="المرحلة">
      <template #body="{ data }">
        <span>{{ usersService.getStageLabel(data) }}</span>
      </template>
    </Column>

    <Column header="المواد">
      <template #body="{ data }">
        <span>{{ usersService.getSubjectsLabel(data) }}</span>
      </template>
    </Column>

    <Column header="الحالة" style="width: 100px">
      <template #body="{ data }">
        <Tag
          :value="usersService.isArchived(data) ? 'محذوف' : 'نشط'"
          :severity="usersService.isArchived(data) ? 'danger' : 'success'"
        />
      </template>
    </Column>

    <!-- أزرار القائمة العادية -->
    <Column v-if="showActions && !showRestore" header="الإجراءات" style="width: 130px">
      <template #body="{ data }">
        <div class="flex gap-1">
          <Button
            v-tooltip.top="'عرض'"
            icon="pi pi-eye"
            severity="info"
            text
            rounded
            size="small"
            @click="emit('view', data.id)"
          />
          <Button
            v-tooltip.top="'تعديل'"
            icon="pi pi-pencil"
            severity="warning"
            text
            rounded
            size="small"
            @click="emit('edit', data.id)"
          />
          <Button
            v-tooltip.top="'حذف'"
            icon="pi pi-trash"
            severity="danger"
            text
            rounded
            size="small"
            @click="emit('delete', data.id)"
          />
        </div>
      </template>
    </Column>

    <!-- زر الاستعادة في صفحة الأرشيف -->
    <Column v-if="showRestore" header="الإجراءات" style="width: 100px">
      <template #body="{ data }">
        <Button
          v-tooltip.top="'استعادة'"
          icon="pi pi-replay"
          severity="success"
          text
          rounded
          size="small"
          @click="emit('restore', data.id)"
        />
      </template>
    </Column>

    <template #empty>
      <div class="text-center py-10 text-gray-400">
        <i class="pi pi-inbox text-4xl mb-2 block" />
        <span>لا يوجد بيانات</span>
      </div>
    </template>

  </DataTable>
</template>