// ============================================================
// modules/Dashboard/Permissions/store/type-users.store.ts
// Pinia Store — أنواع المستخدمين (TypeUser)
// ============================================================

import {defineStore} from 'pinia';
import {ref} from 'vue'
import {
    getTypeUsers,
    getTypeUserById,
    storeTypeUser,
    updateTypeUser,
    destroyTypeUser,
    getArchivedTypeUsers,
    restoreTypeUser,
} from '../api/type-user.api'
import type {TypeUser, TypeUserDetail, StoreTypeUserPayload, UpdateTypeUserPayload} from '../types/type-user.types';

export const useTypeUsersStore = defineStore('typeUsers', ()=>{
    // ─── State ───────────────────────────────────────────────
    const typeUsers = ref<TypeUser[]>([])
    const archivedTypeUsers = ref<TypeUser[]>([])
    const selectedTypeUser = ref<TypeUserDetail | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // ─── Actions ─────────────────────────────────────────────
    async function fetchAll() {
        loading.value = true
        error.value = null

        try {
            const res = await getTypeUsers()
            typeUsers.value = res.data.data
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل جلب انواع المستخدمين'
        } finally {
            loading.value = false
        }
    }

    async function fetchById(id: number) {
        loading.value = true
        error.value = null

        try {
            const res = await getTypeUserById(id)
            selectedTypeUser.value = res.data.data
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل جلب نوع المستخدم'
        } finally {
            loading.value = false
        }
    }

    async function create(payload: StoreTypeUserPayload): Promise<boolean> {
        loading.value = true
        error.value = null

        try {
            const res = await storeTypeUser(payload)
            typeUsers.value.unshift(res.data.data)
            return true
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل إنشاء نوع المستخدم'
            return false
        } finally {
            loading.value = false
        }
    }

    async function update(id: number, payload: UpdateTypeUserPayload): Promise<boolean> {
        loading.value = true
        error.value = null
        try {
            const res = await updateTypeUser(id, payload)
            const idx = typeUsers.value.findIndex(tu => tu.id === id)
            if (idx !== -1) typeUsers.value[idx] = res.data.data
            if (selectedTypeUser.value?.id === id) {
                selectedTypeUser.value = { ...selectedTypeUser.value, ...res.data.data }
            }
            return true
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل تعديل نوع المستخدم'
            return false
        } finally {
            loading.value = false
        }
    }

    async function remove(id: number): Promise<boolean> {
        loading.value = true
        error.value = null
        try {
            await destroyTypeUser(id)
            typeUsers.value = typeUsers.value.filter(tu => tu.id !== id)
            if (selectedTypeUser.value?.id === id) selectedTypeUser.value = null
            return true
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل حذف نوع المستخدم'
            return false
        } finally {
            loading.value = false
        }
    }

    async function fetchArchived() {
        loading.value = true
        error.value = null
        try {
            const res = await getArchivedTypeUsers()
            archivedTypeUsers.value = res.data.data
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل جلب الأرشيف'
        } finally {
            loading.value = false
        }
    }

    async function restore(id: number): Promise<boolean> {
        loading.value = true
        error.value = null
        try {
            const res = await restoreTypeUser(id)
            archivedTypeUsers.value = archivedTypeUsers.value.filter(tu => tu.id !== id)
            typeUsers.value.unshift(res.data.data)
            return true
        } catch (err: any) {
            error.value = err?.response?.data?.message ?? 'فشل استعادة نوع المستخدم'
            return false
        } finally {
            loading.value = false
        }
    }

    function clearSelected() {
        selectedTypeUser.value = null
    }

    function clearError() {
        error.value = null
    }

    return {
        // State
        typeUsers,
        archivedTypeUsers,
        selectedTypeUser,
        loading,
        error,

        // Actions
        fetchAll,
        fetchById,
        create,
        update,
        remove,
        fetchArchived,
        restore,
        clearSelected,
        clearError,
    }
})