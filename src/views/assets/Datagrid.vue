<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>設備總類</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                {{ searchParams.EquipTypeName || '請選擇' }}
              </button>
              <div class="dropdown-menu" aria-labelledby="areaDropdown">
                <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item" @click="selectType(item)"> {{ item.Name }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>設備分類</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="!searchParams.EquipTypeName">
                {{ searchParams.EquipCategoryName || EquipCategoryInit }}
              </button>
              <div class="dropdown-menu" aria-labelledby="areaDropdown">
                <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item" @click="selectCategory(item)"> {{ item.Name }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>資產編號</p>
            <input type="text" v-model="searchParams.AssetsId" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>資產名稱</p>
            <input type="text" v-model="searchParams.AssetName" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>狀態</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ searchParams.Status || '請選擇' }}
                </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item, index) in DropdownArray.Status" :key="index" class="dropdown-item" @click="selectStatus(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
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
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>櫃位</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="!searchParams.AreaName">
                {{ searchParams.LayerName || LayerInit }}
              </button>
              <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item" @click="selectLayer(item)">{{ item.Name }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12  flex-col">
            <p>入庫日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.StartDate" class="date-input" @focus="showDatePicker = true" @blur="showDatePicker = false" />
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12 flex-col">
            <p>入庫日期(迄)</p>
            <div class="date-selector">
              <input type="date" v-model="searchParams.EndDate" class="date-input" @focus="showDatePicker = true" @blur="showDatePicker = false" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn" @click="submit">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
      </div>
    </div>
    <div style="width: 100%">
      <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;margin-bottom:50px" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :paginationPageSize="pageSize" :pagination="true">
      </ag-grid-vue>
    </div>
  </div>
</template>

<script>
  import { AgGridVue } from "ag-grid-vue3";
  import Assets_return_button from "@/components/Assets_return_button";
  import Navbar from "@/components/Navbar.vue";
  import getEquipDatagrid from "@/components/API/getEquipDatagrid"
  import { Asset_StastusArraay } from "@/assets/js/dropdown"
  import { onMounted, reactive, ref } from "vue";
  import { getEquipType , getEquipCategory , getArea , getLayer } from '@/assets/js/common_api'
  export default {
    components: {
      Navbar,
      AgGridVue,
      Assets_return_button,
      getEquipDatagrid,
    },
    setup() {
      const details = ref({});
      const searchParams = reactive({
        EquipTypeName: '',
        EquipType_Id: '',
        EquipCategoryName: '',
        Category_Id: '',
        AssetsId: '',
        AssetName: '',
        Status: '',
        AreaName: '',
        Area_Id: '',
        LayerName: '',
        Layer_Id: '',
        StartDate: '',
        EndDate: '',
      });
      const DropdownArray = reactive({
        Status: Asset_StastusArraay,
        EquipType: [],
        EquipCategory: [],
        Area: [],
        Layer: [],
      });
      const EquipCategoryInit = ref('請先選擇設備總類');
      const LayerInit = ref('請先選擇區域');
      const pageSize = ref(10);
      const columnDefs = [{
          suppressMovable: true,
          field: "",
          cellRenderer: "Assets_return_button",
          width: 150,
          resizable: true,
        },
        {
          headerName: "資產編號",
          field: "AssetsId",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "物品名稱",
          field: "AssetName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true,
          flex: 1,
        },
        {
          headerName: "設備總類",
          field: "EquipTypeName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "設備分類",
          field: "EquipCategoryName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "區域",
          field: "AreaName",
          unSortIcon: true,
          sortable: true,
          width: 130,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "櫃位",
          field: "LayerName",
          unSortIcon: true,
          sortable: true,
          width: 130,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "狀態",
          field: "Status",
          unSortIcon: true,
          sortable: true,
          width: 110,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "入庫日期",
          field: "InboundDate",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "入庫人員",
          field: "AssetsInOperator",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        }
      ];
      const rowData = ref([]);
      onMounted(() => {
        submit();
      });
      async function submit() {
        const formData = new FormData();
        //將表格資料append到 formData
        for (const key in searchParams) {
          formData.append(key, searchParams[key]);
        }
        const axios = require('axios');
        try {
          const response = await axios.post('http://192.168.0.177:7008/InventoryMng/Assets', formData);
          const data = response.data;
          if (data.state === 'success') {
            //取得datagrid成功
            console.log('datagrid', data.resultList);
            rowData.value = data.resultList;
          } else if (data.state === 'account_error') {
            //尚未登入
            alert(data.messages);
            router.push('/');
          } else {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function getEquipTypeName() {
      if (DropdownArray.EquipType.length == 0) {
        getEquipType()
        .then((data)=>{
          DropdownArray.EquipType = data;
        })
        .catch((error) =>{
          console.error(error);
        })
      }
      }
      async function getEquipCategoryName() {
        getEquipCategory(searchParams.EquipType_Id)
          .then((data)=>{
            DropdownArray.EquipCategory = data;
          })
          .catch((error) =>{
            console.error(error);
          })
      }
      async function getAreaName() {
        if (DropdownArray.Area == 0) {
          getArea()
          .then((data)=>{
            DropdownArray.Area = data;
          })
          .catch((error) =>{
            console.error(error);
          })
        }
      }
      async function getLayerName() {
        getLayer(searchParams.Area_Id)
        .then((data)=>{
          DropdownArray.Layer = data;
        })
        .catch((error) =>{
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
      const selectStatus = (item) => {
        searchParams.Status = item;
      };
      const selectArea = (item) => {
        searchParams.AreaName = item.Name;
        searchParams.Area_Id = item.Id;
        searchParams.LayerName = '';
        searchParams.Layer_Id = '';
        //API function here
        getLayerName();
        LayerInit.value = '請選擇';
      };
      const selectLayer = (item) => {
        searchParams.LayerName = item.Name;
        searchParams.Layer_Id = item.Id;
      };
      const setTypeParams = (data)=> {
        searchParams.EquipTypeName = data;
      }
      const setCategoryParams = (data)=> {
        searchParams.EquipCategoryName = data;
      }
      function clear() {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        EquipCategoryInit.value = '請先選擇設備總類'
        LayerInit.value = '請先選擇區域';
        submit();
      }
      return {
        details,
        searchParams,
        DropdownArray,
        EquipCategoryInit,
        LayerInit,
        pageSize,
        columnDefs,
        rowData,
        rowHeight: 35,
        submit,
        getEquipTypeName,
        getAreaName,
        selectType,
        selectCategory,
        selectStatus,
        selectArea,
        selectLayer,
        setTypeParams,
        setCategoryParams,
        clear,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
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
          width: 195px;
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
        .export_btn {
          @include export_btn;
          &:hover {
            background-color: #274266;
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
          padding: 0 2%;
        }
        .row {
          gap: 20px 30px;
          padding: 40px;
          p {
            @include datagrid_title;
          }
          input {
            @include dropdown_btn;
            width: calc(100% - 10%);
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
            width: calc(100% - 10%);
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
          width: 190px;
          &:hover {
            background-color: #537ebc;
          }
        }
        .export_btn {
          @include export_btn;
          &:hover {
            background-color: #274266;
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
        }
        .export_btn {
          @include export_btn;
          font-size: 18px;
          width: 100%;
          height: auto;
          &:hover {
            background-color: #274266;
          }
        }
        .search_btn {
          @include search_and_send_btn;
          font-size: 18px;
          width: 100%;
          height: auto;
          &:hover {
            background-color: #5e7aa2;
          }
        }
        .empty_btn {
          @include empty_btn;
          font-size: 18px;
          width: 100%;
          height: auto;
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