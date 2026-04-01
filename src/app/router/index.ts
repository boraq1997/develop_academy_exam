/**
 * src/app/router/index.ts
 * ✅ Fixed: proper auth redirects, guest guard, and layout wrapping
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../../modules/Auth/store/auth.store'

// ─── Auth Routes (بدون Layout) ────────────────────────────────────────────────
const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../../modules/Auth/pages/Login.vue'),
    meta: { guest: true, title: 'تسجيل الدخول' },
  },
]

// ─── App Routes (داخل AppLayout) ──────────────────────────────────────────────
const appRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../../components/layout/AppLayout.vue'),
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
        component: () => import('../../views/Home.vue'),
        meta: { requiresAuth: true, title: 'الاختبارات' },
      },
      {
        path: 'questions',
        name: 'Questions',
        component: () => import('../../views/Home.vue'),
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
        component: () => import('../../modules/Dashboard/Users/pages/UsersListPage.vue'),
        meta: { requiresAuth: true, title: 'المستخدمون' },
      },
      {
        path: 'roles',
        name: 'RolesIndex',
        component: () => import('../../modules/Dashboard/Permissions/pages/RolesIndexPage.vue'),
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
]

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  ...appRoutes,
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../../others/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ─── Navigation Guard ──────────────────────────────────────────────────────────
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // ✅ إذا كان هناك توكن محفوظ لكن لم يُجلب المستخدم بعد — نجلبه أولاً
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser()
    } catch {
      // فشل جلب المستخدم = توكن منتهي أو غير صالح
      await authStore.logout()
      // ✅ توجيه لـ Login فقط إذا كانت الصفحة تتطلب مصادقة
      if (to.meta.requiresAuth) {
        return next({ name: 'Login' })
      }
      return next()
    }
  }

  // ✅ صفحة تتطلب مصادقة والمستخدم غير مسجّل → Login
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'Login' })
  }

  // ✅ صفحة للضيوف فقط (مثل /login) والمستخدم مسجّل → Home
  if (to.meta.guest && authStore.isLoggedIn) {
    return next({ name: 'Home' })
  }

  next()
})

export default router