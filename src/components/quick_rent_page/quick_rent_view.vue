<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產出庫檢視</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>單號：{{ details.AO_ID }}</p>
        </div>
        <div>
          <p>申請人員：{{ details.Applicant }}</p>
        </div>
        <div>
          <p>申請日期：{{ details.ApplicationDate }}</p>
        </div>
      </div>
      <form>
        <div class="row g-0">
          <div class="col d-flex wrap column_section">
            <label for="inputTitle1" class="form-label use">
              <p>用&ensp;&ensp;&ensp;&ensp;途</p>
            </label>
            <div class="option">
              <div class='content'>
                <div class="form-check" v-for="(option, index) in options" :key="index">
                  <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)"
                    v-model="details.Use" :disabled="option !== details.Use && details.Use !== ''">
                  <label class="form-check-label" :for="'radio' + (index + 1)">{{ option }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0 project_details">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>專案代碼</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.ProjectCode }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name" id="project_name">
              <p>專案名稱</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.ProjectName }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label">
              <p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p>
            </label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model="details.Description"></textarea>
            </div>
          </div>
        </div>
      </form>
      <div class="second_content">
        <div class="fixed_info">
          <div>
            <p>資產出庫項目</p>
          </div>
        </div>
        <div>
          <DataTable :size="'small'" :value="rowData1" resizableColumns columnResizeMode="expand" showGridlines
            scrollable scroll-height="420px">
            <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable
              :style="{ 'min-width': item.width }"></Column>
          </DataTable>
        </div>
      </div>
      <div class="third_content">
        <div class="fixed_info">
          <div>
            <p>資產出庫細項</p>
          </div>
        </div>
        <DataTable :size="'small'" :value="rowData2" resizableColumns columnResizeMode="expand" showGridlines scrollable
          scroll-height="600px">
          <Column header="交付確認" class="datatable_checkbox">
            <template style="min-width:50px; " #body="slotProps">
              <input type="checkbox" class="p-checkbox p-component" :checked="slotProps.data.OM_IsExecute" disabled>
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <AssetsView :params="slotProps" />
            </template>
          </Column>
          <Column v-for="item in datagrid2field" :field="item.field" :header="item.header" :sortable="item.sortable"
            :style="{ 'min-width': item.width }"></Column>
        </DataTable>
      </div>
      <div class="fixed_info_count">
        <div>
          <p>總出庫數量：{{ totalNeed }}個</p>
        </div>
        <div>
          <p>已備數量：{{ totalSelect }}個</p>
        </div>
      </div>
      <div class="fourth_content">
        <div class="fixed_info">
          <div>
            <p>備料簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>備料人員</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.PreparedPerson }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>備料完成日期</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.PrepareDate }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>備料備註</p>
            </label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model="details.PrepareMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="five_content">
        <div class="fixed_info">
          <div>
            <p>審核簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>審核人員</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly> {{ details.VerifyPerson }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>審核結果</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly style="margin-bottom: 0;"> {{ details.VerifyResult }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>審核日期</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.VerifyDate }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>審核意見</p>
            </label>
            <div class="input-group" id="readonly_box">
              <textarea class="readonly_box form-control" readonly>{{ details.VerifyMemo }}</textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="six_content">
        <div class="fixed_info">
          <div>
            <p>交付簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>領用人員</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.Recipient }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label">
              <p>交付人員</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.DeliveryOperator }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name" id="done_date">
              <p>交付完成日期</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.DeliveryDate }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0 process_memo">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label" id="memo">
              <p>交付備註</p>
            </label>
            <div class="input-group" id="memo_input">
              <textarea class="form-control readonly_box" readonly v-model="details.DeliveryMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AssetsView from '@/components/Rent_process_new_view_button'
