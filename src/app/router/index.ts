/**
 * src/app/router/index.ts
 * Main router configuration for the Vue application.
 */

import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../../modules/Auth/store/auth.store';

// Auth Module Routes (no layout)
const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../../modules/Auth/pages/Login.vue'),
    meta: { guest: true },
  },
];

// Main Application Routes (wrapped inside AppLayout)
const appRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../../components/layout/AppLayout.vue'), // 👈 Layout wrapper
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../../views/Home.vue'),
        meta: { requiresAuth: true, title: 'الرئيسية' },
      },
      {
        path: 'exams',
        name: 'Exams',
        component: () => import('../../views/Home.vue'), // replace with real component later
        meta: { requiresAuth: true, title: 'الاختبارات' },
      },
      {
        path: 'questions',
        name: 'Questions',
        component: () => import('../../views/Home.vue'), // replace with real component later
        meta: { requiresAuth: true, title: 'بنك الأسئلة' },
      },
      {
        path: 'results',
        name: 'Results',
        component: () => import('../../views/Home.vue'),
        meta: { requiresAuth: true, title: 'النتائج' },
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('../../views/Home.vue'),
        meta: { requiresAuth: true, title: 'التقارير' },
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../../views/Home.vue'),
        meta: { requiresAuth: true, title: 'المستخدمون' },
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('../../views/Home.vue'),
        meta: { requiresAuth: true, title: 'الصلاحيات' },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../../views/Home.vue'),
        meta: { requiresAuth: true, title: 'الإعدادات' },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../../views/Home.vue'),
        meta: { requiresAuth: true, title: 'الملف الشخصي' },
      },
    ],
  },
];

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  ...appRoutes,
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../../others/NotFound.vue'),
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
      await authStore.fetchUser();
    } catch (error) {
      authStore.logout();
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