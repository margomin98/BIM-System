<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        審核作業
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
        <div class="row">
          <!-- 報廢人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                報廢人員：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly
                v-model="details.ScrapPerson">
            </div>
          </div>
          <!-- 交付日期 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                交付日期：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly
                v-model="details.DeliveryDate">
            </div>
          </div>
        </div>
        <!-- 資產編號 -->
        <div class="col-12">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              資產編號：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.AssetsId">
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col-12">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly
              v-model="details.AssetName">
          </div>
        </div>
        <!-- 報廢方式 -->
        <div v-show="Assets.Type === '耗材'" class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">報廢方式：</div>
            <div class="check_section d-flex">
              <template v-for="(item, index) in Scrap_TypeArray" :key="item">
                <div class="form-check d-flex align-items-center">
                  <input type="radio" :id="'no' + index" name="radio" :value="item" v-model="details.ConsumableScrap"
                    :disabled="details.ConsumableScrap !== item" />
                  <label :for="'no' + index">{{ item }}</label>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- scrap_hint -->
        <div v-show="Assets.Type === '耗材'" class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
            </div>
            <span v-if="details.ConsumableScrap == '歸還報廢'" class="scrap_hint">對已出庫耗材進行報廢處理</span>
            <span v-else-if="details.ConsumableScrap == '庫內報廢'" class="scrap_hint">對庫內耗材進行報廢處理(有庫存上限)</span>
          </div>
        </div>
        <!-- 報廢數量 -->
        <div v-show="Assets.Type === '耗材'" class="col-12">
          <div class="input-group  mb-3">
            <div class="input-group-prepend">報廢數量：</div>
            <div class="num_wrap d-flex ">
              <div class="number-input-box">
                <input class="input-number readonly_box" type="number" readonly v-model="details.ConsumableNum" />
                <span class="scrap_quantity">{{ Assets.Unit }}</span>
                <!-- <span class="scrap_quantity_storage">（總庫存量 {{ Assets.Max }}）</span> -->
              </div>
            </div>
          </div>
        </div>
        <!-- 報廢原因 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              報廢原因：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" readonly
              v-model="details.Reason"></textarea>
          </div>
        </div>
        <!-- 已上傳檔案 -->
        <div class="selected_file col">
          <div class="input-group mt-3">
            <div class="input-group-prepend">已上傳檔案：</div>
            <div class="d-flex  flex-column selected_file_wrap">
              <div v-for="(file, index) in details.existFile" :key="index" class="file_upload_wrap">
                <p class='file_name'>{{ file.FileName }}
                  <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;"
                    @click="viewImgFile(index, details, modalParams, 'exist')" data-bs-toggle="modal"
                    data-bs-target="#viewFile_modal">
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- ViewFile Modal -->
        <div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ modalParams.title }}</h5>
                <p data-bs-dismiss="modal" class='close_icon'>X</p>
              </div>
              <div class="modal-body">
                <img :src="modalParams.src" alt="Uploaded Image" class="w-100" />
              </div>
            </div>
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
                  <div class="modal-dialog modal-dialog-centered">
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
  canEnterPage,
  getDate,
  viewImgFile,
  goBack
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
  Scrap_Delete_Status,
  Scrap_Review_Status
} from '@/assets/js/enter_status';
import { Scrap_TypeArray } from '@/assets/js/dropdown';
import { getAssets } from '@/assets/js/common_api';
register();
export default {
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const ScrapId = route.query.search_id;
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
    const Assets = reactive({
      Name: '',
      Type: '',
      Status: '',
      Unit: '',
      Max: 1,
    });
    const modalParams = reactive({
      title: '',
      src: '',
    });
    onMounted(() => {
      getDetails();
      reviewDate.value = getDate();
    });
    // 取得單筆資料
    async function getDetails() {
      axios.get(`https://localhost:44302/GetDBdata/GetScrapInfo?s_id=${ScrapId}`)
        .then((response) => {
          const data = response.data;
          if (data.state === 'success') {
            canEnterPage(data.resultList.Status, Scrap_Review_Status)
            details.value = data.resultList;
            getAssets(details.value.AssetsId)
              .then((data) => {
                Assets.Type = data.AssetType;
                Assets.Unit = data.Unit;
                Assets.Max = data.Number;
              })
              .catch((error) => {
                console.error(error);
              })
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
      form.append('id', 'S_Verify')
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
        ScrapId: ScrapId,
        VerifyPerson: validation.resultName,
        VerifyResult: '',
      }
      requestData.VerifyResult = validation.result === 'true';
      axios.post('https://localhost:44302/ScrapMng/Verify', requestData)
        .then((response) => {
          const data = response.data
          if (data.state === 'success') {
            alert(data.messages + '\n單號為:' + data.resultList.S_ID);
            router.push({
              name: 'Scrap_Datagrid'
            });
          } else {
            alert(data.messages);
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
    return {
      details,
      reviewDate,
      validation,
      canSubmit,
      modalParams,
      Assets,
      Scrap_TypeArray,
      viewImgFile,
      validate,
      submit,
      goBack,
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


.input-number {
  @include count_btn;
}

.readonly_box {
  @include readonly_box;
}

.form-check-input {
  align-self: center;
}

.scrap_quantity,
.scrap_quantity_storage {
  font-size: 20px;
  color: white;
  font-weight: 700;
  margin-left: 10px;
}

.scrap_hint {
  font-weight: 700;
  color: #00438b;
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

.modal {
  .modal-body {
    padding: 20px;
  }

  .modal-content {
    margin: auto;
  }

  .modal-header {
    h5 {
      font-weight: 700;
    }

    background: #528091;
    color: white;
    display: flex;
    justify-content: center;
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

.file_name::before {
  margin-right: 5px;
  content: "·";
  font-weight: 700;
  color: white;
}

.selected_file {
  display: flex;
  align-items: center;

  .selected_file_wrap {
    flex-direction: column;

    .file_upload_wrap {
      margin-bottom: 0;
      display: flex;

      img {
        width: 25px;
        height: 25px;
      }

      p {
        font-weight: 700;
        margin-bottom: 5px;
        color: white;
        word-break: break-word;

        &::before {
          margin-right: 10px;
          content: "·";
          font-weight: 700;
          color: white;
        }
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

  .info_wrap {
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
        flex-wrap: nowrap;

        .form-control,
        .readonly_box {
          height: 37px;
        }

        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          white-space: nowrap;
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

          .input-group-prepend {
            font-weight: 800;
            align-content: center;
            font-size: 18px;
          }
        }

        button {
          @include auth_btn;

          &:hover {
            background: #5a6d87;
          }
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
          top: 10%;
          left: 89%;
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
              font-size: 20px;
            }
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
          width: 400px;
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
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .swiper_section {
      swiper-slide {
        align-self: baseline;
      }

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
            width: 120px;
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

          .form-control {
            width: 150px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .swiper_section {
      swiper-slide {
        align-self: baseline;
      }

      swiper-slide img {
        padding: 40px 0;
      }
    }

    .info_wrap {
      margin: 8px auto 5%;
      width: 700px;

      .content {
        .input-group {
          width: 100%;

          .num_wrap {
            .input-number {
              width: 50%;
            }

            .readonly_box {
              width: 100%;
            }

            .form-control {
              width: 65%;
            }

            .input-group-prepend {
              text-align: end;
              width: 108px;
            }
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

          .form-control {
            width: 150px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {

    .readonly_box,
    .input-group .num_wrap,
    .form-control {
      margin-left: unset !important;
    }

    .num_wrap .number-input-box,
    .form-control {
      width: 100%;
    }

    .swiper_section swiper-slide {
      img {
        padding: 40px;
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
        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset;
          border-radius: 5px;
          margin-top: 5px;
        }

        .input-group {
          flex-direction: column;

          .num_wrap {
            .number-input-box {
              .input-number {
                width: 20%;
              }
            }
          }

          .input-group-prepend {
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

          .form-control {
            margin-right: 5px;
          }

          .input-group-prepend {
            color: black;
          }
        }
      }
    }
  }
}
</style>