<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>PrimeVue資產管理</h1>
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
        <button class="search_btn" @click="submit('' , 'search')">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
      </div>
    </div>
    <div>
      <span v-for="item in selectedProduct" style="margin-right: 1rem;">{{ item.AssetsId }}</span>
    </div>
      <div class="datagrid_section mb-3">
      <DataTable 
        ref = 'dt'
        v-model:selection="selectedProduct" 
        lazy 
        :first= "datagridSetting.first"
        :size="'small'"
        :loading="datagridSetting.loading"
        :value="rowData" 
        :sort-field="datagridSetting.sortField"
        :sort-order="datagridSetting.sortOrder"
        resizableColumns 
        columnResizeMode="fit"
        showGridlines 
        scrollable 
        scrollHeight="510px" 
        @page="submit($event , 'page')" 
        @sort="submit($event , 'sort')"
        :selectAll="datagridSetting.selectAll"
        @select-all-change="onSelectAllChange"
        table-style="min-height: 510px;"
        paginator 
        :rows="10" 
        :row-style="({ AssetsId }) => AssetsId === 'BF00000005' ? 'background-color: firebrick; color:white;': null "
        :totalRecords="datagridSetting.totalRecords"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]"
        currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <!-- <template #header>
          <div>
            <button class="btn btn-primary" label="Export" @click="exportCSV()" style="margin-right: 1rem;">exportCSV</button>
            <button @click="add" type="button" class="btn btn-primary">increase totalRecords</button>
          </div>
        </template> -->
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column style="min-width: 200px;">
          <template #body="slotProps">
            <!-- Add the custom component here -->
            <test :params = "slotProps" :msg="'hi'" @msg="handlemsg"/>
          </template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}" :frozen="item.field === 'AssetsId'"></Column>
      </DataTable>
      </div>

  </div>
</template>

<script>
import { ref , reactive , onMounted } from 'vue';
import Navbar from "@/components/Navbar.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import test from "@/components/test";
import axios from 'axios';
import { Asset_StastusArraay } from "@/assets/js/dropdown"
import { getEquipType , getEquipCategory , getArea , getLayer } from '@/assets/js/common_api'

export default {
  name: 'App',
  components: {
    DataTable,
    Column,
    Navbar,
    test,
  },
  setup() {
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
    const rowData = ref([]);
    const selectedProduct = ref();
    const datagridSetting = reactive({
      totalRecords: 0,
      first: 0,
      rows: 10,
      currentPage: 1,
      sortField: 'AssetsId',
      sortOrder: -1,
      loading: false,
      selectAll: false, //不一定要
    })
    const datagridfield = [
      {
        field: 'AssetsId',
        header: '資產編號',
        width: '150px',
      },
      {
        field: 'AssetName',
        header: '物品名稱',
        width: '350px',
      },
      {
        field: 'EquipTypeName',
        header: '設備總類',
        width: '350px',
      },
      {
        field: 'EquipCategoryName',
        header: '設備分類',
        width: '350px',
      },
      {
        field: 'AreaName',
        header: '區域',
        width: '130px',
      },
      {
        field: 'LayerName',
        header: '櫃位',
        width: '130px',
      },
      {
        field: 'Status',
        header: '狀態',
        width: '110px',
      },
      {
        field: 'InboundDate',
        header: '入庫日期',
        width: '150px',
      },
      {
        field: 'AssetsInOperator',
        header: '入庫人員',
        width: '150px',
      },
    ];
    const dt = ref();
    onMounted(() => {
      submit('' , 'search');
    });
    function add() {
      // datagridSetting.totalRecords++;
      datagridSetting.selectAll = !datagridSetting.selectAll
    }
    function exportCSV() {
      dt.value.exportCSV();
    }
    const onSelectAllChange = (event) => {
      console.log('selectAll event:',event);
      datagridSetting.selectAll = event.checked;
      if(datagridSetting.selectAll) {
        selectedProduct.value = rowData.value
      } else {
        selectedProduct.value = [];
      }
    }
    async function submit(event , type) {
      datagridSetting.loading = true;
      const formData = new FormData();
      // 將切頁資訊append到 formData
      // console.log(event);
      // type為sort或page =>更新datagrid參數，submit則回到第一頁
      switch (type) {
        case 'sort':
          datagridSetting.currentPage = 1;
          datagridSetting.sortField = event.sortField;
          datagridSetting.sortOrder = event.sortOrder;
          datagridSetting.first = event.first;
          break;
        case 'page':
          datagridSetting.currentPage = (event.page+1);
          datagridSetting.rows = event.rows;
          datagridSetting.first = event.first;
          break
        case 'search':
          datagridSetting.currentPage = 1;
          datagridSetting.first = 0;
          break
      }
      const order = datagridSetting.sortOrder === 1 ? 'asc' : 'desc'
      // console.log('first:', datagridSetting.first);
      // console.log('rows:', datagridSetting.rows);
      // console.log('page:', datagridSetting.currentPage);
      // console.log('sort:', datagridSetting.sortField);
      // console.log('order:', order);
      // console.log('-----------------------------');
      // 將表格資料append到 formData
      for (const key in searchParams) {
        formData.append(key, searchParams[key]);
      }
      formData.append('rows',datagridSetting.rows);
      formData.append('page',datagridSetting.currentPage);
      formData.append('sort',datagridSetting.sortField);
      formData.append('order',order);
      try {
        const response = await axios.post('http://192.168.0.177:7008/InventoryMng/Assets', formData);
        const data = response.data;
        if (data.state === 'success') {
          //取得datagrid成功
          // console.log('資產datagrid:', data.resultList);
          datagridSetting.totalRecords = data.resultList.total;
          rowData.value = data.resultList.rows;
          if(datagridSetting.selectAll) {
            selectedProduct.value = data.resultList.rows;
          }
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
      datagridSetting.loading = false;
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
    function clear() {
      for (const key in searchParams) {
        searchParams[key] = '';
      }
      EquipCategoryInit.value = '請先選擇設備總類'
      LayerInit.value = '請先選擇區域';
      submit('' , 'search')
    }
    function handlemsg(data) {
      alert(data)
    }
    return {
      dt,
      searchParams,
      DropdownArray,
      EquipCategoryInit,
      LayerInit,
      rowData,
      selectedProduct,
      datagridSetting,
      datagridfield,
      add,
      exportCSV,
      onSelectAllChange,
      submit,
      getEquipTypeName,
      getAreaName,
      selectType,
      selectCategory,
      selectStatus,
      selectArea,
      selectLayer,
      clear,
      handlemsg,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
@import "@/assets/css/theme.css";

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