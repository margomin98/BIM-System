// 各管理模組常用之固定下拉選單
// 單位
export const UnitArray = ['個', '支', '枝', '隻', '根', '條', '顆']
export const PackageUnitArray = ['個', '對', '箱', '包', '組', '台', '件']
// 專案採購管理
export const CasePurchase_StatusArray = ['待採購' , '採購中' , '沖銷中' , '已完成'];
export const CasePurchase_DateCategory = ['申請日期' , '採購日期' , '沖銷日期' , '交貨期限'];
// 訂單管理
export const Order_UseArray = ['專案使用', '內部使用', '其他'];
export const Order_StatusArray = ['待收貨' , '已收貨']
// 入庫管理
export const Store_StatusArray = ['申請入庫', '申請歸還', '可交付', '待入庫', '已入庫', '已歸還', '待補資料', '快速入庫完成',]
export const Store_Process_DateTypeArray = ['申請入庫日期' , '交付日期' , '入庫日期']
// 出庫管理
export const Rent_UseArray = ['內部領用', '借測', '出貨', '退貨'];
export const Rent_StatusArray = ['已填報', '待審核', '待交付', '可交付', '部分交付', '已交付' , '審核不通過', '快速出庫完成' ];
export const Rent_Process_DateCategory = ['申請日期', '出庫日期', '備料日期', '審核日期'];
export const Rent_Review_DateCategory = ['申請日期', '審核日期'];
export const Rent_Review_UseArray = ['出貨', '退貨'];
export const Rent_Review_StatusArray = ['待審核', '審核通過', '審核不通過' ];
// 出貨簽收管理
export const ShipReceive_StatusArray = ['尚未簽收' , '已簽收'];
export const ShipReceive_DateCategory = ['申請日期' , '審核日期'];
// 資產管理
export const Asset_StastusArray = ['在庫', '內部領用', '借測', '維修', '出貨', '報廢', '退貨', '無庫存', '已被設備整合']
export const HistoryAction = ['入庫', '歸還', '借測', '維修', '內部領用', '出貨', '報廢', '退貨' , '盤點平帳', '移出設備整合箱' , '加入設備整合箱','Excel匯入'];
export const Asset_TypeArray = ['資產' , '存貨'];
// 設備集成管理
export const Equipment_DateCategory = ['最後更換日期' , '整合日期']
// 盤點計畫管理
export const PlanType = ['指定盤' , '專案盤點' , '月盤' , '季盤' , '年盤']
export const PlanStatus = ['待盤點' , '盤點中' , '待平帳' , '已完成']
export const PlanDateCategory = ['盤點開始日期' , '盤點結束日期' , '最近編輯時間']
// 維修管理
export const Repair_StatusArray = ['待交付' , '待審核' , '待送修' , '已送修' , '審核不通過']
export const Repair_DateCategory = ['申請日期' , '交付日期' , '審核日期' , '送修日期']
// 報廢管理
export const Scrap_StatusArray = ['待交付' , '待審核' , '已報廢' , '審核不通過']
export const Scrap_DateCategory = ['申請日期' , '交付日期' , '審核日期']
export const Scrap_TypeArray = ['歸還報廢' , '庫內報廢']
// 系統日誌管理
export const SystemLog_ActiveArray = ['登出','登入','新增','編輯','刪除','通知']
