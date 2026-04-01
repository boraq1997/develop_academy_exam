<template>
  <div class="users-show-page">
    <div class="header">
      <h1>بيانات المستخدم</h1>
      <div class="actions">
        <router-link :to="{ name: 'users.edit', params: { id: userId } }" class="btn-edit">
          <i class="pi pi-pencil"></i> تعديل
        </router-link>
        <router-link :to="{ name: 'Users' }" class="btn-back">
          <i class="pi pi-arrow-left"></i> العودة
        </router-link>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <p>جاري التحميل...</p>
    </div>

    <div v-else-if="user" class="user-details">
      <div class="detail-card">
        <div class="detail-row">
          <label>الاسم:</label>
          <span>{{ user.name }}</span>
        </div>

        <div class="detail-row">
          <label>البريد الإلكتروني:</label>
          <span>{{ user.email }}</span>
        </div>

        <div class="detail-row">
          <label>الدور:</label>
          <span class="badge" :class="user.role">{{ getRoleLabel(user.role) }}</span>
        </div>

        <div class="detail-row">
          <label>حالة المستخدم:</label>
          <span class="badge" :class="{ active: user.active, inactive: !user.active }">
            {{ user.active ? 'نشط' : 'معطّل' }}
          </span>
        </div>

        <div class="detail-row">
          <label>تاريخ الإنشاء:</label>
          <span>{{ formatDate(user.createdAt) }}</span>
        </div>

        <div class="detail-row">
          <label>آخر تعديل:</label>
          <span>{{ formatDate(user.updatedAt) }}</span>
        </div>
      </div>

      <div class="danger-zone">
        <h3>منطقة الخطر</h3>
        <button @click="deleteUser" class="btn-delete" :disabled="deleting">
          <i class="pi pi-trash"></i>
          <span v-if="!deleting">حذف المستخدم</span>
          <span v-else>جاري الحذف...</span>
        </button>
      </div>
    </div>

    <div v-else class="not-found">
      <p>المستخدم غير موجود</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface User {
  id: string | number
  name: string
  email: string
  role: string
  active: boolean
  createdAt: string
  updatedAt: string
}

const user = ref<User | null>(null)
const loading = ref(false)
const deleting = ref(false)

const userId = computed(() => route.params.id as string)

onMounted(async () => {
  await fetchUser()
})

const fetchUser = async () => {
  loading.value = true
  try {
    // 📌 استدعي API هنا لجلب بيانات المستخدم
    // const response = await usersApi.getById(userId.value)
    // user.value = response.data

    // 🔧 بيانات وهمية للاختبار
    user.value = {
      id: userId.value,
      name: 'أحمد محمد',
      email: 'ahmad@example.com',
      role: 'teacher',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error('خطأ في جلب بيانات المستخدم:', error)
  } finally {
    loading.value = false
  }
}

const getRoleLabel = (role: string): string => {
  const labels: Record<string, string> = {
    admin: 'مسؤول',
    teacher: 'معلم',
    student: 'طالب',
  }
  return labels[role] || role
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const deleteUser = async () => {
  if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
    return
  }

  deleting.value = true
  try {
    // 📌 استدعي API هنا لحذف المستخدم
    // await usersApi.delete(userId.value)
    
    console.log('حذف المستخدم:', userId.value)
    
    router.push({ name: 'Users' })
  } catch (error) {
    console.error('خطأ في الحذف:', error)
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.users-show-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn-edit,
.btn-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: white;
  border-radius: 4px;
  transition: all 0.3s;
}

.btn-edit {
  background-color: #007bff;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-back {
  background-color: #6c757d;
}

.btn-back:hover {
  background-color: #5a6268;
}

.loading,
.not-found {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row label {
  font-weight: 600;
  color: #333;
}

.detail-row span {
  color: #666;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.badge.admin {
  background-color: #ff6b6b;
  color: white;
}

.badge.teacher {
  background-color: #4ecdc4;
  color: white;
}

.badge.student {
  background-color: #45b7d1;
  color: white;
}

.badge.active {
  background-color: #51cf66;
  color: white;
}

.badge.inactive {
  background-color: #ff8787;
  color: white;
}

.danger-zone {
  background: #fff5f5;
  border: 2px solid #f08080;
  border-radius: 8px;
  padding: 1.5rem;
}

.danger-zone h3 {
  margin-top: 0;
  color: #d32f2f;
}

.btn-delete {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-delete:hover:not(:disabled) {
  background-color: #b71c1c;
}

.btn-delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* RTL Support */
[dir="rtl"] .detail-row {
  direction: rtl;
}
</style>