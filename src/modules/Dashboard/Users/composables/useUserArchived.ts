// ============================================================
// modules/Dashboard/Users/composables/useUsersArchived.ts
// خاص بصفحة المستخدمين المؤرشفين
// ============================================================

import {computed} from 'vue';
import { useUserStore } from '../store/users.store';

export function loadArchivedUsers() {
    const store = useUserStore();

    // ============================================================
    // Fetch
    // ============================================================

    async function loadArchivedUsers() {
        await store.fetchArchivedUsers()
    }

    // ============================================================
    // Restore
    // ============================================================

    async function handleRestore(id: number) {
        await store.restoreUser(id)
    }

    // ============================================================
    // Computed
    // ============================================================

    const archivedUsers     = computed(() => store.archivedUsers?.data ?? [])
    const pagination        = computed(() => store.archivedUsers)
    const loading           = computed(() => store.loading)
    const error             = computed(() => store.error)
    const isEmpty           = computed(() => archivedUsers.value.length)

    return {
        //state
        archivedUsers,
        pagination,
        loading,
        error,
        isEmpty,

        //actions
        loadArchivedUsers,
        handleRestore,
    }
}