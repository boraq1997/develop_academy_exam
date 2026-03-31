// ============================================================
// modules/Dashboard/Subjects/types/subjects.types.ts
// Types وحدة المواد الدراسية
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'

// ============================================================
// Subject
// ============================================================

export interface Subject extends Timestamps {
    id: number
    name: string
    stage?: SubjectStage | null
    users?: SubjectUserGroup[]
    topics?: SubjectTopic[]
}

export interface SubjectStage {
    id: number
    name: string
    data: Record<string, unknown> | null
}

export interface SubjectTopic {
    id: number
    name: string
}

// ----- Users grouped by TypeUser inside Subject -----

export interface SubjectUserGroup {
    type_user: {
        id: number | null
        name: string | null
        users: SubjectUserBasic[]
    }
}

export interface SubjectUserBasic {
    id: number
    name: string
}

// ============================================================
// Store Subject  –  POST /subjects
// ============================================================

export interface StoreSubjectPayload {
    name: string
    stage_id: number
    users_id?: number[]
}

// ============================================================
// Update Subject  –  PATCH /subjects/{id}
// ============================================================

export interface UpdateSubjectPayload {
    name?: string
    stage_id?: number
    users_id?: number[]
}

// ============================================================
// Filters
// ============================================================

export interface SubjectsIndexFilter {
    typeuser_ids: number[]
}