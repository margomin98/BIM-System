<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>入庫作業管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="row">
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
          <p>物流單號</p>
          <input type="text" v-model="searchParams.ShipmentNum" />
        </div>
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
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
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
          <p>設備分類</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(searchParams.EquipTypeName !== '') }">
                  {{ searchParams.EquipCategoryName || EquipCategoryInit }}
                </button>
            <div class="dropdown-menu" aria-labelledby="categoryDropdown">
              <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item" @click="selectCategory(item)">{{ item.Name }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
          <p>資產編號</p>
          <input type="text" v-model="searchParams.AssetsId" />
        </div>
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
          <p>物品名稱</p>
          <input type="text" v-model="searchParams.AssetName" />
        </div>
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
          <p>狀態</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ searchParams.Status || "請選擇" }}
                </button>
            <div class="dropdown-menu" aria-labelledby="statusDropdown">
              <p v-for="(item, index) in DropdownArray.Status" :key="index" class="dropdown-item" @click="selectStatus(item)">
                {{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
          <p>區域</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName">
                  {{ searchParams.AreaName || '請選擇' }}
                </button>
            <div class="dropdown-menu" aria-labelledby="areaDropdown">
              <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item" @click="selectArea(item)">{{ item.Name }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
          <p>櫃位</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="searchParams.AreaName === ''">
                  {{ searchParams.LayerName || LayerInit }}
                </button>
            <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
              <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item" @click="selectLayer(item)">{{ item.Name }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
          <p>日期類型</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ searchParams.DateCategory || "請選擇" }}
                </button>
            <div class="dropdown-menu" aria-labelledby="statusDropdown">
              <p v-for="(item , index) in DropdownArray.DateType" :key="index" class="dropdown-item" @click="selectDateType(item)">{{ item}}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col">
          <p>日期(起)</p>
          <div class="date-selector">
            <div class="input-container">
              <input type="date" v-model="searchParams.StartDate" class="date-input" :disabled="searchParams.DateCategory === ''" />
            </div>
          </div>
        </div>
        <div class="col-xl-auto col-lg-4 col-md-6 col-12 flex-col flex-col">
          <p>日期(迄)</p>
          <div class="date-selector">
            <div class="input-container">
              <input type="date" v-model="searchParams.EndDate" class="date-input" :disabled="searchParams.DateCategory === ''" />
            </div>
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
            <Storage_process_button :params = "slotProps" @updategrid="submit('','');"/>
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
  import Storage_process_button from "@/components/Storage_process_button";
  import Delete from "@/components/Storage_process_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    Store_StatusArray,
    Store_Process_DateTypeArray
  } from "@/assets/js/dropdown";
  import {
    getMngDatagrid,
    getEquipType,
    getEquipCategory,
    getArea,
    getLayer
  } from '@/assets/js/common_api'
  import { UpdatePageParameter, createDatagrid } from '@/assets/js/common_fn';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Storage_process_button,
      Delete,
    },
    setup() {
      const searchParams = reactive({
        ShipmentNum: '',
        EquipTypeName: '',
        EquipType_Id: '',
        EquipCategoryName: '',
        Category_Id: '',
        Status: '',
        AssetsId: '',
        AssetName: '',
        AreaName: '',
        Area_Id: '',
        LayerName: '',
        Layer_Id: '',
        DateCategory: '',
        StartDate: '',
        EndDate: '',
      });
      const DropdownArray = reactive({
        EquipType: [],
        EquipCategory: [],
        Status: Store_StatusArray,
        Area: [],
        Layer: [],
        DateType: Store_Process_DateTypeArray,
      })
      const EquipCategoryInit = ref('請先選擇設備總類');
      const LayerInit = ref('請先選擇區域');
      const datagrid = createDatagrid();
      const datagridfield = [
        { header: "狀態", field: "Status", width: '100px' },
        { header: "編號", field: "AI_ID", width: '150px' },
        { header: "物流單號", field: "ShipmentNum", width: '150px' },
        { header: "設備總類", field: "EquipTypeName", width: '150px' },
        { header: "設備分類", field: "EquipCategoryName", width: '150px' },
        { header: "資產編號", field: "AssetsId", width: '150px' },
        { header: "物品名稱", field: "AssetName", width: '160px' },
        { header: "區域", field: "AreaName", width: '100px' },
        { header: "櫃位", field: "LayerName", width: '100px' },
        { header: "申請入庫日期", field: "ApplicationDate", width: '170px' },
        { header: "申請人員", field: "Applicant", width: '150px' },
        { header: "交付日期", field: "DeliveryDate", width: '170px' },
        { header: "交付人員", field: "DeliveryOperator", width: '150px' },
        { header: "入庫日期", field: "AssetsInDate", width: '170px' },
        { header: "入庫人員", field: "AssetsInOperator", width: '150px' },
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
        getMngDatagrid('/AssetsInMng/Operating',rowData,datagrid,form);
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
      async function getAreaName() {
        if (DropdownArray.Area.length == 0) {
          getArea()
            .then((data) => {
              DropdownArray.Area = data;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      async function getLayerName() {
        getLayer(searchParams.Area_Id)
          .then((data) => {
            DropdownArray.Layer = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      function selectType(item) {
        searchParams.EquipTypeName = item.Name;
        searchParams.EquipType_Id = item.Id;
        searchParams.EquipCategoryName = '';
        searchParams.Category_Id = '';
        getEquipCategoryName();
        EquipCategoryInit.value = '請選擇';
      }
      function selectCategory(item) {
        searchParams.EquipCategoryName = item.Name;
        searchParams.Category_Id = item.Id;
      }
      function selectArea(item) {
        searchParams.AreaName = item.Name;
        searchParams.Area_Id = item.Id;
        searchParams.LayerName = '';
        searchParams.Layer_Id = '';
        getLayerName();
        LayerInit.value = '請選擇';
      };
      function selectLayer(item) {
        searchParams.LayerName = item.Name;
        searchParams.Layer_Id = item.Id;
      };
      const selectStatus = (item) => {
        searchParams.Status = item;
      };
      const selectDateType = (item) => {
        searchParams.DateCategory = item;
      };
      const clear = () => {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        EquipCategoryInit.value = '請先選擇設備總類';
        LayerInit.value = '請先選擇區域';
        submit('','search');
      };
      return {
        searchParams,
        DropdownArray,
        EquipCategoryInit,
        LayerInit,
        datagrid,
        datagridfield,
        rowData,
        getEquipTypeName,
        getEquipCategoryName,
        getAreaName,
        getLayerName,
        submit,
        selectType,
        selectCategory,
        selectStatus,
        selectArea,
        selectLayer,
        selectDateType,
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
        .row {
          @include datagrid_bg;
          display: grid;
          grid-template-rows: 1fr 1fr 1fr;
          ;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 15px 0;
          align-items: center;
          padding: 30px 20px;
          .flex-col{
            margin: auto;
          }
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
              border: none;
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
      padding: 5%;
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
              max-height: 250px;
              overflow-y: auto;
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
</style>