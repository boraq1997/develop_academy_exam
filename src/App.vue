<template>
  <router-view />
  <Toast />
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './modules/Auth/store/auth.store'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  // ✅ إذا كان هناك توكن لكن لم يُجلب المستخدم بعد — نجلبه
  // (حالة إعادة تحميل الصفحة)
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser()
    } catch {
      // fetchUser تقوم بـ logout تلقائياً عند الفشل
      router.push({ name: 'Login' })
    }
  }
})
</script>