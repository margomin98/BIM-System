<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <!-- 狀態 -->
          <div class="col">
            <p>狀態</p>
            <select class="form-select" v-model="dgSearchParams.Status">
              <option value="">--請選擇--</option>
              <option v-for="option in DropdownArray.Status" :value="option">{{ option }}</option>
            </select>
          </div>
          <!-- 設備總類 -->
          <div class="col">
            <p>設備總類</p>
            <select class="form-select" v-model="dgSearchParams.EquipType_Id"
              @change="async () => { DropdownArray.EquipCategory = await apiStore.getEquipCategory(dgSearchParams.EquipType_Id); dgSearchParams.Category_Id = ''; }">
              <option value="">--請選擇--</option>
              <option v-for="option in DropdownArray.EquipType" :value="option.Id">{{ option.Name }}</option>
            </select>
          </div>
          <!-- 設備分類 -->
          <div class="col">
            <p>設備分類</p>
            <select class="form-select" v-model="dgSearchParams.Category_Id">
              <option v-if="DropdownArray.EquipCategory.length == 0" value="">--請先選擇設備總類--</option>
              <template v-else>
                <option value="">--請選擇--</option>
                <option v-for="option in DropdownArray.EquipCategory" :value="option.Id">{{ option.Name }}</option>
              </template>
            </select>
          </div>
          <!-- 儲位區域 -->
          <div class="col">
            <p>儲位區域</p>
            <select class="form-select" v-model="dgSearchParams.Area_Id"
              @change="async () => { DropdownArray.Layer = await apiStore.getLayer(dgSearchParams.Area_Id); dgSearchParams.Layer_Id = ''; }">
              <option value="">--請選擇--</option>
              <option v-for="option in DropdownArray.Area" :value="option.Id">{{ option.Name }}</option>
            </select>
          </div>
          <!-- 儲位櫃位 -->
          <div class="col">
            <p>儲位櫃位</p>
            <select class="form-select" v-model="dgSearchParams.Layer_Id">
              <option v-if="DropdownArray.Layer.length == 0" value="">--請先選擇儲位區域--</option>
              <template v-else>
                <option value="">
                  --請選擇--</option>
                <option v-for="option in DropdownArray.Layer" :value="option.Id">{{ option.Name }}</option>
              </template>
            </select>
          </div>
          <!-- 專案代碼 -->
          <div class="col">
            <p>專案代碼</p>
            <multiselect v-model="dgSearchParams.ProjectSelect" :allow-empty="false"
              @select="utilsStore.onDGProjectSelect" :options="DropdownArray.ProjectCode" :max-height="300"
              placeholder="請選擇" label="Text" :showLabels="false" track-by="Text"></multiselect>
          </div>
          <!-- 資產編號 -->
          <div class="col">
            <p>資產編號</p>
            <input type="text" v-model="dgSearchParams.AssetsId" />
          </div>
          <!-- 物品名稱 -->
          <div class="col">
            <p>物品名稱</p>
            <input type="text" v-model="dgSearchParams.AssetName" />
          </div>
          <!-- 型號 -->
          <div class="col">
            <p>型號</p>
            <input type="text" v-model="dgSearchParams.ProductType" />
          </div>
          <!-- 規格 -->
          <div class="col">
            <p>規格</p>
            <input type="text" v-model="dgSearchParams.ProductSpec" />
          </div>
          <!-- 專案名稱 -->
          <div class="col">
            <p>專案名稱</p>
            <input type="text" v-model="dgSearchParams.ProjectName" />
          </div>
          <!-- 入庫日期(起) -->
          <div class="col">
            <p>入庫日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="dgSearchParams.StartDate" class="date-input" />
              </div>
            </div>
          </div>
          <!-- 入庫日期(迄) -->
          <div class="col">
            <p>入庫日期(迄)</p>
            <div class="date-selector">
              <input type="date" v-model="dgSearchParams.EndDate" class="date-input" />
            </div>
          </div>
          <!-- 保管人員 -->
          <div class="col">
            <p>保管人員</p>
            <select class="form-select" v-model="dgSearchParams.Custodian">
              <option value="">--請選擇--</option>
              <option v-for="item in DropdownArray.Staff" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
          <!-- 入庫人員 -->
          <div class="col">
            <p>入庫人員</p>
            <select class="form-select" v-model="dgSearchParams.AssetsInOperator">
              <option value="">--請選擇--</option>
              <option v-for="item in DropdownArray.Staff" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap">
        <button class="search_btn" @click="submit('', 'search')">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
        <button class="import_btn" @click="inputfile.click();">匯入</button>
        <button class="export_btn" @click="exportExcel">匯出</button>
      </div>
      <!-- input file  -->
      <input type="file" ref="inputfile" style="display: none;" @change="importExcel" accept=".xlsx,.csv,.xlsm">
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
            <Assets_return_button :params="slotProps" />
          </template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable
          :style="{ 'min-width': item.width }"></Column>
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

<script setup>
import Multiselect from 'vue-multiselect'
import Loading from 'vue-loading-overlay';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Assets_return_button from "@/components/Assets_return_button";
import Navbar from "@/components/Navbar.vue";
import { onMounted, reactive, ref, onUnmounted } from "vue";
import { Asset_StastusArray } from "@/assets/js/dropdown"
import { useUtilsStore, useAPIStore } from '@/store'
import { storeToRefs } from 'pinia';
import axios from '@/axios/tokenInterceptor'
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const { dgSearchParams , dg , dgRowData } = storeToRefs(utilsStore);

