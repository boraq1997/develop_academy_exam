// ============================================================
// shared/shared.types.ts
// Types مشتركة تُستخدم في جميع الوحدات
// ============================================================

// ----- API Response -----

export interface ApiResponse<T = unknown> {
    success: boolean
    message: string
    data: T
    errors: Record<string, string[]> | string[]
}

export interface PaginatedData<T> {
    data: T[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
    links: PaginationLink[]
    first_page_url: string
    last_page_url: string
    next_page_url: string | null
    prev_page_url: string | null
    path: string
}

export interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}

// ----- Timestamps -----

export interface Timestamps {
    created_at: string
    updated_at: string
    deleted_at: string | null
}

// ----- File / Token -----

export interface FileToken {
    url: string
    expires_at: string
}

export interface FileWithToken {
    text: string | null
    files: FileToken[]
}

// ----- Select Option -----

export interface SelectOption<T = number> {
    label: string
    value: T
}

// ----- Soft Delete Filter -----

export type TrashedFilter = 'active' | 'deleted'

// ----- Permissions Check -----

export interface OptionsCan {
    Questions_edit: boolean
    Questions_edit_status: boolean
    Questions_delete: boolean
}

// ----- File Upload -----

export interface FileUploadResponse {
    file_path: string
    url: string
    expires_at: string
}

export interface FileTokenResponse {
    url: string
    expires_at: string
}

export interface DeleteFilePayload {
    file_path: string
}

export interface UploadFilePayload {
    file: File
    pathname: string
}