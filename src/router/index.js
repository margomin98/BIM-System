import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Test from "../views/test/Test.vue";
import Print from "../views/test/Print.vue";
import Component from "../views/test/Component.vue";

//入庫填報
import Store_Datagrid from "../views/store/Datagrid.vue";
import Store_New from "../views/store/New.vue";
import Store_Edit from "../views/store/Edit.vue";
import Store_View from "../views/store/View.vue";
import Store_Return from "../views/store/Return.vue";
import Store_Delete from "../views/store/Delete";
//入庫填報

//快速入庫
import Quick_Store_New from "../views/quick_store/New.vue";
import Quick_Store_Edit from "../views/quick_store/Edit.vue";
import Quick_Store_View from "../views/quick_store/View.vue";
//快速入庫

//入庫作業
import Store_Process_Datagrid from "../views/store_process/Datagrid.vue";
import Store_Process_View from "../views/store_process/View.vue";
import Store_Process_Confirm from "../views/store_process/Confirm.vue";
import Store_Process_Edit from "../views/store_process/Edit.vue";
import Store_Process_Delete from "../views/store_process/Delete.vue";
//入庫作業

//專案採購
import Case_Purchase_Datagrid from "../views/case_purchase/Datagrid.vue";
import Case_Purchase_Order from "../views/case_purchase/Order.vue";
import Case_Purchase_Process from "../views/case_purchase/Process.vue";
import Case_Purchase_View from "../views/case_purchase/View.vue";
//專案採購

// 快速出庫
import Quick_Rent_New from "../views/quick_rent/New.vue";
import Quick_Rent_View from "../views/quick_rent/View.vue";

// 出貨簽收
import Ship_Receive_Datagrid from "../views/ship_receive/Datagrid.vue";
import Ship_Receive_Confirm from "../views/ship_receive/Confirm.vue";

// 出貨簽收

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
import Inventory_Delete from "../views/inventory/Delete";
//盤點管理

//訂單管理
import Order_Datagrid from "../views/order/Datagrid";
import Order_New from "../views/order/New";
import Order_Edit from "../views/order/Edit";
import Order_View from "../views/order/View";
import Order_Delete from "../views/order/Delete";
//訂單管理

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

//维修管理
import Repair_Datagrid from "../views/repair/Datagrid";
import Repair_New from "../views/repair/New";
import Repair_Edit from "../views/repair/Edit";
import Repair_View from "../views/repair/View";
import Repair_Process from "../views/repair/Process";
import Repair_Review from "../views/repair/Review";
import Repair_Deliver from "../views/repair/Deliver";
import Repair_Delete from "../views/repair/Delete"
//维修管理

//報廢管理
import Scrap_Datagrid from "../views/scrap/Datagrid";
import Scrap_New from "../views/scrap/New";
import Scrap_Edit from "../views/scrap/Edit";
import Scrap_View from "../views/scrap/View";
import Scrap_Deliver from "../views/scrap/Deliver";
import Scrap_Review from "../views/scrap/Review";
import Scrap_Delete from "../views/scrap/Delete";
//報廢管理

//系統日誌
import System_Log_Datagrid from "../views/system_log/Datagrid"
import System_Log_View from "../views/system_log/View"
//系統日誌
//權限不足
import Authorized from "../views/Authorized";
//權限不足

