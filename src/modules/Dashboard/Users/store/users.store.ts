// ============================================================
// modules/Dashboard/Users/store/users.store.ts
// =======================================================

import {defineStore} from 'pinia';
import {ref} from 'vue';
import {usersApi} from '../api/users.api';
import type { User, StoreUserPayload, UpdateUserPayload, UsersIndexFilter } from '../types/users.types'
import type { PaginatedData } from '../../../../shared/shared.types';

export const useUserStore = defineStore('users', ()=>{
    // ============================================================
    // State
    // ============================================================
    const users         = ref<PaginatedData<User> | null>(null);
    const archivedUsers = ref<PaginatedData<User> | null>(null);
    const selectedUser  = ref<User | null>(null);
    const loading       = ref(false);
    const error         = ref<string | null>(null)

    // ============================================================
    // Helpers
    // ============================================================
    function setLoading(val: boolean) {
        loading.value = val;
        if (val) error.value = null
    }

    function setError(msg: string) {
        error.value = msg
        loading.value = false;
    }

    // ============================================================
    // Actions
    // ============================================================
    async function fetchUsers(params?: UsersIndexFilter) {
        setLoading(true)

        try {
            const res = await usersApi.index(params);
            users.value = res.data.data as PaginatedData<User>
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'فشل جلب المستخدمين');
        } finally {
            loading.value = false
        }
    }

    async function fetchUser(id: number) {
        setLoading(true);

        try {
            const res = await usersApi.show(id)
            selectedUser.value = res.data.data.data
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'فشل جلب المستخدم')
        } finally {
            loading.value = false
        }
    }

    async function createUser(payload: StoreUserPayload) {
        setLoading(true);

        try {
            const res = await usersApi.store(payload)
            return res.data;
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'قشل انشاء مستخدم')
            throw err;
        } finally {
            loading.value = false
        }
    }

    async function updateUser(id: number, payload: UpdateUserPayload) {
        setLoading(true)

        try {
            const res = await usersApi.update(id, payload)
            if (users.value) {
                const index = users.value.data.findIndex(u=>u.id === id)
                if (index !== -1) users.value.data[index] = res.data.data.data;
            }
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'فشل تعديل المستخدم')
            throw err
        } finally {
            loading.value = false
        }
    }

    async function deleteUser(id: number) {
        setLoading(true)

        try {
            await usersApi.destroy(id);
            if (users.value) {
                users.value.data = users.value.data.filter(u=>u.id !== id)
                users.value.total -=1
            }
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'فشل حذف المستخدم')
            throw err
        } finally {
            loading.value = false
        }
    }

    async function fetchArchivedUsers() {
        setLoading(true)

        try {
            const res = await usersApi.archived()
            archivedUsers.value = res.data.data as PaginatedData<User>
        }  catch (err: any) {
            setError(err?.response?.data?.message ?? 'فشل جلب المستخدمين المؤرشفين')
        } finally {
            loading.value = false;
        }
    }

    async function restoreUser(id: number) {
        setLoading(true)

        try {
            const res = await usersApi.restore(id)
            if (archivedUsers.value) {
                archivedUsers.value.data = archivedUsers.value.data.filter(u=>u,id !== id)
                archivedUsers.value.total -= 1
            }
            return res.data
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'فشل استعادة المستخدم')
            throw err
        } finally {
            loading.value = false
        }
    }

    function clearSelected() {
        selectedUser.value = null
    }

    function clearError() {
        error.value = null;
    }

    // ============================================================
    // Return
    // ============================================================
    return {
        //state
        users,
        archivedUsers,
        selectedUser,
        loading,
        error,

        //action
        fetchUsers,
        fetchUser,
        createUser,
        updateUser,
        deleteUser,
        fetchArchivedUsers,
        restoreUser,
        clearSelected,
        clearError,
    }
})