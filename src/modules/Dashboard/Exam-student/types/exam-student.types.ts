// ============================================================
// modules/Dashboard/Exam-student/types/exam-student.types.ts
// Types وحدة امتحانات الطلاب
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'
import type { Question } from '../../Questions/types/questions.types'

// ============================================================
// Enums
// ============================================================

export type ExamStatus = 'pending' | 'in_progress' | 'completed'

export type QDetailState = 'pending' | 'correct' | 'wrong' | 'skipped'

// ============================================================
// QDetail
// ============================================================

export interface QDetail {
    question_id: number
    answer: string | null
    ResponseTime: number | null
    state: QDetailState
}

export interface QDetailWithQuestion extends QDetail {
    question: Question
}

// ============================================================
// Exam (student view)  –  GET /exam_student/{id}
// ============================================================

export interface ExamUser extends Timestamps {
    id: number
    exam_level_id: number
    user_id: number
    q_details: QDetailWithQuestion[]
    status: ExamStatus
    started_at: string | null
    finished_at: string | null
    score: number | null
}

// ============================================================
// Exams with Users (admin view)
// GET /exam_student/all/json/{id}
// ============================================================

export interface ExamInfo {
    testing_method: string | null
    model_type: string | null
    number_of_groups: number | null
    number_of_questions: number
    is_active: boolean
    attempt_limit: number
    start_time: string | null
    end_time: string | null
}

export interface ExamUserEntry {
    user_id: number
    user_name: string
    exam: QDetailWithQuestion[]
}

export interface ExamsWithUsers {
    id: number
    stage: string
    subject: string
    exam_info: ExamInfo
    users: ExamUserEntry[]
}

// ============================================================
// Answer Exam  –  POST /exam_student
// ============================================================

export type RawAnswer =
    | 'a' | 'b' | 'c' | 'd'
    | 'A' | 'B' | 'C' | 'D'
    | 'true' | 'false'
    | 'Null' | 'null'

export interface AnswerExamPayload {
    id: number        // exam_level_id
    user_id: number
    answers: RawAnswer[]
}

export interface AnswerExamResponseData {
    exam_id: number
    status: ExamStatus
    user_name: string
    stage: string
    subject: string
    answers_data: AnswerExamPayload
}

// ============================================================
// OMR Scan  –  POST /exam_student/scan_omr (SSE)
// ============================================================

export interface OmrProgressEvent {
    current: number
    total: number
    percent: number
    filename: string
    status: 'processing'
}

export interface OmrResultEvent {
    current: number
    total: number
    percent: number
    result: AnswerExamResponseData
}

export interface OmrErrorEvent {
    index: number
    error: string
}

export interface OmrDoneEvent {
    current: number
    total: number
    percent: number
}

export type OmrStreamEvent =
    | { type: 'progress'; data: OmrProgressEvent }
    | { type: 'result';   data: OmrResultEvent }
    | { type: 'error';    data: OmrErrorEvent }
    | { type: 'done';     data: OmrDoneEvent }