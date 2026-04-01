// ============================================================
// modules/Dashboard/Users/api/users.api.ts
// ============================================================
import api from '../../../../services/api';
import type { ApiResponse, PaginatedData } from '../../../../shared/shared.types';
import type { User, StoreUserPayload, UpdateUserPayload, UsersIndexFilter } from '../types/users.types';

export const usersApi = {
    // GET /users?type_user_id=x
    index: (params?: UsersIndexFilter) =>
        api.get<ApiResponse<PaginatedData<User>>>('/users', { params }),

    // GET /users/{id}
    show: (id: number) =>
        api.get<ApiResponse<{ data: User }>>(`/users/${id}`),

    // GET /users/{id}/edit
    edit: (id: number) =>
        api.get<ApiResponse<User[]>>(`/users/${id}/edit`),

    // POST /users
    store: (payload: StoreUserPayload) =>
        api.post<ApiResponse<{ data: User }>>('/users', payload),

    // PATCH /users/{id}
    update: (id: number, payload: UpdateUserPayload) =>
        api.patch<ApiResponse<{ data: User }>>(`/users/${id}`, payload),

    // DELETE /users/{id}
    destroy: (id: number) =>
        api.delete<ApiResponse<[]>>(`/users/${id}`),

    // GET /users/archived
    archived: () =>
        api.get<ApiResponse<PaginatedData<User>>>('/users/archived'),

    // POST /users/{id}/restore
    restore: (id: number) =>
        api.post<ApiResponse<{ data: User }>>(`/users/${id}/restore`),
}