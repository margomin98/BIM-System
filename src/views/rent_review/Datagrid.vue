<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出庫審核管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col">
            <p>單號</p>
            <input type="text" v-model="searchParams.AO_ID" />
          </div>
          <div class="col">
            <p>專案代碼</p>
            <multiselect v-model="value" :options="options" :allow-empty="false" :max-height="300" placeholder="請選擇" label="name" :showLabels="false" track-by="name"></multiselect>
          </div>
          <div class="col">
            <p>專案名稱</p>
            <input type="text" v-model="searchParams.ProjectName" />
          </div>
          <div class="col">
            <p>用途</p>
            <select class="form-select" id="useSelect" v-model="searchParams.Use" @change="selectUse">
                <option value="" disabled selected>請選擇</option>>
            <option v-for="(item, index) in UseArray" :key="index" :value="item">{{ item }}</option>
        </select>
          </div>
          <div class="col">
            <p>狀態</p>
            <select class="form-select" id="statusSelect" v-model="searchParams.Status" @change="selectStatus">
                <option value="" disabled selected>請選擇</option>
            <option v-for="(item, index) in StatusArray" :key="index" :value="item">{{ item }}</option>
        </select>
          </div>
          <div class="col">
            <p>日期類型</p>
            <select class="form-select" id="dateCategorySelect" v-model="searchParams.DateCategory" @change="selectDateCategory">
                <option value="" disabled selected>請選擇</option>
            <option v-for="(item, index) in DateCategoryArray" :key="index" :value="item">{{ item }}</option>
        </select>
          </div>
          <div class="col">
            <p>日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.StartDate" class="date-input" />
              </div>
            </div>
          </div>
          <div class="col">
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
        <button class="search_btn" @click="submit('','search')">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
      </div>
    </div>
    <div style="width: 100%" class="mb-5">
      <DataTable lazy :key="datagrid.key" :first="datagrid.first" :size="'small'" :loading="datagrid.loading" :value="rowData" :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable
        scrollHeight="420px" @page="submit($event , 'page')" @sort="submit($event , 'sort')" paginator :rows="datagrid.rows" :totalRecords="datagrid.totalRecords" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 60px;">
          <template #body="slotProps">
                  <Rent_review_button :params = "slotProps"/>
</template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width , 'max-width': item.max}"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import {
    ref,
    reactive,
    onMounted,
  } from "vue";
  import {
    Rent_Review_UseArray,
    Rent_Review_StatusArray,
    Rent_Review_DateCategory
  } from "@/assets/js/dropdown";
  import Rent_review_button from "@/components/Rent_review_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    UpdatePageParameter,
    createDatagrid
  } from '@/assets/js/common_fn';
  import {
    getMngDatagrid
  } from '@/assets/js/common_api';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Rent_review_button,
      Multiselect
    },
    data() {
      return {
        value: {
          name: '請選擇',
        },
        options: [{
            name: 'F489184964146142847'
          },
          {
            name: 'D47F846'
          },
        ]
      }
    },
    methods: {
      nameWithLang({
        name,
        language
      }) {
        return `${name}`
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
      });
      const UseArray = Rent_Review_UseArray
      const StatusArray = Rent_Review_StatusArray
      const DateCategoryArray = Rent_Review_DateCategory
      const datagrid = createDatagrid();
      const datagridfield = [{
          header: "狀態",
          field: "Status",
          width: '160px'
        },
        {
          header: "單號",
          field: "AO_ID",
          width: '150px'
        },
        {
          header: "專案名稱",
          field: "ProjectName",
          width: '150px',
          max: '300px'
        },
        {
          header: "用途",
          field: "Use",
          width: '150px'
        },
        {
          header: "說明",
          field: "Description",
          width: '150px',
          max: '350px'
        },
        {
          header: "申請日期",
          field: "ApplicationDate",
          width: '160px'
        },
        {
          header: "申請人員",
          field: "Applicant",
          width: '150px'
        },
        {
          header: "審核日期",
          field: "VerifyDate",
          width: '150px'
        },
        {
          header: "審核人員",
          field: "VerifyPerson",
          width: '150px'
        },
      ]
      const rowData = ref([]);
      onMounted(() => {
        datagrid.sortField = 'AO_ID'
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
        getMngDatagrid('/AssetsOutMng/ReviewOperating', rowData, datagrid, form);
      }
      const clear = () => {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        submit('', 'search');
      };
      return {
        searchParams,
        UseArray,
        StatusArray,
        DateCategoryArray,
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
          display: grid;
          grid-template-rows: 1fr 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px 20px;
          padding: 20px;
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
          display: grid;
          grid-template-rows: 1fr;
          grid-template-columns: 1fr;
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