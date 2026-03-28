/**
 * src/app/router/index.ts
 * Main router configuration for the Vue application.
 */

import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../../modules/Auth/store/auth.store';

// Auth Module Routes
const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../../modules/Auth/pages/Login.vue'),
    meta: { guest: true }, // Custom meta field to indicate guest-only route
  },
];

// Main Application Routes (Protected)
const appRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../../views/Home.vue'), // Assuming a Home.vue will be created later
    meta: { requiresAuth: true },
  },
  // ... other application routes will go here
];

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  ...appRoutes,
  // Catch-all route for 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../../others/NotFound.vue'), // Assuming a NotFound.vue will be created later
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser(); // 👈 أهم نقطة
    } catch (error) {
      authStore.logout(); // 🔥 امسح التوكن إذا فشل
      return next({ name: 'Login' });
    }
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'Login' });
  }

  if (to.meta.guest && authStore.isLoggedIn) {
    return next({ name: 'Home' });
  }

  next();
});

export default router;
