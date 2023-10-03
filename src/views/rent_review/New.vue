<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出庫審核作業</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>單號：{{ details.AO_ID}}</p>
        </div>
        <div>
          <p>申請人員：{{ details.Applicant}}</p>
        </div>
        <div>
          <p>申請日期：{{ details.ApplicationDate}}</p>
        </div>
      </div>
      <form>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputTitle1" class="form-label use"><p>用&ensp;&ensp;&ensp;&ensp;途</p></label>
            <div class="option">
              <div class='content'>
                <div class="form-check" v-for="(option, index) in options" :key="index">
                  <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)" v-model="details.Use" :disabled="option !== details.Use && details.Use !== ''">
                  <label class="form-check-label" :for="'radio' + (index + 1)">{{ option }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label "><p>專案代碼</p></label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box text-center" id="inputWithButton" readonly v-model=" details.ProjectCode" />
            </div>
          </div>
          <div class=" col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>專案名稱</p></label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box text-center" id="inputWithTitle" readonly v-model=" details.ProjectName" />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label"><p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p></label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model=" details.Description"></textarea>
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
        <ag-grid-vue style="height: 380px" class="ag-theme-alpine list" :rowHeight="rowHeight" :columnDefs="columnDefs1" :rowData="rowData1" :paginationAutoPageSize="true">
        </ag-grid-vue>
      </div>
      <div class="fixed_info">
        <div>
          <p>資產出庫細項</p>
        </div>
      </div>
      <div class="third_content">
        <ag-grid-vue style="height: 380px" class="ag-theme-alpine list" :rowHeight="rowHeight" :columnDefs="columnDefs2" :rowData="rowData2" :paginationAutoPageSize="true">
        </ag-grid-vue>
      </div>
      <div class="fixed_info_count">
        <div>
          <p>總出庫數量：{{ totalNeed}} 個</p>
        </div>
        <div>
          <p>已備數量: {{ totalSelect}} 個</p>
        </div>
      </div>
      <div class='fourth_content'>
        <div class="fixed_info">
          <div>
            <p>備料簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>備料人員</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly> {{ details.PreparedPerson }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備註</p></label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model="details.PrepareMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class='five_content'>
        <div class="fixed_info">
          <div>
            <p>審核簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p><span>*</span>審核人員</p></label>
            <div class="input-group input-with-icon" id="readonly_box">
              <p class="readonly_box" readonly>{{ validationStatus()}} </p>
              <span class="icon-container">
                <img src="@/assets/accept.png" class="checkmark-icon" v-show="validation.isVerified" />
              </span>
            </div>
            <button type="button" data-bs-toggle="modal" data-bs-target="#verifyModal">驗證</button>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p><span>*</span>審核結果</p></label>
            <div class="input-group">
              <input type="radio" value="true" v-model="optionValue" />通過 <input type="radio" value="false" v-model="optionValue" />不通過
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>審核日期</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly> {{ VerifyDate }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>審核意見</p></label>
            <div class="input-group">
              <textarea placeholder="最多100字" class="form-control" id="inputTextarea" v-model="validation.VerifyMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="verifyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content ">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel2">審核人員驗證</h5>
            <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
          </div>
          <div class="modal-body">
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">帳號：</div>
                <input type="text" class="form-control" aria-label="Default" v-model="validation.account" />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">密碼：</div>
                <input type="password" class="form-control" aria-label="Default" v-model="validation.password" />
              </div>
            </div>
          </div>
          <div class="modal-footer m-auto">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate()">驗證</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="send_btn" :class="{send_btn_disabled: !validation.isVerified}" @click="submit" :disabled="!validation.isVerified">送出</button>
    </div>
  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import Storage_add from "@/components/Storage_add_button";
  import Navbar from "@/components/Navbar.vue";
  import { Rent_UseOptions } from "@/assets/js/dropdown";
  import {
    computed,
    onMounted,
    reactive,
    ref
  } from "vue";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Storage_add
    },
    data() {
      return {
        rowHeight: 35,
      };
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AO_ID = route.query.search_id;
      const totalNeed = ref(0); //總所需數量
      const totalSelect = ref(0); //總已備數量
      const VerifyDate = ref('');
      const validation = reactive({
        account: '',
        password: '',
        VerifyMemo: '',
        VerifyOption: false,
        isVerified: false,
        VerifyPerson: '',
      })
      const details = ref({});
      const options = Rent_UseOptions;
      const columnDefs1 = [{
          headerName: "項目",
          field: "id",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
        },
        {
          headerName: "設備總類",
          field: "EquipTypeName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
        },
        {
          headerName: "設備分類",
          field: "EquipCategoryName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
        },
        {
          headerName: "物品名稱",
          field: "ProductName",
          unSortIcon: true,
          sortable: true,
          width: 140,
          suppressMovable: true,
        },
        {
          headerName: "數量",
          field: "Number",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
        },
        {
          headerName: "規格需求",
          field: "RequiredSpec",
          unSortIcon: true,
          sortable: true,
          flex: 1,
          suppressMovable: true,
        }
      ];
      const columnDefs2 = [{
          headerName: "項目",
          field: "OM_List_id",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
        },
        {
          headerName: "資產編號",
          field: "AssetsId",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
        },
        {
          headerName: "資產名稱",
          field: "AssetName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
        },
        {
          headerName: "數量",
          field: "OM_Number",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
        },
        {
          headerName: "單位",
          field: "OM_Unit",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
        },
        {
          headerName: "儲位區域",
          field: "AreaName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
        },
        {
          headerName: "儲位櫃位",
          field: "LayerName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
        },
        {
          headerName: "廠商",
          field: "VendorName",
          unSortIcon: true,
          sortable: true,
          width: 250,
          suppressMovable: true,
        },
        {
          headerName: "型號",
          field: "ProductType",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
        },
        {
          headerName: "規格",
          field: "ProductSpec",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
        },
      ];
      const rowData1 = ref([]);
      const rowData2 = ref([]);
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            if(data.resultList.Status !== '待審核') {
            window.history.back();
            // router.push({name: 'Rent_Datagrid'});
            }
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            rowData1.value = data.resultList.ItemList;
            rowData2.value = data.resultList.OM_List;
            totalNeed.value = 0;
            rowData1.value.forEach(item => {
              totalNeed.value += item.Number;
            });
            totalSelect.value = 0;
            rowData2.value.forEach(item => {
              totalSelect.value += item.OM_Number;
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
      onMounted(() => {
        getDetails();
        VerifyDate.value = getDate();
      });
      async function validate() {
        const axios = require('axios');
        const formData = new FormData();
        const formFields = {
          'userName': validation.account,
          'userPassword': validation.password,
          'id': 'AOV_Verify',
        };
        //將表格資料append到 formData
        for (const fieldName in formFields) {
          formData.append(fieldName, formFields[fieldName]);
          console.log(formData.get(`${fieldName}`));
        }
        const response = await axios.post('http://192.168.0.177:7008/Account/IdentityValidation', formData);
        try {
          const data = response.data;
          console.log(data);
          if (data.state === 'success') {
            validation.isVerified = true;
            validation.VerifyPerson = validation.account;
          } else if (data.state === 'error') {
            alert(data.messages);
            validation.isVerified = false;
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function submit() {
        if(validation.VerifyMemo) {
          validation.VerifyMemo = validation.VerifyMemo.trim();
        }
        if (validation.VerifyMemo && !/^[\s\S]{1,100}$/.test(validation.VerifyMemo)) {
          alert('審核意見不可輸入超過100字')
          return
        }
        const axios = require('axios');
        const formData = new FormData();
        const formFields = {
          'AO_ID': details.value.AO_ID,
          'VerifyPerson': validation.VerifyPerson,
          'VerifyResult': validation.VerifyOption,
          'VerifyMemo': validation.VerifyMemo,
        };
        //將表格資料append到 formData
        for (const fieldName in formFields) {
          formData.append(fieldName, formFields[fieldName]);
          console.log(formData.get(`${fieldName}`));
        }
        const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/Verify', formData);
        try {
          const data = response.data;
          console.log(data);
          if (data.state === 'success') {
            let msg = data.messages;
            msg += '\n單號:' + data.resultList.AO_ID;
            alert(msg);
            router.push({
              name: 'Rent_Review_Datagrid'
            });
          } else if (data.state === 'error') {
            alert(data.messages);
            console.log('error state', response);
          }
        } catch (error) {
          console.error(error);
        }
      }
      const optionValue = computed({
        get() {
          return validation.VerifyOption.toString()
        },
        set(value) {
          return validation.VerifyOption = value === 'true'
        }
      });
      function validationStatus() {
        return validation.isVerified ? validation.VerifyPerson : '未驗證'
      }
      function goBack() {
        window.history.back();
      }
      function getDate() {
        const today = new Date();
        var date = '';
        date += (today.getFullYear() + '/');
        date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
        date += ((today.getDate()).toString().padStart(2, '0'));
        return date;
      }
      return {
        totalNeed,
        totalSelect,
        validation,
        details,
        options,
        columnDefs1,
        columnDefs2,
        rowData1,
        rowData2,
        VerifyDate,
        validate,
        submit,
        optionValue,
        validationStatus,
        goBack,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .option {
    @include readonly_box;
    height: 100%;
    width: 100%;
    align-items: center;
  }
  .input-group {
    height: 100%;
  }
  .readonly_box {
    @include readonly_box;
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  .modal {
    .modal-body {
      padding: 16px 16px 0;
    }
    .modal-content {
      width: 400px;
      margin: auto;
    }
    .input-group-prepend {
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
      background: #3D4E61;
      color: white;
      .close_icon {
        cursor: pointer;
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
  @media only screen and (min-width: 1200px) {
    .main_section {
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      #readonly_box {
        background-color: #B4B4B4;
      }
      .info_wrap {
        margin: auto;
        width: 1000px;
        .input-group-prepend {
          width: 100% !important;
          text-align: center !important;
        }
        .fixed_info {
          @include fixed_info;
          background: #528091;
          border-radius: 0;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #d9d9d9;
        }
        .third_content {
          .list {
            border-top: 1px solid black;
            border-left: 1px solid black;
            border-right: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #ff7272;
              }
            }
          }
        }
        .fixed_info_count {
          display: flex;
          background: #3D5C67;
          color: white;
          font-weight: 700;
          align-items: center;
          height: 40px;
          border-radius: 0;
          border: 1px solid black;
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
          .fixed_info {
            border: none;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            padding: 0;
          }
          .wrap {
            background: white;
            border-bottom: 1px solid black;
            border-top: 1px solid black;
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
            padding: 0 10px;
            width: 115px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          #readonly_box {
            border-left: 1px solid black;
          }
          .wrap:nth-child(1) {
            border-right: 1px solid black;
          }
        }
        .five_content {
          border-left: 1px solid black;
          background: white;
          border-bottom: 1px solid black;
          span {
            @include red_star;
          }
          .fixed_info {
            border: none;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            border: none;
            padding: 5px 10px 0;
          }
          .wrap {
            background: white;
            border-top: 1px solid black;
            align-items: center;
            button {
              margin: 0 10px;
              border-radius: 7px;
              height: 30px;
              width: 100px;
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
            height: 50px;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            padding: 0 10px;
            width: 100px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          .wrap:nth-child(1) {
            #readonly_box {
              border-left: 1px solid black;
            }
            .input-group {
              border-right: 1px solid black;
            }
          }
          .wrap:nth-child(2) {
            border-left: 1px solid black;
            label {
              width: 100px;
            }
            .input-group {
              border-left: 1px solid black;
              border-right: 1px solid black;
              gap: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 700;
            }
          }
          .wrap:nth-child(3) {
            border-right: 1px solid black;
            #readonly_box {
              border-left: 1px solid black;
            }
          }
          .input-group {
            border-left: 1px solid black;
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .row:nth-child(3){
            .input-group{
              padding:0 !important;
          textarea{
            padding: 5px 10px 0;
          }
          }
        }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            border-radius: 0;
            padding: 0;
          }
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            .option {
              @include readonly_box;
              height: 100%;
              width: 100%;
              align-items: center;
              display: flex;
              .content {
                display: flex
              }
            }
            .project_name {
              border-left: 1px solid black
            }
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
            padding: 0 30px;
            p {
              width: 100px;
              margin-bottom: 0;
              text-align: center;
            }
          }
          .row:nth-child(1) .form-label,
          .row:nth-child(2) .form-label {
            border-right: 1px solid black;
          }
          .row:nth-child(3) .input-group {
            border-left: 1px solid black;
          }
        }
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;
        }
        .input-number {
          @include count_btn;
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
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      #readonly_box {
        background-color: #B4B4B4;
      }
      .info_wrap {
        margin: auto;
        padding: 0 5%;
        .input-group-prepend {
          width: 100% !important;
          text-align: center !important;
        }
        .fixed_info {
          @include fixed_info;
          background: #528091;
          border-radius: 0;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #d9d9d9;
        }
        .third_content {
          .list {
            border-top: 1px solid black;
            border-left: 1px solid black;
            border-right: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #ff7272;
              }
            }
          }
        }
        .fixed_info_count {
          display: flex;
          background: #3D5C67;
          color: white;
          font-weight: 700;
          align-items: center;
          height: 40px;
          border-radius: 0;
          border: 1px solid black;
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
          .fixed_info {
            border: none;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            padding: 0;
          }
          .wrap {
            background: white;
            border-bottom: 1px solid black;
            border-top: 1px solid black;
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
            padding: 0 10px;
            width: 115px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          #readonly_box {
            border-left: 1px solid black;
          }
          .wrap:nth-child(1) {
            border-right: 1px solid black;
          }
        }
        .five_content {
          border-left: 1px solid black;
          background: white;
          border-bottom: 1px solid black;
          span {
            @include red_star;
          }
          .fixed_info {
            border: none;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            border: none;
            padding: 5px 10px 0;
          }
          .wrap {
            background: white;
            border-top: 1px solid black;
            align-items: center;
            button {
              margin: 0 5px;
              border-radius: 7px;
              height: 30px;
              width: 150px;
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
            height: 50px;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            padding: 0 10px;
            width: 100px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          .wrap:nth-child(1) {
            #readonly_box {
              border-left: 1px solid black;
            }
            .input-group {
              border-right: 1px solid black;
            }
          }
          .wrap:nth-child(2) {
            border-left: 1px solid black;
            label {
              width: 150px;
            }
            .input-group {
              border-left: 1px solid black;
              border-right: 1px solid black;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 700;
            }
          }
          .wrap:nth-child(3) {
            border-right: 1px solid black;
            #readonly_box {
              border-left: 1px solid black;
            }
          }
          .input-group {
            border-left: 1px solid black;
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .row:nth-child(3){
            .input-group{
              padding:0 !important;
          textarea{
            padding: 5px 10px 0;
          }
          }
        }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            border-radius: 0;
            padding: 0;
          }
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            .option {
              @include readonly_box;
              height: 100%;
              width: 100%;
              align-items: center;
              display: flex;
              .content {
                display: flex
              }
            }
            .project_name {
              border-left: 1px solid black
            }
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
            padding: 0 30px;
            p {
              width: 100px;
              margin-bottom: 0;
              text-align: center;
            }
          }
          .row:nth-child(1) .form-label,
          .row:nth-child(2) .form-label {
            border-right: 1px solid black;
          }
          .row:nth-child(3) .input-group {
            border-left: 1px solid black;
          }
        }
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;
        }
        .input-number {
          @include count_btn;
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
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        padding: 0 5%;
        .input-group-prepend {
          width: 100% !important;
          text-align: center !important;
        }
        .fixed_info {
          @include fixed_info;
          background: #528091;
          border-radius: 0;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          flex-direction: column;
          height: unset;
          padding: 10px;
          p {
            font-size: 18px;
            margin-bottom: 0;
          }
        }
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #d9d9d9;
        }
        .third_content {
          .list {
            border: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #ff7272;
              }
            }
          }
        }
        .fixed_info_count {
          display: flex;
          background: #3D5C67;
          color: white;
          font-weight: 700;
          align-items: center;
          height: 40px;
          border-radius: 0;
          border: 1px solid black;
          padding: 0 10px;
          justify-content: right;
          gap: 10px;
          p {
            font-size: 15px;
            margin-bottom: 0;
          }
        }
        .fourth_content {
          border-bottom: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .fixed_info {
            border: none;
          }
          #readonly_box {
            background: #b4b4b4;
            font-weight: 700;
            display: flex;
            justify-content: center;
            align-items: center;
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
            border-top: 1px solid black;
            align-items: center;
            flex-direction: column;
            .option {
              display: flex;
            }
          }
          .form-label {
            border-bottom: 1px solid black;
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 30px;
            p {
              font-size: 18px;
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        .five_content {
          border-bottom: 1px solid black;
          border-left: 1px solid black;
          span {
            @include red_star
          }
          .fixed_info {
            border: none;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            border-radius: 0;
            border: none;
          }
          #readonly_box {
            background: #b4b4b4;
            font-weight: 700;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
          }
          .wrap {
            background: white;
            border-top: 1px solid black;
            align-items: center;
            flex-direction: column;
            button {
              margin: 10px;
              border-radius: 7px;
              height: 30px;
              width: 100px;
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
          .wrap:nth-child(1) #readonly_box {
            border-bottom: 1px solid black;
          }
          .form-label {
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            height: 30px;
            border-bottom: 1px solid black;
            width: 100%;
            p {
              font-size: 18px;
              margin-bottom: 0;
              text-align: center;
            }
          }
          .wrap:nth-child(3),
          .wrap:nth-child(1) {
            border-right: 1px solid black;
          }
          .wrap:nth-child(2) {
            border-right: 1px solid black;
            .input-group {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: 700;
              gap: 5px;
            }
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .form-check {
            margin-left: 10px;
            font-size: 18px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
          }
          .wrap {
            background: white;
            border-bottom: 1px solid black;
            align-items: center;
            flex-direction: column;
            label.use,
            .form-label {
              border-bottom: 1px solid black;
              width: 100%;
              height: 30px;
              justify-content: space-evenly;
            }
            .option {
              height: 100%;
              width: 100%;
              font-size: 18px;
              background: #B4B4B4;
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
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            height: 50px;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            padding: 0 30px;
            p {
              width: 100px;
              font-size: 18px;
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;
        }
        .input-number {
          @include count_btn;
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
</style>
