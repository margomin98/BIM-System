import axios from 'axios'
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
			ProjectSelect: {},
			Recipient: '', // 領用人員
			Status: '',
			Use: '',
      // 審核
			VerifyDate: '',
			VerifyMemo: '',
			VerifyPerson: '',
			VerifyResult: null,
      // ----
			ItemList: [],
			existFile: [],
		},
    // 搜尋表單參數
    searchParams: {
      EquipType_Id: '',
      Category_Id: '',
      Area_Id: '',
      Layer_Id: '',
      ProjectCode: '',
			ProjectSelect: {},
      AssetsId: '',
      AssetName: '',
    },
    datagrid1: createDadagridObject('AssetsId'),
    datagrid1field: [],
    rowData1: [],
    datagrid2: createDadagridObject('AssetsId'),
    datagrid2field: [],
    rowData2: [],
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
		onProjectUnselect() {
			if(!this.Form.ProjectSelect) {
				this.Form.ProjectCode = '';
				this.Form.ProjectSelect = {};
			} 
		},
    onSearchProjectSelect(option) {
			this.searchParams.ProjectCode = option.Value;
		},
		onSearchProjectUnselect() {
			if(!this.Form.ProjectSelect) {
				this.searchParams.ProjectCode = '';
				this.searchParams.ProjectSelect = {};
			} 
		},
  }
})