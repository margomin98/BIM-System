<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        編輯報廢
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
        <!-- 資產編號 -->
        <div class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class='red_star'>*</span>資產編號：
            </div>
            <input ref="inputElement" type="text" class="form-control" placeholder="請掃描輸入產編"
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
          <div class="input-group mb-3" :class="{ '': !wrongStatus }">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="Assets.Name">
          </div>
        </div>
        <!-- 報廢方式 -->
        <div v-show="Assets.Type === '耗材'" class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span class='red_star'>*</span>報廢方式：</div>
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
          <div class="input-group mb-3">
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
          <div class="input-group  mb-3">
            <div class="input-group-prepend"><span class='red_star'>*</span>報廢數量：</div>
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
          <div class="input-group mt-3">
            <div class="input-group-prepend">照片上傳：</div>
            <div class="mb-3 file_wrap">
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
            <div class="selected_file_wrap">
              <div v-for="(item, index) in formParams.viewFile" :key="index" class="file_upload_wrap">
                <p>{{ item.FileName }}
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
        <!-- 已上傳檔案 -->
        <div class="selected_file col-12">
          <div class="input-group mt-3">
            <div class="input-group-prepend">已上傳檔案：</div>
            <div class="d-flex  flex-column">
              <div v-for="(file, index) in formParams.existFile" :key="index" class="file_upload_wrap">
                <p class='file_name'>{{ file.FileName }}
                  <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;"
                    @click="viewImgFile(index, formParams, modalParams, 'exist')" data-bs-toggle="modal"
                    data-bs-target="#viewFile_modal">
                  <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;"
                    @click="deleteFile(index, formParams, 'exist')">
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
  reactive,
  watch
} from 'vue';
import Navbar from '@/components/Navbar.vue';
import router from '@/router';
import {
  canEnterPage,
  goBack,
  handleFileChange,
  viewImgFile,
  deleteFile,
  openFileExplorer,
} from '@/assets/js/common_fn.js'
import { getAssets } from '@/assets/js/common_api.js'
import axios from '@/axios/tokenInterceptor';
import {
  useRoute
} from 'vue-router';
import {
  Scrap_Edit_Status
} from '@/assets/js/enter_status';
import {
  Scrap_TypeArray
} from '@/assets/js/dropdown';
export default {
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const ScrapId = route.query.search_id;
    const startWaching = ref(0); // 必須讓2個watch都跑一遍後才開始監聽(value >=2)，否則ConsumableNum會被覆蓋
    const details = ref({});
    const Assets = reactive({
      Name: '',
      Type: '',
      Status: '',
      Unit: '',
      Max: 1,
    });
    const formParams = reactive({
      ScrapId: ScrapId,
      AssetsId: '',
      Reason: '',
      newFile: [],
      viewFile: [],
      existFile: [],
      deleteFile: [],
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
      getDetails()
    });
    async function getDetails() {
      axios.get(`https://localhost:44302/GetDBdata/GetScrapInfo?s_id=${ScrapId}`)
        .then((response) => {
          const data = response.data
          if (data.state === 'success') {
            canEnterPage(data.resultList.Status, Scrap_Edit_Status)
            details.value = data.resultList
            for (const key in details.value) {
              if (formParams.hasOwnProperty(key) && details.value[key]) {
                formParams[key] = details.value[key]
              }
            }
          } else {
            alert(data.messages)
          }
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
      // 移除viewFile、existFile
      form.delete('viewFile');
      form.delete('existFile');
      // newFile額外append
      form.delete('newFile');
      for (let i = 0; i < formParams.newFile.length; i++) {
        form.append('newFile', formParams.newFile[i]);
      }
      // deleteFile額外append
      form.delete('deleteFile');
      for (let i = 0; i < formParams.deleteFile.length; i++) {
        form.append('deleteFile', formParams.deleteFile[i]);
      }
      axios.post('https://localhost:44302/ScrapMng/ScrapEdit', form)
        .then((response) => {
          const data = response.data;
          if (data.state === 'success') {
            alert(data.messages + '\n單號為:' + data.resultList.S_ID);
            router.push({
              name: 'Scrap_Datagrid'
            });
          } else {
            alert(data.messages)
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
          if (startWaching.value >= 2) {
            formParams.ConsumableScrap = '';
            formParams.ConsumableNum = 1;
          } else {
            startWaching.value++;
          }
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
      if (startWaching.value >= 2) {
        formParams.ConsumableNum = 1;
      } else {
        startWaching.value++;
      }
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
      details,
      Assets,
      alertMsg,
      wrongStatus,
      canSubmit,
      formParams,
      fileInputs,
      modalParams,
      Scrap_TypeArray,
      submit,
      handleFileChange,
      viewImgFile,
      deleteFile,
      openFileExplorer,
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

.scrap_error,
.scrap_hin {
  font-weight: 700;
  font-size: 18px;
}

.scrap_hint {
  color: #00438b;
}

.scrap_error {
  color: #d80d0d;
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
          content: '·';
          font-weight: 700;
          color: white;
        }
      }
    }
  }
}


.readonly_box {
  @include readonly_box;
}

.input-number {
  @include count_btn;
}

.main_section {
  .scrap_input_length {
    width: 200px;
  }

  .info_wrap {
    margin: 8px auto 5%;

    .content {
      @include content_bg;

      .input-group {
        flex-wrap: nowrap;
      }

      .form-control,
      .readonly_box {
        height: 37px;
        border-radius: 0;
      }

      .input-group-prepend {
        color: white;
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
      }
    }

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
        margin-bottom: 0;
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

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      width: 800px;

      .content {
        .input-group {

          .form-control {
            border-radius: 0;
          }

          .input-group-prepend {
            text-align: end;
            width: 120px;
          }

        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      width: 750px;

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
            width: 120px;
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
        margin-bottom: 10px;
      }
    }

    .readonly_box {
      margin-left: unset !important;
    }

    .info_wrap {
      padding: 0 5%;

      .button_wrap {
        width: 200px;
      }

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

          .file_wrap {
            flex-direction: column;
            margin-left: unset !important;
          }
        }
      }

      .button_wrap {
        button {
          &:nth-child(1) {
            width: 100px;
          }
        }

        .send_btn,
        .send_btn_disabled {
          width: 70px;
          padding: 5px;
        }
      }
    }
  }
}
</style>