<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function toggleLang() {
  locale.value = locale.value === 'en' ? 'ar' : 'en'
}
</script>

<template>
  <!-- ✅ مكون الهيدر الجديد -->
  <Header />

  <!-- ✅ روابط Home و About + زر تغيير اللغة -->
  <div class="text-center mt-3">
    <nav>
      <RouterLink to="/" class="mx-2 text-primary">{{ t('home') }}</RouterLink>
      <RouterLink to="/about" class="mx-2 text-primary">{{ t('about') }}</RouterLink>
    </nav>


  </div>

  <!-- ✅ عرض الصفحات -->
  <RouterView />
</template>

<style scoped>
nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
