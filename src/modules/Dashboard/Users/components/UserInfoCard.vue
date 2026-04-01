<script setup lang="ts">
// ============================================================
// modules/Dashboard/Users/components/UserInfoCard.vue
// بطاقة عرض تفاصيل المستخدم
// ============================================================
import Tag from 'primevue/tag'
import type { User } from '../types/users.types'
import { usersService } from '../services/users.service'

// ============================================================
// Props
// ============================================================
defineProps<{
  user: User
}>()
</script>

<template>
  <div class="card p-6">

    <!-- Header -->
    <div class="flex items-center gap-4 mb-6 pb-4 border-b">
      <div class="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
        <i class="pi pi-user text-2xl text-primary-600" />
      </div>
      <div>
        <h2 class="text-xl font-bold">{{ user.name }}</h2>
        <p class="text-gray-500 text-sm">{{ user.email }}</p>
      </div>
      <Tag
        class="mr-auto"
        :value="usersService.isArchived(user) ? 'محذوف' : 'نشط'"
        :severity="usersService.isArchived(user) ? 'danger' : 'success'"
      />
    </div>

    <!-- Details Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div class="flex flex-col gap-1">
        <span class="text-gray-400 text-xs font-medium uppercase">نوع المستخدم</span>
        <span class="font-medium">{{ usersService.getUserTypeLabel(user) }}</span>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-gray-400 text-xs font-medium uppercase">المرحلة الدراسية</span>
        <span class="font-medium">{{ usersService.getStageLabel(user) }}</span>
      </div>

      <div class="flex flex-col gap-1 md:col-span-2">
        <span class="text-gray-400 text-xs font-medium uppercase">المواد الدراسية</span>
        <div class="flex flex-wrap gap-2 mt-1">
          <Tag
            v-for="subject in user.subjects"
            :key="subject.id"
            :value="subject.name"
            severity="info"
          />
          <span v-if="!user.subjects?.length" class="text-gray-400">—</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-gray-400 text-xs font-medium uppercase">تاريخ الإنشاء</span>
        <span class="font-medium">{{ new Date(user.created_at).toLocaleDateString('ar-IQ') }}</span>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-gray-400 text-xs font-medium uppercase">آخر تحديث</span>
        <span class="font-medium">{{ new Date(user.updated_at).toLocaleDateString('ar-IQ') }}</span>
      </div>

    </div>
  </div>
</template>