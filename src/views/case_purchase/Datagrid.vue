<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>專案採購管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        <router-link to="/case_purchase_new">
          <button class="add_btn">採購填報</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
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
            <multiselect v-model="dgSearchParams.ProjectSelect" :allow-empty="false" @select="utilsStore.onDGProjectSelect" :options="DropdownArray.ProjectCode" :max-height="300" placeholder="請選擇" label="Text" :showLabels="false" track-by="Text"></multiselect>
          </div>
          <!-- 專案名稱 -->
          <div class="col">
            <p>專案名稱</p>
            <input type="text" v-model="dgSearchParams.ProjectName"/>
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
                <input type="date" v-model="dgSearchParams.StartDate" class="date-input" />
              </div>
            </div>
          </div>
          <!-- 時間（迄） -->
          <div class="col">
            <p>時間(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.EndDate" class="date-input" />
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
    <div class="dg-height mb-5">
      <DataTable lazy :key="dg.key" :first="dg.first" :size="'small'" :loading="dg.loading" :value="dgRowData" :sort-field="dg.sortField" :sort-order="dg.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable
        scrollHeight="420px" @page="submit($event , 'page')" @sort="submit($event , 'sort')" paginator :rows="dg.rows" :totalRecords="dg.totalRecords" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 60px;">
          <template #body="slotProps">
            <case_purchase_btn :params = "slotProps"/>
          </template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width , 'max-width': item.max}"></Column>
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
import { ref, reactive, onMounted } from 'vue';
import case_purchase_btn from '@/components/case_purchase_page/case_purchase_btn.vue';
import Delete from '@/components/case_purchase_page/delete_btn.vue'
import Navbar from "@/components/Navbar.vue";
import { CasePurchase_StatusArray, CasePurchase_DateCategory } from "@/assets/js/dropdown";
import {  useUtilsStore, useAPIStore } from '@/store'
import { storeToRefs } from 'pinia';

const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const { dgSearchParams , dg , dgRowData } = storeToRefs(utilsStore);
const DropdownArray = reactive({
  ProjectCode: [],
  Status: CasePurchase_StatusArray,
  DateCategory: CasePurchase_DateCategory
})

const searchParams = reactive({
  ProjectName: '',
  Status: '',
  DateCategory: '',
  StartDate: '',
  EndDate: '',
});

const datagridfield = ref([
  { header: "狀態", field: "Status", width: '130px' },
  { header: "單號", field: "PP_ID", width: '150px' },
  { header: "專案名稱", field: "ProjectName", width: '170px', max: '300px' },
  { header: "說明", field: "Description", width: '150px', max: '350px' },
  { header: "交貨期限", field: "Deadline", width: '170px' },
  { header: "申請人員", field: "Applicant", width: '150px' },
  { header: "申請日期", field: "ApplicationDate", width: '170px' },
  { header: "完成人員", field: "PurchasePerson", width: '150px' },
  { header: "完成日期", field: "PurchaseDate", width: '170px' },
]);

onMounted(async() => {
  utilsStore.$reset();
  for(const key in searchParams) {
    dgSearchParams.value[key] = '';
  }
  submit('', 'search');
  // DropdownArray.ProjectCode = [
  //   {Text:'--請選擇--' , Value: ''},
  //   {Text:'000-1  12345678901234567890' , Value: '0001'},
  //   {Text:'000-2  asdasdasdwqweqwasdaw' , Value: '0002'},
  // ]
  DropdownArray.ProjectCode = await useAPIStore().getFuzzyProject();
});

async function submit(event, type) {
  const form = new FormData();
  // 將表格資料 append 到 form
  for (const key in dgSearchParams.value) {
    if (dgSearchParams.value[key]) {
      form.append(key, dgSearchParams.value[key]);
    }
  }
  utilsStore.UpdatePageParameter(dg.value, event, type, form);
  const resultList = await apiStore.getMngDatagrid('/PurchasingMng/PurchaseRequisitions',dg.value, form);
  dgRowData.value = resultList.rows;
  dg.value.totalRecords = resultList.total;
  dg.value.key++;
}

const clear = () => {
  utilsStore.clearSearchParams(dgSearchParams.value);
  dgSearchParams.value.ProjectSelect = { Text: '--請選擇--',Value: '' };
  submit('', 'search');
};
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .dg-height {
    @include datagrid-height;
  }
  .row {
    display: grid;
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
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px 5px;
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
        text-align: left importtant;
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
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          padding: 20px;
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
        text-align: left importtant;
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
        text-align: left importtant;
      }
    }
  }
</style>