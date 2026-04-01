<template>
  <div class="users-edit-page">
    <div class="header">
      <h1>تعديل بيانات المستخدم</h1>
      <router-link :to="{ name: 'users.show', params: { id: userId } }" class="btn-back">
        <i class="pi pi-arrow-left"></i> العودة
      </router-link>
    </div>

    <div v-if="loading" class="loading">
      <p>جاري التحميل...</p>
    </div>

    <form v-else @submit.prevent="submitForm" class="form-container">
      <div class="form-group">
        <label for="name">اسم المستخدم</label>
        <input 
          v-model="form.name" 
          id="name" 
          type="text" 
          placeholder="أدخل اسم المستخدم"
          required
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">البريد الإلكتروني</label>
        <input 
          v-model="form.email" 
          id="email" 
          type="email" 
          placeholder="أدخل البريد الإلكتروني"
          required
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="role">الدور</label>
        <select v-model="form.role" id="role" required>
          <option value="">اختر دور</option>
          <option value="admin">مسؤول</option>
          <option value="teacher">معلم</option>
          <option value="student">طالب</option>
        </select>
        <span v-if="errors.role" class="error">{{ errors.role }}</span>
      </div>

      <div class="form-group">
        <label for="active">حالة المستخدم</label>
        <div class="checkbox-group">
          <input 
            v-model="form.active" 
            id="active" 
            type="checkbox"
          />
          <label for="active" class="checkbox-label">نشط</label>
        </div>
      </div>

      <div class="form-group">
        <label for="password">كلمة المرور (اتركها فارغة إذا لم تكن تريد تغييرها)</label>
        <input 
          v-model="form.password" 
          id="password" 
          type="password" 
          placeholder="أدخل كلمة المرور الجديدة (اختياري)"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-submit" :disabled="saving">
          <span v-if="!saving">حفظ التعديلات</span>
          <span v-else>جاري الحفظ...</span>
        </button>
        <button 
          type="button" 
          @click="goBack" 
          class="btn-cancel"
        >
          إلغاء
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface FormData {
  name: string
  email: string
  role: string
  active: boolean
  password?: string
}

const form = ref<FormData>({
  name: '',
  email: '',
  role: '',
  active: true,
  password: '',
})

const errors = ref<Partial<FormData>>({})
const loading = ref(false)
const saving = ref(false)

const userId = computed(() => route.params.id as string)

onMounted(async () => {
  await fetchUser()
})

const fetchUser = async () => {
  loading.value = true
  try {
    // 📌 استدعي API هنا لجلب بيانات المستخدم
    // const response = await usersApi.getById(userId.value)
    // form.value = response.data

    // 🔧 بيانات وهمية للاختبار
    form.value = {
      name: 'أحمد محمد',
      email: 'ahmad@example.com',
      role: 'teacher',
      active: true,
      password: '',
    }
  } catch (error) {
    console.error('خطأ في جلب بيانات المستخدم:', error)
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  // التحقق من الحقول
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = 'اسم المستخدم مطلوب'
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'البريد الإلكتروني مطلوب'
  }

  if (!form.value.role) {
    errors.value.role = 'اختر دوراً'
  }

  if (Object.keys(errors.value).length > 0) {
    return
  }

  saving.value = true
  try {
    // 📌 استدعي API هنا لتعديل بيانات المستخدم
    // await usersApi.update(userId.value, form.value)
    
    console.log('تعديل مستخدم:', form.value)
    
    // بعد النجاح، انتقل إلى صفحة عرض المستخدم
    router.push({ name: 'users.show', params: { id: userId.value } })
  } catch (error) {
    console.error('خطأ في التعديل:', error)
  } finally {
    saving.value = false
  }
}

const goBack = () => {
  router.push({ name: 'users.show', params: { id: userId.value } })
}
</script>

<style scoped>
.users-edit-page {
  padding: 2rem;
  max-width: 600px;
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

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #007bff;
  transition: color 0.3s;
}

.btn-back:hover {
  color: #0056b3;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.checkbox-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.checkbox-label {
  cursor: pointer;
  font-weight: 400;
  font-size: 1rem;
}

.error {
  color: #d32f2f;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-submit,
.btn-cancel {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  flex: 1;
}

.btn-submit:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background-color: #e9ecef;
  color: #333;
  flex: 1;
}

.btn-cancel:hover {
  background-color: #dee2e6;
}

/* RTL Support */
[dir="rtl"] .header {
  flex-direction: row-reverse;
}

[dir="rtl"] .checkbox-group {
  flex-direction: row-reverse;
}
</style>