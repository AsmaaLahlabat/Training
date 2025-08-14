<!-- App.vue -->
<script setup>
import { onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'

// نراقب حجم السايدبار من خلال الـ localStorage أو CSS variable
function updateSidebarWidth() {
  const width = localStorage.getItem('sidebar-collapsed') === 'true' ? '72px' : '240px';
  document.documentElement.style.setProperty('--sidebar-w', width);
}

onMounted(() => {
  updateSidebarWidth();
  window.addEventListener('storage', updateSidebarWidth); // في حال تم تغييرها من مكون ثاني
});
</script>

<template>
  <div id="layout" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <Sidebar />
    <main class="content-area">
      <router-view />
    </main>
  </div>
</template>

<style>
:root {
  --sidebar-w: 240px;
  --toolbar-gap: 8px;
}

html, body, #app, #layout {
  height: 100%;
  min-height: 100%;
}

body {
  margin: 0;
  background: #e9f0f6 !important;
}

#layout {
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  position: relative;
}

/* ✅ السايدبار ثابت */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-w);
  height: 100vh;
  background: #fff;
  border-right: 1px solid #e9ecef;
  z-index: 100;
  transition: all 0.3s ease;
}

/* ✅ RTL: انقله لليمين */
:dir(rtl) .sidebar {
  left: auto;
  right: 0;
  border-right: none;
  border-left: 1px solid #e9ecef;
}

/* ✅ الكونتنت يأخذ باقي المساحة */
.content-area {
  background: #e9f0f6;
  min-height: 100vh;
  flex: 1;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-left: var(--sidebar-w);
  width: calc(100% - var(--sidebar-w));
  transition: all 0.3s ease;
}

/* ✅ RTL */
:dir(rtl) .content-area {
  margin-left: 0;
  margin-right: var(--sidebar-w);
  width: calc(100% - var(--sidebar-w));
}

/* ✅ موبايل: سايدبار يختفي، المحتوى ياخذ كامل العرض */
@media (max-width: 991.98px) {
  .sidebar {
    transform: translateX(-110%);
  }

  :dir(rtl) .sidebar {
    transform: translateX(110%);
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }

  .content-area {
    margin: 0 !important;
    width: 100% !important;
  }

  :dir(rtl) .content-area {
    margin: 0 !important;
  }
}
</style>
