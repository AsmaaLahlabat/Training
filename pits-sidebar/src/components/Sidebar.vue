<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { watch, onMounted } from 'vue'


const isOpen = ref(true)
const collapsed = ref(false)

const { t, locale } = useI18n()
const isRTL = computed(() => locale.value === 'ar')
const route = useRoute()

const icons = {
  Dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="#607D8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
  Units: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h13v10H3z"/><path d="M16 10h3l3 3v4h-6z"/><circle cx="5.5" cy="17.5" r="1.5"/><circle cx="18.5" cy="17.5" r="1.5"/></svg>`,
  Map: `<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 3.5c-2.5 2.2-2.5 12.8 0 15M11 3.5c2.5 2.2 2.5 12.8 0 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.2 9.5c4.5 2 9.1 2 13.6 0M4.2 12.5c4.5-2 9.1-2 13.6 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.8 12.8l-2.7 6.6 1.9-1.3 1.7 1.7 1.3-6.9z" fill="currentColor"/></svg>`,
  Reports: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="26" height="26"><rect x="4" y="13" width="4" height="7" rx="1"/><rect x="10" y="9" width="4" height="11" rx="1"/><rect x="16" y="5" width="4" height="15" rx="1"/></svg>`,
  Notifications: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>`,
  Customers: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6b778c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="12" y1="12" x2="16" y2="8"></line><polyline points="16 8 20 4 18 2 14 6"></polyline></svg>`,
  Areas: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26"><rect x="3" y="3" width="18" height="18" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="8.5" y1="5.5" x2="15.5" y2="18.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><line x1="4.5" y1="16.5" x2="12" y2="12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  Drivers: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6.5"/><path d="M12 14.5V19 M12 12.5L7.2 9.8 M12 12.5L16.8 9.8"/><circle cx="12" cy="12.2" r="2.2"/></g></svg>`,
  Classifications: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" stroke="#6B7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10.5" width="3" height="3" rx="0.6" fill="#6B7280" stroke="none"/><rect x="18" y="5" width="3" height="3" rx="0.6" fill="#6B7280" stroke="none"/><rect x="18" y="16" width="3" height="3" rx="0.6" fill="#6B7280" stroke="none"/><path d="M6 12h8"/><path d="M14 12l5 -4"/><path d="M14 12l5 4"/></svg>`,
  Tags: `<svg xmlns="http://www.w3.org/2000/svg" fill="#6B7280" version="1.1" width="26px" height="26px" viewBox="0 0 20 20" xml:space="preserve"><circle cx="7" cy="7" r="2"/><path d="M10.3,19.7l-9-9C1.1,10.5,1,10.3,1,10V2c0-0.6,0.4-1,1-1h8c0.3,0,0.5,0.1,0.7,0.3l9,9c0.4,0.4,0.4,1,0,1.4l-8,8C11.3,20.1,10.7,20.1,10.3,19.7z M3,9.6l8,8l6.6-6.6l-8-8H3V9.6z"/></svg>`,
  UsersAndAccounts: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  Permissions: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M15 9H15.01M15 15C18.3137 15 21 12.3137 21 9C21 5.68629 18.3137 3 15 3C11.6863 3 9 5.68629 9 9C9 9.27368 9.01832 9.54308 9.05381 9.80704C9.11218 10.2412 9.14136 10.4583 9.12172 10.5956C9.10125 10.7387 9.0752 10.8157 9.00469 10.9419C8.937 11.063 8.81771 11.1823 8.57913 11.4209L3.46863 16.5314C3.29568 16.7043 3.2092 16.7908 3.14736 16.8917C3.09253 16.9812 3.05213 17.0787 3.02763 17.1808C3 17.2959 3 17.4182 3 17.6627V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H6.33726C6.58185 21 6.70414 21 6.81923 20.9724C6.92127 20.9479 7.01881 20.9075 7.10828 20.8526C7.2092 20.7908 7.29568 20.7043 7.46863 20.5314L12.5791 15.4209C12.8177 15.1823 12.937 15.063 13.0581 14.9953C13.1843 14.9248 13.2613 14.8987 13.4044 14.8783C13.5417 14.8586 13.7588 14.8878 14.193 14.9462C14.4569 14.9817 14.7263 15 15 15Z" stroke="#6B7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
}

