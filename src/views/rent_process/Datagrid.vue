<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出庫作業管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>單號</p>
            <input type="text" v-model="searchParams.AO_ID" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>專案名稱</p>
            <input type="text" v-model="searchParams.ProjectName" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>用途</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ searchParams.Use || "請選擇" }}
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
                  {{ searchParams.Status || "請選擇" }}
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
                  {{ searchParams.DateCategory || "請選擇" }}
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
                <input type="date" v-model="searchParams.StartDate" class="date-input" :disabled="!searchParams.DateCategory" />
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12 flex-col">
            <p>日期(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.EndDate" class="date-input" :disabled="!searchParams.DateCategory" />
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
        <!-- <button class="export_btn">匯出</button> -->
      </div>
    </div>
    <div style="width: 100%">
      <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :paginationPageSize="pageSize" :pagination="true">
      </ag-grid-vue>
    </div>
  </div>
</template>

<script>
  import {
    ref,
    onMounted,
    reactive
  } from "vue";
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Rent_process_button from "@/components/Rent_process_button";
  import Rent_process_delete_button from "@/components/Rent_process_delete_button ";
  import Navbar from "@/components/Navbar.vue";
  import router from "@/router";
  import {
    Rent_UseOptions,
    Rent_StatusArray,
    Rent_Process_DateCategory
  } from "@/assets/js/dropdown";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Rent_process_button,
      Rent_process_delete_button,
    },
    data() {
      return {
        rowHeight: 35,
      }
    },
    setup() {
      const searchParams = reactive({
        AO_ID: '',
        ProjectName: '',
        Use: '',
        Status: '',
        DateCategory: '',
        StartDate: '',
        EndDate: '',
      })
      const UseArray = Rent_UseOptions;
      const StatusArray = Rent_StatusArray;
      const DateCategoryArray = Rent_Process_DateCategory;
      const pageSize = 10;
      const columnDefs = [{
          suppressMovable: true,
          field: "",
          cellRenderer: "Rent_process_button",
          cellRendererParams: {
            refresh: submit,
          },
          width: 300,
          resizable: true,
        },
        {
          headerName: "狀態",
          field: "Status",
          unSortIcon: true,
          sortable: true,
          width: 130,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "單號",
          field: "AO_ID",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true,
        },
        {
          headerName: "專案名稱",
          field: "ProjectName",
          unSortIcon: true,
          sortable: true,
          width: 170,
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
          width: 130,
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
          headerName: "申請日期",
          field: "ApplicationDate",
          unSortIcon: true,
          sortable: true,
          width: 170,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "備料日期",
          field: "PrepareDate",
          unSortIcon: true,
          sortable: true,
          width: 170,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "審核日期",
          field: "VerifyDate",
          unSortIcon: true,
          sortable: true,
          width: 170,
          resizable: true,
          suppressMovable: true
        }, {
          headerName: "出庫日期",
          field: "AssetsOutDate",
          unSortIcon: true,
          sortable: true,
          width: 170,
          resizable: true,
          suppressMovable: true
        },
        {
          field: "",
          resizable: true,
          width: 100,
          cellRenderer: "Rent_process_delete_button",
        }
      ];
      const rowData = ref([]);
      async function submit() {
        const formData = new FormData();
        //將表格資料append到 formData
        for (const key in searchParams) {
          formData.append(key, searchParams[key]);
        }
        const axios = require('axios');
        try {
          const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/Operating', formData);
          const data = response.data;
          if (data.state === 'success') {
            //取得datagrid成功
            console.log('datagrid:', data.resultList);
            rowData.value = data.resultList;
          } else if (data.state === 'account_error') {
            //尚未登入
            alert(data.messages);
            router.push('/');
          } else {
            //取得datagrid失敗
            alert(data.messages);
          }
        } catch (error) {
          console.error('Error sending data to backend', error);
        }
      }
      function selectUse(item) {
        searchParams.Use = item;
      }
      const selectStatus = (item) => {
        searchParams.Status = item;
      };
      const selectDateCategory = (item) => {
        searchParams.DateCategory = item;
      };
      const clear = () => {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        submit();
      };
      onMounted(() => {
        submit();
      });
      return {
        searchParams,
        UseArray,
        StatusArray,
        DateCategoryArray,
        pageSize,
        selectUse,
        selectStatus,
        selectDateCategory,
        submit,
        clear,
        columnDefs,
        rowData,
      };
    }
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
        } // .export_btn {
        //   @include export_btn;
        //   &:hover {
        //     background-color: #274266;
        //   }
        // }
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
        gap: 20px; // .export_btn {
        //   @include export_btn;
        //   &:hover {
        //     background-color: #274266;
        //   }
        // }
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
        gap: 20px; // .export_btn {
        //   @include export_btn;
        //   font-size: 18px;
        //   width: 100%;
        //   height: auto;
        //   &:hover {
        //     background-color: #274266;
        //   }
        // }
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