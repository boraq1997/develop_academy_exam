<template>
    <div class="p-4">

        <!-- ─── Header ─────────────────────────────────── -->
        <div class="flex align-items-center justify-content-between mb-4">
            <div>
                <h2 class="m-0 text-xl font-bold">أنواع المستخدمين</h2>
                <p class="text-color-secondary text-sm mt-1">إدارة أنواع المستخدمين وأدوارهم</p>
            </div>
            <div class="flex gap-2">
                <Button
                    icon="pi pi-box"
                    label="الأرشيف"
                    severity="secondary"
                    outlined
                    @click="showArchived = true"
                />
                <Button
                    icon="pi pi-plus"
                    label="نوع جديد"
                    @click="openCreateDialog"
                />
            </div>
        </div>

        <!-- ─── Error ──────────────────────────────────── -->
        <Message v-if="error" severity="error" class="mb-3">{{ error }}</Message>

        <!-- ─── Table ──────────────────────────────────── -->
        <DataTable
            :value="typeUsers"
            :loading="loading"
            stripedRows
            showGridlines
            responsiveLayout="scroll"
            class="p-datatable-sm"
        >
            <template #empty>
                <div class="text-center py-4 text-color-secondary">لا توجد أنواع مستخدمين</div>
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

            <Column header="الأدوار المرتبطة">
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-1">
                        <Tag
                            v-for="role in data.roles"
                            :key="role.id"
                            :value="role.show_name ?? role.name"
                            severity="success"
                            class="text-xs"
                        />
                        <span v-if="!data.roles?.length" class="text-color-secondary text-sm">—</span>
                    </div>
                </template>
            </Column>

            <Column header="الإجراءات" style="width: 130px">
                <template #body="{ data }">
                    <div class="flex gap-1">
                        <Button
                            icon="pi pi-eye"
                            size="small"
                            text
                            severity="info"
                            v-tooltip="'عرض التفاصيل'"
                            @click="viewTypeUser(data.id)"
                        />
                        <Button
                            icon="pi pi-pencil"
                            size="small"
                            text
                            severity="warn"
                            v-tooltip="'تعديل'"
                            @click="openEditDialog(data)"
                        />
                        <Button
                            icon="pi pi-trash"
                            size="small"
                            text
                            severity="danger"
                            v-tooltip="'حذف'"
                            @click="confirmDelete(data)"
                        />
                    </div>
                </template>
            </Column>
        </DataTable>

        <!-- ─── Create / Edit Dialog ───────────────────── -->
        <Dialog
            v-model:visible="dialogVisible"
            :header="isEditMode ? 'تعديل نوع المستخدم' : 'إنشاء نوع مستخدم جديد'"
            modal
            style="width: 540px"
            :closable="!loading"
        >
            <div class="flex flex-column gap-3 pt-2">

                <div class="flex flex-column gap-1">
                    <label class="font-medium text-sm">الاسم البرمجي <span class="text-red-500">*</span></label>
                    <InputText v-model="form.name" placeholder="مثال: admin" :disabled="loading" />
                </div>

                <div class="flex flex-column gap-1">
                    <label class="font-medium text-sm">الاسم المعروض</label>
                    <InputText v-model="form.show_name" placeholder="مثال: المدير" :disabled="loading" />
                </div>

                <div class="flex flex-column gap-1">
                    <label class="font-medium text-sm">الوصف</label>
                    <Textarea v-model="form.description" rows="2" :disabled="loading" />
                </div>

                <div class="flex flex-column gap-1">
                    <label class="font-medium text-sm">الأدوار والصلاحيات</label>
                    <p class="text-xs text-color-secondary m-0">حدد الأدوار والصلاحيات المرتبطة بهذا النوع</p>
                    <div
                        v-for="role in roles"
                        :key="role.id"
                        class="border-1 border-round surface-border p-3"
                    >
                        <div class="flex align-items-center gap-2 mb-2">
                            <Checkbox
                                :inputId="`role-${role.id}`"
                                :value="role.id"
                                v-model="selectedRoleIds"
                            />
                            <label :for="`role-${role.id}`" class="font-medium cursor-pointer">
                                {{ role.show_name ?? role.name }}
                            </label>
                        </div>
                        <div v-if="selectedRoleIds.includes(role.id)" class="flex flex-wrap gap-2 pr-4">
                            <div
                                v-for="perm in role.permissions"
                                :key="perm"
                                class="flex align-items-center gap-1"
                            >
                                <Checkbox
                                    :inputId="`perm-${role.id}-${perm}`"
                                    :value="perm"
                                    v-model="selectedPermissions[role.id]"
                                />
                                <label :for="`perm-${role.id}-${perm}`" class="text-sm cursor-pointer">
                                    {{ perm }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <template #footer>
                <Button label="إلغاء" severity="secondary" text @click="closeDialog" :disabled="loading" />
                <Button
                    :label="isEditMode ? 'تحديث' : 'إنشاء'"
                    :loading="loading"
                    @click="handleSubmit"
                />
            </template>
        </Dialog>

        <!-- ─── Archived Dialog ────────────────────────── -->
        <Dialog
            v-model:visible="showArchived"
            header="أنواع المستخدمين المؤرشفة"
            modal
            style="width: 600px"
        >
            <DataTable :value="archivedTypeUsers" :loading="loading" class="p-datatable-sm">
                <template #empty>
                    <div class="text-center py-3 text-color-secondary">لا توجد سجلات مؤرشفة</div>
                </template>
                <Column field="name" header="الاسم البرمجي" />
                <Column field="show_name" header="الاسم المعروض" />
                <Column header="استعادة" style="width: 90px">
                    <template #body="{ data }">
                        <Button
                            icon="pi pi-undo"
                            size="small"
                            text
                            severity="success"
                            v-tooltip="'استعادة'"
                            :loading="loading"
                            @click="handleRestore(data.id)"
                        />
                    </template>
                </Column>
            </DataTable>
        </Dialog>

        <!-- ─── Confirm Delete ─────────────────────────── -->
        <ConfirmDialog />

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useTypeUsers } from '../composables/useTypeUsers'
import { useRoles } from '../composables/useRoles'
import type { TypeUser } from '../types/type-user.types'

