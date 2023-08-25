<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產管理</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
      <div class="row">
      
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
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
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
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
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>資產編號</p>
          <input type="text" />
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>資產名稱</p>
          <input type="text" />
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>狀態</p>
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
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>區域</p>
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
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>櫃位</p>
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
        <div class="col-xl-2 col-lg-2 col-md-6 col-12  flex-col">
          <p>入庫日期(起)</p>
          <div class="date-selector">
            <div class="input-container">
              <input type="date" v-model="selectedDate" class="date-input" @focus="showDatePicker = true" @blur="showDatePicker = false" />
              <div class="date-picker" v-if="showDatePicker">
                <datepicker v-model="selectedDate"></datepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12 flex-col">
          <p>入庫日期(迄)</p>
          <div class="date-selector">
            <div class="input-container">
              <input type="date" v-model="selectedEndDate" class="date-input" @focus="showEndDatePicker = true" @blur="showEndDatePicker = false" />
              <div class="date-picker" v-if="showEndDatePicker">
                <datepicker v-model="selectedEndDate"></datepicker>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
        <button class="export_btn">匯出</button>
      </div>
    </div>
    <div style="width: 100%">
      <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;margin-bottom:50px" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :defaultColDef="defaultColDef" :paginationAutoPageSize="true" :pagination="true">
      </ag-grid-vue>
    </div>
  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Button from "@/components/Storage_return_button";
  import Navbar from "@/components/Navbar.vue";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Button
    },
 
    setup() {
      return {
        columnDefs: [{
            suppressMovable: true,
            field: "",
            cellRenderer: "Button",
            width: '150',
          },
          {
            headerName: "資產編號",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "物品名稱",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "設備總類",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "設備分類",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "區域",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '100',
            suppressMovable: true
          },
          {
            headerName: "櫃位",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '100',
            suppressMovable: true
          },
          {
            headerName: "狀態",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '110',
            suppressMovable: true
          },
          {
            headerName: "入庫日期",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150px',
            suppressMovable: true
          },
          {
            headerName: "入庫人員",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150px',
            suppressMovable: true
          }
        ],
        rowData: [
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
        selectedItem: "",
        selectedLocateItem: "",
        selectedAreaItem: "",
        selectedStartDate: null,
        selectedEndDate: null,
        showStartDatePicker: false,
        showEndDatePicker: false,
        total: 100,
        pageSize: 20,
        data: [],
        pagePosition: "bottom",
        pageOptions: [{
            value: "bottom",
            text: "Bottom",
          },
          {
            value: "top",
            text: "Top",
          },
          {
            value: "both",
            text: "Both",
          },
        ],
      };
    },
    created() {
      this.data = this.getData(this.total);
    },
    methods: {
      selectStatus(item) {
        this.selectedItem = item;
      },
      selectArea(item) {
        this.selectedAreaItem = item;
      },
      selectCabinet(item) {
        this.selectedLocateItem = item;
        this.showDatePicker = false;
      },
      // Clear other data properties if needed
      clear() {
        // Clear input fields
        const inputFields = document.querySelectorAll(
          '.datagrid_section input[type="text"]'
        );
        inputFields.forEach((input) => {
          input.value = "";
        });
        // Clear dropdowns
        this.selectedItem = "";
        this.selectedAreaItem = "";
        this.selectedLocateItem = "";
        // Clear selected date
        this.selectedDate = null;
        // Clear other data properties if needed
      },
      getData(total) {
        let data = [];
        for (let i = 1; i <= total; i++) {
          let amount = Math.floor(Math.random() * 1000);
          let price = Math.floor(Math.random() * 1000);
          data.push({
            inv: "Inv No " + i,
            name: "Name " + i,
            amount: amount,
            price: price,
            cost: amount * price,
            note: "Note " + i,
          });
        }
        return data;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
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
         .content{
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
          gap: 20px 50px;
          padding: 40px;
          // display: grid;
    // grid-template-rows: 1fr 1fr;
    // grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    // gap: 40px 5px;
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