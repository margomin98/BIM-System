<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        新增報修單
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
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>資產編號：
            </div>
            <input ref="inputElement" type="text" class="form-control" placeholder="請掃描輸入產編"
              v-model="formParams.AssetsId">
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col-12">
          <div class="input-group" :class="{ 'mb-4': !wrongStatus }">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="Assets.Name">
          </div>
        </div>
        <!-- Error Hint -->
        <div v-show="wrongStatus" class="col-12">
          <div class="input-group">
            <div style="visibility: hidden;" class="input-group-prepend">
              <p>1</p>
            </div>
            <span style="color:rgb(216, 13, 13); font-weight: 700; font-size: 20px;">{{ alertMsg }}</span>
            <input type="text" style="visibility: hidden;" class="form-control">
          </div>
        </div>
        <!-- 問題描述 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              問題描述：
            </div>
            <textarea style="height: 200px;" class="form-control" placeholder="最多輸入500字"
              v-model="formParams.Question"></textarea>
          </div>
        </div>
        <!-- 報修照片上傳 -->
        <div class="col-12 repair_photo_section">
          <div class="input-group mt-3">
            <div class="input-group-prepend">報修照片上傳：</div>
            <div class="mb-3 file_wrap">
              <button class="choose_btn" @click="openFileExplorer()">選擇檔案</button>
              <input type="file" ref="fileInputs" accept="image/*" multiple style="display: none;"
                @change="handleFileChange($event)">
            </div>
          </div>
        </div>
        <!-- 已選擇的檔案 -->
        <div class="col-12 selected_file">
          <div class="input-group">
            <div class="input-group-prepend">已選擇的檔案：</div>
            <div class="file_upload_box">
              <div v-for="(item, index) in formParams.viewFile" :key="index" class="file_upload_wrap">
                <p>{{ item.FileName }}
                  <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="viewImgFile(index)"
                    data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                  <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;"
                    @click="deleteFile(index)">
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
          @click="submit">新增</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  reactive,
  ref,
  watch
} from 'vue';
import Navbar from '@/components/Navbar.vue';
import router from '@/router';
import {
  getDate,
  goBack,
  checkFileSize,
} from '@/assets/js/common_fn.js'
import {
  getApplication,
  getAssets
} from '@/assets/js/common_api.js'
import axios from 'axios'
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
    });
    const formParams = reactive({
      AssetsId: '',
      Question: '',
      newFile: [],
      viewFile: [], //不需要傳
    });
    const modalParams = reactive({
      title: '',
      src: '',
    })
    const alertMsg = ref('');
    const wrongStatus = ref(false);
    const canSubmit = ref(false);
    const fileInputs = ref(null);
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
      if (!pattern.test(formParams.AssetsId)) {
        alert('資產編號格式錯誤');
        return
      }
      if (!/^[\s\S]{0,500}$/.test(formParams.Question)) {
        alert('問題描述不可超過500字');
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
      axios.post('http://192.168.0.117:7008/RepairMng/CreateOrder', form)
        .then((response) => {
          const data = response.data;
          if (data.state === 'success') {
            alert('新增報修單成功\n單號為:' + data.resultList.R_ID);
            router.push({
              name: 'Repair_Datagrid'
            });
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          } else {
            alert('新增報修單失敗')
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
    const openFileExplorer = (() => {
      fileInputs.value.click();
    });
    const handleFileChange = ((event) => {
      const files = event.target.files;
      const imageExtensions = ['jpg', 'jpeg', 'png'];
      //檢查檔名
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
        if (!imageExtensions.includes(fileExtension.toLowerCase())) {
          alert(fileExtension + '不在允許的格式範圍內，請重新選取');
          return;
        }
      }
      //圖片總數量不超過五張
      if (formParams.newFile.length + files.length > 5) {
        alert('上傳至多5張圖片');
        return;
      }
      // 檢查圖片大小
      if (!checkFileSize(files, formParams.newFile)) {
        return
      }
      console.log(event.target.files);
      // 压缩并处理图像
      const imgArray = formParams.newFile;
      const previewUrl = formParams.viewFile;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const file = files[i]; // 保持原始文件
          imgArray.push(file);
          previewUrl.push({
            FileName: file.name,
            FileLink: URL.createObjectURL(file),
          });
        };
        reader.readAsDataURL(files[i]);
      }
      // console.log(formData[index].previewUrl);
    });
    const deleteFile = ((index) => {
      formParams.newFile.splice(index, 1);
      formParams.viewFile.splice(index, 1);
    });
    const viewImgFile = ((index) => {
      modalParams.title = formParams.viewFile[index].FileName;
      modalParams.src = formParams.viewFile[index].FileLink;
    });
    // 監聽formParams.AssetsId(資產編號)的數值變動 -> 搜尋
    watch(() => formParams.AssetsId, (newValue, oldValue) => {
      getAssets(newValue)
        .then((data) => {
          Assets.Name = data.AssetName;
          Assets.Type = data.AssetType;
          Assets.Status = data.Status;
          // 檢查資產類型
          if (Assets.Type === '耗材') {
            wrongStatus.value = true;
            canSubmit.value = false;
            alertMsg.value = '僅提供資產類型為非耗材的物品進行維修'
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
          alertMsg.value = '請輸入正確的資產編號'
        })
    }, {
      immediate: false
    });
    return {
      Applicant,
      ApplicationDate,
      Assets,
      formParams,
      modalParams,
      alertMsg,
      wrongStatus,
      canSubmit,
      fileInputs,
      submit,
      openFileExplorer,
      handleFileChange,
      deleteFile,
      viewImgFile,
      goBack,
    }
  },
};
</script>


<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.view_icon,
.trash_icon {
  cursor: pointer;
}

.modal {
  .modal-body {
    padding: 20px;
    margin: auto;
  }

  .modal-content {
    margin: auto;
  }

  .modal-input-group-prepend {
    width: auto;
    font-weight: 700;
    font-size: 20px;
  }

  .modal-footer {
    padding: 0 12px 12px;
    border: none;
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
  .info_wrap {
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
          width: 140px;
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

    .selected_file {
      .file_upload_box {
        .file_upload_wrap {
          margin-bottom: 0;
          display: flex;
          word-break: break-word;

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

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      margin: 8px auto 5%;
      width: 800px;

      .content {
        .input-group {
          .input-group-prepend {
            text-align: end;
            width: 140px;
          }
        }
      }

      .selected_file {
        .input-group {
          flex-wrap: unset;
        }

        .input-group-prepend {
          white-space: nowrap;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      margin: 8px auto 5%;
      width: 750px;

      .content {
        .input-group {

          .readonly_box,
          .input-number {
            width: 100%;
          }

          .form-control {
            width: 65%;
          }

          .input-group-prepend {
            text-align: end;
            width: 140px;
          }
        }
      }

      .selected_file {
        .input-group {
          flex-wrap: unset;
        }

        .input-group-prepend {
          white-space: nowrap;
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
    .file_wrap {
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

          .file_wrap {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>