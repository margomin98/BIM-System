<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>系統日誌管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <!-- 使用者帳號 -->
          <div class="col">
            <p>使用者帳號</p>
            <input type="text" v-model="searchParams.Account_Id" />
          </div>
          <!-- 執行動作 -->
          <div class="col">
            <p>執行動作</p>
            <select v-model="searchParams.Active" class="form-select">
            <option value="" disabled selected>請選擇</option>
            <option v-for="(item, index) in DropdownArray.Active" :key="index" :value="item">{{ item }}</option>
        </select>
          </div>
          <!-- 訊息 -->
          <div class="col">
            <p>訊息</p>
            <input type="text" v-model="searchParams.Message" />
          </div>
          <!-- 日期（起） -->
          <div class="col">
            <p>執行時間(起)</p>
            <input type="datetime-local" class="date-input" v-model="searchParams.StartDate" />
          </div>
          <!-- 日期(迄) -->
          <div class="col">
            <p>執行時間(迄)</p>
            <input type="datetime-local" class="date-input" v-model="searchParams.EndDate" />
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
      <DataTable lazy :key="datagrid.key" :first="datagrid.first" :size="'small'" :loading="datagrid.loading" :value="rowData" :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable
        scrollHeight="420px" @page="submit($event , 'page')" @sort="submit($event , 'sort')" paginator :rows="datagrid.rows" :totalRecords="datagrid.totalRecords" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 60px;">
          <template #body="slotProps">
                    <System_log_button :params = "slotProps"/>
</template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width, 'max-width': item.max}"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import System_log_button from "@/components/System_log_view_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    onActivated,
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    getMngDatagrid
  } from '@/assets/js/common_api';
  import {
    UpdatePageParameter,
    createDatagrid,
  } from '@/assets/js/common_fn';
  import {
    SystemLog_ActiveArray
  } from '@/assets/js/dropdown';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      System_log_button
    },
    setup() {
      const searchParams = reactive({
        Account_Id: '',
        Active: '',
        Message: '',
        StartDate: '',
        EndDate: '',
      });
      const DropdownArray = reactive({
        Active: SystemLog_ActiveArray,
      })
      const datagrid = createDatagrid();
      const datagridfield = [{
          field: "Account_Id",
          width: '150px',
          header: "使用者帳號"
        },
        {
          field: "Active",
          width: '150px',
          header: "執行動作"
        },
        {
          field: "Controller",
          width: '150px',
          header: "Controller"
        },
        {
          field: "Action",
          width: '150px',
          header: "Action"
        },
        {
          field: "Message",
          width: '250px',
          header: "訊息",
          max: '550px'
        },
        {
          field: "LogTime",
          width: '200px',
          header: "執行時間"
        }
      ]
      const rowData = ref([]);
      onActivated(()=>{
        submit('', ''); // 透過keep-alive 觸發的情況下，不更改條件刷新datagrid
      })
      onMounted(() => {
        datagrid.sortField = 'LogTime'
        submit('', 'search');
      });
      async function submit(event, type) {
        const form = new FormData();
        //將表格資料append到 form
        for (const key in searchParams) {
          form.append(key, searchParams[key]);
        }
        UpdatePageParameter(datagrid, event, type, form);
        getMngDatagrid('/SystemLogMng/SystemLogs', rowData, datagrid, form);
      }
      const clear = () => {
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
        rowData,
        submit,
        clear,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";.datagrid_section {
  .row {
    @include datagrid_bg;
  }

  input,
  select {
    @include dropdown_btn;
    width: 100%;
    height: 35px;
  }

  .content {
    p {
      @include datagrid_title;
    }
  }
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

@media only screen and (min-width: 1200px) {
  .main_section {
    padding: 0 10%;

    .datagrid_section {
      .row {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px 5px;
        padding: 2% 10%;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    padding: 0 5%;

    .datagrid_section {
      .row {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        padding: 20px;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    padding: 5%;

    .datagrid_section {
      .row {
        display: flex;
        flex-direction: column;
        gap: 10px 0;
        padding: 30px;

        p {
          font-size: 18px;
        }
      }
    }
  }
}
</style>