// ============================================================
// modules/Dashboard/Users/composables/useUserShow.ts
// خاص بصفحة تفاصيل المستخدم
// ============================================================

import {computed} from 'vue';
import { useUserStore } from '../store/users.store';

export function useUserShow(userId: number) {
    const store = useUserStore()

    // ============================================================
    // Fetch
    // ============================================================
    async function loadUser() {
        await store.fetchUser(userId)
    }

    // ============================================================
    // Computed
    // ============================================================

    const user      = computed(() => store.selectedUser)
    const loading   = computed(() => store.loading)
    const error     = computed(() => store.error)

    const userName      = computed(() => user.value?.name ?? '-')
    const userEmail     = computed(() => user.value?.email ?? '-')
    const userType      = computed(() => user.value?.type_user?.show_name ?? user.value?.type_user?.name ?? '-')
    const userStage     = computed(() => user.value?.stage?.name ?? '-')
    const userSubjects   = computed(() => user.value?.subjects ?? [])
    const isActive      = computed(() => !user.value?.deleted_at)

    return {
        //State
        user,
        loading,
        error,

        //Drived
        userName,
        userEmail,
        userType,
        userStage,
        userSubjects,
        isActive,

        //Action
        loadUser,
    }
}