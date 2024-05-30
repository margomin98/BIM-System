import App from './App.vue';
import { createApp } from 'vue';
// vue router
import router from './router';
// bs
import '../src/assets/css/bootstrap.css';
// ag-grid
import 'ag-grid-community/styles/ag-grid.css'; 
import '../src/assets/css/ad-grid.css';
// primevue
import PrimeVue from 'primevue/config';
// loding animation
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// scrollbars
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
// pinia
import { pinia } from '@/plugins/pinia'
createApp(App).use(router).use(PrimeVue).use(LoadingPlugin).use(pinia).use(PerfectScrollbar).mount('#app');