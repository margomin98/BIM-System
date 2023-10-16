<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>檢視盤點計畫</h1>
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
            <input type="text" class="form-control readonly_box" v-model="details.PlanId" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">標題：</div>
            <input type="text" class="form-control readonly_box" v-model="details.PlanTitle" readonly/>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點人員：</div>
              <input type="text" class="form-control readonly_box" v-model="details.InventoryStaffName" readonly/>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點召集人：</div>
              <input type="text" class="form-control readonly_box" v-model="details.ConvenerName" readonly />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點開始日期：</div>
              <input type="text" class="form-control readonly_box" v-model="details.PlanStart" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點結束日期：</div>
              <input type="text" class="form-control readonly_box" v-model="details.PlanEnd" readonly />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend">盤點類型：</div>
            <div class="check_section d-flex">
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no1" name="radio" value="指定盤" v-model="details.PlanType" :disabled="details.PlanType !== '指定盤'" />
                <label for="no1">指定盤</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no2" name="radio" value="月盤" v-model="details.PlanType" :disabled="details.PlanType !== '月盤'" />
                <label for="no2">月盤</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no3" name="radio" value="季盤" v-model="details.PlanType" :disabled="details.PlanType !== '季盤'" />
                <label for="no3">季盤</label>
              </div>
              <div class="form-check d-flex align-items-center">
                <input type="radio" id="no4" name="radio" value="年盤" v-model="details.PlanType" :disabled="details.PlanType !== '年盤'" />
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
          <p>盤點範圍</p>
        </div>
      </div>
      <div class="content">
        <div style="width: 100%">
          <DataTable 
            lazy 
            :first= "datagrid2.first"
            :size="'small'"
            :loading="datagrid2.loading"
            :value="rowData2" 
            :sort-field="datagrid2.sortField"
            :sort-order="datagrid2.sortOrder"
            resizableColumns 
            columnResizeMode="expand"
            showGridlines 
            scrollable 
            scrollHeight="820px" 
            @page="getRangeOfPlan($event , 'page')" 
            @sort="getRangeOfPlan($event , 'sort')"
            table-style="min-height: 820px;"
            paginator 
            :rows="20" 
            :totalRecords="datagrid2.totalRecords"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 50px;" header="項目">
              <template #body="slotProps">
                {{ calculateIndex(slotProps) }}
              </template>
            </Column>
            <Column style="min-width: 60px;">
              <template #body="slotProps">
                <!-- Add the custom component here -->
                <List_view_button :params = "slotProps" />
              </template>
            </Column>
            <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
          </DataTable>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
  import List_view_button from "@/components/Inventory_view_button";
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    ref,
    reactive,
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import axios from "axios";
  import { goBack } from "@/assets/js/common_fn";
  export default {
    components: {
      DataTable,
      Column,
      Navbar,
      List_view_button,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const details = ref('');
      const IP_ID = route.query.search_id;
      const searchParams = reactive({
        EquipTypeName: '',
        EquipCategoryName: '',
        AssetName: '',
        AreaName: '',
        LayerName: '',
      })
      // 盤點範圍項目 datagrid
      const datagrid1field = [
        {
          field: 'AssetStatus',
          header: '資產狀態',
          width: '150px',
        },
        {
          field: 'AssetsId',
          header: '資產編號',
          width: '150px',
        },
        {
          field: 'AssetName',
          header: '物品名稱',
          width: '150px',
        },
        {
          field: 'EquipTypeName',
          header: '設備總類',
          width: '150px',
        },
        {
          field: 'EquipCategoryName',
          header: '設備分類',
          width: '150px',
        },
        {
          field: 'AreaName',
          header: '儲位區域',
          width: '150px',
        },
        {
          field: 'LayerName',
          header: '儲位櫃位',
          width: '150px',
        },
      ];
      const datagrid2 = reactive({
        totalRecords: 0,
        first: 0,
        rows: 20,
        currentPage: 1,
        sortField: 'AssetsId',
        sortOrder: -1,
        loading: false,
      })  
      const rowData2 = ref([]);
      onMounted(() => {
        getDetails();
      });
      // 帶入資料
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetInventoryPlanInfo?id=${IP_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            details.value.PlanStart = details.value.PlanStart.replace(/-/g, '/');
            details.value.PlanEnd = details.value.PlanEnd.replace(/-/g, '/');
            getRangeOfPlan('','search');
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error(error);
        }
      }
      // 取得盤點範圍datagrid
      async function getRangeOfPlan(event , type) {
        datagrid2.loading = true;
        const form = new FormData();
        // 將已有的項目AssetsId加入form
        if (details.value.AssetList.length !== 0) {
          for (const item of details.value.AssetList) {
            form.append('AssetList', item)
          }
        }
        switch (type) {
          case 'sort':
            datagrid2.currentPage = 1;
            datagrid2.sortField = event.sortField;
            datagrid2.sortOrder = event.sortOrder;
            datagrid2.first = event.first;
            break;
          case 'page':
            datagrid2.currentPage = (event.page+1);
            datagrid2.rows = event.rows;
            datagrid2.first = event.first;
            break
          case 'search':
            datagrid2.currentPage = 1;
            datagrid2.first = 0;
            break
        }
        const order = datagrid2.sortOrder === 1 ? 'asc' : 'desc'
        form.append('rows',datagrid2.rows);
        form.append('page',datagrid2.currentPage);
        form.append('sort',datagrid2.sortField);
        form.append('order',order);
        axios.post('http://192.168.0.177:7008/StocktakingMng/RangeOfPlan',form)
        .then((response)=>{
          const data = response.data
          if(data.state === 'success') {
            console.log('盤點範圍:',data.resultList.rows);
            datagrid2.totalRecords =  data.resultList.total
            rowData2.value =  data.resultList.rows
          } else {
            // state為error
            alert(data.messages);
          }
        })
        .catch((error)=>{
          console.error(error);
        })
        datagrid2.loading = false;
      }
      function calculateIndex(slotProps) {
        return String(datagrid2.first + slotProps.index + 1).padStart(2, '0');
      }
      return {
        details,
        searchParams,
        datagrid1field,
        datagrid2,
        rowData2,
        getRangeOfPlan,
        calculateIndex,
        goBack,
      };
    },
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
            padding: 5px;
            &:hover {
              background-color: #5d85bb;
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
  }
</style>