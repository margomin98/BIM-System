import axios from '@/axios/tokenInterceptor'
import { defineStore } from 'pinia'
import {  useUtilsStore, useAPIStore } from '@/store'
import { Rent_UseArray } from '@/assets/js/dropdown'
import router from '@/router';
// lodash
import _, { result } from "lodash"
import { createDadagridObject } from '@/assets/js/common_fn';
// 入庫系統通用function
export const useRentStore = defineStore('Rent', {
	// data
	state: () => ({
		PageType: '',
		canSubmit: false,
		// 驗證人員*3(最多一次三個):
		user1: {
			title:'',
			userName:'',
			userPassword:'',
			id:'',
			isValidate: false,
      resultName: '未驗證',
		},
		// 下拉選單
		DropdownArray: {
			EquipType: [],
			EquipCategory: [],
			Area: [],
			Layer: [],
			Recipient: [],
			ProjectCode: [], // api原本資料
			formProjectCode: [], // 處理陣列
			AssetType: ['資產','存貨','耗材'],
			Use: Rent_UseArray,
		},
		// 出庫單表單
		Form: {
			AO_ID: '',
			Applicant: '',
			ApplicationDate: '',
			Owner: '', //廠商
      // 交付
			DeliveryDate: '',
			DeliveryMemo: '',
			DeliveryOperator: '',
      // ----
			Description: '',
			ItemList: [], // 出庫項目 <-需求
			OM_List: [], // 出庫細項 <-實際資產
      // 備料
			PrepareDate: '',
			PrepareMemo: '',
			PreparedPerson: '',
      // ----
			ProjectCode: '',
			ProjectName: '',
			ProjectSelect: { Text: '--請選擇--',Value: '' },
			Recipient: '', // 領用人員
			Status: '',
			Use: '',
      // 審核
			VerifyDate: '',
			VerifyMemo: '',
			VerifyPerson: '',
			VerifyResult: null,
      // ----
			UploadPerson: '',
			ItemList: [],
			newFile: [],
			viewFile: [],
			deleteFile: [],
			existFile: [],
		},
    // 搜尋表單參數
    searchParams: {
      EquipType_Id: '',
      Category_Id: '',
      Area_Id: '',
      Layer_Id: '',
      ProjectCode: '',
			ProjectSelect: { Text: '--請選擇--',Value: '' },
      AssetsId: '',
      AssetName: '',
    },
    datagrid1: createDadagridObject('AssetsId'),
    datagrid1field: [],
    rowData1: [],
    datagrid2: createDadagridObject('AssetsId'),
    datagrid2field: [],
    rowData2: [],
		// 出庫項目field
		ItemList_field: [
			{ field: "id", width: '50px', header: "項目" },
			{ field: "EquipTypeName", width: '150px', header: "設備總類" },
			{ field: "EquipCategoryName", width: '150px', header: "設備分類" },
			{ field: "ProductName", width: '150px', header: "物品名稱" },
			{ field: "Number", width: '100px', header: "數量" },
			{ field: "RequiredSpec", width: '250px', header: "規格需求" }
		],
		// 出庫細項field
		OMList_field: [
			{ field: "OM_List_id", width: '50px', header: "需求項目", sortable: false },
			{ field: "OM_Number", width: '30px', header: "數量", sortable: false },
			{ field: "OM_Unit", width: '30px', header: "單位", sortable: false },
			{ field: "AssetsId", width: '150px', header: "資產編號", sortable: true },
			{ field: "AssetName", width: '150px', header: "物品名稱", sortable: true },
			{ field: "AreaName", width: '150px', header: "儲位區域", sortable: true },
			{ field: "LayerName", width: '150px', header: "儲位櫃位", sortable: true },
			{ field: "VendorName", width: '150px', header: "廠商", sortable: true },
			{ field: "ProductType", width: '150px', header: "型號", sortable: true },
			{ field: "ProductSpec", width: '150px', header: "規格", sortable: true },
		],
		// 字數上限(固定)
		FormLetterCheckList: {
			ProjectCode: {field: '專案代碼', max: 10},
			Description: {field: '說明', max: 100},
		},
		searchParamsLetterCheckList: {
			AssetName: {field: '物品名稱', max: 20}
		}
	}),
	// computed
	getters: {

	},
	// method
  actions: {
    onProjectSelect(option) {
			this.Form.ProjectCode = option.Value;
		},
    onSearchProjectSelect(option) {
			this.searchParams.ProjectCode = option.Value;
		},
		// 取得資料單
		async getDetails(AO_ID) {
			try {
				const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`)
				const data = response.data ;
				if(data.state === 'success') {
					console.log('出庫單資料', data.resultList);
					// 塞入上半部資訊
					Object.keys(this.Form).forEach(key=>{
						if(data.resultList[key]) {
							this.Form[key] = data.resultList[key];
						}
					})
				}
			}
			catch(e) {
				console.error(e);
			}
		},
  }
})