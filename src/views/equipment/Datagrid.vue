<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>設備整合管理</h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        <router-link :to="{name:'Equipment_New'}">
          <button class="add_btn">新增整合箱</button>
        </router-link>
  
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="content">
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>整合箱產編</p>
            <input type="text" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>整合箱名稱</p>
            <input type="text" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>區域</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName">
                {{ searchParams.AreaName || '請選擇' }}
              </button>
              <div class="dropdown-menu" aria-labelledby="areaDropdown">
                <p v-for="(item, index) in AreaArray" :key="index" class="dropdown-item" @click="selectArea(`${item}`)">
                  {{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>櫃位</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="searchParams.AreaName === ''">
                {{ searchParams.LayerName || LayerInit }}
              </button>
              <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                <p v-for="(item, index) in LayerArray" :key="index" class="dropdown-item" @click="selectLayer(`${item}`)">{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>日期類型</p>
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
          <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :defaultColDef="defaultColDef" :paginationAutoPageSize="true" :pagination="true" :alwaysShowHorizontalScroll="true"
         >
    </ag-grid-vue>
    </div>

  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import Equipment_button from "@/components/Equipment_button";
  import Delete from "@/components/Delete_button";
  import Navbar from "@/components/Navbar.vue";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Equipment_button,
      Delete
    },
    setup() {
      const details = ref({});
      const searchParams = reactive({
        IntegrationId: '',
        IntegrationName: '',
        AreaName: '',
        LayerName: '',
        StartDate: '',
        EndDate: '',
      });
      const AreaArray = ref([]); //區域陣列
      const LayerArray = ref([]); //櫃位陣列
      const LayerInit = ref('請先選擇區域');
      const pageSize = ref(10);
      const columnDefs = [{
            suppressMovable: true,
            field: "",
            cellRenderer: "Equipment_button",
            width: '185',
            resizable: true,
          },
          {
            headerName: "整合箱產編",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '180',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "整合箱名稱",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "區域",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: '100',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "櫃位",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '100',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "最後更換日期",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '180',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "整合日期",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: '160',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "整合人員",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            resizable: true,
            suppressMovable: true
          },
          
        
           {
            suppressMovable: true,
            width:'100',
            field: "",
            cellRenderer: "Delete",
          }
        ];
      const rowData = ref([]);
      onMounted(()=>{
        
      });
      async function getAreaName() {
        if (AreaArray.value.length == 0) {
          const axios = require('axios');
          try {
            const response = await axios.get('http://192.168.0.177:7008/GetParameter/GetAreaName');
            console.log(response);
            const data = response.data;
            if (data.state === 'success') {
              console.log('Area Get成功 資料如下\n', data.resultList.AreaName);
              AreaArray.value = data.resultList.AreaName;
            } else if (data.state === 'error') {
              alert(data.messages);
            } else if (data.state === 'account_error') {
              alert(data.messages);
              router.push('/');
            }
          } catch (error) {
            console.error('Error sending applicant info request to backend');
          }
        }
      }
      async function getLayerName() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetParameter/GetLayerName?id=${searchParams.AreaName}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Layer Get成功 資料如下\n', data.resultList.LayerName);
            LayerArray.value = data.resultList.LayerName;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend');
        }
      }
      const selectArea = (item) => {
        searchParams.AreaName = item;
        searchParams.LayerName = '';
        //API function here
        getLayerName();
        LayerInit.value = '請選擇';
      };
      const selectLayer = (item) => {
        searchParams.LayerName = item;
      };
      return {
        details,
        searchParams,
        AreaArray,
        LayerArray,
        LayerInit,
        pageSize,
        columnDefs,
        rowData,
        rowHeight: 35,
        getAreaName,
        selectArea,
        selectLayer,
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
          @include datagrid_button_no1;
          width: 150px;
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
          height: 250px;
          align-items: center;
          display: flex;
          justify-content: center;
        }
        .row {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr 1fr 1fr;
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
              max-height: 250px;
              overflow-y: auto;
              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
                &:hover {
                  cursor: pointer;
                }
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
          width:150px;
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
              max-height: 250px;
              overflow-y: auto;
              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
                &:hover {
                  cursor: pointer;
                }
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
              max-height: 250px;
              overflow-y: auto;
              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
                &:hover {
                  cursor: pointer;
                }
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