// ============================================================
// modules/Dashboard/Permissions/types/roles.types.ts
// Types وحدة الأدوار (Roles)
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'

// ============================================================
// Role Pivot
// ============================================================

export interface RolePivot {
    type_user_id: number
    role_id: number
    permission_role: string[]
}

// ============================================================
// Role
// ============================================================

export interface Role extends Timestamps {
    id: number
    name: string
    show_name: string | null
    description: string | null
    permissions: string[]
    pivot?: RolePivot
}

// ============================================================
// Store Role  –  POST /roles
// ============================================================

export interface StoreRolePayload {
    name: string
    show_name?: string
    description?: string
    permissions: string[]
}

// ============================================================
// Update Role  –  PATCH /roles/{id}
// ============================================================

export interface UpdateRolePayload {
    name?: string
    show_name?: string
    description?: string
    permissions?: string[]
}

// ============================================================
// Permissions Map  –  GET /user/getpermissions
// ============================================================

export type PermissionsMap = Record<string, string[]>

// ============================================================
// Refresh Permissions Response  –  POST /permissions/refresh
// ============================================================

export interface RefreshPermissionsResponse {
    user_id: number
    permissions: PermissionsMap
}