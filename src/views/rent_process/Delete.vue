<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>刪除項目</h1>
    </div>
    <div class="info_wrap col">
   <warn/>
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
              <div class="content">
                <div class="form-check" v-for="(option, index) in options" :key="index">
                  <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)"
                    v-model="details.Use" :disabled="option !== details.Use && details.Use !== ''" />
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
            <div class="input-group" id="readonly_box">
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
        <DataTable :size="'small'" :value="rowData1" resizableColumns columnResizeMode="expand" showGridlines scrollable
          scroll-height="420px">
          <Column style="min-width: 50px" header="項目">
            <template #body="slotProps">
              {{ calculateIndex(slotProps) }}
            </template>
          </Column>
          <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable
            :style="{ 'min-width': item.width }"></Column>
        </DataTable>
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
            <template style="min-width: 50px" #body="slotProps">
              <input type="checkbox" class="p-checkbox p-component" :checked="slotProps.data.OM_IsExecute" disabled />
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
      <!-- <div class="fourth_content">
        <div class="fixed_info">
          <div>
            <p>備料簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>備料人員</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.PreparedPerson}}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備料完成日期</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.PrepareDate}}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備料備註</p></label>
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
            <label for="inputWithButton" class="form-label"><p>審核人員</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly> {{ details.VerifyPerson }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>審核結果</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly style="margin-bottom: 0;"> {{ details.VerifyResult }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>審核日期</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.VerifyDate }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>審核意見</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.VerifyMemo }}</p>
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
            <label for="inputWithButton" class="form-label"><p>領用人員</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.Recipient}}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>交付人員</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.DeliveryOperator}}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name" id="done_date"><p>交付完成日期</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.DeliveryDate}}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label" id="memo"><p>交付備註</p></label>
            <div class="input-group" id="memo_input">
              <textarea class="form-control readonly_box" readonly v-model="details.DeliveryMemo"></textarea>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">
        刪除
      </button>
    </div>
    <div class="modal fade delete_modal" id="deleteModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-body">確定刪除這筆項目嗎？</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              否
            </button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="deleteData">
              是
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {
  useRoute,
  useRouter
} from 'vue-router';
import warn from "@/components/Delete_warn.vue"
import Storage_add from "@/components/Storage_add_button";
import AssetsView from '@/components/Rent_process_new_view_button'
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
import {
  canEnterPage
} from "@/assets/js/common_fn";
import {
  RentProcess_Delete_Status
} from "@/assets/js/enter_status";
import axios from '@/axios/tokenInterceptor'
export default {
  components: {
    Navbar,
    warn,
    Column,
    DataTable,
    AssetsView,
    Storage_add,
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
        const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
        const data = response.data;
        if (data.state === 'success') {
          canEnterPage(data.resultList.Status, RentProcess_Delete_Status)
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
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
    async function deleteData() {
      const form = new FormData();
      form.append('AO_ID', AO_ID);
      const response = await axios.post(`http://192.168.0.177:7008/AssetsOutMng/ApplicationDelete`, form);
      try {
        const data = response.data;
        if (data.state === 'success') {
          let msg = data.messages + '\n';
          msg += '單號:' + data.resultList.AO_ID;
          alert(msg);
          router.push({
            name: 'Rent_Datagrid'
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
      deleteData,
      calculateIndex,
      goBack,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
textarea {
  padding: 5px 0 0 5px !important;
}

.project_details #project_name {
  height: 100%;
}

.delete_modal {
  .modal-content {
    border: solid 1px black;
    border-radius: 0;

    .modal-body {
      background: #e94b4b;
      text-align: center;
      font-weight: 700;
      color: white;
      border-bottom: solid 1px black;
    }

    .modal-footer {
      margin: auto;
      gap: 10px;

      button:nth-child(1) {
        background-color: #7e7e7e;
        border: none;
        color: white;
        width: 50px;
        font-weight: 700;

        &:hover {
          background-color: #464242;
        }
      }

      button:nth-child(2) {
        background-color: #e94b4b;
        border: none;
        color: white;
        width: 50px;
        font-weight: 700;

        &:hover {
          background-color: #a70e0e;
        }
      }
    }
  }
}

.readonly_box {
  @include readonly_box;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.input-group {
  height: 100%;
}

.option {
  @include readonly_box;
  height: 100%;
  width: 100%;
  align-items: center;
}

span {
  @include red_star;
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;
}

.delete_btn {
  @include delete_btn;
  &:hover {
    background-color: #a51e1e;
  }
}
.back_btn {
  @include back_to_previous_btn;

  &:hover {
    background-color: #5d85bb;
  }
}
.main_section {
  .info_wrap {
    margin: auto;

    .input-group-prepend {
      width: 100% !important;
      text-align: center !important;
    }
    .fixed_info {
      @include fixed_info;
      background: #528091;
      border-radius: 0;
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;

      p {
        margin-bottom: 0;
      }
    }
    .fixed_info:nth-child(5) {
      border-top: unset;
    }
    #readonly_box {
      background-color: #b4b4b4;
    }
    .third_content {
      .fixed_info {
        border-top: unset;
      }
      .list {
        button {
          @include content_delete_button;

          &:hover {
            background: #ff7272;
          }
        }
      }
    }
    .fixed_info_count {
      display: flex;
      background: #3d5c67;
      color: white;
      font-weight: 700;
      align-items: center;
      height: 40px;
      border-radius: 0;
      border-bottom: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;
      padding: 0 10px;
      justify-content: right;
      gap: 10px;

      p {
        font-size: 15px;
        margin-bottom: 0;
      }
    }

    form {
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;

      .row:nth-child(3) {
        textarea {
          padding: 5px 10px 0;
        }
      }

      .form-check {
        margin-left: 10px;
      }

      .form-control {
        height: auto;
        border-radius: 0;
      }

      .wrap {
        background: white;
        border-bottom: 1px solid black;
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
          width: 100px;
          margin-bottom: 0;
          text-align: center;
        }
      }
      .input-group-prepend {
        color: white;
        font-weight: 700;
        font-size: 20px;
        width: 120px;
        text-align: end;
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
  .main_section {
    .modal-content {
      width: 400px;
      margin: auto;
    }

    .info_wrap {
      width: 1000px;

      .option {
        display: flex;
      }

      .fixed_info {
        p {
          font-size: 20px;
        }
      }

      #readonly_box {
        padding: 0;
        border-left: black 1px solid;
      }

      .third_content {
        .list {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
        }
      }

      form {
        .row:nth-child(3) {
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
          padding: 0 20px;
          width: 150px;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .modal-content {
      width: 400px;
      margin: auto;
    }

    .info_wrap {
      padding: 0 5%;

      .option {
        display: flex;
      }

      .fixed_info {
        p {
          margin-bottom: 0;
          font-size: 20px;
        }
      }

      #readonly_box {
        padding: 0;
        border-left: black 1px solid;
      }

      .third_content {
        .list {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
        }
      }

      form {
        .row:nth-child(3) {
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

        p {
          font-size: 18px;
        }
      }

      .third_content {
        .list {
          border: 1px solid black;
        }
      }

      form {
        .form-check {
          font-size: 18px;
        }

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
            font-weight: 700;

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

          p {
            font-size: 18px;
          }
        }
      }
    }
  }
}

</style>
