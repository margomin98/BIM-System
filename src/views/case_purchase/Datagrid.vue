<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>專案採購管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap main_button_wrap d-flex">
        <router-link to="/case_purchase_new">
          <button class="add_btn">採購填報</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <!-- 單號 -->
          <div class="col">
            <p>單號</p>
            <input type="text" v-model="dgSearchParams.PP_ID" />
          </div>
          <!-- 狀態 -->
          <div class="col">
            <p>狀態</p>
            <select class="form-select" aria-label="Default select example" v-model="dgSearchParams.Status">
              <option value="">--請選擇--</option>
              <option v-for="option in DropdownArray.Status" :value="option">{{ option }}</option>
            </select>
          </div>
          <!-- 專案代碼 -->
          <div class="col">
            <p>專案代碼</p>
            <multiselect v-model="dgSearchParams.ProjectSelect" :allow-empty="false"
              @select="utilsStore.onDGProjectSelect" :options="DropdownArray.ProjectCode" :max-height="300"
              placeholder="請選擇" label="Text" :showLabels="false" track-by="Text"></multiselect>
          </div>
          <!-- 專案名稱 -->
          <div class="col">
            <p>專案名稱</p>
            <input type="text" v-model="dgSearchParams.ProjectName" />
          </div>
          <!-- 說明 -->
          <div class="col">
            <p>說明</p>
            <input type="text" v-model="dgSearchParams.Description" />
          </div>
          <!-- 日期類型 -->
          <div class="col">
            <p>日期類型</p>
            <select class="form-select" aria-label="Default select example" v-model="dgSearchParams.DateCategory">
              <option value="">--請選擇--</option>
              <option v-for="option in DropdownArray.DateCategory" :value="option">{{ option }}</option>
            </select>
          </div>
          <!-- 時間（起） -->
          <div class="col">
            <p>時間(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.StartDate" class="date-input"
                  :disabled="!dgSearchParams.DateCategory" />
              </div>
            </div>
          </div>
          <!-- 時間（迄） -->
          <div class="col">
            <p>時間(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.EndDate" class="date-input"
                  :disabled="!dgSearchParams.DateCategory" />
              </div>
            </div>
          </div>
          <!-- 申請人員 -->
          <div class="col">
            <p>申請人員</p>
            <select class="form-select" aria-label="Default select example" v-model="dgSearchParams.Applicant">
              <option value="">--請選擇--</option>
              <option v-for="option in DropdownArray.Staff" :value="option">{{ option }}</option>
            </select>
          </div>
          <!-- 採購人員 -->
          <div class="col">
            <p>採購人員</p>
            <select class="form-select" aria-label="Default select example" v-model="dgSearchParams.PurchasePerson">
              <option value="">--請選擇--</option>
              <option v-for="option in DropdownArray.Staff" :value="option">{{ option }}</option>
            </select>
          </div>
          <!-- 沖銷人員 -->
          <div class="col">
            <p>沖銷人員</p>
            <select class="form-select" aria-label="Default select example" v-model="dgSearchParams.WriteOffPerson">
              <option value="">--請選擇--</option>
              <option v-for="option in DropdownArray.Staff" :value="option">{{ option }}</option>
            </select>
          </div>
          <!-- 完成人員 -->
          <!-- <div class="col">
              <p>完成人員</p>
              <select class="form-select" aria-label="Default select example" v-model="dgSearchParams.PurchasePerson">
                <option value="">--請選擇--</option>
                <option v-for="option in DropdownArray.Staff" :value="option">{{ option }}</option>
              </select>
            </div> -->
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn" @click="submit('', 'search')">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
      </div>
    </div>
    <div class="dg-height mb-5">
      <DataTable lazy :key="dg.key" :first="dg.first" :size="'small'" :loading="dg.loading" :value="dgRowData"
        :sort-field="dg.sortField" :sort-order="dg.sortOrder" resizableColumns columnResizeMode="expand" showGridlines
        scrollable scrollHeight="420px" @page="submit($event, 'page')" @sort="submit($event, 'sort')" paginator
        :rows="dg.rows" :totalRecords="dg.totalRecords"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]"
        currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 60px;">
          <template #body="slotProps">
            <case_purchase_btn :params="slotProps" />
          </template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable
          :style="{ 'min-width': item.width, 'max-width': item.max }"></Column>
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
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Multiselect from 'vue-multiselect';
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  onActivated
} from 'vue';
import case_purchase_btn from '@/components/case_purchase_page/case_purchase_btn.vue';
import Delete from '@/components/case_purchase_page/delete_btn.vue'
import Navbar from "@/components/Navbar.vue";
import {
  CasePurchase_StatusArray,
  CasePurchase_DateCategory
} from "@/assets/js/dropdown";
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
  ProjectCode: [],
  Staff: [],
  Status: CasePurchase_StatusArray,
  DateCategory: CasePurchase_DateCategory
})
const searchParams = reactive({
  PP_ID: '',
  Status: '',
  ProjectName: '',
  Description: '',
  DateCategory: '',
  StartDate: '',
  EndDate: '',
  Applicant: '',
  PurchasePerson: '',
  WriteOffPerson: '',
});
const datagridfield = ref([
  { header: "狀態", field: "Status", width: '130px' },
  { header: "單號", field: "PP_ID", width: '150px' },
  { header: "專案名稱", field: "ProjectName", width: '170px', max: '300px' },
  { header: "說明", field: "Description", width: '150px', max: '350px' },
  { header: "交貨期限", field: "Deadline", width: '170px' },
  { header: "申請人員", field: "Applicant", width: '150px' },
  { header: "申請日期", field: "ApplicationDate", width: '170px' },
  { header: "採購人員", field: "PurchasePerson", width: '150px' },
  { header: "採購日期", field: "PurchaseDate", width: '170px' },
  { header: "沖銷人員", field: "WriteOffPerson", width: '150px' },
  { header: "沖銷日期", field: "WriteOffDate", width: '170px' },
]);
onActivated(()=>{
  submit('', ''); // 透過keep-alive 觸發的情況下，不更改條件刷新datagrid
})
onMounted(async () => {
  utilsStore.$reset();
  for (const key in searchParams) {
    dgSearchParams.value[key] = '';
  }
  submit('', 'search');
  DropdownArray.ProjectCode = await apiStore.getFuzzyProject();
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
  const resultList = await apiStore.getMngDatagrid('/PurchasingMng/PurchaseRequisitions', dg.value, form);
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

.row {
  @include datagrid_bg;
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
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 10px;
        padding: 2%;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    padding: 5%;

    .datagrid_section {
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 15px;
        padding: 20px;
        @include datagrid_bg;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .button_wrap {
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