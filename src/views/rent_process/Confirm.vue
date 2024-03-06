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
        <div class="row g-0 project_details">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>專案代碼</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.ProjectCode }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name" id="project_name"><p>專案名稱</p></label>
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
        <DataTable :size="'small'" :value="rowData1" resizableColumns columnResizeMode="expand" showGridlines scrollable scroll-height="420px">
          <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        </DataTable>
      </div>
      <div class="fixed_info">
        <div>
          <p><span>*</span>資產出庫細項(請至少勾選一項)</p>
        </div>
      </div>
      <div class="third_content">
        <DataTable :size="'small'" :value="rowData2" resizableColumns columnResizeMode="expand" showGridlines scrollable scroll-height="600px" :row-style="({ OM_IsExecute }) => !OM_IsExecute ? 'background-color: #CEE4EB;': null ">
          <Column header="交付確認" class="datatable_checkbox">
            <template style="min-width:50px; " #body="slotProps">
                  <input type="checkbox" class="p-checkbox p-component" v-model="slotProps.data.OM_IsExecute">
</template>
          </Column>
          <Column>
<template #body="slotProps">
  <AssetsView :params="slotProps" />
</template>
          </Column>
        <Column v-for="item in datagrid2field" :field="item.field" :header="item.header" :sortable="item.sortable" :style="{'min-width': item.width}"></Column>
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
          <div class="six_content_title">
            <p>交付簽章</p> </div>
            <div class="six_content_date">
            <p> {{ DeliveryDate}}</p>
         </div>
        </div>
        <div class="row g-0">
<template v-for="(item,index) in validation" :key="item.title">
  <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
    <label for="inputWithButton" class="form-label "><span v-if="index !== 1">*</span><p>{{ item.title }}</p></label>
    <div class="input-group use_acc input-with-icon" id="readonly_box">
      <p class="readonly_box" readonly>{{ item.resultName }}</p>
      <span class="icon-container">
                      <img src="@/assets/accept.png" class="checkmark-icon" v-show="item.isValidate" />
                    </span>
    </div>
    <button type="button" data-bs-toggle="modal" :data-bs-target="`#userConfirm-${index}`">驗證</button>
  </div>
  <!-- Modal Start -->
  <div class="modal fade" :id="`userConfirm-${index}`" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title">{{ item.title }}驗證</h5>
          <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
        </div>
        <div class="modal-body">
          <div class="col">
            <div class="input-group mb-3">
              <div class="modal-input-group-prepend">帳號：</div>
              <input type="text" class="form-control" aria-label="Default" v-model="item.account" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="modal-input-group-prepend">密碼：</div>
              <input type="password" class="form-control" aria-label="Default" v-model="item.password" />
            </div>
          </div>
        </div>
        <div class="modal-footer m-auto">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate(index)">驗證</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal End -->
