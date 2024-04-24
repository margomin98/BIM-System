<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        新增報廢單
      </h1>
    </div>
    <div class="info_wrap col">
      <!-- 申請人員，申請日期 -->
      <div class="fixed_info">
        <div>
          <p>
            申請人員 : {{ Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請日期 : {{ ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <!-- 資產編號 -->
        <div class="col-12">
          <div class="input-group">
            <div class="input-group-prepend">
              <span>*</span>資產編號：
            </div>
            <input ref="inputElement" type="text" class="form-control" placeholder="請掃描輸入資產編號"
              v-model="formParams.AssetsId">
          </div>
        </div>
        <!-- Error Hint -->
        <div v-show="wrongStatus || Assets.Type === '耗材'" class="col-12 error_hint">
          <div class="input-group">
            <div style="visibility: hidden;" class="input-group-prepend">
              <p>1</p>
            </div>
            <span v-if="Assets.Type === '耗材'" class="scrap_hint">此資產為耗材</span>
            <span v-else-if="wrongStatus" class="scrap_error">{{ alertMsg }}</span>
            <input type="text" style="visibility: hidden;" class="form-control">
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col-12">
          <div class="input-group" :class="{ '': !wrongStatus }">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="Assets.Name">
          </div>
        </div>
        <!-- 報廢方式 -->
        <div v-show="Assets.Type === '耗材'" class="col-12">
          <div class="input-group">
            <div class="input-group-prepend"><span>*</span>報廢方式：</div>
            <div class="check_section d-flex">
              <template v-for="(item, index) in Scrap_TypeArray" :key="item">
                <div class="form-check d-flex align-items-center">
                  <input type="radio" :id="'no' + index" name="radio" :value="item"
                    v-model="formParams.ConsumableScrap" />
                  <label :for="'no' + index">{{ item }}</label>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- scrap_hint -->
        <div v-show="formParams.ConsumableScrap && Assets.Type === '耗材'" class="col-12">
          <div class="input-group">
            <div class="input-group-prepend"></div>
            <span v-if="formParams.ConsumableScrap == '歸還報廢'" class="scrap_hint">對已出庫耗材進行報廢處理</span>
            <span v-else-if="formParams.ConsumableScrap == '庫內報廢' && !wrongStatus"
              class="scrap_hint">對庫內耗材進行報廢處理(有庫存上限)</span>
            <span v-else-if="formParams.ConsumableScrap == '庫內報廢' && wrongStatus"
              class="scrap_error">無庫存耗材不可進行庫內報廢</span>
          </div>
        </div>
        <!-- 報廢數量 -->
        <div v-show="Assets.Type === '耗材'" class="col-12">
          <div class="input-group">
            <div class="input-group-prepend"><span>*</span>報廢數量：</div>
            <div class="num_wrap d-flex ">
              <div class="number-input-box">
                <input v-if="formParams.ConsumableScrap !== '庫內報廢'" class="input-number scrap_input_length"
                  type="number" min="1" v-model="formParams.ConsumableNum" />
                <input v-else class="input-number scrap_input_length" type="number" min="1"
                  v-model="formParams.ConsumableNum" :max="Assets.Max" />
                <span class="scrap_quantity">{{ Assets.Unit }}</span>
                <span v-if="formParams.ConsumableScrap === '庫內報廢'" class="scrap_quantity_storage">（總庫存量: {{ Assets.Max
                  }}）</span>
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
            <textarea style="height: 200px;" class="form-control" placeholder="最多輸入500字"
              v-model="formParams.Reason"></textarea>
          </div>
        </div>
        <!-- 報廢照片 -->
        <div class="col-12 repair_photo_section">
          <div class="input-group">
            <div class="input-group-prepend">照片上傳：</div>
            <div class=" file_wrap">
              <button class="choose_btn" @click="openFileExplorer(fileInputs)">選擇檔案</button>
              <input type="file" ref="fileInputs" accept="image/*" multiple style="display: none;"
                @change="handleFileChange($event, formParams)">
            </div>
          </div>
        </div>
        <!-- 已選擇的檔案 -->
        <div class="col selected_file">
          <div class="input-group">
            <div class="input-group-prepend">已選擇檔案：</div>
            <div class="selected_file col">
              <div class="pt-2">
                <div class="file_upload_box">
                  <div v-for="(item, index) in formParams.viewFile" :key="index" class="file_upload_wrap">
                    <p class='file_name'>{{ item.FileName }}
                      <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;"
                        @click="viewImgFile(index, formParams, modalParams, 'new')" data-bs-toggle="modal"
                        data-bs-target="#viewFile_modal">
                      <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;"
                        @click="deleteFile(index, formParams, 'new')">
                    </p>
                  </div>
                </div>
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

      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" :disabled="!canSubmit" :class="{ send_btn_disabled: !canSubmit }"
          @click="submit">新增</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  reactive,
  watch
} from 'vue';
import Navbar from '@/components/Navbar.vue';
import router from '@/router';
import {
  getDate,
  goBack,
  handleFileChange,
  viewImgFile,
  openFileExplorer,
  deleteFile
} from '@/assets/js/common_fn.js'
import {
  getApplication,
  getAssets,
} from '@/assets/js/common_api.js'
import axios from 'axios';
import {
  Scrap_TypeArray
} from '@/assets/js/dropdown';
export default {
  components: {
    Navbar
  },
  setup() {
    const Applicant = ref('');
    const ApplicationDate = ref('');
    const Assets = reactive({
      Name: '',
      Type: '',
      Status: '',
      Unit: '',
      Max: 1,
    });
    const formParams = reactive({
      AssetsId: '',
      Reason: '',
      newFile: [],
      viewFile: [],
      ConsumableScrap: '',
      ConsumableNum: 1,
    });
    const alertMsg = ref('');
    const wrongStatus = ref(false);
    const canSubmit = ref(false);
    const fileInputs = ref(null);
    const modalParams = reactive({
      title: '',
      src: '',
    });
    onMounted(() => {
      getApplicationInfo()
      ApplicationDate.value = getDate()
    });
    async function getApplicationInfo() {
      getApplication()
        .then((data) => {
          Applicant.value = data;
        })
        .catch((error) => {
          console.error(error);
        })
    }
    async function submit() {
      const pattern = /^(BF\d{8})$/;
      // 檢查必填項目、格式        
      if (!formParams.AssetsId) {
        alert('請輸入必填項目');
        return
      }
      if (Assets.Type === '耗材') {
        if (!formParams.ConsumableScrap || !formParams.ConsumableNum) {
          alert('請輸入必填項目');
          return
        }
        if (formParams.ConsumableScrap === '庫內報廢') {
          if (formParams.ConsumableNum > Assets.Max) {
            alert('報廢數量超過庫存上限');
            return
          }
        }
      }
      if (!pattern.test(formParams.AssetsId)) {
        alert('資產編號格式錯誤');
        return
      }
      if (!/^[\s\S]{0,500}$/.test(formParams.Reason)) {
        alert('報廢原因不可超過500字');
        return
      }
      const form = new FormData();
      for (const key in formParams) {
        if (formParams[key]) {
          form.append(key, formParams[key]);
        }
      }
      // 移除viewFile
      form.delete('viewFile');
      // newFile額外append
      form.delete('newFile');
      for (let i = 0; i < formParams.newFile.length; i++) {
        form.append('newFile', formParams.newFile[i]);
      }
      axios.post('http://192.168.0.177:7008/ScrapMng/CreateOrder', form)
        .then((response) => {
          const data = response.data;
          if (data.state === 'success') {
            alert('新增報廢單成功\n單號為:' + data.resultList.S_ID);
            router.push({
              name: 'Scrap_Datagrid'
            });
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          } else {
            alert('新增報廢單失敗')
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
    watch(() => formParams.AssetsId, (newValue, oldValue) => {
      getAssets(newValue)
        .then((data) => {
          Assets.Name = data.AssetName;
          Assets.Type = data.AssetType;
          Assets.Status = data.Status;
          Assets.Unit = data.Unit;
          Assets.Max = data.Number;
          // 檢查資產類型
          formParams.ConsumableScrap = '';
          formParams.ConsumableNum = 1;
          if (Assets.Type === '耗材') {
            wrongStatus.value = false;
            canSubmit.value = true;
            alertMsg.value = '';
            Assets.Max = data.ScrapNum; // 耗材數量上限要將 "存貨"與 "非存貨" 分開，只能報廢非存貨數量上限 (data.Number為兩者相加)
          } else {
            // 檢查資產狀態(只有非耗材才會檢查)
            const Status = Assets.Status
            const Type = Assets.Type
            wrongStatus.value = true;
            canSubmit.value = false;
            switch (Status) {
              case '已被設備整合':
                alertMsg.value = `此${Type}已被設備整合，請先移出設備箱`
                break;
              case '維修':
                alertMsg.value = `此${Type}已送修`
                break;
              case '報廢':
                alertMsg.value = `此${Type}已${Status}`
                break;
              case '退貨':
                alertMsg.value = `此${Type}已${Status}`
                break;
              default: // 可報修
                wrongStatus.value = false;
                canSubmit.value = true;
                alertMsg.value = ''
                break;
            }
          }
        })
        .catch((error) => {
          wrongStatus.value = true;
          canSubmit.value = false;
          Assets.Name = '';
          Assets.Type = '';
          alertMsg.value = '請輸入正確的資產編號'
        })
    }, {
      immediate: false
    });
    watch(() => formParams.ConsumableScrap, (newValue, oldValue) => {
      formParams.ConsumableNum = 1;
      if (newValue == '庫內報廢') {
        if (Assets.Max == 0) {
          wrongStatus.value = true;
          canSubmit.value = false;
        }
      } else {
        wrongStatus.value = false;
        canSubmit.value = true;
      }
    });
    return {
      Applicant,
      ApplicationDate,
      Assets,
      alertMsg,
      Scrap_TypeArray,
      wrongStatus,
      canSubmit,
      formParams,
      fileInputs,
      modalParams,
      submit,
      goBack,
      handleFileChange,
      viewImgFile,
      deleteFile,
      openFileExplorer,
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
  color: #00438b;
  font-size: 18px;
}

.scrap_error {
  font-weight: 700;
  color: #d80d0d;
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
    margin: auto;
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
  p {
    margin-bottom: 5px;
    font-weight: 700;
    color: white;
  }

  .input-group {
    padding-bottom: 2% !important;
    border-radius: 0 0 10px 10px;
  }

  .file_upload_box {
    .file_upload_wrap {
      margin-bottom: 0;
      display: flex;
      word-break: break-word;

      img {
        width: 25px;
        height: 25px;
      }
    }
  }
}

.readonly_box {
  @include readonly_box;
}

.form_search_btn {
  @include form_search_btn;
}

.input-number {
  @include count_btn;
}

span {
  @include red_star;
}

.main_section {
  .scrap_input_length {
    width: 200px;
  }

  .info_wrap {
    margin: 8px auto 5%;

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    .content {
      .input-group {
        background: rgba(82, 136, 156, 0.8);
        padding: 20px 20px 0;

        .form-control,
        .readonly_box {
          height: 35px;
          border-radius: 0;
        }

        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
        }

        /* .selected_file {
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
    } */
      }
    }

    .button_wrap {
      display: flex;
      justify-content: space-between;
      margin: 30px auto 5%;
      width: 210px;
    }

    .back_btn {
      @include back_to_previous_btn;

      &:hover {
        background-color: #5d85bb;
      }
    }

    .send_btn {
      @include search_and_send_btn;

      &:hover {
        background-color: #5d85bd;
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

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      width: 750px;

      .content {
        .input-group {
          .input-group-prepend {
            text-align: end;
            width: 155px;
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
                  content: "·";
                  font-weight: 700;
                  color: white;
                }
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
    .info_wrap {
      width: 700px;

      .content {
        .input-group {
          .num_wrap {
            .input-number {
              width: 50%;
            }
          }

          .readonly_box {
            width: 100%;
          }

          .form-control {
            width: 65%;
          }

          .input-group-prepend {
            text-align: end;
            width: 150px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .error_hint .input-group {

      .input-group-prepend,
      .form-control {
        display: none;
      }

      span {
        margin-left: 0;
        margin-bottom: 16px;
      }
    }

    .readonly_box {
      margin-left: unset !important;
    }

    .form_search_btn {
      border: none;
      color: white;
      width: 60px;
      height: 35px;
      margin-left: unset !important;
      margin-top: 10px;
      font-weight: 700;
      padding: 0 10px;
      background-color: #132238;

      &:hover {
        background-color: #43546d;
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
            margin-left: unset !important;

            .number-input-box {
              width: 100%;

              .input-number {
                width: 20%;
              }
            }
          }

          .form-control {
            width: 100%;
            margin-left: unset !important;
          }

          .input-group-prepend {
            width: 100px;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>