<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
資料歸還入庫
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
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商：
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"  placeholder="最多輸入100字">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>數量：
              </div>
              <div class="number-input-box">
                <input class="input-number" type="number" v-model="count" min="1" />
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>單位：
              </div>
                        <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default"  readonly>

            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">上一頁</button>
        <button class="empty_btn" @click="clear">清空</button>
        <button class="send_btn">送出</button>
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
 
        count: 1,
        incrementing: true
      };
    },
    methods: {
      goBack() {
        window.history.back();
      },
      clear() {
        // Clear input fields
        const inputFields = document.querySelectorAll('.form-control');
        inputFields.forEach((input) => {
          input.value = '';
        });
        this.count = 1;
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