// ============================================================
// modules/Dashboard/Questions/types/questions.types.ts
// Types وحدة الأسئلة
// ============================================================

import type { Timestamps, FileWithToken, OptionsCan } from '../../../../shared/shared.types'
import type { Bloom } from '../../Blooms/types/blooms.types'
import type { DifficultyLevel } from '../../Difficulty-levels/types/difficulty-levels.types'

// ============================================================
// Enums
// ============================================================

export type QuestionType = 'options' | 'True/False' | 'text'

export type QuestionStatus = 'Writing' | 'Reviewing' | 'Accepting' | 'Rejecting'

export type QuestionLogTypeUser = 'writer' | 'referee'

export type QuestionLogStatus = 'Writing' | 'Reviewing' | 'Accepting' | 'Rejecting'

export type QuestionFileTarget = 'question_text' | `options.${number}`

// ============================================================
// Question Log
// ============================================================

export interface QuestionLog extends Timestamps {
    id: number
    type_user: QuestionLogTypeUser | null
    type_user_label_ar: string | null
    user_id: number
    user_name: string | null
    status: QuestionLogStatus | null
    status_label_ar: string | null
    notes: string | null
}

// ============================================================
// Question Statistic
// ============================================================

export interface QuestionStatistic {
    id: number
    name: string | null
    show_name: string | null
    value: number
    data: Record<string, unknown> | null
    created_at: string | null
    updated_at: string | null
}

// ============================================================
// Question Option
// ============================================================

export interface QuestionOption {
    text: string | null
    files: import('../../../../shared/shared.types').FileToken[]
}

// ============================================================
// Question
// ============================================================

export interface Question extends Timestamps {
    id: number
    question_text: FileWithToken
    question_type: QuestionType | null
    question_type_translation: string
    options: QuestionOption[]
    correct_answer: string
    bloom: Bloom | null
    difficulty_level: DifficultyLevel | null
    status: QuestionStatus | null
    status_translation: string
    status_options: QuestionStatus[]
    notes: string | null
    question_log: QuestionLog[]
    question_statistics: QuestionStatistic[]
    options_can: OptionsCan | null
}

// ============================================================
// Store / Update Payloads
// ============================================================

export interface QuestionTextInput {
    text: string
    files?: File[]
}

export interface QuestionOptionInput {
    text: string
    files?: File[]
}

export interface StoreQuestionPayload {
    topic_id: number
    question_type: QuestionType
    question_text: QuestionTextInput
    options?: QuestionOptionInput[]
    correct_answer: string
    blooms_id: number
    difficulty_level_id: number
    status?: QuestionStatus
    notes?: string | null
}

export interface UpdateQuestionPayload {
    topic_id?: number
    question_type?: QuestionType
    question_text?: Partial<QuestionTextInput>
    options?: Partial<QuestionOptionInput>[]
    correct_answer?: string
    blooms_id?: number
    difficulty_level_id?: number
    notes?: string | null
}

export interface UpdateQuestionStatusPayload {
    status: QuestionStatus
    notes?: string | null
}

// ============================================================
// File Payloads
// ============================================================

export interface StoreQuestionFilePayload {
    question_id: number
    target: QuestionFileTarget
    files: File[]
}

export interface DeleteQuestionFilePayload {
    question_id: number
    url_file: string
    target: QuestionFileTarget
}

// ============================================================
// Index Filters
// ============================================================

export interface QuestionsIndexFilter {
    trashed?: 'active' | 'deleted'
    status_filter?: QuestionStatus
}

// ============================================================
// Excel Import – Stage 1: Upload & Header Check
// ============================================================

export interface ExcelHeaderMismatch {
    index: number
    expected: string
    actual: string | null
}

export interface ExcelHeaderReport {
    exactMatch: boolean
    expected: string[]
    actual: (string | null)[]
    mismatches: ExcelHeaderMismatch[]
}

export interface ExcelUploadResponse {
    header: ExcelHeaderReport
    count: number
    rows: ExcelRawRow[]
}

export interface ExcelRawRow {
    index?: number | string | null
    concept?: string | null
    question?: string | null
    choice_a?: string | null
    choice_b?: string | null
    choice_c?: string | null
    choice_d?: string | null
    correct_answer?: string | null
    bloom_level?: string | null
    difficulty_level?: string | null
    [key: string]: unknown
}

// ============================================================
// Excel Import – Stage 2: Streaming Validation (SSE)
// ============================================================

export interface ValidationSummary {
    total: number
    ok: number
    withErrors: number
}

export interface StreamValidationHeader {
    type: 'header'
    success: boolean
    total: number
    chunkSize: number
    subject_id: number | null
    message: string
}

export interface StreamValidationChunkReport {
    rowNumber: number
    index: number | string | null
    ok: boolean
    errors: string[]
}

export interface StreamValidationChunk {
    type: 'chunk'
    processed: number
    total: number
    progress: number
    summary: ValidationSummary
    report: StreamValidationChunkReport[]
}

export interface QuestionImportQuestionRow {
    question_text: { text: string }
    options: { text: string }[]
    correct_answer: string
    blooms_id: number | null
    blooms_name: string
    difficulty_level_id: number | null
    difficulty_level_name: string
}

export interface QuestionImportGroup {
    subject_id: number | null
    Topic: string
    question_rows: QuestionImportQuestionRow[]
}

export interface ErrorRow {
    rowNumber: number
    index: number | string | null
    row: ExcelRawRow
    errors: string[]
}

export interface StreamValidationDone {
    type: 'done'
    processed: number
    total: number
    progress: number
    subject_id: number | null
    summary: ValidationSummary
    row_success: QuestionImportGroup[]
    errorRows: ErrorRow[]
    message: string
}

export interface StreamValidationError {
    type: 'error'
    success: false
    message: string
    errors: string[]
}

export type StreamValidationEvent =
    | StreamValidationHeader
    | StreamValidationChunk
    | StreamValidationDone
    | StreamValidationError

// ============================================================
// Excel Import – Stage 3: Streaming Import (SSE)
// ============================================================

export interface ImportSummary {
    total: number
    created: number
    failed: number
}

export interface StreamImportHeader {
    type: 'header'
    success: boolean
    total: number
    chunkSize: number
    subject_id: number
    message: string
}

export interface StreamImportChunkReport {
    topic: string
    question_index: number
    ok: boolean
    question_id: number | null
    error: string | null
}

export interface StreamImportChunk {
    type: 'chunk'
    processed: number
    total: number
    progress: number
    summary: ImportSummary
    report: StreamImportChunkReport[]
}

export interface StreamImportDone {
    type: 'done'
    processed: number
    total: number
    progress: number
    subject_id: number
    summary: ImportSummary
    created_ids: number[]
    message: string
}

export interface StreamImportError {
    type: 'error'
    success: false
    message: string
    errors: string[]
}

export type StreamImportEvent =
    | StreamImportHeader
    | StreamImportChunk
    | StreamImportDone
    | StreamImportError

// ============================================================
// Request Payloads
// ============================================================

export interface ValidateJsonRowsPayload {
    subject_id: number
    rows: ExcelRawRow[]
}

export interface ImportJsonRowsPayload {
    subject_id: number
    row_success: QuestionImportGroup[]
}

export interface ErrorRowsExcelExportPayload {
    errorRows: ErrorRow[]
    subject_id?: number
    filename?: string
}