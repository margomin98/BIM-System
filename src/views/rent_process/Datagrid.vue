<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出庫作業管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col-xl-12 col-md-6 col-12">
            <p>單號</p>
            <input type="text" v-model="searchParams.AO_ID" />
          </div>
          <div class="col-xl-12 col-md-6 col-12">
            <p>專案名稱</p>
            <input type="text" v-model="searchParams.ProjectName" />
          </div>
          <div class="col-xl-12 col-md-6 col-12">
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
          <div class="col-xl-12 col-md-6 col-12">
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
          <div class="col-xl-12 col-md-6 col-12">
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
          <div class="col-xl-12 col-md-6 col-12">
            <p>日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.StartDate" class="date-input" :disabled="!searchParams.DateCategory" />
              </div>
            </div>
          </div>
          <div class="col-xl-12 col-md-6 col-12 flex-col">
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
        <button class="search_btn" @click="submit('','search')">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
        <!-- <button class="export_btn">匯出</button> -->
      </div>
    </div>
    <div class="dg-height mb-5">
      <DataTable
        lazy
        :key="datagrid.key"
        :first= "datagrid.first"
        :size="'small'"
        :loading="datagrid.loading"
        :value="rowData" 
        :sort-field="datagrid.sortField"
        :sort-order="datagrid.sortOrder"
        resizableColumns 
        columnResizeMode="expand"
        showGridlines 
        scrollable 
        scrollHeight="420px" 
        @page="submit($event , 'page')" 
        @sort="submit($event , 'sort')"
        paginator 
        :rows="datagrid.rows" 
        :totalRecords="datagrid.totalRecords"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]"
        currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 60px;">
          <template #body="slotProps">
            <Rent_process_button :params = "slotProps" @updategrid="submit('','');"/>
          </template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width , 'max-width': item.max}"></Column>
        <Column style="min-width: 60px;">
          <template #body="slotProps">
            <Delete :params = "slotProps"/>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import {
    ref,
    onMounted,
    reactive
  } from "vue";
  import Rent_process_button from "@/components/Rent_process_button";
  import Delete from "@/components/Rent_process_delete_button ";
  import Navbar from "@/components/Navbar.vue";
  import {
    Rent_UseArray,
    Rent_StatusArray,
    Rent_Process_DateCategory
  } from "@/assets/js/dropdown";
  import { UpdatePageParameter, createDatagrid } from '@/assets/js/common_fn';
  import { getMngDatagrid } from '@/assets/js/common_api';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Rent_process_button,
      Delete,
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
      const UseArray = Rent_UseArray;
      const StatusArray = Rent_StatusArray;
      const DateCategoryArray = Rent_Process_DateCategory;
      const datagrid = createDatagrid();
      const datagridfield = [
        { header: "狀態", field: "Status", width: '130px' },
        { header: "單號", field: "AO_ID", width: '150px' },
        { header: "專案名稱", field: "ProjectName", width: '170px' , max: '300px'},
        { header: "用途", field: "Use", width: '130px' },
        { header: "說明", field: "Description", width: '150px' , max: '350px'},
        { header: "申請人員", field: "Applicant", width: '150px' },
        { header: "申請日期", field: "ApplicationDate", width: '170px' },
        { header: "備料日期", field: "PrepareDate", width: '170px' },
        { header: "審核日期", field: "VerifyDate", width: '170px' },
        { header: "出庫日期", field: "AssetsOutDate", width: '170px' },
      ]
      const rowData = ref([]);
      onMounted(() => {
        datagrid.sortField = 'AO_ID'
        submit('','search');
      });
      async function submit(event,type) {
        const form = new FormData();
        //將表格資料append到 form
        for (const key in searchParams) {
          if (searchParams[key]) {
            form.append(key, searchParams[key]);
          }
        }
        UpdatePageParameter(datagrid,event,type,form)
        getMngDatagrid('/AssetsOutMng/Operating',rowData,datagrid,form);
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
        submit('','search');
      };
      return {
        searchParams,
        UseArray,
        StatusArray,
        DateCategoryArray,
        datagrid,
        datagridfield,
        rowData,
        selectUse,
        selectStatus,
        selectDateCategory,
        submit,
        clear,
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .dg-height {
    @include datagrid-height;
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      padding: 0 10%;
      h1 {
        margin: 50px 0 20px;
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
        text-align: left !important;
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
        text-align: left !important;
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
        text-align: left !important;
      }
    }
  }
</style>