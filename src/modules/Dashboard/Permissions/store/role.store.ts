// ============================================================
// modules/Dashboard/Permissions/store/roles.store.ts
// Pinia Store — الأدوار وصلاحيات المستخدم الحالي
// ============================================================

import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getRoles,
    getUserPermissions,
    refreshPermissions,
} from '../api/Roles.api'
import type { Role, PermissionsMap } from '../types/roles.types'

export const useRolesStore = defineStore('roles', () => {
    // ─── State ───────────────────────────────────────────────
    const roles = ref<Role[]>([])
    const permissions = ref<PermissionsMap>({})
    const loading = ref(false)
    const error = ref<string | null>(null)

    // ─── Actions ─────────────────────────────────────────────

    /**
     * جلب جميع الأدوار من الـ API
     * GET /roles  (يتطلب Roles:view)
     */
    async function fetchRoles() {
        loading.value = true
        error.value = null
        try {
            const res = await getRoles()
            roles.value = res.data.data
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل جلب الأدوار'
        } finally {
            loading.value = false
        }
    }

    /**
     * جلب صلاحيات المستخدم الحالي كـ PermissionsMap
     * GET /user/getpermissions
     */
    async function fetchPermissions() {
        loading.value = true
        error.value = null
        try {
            const res = await getUserPermissions()
            permissions.value = res.data.data
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل جلب الصلاحيات'
        } finally {
            loading.value = false
        }
    }

    /**
     * إعادة بناء كاش الصلاحيات
     * POST /permissions/refresh
     */
    async function refreshPermission() {
        loading.value = true
        error.value = null
        try {
            const res = await refreshPermissions()
            permissions.value = res.data.data.permissions
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل تحديث الصلاحيات'
        } finally {
            loading.value = false
        }
    }

    /**
     * التحقق من صلاحية معينة
     */
    function can(role: string, action: string): boolean {
        const actions = permissions.value?.[role]
        return Array.isArray(actions) && actions.includes(action)
    }

    /**
     * مسح حالة الخطأ
     */
    function clearError() {
        error.value = null
    }

    return {
        // State
        roles,
        permissions,
        loading,
        error,

        // Actions
        fetchRoles,
        fetchPermissions,
        refreshPermission,
        can,
        clearError,
    }
})