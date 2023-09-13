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
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>標題：</div>
            <input type="text" class="form-control text-center" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="請輸入產編" />
          </div>
        </div>
        <div class="row organizer_wrap">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex"><span>*</span>盤點人員：</div>
              <div class="dropdown">
                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                       請選擇
                  </button>
                <div class="dropdown-menu">
                  <p>123</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點召集人：</div>
              <input type="text" class="form-control readonly_box organizer" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>盤點開始日期：</div>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" v-model="selectedDate" class="date-input" @focus="showDatePicker = true" @blur="showDatePicker = false" />
                  <div class="date-picker" v-if="showDatePicker">
                    <datepicker v-model="selectedDate"></datepicker>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>盤點結束日期：</div>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" v-model="selectedDate" class="date-input" @focus="showDatePicker = true" @blur="showDatePicker = false" />
                  <div class="date-picker" v-if="showDatePicker">
                    <datepicker v-model="selectedDate"></datepicker>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend"><span>*</span>盤點類型：</div>
            <div class="check_section d-flex">
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no1" name="radio" value="no1" />
                <label for="no1">指定盤</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no2" name="radio" value="no2" />
                <label for="no2">月盤</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no3" name="radio" value="no3" />
                <label for="no3">季盤</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no4" name="radio" value="no4" />
                <label for="no4">年盤</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="col">
        <button class="add_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">新增盤點項目</button>
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
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                       請選擇
                  </button>
                        <div class="dropdown-menu">
                          <p>123</p>
                        </div>
                      </div>
                    </div>
                    <div class='col'>
                      <p>設備分類</p>
                      <div class="dropdown">
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                       請選擇
                  </button>
                        <div class="dropdown-menu">
                          <p>123</p>
                        </div>
                      </div>
                    </div>
                    <div class='col'>
                      <p>物品名稱</p>
                      <input type="text" class="form-control text-center" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="(模糊搜索)" />
                    </div>
                    <div class='col'>
                      <p>儲位區域</p>
                      <div class="dropdown">
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                       請選擇
                  </button>
                        <div class="dropdown-menu">
                          <p>123</p>
                        </div>
                      </div>
                    </div>
                    <div class='col'>
                      <p>儲位櫃位</p>
                      <div class="dropdown">
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                       請選擇
                  </button>
                        <div class="dropdown-menu">
                          <p>123</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='col d-flex justify-content-center'>
                    <button class="btn submit_btn" type="button" @click="searchInventory">搜尋</button>
                  </div>
                </div>
              </div>
              <div class="fixed_info">
                <div>
                  <p>目前資產庫存</p>
                </div>
              </div>
              <ag-grid-vue style="height: 380px" class="ag-theme-alpine list" :rowHeight="rowHeight" :columnDefs="columnDefs" :rowData="rowData" :paginationAutoPageSize="true" @grid-ready="onGridReady">
              </ag-grid-vue>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed_info">
        <div>
          <p>盤點范圍</p>
        </div>
      </div>
      <div class="content">
        <div style="width: 100%">
          <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs1" :rowData="rowData1" :defaultColDef="defaultColDef" :paginationAutoPageSize="true" :pagination="true"
            :alwaysShowHorizontalScroll="true">
          </ag-grid-vue>
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
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Inventory_delete_button from "@/components/Inventory_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
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
      Inventory_delete_button
    },
    setup() {
      return {
        columnDefs: [{
            headerCheckboxSelection: true, //可以全選
            cellClass: 'grid_checkbox',
            checkboxSelection: true,
            headerName: "",
            field: "",
            unSortIcon: true,
            width: '50',
            suppressMovable: true
          },
          {
            headerName: "資產編號",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '140',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "設備總類",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '140',
            suppressMovable: true
          },
          {
            headerName: "設備分類",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: '140',
            suppressMovable: true
          },
          {
            headerName: "物品名稱",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "儲位區域",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "儲位櫃位",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "型號",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "數量",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '100',
            suppressMovable: true
          },
          {
            headerName: "單位",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '100',
            suppressMovable: true
          }
        ],
        rowData: [{
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000
          },
        ],
        columnDefs1: [{
            cellRenderer: "Inventory_delete_button",
            headerName: "",
            field: "",
            unSortIcon: true,
            width: '100',
            suppressMovable: true
          },
          {
            headerName: "項目",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '100',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "資產編號",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '140',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "設備總類",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '140',
            suppressMovable: true
          },
          {
            headerName: "設備分類",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: '140',
            suppressMovable: true
          },
          {
            headerName: "物品名稱",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "儲位區域",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "儲位櫃位",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          }
        ],
        rowData1: [{
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000
          },
        ],
      };
    },
    data() {
      return {
        rowHeight: 35,
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  span {
    @include red_star
  }
  .modal-dialog {
    width: 80% !important;
    max-width: unset
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
          .date-selector{
            width:200px;
            input{
              width:100%
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
          }
          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;
            p {
              padding-top: 5px;
              text-align: left;
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
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-radius: 0!important;
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
width:700px;
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
.organizer_wrap{
  --bs-gutter-x:unset;
.flex:nth-child(1){
  width:210px
}
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
          }
     
          // .date-selector{
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
              padding-top: 5px;
              text-align: left;
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
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-radius: 0!important;
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
          padding: 20px;
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
      .modal-content {
        background-color: unset;
        border: 0;
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-radius: 0!important;
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
          position: absolute;
          right: 3%;
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
            margin: 10px 0;
            p {
              padding: 5px;
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