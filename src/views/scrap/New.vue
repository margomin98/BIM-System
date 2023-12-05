<template>
  <Navbar/>
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
        <!-- 產編 -->
        <div class="col-12">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>產編：
            </div>
            <input ref="inputElement" type="text" class="form-control" placeholder="請掃描輸入產編" v-model="formParams.AssetsId">
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col-12">
          <div class="input-group" :class="{'mb-4': !wrongStatus}">
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
              <p >1</p>
            </div>
            <span style="color:rgb(216, 13, 13); font-weight: 700; font-size: 20px;">{{ alertMsg }}</span>
            <input type="text" style="visibility: hidden;" class="form-control">
          </div>
        </div>
        <!-- 報廢原因 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              報廢原因：
            </div>
            <textarea style="height: 200px;" class="form-control" placeholder="最多輸入500字" v-model="formParams.Reason"></textarea>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" :disabled="!canSubmit" :class="{send_btn_disabled: !canSubmit}" @click="submit">新增</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, reactive, watch} from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import router from '@/router';
  import { getDate , goBack } from '@/assets/js/common_fn.js'
  import { getApplication , getAssets } from '@/assets/js/common_api.js'
  import axios from 'axios';
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
        Reason: '',
      });
      const alertMsg = ref('');
      const wrongStatus = ref(false);
      const canSubmit = ref(false);
      onMounted(()=>{
        getApplicationInfo()
        ApplicationDate.value = getDate()
      });
      async function getApplicationInfo() {
        getApplication()
          .then((data)=>{
            Applicant.value = data;
          })
          .catch((error) =>{
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
        if (!/^[\s\S]{0,500}$/.test(formParams.Reason)) {
          alert('報廢原因不可超過500字');
          return
        }
        const form = new FormData();
        for(const key in formParams) {
          if(formParams[key]) {
            form.append(key , formParams[key]);
          }
        }
        const token = await GetAntiForgeryToken();
        axios.post('http://192.168.0.177:7008/ScrapMng/CreateOrder',form,{
          headers:{
            'RequestVerificationToken': token,
          }
        })
        .then((response)=>{
          const data = response.data;
          if(data.state === 'success') {
            alert('新增報廢單成功\n單號為:' + data.resultList.S_ID);
            router.push({ name: 'Scrap_Datagrid' });
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
          else {
            alert('新增報廢單失敗')
          }
        })
        .catch((error)=>{
          console.error(error);
        })
      }
      watch(()=>formParams.AssetsId, (newValue , oldValue) => {
        getAssets(newValue)
        .then((data)=>{
            Assets.Name = data.AssetName;
            Assets.Type = data.AssetType;
            Assets.Status = data.Status;

            // 檢查資產類型
            if(Assets.Type === '耗材') {
              wrongStatus.value = true;
              canSubmit.value = false;
              alertMsg.value = '僅提供資產類型為非耗材的物品進行報廢'
            }
            else {
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
                case '出貨':
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
          .catch((error) =>{
            wrongStatus.value = true;
            canSubmit.value = false;
            Assets.Name = '';
            alertMsg.value = '請輸入正確的資產編號'
          })
      },{immediate: false});
      return {
        Applicant,
        ApplicationDate,
        Assets,
        alertMsg,
        wrongStatus,
        canSubmit,
        formParams,
        submit,
        goBack,
      }
    },
  };
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  @media only screen and (min-width: 1200px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      .form_search_btn {
        @include form_search_btn;
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
      .form_search_btn {
        @include form_search_btn;
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