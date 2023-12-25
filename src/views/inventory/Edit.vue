<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>編輯盤點計畫</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>計畫內容</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">計畫編號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="details.PlanId" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>標題：</div>
            <input type="text" class="form-control text-center" placeholder="最多輸入20字" v-model="formParams.PlanTitle" />
          </div>
        </div>
        <div class="row organizer_wrap">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex"><span>*</span>盤點人員：</div>
              <div class="dropdown">
                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          {{ formParams.InventoryStaffName || '請選擇' }}
                        </button>
                <div class="dropdown-menu">
                  <p v-for="(item , index) in DropdownArray.InventoryStaff" :key="index" @click="selectStaff(item)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點召集人：</div>
              <input type="text" class="form-control readonly_box organizer" v-model="details.ConvenerName" readonly />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>盤點開始日期：</div>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" class="date-input" v-model="formParams.PlanStart" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>盤點結束日期：</div>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" class="date-input" v-model="formParams.PlanEnd" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 專案代碼 --> 
        <div v-show="formParams.PlanType === '專案盤點'" class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span>*</span>專案代碼 :
            </div>
            <input type="text" class="form-control" placeholder="最多輸入10字" v-model="formParams.ProjectCode">
            <button class="form_search_btn" @click="getProjectName('upperForm')">搜尋</button>
          </div>
        </div>
        <!-- 專案名稱 -->
        <div v-show="formParams.PlanType === '專案盤點'" class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              專案名稱 :
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="formParams.ProjectName" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend"><span>*</span>盤點類型：</div>
            <div class="check_section d-flex">
              <template v-for="(item , index) in PlanType" :key="item">
                <div class="form-check d-flex align-items-center">
                  <input type="radio" :id="`no${index}`" name="radio" :value="item" v-model="formParams.PlanType" />
                  <label :for="`no${index}`">{{ item }}</label>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="col">
        <button class="add_btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="()=>{searchParams.ProjectCode =formParams.ProjectCode;searchInventory('','search');}">新增盤點項目</button>
        <!-- Modal -->
        <div class="modal fade" data-bs-backdrop="static" id="exampleModal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                <div class="fixed_info">
                  <div>
                    <p>檢索資產</p>
                  </div>
                  <button type="button" class="close" data-bs-dismiss="modal">x</button>
                </div>
                <div class='second_content'>
                  <div class='wrap1'>
                    <div class='col'>
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
                    <div class='col'>
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
                    <div class='col'>
                      <p>物品名稱</p>
                      <input type="text" class="form-control text-center" placeholder="最多輸入20字" v-model="searchParams.AssetName" />
                    </div>
                    <div class='col'>
                      <p>儲位區域</p>
                      <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName">
                                  {{ searchParams.AreaName || '請選擇' }}
                                </button>
                        <div class="dropdown-menu" aria-labelledby="areaDropdown">
                          <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item" @click="selectArea(item)">{{ item.Name }}</p>
                        </div>
                      </div>
                    </div>
                    <div class='col'>
                      <p>儲位櫃位</p>
                      <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="searchParams.AreaName === ''">
                                  {{ searchParams.LayerName || LayerInit }}
                                </button>
                        <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                          <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item" @click="selectLayer(item)">{{ item.Name }}</p>
                        </div>
                      </div>
                    </div>
                    <div v-show="formParams.PlanType === '專案盤點'" class='col'>
                      <p>專案代碼</p>
                      <input type="text" class="form-control text-center" placeholder="最多輸入10字" v-model="searchParams.ProjectCode" />
                    </div>
                  </div>
                  <div class='col d-flex justify-content-center'>
                    <button class="btn submit_btn" type="button" @click="searchInventory('','search')">搜尋</button>
                    <button class="btn submit_btn" style="margin-left: 0.5rem;" @click="clear">清空</button>
                    <button class="btn submit_btn" style="margin-left: 0.5rem;" type="button" data-bs-dismiss="modal" @click="addList">加入</button>
                  </div>
                </div>
              </div>
              <div class="fixed_info">
                <div>
                  <p>目前資產庫存</p>
                </div>
              </div>
              <DataTable lazy :first="datagrid1.first" :size="'small'" :loading="datagrid1.loading" :value="rowData1" :sort-field="datagrid1.sortField" :sort-order="datagrid1.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="510px"
                @page="searchInventory($event , 'page')" @sort="searchInventory($event , 'sort')" v-model:selection="datagrid1.selectedList" :selectAll="datagrid1.selectAll" @select-all-change="onSelectAll" @row-unselect="onRowUnselect" paginator :rows="10"
                :totalRecords="datagrid1.totalRecords" paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column style="min-width: 60px;">
                  <template #body="slotProps">
                    <!-- Add the custom component here -->
                    <List_view_button :params = "slotProps" />
