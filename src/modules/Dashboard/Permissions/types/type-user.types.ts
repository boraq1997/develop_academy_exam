// ============================================================
// modules/Dashboard/Permissions/types/type-user.types.ts
// Types وحدة أنواع المستخدمين (TypeUser)
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'
import type { Role } from './roles.types'

// ============================================================
// User Information (embedded in TypeUser show response)
// ============================================================

export interface UserInformation extends Timestamps {
    id: number
    user_id: number
    stage_id: number | null
    data: Record<string, unknown> | null
}

// ============================================================
// TypeUser (basic – used in lists)
// ============================================================

export interface TypeUser extends Timestamps {
    id: number
    name: string
    show_name: string | null
    description: string | null
    roles?: Role[]
}

// ============================================================
// TypeUser (detailed – GET /typeusers/{id})
// Includes paginated users list
// ============================================================

export interface TypeUserDetail extends TypeUser {
    users?: TypeUserUser[]
}

export interface TypeUserUser {
    id: number
    name: string
    email: string
}

// ============================================================
// Role Permission Input  –  used in store & update payloads
// ============================================================

export interface RolePermissionInput {
    id: number
    permissions: string[]
}

// ============================================================
// Store TypeUser  –  POST /typeusers
// ============================================================

export interface StoreTypeUserPayload {
    name: string
    show_name?: string
    description?: string
    role_ids?: RolePermissionInput[]
}

// ============================================================
// Update TypeUser  –  PATCH /typeusers/{id}
// ============================================================

export interface UpdateTypeUserPayload {
    name?: string
    show_name?: string
    description?: string
    role_ids?: RolePermissionInput[]
}

// ============================================================
// Query / Filters
// ============================================================

export interface TypeUserIndexFilter {
    page?: number
}