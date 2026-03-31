// ============================================================
// modules/Dashboard/Blooms/types/blooms.types.ts
// Types وحدة تصنيفات بلوم
// ============================================================

import type { Timestamps } from '../../../../shared/shared.types'

// ============================================================
// Bloom
// ============================================================

export interface Bloom extends Timestamps {
    id: number
    name: string
    Repetition_Percentage: number
}

// ============================================================
// Store Bloom  –  POST /blooms
// ============================================================

export interface StoreBloomPayload {
    name: string
}

// ============================================================
// Bulk Update  –  PUT /blooms/update
// ============================================================

export interface BloomUpdateItem {
    id: number
    name: string
    Repetition_Percentage: number
}

export interface UpdateBloomsPayload {
    data: BloomUpdateItem[]
}