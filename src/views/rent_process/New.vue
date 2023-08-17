<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產出庫備料作業</h1>
    </div>

    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>申請人員：陳奕迅</p>
        </div>
        <div>
          <p>申請日期：2022/02/20</p>
        </div>
        <div>
          <p>單號：121564564</p>
        </div>
      </div>
      <form>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label
              style="border-right: 1px solid black"
              for="inputTitle1"
              class="form-label"
            >
              <p>用&ensp;&ensp;&ensp;&ensp;途</p>
            </label>
            <div class="d-flex">
              <div class="form-check me-3">
                <input class="form-check-input" type="checkbox" value="" id="checkbox1" />
                <label class="form-check-label" for="checkbox1">內部領用</label>
              </div>
              <div class="form-check me-3">
                <input class="form-check-input" type="checkbox" value="" id="checkbox2" />
                <label class="form-check-label" for="checkbox2">借測</label>
              </div>
              <div class="form-check me-3">
                <input class="form-check-input" type="checkbox" value="" id="checkbox3" />
                <label class="form-check-label" for="checkbox3">維修</label>
              </div>
              <div class="form-check me-3">
                <input class="form-check-input" type="checkbox" value="" id="checkbox1" />
                <label class="form-check-label" for="checkbox1">出貨</label>
              </div>
              <div class="form-check me-3">
                <input class="form-check-input" type="checkbox" value="" id="checkbox2" />
                <label class="form-check-label" for="checkbox2">報廢</label>
              </div>
              <div class="form-check me-3">
                <input class="form-check-input" type="checkbox" value="" id="checkbox3" />
                <label class="form-check-label" for="checkbox3">退貨</label>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>專案代碼</p>
            </label>
            <div class="input-group">
              <input
                type="text"
                class="form-control readonly_box"
                id="inputWithButton"
                readonly
              />
            </div>
          </div>
          <div class="col d-flex wrap">
            <label
              for="inputWithTitle"
              class="form-label"
              style="border-left: 1px solid black"
            >
              <p>專案名稱</p>
            </label>
            <div class="input-group">
              <input
                type="text"
                class="form-control readonly_box"
                id="inputWithTitle"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label">
              <p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p>
            </label>
            <textarea
              class="form-control readonly_box"
              id="inputTextarea"
              rows="1"
              readoonly
            ></textarea>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>填寫項目</p>
        </div>
      </div>
      <div class="second_content">
        <ag-grid-vue
          style="height: 300px"
          class="ag-theme-alpine list"
          :columnDefs="columnDefs1"
          :rowData="rowData1"
          :defaultColDef="defaultColDef1"
          :paginationAutoPageSize="true"
        >
        </ag-grid-vue>
      </div>
      <div class="fixed_info">
        <div>
          <p>資產出口細項</p>
        </div>
      </div>
      <div class="third_content">
        <ag-grid-vue
          style="height: 300px"
          class="ag-theme-alpine list"
          :columnDefs="columnDefs2"
          :rowData="rowData2"
          :defaultColDef="defaultColDef"
          :paginationAutoPageSize="true"
        >
        </ag-grid-vue>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="empty_btn" @click="clear">清空</button>
      <button class="send_btn" @click="submit">送出</button>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import Storage_button from "@/components/Storage_button";
import Delete_button from "@/components/Delete_button";
import Navbar from "@/components/Navbar.vue";
import { onMounted, ref } from "vue";
export default {
  components: {
    Navbar,
    AgGridVue,
    Storage_button,
    Delete_button
  },
  setup() {
    return {
      columnDefs1: [
        {
          suppressMovable: true,
          field: "",
          cellRenderer: "Storage_button",
          width: "110",
        },
        {
          headerName: "需求項目",
          field: "make",
          unSortIcon: true,
          sortable: true,
          width: "150",
          suppressMovable: true,
        },
        {
          headerName: "資產編號",
          field: "model",
          unSortIcon: true,
          sortable: true,
          width: "150",
          suppressMovable: true,
        },
        {
          headerName: "資產名稱",
          field: "price",
          unSortIcon: true,
          sortable: true,
          width: "150",
          suppressMovable: true,
        },
        {
          headerName: "儲位區域",
          field: "make",
          unSortIcon: true,
          sortable: true,
          width: "140",
          suppressMovable: true,
        },
        {
          headerName: "儲位櫃位",
          field: "model",
          unSortIcon: true,
          sortable: true,
          width: "140",
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
          width: "160",
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
          width: "250",
          suppressMovable: true,
        },
      ],
      rowData1: [
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
      columnDefs2: [
        {
          suppressMovable: true,
          field: "",
          cellRenderer: "Delete_button",
          width: "100"
        },
        {
          headerName: "設備總類",
          field: "make",
          unSortIcon: true,
          sortable: true,
          width: "150",
          suppressMovable: true,
        },
        {
          headerName: "設備分類",
          field: "model",
          unSortIcon: true,
          sortable: true,
          width: "150",
          suppressMovable: true,
        },
        {
          headerName: "物品名稱",
          field: "price",
          unSortIcon: true,
          sortable: true,
          width: "150",
          suppressMovable: true,
        },
        {
          headerName: "數量",
          field: "make",
          unSortIcon: true,
          sortable: true,
          width: "150",
          suppressMovable: true,
        },
        {
          headerName: "規格需求",
          field: "model",
          unSortIcon: true,
          sortable: true,
          width: "250",
          suppressMovable: true,
        },
      ],
      rowData2: [
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
    };
  },
  data() {
    return {
      count: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
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
    padding: 1% 25% 0 !important;

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
      .delete {
        border-top: 0px solid #484143;
        border-right: 0px dashed #484143;
        border-bottom: 0px dashed #484143;
        border-left: 1px solid #484143;
        width: 70px;
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
        border-bottom: 0.5px solid black;
        align-items: center;
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
    .form-control {
      height: 50px !important;
      border-radius: 0;
    }
    padding: 1% 32% 0;
  }
  .button_wrap {
    @include bottom_btn_wrap;
    margin-bottom: 2%;
    padding: 0 42%;
    button {
      &:nth-child(1) {
        @include back_to_previous_btn;
        &:hover {
          background-color: #5d85bb;
        }
      }
      &:nth-child(2) {
        @include empty_btn;
        &:hover {
          background-color: #5e7aa2;
        }
      }
      &:nth-child(3) {
        @include search_and_send_btn;
        &:hover {
          background-color: #5d85bd;
        }
      }
    }
  }
  button.back_btn:hover {
    background-color: #5d85bb;
  }
  button.send_btn:hover {
    background-color: #5e7aa2;
  }
  button.empty_btn:hover {
    background-color: #5d85bd;
  }
}
</style>
