<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
      編輯資產出庫填報
      </h1>
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
          <p>單號：1458613</p>
        </div>
      </div>
      <form>
        <div class="row g-0">
          <div class="col d-flex wrap column_section">
            <label for="inputTitle1" class="form-label use">
                                      <p>
                                      <span>*</span>用&ensp;&ensp;&ensp;&ensp;途</p>
                                      </label>
            <div class="option">
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
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex wrap column_section">
            <label for="inputWithButton" class="form-label" >
                                      <p>
                                      <span>*</span>專案代碼
                                      </p>
                                      </label>
            <div class="input-group">
          <input type="text" class="form-control" id="inputWithTitle">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label" id='project_name'> 
                                      <p>
                                      專案名稱
                                      </p>
                                      </label>
            <div class="input-group" id='readonly_box'>
             <p class='readonly_box' readonly>14564</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap column_section" style='border:none'>
            <label for="inputTextarea" class="form-label">
                                      <p>
                                      說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明
                                      </p>
                                      </label>
            <textarea class="form-control" id="inputTextarea" rows="1" placeholder='請填寫說明，最多100字'></textarea>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>填寫項目</p>
        </div>
      </div>
      <div class='second_content'>
        <div class='wrap d-flex'>
          <div class='col-xl-3 col-lg-3 col-md-3 col-12' style='padding-left:0'>
            <p><span>*</span>設備總類</p>
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
            <p><span>*</span>設備分類</p>
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
            <p><span>*</span>物品名稱</p>
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
            <p><span>*</span>數量</p>
            <div class="number-input-box">
              <input class="input-number" type="number" v-model="count" min="1" />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-12 d-flex wrap text_input">
            <label for="inputTextarea" class="form-label"><p>規格需求：</p></label>
            <div>
            </div>
            <textarea class="form-control" id="inputTextarea" rows="3" placeholder='請填寫說明，最多100字'></textarea>
          </div>
        </div>
        <div class='col d-flex justify-content-center'>
          <button class="btn submit_btn" type="button">新增</button>
        </div>
      </div>
      <div class="fixed_info">
        <div>
          <p>資產出庫項目</p>
        </div>
      </div>
      <div class='third_content'>
        <ag-grid-vue style="width: 100%; height:300px; background-color: #402a2a;" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :defaultColDef="defaultColDef" :paginationAutoPageSize="true" :pagination="true">
        </ag-grid-vue>
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
  import Delete from "@/components/Delete_button";
  import Navbar from '@/components/Navbar.vue';
  import {
    onMounted,
    ref
  } from 'vue';
  export default {
    components: {
      Navbar,
      AgGridVue,
      Delete
    },
    setup() {
      return {
        columnDefs: [{
            suppressMovable: true,
            field: "",
            cellRenderer: "Delete",
            width: '100'
          },
          {
            headerName: "設備總類",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "設備分類",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "物品名稱",
            field: "price",
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
            headerName: "規格需求",
            field: "model",
            unSortIcon: true,
            sortable: true,
            flex: 1,
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
        count: 1,
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .readonly_box{
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
        .code_search {
          background: #48658C;
          color: white;
          font-weight: 800;
          height: 30px;
          width: 60px;
          margin-right: 10px;
          display: flex;
          align-self: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        #readonly_box{
          border-left:black 1px solid;
        }
        .input-group-prepend {
          width: 100% !important;
          text-align: center !important;
        }
        span {
          @include red_star
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
          background: #D9D9D9;
          .submit_btn {
            margin-bottom: 20px;
            background: #48658C;
            color: white;
            font-weight: 700;
            width: 80px;
            font-size: 18px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              background-color: #5d85bd;
            }
          }
          .wrap {
            justify-content: space-evenly;
            padding: 10px 80px;
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
                width: 180px;
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
        .third_content {
          border: 1px solid black;
          .list {
            border: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #FF7272
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
    
    border-left: 1px solid black;
          }
         
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            label.use,#project_id {
              border-right: 1px solid black;
            }
            .option {
              display: flex
            }
          #project_name,#project_id {
            border-left: 1px solid black;
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
        .input-group{
          height:100%;
        }
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;
          span {
            @include red_star
          }
        }
        .input-number {
          @include count_btn;
        }
        .form-control {
          height: 50px !important;
          border-radius: 0;
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
        .code_search {
          background: #48658C;
          color: white;
          font-weight: 800;
          height: 30px;
          width: 60px;
          margin-right: 10px;
          display: flex;
          align-self: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
         
        } #readonly_box{
            border-left:1px solid black;
          }
        .input-group-prepend {
          width: 100% !important;
          text-align: center !important;
        }
        span {
          @include red_star
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
          background: #D9D9D9;
          .submit_btn {
            margin-bottom: 20px;
            background: #48658C;
            color: white;
            font-weight: 700;
            width: 80px;
            font-size: 18px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              background-color: #5d85bd;
            }
          }
          .wrap {
            justify-content: space-evenly;
            padding: 10px 80px;
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
                width: 180px;
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
        .third_content {
          border: 1px solid black;
          .list {
            border: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #FF7272
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
    border-left: 1px solid black;
          }
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            label.use ,#project_id {
              border-right: 1px solid black;
            }
            .option {
              display: flex
            }
         
              #project_name {
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
        .input-group{
              height: 100%;
        }
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;
          span {
            @include red_star
          }
        }
        .input-number {
          @include count_btn;
        }
        .form-control {
          height: 50px !important;
          border-radius: 0;
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
        .code_search {
          background: #48658C;
          color: white;
          font-weight: 800;
          height: 30px;
          width: 60px;
          margin-right: 10px;
          display: flex;
          align-self: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .input-group-prepend {
          width: 100% !important;
          text-align: center !important;
        }
        span {
          @include red_star
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
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #D9D9D9;
          .submit_btn {
            margin: 20px 0;
            background: #48658C;
            color: white;
            font-weight: 700;
            width: 80px;
            font-size: 18px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              background-color: #5d85bd;
            }
          }
          .wrap {
            padding: 20px 20px 0;
            flex-direction: column;
          
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
              margin-bottom: 0;
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
                width: 180px;
                .dropdown-item {
                  text-align: left;
                }
              }
            }
            div {
              margin-bottom: 10px;
              p {
                text-align: center;
                white-space: nowrap;
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 5px;
              }
            }
          }
          .text_input {
            padding: 0 20px;
            div {
              display: none;
            }
            p {
              margin-bottom: 0;
              padding-bottom: 5px
            }
            .form-control {
              height: 150px
            }
          }
        }
        .column_section {
          flex-direction: column;
          p{
            text-align:center;
          }
          #inputWithButton {
            border-right: 1px solid black;
          }
        }
        .third_content {
          border: 1px solid black;
          .list {
            border: 1px solid black;
            button {
              @include delete_button;
              &:hover {
                background: #FF7272
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
            font-size: 18px;
          }
          .form-control {
            height: 50px;
            border-radius: 0;
          }
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            flex-direction: column;
            label.use,
            .form-label {
              border-bottom: 1px solid black;
              width: 100%;
              height: 30px;
            }
            .option {
              padding: 5px;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr;
              gap: 0px 0px;
              grid-auto-flow: row;
              grid-template-areas: ". . ." ". . .";
              white-space: nowrap;
              justify-items:right;
              width:100%;

              div{
                       width:90px;
              }
            }
              #project_id {
              border-right:black solid 1px
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
          span {
            @include red_star
          }
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