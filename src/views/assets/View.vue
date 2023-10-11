<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>檢視資產</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_title">
        <div>
          <h4>資產資訊</h4>
        </div>
      </div>
      <div class="fixed_info">
        <div>
          <p>資產編號: {{ AssetsId }}</p>
        </div>
        <div>
          <p>物品名稱: {{ details.AssetName }}</p>
        </div>
        <div>
          <p>資產類型: {{ details.AssetType }}</p>
        </div>
      </div>
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
        <!-- 專案代碼 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">專案代碼：</div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.ProjectCode" />
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
            <input type="text" class="form-control readonly_box" v-model="details.ShipmentNum" readonly>
            <button class="form_search_btn" @click="viewReceive">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{name: 'Receive_View' , query:{ search_id : details.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 設備 總類&分類 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備總類：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.EquipTypeName" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備分類：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.EquipCategoryName" />
            </div>
          </div>
        </div>
        <!-- 廠商 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">廠商：</div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.VendorName" />
          </div>
        </div>
        <!-- 型號 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">型號：</div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.ProductType" />
          </div>
        </div>
        <!-- 規格 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">規格：</div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.ProductSpec" />
          </div>
        </div>
        <!-- S/N -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">S/N：</div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.SN" />
          </div>
        </div>
        <!-- 總庫存數量 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">總庫存數量：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.Number" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.Unit" />
            </div>
          </div>
        </div>
        <!-- 儲位 區域&櫃位 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位區域：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.AreaName" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位櫃位：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.LayerName" />
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
              <input type="text" class="form-control readonly_box" readonly v-model="details.WarrantyDate">
            </div>
          </div>
        </div>
        <!-- 保固 開始&結束 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固開始日：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.WarrantyStartDate" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固到期日：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.WarrantyEndDate" />
            </div>
          </div>
        </div>
        <!-- 保管人員 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                保管人員：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.Custodian">
            </div>
          </div>
        </div>
        <!-- 入庫 人員&日期 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫人員：</div>
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
            <textarea style="height: 150px;" class="form-control readonly_box" aria-label="With textarea" readonly v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
    </div>
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
            </swiper-slide>
          </swiper-container>
          <div class="swiper_pagination">
          </div>
        </div>
      </div>
    </div>
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
                  <input type="date" v-model="historyParams.StartDate" class="date-input" />
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-6">
              <p>作業日期(迄)</p>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" v-model="historyParams.EndDate" class="date-input" />
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-12">
              <p>作業行為</p>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ historyParams.Action || "請選擇" }}
                </button>
                <div class="dropdown-menu" aria-labelledby="statusDropdown">
                  <p v-for="(item , index) in ActionArray" :key="index" class="dropdown-item" @click="selectAction(item)">{{ item}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col button_wrap">
          <button class="search_btn" @click="searchHistory">檢索</button>
          <button class="empty_btn" @click="clear">清空</button>
        </div>
        <div class="info_wrap">
          <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;margin-bottom:50px" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :paginationAutoPageSize="true" :pagination="true">
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
  import Storage_list_view_button from "@/components/Storage_list_view_button";
  import { HistoryAction } from "@/assets/js/dropdown";
  import {
    register
  } from 'swiper/element/bundle';
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    ref,
    reactive
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import {
    Pagination
  } from 'swiper/modules';
  register();
  export default {
    components: {
      Navbar,
      AgGridVue,
      Storage_list_view_button,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AssetsId = route.query.search_id;
      // 上半部表單
      const details = ref({});
      // 中間照片
      const selectFiles = reactive({
        newFile: [],
        deleteFile: [],
        viewFile: [],
      })
      //  下半部歷史紀錄
      const historyParams = reactive({
        StartDate: '',
        EndDate: '',
        Action: '',
      });
      const ActionArray = HistoryAction;
      const columnDefs =[{
            suppressMovable: true,
            field: "",
            cellRenderer: "Storage_list_view_button",
            width: 100,
          },
          {
            headerName: "作業日期",
            field: "ExecutionDate",
            unSortIcon: true,
            sortable: true,
            width: 150,
            suppressMovable: true
          },
          {
            headerName: "作業行為",
            field: "Action",
            unSortIcon: true,
            sortable: true,
            width: 150,
            suppressMovable: true
          },
          {
            headerName: "單號",
            field: "FormID",
            unSortIcon: true,
            sortable: true,
            width: 300,
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "數量",
            field: "IH_Number",
            unSortIcon: true,
            sortable: true,
            width: 100,
            suppressMovable: true
          },
          {
            headerName: "單位",
            field: "IH_Unit",
            unSortIcon: true,
            sortable: true,
            width: 100,
            suppressMovable: true
          },
          {
            headerName: "申請人員",
            field: "ApplyPerson",
            unSortIcon: true,
            sortable: true,
            width: 150,
            suppressMovable: true
          },
          {
            headerName: "承辦人員",
            field: "ExecutionPerson",
            unSortIcon: true,
            sortable: true,
            width: 150,
            suppressMovable: true
          }
        ] ;
      const rowData = ref([]);
      onMounted(() => {
        getDetails();
        searchHistory();
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
              details.value.WarrantyStartDate = details.value.WarrantyStartDate.replace(/-/g, '/');
              details.value.WarrantyEndDate = details.value.WarrantyEndDate.replace(/-/g, '/');
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
      // 歷史紀錄部分function
      async function searchHistory() {
        const formData = new FormData();
        const formFields = {
          'AssetsId': AssetsId,
          'Action': historyParams.Action,
          'StartDate': historyParams.StartDate,
          'EndDate': historyParams.EndDate,
        };
        //將表格資料append到 formData
        for (const fieldName in formFields) {
          formData.append(fieldName, formFields[fieldName]);
        }
        const axios = require('axios');
        try {
          const response = await axios.post('http://192.168.0.177:7008/InventoryMng/AssetsHistory', formData);
          const data = response.data;
          if (data.state === 'success') {
            //取得datagrid成功
            // console.log(data.state);
            console.log('datagrid', data.resultList);
            rowData.value = data.resultList;
          } else if (data.state === 'error') {
            //取得datagrid失敗
            alert(data.messages);
          } else if (data.state === 'input_error') {
            //取得datagrid格式錯誤
            alert(data.messages);
          } else if (data.state === 'account_error') {
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
      const selectAction = item => {
        historyParams.Action = item;
      }
      function clear() {
        for (const key in historyParams) {
          historyParams[key] = '';
        }
        searchHistory();
      }
      // 檢視收貨單
      function viewReceive() {
        if(details.value.AR_ID) {
          const link = document.getElementById('view-receive');
          link.click();
        }
      }
      function goBack() {
        window.history.back();
      }
      return {
        AssetsId,
        details,
        selectFiles,
        historyParams,
        ActionArray,
        searchHistory,
        selectAction,
        clear,
        viewReceive,
        goBack,
        rowHeight: 35,
        pagination: {
          clickable: true,
        },
        modules: [Pagination],
        columnDefs,
        rowData,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .no_content_text{
    padding: 5px 0;
    text-align: center;
    font-weight: 700;
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      .swiper_section {
        swiper-slide {
          align-self: baseline;
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
        width: 800px;
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
        }
        .content:nth-child(1),
        .content:nth-child(2) {
          border-radius: 0px 10px 10px 10px
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
          button.search_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
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
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
        }
      }
      .form_search_btn {
        @include form_search_btn;
      }
      .readonly_box {
        @include readonly_box;
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
        padding: 0 5%;
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
        }
        .content:nth-child(1),
        .content:nth-child(2) {
          border-radius: 0px 10px 10px 10px
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
          button.search_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
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
        img {
          width: 100%;
          height: auto;
          padding: 40px;
        }
      }
      .form_search_btn {
        border: none;
        color: white;
        width: 60px;
        height: 35px;
        margin-top: 10px;
        font-weight: 700;
        padding: 0 10px;
        margin-left: unset !important;
        background-color: #132238;
        &:hover {
          background-color: #43546d;
        }
      }
      .readonly_box {
        @include readonly_box;
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
            padding: 10px;
            &:hover {
              background-color: #244f86;
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
