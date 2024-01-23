import axios from 'axios'
import { defineStore } from 'pinia'
import {  useUtilsStore, useAPIStore } from '@/store'
import { UnitArray, PackageUnitArray } from '@/assets/js/dropdown'
import router from '@/router';
// lodash
import _ from "lodash"
import { useRoute } from 'vue-router';

export const useStorageStore = defineStore('Storage', {
  // data
  state: () => ({
    // 隱藏欄位(這頁只有已上傳需要特別處理)
    hidden: false,
    // 入庫單類型: 0-新品, 1-歸還, 2-快速入庫
    Type: 0,
    // 下拉選單
    DropdownArray: {
      ShipmentNum: [],
      fuzzyShipmentNum: [],
      EquipType: [],
      EquipCategory: [],
      AssetType: ['資產','存貨','耗材'],
      Unit: UnitArray,
      PackageUnit: PackageUnitArray,
    },
    // 上方表格
    upperForm: {
      Applicant: '',
      ApplicationDate: '',
      ShipmentNum: '',
      AR_ID: '',
      AI_ID: '',
      Memo: '',
    },
    // 中間填寫表格
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
      itemCount: 1,
      itemUnit: '',
      itemPackageUnit: '',
      itemPackageNum: 1,
      itemMemo: '',
      EquipCategoryArray: [],
      newFile: [],
      viewFile: [],
      deleteFile: [],
      existFile:[],
    },
    // 下方頁籤資料
    tabData: [],
    // 欲刪除的已存在頁籤數組
    deleteTab: [],
    // 控制物流單號選單 boolean
    showOptions: false,
    // 字數上限(固定)
    LetterCheckList: {
      itemProjectCode: {field: '專案代碼', max: 10},
      itemAssetName: {field: '物品名稱 ', max: 20},
      itemVendorName: {field: '廠商', max: 100},
      itemProductSpec: {field: '規格', max: 100},
      itemProductType: {field: '型號', max: 100},
      itemSN: {field: 'S/N', max: 100},
      itemMemo: {field: '備註', max: 500},
    },
  }),
  // computed
  getters: {

  },
  // method
  actions: {
    // 插入頁籤(以及取得每個頁籤所需下拉)
    async insertTab() {
      const dropdownStore = useAPIStore();
      const utilsStore = useUtilsStore();
      // 檢查必填 & 字數
      let RequireCheckList = [ 'itemAssetType', 'itemEquipType_Id', 'itemCategory_Id', 'itemAssetName', 'itemPackageUnit', 'itemPackageNum'];
      switch (this.middleForm.itemAssetType) {
        case '存貨':
          RequireCheckList.push['itemProjectCode'];
          break;
        case '耗材':
          RequireCheckList.push['itemCount'];
          RequireCheckList.push['itemUnit'];
          break;
      }
      if(!utilsStore.checkRequired(this.middleForm,RequireCheckList)) return;
      if(!utilsStore.checkMaxLetter(this.middleForm,this.LetterCheckList)) return;
      
      const newData = _.cloneDeep(this.middleForm);
      newData.EquipCategoryArray = await dropdownStore.getEquipCategory(newData.itemEquipType_Id);
      this.tabData.push(newData);
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
    // 變更資產類型時reset單位、數量(表單、頁籤)
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
      this.DropdownArray.EquipCategory = [];
    },
    // ----物流單號相關function
    // 關掉選單
    handleBlur() {
      setTimeout(() => {
        this.showOptions = false;
      }, 100);
    },
    // 模糊查詢
    fuzzyShipmentNum(clearAR_ID = false) {
      if(clearAR_ID) {
        this.upperForm.AR_ID = '';
      }
      this.DropdownArray.fuzzyShipmentNum = this.DropdownArray.ShipmentNum.filter(option => option.ShipmentNum.includes(this.upperForm.ShipmentNum));
      // console.log('ff',this.DropdownArray.fuzzyShipmentNum);
    },
    // 選擇選項
    selectShipmentNum(option) {
      this.upperForm.ShipmentNum = option.ShipmentNum;
      this.fuzzyShipmentNum();
      this.upperForm.AR_ID = option.AR_ID;
      this.showOptions = false;
    },
    // 查看收貨單(如果有)
    viewReceive() {
      if (this.upperForm.AR_ID) {
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
    // 檢查頁籤內容
    checkTabContent() {
      const utilsStore = useUtilsStore();
      let InputMessages = '';
      this.tabData.forEach((tab,index) => {
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
        InputMessages += utilsStore.checkTabMaxLetter(tab, this.LetterCheckList, index);
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
      // 檢查是否至少一項頁籤
      if(this.tabData.length == 0 ) {
        alert('請至少填寫一項資產資訊')
        return
      }
      // 檢查頁籤內容
      if(!this.checkTabContent()) {
        return
      }
      // 檢查頁籤內有填寫的project code是否存在
      let projectCodeList = [];
      this.tabData.forEach((tab,index)=>{
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
        this.tabData.forEach((tab,index)=>{
          const itemId = resultList.Tabs[index];
          tabPromises.push(this.sendImgForm(itemId, tab, index));
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
      return new Promise((resolve, reject) => {
        const form = new FormData();
        let url = 'http://192.168.0.177:7008/AssetsInMng/NewAssetsIn'
        if(type === 'edit') {
          // 入庫單號
          form.append('AI_ID',this.upperForm.AI_ID);
          this.deleteTab.forEach(itemId=>{
            form.append('deleteTab', itemId);
          })
          url = 'http://192.168.0.177:7008/AssetsInMng/ApplicationEdit'
        }
        form.append('AR_ID', this.upperForm.AR_ID);
        form.append('tab_count', this.tabData.length);
        form.append('Memo', this.upperForm.Memo);
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
    async sendImgForm(itemId, tab, index) {
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
            // 如果提交失败，调用 reject 并传递错误信息
            reject(error);
          });
      });
    },
    // 取得入庫填報資料(單號, 是否需要檢查權限, 檢查狀態是否可以進入頁面)
    async getDetails(AI_ID, Conditions = null, needCheckRole =false) {
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
              this.upperForm[key] = data.resultList[key];
            }
          })
          console.log('upperForm',this.upperForm);
          console.log('Tabs:',data.resultList);
          // 塞入頁籤(資料本身就有existFile)
          data.resultList.Tabs.forEach(tab=>{
            // console.log('tab',tab);
            Object.keys(this.middleForm).forEach(key=>{
              if(tab[key]) {
                this.middleForm[key] = tab[key];
              }
            })
            // console.log('middle',this.middleForm);
            this.insertTab();
          })
          console.log('tab',this.tabData);
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
    }
  },
})