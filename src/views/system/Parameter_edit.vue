<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>編輯設備總類</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>
            電腦設備類
          </p>
        </div>
      </div>
      <div class='content'>
        <div class='row g-0'>
          <div class='col-xl-6 col-lg-6 col-md-6 col-12 grid'>
            <p>設備分類</p>
            <div style='width:100%'>
              <ag-grid-vue style="width: 100%" class="ag-theme-alpine" :rowDragManaged="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs" :rowData="rowData" @column-resized="onColumnResized">
              </ag-grid-vue>
            </div>
          </div>
          <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
            <p>新增設備分類</p>
            <div class='d-flex'>
              <input class="form-control" aria-label="With textarea" placeholder='最多十個字'>
              <button type="button">新增</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">上一頁</button>
        <button class="send_btn">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Navbar from "@/components/Navbar.vue";
  import Parameter_button from "@/components/Parameter_button";
  import Edit_pen from "@/components/Edit_pen";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Parameter_button,
      Edit_pen
    },
    setup() {
      return {
        columnDefs: [{
            field: "make",
            cellRenderer: 'Parameter_button',
            width: '170',
            rowDrag: true,
          },
          {
            field: "model",
            flex: 1,
            suppressSizeToFit: true,
            editable: true,
            cellRenderer: 'Edit_pen',
            suppressClickEdit: true,
            
            enableRtl: true,
          }
        ],
        rowData: [{
            make: "Toyota",
            model: "Celica",
            price: 35000,
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          }
        ],
        
      };
    },
    methods: {
      goBack() {
        window.history.back();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  @media only screen and (min-width: 1200px) {
    .main_section {
      .ag-theme-alpine {
        height: 450px
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 1% 20% 0;
        .fixed_info {
          @include fixed_info;
          background: #5D7187;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          gap: 20px;
          margin-bottom: 5%;
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
                background-color: #5e7aa2;
              }
            }
          }
        }
        .content {
          padding: 20px;
          background: #3E4E5F;
          .grid {
            padding: 30px;
            border-bottom-left-radius: 10px;
            background: #7B8799;
            p {
              background: #132238;
              margin-bottom: 0;
              color: white;
              padding: 8px 0;
              text-align: center;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              font-weight: 700;
              font-size: 20px;
            }
          }
          .submit_section {
            background: #132238;
            padding: 30px;
            border-bottom-right-radius: 10px;
            button {
              @include datagrid_edit_button;
              height: 35px;
              margin-left: 25px;
              width: 70px;
              font-size: 18px;
              &:hover {
                background: #3B6162;
                color: white;
              }
            }
            p {
              color: white;
              font-weight: 800;
              font-size: 20px;
            }
            .form-control {
              height: 35px;
              width: 400px;
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .ag-theme-alpine {
      height: 450px
    }
    .main_section {
      .ag-theme-alpine {
        height: 450px
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 1% 5% 0;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .info_title {
          display: flex;
          gap: 20px;
          padding-left: 20px;
          background: #EAEAEA;
          font-size: 20px;
          font-weight: 700;
          align-items: center;
          height: 50px;
          p {
            margin-bottom: 0;
          }
          input {
            border: none
          }
          button {
            background: #364E68;
            border-radius: 10px;
            border: none;
            color: white;
            font-weight: 700;
            font-size: 18px;
            &:hover {
              background: #496ca1
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          gap: 20px;
          margin-bottom: 5%;
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
                background-color: #5e7aa2;
              }
            }
          }
        }
        .content {
          .grid {
            padding: 30px;
            border-bottom-left-radius: 10px;
            background: #7B8799;
            p {
              background: #132238;
              margin-bottom: 0;
              color: white;
              padding: 8px 0;
              text-align: center;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              font-weight: 700;
              font-size: 20px;
            }
          }
          .submit_section {
            background: #132238;
            padding: 30px;
            border-bottom-right-radius: 10px;
            button {
              @include datagrid_edit_button;
              height: 35px;
              margin-left: 25px;
              width: 90px;
              font-size: 18px;
              &:hover {
                background: #3B6162;
                color: white;
              }
            }
            p {
              color: white;
              font-weight: 800;
              font-size: 20px;
            }
            .form-control {
              height: 35px;
              width: 400px;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .ag-theme-alpine {
      height: 250px !important
    }
    .main_section {
      .ag-theme-alpine {
        height: 450px
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 1% 5% 0;
        .fixed_info {
          @include fixed_info;
          p {
            margin-bottom: 0;
          }
        }
        .info_title {
          display: flex;
          gap: 10px;
          padding: 10px;
          background: #EAEAEA;
          font-size: 20px;
          font-weight: 700;
          align-items: center;
          flex-direction: column;
          p {
            margin-bottom: 0;
          }
          input {
            border: none;
            width: 100%;
          }
          button {
            width: 90px;
            background: #364E68;
            border-radius: 10px;
            border: none;
            color: white;
            font-weight: 700;
            font-size: 18px;
            &:hover {
              background: #496ca1
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          gap: 20px;
          margin-bottom: 5%;
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
                background-color: #5e7aa2;
              }
            }
          }
        }
        .content {
          .grid {
            padding: 30px;
            background: #7B8799;
            p {
              background: #132238;
              margin-bottom: 0;
              color: white;
              padding: 8px 0;
              text-align: center;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              font-weight: 700;
              font-size: 20px;
            }
          }
          .submit_section {
            background: #132238;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            button {
              @include datagrid_edit_button;
              height: 35px;
              margin-left: 25px;
              width: 90px;
              font-size: 18px;
              &:hover {
                background: #3B6162;
                color: white;
              }
            }
            p {
              color: white;
              font-weight: 800;
              font-size: 20px;
            }
            .form-control {
              height: 35px;
              width: 400px;
            }
          }
        }
      }
    }
  }
</style>
