// ============================================================
// modules/Dashboard/Users/composables/useUserForm.ts
// خاص بصفحة إنشاء وتعديل المستخدم
// ============================================================

import {ref, computed} from 'vue';
import { useUserStore } from '../store/users.store';
import type {StoreUserPayload, UpdateUserPayload} from '../types/users.types'

export function useUserForm(userId?: number) {
    const store = useUserStore()

    const isEditMode = computed(() => !!userId)

    // ============================================================
    // Form State
    // ============================================================

    const form = ref<StoreUserPayload>({
        name: '',
        email: '',
        password: '',
        type_user_id: 0,
        stage_id: undefined,
        data: {},
        subject_ids: [],
    })

    // ============================================================
    // Load user data for edit mode
    // ============================================================

    async function loadForEdit(id: number) {
        await store.fetchUser(id)
        const user = store.selectedUser
        if (!user) return

        form.value = {
            name: user.name,
            email: user.email,
            password: '',
            type_user_id: user.type_user_id,
            stage_id: user.information?.stage_id ?? undefined,
            data: (user.information?.data as Record<string, unknown>) ?? {},
            subject_ids: user.subjects?.map(s=>s.id) ?? [],
        }
    }

    // ============================================================
    // Submit
    // ============================================================

    async function handleCreate() {
        return await store.createUser(form.value)
    }

    async function handleUpdate(id: number) {
        const payload: UpdateUserPayload = {...form.value}
        if (!payload.password) delete payload.password
        return await store.updateUser(id, payload)
    }

    async function submit() {
        if (isEditMode.value && userId) {
            return await handleUpdate(userId)
        }
        return await handleCreate()
    }

    // ============================================================
    // Reset
    // ============================================================

    function resetForm() {
        form.value = {
            name: '',
            email: '',
            password: '',
            type_user_id: 0,
            stage_id: undefined,
            data: {},
            subject_ids: [],
        }
        store.clearSelected()
        store.clearError()
    }

    // ============================================================
    // Computed
    // ============================================================

    const loading   = computed(() => store.loading)
    const error     = computed(() => store.error)

    return {
        //state
        form,
        isEditMode,
        loading,
        error,

        //action
        loadForEdit,
        submit,
        resetForm,
    }
}