import axios from "axios";
import { getApplication } from "@/assets/js/common_api";
import { useAssetStore } from "@/store/asset/_index";
import { useUtilsStore } from "@/store";
import { useStorageStore } from "@/store/storage/_index";
import { useRentStore } from "@/store/rent/_index";
import { useQuickRentStore } from "@/store/rent/quick";
import { useQuickProcessStore } from "@/store/storage/quick_process";
const routes = [
  {
    path: "/test",
    name: "test",
    component: Test,
    // meta: {auth: false, request: ''},
  },
  {
    path: "/component",
    name: "component",
    component: Component,
    // meta: {auth: false, request: ''},
  },
  {
    path: "/print",
    name: "print",
    component: Print,
    // meta: {auth: false, request: ''},
  },
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
    meta: {auth: false, request: '' , checkLogin: true},
  },
  {
    path: "/authorized",
    name: "authorized",
    component: Authorized,
    meta: {auth: false, request: '' , checkLogin: true},
  },
  
  {
    path: "/store_datagrid",
    name: "Store_Datagrid",
    component: Store_Datagrid,
    meta: {auth: true, request: 'AI_Detail'},
  },
  {
    path: "/quick_store_new",
    name: "Quick_Store_New",
    component: Quick_Store_New,
    meta: {auth: true, request: 'AI_Fast'},
  },
  {
    path: "/quick_store_edit",
    name: "Quick_Store_Edit",
    component: Quick_Store_Edit,
    meta: {auth: true, request: 'AI_Edit'},
  },
  {
    path: "/quick_store_View",
    name: "Quick_Store_View",
    component: Quick_Store_View,
    meta: {auth: true, request: 'AI_Create'},
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
    props: true,
    meta: {auth: true, request: 'AI_Detail'},
  },
  {
    path: "/store_return",
    name: "Store_Return",
    component: Store_Return,
    meta: {auth: false, request: '' , checkLogin: true},//歸還入庫不綁權限
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
    meta: {auth: true, request: 'AIP_InboundDelivery'},
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
    path: "/quick_rent_new",
    name: "Quick_Rent_New",
    component: Quick_Rent_New,
    meta: {auth: true, request: 'AO_Fast'},
  },
  {
    path: "/quick_rent_view",
    name: "Quick_Rent_View",
    component: Quick_Rent_View,
    meta: {auth: true, request: 'AO_Detail'},
  },
  {
    path: "/ship_receive_datagrid",
    name: "Ship_Receive_Datagrid",
    component: Ship_Receive_Datagrid,
    // meta: {auth: true, request: 'AO_Detail'},
  },
  {
    path: "/ship_receive_confirm",
    name: "Ship_Receive_Confirm",
    component: Ship_Receive_Confirm,
    // meta: {auth: true, request: 'AO_Detail'},
  },
  {
    path: "/case_purchase_datagrid",
    name: "Case_Purchase_Datagrid",
    component: Case_Purchase_Datagrid,
    // meta: {auth: true, request: 'AO_Detail'},
  },
  {
    path: "/case_purchase_order",
    name: "Case_Purchase_Order",
    component: Case_Purchase_Order,
    // meta: {auth: true, request: 'AO_Detail'},
  },
  {
    path: "/case_purchase_process",
    name: "Case_Purchase_Process",
    component: Case_Purchase_Process,
    // meta: {auth: true, request: 'AO_Detail'},
  },
  {
    path: "/case_purchase_view",
    name: "Case_Purchase_View",
    component: Case_Purchase_View,
    // meta: {auth: true, request: 'AO_Detail'},
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
    path: "/inventory_delete",
    name: "Inventory_Delete",
    component: Inventory_Delete,
    meta: {auth: true, request: 'IP_Delete'},
  },
  {
    path: "/order_datagrid",
    name: "Order_Datagrid",
    component: Order_Datagrid,
    meta: {auth: true, request: 'PO_Mgr'},
  },
  {
    path: "/order_new",
    name: "Order_New",
    component: Order_New,
    meta: {auth: true, request: 'PO_Create'},
  }, 
  {
    path: "/order_edit",
    name: "Order_Edit",
    component: Order_Edit,
    meta: {auth: true, request: 'PO_Edit'},
  }, 
  {
    path: "/order_view",
    name: "Order_View",
    component: Order_View,
    meta: {auth: true, request: 'PO_Detail'},
  }, 
  {
    path: "/order_delete",
    name: "Order_Delete",
    component: Order_Delete,
    meta: {auth: true, request: 'PO_Delete'},
  }, 
  {
    path: "/receive_datagrid",
    name: "Receive_Datagrid",
    component: Receive_Datagrid,
    meta: {auth: true, request: 'AR_Mgr'},
  }, 
  {
    path: "/receive_new",
    name: "Receive_New",
    component: Receive_New,
    meta: {auth: true, request: 'AR_Create'},
  },
  {
    path: "/receive_edit",
    name: "Receive_Edit",
    component: Receive_Edit,
    meta: {auth: true, request: 'AR_Edit'},
  },
  {
    path: "/receive_view",
    name: "Receive_View",
    component: Receive_View,
    meta: {auth: true, request: 'AR_Detail'},
  },
  {
    path: "/receive_delete",
    name: "Receive_Delete",
    component: Receive_Delete,
    meta: {auth: true, request: 'AR_Delete'},
  },
  {
    path: "/repair_datagrid",
    name: "Repair_Datagrid",
    component: Repair_Datagrid,
    meta: {auth: true, request: 'R_Detail'},
  }, 
  {
    path: "/repair_new",
    name: "Repair_New",
    component: Repair_New,
    meta: {auth: true, request: 'R_Create'},
  },
  {
    path: "/repair_edit",
    name: "Repair_Edit",
    component: Repair_Edit,
    meta: {auth: true, request: 'R_Edit'},
  },
  {
    path: "/repair_view",
    name: "Repair_View",
    component: Repair_View,
    meta: {auth: true, request: 'R_Detail'},
  },
  {
    path: "/repair_process",
    name: "Repair_Process",
    component: Repair_Process,
    meta: {auth: true, request: 'R_Repair'},
  },
  {
    path: "/repair_review",
    name: "Repair_Review",
    component: Repair_Review,
    meta: {auth: true, request: 'R_Verify'},
  },
  {
    path: "/repair_deliver",
    name: "Repair_Deliver",
    component: Repair_Deliver,
    meta: {auth: true, request: 'R_RepairDelivery'},
  }, 
  {
    path: "/repair_delete",
    name: "Repair_Delete",
    component: Repair_Delete,
    meta: {auth: true, request: 'R_Delete'},
  }, 
  {
    path: "/scrap_datagrid",
    name: "Scrap_Datagrid",
    component: Scrap_Datagrid,
    meta: {auth: true, request: 'S_Detail'},
  },
  {
    path: "/scrap_new",
    name: "Scrap_New",
    component: Scrap_New,
    meta: {auth: true, request: 'S_Create'},
  }, 
  {
    path: "/scrap_edit",
    name: "Scrap_Edit",
    component: Scrap_Edit,
    meta: {auth: true, request: 'S_Edit'},
  }, 
  {
    path: "/scrap_view",
    name: "Scrap_View",
    component: Scrap_View,
    meta: {auth: true, request: 'S_Detail'},
  }, 
  {
    path: "/scrap_deliver",
    name: "Scrap_Deliver",
    component: Scrap_Deliver,
    meta: {auth: true, request: 'S_ScrapDelivery'},
  },
  {
    path: "/scrap_review",
    name: "Scrap_Review",
    component: Scrap_Review,
    meta: {auth: true, request: 'S_Verify'},
  },
  {
    path: "/scrap_delete",
    name: "Scrap_Delete",
    component: Scrap_Delete,
    meta: {auth: true, request: 'S_Delete'},
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
    meta: {auth: true, request: 'AOP_OutboundDelivery'},
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
  {
    path: "/system_log_datagrid",
    name: "System_Log_Datagrid",
    component: System_Log_Datagrid,
    meta: {auth: true, request: 'SystemLog'},
  },
  {
    path: "/system_log_view",
    name: "System_Log_View",
    component: System_Log_View,
    meta: {auth: true, request: 'SystemLog'},
  }, 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async(to, from, next)=>{
  // useUtilsStore().$reset();
  // useStorageStore().$reset();
  // useAssetStore().$reset();
  // useRentStore().$reset();
  // useQuickRentStore().$reset();
  // useQuickProcessStore().$reset();
  next();
})
// router.beforeEach(async (to, from, next) => {
//   if (to.meta.auth) {
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
//     if(to.meta.checkLogin) {
//       // 檢查是否有登入
//       try {
//         const response = await axios.get('http://192.168.0.177:7008/GetDBdata/GetApplicant');
//         const data = response.data;
//         if (data.state === 'success') {
//           next();
//         } 
//         else if(data.state === 'account_error') {
//           alert(data.messages);
//           next({ name: 'login' });
//         }
//         else {
//           alert(data.messages);
//           next(false);
//         }
//       } catch (error) {
//         // 处理请求错误
//         console.error('Error checking permission:', error);
//         next(false); // 阻止导航继续
//       }
//     }
//     next();
//   }
// });
export default router;
