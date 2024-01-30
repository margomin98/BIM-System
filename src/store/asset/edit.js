import axios from 'axios'
import { defineStore } from 'pinia'
import { useUtilsStore, useAPIStore } from '@/store'
import { useAssetStore } from './_index';
import router from '@/router';
// lodash
import _ from "lodash"
// 資產管理編輯
export const useEditStore = defineStore('Edit', {
	// data
	state: () => ({
	}),
	// computed
	getters: {
	},
	// method
  actions: {
    // 編輯送出
    async submit() {
      const apiStore = useAPIStore();
      const utilsStore = useUtilsStore();
      const assetStore = useAssetStore();
			let RequireCheckList = [ 'AssetType', 'EquipType_Id', 'Category_Id', 'AssetName'];
      switch (assetStore.Form.AssetType) {
				case '存貨':
					RequireCheckList.push('ProjectCode');
					break;
			}
      // 檢查表單 必填&字數上限
			if(!utilsStore.checkRequired(assetStore.Form, RequireCheckList)) return;
			if(!utilsStore.checkMaxLetter(assetStore.Form, assetStore.FormLetterCheckList)) return;
      //
      const form = new FormData();
      for (const key in assetStore.Form) {
        // 不為null、undefined、空字串就append
        if (assetStore.Form[key]) {
          form.append(key, assetStore.Form[key]);
        }
      }
      // newFile額外append 
      form.delete('newFile')
      for (let i = 0; i < assetStore.Form.newFile.length; i++) {
        form.append('newFile', assetStore.Form.newFile[i].file);
      }
      // deleteFile額外append 
      form.delete('deleteFile')
      for (let i = 0; i < assetStore.Form.deleteFile.length; i++) {
        form.append('deleteFile', assetStore.Form.deleteFile[i]);
      }
      try {
        const token = await apiStore.GetAntiForgeryToken();
        const response = await axios.post('http://192.168.0.177:7008/InventoryMng/AssetEdit', form,{
          headers: { 
            'RequestVerificationToken': token,
          }
        });
        const data = response.data;
        console.log(data);
        if (data.state === 'success') {
          let msg = data.messages + '\n資產編號:' + data.resultList.AssetsId;
          alert(msg);
          router.push({
            name: 'Assets_Datagrid'
          });
        } else if (data.state === 'error') {
          alert(data.messages);
          console.log('error state', response);
        }
      } catch (error) {
        console.error(error);
      }
    },
  }
})