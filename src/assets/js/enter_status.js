// 在頁面有限定狀態的情況下，檢查是否可進入頁面的狀態Array
// 入庫填報: 編輯、刪除
export const Store_Edit_Status = ['可交付','申請入庫','申請歸還'];
export const Store_Delete_Status = ['可交付','申請入庫','申請歸還'];
// 入庫作業: 交付、入庫、 刪除
export const StoreProcess_Edit_Status = ['可交付','申請入庫','申請歸還'];
export const StoreProcess_Confirm_Status = ['可交付','申請入庫','申請歸還'];
export const StoreProcess_Delete_Status = ['可交付','申請入庫','申請歸還'];
// 盤點計畫: 編輯、盤點、平帳、結果、刪除
export const Inventory_Edit_Status = ['待盤點']
export const Inventory_Process_Status = ['待盤點','盤點中']
export const Inventory_Balance_Status = ['待平帳']
export const Inventory_BalanceResult_Status = ['已完成']
export const Inventory_Delete_Status = ['待盤點']