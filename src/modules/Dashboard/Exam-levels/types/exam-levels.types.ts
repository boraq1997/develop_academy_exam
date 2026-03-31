// ============================================================
// modules/Dashboard/Exam-levels/types/exam-levels.types.ts
// Types وحدة مستويات الامتحانات
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'

// ============================================================
// Enums
// ============================================================

export type TestingMethod = 'paper' | 'online'

export type ModelType = 'single' | 'group' | 'random'

export type ExamLevelStatus = 'pending' | 'progress' | 'done'

// ============================================================
// Pivot Weight Items
// ============================================================

export interface BloomWeight {
    id: number
    name: string | null
    weight: number
}

export interface DifficultyWeight {
    id: number
    name: string | null
    weight: number
}

export interface TopicWeight {
    id: number
    name: string | null
    weight: number
}

// ============================================================
// ExamLevel
// ============================================================

export interface ExamLevelCreator {
    id: number
    name: string
}

export interface ExamLevelSubject {
    id: number
    name: string
}

export interface ExamLevelStage {
    id: number
    name: string
    data: Record<string, unknown> | null
}

export interface ExamLevelSetsGenerated {
    mode: ModelType
    total_sets: number
    questions_per_set: number
    sets: Record<string | number, number[]>
    overlap_allowed?: boolean
    unique_attempted?: boolean
    overlap_applied?: boolean
    shortage_detected?: boolean
    unique_precheck?: {
        feasible: boolean
        unique_pool_size: number
        required_unique: number
    }
}

export interface ExamLevelOtherData {
    last_exam_generation?: string
    sets_generated?: ExamLevelSetsGenerated
    [key: string]: unknown
}

export interface ExamLevel extends Timestamps {
    id: number
    start_time: string | null
    end_time: string | null

    testing_method: TestingMethod | null
    testing_method_label_ar: string | null

    model_type: ModelType | null
    model_type_label_ar: string | null

    number_of_groups: number | null
    number_of_questions: number

    status: ExamLevelStatus | null
    status_label_ar: string | null

    is_active: boolean
    attempt_limit: number
    notes: string | null
    other_data: ExamLevelOtherData | null

    bloom_levels: BloomWeight[]
    difficulty_levels: DifficultyWeight[]
    topics: TopicWeight[]

    creator: ExamLevelCreator | null
    stage: ExamLevelStage | null
    subject: ExamLevelSubject | null
}

// ============================================================
// Weight Input (shared between store & update)
// ============================================================

export interface WeightItem {
    id: number
    weight: number
}

// ============================================================
// Store  –  POST /exam_levels
// ============================================================

export interface StoreExamLevelPayload {
    stage_id: number
    subject_id: number
    topics: WeightItem[]
    start_time?: string | null
    end_time?: string | null
    testing_method?: TestingMethod | null
    model_type?: ModelType | null
    number_of_groups?: number | null
    number_of_questions: number
    bloom_levels: WeightItem[]
    difficulty_levels: WeightItem[]
    is_active?: boolean | null
    attempt_limit?: number | null
    notes?: string | null
}

// ============================================================
// Update  –  PUT /exam_levels/{id}
// ============================================================

export interface UpdateExamLevelPayload {
    stage_id: number
    subject_id: number
    topics: WeightItem[]
    start_time?: string | null
    end_time?: string | null
    testing_method?: TestingMethod | null
    model_type?: ModelType | null
    number_of_groups?: number | null
    number_of_questions: number
    bloom_levels: WeightItem[]
    difficulty_levels: WeightItem[]
    status?: ExamLevelStatus | null
    is_active?: boolean | null
    attempt_limit?: number | null
    notes?: string | null
}

// ============================================================
// Patch Status  –  PATCH /exam_levels/{id}
// ============================================================

export interface PatchExamLevelPayload {
    status?: ExamLevelStatus | null
    is_active?: boolean | null
    start_time?: string | null
    end_time?: string | null
    testing_method?: TestingMethod | null
    attempt_limit?: number | null
    notes?: string | null
}

// ============================================================
// getCountQuestionLevelsByTopic
// GET /exam_levels/get_count_question_levels_by_topic
// ============================================================

export interface TopicQuestionsCount {
    topic_id: number
    name: string
    questions_count: number
    weight: number
}

export interface BloomQuestionsCount {
    id: number
    name: string
    n_of_questions: number
    weight: number
}

export interface DifficultyQuestionsCount {
    id: number
    name: string
    n_of_questions: number
    weight: number
}

export interface CountQuestionLevelsByTopicResponse {
    n_of_questions_have: number
    n_of_questions_need: number
    topics: TopicQuestionsCount[]
    bloom_levels: BloomQuestionsCount[]
    difficulty_levels: DifficultyQuestionsCount[]
}

export interface CountQuestionLevelsByTopicFilter {
    subject_id: number
    model_type: ModelType
    number_of_groups: number
    number_of_questions: number
    topic_ids: number[]
}