</template>
              </Column>
              <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed_info">
        <div>
          <p><span>*</span>盤點範圍(請至少新增一項)</p>
        </div>
      </div>
      <div class="content">
        <div v-if="rowData2.length ===0">
          <h2 class="no_content_text">尚未選取盤點項目</h2>
        </div>
        <div v-else style="height;: 100%">
          <DataTable 
            lazy 
            :first= "datagrid2.first"
            :size="'small'"
            :loading="datagrid2.loading"
            :value="rowData2" 
            :sort-field="datagrid2.sortField"
            :sort-order="datagrid2.sortOrder"
            resizableColumns 
            columnResizeMode="expand"
            showGridlines 
            scrollable 
            scrollHeight="820px" 
            @page="getRangeOfPlan($event , 'page')" 
            @sort="getRangeOfPlan($event , 'sort')"
            paginator 
            :rows="20" 
            :totalRecords="datagrid2.totalRecords"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 60px;">
<template #body="slotProps">
  <Inventory_delete_button :params="slotProps" @delete="deleteFromAssetList" />
</template>
            </Column>
            <Column style="min-width: 60px;">
<template #body="slotProps">
  <!-- Add the custom component here -->
  <List_view_button :params="slotProps" />
</template>
            </Column>
            <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
          </DataTable>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import List_view_button from "@/components/Inventory_view_button";
  import Inventory_delete_button from "@/components/Inventory_delete_button";
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Navbar from "@/components/Navbar.vue";
  import {
    getEquipType,
    getEquipCategory,
    getArea,
    getLayer,
    getAccount,
    getProject,
    GetAntiForgeryToken
  } from '@/assets/js/common_api'
  import {
    goBack,
    canEnterPage,
    createDatagrid,
    UpdatePageParameter,
  } from "@/assets/js/common_fn";
  import {
    Inventory_Edit_Status
  } from '@/assets/js/enter_status'
  import {
    onMounted,
    ref,
    reactive,
watch,
  } from "vue";
  import { PlanType } from "@/assets/js/dropdown";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import axios from "axios";
  export default {
    components: {
      DataTable,
      Column,
      Navbar,
      List_view_button,
      Inventory_delete_button,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const details = ref('');
      const IP_ID = route.query.search_id;
      const ConvenerName = ref('');
      const DropdownArray = reactive({
        EquipType: [],
        EquipCategory: [],
        Area: [],
        Layer: [],
        InventoryStaff: [],
      });
      const searchParams = reactive({
        EquipTypeName: '',
        EquipType_Id: '',
        EquipCategoryName: '',
        Category_Id: '',
        AssetName: '',
        AreaName: '',
        Area_Id: '',
        LayerName: '',
        Layer_Id: '',
        ProjectCode:'',
      })
      const formParams = reactive({
        PlanId: '',
        PlanTitle: '',
        InventoryStaffName: '',
        ProjectName: '',
        ProjectCode: '',
        PlanStart: '',
        PlanEnd: '',
        PlanType: '',
        AssetList: [],
      })
      const EquipCategoryInit = ref('請先選擇設備總類');
      const LayerInit = ref('請先選擇區域');
      // 搜尋資產 datagrid
      const datagrid1 = createDatagrid()
      const datagrid1field = [{
          field: 'AssetStatus',
          header: '資產狀態',
          width: '150px',
        },
        {
          field: 'AssetsId',
          header: '資產編號',
          width: '150px',
        },
        {
          field: 'AssetName',
          header: '物品名稱',
          width: '150px',
        },
        {
          field: 'EquipTypeName',
          header: '設備總類',
          width: '150px',
        },
        {
          field: 'EquipCategoryName',
          header: '設備分類',
          width: '150px',
        },
        {
          field: 'AreaName',
          header: '儲位區域',
          width: '150px',
        },
        {
          field: 'LayerName',
          header: '儲位櫃位',
          width: '150px',
        },
      ];
      const unselectList = ref([]);
      // 盤點範圍項目 datagrid
      const datagrid2 = createDatagrid()
      const rowData1 = ref([]);
      const rowData2 = ref([]);
      onMounted(() => {
        datagrid2.rows = 20;
        getAccountName();
        getDetails();
      });
      watch(formParams, (newValue,oldValue)=>{
        if(newValue.PlanType !== '專案盤點') {
          formParams.ProjectCode = '';
          formParams.ProjectName = '';
          searchParams.ProjectCode = '';
        }
      });
      // 帶入資料
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetInventoryPlanInfo?id=${IP_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            // 檢查資料狀態是否可編輯
            canEnterPage(data.resultList.PlanStatus, Inventory_Edit_Status);
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            for (const key in details.value) {
              if (formParams.hasOwnProperty(key)) {
                formParams[key] = details.value[key]
              }
            }
            // formParams.AssetList = data.resultList.AssetList;
            getRangeOfPlan('', 'search');
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
      // 送出編輯計畫單
      async function submit() {
        // console.log(details.value);
        // 檢查必填項目
        if (!formParams.PlanTitle || !formParams.InventoryStaffName || !formParams.PlanStart || !formParams.PlanEnd || !formParams.PlanType || formParams.AssetList.length === 0) {
          alert('請填寫所有必填項目');
          return;
        }
        if (!/^.{1,20}$/.test(formParams.PlanTitle)) {
          alert('標題不可輸入超過20字');
          return
        }
        // 類型為"專案盤點" => 額外檢查 專案代碼
        if( formParams.PlanType === '專案盤點' ) {
          if(!formParams.ProjectCode) {
            alert('請填寫所有必填項目');
            return
          } else if (!/^[\s\S]{0,10}$/.test(formParams.ProjectCode)) {
            alert('專案代碼不可輸入超過10字');
            return
          }
        }
        // 送出
        const axios = require('axios');
        let requestData = {};
        for (const keyname in formParams) {
          requestData[keyname] = formParams[keyname]
        }
        if(formParams.PlanType !== '專案盤點') {
          delete requestData.ProjectCode;
          delete requestData.ProjectName;
        }
        console.log('requestData:', requestData);
        try {
          const token = await GetAntiForgeryToken();
          const response = await axios.post('http://192.168.0.177:7008/StocktakingMng/EditPlan', requestData,{
            headers:{
              'RequestVerificationToken': token,
            }
          });
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages;
            msg += '\n單號:' + data.resultList.IP_Id;
            alert(msg);
            router.push({
              name: 'Inventory_Datagrid'
            });
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
      // 搜尋function
      async function searchInventory(event, type) {
        // 檢查物品名稱字數
        if (!/^.{0,20}$/.test(searchParams.AssetName)) {
          alert('物品名稱不可輸入超過20字')
          return
        }
        if (!/^.{0,10}$/.test(searchParams.ProjectCode)) {
          alert('專案代碼不可輸入超過10字')
          return
        }
        datagrid1.loading = true;
        const form = new FormData();
        // 將搜尋參數加入form
        for (const key in searchParams) {
          if (searchParams[key]) {
            form.append(key, searchParams[key])
          }
        }
        // 將已有的項目AssetsId加入form (給後端做篩選)
        if (formParams.AssetList.length !== 0) {
          for (const item of formParams.AssetList) {
            form.append('AssetList', item)
          }
        }
        UpdatePageParameter(datagrid1, event, type, form)
        const axios = require('axios');
        try {
          const token = await GetAntiForgeryToken();
          const response = await axios.post('http://192.168.0.177:7008/StocktakingMng/SearchInventory', form,{
            headers:{
              'RequestVerificationToken': token,
            }
          });
          const data = response.data;
          if (data.state === 'success') {
            console.log('搜尋結果', data.resultList);
            rowData1.value = data.resultList.rows
            datagrid1.totalRecords = data.resultList.total
            if (datagrid1.selectAll) {
              datagrid1.selectedList = rowData1.value
              // 然後unselect 排除List的項目
              datagrid1.selectedList = datagrid1.selectedList.filter(item => !unselectList.value.includes(item.AssetsId));
            }
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error(error);
        } finally {
          datagrid1.loading = false;
        }
        
      }
      // 取得盤點範圍datagrid
      async function getRangeOfPlan(event, type) {
        datagrid2.loading = true;
        const form = new FormData();
        // 將已有的項目AssetsId加入form
        if (formParams.AssetList.length !== 0) {
          for (const item of formParams.AssetList) {
            form.append('AssetList', item)
          }
        }
        UpdatePageParameter(datagrid2, event, type, form)
          const token = await GetAntiForgeryToken();
        axios.post('http://192.168.0.177:7008/StocktakingMng/RangeOfPlan', form,{
          headers:{
            'RequestVerificationToken': token,
          }
        })
          .then((response) => {
            const data = response.data
            if (data.state === 'success') {
              console.log('盤點範圍:', data.resultList.rows);
              datagrid2.totalRecords = data.resultList.total
              rowData2.value = data.resultList.rows
            } else {
              // state為error
              alert(data.messages);
            }
          })
          .catch((error) => {
            console.error(error);
          })
        datagrid2.loading = false;
      }
      // 取得盤點人員DropdownArray
      async function getAccountName() {
        getAccount('')
          .then((data) => {
            DropdownArray.InventoryStaff = data;
          })
          .catch((error) => {
            console.error(error);
          })
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
      // 專案代碼查詢
      async function getProjectName() {
        getProject(formParams.ProjectCode)
          .then((data) => {
            formParams.ProjectName = data;
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
      const selectStaff = (item) => {
        formParams.InventoryStaffName = item;
      }
      const clear = () => {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        EquipCategoryInit.value = '請先選擇設備總類'
        LayerInit.value = '請先選擇區域'
        searchInventory('','search')
      }
      async function addList() {
        if (datagrid1.selectAll) {
          const form = new FormData();
          for (const key in searchParams) {
            form.append(key, searchParams[key]);
          }
          // 排除已有細項
          if (formParams.AssetList.length !== 0) {
            for (const item of formParams.AssetList) {
              form.append('AssetList', item)
            }
          }
          const token = await GetAntiForgeryToken();
          axios.post('http://192.168.0.177:7008/StocktakingMng/SelectAllGrid', form,{
            headers:{
              'RequestVerificationToken': token,
            }
          })
            .then((response) => {
              const data = response.data
              if (data.state === 'success') {
                // 將符合情況的AssetsId List放入formParams.AssetList
                console.log('allgrid:', data.resultList);
                data.resultList.forEach(id => {
                  formParams.AssetList.push(id);
                });
                // 全選情況下，扣掉排除List
                formParams.AssetList = formParams.AssetList.filter(id => !unselectList.value.includes(id));
                getRangeOfPlan('', 'search');
                // 清空排除List、selectedList
                datagrid1.selectAll = false;
                datagrid1.selectedList = [];
                unselectList.value = [];
              }
            })
            .catch((error) => {
              console.error(error);
            })
        } else {
          // 非全選情況下，加入selectedList
          datagrid1.selectedList.forEach(item => {
            formParams.AssetList.push(item.AssetsId);
            rowData2.value.push(item);
          })
          // 加入後清空selectedList
          datagrid1.selectedList = [];
          getRangeOfPlan('', 'search');
        }
        // 取得切頁的formParams.AssetList
      }
      function deleteFromAssetList(data) {
        rowData2.value = rowData2.value.filter(item => item.AssetsId !== data.AssetsId);
        formParams.AssetList = formParams.AssetList.filter(AssetsId => AssetsId !== data.AssetsId);
        if (formParams.AssetList.length !== 0) {
          getRangeOfPlan('', 'search');
        }
      }
      function onSelectAll(event) {
        datagrid1.selectAll = event.checked;
        if (datagrid1.selectAll) {
          // 全選的情況selectedList僅用來顯示
          datagrid1.selectedList = rowData1.value
        } else {
          // 清空selectedList與排除List
          datagrid1.selectedList = [];
          unselectList.value = [];
        }
      }
      function onRowUnselect(event) {
        if (datagrid1.selectAll) {
          // console.log('unselect:', event.data.AssetsId);
          //加入排除List
          unselectList.value.push(event.data.AssetsId);
        }
      }
      return {
        details,
        formParams,
        ConvenerName,
        DropdownArray,
        EquipCategoryInit,
        LayerInit,
        searchParams,
        datagrid1,
        datagrid1field,
        unselectList,
        datagrid2,
        rowData1,
        rowData2,
        PlanType,
        submit,
        searchInventory,
        getRangeOfPlan,
        getEquipTypeName,
        getAreaName,
        getProjectName,
        selectType,
        selectCategory,
        selectArea,
        selectLayer,
        selectStaff,
        clear,
        addList,
        deleteFromAssetList,
        onSelectAll,
        onRowUnselect,
        goBack,
      };
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  span {
    @include red_star
  }
  .no_content_text {
    padding: 5px 0;
    text-align: center;
    font-weight: 700;
  }
  .modal-body {
    padding: 0 !important;
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      input {
        @include dropdown_btn;
        height: 35px;
      }
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 80px;
        margin-bottom: 40px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        width: 800px;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .fixed_title {
          @include fixed_title;
        }
        .add_btn {
          display: inline-flex;
          padding: 10px 25px;
          justify-content: center;
          align-items: center;
          border-radius: 9px;
          background: #314F7A;
          height: 50px;
          width: 174px;
          color: #FFF;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          border: none;
          margin-bottom: 20px;
          &:hover {
            background-color: #456ca7
          }
        }
        .content {
          @include content_bg;
          p {
            text-align: center;
            white-space: nowrap;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
          }
          .dropdown {
            width: 55%;
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
              }
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
            justify-content: right;
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 162px;
              text-align: end;
            }
          }
          .check_section {
            gap: 10px;
            .form-check {
              gap: 5px;
              padding: 0;
              input {
                width: 15px;
                padding: 0;
                height: 15px;
                border-radius: 50%;
              }
              label {
                color: white;
                font-weight: 600;
              }
            }
          }
          .date-selector {
            width: 200px;
            input {
              width: 100%
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
          button.send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
        .dropdown {
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
              padding-top: 5px;
              text-align: left;
              font-size: 18px;
              color: black;
              font-weight: normal;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .info_wrap:nth-child(3) {
        margin-top: 3%;
      }
      .row:nth-child(3) {
        .input-group {
          justify-content: flex-start;
        }
      }
    }
    .modal {
      .dropdown-toggle {
        width: 100%
      }
      padding: 0 5%;
      .modal-content {
        background: unset;
        border: 0;
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-bottom: unset !important;
        border-radius: 0 !important;
        border: 1px solid black;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 20px;
          margin-bottom: 0 !important
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          align-self: start;
        }
      }
      .list {
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }
      .second_content {
        border-left: 1px solid black;
        border-right: 1px solid black;
        background: #D9D9D9;
        padding: 20px;
        p.content {
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          background: white;
          height: 35px;
          border-radius: 5px;
        }
        .submit_btn {
          margin-top: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 80px;
          font-size: 20px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1 {
          display: flex;
          justify-content: space-evenly;
          padding: 10px 80px;
          .input-number {
            @include count_btn;
          }
          .number-input-box {
            color: black;
            .input-number {
              width: 100%;
            }
          }
          .form-label {
            white-space: nowrap;
            font-weight: 800;
            font-size: 18px;
          } // .dropdown {
          //   button {
          //     background: white;
          //     width: 100%;
          //     border: none;
          //     display: flex;
          //     justify-content: space-between;
          //     align-items: center;
          //   }
          //   .dropdown-menu {
          //     width: 225px;
          //     .dropdown-item {
          //       text-align: left;
          //     }
          //   }
          // }
          div {
            padding: 0 5px;
            p {
              color: black;
              text-align: center;
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      input {
        @include dropdown_btn;
        height: 35px;
      }
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 80px;
        margin-bottom: 40px;
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
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .fixed_title {
          @include fixed_title;
        }
        .add_btn {
          display: inline-flex;
          padding: 10px 25px;
          justify-content: center;
          align-items: center;
          border-radius: 9px;
          background: #314F7A;
          height: 50px;
          width: 174px;
          color: #FFF;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          border: none;
          margin-bottom: 20px;
          &:hover {
            background-color: #456ca7
          }
        }
        .content {
          @include content_bg;
          .organizer_wrap {
            --bs-gutter-x: unset;
         
          }
          p {
            text-align: center;
            white-space: nowrap;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
          }
          .dropdown {
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
              }
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
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              width: 55%;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 170px;
              text-align: end;
            }
          }
          .check_section {
            gap: 10px;
            .form-check {
              gap: 5px;
              padding: 0;
              input {
                width: 15px;
                padding: 0;
                height: 15px;
                border-radius: 50%;
              }
              label {
                color: white;
                font-weight: 600;
              }
            }
          } // .date-selector{
          //   width:220px;
          //   input{
          //     width:100%
          //   }
          // }
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
          button.send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
        .dropdown {
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
              padding-top: 5px;
              text-align: left;
              font-size: 18px;
              color: black;
              font-weight: normal;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .info_wrap:nth-child(3) {
        margin-top: 3%;
      }
    }
    .modal {
      .dropdown-toggle {
        width: 100%
      }
      padding: 0 5%;
      padding-left: 5% !important;
      .modal-content {
        background: unset;
        border: 0;
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-radius: 0 !important;
        border: 1px solid black;
        border-bottom: unset !important;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 20px;
          margin-bottom: 0 !important;
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          align-self: start;
        }
      }
      .list {
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }
      .second_content {
        border-left: 1px solid black;
        border-right: 1px solid black;
        background: #D9D9D9;
        padding: 20px;
        p.content {
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          background: white;
          height: 35px;
          border-radius: 5px;
        }
        .submit_btn {
          margin-top: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 80px;
          font-size: 20px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1 {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px 5px;
          .input-number {
            @include count_btn;
          }
          .number-input-box {
            color: black;
            .input-number {
              width: 100%;
            }
          }
          .form-label {
            white-space: nowrap;
            font-weight: 800;
            font-size: 18px;
          } // .dropdown {
          //   button {
          //     background: white;
          //     width: 100%;
          //     border: none;
          //     display: flex;
          //     justify-content: space-between;
          //     align-items: center;
          //   }
          //   .dropdown-menu {
          //     width: 225px;
          //     .dropdown-item {
          //       text-align: left;
          //     }
          //   }
          // }
          div {
            padding: 0 5px;
            p {
              color: black;
              text-align: center;
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      input {
        @include dropdown_btn;
        height: 35px;
        width: 100%
      }
      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: 0 !important;
        border-radius: 5px;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
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
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .add_btn {
          display: inline-flex;
          padding: 10px;
          justify-content: center;
          align-items: center;
          border-radius: 9px;
          background: #314F7A;
          height: 50px;
          width: 150px;
          color: #FFF;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          border: none;
          margin-bottom: 15px;
          &:hover {
            background-color: #456ca7
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
              width: 100%;
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
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 20%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            padding: 5px;
            &:hover {
              background-color: #5d85bb;
            }
          }
          button.send_btn {
            @include search_and_send_btn;
            padding: 5px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .info_wrap:nth-child(3) {
        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset !important;
          border-radius: 5px;
        }
        margin-top: 3%;
        .count {
          .number-input-box {
            width: 100%;
            margin-left: unset !important;
          }
          .btn_section {
            margin-left: 10px;
            .delete_btn {
              display: flex;
              align-items: center;
              @include delete_button;
              height: 100%;
              padding: 5px;
              width: 80px;
              font-size: 18px;
              &:hover {
                background: #FF7272
              }
            }
          }
        }
      }
    }
    .modal {
      padding: 0 5%;
      padding-left: 5% !important;
      .modal-content {
        background-color: unset;
        border: 0;
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-radius: 0 !important;
        border: 1px solid black;
        border-bottom: unset !important;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 18px;
          margin-bottom: 0 !important
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          position: absolute;
          right: 3%;
          top: 1%;
          padding: 0;
        }
      }
      .list {
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }
      .second_content {
        border-left: 1px solid black;
        border-right: 1px solid black;
        background: #D9D9D9;
        padding: 20px;
        .submit_btn {
          margin-top: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 80px;
          font-size: 20px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1 {
          p.content {
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            background: white;
            height: 35px;
            border-radius: 5px;
          }
          .input-number {
            @include count_btn;
          }
          .number-input-box {
            color: black;
            .input-number {
              width: 100%;
            }
          }
          .form-label {
            white-space: nowrap;
            font-weight: 800;
            font-size: 18px;
          }
          .dropdown {
            button {
              background: white;
              width: 100%;
              border: none;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .dropdown-menu {
              width: 100%;
              .dropdown-item {
                text-align: left;
              }
            }
          }
          div {
            margin: 0 0 10px;
            p {
              padding: 5px 5px 0;
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
    .check_section {
      gap: 10px;
      .form-check {
        gap: 5px;
        padding: 0;
        input {
          width: 15px;
          padding: 0;
          height: 15px;
          border-radius: 50%;
        }
        label {
          color: white;
          font-weight: 600;
        }
      }
    }
  }
</style>