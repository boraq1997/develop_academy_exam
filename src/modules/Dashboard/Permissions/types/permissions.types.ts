// ============================================================
// modules/Dashboard/Permissions/types/permissions.types.ts
// Types وحدة الصلاحيات (TypeUsers & Roles)
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'

// ============================================================
// Role
// ============================================================

export interface RolePivot {
    type_user_id: number
    role_id: number
    permission_role: string[]
}

export interface Role extends Timestamps {
    id: number
    name: string
    show_name: string | null
    description: string | null
    permissions: string[]
    pivot?: RolePivot
}

// ============================================================
// TypeUser
// ============================================================

export interface TypeUser extends Timestamps {
    id: number
    name: string
    show_name: string | null
    description: string | null
    roles?: Role[]
}

// ============================================================
// UserInformation (used by Users module)
// ============================================================

export interface UserInformation extends Timestamps {
    id: number
    user_id: number
    stage_id: number | null
    data: Record<string, unknown> | null
}

// ============================================================
// Store TypeUser  –  POST /typeusers
// ============================================================

export interface RolePermissionInput {
    id: number
    permissions: string[]
}

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
// Permissions Map
// ============================================================

export type PermissionsMap = Record<string, string[]>