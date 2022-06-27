
// createWebHashHistory createWebHistory
import { createRouter, createWebHistory } from 'vue-router';
import { constantRouterMap } from './config.js'

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes:constantRouterMap
})

export default router
