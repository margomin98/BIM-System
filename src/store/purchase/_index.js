import axios from 'axios'
import { defineStore } from 'pinia'
import {  useUtilsStore } from '@/store'
import router from '@/router';
// lodash
import _ from "lodash"
// 專案採購通用function
export const usePurchaseStore = defineStore('Purchase', {
	// data
	state: () => ({
		// edit or view
		PageType: '',
		// 下拉選單
		DropdownArray: {
			ProjectCode: [],
      EquipType: [],
      EquipCategory: [],
      Area: [],
      Layer: [],
		},
		// 表單
    // 新增/編輯 採購清單時使用Requisitions， 下訂/沖銷 使用Ordered、NotOrdered。
		Form: {
      ApplicationDate: '',
      Applicant: '',
			PP_ID: '',
      Status: '',
			ProjectCode: '',
			ProjectName: '',
			ProjectSelect: {Text: '--請選擇' , Value:''},
			Description: '',
			Deadline: '',
      Requisitions: [],
      PurchaseDate: '',
      PurchasePerson: '',
      PurchaseMemo: '',
      WriteoffDate: '',
      WriteoffPerson: '',
      WriteoffMemo: '',
      Ordered: [],
      NotOrdered: [],
		},
		// ----進出庫歷史紀錄
    // 採購需求參數
		itemParams: {
      PI_ID: '',
      ItemName: '',
      Number: 1,
      RequiredSpec: '',
    },
    // ----
		// 字數上限(固定)
		FormLetterCheckList: {
			Description: {field: '說明', max: 100},
			PurchaseMemo: {field: '說明', max: 100},
		},
    ItemLetterCheckList: {
			ItemName: {field: '採購項目', max: 20},
			RequiredSpec: {field: '規格需求', max: 100},
    }
	}),
	// computed
	getters: {
    Project(state) {
      console.log(`${state.Form.ProjectCode.trim()} ${state.Form.ProjectName}`);
      return `${state.Form.ProjectCode.trim()} ${state.Form.ProjectName}`
    }
	},
	// method
  actions: {
    onProjectSelect (option) {
      this.Form.ProjectCode = option.Value;
      // console.log(this.Form.ProjectCode);
    },
    // 增加清單項目
    addItem() {
      const utilsStore = useUtilsStore();
      // 檢查 必填&字數
      const RequierdList = ['ItemName', 'Number'];
      if(!utilsStore.checkRequired(this.itemParams,RequierdList)) return;
      if(!utilsStore.checkMaxLetter(this.itemParams,this.FormLetterCheckList)) return;
      this.Form.Requisitions.push(_.cloneDeep(this.itemParams));
      this.itemParams.ItemName = '';
      this.itemParams.Number = 1;
      this.itemParams.RequiredSpec = '';
    },
    // 刪除清單項目
    deleteItem(index) {
      this.Form.Requisitions.splice(index,1);
    },
    // 新增/編輯 採購單
    async submit(type) {
      const utilsStore = useUtilsStore();
      // 檢查 必填&字數
      const RequierdList = ['ProjectCode', 'Description', 'Deadline'];
      if(!utilsStore.checkRequired(this.Form,RequierdList)) return;
      if(!utilsStore.checkMaxLetter(this.Form,this.ItemLetterCheckList)) return;
      // 至少採購一項
      if(this.Form.Requisitions.length === 0) {
        alert('請至少新增一項採購需求');
        return
      }
      // output內容差不多 type決定api URL
      const url= type === 'edit' ? '/PurchasingMng/EditRequisition' : '/PurchasingMng/CreateRequisition'
      try {
        const response = await axios.post('http://192.168.0.177:7008'+url,this.Form);
        const data = response.data
        if(data.state === 'success') {
          alert(data.messages + '\n單號:' + data.resultList.PP_ID);
          router.push({name: 'Case_Purchase_Datagrid'});
        } else if(data.sate === 'account_error') {
          alert(data.messages);
          router.push('/');
        } else {
          alert(data.messages);
        }
      } catch (e) {
        console.error(e);
      }
    },
    // 取得採購單資料
    async getDetails(PP_ID, Conditions) {
			try {
				const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/ProjectPurchasingGetData?pp_id=${PP_ID}`)
				const data = response.data ;
				if(data.state === 'success') {
          if(Conditions) {
            useUtilsStore().canEnterPage(data.resultList.Status , Conditions);
          }
					console.log('資料採購單資料', data.resultList);
					// 塞入上半部資訊
					Object.keys(this.Form).forEach(key=>{
						if(data.resultList[key]) {
							this.Form[key] = data.resultList[key];
              if(key === 'NotOrdered') {
                this.Form.Requisitions = data.resultList[key];
              } else if(key === 'ProjectCode') {
                this.Form.ProjectSelect = { Text:`${data.resultList.ProjectCode.trim()} ${data.resultList.ProjectName}`, Value:data.resultList.ProjectCode} 
              } else if(key === 'Deadline') {
                this.Form.Deadline = this.Form.Deadline.replace(/\//g,'-');
              }
						}
					})
				}
			}
			catch(e) {
				console.error(e);
			}
    },
    // 刪除採購單
		async deleteData(PP_ID) {
			const form = new FormData();
			form.append('PP_ID', PP_ID);
			try {
				const response = await axios.post(`http://192.168.0.177:7008/PurchasingMng/DeleteRequisition`, form);
				const data = response.data;
				if (data.state === 'success') {
					let msg = data.messages + '\n單號:'+ data.resultList.PP_ID;
					alert(msg);
					router.push({
						name: 'Case_Purchase_Datagrid'
					});
				} else if (data.state === 'error') {
					alert(data.messages);
				}
			} catch (error) {
				console.error(error);
			}
		},
  }
})