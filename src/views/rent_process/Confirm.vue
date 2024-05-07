<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出庫交付作業</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>單號：{{ Form.AO_ID }}</p>
        </div>
        <div>
          <p>申請人員：{{ Form.Applicant }}</p>
        </div>
        <div>
          <p>申請日期：{{ Form.ApplicationDate }}</p>
        </div>
      </div>
      <form>
        <div class="row g-0">
          <div class="col d-flex wrap column_section">
            <label for="inputTitle1" class="form-label use">
              <p>用&ensp;&ensp;&ensp;&ensp;途</p>
            </label>
            <div class="option">
              <div class='content'>
                <div class="form-check" v-for="(option, index) in options" :key="index">
                  <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)"
                    v-model="Form.Use" :disabled="option !== Form.Use && Form.Use !== ''">
                  <label class="form-check-label" :for="'radio' + (index + 1)">{{ option }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0 project_details">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>專案代碼</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ Form.ProjectCode }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name" id="project_name">
              <p>專案名稱</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ Form.ProjectName }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label">
              <p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p>
            </label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model="Form.Description"></textarea>
            </div>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>資產出庫項目</p>
        </div>
      </div>
      <div class="second_content">
        <DataTable :size="'small'" :value="Form.ItemList" resizableColumns columnResizeMode="expand" showGridlines scrollable
          scroll-height="420px">
          <Column v-for="item in rentStore.ItemList_field" :key="item.field" :field="item.field" :header="item.header" sortable
            :style="{ 'min-width': item.width }"></Column>
        </DataTable>
      </div>
      <div class="fixed_info">
        <div>
          <p><span>*</span>資產出庫細項(請至少勾選一項)</p>
        </div>
      </div>
      <div class="third_content">
        <DataTable :size="'small'" :value="Form.OM_List" resizableColumns columnResizeMode="expand" showGridlines scrollable
          scroll-height="600px" :row-style="({ OM_IsExecute }) => !OM_IsExecute ? 'background-color: #CEE4EB;' : null">
          <Column header="交付確認" class="datatable_checkbox">
            <template #body="slotProps">
              <input type="checkbox" class="p-checkbox p-component" v-model="slotProps.data.OM_IsExecute">
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <AssetsView :params="slotProps" />
            </template>
          </Column>
          <Column v-for="item in rentStore.OMList_field" :key="item.field" :field="item.field" :header="item.header" :sortable="item.sortable"
            :style="{ 'min-width': item.width }"></Column>
        </DataTable>
      </div>
      <div class="fixed_info_count">
        <div>
          <p>總出庫數量：{{ totalNeed }}個</p>
        </div>
        <div>
          <p>已備數量：{{ totalSelect }}個</p>
        </div>
      </div>
      <div class="fourth_content">
        <div class="fixed_info">
          <div>
            <p>備料簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>備料人員</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ Form.PreparedPerson }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>備料完成日期</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ Form.PrepareDate }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>備料備註</p>
            </label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model="Form.PrepareMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="five_content">
        <div class="fixed_info">
          <div>
            <p>審核簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>審核人員</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly> {{ Form.VerifyPerson }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>審核結果</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly style="margin-bottom: 0;"> {{ Form.VerifyResult }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>審核日期</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ Form.VerifyDate }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>審核意見</p>
            </label>
            <div class="input-group" id="readonly_box">
              <textarea class="readonly_box form-control" readonly v-model="Form.VerifyMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="six_content">
        <div class="fixed_info">
          <div class="six_content_title">
            <p>交付簽章</p>
          </div>
          <div class="six_content_date">
            <p>交付完成日期： {{ utilsStore.today }}</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label "><span>*</span>
              <p>領用人員</p>
            </label>
            <div class="input-group user_acc input-with-icon" >
              <select name="" id="" class="form-select" v-model="Form.Recipient">
                <option value="">--請選擇--</option>
                <option v-for="option in DropdownArray.Recipient" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label ">
              <p>交付人員</p>
            </label>
            <div class="input-group user_acc input-with-icon" id="readonly_box">
              <p class="readonly_box" readonly>{{ utilsStore.userName }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label" id="memo">
              <p>交付備註</p>
            </label>
            <div class="input-group" id="memo_input">
              <textarea class="form-control" placeholder="最多輸入100字" v-model="DeliveryMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="send_btn" :disabled="!Form.Recipient" :class="{ send_btn_disabled: !Form.Recipient }" data-bs-toggle="modal"
        data-bs-target="#ConfirmModal">送出</button>
    </div>
    <!-- confirmModal -->
    <confirm_modal :id="'ConfirmModal'" @confirm="submit()" :text="warningText" />
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AssetsView from '@/components/Rent_process_new_view_button'
import {
  useRoute,
  useRouter
} from 'vue-router';
import Navbar from "@/components/Navbar.vue";
import { useRentStore } from '@/store/rent/_index';
import confirm_modal from '@/components/utils/confirm_modal.vue'
import { useAPIStore, useUtilsStore } from '@/store';
import { storeToRefs } from 'pinia';
import {
  Rent_UseArray
} from "@/assets/js/dropdown";
import {
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import {
  RentProcess_Confirm_Status
} from "@/assets/js/enter_status";
import axios from '@/axios/tokenInterceptor'
const rentStore = useRentStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const route = useRoute();
const router = useRouter();
const AO_ID = route.query.search_id; // 單號
const totalNeed = ref(0); //總所需數量
const totalSelect = ref(0); //總已備數量
const options = Rent_UseArray; // 用途。Array for input[radio]
const DeliveryMemo = ref(''); // 交付備註
const loading = ref(false); // 防止提交過程中再次提交
const { Form, DropdownArray } = storeToRefs(rentStore);
const warningText = ref('按下確認後將無法再次變更交付項目，請確認資產出庫細項是否交付正確')
onMounted(async() => {
  rentStore.$reset();
  apiStore.$reset();
  DropdownArray.value.Recipient = await apiStore.getCustodian('');
  await rentStore.getDetails(AO_ID, RentProcess_Confirm_Status);
  await utilsStore.getUserName(); // 重新拿使用者名稱
  setData();
});
onUnmounted(() => {
  rentStore.$dispose();
  apiStore.$dispose();
})
/**
 * 取完資料單後做變數處理
 */
function setData() {
  // 總出庫數量
  totalNeed.value = 0;
  Form.value.ItemList.forEach(item => {
    totalNeed.value += item.Number;
  });
  // 已備數量
  totalSelect.value = 0;
  Form.value.OM_List.forEach(item => {
    totalSelect.value += item.OM_Number;
  });
  // 預帶入領用人員為申請人員
  Form.value.Recipient = Form.value.Applicant
}
/**
 * 提交交付內容
 */
async function submit() {
  utilsStore.checkMaxLetter()
  if (DeliveryMemo.value) {
    DeliveryMemo.value = DeliveryMemo.value.trim();
  }
  if (DeliveryMemo.value && !/^[\s\S]{1,100}$/.test(DeliveryMemo.value)) {
    alert('交付備註不可輸入超過100字')
    return
  }
  if (!loading.value) {
    loading.value = true;
    let OM_List = [];
    Form.value.OM_List.forEach(item => {
      OM_List.push({
        OM_id: item.OM_id,
        OM_IsExecute: item.OM_IsExecute,
      });
    });
    const requestData = {
      AO_ID: AO_ID,
      Recipient: Form.value.Recipient,
      DeliveryOperator: utilsStore.userName,
      DeliveryMemo: DeliveryMemo.value,
      OM_List: OM_List,
    };
    console.log('requestData', requestData);
    try {
      const response = await axios.post('https://localhost:44302/AssetsOutMng/Delivery', requestData);
      const data = response.data;
      console.log(data);
      if (data.state === 'success') {
        let msg = data.messages;
        msg += '\n單號:' + data.resultList.AO_ID;
        alert(msg);
        router.push({
          name: 'Rent_Process_Datagrid'
        });
      } else {
        alert(data.messages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.readonly_box {
  @include readonly_box;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.input-group {
  height: 100%;
}

.option {
  @include readonly_box;
  height: 100%;
  width: 100%;
  align-items: center;
}

span {
  @include red_star;
}

.modal {
  .modal-body {
    padding: 16px 16px 0;
  }

  button {
    background: #506b91;
    border: none;
    font-weight: 700;
    font-size: 18px;

    &:hover {
      background: #6d92b3;
    }
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

    background: #3d4e61;
    color: white;
    display: flex;
    justify-content: center;

    .close_icon {
      cursor: pointer;
    }

    .modal-title {
      margin: auto;
    }
  }
}

#confirmModal {
  .modal-content {
    border-radius: 0;
    border: 1px solid black;

    .modal-body {
      background: #528091;
      color: white;
      font-weight: 700;
      text-align: center;
      height: 80px;
      border-bottom: 1px solid black;
    }

    .modal-footer {
      margin: auto;
      padding: 10px;
      gap: 5px;

      button:nth-child(1) {
        font-weight: 700;
        border: none;

        &:hover {
          background: #636260;
        }
      }

      button:nth-child(2) {
        background: #132238;
        font-weight: 700;
        border: none;

        &:hover {
          background: #426497;
        }
      }
    }
  }
}

.input-with-icon {
  position: relative;
}

.checkmark-icon {
  position: absolute;
  top: 10%;
  left: 93%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.project_details #project_name {
  height: 100%;
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
.main_section {
  .info_wrap {
    margin: auto;

    .input-group-prepend {
      width: 100% !important;
      text-align: center !important;
    }
    .form-select{
      border-radius: 0
    }
    .fixed_info {
      @include fixed_info;
      background: #528091;
      border-radius: 0;
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;

      p {
        margin-bottom: 0;
      }
    }
    .fixed_info:nth-child(5) {
      border-top: unset;
    }
    #readonly_box {
      background-color: #b4b4b4;
    }
    .third_content {
      .list {
        button {
          @include content_delete_button;

          &:hover {
            background: #ff7272;
          }
        }
      }
    }
    .fixed_info_count {
      display: flex;
      background: #3d5c67;
      color: white;
      font-weight: 700;
      align-items: center;
      height: 40px;
      border-radius: 0;
      border-bottom: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;
      padding: 0 10px;
      justify-content: right;
      gap: 10px;

      p {
        font-size: 15px;
        margin-bottom: 0;
      }
    }
    .fourth_content {
      border-left: 1px solid black;
      border-right: 1px solid black;
      background: white;

      .fixed_info {
        border: none;
      }

      .form-check {
        margin-left: 10px;
      }

      .form-control {
        height: auto;
        border-radius: 0;
      }

      .form-label {
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
        align-items: center;
        margin: 0;
        display: flex;
        justify-content: center;

        p {
          margin-bottom: 0;
          text-align: center;
        }
      }
    }
    .five_content {
      border-left: 1px solid black;
      border-bottom: 1px solid black;

      .fixed_info {
        border: none;
      }

      .form-check {
        margin-left: 10px;
      }

      .form-control {
        padding: 0;
      }

      .wrap {
        background: white;
        border-top: 1px solid black;
        align-items: center;
      }

      .form-label {
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
        align-items: center;
        margin: 0;
        display: flex;
        justify-content: center;

        p {
          margin-bottom: 0;
          text-align: center;
        }
      }
    }
    .six_content {
      border-left: 1px solid black;
      background: white;
      border-bottom: 1px solid black;

      .fixed_info {
        position: relative;
        border-right: 1px solid black;
        .six_content_date {
          right: 10px;

          p {
            font-size: 16px !important;
          }
        }
      }

      .form-check {
        margin-left: 10px;
      }

      .form-control {
        height: auto;
        border-radius: 0;
      }

      .wrap {
        background: white;
        align-items: center;
        button {
          border-radius: 7px;
          border: none;
          background: #48658c;
          color: white;
          font-weight: 700;
          font-size: 18px;

          &:hover {
            background-color: #5d85bd;
          }
        }
      }

      .form-label {
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
        align-items: center;
        margin: 0;
        display: flex;
        justify-content: center;

        p {
          margin-bottom: 0;
          text-align: center;
        }
      }
    }
    form {
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;

      .row:nth-child(3) {
        textarea {
          padding: 5px 10px 0;
        }
      }

      .form-check {
        margin-left: 10px;
      }

      .form-control {
        height: auto;
        border-radius: 0;
      }

      .wrap {
        background: white;
        border-bottom: 1px solid black;
        align-items: center;
      }

      .form-label {
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
        height: 50px;
        align-items: center;
        margin: 0;
        display: flex;
        justify-content: center;

        p {
          width: 100px;
          margin-bottom: 0;
          text-align: center;
        }
      }
      .input-group-prepend {
        color: white;
        font-weight: 700;
        font-size: 20px;
        width: 120px;
        text-align: end;
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
  .main_section {
  .modal-content {
    width: 400px;
    margin: auto;
  }

  .info_wrap {
    width: 1000px;

    .option {
      display: flex;
    }

    .fixed_info {
      p {
        font-size: 20px;
      }
    }

    #readonly_box {
      padding: 0;
      border-left: black 1px solid;
    }

    .third_content {
      .list {
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
      }
    }

    .fourth_content {
      .fixed_info {
        border-bottom: 1px solid black;
      }

      .form-control {
        padding: 0;
      }

      .form-label {
        height: 50px;
        padding: 0 10px;
        width: 150px;
      }

      #readonly_box {
        border-right: 1px solid black;
      }

      .wrap:nth-child(3) #readonly_box {
        border-right: none;
      }
    }

    .five_content {
      .fixed_info {
        border-top: 1px solid black;
        border-right: 1px solid black;
      }

      .form-control {
        padding: 0;
      }

      .form-label {
        height: 50px;
        padding: 0 16px;
        width: 120px;
      }

      .wrap:nth-child(1) #readonly_box,
      .wrap:nth-child(3) #readonly_box {
        border-right: 1px solid black;
      }

      .wrap:nth-child(2) {
        label {
          width: 205px;
        }

        .input-group {
          border-left: 1px solid black;
          border-right: 1px solid black;
          display: flex;
          justify-content: center;
          align-content: center;
          gap: 5px;
        }
      }
    }

    .six_content {
      .fixed_info {
        .six_content_title,
        .six_content_date {
          position: absolute;
        }
        border-left: none;
        border-top: none;
      }

      .form-control {
        padding: 5px 10px 0;
      }
      .row:nth-child(2) {
        border-right: 1px solid black;
        border-top: 1px solid black;
      }
      .row:nth-child(3) {
        border-top: 1px solid black;
      }
      .wrap {
        button {
          margin: 0 10px;
          border-radius: 7px;
          height: 30px;
          width: 100px;
        }
      }

      .form-label {
        height: 50px;
        padding: 0 10px;
        width: 135px;
      }

      .wrap:nth-child(2) {
        label {
          width: 80%;
        }
      }

      .wrap:nth-child(1) {
        textarea {
          border-bottom: 0;
        }

        #memo {
          width: 120px;
          border: none;
        }
      }

      #memo_input,.user_acc select {
        border-left: 1px solid black;
      }

      .wrap:nth-child(1),
      .wrap:nth-child(2) {
        border-right: 1px solid black;
      }
    }

    form {
      .row:nth-child(3) {
        textarea {
          padding: 5px 10px 0;
        }
      }

      .form-control {
        padding: 0;
      }

      .wrap {
        label.use {
          border-right: 1px solid black;
        }

        .option {
          .content {
            display: flex;
          }
        }

        .project_name {
          border-left: 1px solid black;
        }
      }

      .form-label {
        padding: 0 20px;
        width: 150px;
      }
    }
  }
}

}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .modal-content {
      width: 400px;
      margin: auto;
    }

    .info_wrap {
      padding: 0 5%;

      .option {
        display: flex;
      }

      .fixed_info {
        p {
          margin-bottom: 0;
          font-size: 20px;
        }
      }

      #readonly_box {
        padding: 0;
        border-left: black 1px solid;
        width: 100%;
      }

      .third_content {
        .list {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
        }
      }

      .fourth_content {
        .fixed_info {
          border-bottom: 1px solid black;
        }

        .form-control {
          padding: 0;
        }

        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 150px;
        }

        #readonly_box {
          border-right: 1px solid black;
        }

        .wrap:nth-child(3) #readonly_box {
          border-right: none;
        }
      }

      .five_content {
        .fixed_info {
          border: none;
        }

        .form-control {
          height: auto;
          border-radius: 0;
          padding: 0;
        }

        #readonly_box {
          background: #b4b4b4;
          font-weight: 700;
        }

        .form-label {
          height: 50px;
          padding: 0 16px;
          width: 120px;
        }

        .wrap:nth-child(1) #readonly_box,
        .wrap:nth-child(3) #readonly_box {
          border-right: 1px solid black;
        }

        .wrap:nth-child(2) {
          label {
            width: 205px;
          }

          .input-group {
            border-left: 1px solid black;
            border-right: 1px solid black;
            display: flex;
            justify-content: center;
            align-content: center;
            width: 280px;
          }
        }
      }

      .six_content {
        .fixed_info {
          .six_content_title,
        .six_content_date {
          position: absolute;
        }
          border-left: none;
          border-top: none;
        }

        .form-control {
          padding: 5px 10px 0;
        }
        .row:nth-child(2) {
        border-right: 1px solid black;
        border-top: 1px solid black;
      }
      .row:nth-child(3) {
        border-top: 1px solid black;
      }
        .wrap {
           button {
            margin: 0 10px;
            height: 30px;
            width: 70px;
          }
        }

        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 135px;
        }

        .wrap:nth-child(2) {
          label {
            width: 80%;
          }

          #readonly_box {
            border-right: 1px solid black;
          }
        }

        .wrap:nth-child(1) {
          textarea {
            border-bottom: 0;
          }

          #memo {
            width: 123px;
            border: none;
          }
        }

        #memo_input,.user_acc {
          border-left: 1px solid black;
        }

        .wrap:nth-child(1){
          border-right: 1px solid black;
        }
      }

      form {
        .row:nth-child(3) {
          textarea {
            padding: 5px 10px 0;
          }
        }

        .form-control {
          padding: 0;
        }

        .wrap {
          label.use {
            border-right: 1px solid black;
          }

          .option {
            .content {
              display: flex;
            }
          }

          .project_name {
            border-left: 1px solid black;
          }
        }

        .form-label {
          padding: 0 20px;
          width: 150px;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .info_wrap {
      padding: 0 5%;

      .fixed_info {
        flex-direction: column;
        height: unset;
        padding: 10px;

        p {
          font-size: 18px;
        }
      }

      .third_content {
        .list {
          border: 1px solid black;
        }
      }

      .fourth_content {
        border-bottom: 1px solid black;

        .wrap {
          background: white;
          border-top: 1px solid black;
          align-items: center;
          flex-direction: column;

          .option {
            display: flex;
          }
        }

        .form-label {
          width: 100%;
          height: 30px;
          border-bottom: 1px solid black;

          p {
            font-size: 18px;
          }
        }
      }

      .five_content {
        border-right: 1px solid black;

        #readonly_box {
          background: #b4b4b4;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          padding: 5px;
        }

        .form-control {
          height: auto;
          border-radius: 0;
        }

        .wrap {
          flex-direction: column;

          .option {
            display: flex;
          }
        }

        .form-label {
          border-bottom: 1px solid black;
          height: 50px;
          width: 100%;
          height: 30px;

          p {
            font-size: 18px;
          }
        }
      }

      .six_content {
        .fixed_info {
          border: none;
          border-bottom: 1px solid black;
          border-right: 1px solid black;
        }

        #readonly_box {
          background: #b4b4b4;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          padding: 5px;
          border-bottom: 1px solid black;
        }
.row{
  border-right: 1px solid black;
}
        .wrap {
          flex-direction: column;

          button {
            margin: 10px;
            height: 30px;
            width: 100px;
          }
        }

        .form-label {
          border-bottom: 1px solid black;
          width: 100%;
          height: 30px;

          p {
            font-size: 18px;
          }
        }

        .wrap:nth-child(2),
        .wrap:nth-child(3),
        .wrap:nth-child(4) {
          border-top: 1px solid black;
        }

        .wrap:nth-child(5) {
          border-bottom: 1px solid black;
          border-top: 1px solid black;
        }
      }

      form {
        .form-check {
          font-size: 18px;
        }

        .wrap {
          flex-direction: column;

          label.use,
          .form-label {
            border-bottom: 1px solid black;
            width: 100%;
            height: 30px;
            justify-content: space-evenly;
          }

          .option {
            font-size: 18px;
            font-weight: 700;

            .content {
              padding: 5px;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr;
              gap: 0px 0px;
              grid-auto-flow: row;
              grid-template-areas: ". . ." ". . .";
              white-space: nowrap;
              justify-items: center;

              div {
                width: 90px;
              }
            }
          }
        }

        .form-label {
          padding: 0 30px;

          p {
            font-size: 18px;
          }
        }
      }
    }
  }
}

</style>
