<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        檢視入庫填報
      </h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>
            申請人員: 陳奕迅
          </p>
        </div>
        <div>
          <p>
            申請入庫日期: 2023/04/01
          </p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              編號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              入庫單狀態：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              資產編號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                設備總類：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                設備分類：
              </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                數量：
              </div>
    <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                單位：
              </div>
<input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              保固期限：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固開始日
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固到期日
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註：
            </div>
            <textarea class="form-control readonly_box" aria-label="With textarea" readonly></textarea>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  export default {
    components: {
      Navbar
    },
    data() {
      return {
        selectedType: '',
        selectedCategory: '',
        selectedAreaItem: '',
        count: 1,
        incrementing: true
      };
    },
    methods: {
      selectStatus(item) {
        this.selectedType = item;
        this.showDatePicker = false;
      },
      selectArea(item) {
        this.selectedAreaItem = item;
        this.showDatePicker = false;
      },
      selectCabinet(item) {
        this.selectedCategory = item;
        this.showDatePicker = false;
      },
      clear() {
        // Clear input fields
        const inputFields = document.querySelectorAll('.form-control');
        inputFields.forEach((input) => {
          input.value = '';
        });
        // Clear dropdowns
        this.selectedType = '';
        this.selectedCategory = '';
        this.selectedAreaItem = '';
        // Clear input-number
        this.count = 1;
        // Clear other data properties if needed
        // Close dropdown menus
        this.showDatePicker = false;
      },
      goBack() {
        window.history.back();
      }
    }
  }
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
        @include content_bg;
        .dropdown {
          .dropdown-menu {
            width: 100%;
          }
          button {
            @include dropdown-btn;
            width: 187px;
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
            width: 120px;
            text-align: end;
            span {
              @include red_star
            }
          }
        }
      }
      .button_wrap {
     display: flex;
    margin-top: 30px;
    justify-content: center;
    padding: 0 28%;
    margin-bottom: 5%;
        button {
          &:nth-child(1) {
            @include new_item_back_btn
          }

        }
        button.back_btn:hover {
          background-color: #5d85bb;
        }

      }
    }
  }
</style>