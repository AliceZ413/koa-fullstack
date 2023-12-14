import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from '~pages';

const app = createApp(App);

app.use(
  createRouter({
    history: createWebHistory(),
    routes: routes,
  })
);

app.mount('#app');
