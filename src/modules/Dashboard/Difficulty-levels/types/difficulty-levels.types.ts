// ============================================================
// modules/Dashboard/Difficulty-levels/types/difficulty-levels.types.ts
// Types وحدة مستويات الصعوبة
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'

// ============================================================
// DifficultyLevel
// ============================================================

export interface DifficultyLevel extends Timestamps {
    id: number
    name: string
    Repetition_Percentage: number
}

// ============================================================
// Store  –  POST /difficulty_levels
// ============================================================

export interface StoreDifficultyLevelPayload {
    name: string
}

// ============================================================
// Bulk Update  –  PUT /difficulty_levels/update
// ============================================================

export interface DifficultyLevelUpdateItem {
    id: number
    name: string
    Repetition_Percentage: number
}

export interface UpdateDifficultyLevelsPayload {
    data: DifficultyLevelUpdateItem[]
}