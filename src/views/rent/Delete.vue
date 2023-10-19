<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        刪除項目
      </h1>
    </div>
    <div class="info_wrap col">
      <div class="warn">
        <h4>
          確定刪除以下項目嗎？
        </h4>
      </div>
      <div class="fixed_info">
        <div>
          <p>單號：{{ details.AO_ID }}</p>
        </div>
        <div>
          <p>申請人員：{{ details.Applicant }}</p>
        </div>
        <div>
          <p>申請日期：{{ details.ApplicationDate }}</p>
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
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly>{{ details.ProjectCode }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label" id='project_name'><p>專案名稱</p></label>
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly>{{ details.ProjectName }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style='border:none'>
            <label for="inputTextarea" class="form-label"><p>説&ensp;&ensp;&ensp;&ensp;明</p></label>
            <textarea id='readonly_box' class='readonly_box' readonly>{{ details.Description }}</textarea>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>資產出庫項目</p>
        </div>
      </div>
      <div class='third_content'>
        <DataTable 
        :size="'small'"
        :value="rowData" 
        resizableColumns 
        columnResizeMode="expand"
        showGridlines 
        scrollable 
        scrollHeight="420px" 
        paginator 
        @page="updatePage"
        :rows="20" 
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width:50px;" header="項目">
          <template #body="slotProps">
            {{ calculateIndex(slotProps) }}
          </template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        </DataTable>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
    </div>
    <div class="modal fade delete_modal" id="deleteModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-body">
            確定刪除這筆項目嗎？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">否</button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="deleteData">是</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import Navbar from '@/components/Navbar.vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import {
    Rent_UseArray
  } from "@/assets/js/dropdown";
  import {
    onMounted,
    ref
  } from 'vue';
  import { goBack ,canEnterPage , createDatagrid } from "@/assets/js/common_fn";
  import { Rent_Delete_Status } from "@/assets/js/enter_status";
  export default {
    components: {
      Navbar,
      Column,
      DataTable,
    },
    setup() {
      const datagrid = createDatagrid();
      const datagridfield = [
        {field: 'EquipTypeName', header: '設備總類',width: '150px'},
        {field: 'EquipCategoryName', header: '設備分類',width: '150px'},
        {field: 'ProductName', header: '物品名稱',width: '150px'},
        {field: 'Number', header: '數量',width: '100px'},
        {field: 'RequiredSpec', header: '規格需求',width: '250px'},
      ]
      const rowData = ref([]);
      const route = useRoute();
      const router = useRouter();
      const AO_ID = route.query.search_id;
      const details = ref({});
      const options = Rent_UseArray;
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            canEnterPage(data.resultList.Status , Rent_Delete_Status)
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            rowData.value = data.resultList.ItemList;
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
      async function deleteData() {
        const form = new FormData();
        form.append('AO_ID', AO_ID);
        const axios = require('axios');
        const response = await axios.post(`http://192.168.0.177:7008/AssetsOutMng/ApplicationDelete`, form);
        try {
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages + '\n';
            msg += '單號:' + data.resultList.AO_ID;
            alert(msg);
            router.push({
              name: 'Rent_Datagrid'
            });
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      onMounted(() => {
        getDetails();
      });
      function updatePage(event) {
        datagrid.first = event.first;
      }
      function calculateIndex(slotProps) {
        return String(datagrid.first + slotProps.index + 1).padStart(2, '0');
      }
      return {
        datagridfield,
        rowData,
        details,
        options,
        deleteData,
        updatePage,
        calculateIndex,
        goBack,
      };
    },
    data() {
      return {
        rowHeight: 35,
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  textarea {
    padding: 5px 10px 0
  }
  .delete_modal {
    .modal-content {
      border: solid 1px black;
      border-radius: 0;
      .modal-body {
        background: #E94B4B;
        text-align: center;
        font-weight: 700;
        color: white;
        border-bottom: solid 1px black;
      }
      .modal-footer {
        margin: auto;
        gap: 10px;
        button:nth-child(1) {
          background-color: #7E7E7E;
          border: none;
          color: white;
          width: 50px;
          font-weight: 700;
          &:hover {
            background-color: #464242;
          }
        }
        button:nth-child(2) {
          background-color: #E94B4B;
          border: none;
          color: white;
          width: 50px;
          font-weight: 700;
          &:hover {
            background-color: #a70e0e;
          }
        }
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
  @media only screen and (min-width: 1200px) {
    .main_section {
      .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
          color: white;
          margin-bottom: 0;
          font-weight: 700;
          &::before {
            content: "\26A0";
          }
        }
      }
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
        .code_search {
          background: #48658C;
          color: white;
          font-weight: 800;
          height: 30px;
          width: 60px;
          margin-right: 10px;
          display: flex;
          align-self: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        #readonly_box {
          border-left: black 1px solid;
        }
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
        .third_content {
          .list {
            border: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #FF7272
              }
            }
          }
          .delete {
            border-top: 0px solid #484143;
            border-right: 0px dashed #484143;
            border-bottom: 0px dashed #484143;
            border-left: 1px solid #484143;
            width: 70px;
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: 50px !important;
            border-radius: 0;
            border-left: 1px solid black;
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
        }
        .input-group {
          height: 100%;
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
        .form-control {
          height: 35px;
          border-radius: 0;
        }
      }
      #project_id {
        border-right: 1px solid black;
      }
      #project_name {
        border-left: 1px solid black;
      }
      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
        button {
          @include back_to_previous_btn;
          &:hover {
            background-color: #5d85bb;
          }
          &:nth-child(2) {
            background: var(--c-5, #E94B4B);
            justify-content: center;
            align-items: center;
            display: inline-flex;
            border-radius: 10px;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            margin: 0 10px;
            &:hover {
              background-color: #a51e1e;
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
          color: white;
          margin-bottom: 0;
          font-weight: 700;
          &::before {
            content: "\26A0";
          }
        }
      }
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
        .code_search {
          background: #48658C;
          color: white;
          font-weight: 800;
          height: 30px;
          width: 60px;
          margin-right: 10px;
          display: flex;
          align-self: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        #readonly_box {
          border-left: 1px solid black;
        }
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
        .third_content {
          .list {
            border: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #FF7272
              }
            }
          }
          .delete {
            border-top: 0px solid #484143;
            border-right: 0px dashed #484143;
            border-bottom: 0px dashed #484143;
            border-left: 1px solid #484143;
            width: 70px;
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: 50px !important;
            border-radius: 0;
            border-left: 1px solid black;
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
        }
        .input-group {
          height: 100%;
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
        .form-control {
          height: 35px;
          border-radius: 0;
        }
      }
      #project_id {
        border-right: 1px solid black;
      }
      #project_name {
        border-left: 1px solid black;
      }
      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
        button {
          @include back_to_previous_btn;
          &:hover {
            background-color: #5d85bb;
          }
          &:nth-child(2) {
            background: var(--c-5, #E94B4B);
            justify-content: center;
            align-items: center;
            display: inline-flex;
            border-radius: 10px;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            margin: 0 10px;
            &:hover {
              background-color: #a51e1e;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
          color: white;
          margin-bottom: 0;
          font-weight: 700;
          &::before {
            content: "\26A0";
          }
        }
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
        .code_search {
          background: #48658C;
          color: white;
          font-weight: 800;
          height: 30px;
          width: 60px;
          margin-right: 10px;
          display: flex;
          align-self: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
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
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .column_section {
          flex-direction: column;
        }
        .third_content {
          .list {
            border: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #FF7272
              }
            }
          }
          .delete {
            border-top: 0px solid #484143;
            border-right: 0px dashed #484143;
            border-bottom: 0px dashed #484143;
            border-left: 1px solid #484143;
            width: 70px;
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: 50px !important;
            border-radius: 0;
          }
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            flex-direction: column;
            label.use,
            .form-label {
              border-bottom: 1px solid black;
              width: 100%;
              height: 30px;
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
        .form-control {
          height: 35px;
          border-radius: 0;
        }
      }
      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
        button {
          @include back_to_previous_btn;
          &:hover {
            background-color: #5d85bb;
          }
          &:nth-child(2) {
            background: var(--c-5, #E94B4B);
            justify-content: center;
            align-items: center;
            display: inline-flex;
            border-radius: 10px;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            margin: 0 10px;
            &:hover {
              background-color: #a51e1e;
            }
          }
        }
      }
    }
  }
</style>