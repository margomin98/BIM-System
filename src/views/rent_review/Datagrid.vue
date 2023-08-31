<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出庫審核管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>單號</p>
            <input type="text" v-model="AO_ID" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>專案名稱</p>
            <input type="text" v-model="ProjectName" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>用途</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ Use || "請選擇" }}
                          </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item , index) in UseArray" :key="index" class="dropdown-item" @click="selectUse(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-2 col-md-6 col-12">
            <p>狀態</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ Status || "請選擇" }}
                          </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item , index) in StatusArray" :key="index" class="dropdown-item" @click="selectStatus(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-2 col-md-6 col-12">
            <p>日期類型</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ DateCategory || "請選擇" }}
                          </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item , index) in DateCategoryArray" :key="index" class="dropdown-item" @click="selectDateCategory(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12  flex-col">
            <p>日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="StartDate" class="date-input" />
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12 flex-col">
            <p>日期(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="EndDate" class="date-input" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn" @click="submit">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
      </div>
    </div>
    <div style="width: 100%">
      <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;" :rowHeight="35" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :paginationAutoPageSize="true" :pagination="true"
        :alwaysShowHorizontalScroll="true">
      </ag-grid-vue>
    </div>
  </div>
</template>

<script>
  import {
    ref,
    onMounted
  } from "vue";
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Rent_review_button from "@/components/Rent_review_button";
  import Delete from "@/components/Delete_button";
  import Navbar from "@/components/Navbar.vue";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Rent_review_button,
      Delete
    },
    setup() {
      const AO_ID = ref('');
      const ProjectName = ref('');
      const Use = ref('');
      const UseArray = ['內部領用', '借測', '維修', '出貨', '報廢', '退貨']
      const Status = ref(''); //狀態
      const StatusArray = ref(['待審核' , '審核通過', '審核不通過'])
      const DateCategory = ref('');
      const DateCategoryArray = ['申請日期', '審核日期'];
      const StartDate = ref(''); //日期(起)
      const EndDate = ref(''); //日期(迄)
      const pageSize = 10;
      const columnDefs = [{
          suppressMovable: true,
          field: "",
          cellRenderer: "Rent_review_button",
          width: 150,
          resizable: true,
        },
        {
          headerName: "狀態",
          field: "Status",
          unSortIcon: true,
          sortable: true,
          width: 160,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "單號",
          field: "AO_ID",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "專案名稱",
          field: "ProjectName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "說明",
          field: "Description",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "用途",
          field: "Use",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "申請日期",
          field: "ApplicationDate",
          unSortIcon: true,
          sortable: true,
          width: 160,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "申請人員",
          field: "Applicant",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "審核日期",
          field: "VerifyDate",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        }, {
          headerName: "審核人員",
          field: "VerifyPerson",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          width: 100,
          field: "",
          cellRenderer: "Delete",
          resizable: true,
        }
      ];
      const rowData = ref([]);
      async function submit() {
        const formData = new FormData();
        const formFields = {
          'AO_ID': AO_ID.value,
          'ProjectName': ProjectName.value,
          'Use': Use.value,
          'Status': Status.value,
          'DateCategory': DateCategory.value,
          'StartDate': StartDate.value,
          'EndDate': EndDate.value,
        };
        //將表格資料append到 formData
        for (const fieldName in formFields) {
          formData.append(fieldName, formFields[fieldName]);
        }
        const axios = require('axios');
        try {
          const response = await axios.post('http://192.168.0.176:7008/AssetsOutMng/ReviewOperating', formData);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            //取得datagrid成功
            // console.log(data.state);
            console.log('datagrid', data.resultList);
            rowData.value = data.resultList;
          } else if (data.state === 'error') {
            //取得datagrid失敗
            alert(data.messages);
          } else if (data.state === 'input_error') {
            //取得datagrid格式錯誤
            alert(data.messages);
          } else if (data.state === 'account_error') {
            //尚未登入
            alert(data.messages);
            router.push('/');
          } else {
            throw new Error('Request was not successful');
          }
        } catch (error) {
          console.error('Error sending data to backend', error);
        }
      }
      function selectUse(item) {
        Use.value = item;
      }
      const selectStatus = (item) => {
        Status.value = item;
      };
      const selectDateCategory = (item) => {
        DateCategory.value = item;
      };
      const clear = () => {
        AO_ID.value = '';
        ProjectName.value = '';
        Use.value = '';
        Status.value = '';
        DateCategory.value = '';
        StartDate.value = '';
        EndDate.value = '';
        submit();
      };
      const frameworkComponents = {
        agGridVue: AgGridVue
      };
      onMounted(() => {
        submit();
      });
      return {
        AO_ID,
        ProjectName,
        Use,
        UseArray,
        Status,
        StatusArray,
        DateCategory,
        DateCategoryArray,
        StartDate,
        EndDate,
        pageSize,
        selectUse,
        selectStatus,
        selectDateCategory,
        submit,
        clear,
        columnDefs,
        rowData,
        frameworkComponents,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  @media only screen and (min-width: 1200px) {
    .main_section {
      padding: 0 10%;
      h1 {
        margin-bottom: 20px;
        margin-top: 30px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .button_wrap {
        margin-bottom: 25px;
        gap: 20px;
        .add_btn {
          @include datagrid_button_no1;
          width: 195px;
          &:hover {
            background-color: #537ebc;
          }
        }
        .search_btn {
          @include search_and_send_btn;
          &:hover {
            background-color: #5e7aa2;
          }
        }
        .empty_btn {
          @include empty_btn;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .export_btn {
          @include export_btn;
          &:hover {
            background-color: #274266;
          }
        }
      }
      .datagrid_section {
        .content {
          background: rgba(82, 136, 156, 0.8);
          border-radius: 10px;
          margin-bottom: 30px;
          height: 250px;
          align-items: center;
          display: flex;
          justify-content: center;
        }
        .row {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 40px 5px;
          .col-xl-2 {
            margin: 0 3px;
          }
          p {
            @include datagrid_title;
          }
          input {
            @include dropdown_btn;
            width: 200px;
            height: 35px;
          }
          button {
            border: none;
            padding: 0;
            width: 100%;
            font-size: 18px;
            height: 100%;
          }
          .dropdown {
            width: 200px;
            height: 35px;
            @include dropdown_btn;
            .dropdown-toggle {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border: none;
            }
            .dropdown-menu {
              width: 100%;
              transform: translate3d(-1px, 35px, 0px) !important;
              max-height: 250px;
              overflow-y: auto;
              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .datagrid-header-row {
        background: var(--c-7, #1f4e5f);
      }
      .datagrid-header .datagrid-cell {
        text-align: left importtant;
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      padding: 0 5%;
      h1 {
        margin-top: 30px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
        margin-bottom: 20px;
      }
      .button_wrap {
        margin-bottom: 25px;
        gap: 20px;
        .add_btn {
          @include datagrid_button_no1;
          width: 190px;
          &:hover {
            background-color: #537ebc;
          }
        }
        .export_btn {
          @include export_btn;
          &:hover {
            background-color: #274266;
          }
        }
        .search_btn {
          @include search_and_send_btn;
          &:hover {
            background-color: #5e7aa2;
          }
        }
        .empty_btn {
          @include empty_btn;
          &:hover {
            background-color: #5d85bd;
          }
        }
      }
      .datagrid_section {
        .row {
          gap: 10px 0;
          padding: 30px;
          @include datagrid_bg;
          p {
            @include datagrid_title;
          }
          input {
            @include dropdown_btn;
            width: 100%;
            height: 35px;
          }
          button {
            padding: 0;
            width: 100%;
            font-size: 18px;
            height: 100%;
            text-align: left;
          }
          .dropdown {
            width: 100%;
            height: 35px;
            @include dropdown_btn;
            .dropdown-toggle {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border: none;
            }
            .dropdown-menu {
              width: 100%;
              transform: translate3d(-1px, 35px, 0px) !important;
              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
              }
            }
          }
        }
      }
      .datagrid-header-row {
        background: var(--c-7, #1f4e5f);
      }
      .datagrid-header .datagrid-cell {
        text-align: left importtant;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      padding: 5%;
      h1 {
        margin-top: 30px;
        text-align: center;
        font-size: 50px;
        font-weight: 600;
        @include title_color;
        margin-bottom: 20px;
      }
      .button_wrap {
        margin-bottom: 25px;
        justify-content: center;
        gap: 20px;
        .add_btn {
          @include datagrid_button_no1;
          font-size: 18px;
          width: 100%;
          height: auto;
          &:hover {
            background-color: #537ebc;
          }
        }
        .export_btn {
          @include export_btn;
          font-size: 18px;
          width: 100%;
          height: auto;
          &:hover {
            background-color: #274266;
          }
        }
        .search_btn {
          @include search_and_send_btn;
          font-size: 18px;
          width: 100%;
          height: auto;
          &:hover {
            background-color: #5e7aa2;
          }
        }
        .empty_btn {
          @include empty_btn;
          font-size: 18px;
          width: 100%;
          height: auto;
          &:hover {
            background-color: #5d85bd;
          }
        }
      }
      .datagrid_section {
        .row {
          gap: 10px 0;
          padding: 30px;
          @include datagrid_bg;
          p {
            @include datagrid_title;
            font-size: 18px;
          }
          input {
            @include dropdown_btn;
            width: 100%;
            height: 35px;
          }
          button {
            padding: 0;
            width: 100%;
            font-size: 18px;
            height: 100%;
            text-align: left;
          }
          .dropdown {
            width: 100%;
            height: 35px;
            @include dropdown_btn;
            .dropdown-toggle {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border: none;
            }
            .dropdown-menu {
              width: 100%;
              transform: translate3d(-1px, 35px, 0px) !important;
              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
              }
            }
          }
        }
      }
      .datagrid-header-row {
        background: var(--c-7, #1f4e5f);
      }
      .datagrid-header .datagrid-cell {
        text-align: left importtant;
      }
    }
  }
</style>