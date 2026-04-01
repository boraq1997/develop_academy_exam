<template>
    <div class="p-4">

        <!-- ─── Header ─────────────────────────────────── -->
        <div class="flex align-items-center justify-content-between mb-4">
            <div>
                <h2 class="m-0 text-xl font-bold">الأدوار والصلاحيات</h2>
                <p class="text-color-secondary text-sm mt-1">عرض جميع أدوار النظام وصلاحياتها</p>
            </div>
            <Button
                icon="pi pi-refresh"
                label="تحديث الكاش"
                severity="secondary"
                outlined
                :loading="loading"
                @click="handleRefresh"
            />
        </div>

        <!-- ─── Error ──────────────────────────────────── -->
        <Message v-if="error" severity="error" class="mb-3">{{ error }}</Message>

        <!-- ─── Table ──────────────────────────────────── -->
        <DataTable
            :value="roles"
            :loading="loading"
            stripedRows
            showGridlines
            responsiveLayout="scroll"
            class="p-datatable-sm"
        >
            <template #empty>
                <div class="text-center py-4 text-color-secondary">لا توجد أدوار مسجلة</div>
            </template>

            <Column field="id" header="#" style="width: 60px" />

            <Column field="name" header="الاسم البرمجي">
                <template #body="{ data }">
                    <Tag :value="data.name" severity="info" />
                </template>
            </Column>

            <Column field="show_name" header="الاسم المعروض">
                <template #body="{ data }">
                    {{ data.show_name ?? '—' }}
                </template>
            </Column>

            <Column field="description" header="الوصف">
                <template #body="{ data }">
                    <span class="text-color-secondary text-sm">{{ data.description ?? '—' }}</span>
                </template>
            </Column>

            <Column header="الصلاحيات المتاحة">
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-1">
                        <Tag
                            v-for="perm in data.permissions"
                            :key="perm"
                            :value="perm"
                            severity="success"
                            class="text-xs"
                        />
                        <span v-if="!data.permissions?.length" class="text-color-secondary text-sm">—</span>
                    </div>
                </template>
            </Column>

            <Column field="created_at" header="تاريخ الإنشاء">
                <template #body="{ data }">
                    <span class="text-sm">{{ formatDate(data.created_at) }}</span>
                </template>
            </Column>
        </DataTable>

    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRoles } from '../composables/useRoles'

const toast = useToast()
const { roles, loading, error, fetchRoles, refresh } = useRoles()

onMounted(async () => {
    await fetchRoles()
})

const handleRefresh = async () => {
    await refresh()
    toast.add({ severity: 'success', summary: 'تم', detail: 'تم تحديث كاش الصلاحيات', life: 3000 })
}

const formatDate = (date: string | null) => {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('ar-IQ')
}
</script>