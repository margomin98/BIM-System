import axios from 'axios'
import { defineStore } from 'pinia'
import {  useUtilsStore, useAPIStore } from '@/store'
import { UnitArray, PackageUnitArray, HistoryAction } from '@/assets/js/dropdown'
import { createDadagridObject } from '@/assets/js/common_fn'
import router from '@/router';
// lodash
import _ from "lodash"
// 資產管理通用function
export const useAssetStore = defineStore('Asset', {
	// data
	state: () => ({
		// edit or view
		PageType: '',
    // 是否為主管或admin
    isPermitted: false,
		// 下拉選單
		DropdownArray: {
			EquipType: [],
			EquipCategory: [],
			Area: [],
			Layer: [],
			Custodian: [],
      Actions: HistoryAction,
			Unit: UnitArray,
			PackageUnit: PackageUnitArray,
		},
		// 表單
		Form: {
			AssetsId: '',
      Status: '',
			AssetType: '',
			ProjectCode: '',
			ProjectName: '',
      ShipmentNum: '',
			AR_ID: '', //編輯
			EquipType_Id: '',
      EquipTypeName: '',
			Category_Id: '',
			EquipCategoryName: '',
			AssetName: '',
			VendorName: '',
			ProductSpec: '',
			ProductType: '',
			SN: '',
			AmountPerPackage: null,
			AmountPerUnit: null, 
      InitialNum: null, //原始數量，在編輯資產時顯示耗材單位金額使用
			Number: 1,
			Unit: '',
			Area_Id: '',
			AreaName: '',
			Layer_Id: '',
			LayerName: '',
			WarrantyDate: '',
			WarrantyStartDate: '',
			WarrantyEndDate: '',
      AssetsInOperator: '',
      InboundDate: '',
      Custodian: '',
			Memo: '',
			newFile: [],
			viewFile: [],
			deleteFile: [],
			existFile:[],
		},
		// ----進出庫歷史紀錄
    // datagrid
    datagrid: createDadagridObject('ExecutionDate'),
    datagridField: [
      { field: "ExecutionDate", width: '150px', header: "作業日期" },
      { field: "Action", width: '150px', header: "作業行為" },
      { field: "FormID", width: '200px', header: "單號" },
      { field: "IH_Number", width: '100px', header: "數量" },
      { field: "IH_Unit", width: '100px', header: "單位" },
      { field: "ApplyPerson", width: '150px', header: "申請人員" },
      { field: "ExecutionPerson", width: '150px', header: "承辦人員" }
    ],
    rowData: [],
    // 搜尋參數
		searchParams: {
      StartDate: '',
      EndDate: '',
      Action: '',
    },
    // ----
		// 字數上限(固定)
		FormLetterCheckList: {
			Memo: {field: '備註', max: 500},
      ProjectCode: {field: '專案代碼', max: 10},
			AssetName: {field: '物品名稱 ', max: 20},
			VendorName: {field: '廠商', max: 100},
			ProductSpec: {field: '型號', max: 100},
			ProductType: {field: '規格', max: 100},
			SN: {field: 'S/N', max: 100},
			Warranty: {field: '保固期限', max: 10},
		},
	}),
	// computed
	getters: {

	},
	// method
  actions: {
    // 取得資產資料
    async getDetails(AssetsId) {
      const apiStore = useAPIStore();
      const data = await apiStore.getAssetData(AssetsId);
      for(const key in data) {
        if(data[key] !== null && data[key] !== undefined) {
          switch (key) {
            case 'existFile':
              data.existFile.forEach(file => {
                this.Form.viewFile.push(_.cloneDeep({
                  FileName: file.FileName,
                  FileLink: file.FileLink,
                  FileType: 'exist',
                }));
              });
              break;
            default:
              this.Form[key] = data[key];
              break;
          }
        }
      }
      if(this.Form.EquipType_Id) {
        this.DropdownArray.EquipCategory =await apiStore.getEquipCategory(this.Form.EquipType_Id);
      }
      if(this.Form.Area_Id) {
        this.DropdownArray.Layer =await apiStore.getLayer(this.Form.Area_Id);
      }
    },
    // 歷史紀錄查詢
    async searchHistory(event, type) {
      const apiStore = useAPIStore();
      const utilsStore = useUtilsStore();
      const form = new FormData();
      //將表格資料append到 form
      for (const key in this.searchParams) {
        form.append(key, this.searchParams[key]);
      }
      form.append('AssetsId', this.Form.AssetsId);
      utilsStore.UpdatePageParameter( this.datagrid, event, type, form);
      const response = await apiStore.getMngDatagrid('/InventoryMng/AssetsHistory', this.datagrid, form);
      this.rowData = response.rows;
      this.datagrid.totalRecords = response.total;
      this.datagrid.key++;
      console.log('rowData',this.rowData);
    }
  }
})