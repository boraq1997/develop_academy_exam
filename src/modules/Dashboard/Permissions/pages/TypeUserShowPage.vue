<template>
    <div class="p-4">

        <!-- ─── Back ───────────────────────────────────── -->
        <Button
            icon="pi pi-arrow-right"
            label="رجوع"
            text
            class="mb-3"
            @click="router.back()"
        />

        <!-- ─── Loading Skeleton ───────────────────────── -->
        <div v-if="loading && !selectedTypeUser" class="flex flex-column gap-3">
            <Skeleton height="3rem" />
            <Skeleton height="10rem" />
            <Skeleton height="15rem" />
        </div>

        <template v-else-if="selectedTypeUser">

            <!-- ─── Info Card ──────────────────────────── -->
            <Card class="mb-4">
                <template #title>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-id-card text-primary" />
                        <span>{{ selectedTypeUser.show_name ?? selectedTypeUser.name }}</span>
                        <Tag :value="selectedTypeUser.name" severity="info" class="text-xs" />
                    </div>
                </template>
                <template #content>
                    <p class="text-color-secondary m-0">
                        {{ selectedTypeUser.description ?? 'لا يوجد وصف' }}
                    </p>
                </template>
            </Card>

            <!-- ─── Roles Card ─────────────────────────── -->
            <Card class="mb-4">
                <template #title>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-shield text-primary" />
                        <span>الأدوار والصلاحيات</span>
                    </div>
                </template>
                <template #content>
                    <div v-if="selectedTypeUser.roles?.length" class="flex flex-column gap-3">
                        <div
                            v-for="role in selectedTypeUser.roles"
                            :key="role.id"
                            class="border-1 border-round surface-border p-3"
                        >
                            <div class="font-semibold mb-2">
                                {{ role.show_name ?? role.name }}
                                <Tag :value="role.name" severity="secondary" class="text-xs mr-2" />
                            </div>
                            <div class="flex flex-wrap gap-1">
                                <Tag
                                    v-for="perm in (role.pivot?.permission_role ?? [])"
                                    :key="perm"
                                    :value="perm"
                                    severity="success"
                                    class="text-xs"
                                />
                            </div>
                        </div>
                    </div>
                    <p v-else class="text-color-secondary m-0">لا توجد أدوار مرتبطة</p>
                </template>
            </Card>

            <!-- ─── Users Card ─────────────────────────── -->
            <Card>
                <template #title>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-users text-primary" />
                        <span>المستخدمون</span>
                    </div>
                </template>
                <template #content>
                    <DataTable
                        :value="selectedTypeUser.users ?? []"
                        :loading="loading"
                        class="p-datatable-sm"
                        stripedRows
                    >
                        <template #empty>
                            <div class="text-center py-3 text-color-secondary">لا يوجد مستخدمون</div>
                        </template>
                        <Column field="id" header="#" style="width: 60px" />
                        <Column field="name" header="الاسم" />
                        <Column field="email" header="البريد الإلكتروني" />
                    </DataTable>
                </template>
            </Card>

        </template>

        <!-- ─── Error ──────────────────────────────────── -->
        <Message v-else-if="error" severity="error">{{ error }}</Message>

    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTypeUsers } from '../composables/useTypeUsers'

const router = useRouter()
const route = useRoute()
const { selectedTypeUser, loading, error, fetchById } = useTypeUsers()

onMounted(async () => {
    const id = Number(route.params.id)
    if (id) await fetchById(id)
})
</script>