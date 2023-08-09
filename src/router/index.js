import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Login from "../views/Login.vue";
import Store_Datagrid from '../views/store/Datagrid.vue'
import Store_New from '../views/store/New.vue'
import Store_Edit from '../views/store/Edit.vue'
import Store_View from '../views/store/View.vue'
import Store_Return from '../views/store/Return.vue'

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
    name: 'Store_new',
    component:Store_New
  }
  ,
  {
    path: '/store_edit',
    name: 'Store_edit',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
