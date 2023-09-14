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
import Rent_Delete from "../views/rent/Delete.vue";
//出庫填報

//出庫作業
import Rent_Process_Datagrid from "../views/rent_process/Datagrid";
import Rent_Process_New from "../views/rent_process/New";
import Rent_Process_Confirm from "../views/rent_process/Confirm";
import Rent_Process_View from "../views/rent_process/View";
import Rent_Process_Delete from "../views/rent_process/Delete";
//出庫作業

//出庫審核
import Rent_Review_Datagrid from "../views/rent_review/Datagrid";
import Rent_Review_View from "../views/rent_review/View.vue";
import Rent_Review_New from "../views/rent_review/New.vue";
import Rent_Review_Delete from "../views/rent_review/Delete.vue";

//出庫審核

//資產管理
import Assets_Datagrid from "../views/assets/Datagrid.vue";
import Assets_View from "../views/assets/View.vue";
import Assets_Edit from "../views/assets/Edit.vue";
import Assets_Search from "../views/assets/Search.vue";
//資產管理

//設備整合
import Equipment_Datagrid from "../views/equipment/Datagrid.vue";
import Equipment_New from "../views/equipment/New.vue";
import Equipment_Edit from "../views/equipment/Edit.vue";
import Equipment_View from "../views/equipment/View.vue";
import Equipment_Delete from "../views/equipment/Delete.vue";
//設備整合

//盤點管理
import Inventory_Datagrid from "../views/inventory/Datagrid";
import Inventory_New from "../views/inventory/New";
import Inventory_View from "../views/inventory/View";
import Inventory_Edit from "../views/inventory/Edit";
import Inventory_Process from "../views/inventory/Process";
import Inventory_Balance from "../views/inventory/Balance";
import Inventory_Balance_Result from "../views/inventory/Balance_result";
//盤點管理

