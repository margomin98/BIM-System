<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>盤點計畫管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        <router-link to="/inventory_new">
          <button class="add_btn">新增盤點計畫</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col-xl-12 col-md-6 col-12">
            <p>計畫編號</p>
            <input type="text" v-model="searchParams.PlanId" />
          </div>
          <div class="col-xl-12 col-md-6 col-12">
            <p>盤點類型</p>
            <select v-model="searchParams.PlanType" class="form-select" aria-label="Select Plan Type">
            <option value="" disabled selected>請選擇</option>
            <option v-for="(item, index) in DropdownArray.PlanType" :key="index" :value="item">{{ item }}</option>
        </select>
          </div>
          <div class="col-xl-12 col-md-6 col-12">
            <p>盤點狀態</p>
            <select class="form-select" v-model="searchParams.PlanStatus" @change="selectStatus">
                <option value="" disabled selected>請選擇</option>
                <option v-for="(item, index) in DropdownArray.PlanStatus" :key="index" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="col-xl-12 col-md-6 col-12">
            <p>日期類型</p>
            <select v-model="searchParams.DateCategory" id="dateCategorySelect" class="form-select">
            <option value="" disabled selected>請選擇</option>
            <option v-for="(item, index) in DropdownArray.PlanDateCategory" :key="index" :value="item">{{ item }}</option>
        </select>
          </div>
          <div class="col-xl-12 col-md-6 col-12  flex-col">
            <p>日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.StartDate" class="date-input" />
              </div>
            </div>
          </div>
          <div class="col-xl-12 col-md-6 col-12 flex-col">
            <p>日期(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.EndDate" class="date-input" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn" @click="submit('' , 'search')">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
      </div>
    </div>
    <div style="height: 450px" class="mb-5">
      <DataTable :key="datagrid.key" lazy :first="datagrid.first" :size="'small'" :loading="datagrid.loading" :value="rowData" :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable
        scrollHeight="420px" @page="submit($event , 'page')" @sort="submit($event , 'sort')" paginator :rows="datagrid.rows" :totalRecords="datagrid.totalRecords" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 200px;">
          <template #body="slotProps">
                    <Inventory_button :params = "slotProps" @updateSearchId="updateSearchId" />
</template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        <Column>
<template #body="slotProps">
  <Delete :params="slotProps" />
</template>
        </Column>
      </DataTable>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">警示</h5>
          <div class="close_icon"><p type="button" data-bs-dismiss="modal" aria-label="Close">X</p></div>
        </div>
        <div class="modal-body">
        <p>即將開始進行盤點作業，按下確認後即無法編輯盤點計畫內容。</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn confirm" data-bs-dismiss="modal" @click="routerProcess">確認</button>
        </div>
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
  import Inventory_button from "@/components/Inventory_button";
  import Delete from "@/components/Inventory_data_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    PlanType,
    PlanStatus,
    PlanDateCategory
  } from "@/assets/js/dropdown.js"
  import {
    UpdatePageParameter,
    createDatagrid
  } from "@/assets/js/common_fn";
  import {
    useRouter
  } from "vue-router";
  import axios from "axios";
  import {
    getMngDatagrid
  } from '@/assets/js/common_api';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Inventory_button,
      Delete
    },
    setup() {
      const router = useRouter();
      const search_id = ref('');
      const DropdownArray = reactive({
        PlanType: PlanType,
        PlanStatus: PlanStatus,
        PlanDateCategory: PlanDateCategory,
      })
      const searchParams = reactive({
        PlanId: '',
        PlanType: '',
        PlanStatus: '',
        DateCategory: '',
        StartDate: '',
        EndDate: '',
      });
      const rowData = ref([]);
      const datagrid = createDatagrid()
      const datagridfield = [{
          field: 'PlanId',
          header: '計畫編號',
          width: '150px',
        },
        {
          field: 'PlanType',
          header: '盤點類型',
          width: '150px',
        },
        {
          field: 'PlanStatus',
          header: '盤點狀態',
          width: '150px',
        },
        {
          field: 'PlanTitle',
          header: '標題',
          width: '150px',
        },
        {
          field: 'InventoryStaffName',
          header: '盤點人員',
          width: '150px',
        },
        {
          field: 'ConvenerName',
          header: '召集人員',
          width: '110px',
        },
        {
          field: 'PlanStart',
          header: '盤點開始日期',
          width: '150px',
        },
        {
          field: 'PlanEnd',
          header: '盤點結束日期',
          width: '150px',
        },
        {
          field: 'EditTime',
          header: '最近編輯時間',
          width: '150px',
        },
      ];
      onMounted(() => {
        datagrid.sortField = 'PlanId';
        submit('', 'search');
      });
      async function submit(event, type) {
        const form = new FormData();
        // console.log(event);
        // 將表格資料append到 form
        for (const key in searchParams) {
          form.append(key, searchParams[key]);
        }
        UpdatePageParameter(datagrid, event, type, form);
        getMngDatagrid('/StocktakingMng/InventoryPlans', rowData, datagrid, form);
      }
      const updateSearchId = (id) => {
        search_id.value = id;
      }
      function routerProcess() {
        router.push({
          name: 'Inventory_Process',
          query: {
            search_id: search_id.value,
          }
        });
      }
      function clear() {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        submit('', 'search');
      }
      return {
        searchParams,
        DropdownArray,
        datagrid,
        datagridfield,
        search_id,
        rowData,
        rowHeight: 35,
        pageSize: 10,
        submit,
        updateSearchId,
        routerProcess,
        clear,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  @import "@/assets/css/theme.css";
  .modal {
    .modal-body {
      padding: 20px;
      margin: auto;
      p {
        text-align: center;
        font-weight: 800;
      }
    }
    .modal-content {
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
      justify-content: center;
      .confirm {
        color: white;
        font-weight: 700;
        background-color: #5d85bd;
        &:hover {
          background-color: #6d92b3;
        }
      }
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
        align-self: unset;
      }
      .modal-title {
        margin: auto;
      }
    }
  }
  .datagrid_section {
    input,
    select {
      @include dropdown_btn;
      width: 100%;
      height: 35px;
    }
  }
  @media only screen and (min-width: 1200px) {
    .modal-content {
      width: 300px;
    }
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
          width: 170px;
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
        } //  .export_btn {
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
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px 5px;
          .col-xl-2 {
            margin: 0 3px;
          }
          p {
            @include datagrid_title;
          }
          button {
            border: none;
            padding: 0;
            width: 100%;
            font-size: 18px;
            height: 100%;
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
    .modal-content {
      width: 300px;
    }
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
          width: 170px;
          &:hover {
            background-color: #537ebc;
          }
        } //    .export_btn {
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
          button {
            padding: 0;
            width: 100%;
            font-size: 18px;
            height: 100%;
            text-align: left;
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
        //     @include export_btn;
        //     font-size: 18px;
        //     width: 100%;
        //     height: auto;
        //     &:hover {
        //       background-color: #274266;
        //     }
        //   }
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
          button {
            padding: 0;
            width: 100%;
            font-size: 18px;
            height: 100%;
            text-align: left;
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