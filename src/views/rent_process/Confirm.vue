<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出庫交付作業</h1>
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
          <div class="col d-flex wrap column_section">
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
            <label for="inputWithButton" class="form-label"><p>專案代碼</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.ProjectCode }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>專案名稱</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.ProjectName }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label"><p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p></label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model="details.Description"></textarea>
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
        <ag-grid-vue :suppressRowClickSelection="true" style="height: 380px" class="ag-theme-alpine list" :rowHeight="rowHeight" :columnDefs="columnDefs2" :rowData="rowData2" rowSelection='multiple' :paginationAutoPageSize="true" @grid-ready="onGridReady">
        </ag-grid-vue>
      </div>
      <div class="fixed_info_count">
        <div>
          <p>總出庫數量：{{ totalNeed }}個</p>
        </div>
        <div>
          <p>已備數量: {{ totalSelect }}個</p>
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
            <label for="inputWithButton" class="form-label"><p>備料人員</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.PreparedPerson}}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備料完成日期</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.PrepareDate}}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備料備註</p></label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model="details.PrepareMemo"></textarea>
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
            <label for="inputWithButton" class="form-label"><p>審核人員</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly> {{ details.VerifyPerson }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>審核結果</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly style="margin-bottom: 0;"> {{ details.VerifyResult }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>審核日期</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.VerifyDate }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>審核意見</p></label>
            <div class="input-group" id="readonly_box">
              <textarea class="readonly_box form-control" readonly>{{ details.VerifyMemo }}</textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="six_content">
        <div class="fixed_info">
          <div>
            <p>交付簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label "><span>*</span><p>領用人員</p></label>
            <div class="input-group use_acc input-with-icon" id="readonly_box">
              <p class="readonly_box" readonly>{{ validationStatus(1) }}</p>
              <span class="icon-container">
                <img src="@/assets/accept.png" class="checkmark-icon" v-show="validation.user1.isValidate" />
              </span>
            </div>
            <button type="button" data-bs-toggle="modal" data-bs-target="#userConfirm1">驗證</button>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><span>*</span><p>交付人員</p></label>
            <div class="input-group input-with-icon" id="readonly_box">
              <p class="readonly_box" readonly>{{ validationStatus(2) }}</p>
              <span class="icon-container">
                <img src="@/assets/accept.png" class="checkmark-icon" v-show="validation.user2.isValidate" />
              </span>
            </div>
            <button type="button" data-bs-toggle="modal" data-bs-target="#userConfirm2">驗證</button>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name" id="done_date"><p>交付完成日期</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ DeliveryDate}}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label" id="memo"><p>交付備註</p></label>
            <div class="input-group" id="memo_input">
              <textarea class="form-control" placeholder="最多輸入100字" v-model="DeliveryMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal1 Start -->
      <div class="modal fade" id="userConfirm1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content ">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel1">領用人員驗證</h5>
              <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
            </div>
            <div class="modal-body">
              <div class="col">
                <div class="input-group mb-3">
                  <div class="modal-input-group-prepend">帳號：</div>
                  <input type="text" class="form-control" aria-label="Default" v-model="validation.user1.account" />
                </div>
              </div>
              <div class="col">
                <div class="input-group mb-3">
                  <div class="modal-input-group-prepend">密碼：</div>
                  <input type="password" class="form-control" aria-label="Default" v-model="validation.user1.password" />
                </div>
              </div>
            </div>
            <div class="modal-footer m-auto">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate(1)">驗證</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal1 End -->
      <!-- Modal2 Start -->
      <div class="modal fade" id="userConfirm2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content ">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel2">交付人員驗證</h5>
              <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
            </div>
            <div class="modal-body">
              <div class="col">
                <div class="input-group mb-3">
                  <div class="modal-input-group-prepend">帳號：</div>
                  <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="validation.user2.account" />
                </div>
              </div>
              <div class="col">
                <div class="input-group mb-3">
                  <div class="modal-input-group-prepend">密碼：</div>
                  <input type="password" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="validation.user2.password" />
                </div>
              </div>
            </div>
            <div class="modal-footer m-auto">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate(2)">驗證</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal2 End -->
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="send_btn" :disabled="!canSubmit()" :class="{ send_btn_disabled: !canSubmit() }" data-bs-toggle="modal" data-bs-target="#confirmModal">送出</button>
    </div>
    <!-- confirmModal -->
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            按下確認後將無法再次變更交付項目，請確認資產出庫細項是否交付正確
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submit">確認</button>
          </div>
        </div>
      </div>
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
  import {
    onMounted,
    ref
  } from "vue";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Storage_add,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AO_ID = route.query.search_id;
      const totalNeed = ref(0); //總所需數量
      const totalSelect = ref(0); //總已備數量
      const details = ref({});
      const options = ['內部領用', '借測', '維修', '出貨', '報廢', '退貨'];
      const rowHeight = 35;
      const gridApi = ref(null);
      const DeliveryMemo = ref('');
      const DeliveryDate = ref('');
      const validation = ref({
        user1: {
          account: 'user_1',
          password: 'Test_123',
          isValidate: false,
          resultName: '',
        },
        user2: {
          account: 'user_2',
          password: 'Test_123',
          isValidate: false,
          resultName: '',
        },
      });
      const columnDefs1 = [{
          headerName: "項目",
          field: "id",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "設備總類",
          field: "EquipTypeName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "設備分類",
          field: "EquipCategoryName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "物品名稱",
          field: "ProductName",
          unSortIcon: true,
          sortable: true,
          width: 140,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "數量",
          field: "Number",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "規格需求",
          field: "RequiredSpec",
          unSortIcon: true,
          sortable: true,
          flex: 1,
          suppressMovable: true,
          resizable: true,
        },
      ];
      const columnDefs2 = [{
          headerName: "交付確認",
          field: "OM_IsExecute",
          width: 120,
          suppressMovable: true,
          editable: true,
          // checkboxSelection: true,
          resizable: true,
          cellStyle: { 'justify-content': 'center' },
        },
        {
          headerName: "項目",
          field: "OM_List_id",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "資產編號",
          field: "AssetsId",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "資產名稱",
          field: "AssetName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "儲位區域",
          field: "AreaName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "儲位櫃位",
          field: "LayerName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "廠商",
          field: "VendorName",
          unSortIcon: true,
          sortable: true,
          width: 250,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "型號",
          field: "ProductType",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "規格",
          field: "ProductSpec",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "數量",
          field: "OM_Number",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "單位",
          field: "OM_Unit",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true,
          resizable: true,
        },
      ];
      const rowData1 = ref([]);
      const rowData2 = ref([]);
      onMounted(() => {
        getDetails();
        DeliveryDate.value = getDate();
      });
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
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

      //分別使用帳號密碼驗證、改變驗證狀態 user1為設備工程師 user2為倉管人員
      async function validate(user) {
        if (user === 1) {
          const axios = require('axios');
          const formData = new FormData();
          const formFields = {
            'userName': validation.value.user1.account,
            'userPassword': validation.value.user1.password,
          };
          //將表格資料append到 formData
          for (const fieldName in formFields) {
            formData.append(fieldName, formFields[fieldName]);
            console.log(formData.get(`${fieldName}`));
          }
          const response = await axios.post('http://192.168.0.177:7008/Account/IdentityValidationForE_Operator', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          try {
            const data = response.data;
            console.log(data);
            if (data.state === 'success') {
              validation.value.user1.isValidate = true;
              validation.value.user1.resultName = validation.value.user1.account;
            } else if (data.state === 'error') {
              alert(data.messages);
              validation.value.user1.isValidate = false;
            }
          } catch (error) {
            console.error(error);
          }
        } else if (user === 2) {
          const axios = require('axios');
          const formData = new FormData();
          const formFields = {
            'userName': validation.value.user2.account,
            'userPassword': validation.value.user2.password,
          };
          //將表格資料append到 formData
          for (const fieldName in formFields) {
            formData.append(fieldName, formFields[fieldName]);
            console.log(formData.get(`${fieldName}`));
          }
          const response = await axios.post('http://192.168.0.177:7008/Account/IdentityValidationForW_Operator', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          try {
            const data = response.data;
            console.log(data);
            if (data.state === 'success') {
              validation.value.user2.isValidate = true;
              validation.value.user2.resultName = validation.value.user2.account;
            } else if (data.state === 'error') {
              alert(data.messages);
              validation.value.user2.isValidate = false;
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
      function validationStatus(user) {
        if (user === 1) {
          return validation.value.user1.isValidate ? validation.value.user1.resultName : '未驗證'
        } else if (user === 2) {
          return validation.value.user2.isValidate ? validation.value.user2.resultName : '未驗證'
        }
      }
      function canSubmit() {
        return validation.value.user1.isValidate && validation.value.user2.isValidate;
      }
      async function submit() {
        DeliveryMemo.value.trim();
        if (DeliveryMemo.value && !/^.{1,100}$/.test(DeliveryMemo.value)) {
          alert('交付備註不可輸入超過100字')
          return
        }
        let OM_List = [];
        rowData2.value.forEach( item=> {
          OM_List.push({
            OM_id: item.OM_id,
            OM_IsExecute: item.OM_IsExecute,
          });
        });
        console.log('OM_List', OM_List);
        const axios = require('axios');
        const requestData = {
          AO_ID: details.value.AO_ID,
          Recipient: validation.value.user1.resultName,
          DeliveryOperator: validation.value.user2.resultName,
          DeliveryMemo: DeliveryMemo.value,
          OM_List: OM_List,
        };
        const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/Delivery',requestData);
        try {
          const data = response.data;
          console.log(data);
          if (data.state === 'success') {
            let msg = data.messages;
            msg += '\n單號:' + data.resultList.AO_ID;
            alert(msg);
            router.push({
              name: 'Rent_Process_Datagrid'
            });
          } else if (data.state === 'error') {
            alert(data.messages);
            console.log('error state', response);
          }
        } catch (error) {
          console.error(error);
        }
      }
      const onGridReady = (params) => {
        gridApi.value = params.api;
      };
      // const selectedNodes = gridApi.value.getSelectedNodes();
      // const selectedData = selectedNodes.map(node => node.data);
      // console.log('Selected Row Data:', selectedData);
      function getDate() {
        const today = new Date();
        var date = '';
        date += (today.getFullYear() + '/');
        date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
        date += ((today.getDate()).toString().padStart(2, '0'));
        return date;
      }
      function goBack() {
        window.history.back();
      }
      return {
        rowHeight,
        totalNeed,
        totalSelect,
        details,
        options,
        columnDefs1,
        columnDefs2,
        rowData1,
        rowData2,
        validation,
        DeliveryMemo,
        DeliveryDate,
        validate,
        validationStatus,
        canSubmit,
        submit,
        onGridReady,
        goBack,
      };
    },
  };
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
    .modal-content {
      width: 400px;
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
      .close_icon {
        cursor: pointer;
      }
      .modal-title{
        margin: auto;
      }
    }
  }
  #confirmModal{
    .modal-content{
      border-radius: 0;
      border:1px solid black;
    .modal-body{
      background: #528091;
    color: white;
    font-weight: 700;
    text-align: center;
    height: 80px;
      border-bottom:1px solid black;
    }
    .modal-footer{
    
          margin: auto;
    padding: 10px;
    gap:5px;
    button:nth-child(1){
      font-weight: 700;
    border:none;
    &:hover{
      background:#636260
    }
    }
    button:nth-child(2){
      background: #132238;
    font-weight: 700;
    border: none;
    &:hover{
      background:#426497
    }
    }
    }}
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
        #readonly_box {
          padding: 0;
          background-color: #B4B4B4;
          border-left: black 1px solid;
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
          background: #3d5c67;
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
          background: white;
          .fixed_info {
            border: none;
            border-bottom: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            padding: 0;
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
            width: 150px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          #readonly_box {
            border-right: 1px solid black;
          }
          .wrap:nth-child(3) #readonly_box {
            border-right: none;
          }
        }
        .five_content {
          border-left: 1px solid black;
          border-bottom: 1px solid black;
          .fixed_info {
            border: none;
            border-top: 1px solid black;
            border-right: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
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
          .wrap {
            background: white;
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
            padding: 0 16px;
            width: 120px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
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
            width: 135px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          .wrap:nth-child(2) {
            border-right: 1px solid black;
            label {
              width: 80%;
            }
            #readonly_box {
              border-right: 1px solid black;
            }
          }
          .wrap:nth-child(3) {
            border-right: 1px solid black;
          }
          .wrap:nth-child(1) {
            border-right: 1px solid black;
            textarea {
              border-bottom: 0;
            }
            #memo {
              width: 120px;
              border: none
            }
          }
          #memo_input {
            border-left: 1px solid black;
          }
          .use_acc {
            border-right: 1px solid black;
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .row:nth-child(3){
          
            textarea{
    padding: 5px 10px 0;
            }
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
            border-bottom: 0.5px solid black;
            align-items: center;
            label.use {
              border-right: 1px solid black;
            }
            .option {
              @include readonly_box;
              height: 100%;
              width: 100%;
              align-items: center;
              display: flex;
              .content {
                display: flex;
              }
            }
            .project_name {
              border-left: 1px solid black;
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
            padding: 0 20px;
            width: 150px;
            p {
              width: 100px;
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
        #readonly_box {
          padding: 0;
          background-color: #B4B4B4;
          border-left: black 1px solid;
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
          background: #3d5c67;
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
          background: white;
          .fixed_info {
            border: none;
            border-bottom: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            padding: 0;
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
            width: 150px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          #readonly_box {
            border-right: 1px solid black;
          }
          .wrap:nth-child(3) #readonly_box {
            border-right: none;
          }
        }
        .five_content {
          border-left: 1px solid black;
          border-bottom: 1px solid black;
          .fixed_info {
            border: none;
            border-top: 1px solid black;
            border-right: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
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
          .wrap {
            background: white;
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
            padding: 0 16px;
            width: 120px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
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
          border-left: 1px solid black;
          background: white;
          border-bottom: 1px solid black;
          span {
            @include red_star;
          }
          .fixed_info {
            border: none;
            border-right: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
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
            width: 135px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          .wrap:nth-child(2) {
            border-right: 1px solid black;
            label {
              width: 40%;
            }
            #readonly_box {
              border-right: 1px solid black;
            }
          }
          .wrap:nth-child(3) {
            border-right: 1px solid black;
          }
          .wrap:nth-child(1) {
            border-right: 1px solid black;
            textarea {
              border-bottom: 0;
            }
            label {
              width: 40%;
            }
            #memo {
              width: 110px;
              border: none
            }
          }
          #memo_input {
            border-left: 1px solid black;
          }
          .use_acc {
            border-right: 1px solid black;
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .row:nth-child(3){
          
          textarea{
  padding: 5px 10px 0;
          }
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
            border-bottom: 0.5px solid black;
            align-items: center;
            label.use {
              border-right: 1px solid black;
            }
            .option {
              @include readonly_box;
              height: 100%;
              width: 100%;
              align-items: center;
              display: flex;
              .content {
                display: flex;
              }
            }
            .project_name {
              border-left: 1px solid black;
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
            padding: 0 20px;
            width: 150px;
            p {
              width: 100px;
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
      #readonly_box {
        background: #b4b4b4;
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
          background: #3d5c67;
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
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 30px;
            border-bottom: 1px solid black;
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
            gap: 5px;
            height: 40px;
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
            height: 50px;
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
        .six_content {
          border-bottom: 1px solid black;
          border-left: 1px solid black;
          .fixed_info {
            border: none;
            border-right: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            border: none
          }
          #readonly_box {
            background: #b4b4b4;
            font-weight: 700;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            border-bottom: 1px solid black;
          }
          .wrap {
            background: white;
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
          .wrap:nth-child(1) {
            border-right: 1px solid black;
          }
          .wrap:nth-child(2) {
            border-top: 1px solid black;
            border-right: 1px solid black;
          }
          .wrap:nth-child(3) {
            border-right: 1px solid black;
            border-top: 1px solid black;
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
              background: #b4b4b4;
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
