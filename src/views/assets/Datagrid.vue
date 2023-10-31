<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col-xl-2 col-lg-6 col-md-6 col-12">
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
          <div class="col-xl-2 col-lg-6 col-md-6 col-12">
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
          <div class="col-xl-2 col-lg-6 col-md-6 col-12">
            <p>資產編號</p>
            <input type="text" v-model="searchParams.AssetsId" />
          </div>
          <div class="col-xl-2 col-lg-6 col-md-6 col-12">
            <p>資產名稱</p>
            <input type="text" v-model="searchParams.AssetName" />
          </div>
          <div class="col-xl-2 col-lg-6 col-md-6 col-12">
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
          <div class="col-xl-2 col-lg-6 col-md-6 col-12">
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
          <div class="col-xl-2 col-lg-6 col-md-6 col-12">
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
          <div class="col-xl-2 col-lg-6 col-md-6 col-12  flex-col">
            <p>入庫日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.StartDate" class="date-input" @focus="showDatePicker = true" @blur="showDatePicker = false" />
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-6 col-md-6 col-12 flex-col">
            <p>入庫日期(迄)</p>
            <div class="date-selector">
              <input type="date" v-model="searchParams.EndDate" class="date-input" @focus="showDatePicker = true" @blur="showDatePicker = false" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap">
        <button class="search_btn" @click="submit('','search')">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
        <button class="import_btn" @click="inputfile.click();">匯入</button>
        <button class="export_btn" @click="exportExcel">匯出</button>
      </div>
      <!-- input file  -->
      <input type="file" ref="inputfile" style="display: none;" @change="importExcel" accept=".xlsx,.csv,.xlsm">
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
            <Assets_return_button :params = "slotProps"/>
          </template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
      </DataTable>
    </div>
  </div>
  <!-- 加載動畫 -->
  <loading :active.sync="isLoading">
    <div class="loadingio-spinner-ellipsis-kfs3u9hd8sa">
      <div class="ldio-gxxoh6igtkw">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <p class="upload_text">
      上傳中
      <span class="dot-one"> .</span>
      <span class="dot-two"> .</span>
      <span class="dot-three"> .</span>
    </p>
  </loading>
</template>

