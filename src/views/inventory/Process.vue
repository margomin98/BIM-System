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
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="details.ProjectName" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend">盤點類型：</div>
            <div class="check_section">
              <template v-for="(item , index) in PlanType" :key="item">
                  <div class="form-check d-flex align-items-center">
                    <input type="radio" :id="`no${index}`" name="radio" :value="item" v-model="details.PlanType" :disabled="details.PlanType !== item" />
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
        <div class="search_wrap col">
          <div class="title">
            <div>
              <p>掃描盤點</p>
            </div>
          </div>
          <div class="content">
            <div class="col">
              <div class="input-group">
                <div class="search_section">
                  <div class="input-wrapper">
                    <input ref="myInput" placeholder="請掃描資產編號" class="text-center" v-model="InputAssetsId" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col button">
              <button class="search_btn" @click="getDatagrid('','search');">
                  搜索
                </button>
              <button class="empty_btn" @click="clear">清空</button>
            </div>
          </div>
        </div>
        <div style="height;: 100%">
          <DataTable :key="datakey" lazy :first="datagrid1.first" :size="'small'" :loading="datagrid1.loading" :value="rowData" :sort-field="datagrid1.sortField" :sort-order="datagrid1.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable
            scrollHeight="820px" @page="getDatagrid($event , 'page')" @sort="getDatagrid($event , 'sort')" paginator :rows="20" :totalRecords="datagrid1.totalRecords" paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 50px" header="項目">
<template #body="slotProps">
   {{ calculateIndex(slotProps) }}
</template>
            </Column>
            <Column
              field="Status"
              header="狀態"
              sortable
              style="min-width: 80px"
            ></Column>
            <Column style="min-width: 60px">
<template #body="slotProps">
  <!-- Add the custom component here -->
  <List_view_button :params="slotProps" />
</template>
            </Column>
            <Column
              field="ReceivableNum"
              header="應盤"
              style="min-width: 60px"
            ></Column>
            <Column style="min-width: 60px">
<template #body="slotProps">
  <!-- Add the custom component here -->
  <Inventory_process_button :params="slotProps" @update="update" v-show="slotProps.data.IsConsumables" />
</template>
            </Column>
            <Column header="實盤" style="min-width: 60px">
<template #body="slotProps">
  <!-- Add the custom component here -->
  <Inventory_number :params="slotProps" @takeParams="takeParams" />
