// ============================================================
// modules/Dashboard/Permissions/api/type-user.api.ts
// طبقة API — أنواع المستخدمين (TypeUser)
// GET    /typeusers            → index (بدون permission)
// GET    /typeusers/{id}       → show (TypeUser:view)
// POST   /typeusers            → store (TypeUser:create)
// PATCH  /typeusers/{id}       → update (TypeUser:edit)
// DELETE /typeusers/{id}       → destroy (TypeUser:delete)
// GET    /typeusers/archived   → archived (TypeUser:archived)
// POST   /typeusers/{id}/restore → restore (TypeUser:archived)
// ============================================================

import api from '../../../../services/api'
import type { ApiResponse, PaginatedData } from '../../../../shared/shared.types'
import type {
    TypeUser,
    TypeUserDetail,
    StoreTypeUserPayload,
    UpdateTypeUserPayload
} from '../types/type-user.types'

// ============================================================
// Index
// ============================================================

export const getTypeUsers = () =>
    api.get<ApiResponse<TypeUser[]>>('/typeusers')

// ============================================================
// Show
// ============================================================
export const getTypeUserById = (id: number) =>
    api.get<ApiResponse<TypeUserDetail>>(`/typeusers/${id}`)

// ============================================================
// Store
// ============================================================

export const storeTypeUser = (payload: StoreTypeUserPayload)=>
    api.post<ApiResponse<TypeUser>>('typeusers', payload)

// ============================================================
// Update
// ============================================================

export const updateTypeUser = (id: number, payload: UpdateTypeUserPayload)=>
    api.patch<ApiResponse<TypeUser>>(`/typeusers/${id}`, payload)

// ============================================================
// Destroy
// ============================================================

export const destroyTypeUser = (id: number)=>
    api.delete<ApiResponse<TypeUser>>(`/typeusers/${id}`)

// ============================================================
// Archived
// ============================================================

export const getArchivedTypeUsers = () =>
    api.get<ApiResponse<TypeUser[]>>('/typeusers/archived')

// ============================================================
// Restore
// ============================================================

export const restoreTypeUser = (id: number) =>
    api.post<ApiResponse<TypeUser>>(`/typeusers/${id}/restore`)