<script>
  import Loading from 'vue-loading-overlay';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Assets_return_button from "@/components/Assets_return_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    Asset_StastusArraay
  } from "@/assets/js/dropdown"
  import {
    getMngDatagrid,
    getEquipType,
    getEquipCategory,
    getArea,
    getLayer,
  } from '@/assets/js/common_api'
  import { UpdatePageParameter, createDatagrid , } from '@/assets/js/common_fn';
  import axios from 'axios';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Assets_return_button,
      Loading,
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
      const datagrid = createDatagrid();
      const datagridfield = [
        { field: "AssetsId", width: '150px', header: "資產編號" },
        { field: "AssetName", width: '150px', header: "物品名稱" },
        { field: "EquipTypeName", width: '150px', header: "設備總類" },
        { field: "EquipCategoryName", width: '150px', header: "設備分類" },
        { field: "AreaName", width: '150px', header: "區域" },
        { field: "LayerName", width: '150px', header: "櫃位" },
        { field: "Status", width: '150px', header: "狀態" },
        { field: "InboundDate", width: '150px', header: "入庫日期" },
        { field: "AssetsInOperator", width: '150px', header: "入庫人員" },
      ]
      const rowData = ref([]);
      const inputfile = ref(null);
      const isLoading = ref(false);
      onMounted(() => {
        datagrid.sortField = 'AssetsId'
        submit('','search');
      });
      async function submit(event, type) {
        const form = new FormData();
        //將表格資料append到 form
        for (const key in searchParams) {
          form.append(key, searchParams[key]);
        }
        UpdatePageParameter( datagrid , event , type , form)
        getMngDatagrid('/InventoryMng/Assets',rowData,datagrid,form)
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
        if (DropdownArray.Area == 0) {
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
      async function importExcel(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          const fileName = selectedFile.name;
          // 檢查檔案大小
          console.log('filesize',selectedFile.size);
          const maxFileSize = 28 * 1024 * 1024; // 28MB
          if(selectedFile.size > maxFileSize) {
            alert('檔案' + selectedFile.name + '大於28MB，請重新選取');
            return
          }
          
          // 檢查副檔名
          // 以'.'切割字串並以pop取得最後一組。EX: demo.sss.xlsx => ['demo','sss','xlsx'] => pop出 'xlsx'並轉成小寫
          const fileExtension = fileName.split('.').pop().toLowerCase();
          if (fileExtension !== 'xlsx' && fileExtension !== 'csv' && fileExtension !== 'xlsm') {
            alert('檔案格式不正確(.xlsx/.csv)，請重新選擇')
            return
          }
          const form = new FormData();
          form.append('file',selectedFile);
          isLoading.value = true;
          axios.post('http://192.168.0.177:7008/InventoryMng/ImportExcel',form)
          .then((response)=>{
            const data = response.data;
            if(data.state === 'success') {
              // 匯入成功則清空條件並刷新datagrid
              clear();
            }
            isLoading.value = false;
            setTimeout(function () {
              alert(data.messages);
            }, 50); // 延遲alert，以先關閉loading動畫
          })
          .catch((error)=>{
            isLoading.value = false;
            console.error(error);
          })
        }
      }
      async function exportExcel() {
        const form = new FormData();
        //將表格資料append到 form
        for (const key in searchParams) {
          form.append(key, searchParams[key]);
        }
        axios.post('http://192.168.0.177:7008/InventoryMng/ExportExcel',form, {responseType: 'blob', })
        .then((response)=>{
          const data = response.data
          const header = response.headers
          console.log('content-disposition:',header['content-disposition']);
          console.log('content-type:',header['content-type']);
          if(header['content-type'].includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            const url = window.URL.createObjectURL(data) ;
            const a = document.createElement('a');
            const fileName = createFileName();
            console.log('filename:',fileName);
            a.href = url;
            a.download = fileName;
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
          }
        })
        .catch((error)=>{
          console.error(error);
        })
      }
      function createFileName() {
        // 创建一个新的Date对象来获取当前日期和时间
        var currentDate = new Date();

        // 获取年、月、日、小时、分钟和秒
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1; // 月份是从0开始，所以需要加1
        var day = currentDate.getDate();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();

        // 创建一个格式化的时间字符串
        var formattedTime = year + '' + addZero(month) + '' + addZero(day) + '' + addZero(hours) + '' + addZero(minutes) + '' + addZero(seconds)+'_資產報表.xlsx';
        return formattedTime;
      }
      function addZero(value) {
        return value < 10 ? '0' + value : value;
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
        submit('','search');
      }
      return {
        searchParams,
        DropdownArray,
        EquipCategoryInit,
        LayerInit,
        datagrid,
        datagridfield,
        rowData,
        inputfile,
        isLoading,
        submit,
        importExcel,
        exportExcel,
        getEquipTypeName,
        getAreaName,
        selectType,
        selectCategory,
        selectStatus,
        selectArea,
        selectLayer,
        clear,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  @import "@/assets/css/loading.css";
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
        display: flex;
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
      background-color: #5e7aa2;
    }
  }
  .import_btn {
    @include import_btn;
    &:hover {
      background-color: #7e9ecb;
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
        display: flex;
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
      background-color: #5e7aa2;
    }
  }
  .import_btn {
    @include import_btn;
    &:hover {
      background-color: #7e9ecb;
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
        font-size: 50px;
        font-weight: 600;
        @include title_color;
        margin-bottom: 20px;
      }
      .button_wrap {
        display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
    grid-template-areas:
        ". ."
        ". .";
    margin-bottom: 20px;
        button{
          margin:auto;
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
      background-color: #5e7aa2;
    }
  }
  .import_btn {
    @include import_btn;
    &:hover {
      background-color: #7e9ecb;
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