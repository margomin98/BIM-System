<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>編輯資產</h1>
    </div>
    <!-- 上半部表單 -->
    <div class="info_wrap col">
      <!-- 表單標頭 -->
      <div class="fixed_title">
        <div>
          <h4>資產資訊</h4>
        </div>
      </div>
      <div class="fixed_info">
        <div>
          <p>資產編號: {{ AssetsId }}</p>
        </div>
      </div>
      <!-- 表單內容 -->
      <div class="content">
        <!-- 狀態 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                狀態：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.Status">
            </div>
          </div>
        </div>
        <!-- 資產類型 (耗材為readonly ，資產<->存貨 可互換 )-->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex"><span v-if="details.AssetType !== '耗材'">*</span>資產類型：</div>
              <div v-if="details.AssetType !== '耗材'" class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ details.AssetType || '請選擇' }}
                </button>
                <div class="dropdown-menu">
                  <p v-for="(item , index) in DropdownArray.AssetType" :key="index" class="dropdown-item" @click="selectAssetType(item)">{{ item }}</p>
                </div>
              </div>
              <input v-else type="text" class="form-control readonly_box" readonly v-model="details.AssetType">
            </div>
          </div>
        </div>
        <!-- 專案代碼 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span v-show="details.AssetType === '存貨'">*</span>專案代碼：</div>
            <input type="text" class="form-control" v-model="details.ProjectCode" />
            <button class="form_search_btn" @click="getProjectName">搜尋</button>
          </div>
        </div>
        <!-- 專案名稱 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">專案名稱：</div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.ProjectName" />
          </div>
        </div>
        <!-- 物流單號 -->
        <div class="col form_search_wrap">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              物流單號 :
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="details.ShipmentNum" readonly>
            <button class="form_search_btn" @click="viewReceive">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{name: 'Receive_View' , query:{ search_id : details.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 設備 總類&分類 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>設備總類：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                  {{ details.EquipTypeName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="statusDropdown">
                  <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item" @click="selectType(item)">{{ item.Name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>設備分類：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="!details.EquipTypeName">
                  {{ details.EquipCategoryName || EquipCategoryInit }}
                </button>
                <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                  <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item" @click="selectCategory(item)">{{ item.Name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>物品名稱：</div>
            <input type="text" class="form-control " placeholder="最多輸入20字" v-model="details.AssetName" />
          </div>
        </div>
        <!-- 廠商 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">廠商：</div>
            <input type="text" class="form-control " placeholder="最多輸入100字" v-model="details.VendorName" />
          </div>
        </div>
        <!-- 規格 -->
        <div class="col">
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">規格：</div>
              <input type="text" class="form-control " placeholder="最多輸入100字" v-model="details.ProductSpec" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">型號：</div>
              <input type="text" class="form-control " placeholder="最多輸入100字" v-model="details.ProductType" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">S/N：</div>
              <input type="text" class="form-control " placeholder="最多輸入100字" v-model="details.SN" />
            </div>
          </div>
        </div>
        <!-- 總庫存數量 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">總庫存數量：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" readonly v-model="details.Number" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" readonly v-model="details.Unit" />
            </div>
          </div>
        </div>
        <!-- 儲位 區域&櫃位 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位區域：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName()">
                  {{ details.AreaName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item" @click="selectArea(item)">{{ item.Name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位櫃位：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="!details.AreaName">
                  {{ details.LayerName || LayerInit }}
                </button>
                <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                  <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item" @click="selectLayer(item)">{{ item.Name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 保固期限 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control " placeholder="最多輸入10字" v-model="details.WarrantyDate">
            </div>
          </div>
        </div>
        <!-- 保固 開始&到期 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固開始日： </div>
              <input type="date" class="form-control " v-model="details.WarrantyStartDate" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固到期日：</div>
              <input type="date" class="form-control " v-model="details.WarrantyEndDate" />
            </div>
          </div>
        </div>
        <!-- 保管人員 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex">保管人員：</div>
              <!-- <account-search @custodian = "setCustodian" :getCustodian="details.Custodian"></account-search> -->
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ details.Custodian || '請選擇' }}
                </button>
                <div class="dropdown-menu">
                  <p v-for="(item , index) in DropdownArray.Custodian" :key="index" class="dropdown-item" @click="selectAccount(item)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 入庫 人員&日期 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫人員： </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.AssetsInOperator" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫日期：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.InboundDate" />
            </div>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <textarea style="height: 150px;" class="form-control" aria-label="With textarea" v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- 中間資產照片輪播 -->
    <div class="info_wrap col photo">
      <div class="fixed_title">
        <div>
          <h4>資產照片</h4>
        </div>
      </div>
      <div class="content">
        <h2 class="no_content_text" v-show="selectFiles.viewFile.length === 0">查無照片</h2>
        <div v-show="selectFiles.viewFile.length !== 0">
          <swiper-container class='swiper_section' :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
            <swiper-slide v-for="(item , index) in selectFiles.viewFile" :key="index" class="custom-slide">
              <img :src="item.FileLink" alt="">
              <span @click="deleteFileFunction(index)">x</span>
            </swiper-slide>
          </swiper-container>
          <div class="swiper_pagination">
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class='select_btn' @click="openFileExplorer()">選擇檔案</button>
        <input type="file" accept="image/*" ref="fileInputs" style="display: none;" multiple @change="handleFileChange($event)" />
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
    <!-- 歷史紀錄 -->
    <div class="info_wrap col log">
      <div class="fixed_title">
        <div>
          <h4>進出庫歷史紀錄</h4>
        </div>
      </div>
      <div class="content_wrap">
        <div class="content">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4 col-6">
              <p>作業日期(起)</p>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" v-model="searchParams.StartDate" class="date-input" />
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-6">
              <p>作業日期(迄)</p>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" v-model="searchParams.EndDate" class="date-input" />
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-12">
              <p>作業行為</p>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ searchParams.Action || "請選擇" }}
                  </button>
                <div class="dropdown-menu" aria-labelledby="statusDropdown">
                  <p v-for="(item , index) in ActionArray" :key="index" class="dropdown-item" @click="selectAction(item)">{{ item}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col button_wrap">
          <button class="search_btn" @click="searchHistory('','search')">檢索</button>
          <button class="empty_btn" @click="clear">清空</button>
        </div>
        <div class="info_wrap">
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
            @page="searchHistory($event , 'page')" 
            @sort="searchHistory($event , 'sort')"
            paginator 
            :rows="datagrid.rows" 
            :totalRecords="datagrid.totalRecords"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            :rowsPerPageOptions="[10, 20, 30]"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 60px;">
              <template #body="slotProps">
                <Storage_list_view_button :params = "slotProps" v-if="slotProps.data.FormID"/>
              </template>
            </Column>
            <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
          </DataTable>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Storage_list_view_button from "@/components/Storage_list_view_button";
  import Navbar from "@/components/Navbar.vue";
  import { HistoryAction , Asset_TypeArray} from "@/assets/js/dropdown";
  import { getEquipType , getEquipCategory , getArea , getLayer , getProject , getAccount , getMngDatagrid, GetAntiForgeryToken } from '@/assets/js/common_api'
  import { UpdatePageParameter, createDatagrid , goBack, checkFileSize } from '@/assets/js/common_fn';
  import { onMounted, ref, reactive } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { Pagination } from 'swiper/modules';
  import {
    register
  } from 'swiper/element/bundle';
import axios from 'axios';
  register();
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Storage_list_view_button,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AssetsId = route.query.search_id;
      // 上半部表單
      const details = ref({});
      const DropdownArray = reactive({
        AssetType: Asset_TypeArray,
        EquipType: [],
        EquipCategory: [],
        Custodian: [],
        Area: [],
        Layer: [],
      })
      const EquipCategoryInit = ref('請先選擇設備總類');
      const LayerInit = ref('請先選擇區域');
      // 中間照片
      const fileInputs = ref();
      const increseId = ref(0);
      const selectFiles = reactive({
        newFile: [],
        deleteFile: [],
        viewFile: [],
      })
      //  下半部歷史紀錄
      const searchParams = reactive({
        StartDate: '',
        EndDate: '',
        Action: '',
      });
      const ActionArray = HistoryAction;
      const datagrid = createDatagrid();
      const datagridfield = [
        { field: "ExecutionDate", width: '150px', header: "作業日期" },
        { field: "Action", width: '150px', header: "作業行為" },
        { field: "FormID", width: '200px', header: "單號" },
        { field: "IH_Number", width: '100px', header: "數量" },
        { field: "IH_Unit", width: '100px', header: "單位" },
        { field: "ApplyPerson", width: '150px', header: "申請人員" },
        { field: "ExecutionPerson", width: '150px', header: "承辦人員" }
      ]
      const rowData = ref([]);
      onMounted(() => {
        datagrid.sortField = 'ExecutionDate'
        getDetails();
        getAccountName();
        searchHistory('','search');
      });
      // 上半部表單部分 & 送出
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetAssetInfo?id=${AssetsId}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            if (details.value.WarrantyStartDate && details.value.WarrantyEndDate) {
              details.value.WarrantyStartDate = details.value.WarrantyStartDate.replace(/\//g, '-');
              details.value.WarrantyEndDate = details.value.WarrantyEndDate.replace(/\//g, '-');
            }
            if (details.value.existFile) {
              details.value.existFile.forEach(item => {
                selectFiles.viewFile.push({
                  FileName: item.FileName,
                  FileLink: item.FileLink,
                  FileType: 'exist',
                });
              });
            }
            getEquipCategoryName();
            getLayerName();
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function submit() {
        console.log(details.value);
        // 檢查必填項目
        if (!details.value.EquipCategoryName || !details.value.EquipTypeName || !details.value.AssetName || !details.value.AssetType) {
          alert('請填寫所有必填項目');
          return;
        }
        if (!/^[\s\S]{1,20}$/.test(details.value.AssetName)) {
          alert('物品名稱不可輸入超過20字');
          return
        }
        if (!/^[\s\S]{0,100}$/.test(details.value.VendorName)) {
          alert('廠商不可輸入超過100字');
          return
        }
        if (!/^[\s\S]{0,100}$/.test(details.value.ProductSpec)) {
          alert('規格不可輸入超過100字');
          return
        }
        if (!/^[\s\S]{0,100}$/.test(details.value.ProductType)) {
          alert('型號不可輸入超過100字');
          return
        }
        if (!/^[\s\S]{0,100}$/.test(details.value.SN)) {
          alert('SN不可輸入超過100字');
          return
        }
        if (!/^[\s\S]{0,10}$/.test(details.value.WarrantyDate)) {
          alert('保固期限不可輸入超過10字');
          return
        }
        if (!/^[\s\S]{0,500}$/.test(details.value.Memo)) {
          alert('備註不可輸入超過500字');
          return
        }
        // 存貨需額外檢查專案代碼
        if(details.value.AssetType === '存貨') {
          if(!details.value.ProjectCode) {
            alert('請填寫所有必填項目');
            return;
          }
          if(!/^.{0,10}$/.test(details.value.ProjectCode)) {
            alert('專案代碼不可輸入超過10字');
            return
          }
        }
        const axios = require('axios');
        const formData = new FormData();
        const formFields = {
          'AssetsId': AssetsId,
          'AssetType': details.value.AssetType,
          'EquipType_Id': details.value.EquipType_Id,
          'ProjectCode': details.value.ProjectCode,
          'Category_Id': details.value.Category_Id,
          'AssetName': details.value.AssetName,
          'VendorName': details.value.VendorName,
          'ProductSpec': details.value.ProductSpec,
          'ProductType': details.value.ProductType,
          'SN': details.value.SN,
          'Area_Id': details.value.Area_Id,
          'Layer_Id': details.value.Layer_Id,
          'WarrantyDate': details.value.WarrantyDate,
          'WarrantyStartDate': details.value.WarrantyStartDate,
          'WarrantyEndDate': details.value.WarrantyEndDate,
          'Custodian': details.value.Custodian,
          'Memo': details.value.Memo,
        };
        //將表格資料append到 formData
        for (const fieldName in formFields) {
          if (formFields[fieldName]) {
            formData.append(fieldName, formFields[fieldName]);
            console.log(formData.get(`${fieldName}`));
          }
        }
        if (selectFiles.newFile.length > 0) {
          selectFiles.newFile.forEach(item => {
            formData.append('newFile', item.file);
          });
        }
        if (selectFiles.deleteFile.length > 0) {
          selectFiles.deleteFile.forEach(item => {
            formData.append('deleteFile', item);
          });
        }
        try {
          const token = await GetAntiForgeryToken();
          const response = await axios.post('http://192.168.0.177:7008/InventoryMng/AssetEdit', formData,{
            headers:{
              'RequestVerificationToken': token,
            }
          });
          const data = response.data;
          console.log(data);
          if (data.state === 'success') {
            let msg = data.messages;
            msg += '\n單號:' + data.resultList.AssetsId;
            alert(msg);
            router.push({
              name: 'Assets_Datagrid'
            });
          } else if (data.state === 'account_error') {
            //尚未登入
            alert(data.messages);
            router.push('/');
          } else if (data.state === 'error') {
            alert(data.messages);
            console.log('error state', response);
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
        getEquipCategory(details.value.EquipType_Id)
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
        getLayer(details.value.Area_Id)
        .then((data)=>{
          DropdownArray.Layer = data;
        })
        .catch((error) =>{
          console.error(error);
        })
      }
      async function getAccountName() {
        getAccount('')
        .then((data)=>{
          DropdownArray.Custodian = data;
        })
        .catch((error)=>{
          console.error(error);
        })
      }
      // 搜尋專案名稱
      async function getProjectName() {
        let code = details.value.ProjectCode;
        if (!/^[\s\S]{0,10}$/.test(code)) {
          alert('專案代碼格式錯誤');
          return;
        }
        getProject(code)
        .then((data)=>{
          details.value.ProjectName = data ;
        })
        .catch((error)=>{
          console.error(error);
        })
      }
      // 檢視收貨單
      function viewReceive() {
        if(details.value.AR_ID) {
          const link = document.getElementById('view-receive');
          link.click();
        }
      }
      function selectType(item) {
      details.value.EquipTypeName = item.Name;
      details.value.EquipType_Id = item.Id;
      details.value.EquipCategoryName = '';
      details.value.Category_Id = '';
      getEquipCategoryName();
      EquipCategoryInit.value = '請選擇';
      }
      function selectCategory(item) {
        details.value.EquipCategoryName = item.Name;
        details.value.Category_Id = item.Id;
      }
      const selectArea = (item) => {
        details.value.AreaName = item.Name;
        details.value.Area_Id = item.Id;
        details.value.LayerName = '';
        details.value.Layer_Id = '';
        getLayerName();
        LayerInit.value = '請選擇';
      };
      const selectLayer = (item) => {
        details.value.LayerName = item.Name;
        details.value.Layer_Id = item.Id;
      };
      const setCustodian = (data) => {
        details.value.Custodian = data;
      }
      const selectAccount = (item) => {
        details.value.Custodian = item;
      }
      const selectAssetType = (item) => {
        // 資產類型變更為"資產" 清空專案代碼、名稱
        if(item === '資產') {
          details.value.ProjectCode = '';
          details.value.ProjectName = '';
        }
        details.value.AssetType = item;
      }
      // 輪播部分 function
      function openFileExplorer() {
        fileInputs.value.click();
      }
      function handleFileChange(event) {
        const files = event.target.files;
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (files.length + selectFiles.viewFile.length > 5) {
          alert('上傳至多5張圖片');
          return;
        }
        //檢查檔名
        for (let i = 0; i < files.length; i++) {
          const fileName = files[i].name;
          const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
          if (!imageExtensions.includes(fileExtension.toLowerCase())) {
            alert(fileExtension + '不在允許的格式範圍內，請重新選取');
            return;
          }
        }
        // 檢查圖片大小
        if(!checkFileSize(files,selectFiles.newFile,true)) {  
          return
        }
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const file = files[i]; // 保持原始文件
            selectFiles.newFile.push({
              file: file,
              id: increseId.value,
            });
            selectFiles.viewFile.push({
              FileName: file.name,
              FileLink: URL.createObjectURL(file),
              FileType: 'new',
              id: increseId.value,
            });
            increseId.value++;
          };
          reader.readAsDataURL(files[i]);
        }
        console.log('newFile', selectFiles.newFile);
      }
      function deleteFileFunction(index) {
        const file = selectFiles.viewFile[index];
        switch (file.FileType) {
          // 已上傳檔案 ->從輪播陣列刪除 & 加到deleteFile
          case 'exist':
            selectFiles.deleteFile.push(file.FileName);
            selectFiles.viewFile.splice(index, 1);
            console.log('deleteFile', selectFiles.deleteFile);
            break;
            // 新上傳檔案 ->從輪播陣列刪除 & 從newFile移除
          case 'new':
            const newFileIndex = selectFiles.newFile.findIndex(item => item.id === file.id);
            selectFiles.newFile.splice(newFileIndex, 1);
            selectFiles.viewFile.splice(index, 1);
            console.log('newFile', selectFiles.newFile);
            break;
        }
      }
      // 歷史紀錄部分function
      async function searchHistory(event, type) {
        const form = new FormData();
        //將表格資料append到 form
        for (const key in searchParams) {
          form.append(key, searchParams[key]);
        }
        form.append('AssetsId',AssetsId);
        UpdatePageParameter( datagrid , event , type , form)
        getMngDatagrid('/InventoryMng/AssetsHistory',rowData,datagrid,form)
      }
      const selectAction = item => {
        searchParams.Action = item;
      }
      function clear() {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        searchHistory('','search');
      }
      return {
        AssetsId,
        details,
        DropdownArray,
        EquipCategoryInit,
        LayerInit,
        fileInputs,
        selectFiles,
        searchParams,
        ActionArray,
        datagrid,
        datagridfield,
        rowData,
        submit,
        getEquipTypeName,
        getAreaName,
        getProjectName,
        viewReceive,
        selectType,
        selectCategory,
        selectArea,
        selectLayer,
        setCustodian,
        selectAccount,
        selectAssetType,
        openFileExplorer,
        handleFileChange,
        deleteFileFunction,
        searchHistory,
        selectAction,
        clear,
        goBack,
        pagination: {
          clickable: true,
        },
        modules: [Pagination],
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  span {
    @include red_star
  }
  .no_content_text{
    margin-bottom: 0;
    padding: 10px 0;
    text-align: center;
    font-weight: 700;
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      .swiper_section {
        swiper-slide {
          align-self: baseline;
          span {
            cursor: pointer;
            position: absolute;
            top: 25px;
            right: -14px;
            background: #E94B4B;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: 700;
          }
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
        }
      }
      .readonly_box {
        @include readonly_box;
      }
      .form_search_btn {
        @include form_search_btn;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        width: 850px;
        .fixed_info {
          @include fixed_info;
          border-radius: 0 10px 0 0;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .fixed_title {
          @include fixed_title;
        }
        .content {
          @include content_bg;
          .form_search_wrap {
            .input-group {
              .input-group-prepend {
                width: 114px;
              }
              input {
                margin-left: 15px !important
              }
            }
          }
          .dropdown {
            .dropdown-menu {
              width: 100%;
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
            button {
          padding: 0;
              width: 100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 120px;
              white-space: nowrap;
              text-align: end;
            }
          }
          .row:nth-child(2),
          .row:nth-child(7),
          .row:nth-child(10) {
            .input-group {
              flex-wrap: nowrap;
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 28%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          button.empty_btn {
            @include empty_btn;
            &:hover {
              background-color: #244f86;
            }
          }
          button.select_btn {
            @include empty_btn;
            width: 150px;
            &:hover {
              background-color: #244f86;
            }
          }
          button.send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          button.search_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
        .dropdown {
          width: calc(100% - 34%);
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
      .log {
        .info_wrap {
          width: 100%;
          #grid_table {
            margin-bottom: 0 !important;
          }
        }
        .content_wrap {
          background-color: #E6EAEC;
          border-radius: 0 10px 10px 10px;
          padding: 20px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          .content {
            border-radius: 10px;
          }
          p {
            @include datagrid_title;
          }
          input {
            display: flex;
            border: none;
            border-radius: 5px;
            background-color: white;
            padding: 5px 10px;
            font-size: 18px;
            width: 200px;
            height: 35px;
          }
        }
      }
      .photo {
        .content {
          border-radius: 0 10px 10px 10px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          background-color: #e5e8e9;
        }
        margin: 5% auto;
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .swiper_section {
        swiper-slide {
          align-self: baseline;
          span {
            cursor: pointer;
            position: absolute;
            top: 25px;
            right: -14px;
            background: #E94B4B;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: 700;
          }
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
        }
      }
      .readonly_box {
        @include readonly_box;
      }
      .form_search_btn {
        @include form_search_btn;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        width: 700px;
        .fixed_info {
          @include fixed_info;
          border-radius: 0 10px 0 0;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .fixed_title {
          @include fixed_title;
        }
        .content {
          @include content_bg;
          .dropdown {
            .dropdown-menu {
              width: 100%;
            }
            button {
             padding: 0;
              width: 100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 120px;
              text-align: end;
            }
          }
          .row:nth-child(2),
          .row:nth-child(7),
          .row:nth-child(10) {
            .input-group {
              flex-wrap: nowrap;
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 28%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          button.empty_btn {
            @include empty_btn;
            &:hover {
              background-color: #244f86;
            }
          }
          button.select_btn {
            @include empty_btn;
            width: 150px;
            &:hover {
              background-color: #244f86;
            }
          }
          button.send_btn {
            @include search_and_send_btn;
                 padding: 10px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          button.search_btn {
            @include search_and_send_btn;
                 padding: 10px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
        .dropdown {
          width: calc(100% - 41%);
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
      .info_wrap:nth-child(4) .info_wrap {
        padding: 0;
      }
      .log {
        .info_wrap {
          width: 100%;
          #grid_table {
            margin-bottom: 0 !important;
          }
        }
        .content_wrap {
          background-color: #E6EAEC;
          border-radius: 0 10px 10px 10px;
          padding: 20px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          .content {
            border-radius: 10px;
          }
          p {
            @include datagrid_title;
          }
          input {
            display: flex;
            border: none;
            border-radius: 5px;
            background-color: white;
            padding: 5px 10px;
            font-size: 18px;
            width: 200px;
            height: 35px;
          }
        }
      }
      .photo {
        .content {
          border-radius: 0 10px 10px 10px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          background-color: #e5e8e9;
        }
        margin: 5% auto;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .swiper_section swiper-slide {
        span {
          cursor: pointer;
          position: absolute;
          top: 25px;
          right: 27px;
          background: #E94B4B;
          height: 30px;
          width: 30px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: 700;
        }
        img {
          width: 100%;
          height: auto;
          padding: 40px;
        }
      }
      .readonly_box {
        @include readonly_box;
      }
      .form_search_btn {
        border: none;
        color: white;
        width: 60px;
        height: 35px;
        margin-top: 10px;
        margin-left: unset !important;
        font-weight: 700;
        padding: 0 10px;
        background-color: #132238;
        &:hover {
          background-color: #43546d;
        }
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 50px;
        font-weight: 600;
        @include title_color;
      }
      .photo {
        margin: 5% auto;
      }
      .info_wrap {
        padding: 1% 5% 0;
        .fixed_title {
          @include fixed_title;
        }
        .fixed_info {
          @include fixed_info;
          flex-direction: column;
          height: unset;
          padding: 10px;
          border-radius: 0 10px 0 0;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .row {
            gap: 10px 0;
          }
          .dropdown {
            margin-left: unset !important;
            .dropdown-menu {
              width: 100%;
            }
            button {
              @include dropdown-btn;
              width: 100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            flex-direction: column;
            .input-number {
              @include count_btn;
            }
            .form-control {
              width: 100%;
              height: 35px;
              border-radius: 0;
              margin-left: unset !important;
            }
            .input-group-prepend {
              margin-bottom: 5px;
              color: white;
              font-weight: 700;
              font-size: 20px;
            }
          }
        }
        .content:nth-child(1),
        .content:nth-child(2) {
          border-radius: 0px 10px 10px 10px
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 20%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          button.empty_btn {
            @include empty_btn;
            padding: 5px;
            &:hover {
              background-color: #244f86;
            }
          }
          button.select_btn {
            @include empty_btn;
            padding: 5px;
            width: 140px;
            &:hover {
              background-color: #244f86;
            }
          }
          button.send_btn {
            @include search_and_send_btn;
            padding: 10px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          button.search_btn {
            @include search_and_send_btn;
            padding: 5px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
      }
      .info_wrap:nth-child(4) .info_wrap {
        padding: 0;
      }
      .log {
        .info_wrap {
          width: 100%;
          #grid_table {
            margin-bottom: 0 !important;
          }
        }
        .content_wrap {
          background-color: #E6EAEC;
          border-radius: 0 10px 10px 10px;
          padding: 20px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          .content {
            border-radius: 10px;
          }
          p {
            @include datagrid_title;
          }
          input {
            display: flex;
            border: none;
            border-radius: 5px;
            background-color: white;
            padding: 5px 10px;
            font-size: 18px;
            width: 100%;
            height: 35px;
          }
        }
      }
      .photo {
        .content {
          padding: 0;
          border-radius: 0 10px 10px 10px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          background-color: #e5e8e9;
        }
        margin: 5% auto;
      }
    }
  }
</style>