const items = [
  { svg: icons.Dashboard, label: 'Dashboard', path: '/' },
  { svg: icons.Units, label: 'Units', path: '/Units' },
  { svg: icons.Map, label: 'Map', path: '/Map' },
  { svg: icons.Reports, label: 'Reports', path: '/Reports' },
  { svg: icons.Notifications, label: 'Notifications', path: '/Notifications' },
  { svg: icons.Customers, label: 'Customers', path: '/Customers' },
  { svg: icons.Areas, label: 'Areas', path: '/Areas' },
  { svg: icons.Drivers, label: 'Drivers', path: '/Drivers' },
  { svg: icons.Classifications, label: 'Classifications', path: '/Classifications' },
  { svg: icons.Tags, label: 'Tags', path: '/Tags' },
  { svg: icons.UsersAndAccounts, label: 'UsersAndAccounts', path: '/Users' },
  { svg: icons.Permissions, label: 'Permissions', path: '/Permissions' },
]

const logoIconStyle = computed(() =>
  collapsed.value ? 'width:36px;height:36px' : 'width:40px;height:50px'
)

watch(collapsed, (val) => {
  document.documentElement.style.setProperty('--sidebar-w', val ? '72px' : '240px')
})

// عند أول تحميل
onMounted(() => {
  document.documentElement.style.setProperty('--sidebar-w', collapsed.value ? '72px' : '240px')
})

</script>


<template>
  <aside class="sidebar border-end bg-white d-flex flex-column"
    :class="{ 'sidebar-collapsed': collapsed, 'sidebar-hidden': !isOpen }">
    <div class="d-flex align-items-center justify-content-between p-3 border-bottom">
      <div class="d-flex align-items-center gap-2">
        <img :src="'/logo1.jpeg'" alt="Logo Icon" :style="logoIconStyle" />
        <img v-show="!collapsed" src="/logo.jpeg" alt="Logo Text" style="width:130px;height:50px" />
      </div>

      <div class="d-flex align-items-center gap-2">
        <!-- ✅ زر السايدبار الجديد -->
        <button class="sidebar-toggle-btn" @click="collapsed = !collapsed"
          :title="collapsed ? 'Expand' : 'Collapse'">
          <i :class="collapsed ? 'bi bi-chevron-right' : (isRTL ? 'bi bi-chevron-right' : 'bi bi-chevron-left')"></i>
        </button>

        <button class="btn btn-sm btn-outline-secondary d-lg-none" @click="isOpen = !isOpen" title="Close">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>

    <nav class="nav flex-column py-2">
      <RouterLink v-for="item in items" :key="item.path" :to="item.path"
        class="nav-link d-flex align-items-center gap-3 px-3 py-2 text-secondary"
        :class="{ active: route.path === item.path, 'justify-content-center': collapsed }">
        <span class="nav-icon" v-html="item.svg" />
        <span v-show="!collapsed" class="fw-semibold">{{ t(item.label) }}</span>
      </RouterLink>
    </nav>
  </aside>

  <button class="btn btn-primary position-fixed d-lg-none"
    style="bottom:1rem; inset-inline-start:1rem; z-index:1050" @click="isOpen = true" title="Menu">
    <i class="bi bi-list"></i>
  </button>
</template>

<style scoped>
.sidebar {
  inline-size: 250px;
  position: fixed;
  inset-block-start: 0;
  inset-inline-start: 0;
  block-size: 100vh;
  margin: 0;
  padding: 0;
  border-inline-end: 1px solid #e9ecef !important;
  background: #fff;
}

.sidebar.sidebar-collapsed {
  inline-size: 72px;
}

@media (max-width: 991.98px) {
  .sidebar {
    z-index: 1040;
    transition: transform 0.25s ease;
    transform: translateX(0);
  }

  .sidebar.sidebar-hidden {
    transform: translateX(-110%);
  }

  :dir(rtl) .sidebar.sidebar-hidden {
    transform: translateX(110%);
  }
}

.nav-link {
  border-radius: 12px;
  margin-inline: 8px;
  margin-block: 6px;
  min-height: 44px;
  line-height: 1;
  transition: background 0.15s ease, color 0.15s ease;
}

.nav-link:hover {
  background: #eef4ff;
  color: #0d6efd;
}

.nav-icon svg {
  display: block;
}

.nav-link.active {
  background: #0b2fff;
  color: #fff !important;
}

.nav-link.active .nav-icon svg {
  color: #fff;
}

:deep(.justify-content-center) {
  justify-content: center !important;
}

/* ✅ شكل زر الطي الجديد */
.sidebar-toggle-btn {
  background-color: #e9f0f6;
  border: none;
  border-radius: 8px;
  margin-top: 30px;
  padding: 0;              /* ← إزالة أي فراغ داخلي */
  width: 28px;             /* حجم الزر مناسب للسهم */
  height: 28px;
  margin-inline-start: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sidebar-toggle-btn:hover {
  background-color: #d6dadd;
}

.sidebar-toggle-btn i {
  font-size: 12px;
  color: #6c757d;
}
</style>
