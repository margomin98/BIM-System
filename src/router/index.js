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
//入庫作業


//出庫作業
import Rent_Datagrid from '../views/rent/Datagrid.vue'
import Rent_New from '../views/rent/New.vue'
import Rent_View from '../views/rent/View.vue'
import Rent_Edit from '../views/rent/Edit.vue'
//出庫作業

//系統管理
import System_parameter from '../views/system/Parameter'

//系統管理

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
    component:Store_View,
    props: true, // 允许接收参数
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
  {
    path: '/rent_datagrid',
    name: 'Rent_Datagrid',
    component:Rent_Datagrid,
  },
  {
    path: '/rent_new',
    name: 'Rent_New',
    component:Rent_New,
    
  },{
    path: '/rent_view',
    name: 'Rent_View',
    component:Rent_View,
  },
  {
    path: '/rent_edit',
    name: 'Rent_Edit',
    component:Rent_Edit,
  },
  {
    path: '/system_parameter',
    name: 'System_parameter',
    component:System_parameter,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
