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
            <input type="text" class="form-control readonly_box" v-model="details.PlanId" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">標題：</div>
            <input type="text" class="form-control readonly_box" v-model="details.PlanTitle" readonly />
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點人員：</div>
              <input type="text" class="form-control readonly_box" v-model="details.InventoryStaffName" readonly />
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
        <!-- 專案代碼 -->
        <div v-show="details.PlanType === '專案盤點'" class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">專案代碼 :</div>
            <input type="text" class="form-control readonly_box" v-model="details.ProjectCode" readonly>
          </div>
        </div>
        <!-- 專案名稱 -->
        <div v-show="details.PlanType === '專案盤點'" class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">專案名稱 :</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" v-model="details.ProjectName" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend">盤點類型：</div>
            <div class="check_section">
              <template v-for="(item, index) in PlanType" :key="item">
                <div class="form-check d-flex align-items-center">
                  <input type="radio" :id="`no${index}`" name="radio" :value="item" v-model="details.PlanType"
                    :disabled="details.PlanType !== item" />
                  <label :for="`no${index}`">{{ item }}</label>
                </div>
              </template>
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
          <DataTable lazy :first="datagrid.first" :size="'small'" :loading="datagrid.loading" :value="rowData2"
            :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns columnResizeMode="expand"
            showGridlines scrollable scrollHeight="820px" @page="getRangeOfPlan($event, 'page')"
            @sort="getRangeOfPlan($event, 'sort')" paginator :rows="20" :totalRecords="datagrid.totalRecords"
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
                <List_view_button :params="slotProps" />
              </template>
            </Column>
            <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable
              :style="{ 'min-width': item.width }"></Column>
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
  import { PlanType } from "@/assets/js/dropdown";
  import { UpdatePageParameter, createDatagrid, goBack } from "@/assets/js/common_fn";
import { GetAntiForgeryToken } from "@/assets/js/common_api";
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
      const datagridfield = [{
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
      const datagrid = createDatagrid()
      const rowData2 = ref([]);
      onMounted(() => {
        datagrid.rows = 20;
        getDetails();
      });
      // 帶入資料
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`https://localhost:44302/GetDBdata/GetInventoryPlanInfo?id=${IP_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            details.value.PlanStart = details.value.PlanStart.replace(/-/g, '/');
            details.value.PlanEnd = details.value.PlanEnd.replace(/-/g, '/');
            getRangeOfPlan('', 'search');
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
      async function getRangeOfPlan(event, type) {
        datagrid.loading = true;
        const form = new FormData();
        // 將已有的項目AssetsId加入form
        if (details.value.AssetList.length !== 0) {
          for (const item of details.value.AssetList) {
            form.append('AssetList', item)
          }
        }
        UpdatePageParameter(datagrid,event,type,form)
        const token = await GetAntiForgeryToken();
        axios.post('https://localhost:44302/StocktakingMng/RangeOfPlan',form,{
          headers:{
            'RequestVerificationToken': token,
          }
        })
        .then((response)=>{
          const data = response.data
          if(data.state === 'success') {
            console.log('盤點範圍:',data.resultList.rows);
            datagrid.totalRecords =  data.resultList.total
            rowData2.value =  data.resultList.rows
          } else {
            // state為error
            alert(data.messages);
          }
        })
        .catch((error)=>{
          console.error(error);
        })
        datagrid.loading = false;
      }
      function calculateIndex(slotProps) {
        return String(datagrid.first + slotProps.index + 1).padStart(2, '0');
      }
      return {
        details,
        searchParams,
        datagridfield,
        datagrid,
        rowData2,
        PlanType,
        getRangeOfPlan,
        calculateIndex,
        goBack,
      };
    },
  }
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";

.main_section {
  .readonly_box {
    @include readonly_box;
  }

  input {
    @include dropdown_btn;
    height: 35px;
  }
  .info_wrap {
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
        .input-number {
          @include count_btn;
        }

        .form-control {
          height: 35px;
          border-radius: 0;
        }
        .check_section {
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
        .input-group-prepend {
          white-space: nowrap;
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 162px;
          text-align: end;
        }
      }
    }

    .button_wrap {
      display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
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
        background-color: #526f8e;
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

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      margin: auto;
      width: 800px;
      .check_section {
        gap: 10px;
        display: flex;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      margin: auto;
      padding: 0 5%;
      .check_section {
        gap: 10px;
        display: flex;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .info_wrap {
      padding: 1% 5% 0;
      .content {
        .input-group {
          flex-direction: column;
          .form-control {
            width: 100%;
            margin-left: unset !important;
          }
          .input-group-prepend {
            margin-bottom: 5px;
            text-align: left;
          }
        }
      }
    }
  }

  .check_section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 5px;
    margin-left: 0 !important;
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