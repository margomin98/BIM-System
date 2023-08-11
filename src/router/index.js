import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Login from "../views/Login.vue";
//入庫填報
import Store_Datagrid from '../views/store/Datagrid.vue'
import Store_New from '../views/store/New.vue'
import Store_Edit from '../views/store/Edit.vue'
import Store_View from '../views/store/View.vue'
import Store_Return from '../views/store/Return.vue'
//入庫填報

//入庫作業
import Store_Process_Datagrid from '../views/store_process/Datagrid.vue'
import Store_Process_View from '../views/store_process/View.vue'
import Store_Process_Confirm from '../views/store_process/Confirm.vue'
import Store_Process_Edit from '../views/store_process/Edit.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component:Home
  }
  ,
  {
    path: '/store_datagrid',
    name: 'Store_Datagrid',
    component:Store_Datagrid
  },
  {
    path: '/store_new',
    name: 'Store_New',
    component:Store_New
  }
  ,
  {
    path: '/store_edit',
    name: 'Store_Edit',
    component:Store_Edit
  }
  ,
  {
    path: '/store_view',
    name: 'Store_View',
    component:Store_View
  },
  {
    path: '/store_return',
    name: 'Store_Return',
    component:Store_Return
  },
  {
    path: '/store_process_datagrid',
    name: 'Store_Process_Datagrid',
    component:Store_Process_Datagrid,
  },
  {
    path: '/store_process_view',
    name: 'Store_Process_View',
    component:Store_Process_View,
  },
  {
    path: '/store_process_confirm',
    name: 'Store_Process_Confirm',
    component:Store_Process_Confirm,
  },
  {
    path: '/store_process_edit',
    name: 'Store_Process_Edit',
    component:Store_Process_Edit,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
