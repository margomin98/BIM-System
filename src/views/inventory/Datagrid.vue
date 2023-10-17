<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>盤點計畫管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        <router-link to="/inventory_new">
          <button class="add_btn">新增盤點計畫</button>
        </router-link>
  
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>計畫編號</p>
            <input type="text" v-model="searchParams.PlanId"/>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>盤點類型</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ searchParams.PlanType || "請選擇" }}
              </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item , index) in DropdownArray.PlanType" :key="index" class="dropdown-item" @click="selectType(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-2 col-md-6 col-12">
            <p>盤點狀態</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ searchParams.PlanStatus || "請選擇" }}
              </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item , index) in DropdownArray.PlanStatus" :key="index" class="dropdown-item" @click="selectStatus(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>日期類型</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ searchParams.DateCategory || "請選擇" }}
              </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p v-for="(item , index) in DropdownArray.PlanDateCategory" :key="index" class="dropdown-item" @click="selectDateCategory(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12  flex-col">
            <p>日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.StartDate" class="date-input"/>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12 flex-col">
            <p>日期(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.EndDate" class="date-input"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn" @click="submit">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
      </div>
    </div>
   <div style="width: 100%;margin-bottom:3%">
      <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :paginationPageSize="pageSize" :pagination="true" :alwaysShowHorizontalScroll="true">
      </ag-grid-vue>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">警示</h5>
          <div class="close_icon"><p type="button" data-bs-dismiss="modal" aria-label="Close">x</p></div>
        </div>
        <div class="modal-body">
        <p>即將開始進行盤點作業，按下確認後即無法編輯盤點計畫內容。</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn confirm" data-bs-dismiss="modal" @click="routerProcess">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { AgGridVue } from "ag-grid-vue3";
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { onMounted, reactive, ref } from "vue";
  import Inventory_button from "@/components/Inventory_button";
  import Delete from "@/components/Inventory_data_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import { PlanType , PlanStatus , PlanDateCategory} from "@/assets/js/dropdown.js"
  import { useRouter } from "vue-router";
  export default {
    components: {
      Navbar,
      AgGridVue,
      DataTable,
      Column,
      Inventory_button,
      Delete
    },
    setup() {
      const router = useRouter();
      const details = ref({});
      const search_id = ref('');
      const DropdownArray = reactive({
        PlanType: PlanType,
        PlanStatus: PlanStatus,
        PlanDateCategory: PlanDateCategory,
      })
      const searchParams = reactive({
        PlanId: '',
        PlanType: '',
        PlanStatus: '',
        DateCategory: '',
        StartDate: '',
        EndDate: '',
      });
      const columnDefs = [{
            suppressMovable: true,
            field: "",
            cellRenderer: "Inventory_button",
            cellRendererParams: {
              updateSearchId: (id)=>{
                search_id.value = id;
              }
            },
            width: 340,
            resizable: true,
          },
          {
            headerName: "計畫編號",
            field: "PlanId",
            unSortIcon: true,
            sortable: true,
            width: 150,
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "盤點類型",
            field: "PlanType",
            unSortIcon: true,
            sortable: true,
            width: 150,
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "盤點狀態",
            field: "PlanStatus",
            unSortIcon: true,
            sortable: true,
            width: 150,
            suppressMovable: true
          },
          {
            headerName: "標題",
            field: "PlanTitle",
            unSortIcon: true,
            sortable: true,
            resizable: true,
            width: 150,
            suppressMovable: true
          },
          {
            headerName: "盤點人員",
            field: "InventoryStaffName",
            unSortIcon: true,
            sortable: true,
            width: 150,
            suppressMovable: true
          },
          {
            headerName: "召集人員",
            field: "ConvenerName",
            unSortIcon: true,
            sortable: true,
            width: 150,
            suppressMovable: true
          },
          {
            headerName: "盤點開始日期",
            field: "PlanStart",
            unSortIcon: true,
            sortable: true,
            width: 180,
            suppressMovable: true
          },
          {
            headerName: "盤點結束日期",
            field: "PlanEnd",
            unSortIcon: true,
            sortable: true,
            width: 180,
            suppressMovable: true
          },
          {
            headerName: "最近編輯時間",
            field: "EditTime",
            unSortIcon: true,
            sortable: true,
            width: 180,
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
      const datatableParams = reactive({
        loading: false,
        totalRecords: 0,
        currentPage: 0,
        rows: 10,
      })
      const datatableField =  
      onMounted(()=>{
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
          const response = await axios.post('http://192.168.0.177:7008/StocktakingMng/InventoryPlans', formData);
          const data = response.data;
          if (data.state === 'success') {
            //取得datagrid成功
            // console.log(data.state);
            console.log('datagrid', data.resultList);
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
      const selectType = (item) => {
        searchParams.PlanType = item;
      };
      const selectStatus = (item) => {
        searchParams.PlanStatus = item;
      };
      const selectDateCategory = (item) => {
        searchParams.DateCategory = item;
      };
      function routerProcess() {
        router.push({
          name: 'Inventory_Process',
          query: {
            search_id: search_id.value,
          }
        });
      }
      function clear() {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        submit();
      }

      return {
        details,
        searchParams,
        DropdownArray,
        search_id,
        columnDefs,
        rowData,
        rowHeight: 35,
        pageSize: 10,
        submit,
        selectType,
        selectStatus,
        selectDateCategory,
        routerProcess,
        clear,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  @import "@/assets/css/theme.css";
  .modal {
    .modal-body {
      padding: 20px;
      margin: auto;
      p{
        text-align: center;
    font-weight: 800;}
    }
    .modal-content {
      margin: auto;
    }
    .modal-input-group-prepend {
      width: auto;
      font-weight: 700;
      font-size: 20px;
    }
    .modal-footer {
      padding: 0 12px 12px;
      border: none;
      justify-content: center;
      .confirm{
        color:white;
        background-color: #132238;
        &:hover{
          background-color: #426497;
        }
      }
    }
    .modal-header {
      h5 {
        font-weight: 700;
      }
      background: #528091;
      color: white;
      display: flex;
      justify-content: center;
      padding: 0 16px 16px;
      .close_icon {
        height: 40px;
        cursor: pointer;
      }
      .modal-title {
        margin: auto;
        padding-top: 16px;
      }
    }
  }
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
          @include datagrid_button_no1;
          width: 170px;
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
        //  .export_btn {
        //   @include export_btn;
        //   &:hover {
        //     background-color: #274266;
        //   }
        // }
      }
      .datagrid_section {    
         .content {
          background: rgba(82, 136, 156, 0.8);
          border-radius: 10px;
          margin-bottom: 30px;
          height: 250px;
          align-items: center;
          display: flex;
          justify-content: center;
        }
        .row {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px 5px;
           .col-xl-2{
            margin:0 3px;
          }
          p {
            @include datagrid_title;
          }
          input {
            @include dropdown_btn;
            width: 200px;
            height: 35px;
          }
          button {
            border:none;
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
        text-align: left !important;
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
          width:170px;
          &:hover {
            background-color: #537ebc;
          }
        }
        //    .export_btn {
        //   @include export_btn;
        //   &:hover {
        //     background-color: #274266;
        //   }
        // }
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
      // .export_btn {
      //     @include export_btn;
      //     font-size: 18px;
      //     width: 100%;
      //     height: auto;
      //     &:hover {
      //       background-color: #274266;
      //     }
      //   }
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