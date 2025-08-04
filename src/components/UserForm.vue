<!-- src/views/AddUser.vue -->
<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'" class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ $t("addNewUser") }}</h1>
    <form @submit.prevent="submitForm">
      <input v-model="form.name" :placeholder="$t('name')" class="w-full border p-2 mb-2" required />
      <input v-model="form.email" :placeholder="$t('email')" class="w-full border p-2 mb-2" required />
      <input v-model="form.phone" :placeholder="$t('phone')" class="w-full border p-2 mb-2" required />
      <input v-model="form.city" :placeholder="$t('city')" class="w-full border p-2 mb-2" required />
      <input v-model="form.street" :placeholder="$t('street')" class="w-full border p-2 mb-2" required />
      <input v-model="form.zipcode" :placeholder="$t('zipcode')" class="w-full border p-2 mb-2" required />
      <input v-model="form.company" :placeholder="$t('company')" class="w-full border p-2 mb-2" required />
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
        {{ $t("add") }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const userStore = useUserStore()
const { t, locale } = useI18n()

const form = ref({
  name: '',
  email: '',
  phone: '',
  city: '',
  street: '',
  zipcode: '',
  company: '',
})

const submitForm = () => {
  const newUser = {
    id: userStore.users.length + 1,
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    address: {
      city: form.value.city,
      street: form.value.street,
      zipcode: form.value.zipcode,
    },
    company: {
      name: form.value.company,
    },
  }
  userStore.addUser(newUser)
  router.push('/')
}
</script>
