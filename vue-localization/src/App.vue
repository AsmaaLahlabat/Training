<template>
  <div>
    <!-- 🔹 Dropdown ثابت دائمًا في أعلى يمين الشاشة -->
    <div class="lang-switcher-fixed">
      <select @change="changeLang($event)" class="lang-switcher">
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>

    <!-- 🔸 المحتوى المتأثر بتغيير اللغة -->
    <div class="page-content">
      <h1>{{ t('welcome') }}</h1>
      <p>{{ t('about') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function changeLang(event) {
  const lang = event.target.value
  locale.value = lang
  localStorage.setItem('lang', lang)

  // بدل تغيير اتجاه كامل الصفحة، نغيره فقط داخل المحتوى
  const content = document.querySelector('.page-content')
  content.className = lang === 'ar' ? 'page-content rtl' : 'page-content ltr'
}
</script>

<style>
/* 🔹 زر تغيير اللغة: ثابت أعلى يمين الشاشة */
.lang-switcher-fixed {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  direction: ltr !important;
  text-align: left !important;
}

.lang-switcher {
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
}

/* 🔸 المحتوى فقط هو الذي يتأثر بالاتجاه */
.page-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
}

/* اتجاه عربي */
.rtl {
  direction: rtl;
  text-align: right;
}

/* اتجاه إنجليزي */
.ltr {
  direction: ltr;
  text-align: left;
}
</style>
