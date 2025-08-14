import { createRouter, createWebHistory } from 'vue-router'

// صفحات تجريبية (اعمليها بعد شوي)
const Dashboard = () => import('../views/Dashboard.vue')
const Units     = () => import('../views/Units.vue')
const Reports   = () => import('../views/Reports.vue')
const Settings  = () => import('../views/Settings.vue')
const Profile   = () => import('../views/Profile.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',         name: 'dashboard', component: Dashboard },
    { path: '/units',    name: 'units',     component: Units },
    { path: '/reports',  name: 'reports',   component: Reports },
    { path: '/settings', name: 'settings',  component: Settings },
    { path: '/profile',  name: 'profile',   component: Profile }
  ]
})

export default router
