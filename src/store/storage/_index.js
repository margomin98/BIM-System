import axios from 'axios'
import { defineStore } from 'pinia'
import {  useUtilsStore, useAPIStore } from '@/store'
import { UnitArray, PackageUnitArray } from '@/assets/js/dropdown'
import router from '@/router';
// lodash
import _ from "lodash"
// 入庫系統通用function
export const useStorageStore = defineStore('Storage', {
	// data
	state: () => ({
		/**
		 * 'new', 'edit'等協助判斷component v-show使用
		 */
		PageType: '',
		/**
		 * 隱藏欄位
		 */
		hidden: false,
		/**
		 * 入庫單類型: 0-新品, 1-歸還, 2-快速入庫 (拿資料單時會更新)
		 */
		Type: 0,
		/**
		 * 下拉選單
		 */
		DropdownArray: {
			ShipmentNum: [], //api原本資料
			formShipmentNum: [], // 處理陣列
			fuzzyShipmentNum: [],
			EquipType: [],
			EquipCategory: [],
			Area: [],
			Layer: [],
			Custodian: [],
			ProjectCode: [], //api原本資料
			formProjectCode: [], // 處理陣列
			AssetType: ['資產','存貨','耗材'],
			InboundWay: ['直接入庫', '指派給保管人'],
			Use: ['內部領用','借測'],
			Unit: UnitArray,
			PackageUnit: PackageUnitArray,
		},
		/**
		 * 資料單上方表單區域
		 */
		upperForm: {
			Applicant: '',
			ApplicationDate: '',
			ShipmentNum: '',
			ShipmentSelect: {ShipmentNum:'--請選擇--' , AR_ID: ''},
			Status: '',
			AR_ID: '',
			AI_ID: '',
			Memo: '',
			DeliveryOperator: '',
			DeliveryDate: '',
			AssetsInOperator: '',
			AssetsInDate: '',
		},
		/**
		 * 資料單中間填寫區域[新增-填報、編輯]會用到。以及insertTab()
		 */
		middleForm: {
			itemId: '', //編輯
			itemAssetType: '',
			itemProjectCode: '',
			itemProjectName: '',
			itemEquipType_Id: '',
			itemCategory_Id: '',
			itemAssetName: '',
			itemAssetsId: '',
			itemVendorName: '',
			itemProductSpec: '',
			itemProductType: '',
			itemSN: '',
			itemPrice: null,
			itemCount: 1,
			itemUnit: '',
			itemPackageUnit: '',
			itemPackageNum: 1,
			itemWarranty: '',
			itemWarrantyStartDate: '',
			itemWarrantyEndDate: '',
			itemMemo: '',
			EquipCategoryArray: [],
			newFile: [],
			viewFile: [],
			deleteFile: [],
			existFile:[],
			// 檢視頁面使用
			itemEquipTypeName: '',
			itemEquipCategoryName: '',
			itemAreaName: '',
			itemLayerName: '',
			// 快速入庫才有的欄位
			AreaArray:[],
			LayerArray:[],
			itemProjectSelect: { Text: '--請選擇--',Value: '' }, // 綁定multiselect，再用function轉換
			tabProjectCode: [], // 每個頁籤都需要，將所需資訊塞入option
			itemInboundWay: '',
			itemUse: '',
			itemCustodian: '',
			itemArea_Id: '',
			itemLayer_Id: '',
		},
		/**
		 * 頁籤內容
		 */
		tabData: [],
		/**
		 * 欲刪除的已存在頁籤數組
		 */
		deleteTab: [],
		/**
		 * 頁籤字數上限Object(固定)
		 */
		TabLetterCheckList: {
			itemProjectCode: {field: '專案代碼', max: 10},
			itemAssetName: {field: '物品名稱 ', max: 20},
			itemVendorName: {field: '廠商', max: 100},
			itemProductSpec: {field: '規格', max: 100},
			itemProductType: {field: '型號', max: 100},
			itemSN: {field: 'S/N', max: 100},
			itemWarranty: {field: '保固期限', max: 10},
			itemMemo: {field: '備註', max: 500},
		},
		/**
		 * 表單字數上限Object(固定)
		 */
		FormLetterCheckList: {
			Memo: {field: '備註', max: 500},
		},
	}),
	// computed
	getters: {

	},
	// method
	actions: {
		// 插入頁籤(以及取得每個頁籤所需下拉)
		async insertTab(isQuick = false, detailsData) {
			const dropdownStore = useAPIStore();
			const utilsStore = useUtilsStore();
			// 檢查必填 & 字數
			let RequireCheckList = [ 'itemAssetType', 'itemEquipType_Id', 'itemCategory_Id', 'itemAssetName', 'itemPackageUnit', 'itemPackageNum'];
			switch (this.middleForm.itemAssetType) {
				case '存貨':
					RequireCheckList.push('itemProjectCode');
					break;
				case '耗材':
					RequireCheckList.push('itemCount');
					RequireCheckList.push('itemUnit');
					break;
			}
			// 快速入庫新增頁籤額外檢查欄位
			if(isQuick) {
				RequireCheckList.push('itemInboundWay');
				switch (this.middleForm.itemInboundWay) {
					case '直接入庫':
						RequireCheckList.push('itemArea_Id');
						RequireCheckList.push('itemLayer_Id');
						break;
					case '指派給保管人':
						RequireCheckList.push('itemUse');
						RequireCheckList.push('itemCustodian');
						break;
				}
			}
			// detailsData: 無 -> 填寫欄位新增的，有 -> getDetails讀取進來的資料 (不用檢查欄位)
			let newData = detailsData || _.cloneDeep(this.middleForm);
			// console.log('newData',newData);
			if(!detailsData) {
				if(!utilsStore.checkRequired(newData,RequireCheckList)) return;
				if(!utilsStore.checkMaxLetter(newData,this.TabLetterCheckList)) return;
			}
			newData.EquipCategoryArray = await dropdownStore.getEquipCategory(newData.itemEquipType_Id);
			if(isQuick || newData.itemArea_Id) {
				// 取得櫃位下拉
				newData.LayerArray = await dropdownStore.getLayer(newData.itemArea_Id);
			}
			// 取得要增加的頁籤數量
			const newTabCount = _.cloneDeep(newData.itemPackageNum);
			// console.log('newData',newTabCount);
			newData.itemPackageNum = 1;
			for(let i = 0 ; i <  newTabCount ; i++) {
				// 整理Vue MultiSelect option資訊
				newData.itemProjectSelect.index = this.tabData ? this.tabData.length : 0;
				newData.tabProjectCode = this.DropdownArray.ProjectCode.map(option =>({...option, index: this.tabData.length}))
				this.tabData.push(_.cloneDeep(newData));
			}
			// console.log(this.tabData);
			this.clear();
		},
		// 刪除頁籤
		deleteTabFn(index) {
			// 將已存在頁籤加入deleteTab中(編輯)
			if(this.tabData[index].itemId) {
				this.deleteTab.push(this.tabData[index].itemId);
			}
			console.log('deltetTab',this.deleteTab);
			this.tabData.splice(index, 1);
			// 若刪除的為最後一筆 則將頁籤切換到現有的最後一筆
			if (index == this.tabData.length && index != 0) {
				const tabs = document.querySelectorAll('button.nav-link');
				// console.log('tabs:', tabs);
				tabs[index - 1].classList.add('active');
				// 顯示對應頁籤內容
				const tabContents = document.querySelectorAll('.tab-pane');
				tabContents[index - 1].classList.add('show', 'active');
			}
		},
		/**
		 * 變更資產類型時reset單位、數量(表單、頁籤)
		 * @param {string} type 'tab' or 'middleForm' 兩種
		 * @param {number} index type為 'tab'時需要傳入index來重置
		 */
		resetUnitCount(type, index) {
			switch (type) {
				case 'middleForm':
					this.middleForm.itemUnit = '';
					this.middleForm.itemCount = 1;
					break;
				case 'tab':
					this.tabData[index].itemUnit = '';
					this.tabData[index].itemCount = 1;
					break;
			}
		},
		// 變更入庫方式(for 新增快速入庫)時 reset參數
		changeInboundWay(type,index) {
			switch (type) {
				case 'middleForm':
					this.middleForm.itemArea_Id = '';
					this.middleForm.itemLayer_Id = '';
					this.middleForm.LayerArray = [];
					this.middleForm.itemUse = '';
					this.middleForm.itemCustodian = '';
					break;
				case 'tab':
					this.tabData[index].itemArea_Id = '';
					this.tabData[index].itemLayer_Id = '';
					this.tabData[index].LayerArray = [];
					this.tabData[index].itemUse = '';
					this.tabData[index].itemCustodian = '';
					break;
			}

		},
		// 新增頁籤後清除表單資料
		clear() {
			for (const key in this.middleForm) {
				const type = typeof this.middleForm[key]
				if (type === 'string') {
					this.middleForm[key] = ''
				} else if (type === 'number') {
					this.middleForm[key] = 1;
				}
			}
			this.middleForm.itemProjectSelect = { Text: '--請選擇--',Value: '' };
			this.DropdownArray.EquipCategory = [];
		},
		// 查看收貨單(如果有)
		viewReceive(formParams) {
			if (formParams.AR_ID) {
				const link = document.getElementById('view-receive');
				link.click();
			}
		},
		// ----圖片相關function
		// 選擇檔案
		chooseFile(index) {
			const fileInput = document.querySelectorAll('input[type="file"]')[index];
			fileInput.click();
		},
		// 將vue multiselect選項轉換給對應key值(分為 表單專案代碼 頁籤專案代碼 物流單號)
		onFormProjectcodeSelect(option) {
			this.middleForm.itemProjectCode = option.Value;
		},
		onTabProjectcodeSelect(option) {
			console.log('tab select',option);
			this.tabData[option.index].itemProjectCode = option.Value;
		},
		onShipmentnumSelect(option) {
			this.upperForm.AR_ID = option.AR_ID;
		},
		// 以及各自的取消function
		onFormProjectcodeUnselect() {
			if(!this.middleForm.itemProjectSelect) {
				this.middleForm.itemProjectCode = '';
				this.middleForm.itemProjectSelect = {};
			}
		},
		onTabProjectcodeUnselect(index) {
			if(!this.tabData[index].itemProjectSelect){
				console.log('tab unselect',index);
				this.tabData[index].itemProjectSelect = {};
				this.tabData[index].itemProjectCode = '';
			} 
		},
		onShipmentnumUnselect() {
			if(!this.upperForm.ShipmentSelect){
				this.upperForm.AR_ID = '';
				this.upperForm.ShipmentSelect = {};
			} 
		},
		// 取得入庫填報資料(單號, 是否為快速入庫, 檢查狀態是否可以進入頁面, 是否需要檢查權限)
		async getDetails(AI_ID, isQuick = false, Conditions = null, needCheckRole =false) {
			const utilsStore = useUtilsStore()
			try {
				const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsInGetData?ai_id=${AI_ID}`)
				const data = response.data ;
				if(data.state === 'success') {
					if(Conditions) {
						utilsStore.canEnterPage(data.resultList.Status, Conditions);
					}
					if(needCheckRole) {
						const RoleCheckResult = await utilsStore.checkRole(data.resultList.Applicant);
						if(!RoleCheckResult) return
					}
					// 取得填報類型
					this.Type = data.resultList.Type ;
					// 塞入上半部資訊
					Object.keys(this.upperForm).forEach(key=>{
						if(data.resultList[key]) {
							//
							if(key === 'ShipmentNum') {
								this.upperForm.ShipmentSelect = {AR_ID: data.resultList.AR_ID , ShipmentNum: data.resultList.ShipmentNum};
							}
							this.upperForm[key] = data.resultList[key];
						}
					})
					// console.log('upperForm',this.upperForm);
					console.log('入庫資料單',data.resultList);
					// 塞入頁籤(資料本身就有existFile)
					for (const tab of data.resultList.Tabs) {
						let tempData = _.cloneDeep(this.middleForm);
						Object.keys(this.middleForm).forEach(key => {
								if (tab[key]) {
										tempData[key] = tab[key];
										if (key === 'itemProjectCode' && isQuick) {
												tempData.itemProjectSelect = { Text: `${tab.itemProjectCode.trim()} ${tab.itemProjectName}`, Value: tab.itemProjectCode };
										}
								}
						});
						const res = await this.insertTab(isQuick, tempData);
					}
					// console.log('tab',this.tabData);
				}
			}
			catch(e) {
				console.error(e);
			}
		},
		// 刪除此單
		async deleteData(AI_ID) {
			const form = new FormData();
			form.append('AI_ID', AI_ID);
			try {
				const response = await axios.post(`http://192.168.0.177:7008/AssetsInMng/ApplicationDelete`, form);
				const data = response.data;
				if (data.state === 'success') {
					let msg = data.messages + '\n單號:'+ data.resultList.AI_ID;
					alert(msg);
					router.push({
						name: 'Store_Datagrid'
					});
				} else if (data.state === 'error') {
					alert(data.messages);
				}
			} catch (error) {
				console.error(error);
			}
		},
		/**
		 * 檢查 1. itemAssetsId之間是否重複 2. itemAseetsId比對資料庫是否重複
		 * @returns { boolean|Promise<boolean> } 有重複: true / 無重複: false
		 */
		async checkAssetsIdRepeat() {
			let assetsId_List = this.tabData.map((tab)=>{ return tab.itemAssetsId});
			let listSet = new Set(assetsId_List);
			//1.
			if(listSet.size !== assetsId_List.length) {
				alert('頁籤內資產編號不可重複，請再次確認資產編號欄位');
				return true;
			}
			//2.
			const form = new FormData();
			for (let i = 0; i < assetsId_List.length; i++) {
				form.append('assetsIds', assetsId_List[i]);
			}
			try {
				const response = await axios.post('http://192.168.0.177:7008/GetDBdata/CheckAssetsInID', form);
				const data = response.data;
				if (data.state === 'error') {
					alert(data.messages);
					return true;
				}
			} catch (error) {
				console.error(error);
			}
			return false;
		},
		/**
		 * 單個頁籤儲存 [填報-新增、編輯] [快速入庫-編輯] [入庫作業]
		 * @param {*} itemId 頁籤的itemId(PK)
		 * @param {*} tab 頁籤內容
		 * @param {*} index 頁籤index
		 * @returns {Promise<string>} 'success' or error_messages
		 */
		async sendImgForm(itemId, tab, index) {
			const storageStore = useStorageStore();
			return new Promise((resolve, reject) => {
				const form = new FormData();
				// 先append itemId
				form.append('itemId', itemId);
				for (const key in tab) {
					// 不為null、undefined、空字串就append
					if (tab[key]) {
						form.append(key, tab[key]);
					}
				}
				// 先剔除不需要key值
				form.delete('viewFile')
				form.delete('existFile')
				form.delete('EquipCategoryArray')
				form.delete('LayerArray')
				form.delete('itemProjectSelect')
				form.delete('tabProjectCode')
				// 不是耗材的話 剔除itemCount、itemUnit
				if (tab.itemAssetType !== '耗材') {
					form.delete('itemUnit')
					form.delete('itemCount')
				}
				// newFile等等額外append 先剔除
				form.delete('newFile')
				for (let i = 0; i < tab.newFile.length; i++) {
					form.append('newFile', tab.newFile[i]);
				}
				// deleteFile等等額外append 先剔除
				form.delete('deleteFile')
				for (let i = 0; i < tab.deleteFile.length; i++) {
					form.append('deleteFile', tab.deleteFile[i]);
				}
				axios.post('http://192.168.0.177:7008/AssetsInMng/ItemEdit', form)
					.then((response) => {
						const data = response.data;
						if (data.state === 'success') {
							console.log(`第${index+1}個頁籤上傳成功`);
							resolve(data.state)
						} else {
							console.error(`第${index+1}個頁籤上傳失敗，${data.messages}`);
						}
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		// 入庫
		async FinishStorageProcess(AI_ID = '', isQuick = false) {
			const utilsStore = useUtilsStore();
			const form = new FormData();
			form.append('AI_ID', AI_ID);
			axios.post('http://192.168.0.177:7008/AssetsInMng/AssetsIn', form)
				.then((response) => {
					utilsStore.isLoading = false;
					const data = response.data
					if (data.state === 'success') {
						// 成功
						if(isQuick) {
							alert('快速入庫成功\n單號為:' + AI_ID);
							router.push({
								name: 'Store_Datagrid'
							});
						} else {
							alert('入庫成功\n單號為:' + AI_ID);
							router.push({
								name: 'Store_Process_Datagrid'
							});
						}
					} else if (data.state === 'account_error') {
						alert(data.messages);
						router.push('/');
					} else {
						alert(data.messages);
					}
				})
				.catch((error) => {
					console.error(error);
				})
		},
	},
})