// ============================================================
// modules/Dashboard/Permissions/api/roles.api.ts
// ============================================================

import api from '../../../../services/api';
import type { ApiResponse } from '../../../../types/api';
import type {Role, PermissionsMap, RefreshPermissionsResponse} from '../types/roles.types';
import type { TypeUser } from '../types/type-user.types';

// ============================================================
// Roles
// ============================================================

export const getRoles = () =>
    api.get<ApiResponse<Role[]>>('/roles')

export const refreshPermissions = () =>
    api.post<ApiResponse<RefreshPermissionsResponse>>('/permission/refresh')

// ============================================================
// Current User Permissions
// ============================================================

export const getUserPermissions = () => 
    api.get<ApiResponse<PermissionsMap>>('/users/getpermissions')

export const getUserRoles = () =>
    api.get<ApiResponse<TypeUser>>('/user/roles')

