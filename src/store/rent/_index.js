import axios from 'axios';
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
			Recipient: [], // 領用人員
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
			ItemList: [], // 出庫項目 <-需求 or 快速出庫出庫細項 <-實際資產
			newItemList: [], // 新增的需求(出庫-填報:新增&編輯 使用)
			deleteItemList: [], // 待刪除的需求(出庫-填報:新增&編輯 使用)
			OM_List: [], // 出庫細項 <-實際資產
      // 備料
			PrepareDate: '',
			PrepareMemo: '',
			PreparedPerson: '',
      // ----
			ProjectCode: '',
			ProjectName: '',
			ProjectSelect: { Text: '--請選擇--',Value: '' },
			Description: '',
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
		increaseId: 1, // delete primary key (因為顯示和提交的Array不同)
    /**
		 * 搜尋表單參數(快速出庫資產檢索)
		 */
    searchParams: {
      EquipType_Id: '',
      Category_Id: '',
      Area_Id: '',
      Layer_Id: '',
      ProjectCode: '',
			ProjectSelect: { Text: '--請選擇--',Value: '' },
      AssetsId: '',
      ProductName: '',
    },
		/**
		 * 搜尋表單參數(填報需求)
		 */
		requirementParams: {
			EquipType_Id: '',
      Category_Id: '',
      ProductName: '',
			Number: 1,
			RequiredSpec: '',
		},
    datagrid1: createDadagridObject('AssetsId'),
    datagrid1field: [],
    rowData1: [],
    datagrid2: createDadagridObject('AssetsId'),
    datagrid2field: [],
    rowData2: [],
		/**
		 * 出庫項目field(需求)
		 */
		ItemList_field: [
			{ field: "id", width: '50px', header: "項目" },
			{ field: "EquipTypeName", width: '150px', header: "設備總類" },
			{ field: "EquipCategoryName", width: '150px', header: "設備分類" },
			{ field: "ProductName", width: '150px', header: "物品名稱" },
			{ field: "Number", width: '100px', header: "數量" },
			{ field: "RequiredSpec", width: '250px', header: "規格需求" }
		],
		/**
		 * 出庫細項field(實際出庫資產)
		 */
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
		/**
		 * 表單字數上限檢查Object
		 */
		FormLetterCheckList: {
			ProjectCode: {field: '專案代碼', max: 10},
			Description: {field: '說明', max: 100},
		},
		/**
		 * 檢索資產字數上限檢查Object
		 */
		searchParamsLetterCheckList: {
			AssetName: {field: '物品名稱', max: 20}
		},
		/**
		 * 新增出庫需求字數上限檢查Object
		 */
		requirementParamsLetterCheckList: {
			AssetName: {field: '物品名稱', max: 20},
			RequiredSpec: {field: '規格需求', max: 100}
		},
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
		/**
		 * 新增單項出庫項目(需求)
		 */
		insertNewItemList() {
			const utilsStore = useUtilsStore();
			const required = ['EquipType_Id', 'Category_Id', 'ProductName', 'Number'];
			if(!utilsStore.checkRequired(this.requirementParams, required)) return
			if(!utilsStore.checkMaxLetter(this.requirementParams, this.requirementParamsLetterCheckList)) return
			//id to name*2
			const selectedType = this.DropdownArray.EquipType.find((option)=> option.Id === this.requirementParams.EquipType_Id);
			const selectedCategory = this.DropdownArray.EquipCategory.find((option)=> option.Id === this.requirementParams.Category_Id);
			const newItem = {
				EquipTypeName: selectedType.Name,
        EquipType_Id: selectedType.Id,
        EquipCategoryName: selectedCategory.Name,
        Category_Id: selectedCategory.Id,
        ProductName: this.requirementParams.ProductName,
        Number: this.requirementParams.Number,
        RequiredSpec: this.requirementParams.RequiredSpec,
        id: this.increaseId,
			}
			this.increaseId++;
			// 顯示
			this.Form.ItemList.push(newItem);
			// 提交
			this.Form.newItemList.push(newItem);
			this.clearRequirementParams();
		},
		/**
		 * 
		 * @param {object} data 欲刪除的資料內容
		 * @param {string} type 'new' || 'edit'
		 */
		deleteFromItemList(data, type) {
			if(type === 'edit') {
				//編輯需額外將item_id新增到deleteItemList
				this.Form.deleteItemList.push(data.item_id);
			}
			this.Form.newItemList = this.Form.newItemList.filter(item => item.id !== data.id);
			this.Form.ItemList = this.Form.ItemList.filter(item => item.id !== data.id);
		},
		/**
		 * 清空填寫項目Object
		 */
		clearRequirementParams () {
			for(const key in this.requirementParams) {
				if(typeof this.requirementParams[key] == "string") {
					this.requirementParams[key] = ""
				} else if(typeof this.requirementParams[key] == "number") {
					this.requirementParams[key] = 1
				}
			}
		},
		/**
		 * 取得資料單，有給能進入頁面的Status Array就檢查此資料單狀態是否符合Conditions
		 * @param {string} AO_ID 單號
		 * @param {array} Conditions 能進入頁面的資料單Status Array
		 */
		async getDetails(AO_ID, Conditions = []) {
			const utilsStore = useUtilsStore();
			try {
				const response = await axios.get(`http://192.168.0.117:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`)
				const data = response.data ;
				if(data.state === 'success') {
					if(Conditions.length > 0) {
						utilsStore.canEnterPage(data.resultList.Status, Conditions);
					}
					console.log('出庫單資料', data.resultList);
					// 塞入上半部資訊
					Object.keys(this.Form).forEach(key=>{
						if(data.resultList[key]) {
							this.Form[key] = data.resultList[key];
						}
					})
					this.increaseId = this.Form.ItemList.length;
					this.increaseId++;
				} else if (data.state === 'error') {
					alert(data.messages);
				} else if (data.state === 'account_error') {
					alert(data.messages);
					router.push('/');
				}
			}
			catch(e) {
				console.error(e);
			}
		},
  }
})