<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>報廢管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap main_button_wrap d-flex">
        <router-link to="/scrap_new">
          <button class="add_btn">新增報廢單</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <!-- 報廢編號 -->
          <div class="col">
            <p>報廢編號</p>
            <input type="text" v-model="dgSearchParams.ScrapId" />
          </div>
          <!-- 狀態 -->
          <div class="col">
            <p>狀態</p>
            <select class="form-select" v-model="dgSearchParams.Status" id="statusDropdown">
            <option value="" disabled selected>請選擇</option>
            <option v-for="(item, index) in DropdownArray.Status" :key="index" :value="item">{{ item }}</option>
        </select>
          </div>
          <!-- 資產編號 -->
          <div class="col">
            <p>資產編號</p>
            <input type="text" v-model="dgSearchParams.AssetsId" />
          </div>
          <!-- 物品名稱 -->
          <div class="col">
            <p>物品名稱</p>
            <input type="text" v-model="dgSearchParams.AssetName" />
          </div>
          <!-- 日期類型 -->
          <div class="col">
            <p>日期類型</p>
            <select class="form-select" v-model="dgSearchParams.DateCategory" id="dateCategoryDropdown">
            <option value="" disabled selected>請選擇</option>
            <option v-for="(item, index) in DropdownArray.DateCategory" :key="index" :value="item">{{ item }}</option>
        </select>
          </div>
          <!-- 日期(起) -->
          <div class="col">
            <p>日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.StartDate" class="date-input" :disabled="!dgSearchParams.DateCategory" />
              </div>
            </div>
          </div>
          <!-- 日期(迄) -->
          <div class="col">
            <p>日期(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.EndDate" class="date-input" :disabled="!dgSearchParams.DateCategory" />
              </div>
            </div>
          </div>
          <!-- 申請人員 -->
          <div class="col">
            <p>申請人員</p>
            <select class="form-select" v-model="dgSearchParams.Applicant">
                <option value="">--請選擇--</option>
                <option v-for="item in DropdownArray.Staff" :key="item" :value="item">{{ item }}</option>
              </select>
          </div>
          <!-- 報廢人員 -->
          <div class="col">
            <p>報廢人員</p>
            <select class="form-select" v-model="dgSearchParams.ScrapPerson">
                <option value="">--請選擇--</option>
                <option v-for="item in DropdownArray.Staff" :key="item" :value="item">{{ item }}</option>
              </select>
          </div>
          <!-- 審核人員 -->
          <div class="col">
            <p>審核人員</p>
            <select class="form-select" v-model="dgSearchParams.VerifyPerson">
                <option value="">--請選擇--</option>
                <option v-for="item in DropdownArray.Staff" :key="item" :value="item">{{ item }}</option>
              </select>
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
        <DataTable lazy :key="dg.key" :first="dg.first" :size="'small'" :loading="dg.loading" :value="dgRowData" :sort-field="dg.sortField" :sort-order="dg.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" @page="submit($event , 'page')"
          @sort="submit($event , 'sort')" paginator :rows="dg.rows" :totalRecords="dg.totalRecords" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
          <Column style="min-width: 60px;">
            <template #body="slotProps">
                  <Scrap_button :params = "slotProps"/>
</template>
          </Column>
          <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
          <Column style="min-width: 60px;">
<template #body="slotProps">
  <Delete :params="slotProps" />
</template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import {
    onMounted,
    onUnmounted,
    reactive,
  } from "vue";
  import Scrap_button from "@/components/Scrap_button";
  import Delete from "@/components/Scrap_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    Scrap_StatusArray,
    Scrap_DateCategory
  } from "@/assets/js/dropdown.js"
  import {
    useUtilsStore,
    useAPIStore
  } from '@/store'
  import {
    storeToRefs
  } from 'pinia';
  const utilsStore = useUtilsStore();
  const apiStore = useAPIStore();
  const {
    dgSearchParams,
    dg,
    dgRowData
  } = storeToRefs(utilsStore);
  const searchParams = reactive({
    ScrapId: '',
    Status: '',
    AssetsId: '',
    AssetName: '',
    DateCategory: '',
    StartDate: '',
    EndDate: '',
    Applicant: '',
    ScrapPerson: '',
    VerifyPerson: '',
  });
  const DropdownArray = reactive({
    Status: Scrap_StatusArray,
    DateCategory: Scrap_DateCategory,
    Staff: [],
  });
  const datagridfield = [{
      header: "報廢編號",
      field: "ScrapId",
      width: '180px'
    },
    {
      header: "狀態",
      field: "Status",
      width: '120px'
    },
    {
      header: "資產編號",
      field: "AssetsId",
      width: '150px'
    },
    {
      header: "物品名稱",
      field: "AssetName",
      width: '180px'
    },
    {
      header: "申請日期",
      field: "ApplicationDate",
      width: '150px'
    },
    {
      header: "申請人員",
      field: "Applicant",
      width: '120px'
    },
    {
      header: "交付日期",
      field: "DeliveryDate",
      width: '150px'
    },
    {
      header: "報廢人員",
      field: "ScrapPerson",
      width: '120px'
    },
    {
      header: "審核日期",
      field: "VerifyDate",
      width: '150px'
    },
    {
      header: "審核人員",
      field: "VerifyPerson",
      width: '120px'
    },
  ]
  onMounted(async() => {
    utilsStore.$reset();
    for (const key in searchParams) {
      dgSearchParams.value[key] = '';
    }
    dg.value.sortField = ''
    submit('', 'search');
    DropdownArray.Staff = await apiStore.getStaff();
  });
  onUnmounted(() => {
    utilsStore.$dispose();
  })
  async function submit(event, type) {
    const form = new FormData();
    //將表格資料append到 form
    for (const key in dgSearchParams.value) {
      if (dgSearchParams.value[key]) {
        form.append(key, dgSearchParams.value[key]);
      }
    }
    utilsStore.UpdatePageParameter(dg.value, event, type, form);
    const resultList = await apiStore.getMngDatagrid('/ScrapMng/ScrapOrders', dg.value, form);
    dgRowData.value = resultList.rows;
    dg.value.totalRecords = resultList.total;
    dg.value.key++;
  }
  const clear = () => {
    utilsStore.clearSearchParams(dgSearchParams.value);
    dgSearchParams.value.ProjectSelect = {
      Text: '--請選擇--',
      Value: ''
    };
    submit('', 'search');
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .datagrid_section {
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
    }
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      padding: 0 10%;
      .main_button_wrap{
        justify-content: left;
      }
      .datagrid_section {
        .row {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          gap: 20px 5px;
          padding: 2%;
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
    .button_wrap{
      justify-content: center;
    }
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