<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>

<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'" class="p-6">
    <main>
      <TheWelcome />
      <router-link to="/create" class="text-blue-600 underline">
        {{ $t("addNewUser") }}
      </router-link>
    </main>
  </div>
</template>
