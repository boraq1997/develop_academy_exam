// ============================================================
// modules/Dashboard/Notifications/types/notifications.types.ts
// Types وحدة الإشعارات
// ============================================================

// ============================================================
// Notification User Snapshot
// ============================================================

export interface NotificationUser {
    id: number | null
    name: string | null
    stage: string | null
    userType: string | null
    userType_show_name: string | null
}

// ============================================================
// Notification Data (JSON column)
// ============================================================

export interface NotificationData {
    user: NotificationUser
    table: string | null
    entity: string | null
    record_id: number | null
    message: string | null
    event_ar: string | null
    event_en: string | null
    device_ip: string | null
    device_name: string | null
}

// ============================================================
// Notification
// ============================================================

export interface Notification {
    id: string           // UUID
    type: string
    notifiable_type: string
    notifiable_id: number
    data: NotificationData
    read_at: string | null
    created_at: string
    updated_at: string
}