//收貨管理
import Receive_Datagrid from "../views/receive/Datagrid";
import Receive_New from "../views/receive/New";
import Receive_Edit from "../views/receive/Edit";
import Receive_View from "../views/receive/View";
import Receive_Delete from "../views/receive/Delete";
//收貨管理

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
    meta: {auth: false, request: ''},
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {auth: false, request: ''},
  },
  {
    path: "/authorized",
    name: "authorized",
    component: Authorized,
    meta: {auth: false, request: ''},
  },
  
  {
    path: "/store_datagrid",
    name: "Store_Datagrid",
    component: Store_Datagrid,
    meta: {auth: true, request: 'AI_Detail'},
  },
  {
    path: "/store_new",
    name: "Store_New",
    component: Store_New,
    meta: {auth: true, request: 'AI_Create'},
  },
  {
    path: "/store_edit",
    name: "Store_Edit",
    component: Store_Edit,
    meta: {auth: true, request: 'AI_Edit'},
  },
  {
    path: "/store_view",
    name: "Store_View",
    component: Store_View,
    props: true, // 允许接收参数
    meta: {auth: true, request: 'AI_Detail'},
  },
  {
    path: "/store_return",
    name: "Store_Return",
    component: Store_Return,
    meta: {auth: true, request: 'AI_Create'},
  },
  {
    path: "/store_delete",
    name: "Store_Delete",
    component: Store_Delete,
    meta: {auth: true, request: 'AI_Delete'},
  },
  {
    path: "/store_process_datagrid",
    name: "Store_Process_Datagrid",
    component: Store_Process_Datagrid,
    meta: {auth: true, request: 'AIP_Detail'},
  },
  {
    path: "/store_process_view",
    name: "Store_Process_View",
    component: Store_Process_View,
    meta: {auth: true, request: 'AIP_Detail'},
  },
  {
    path: "/store_process_confirm",
    name: "Store_Process_Confirm",
    component: Store_Process_Confirm,
    meta: {auth: true, request: 'AIP_DeliveryProcess'},
  },
  {
    path: "/store_process_edit",
    name: "Store_Process_Edit",
    component: Store_Process_Edit,
    meta: {auth: true, request: 'AIP_Edit'},
  },
  {
    path: "/store_process_delete",
    name: "Store_Process_Delete",
    component: Store_Process_Delete,
    meta: {auth: true, request: 'AIP_Delete'},
  }, 
  {
    path: "/assets_datagrid",
    name: "Assets_Datagrid",
    component: Assets_Datagrid,
    meta: {auth: true, request: 'AssetMgr'},
  },
  {
    path: "/assets_view",
    name: "Assets_View",
    component: Assets_View,
    meta: {auth: true, request: 'AssetMgr_Detail'},
  },
  {
    path: "/assets_edit",
    name: "Assets_Edit",
    component: Assets_Edit,
    meta: {auth: true, request: 'AssetMgr_Edit'},
  },
  {
    path: "/assets_search",
    name: "Assets_Search",
    component: Assets_Search,
    meta: {auth: true, request: 'SearchInventory'},
  },
  {
    path: "/rent_datagrid",
    name: "Rent_Datagrid",
    component: Rent_Datagrid,
    meta: {auth: true, request: 'AO_Detail'},
  },
  {
    path: "/rent_new",
    name: "Rent_New",
    component: Rent_New,
    meta: {auth: true, request: 'AO_Create'},
  },
  {
    path: "/rent_view",
    name: "Rent_View",
    component: Rent_View,
    meta: {auth: true, request: 'AO_Detail'},
  },
  {
    path: "/rent_delete",
    name: "Rent_Delete",
    component: Rent_Delete,
    meta: {auth: true, request: 'AO_Delete'},
  },
  {
    path: "/rent_edit",
    name: "Rent_Edit",
    component: Rent_Edit,
    meta: {auth: true, request: 'AO_Edit'},
  },
  {
    path: "/equipment_datagrid",
    name: "Equipment_Datagrid",
    component: Equipment_Datagrid,
    meta: {auth: true, request: 'EI_Detail'},
  },
  {
    path: "/equipment_new",
    name: "Equipment_New",
    component: Equipment_New,
    meta: {auth: true, request: 'EI_Create'},
  },
  {
    path: "/equipment_edit",
    name: "Equipment_Edit",
    component: Equipment_Edit,
    meta: {auth: true, request: 'EI_Change'},
  },
  {
    path: "/equipment_view",
    name: "Equipment_View",
    component: Equipment_View,
    meta: {auth: true, request: 'EI_Detail'},
  },
  {
    path: "/equipment_delete",
    name: "Equipment_Delete",
    component: Equipment_Delete,
    meta: {auth: true, request: 'EI_Delete'},
  },
  {
    path: "/inventory_datagrid",
    name: "Inventory_Datagrid",
    component: Inventory_Datagrid,
    meta: {auth: true, request: 'IP_Detail'},
  },
  {
    path: "/inventory_new",
    name: "Inventory_New",
    component: Inventory_New,
    meta: {auth: true, request: 'IP_Create'},
  },
  {
    path: "/inventory_view",
    name: "Inventory_View",
    component: Inventory_View,
    meta: {auth: true, request: 'IP_Detail'},
  },
  {
    path: "/inventory_edit",
    name: "Inventory_Edit",
    component: Inventory_Edit,
    meta: {auth: true, request: 'IP_Edit'},
  },
  {
    path: "/inventory_process",
    name: "Inventory_Process",
    component: Inventory_Process,
    meta: {auth: true, request: 'IP_InventoryProcess'},
  },
  {
    path: "/inventory_balance",
    name: "Inventory_Balance",
    component: Inventory_Balance,
    meta: {auth: true, request: 'IP_FlatProcess'},
  },
  {
    path: "/inventory_balance_result",
    name: "Inventory_Balance_Result",
    component: Inventory_Balance_Result,
    meta: {auth: true, request: 'IP_InventoryResult'},
  },
  {
    path: "/receive_datagrid",
    name: "Receive_Datagrid",
    component: Receive_Datagrid,
    // meta: {auth: true, request: 'IP_Detail'},
  }, 
  {
    path: "/receive_new",
    name: "Receive_New",
    component: Receive_New,
    // meta: {auth: true, request: 'IP_Detail'},
  },
  {
    path: "/receive_edit",
    name: "Receive_Edit",
    component: Receive_Edit,
    // meta: {auth: true, request: 'IP_Detail'},
  },
  {
    path: "/receive_view",
    name: "Receive_View",
    component: Receive_View,
    // meta: {auth: true, request: 'IP_Detail'},
  },
  {
    path: "/receive_delete",
    name: "Receive_Delete",
    component: Receive_Delete,
    // meta: {auth: true, request: 'IP_Detail'},
  },
  {
    
    path: "/authority",
    name: "Authority",
    component: Authority,
    meta: {auth: true, request: 'RolesMgr'},
  },
  {
    path: "/system_parameter",
    name: "System_Parameter",
    component: System_Parameter,
    meta: {auth: true, request: 'ParamMgr'},
  },
  // {
  //   path: "/system_parameter_edit",
  //   name: "System_Parameter_Edit",
  //   component: System_Parameter_Edit,
  //   meta: {auth: true, request: 'ParamMgr'},
  //   // 這頁沒使用到
  // },
  {
    path: "/rent_process_datagrid",
    name: "Rent_Process_Datagrid",
    component: Rent_Process_Datagrid,
    meta: {auth: true, request: 'AOP_Detail'},
  },
  {
    path: "/rent_process_new",
    name: "Rent_Process_New",
    component: Rent_Process_New,
    meta: {auth: true, request: 'AOP_PreparedProcess'},
  },
  {
    path: "/rent_process_confirm",
    name: "Rent_Process_Confirm",
    component: Rent_Process_Confirm,
    meta: {auth: true, request: 'AOP_DeliveryProcess'},
  },
  {
    path: "/rent_process_view",
    name: "Rent_Process_View",
    component: Rent_Process_View,
    meta: {auth: true, request: 'AOP_Detail'},
  },
  {
    path: "/rent_process_delete",
    name: "Rent_Process_Delete",
    component: Rent_Process_Delete,
    meta: {auth: true, request: 'AOP_Delete'},
  },
  {
    path: "/rent_review_datagrid",
    name: "Rent_Review_Datagrid",
    component: Rent_Review_Datagrid,
    meta: {auth: true, request: 'AOV_Detail'},
  },
  {
    path: "/rent_review_view",
    name: "Rent_Review_View",
    component: Rent_Review_View,
    meta: {auth: true, request: 'AOV_Detail'},
  },
  {
    path: "/rent_review_new",
    name: "Rent_Review_New",
    component: Rent_Review_New,
    meta: {auth: true, request: 'AOV_Verify'},
  },
  // {
  //   path: "/rent_review_delete",
  //   name: "Rent_Review_Delete",
  //   component: Rent_Review_Delete,
  //   meta: {auth: true, request: 'AOV_Verify'},
  //   // 這頁沒使用到
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.auth) {
//     const axios = require('axios');
//     try {
//       const request = to.meta.request
//       const response = await axios.get(`/GetParameter/HasPermission?id=${request}`);
//       const data = response.data;

//       if (data.state === 'success') {
//         if(data.resultList === true) {
//           next();
//         }
//         else {
//           next({ name: 'authorized' });
//         }
//       } 
//       else if(data.state === 'account_error') {
//         alert(data.messages);
//         next({ name: 'login' });
//       }
//       else {
//         alert(data.messages);
//         next(false);
//       }
//     } catch (error) {
//       // 处理请求错误
//       console.error('Error checking permission:', error);
//       next(false); // 阻止导航继续
//     }
//   } else {
//     next();
//   }
// });
export default router;
