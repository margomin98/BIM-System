<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>訂單管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        <router-link to="/order_new">
          <button class="add_btn">新增訂單</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <!-- 狀態 -->
          <div class="col-xl-auto col-lg-auto col-md-6 col-12">
            <p>狀態</p>
            <select class="form-select" v-model="searchParams.Status" id="statusSelect">
            <option value="" selected>請選擇</option>
            <template v-for="item in Order_StatusArray" :key="item">
              <option :value="item">{{ item }}</option>
</template>
      </select>
          </div>
          <!-- 使用專案 -->
          <div class="col-xl-auto col-lg-auto col-md-6 col-12">
            <p>使用專案</p>
            <input type="text" v-model="searchParams.Use" />
          </div>
          <!-- 採購來源 -->
          <div class="col-xl-auto col-lg-auto col-md-6 col-12">
            <p>採購來源</p>
            <input type="text" v-model="searchParams.Source" />
          </div>
          <!-- 下訂日期(起) -->
          <div class="col-xl-auto col-lg-auto col-md-6 col-12">
            <p>下訂日期(起)</p>
            <input type="date" class="date-input" v-model="searchParams.StartDate" />
          </div>
          <!-- 下訂日期(迄) -->
          <div class="col-xl-auto col-lg-auto col-md-6 col-12">
            <p>下訂日期(迄)</p>
            <input type="date" class="date-input" v-model="searchParams.EndDate" />
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn" @click="submit('', 'search')">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
        <!-- <button class="export_btn">匯出</button> -->
      </div>
    </div>
    <div class="dg-height mb-5">
      <DataTable lazy :key="datagrid.key" :first="datagrid.first" :size="'small'" :loading="datagrid.loading"
        :value="rowData" :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns
        columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" @page="submit($event, 'page')"
        @sort="submit($event, 'sort')" paginator :rows="datagrid.rows" :totalRecords="datagrid.totalRecords"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]"
        currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 60px;">
<template #body="slotProps">
  <Order_button :params="slotProps" />
</template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable
          :style="{ 'min-width': item.width }"></Column>
        <Column style="min-width: 60px;">
<template #body="slotProps">
  <Delete :params="slotProps" />
</template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Order_button from "@/components/Order_button";
  import Delete from "@/components/Order_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    useRouter
  } from "vue-router";
  import {
    UpdatePageParameter,
    createDatagrid,
    selectItem
  } from '@/assets/js/common_fn';
  import {
    Order_StatusArray
  } from '@/assets/js/dropdown'
  import {
    getMngDatagrid
  } from '@/assets/js/common_api';
  const router = useRouter();
  const searchParams = reactive({
    Status: '',
    Use: '',
    Source: '',
    StartDate: '',
    EndDate: '',
  });
  const datagrid = createDatagrid();
  const datagridfield = [{
      header: "單號",
      field: "PO_ID",
      width: '150px'
    },
    {
      header: "狀態",
      field: "Status",
      width: '130px'
    },
    {
      header: "訂單編號",
      field: "PurchaseNum",
      width: '150px'
    },
    {
      header: "使用專案",
      field: "Use",
      width: '180px'
    },
    {
      header: "採購來源",
      field: "Source",
      width: '150px'
    },
    {
      header: "採購件數",
      field: "Quantity",
      width: '130px'
    },
    {
      header: "下訂日期",
      field: "PurchaseDate",
      width: '130px'
    },
    {
      header: "承辦人員",
      field: "Executor",
      width: '130px'
    },
  ]
  const rowData = ref([]);
  onMounted(() => {
    datagrid.sortField = 'PO_ID'
    submit('', 'search');
  });
  async function submit(event, type) {
    const form = new FormData();
    //將表格資料append到 form
    for (const key in searchParams) {
      if (searchParams[key]) {
        form.append(key, searchParams[key]);
      }
    }
    UpdatePageParameter(datagrid, event, type, form)
    getMngDatagrid('/PurchasingMng/PurchaseOrders', rowData, datagrid, form);
  }
  const clear = () => {
    for (const key in searchParams) {
      searchParams[key] = '';
    }
    submit('', 'search');
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .datagrid_section {
    input,
    select {
      @include dropdown_btn;
      width: 100%;
      height: 35px;
    }
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
      }
      .datagrid_section {
        .content {
          background: rgba(82, 136, 156, 0.8);
          border-radius: 10px;
          margin-bottom: 30px;
          height: 240px;
          align-items: center;
          display: flex;
          justify-content: center;
        }
        .row {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px 5px;
          p {
            @include datagrid_title;
          }
          input {
            @include dropdown_btn;
            width: 240px;
            height: 35px;
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
          display: flex;
          flex-direction: column;
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
    }
  }
</style>