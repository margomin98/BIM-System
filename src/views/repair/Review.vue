<template>
  <Navbar />
  <div class="main_section">
    <!-- 放大Swiper圖片 -->
    <div class="zoom_img_modal modal fade" id="zoomImg" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ previewParams.title }}</h5>
            <p data-bs-dismiss="modal" class='close_icon'>X</p>
          </div>
          <div class="modal-body">
            <img :src="previewParams.src" alt="Zoomed Image">
          </div>
        </div>
      </div>
    </div>
    <div class="title col">
      <h1>
        審核作業
      </h1>
    </div>
    <div class="info_wrap col">
      <!-- 維修編號，申請人員，申請日期 -->
      <div class="fixed_info">
        <div>
          <p>
            維修編號 : {{ details.RepairId }}
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
          <!-- 資產編號 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                資產編號：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly
                v-model="details.AssetsId">
            </div>
          </div>
          <!-- 物品名稱 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                物品名稱：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly
                v-model="details.AssetName">
            </div>
          </div>
        </div>
        <!-- 問題描述 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              問題描述：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box"
              readonly>{{ details.Question }}</textarea>
          </div>
        </div>
        <!-- 報修照片 -->
        <div class="col-12 repair_photo_section">
          <div class="input-group mt-3">
            <div class="input-group-prepend">報修照片：</div>
          </div>
          <swiper-container class="swiper_section" :autoHeight="true" :space-between="40" :pagination="pagination"
            :modules="modules"
            :breakpoints="{ 0: { slidesPerView: 1, }, 768: { slidesPerView: 3, }, 1200: { slidesPerView: 3, }, }">
            <swiper-slide v-for="(item, index) in details.existFile" :key="index">
              <img class="swiper_bottom_img" :src="item.FileLink">
              <button class='zoom_img' data-bs-toggle="modal" data-bs-target="#zoomImg" @click="handlePreview(item)">
                <img src="@/assets/zoom.png">
              </button>
            </swiper-slide>
          </swiper-container>
          <div class="swiper_pagination">
          </div>
        </div>
      </div>
      <div class='confirm_section'>
        <h2>
          審核簽章
        </h2>
        <div class='final'>
          <!-- 審核日期 -->
          <div class="fixed_info">
            <div>
              <p>審核日期 : {{ reviewDate }}</p>
            </div>
          </div>
          <div class="row auth g-0">
            <!-- 審核人員 -->
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 input-container">
              <div class="input-group">
                <div class="input-group-prepend">審核人員：</div>
                <div class="input-with-icon">
                  <input type="text" class="form-control readonly_box" readonly v-model="validation.resultName" />
                  <span v-show="validation.isValidate" class="icon-container">
                    <img src="@/assets/accept.png" class="checkmark-icon" />
                  </span>
                </div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop1">驗證</button>
                <!-- 驗證跳出Modal -->
                <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false"
                  tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                  <div class="modal-dialog modal-sm modal-dialog-centered">
                    <div class="modal-content ">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel1">審核人員驗證</h5>
                        <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
                      </div>
                      <div class="modal-body">
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">帳號：</div>
                            <input type="text" class="form-control" v-model="validation.account" />
                          </div>
                        </div>
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">密碼：</div>
                            <input type="password" class="form-control" v-model="validation.password" />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer m-auto">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                          @click="validate">驗證</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 審核結果 -->
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 input-container">
              <div class="input-group">
                <div class="input-group-prepend"><span class='red_star'>*</span>審核結果：</div>
                <div class="review_result d-flex">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="pass" id="pass" value="true"
                      v-model="validation.result">
                    <label class="form-check-label" for="pass">通過</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="fail" id="fail" value="false"
                      v-model="validation.result">
                    <label class="form-check-label" for="fail">不通過</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" :disabled="!canSubmit" :class="{ send_btn_disabled: !canSubmit }"
          @click="submit">送出</button>
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
import {
  useRoute
} from 'vue-router'
import {
  getDate,
  goBack,
  canEnterPage,
} from '@/assets/js/common_fn.js'
import Navbar from '@/components/Navbar.vue';
import axios from '@/axios/tokenInterceptor';
import router from '@/router';
import {
  register
} from 'swiper/element/bundle';
import {
  Pagination
} from 'swiper/modules';
import {
  Repair_Review_Status
} from '@/assets/js/enter_status';
register();
export default {
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const RepairId = route.query.search_id;;
    const details = ref({});
    const reviewDate = ref('');
    const canSubmit = ref(false);
    const validation = reactive({
      account: '',
      password: '',
      isValidate: false,
      resultName: '未驗證', //審核人員
      result: '', //審核結果
    });
    // Modal Params
    const previewParams = reactive({
      title: '',
      src: '',
    })
    onMounted(() => {
      getDetails();
      reviewDate.value = getDate();
    });
    // 取得單筆資料
    async function getDetails() {
      axios.get(`https://localhost:44302/GetDBdata/GetRepairInfo?r_id=${RepairId}`)
        .then((response) => {
          const data = response.data;
          if (data.state === 'success') {
            canEnterPage(data.resultList.Status, Repair_Review_Status)
            details.value = data.resultList;
          } else {
            alert(data.messages);
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
    async function validate() {
      const form = new FormData();
      form.append('userName', validation.account)
      form.append('userPassword', validation.password)
      form.append('id', 'R_Verify')
      axios.post('https://localhost:44302/Account/IdentityValidation', form)
        .then((response) => {
          const data = response.data;
          if (data.state === 'success') {
            validation.isValidate = true;
            validation.resultName = validation.account;
            canSubmit.value = true;
          } else {
            validation.isValidate = false;
            validation.resultName = '未驗證';
            canSubmit.value = false;
            alert(data.messages)
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
    async function submit() {
      if (!validation.result) {
        alert('請輸入必填項目');
      }
      var requestData = {
        RepairId: RepairId,
        VerifyPerson: validation.resultName,
        VerifyResult: '',
      }
      requestData.VerifyResult = validation.result === 'true';
      axios.post('https://localhost:44302/RepairMng/Verify', requestData)
        .then((response) => {
          const data = response.data
          if (data.state === 'success') {
            alert('維修單審核送出成功\n單號為:' + data.resultList.R_ID);
            router.push({
              name: 'Repair_Datagrid'
            });
          } else {
            alert(data.messages);
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
    function handlePreview(file) {
      previewParams.title = file.FileName;
      previewParams.src = file.FileLink;
    }
    return {
      details,
      reviewDate,
      validation,
      canSubmit,
      previewParams,
      validate,
      submit,
      goBack,
      handlePreview,
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


.readonly_box {
  @include readonly_box;
}

.input-number {
  @include count_btn;
}

.form-check-input {
  align-self: center;
}

.custom-slide {
  display: flex;
  align-self: center;
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;

  .back_btn {
    @include back_to_previous_btn;

    &:hover {
      background-color: #5d85bb;
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

.main_section {
  .swiper_section {
    swiper-slide img {
      width: 100%;
      height: auto;
    }
  }

  h2 {
    margin-top: 50px;
    text-align: center;
    font-size: 35px;
    font-weight: 600;
    @include title_color;
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

    .input-group {

      .form-control,
      .readonly_box {
        height: 37px;
        border-radius: 0;
      }

      .input-group-prepend {
        color: white;
        font-weight: 700;
        font-size: 20px;
      }
    }

  }

  .confirm_section {
    .auth {
      border-radius: 0 0 10px 10px;
      background: white;

      .input-group {
        display: flex;
        white-space: nowrap;
        flex-wrap: nowrap;
      }

      .form-control {
        margin-right: 5px;
      }

      .input-group-prepend {
        font-weight: 700;
        font-size: 20px;
        text-align: end;
        position: relative;

        span {
          position: absolute;
        }
      }

      span:nth-child(1) {
        left: -12%;
      }

      .input-container {
        position: relative;
        align-self: center;
      }

      .input-with-icon {
        position: relative;
      }

      .checkmark-icon {
        position: absolute;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
      }

      .review_result {
        gap: 0 10px;
        align-items: center;

        .form-check {
          display: flex;
          gap: 0 5px;
          margin-bottom: 0;

          .form-check-label {
            font-weight: 700;
          }
        }
      }

      button {
        @include auth_btn;

        &:hover {
          background: #5a6d87;
        }
      }
    }

    .modal {
      button {
        background: #506b91;
        border: none;
        font-weight: 700;
        font-size: 18px;

        &:hover {
          background: #6d92b3;
        }
      }

      .modal-body {
        padding: 16px 16px 0;
      }

      .modal-content {
        margin: auto;
      }

      .input-group-prepend {
        width: auto;
      }

      .modal-footer {
        padding: 0 12px 12px;
        border: none;
      }

      .modal-header {
        h5 {
          font-weight: 700;
        }

        background: #3d4e61;
        color: white;

        .close_icon {
          cursor: pointer;
        }
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .swiper_section {
      swiper-slide img {
        padding: 40px 0;
      }
    }

    .info_wrap {
      margin: 8px auto 5%;
      width: 750px;

      .content {
        .input-group {
          .input-group-prepend {
            text-align: end;
            width: 155px;
          }
        }
      }

      .confirm_section {
        .auth {
          height: 80px;
          padding: 20px;

          .input-group {
            justify-content: center;
          }

          .checkmark-icon {
            top: 10%;
            left: 89%;
          }

          .form-control {
            height: 35px;
            width: 150px;
          }

          .review_result {
            .form-check {
              .form-check-label {
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .swiper_section {
      swiper-slide img {
        padding: 40px 0;
      }
    }

    .info_wrap {
      margin: 8px auto 5%;
      padding: 0 5%;

      .content {
        .input-group {
          width: 100%;
          white-space: nowrap;
          flex-wrap: nowrap;

          .input-number,
          .readonly_box {
            width: 100%;
          }

          .form-control {
            width: 65%;
          }

          .input-group-prepend {
            text-align: end;
            width: 128px;
          }
        }
      }

      .confirm_section {
        .auth {
          height: 80px;
          padding: 20px;

          .input-group {
            justify-content: center;
          }

          .checkmark-icon {
            top: 10%;
            left: 89%;
          }

          .form-control {
            height: 35px;
            width: 150px;
          }

          .review_result {
            .form-check {
              .form-check-label {
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {

    .readonly_box,
    .input-number,
    .form-control,
    .modal {
      margin-left: unset !important;
    }

    .modal {
      modal-dialog {
        padding: unset !important
      }
    }

    .swiper_section {
      swiper-slide img {
        img {
          padding: 40px;
        }
      }
    }

    .info_wrap {
      padding: 0 5%;

      .fixed_info {
        height: unset;
        flex-direction: column;
        padding: 10px;
      }

      .content {
        .input-group {
          flex-direction: column;

          .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
            margin-left: unset;
            border-radius: 5px;
            margin-top: 5px;
            height: 35px;
          }

          .form-control {
            width: 100%;
          }

          .input-group-prepend {
            margin-bottom: 5px;
            width: 100px;
            white-space: nowrap;
          }
        }
      }

      .confirm_section {
        .auth {
          padding: 10px 20px;

          .input-group {
            justify-content: left;
            margin: 5px 0;
          }

          .checkmark-icon {
            top: 10%;
            left: 93%;
          }

          .review_result {
            .form-check {
              .form-check-label {
                font-size: 18px;
              }
            }
          }
        }
      }
    }
  }
}
</style>