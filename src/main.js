
import App from './App.vue'
import router from './router'
import store from './store'
import 'v3-easyui/dist/themes/default/easyui.css';
import 'v3-easyui/dist/themes/icon.css';
import 'v3-easyui/dist/themes/vue.css';
import { createApp } from 'vue'
import { createStore } from 'vuex';
import EasyUI from 'v3-easyui';
import 'bootstrap/dist/css/bootstrap.css';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const myvarient = createStore({
  state() {
    return {
      backendResponse: '111',
    };
  },
  mutations: {
    setBackendResponse(state, data) {
      state.backendResponse = data;
      console.log('111');
    }
    // 在这里定义修改状态的方法（同步操作）
  },
  actions: {
    // 在这里定义触发异步操作的方法
  },
  getters: {
    // 在这里定义计算属性
  }
});

createApp(App).use(myvarient).use(EasyUI).use(store).use(router).mount('#app')