</template>
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
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="send_btn" :disabled="!canSubmit" :class="{ send_btn_disabled: !canSubmit }" data-bs-toggle="modal" data-bs-target="#confirmModal">送出</button>
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

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import AssetsView from '@/components/Rent_process_new_view_button'
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import Navbar from "@/components/Navbar.vue";
  import {
    canEnterPage,
    goBack,
    getDate
  } from "@/assets/js/common_fn"
  import {
    Rent_UseArray
  } from "@/assets/js/dropdown";
  import {
    onMounted,
    ref,
    reactive,
    computed,
  } from "vue";
  import {
    RentProcess_Confirm_Status
  } from "@/assets/js/enter_status";
  import axios from 'axios';
  const route = useRoute();
  const router = useRouter();
  const AO_ID = route.query.search_id;
  const totalNeed = ref(0); //總所需數量
  const totalSelect = ref(0); //總已備數量
  const details = ref({});
  const options = Rent_UseArray;
  const DeliveryMemo = ref('');
  const DeliveryDate = ref('');
  const loading = ref(false);
  const validation = reactive([{
      title: '申請人員',
      account: '',
      password: '',
      isValidate: false,
      resultName: '未驗證',
    },
    {
      title: '領用人員',
      account: '',
      password: '',
      isValidate: false,
      resultName: '未驗證',
    },
    {
      title: '交付人員',
      account: '',
      password: '',
      isValidate: false,
      resultName: '未驗證',
      id: 'AOP_OutboundDelivery',
    },
  ]);
  // 資產出庫項目
  const datagrid1field = [{
      field: "id",
      width: '50px',
      header: "項目"
    },
    {
      field: "EquipTypeName",
      width: '150px',
      header: "設備總類"
    },
    {
      field: "EquipCategoryName",
      width: '150px',
      header: "設備分類"
    },
    {
      field: "ProductName",
      width: '150px',
      header: "物品名稱"
    },
    {
      field: "Number",
      width: '100px',
      header: "數量"
    },
    {
      field: "RequiredSpec",
      width: '250px',
      header: "規格需求"
    },
  ]
  // 資產出庫細項
  const datagrid2field = [{
      field: "OM_List_id",
      width: '50px',
      header: "需求項目",
      sortable: false,
    },
    {
      field: "OM_Number",
      width: '30px',
      header: "數量",
      sortable: false,
    },
    {
      field: "OM_Unit",
      width: '30px',
      header: "單位",
      sortable: false,
    },
    {
      field: "AssetsId",
      width: '150px',
      header: "資產編號",
      sortable: true,
    },
    {
      field: "AssetName",
      width: '150px',
      header: "物品名稱",
      sortable: true,
    },
    {
      field: "ProductType",
      width: '150px',
      header: "型號",
      sortable: true,
    },
    {
      field: "ProductSpec",
      width: '150px',
      header: "規格",
      sortable: true,
    },
    {
      field: "VendorName",
      width: '150px',
      header: "廠商",
      sortable: true,
    },
    {
      field: "AreaName",
      width: '150px',
      header: "儲位區域",
      sortable: true,
    },
    {
      field: "LayerName",
      width: '150px',
      header: "儲位櫃位",
      sortable: true,
    },
  ]
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
      const data = response.data;
      if (data.state === 'success') {
        canEnterPage(data.resultList.Status, RentProcess_Confirm_Status)
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
  //分別使用帳號密碼驗證、改變驗證狀態 user1為領用人員 user2為交付人員
  async function validate(index) {
    // 領用/交付人員驗證
    const formData = new FormData();
    let formFields = {};
    let url = '';
    switch(index) {
      // 申請
      case 0:
        formFields = {
          'userName': validation[index].account,
          'userPassword': validation[index].password,
          'ao_id': AO_ID,
        };
        url = 'http://192.168.0.177:7008/AssetsOutMng/AO_ApplicantOrReceivedValidation'
        break
      // 領用
      case 1:
        formFields = {
          'userName': validation[index].account,
          'userPassword': validation[index].password,
        };
        url = 'http://192.168.0.177:7008/AssetsOutMng/AO_ApplicantOrReceivedValidation'
        break
      // 交付
      case 2:
        formFields = {
          'userName': validation[index].account,
          'userPassword': validation[index].password,
          'id': validation[index].id,
        };
        url = 'http://192.168.0.177:7008/Account/IdentityValidation'
        break
    }
    for (const key in formFields) {
      formData.append(key, formFields[key]);
    }
    try {
      const response = await axios.post(url, formData);
      const data = response.data;
      if (data.state === 'success') {
        validation[index].isValidate = true;
        validation[index].resultName = validation[index].account;
      } else if (data.state === 'error') {
        alert(data.messages);
        validation[index].isValidate = false;
        validation[index].resultName = '未驗證';
      }
    } catch (error) {
      console.error(error);
    }
  }
  const canSubmit = computed(() => {
    // 至少一項交付
    let atLeastOne = false;
    for (let i = 0; i < rowData2.value.length; i++) {
      if (rowData2.value[i].OM_IsExecute) {
        atLeastOne = true;
        break;
      }
    }
    // 申請人員、交付人員驗證
    const isValidate = validation[0].isValidate && validation[2].isValidate
    return isValidate && atLeastOne
  })
  async function submit() {
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
      rowData2.value.forEach(item => {
        OM_List.push({
          OM_id: item.OM_id,
          OM_IsExecute: item.OM_IsExecute,
        });
      });
      console.log('OM_List', OM_List);
      const axios = require('axios');
      const Recipient = validation[1].resultName === '未驗證' ? '' : validation[1].resultName;
      const requestData = {
        AO_ID: details.value.AO_ID,
        Recipient: Recipient,
        DeliveryOperator: validation[2].resultName,
        DeliveryMemo: DeliveryMemo.value,
        OM_List: OM_List,
      };
      try {
        const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/Delivery', requestData);
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
          loading.value = false;
        }
      } catch (error) {
        loading.value = false;
        console.error(error);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .six_content .fixed_info {
    position: relative;
    .six_content_title,
    .six_content_date {
      position: absolute;
    }
    .six_content_date {
      right: 10px;
      p {
        font-size: 16px !important
      }
    }
  }
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
      background: #3D4E61;
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
            background: #636260
          }
        }
        button:nth-child(2) {
          background: #132238;
          font-weight: 700;
          border: none;
          &:hover {
            background: #426497
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
  @media only screen and (min-width: 1200px) {
    .main_section {
      .modal-content {
        width: 400px;
        margin: auto;
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
        .fixed_info:nth-child(5) {
          border-top: unset;
        }
        #readonly_box {
          padding: 0;
          background-color: #B4B4B4;
          border-left: black 1px solid;
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
            border-left: none;
            border-top: none;
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
            border-right: 1px solid black;
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
      .modal-content {
        width: 400px;
        margin: auto;
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
        .fixed_info:nth-child(5) {
          border-top: unset;
        }
        #readonly_box {
          padding: 0;
          background-color: #B4B4B4;
          border-left: black 1px solid;
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
            border-left: none;
            border-top: none;
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
            border-right: 1px solid black;
            button {
              margin: 0 10px;
              border-radius: 7px;
              height: 30px;
              width: 70px;
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
              width: 123px;
              border: none
            }
          }
          #memo_input {
            border-left: 1px solid black;
          }
          .use_acc {
            border-right: 1px solid black;
            width: 100px;
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
        .fixed_info:nth-child(5) {
          border-top: unset;
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
            padding: 5px;
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
            height: 47px;
            border: none;
            border-bottom: 1px solid black;
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
            padding: 5px;
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
          .wrap:nth-child(3),
          .wrap:nth-child(4) {
            border-right: 1px solid black;
            border-top: 1px solid black;
          }
          .wrap:nth-child(5) {
            border-bottom: 1px solid black;
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
