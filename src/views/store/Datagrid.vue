<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>入庫填報管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        <router-link to="/store_new">
          <button class="add_btn">新品入庫</button>
        </router-link>
        <router-link to="/store_return">
          <button class="return_btn">歸還入庫</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class='row'>
          <div class="col-md-6 col-12">
            <p>入庫單號</p>
            <input type="text" v-model="dgSearchParams.AI_ID" />
          </div>          
          <div class="col-md-6 col-12">
            <p>設備總類</p>
            <select class="form-select" v-model="dgSearchParams.EquipType_Id" @change="async()=>{DropdownArray.EquipCategory = await apiStore.getEquipCategory(dgSearchParams.EquipType_Id); dgSearchParams.Category_Id = '';}">
              <option value="">--請選擇--</option>
              <option v-for="option in DropdownArray.EquipType" :value="option.Id">{{ option.Name }}</option>
            </select>
          </div>
          <div class="col-md-6 col-12">
            <p>設備分類</p>
            <select class="form-select" v-model="dgSearchParams.Category_Id">
              <option v-if="DropdownArray.EquipCategory.length == 0" value="">--請先選擇設備總類--</option>
              <template v-else>
                <option value="">--請選擇--</option>
                <option v-for="option in DropdownArray.EquipCategory" :value="option.Id">{{ option.Name }}</option>
              </template>
            </select>
          </div>
          <div class="col-md-6 col-12">
            <p>物品名稱</p>
            <input type="text" v-model="dgSearchParams.AssetName" />
          </div>
          <div class="col-md-6 col-12">
            <p>狀態</p>
            <select class="form-select" v-model="dgSearchParams.Status">
              <option value="">--請選擇--</option>
              <option v-for="item in DropdownArray.Status" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="col-md-6 col-12">
            <p>物流單號</p>
            <input type="text" v-model="dgSearchParams.ShipmentNum" />
          </div>
          <div class="col-md-6 col-12">
            <p>申請入庫日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.StartDate" class="date-input" />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12 flex-col">
            <p>申請入庫日期(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.EndDate" class="date-input" />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12 flex-col">
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
            <Storage_return_button :params = "slotProps"/>
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
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Navbar from "@/components/Navbar.vue";
import {
  onMounted,
  onUnmounted,
  reactive
} from "vue";
import Storage_return_button from "@/components/Storage_return_button";
import Delete from "@/components/Storage_delete_button";
import {
  Store_StatusArray
} from "@/assets/js/dropdown";
import {  useUtilsStore, useAPIStore } from '@/store'
import { storeToRefs } from 'pinia';

const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const { dgSearchParams , dg , dgRowData } = storeToRefs(utilsStore);

const DropdownArray = reactive({
  EquipType: [],
  EquipCategory: [],
  Status: Store_StatusArray,
  Staff: [],
})
const searchParams = reactive({
  AI_ID: '',
  Applicant: '',
  EquipType_Id: '',
  Category_Id: '',
  AssetName: '', //物品名稱
  Status: '', //狀態
  ShipmentNum: '',
  StartDate: '', //申請入庫日期(起)
  EndDate: '', //申請入庫日期(迄)
});
const datagridfield = [ 
  { header: "狀態", field: "Status", width: '100px' },
  { header: "入庫單號", field: "AI_ID", width: '150px' },
  { header: "物流單號", field: "ShipmentNum", width: '150px' },
  { header: "設備總類", field: "EquipTypeName", width: '150px' },
  { header: "設備分類", field: "EquipCategoryName", width: '160px' },
  { header: "物品名稱", field: "AssetName", width: '275px' },
  { header: "申請入庫日期", field: "ApplicationDate", width: '170px' },
  { header: "申請人員", field: "Applicant", width: '170px' },
]
onMounted(async() => {
  utilsStore.$reset();
  for(const key in searchParams) {
    dgSearchParams.value[key] = '';
  }
  submit('', 'search');
  DropdownArray.Staff = await apiStore.getCustodian();
  DropdownArray.EquipType = await apiStore.getEquipType();
});
onUnmounted(()=>{
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
  const resultList = await apiStore.getMngDatagrid('/AssetsInMng/Applications',dg.value, form);
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
          &:hover {
            background-color: #537ebc;
          }
        }
        .return_btn {
          @include datagrid_button_no2;
          &:hover {
            background-color: #708fba;
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
          input {
            @include dropdown_btn;
            width: 200px;
            height: 35px;
          }
          button {
            padding: 0;
            width: 100%;
            font-size: 18px;
            height: 100%;
            border: none;
          }
          .dropdown {
            width: 200px;
            height: 35px;
            @include dropdown_btn;
            .dropdown-toggle {
              display: flex;
              justify-content: space-between;
              align-items: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
        .return_btn {
          @include datagrid_button_no2;
          &:hover {
            background-color: #708fba;
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
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      padding: 5%;
      h1 {
        margin-top: 30px;
        text-align: center;
        font-size: 40px;
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
        .return_btn {
          @include datagrid_button_no2;
          font-size: 18px;
          width: 100%;
          height: auto;
          &:hover {
            background-color: #708fba;
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
    }
  }
</style>