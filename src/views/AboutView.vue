<!-- src/views/About.vue -->
<template>
  <div class="about" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <h1>{{ $t("aboutPageTitle") }}</h1>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
