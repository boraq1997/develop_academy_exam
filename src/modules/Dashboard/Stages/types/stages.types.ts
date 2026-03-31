// ============================================================
// modules/Dashboard/Stages/types/stages.types.ts
// Types وحدة المراحل الدراسية
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'

// ============================================================
// Stage
// ============================================================

export interface Stage extends Timestamps {
    id: number
    name: string
    data: Record<string, unknown> | null
    subjects?: StageSubject[]
    users?: StageUser[]
}

export interface StageSubject {
    id: number
    name: string
}

export interface StageUser {
    id: number
    name: string
    email: string
}

// ============================================================
// Store Stage  –  POST /stages
// ============================================================

export interface StoreStagePayload {
    name: string
    data?: Record<string, unknown>
}

// ============================================================
// Update Stage  –  PATCH /stages/{id}
// ============================================================

export interface UpdateStagePayload {
    name?: string
    data?: Record<string, unknown>
}