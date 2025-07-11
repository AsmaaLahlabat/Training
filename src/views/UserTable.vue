<!-- src/views/UsersView.vue -->
<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Add New User</h2>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-4 mb-8">
      <input v-model="form.username" type="text" placeholder="User Name" class="p-2 border rounded" required />
      <input v-model="form.email" type="email" placeholder="Email" class="p-2 border rounded" required />
      <input v-model="form.address.city" type="text" placeholder="City" class="p-2 border rounded" required />
      <input v-model="form.address.street" type="text" placeholder="Street" class="p-2 border rounded" required />
      <input v-model="form.address.zipcode" type="text" placeholder="Zipcode" class="p-2 border rounded" required />
      <input v-model="form.phone" type="text" placeholder="Phone" class="p-2 border rounded" required />
      <input v-model="form.company.name" type="text" placeholder="Company Name" class="p-2 border rounded" required />
      <button type="submit" class="col-span-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add User
      </button>
    </form>

    <!-- Table -->
    <h2 class="text-2xl font-bold mb-4">User Table</h2>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">User Name</th>
          <th class="px-4 py-2 border">Email</th>
          <th class="px-4 py-2 border">Address</th>
          <th class="px-4 py-2 border">Phone</th>
          <th class="px-4 py-2 border">Company</th>
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
  alert('User added successfully!')


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
