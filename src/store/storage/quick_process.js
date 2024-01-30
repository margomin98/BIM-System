import axios from 'axios'
import { defineStore } from 'pinia'
import { useUtilsStore, useAPIStore } from '@/store'
import { useStorageStore } from '@/store/storage/_index';
import router from '@/router';
// lodash
import _ from "lodash"
import { useRoute } from 'vue-router';
// 快速入庫-CRU
export const useQuickProcessStore = defineStore('QuickProcess', {
	state:() => ({
		createHidden: false,
		editHidden: false,
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
					itemAssetsId: '資產編號',
					itemPackageUnit: '包裝單位',
					itemPackageNum: '包裝數量',
					itemInboundWay: '入庫方式',
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
				switch (tab.itemInboundWay) {
					case '直接入庫':
						RequireCheckList.itemArea_Id = '儲位區域';
						RequireCheckList.itemLayer_Id = '儲位櫃位';
						break;
					case '指派給保管人':
						RequireCheckList.itemUse = '用途';
						RequireCheckList.itemCustodian = '保管人員';
						break;
				}
				
				// 必填
				InputMessages += utilsStore.checkTabRequired(tab, RequireCheckList, index);
				// 資產編號(格式檢查)
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
		// 新增快速入庫 (表單、頁籤一次全給)
		async createQuick() {
			const utilsStore = useUtilsStore();
			const storageStore = useStorageStore();
			console.log('upperForm',storageStore.upperForm);
			console.log('middleForm',storageStore.middleForm);
			console.log('tabData',storageStore.tabData);
			// 檢查表單內容
			if(!this.checkFormContent()) return ;
			// 檢查是否至少一項頁籤
			if(storageStore.tabData.length == 0 ) {
				alert('請至少填寫一項資產資訊')
				return
			}
			// 檢查頁籤內容
			if(!this.checkTabContent()) return ;
			// 檢查有無重複資產編號
			if(!(await storageStore.checkAssetsIdRepeat())) return ;
			// 傳送整個資料(包括Form、tabData)
			utilsStore.isLoading = true ; 
			try {
				let requestData = {
					Memo: storageStore.upperForm.Memo,
					Tabs: storageStore.tabData
				}
				const response = await axios.post('',requestData);
				const data = response.data;
				if(data.state === 'success') {
					// 轉狀態
					const AI_ID = data.resultList.AI_ID ;
					await storageStore.FinishStorageProcess(AI_ID , true);
				}
			} catch (error) {
				console.error(error);	
			} finally {
				utilsStore.isLoading = false;
			}
		},
		// 編輯快速入庫 (暫存/送出)
		async editQuick(isDone = false) {
			const utilsStore = useUtilsStore();
			const storageStore = useStorageStore();
			console.log('upperForm',storageStore.upperForm);
			console.log('middleForm',storageStore.middleForm);
			console.log('tabData',storageStore.tabData);
			// 檢查表單內容
			if(!this.checkFormContent()) return ;
			// 檢查頁籤內容
			if(!this.checkTabContent()) return ;
			utilsStore.isLoading = true ;
			try {
				// 頁籤部分
				const tabPromises = [];
				storageStore.tabData.forEach((tab,index)=>{
					tabPromises.push(storageStore.sendImgForm(tab.itemId, tab, index));
				})
				// 等待所有頁籤上傳完成
				await Promise.all(tabPromises)
				.then(async result => {
					const allSuccess = result.every(result => result === 'success')
					if (allSuccess) {
						// 文字部分
						try {
							const result = await this.sendUpperForm(isDone);
							alert(`${result.messages}\n單號為:` + storageStore.upperForm.AI_ID);
							if(isDone) {
								router.push({
									name: 'Store_Datagrid'
								});
							} else {
								window.location.reload();
							}
						} catch (error) {
							console.error(error);
						}
					} else {
						alert(`編輯快速入庫表單失敗`)
					}
				})
			} catch (error) {
				console.error(error);
			} finally {
				utilsStore.isLoading = false ;
			}
		},
		async sendUpperForm(isDone) {
			const storageStore = useStorageStore();
			return new Promise((resolve, reject) => {
				const form = new FormData();
				form.append('Done', isDone);
				form.append('AI_ID', storageStore.upperForm.AI_ID);
				form.append('AR_ID', storageStore.upperForm.AR_ID);
				form.append('Memo', storageStore.upperForm.Memo);
				axios.post('http://192.168.0.177:7008/AssetsInMng/ExpressEdit', form)
					.then(response => {
						const data = response.data;
						if (data.state === 'success') {
							// const resultList = response.data.resultList;
							resolve({state: data.state , messages: data.messages});
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