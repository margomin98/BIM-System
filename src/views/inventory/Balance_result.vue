<template>
  <Navbar @username="getUserName" />
  <div class="main_section">
    <div class="title col">
      <h1>盤點結果</h1>
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
            <input type="text" class="form-control readonly_box" v-model="details.PlanId" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">標題：</div>
            <input type="text" class="form-control readonly_box" v-model="details.PlanTitle" readonly/>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點人員：</div>
              <input type="text" class="form-control readonly_box" v-model="details.InventoryStaffName" readonly/>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點召集人：</div>
              <input type="text" class="form-control readonly_box" v-model="details.ConvenerName" readonly />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點開始日期：</div>
              <input type="text" class="form-control readonly_box" v-model="details.PlanStart" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點結束日期：</div>
              <input type="text" class="form-control readonly_box" v-model="details.PlanEnd" readonly />
            </div>
          </div>
        </div>
        <!-- 專案代碼 -->
        <div v-show="details.PlanType === '專案盤點'" class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">專案代碼 :</div>
            <input type="text" class="form-control readonly_box" v-model="details.ProjectCode" readonly>
          </div>
        </div>
        <!-- 專案名稱 -->
        <div v-show="details.PlanType === '專案盤點'" class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">專案名稱 :</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="details.ProjectName" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend">盤點類型：</div>
            <div class="check_section">
              <template v-for="(item , index) in PlanType" :key="item">
                  <div class="form-check d-flex align-items-center">
                    <input type="radio" :id="`no${index}`" name="radio" :value="item" v-model="details.PlanType" :disabled="details.PlanType !== item" />
                    <label :for="`no${index}`">{{ item }}</label>
                  </div>
</template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>盤點結果</p>
        </div>
      </div>
      <div class="content d-flex">
        <div>
          <p>應盤內容 ： {{details.ReceivableCount}}項</p>
        </div>
        <div>
          <p>合格項目 ： {{details.PassCount}}項</p>
        </div>
        <div>
          <p>差異項目 ： {{details.DiscrepancyCount}}項</p>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>差異細項</p>
        </div>
      </div>
      <div class="content">
        <div v-if="!rowData1">
          <h2 class="no_content_text">無差異細項</h2>
        </div>
        <div v-else style="width: 100%" class="mb-3">
          <DataTable 
            :size="'small'"
            :value="rowData1" 
            resizableColumns 
            columnResizeMode="expand"
            showGridlines 
            scrollable 
            scrollHeight="820px" 
            paginator 
            :rows="20"
            sort-field="NotBalanced"
            sort-order="-1"
            @page="updatePage($event)"
            :row-style="({ NotBalanced }) => NotBalanced ? 'background-color: #FFE1E1;': null "
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 50px;" header="項目">
<template #body="slotProps">
   {{ calculateIndex(1,slotProps) }}
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
        <div class="d-flex justify-content-center">
          <print-btn :datagrid="rowData1" :title="{pj_code:details.ProjectCode||'', pj_name: details.ProjectName || '', person: userName || ''}"></print-btn>
        </div>
      </div>
    </div>
    <div class="info_wrap col mt-5">
      <div class="fixed_info">
        <div>
          <p>盤點範圍</p>
        </div>
      </div>
      <div class="content">
        <div class="search_wrap col">
          <div class="content">
            <div class="wrap row">
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
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
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
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
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p>資產編號</p>
                <input type="text" class="form-control text-center" placeholder="" v-model="searchParams.AssetsId" />
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p>物品名稱</p>
                <input type="text" class="form-control text-center" placeholder="最多輸入20字" v-model="searchParams.AssetName" />
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
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
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
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
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-12 button">
              <button class="search_btn" @click="getDatagrid('','search')">搜索</button>
              <button class="empty_btn" @click="clear">清空</button>
            </div>
          </div>
        </div>
        <div style="width: 100%">
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
            scrollHeight="490px" 
            @page="getDatagrid($event , 'page')" 
            @sort="getDatagrid($event , 'sort')"
            paginator 
            :rows="datagrid2.rows" 
            :totalRecords="datagrid2.totalRecords"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            :rowsPerPageOptions="[10, 20, 30]"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 50px;" header="項目">
<template #body="slotProps">
   {{ calculateIndex(2,slotProps) }}
</template>
            </Column>
            <Column style="min-width: 60px;">
