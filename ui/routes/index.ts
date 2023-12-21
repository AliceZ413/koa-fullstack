import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('./login/login'),
    meta: {
      layout: false,
    },
  },
  {
    path: '/dashboard',
    component: () => import('../layout/layout'),
    children: [],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
