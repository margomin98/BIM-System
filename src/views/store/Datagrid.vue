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
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>設備總類</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                    {{ searchParams.EquipTypeName || '請選擇' }}
                  </button>
              <div class="dropdown-menu" aria-labelledby="typeDropdown">
                <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item" @click="selectType(item)">{{ item.Name }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>設備分類</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: (!searchParams.EquipTypeName) }">
                    {{ searchParams.EquipCategoryName || EquipCategoryInit }}
                  </button>
              <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item" @click="selectCategory(item)">{{ item.Name }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>物品名稱</p>
            <input type="text" v-model="searchParams.AssetName" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>狀態</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ searchParams.Status || "請選擇" }}
                  </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item, index) in DropdownArray.Status" :key="index" class="dropdown-item" @click="selectStatus(`${item}`)">
                  {{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>物流單號</p>
            <input type="text" v-model="searchParams.ShipmentNum" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>申請入庫日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.StartDate" class="date-input" />
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12 flex-col">
            <p>申請入庫日期(迄)</p>
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
    <div class="dg-height">
      <DataTable
        lazy
        :key="datagrid.key"
        :first= "datagrid.first"
        :size="'small'"
        :loading="datagrid.loading"
        :value="rowData" 
        :sort-field="datagrid.sortField"
        :sort-order="datagrid.sortOrder"
        resizableColumns 
        columnResizeMode="expand"
        showGridlines 
        scrollable 
        scrollHeight="420px" 
        @page="submit($event , 'page')" 
        @sort="submit($event , 'sort')"
        paginator 
        :rows="datagrid.rows" 
        :totalRecords="datagrid.totalRecords"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]"
        currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
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

<script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Navbar from "@/components/Navbar.vue";
  import {
    ref,
    onMounted,
    reactive
  } from "vue";
  import Storage_return_button from "@/components/Storage_return_button";
  import Delete from "@/components/Storage_delete_button";
  import {
    Store_StatusArray
  } from "@/assets/js/dropdown";
  import {
    getEquipType,
    getEquipCategory,
    getMngDatagrid,
  } from '@/assets/js/common_api'
  import { UpdatePageParameter, createDatagrid } from '@/assets/js/common_fn';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Storage_return_button,
      Delete,
    },
    setup() {
      const searchParams = reactive({
        EquipTypeName: '', //設備總類
        EquipType_Id: '',
        EquipCategoryName: '', //設備分類
        EquipCategory_Id: '',
        AssetName: '', //物品名稱
        Status: '', //狀態
        ShipmentNum: '',
        StartDate: '', //申請入庫日期(起)
        EndDate: '', //申請入庫日期(迄)
      });
      const DropdownArray = reactive({
        EquipType: [],
        EquipCategory: [],
        Status: Store_StatusArray,
      })
      const EquipCategoryInit = ref('請先選擇設備總類');
      const datagrid = createDatagrid();
      const datagridfield = [
        { header: "狀態", field: "Status", width: '100px' },
        { header: "單號", field: "AI_ID", width: '150px' },
        { header: "物流單號", field: "ShipmentNum", width: '150px' },
        { header: "設備總類", field: "EquipTypeName", width: '150px' },
        { header: "設備分類", field: "EquipCategoryName", width: '160px' },
        { header: "物品名稱", field: "AssetName", width: '275px' },
        { header: "申請入庫日期", field: "ApplicationDate", width: '170px' },
        { header: "申請人員", field: "Applicant", width: '170px' },
      ]
      const rowData = ref([]);
      onMounted(() => {
        datagrid.sortField = 'AI_ID'
        submit('','search');
      });
      async function submit(event,type) {
        const form = new FormData();
        //將表格資料append到 form
        for (const key in searchParams) {
          if (searchParams[key]) {
            form.append(key, searchParams[key]);
          }
        }
        UpdatePageParameter(datagrid,event,type,form)
        getMngDatagrid('/AssetsInMng/Applications',rowData,datagrid,form);
      }
      async function getEquipTypeName() {
        if (DropdownArray.EquipType.length == 0) {
          getEquipType()
            .then((data) => {
              DropdownArray.EquipType = data;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      async function getEquipCategoryName() {
        getEquipCategory(searchParams.EquipType_Id)
          .then((data) => {
            DropdownArray.EquipCategory = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      function selectType(item) {
        searchParams.EquipTypeName = item.Name;
        searchParams.EquipType_Id = item.Id;
        searchParams.EquipCategoryName = '';
        searchParams.EquipCategory_Id = '';
        getEquipCategoryName();
        EquipCategoryInit.value = '請選擇';
      }
      function selectCategory(item) {
        searchParams.EquipCategoryName = item.Name;
        searchParams.EquipCategory_Id = item.Id;
      }
      const selectStatus = (item) => {
        searchParams.Status = item;
      };
      const clear = () => {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        EquipCategoryInit.value = '請先選擇設備總類';
        submit('','search');
      };
      return {
        searchParams,
        DropdownArray,
        EquipCategoryInit,
        datagrid,
        datagridfield,
        rowData,
        getEquipTypeName,
        getEquipCategoryName,
        selectType,
        selectCategory,
        selectStatus,
        submit,
        clear,
      };
    }
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
        margin-top: 30px;
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
      .datagrid-header-row {
        background: var(--c-7, #1f4e5f);
      }
      .datagrid-header .datagrid-cell {
        text-align: left importtant;
      }
    }
  }
</style>