import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
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
      {
        path: '/login',
        component: () => import('./routes/Login.vue'),
      },
    ],
  })
);

app.mount('#app');
