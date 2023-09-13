<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>盤點作業</h1>
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
            <div class="input-group-prepend">標題：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly/>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly/>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點召集人：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點開始日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點結束日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend">盤點類型：</div>
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
      <div class="fixed_info">
        <div>
          <p>盤點范圍</p>
        </div>
      </div>
      <div class="content">
        <div class="search_wrap col">
          <div class="title">
            <div>
              <p>掃描盤點</p>
            </div>
          </div>
          <div class="content">
            <div class="col">
              <div class="input-group ">
                <div class="search_section">
                  <div class="input-wrapper">
                    <input  ref="myInput" placeholder="請掃描資產編號(完整檢索)" class="text-center">
                  </div>
                </div>
              </div>
            </div>
            <div class="col button">
              <button class="search_btn">搜索</button>
              <button class="empty_btn">清空</button>
            </div>
          </div>
        </div>
        <div style="width: 100%">
          <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :defaultColDef="defaultColDef" :paginationAutoPageSize="true" :pagination="true"
            :alwaysShowHorizontalScroll="true">
          </ag-grid-vue>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn">盤點完成</button>
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
  mounted() {
    this.$refs.myInput.focus();
  },
    setup() {
      return {
        columnDefs: [{
            headerName: "項目",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '100',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "狀態",
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
          },
          {
            headerName: "應盤數量",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '80',
            suppressMovable: true
          },
          {
            headerName: "實盤數量",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "差異",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '100',
            suppressMovable: true
          },
          {
            headerName: "單位",
            field: "model",
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
          button.send_btn {
            @include search_and_send_btn;
            width: 120px;
            padding: 10px;
            &:hover {
              background-color: #8eb2e3;
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
      }
    }
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
        background-color: #C3D3DA !important
      }
      .button {
        display: flex;
        margin-top: 20px;
        justify-content: center;
        gap: 20px;
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
          button.send_btn {
            @include search_and_send_btn;
            width: 120px;
            padding: 10px;
            &:hover {
              background-color: #8eb2e3;
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
      }
    }
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
        background-color: #C3D3DA !important
      }
      .button {
        display: flex;
        margin-top: 20px;
        justify-content: center;
        gap: 20px;
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
          button.send_btn {
            @include search_and_send_btn;
            width: 120px;
            padding: 5px;
            &:hover {
              background-color: #8eb2e3;
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
        background-color: #C3D3DA !important
      }
      .button {
        display: flex;
        margin-top: 20px;
        justify-content: center;
        gap: 20px;
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
  }
</style>