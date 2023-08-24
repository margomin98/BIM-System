import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
//入庫填報
import Store_Datagrid from "../views/store/Datagrid.vue";
import Store_New from "../views/store/New.vue";
import Store_Edit from "../views/store/Edit.vue";
import Store_View from "../views/store/View.vue";
import Store_Return from "../views/store/Return.vue";
import Store_Delete from "../views/store/Delete";
//入庫填報

//入庫作業
import Store_Process_Datagrid from "../views/store_process/Datagrid.vue";
import Store_Process_View from "../views/store_process/View.vue";
import Store_Process_Confirm from "../views/store_process/Confirm.vue";
import Store_Process_Edit from "../views/store_process/Edit.vue";
import Store_Process_Delete from "../views/store_process/Delete.vue";
//入庫作業

//出庫填報
import Rent_Datagrid from "../views/rent/Datagrid.vue";
import Rent_New from "../views/rent/New.vue";
import Rent_View from "../views/rent/View.vue";
import Rent_Edit from "../views/rent/Edit.vue";
//出庫填報

//出庫作業
import Rent_Process_Datagrid from "../views/rent_process/Datagrid";
import Rent_Process_New from "../views/rent_process/New";
import Rent_Process_View from "../views/rent_process/View";
//出庫作業

//出庫審核
import Rent_Review_Datagrid from "../views/rent_review/Datagrid";
import Rent_Review_View from "../views/rent_review/View.vue";
//出庫審核

//系統管理
import System_Parameter from "../views/system/Parameter";
import System_Parameter_Edit from "../views/system/Parameter_edit";
import Authority from "../views/system/Authority";
//系統管理

//權限不足
import Authorized from "../views/Authorized";
//權限不足



const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/authorized",
    name: "authorized",
    component: Authorized,
  },
  
  {
    path: "/store_datagrid",
    name: "Store_Datagrid",
    component: Store_Datagrid,
  },
  {
    path: "/store_new",
    name: "Store_New",
    component: Store_New,
  },
  {
    path: "/store_edit",
    name: "Store_Edit",
    component: Store_Edit,
  },
  {
    path: "/store_view",
    name: "Store_View",
    component: Store_View,
    props: true, // 允许接收参数
  },
  {
    path: "/store_return",
    name: "Store_Return",
    component: Store_Return,
  },
  {
    path: "/store_delete",
    name: "Store_Delete",
    component: Store_Delete,
  },
  {
    path: "/store_process_datagrid",
    name: "Store_Process_Datagrid",
    component: Store_Process_Datagrid,
  },
  {
    path: "/store_process_view",
    name: "Store_Process_View",
    component: Store_Process_View,
  },
  {
    path: "/store_process_confirm",
    name: "Store_Process_Confirm",
    component: Store_Process_Confirm,
  },
  {
    path: "/store_process_edit",
    name: "Store_Process_Edit",
    component: Store_Process_Edit,
  },
  {
    path: "/store_process_delete",
    name: "Store_Process_Delete",
    component: Store_Process_Delete,
  },
  {
    path: "/rent_datagrid",
    name: "Rent_Datagrid",
    component: Rent_Datagrid,
  },
  {
    path: "/rent_new",
    name: "Rent_New",
    component: Rent_New,
  },
  {
    path: "/rent_view",
    name: "Rent_View",
    component: Rent_View,
  },
  {
    path: "/rent_edit",
    name: "Rent_Edit",
    component: Rent_Edit,
  },
  {
    path: "/authority",
    name: "Authority",
    component: Authority,
  },
  {
    path: "/system_parameter",
    name: "System_Parameter",
    component: System_Parameter,
  },
  {
    path: "/system_parameter_edit",
    name: "System_Parameter_Edit",
    component: System_Parameter_Edit,
  },
  {
    path: "/rent_process_datagrid",
    name: "Rent_Process_Datagrid",
    component: Rent_Process_Datagrid,
  },
  {
    path: "/rent_process_new",
    name: "Rent_Process_New",
    component: Rent_Process_New,
  },
  {
    path: "/rent_process_view",
    name: "Rent_Process_View",
    component: Rent_Process_View,
  },
  {
    path: "/rent_review_datagrid",
    name: "Rent_Review_Datagrid",
    component: Rent_Review_Datagrid,
  },
  {
    path: "/rent_review_view",
    name: "Rent_Review_View",
    component: Rent_Review_View,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
