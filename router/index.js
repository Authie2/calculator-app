import { createRouter, createWebHistory } from 'vue-router';
// import Loading from '@/pages/loading.vue';
import Home from '@/pages/index.vue';
import AppMenu from '@/pages/menu.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/loading',
    name: 'Loading',
    component: Loading,
  },
  {
    path: '/app',
    name: 'Caluator App',
    component: AppMenu,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
