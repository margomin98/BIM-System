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
            申請人員: 陳奕迅{{ Applicant }}
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
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>設備總類：{{ EquipTypeName }}
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {{ EquipTypeName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="statusDropdown">
                  <p class="dropdown-item" @click="selectStatus('選項1')">選項1</p>
                  <p class="dropdown-item" @click="selectStatus('選項2')">選項2</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>設備分類：{{ EquipCategoryName }}
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {{ EquipCategoryName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                  <p class="dropdown-item" @click="selectCabinet('選項1')">選項1</p>
                  <p class="dropdown-item" @click="selectCabinet('選項2')">選項2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>物品名稱：{{ AssetName }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入20字" v-model="AssetName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商：{{ VendorName }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              v-model="VendorName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格：{{ ProductSpec }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              v-model="ProductSpec">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號：{{ ProductType }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              v-model="ProductType">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>數量：{{ Count }}
              </div>
              <div class="number-input-box">
                <input class="input-number" type="number" v-model="Count" min="1">
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>單位：{{ Unit }}
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {{ Unit || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p class="dropdown-item" @click="selectArea('選項1')">選項1</p>
                  <p class="dropdown-item" @click="selectArea('選項2')">選項2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              保固期限：{{ WarrantyDate }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              v-model="WarrantyDate">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固開始日 {{ WarrantyStartDate }}
              </div>
              <input type="date" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                v-model="WarrantyStartDate">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固到期日 {{ WarrantyEndDate }}
              </div>
              <input type="date" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                v-model="WarrantyEndDate">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註：{{ Memo }}
            </div>
            <textarea class="form-control" aria-label="With textarea" v-model="Memo"></textarea>
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
import { onMounted, ref } from 'vue';

export default {
  components: {
    Navbar
  },
  setup() {
    const today = new Date();
    const Applicant = ref('');//申請人 發API 帶入
    const ApplicationDate = ref(getDate());//申請日期 function帶入
    const EquipTypeName = ref('');//設備總類 *必填
    const EquipCategoryName = ref('');//設備分類 *必填
    const AssetName = ref('');//物品名稱 *必填
    const VendorName = ref('');//廠商
    const ProductSpec = ref('');//規格
    const ProductType = ref('');//型號
    const Count = ref(1);//數量 *必填
    const Unit = ref('');//單位 *必填
    const WarrantyDate = ref('');//保固期限
    const WarrantyStartDate = ref(null);//保固開始日
    const WarrantyEndDate = ref(null);//保固到期日
    const Memo = ref('');//備註
    const incrementing = ref(true);
    function getDate() {
      var date = '';
      date += (today.getFullYear() + '/');
      date += ((today.getMonth() + 1) + '/');
      date += ((today.getDate()));
      return date;
    }

    function selectStatus(item) {
      EquipTypeName.value = item;
      showDatePicker.value = false;
    }

    function selectArea(item) {
      Unit.value = item;
      showDatePicker.value = false;
    }

    function selectCabinet(item) {
      EquipCategoryName.value = item;
      showDatePicker.value = false;
    }

    function goBack() {
      window.history.back();
    }

    function clear() {
      // Clear input fields
      Applicant.value = '';
      EquipTypeName.value = '';
      EquipCategoryName.value = '';
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
      showDatePicker.value = false;
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
        'Applicant': Applicant.value,
        'ApplicationDate': ApplicationDate.value,
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
      }
      //使用axios method:post傳送新品入庫表單
      const axios = require('axios');
      try {
        const response = await axios.post('/AssetsInMng/NewAssetsIn', formData, {
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
        }
        else if (data.state === 'error') {
          //新品表單傳送失敗
          alert(data.messages);
        }
        else {
          throw new Error('Request was not successful');
        }
      } catch (error) {
        console.error('Error sending data to backend', error);
      }
    }
    async function getApplicationInfo() {
      const axios = require('axios');
      try {
        const response = await axios.get('/GetDBdata/GetApplicationInfo');
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('申請人名稱:' , data.resultList.Applicant);
          console.log('Get成功 資料如下\n',data.resultList);
          Applicant.value = data.resultList.Applicant;
        }
        else if (data.state === 'error') {
          alert(data.messages);
        }
        else if(data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error('Error sending applicant info request to backend');
      }
    }
    onMounted(()=> {
      getApplicationInfo();
    });
    const showDatePicker = ref(false); // Assuming this is used somewhere in your template

    return {
      today,
      getDate,
      Applicant,
      ApplicationDate,
      EquipTypeName,
      EquipCategoryName,
      AssetName,
      VendorName,
      ProductSpec,
      ProductType,
      Count,
      Unit,
      WarrantyDate,
      WarrantyStartDate,
      WarrantyEndDate,
      Memo,
      incrementing,
      selectStatus,
      selectArea,
      selectCabinet,
      goBack,
      clear,
      submit,
      showDatePicker,
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.main_section {
  h1 {
    margin-top: 50px;
    text-align: center;
    font-size: 55px;
    font-weight: 600;
    @include title_color;
  }

  .info_wrap {
    padding: 1% 32% 0;

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    .content {
      @include content_bg;

      .dropdown {
        .dropdown-menu {
          width: 100%;
        }

        button {
          @include dropdown-btn;
          width: 180px;
          color: black;
          justify-content: space-between;
          align-items: center;
        }
      }

      .input-group {
        .input-number {
          @include count_btn;
        }

        .form-control {
          height: 35px;
          border-radius: 0;
        }

        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 110px;
          text-align: end;

          span {
            @include red_star
          }
        }
      }
    }

    .button_wrap {
      @include bottom_btn_wrap;

      button {
        &:nth-child(1) {
          @include new_item_back_btn
        }

        &:nth-child(2) {
          @include empty_btn
        }

        &:nth-child(3) {
          @include search_and_send_btn
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
    }
  }
}
</style>