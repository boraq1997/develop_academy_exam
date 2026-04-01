<script setup lang="ts">
// ============================================================
// modules/Dashboard/Users/components/UserForm.vue
// فورم مشترك بين الإنشاء والتعديل
// ============================================================
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import type { StoreUserPayload } from '../types/users.types'
import type { TypeUser } from '../../Permissions/types/roles.types'
import type { Stage } from '../../Stages/types/stages.types'
import type { Subject } from '../../Subjects/types/subjects.types'

// ============================================================
// Props
// ============================================================
interface Props {
  typeUsers: TypeUser[]
  stages: Stage[]
  subjects: Subject[]
  isEditMode?: boolean
}

withDefaults(defineProps<Props>(), {
  isEditMode: false,
})

// ============================================================
// Model
// ============================================================
const form = defineModel<StoreUserPayload>({ required: true })
</script>

<template>
  <div class="flex flex-col gap-5">

    <!-- الاسم -->
    <div class="flex flex-col gap-1">
      <label class="font-medium text-sm">
        الاسم <span class="text-red-500">*</span>
      </label>
      <InputText
        v-model="form.name"
        placeholder="أدخل الاسم الكامل"
        class="w-full"
      />
    </div>

    <!-- البريد الإلكتروني -->
    <div class="flex flex-col gap-1">
      <label class="font-medium text-sm">
        البريد الإلكتروني <span class="text-red-500">*</span>
      </label>
      <InputText
        v-model="form.email"
        placeholder="example@mail.com"
        class="w-full"
        dir="ltr"
      />
    </div>

    <!-- كلمة المرور -->
    <div class="flex flex-col gap-1">
      <label class="font-medium text-sm">
        كلمة المرور
        <span v-if="!isEditMode" class="text-red-500">*</span>
        <span v-else class="text-gray-400 text-xs"> (اتركها فارغة إن لم تريد التغيير)</span>
      </label>
      <Password
        v-model="form.password"
        class="w-full"
        inputClass="w-full"
        toggleMask
        :feedback="false"
        placeholder="••••••••"
      />
    </div>

    <!-- نوع المستخدم -->
    <div class="flex flex-col gap-1">
      <label class="font-medium text-sm">
        نوع المستخدم <span class="text-red-500">*</span>
      </label>
      <Select
        v-model="form.type_user_id"
        :options="typeUsers"
        optionLabel="show_name"
        optionValue="id"
        placeholder="اختر نوع المستخدم"
        class="w-full"
      >
        <template #option="{ option }">
          <span>{{ option.show_name ?? option.name }}</span>
        </template>
      </Select>
    </div>

    <!-- المرحلة الدراسية -->
    <div class="flex flex-col gap-1">
      <label class="font-medium text-sm">المرحلة الدراسية</label>
      <Select
        v-model="form.stage_id"
        :options="stages"
        optionLabel="name"
        optionValue="id"
        placeholder="اختر المرحلة"
        class="w-full"
        showClear
      />
    </div>

    <!-- المواد الدراسية -->
    <div class="flex flex-col gap-1">
      <label class="font-medium text-sm">المواد الدراسية</label>
      <MultiSelect
        v-model="form.subject_ids"
        :options="subjects"
        optionLabel="name"
        optionValue="id"
        placeholder="اختر المواد"
        class="w-full"
        display="chip"
      />
    </div>

  </div>
</template>