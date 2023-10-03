<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>入庫作業管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>物流單號</p>
            <input type="text"  />
          </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>設備總類</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
              {{ searchParams.EquipTypeName || '請選擇' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="typeDropdown">
              <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item"
                @click="selectType(`${item}`)">{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>設備分類</p>
          <div class="dropdown">
            <button style='  overflow: hidden;text-overflow: ellipsis;white-space: nowrap' class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(searchParams.EquipTypeName !== '') }">
              {{ searchParams.EquipCategoryName || EquipCategoryInit }}
            </button>
            <div class="dropdown-menu" aria-labelledby="categoryDropdown">
              <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item"
                @click="selectCategory(`${item}`)">{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>資產編號</p>
          <input type="text" v-model="searchParams.AssetsId" />
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>物品名稱</p>
          <input type="text" v-model="searchParams.AssetName" />
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>狀態</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              {{ searchParams.Status || "請選擇" }}
            </button>
            <div class="dropdown-menu" aria-labelledby="statusDropdown">
              <p v-for="(item, index) in DropdownArray.Status" :key="index" class="dropdown-item" @click="selectStatus(`${item}`)">
                {{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>區域</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" @click="getAreaName">
              {{ searchParams.AreaName || '請選擇' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="areaDropdown">
              <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item" @click="selectArea(`${item}`)">
                {{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>櫃位</p>
          <div class="dropdown">
            <button style='  overflow: hidden;text-overflow: ellipsis;white-space: nowrap' class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" :disabled="searchParams.AreaName === ''">
              {{ searchParams.LayerName || LayerInit }}
            </button>
            <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
              <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item" @click="selectLayer(`${item}`)">{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>日期類型</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              {{ searchParams.DateCategory || "請選擇" }}
            </button>
            <div class="dropdown-menu" aria-labelledby="statusDropdown">
              <p v-for="(item , index) in DropdownArray.DateType" :key="index" class="dropdown-item" @click="selectDateType(item)">{{ item}}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>日期(起)</p>
          <div class="date-selector">
            <div class="input-container">
              <input type="date" v-model="searchParams.StartDate" class="date-input" :disabled="searchParams.DateCategory === ''" />
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12 flex-col">
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
        <button class="search_btn" @click="submit">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
        <!-- <button class="export_btn">匯出</button> -->
      </div>
    </div>
    <ag-grid-vue style="height: 380px" class="mb-5 ag-theme-alpine" :rowHeight="rowHeight" :columnDefs="columnDefs" :rowData="rowData"
      :paginationPageSize="pageSize" :pagination="true">
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import Storage_process_button from "@/components/Storage_process_button";
import Delete from "@/components/Storage_process_delete_button";
import Navbar from "@/components/Navbar.vue";
import { onMounted, reactive, ref } from "vue";
import { StoreStatusArray , DateTypeArray } from "@/assets/js/dropdown";
import { getEquipType , getEquipCategory , getArea , getLayer } from '@/assets/js/common_api'

export default {
  components: {
    Navbar,
    AgGridVue,
    Storage_process_button,
    Delete,
  },
  data(){
      return{
        rowHeight: 35,
      }
    },
  setup() {
    const searchParams = reactive({
      EquipTypeName: '',
      EquipCategoryName: '',
      Status: '',
      AssetsId: '',
      AssetName: '',
      AreaName: '',
      LayerName: '',
      DateCategory: '',
      StartDate: '',
      EndDate: '',
    });
    const DropdownArray = reactive({
        EquipType: [],
        EquipCategory: [],
        Status: StoreStatusArray,
        Area: [],
        Layer: [],
        DateType: DateTypeArray,
      })
    const EquipCategoryInit = ref('請先選擇設備總類');
    const LayerInit = ref('請先選擇區域');
    const pageSize = ref(10);

    const columnDefs = [{
      suppressMovable: true,
      field: "",
      cellRenderer: "Storage_process_button",
      cellRendererParams: {
        refresh: submit, // 传递回调函数的 ref 给渲染器组件
      },
      resizable: true,
      width: 300,
    },
    {
      headerName: "狀態",
      field: "Status",
      unSortIcon: true,
      sortable: true,
      width: 100,
      resizable: true,
      suppressMovable: true
    },
    {
      headerName: "編號",
      field: "AI_ID",
      unSortIcon: true,
      sortable: true,
      width: 150,
      resizable: true,
      suppressMovable: true
    },
    {
      headerName: "物流單號",
      field: "",
      unSortIcon: true,
      sortable: true,
      width: 150,
      resizable: true,
      suppressMovable: true
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
      width: 160,
      resizable: true,
      suppressMovable: true
    },
    
    {
      headerName: "區域",
      field: "AreaName",
      unSortIcon: true,
      sortable: true,
      width: 100,
      resizable: true,
      suppressMovable: true
    },
    {
      headerName: "櫃位",
      field: "LayerName",
      unSortIcon: true,
      sortable: true,
      width: 100,
      resizable: true,
      suppressMovable: true,
    },
    {
      headerName: "申請入庫日期",
      field: "ApplicationDate",
      unSortIcon: true,
      sortable: true,
      width: 170,
      resizable: true,
      suppressMovable: true
    },
    {
      headerName: "申請人員",
      field: "Applicant",
      unSortIcon: true,
      sortable: true,
      width: 150,
      resizable: true,
      suppressMovable: true
    },
    {
      headerName: "交付日期",
      field: "DeliveryDate",
      unSortIcon: true,
      sortable: true,
      width: 170,
      resizable: true,
      suppressMovable: true
    },
    {
      headerName: "交付人員",
      field: "DeliveryOperator",
      unSortIcon: true,
      sortable: true,
      width: 150,
      resizable: true,
      suppressMovable: true
    },
    {
      headerName: "入庫日期",
      field: "AssetsInDate",
      unSortIcon: true,
      sortable: true,
      width: 170,
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
    },
    {
      field: "",
      resizable: true,
      cellRenderer: "Delete",
    }
    ];
    const rowData = ref([]);
    async function submit() {
      const formData = new FormData();
      //將表格資料append到 formData
      for (const key in searchParams) {
        formData.append(key, searchParams[key]);
      }
      //使用axios method:post傳送新品入庫表單
      const axios = require('axios');
      try {
        const response = await axios.post('http://192.168.0.177:7008/AssetsInMng/Operating', formData);
        const data = response.data;
        if (data.state === 'success') {
          //取得datagrid成功
          console.log('datagrid:\n', data.resultList);
          rowData.value = data.resultList;
        } else if (data.state === 'error') {
          //取得datagrid失敗
          alert(data.messages);
        }
        else if (data.state === 'input_error') {
          //取得datagrid格式錯誤
          alert(data.messages);
        }
        else if (data.state === 'account_error') {
          //尚未登入
          alert(data.messages);
          router.push('/');
        } else {
          throw new Error('Request was not successful');
        }
      } catch (error) {
        console.error('Error sending data to backend', error);
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
      getEquipCategory(searchParams.EquipTypeName)
        .then((data)=>{
          DropdownArray.EquipCategory = data;
        })
        .catch((error) =>{
          console.error(error);
        })
    }

    async function getAreaName() {
      if (DropdownArray.Area.length == 0) {
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
      getLayer(searchParams.AreaName)
        .then((data)=>{
          DropdownArray.Layer = data;
        })
        .catch((error) =>{
          console.error(error);
        })
    }

    function selectType(item) {
      searchParams.EquipTypeName = item;
      searchParams.EquipCategoryName = '';
      getEquipCategoryName();
      EquipCategoryInit.value = '請選擇';
    }

    function selectCategory(item) {
      searchParams.EquipCategoryName = item;
    }

    const selectStatus = (item) => {
      searchParams.Status = item;
    };

    const selectArea = (item) => {
      searchParams.AreaName = item;
      searchParams.LayerName = '';
      getLayerName();
      LayerInit.value = '請選擇';
    };

    const selectLayer = (item) => {
      searchParams.LayerName = item;
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
      submit();
    };

    onMounted(() => {
      submit();
    });
    return {
      searchParams,
      DropdownArray,
      EquipCategoryInit,
      LayerInit,
      getEquipTypeName,
      getEquipCategoryName,
      getAreaName,
      getLayerName,
      pageSize,
      columnDefs,
      rowData,
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

      .export_btn {
        @include export_btn;

        &:hover {
          background-color: #274266;
        }
      }
    }

    .datagrid_section {
      .row {
        @include datagrid_bg;
        display: grid;
    grid-template-rows: 1fr 1fr  1fr;;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5px 0;
    align-items: center;
    padding: 30px 20px;
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

      .export_btn {
        @include export_btn;

        &:hover {
          background-color: #274266;
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

      .export_btn {
        @include export_btn;
        font-size: 18px;
        width: 100%;
        height: auto;

        &:hover {
          background-color: #274266;
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

    .datagrid-header-row {
      background: var(--c-7, #1f4e5f);
    }

    .datagrid-header .datagrid-cell {
      text-align: left importtant;
    }
  }
}
</style>