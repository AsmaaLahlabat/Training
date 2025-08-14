<template>
  <div>
    <h2 class="text-2xl font-bold mb-4" :class="locale === 'ar' ? 'text-right' : ''">
      {{ $t("userTable") }}
    </h2>

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
import { useUserStore } from '../stores/userStore'
import { useI18n } from 'vue-i18n'
import { onMounted, computed } from 'vue'

const { locale } = useI18n()
const userStore = useUserStore()

// جلب البيانات عند تحميل الصفحة
onMounted(() => {
  userStore.fetchUsers()
})

// استخدام computed لضمان التحديث التلقائي عند تغيير البيانات
const users = computed(() => userStore.users)
</script>

<style scoped>
table {
  background-color: white;
}
</style>
