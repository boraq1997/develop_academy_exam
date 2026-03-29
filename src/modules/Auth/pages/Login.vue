<template>
  <div class="flex justify-content-center align-items-center min-h-screen p-3">

    <Card class="w-full md:w-6 lg:w-4 p-4 shadow-3">

      <template #title>
        <div class="text-center mb-3">
          <h2 class="m-0">تسجيل الدخول</h2>
          <p class="text-sm text-gray-500 mt-2">
            نظام الاختبارات الإلكتروني
          </p>
        </div>
      </template>

      <template #content>
        <div class="flex flex-column gap-3">

          <!-- Email -->
          <IconField>
            <InputIcon class="pi pi-envelope" />
            <InputText
              v-model="credentials.email"
              placeholder="البريد الإلكتروني"
              fluid
            />
          </IconField>

          <!-- Password -->
          <IconField>
            <InputIcon class="pi pi-lock" />
            <Password
              v-model="credentials.password"
              placeholder="كلمة المرور"
              fluid
              toggleMask
              :feedback="false"
            />
          </IconField>

          <!-- Error -->
          <small v-if="authError" class="p-error">
            {{ authError }}
          </small>

          <!-- Button -->
          <Button
            label="تسجيل الدخول"
            icon="pi pi-sign-in"
            class="w-full mt-2"
            raised
            :loading="loading"
            @click="handleLogin"
          />

          <!-- 🟡 System Message -->
          <div class="system-message mt-4 text-center p-3 border-round">

            <p class="m-0 line-height-3">
              هذا النظام مخصص لإدارة الاختبارات الإلكترونية الخاصة بـ
              <strong>العتبة العباسية المقدسة</strong>
              – قسم التطوير – أكاديمية التطوير الإداري.
            </p>

            <p class="mt-2 text-sm text-gray-500">
              جميع الحقوق محفوظة © أكاديمية التطوير الإداري
            </p>

          </div>

        </div>
      </template>

    </Card>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store';
import type { LoginCredentials } from '../types/auth';

const authStore = useAuthStore();
const router = useRouter();

const credentials = ref<LoginCredentials>({
  email: '',
  password: '',
});

const loading = ref(false);
const authError = ref<string | null>(null);

const handleLogin = async () => {
  loading.value = true;
  authError.value = null;
  try {
    await authStore.login(credentials.value);
    router.push('/'); // Redirect to dashboard or home page after successful login
    Toast.add({
      severity: 'success',
      summary: "رسالة نجاح",
      detail: "تم تسجيل الدخول بنجاح",
      life: 3000
    })
  } catch (error: any) {
    authError.value = authStore.authError || 'فشل تسجيل الدخول. يرجى التحقق من البيانات.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.system-message {
  background: rgba(218, 161, 18, 0.08);
  border: 1px solid rgba(218, 161, 18, 0.3);
}
</style>