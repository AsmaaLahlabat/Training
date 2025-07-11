// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UserTable.vue'

const routes = [
  {
    path: '/',
    name: 'UsersView',
    component: UsersView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
