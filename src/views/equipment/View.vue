<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>檢視設備整合</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>設備整合箱</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">產編：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">名稱：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <!-- <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">保管人員：</div>
                <input type="text" class="form-control " aria-label="Default" aria-describedby="inputGroup-sizing-default"  />
              </div>
            </div>
          </div> -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly/>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>整合箱內容物</p>
        </div>
      </div>
      <div class="content">

    <div class="item_wrap">
    <div class="item">
    
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">資產編號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">物品名稱：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col count d-flex">
          <div class="input-group">
            <div class="input-group-prepend">數量：</div>
            <div class="num_wrap d-flex ">
              <div class="number-input-box">
                <input class="input-number readonly_box" type="number" readonly />
              </div>
            
            </div>
          </div>
        </div>
      </div>
      <div class="item">
    
    <div class="col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">資產編號：</div>
        <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly/>
      </div>
    </div>
    <div class="col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">物品名稱：</div>
        <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
      </div>
    </div>
    <div class="col count d-flex">
      <div class="input-group">
        <div class="input-group-prepend">數量：</div>
        <div class="num_wrap d-flex ">
          <div class="number-input-box">
            <input class="input-number readonly_box" type="number" readonly />
          </div>
        
        </div>
      </div>
    </div>
  </div>
  <div class="item">
    
    <div class="col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">資產編號：</div>
        <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly/>
      </div>
    </div>
    <div class="col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">物品名稱：</div>
        <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
      </div>
    </div>
    <div class="col count d-flex">
      <div class="input-group">
        <div class="input-group-prepend">數量：</div>
        <div class="num_wrap d-flex ">
          <div class="number-input-box">
            <input class="input-number readonly_box" type="number" readonly />
          </div>
        
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>更換設備歷史紀錄</p>
        </div>
      </div>
      <div style="width: 100%" class="content">
      <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :paginationPageSize="pageSize" :pagination="true">
      </ag-grid-vue>
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
  import {
    register
  } from 'swiper/element/bundle';
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
    setup() {
      return {
        columnDefs: [ 
          {
            headerName: "記錄日期",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "記錄行為",
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
            headerName: "資產編號",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '200',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "物品名稱",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: '200',
            resizable: true,
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
          },
          {
            headerName: "作業人員",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
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
        width: 700px;
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
            width: 100%;
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
              width: 100px;
              text-align: end;
            }
          }
          .item_wrap {
          height: 350px;
    overflow: auto;
         .item{
          background-color: #526F8E;
          border-radius: 10px;
          padding: 20px;
          margin:20px 0;
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
      .info_wrap:nth-child(3) {
        margin-top: 3%;
        .count {
          .input-group {
            justify-content: left
          }
         
        }
      }
      .info_wrap:nth-child(4) {
        margin-top: 3%;
       
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
    .change_btn {
      @include change_btn
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
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
            width: 100%;
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
              width: 100px;
              text-align: end;
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
         .item{
          background-color: #526F8E;
          border-radius: 10px;
          padding: 20px;
          margin:20px 0;
        }  
        }
      }
      .info_wrap:nth-child(3) {
        margin-top: 3%;
        .count {
          .input-group {
            justify-content: left
          }
        
        }
      }
      .info_wrap:nth-child(4) {
        margin-top: 3%;
       
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
    .change_btn {
      @include change_btn
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
        font-size: 50px;
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
            &:hover {
              background-color: #5d85bb;
            }
          }
   
        }
        .item_wrap {
          height: 350px;
    overflow: auto;
         .item{
          background-color: #526F8E;
          border-radius: 10px;
          padding: 20px;
          margin:20px 0;
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
      
        }
      }
      .info_wrap:nth-child(4) {
        margin-top: 3%;
       
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
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
    .change_btn {
      @include change_btn
    }
  }
</style>