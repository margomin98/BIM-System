import axios from 'axios'
import { defineStore } from 'pinia'
import { useUtilsStore, useAPIStore } from '@/store'
import { useStorageStore } from '@/store/storage/_index';
import router from '@/router';
// lodash
import _ from "lodash"
// 入庫填報-CRUD
export const useApplyStore = defineStore('Apply', {
	// data
	state: () => ({
		hidden: false
	}),
	// method
	actions: {
		// 檢查表單內容
		checkFormContent() {
			const utilsStore = useUtilsStore();
			const storageStore = useStorageStore();
			// 檢查字數
			if(!utilsStore.checkMaxLetter(storageStore.upperForm, storageStore.FormLetterCheckList)) return false;
			return true ;
		},
		// 檢查頁籤內容
		checkTabContent() {
			const utilsStore = useUtilsStore();
			const storageStore = useStorageStore();
			
			let InputMessages = '';
			storageStore.tabData.forEach((tab,index) => {
				let RequireCheckList = {
					itemAssetType: '資產類型',
					itemEquipType_Id: '設備總類',
					itemCategory_Id: '設備分類',
					itemAssetName: '物品名稱',
					itemPackageUnit: '包裝單位',
					itemPackageNum: '包裝數量',
				}
				switch (tab.itemAssetType) {
					case '存貨':
						RequireCheckList.itemProjectCode = '專案代碼';
						break;
					case '耗材':
						RequireCheckList.itemCount = '數量';
						RequireCheckList.itemUnit = '單位';
						break;
				}
				// 必填
				InputMessages += utilsStore.checkTabRequired(tab, RequireCheckList, index);
				// 資產編號(有填再檢查)
				if(tab.itemAssetsId && (!utilsStore.BF_pattern.test(tab.itemAssetsId))) {
					InputMessages += `頁籤${index+1} :　資產編號不符合格式\n`
				}
				// 字數
				InputMessages += utilsStore.checkTabMaxLetter(tab, storageStore.TabLetterCheckList, index);
			});
			if(InputMessages) {
				alert(InputMessages);
				return false;
			}
			return true;
		},
		// 送出表單(create: 新增, edit: 編輯)
		async submit(type) {
			const apiStore = useAPIStore();
			const storageStore = useStorageStore();
			// 檢查表單內容
			if(!this.checkFormContent()) return ;
			// 檢查是否至少一項頁籤
			if(storageStore.tabData.length == 0 ) {
				alert('請至少填寫一項資產資訊')
				return
			}
			// 檢查頁籤內容
			if(!this.checkTabContent()) return ;
			
			// 檢查頁籤內有填寫的project code是否存在
			let projectCodeList = [];
			storageStore.tabData.forEach((tab,index)=>{
				if(tab.itemProjectCode) {
					projectCodeList.push({
						PadNum: index,
						projectCode: tab.itemProjectCode,
					})
				}
			})
			if (projectCodeList.length !== 0) {
				console.log('projectCodeList:', projectCodeList);
				try {
					const messages = await apiStore.checkProjectCode(projectCodeList);
					if (messages !== 'success') {
						alert(messages);
						throw new Error(messages);
					}
				} catch (error) {
					console.error(error);
					return
				}
			}
			// 傳送upperForm
			try {
				const resultList = await this.sendUpperForm(type);
				console.log('上半部resultList', resultList);
				// 再依照resultList將 下半部頁籤 單次分別上傳
				const tabPromises = [];
				storageStore.tabData.forEach((tab,index)=>{
					const itemId = resultList.Tabs[index];
					tabPromises.push(storageStore.sendImgForm(itemId, tab, index));
				})
				// 等待所有檔案上傳完成
				await Promise.all(tabPromises)
				.then(result => {
					const allSuccess = result.every(result => result === 'success')
					if (allSuccess) {
						let title = type === 'edit' ? '編輯' : '傳送'
						alert(`${title}新品入庫表單成功\n單號為:` + resultList.AI_ID);
						router.push({
							name: 'Store_Datagrid'
						});
					} else {
						alert(`${title}新品入庫表單失敗`)
					}
				})
			}
			catch (error) {
				console.error(error);
				alert(error);
			}
		},
		async sendUpperForm(type) {
			const storageStore = useStorageStore();
			return new Promise((resolve, reject) => {
				const form = new FormData();
				let url = 'http://192.168.0.177:7008/AssetsInMng/NewAssetsIn'
				if(type === 'edit') {
					// 入庫單號
					form.append('AI_ID',storageStore.upperForm.AI_ID);
					storageStore.deleteTab.forEach(itemId=>{
						form.append('deleteTab', itemId);
					})
					url = 'http://192.168.0.177:7008/AssetsInMng/ApplicationEdit'
				}
				form.append('AR_ID', storageStore.upperForm.AR_ID);
				form.append('tab_count', storageStore.tabData.length);
				form.append('Memo', storageStore.upperForm.Memo);
				axios.post(url, form)
					.then(response => {
						const data = response.data;
						if (data.state === 'success') {
							const resultList = response.data.resultList;
							resolve(resultList);
						} else {
							reject(data.messages);
						}
					})
					.catch(error => {
						reject(error);
					});
			});
		},
	},
})