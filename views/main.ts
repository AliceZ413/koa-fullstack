import { createApp } from 'vue';
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import App from './App.vue';

const app = createApp(App);

app.use(
  createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: () => import('./routes/Index.vue'),
      },
      {
        path: '/about',
        component: () => import('./routes/About.vue'),
      },
    ],
  })
);

app.mount('#app');
