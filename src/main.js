
import App from './App.vue'
import router from './router'
import store from './store'
import 'v3-easyui/dist/themes/default/easyui.css';
import 'v3-easyui/dist/themes/icon.css';
import 'v3-easyui/dist/themes/vue.css';
import { createApp } from 'vue'
import EasyUI from 'v3-easyui';
import '../src/assets/css/bootstrap.css';
import 'ag-grid-community/styles/ag-grid.css'; 
import '../src/assets/css/ad-grid.css';



createApp(App).use(EasyUI).use(store).use(router).mount('#app')
