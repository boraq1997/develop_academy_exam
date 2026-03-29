<template>
  <div class="sidebar" :class="{ collapsed, mobile }">

    <!-- Overlay (mobile) -->
    <div v-if="mobile" class="overlay" @click="emit('close')" />

    <!-- Sidebar -->
    <div class="sidebar-inner">

      <!-- Header -->
      <div class="sidebar-header">
        <div class="logo-box">
          <i class="pi pi-star-fill"></i>
        </div>

        <div v-if="!collapsed" class="brand-text">
          <span class="title">العتبة العباسية</span>
          <span class="subtitle">أكاديمية التطوير الإداري</span>
        </div>
      </div>

      <!-- Menu -->
      <div class="sidebar-content">

        <!-- Full -->
        <AppMenu
          v-if="!collapsed"
          @item-click="mobile && emit('close')"
        />

        <!-- Icons (desktop only) -->
        <div v-else-if="!mobile" class="icon-menu">
          <router-link
            v-for="item in iconOnlyItems"
            :key="item.to"
            :to="item.to"
            custom
            v-slot="{ navigate, isActive }"
          >
            <Button
              :icon="item.icon"
              text
              rounded
              class="icon-btn"
              :class="{ active: isActive }"
              v-tooltip.left="item.label"
              @click="navigate"
            />
          </router-link>
        </div>

      </div>

      <!-- Footer -->
      <div class="sidebar-footer" v-if="!collapsed">
        <div class="footer-content">
          <i class="pi pi-shield"></i>
          <span>نظام الاختبارات v2.0</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import AppMenu from './AppMenu.vue'

const props = defineProps<{
  collapsed?: boolean
  mobile?: boolean
}>()

const emit = defineEmits(['close'])

const iconOnlyItems = [
  { to: '/', icon: 'pi pi-home' },
  { to: '/exams', icon: 'pi pi-file-edit' },
  { to: '/questions', icon: 'pi pi-list' },
  { to: '/results', icon: 'pi pi-chart-bar' },
  { to: '/reports', icon: 'pi pi-chart-line' },
  { to: '/users', icon: 'pi pi-users' },
  { to: '/settings', icon: 'pi pi-cog' },
]
</script>

<style scoped>
/* ===== Layout ===== */
.sidebar {
  width: 260px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--p-surface-0);
  border-left: 1px solid var(--p-surface-200);
  transition: all 0.3s ease;
  overflow: hidden;
}

/* ===== Header ===== */
.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid var(--p-surface-200);
}

.sidebar.collapsed {
    width: 70px;
}

.sidebar-content {
  overflow-x: hidden; /* 🔥 مهم جداً */
}

.logo-box {
  width: 40px;
  height: 40px;
  background: var(--p-primary-500);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 14px;
  font-weight: 700;
  color: var(--p-text-color);
}

.subtitle {
  font-size: 11px;
  color: var(--p-text-muted-color);
}

/* ===== Content ===== */
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

/* ===== Icon Mode ===== */
.icon-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  width: 42px;
  height: 42px;
  color: var(--p-text-color);
}

.icon-btn.active {
  background: var(--p-primary-100);
  color: var(--p-primary-500);
}

/* ===== Footer ===== */
.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--p-surface-200);
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--p-text-muted-color);
}

.icon-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>