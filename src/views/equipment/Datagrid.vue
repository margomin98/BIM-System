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
            <input type="text" v-model="searchParams.IntegrationId" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>整合箱名稱</p>
            <input type="text" v-model="searchParams.IntegrationName" />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12">
            <p>區域</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName">
                  {{ searchParams.AreaName || '請選擇' }}
                </button>
              <div class="dropdown-menu" aria-labelledby="areaDropdown">
                <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item" @click="selectArea(item)">{{ item.Name }}</p>
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
                <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item" @click="selectLayer(item)">{{ item.Name }}</p>
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
                <p v-for="(item , index) in DropdownArray.DateCategory" :key="index" class="dropdown-item" @click="selectDateCategory(item)">{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12  flex-col">
            <p>日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.StartDate" class="date-input" :disabled="!searchParams.DateCategory" />
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6 col-12 flex-col">
            <p>日期(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="searchParams.EndDate" class="date-input" :disabled="!searchParams.DateCategory" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn" @click="submit('','search')">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
        <!-- <button class="export_btn">匯出</button> -->
      </div>
    </div>
    <div class="dg-height">
      <DataTable
        :key="datagrid.key"
        :first= "datagrid.first"
        :size="'small'"
        :loading="datagrid.loading"
        :value="rowData" 
        :sort-field="datagrid.sortField"
        :sort-order="datagrid.sortOrder"
        resizableColumns 
        columnResizeMode="expand"
        showGridlines 
        scrollable 
        scrollHeight="420px" 
        @page="submit($event , 'page')" 
        @sort="submit($event , 'sort')"
        paginator 
        :rows="datagrid.rows" 
        :totalRecords="datagrid.totalRecords"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :rowsPerPageOptions="[10, 20, 30]"
        currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column style="min-width: 60px;">
          <template #body="slotProps">
            <Equipment_button :params = "slotProps"/>
          </template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        <Column style="min-width: 60px;">
          <template #body="slotProps">
            <Delete :params = "slotProps"/>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import Equipment_button from "@/components/Equipment_button";
  import Delete from "@/components/Equipment_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import {
    Equipment_DateCategory
  } from "@/assets/js/dropdown.js"
  import {
    getArea,
    getLayer,
    getMngDatagrid,
  } from '@/assets/js/common_api'
  import { UpdatePageParameter, createDatagrid } from '@/assets/js/common_fn';
  import axios from 'axios'
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Equipment_button,
      Delete
    },
    setup() {
      const searchParams = reactive({
        IntegrationId: '',
        IntegrationName: '',
        AreaName: '',
        Area_Id: '',
        LayerName: '',
        Layer_Id: '',
        DateCategory: '',
        StartDate: '',
        EndDate: '',
      }); 
      const DropdownArray = reactive({
        Area: [],
        Layer: [],
        DateCategory: Equipment_DateCategory,
      })
      const LayerInit = ref('請先選擇區域');
      const datagrid = createDatagrid();
      const datagridfield = [
        { header: "整合箱產編", field: "IntegrationId", width: '180px' },
        { header: "整合箱名稱", field: "IntegrationName", width: '150px' },
        { header: "區域", field: "AreaName", width: '100px' },
        { header: "櫃位", field: "LayerName", width: '100px' },
        { header: "最後更換日期", field: "EditTime", width: '180px' },
        { header: "整合日期", field: "IntegrateDate", width: '160px' },
        { header: "整合人員", field: "Integrator", width: '150px' },
      ]
      const rowData = ref([]);
      onMounted(() => {
        datagrid.sortField = 'IntegrationId'
        submit('','search');
      });
      async function submit(event,type) {
        const form = new FormData();
        //將表格資料append到 form
        for (const key in searchParams) {
          if (searchParams[key]) {
            form.append(key, searchParams[key]);
          }
        }
        UpdatePageParameter(datagrid,event,type,form)
        // getMngDatagrid('/IntegrationMng/IntegrationBoxes',rowData,datagrid,form);
        datagrid.loading = true;
        const baseUrl = 'http://192.168.0.177:7008'
        let apiurl = baseUrl + '/IntegrationMng/IntegrationBoxes'
        axios.post(`${apiurl}`, form)
        .then((response)=>{
          const data = response.data;
          if (data.state === 'success') {
            console.log('datagrid', data.resultList);
            rowData.value = data.resultList;
            datagrid.totalRecords = data.resultList.total;
            datagrid.key++;
          } else if (data.state === 'account_error') {
            //尚未登入
            alert(data.messages);
            router.push('/');
          } else {
            //取得datagrid失敗
            alert(data.messages);
          }
        })
        .catch((error)=>{
          console.error(error);
        })
        datagrid.loading = false;
      }
      async function getAreaName() {
        if (DropdownArray.Area.length == 0) {
          getArea()
            .then((data) => {
              DropdownArray.Area = data;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      async function getLayerName() {
        getLayer(searchParams.Area_Id)
          .then((data) => {
            DropdownArray.Layer = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      const selectArea = (item) => {
        searchParams.AreaName = item.Name;
        searchParams.Area_Id = item.Id;
        searchParams.LayerName = '';
        searchParams.Layer_Id = '';
        getLayerName();
        LayerInit.value = '請選擇';
      };
      const selectLayer = (item) => {
        searchParams.LayerName = item.Name;
        searchParams.Layer_Id = item.Id;
      };
      const selectDateCategory = (item) => {
        searchParams.DateCategory = item;
      };
      function clear() {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        LayerInit.value = '請先選擇區域';
        submit('','search');
      }
      return {
        searchParams,
        DropdownArray,
        LayerInit,
        datagrid,
        datagridfield,
        rowData,
        submit,
        getAreaName,
        selectArea,
        selectLayer,
        selectDateCategory,
        clear,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .dg-height {
    @include datagrid-height;
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
        // .export_btn {
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
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 40px 5px;
          .col-xl-2 {
            margin: 0 3px;
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
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
          width: 150px;
          &:hover {
            background-color: #537ebc;
          }
        }
        // .export_btn {
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
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
        // .export_btn {
        //   @include export_btn;
        //   font-size: 18px;
        //   width: 100%;
        //   height: auto;
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