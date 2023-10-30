import App from './App.vue';
import router from './router';
import store from './store';
import { createApp } from 'vue';
import '../src/assets/css/bootstrap.css';
import 'ag-grid-community/styles/ag-grid.css'; 
import '../src/assets/css/ad-grid.css';
import PrimeVue from 'primevue/config';
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


createApp(App).use(store).use(router).use(PrimeVue).use(LoadingPlugin).mount('#app');
// .use(EasyUI).use(VueColumnsResizable)use(vuetify)