/**
 * src/types/api.d.ts
 * Defines common API response structures and data types.
 */

// Generic API Response structure from Laravel backend
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: string;
  errors?: Record<string, string[]>;
}

// Pagination meta data (common in Laravel API responses)
export interface PaginationData {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// Pagination links data
export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

// Paginated API Response structure
export interface PaginatedApiResponse<T = any> extends ApiResponse<T> {
  meta: PaginationMeta;
  links: PaginationLinks;
}

// Common structure for entities with soft deletes
export interface SoftDeletable {
  deleted_at: string | null;
}

// Example: User type (adjust based on your Laravel User model)
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles?: string[];
  permissions?: string[];
  // Add other user-related fields as per your Laravel User model
}

// Example: Login response structure
export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}
