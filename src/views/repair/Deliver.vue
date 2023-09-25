<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        送修作業
      </h1>
    </div>
    <div class="info_wrap col">
      <!-- 維修編號，申請人員，申請日期 -->
      <div class="fixed_info">
        <div>
          <p>
            維修編號: {{ Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請人員: {{ Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請日期: {{ ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row g-0">
          <!-- 送修人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group" :class="{'mb-4': !wrongStatus}">
              <div class="input-group-prepend">
                送修人員：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly>
            </div>
          </div>
          <!-- 交付日期 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group" :class="{'mb-4': !wrongStatus}">
              <div class="input-group-prepend">
                交付日期：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <!-- 審核人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group" :class="{'mb-4': !wrongStatus}">
              <div class="input-group-prepend">
                審核人員：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly>
            </div>
          </div>
          <!-- 審核結果 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group" :class="{'mb-4': !wrongStatus}">
              <div class="input-group-prepend">
                審核結果：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly>
            </div>
          </div>
        </div>
        <!-- 審核日期 -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group d-flex mb-4">
            <div class="input-group-prepend">
              審核日期：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly>
          </div>
        </div>
        <div class="row g-0">
          <!-- 資產編號 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group" :class="{'mb-4': !wrongStatus}">
              <div class="input-group-prepend">
                資產編號：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly>
            </div>
          </div>
          <!-- 物品名稱 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group" :class="{'mb-4': !wrongStatus}">
              <div class="input-group-prepend">
                物品名稱：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly>
            </div>
          </div>
        </div>
        <!-- 問題描述 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              問題描述：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" readonly></textarea>
          </div>
        </div>
        <!-- 報修照片 -->
        <div class="col-12 repair_photo_section">
          <div class="input-group mt-3">
            <div class="input-group-prepend">報修照片：
            </div>
            <div>
            </div>
          </div>
          <swiper-container class="swiper_section" :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
            <swiper-slide>
              <img src="https://i.redd.it/64yjcednctpb1.jpg">
            </swiper-slide>
            <swiper-slide>
              <img src="https://www.scotsman.com/webimg/b25lY21zOmRmYmExYzE4LTZhY2ItNDBkZS1iMTU1LWY4YTVlZWNmYTdkYzowOTcxZDZlOC00MDc1LTQzYzItOWEyOC00YjNlNzFiY2Y1YzI=.jpg?crop=3:2,smart&width=640&quality=65&enable=upscale">
            </swiper-slide>
            <swiper-slide>
              <img src="https://i.redd.it/64yjcednctpb1.jpg">
            </swiper-slide>
            <swiper-slide>
              <img src="https://www.scotsman.com/webimg/b25lY21zOmRmYmExYzE4LTZhY2ItNDBkZS1iMTU1LWY4YTVlZWNmYTdkYzowOTcxZDZlOC00MDc1LTQzYzItOWEyOC00YjNlNzFiY2Y1YzI=.jpg?crop=3:2,smart&width=640&quality=65&enable=upscale">
            </swiper-slide>
            <swiper-slide>
              <img src="https://i.redd.it/64yjcednctpb1.jpg">
            </swiper-slide>
          </swiper-container>
          <div class="swiper_pagination">
          </div>
        </div>
      </div>
      <h2 class="mt-5 mb-3">
        維修資訊
      </h2>
      <div class="content">
        <!-- 維修廠商 -->
        <div class="col-12">
          <div class="input-group" :class="{'mb-4': !wrongStatus}">
            <div class="input-group-prepend">
              <span>*</span> 維修廠商：
            </div>
            <input ref="inputElement" type="text" class="form-control">
          </div>
        </div>
        <!-- 外部維修單號 -->
        <div class="col-12">
          <div class="input-group" :class="{'mb-4': !wrongStatus}">
            <div class="input-group-prepend">
              <span>*</span> 外部維修單號：
            </div>
            <input ref="inputElement" type="text" class="form-control ">
          </div>
        </div>
        <div class="row g-0">
          <!-- 廠商聯絡人 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group" :class="{'mb-4': !wrongStatus}">
              <div class="input-group-prepend">
                廠商聯絡人：
              </div>
              <input ref="inputElement" type="text" class="form-control ">
            </div>
          </div>
          <!-- 聯絡電話 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group" :class="{'mb-4': !wrongStatus}">
              <div class="input-group-prepend">
                聯絡電話：
              </div>
              <input ref="inputElement" type="text" class="form-control ">
            </div>
          </div>
        </div>
        <!-- 送修日期 -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group d-flex mb-4">
            <div class="input-group-prepend">
              送修日期：
            </div>
            <input ref="inputElement" type="date" class="form-control ">
          </div>
        </div>
        <!-- 備註 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              備註：
            </div>
            <textarea style="height: 200px;" class="form-control "></textarea>
          </div>
        </div>
        <!-- 文件上傳 -->
        <div class="col-12 repair_photo_section">
          <div class="input-group mt-3">
            <div class="input-group-prepend">文件上傳：</div>
            <div class="mb-3 file_wrap">
              <button class="choose_btn">選擇檔案</button>
              <input type="file" accept="image/*" style="display: none;">
            </div>
            <div class="selected_file">
              <p class="title">已選擇的檔案:</p>
              <div class="file_upload_wrap" style="cursor: pointer;">
                <p>File 1</p>
                <img class="delete_icon" src="@/assets/trash.png" style="margin-left: 10px;">
              </div>
              <div class="file_upload_wrap" style="cursor: pointer;">
                <p>File 2</p>
                <img class="delete_icon" src="@/assets/trash.png" style="margin-left: 10px;">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" :disabled="!canSubmit" :class="{send_btn_disabled: !canSubmit}" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ref,
    onMounted,
    reactive
  } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import router from '@/router';
  import {
    register
  } from 'swiper/element/bundle';
  import {
    Pagination
  } from 'swiper/modules';
  register();
  export default {
    components: {
      Navbar
    },
    setup() {
      return {
        pagination: {
          clickable: true,
        },
        modules: [Pagination]
      }
    }
  };
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  span {
    @include red_star
  }
  .form-check-input {
    align-self: center
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
        font-weight: 500;
      }
      .swiper_section {
        swiper-slide {
          align-self: baseline;
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
        }
      }
      h1 {
        margin-top: 100px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      h2 {
        margin-top: 50px;
        text-align: center;
        font-size: 35px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: 30px auto 5%;
        width: 750px;
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
            .readonly_box {
              text-align: center;
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
              width: 155px;
            }
          }
          .selected_file {
            margin-left: 20px;
            p.title {
              font-weight: 700;
              color: white;
              margin-bottom: 5px;
            }
            .file_upload_wrap {
              margin-bottom: 0;
              display: flex;
              img {
                width: 25px;
                height: 25px;
              }
              p {
                margin-bottom: 0;
                font-weight: 700;
                color: white;
                &::before {
                  margin-right: 10px;
                  content: '·';
                  font-weight: 700;
                  color: white;
                }
              }
            }
          }
          .file_wrap {
            display: flex;
            flex-direction: column;
            .choose_btn {
              margin-bottom: 10px;
              @include choose_file_btn;
              &:hover {
                background: #3f608f;
              }
            }
          }
        }
        .content:nth-child(4) {
          border-radius: 10px
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
          }
          .send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          .send_btn_disabled {
            background: #878787;
            &:hover {
              background: #878787;
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
      .swiper_section {
        swiper-slide {
          align-self: baseline;
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
        }
      }
      h1 {
        margin-top: 100px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      h2 {
        margin-top: 50px;
        text-align: center;
        font-size: 35px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: 30px auto 5%;
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
            width: 100%;
            white-space: nowrap;
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
              width: 65%;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              text-align: end;
              width: 115px;
            }
          }
          .selected_file {
            margin-left: 20px;
            p.title {
              font-weight: 700;
              color: white;
              margin-bottom: 5px;
            }
            .file_upload_wrap {
              margin-bottom: 0;
              display: flex;
              img {
                width: 25px;
                height: 25px;
              }
              p {
                margin-bottom: 0;
                font-weight: 700;
                color: white;
                &::before {
                  margin-right: 10px;
                  content: '·';
                  font-weight: 700;
                  color: white;
                }
              }
            }
          }
          .file_wrap {
            display: flex;
            flex-direction: column;
            .choose_btn {
              margin-bottom: 10px;
              @include choose_file_btn;
              &:hover {
                background: #3f608f;
              }
            }
          }
        }
        .content:nth-child(4) {
          border-radius: 10px;
          .input-group-prepend {
            width: 160px;
          }
          .input-group .form-control {
            width: 50%;
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
          }
          .send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          .send_btn_disabled {
            background: #878787;
            &:hover {
              background: #878787;
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
        text-align: center;
        margin-left: unset !important;
      }
      .swiper_section swiper-slide {
        img {
          width: 100%;
          height: auto;
          padding: 40px;
        }
      }
      h1 {
        margin-top: 80px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      h2 {
        margin-top: 50px;
        text-align: center;
        font-size: 35px;
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
            }
          }
          .selected_file {
            p.title {
              font-weight: 700;
              color: white;
              margin-bottom: 5px;
            }
            .file_upload_wrap {
              margin-bottom: 0;
              display: flex;
              img {
                width: 25px;
                height: 25px;
              }
              p {
                margin-bottom: 0;
                font-weight: 700;
                color: white;
                &::before {
                  margin-right: 10px;
                  content: '·';
                  font-weight: 700;
                  color: white;
                }
              }
            }
          }
          .file_wrap {
            display: flex;
            flex-direction: column;
            margin-left: unset !important;
            .choose_btn {
              margin-top: 5px;
              margin-bottom: 10px;
              @include choose_file_btn;
              &:hover {
                background: #3f608f;
              }
            }
          }
        }
        .content:nth-child(4) {
          border-radius: 10px
        }
        .button_wrap {
          display: flex;
          justify-content: space-between;
          margin: 30px auto 5%;
          width: 190px;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              width: 100px;
              &:hover {
                background-color: #5d85bb;
              }
            }
          }
          .send_btn {
            @include search_and_send_btn;
            width: 70px;
            padding: 5px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          .send_btn_disabled {
            background: #878787;
            width: 70px;
            padding: 5px;
            &:hover {
              background: #878787;
            }
          }
        }
      }
    }
  }
</style>