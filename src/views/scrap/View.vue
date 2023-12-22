<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        檢視報廢
      </h1>
    </div>
    <div class="info_wrap col">
      <!-- 報廢編號，申請人員，申請日期 -->
      <div class="fixed_info">
        <div>
          <p>
            報廢編號 : {{ details.ScrapId }}
          </p>
        </div>
        <div>
          <p>
            申請人員 : {{ details.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請日期 : {{ details.ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row g-0">
          <!-- 報廢人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                報廢人員：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.ScrapPerson">
            </div>
          </div>
          <!-- 交付日期 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                交付日期：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.DeliveryDate">
            </div>
          </div>
        </div>
        <div class="row g-0">
          <!-- 審核人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                審核人員：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.VerifyPerson">
            </div>
          </div>
          <!-- 審核結果 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                審核結果：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.VerifyResult">
            </div>
          </div>
        </div>
        <!-- 審核日期 -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group d-flex mb-3">
            <div class="input-group-prepend">
              審核日期：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.VerifyDate">
          </div>
        </div>
        <!--  資產編號 -->
        <div class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              資產編號：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.AssetsId">
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col-12">
          <div class="input-group" :class="{'mb-3': !wrongStatus}">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.AssetName">
          </div>
        </div>
        <!-- 報廢方式 -->
        <div class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">報廢方式：</div>
            <div class="check_section d-flex">
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no1" name="radio " value="歸還報廢" checked />
                <label for="no1">歸還報廢</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no2" name="radio" value="庫内報廢" />
                <label for="no2">庫内報廢</label>
              </div>
            </div>
          </div>
        </div>
        <!-- 報廢數量 -->
        <div class="col-12">
          <div class="input-group  mb-3">
            <div class="input-group-prepend">報廢數量：</div>
            <div class="num_wrap d-flex ">
              <div class="number-input-box">
                <input class="input-number readonly_box" type="number" readonly />
                <span class="scrap_quantity">條</span>
                <span class="scrap_quantity_storage">（總庫存量10000）</span>
              </div>
            </div>
          </div>
        </div>
        <!-- scrap_hint -->
        <div class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
            </div>
            <span class="scrap_hint">將已出庫使用之耗材進行報廢處理</span>
          </div>
        </div>
        <!-- 報廢原因 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              報廢原因：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" readonly v-model="details.Reason"></textarea>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ref,
    onMounted
  } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import router from '@/router';
  import {
    goBack
  } from '@/assets/js/common_fn.js'
  import axios from 'axios';
  import {
    useRoute
  } from 'vue-router';
  export default {
    components: {
      Navbar
    },
    setup() {
      const route = useRoute();
      const ScrapId = route.query.search_id;
      const details = ref({});
      onMounted(() => {
        getDetails()
      });
      async function getDetails() {
        axios.get(`http://192.168.0.177:7008/GetDBdata/GetScrapInfo?s_id=${ScrapId}`)
          .then((response) => {
            const data = response.data
            if (data.state === 'success') {
              details.value = data.resultList
            } else if (data.state === 'account_error') {
              alert(data.messages)
              router.push('/');
            } else {
              alert(data.messages)
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
      return {
        details,
        goBack,
      }
    },
  };
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .scrap_quantity,
  .scrap_quantity_storage {
    font-size: 20px;
    color: white;
    font-weight: 700;
    margin-left: 10px;
  }
  .scrap_hint {
    font-weight: 700;
    color: #00438B;
    font-size: 18px;
  }
  .check_section {
    gap: 10px;
    .form-check {
      gap: 5px;
      padding: 0;
      margin: 0;
      input {
        width: 15px;
        padding: 0;
        height: 15px;
        border-radius: 50%;
      }
      label {
        color: white;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  .main_section {
  .readonly_box {
    @include readonly_box;
  }
  h1 {
    margin-top: 100px;
    text-align: center;
    font-size: 55px;
    font-weight: 600;
    @include title_color;
  }
  .info_wrap {
    margin: 30px auto 5%;
    .button_wrap {
      display: flex;
      justify-content: center;
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
   
   
    }
  }
}
  @media only screen and (min-width: 1200px) {
    .main_section {

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
              span {
                @include red_star
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
        }
        .button_wrap {
          display: flex;
          justify-content: center;
          margin: 30px auto 5%;
          width: 220px;
      
          
        
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
   
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
            .num_wrap {
              .input-number {
                width: 50%;
                @include count_btn;
              }
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
              width: 110px;
              span {
                @include red_star
              }
            }
          }
          .repair_photo_section {
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
        }
        .button_wrap {
          display: flex;
          justify-content: center;
          margin: 30px auto 5%;
          width: 220px;
       
      
        
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        height: 35px;
        margin-left: unset !important;
      }
      h1 {
        margin-top: 80px;
        font-size: 40px;
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
          .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
            margin-left: unset;
            border-radius: 5px;
            margin-top: 5px;
            height: 35px;
          }
          .input-group {
            flex-direction: column;
            .num_wrap {
              margin-left: unset !important;
              .number-input-box {
                width: 100%;
                .input-number {
                  @include count_btn;
                  width: 20%;
                }
              }
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
        }
        .button_wrap {
          display: flex;
          justify-content: center;
          margin: 30px auto 5%;
          width: 200px;
     
       
        }
      }
    }
  }
</style>