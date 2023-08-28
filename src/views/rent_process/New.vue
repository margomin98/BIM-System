<template>
  <Navbar />
  <!-- Modal視窗 -->
  <div class="modal fade" data-bs-backdrop="static" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
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
              <div class='col-xl-3 col-lg-3 col-md-3 col-12' style='padding-left:0'>
                <p>設備總類</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                  {{ selectedItem || "請選擇" }}
                                                                </button>
                  <div class="dropdown-menu" aria-labelledby="statusDropdown">
                    <p class="dropdown-item" @click="selectStatus('選項1')">選項1</p>
                    <p class="dropdown-item" @click="selectStatus('選項2')">選項2</p>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p>設備分類</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                  {{ selectedItem || "請選擇" }}
                                                                </button>
                  <div class="dropdown-menu" aria-labelledby="statusDropdown">
                    <p class="dropdown-item" @click="selectStatus('選項1')">選項1</p>
                    <p class="dropdown-item" @click="selectStatus('選項2')">選項2</p>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p>物品名稱</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                  {{ selectedItem || "請選擇" }}
                                                                </button>
                  <div class="dropdown-menu" aria-labelledby="statusDropdown">
                    <p class="dropdown-item" @click="selectStatus('選項1')">選項1</p>
                    <p class="dropdown-item" @click="selectStatus('選項2')">選項2</p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-12">
                <p>數量 <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"></p>
                <div class="number-input-box">
                  <input class="input-number readonly_box" readonly />
                </div>
              </div>
            </div>
            <div class="row g-0">
              <div class="col-12 d-flex wrap2">
                <label for="inputTextarea" class="form-label">
                                                          <p>
                                                          規格需求：
                                                          </p>
                                                          </label>
                <div>
                </div>
                <textarea class="form-control readonly_box" id="inputTextarea" rows="3" readonly></textarea>
              </div>
            </div>
            <div class='col d-flex justify-content-center'>
              <button class="btn submit_btn" type="button">搜尋庫存</button>
            </div>
          </div>
          <div class="fixed_info">
            <div>
              <p>目前資產庫存</p>
            </div>
          </div>
          <ag-grid-vue style="height: 380px" class="ag-theme-alpine list" :rowHeight="rowHeight" :columnDefs="columnDefs3" :rowData="rowData3" :defaultColDef="defaultColDef3" :paginationAutoPageSize="true">
          </ag-grid-vue>
        </div>
      </div>
    </div>
  </div>
  <div class="main_section">
    <div class="title col">
      <h1>出庫備料作業</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>單號：{{ details.AO_ID}}</p>
        </div>
        <div>
          <p>申請人員：{{ details.Applicant}}</p>
        </div>
        <div>
          <p>申請日期：{{ details.ApplicationDate}}</p>
        </div>
      </div>
      <form>
        <div class="row g-0">
          <div class="col d-flex wrap column_section">
            <label for="inputTitle1" class="form-label use"><p>用&ensp;&ensp;&ensp;&ensp;途</p></label>
            <div class="option">
              <div class='content'>
                <div class="form-check" v-for="(option, index) in options" :key="index">
                  <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)" v-model="details.Use" :disabled="option !== details.Use && details.Use !== ''">
                  <label class="form-check-label" :for="'radio' + (index + 1)">{{ option }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>專案代碼</p></label>
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly> {{  details.ProjectCode }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>專案名稱</p></label>
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly>{{ details.ProjectName}}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label"><p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p></label>
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly>{{ details.Description}}</p>
            </div>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>資產出庫項目</p>
        </div>
      </div>
      <div class="second_content">
        <ag-grid-vue style="height: 380px" class="ag-theme-alpine list" :rowHeight="rowHeight" :columnDefs="columnDefs1" :rowData="rowData1" :defaultColDef="defaultColDef1" :paginationAutoPageSize="true">
        </ag-grid-vue>
      </div>
      <modal-overlay v-if="modalVisible" @close="closeModal" />
      <div class="fixed_info">
        <div>
          <p>資產出庫細項</p>
        </div>
      </div>
      <div class="third_content">
        <ag-grid-vue style="height: 380px" class="ag-theme-alpine list" :rowHeight="rowHeight" :columnDefs="columnDefs2" :rowData="rowData2" :defaultColDef="defaultColDef" :paginationAutoPageSize="true">
        </ag-grid-vue>
      </div>
      <div class="fixed_info_count">
        <div>
          <p>總出庫數量：10個</p>
        </div>
        <div>
          <p>已備數量: 6個</p>
        </div>
      </div>
      <div class='fourth_content'>
        <div class="fixed_info">
          <div>
            <p>備料簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>備料人員</p></label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box" id="inputWithButton" readonly />
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備料完成日期</p></label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box" id="inputWithTitle" readonly />
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備料備註</p></label>
            <div class="input-group">
              <textarea placeholder="最多100字" class="form-control" id="inputTextarea" style="height:100%" rows="1"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="send_btn" @click="submit">送出</button>
    </div>
  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Storage_button from "@/components/Storage_button";
  import Storage_view from "@/components/Storage_list_view_button";
  import Storage_add from "@/components/Storage_add_button";
  import Delete_button from "@/components/Delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    ref
  } from "vue";
import { useRoute, useRouter } from "vue-router";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Storage_button,
      Delete_button,
      Storage_view,
      Storage_add
    },
    setup() {
      const rowData = ref([]);
      const route = useRoute();
      const router = useRouter();
      const AO_ID = route.query.search_id;
      const details = ref({});
      const options = ['內部領用', '借測', '維修', '出貨', '報廢', '退貨'];
      onMounted(()=>{
        getDetails();
      });
      const columnDefs1 = [{
          suppressMovable: true,
          field: "",
          cellRenderer: "Storage_button",
          width: 115,
          resizable: true,
        }, 
        {
          suppressMovable: true,
          headerName: "項目",
          field: "id",
          unSortIcon: true,
          sortable: true,
          width: 100,
          resizable: true,
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
          headerName: "物品名稱",
          field: "ProductName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true,
          resizable: true
        },
        {
          headerName: "數量",
          field: "Number",
          unSortIcon: true,
          sortable: true,
          width: 100,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "規格需求",
          field: "RequiredSpec",
          unSortIcon: true,
          sortable: true,
          flex: 1,
          suppressMovable: true,
          resizable: true
        }
      ]
      const columnDefs2 = [{
            suppressMovable: true,
            field: "",
            cellRenderer: "Delete_button",
            width: 100,
          },
          {
            headerName: "資產編號",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "物品名稱",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "儲位區域",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "儲位櫃位",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "廠商",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "型號",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "規格",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "數量",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "100",
            suppressMovable: true,
          },
          {
            headerName: "單位",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "100",
            suppressMovable: true,
          },
          {
            headerName: "備註",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "100",
            suppressMovable: true,
          },
      ]
      const columnDefs3 = [{
            suppressMovable: true,
            field: "",
            cellRenderer: "Storage_add",
            width: "75"
          },
          {
            headerName: "資產編號",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "物品名稱",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "儲位區域",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "儲位櫃位",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "廠商",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "型號",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "規格",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "數量",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "100",
            suppressMovable: true,
          },
          {
            headerName: "單位",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "100",
            suppressMovable: true,
          },
      ]
      const rowData1 = ref([]);
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.176:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            rowData1.value = data.resultList.ItemList;
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
      return {
        columnDefs1,
        columnDefs2,
        columnDefs3,
        rowData1,
        rowData2: [{
            make: "Toyota",
            model: "Celica",
            price: 35000,
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000,
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000,
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000,
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000,
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000,
          },
        ],
        rowData3: [{
            make: "Toyota",
            model: "Celica",
            price: 35000,
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000,
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000,
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000,
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000,
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000,
          },
        ],
        details,
        options,
      };
    },
    data() {
      return {
        count: 1,
        rowHeight: 35,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .readonly_box {
    @include readonly_box;
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  .input-group {
    height: 100%;
  }
  @media only screen and (min-width: 1200px) {
    .modal {
      padding: 0 5%;
      .modal-content {
        background-color: unset;
        border: 0;
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091;
        border-radius: 0;
        border: 1px solid black;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 20px;
          margin-bottom: 0;
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
        .submit_btn {
          margin-bottom: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 100px;
          font-size: 18px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1,
        .wrap2 {
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
              width: 225px;
              .dropdown-item {
                text-align: left;
              }
            }
          }
          div {
            padding: 0 5px;
            p {
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
    .main_section {
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
        width: 1000px;
        .input-group-prepend {
          width: 100% !important;
          text-align: center !important;
        }
        .fixed_info {
          @include fixed_info;
          background: #528091;
          border-radius: 0;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        #readonly_box {
          border-left: black 1px solid;
        }
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #d9d9d9;
        }
        .third_content {
          .list {
            border-top: 1px solid black;
            border-left: 1px solid black;
            border-right: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #ff7272;
              }
            }
          }
        }
        .fixed_info_count {
          display: flex;
          background: #3D5C67;
          color: white;
          font-weight: 700;
          align-items: center;
          height: 40px;
          border-radius: 0;
          border: 1px solid black;
          padding: 0 10px;
          justify-content: right;
          gap: 10px;
          p {
            font-size: 15px;
            margin-bottom: 0;
          }
        }
        .fourth_content {
          border-left: 1px solid black;
          border-bottom: 1px solid black;
          background: white;
          .fixed_info {
            border-top: none;
            border-left: none;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            border-right: 1px solid black;
            border-left: 1px solid black;
          }
          .form-label {
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            height: 50px;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            padding: 0 10px;
            width: 150px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            border-left: 1px solid black;
          }
          .wrap {
            border-bottom: 1px solid black;
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            label.use {
              border-right: 1px solid black;
            }
            .option {
              @include readonly_box;
              height: 100%;
              width: 100%;
              align-items: center;
              display: flex;
              .content {
                display: flex
              }
            }
            .project_name {
              border-left: 1px solid black
            }
          }
          .form-label {
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            height: 50px;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            padding: 0 30px;
            p {
              width: 100px;
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;
        }
        .input-number {
          @include count_btn;
        }
      }
      .button_wrap {
        display: flex;
        justify-content: space-between;
        margin: 30px auto 5%;
        width: 220px;
        button {
          &:nth-child(1) {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          &:nth-child(2) {
            @include search_and_send_btn;
            &:hover {
              background-color: #5D85BD;
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .modal {
      padding: 0 5%;
      .modal-content {
        background-color: unset;
        border: 0;
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091;
        border-radius: 0;
        border: 1px solid black;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 20px;
          margin-bottom: 0;
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
        .submit_btn {
          margin-bottom: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 100px;
          font-size: 18px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1,
        .wrap2 {
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
          }
          .dropdown {
            button {
              background: white;
              width: 150px;
              border: none;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .dropdown-menu {
              width: 150px;
              .dropdown-item {
                text-align: left;
              }
            }
          }
          div {
            padding: 0 5px;
            p {
              width: 150px;
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
    .main_section {
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
        .input-group-prepend {
          width: 100% !important;
          text-align: center !important;
        }
        .fixed_info {
          @include fixed_info;
          background: #528091;
          border-radius: 0;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        #readonly_box {
          border-left: 1px solid black;
        }
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #d9d9d9;
        }
        .third_content {
          .list {
            border: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #ff7272;
              }
            }
          }
        }
        .fixed_info_count {
          display: flex;
          background: #3D5C67;
          color: white;
          font-weight: 700;
          align-items: center;
          height: 40px;
          border-radius: 0;
          border: 1px solid black;
          padding: 0 10px;
          justify-content: right;
          gap: 10px;
          p {
            font-size: 15px;
            margin-bottom: 0;
          }
        }
        .fourth_content {
          border-left: 1px solid black;
          border-bottom: 1px solid black;
          background: white;
          .fixed_info {
            border-top: none;
            border-left: none;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            border-right: 1px solid black;
            border-left: 1px solid black;
          }
          .form-label {
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            height: 50px;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            padding: 0 10px;
            width: 150px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            border-left: 1px solid black;
          }
          .wrap {
            background: white;
            border-bottom: 1px solid black;
            align-items: center;
            label.use {
              border-right: 1px solid black
            }
            .option {
              @include readonly_box;
              height: 100%;
              width: 100%;
              align-items: center;
              display: flex;
              .content {
                display: flex
              }
            }
            .project_name {
              border-left: 1px solid black
            }
          }
          .form-label {
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            height: 50px;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            padding: 0 30px;
            p {
              width: 100px;
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;
        }
        .input-number {
          @include count_btn;
        }
      }
      .button_wrap {
        display: flex;
        justify-content: space-between;
        margin: 30px auto 5%;
        width: 220px;
        button {
          &:nth-child(1) {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          &:nth-child(2) {
            @include search_and_send_btn;
            &:hover {
              background-color: #5D85BD;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .modal {
      padding: 0 5%;
      .modal-content {
        background-color: unset;
        border: 0;
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091;
        border-radius: 0;
        border: 1px solid black;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 18px;
          margin-bottom: 0;
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
        .submit_btn {
          margin-bottom: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 100px;
          font-size: 18px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1 {
          justify-content: space-evenly;
          padding: 20px 20px 0;
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
              width: 225px;
              .dropdown-item {
                text-align: left;
              }
            }
          }
          div {
            margin: 10px 0;
            p {
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
            }
          }
        }
        .wrap2 {
          flex-direction: column;
          padding: 0 20px;
          margin-bottom: 20px;
          p {
            margin-bottom: 0;
          }
          .form-label {
            white-space: nowrap;
            font-weight: 800;
            font-size: 18px;
          }
        }
      }
    }
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        padding: 0 5%;
        .input-group-prepend {
          width: 100% !important;
          text-align: center !important;
        }
        .fixed_info {
          @include fixed_info;
          background: #528091;
          border-radius: 0;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          flex-direction: column;
          height: unset;
          padding: 10px;
          p {
            font-size: 18px;
            margin-bottom: 0;
          }
        }
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #d9d9d9;
        }
        .third_content {
          .list {
            border: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #ff7272;
              }
            }
          }
        }
        .fixed_info_count {
          display: flex;
          background: #3D5C67;
          color: white;
          font-weight: 700;
          align-items: center;
          height: 40px;
          border-radius: 0;
          border: 1px solid black;
          padding: 0 10px;
          justify-content: right;
          gap: 10px;
          p {
            font-size: 15px;
            margin-bottom: 0;
          }
        }
        .fourth_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          background: white;
          .fixed_info {
            border-bottom: 1px solid black;
            border-top: none;
            border-left: none;
            border-right: none;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
            border-bottom: 1px solid black;
            border-left: 1px solid black;
          }
          .form-label {
            border-bottom: 1px solid black;
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            width: 220px;
            height: 50px;
            p {
              font-size: 18px;
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .form-check {
            margin-left: 10px;
            font-size: 18px;
          }
          .form-control {
            height: auto;
            border-radius: 0;
          }
          .wrap {
            background: white;
            border-bottom: 1px solid black;
            align-items: center;
            flex-direction: column;
            label.use,
            .form-label {
              border-bottom: 1px solid black;
              width: 100%;
              height: 30px;
              justify-content: space-evenly;
            }
            .option {
              height: 100%;
              width: 100%;
              font-size: 18px;
              background: #B4B4B4;
              font-weight: 700;
              .content {
                padding: 5px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                gap: 0px 0px;
                grid-auto-flow: row;
                grid-template-areas: ". . ." ". . .";
                white-space: nowrap;
                justify-items: center;
                div {
                  width: 90px;
                }
              }
            }
          }
          .form-label {
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            height: 50px;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            padding: 0 30px;
            p {
              width: 100px;
              font-size: 18px;
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;
        }
        .input-number {
          @include count_btn;
        }
      }
      .button_wrap {
        display: flex;
        justify-content: space-between;
        margin: 30px auto 5%;
        width: 220px;
        button {
          &:nth-child(1) {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          &:nth-child(2) {
            @include search_and_send_btn;
            &:hover {
              background-color: #5D85BD;
            }
          }
        }
      }
    }
  }
</style>