<template #body="slotProps">
  <List_view_button :params="slotProps" />
</template>
            </Column>
            <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
          </DataTable>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Navbar from "@/components/Navbar.vue";
  import List_view_button from "@/components/Inventory_view_button.vue"
  import PrintBtn from "@/components/Print_button.vue"
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import {
    getEquipType,
    getEquipCategory,
    getArea,
    getLayer
  } from '@/assets/js/common_api'
  import {
    goBack,
    canEnterPage,
    createDatagrid,
    UpdatePageParameter,
  } from "@/assets/js/common_fn";
  import {
    Inventory_BalanceResult_Status
  } from '@/assets/js/enter_status';
  import {
    PlanType
  } from '@/assets/js/dropdown';
  import axios from 'axios';
  const route = useRoute();
  const router = useRouter();
  const IP_ID = route.query.search_id;
  const details = ref('');
  const userName = ref('');
  const DropdownArray = reactive({
    EquipType: [],
    EquipCategory: [],
    Area: [],
    Layer: [],
  });
  const EquipCategoryInit = ref('請先選擇設備總類');
  const LayerInit = ref('請先選擇區域');
  const searchParams = reactive({
    EquipTypeName: '',
    EquipType_Id: '',
    EquipCategoryName: '',
    Category_Id: '',
    AssetsId: '',
    AssetName: '',
    AreaName: '',
    Area_Id: '',
    LayerName: '',
    Layer_Id: '',
  });
  const datagrid1 = createDatagrid()
  const datagrid2 = createDatagrid()
  const datagrid1field = [
    {
      field: 'AssetsId',
      header: '資產編號',
      width: '150px',
    },
    {
      field: 'RecognizePerson',
      header: '認列人員',
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
      field: 'AssetName',
      header: '物品名稱',
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
    {
      field: 'ReceivableNum',
      header: '應盤',
      width: '80px',
    },
    {
      field: 'ActualNum',
      header: '實盤',
      width: '80px',
    },
    {
      field: 'Discrepancy',
      header: '差異',
      width: '80px',
    },
    {
      field: 'Unit',
      header: '單位',
      width: '80px',
    },
  ];
  const rowData1 = ref([]);
  const rowData2 = ref([]);
  onMounted(() => {
    datagrid1.rows = 20
    datagrid1.sortField = 'RecognizePerson'
    getDetails();
    getDatagrid('','search');
  });
  async function submit() {
    const rows = grid.value.getSelectedRows();
    console.log(rows);
  }
  async function force() {}
  // 上半部資料 + 差異細項Datagrid
  async function getDetails() {
    const axios = require('axios');
    try {
      const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetInventoryResult?id=${IP_ID}`);
      const data = response.data;
      if (data.state === 'success') {
        // 檢查資料狀態是否可編輯
        canEnterPage(data.resultList.PlanStatus, Inventory_BalanceResult_Status);
        console.log('上半部資料如下\n', data.resultList);
        details.value = data.resultList;
        rowData1.value = data.resultList.AssetList
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
  // 下半部盤點範圍Datagrid
  async function getDatagrid(event , type) {
    searchParams.AssetName = searchParams.AssetName.trim();
    if (searchParams.AssetName && !/^[\s\S]{0,20}$/.test(searchParams.AssetName)) {
      alert('物品名稱不可輸入超過20字')
      return
    }
    const form = new FormData();
    form.append('PlanId', IP_ID)
    for (const key in searchParams) {
      if (searchParams[key]) {
        form.append(key, searchParams[key]);
      }
    }
    UpdatePageParameter(datagrid2,event,type,form)
    try {
      const response = await axios.post('http://192.168.0.177:7008/StocktakingMng/InventoryResult', form);
      const data = response.data;
      if (data.state === 'success') {
        console.log('下半部datagrid\n', data.resultList);
        rowData2.value = data.resultList.rows;
        datagrid2.totalRecords = data.resultList.total;
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
  function updatePage(event) {
    // console.log('event',event);
    datagrid1.first = event.first
  }
  function clear() {
    for (const key in searchParams) {
      searchParams[key] = '';
    }
    EquipCategoryInit.value = '請先選擇設備總類'
    LayerInit.value = '請先選擇區域'
    getDatagrid('','search');
  }
  function calculateIndex(number,slotProps) {
    switch (number) {
      case 1:
        return String(datagrid1.first +slotProps.index + 1).padStart(2, '0');
        break;
      case 2:
        return String(datagrid2.first + slotProps.index + 1).padStart(2, '0');
        break;
    }
  }
  const getUserName = (name) => {
    userName.value = name;
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
        padding: 0 20%;
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
        .content {
          @include content_bg;
          .row-test {
            background-color: red !important;
            color: red;
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
            display: flex;
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
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 25%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
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
            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
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
        .content {
          justify-content: space-around;
        }
      }
      .info_wrap:nth-child(4) {
        margin-top: 3%;
      }
      .info_wrap:nth-child(5) {
        .content {
          .search_wrap {
            margin-bottom: 20px;
            .title {
              display: flex;
              justify-content: space-around;
              background: #3D4E61;
              color: white;
              font-size: 25px;
              font-weight: 700;
              align-items: center;
              border-radius: 10px 10px 0px 0px;
              height: 50px;
            }
            .content {
              border-radius: 10px;
              background-color: #C3D3DA !important
            }
            .button {
              display: flex;
              justify-content: center;
              gap: 20px;
              margin: 20px auto 0;
              button.search_btn {
                @include search_and_send_btn;
                padding: 5px;
                &:hover {
                  background-color: #5e7aa2;
                }
              }
              button.empty_btn {
                @include empty_btn;
                padding: 5px;
                &:hover {
                  background-color: #244f86;
                }
              }
            }
            .search_section {
              padding: 0 80px;
              width: 100%;
              input {
                @include dropdown_btn;
                width: 100%;
                height: 35px;
              }
            }
          }
          .wrap {
            gap: 10px 0
          }
          p {
            color: black
          }
          .dropdown {
            width: 100%
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
        padding: 0 5%;
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
            display: flex;
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
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 25%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
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
            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
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
        .content {
          justify-content: space-around;
        }
      }
      .info_wrap:nth-child(4) {
        margin-top: 3%;
      }
      .info_wrap:nth-child(5) {
        .content {
          .search_wrap {
            margin-bottom: 20px;
            .title {
              display: flex;
              justify-content: space-around;
              background: #3D4E61;
              color: white;
              font-size: 25px;
              font-weight: 700;
              align-items: center;
              border-radius: 10px 10px 0px 0px;
              height: 50px;
            }
            .content {
              border-radius: 10px;
              background-color: #C3D3DA !important
            }
            .button {
              display: flex;
              justify-content: center;
              gap: 20px;
              margin: 20px auto 0;
              button.empty_btn {
                @include empty_btn;
                padding: 5px;
                &:hover {
                  background-color: #244f86;
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
            .search_section {
              padding: 0 80px;
              width: 100%;
              input {
                @include dropdown_btn;
                width: 100%;
                height: 35px;
              }
            }
          }
          .wrap {
            gap: 10px 0
          }
          p {
            color: black
          }
          .dropdown {
            width: 100%
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
          padding: 0 5%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            padding: 5px;
            width: 120px;
            &:hover {
              background-color: #5d85bb;
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
        .content {
          flex-direction: column;
          align-items: flex-start;
          p {
            text-align: center;
            white-space: nowrap;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
          }
        }
      }
      .info_wrap:nth-child(4) {
        margin-top: 3%;
      }
      .info_wrap:nth-child(5) {
        .content {
          .search_wrap {
            margin-bottom: 20px;
            .title {
              display: flex;
              justify-content: space-around;
              background: #3D4E61;
              color: white;
              font-size: 25px;
              font-weight: 700;
              align-items: center;
              border-radius: 10px 10px 0px 0px;
              height: 50px;
            }
            .content {
              border-radius: 10px;
              background-color: #C3D3DA !important
            }
            .button {
              display: flex;
              justify-content: center;
              gap: 20px;
              margin: 20px auto 0;
              button.empty_btn {
                @include empty_btn;
                padding: 5px;
                &:hover {
                  background-color: #244f86;
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
            .search_section {
              padding: 0 80px;
              width: 100%;
              input {
                @include dropdown_btn;
                width: 100%;
                height: 35px;
              }
            }
          }
          .wrap {
            gap: 10px 0
          }
          p {
            color: black;
            font-weight: 700;
            margin-bottom: 5px;
          }
          .dropdown {
            width: 100%
          }
        }
      }
    }
    .check_section {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 5px;
      margin-left: 0 !important;
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