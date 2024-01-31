import axios from 'axios'
import { defineStore } from 'pinia'
import {  useUtilsStore, useAPIStore } from '@/store'
import router from '@/router';
// lodash
import _, { result } from "lodash"
import { useRentStore } from './_index';
// 入庫系統通用function
export const useQuickRentStore = defineStore('QuickRent', {
	// data
	state: () => ({
	}),
	// computed
	getters: {

	},
	// method
  actions: {
    // 檢查表單內容
		checkFormContent() {
			const utilsStore = useUtilsStore();
      const rentStore = useRentStore();
      let RequireCheckList = ['Use', 'Recipient', 'ProjectCode'];
			// 檢查 必填&字數
			if(!utilsStore.checkRequired(rentStore.Form, RequireCheckList)) return false;
			if(!utilsStore.checkMaxLetter(rentStore.Form, rentStore.FormLetterCheckList)) return false;
			return true ;
		},
    // 清除搜尋參數
    clear() {
      const rentStore = useRentStore();
      useUtilsStore().clearSearchParams(rentStore.searchParams);
      rentStore.DropdownArray.EquipCategory = [];
      rentStore.DropdownArray.Layer = [];
      rentStore.searchParams.ProjectSelect = {};
    },
    // 按下查詢
    async searchInventory(event, type) {
      const utilsStore = useUtilsStore();
      const rentStore = useRentStore();
      const apiStore = useAPIStore();
      // 檢查searchParams 字數
      if(!utilsStore.checkMaxLetter(rentStore.searchParams, rentStore.searchParamsLetterCheckList)) return;
      if(rentStore.searchParams.AssetsId && !utilsStore.BF_pattern.test(rentStore.searchParams.AssetsId)) {
        alert('資產編號格式不正確')
        return
      }
      // 查詢
      const form = new FormData ;
      // 搜尋參數
      for(const key in rentStore.searchParams) {
        if(rentStore.searchParams[key]) form.append(key, rentStore.searchParams[key]);
      }
      // 已加入清單
      form.append('AssetList', JSON.stringify(rentStore.Form.AssetList));
      utilsStore.UpdatePageParameter(rentStore.datagrid1, event, type, form);
      try {
        const resultList =  await apiStore.getMngDatagrid('/AssetsOutMng/SearchInventory', rentStore.datagrid1, form);
        rentStore.datagrid1.totalRecords = resultList.total;
        rentStore.rowData1 = resultList.rows.map(item => ({
          ...item,
          selectNumber: item.OM_Number,
        }));
        rentStore.datagrid1.key++;
        console.log('rowData',rentStore.rowData1);
      } catch (e) {
        console.error(e);
      }
    },
    // 刪除細項
    deleteItemFromAssetList(AssetsId) {
      const rentStore = useRentStore();
      rentStore.Form.AssetList = rentStore.Form.AssetList.filter(item => item.AssetsId !== AssetsId);
    },
    async submit() {
      const apiStore = useAPIStore();
      const rentStore = useRentStore();
      // 檢查表單內容
			if(!this.checkFormContent()) return ;
      // 至少輸入一項
      if(rentStore.Form.AssetList.length === 0) {
        alert('請至少出庫一項資產');
        return
      }
      const form = new FormData;
      for(const key in rentStore.Form) {
        if(rentStore.Form[key]) {
          if(key === 'AssetList') {
            form.append(key, JSON.stringify(rentStore.Form[key]));
          } else {
            form.append(key,rentStore.Form[key]);
          }
        }
      }
      try {
        const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/ExpressAssetsOut',form);
        const data = response.data ; 
        if(data.state === 'success') {
          alert(`${data.messages}\n單號:${data.resultList.AO_ID}`);
          rentStore.$reset();
          router.push({
            name: 'Rent_Datagrid'
          })
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        } else {
          alert(data.messages);
        }
      } catch (error) {
        console.error(error);
      }
      alert('OK');
    }
  }
})