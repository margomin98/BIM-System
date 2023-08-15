<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        編輯入庫填報
      </h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>
            申請人員: {{ details.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請入庫日期: {{ details.ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4 check_box_wrap">
              <div class="input-group-prepend check_box">
                資產類型：{{ details.IsConsumable }}
              </div>
              <input type="checkbox" class='check_box' v-model="details.IsConsumable" />耗材
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              編號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly placeholder="5335584" v-model="details.AI_ID">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                入庫單狀態：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly placeholder="備料中" v-model="details.Status">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              資產編號： {{ AssetsId }}
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly placeholder="(ex)X12235584">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>設備總類：{{ details.EquipTypeName }}
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                  {{ details.EquipTypeName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="statusDropdown">
                  <p v-for="(item, index) in EquipTypeArray" :key="index" class="dropdown-item"
                    @click="selectType(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4 align_end_box">
              <div class="input-group-prepend align_end_box">
                <span>*</span>設備分類：{{ details.EquipCategoryName }}
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(details.EquipTypeName !== '') }">
                  {{ details.EquipCategoryName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
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
              <span>*</span>物品名稱：{{ details.AssetName }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入20字" v-model="details.AssetName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商： {{ details.VendorName }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入100字" v-model="details.VendorName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格：{{ details.ProductSpec }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入100字" v-model="details.ProductSpec">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號：{{ details.ProductType }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入100字" v-model="details.ProductType">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>數量：{{ details.Count }}
              </div>
              <div class="number-input-box">
                <input class="input-number" type="number" v-model="details.Count" min="1" />
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4 align_end_box">
              <div class="input-group-prepend">
                <span>*</span>單位：{{ details.Unit }}
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {{ details.Unit || '請選擇' }}
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
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                保固期限：{{ details.WarrantyDate }}
              </div>
              <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="details.WarrantyDate">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固開始日:&nbsp; {{ details.WarrantyStartDate }}
              </div>
              <input type="date" class="form-control text_input" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" v-model="details.WarrantyStartDate">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固到期日: {{ details.WarrantyEndDate }}
              </div>
              <input type="date" class="form-control text_input" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" v-model="details.WarrantyEndDate">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註：{{ details.Memo }}
            </div>
            <textarea class="form-control" aria-label="With textarea" placeholder="最多輸入500字" v-model="details.Memo"></textarea>
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
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const AI_ID = route.query.search_id;
    const EquipTypeArray = ref([]);
    const EquipCategoryArray = ref([]);
    const UnitArray = (['個', '支', '台', '件', '把', '枝', '本', '根', '隻', '張', '條', '塊', '顆', '雙', '箱', '包',]);

    const details = ref({});

    async function submit() {
      // 檢查所有required項目
      if (!details.value.EquipCategoryName || !details.value.EquipTypeName || !details.value.AssetName || !details.value.Count || !details.value.Unit) {
        alert('請填寫所有必填項目');
        return;
      }
      const formData = new FormData();
      const formFields = {
        'AI_ID': details.value.AI_ID,
        'Status': details.value.Status,
        'IsConsumable': details.value.IsConsumable,
        'EquipTypeName': details.value.EquipTypeName,
        'EquipCategoryName': details.value.EquipCategoryName,
        'AssetName': details.value.AssetName,
        'VendorName': details.value.VendorName,
        'ProductSpec': details.value.ProductSpec,
        'ProductType': details.value.ProductType,
        'Count': details.value.Count,
        'Unit': details.value.Unit,
        'WarrantyDate': details.value.WarrantyDate,
        'WarrantyStartDate': details.value.WarrantyStartDate,
        'WarrantyEndDate': details.value.WarrantyEndDate,
        'Memo': details.value.Memo,
      };
      //將表格資料append到 formData
      for (const fieldName in formFields) {
        formData.append(fieldName, formFields[fieldName]);
        console.log(formData.get(`${fieldName}`));
      }
      //使用axios method:post傳送新品入庫表單
      const axios = require('axios');
      try {
        const response = await axios.post('/AssetsInMng/ApplicationEdit ', formData, {
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
          router.push('/home');
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

    async function getDetails() {
      const axios = require('axios');
      try {
        const response = await axios.get(`/GetDBdata/GetApplicationInfo?ai_id=${AI_ID}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('Details Get成功 資料如下\n', data.resultList);
          details.value = data.resultList;
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function getEquipTypeName() {
      if (EquipTypeArray.value.length == 0) {
        const axios = require('axios');
        try {
          const response = await axios.get('/GetParameter/GetEquipType');
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
      details.value.EquipCategoryName = '';
      const axios = require('axios');
      try {
        const response = await axios.get(`/GetParameter/GetEquipCategory?id=${details.value.EquipTypeName}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('分類Get成功 資料如下\n', data.resultList.EquipCategory);
          EquipCategoryArray.value = data.resultList.EquipCategory;
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error('Error sending EquipTypeName request to backend');
      }
    }
    onMounted(() => {
      //依ID帶入系統資料
      getDetails();
    });
    const selectType = (item) => {
      //選擇總類完後 嘗試取得分類
      details.value.EquipTypeName = item;
      getEquipCategoryName();
    };

    const selectUnit = (item) => {
      details.value.Unit = item;
    };

    const selectCategory = (item) => {
      details.value.EquipCategoryName = item;
    };

    const clear = () => {


      details.value.EquipTypeName = '';
      details.value.EquipCategoryName = '';
      details.value.Unit = '';
      details.value.Count = 1;
    };

    const goBack = () => {
      window.history.back();
    };

    return {
      EquipTypeArray,
      getEquipTypeName,
      EquipCategoryArray,
      getEquipCategoryName,
      UnitArray,
      details,
      selectType,
      selectUnit,
      selectCategory,
      submit,
      clear,
      goBack,
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.main_section {
  .readonly_box {
    @include readonly_box;
  }

  h1 {
    margin-top: 50px;
    text-align: center;
    font-size: 55px;
    font-weight: 600;
    @include title_color;
  }

  .info_wrap {
    padding: 1% 31% 0;

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

      .align_end_box {
        justify-content: end
      }

      @include content_bg;

      .dropdown {
        .dropdown-menu {
          width: 100%;
        }

        button {
          @include dropdown-btn;
          width: 199px;
          color: black;
          justify-content: space-between;
          align-items: center;
        }
      }

      .input-group {
        .input-number {
          width: 199px;
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
          width: 120px;
          text-align: end;

          span {
            @include red_star
          }
        }
      }
    }

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
  }
}</style>