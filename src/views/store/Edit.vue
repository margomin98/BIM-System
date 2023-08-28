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
            申請人員 : {{ details.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請入庫日期 : {{ details.ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4 check_box_wrap">
              <div class="input-group-prepend check_box">
                資產類型 :
              </div>
              <input type="radio" class='check_box' value="false" v-model="isConsumableComputed" />資產
              <input type="radio" class='check_box' value="true" v-model="isConsumableComputed" />耗材
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              編號 :
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.AI_ID">
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                入庫單狀態 :
              </div>
              <input id='size_wrap' type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly placeholder="備料中" v-model="details.Status">
            </div>
          </div>
        </div>
        <div v-if="details.AssetsId" class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              資產編號 :
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetsId">
          </div>
        </div>
        <div class="row row_wrap g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend flex">
                <span>*</span>設備總類 :
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
            <div class="input-group mb-4 ">
              <div class="input-group-prepend ">
                <span>*</span>設備分類 :
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(details.EquipTypeName !== '') }">
                  {{ details.EquipCategoryName || EquipCategoryInit }}
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
              <span>*</span>物品名稱 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入20字" v-model="details.AssetName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入100字" v-model="details.VendorName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入100字" v-model="details.ProductSpec">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
              placeholder="最多輸入100字" v-model="details.ProductType">
          </div>
        </div>
        <div class="row g-0 row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend info">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"> <span>*</span>包裝數量 :
              </div>
              <div class="number-input-box">
                <input class="input-number" type="number" v-model="details.Count" min="1" />
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4 ">
              <div class="input-group-prepend">
                <span>*</span>包裝單位 :
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
        <div v-if="details.IsConsumable" class="row g-0 row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包"><span>*</span>數量 :
              </div>
              <div class="number-input-box">
                <input class="input-number" type="number" v-model="details.PackageNum" min="1" />
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4 ">
              <div class="input-group-prepend">
                <span>*</span>單位 :
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {{ details.PackageUnit || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in PackageUnitArray" :key="index" class="dropdown-item"
                    @click="selectPackageUnit(`${item}`)">
                    {{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固期限 :
              </div>
              <input id='size_wrap' type="text" class="form-control" aria-label="Default" placeholder="最多輸入10字"
                aria-describedby="inputGroup-sizing-default" v-model="details.WarrantyDate">
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固開始日 :
              </div>
              <input type="date" class="form-control text_input" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" v-model="details.WarrantyStartDate">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固到期日 :
              </div>
              <input type="date" class="form-control text_input" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" v-model="details.WarrantyEndDate">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註 :
            </div>
            <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入500字"
              v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import {
  useRoute,
  useRouter
} from 'vue-router';
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
    const EquipCategoryInit = ref('請先選擇設備總類');
    const UnitArray = (['個', '對', '箱', '包', '組', '台', '件']);
    const PackageUnitArray = (['個', '支', '枝', '隻', '根', '條', '顆']);
    const details = ref({});
    async function submit() {
      // 檢查所有required項目
      // 耗材需額外檢查包裝數量、單位
      if (details.value.IsConsumable) {
        if (!details.value.PackageNum || !details.value.PackageUnit || details.value.PackageNum == 0) {
          alert('請填寫所有必填項目');
          return;
        }
      }
      if (!details.value.EquipCategoryName || !details.value.EquipTypeName || !details.value.AssetName || !details.value.Count || !details.value.Unit || details.value.Count == 0) {
        alert('請填寫所有必填項目');
        return;
      }
      if ( details.value.WarrantyDate &&!/^.{1,10}$/.test(details.value.WarrantyDate)) {
        alert('保固期限格式錯誤');
        return
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
      //耗材額外將包裝數量、單位append到 formData
      if (details.value.IsConsumable) {
        formData.append('PackageNum', details.value.PackageNum);
        formData.append('PackageUnit', details.value.PackageUnit);
      }
      //使用axios method:post傳送新品入庫表單
      const axios = require('axios');
      try {
        const response = await axios.post('http://192.168.0.176:7008/AssetsInMng/ApplicationEdit ', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          //新品表單編輯成功，跳轉至入庫管理頁面
          let msg = data.messages;
          msg+= '\n編號:'+data.resultList.AI_ID;
          alert(msg);
          router.push({ name: 'Store_Datagrid' });
        } else if (data.state === 'error') {
          //新品表單編輯失敗
          alert(data.messages);
        } else if (data.state === 'input_error') {
          //新品表單格式錯誤
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
        const response = await axios.get(`http://192.168.0.176:7008/GetDBdata/GetApplicationInfo?ai_id=${AI_ID}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('Details Get成功 資料如下\n', data.resultList);
          details.value = data.resultList;
          for (let key in details.value) {
            if (details.value[key] === null) {
              details.value[key] = '';
            }
          }
          console.log('處理過後', details.value);
          getEquipCategoryName();
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
      const axios = require('axios');
      try {
        const response = await axios.get(`http://192.168.0.176:7008/GetParameter/GetEquipCategory?id=${details.value.EquipTypeName}`);
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
      details.value.EquipCategoryName = '';
      getEquipCategoryName();
      EquipCategoryInit.value = '請選擇';
    };
    const selectUnit = (item) => {
      details.value.Unit = item;
    };
    const selectPackageUnit = (item) => {
      details.value.PackageUnit = item;
    };
    const selectCategory = (item) => {
      details.value.EquipCategoryName = item;
    };
    const isConsumableComputed = computed({
      get() {
        return details.value.IsConsumable;
      },
      set(value) {
        details.value.IsConsumable = value === 'true';
      }
    });
    const goBack = () => {
      window.history.back();
    };
    return {
      EquipTypeArray,
      getEquipTypeName,
      EquipCategoryArray,
      EquipCategoryInit,
      getEquipCategoryName,
      UnitArray,
      PackageUnitArray,
      details,
      selectType,
      selectUnit,
      selectPackageUnit,
      selectCategory,
      isConsumableComputed,
      submit,
      goBack,
    };
  }
};
</script>


<style lang="scss" scoped>
@import '@/assets/css/global.scss';

@media only screen and (min-width: 1200px) {
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
      margin: auto;
      width: 750px;

      .input-group-prepend {
        color: white;
        font-weight: 700;
        font-size: 20px;
        width: calc(100px + 6%);
        text-align: end;
        white-space: nowrap;

        span {
          @include red_star
        }
      }

      .input-number {
        @include count_btn;
        width: 220px;
      }

      .fixed_info {
        @include fixed_info;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      .content {
        @include content_bg;

        .input-group-prepend {
          width: 125px;
        }

        .check_box_wrap {
          font-weight: 700;
          align-items: center;
          color: white;
          font-size: 20px;

          .check_box {
            margin-right: 5px;
          }
        }

        .row_wrap {
          .input-group {
            flex-wrap: nowrap
          }

          .flex {
            width: 125px
          }
        }

        .dropdown {
          width: 218px;

          .dropdown-menu {
            width: 100%;

            p {
              &:hover {
                cursor: pointer;
              }
            }
          }

          .dropdown-toggle {
            width: 100%;
            @include dropdown-btn;
            color: black;
            justify-content: space-between;
            align-items: center;
          }
        }
      }

      .button_wrap {
        display: flex;
        justify-content: space-between;
        margin: 30px auto 5%;
        width: 220px;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5D85BD;
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
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
      margin: auto;
      width: 750px;

      .input-group-prepend {
        color: white;
        font-weight: 700;
        font-size: 20px;
        width: calc(100px + 6%);
        text-align: end;
        white-space: nowrap;

        span {
          @include red_star
        }
      }

      .input-number {
        @include count_btn;
        width: 220px;
      }

      .fixed_info {
        @include fixed_info;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      .content {
        @include content_bg;

        .input-group-prepend {
          width: 125px;
        }

        .check_box_wrap {
          font-weight: 700;
          align-items: center;
          color: white;
          font-size: 20px;

          .check_box {
            margin-right: 5px;
          }
        }

        .row_wrap {
          .input-group {
            flex-wrap: nowrap
          }

          .flex {
            width: 125px
          }
        }

        .dropdown {
          width: 218px;

          .dropdown-menu {
            width: 100%;

            p {
              &:hover {
                cursor: pointer;
              }
            }
          }

          .dropdown-toggle {
            width: 100%;
            @include dropdown-btn;
            color: black;
            justify-content: space-between;
            align-items: center;
          }
        }
      }

      .button_wrap {
        display: flex;
        justify-content: space-between;
        margin: 30px auto 5%;
        width: 220px;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5D85BD;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .readonly_box {
      @include readonly_box;
    }

    h1 {
      margin-top: 50px;
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      @include title_color;
    }

    .info_wrap {
      margin: auto;
      padding: 0 5%;

      .fixed_info {
          @include fixed_info;
          flex-direction: column;
          padding: 10px;
          height: unset;
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

            p {
              &:hover {
                cursor: pointer;
              }
            }
          }

          button {
            @include dropdown-btn;
            width: 100%;
            color: black;
            justify-content: space-between;
            align-items: center;
          }
        }

        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset;
          border-radius: 5px;
        }

        .input-group {
          flex-direction: column;

          .input-number {
            width: 100%;
            @include count_btn;
          }

          .form-control {
            height: 35px;
            width: 100%;
          }

          .input-group-prepend {
            color: white;
            font-weight: 700;
            font-size: 20px;
            margin-right: 10px;
            white-space: nowrap;

            span {
              @include red_star
            }
          }
        }

        .check_box_wrap {
          gap: 5px;
          flex-direction: row;
          font-weight: 700;
          align-items: center;
          color: white;
          font-size: 20px;

          .check {
            margin-right: 5px;
          }
        }
        .info {
          display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
        }
      }

      .button_wrap {
        display: flex;
        justify-content: space-between;
        margin: 30px auto 5%;
        width: 220px;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5D85BD;
            }
          }
        }
      }
    }
  }
}
</style>