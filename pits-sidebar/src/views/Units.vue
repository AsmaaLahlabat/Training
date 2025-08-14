<!-- src/views/UnitsView.vue -->
<script setup>
import Header from '../components/Header.vue'
import UserTable from '../components/UserTable.vue' // استدعاء الكومبوننت
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="units-root">
    <!-- الهيدر -->
    <Header class="units-header-override" />

    <!-- جسم الصفحة -->
    <div class="units-body">
      <!-- استدعاء جدول المستخدمين -->
      <UserTable />
    </div>
  </section>
</template>

<style scoped>
.units-root {
  inline-size: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: #e9f0f6;
  display: flex;
  flex-direction: column;
}

.units-header-override {
  margin: 0 !important;
  max-width: none !important;
  width: 100% !important;
}

.units-body {
  flex: 1;
  inline-size: 100%;
  min-height: 0;
  background: #e9f0f6;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
}
</style>
