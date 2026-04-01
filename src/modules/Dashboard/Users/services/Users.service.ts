// ============================================================
// modules/Dashboard/Users/services/users.service.ts
// Business logic & helper functions — لا علاقة له بالـ state
// ============================================================

import type {User, StoreUserPayload, UpdateUserPayload} from '../types/users.types'

export const usersService = {

    // ============================================================
    // Format
    // ============================================================

    formatUserForForm(user: User): Omit<StoreUserPayload, 'password'> {
        return {
            name:           user.name,
            email:          user.email,
            type_user_id:   user.type_user_id,
            stage_id:       user.information?.stage_id ?? undefined,
            data:           (user.information?.data as Record<string, unknown>) ?? {},
            subject_ids:    user.subjects?.map(s=>s.id) ?? [],
        }
    },

    buildUpdatePayload(form: UpdateUserPayload): UpdateUserPayload {
        const payload: UpdateUserPayload = {...form}

        if (!payload.password?.trim()) {
            delete payload.password
        }
        return payload
    },

    // ============================================================
    // Display Helpers
    // ============================================================

    getUserTypeLabel(user: User): string {
        return user.type_user?.show_name ?? user.type_user?.name ?? '-'
    },

    getStageLabel(user: User): string {
        return user.stage?.name ?? '-'
    },

    getSubjectsLabel(user:User): string {
        return user.subjects?.map(s=>s.name).join('. ') ?? '-'
    },

    isArchived(user: User): boolean {
        return !!user.deleted_at
    },

    // ============================================================
    // Validation
    // ============================================================

    validationStorePayload(payload: StoreUserPayload): string[] {
        const errors: string[] = []

        if (!payload.name?.trim())
            errors.push('الاسم مطلوب')

        if (!payload.email?.trim())
            errors.push('البريد الالكتروني مطلوب')
        else if (!isValidEmail(payload.email))
            errors.push('البريد الالكتروني غير صحيح')

        if (!payload.password?.trim())
            errors.push('كلمة المرور مطلوبة')
        else if (payload.password.length < 8)
            errors.push('كلمة المرور يجب ان تكون 8 احرف على الاقل')

        if (!payload.type_user_id)
            errors.push('نوع المستخدم مطلوب')

        return errors
    },

    validateUpdatePayload(payload: UpdateUserPayload): string[] {
        const errors: string[] = []

        if (payload.email && !isValidEmail(payload.email))
            errors.push('البريد الالكتروني غير صحيح')

        if (payload.password && payload.password.length < 8) 
            errors.push('كلمة المرور يجب ان تكون 8 احرف على الاقل')

        return errors
    },
}

// ============================================================
// Private Helpers
// ============================================================
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}