import {
  useRoute,
  useRouter
} from 'vue-router';
import Navbar from "@/components/Navbar.vue";
import {
  Rent_UseArray
} from "@/assets/js/dropdown";
import {
  onMounted,
  ref
} from "vue";
import {
  goBack
} from "@/assets/js/common_fn"
import axios from '@/axios/tokenInterceptor';
export default {
  components: {
    Navbar,
    Column,
    DataTable,
    AssetsView,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const AO_ID = route.query.search_id;
    const totalNeed = ref(0); //總所需數量
    const totalSelect = ref(0); //總已備數量
    const details = ref({});
    const options = Rent_UseArray;
    // 資產出庫項目
    const datagrid1field = [{
      field: "id",
      width: '50px',
      header: "項目"
    },
    {
      field: "EquipTypeName",
      width: '150px',
      header: "設備總類"
    },
    {
      field: "EquipCategoryName",
      width: '150px',
      header: "設備分類"
    },
    {
      field: "ProductName",
      width: '150px',
      header: "物品名稱"
    },
    {
      field: "Number",
      width: '100px',
      header: "數量"
    },
    {
      field: "RequiredSpec",
      width: '250px',
      header: "規格需求"
    },
    ]
    // 資產出庫細項
    const datagrid2field = [{
      field: "OM_List_id",
      width: '50px',
      header: "需求項目",
      sortable: false,
    },
    {
      field: "OM_Number",
      width: '30px',
      header: "數量",
      sortable: false,
    },
    {
      field: "OM_Unit",
      width: '30px',
      header: "單位",
      sortable: false,
    },
    {
      field: "AssetsId",
      width: '150px',
      header: "資產編號",
      sortable: true,
    },
    {
      field: "AssetName",
      width: '150px',
      header: "物品名稱",
      sortable: true,
    },
    {
      field: "AreaName",
      width: '150px',
      header: "儲位區域",
      sortable: true,
    },
    {
      field: "LayerName",
      width: '150px',
      header: "儲位櫃位",
      sortable: true,
    },
    {
      field: "VendorName",
      width: '150px',
      header: "廠商",
      sortable: true,
    },
    {
      field: "ProductType",
      width: '150px',
      header: "型號",
      sortable: true,
    },
    {
      field: "ProductSpec",
      width: '150px',
      header: "規格",
      sortable: true,
    },
    ]
    const rowData1 = ref([]);
    const rowData2 = ref([]);
    onMounted(() => {
      getDetails();
    });
    async function getDetails() {
      try {
        const response = await axios.get(`https://localhost:44302/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('Details Get成功 資料如下\n', data.resultList);
          details.value = data.resultList;
          rowData1.value = data.resultList.ItemList;
          rowData2.value = data.resultList.OM_List;
          totalNeed.value = 0;
          rowData1.value.forEach(item => {
            totalNeed.value += item.Number;
          });
          totalSelect.value = 0;
          rowData2.value.forEach(item => {
            totalSelect.value += item.OM_Number;
          });
        } else if (data.state === 'error') {
          alert(data.messages);
        }
      } catch (error) {
        console.error(error);
      }
    }
    function calculateIndex(slotProps) {
      return String(slotProps.index + 1).padStart(2, '0');
    }
    return {
      datagrid1field,
      datagrid2field,
      totalNeed,
      totalSelect,
      details,
      options,
      rowData1,
      rowData2,
      calculateIndex,
      goBack,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.readonly_box {
  @include readonly_box;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

textarea.readonly_box {
  resize: vertical;
}

.input-group,
.project_details #project_name {
  height: 100%;
}

.button_wrap {
  display: flex;
  justify-content: center;
  margin: 30px auto 5%;
  width: 220px;

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
        background-color: #5d85bd;
      }
    }
  }
}

.main_section {
  .fixed_info_count {
    display: flex;
    background: #3d5c67;
    color: white;
    font-weight: 700;
    align-items: center;
    height: 40px;
    border-radius: 0;
    border-bottom: 1px solid black;
    padding: 0 10px;
    justify-content: right;
    gap: 10px;

    p {
      font-size: 15px;
      margin-bottom: 0;
    }
  }

  .info_wrap {
    margin: auto;

    .fixed_info {
      @include fixed_info;
      background: #528091;
      border-radius: 0;
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;

      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    .third_content {
      .fixed_info {
        border-top: none !important;
      }
    }

    .fourth_content {
      border-left: 1px solid black;
      border-right: 1px solid black;
      background: white;

      .fixed_info {
        border-bottom: 1px solid black;
      }

      .form-check {
        margin-left: 10px;
      }

      .form-control {
        height: auto;
        border-radius: 0;
      }

      .form-label {
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
        align-items: center;
        margin: 0;
        display: flex;
        justify-content: center;

        p {
          margin-bottom: 0;
          font-size: 18px;
          text-align: center;
        }
      }
    }

    .five_content {
      border-left: 1px solid black;

      .form-check {
        margin-left: 10px;
      }

      .form-control {
        height: auto;
        border-radius: 0;
        padding: 0;
      }

      .wrap {
        background: white;
        border-top: 1px solid black;
        align-items: center;
      }

      .form-label {
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
        height: 50px;
        align-items: center;
        margin: 0;
        display: flex;
        justify-content: center;

        p {
          font-size: 18px;
          margin-bottom: 0;
          text-align: center;
        }
      }
    }

    .six_content {
      .form-check {
        margin-left: 10px;
      }

      .form-control {
        height: auto;
        border-radius: 0;
        border-bottom: 0;
      }

      .wrap {
        background: white;
        border-top: 1px solid black;
        align-items: center;
      }

      .form-label {
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
        align-items: center;
        margin: 0;
        display: flex;
        justify-content: center;
        padding: 0 10px;

        p {
          margin-bottom: 0;
          text-align: center;
          font-size: 18px;
        }
      }
    }

    form {
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;

      .form-check {
        margin-left: 10px;
      }

      .form-control {
        height: auto;
        border-radius: 0;
      }

      .wrap {
        background: white;
        border-bottom: 0.5px solid black;
        align-items: center;

        .option {
          @include readonly_box;
          height: 100%;
          width: 100%;
          align-items: center;
          display: flex;
        }
      }

      .form-label {
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
        align-items: center;
        margin: 0;
        display: flex;
        justify-content: center;

        p {
          width: 100px;
          margin-bottom: 0;
          font-size: 18px;
          text-align: center;
        }
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      width: 1000px;

      #readonly_box {
        background-color: #b4b4b4;
        border-left: black 1px solid;
      }

      .fourth_content {
        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 150px;
        }

        #readonly_box {
          border-right: 1px solid black;

          textarea {
            padding: 0;
          }
        }

        .wrap:nth-child(3) #readonly_box {
          border-right: none;
        }
      }

      .five_content {
        border-bottom: 1px solid black;

        .fixed_info {
          border: none;
          border-top: 1px solid black;
          border-right: 1px solid black;
        }

        .form-label {
          padding: 0 16px;
          width: 120px;
        }

        .wrap:nth-child(1) #readonly_box,
        .wrap:nth-child(3) #readonly_box {
          border-right: 1px solid black;
        }

        .wrap:nth-child(2) {
          label {
            width: 205px;
          }

          .input-group {
            border-left: 1px solid black;
            border-right: 1px solid black;
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 5px;
          }
        }
      }

      .six_content {
        .process_memo {
          border-bottom: 1px solid black;
        }

        .fixed_info {
          border: none;
          border-right: 1px solid black;
        }

        .form-control {
          padding: 5px 10px 0;
        }

        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 159px;
        }

        .wrap:nth-child(2) {
          label {
            width: 220px;
          }

          #readonly_box {
            border-right: 1px solid black;
          }
        }

        .wrap:nth-child(3) {
          border-right: 1px solid black;
        }

        .wrap:nth-child(1) {
          border-left: 1px solid black;

          border-right: 1px solid black;

          .input-group {
            border-left: 1px solid black;
            background: #b4b4b4;
          }

          #memo {
            width: 123px;
          }
        }
      }

      form {
        .row:nth-child(3) {
          .input-group {
            padding: 0 !important;
          }

          textarea {
            padding: 5px 10px 0;
          }
        }

        .form-control {
          padding: 0;
        }

        .wrap {
          label.use {
            border-right: 1px solid black;
          }

          .option {
            .content {
              display: flex;
            }
          }

          .project_name {
            border-left: 1px solid black;
          }
        }

        .form-label {
          height: 50px;
          padding: 0 20px;
          width: 150px;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      padding: 0 5%;

      #readonly_box {
        background-color: #b4b4b4;
        border-left: black 1px solid;
      }

      .fourth_content {
        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 150px;
        }

        #readonly_box {
          border-right: 1px solid black;

          textarea {
            padding: 0;
          }
        }

        .wrap:nth-child(3) #readonly_box {
          border-right: none;
        }
      }

      .five_content {
        border-bottom: 1px solid black;

        .fixed_info {
          border: none;
          border-top: 1px solid black;
          border-right: 1px solid black;
        }

        .form-label {
          padding: 0 16px;
          width: 120px;
        }

        .wrap:nth-child(1) #readonly_box,
        .wrap:nth-child(3) #readonly_box {
          border-right: 1px solid black;
        }

        .wrap:nth-child(2) {
          label {
            width: 205px;
          }

          .input-group {
            border-left: 1px solid black;
            border-right: 1px solid black;
            display: flex;
            justify-content: center;
            align-content: center;
            width: 280px;
          }
        }
      }

      .six_content {
        .process_memo {
          border-bottom: 1px solid black;
        }

        .fixed_info {
          border: none;
          border-right: 1px solid black;
        }

        .form-control {
          padding: 5px 10px 0;
        }

        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 159px;
        }

        .wrap:nth-child(2) {
          label {
            width: 220px;
          }

          #readonly_box {
            border-right: 1px solid black;
          }
        }

        .wrap:nth-child(3) {
          border-right: 1px solid black;
        }

        .wrap:nth-child(1) {
          border-left: 1px solid black;

          border-right: 1px solid black;

          .input-group {
            border-left: 1px solid black;
            background: #b4b4b4;
          }

          #memo {
            width: 123px;
          }
        }
      }

      form {
        .row:nth-child(3) {
          .input-group {
            padding: 0 !important;
          }

          textarea {
            padding: 5px 10px 0;
          }
        }

        .form-control {
          padding: 0;
        }

        .wrap {
          label.use {
            border-right: 1px solid black;
          }

          .option {
            .content {
              display: flex;
            }
          }

          .project_name {
            border-left: 1px solid black;
          }
        }

        .form-label {
          height: 50px;
          padding: 0 20px;
          width: 150px;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .info_wrap {
      padding: 0 5%;

      .fixed_info {
        flex-direction: column;
        height: unset;
        padding: 10px;
      }

      .fourth_content {
        .wrap {
          background: white;
          border-top: 1px solid black;
          align-items: center;
          flex-direction: column;

          .option {
            display: flex;
          }
        }

        .form-label {
          width: 100%;
          height: 30px;
          border-bottom: 1px solid black;
        }
      }

      .five_content {
        border-right: 1px solid black;

        .fixed_info {
          border-top: 1px solid black;
          border-bottom: none;
          border-left: none;
          border-right: none;
        }

        #readonly_box {
          background: #b4b4b4;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          padding: 5px;
        }

        .wrap {
          flex-direction: column;

          .option {
            display: flex;
          }
        }

        .form-label {
          border-bottom: 1px solid black;
          width: 100%;
          height: 30px;
        }
      }

      .six_content {
        border-left: 1px solid black;
        border-bottom: 1px solid black;

        .wrap:nth-child(1) {
          .input-group {
            background: #b4b4b4;
          }
        }

        .fixed_info {
          border-left: none;
        }

        #readonly_box {
          background: #b4b4b4;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }

        .wrap {
          flex-direction: column;
        }

        .form-label {
          border-right: 1px solid black;
          border-bottom: 1px solid black;
          width: 100%;
          height: 30px;
        }

        .input-group {
          border-right: 1px solid black;
        }
      }

      form {
        .wrap {
          flex-direction: column;

          label.use,
          .form-label {
            border-bottom: 1px solid black;
            width: 100%;
            height: 30px;
            justify-content: space-evenly;
          }

          .option {
            font-size: 18px;

            .content {
              padding: 5px;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr;
              gap: 0px 0px;
              grid-auto-flow: row;
              grid-template-areas: ". . ." ". . .";
              white-space: nowrap;
              justify-items: center;

              div {
                width: 90px;
              }
            }
          }
        }

        .form-label {
          padding: 0 30px;
        }
      }
    }
  }
}

</style>