const router = useRouter()
const confirm = useConfirm()
const toast = useToast()

const { typeUsers, archivedTypeUsers, loading, error, fetchAll, fetchArchived, create, update, remove, restore } = useTypeUsers()
const { roles, fetchRoles } = useRoles()

// ─── Dialog State ────────────────────────────────────────
const dialogVisible = ref(false)
const showArchived = ref(false)
const isEditMode = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
    name: '',
    show_name: '',
    description: '',
})

const selectedRoleIds = ref<number[]>([])
const selectedPermissions = reactive<Record<number, string[]>>({})

// ─── Lifecycle ───────────────────────────────────────────
onMounted(async () => {
    await Promise.all([fetchAll(), fetchRoles()])
})

// ─── Helpers ─────────────────────────────────────────────
const buildRoleIds = () =>
    selectedRoleIds.value.map(id => ({
        id,
        permissions: selectedPermissions[id] ?? [],
    }))

const resetForm = () => {
    form.name = ''
    form.show_name = ''
    form.description = ''
    selectedRoleIds.value = []
    Object.keys(selectedPermissions).forEach(k => delete selectedPermissions[+k])
    editingId.value = null
    isEditMode.value = false
}

// ─── Dialog Actions ──────────────────────────────────────
const openCreateDialog = () => {
    resetForm()
    dialogVisible.value = true
}

const openEditDialog = (item: TypeUser) => {
    resetForm()
    isEditMode.value = true
    editingId.value = item.id
    form.name = item.name
    form.show_name = item.show_name ?? ''
    form.description = item.description ?? ''
    if (item.roles) {
        selectedRoleIds.value = item.roles.map(r => r.id)
        item.roles.forEach(r => {
            selectedPermissions[r.id] = r.pivot?.permission_role ?? []
        })
    }
    dialogVisible.value = true
}

const closeDialog = () => {
    dialogVisible.value = false
    resetForm()
}

const viewTypeUser = (id: number) => {
    router.push({ name: 'TypeUserShow', params: { id } })
}

// ─── Submit ──────────────────────────────────────────────
const handleSubmit = async () => {
    if (!form.name.trim()) {
        toast.add({ severity: 'warn', summary: 'تنبيه', detail: 'الاسم البرمجي مطلوب', life: 3000 })
        return
    }

    const payload = {
        name: form.name,
        show_name: form.show_name || undefined,
        description: form.description || undefined,
        role_ids: buildRoleIds(),
    }

    let success = false

    if (isEditMode.value && editingId.value) {
        success = await update(editingId.value, payload)
    } else {
        success = await create(payload)
    }

    if (success) {
        toast.add({
            severity: 'success',
            summary: 'تم',
            detail: isEditMode.value ? 'تم تحديث نوع المستخدم' : 'تم إنشاء نوع المستخدم',
            life: 3000,
        })
        closeDialog()
    } else {
        toast.add({ severity: 'error', summary: 'خطأ', detail: error.value ?? 'حدث خطأ', life: 4000 })
    }
}

// ─── Delete ──────────────────────────────────────────────
const confirmDelete = (item: TypeUser) => {
    confirm.require({
        message: `هل أنت متأكد من حذف "${item.show_name ?? item.name}"؟`,
        header: 'تأكيد الحذف',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'حذف',
        rejectLabel: 'إلغاء',
        acceptClass: 'p-button-danger',
        accept: async () => {
            const success = await remove(item.id)
            if (success) {
                toast.add({ severity: 'success', summary: 'تم', detail: 'تم حذف نوع المستخدم', life: 3000 })
            } else {
                toast.add({ severity: 'error', summary: 'خطأ', detail: error.value ?? 'فشل الحذف', life: 4000 })
            }
        },
    })
}

// ─── Archived ────────────────────────────────────────────
const handleShowArchived = async () => {
    await fetchArchived()
    showArchived.value = true
}

const handleRestore = async (id: number) => {
    const success = await restore(id)
    if (success) {
        toast.add({ severity: 'success', summary: 'تم', detail: 'تم استعادة نوع المستخدم', life: 3000 })
        if (archivedTypeUsers.value.length === 0) showArchived.value = false
    } else {
        toast.add({ severity: 'error', summary: 'خطأ', detail: error.value ?? 'فشل الاستعادة', life: 4000 })
    }
}
</script>