</template>
            </Column>
            <Column
              v-for="item in datagrid1field"
              :field="item.field"
              :header="item.header"
              sortable
              :style="{'min-width': item.width}"
            ></Column>
          </DataTable>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button
          class="send_btn"
          data-bs-toggle="modal"
          data-bs-target="#confirmModal"
        >
          盤點完成
        </button>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          即將結束盤點作業，按下確認後即無法變更盤點內容
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="submit"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Navbar from "@/components/Navbar.vue";
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Inventory_process_button from "@/components/Inventory_process_button.vue"
  import Inventory_number from "@/components/Inventory_process_number_input.vue"
  import List_view_button from "@/components/Inventory_view_button.vue"
  import {
    onMounted,
    reactive,
    ref,
    watch,
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import {
    goBack,
    canEnterPage,
    createDatagrid,
    UpdatePageParameter,
  } from "@/assets/js/common_fn";
  import {
    PlanType
  } from "@/assets/js/dropdown";
  import {
    Inventory_Process_Status
  } from '@/assets/js/enter_status'
  import axios from '@/axios/tokenInterceptor';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      Inventory_process_button,
      Inventory_number,
      List_view_button,
    },
    setup() {
      const datakey = ref(1);
      const details = ref({}); // 上半部帶入資料
      const route = useRoute();
      const router = useRouter();
      const InputAssetsId = ref('');
      const inventoryParams = reactive({
        I_Id: -1,
        ActualNum: '', //*才能接null或空白
        Discrepancy: '', //*才能接null或空白
      });
      const myInput = ref(null);
      const IP_ID = route.query.search_id;
      const datagrid1 = createDatagrid();
      const datagrid1field = [{
          field: 'Discrepancy',
          header: '差異',
          width: '80px',
        },
        {
          field: 'Unit',
          header: '單位',
          width: '80px',
        },
        {
          field: 'AssetName',
          header: '物品名稱',
          width: '150px',
        },
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
      const rowData = ref([]);
      onMounted(() => {
        datagrid1.rows = 20
        datagrid1.sortOrder = 1
        datagrid1.sortField = 'Status'
        confirmItem();
        myInput.value.focus()
      });
      // 上半部帶入資料 1.確定盤點項目 -> 2.帶入資料 3.帶入盤點datagrid
      // 1.
      async function confirmItem() {
        try {
          const response = await axios.get(`https://localhost:44302/StocktakingMng/GetSystemInventoryItems?id=${IP_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            console.log(data.messages);
            // 確認成功才拿資料
            getDetails();
            getDatagrid('', 'search');
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      // 2.
      async function getDetails() {
        try {
          const response = await axios.get(`https://localhost:44302/GetDBdata/GetInventoryResult?id=${IP_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            // 檢查資料狀態是否可編盤點
            canEnterPage(data.resultList.PlanStatus, Inventory_Process_Status);
            console.log('上半部data 資料如下\n', data.resultList);
            details.value = data.resultList;
            details.value.PlanStart = details.value.PlanStart.replace(/-/g, '/');
            details.value.PlanEnd = details.value.PlanEnd.replace(/-/g, '/');
            // grid.api2.setRowData(details.value.AssetList)
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      // 下半部分盤點範圍datagrid資料
      // 3.
      async function getDatagrid(event, type) {
        const form = new FormData();
        if (InputAssetsId.value.length === 10 || InputAssetsId.value.length === 0) {
          form.append('Input_AssetsId', InputAssetsId.value)
        } else {
          return
        }
        form.append('PlanId', IP_ID)
        UpdatePageParameter(datagrid1, event, type, form)
        try {
          const response = await axios.post('https://localhost:44302/StocktakingMng/PlanItems', form);
          const data = response.data;
          if (data.state === 'success') {
            console.log('下半部datagrid 資料如下\n', data.resultList);
            rowData.value = data.resultList.rows;
            datagrid1.totalRecords = data.resultList.total;
            datakey.value++;
            // 若掃描 QR code
            if (type === 'take' && data.resultList.rows.length > 0) {
              // 若為非耗材
              if (!data.resultList.rows[0].IsConsumables) {
                // InputAssetsId.value = '';
                inventoryParams.I_Id = data.resultList.rows[0].I_Id;
                inventoryParams.ActualNum = '1';
                inventoryParams.Discrepancy = '0';
                takeInventory();
              }
            }
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      // 單項盤點
      async function takeInventory() {
        let requestData = {};
        for (const keyname in inventoryParams) {
          if (inventoryParams[keyname] !== '')
            requestData[keyname] = inventoryParams[keyname]
        }
        console.log('單項盤點requestData:', requestData);
        try {
          const response = await axios.post('https://localhost:44302/StocktakingMng/TakeInventory', requestData);
          const data = response.data;
          console.log(data);
          if (data.state === 'success') {
            getDatagrid('', 'search');
            datakey.value++;
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      // 送出
      async function submit() {
        const requestData = {
          PlanId: IP_ID,
        };
        console.log('submit requestData', requestData);
        try {
          const response = await axios.post('https://localhost:44302/StocktakingMng/InventoryCompleted', requestData);
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages + '\n';
            msg += '單號為:' + data.resultList.IP_Id;
            alert(msg);
            router.push({
              name: 'Inventory_Datagrid'
            });
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      watch(() => InputAssetsId.value, (newValue, oldValue) => {
        // 更新datagrid，如果是資產 call 盤點function
        console.log('new:' + newValue + ' old:' + oldValue);
        if (newValue.length === 20) {
          InputAssetsId.value = newValue.slice(10)
        }
        if (newValue !== '') {
          getDatagrid('', 'take');
        }
      }, {
        immediate: false
      });
      const clear = () => {
        InputAssetsId.value = '';
        getDatagrid('', 'search');
      }
      function update(data) {
        inventoryParams.I_Id = data.I_Id;
        inventoryParams.ActualNum = data.ReceivableNum.toString();
        inventoryParams.Discrepancy = '0';
        takeInventory();
      }
      function takeParams(data, Actual) {
        // 傳送 實盤-應盤數量
        let Discrepancy = (Actual - data.ReceivableNum).toString()
        if (!Actual) {
          Discrepancy = '';
        }
        inventoryParams.I_Id = data.I_Id;
        inventoryParams.ActualNum = Actual;
        inventoryParams.Discrepancy = Discrepancy;
        takeInventory();
      }
      function calculateIndex(slotProps) {
        return String(datagrid1.first + slotProps.index + 1).padStart(2, '0');
      }
      return {
        datakey,
        details,
        inventoryParams,
        InputAssetsId,
        myInput,
        datagrid1,
        datagrid1field,
        rowData,
        PlanType,
        getDatagrid,
        submit,
        clear,
        update,
        takeParams,
        calculateIndex,
        goBack,
      };
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .readonly_box {
  @include readonly_box;
}
  .main_section {
  input {
    @include dropdown_btn;
    height: 35px;
  }

  .info_wrap {
    margin: auto;
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
          p {
            text-align: left;
            padding: 0 10px;
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
    &:nth-child(3) {
      margin-top: 3%;
    }
  }
}
.button_wrap {
  display: flex;
            justify-content: space-between;
            margin: 30px auto 5%;
            width: 240px;
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
.search_wrap {
  margin-bottom: 20px;
  .title {
    display: flex;
    justify-content: space-around;
    background: #3d4e61;
    color: white;
    font-size: 25px;
    font-weight: 700;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    height: 50px;
  }
  .content {
    background-color: #c3d3da !important;
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
    width: 100%;
    padding: 0 20%;
    input {
      @include dropdown_btn;
      width: 100%;
      height: 35px;
    }
  }
}
#confirmModal {
  .modal-content {
    border-radius: 0;
    border: 1px solid black;
    .modal-body {
      background: #528091;
      color: white;
      font-weight: 700;
      text-align: center;
      padding: 20px 10px;
      border-bottom: 1px solid black;
    }
    .modal-footer {
      padding: 10px;
      gap: 5px;
      background: white;
      width: 100%;
      display: flex;
      justify-content: center;
      border-radius: 0;
      button:nth-child(1) {
        font-weight: 700;
        border: none;
        &:hover {
          background: #636260;
        }
      }
      button:nth-child(2) {
        background: #132238;
        font-weight: 700;
        border: none;
        &:hover {
          background: #426497;
        }
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
  .modal-content {
    width: 300px;
    margin: auto;
  }
  .main_section {
    .info_wrap {
      margin: auto;
      padding: 0 20%;
      .check_section {
        gap: 10px;
        display: flex;
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .modal-content {
    width: 300px;
    margin: auto;
  }
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
      .fixed_info {
        flex-direction: column;
        height: unset;
        padding: 10px;
      }
      .content {
        .row {
          gap: 10px 0;
        }
        .dropdown {
          margin-left: unset !important;
        }
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
      &:nth-child(3) {
        .count {
          .number-input-box {
            width: 100%;
            margin-left: unset !important;
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
  }
  .search_wrap {
    .title {
      p {
        margin-bottom: 0;
      }
    }
  }
  .search_section {
    padding: unset !important;
  }
}

</style>