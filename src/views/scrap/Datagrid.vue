<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>報廢管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        <router-link to="/scrap_new">
          <button class="add_btn">新增報廢單</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <!-- 報廢編號 -->
          <div class="col-xl-12 col-md-6 col-12">
            <p>報廢編號</p>
            <input type="text" v-model="searchParams.ScrapId" />
          </div>
          <!-- 狀態 -->
          <div class="col-xl-12 col-md-6 col-12">
            <p>狀態</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ searchParams.Status || "請選擇" }}
                  </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item , index) in DropdownArray.Status" :key="index" class="dropdown-item" @click="selectStatus(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <!-- 資產編號 -->
          <div class="col-xl-12 col-md-6 col-12">
            <p>資產編號</p>
            <input type="text" v-model="searchParams.AssetsId" />
          </div>
          <!-- 物品名稱 -->
          <div class="col-xl-12 col-md-6 col-12">
            <p>物品名稱</p>
            <input type="text" v-model="searchParams.AssetName" />
          </div>
          <!-- 日期類型 -->
          <div class="col-xl-12 col-md-6 col-12">
            <p>日期類型</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ searchParams.DateCategory || "請選擇" }}
                  </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item , index) in DropdownArray.DateCategory" :key="index" class="dropdown-item" @click="selectDateCategory(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <!-- 日期(起) -->
          <div class="col-xl-12 col-md-6 col-12  flex-col">
            <p>日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.StartDate" class="date-input" :disabled="!searchParams.DateCategory" />
              </div>
            </div>
          </div>
          <!-- 日期(迄) -->
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
      </div>
    </div>
    <div style="width: 100%;margin-bottom:3%" class="mb-5">
      <div class="dg-height">
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
              <Scrap_button :params = "slotProps"/>
            </template>
          </Column>
          <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
          <Column style="min-width: 60px;">
            <template #body="slotProps">
              <Delete :params = "slotProps"/>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import Scrap_button from "@/components/Scrap_button";
  import Delete from "@/components/Scrap_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    Scrap_StatusArray,
    Scrap_DateCategory
  } from "@/assets/js/dropdown.js"
  import { getMngDatagrid, } from '@/assets/js/common_api'
  import { UpdatePageParameter, createDatagrid } from '@/assets/js/common_fn';
  import axios from 'axios';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Scrap_button,
      Delete
    },
    setup() {
      const searchParams = reactive({
        ScrapId: '',
        Status: '',
        AssetsId: '',
        AssetName: '',
        DateCategory: '',
        StartDate: '',
        EndDate: '',
      });
      const DropdownArray = reactive({
        Status: Scrap_StatusArray,
        DateCategory: Scrap_DateCategory,
      })
      const datagrid = createDatagrid();
      const datagridfield = [
        { header: "報廢編號", field: "ScrapId", width: '180px' },
        { header: "狀態", field: "Status", width: '120px' },
        { header: "資產編號", field: "AssetsId", width: '150px' },
        { header: "物品名稱", field: "AssetName", width: '180px' },
        { header: "申請日期", field: "ApplicationDate", width: '150px' },
        { header: "申請人員", field: "Applicant", width: '120px' },
        { header: "交付日期", field: "DeliveryDate", width: '150px' },
        { header: "報廢人員", field: "ScrapPerson", width: '120px' },
        { header: "審核日期", field: "VerifyDate", width: '150px' },
        { header: "審核人員", field: "VerifyPerson", width: '120px' },
      ]
      const rowData = ref([]);
      onMounted(() => {
        datagrid.sortField = 'ScrapId'
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
        getMngDatagrid('/ScrapMng/ScrapOrders',rowData,datagrid,form);
      }
      const selectStatus = (item) => {
        searchParams.Status = item;
      };
      const selectDateCategory = (item) => {
        searchParams.DateCategory = item;
      };
      function clear() {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        submit('','search');
      }
      return {
        searchParams,
        DropdownArray,
        datagrid,
        datagridfield,
        rowData,
        submit,
        selectStatus,
        selectDateCategory,
        clear,
      };
    },
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
        .add_btn {
          @include datagrid_button_no1;
          width: 150px;
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
          width: 150px;
          &:hover {
            background-color: #537ebc;
          }
        } // .export_btn {
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
        .add_btn {
          @include datagrid_button_no1;
          font-size: 18px;
          width: 100%;
          height: auto;
          &:hover {
            background-color: #537ebc;
          }
        } // .export_btn {
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
        text-align: left !important;
      }
    }
  }
</style>