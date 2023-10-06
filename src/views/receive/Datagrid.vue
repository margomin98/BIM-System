<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>收貨管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        <router-link to="/receive_new">
          <button class="add_btn">新增收貨</button>
        </router-link>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col">
            <p>物流單號</p>
            <input type="text" v-model="searchParams.ShipmentNum" />
          </div>
          <div class="col">
            <p>貨運公司</p>
            <input type="text" v-model="searchParams.ShipmentCompany" />
          </div>
          <div class="col">
            <p>收件日期(起)</p>
            <input type="date" v-model="searchParams.StartDate" class="date-input" />
          </div>
          <div class="col">
            <p>收件日期(迄)</p>
            <input type="date" v-model="searchParams.EndDate" class="date-input" />
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn" @click="submit">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
        <!-- <button class="export_btn">匯出</button> -->
      </div>
    </div>
    <div style="width: 100%;margin-bottom:3%">
      <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :paginationPageSize="pageSize" :pagination="true" :alwaysShowHorizontalScroll="true">
      </ag-grid-vue>
    </div>
  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Receive_button from "@/components/Receive_button";
  import Delete from "@/components/Receive_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    useRouter
  } from "vue-router";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Receive_button,
      Delete
    },
    setup() {
      const router = useRouter();
      const searchParams = reactive({
        ShipmentNum: '',
        ShipmentCompany: '',
        StartDate: '',
        EndDate: '',
      });
      const columnDefs = [{
          suppressMovable: true,
          field: "",
          cellRenderer: "Receive_button",
          width: 220,
          resizable: true,
        },
        {
          headerName: "收貨單號",
          field: "Show_AR_ID",
          unSortIcon: true,
          sortable: true,
          width: 180,
          resizable: true,
          flex: 1,
          suppressMovable: true
        },
        {
          headerName: "物流單號",
          field: "ShipmentNum",
          unSortIcon: true,
          sortable: true,
          width: 180,
          resizable: true,
          flex: 1,
          suppressMovable: true
        },
        {
          headerName: "貨運公司",
          field: "ShipmentCompany",
          unSortIcon: true,
          sortable: true,
          width: 150,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "到貨件數",
          field: "GoodsNum",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "收件日期",
          field: "ReceivedDate",
          unSortIcon: true,
          sortable: true,
          resizable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "收件人員",
          field: "Recipient",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          suppressMovable: true,
          width: 100,
          field: "",
          cellRenderer: "Delete",
        }
      ]
      const rowData = ref([]);
      onMounted(() => {
        submit();
      });
      async function submit() {
        const formData = new FormData();
        //將表格資料append到 formData
        for (const key in searchParams) {
          formData.append(key, searchParams[key]);
        }
        const axios = require('axios');
        try {
          const response = await axios.post('http://192.168.0.177:7008/ReceivingMng/ReceivingNotes', formData);
          const data = response.data;
          if (data.state === 'success') {
            //取得datagrid成功
            // console.log(data.state);
            console.log('datagrid:', data.resultList);
            rowData.value = data.resultList;
          } else if (data.state === 'error') {
            //取得datagrid失敗
            alert(data.messages);
          } else if (data.state === 'input_error') {
            //取得datagrid格式錯誤
            alert(data.messages);
          } else if (data.state === 'account_error') {
            //尚未登入
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error(error);
        }
      }
      const clear = () => {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        submit();
      }
      return {
        searchParams,
        columnDefs,
        rowData,
        rowHeight: 35,
        pageSize: 10,
        submit,
        clear,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  @media only screen and (min-width: 1200px) {
    .main_section {
      padding: 0 10%;
      h1 {
        margin-bottom: 20px;
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
          @include datagrid_button_no1; // width: 100px;
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
        .content {
          background: rgba(82, 136, 156, 0.8);
          border-radius: 10px;
          margin-bottom: 30px;
          height: 200px;
          align-items: center;
          display: flex;
          justify-content: center;
        }
        .row {
          p {
            @include datagrid_title;
          }
          input {
            @include dropdown_btn;
            width: 200px;
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
            width: 200px;
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
          @include datagrid_button_no1; // width:100px;
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
          display: flex;
    flex-direction: column;
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