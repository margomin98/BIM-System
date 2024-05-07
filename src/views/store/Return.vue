<template>
  <Navbar />
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
            申請人員 : {{ Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請入庫日期 : {{ ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="col-12">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>資產編號：
            </div>
            <input ref="inputElement" type="text" class="form-control" placeholder="請輸入資產編號"
              v-model="formParams.AssetsId">
          </div>
        </div>
        <div class="col-12">
          <div class="input-group" :class="{ 'mb-4': !wrongStatus }">
            <div class="input-group-prepend">
              資產狀態：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" v-model="formParams.Status"
              readonly>
          </div>
        </div>
        <div v-show="wrongStatus" class="col-12">
          <div class="input-group">
            <div style="visibility: hidden;" class="input-group-prepend">
              <p>1</p>
            </div>
            <span style="color:rgb(216, 13, 13); font-weight: 700; font-size: 20px;">{{ alertMsg }}</span>
            <input type="text" style="visibility: hidden;" class="form-control">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>數量：
              </div>
              <input class="input-number " type="number" v-model="formParams.Count" min="1" :readonly="!canEdit"
                :class="{ readonly_box: !canEdit }" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                單位：
              </div>
              <input type="text" class=" readonly_box" readonly v-model="formParams.Unit">
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              備註：
            </div>
            <textarea style="height: 200px;" class="form-control" placeholder="最多輸入500字"
              v-model="formParams.Memo"></textarea>
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
import axios from 'axios';
export default {
  components: {
    Navbar
  },
  setup() {
    const count = ref(1);
    const incrementing = ref(true);
    const inputElement = ref(null);
    const Applicant = ref('');
    const ApplicationDate = ref('');
    const canSubmit = ref(false);
    const canEdit = ref(true);
    const wrongStatus = ref(false);
    const alertMsg = ref('');
    const formParams = reactive({
      Status: '',
      AssetsId: '',
      Count: 1,
      Unit: '',
      Memo: '',
    });
    onMounted(() => {
      // Focus the input element when the component is mounted
      inputElement.value.focus();
      getApplicationInfo();
      ApplicationDate.value = getDate();
    });
    function getDate() {
      const today = new Date();
      var date = '';
      date += (today.getFullYear() + '/');
      date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
      date += ((today.getDate()).toString().padStart(2, '0'));
      return date;
    }
    async function getApplicationInfo() {
      try {
        const response = await axios.get('http://192.168.0.117:7008/GetDBdata/GetApplicant');
        const data = response.data;
        if (data.state === 'success') {
          console.log('申請人名稱:', data.resultList.Applicant);
          if (data.resultList.Applicant) {
            Applicant.value = data.resultList.Applicant;
          }
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
    async function submit() {
      try {
        // 檢查必填 & 限制項目
        if (!formParams.AssetsId || formParams.Count < 1) {
          alert('請輸入必填項目')
          return
        }
        if (formParams.Memo && !/^.{1,500}$/.test(formParams.Memo)) {
          alert('備註不可輸入超過500字');
          return
        }
        const requestData = {
          AssetsId: formParams.AssetsId,
          Count: formParams.Count,
          Memo: formParams.Memo,
        };
        const response = await axios.post('http://192.168.0.117:7008/AssetsInMng/OldAssetsIn', requestData);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          let msg = data.messages;
          msg += '\n單號:' + data.resultList.AI_ID;
          alert(msg);
          router.push({
            name: 'Store_Datagrid'
          });
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
    watch(() => formParams.AssetsId, async (newValue, oldValue) => {
      try {
        const response = await axios.get(`http://192.168.0.117:7008/GetDBdata/GetAssetInfo?id=${newValue}`);
        const data = response.data;
        if (data.state === 'success') {
          console.log('資產資料', data.resultList);
          formParams.Unit = data.resultList.Unit;
          formParams.Status = data.resultList.Status;
          // 如為非耗材 1.資產數量為一，且不可更改 2.Status不對，不能提交
          if (data.resultList.AssetType !== '耗材') {
            // 1.
            canEdit.value = false;
            formParams.Count = 1;
            // 2.
            wrongStatus.value = true;
            canSubmit.value = false;
            switch (data.resultList.Status) {
              case '在庫':
                alertMsg.value = '此資產已在庫，無法重複歸還。'
                break;
              case '報廢':
                alertMsg.value = '此資產已被報廢，無法進行歸還作業。'
                break;
              case '已被設備整合':
                alertMsg.value = '此資產已被整合進設備整合箱，無法進行歸還作業。'
                break;
              default:
                canSubmit.value = true;
                wrongStatus.value = false;
                break;
            }
          }
          //如為耗材
          else {
            canSubmit.value = true;
          }
        } else if (data.state === 'error') {
          console.log(data.messages);
          canEdit.value = true;
          canSubmit.value = false;
          wrongStatus.value = false;
          formParams.Unit = '';
          formParams.Status = '';
        } else if (data.state === 'account_error') {
          formParams.Unit = '';
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    }, {
      immediate: false
    });
    const goBack = () => {
      window.history.back();
    };
    // Expose variables and functions to the template
    return {
      count,
      incrementing,
      inputElement,
      Applicant,
      ApplicationDate,
      canSubmit,
      canEdit,
      wrongStatus,
      alertMsg,
      formParams,
      submit,
      getDate,
      goBack,
    };
  }
};
</script>


<style lang="scss" scoped>
@import '@/assets/css/global.scss';

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

.readonly_box {
  @include readonly_box;
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

      .readonly_box,
      .form-control {
        width: 100%;
        height: 35px;
      }

      .input-group-prepend {
        color: white;
        font-weight: 700;
        font-size: 20px;
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      margin: 8px auto 5%;
      width: 750px;

      .content {
        .input-group {
          justify-content: end;
          flex-wrap: nowrap;

          .input-number {
            width: 75%;
          }

          .readonly_box {
            height: 37px;
          }

          .form-control {
            height: 37px;
            border-radius: 0;
          }

          .input-group-prepend {
            text-align: end;
            width: 138px;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      margin: 8px auto 5%;
      width: 800px;
      padding: 0 5%;

      .content {
        .input-group {
          justify-content: end;
          width: 100%;
          flex-wrap: nowrap;

          .input-number {
            width: 100%;
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
    .readonly_box {
      margin-top: 5px;
    }

    .readonly_box,
    .input-number,
    .form-control {
      margin-left: unset !important;
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

          .input-number,
          .form-control {
            margin-top: 5px;
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