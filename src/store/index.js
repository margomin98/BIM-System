import axios from 'axios'
import { defineStore } from 'pinia'
import { UnitArray, PackageUnitArray } from '@/assets/js/dropdown'
import { onMounted, reactive, ref } from 'vue';
import router from '@/router';
export const useCounterStore = defineStore('counter', {
  // data
  state: () => ({
    count: 0,
    name: 'Eduardo',
    input: '',
    items: [],
  }),
  // computed
  getters: {
    // 依賴state
    double: state => state.count * 2,
    // 可從其他getters中取值
    doubleDouble() {
      return this.double * 2
    },
  },
  // method
  actions: {
    radomizeCount() {
      this.count = Math.round(100 * Math.random())
    },
    async callApi() {
      axios.post('api/values', this.input.toString(), {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((r) => {
          this.name = r.data.message;
          console.log(r.data);
        })
        .catch((e) => { console.error(e); })
    }
  },
})
export const useUtilsStore = defineStore('Utils',{
  state: ()=>({
    userName: '',
    today: '',
  }),
  getters: {
  },
  actions: {
    async getUserName() {
      try {
        const response = await axios.get('http://192.168.0.177:7008/GetDBdata/GetApplicant');
        const data = response.data;
        if (data.state === 'success') {
          // console.log('申請人名稱:', data.resultList.Applicant);
          this.userName =  data.resultList.Applicant;
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error('申請人取得失敗:',error);
      }
    },
    getDate() {
      const today = new Date();
      let date = '';
      date += (today.getFullYear() + '/');
      date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
      date += ((today.getDate()).toString().padStart(2, '0'));
      this.today = date;
    }
  },
})
export const useStorageStore = defineStore('Storage', {
  // data
  state: () => ({
    // 下拉選單
    DropdownArray: {
      ShipmentNum: [],
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
      itemEquipTypeName: '',
      itemEquipType_Id: '',
      itemEquipCategoryName: '',
      itemCategory_Id: '',
      EquipCategoryArray: [],
      EquipCategoryInit: '請先選擇設備總類',
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
      newFile: [],
      viewFile: [],
    },
    // 頁籤資料格式
    tabFormat: {
      itemAssetType: '',
      itemProjectCode: '',
      itemProjectName: '',
      itemEquipTypeName: '',
      itemEquipType_Id: '',
      itemEquipCategoryName: '',
      itemCategory_Id: '',
      EquipCategoryArray: [],
      EquipCategoryInit: '請先選擇設備總類',
      itemAssetName: '',
      itemAssetsId: '',
      itemVendorName: '',
      itemProductSpec: '',
      itemProductType: '',
      itemSN: '',
      itemCount: 1,
      itemUnit: '',
      itemPackageNum: 1,
      itemMemo: '',
      newFile: [],
      viewFile: [],
    },
    // 下方頁籤資料
    tabData: [],
  }),
  // computed
  getters: {
  },
  // method
  actions: {
    submit() {
      console.log(this.upperForm);
    }
  },
})