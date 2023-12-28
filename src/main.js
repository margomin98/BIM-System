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

createApp(App).use(router).use(PrimeVue).use(LoadingPlugin).mount('#app');
// .use(EasyUI).use(VueColumnsResizable)use(vuetify)