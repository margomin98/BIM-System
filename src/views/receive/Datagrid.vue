<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>收貨管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        <router-link to="/receive_new">
          <button class="add_btn">新增收貨</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col">
            <p>收貨單號</p>
            <input type="text" v-model="dgSearchParams.Show_AR_ID" />
          </div>
          <div class="col">
            <p>物流單號</p>
            <input type="text" v-model="dgSearchParams.ShipmentNum" />
          </div>
          <div class="col">
            <p>貨運公司</p>
            <input type="text" v-model="dgSearchParams.ShipmentCompany" />
          </div>
          <div class="col">
            <p>收件日期(起)</p>
            <input type="date" v-model="dgSearchParams.StartDate" class="date-input" />
          </div>
          <div class="col">
            <p>收件日期(迄)</p>
            <input type="date" v-model="dgSearchParams.EndDate" class="date-input" />
          </div>
          <!-- 收件人員 -->
          <div class="col">
            <p>收件人員</p>
            <select class="form-select" aria-label="Default select example" v-model="dgSearchParams.Recipient">
                <option value="">--請選擇--</option>
                <option v-for="option in DropdownArray.Staff" :value="option">{{ option }}</option>
              </select>
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
      <DataTable lazy :key="dg.key" :first="dg.first" :size="'small'" :loading="dg.loading" :value="dgRowData" :sort-field="dg.sortField" :sort-order="dg.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" @page="submit($event , 'page')"
        @sort="submit($event , 'sort')" paginator :rows="dg.rows" :totalRecords="dg.totalRecords" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 60px;">
          <template #body="slotProps">
              <Receive_button :params = "slotProps"/>
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
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Receive_button from "@/components/Receive_button";
  import Delete from "@/components/Receive_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    onUnmounted,
    reactive,
  } from "vue";
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
  const DropdownArray = reactive({
    Staff: [],
  })
  const searchParams = reactive({
    Show_AR_ID: '',
    Recipient: '',
    ShipmentNum: '',
    ShipmentCompany: '',
    StartDate: '',
    EndDate: '',
  });
  const datagridfield = [{
      header: "收貨單號",
      field: "Show_AR_ID",
      width: '180px'
    },
    {
      header: "物流單號",
      field: "ShipmentNum",
      width: '180px'
    },
    {
      header: "貨運公司",
      field: "ShipmentCompany",
      width: '150px'
    },
    {
      header: "到貨件數",
      field: "GoodsNum",
      width: '150px'
    },
    {
      header: "收件日期",
      field: "ReceivedDate",
      width: '150px'
    },
    {
      header: "收件人員",
      field: "Recipient",
      width: '150px'
    },
  ]
  onMounted(async() => {
    utilsStore.$reset();
    for (const key in searchParams) {
      dgSearchParams.value[key] = '';
    }
    submit('', 'search');
    DropdownArray.Staff = await apiStore.getStaff();
  });
  onUnmounted(() => {
    utilsStore.$dispose();
  })
  async function submit(event, type) {
    const form = new FormData();
    // 將表格資料 append 到 form
    for (const key in dgSearchParams.value) {
      if (dgSearchParams.value[key]) {
        form.append(key, dgSearchParams.value[key]);
      }
    }
    utilsStore.UpdatePageParameter(dg.value, event, type, form);
    const resultList = await apiStore.getMngDatagrid('/ReceivingMng/ReceivingNotes', dg.value, form);
    dgRowData.value = resultList.rows;
    dg.value.totalRecords = resultList.total;
    dg.value.key++;
  }
  const clear = () => {
    utilsStore.clearSearchParams(dgSearchParams.value);
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
      .datagrid_section {
        .row {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px 5px;
          padding: 2% 15%;
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
          grid-template-rows: 1fr 1fr;
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