const searchParams = reactive({
  EquipType_Id: '',
  Category_Id: '',
  AssetsId: '',
  AssetName: '',
  Status: '',
  ProductType: '',
  ProductSpec: '',
  ProjectName: '',
  Area_Id: '',
  Layer_Id: '',
  StartDate: '',
  EndDate: '',
  EndDate: '',
  AssetsInOperator: '',
  Custodian: '',
});
const DropdownArray = reactive({
  Status: Asset_StastusArray,
  ProjectCode: [],
  EquipType: [],
  EquipCategory: [],
  Area: [],
  Layer: [],
  Staff: [],
});
const datagridfield = [
  { field: "AssetsId", width: '150px', header: "資產編號" },
  { field: "AssetName", width: '150px', header: "物品名稱" },
  { field: "Status", width: '150px', header: "狀態" },
  { field: "Custodian", width: '150px', header: "保管人員" },
  { field: "ProjectName", width: '150px', header: "專案名稱" },
  { field: "ProductType", width: '150px', header: "型號" },
  { field: "ProductSpec", width: '150px', header: "規格" },
  { field: "EquipTypeName", width: '150px', header: "設備總類" },
  { field: "EquipCategoryName", width: '150px', header: "設備分類" },
  { field: "AreaName", width: '150px', header: "區域" },
  { field: "LayerName", width: '150px', header: "櫃位" },
  { field: "InboundDate", width: '150px', header: "入庫日期" },
  { field: "AssetsInOperator", width: '150px', header: "入庫人員" },
];
const inputfile = ref(null);
const isLoading = ref(false);

onMounted(async () => {
  utilsStore.$reset();
  for(const key in searchParams) {
    dgSearchParams.value[key] = '';
  }
  dg.value.sortField = 'AssetsId'
  submit('', 'search');
  DropdownArray.EquipType = await apiStore.getEquipType();
  DropdownArray.Area = await apiStore.getArea();
  DropdownArray.Staff = await apiStore.getCustodian();
  DropdownArray.ProjectCode = await apiStore.getFuzzyProject();
});
onUnmounted(()=>{
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
    const resultList = await apiStore.getMngDatagrid('/InventoryMng/Assets', dg.value, form);
    dgRowData.value = resultList.rows;
    dg.value.totalRecords = resultList.total;
    dg.value.key++;
  }
  async function importExcel(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name;
      // 檢查檔案大小
      console.log('filesize', selectedFile.size);
      const maxFileSize = 28 * 1024 * 1024; // 28MB
      if (selectedFile.size > maxFileSize) {
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
      form.append('file', selectedFile);
      isLoading.value = true;
      axios.post('http://192.168.0.177:7008/InventoryMng/ImportExcel', form)
        .then((response) => {
          const data = response.data;
          if (data.state === 'success') {
            // 匯入成功則清空條件並刷新datagrid
            clear();
          }
          isLoading.value = false;
          setTimeout(function() {
            alert(data.messages);
          }, 50); // 延遲alert，以先關閉loading動畫
        })
        .catch((error) => {
          isLoading.value = false;
          console.error(error);
        })
    }
  }
  async function exportExcel() {
    const form = new FormData();
    //將表格資料append到 form
    for (const key in dgSearchParams.value) {
      form.append(key, dgSearchParams.value[key]);
    }
    axios.post('http://192.168.0.177:7008/InventoryMng/ExportExcel', form, {
        responseType: 'blob',
      })
      .then((response) => {
        const data = response.data
        const header = response.headers
        console.log('content-disposition:', header['content-disposition']);
        console.log('content-type:', header['content-type']);
        if (header['content-type'].includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
          const url = window.URL.createObjectURL(data);
          const a = document.createElement('a');
          const fileName = createFileName();
          console.log('filename:', fileName);
          a.href = url;
          a.download = fileName;
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
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
    var formattedTime = year + '' + addZero(month) + '' + addZero(day) + '' + addZero(hours) + '' + addZero(minutes) + '' + addZero(seconds) + '_資產報表.xlsx';
    return formattedTime;
  }
  function addZero(value) {
    return value < 10 ? '0' + value : value;
  }
  function clear() {
    utilsStore.clearSearchParams(dgSearchParams.value);
    DropdownArray.EquipCategory = [];
    DropdownArray.Layer = [];
    dgSearchParams.value.ProjectSelect = {
      Text: '--請選擇--',
      Value: ''
    };
    submit('', 'search');
  }
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
@import "@/assets/css/loading.css";

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

@media only screen and (min-width: 1200px) {
  .main_section {
    padding: 0 10%;

    .datagrid_section {
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 10px;
        padding: 2%;

        button {
          border: none;
          padding: 0;
          width: 100%;
          font-size: 18px;
          height: 100%;
        }
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
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 15px;
        padding: 20px;

        input {
          height: 35px;
        }

        button {
          padding: 0;
          width: 100%;
          font-size: 18px;
          height: 100%;
          text-align: left;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    padding: 5%;

    .button_wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }

    .datagrid_section {
      .row {
        display: flex;
        flex-direction: column;
        gap: 10px 0;
        padding: 30px;

        p {
          font-size: 18px;
        }

        button {
          padding: 0;
          width: 100%;
          font-size: 18px;
          height: 100%;
          text-align: left;
        }
      }
    }
  }
}
</style>