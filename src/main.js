import App from './App.vue';
import router from './router';
import store from './store';
import { createApp } from 'vue';
import '../src/assets/css/bootstrap.css';
import 'ag-grid-community/styles/ag-grid.css'; 
import '../src/assets/css/ad-grid.css';
import PrimeVue from 'primevue/config';



createApp(App).use(store).use(router).use(PrimeVue).mount('#app');
// .use(EasyUI).use(VueColumnsResizable)use(vuetify)