<template>
  <Navbar/>
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
            申請人員: 陳奕迅 {{ Applicant }}
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
              <input type="checkbox" class='check_box'/>耗材
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              編號：{{ AI_ID }}
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly placeholder="5335584">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                入庫單狀態： {{ Status }}
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly placeholder="備料中">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              資產編號： {{ AssetsId }}
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly placeholder="X12235584">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>設備總類：{{ EquipTypeName }}
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ EquipTypeName || '請選擇' }}
            </button>
                <div class="dropdown-menu" aria-labelledby="statusDropdown">
                  <p class="dropdown-item" @click="selectType('選項1')">選項1</p>
                  <p class="dropdown-item" @click="selectType('選項2')">選項2</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4 align_end_box">
              <div class="input-group-prepend align_end_box">
                <span>*</span>設備分類：{{ EquipCategoryName }}
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ EquipCategoryName || '請選擇' }}
              </button>
                <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                  <p class="dropdown-item" @click="selectCategory('選項1')">選項1</p>
                  <p class="dropdown-item" @click="selectCategory('選項2')">選項2</p>
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
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="最多輸入20字">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商： {{ VendorName }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="最多輸入100字">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格：{{ ProductSpec }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="最多輸入100字">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號：{{ ProductType }}
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="最多輸入100字">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>數量：{{ Count }}
              </div>
              <div class="number-input-box">
                <input class="input-number" type="number" v-model="Count" min="1" />
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4 align_end_box">
              <div class="input-group-prepend">
                <span>*</span>單位：{{ Unit }}
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固開始日:&nbsp;
              </div>
              <input type="date" class="form-control text_input" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固到期日:
              </div>
              <input type="date" class="form-control text_input" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註：
            </div>
            <textarea class="form-control" aria-label="With textarea" placeholder="最多輸入500字"></textarea>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">上一頁</button>
        <button class="empty_btn" @click="clear()">清空</button>
        <button class="send_btn">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  setup() {
    const Applicant = ref('');
    const ApplicationDate = ref('');
    const AI_ID = ref('');
    const Status = ref('');
    const AssetsId = ref('');
    const EquipTypeName = ref('');
    const EquipCategoryName = ref('');
    const AssetName = ref('');
    const VendorName = ref('');
    const ProductSpec = ref('');
    const ProductType = ref('');
    const Count = ref(1);
    const Unit = ref('');

    const selectType = (item) => {
      EquipTypeName.value = item;
    };

    const selectArea = (item) => {
      Unit.value = item;
    };

    const selectCategory = (item) => {
      EquipCategoryName.value = item;
    };

    const clear = () => {
      

      EquipTypeName.value = '';
      EquipCategoryName.value = '';
      Unit.value = '';
      Count.value = 1;
    };

    const goBack = () => {
      window.history.back();
    };

    return {
      Applicant,
      ApplicationDate,
      AI_ID,
      Status,
      AssetsId,
      EquipTypeName,
      EquipCategoryName,
      AssetName,
      VendorName,
      ProductSpec,
      ProductType,
      Count,
      Unit,
      selectType,
      selectArea,
      selectCategory,
      clear,
      goBack
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
          .check_box_wrap{
       font-weight: 700;
    align-items: center;
    color: white;
    font-size: 20px;
         .check_box{  
            margin-right:5px;
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
  }
</style>