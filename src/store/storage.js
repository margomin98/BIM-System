import axios from 'axios'
import { defineStore } from 'pinia'
import {  useUtilsStore, useAPIStore } from '@/store'
import { UnitArray, PackageUnitArray } from '@/assets/js/dropdown'
import router from '@/router';
// lodash
import _ from "lodash"

export const useStorageStore = defineStore('Storage', {
  // data
  state: () => ({
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
      ShipmentNum: '',
      AR_ID: '',
      Memo: '',
    },
    // 中間填寫表格
    middleForm: {
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
    // 控制物流單號選單 boolean
    showOptions: false,
    // 圖片input
    fileInputs: [],
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
      console.log(this.tabData);
      this.clear();
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
    fuzzyShipmentNum() {
      this.upperForm.AR_ID = '';
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
    // ----圖片相關
    // 選擇檔案
    chooseFile(index) {
      const fileInput = document.querySelectorAll('input[type="file"]')[index];
      fileInput.click();
    },
    // 刪除頁籤
    deleteTab(index) {
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
            projectCode: item.itemProjectCode,
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
        const resultList = await this.sendUpperForm();
        console.log('上半部resultList', resultList);
        // 再依照resultList將 下半部頁籤 單次分別上傳
        const ImgPromises = [];
        this.tabData.forEach((tab,index)=>{
          const itemId = resultList.Tabs[index];
          ImgPromises.push(this.sendImgForm(itemId, tab, index));
        })
        // 等待所有檔案上傳完成
        await Promise.all(filePromises)
        .then(result => {
          const allSuccess = result.every(result => result === 'success')
          if (allSuccess) {
            alert('傳送新品入庫表單成功\n單號為:' + resultList.AI_ID);
            router.push({
              name: 'Store_Datagrid'
            });
          } else {
            alert('傳送新品入庫表單失敗')
          }
        }) 
      } 
      catch (error) {
        console.error(error);  
        alert(error);
      }
    },
    async sendUpperForm() {
      return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('AR_ID', this.upperForm.AR_ID);
        form.append('tab_count', this.tabData.length);
        form.append('Memo', this.upperForm.Memo);
        axios.post('http://192.168.0.177:7008/AssetsInMng/NewAssetsIn', form)
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
  },
})