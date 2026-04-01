// ============================================================
// modules/Dashboard/Permissions/composables/useRoles.ts
// Composable — الأدوار
// ============================================================

import {ref, computed} from 'vue'
import {useRolesStore} from '../store/role.store'
import {storeToRefs} from 'pinia'

export function useRoles() {
    const store = useRolesStore()
    const {roles, permissions, loading, error} = storeToRefs(store)

    // ─── Actions ────────────────────────────────────────────
    const fetchRoles = async()=>{
        await store.fetchRoles()
    }

    const fetchPermissions = async()=>{
        await store.fetchPermissions()
    }

    const refresh = async()=>{
        await store.refreshPermissions()
    }

    // ─── Helpers ─────────────────────────────────────────────
    const can = (role: string, action: string): boolean => {
        const actions = permissions.value?.[role]
        return Array.isArray(actions) && actions.includes(action)
    }

    const rolesOptions = computed(() =>
        roles.value.map(r=>({
            label: r.show_name ?? r.name,
            value: r.id,
            permissions: r.permissions,
        }))
    )

    return {
        //State
        roles,
        permissions,
        loading,
        error,

        //Actions
        fetchRoles,
        fetchPermissions,
        refresh,

        //Helpers
        can,
        rolesOptions
    }
}