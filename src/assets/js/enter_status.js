// 在頁面有限定狀態的情況下，檢查是否可進入頁面的狀態Array
// 訂購: 刪除
export const Order_Delete = ['待收貨']
// 入庫填報: 編輯、刪除 
export const Store_Edit_Status = ['可交付','申請入庫','申請歸還','待補資料'];
export const Store_Delete_Status = ['可交付','申請入庫','申請歸還'];
// 快速入庫: 編輯、檢視
export const Quick_Store_Status = ['待補資料', '快速入庫完成'];
// 入庫作業: 通知交付、交付、入庫、 刪除
export const StoreProcess_NotifyConfirm_Status = ['可交付','申請入庫','申請歸還'];
export const StoreProcess_Confirm_Status = ['可交付'];
export const StoreProcess_Edit_Status = ['待入庫'];
export const StoreProcess_Delete_Status = ['可交付','申請入庫','申請歸還'];
// 出庫填報: 編輯、刪除
export const Rent_Edit_Status = ['已填報'];
export const Rent_Delete_Status = ['已填報'];
// 出庫作業: 備料、通知交付、交付、刪除
export const RentProcess_New_Status = ['已填報'];
export const RentProcess_NotifyConfirm_Status = ['待交付','可交付'];
export const RentProcess_Confirm_Status = ['可交付'];
export const RentProcess_Delete_Status = ['已填報'];
// 出庫審核: 審核
export const RentReview_New_Status = ['待審核'];
// 盤點管理: 編輯、盤點、平帳、結果、刪除
export const Inventory_Edit_Status = ['待盤點']
export const Inventory_Process_Status = ['待盤點','盤點中']
export const Inventory_Balance_Status = ['待平帳']
export const Inventory_BalanceResult_Status = ['已完成']
export const Inventory_Delete_Status = ['待盤點']
// 維修管理: 編輯、交付、審核、送修、刪除
export const Repair_Edit_Status = ['待交付']
export const Repair_Deliver_Status = ['待交付']
export const Repair_Review_Status = ['待審核']
export const Repair_Process_Status = ['待送修','已送修']
export const Repair_Delete_Status = ['待交付']
// 報廢管理: 編輯、交付、審核、刪除
export const Scrap_Edit_Status = ['待交付']
export const Scrap_Deliver_Status = ['待交付']
export const Scrap_Review_Status = ['待審核']
export const Scrap_Delete_Status = ['待交付']