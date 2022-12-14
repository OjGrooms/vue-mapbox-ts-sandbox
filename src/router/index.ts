import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Map from '@/views/Map.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Map',
    component: Map,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
