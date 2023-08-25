<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        檢視出庫填報
      </h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>單號：193489274</p>
        </div>
        <div>
          <p>申請人員：陳奕迅</p>
        </div>
        <div>
          <p>申請日期：2022/02/20</p>
        </div>
      </div>
      <form>
        <div class="row g-0">
          <div class="col d-flex wrap column_section">
            <label for="inputTitle1" class="form-label use"><p>用&ensp;&ensp;&ensp;&ensp;途</p></label>
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
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>專案代碼</p></label>
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly>文字</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label" id='project_name'><p>專案名稱</p></label>
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly>文字</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style='border:none'>
            <label for="inputTextarea" class="form-label"><p>説&ensp;&ensp;&ensp;&ensp;明</p></label>
            <textarea id='readonly_box' class='readonly_box' readonly></textarea>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>資產出庫項目</p>
        </div>
      </div>
      <div class='third_content'>
        <ag-grid-vue style="height: 380px" class="ag-theme-alpine list" :rowHeight="rowHeight" :columnDefs="columnDefs" :rowData="rowData" :defaultColDef="defaultColDef" :paginationAutoPageSize="true">
        </ag-grid-vue>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
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
            headerName: "",
            suppressMovable: true,
            field: "number",
            width: '45',
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
            autoHeight: true,
            headerName: "規格需求",
            field: "model",
            unSortIcon: true,
            sortable: true,
            flex: 1,
            suppressMovable: true
          }
        ],
        rowData: [{
            number: "1",
            make: "Toyota",
            model: "Mondeo",
            price: 35000
          },
          {
            number: "2",
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            number: "3",
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            number: "4",
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            number: "5",
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
        count: 1,
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
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
        #readonly_box {
          border-left: black 1px solid;
        }
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
        .third_content {
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
            height: 50px !important;
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
        .input-group {
          height: 100%;
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
          height: 35px;
          border-radius: 0;
        }
      }
      #project_id {
        border-right: 1px solid black;
      }
      #project_name {
        border-left: 1px solid black;
      }
      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
        button {
          @include back_to_previous_btn;
          &:hover {
            background-color: #5d85bb;
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
        }
        #readonly_box {
          border-left: 1px solid black;
        }
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
        .third_content {
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
            height: 50px !important;
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
        .input-group {
          height: 100%;
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
          height: 35px;
          border-radius: 0;
        }
      }
      #project_id {
        border-right: 1px solid black;
      }
      #project_name {
        border-left: 1px solid black;
      }
      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
        button {
          @include back_to_previous_btn;
          &:hover {
            background-color: #5d85bb;
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
        .column_section {
          flex-direction: column;
        }
        .third_content {
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
            height: 50px !important;
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
          height: 35px;
          border-radius: 0;
        }
      }
      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
        button {
          @include back_to_previous_btn;
          &:hover {
            background-color: #5d85bb;
          }
        }
      }
    }
  }
</style>