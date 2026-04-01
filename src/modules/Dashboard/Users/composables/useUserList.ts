// ============================================================
// modules/Dashboard/Users/composables/useUsersList.ts
// خاص بصفحة قائمة المستخدمين
// ============================================================

import {computed, ref} from 'vue';
import {useUserStore} from '../store/users.store';
import type {UsersIndexFilter} from '../types/users.types';

export function useUsersList() {
    const store = useUserStore();

    // ============================================================
    // Filters
    // ============================================================

    const filters = ref<UsersIndexFilter>({
        type_user_id: undefined,
        page: 1,
    })

    // ============================================================
    // Fetch
    // ============================================================
    async function loadUsers() {
        await store.fetchUsers(filters.value)
    }

    async function changePage(page: number) {
        filters.value.page = page
        await loadUsers()
    }

    async function filterByType(typeUserId: number | undefined) {
        filters.value.type_user_id = typeUserId
        filters.value.page = 1
        await loadUsers()
    }

    // ============================================================
    // Delete
    // ============================================================
    async function handleDelete(id: number) {
        await store.deleteUser(id)
    }

    // ============================================================
    // Computed
    // ============================================================
    const users         = computed(() => store.users?.data ?? [])
    const pagination    = computed(() => store.users)
    const loading       = computed(() => store.loading)
    const error         = computed(() => store.error)

    return {
        //state
        filters,
        users,
        pagination,
        loading,
        error,

        //actions
        loadUsers,
        changePage,
        filterByType,
        handleDelete,
    }
}