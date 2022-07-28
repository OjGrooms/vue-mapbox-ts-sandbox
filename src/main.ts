import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from '@/router';
import VueMapboxTs from 'vue-mapbox-ts';
import App from './App.vue';

createApp(App).use(createPinia()).use(router).use(VueMapboxTs).mount('#app');
