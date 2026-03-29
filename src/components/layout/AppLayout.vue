<template>
  <div class="layout">

    <!-- Overlay (Mobile فقط) -->
    <div
      v-if="isMobile && mobileSidebarOpen"
      class="overlay"
      @click="mobileSidebarOpen = false"
    />

    <!-- Sidebar -->
    <div
      class="sidebar-wrapper"
      :class="{
        collapsed: !isMobile && sidebarCollapsed,
        mobile: isMobile,
        open: mobileSidebarOpen
      }"
    >
      <AppSidebar
        :collapsed="!isMobile && sidebarCollapsed"
        :mobile="isMobile"
        :open="mobileSidebarOpen"
        @close="mobileSidebarOpen = false"
      />
    </div>

    <!-- Main -->
    <div class="main">

      <!-- Topbar -->
      <AppTopbar
        @toggle-sidebar="handleToggleSidebar"
      />

      <!-- Content -->
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

const sidebarCollapsed = ref(false)
const mobileSidebarOpen = ref(false)
const isMobile = ref(false)

// detect screen
onMounted(() => {
  const check = () => {
    isMobile.value = window.innerWidth < 768
  }

  check()
  window.addEventListener('resize', check)
})

// toggle logic
const handleToggleSidebar = () => {
  if (isMobile.value) {
    mobileSidebarOpen.value = true
  } else {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
}
</script>

<style scoped>

/* ===== Layout ===== */
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  direction: rtl;
}

/* ===== Sidebar wrapper ===== */
.sidebar-wrapper {
  transition: all 0.3s ease;
}

/* Desktop */
.sidebar-wrapper {
  width: 250px;
}

.sidebar-wrapper.collapsed {
  width: 70px;
}

/* Mobile mode */
.sidebar-wrapper.mobile {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  transform: translateX(100%);
  z-index: 1000;
}

.sidebar-wrapper.mobile.open {
  transform: translateX(0);
}

/* ===== Overlay ===== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 999;
}

/* ===== Main ===== */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ===== Content ===== */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: var(--p-surface-ground);
}

/* ===== Animation ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>