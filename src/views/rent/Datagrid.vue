<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出庫填報管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap main_button_wrap d-flex">
        <router-link to="/rent_new">
          <button class="add_btn">出庫填報</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col">
            <p>出庫單號</p>
            <input type="text" v-model="dgSearchParams.AO_ID" />
          </div>
          <div class="col">
            <p>專案代碼</p>
            <multiselect v-model="dgSearchParams.ProjectSelect" :options="DropdownArray.ProjectCode"
              :allow-empty="false" @select="utilsStore.onDGProjectSelect" :max-height="300" placeholder="請選擇"
              label="Text" :showLabels="false" track-by="Text"></multiselect>
          </div>
          <div class="col">
            <p>專案名稱</p>
            <input type="text" v-model="dgSearchParams.ProjectName" />
          </div>
          <div class="col">
            <p>用途</p>
            <select class="form-select" v-model="dgSearchParams.Use">
              <option value="" selected>--請選擇--</option>
              <option v-for="(item, index) in DropdownArray.Use" :key="index" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="col">
            <p>狀態</p>
            <select class="form-select" v-model="dgSearchParams.Status">
              <option value="" selected>--請選擇--</option>
              <option v-for="(item, index) in DropdownArray.Status" :key="index" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="col">
            <p>申請出庫日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.StartDate" class="date-input" />
              </div>
            </div>
          </div>
          <div class="col">
            <p>申請出庫日期(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.EndDate" class="date-input" />
              </div>
            </div>
          </div>
          <div class="col">
            <p>申請人員</p>
            <select class="form-select" v-model="dgSearchParams.Applicant">
              <option value="">--請選擇--</option>
              <option v-for="item in DropdownArray.Staff" :key="item" :value="item">{{ item }}</option>
            </select>
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
      <DataTable lazy :key="dg.key" :first="dg.first" :size="'small'" :loading="dg.loading" :value="dgRowData"
        :sort-field="dg.sortField" :sort-order="dg.sortOrder" resizableColumns columnResizeMode="expand" showGridlines
        scrollable scrollHeight="420px" @page="submit($event, 'page')" @sort="submit($event, 'sort')" paginator
        :rows="dg.rows" :totalRecords="dg.totalRecords"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]"
        currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 60px;">
          <template #body="slotProps">
            <Rent_button :params="slotProps" />
          </template>
        </Column>
        <Column v-for="item in datagridfield" :key="item.field" :field="item.field" :header="item.header" sortable
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
import Multiselect from 'vue-multiselect'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  onActivated
} from "vue";
import Rent_button from "@/components/rent_page/Rent_button";
import Delete from "@/components/rent_page/Rent_delete_button.vue";
import Navbar from "@/components/Navbar.vue";
import {
  Rent_UseArray,
  Rent_StatusArray
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
const searchParams = reactive({
  AO_ID: '',
  ProjectName: '',
  Use: '',
  Status: '',
  StartDate: '',
  EndDate: '',
  Applicant: '',
});
const DropdownArray = reactive({
  Use: Rent_UseArray,
  Status: Rent_StatusArray,
  ProjectCode: [],
  Staff: [],
});
const datagridfield = [{
  header: "狀態",
  field: "Status",
  width: '130px'
},
{
  header: "出庫單號",
  field: "AO_ID",
  width: '150px'
},
{
  header: "專案名稱",
  field: "ProjectName",
  width: '170px',
  max: '300px'
},
{
  header: "用途",
  field: "Use",
  width: '130px'
},
{
  header: "說明",
  field: "Description",
  width: '150px',
  max: '350px'
},
{
  header: "申請人員",
  field: "Applicant",
  width: '150px'
},
{
  header: "申請出庫日期",
  field: "ApplicationDate",
  width: '170px'
},
]
onActivated(()=>{
  submit('', ''); // 透過keep-alive 觸發的情況下，不更改條件刷新datagrid
})
onMounted(async () => {
  utilsStore.$reset();
  for (const key in searchParams) {
    dgSearchParams.value[key] = '';
  }
  dg.value.sortField = ''
  submit('', 'search');
  DropdownArray.Staff = await apiStore.getStaff();
  DropdownArray.ProjectCode = await apiStore.getFuzzyProject();
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
  const resultList = await apiStore.getMngDatagrid('/AssetsOutMng/Applications', dg.value, form);
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

  // .export_btn {
  //   @include export_btn;
  //   &:hover {
  //     background-color: #274266;
  //   }
  // }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    padding: 0 10%;

    .datagrid_section {
      .row {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
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
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px 20px;
        padding: 20px;
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