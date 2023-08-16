<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        資料新品入庫
      </h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>
            申請人員: {{ Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請入庫日期: {{ ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4 check_box_wrap">
              <div class="input-group-prepend check_box">
                資產類型：
              </div>
              <input type="checkbox" class='check_box' v-model="IsConsumable" />耗材
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>設備總類：
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                  {{ EquipTypeName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="typeDropdown">
                  <p v-for="(item, index) in EquipTypeArray" :key="index" class="dropdown-item"
                    @click="selectType(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>設備分類：
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(EquipTypeName !== '') }">
                  {{ EquipCategoryName || EquipCategoryInit }}
                </button>
                <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                  <p v-for="(item, index) in EquipCategoryArray" :key="index" class="dropdown-item"
                    @click="selectCategory(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>物品名稱：
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入20字" v-model="AssetName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商：
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入100字" v-model="VendorName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格：
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入100字" v-model="ProductSpec">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號：
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入100字" v-model="ProductType">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>數量：
              </div>
                <input class="input-number" type="number" v-model="Count" min="1">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>單位：
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {{ Unit || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in UnitArray" :key="index" class="dropdown-item" @click="selectUnit(`${item}`)">
                    {{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                v-model="WarrantyDate">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固開始日： 
              </div>
              <input type="date" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                v-model="WarrantyStartDate">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固到期日：
              </div>
              <input type="date" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                v-model="WarrantyEndDate">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註：
            </div>
            <textarea class="form-control" aria-label="With textarea" placeholder="最多輸入500字" v-model="Memo"></textarea>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">上一頁</button>
        <button class="empty_btn" @click="clear">清空</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import router from '@/router';
import {
  onMounted,
  ref
} from 'vue';
export default {
  components: {
    Navbar
  },
  setup() {
    const Applicant = ref(''); //申請人 發API 帶入
    const ApplicationDate = ref(''); //申請日期 function帶入
    const IsConsumable = ref(false);
    const EquipTypeName = ref(''); //設備總類 *必填
    const EquipTypeArray = ref([]); //設備總類陣列 request拿到
    const EquipCategoryName = ref(''); //設備分類 *必填
    const EquipCategoryArray = ref([]); //設備分類陣列 request拿到
    const EquipCategoryInit = ref('請先選擇設備總類');
    const AssetName = ref(''); //物品名稱 *必填
    const VendorName = ref(''); //廠商
    const ProductSpec = ref(''); //規格
    const ProductType = ref(''); //型號
    const Count = ref(1); //數量 *必填
    const Unit = ref(''); //單位 *必填
    const UnitArray = (['個', '支', '台', '件', '把', '枝', '本', '根', '隻', '張', '條', '塊', '顆', '雙', '箱', '包',]);
    const WarrantyDate = ref(''); //保固期限
    const WarrantyStartDate = ref(''); //保固開始日
    const WarrantyEndDate = ref(''); //保固到期日
    const Memo = ref(''); //備註
    function getDate() {
      const today = new Date();
      var date = '';
      date += (today.getFullYear() + '/');
      date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
      date += ((today.getDate()).toString().padStart(2, '0'));
      return date;
    }
    function selectType(item) {
      EquipTypeName.value = item;
      // console.log('選擇的總類:', EquipTypeName.value);
      getEquipCategoryName();
      EquipCategoryInit.value = '請選擇';

    }
    function selectCategory(item) {
      EquipCategoryName.value = item;
    }
    function selectUnit(item) {
      Unit.value = item;
    }
    function goBack() {
      window.history.back();
    }
    function clear() {
      // Clear input fields
      IsConsumable.value = false;
      EquipTypeName.value = '';
      EquipCategoryName.value = '';
      EquipCategoryInit.value = '請先選擇設備總類'
      AssetName.value = '';
      VendorName.value = '';
      ProductSpec.value = '';
      ProductType.value = '';
      Count.value = 1;
      Unit.value = '';
      WarrantyDate.value = '';
      WarrantyStartDate.value = '';
      WarrantyEndDate.value = '';
      Memo.value = '';
    }
    async function submit() {
      // 檢查所有required項目
      // 假設 WarrantyStartDate 是日期變數
      if (!EquipCategoryName.value || !EquipTypeName.value || !AssetName.value || !Count.value || !Unit.value) {
        alert('請填寫所有必填項目');
        return;
      }
      const formData = new FormData();
      const formFields = {
        'IsConsumable': IsConsumable.value,
        'EquipTypeName': EquipTypeName.value,
        'EquipCategoryName': EquipCategoryName.value,
        'AssetName': AssetName.value,
        'VendorName': VendorName.value,
        'ProductSpec': ProductSpec.value,
        'ProductType': ProductType.value,
        'Count': Count.value,
        'Unit': Unit.value,
        'WarrantyDate': WarrantyDate.value,
        'WarrantyStartDate': WarrantyStartDate.value,
        'WarrantyEndDate': WarrantyEndDate.value,
        'Memo': Memo.value
      };
      //將表格資料append到 formData
      for (const fieldName in formFields) {
        formData.append(fieldName, formFields[fieldName]);
        console.log(formData.get(`${fieldName}`));
      }
      //使用axios method:post傳送新品入庫表單
      const axios = require('axios');
      try {
        const response = await axios.post('http://192.168.0.176:7008/AssetsInMng/NewAssetsIn', formData, {
          // const response = await axios.post('/AssetsInMng/NewAssetsIn', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          //新品表單傳送成功，跳轉至入庫管理頁面
          console.log(data.state);
          console.log(data.messages);
          alert(data.messages);
          router.push({name: 'Store_Datagrid'});
        } else if (data.state === 'error') {
          //新品表單傳送失敗
          alert(data.messages);
        }
        else if (data.state === 'input_error') {
          //新品表單格式失敗
          alert(data.messages);
        } else {
          throw new Error('Request was not successful');
        }
      } catch (error) {
        console.error('Error sending data to backend', error);
      }
    }
    async function getApplicationInfo() {
      const axios = require('axios');
      try {
        const response = await axios.get('http://192.168.0.176:7008/GetDBdata/GetApplicant');
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('申請人名稱:', data.resultList.Applicant);
          if (data.resultList.Applicant) {
            Applicant.value = data.resultList.Applicant;
          }
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error('Error sending applicant info request to backend');
      }
    }

    async function getEquipTypeName() {
      if (EquipTypeArray.value.length == 0) {
        const axios = require('axios');
        try {
          const response = await axios.get('http://192.168.0.176:7008/GetParameter/GetEquipType');
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('總類Get成功 資料如下\n', data.resultList.EquipType);
            EquipTypeArray.value = data.resultList.EquipType;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend');
        }
      }
    }
    async function getEquipCategoryName() {
      EquipCategoryName.value = '';
      const axios = require('axios');
      try {
        const response = await axios.get(`http://192.168.0.176:7008/GetParameter/GetEquipCategory?id=${EquipTypeName.value}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('分類Get成功 資料如下\n', data.resultList.EquipCategory);
          EquipCategoryArray.value = data.resultList.EquipCategory;
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push({ name: 'Store_Datagrid' });
        }
      } catch (error) {
        console.error('Error sending applicant info request to backend');
      }
    }

    onMounted(() => {
      getApplicationInfo();
      ApplicationDate.value = getDate();
    });
    return {
      getDate,
      Applicant,
      ApplicationDate,
      IsConsumable,
      EquipTypeName,
      EquipTypeArray,
      getEquipTypeName,
      EquipCategoryName,
      EquipCategoryArray,
      EquipCategoryInit,
      getEquipCategoryName,
      AssetName,
      VendorName,
      ProductSpec,
      ProductType,
      Count,
      Unit,
      UnitArray,
      WarrantyDate,
      WarrantyStartDate,
      WarrantyEndDate,
      Memo,
      selectType,
      selectUnit,
      selectCategory,
      goBack,
      clear,
      submit,
    };
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';
@media only screen and (min-width: 1200px){
.main_section {
  h1 {
    margin-top: 50px;
    text-align: center;
    font-size: 55px;
    font-weight: 600;
    @include title_color;
  }

  .info_wrap {
    .button_wrap {
      @include bottom_btn_wrap;
      margin-bottom: 5%;

      button {
        &:nth-child(1) {
          @include back_to_previous_btn;

          &:hover {
            background-color: #5d85bb;
          }
        }

        &:nth-child(2) {
          @include empty_btn;

          &:hover {
            background-color: #5e7aa2;
          }
        }

        &:nth-child(3) {
          @include search_and_send_btn;

          &:hover {
            background-color: #5D85BD;
          }
        }
      }
    }

    button.back_btn:hover {
      background-color: #5d85bb;
    }

    button.send_btn:hover {
      background-color: #5e7aa2;
    }

    button.empty_btn:hover {
      background-color: #5D85BD;
    }

    .input-group-prepend {
      color: white;
      font-weight: 700;
      font-size: 20px;
      width: 120px;
      text-align: end;

      span {
        @include red_star
      }
    }

    .input-number {
      @include count_btn;
    }

    .form-control {
      height: 35px;
      border-radius: 0;
    }

    padding: 1% 32% 0;

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    .content {
      .check_box_wrap {
        font-weight: 700;
        align-items: center;
        color: white;
        font-size: 20px;

        .check_box {
          margin-right: 5px;
        }
      }

      @include content_bg;

      .dropdown {
        .dropdown-menu {
          width: 100%;
        }
      }

      .content {
        @include content_bg;


      }

      .dropdown {
        .dropdown-menu {
          width: 100%;
          p {
            &:hover {
              cursor: pointer;
            }
          }
        }

        .dropdown-toggle {
          @include dropdown-btn;
          width: 180px;
          color: black;
          justify-content: space-between;
          align-items: center;
        }
      }

    }
  }
}
}


@media only screen and (min-width: 768px) and (max-width: 1199px){
.main_section {
  h1 {
    margin-top: 50px;
    text-align: center;
    font-size: 55px;
    font-weight: 600;
    @include title_color;
  }

  .info_wrap {
    .button_wrap {
      @include bottom_btn_wrap;
      margin-bottom: 5%;

      button {
        &:nth-child(1) {
          @include back_to_previous_btn;

          &:hover {
            background-color: #5d85bb;
          }
        }

        &:nth-child(2) {
          @include empty_btn;

          &:hover {
            background-color: #5e7aa2;
          }
        }

        &:nth-child(3) {
          @include search_and_send_btn;

          &:hover {
            background-color: #5D85BD;
          }
        }
      }
    }

    button.back_btn:hover {
      background-color: #5d85bb;
    }

    button.send_btn:hover {
      background-color: #5e7aa2;
    }

    button.empty_btn:hover {
      background-color: #5D85BD;
    }

    .input-group-prepend {
      color: white;
      font-weight: 700;
      font-size: 20px;
      width: 120px;
      text-align: end;

      span {
        @include red_star
      }
    }

    .input-number {
      @include count_btn;
    }

    .form-control {
      height: 35px;
      border-radius: 0;
    }

    padding: 1% 5% 0;

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    .content {
      .check_box_wrap {
        font-weight: 700;
        align-items: center;
        color: white;
        font-size: 20px;

        .check_box {
          margin-right: 5px;
        }
      }

      @include content_bg;

      .dropdown {
        .dropdown-menu {
          width: 100%;
        }
      }

      .content {
        @include content_bg;


      }

      .dropdown {
        .dropdown-menu {
          width: 100%;
          p {
            &:hover {
              cursor: pointer;
            }
          }
        }

        .dropdown-toggle {
          @include dropdown-btn;
          width: 180px;
          color: black;
          justify-content: space-between;
          align-items: center;
        }
      }

    }
  }
}
}

@media only screen and (max-width: 767px){
.main_section {
  h1 {
    margin-top: 50px;
    text-align: center;
    font-size: 50px;
    font-weight: 600;
    @include title_color;
  }

  .info_wrap {
    .button_wrap {
      @include bottom_btn_wrap;
      margin-bottom: 5%;
      padding:0 5%;

      button {
        &:nth-child(1) {
          @include back_to_previous_btn;

          &:hover {
            background-color: #5d85bb;
          }
        }

        &:nth-child(2) {
          @include empty_btn;

          &:hover {
            background-color: #5e7aa2;
          }
        }

        &:nth-child(3) {
          @include search_and_send_btn;

          &:hover {
            background-color: #5D85BD;
          }
        }
      }
    }

    button.back_btn:hover {
      background-color: #5d85bb;
    }

    button.send_btn:hover {
      background-color: #5e7aa2;
    }

    button.empty_btn:hover {
      background-color: #5D85BD;
    }

   
.input-group{
  
  flex-direction:column;
  .input-number {
       margin-left: unset !important;
      @include count_btn;
    }

    .form-control {
         height: 35px;
    width: 100%;
    margin-left: unset !important;
    }
     .input-group-prepend {
   color: white;
    font-weight: 700;
    font-size: 20px;
    width: 120px;
    margin-bottom: 5px;

      span {
        @include red_star
      }
    }
}
    

    padding: 1% 5% 0;

    .fixed_info {
      @include fixed_info;
      height:unset;
    flex-direction: column;
    padding: 10px;
      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    .content {
      .check_box_wrap {
        font-weight: 700;
        align-items: center;
        color: white;
        font-size: 20px;
  flex-direction:row ;
          display:flex;
        .check_box {
          margin-right: 5px;
        
        }
      }

      @include content_bg;

      .dropdown {
        .dropdown-menu {
          width: 100%;
        }
      }

      .content {
        @include content_bg;


      }

      .dropdown {
        margin-left:unset !important;
        .dropdown-menu {
          width: 100%;
          p {
            &:hover {
              cursor: pointer;
            }
          }
        }

        .dropdown-toggle {
          @include dropdown-btn;
          width:100%;
          color: black;
          justify-content: space-between;
          align-items: center;
        }
      }

    }
  }
}
}



</style>