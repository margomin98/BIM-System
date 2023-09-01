<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        歸還入庫
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
        <div class="col-12">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>資產編號：
            </div>
            <input ref="inputElement" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="請輸入資產編號">
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>數量：
              </div>
              <input class="input-number " type="number" v-model="count" min="1" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                單位：
              </div>
              <input type="text" class=" readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              備註：
            </div>
            <textarea class="form-control" placeholder="最多輸入100字"></textarea>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
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
    },
    mounted() {
      // Focus the input element when the component is mounted
      this.$refs.inputElement.focus();
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  @media only screen and (min-width: 1200px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 180px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: 30px auto 5%;
        width: 700px;
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
            justify-content: end;
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
            }
            .readonly_box {
              height: 37px;
            }
            .form-control {
              height: 37px;
              border-radius: 0;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              text-align: end;
              width: 140px;
              span {
                @include red_star
              }
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
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 180px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: 30px auto 5%;
        width: 800px;
        padding: 0 5%;
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
            justify-content: end;
            width: 100%;
            flex-wrap: nowrap;
            .input-number {
              width: 100%;
              @include count_btn;
            }
            .readonly_box {
              height: 37px;
              width: 100%;
            }
            .form-control {
              height: 37px;
              width: 100%;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              text-align: end;
              width: 150px;
              span {
                @include red_star
              }
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
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
        height: 35px;
        margin-left: unset !important;
      }
      h1 {
        margin-top: 80px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 0 5%;
        .fixed_info {
          @include fixed_info;
          height: unset;
          flex-direction: column;
          padding: 10px;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .input-group {
            flex-direction: column;
            .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
              margin-left: unset;
              border-radius: 5px;
              margin-top: 5px;
              height: 35px;
            }
            .input-number {
              @include count_btn;
              margin-left: unset !important;
            }
            .form-control {
              height: 35px;
              width: 100%;
              border-radius: 0;
              margin-left: unset !important;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 100px;
              white-space: nowrap;
              span {
                @include red_star
              }
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
              width: 100px;
              &:hover {
                background-color: #5d85bb;
              }
            }
            &:nth-child(2) {
              @include empty_btn;
              width: 70px;
              padding: 5px;
              &:hover {
                background-color: #5e7aa2;
              }
            }
            &:nth-child(3) {
              @include search_and_send_btn;
              width: 70px;
              padding: 5px;
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