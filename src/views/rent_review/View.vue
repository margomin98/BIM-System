<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產出庫審核作業</h1>
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
            <label for="inputTitle1" class="form-label use">
                                              <p>用&ensp;&ensp;&ensp;&ensp;途</p>
                                            </label>
            <div class="option">
              <div class='content'>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkbox1">
                  <label class="form-check-label" for="checkbox1">內部領用</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkbox2">
                  <label class="form-check-label" for="checkbox2">借測</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkbox3">
                  <label class="form-check-label" for="checkbox3">維修</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkbox1">
                  <label class="form-check-label" for="checkbox1">出貨</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkbox2">
                  <label class="form-check-label" for="checkbox2">報廢</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkbox3">
                  <label class="form-check-label" for="checkbox3">退貨</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
                                              <p>專案代碼</p>
                                            </label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box" id="inputWithButton" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
                                              <p>專案名稱</p>
                                            </label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box" id="inputWithTitle" readonly />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label">
                                              <p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p>
                                            </label>
            <textarea class="form-control readonly_box" id="inputTextarea" rows="1" readoonly></textarea>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>資產出庫項目</p>
        </div>
      </div>
      <div class="second_content">
        <ag-grid-vue style="height: 300px" class="ag-theme-alpine list" :columnDefs="columnDefs1" :rowData="rowData1" :defaultColDef="defaultColDef1" :paginationAutoPageSize="true">
        </ag-grid-vue>
      </div>
      <modal-overlay v-if="modalVisible" @close="closeModal" />
      <div class="fixed_info">
        <div>
          <p>資產出口細項</p>
        </div>
      </div>
      <div class="third_content">
        <ag-grid-vue style="height: 300px" class="ag-theme-alpine list" :columnDefs="columnDefs2" :rowData="rowData2" :defaultColDef="defaultColDef" :paginationAutoPageSize="true">
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
            <label for="inputWithButton" class="form-label">
                                              <p>備料人員</p>
                                            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>文字內容</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
                                              <p>備註</p>
                                            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>文字內容</p>
            </div>
          </div>
        </div>
      </div>
      <div class='five_content'>
        <div class="fixed_info">
          <div>
            <p>審核簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
                                              <p><span>*</span>審核人員</p>
                                            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>文字內容</p>
            </div>
            <button type="button">驗證</button>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
                                               <p><span>*</span>審核結果</p>
                                            </label>
            <div class="input-group">
              <input type="checkbox" />通過 <input type="checkbox" />不通過
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
                                              <p>審核日期</p>
                                            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>文字內容</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label">
                                              <p>審核意見</p>
                                            </label>
            <div class="input-group">
              <input type="text" class="form-control" id="inputWithButton" />
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
  import Storage_add from "@/components/Storage_add_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    ref
  } from "vue";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Storage_add
    },
    setup() {
      return {
        columnDefs1: [{
            headerName: "項目",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: "100",
            suppressMovable: true,
          },
          {
            headerName: "設備總類",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "設備分類",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "物品名稱",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: "140",
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
            headerName: "規格需求",
            field: "model",
            unSortIcon: true,
            sortable: true,
            flex: 1,
            suppressMovable: true,
          }
        ],
        rowData1: [{
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
        columnDefs2: [{
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
            width: "150",
            suppressMovable: true,
          },
          {
            headerName: "廠商",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: "250",
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
            width: "150",
            suppressMovable: true,
          }
        ],
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
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .option {
    @include readonly_box;
    height: 100%;
    width: 100%;
    align-items: center;
  }
  .input-group {
    height: 100%;
  }
  .readonly_box {
    @include readonly_box;
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
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
          border-right: 1px solid black;
          .fixed_info {
            border: none;
          }
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
            border-top: 1px solid black;
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
            padding: 0 10px;
            width: 115px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          #readonly_box {
            border-left: 1px solid black;
          }
          .wrap:nth-child(1) {
            border-right: 1px solid black;
          }
        }
        .five_content {
          border-left: 1px solid black;
          background: white;
          border-bottom: 1px solid black;
          span {
            @include red_star;
          }
          .fixed_info {
            border: none;
          }
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
            border-top: 1px solid black;
            align-items: center;
            button {
              margin: 0 10px;
              border-radius: 7px;
              height: 30px;
              width: 100px;
              border: none;
              background: #48658c;
              color: white;
              font-weight: 700;
              font-size: 18px;
              &:hover {
                background-color: #5d85bd;
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
            padding: 0 10px;
            width: 100px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          .wrap:nth-child(1) {
            #readonly_box {
              border-left: 1px solid black;
            }
            .input-group {
              border-right: 1px solid black;
            }
          }
          .wrap:nth-child(2) {
            border-left: 1px solid black;
            label {
              width: 100px;
            }
            .input-group {
              border-left: 1px solid black;
              border-right: 1px solid black;
              gap: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 700;
            }
          }
          .wrap:nth-child(3) {
            border-right: 1px solid black;
            #readonly_box {
              border-left: 1px solid black;
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
            border-radius: 0;
            border-left: 1px solid black;
          }
          .wrap {
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
    .main_section {
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
          border-right: 1px solid black;
          .fixed_info {
            border: none;
          }
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
            border-top: 1px solid black;
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
            padding: 0 10px;
            width: 115px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          #readonly_box {
            border-left: 1px solid black;
          }
          .wrap:nth-child(1) {
            border-right: 1px solid black;
          }
        }
        .five_content {
          border-left: 1px solid black;
          background: white;
          border-bottom: 1px solid black;
          span {
            @include red_star;
          }
          .fixed_info {
            border: none;
          }
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
            border-top: 1px solid black;
            align-items: center;
            button {
              white-space: nowrap;
              margin: 0 10px;
              border-radius: 7px;
              height: 30px;
              width: 100px;
              border: none;
              background: #48658c;
              color: white;
              font-weight: 700;
              font-size: 18px;
              &:hover {
                background-color: #5d85bd;
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
            padding: 0 10px;
            width: 100px;
            p {
              margin-bottom: 0;
              text-align: center;
            }
          }
          .wrap:nth-child(1) {
            #readonly_box {
              border-left: 1px solid black;
            }
            .input-group {
              border-right: 1px solid black;
            }
          }
          .wrap:nth-child(2) {
            border-left: 1px solid black;
            label {
              width: 100px;
            }
            .input-group {
              border-left: 1px solid black;
              border-right: 1px solid black;
              gap: 2px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 700;
            }
          }
          .wrap:nth-child(3) {
            border-right: 1px solid black;
            #readonly_box {
              border-left: 1px solid black;
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
            border-radius: 0;
            border-left: 1px solid black;
          }
          .wrap {
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
  @media only screen and (max-width: 767px) {
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
          border-bottom: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .fixed_info {
            border: none;
          }
          #readonly_box {
            border-left: 1px solid black;
          }
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
            border-top: 1px solid black;
            align-items: center;
            .option {
              display: flex;
            }
          }
          .form-label {
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            width: 190px;
            height: 30px;
            p {
              font-size: 18px;
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        .five_content {
          border-bottom: 1px solid black;
          border-left: 1px solid black;
          .fixed_info {
            border: none;
          }
          .form-check {
            margin-left: 10px;
          }
          .form-control {
            border-radius: 0;
          }
          #readonly_box {
            border-left: 1px solid black;
            background: #b4b4b4;
            font-weight: 700;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
          }
          .wrap {
            background: white;
            border-top: 1px solid black;
            align-items: center;
            button {
              margin: 0 10px;
              border-radius: 7px;
              height: 30px;
              width: 100px;
              border: none;
              background: #48658c;
              color: white;
              font-weight: 700;
              font-size: 18px;
              &:hover {
                background-color: #5d85bd;
              }
            }
          }
          .form-label {
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            height: 30px;
            p {
              font-size: 18px;
              margin-bottom: 0;
              text-align: center;
            }
          }
          .wrap:nth-child(3) {
            border-right: 1px solid black;
           
            label {
              width: 270px;
              
            }
          }
          .wrap:nth-child(1) {
            border-right: 1px solid black;
             #readonly_box{
               border-right: 1px solid black;
            }
            label {
              width:270px;
            }
            .input-group {
              border-left: 1px solid black;
            }
          }
          .wrap:nth-child(2) {
            border-right: 1px solid black;
            label {
              height: 40px;
              width:270px;
            }
            .input-group {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 5px;
              font-weight: 700;
              border-left: 1px solid black;
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
