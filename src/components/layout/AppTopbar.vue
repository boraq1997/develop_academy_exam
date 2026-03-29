<template>
  <div class="flex align-items-center justify-content-between px-4 surface-section border-bottom-1 surface-border"
       style="height: 73px;">

    <!-- Right: Toggle + Page title -->
    <div class="flex align-items-center gap-3">

      <Button
        icon="pi pi-bars"
        text
        severity="secondary"
        rounded
        @click="$emit('toggle-sidebar')"
      />

      <div class="flex flex-column">
        <span class="font-semibold text-color" style="font-size: 15px; line-height: 1.2;">
          {{ currentTitle }}
        </span>
        <div class="flex align-items-center gap-1 text-xs text-color-secondary">
          <span>الرئيسية</span>
          <i class="pi pi-angle-left" style="font-size: 10px;" />
          <span class="text-primary">{{ currentTitle }}</span>
        </div>
      </div>

    </div>

    <!-- Left: Notif + User -->
    <div class="flex align-items-center gap-2">

      <!-- Notifications -->
      <Button
        icon="pi pi-bell"
        text
        severity="secondary"
        rounded
        badge="3"
        badge-severity="danger"
      />

      <!-- User Menu -->
      <div class="flex align-items-center gap-2">
        <Avatar
          icon="pi pi-user"
          shape="circle"
          class="cursor-pointer bg-primary"
          @click="toggleUserMenu"
        />
        <div class="flex flex-column cursor-pointer hidden md:flex" @click="toggleUserMenu">
          <span class="text-sm font-semibold text-color line-height-1">
            {{ authStore.user?.name || 'المستخدم' }}
          </span>
          <span class="text-xs text-color-secondary">مدير النظام</span>
        </div>
        <Button
          icon="pi pi-chevron-down"
          text
          severity="secondary"
          size="small"
          @click="toggleUserMenu"
        />
      </div>

      <!-- User Dropdown via PrimeVue Menu -->
      <Menu ref="userMenuRef" :model="userMenuItems" popup />

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../modules/Auth/store/auth.store';
import Menu from 'primevue/menu';

defineEmits(['toggle-sidebar']);

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const userMenuRef = ref();

const currentTitle = computed(() => (route.meta?.title as string) || 'الرئيسية');

const toggleUserMenu = (event: Event) => userMenuRef.value.toggle(event);

const userMenuItems = [
  {
    label: authStore.user?.name || 'المستخدم',
    items: [
      { label: 'الملف الشخصي', icon: 'pi pi-user-edit', command: () => router.push('/profile') },
      { label: 'الإعدادات',    icon: 'pi pi-cog',       command: () => router.push('/settings') },
      { label: 'المساعدة',     icon: 'pi pi-question-circle' },
    ],
  },
  { separator: true },
  {
    label: 'تسجيل الخروج',
    icon: 'pi pi-sign-out',
    command: async () => {
      await authStore.logout();
      router.push({ name: 'Login' });
    },
  },
];
</script>