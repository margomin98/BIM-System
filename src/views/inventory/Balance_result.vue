<template>
  <Navbar />
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
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend">盤點類型：</div>
            <div class="check_section d-flex">
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no1" name="radio" value="指定盤" v-model="details.PlanType" :disabled="details.PlanType !== '指定盤'" />
                <label for="no1">指定盤</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no2" name="radio" value="月盤" v-model="details.PlanType" :disabled="details.PlanType !== '月盤'" />
                <label for="no2">月盤</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no3" name="radio" value="季盤" v-model="details.PlanType" :disabled="details.PlanType !== '季盤'" />
                <label for="no3">季盤</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no4" name="radio" value="年盤" v-model="details.PlanType" :disabled="details.PlanType !== '年盤'" />
                <label for="no4">年盤</label>
              </div>
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
        <div style="width: 100%">
          <ag-grid-vue style="width: 100%; height:810px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table1' class="ag-theme-alpine" :columnDefs="columnDefs1" :rowData="rowData1" :paginationPageSize="20" :pagination="true" :getRowStyle="rowClassRules"
            :suppressRowClickSelection="true" :rowSelection="'multiple'" :alwaysShowHorizontalScroll="true" @grid-ready="onGridReady">
          </ag-grid-vue>
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
                    <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item" @click="selectType(`${item}`)">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p>設備分類</p>
                <div class="dropdown">
                  <button style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap' class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(searchParams.EquipTypeName !== '') }">
                        {{ searchParams.EquipCategoryName || EquipCategoryInit }}
                      </button>
                  <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                    <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item" @click="selectCategory(`${item}`)">{{ item }}</p>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p>資產編號</p>
                <input type="text" class="form-control text-center" placeholder="" v-model="searchParams.AssetsId" />
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p>物品名稱</p>
                <input type="text" class="form-control text-center" placeholder="不可輸入超過20字" v-model="searchParams.AssetName" />
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p>儲位區域</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName">
                        {{ searchParams.AreaName || '請選擇' }}
                      </button>
                  <div class="dropdown-menu" aria-labelledby="areaDropdown">
                    <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item" @click="selectArea(`${item}`)">{{ item }}</p>
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
                    <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item" @click="selectLayer(`${item}`)">{{ item }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-12 button">
              <button class="search_btn" @click="getDatagrid">搜索</button>
              <button class="empty_btn" @click="clear">清空</button>
            </div>
          </div>
        </div>
        <div style="width: 100%">
          <ag-grid-vue style="width: 100%; height:470px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table2' class="ag-theme-alpine" :columnDefs="columnDefs2" :rowData="rowData2" :defaultColDef="defaultColDef2" :paginationAutoPageSize="true" :pagination="true"
            :alwaysShowHorizontalScroll="true">
          </ag-grid-vue>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  export default {
    components: {
      Navbar,
      AgGridVue,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const IP_ID = route.query.search_id;
      const details = ref('');
      const rowClassRules = (params) => {
        if (params.data.NotBalanced) {
          return {
            'background-color': '#E94B4B'
          }
        }
      };
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
        EquipCategoryName: '',
        AssetsId: '',
        AssetName: '',
        AreaName: '',
        LayerName: '',
      });
      const grid = ref(null);
      const columnDefs1 = [{
          headerName: "項目",
          valueGetter: function(params) {
            // 通过 params.node 获取当前行的 RowNode
            const rowNode = params.node;
            // 返回 RowNode 的 id 属性作为该列的值
            return parseFloat(rowNode.id) + 1;
          },
          width: 80,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "資產編號",
          field: "AssetsId",
          unSortIcon: true,
          sortable: true,
          width: 140,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "設備總類",
          field: "EquipTypeName",
          unSortIcon: true,
          sortable: true,
          width: 140,
          suppressMovable: true
        },
        {
          headerName: "設備分類",
          field: "EquipCategoryName",
          unSortIcon: true,
          sortable: true,
          width: 140,
          suppressMovable: true
        },
        {
          headerName: "物品名稱",
          field: "AssetName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "儲位區域",
          field: "AreaName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "儲位櫃位",
          field: "LayerName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "應盤",
          field: "ReceivableNum",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "實盤",
          field: "ActualNum",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "差異",
          field: "Discrepancy",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true
        },
        {
          headerName: "單位",
          field: "Unit",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true
        }, {
          headerName: "認列人員",
          field: "RecognizePerson",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        }
      ]
      const columnDefs2 = [{
          headerName: "",
          valueGetter: function(params) {
            // 通过 params.node 获取当前行的 RowNode
            const rowNode = params.node;
            // 返回 RowNode 的 id 属性作为该列的值
            return parseFloat(rowNode.id) + 1;
          },
          width: 50,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "資產編號",
          field: "AssetsId",
          unSortIcon: true,
          sortable: true,
          width: 140,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "設備總類",
          field: "EquipTypeName",
          unSortIcon: true,
          sortable: true,
          width: 140,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "設備分類",
          field: "EquipCategoryName",
          unSortIcon: true,
          sortable: true,
          width: 140,
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
          suppressMovable: true
        },
        {
          headerName: "儲位區域",
          field: "AreaName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "儲位櫃位",
          field: "LayerName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "應盤數量",
          field: "ReceivableNum",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "實盤數量",
          field: "ActualNum",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "差異",
          field: "Discrepancy",
          unSortIcon: true,
          sortable: true,
          width: 100,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "單位",
          field: "Unit",
          unSortIcon: true,
          sortable: true,
          width: 100,
          resizable: true,
          suppressMovable: true
        }, {
          headerName: "認列人員",
          field: "RecognizePerson",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        }
      ]
      const rowData1 = ref([]);
      const rowData2 = ref([]);
      onMounted(() => {
        getDetails();
        getDatagrid();
      });
      async function submit() {
        const rows = grid.value.getSelectedRows();
        console.log(rows);
      }
      async function force() {
      }
      // 上半部資料 + 差異細項Datagrid
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetInventoryResult?id=${IP_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            // 檢查資料狀態是否可編輯
            // if(data.resultList.Status !== '申請入庫' && data.resultList.Status !== '申請歸還' && data.resultList.Status !== '可交付') {
            //   window.history.back();
            //   // router.push({name: 'Store_Datagrid'});
            // }
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
      async function getDatagrid() {
        const form = new FormData();
        form.append('PlanId', IP_ID)
        for (const key in searchParams) {
          if (searchParams[key]) {
            form.append(key, searchParams[key]);
          }
        }
        const axios = require('axios');
        try {
          const response = await axios.post('http://192.168.0.177:7008/StocktakingMng/InventoryResult', form);
          const data = response.data;
          if (data.state === 'success') {
            console.log('下半部datagrid\n', data.resultList);
            rowData2.value = data.resultList;
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
      async function getAreaName() {
        if (DropdownArray.Area.length == 0) {
          const axios = require('axios');
          try {
            const response = await axios.get('http://192.168.0.177:7008/GetParameter/GetAreaName');
            console.log(response);
            const data = response.data;
            if (data.state === 'success') {
              console.log('Area Get成功 資料如下\n', data.resultList.AreaName);
              DropdownArray.Area = data.resultList.AreaName;
            } else if (data.state === 'error') {
              alert(data.messages);
            } else if (data.state === 'account_error') {
              alert(data.messages);
              router.push('/');
            }
          } catch (error) {
            console.error('Error sending applicant info request to backend');
          }
        }
      }
      async function getLayerName() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetParameter/GetLayerName?id=${searchParams.AreaName}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Layer Get成功 資料如下\n', data.resultList.LayerName);
            DropdownArray.Layer = data.resultList.LayerName;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend');
        }
      }
      async function getEquipTypeName() {
        if (DropdownArray.EquipType.length == 0) {
          const axios = require('axios');
          try {
            const response = await axios.get('http://192.168.0.177:7008/GetParameter/GetEquipType');
            console.log(response);
            const data = response.data;
            if (data.state === 'success') {
              console.log('總類Get成功 資料如下\n', data.resultList.EquipType);
              DropdownArray.EquipType = data.resultList.EquipType;
            } else if (data.state === 'error') {
              alert(data.messages);
            } else if (data.state === 'account_error') {
              alert(data.messages);
              router.push('/');
            }
          } catch (error) {
            console.error('Error sending applicant info request to backend', error);
          }
        }
      }
      async function getEquipCategoryName() {
        searchParams.EquipCategoryName = '';
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetParameter/GetEquipCategory?id=${searchParams.EquipTypeName}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('分類Get成功 資料如下\n', data.resultList.EquipCategory);
            DropdownArray.EquipCategory = data.resultList.EquipCategory;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend', error);
        }
      }
      function selectType(item) {
        searchParams.EquipTypeName = item;
        // console.log('選擇的總類:', EquipTypeName.value);
        getEquipCategoryName();
        EquipCategoryInit.value = '請選擇';
      }
      function selectCategory(item) {
        searchParams.EquipCategoryName = item;
      }
      const selectArea = (item) => {
        searchParams.AreaName = item;
        searchParams.LayerName = '';
        //API function here
        getLayerName();
        LayerInit.value = '請選擇';
      };
      const selectLayer = (item) => {
        searchParams.LayerName = item;
      };
      const onGridReady = (params) => {
        grid.value = params.api
      }
      function clear() {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        EquipCategoryInit.value = '請先選擇設備總類'
        LayerInit.value = '請先選擇區域'
        getDatagrid();
      }
      function goBack() {
        window.history.back();
      }
      return {
        details,
        rowClassRules,
        DropdownArray,
        EquipCategoryInit,
        LayerInit,
        searchParams,
        columnDefs1,
        columnDefs2,
        rowData1,
        rowData2,
        rowHeight: 35,
        submit,
        force,
        getDatagrid,
        getAreaName,
        getEquipTypeName,
        selectType,
        selectCategory,
        selectArea,
        selectLayer,
        onGridReady,
        clear,
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
    .modal {
      .modal-body {
        padding: 16px 16px 0;
      }
      .modal-content {
        width: 400px;
        margin: auto;
      }
      input {
        border: 1px solid lightgrey;
      }
      .input-group-prepend {
        width: auto;
      }
      .modal-footer {
        padding: 0 12px 12px;
        border: none;
      }
      .modal-header {
        h5 {
          font-weight: 700;
        }
        background: #3D4E61;
        color: white;
        padding:5px 10px;
        .close_icon {
          cursor: pointer;
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
    .modal {
      .modal-body {
        padding: 16px 16px 0;
      }
      .modal-content {
        width: 400px;
        margin: auto;
      }
      input {
        border: 1px solid lightgrey;
      }
      .input-group-prepend {
        width: auto;
      }
      .modal-footer {
        padding: 0 12px 12px;
        border: none;
      }
      .modal-header {
        h5 {
          font-weight: 700;
        }
        background: #3D4E61;
        color: white;
        padding:5px 10px;
        .close_icon {
          cursor: pointer;
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
          }
          .dropdown {
            width: 100%
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
    .modal {
      .modal-body {
        padding: 16px 16px 0;
      }
      .modal-content {
        width: 400px;
        margin: auto;
      }
      input {
        border: 1px solid lightgrey;
      }
      .input-group-prepend {
        width: auto;
      }
      .modal-footer {
        padding: 0 12px 12px;
        border: none;
      }
      .modal-header {
        h5 {
          font-weight: 700;
        }
        background: #3D4E61;
        color: white;
        padding:5px 10px;
        .close_icon {
          cursor: pointer;
        }
      }
    }
  }
</style>