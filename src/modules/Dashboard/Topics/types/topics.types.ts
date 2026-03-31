// ============================================================
// modules/Dashboard/Topics/types/topics.types.ts
// Types وحدة المواضيع
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'

// ============================================================
// Topic
// ============================================================

export interface Topic extends Timestamps {
    id: number
    name: string
    data: Record<string, unknown> | null
    subject_id: number
    subject?: TopicSubject
}

export interface TopicSubject {
    id: number
    name: string
}

// ============================================================
// Store Topic  –  POST /topics
// ============================================================

export interface StoreTopicPayload {
    name: string
    subject_id: number
    data?: Record<string, unknown>
}

// ============================================================
// Update Topic  –  PATCH /topics/{id}
// ============================================================

export interface UpdateTopicPayload {
    name?: string
    subject_id?: number
    data?: Record<string, unknown>
}