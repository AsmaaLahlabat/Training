<!-- src/views/AddUser.vue -->
<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Add New User</h1>
    <form @submit.prevent="submitForm">
      <input v-model="form.name" placeholder="Name" class="w-full border p-2 mb-2" required />
      <input v-model="form.email" placeholder="Email" class="w-full border p-2 mb-2" required />
      <input v-model="form.phone" placeholder="Phone" class="w-full border p-2 mb-2" required />
      <input v-model="form.city" placeholder="City" class="w-full border p-2 mb-2" required />
      <input v-model="form.street" placeholder="Street" class="w-full border p-2 mb-2" required />
      <input v-model="form.zipcode" placeholder="Zipcode" class="w-full border p-2 mb-2" required />
      <input v-model="form.company" placeholder="Company" class="w-full border p-2 mb-2" required />
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

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
