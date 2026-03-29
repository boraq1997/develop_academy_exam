<template>
  <div class="flex flex-column gap-1 p-2">

    <template v-for="item in menuItems" :key="item.label">

      <!-- Section -->
      <div
        v-if="item.separator"
        class="text-xs font-semibold text-color-secondary px-3 pt-3 pb-1"
      >
        {{ item.label }}
      </div>

      <!-- Item -->
      <router-link
        v-else
        :to="item.to"
        custom
        v-slot="{ navigate, isActive }"
      >
        <div
          class="flex align-items-center gap-3 px-3 py-2 border-round-lg cursor-pointer transition-all"
          :class="isActive
            ? 'bg-primary-100 text-primary-700 font-semibold'
            : 'text-color hover:bg-surface-100'"
          @click="() => { navigate(); $emit('item-click') }"
        >
          <i :class="[item.icon]" />

          <span class="text-sm flex-1">
            {{ item.label }}
          </span>

          <Badge
            v-if="item.badge"
            :value="item.badge"
            severity="warn"
          />
        </div>
      </router-link>

    </template>

  </div>
</template>

<script setup lang="ts">
defineEmits(['item-click'])

const menuItems = [
  { separator: true, label: 'القائمة الرئيسية' },
  { label: 'الرئيسية', to: '/', icon: 'pi pi-home' },
  { label: 'الاختبارات', to: '/exams', icon: 'pi pi-file-edit', badge: '5' },
  { label: 'بنك الأسئلة', to: '/questions', icon: 'pi pi-list' },
  { label: 'النتائج', to: '/results', icon: 'pi pi-chart-bar' },
  { label: 'التقارير', to: '/reports', icon: 'pi pi-chart-line' },

  { separator: true, label: 'الإدارة' },
  { label: 'المستخدمون', to: '/users', icon: 'pi pi-users' },
  { label: 'الصلاحيات', to: '/roles', icon: 'pi pi-shield' },
  { label: 'الإعدادات', to: '/settings', icon: 'pi pi-cog' },
]
</script>