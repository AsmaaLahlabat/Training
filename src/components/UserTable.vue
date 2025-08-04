<template>
  <div class="p-6 max-w-5xl mx-auto" :dir="locale === 'ar' ? 'rtl' : 'ltr'">

    <h2 class="text-2xl font-bold mb-4" :class="locale === 'ar' ? 'text-right' : ''">{{ $t("addNewUser") }}</h2>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-4 mb-8">
      <input v-model="form.username" type="text" :placeholder="$t('userName')" class="p-2 border rounded" required />
      <input v-model="form.email" type="email" :placeholder="$t('email')" class="p-2 border rounded" required />
      <input v-model="form.address.city" type="text" :placeholder="$t('city')" class="p-2 border rounded" required />
      <input v-model="form.address.street" type="text" :placeholder="$t('street')" class="p-2 border rounded" required />
      <input v-model="form.address.zipcode" type="text" :placeholder="$t('zipcode')" class="p-2 border rounded" required />
      <input v-model="form.phone" type="text" :placeholder="$t('phone')" class="p-2 border rounded" required />
      <input v-model="form.company.name" type="text" :placeholder="$t('companyName')" class="p-2 border rounded" required />
      <button type="submit" class="col-span-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {{ $t("addUser") }}
      </button>
    </form>

    <!-- Table -->
    <h2 class="text-2xl font-bold mb-4" :class="locale === 'ar' ? 'text-right' : ''">{{ $t("userTable") }}</h2>
    <table class="table-auto w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border">{{ $t("ID") }}</th>
          <th class="px-4 py-2 border">{{ $t("userName") }}</th>
          <th class="px-4 py-2 border">{{ $t("email") }}</th>
          <th class="px-4 py-2 border">{{ $t("address") }}</th>
          <th class="px-4 py-2 border">{{ $t("phone") }}</th>
          <th class="px-4 py-2 border">{{ $t("company") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="px-4 py-2 border">{{ user.id }}</td>
          <td class="px-4 py-2 border">{{ user.username }}</td>
          <td class="px-4 py-2 border">{{ user.email }}</td>
          <td class="px-4 py-2 border">
            {{ user.address.city }} - {{ user.address.street }} ({{ user.address.zipcode }})
          </td>
          <td class="px-4 py-2 border">{{ user.phone }}</td>
          <td class="px-4 py-2 border">{{ user.company.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const switchLang = (lang) => {
  locale.value = lang
}

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})

const users = userStore.users

const form = reactive({
  username: '',
  email: '',
  address: {
    city: '',
    street: '',
    zipcode: ''
  },
  phone: '',
  company: {
    name: ''
  }
})

function handleSubmit() {
  const newUser = {
    id: userStore.users.length + 1,
    username: form.username,
    email: form.email,
    address: {
      city: form.address.city,
      street: form.address.street,
      zipcode: form.address.zipcode,
    },
    phone: form.phone,
    company: {
      name: form.company.name
    }
  }

  userStore.addUser(newUser)
  alert(t('userAdded'))

  // Clear form
  form.username = ''
  form.email = ''
  form.address.city = ''
  form.address.street = ''
  form.address.zipcode = ''
  form.phone = ''
  form.company.name = ''
}
</script>
