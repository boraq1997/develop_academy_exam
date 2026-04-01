// ============================================================
// modules/Dashboard/Permissions/composables/useTypeUsers.ts
// Composable — أنواع المستخدمين
// ============================================================

import { computed } from 'vue'
import { useTypeUsersStore } from '../store/type-users.store'
import { storeToRefs } from 'pinia'
import type { StoreTypeUserPayload, UpdateTypeUserPayload } from '../types/type-user.types'

export function useTypeUsers() {
    const store = useTypeUsersStore()
    const { typeUsers, selectedTypeUser, loading, error } = storeToRefs(store)

    // ─── Actions ─────────────────────────────────────────────
    const fetchAll = async () => {
        await store.fetchAll()
    }

    const fetchById = async (id: number) => {
        await store.fetchById(id)
    }

    const create = async (payload: StoreTypeUserPayload) => {
        return await store.create(payload)
    }

    const update = async (id: number, payload: UpdateTypeUserPayload) => {
        return await store.update(id, payload)
    }

    const remove = async (id: number) => {
        return await store.remove(id)
    }

    const fetchArchived = async () => {
        await store.fetchArchived()
    }

    const restore = async (id: number) => {
        return await store.restore(id)
    }

    const clearSelected = () => {
        store.clearSelected()
    }

    // ─── Helpers ─────────────────────────────────────────────
    // خيارات Dropdown للـ TypeUser (تُستخدم في فلتر المستخدمين وإنشاء مستخدم جديد)
    const typeUsersOptions = computed(() =>
        typeUsers.value.map(tu => ({
            label: tu.show_name ?? tu.name,
            value: tu.id,
        }))
    )

    return {
        // State
        typeUsers,
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

        // Helpers
        typeUsersOptions,
    }
}