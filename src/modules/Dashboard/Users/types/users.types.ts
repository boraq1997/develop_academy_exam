// ============================================================
// modules/Dashboard/Users/types/users.types.ts
// Types وحدة المستخدمين
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'
import type { TypeUser, UserInformation } from '../../Permissions/types/permissions.types'

// ============================================================
// Stage & Subject (minimal, to avoid circular imports)
// ============================================================

export interface UserStage {
    id: number
    name: string
    data: Record<string, unknown> | null
}

export interface UserSubject {
    id: number
    name: string
}

// ============================================================
// User
// ============================================================

export interface User extends Timestamps {
    id: number
    name: string
    email: string
    type_user_id: number
    email_verified_at: string | null
    type_user?: TypeUser
    information?: UserInformation
    stage?: UserStage
    subjects?: UserSubject[]
}

// ============================================================
// Store User (Register)  –  POST /users
// ============================================================

export interface StoreUserPayload {
    name: string
    email: string
    password: string
    type_user_id: number
    stage_id?: number
    data: Record<string, unknown>
    subject_ids?: number[]
}

// ============================================================
// Update User  –  PATCH /users/{id}
// ============================================================

export interface UpdateUserPayload {
    name?: string
    email?: string
    password?: string
    type_user_id?: number
    stage_id?: number
    data?: Record<string, unknown>
    subject_ids?: number[]
}

// ============================================================
// Query / Filters
// ============================================================

export interface UsersIndexFilter {
    type_user_id?: number
    page?: number
}