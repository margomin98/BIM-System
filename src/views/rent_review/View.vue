<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出庫審核檢視</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>單號：{{ details.AO_ID}}</p>
        </div>
        <div>
          <p>申請人員：{{ details.Applicant}}</p>
        </div>
        <div>
          <p>申請日期：{{ details.ApplicationDate}}</p>
        </div>
      </div>
      <form>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputTitle1" class="form-label use"><p>用&ensp;&ensp;&ensp;&ensp;途</p></label>
            <div class="option">
              <div class='content'>
                <div class="form-check" v-for="(option, index) in options" :key="index">
                  <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)" v-model="details.Use" :disabled="option !== details.Use && details.Use !== ''">
                  <label class="form-check-label" :for="'radio' + (index + 1)">{{ option }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0 project_details">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>專案代碼</p></label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box" id="inputWithButton" readonly v-model=" details.ProjectCode" />
            </div>
          </div>
          <div class=" col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name" id="project_name"><p>專案名稱</p></label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box" id="inputWithTitle" readonly v-model=" details.ProjectName" />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label"><p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p></label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model=" details.Description"></textarea>
            </div>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>資產出庫項目</p>
        </div>
      </div>
      <div class="second_content">
        <DataTable :size="'small'" :value="rowData1" resizableColumns columnResizeMode="expand" showGridlines scrollable scroll-height="600px">
          <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        </DataTable>
      </div>
      <div class="fixed_info">
        <div>
          <p>資產出庫細項</p>
        </div>
      </div>
      <div class="third_content">
        <DataTable :size="'small'" :value="rowData2" resizableColumns columnResizeMode="expand" showGridlines scrollable scroll-height="600px">
          <Column>
            <template #body="slotProps">
                  <AssetsView :params="slotProps"/>
</template>
        </Column>
        <Column v-for="item in datagrid2field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        </DataTable>
      </div>
      <div class="fixed_info_count">
        <div>
          <p>總出庫數量：{{ totalNeed}} 個</p>
        </div>
        <div>
          <p>已備數量：{{ totalSelect}} 個</p>
        </div>
      </div>
      <div class='fourth_content'>
        <div class="fixed_info">
          <div>
            <p>備料簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>備料人員</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly> {{ details.PreparedPerson }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備註</p></label>
            <div class="input-group" id='readonly_box'>
              <textarea class="form-control readonly_box" readonly v-model="details.PrepareMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class='five_content'>
        <div class="fixed_info">
          <div>
            <p>審核簽章</p>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>審核人員</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.VerifyPerson}} </p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>審核結果</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly> {{ details.VerifyResult }}</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>審核日期</p></label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly> {{ details.VerifyDate }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>審核意見</p></label>
            <div class="input-group" >
              <textarea class="form-control readonly_box" id="inputTextarea" readonly v-model="details.VerifyMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <!-- <button class="send_btn" :class="{send_btn_disabled: !isVerified}" @click="submit" :disabled="isVerified">送出</button> -->
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
  import AssetsView from "@/components/Rent_process_new_view_button.vue"
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
    data() {
      return {
        rowHeight: 35,
      };
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AO_ID = route.query.search_id;
      const totalNeed = ref(0); //總所需數量
      const totalSelect = ref(0); //總已備數量
      const details = ref({});
      const options = Rent_UseArray;
      const datagrid1field = [{
          header: "項目",
          field: "id",
          width: '50px'
        },
        {
          header: "設備總類",
          field: "EquipTypeName",
          width: '150px'
        },
        {
          header: "設備分類",
          field: "EquipCategoryName",
          width: '150px'
        },
        {
          header: "物品名稱",
          field: "ProductName",
          width: '140px'
        },
        {
          header: "數量",
          field: "Number",
          width: '50px'
        },
        {
          header: "規格需求",
          field: "RequiredSpec",
          width: '250px'
        },
      ]
      const datagrid2field = [{
          header: "項目",
          field: "OM_List_id",
          width: '50px'
        },
        {
          header: "資產編號",
          field: "AssetsId",
          width: '100px'
        },
        {
          header: "資產名稱",
          field: "AssetName",
          width: '150px'
        },
        {
          header: "數量",
          field: "OM_Number",
          width: '50px'
        },
        {
          header: "單位",
          field: "OM_Unit",
          width: '50px'
        },
        {
          header: "儲位區域",
          field: "AreaName",
          width: '150px'
        },
        {
          header: "儲位櫃位",
          field: "LayerName",
          width: '150px'
        },
        {
          header: "廠商",
          field: "VendorName",
          width: '150px'
        },
        {
          header: "型號",
          field: "ProductType",
          width: '150px'
        },
        {
          header: "規格",
          field: "ProductSpec",
          width: '250px'
        },
      ]
      const rowData1 = ref([]);
      const rowData2 = ref([]);
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
      onMounted(() => {
        getDetails();
      });
      return {
        totalNeed,
        totalSelect,
        details,
        options,
        datagrid1field,
        datagrid2field,
        rowData1,
        rowData2,
        goBack,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .option {
  @include readonly_box;
  height: 100%;
  width: 100%;
  align-items: center;
}
.input-group,
.project_details #project_name {
  height: 100%;
}
.readonly_box {
  @include readonly_box;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.button_wrap {
  display: flex;
  justify-content: center;
  margin: 30px auto 5%;
  .back_btn {
    @include back_to_previous_btn;
    &:hover {
      background-color: #5d85bb;
    }
  }
}
.main_section {
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
        margin-bottom: 0;
      }
    }
    .fixed_info:nth-child(5) {
      border-top: unset;
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
    .fourth_content {
      border-left: 1px solid black;
      border-right: 1px solid black;
      .fixed_info {
        border: none;
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
        }
      }
    }
    .five_content {
      border-left: 1px solid black;
      background: white;
      border-bottom: 1px solid black;
      .fixed_info {
        border: none;
        border-right: 1px solid black;
      }
      .form-check {
        margin-left: 10px;
      }
      .form-control {
        border-radius: 0;
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
        p {
          margin-bottom: 0;
          text-align: center;
        }
      }
      .wrap:nth-child(1) {
        textarea {
          background-color: #b4b4b4;
          border: none;
        }
      }
      .wrap:nth-child(2) {
        .input-group {
          gap: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
        }
      }
    }
    form {
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;
      .row:nth-child(1),
      .row:nth-child(2) {
        .input-group input {
          text-align: center;
        }
      }

      .form-check {
        margin-left: 10px;
      }
      .form-control {
        border-radius: 0;
      }
      .wrap {
        background: white;
        border-bottom: 1px solid black;
        align-items: center;

        .option {
          height: 100%;
          width: 100%;
        }
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
        padding: 0 30px;
        p {
          width: 100px;
          margin-bottom: 0;
          text-align: center;
        }
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
  .main_section {
    #readonly_box {
      background-color: #b4b4b4;
      border-left: black 1px solid;
    }
    .info_wrap {
      width: 1000px;
      .fixed_info {
        p {
          font-size: 20px;
        }
      }

      .fourth_content {
        .wrap {
          border-bottom: 1px solid black;
        }
        .form-label {
          height: 50px;
          width: 115px;
        }
        .wrap:nth-child(1) {
          border-right: 1px solid black;
        }
        .wrap:nth-child(2) #readonly_box {
          height: 100%;
          width: 100%;
          background-color: #b4b4b4;
          text-align-last: left;
        }
        #readonly_box {
          display: flex;
          align-items: center;
          textarea {
            height: 100%;
            text-align: center;
          }
        }
      }
      .five_content {
        .form-control {
          height: auto;
          padding: 5px 10px 0;
        }

        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 100px;
        }

        .wrap:nth-child(2) {
          border-left: 1px solid black;
          label {
            width: 100px;
          }
          .input-group {
            border-left: 1px solid black;
            border-right: 1px solid black;
          }
        }
        .wrap:nth-child(3) {
          border-right: 1px solid black;
          #readonly_box {
            border-left: 1px solid black;
          }
        }
        .row:nth-child(3) .input-group {
          border-left: 1px solid black;
          border-right: 1px solid black;
          background-color: #b4b4b4;
        }
      }
      .wrap:nth-child(2) .input-group input,
      .wrap:nth-child(1) .input-group input {
        border-left: 1px solid black;
      }
      form {
        .row:nth-child(3) {
          .input-group {
            padding: 0 !important;
            textarea {
              padding: 5px 10px 0;
            }
          }
        }

        .wrap {
          label.use {
            border-right: 1px solid black;
          }
          .option {
            @include readonly_box;
            align-items: center;
            display: flex;
            .content {
              display: flex;
            }
          }
          .project_name {
            border-left: 1px solid black;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    #readonly_box {
      background-color: #b4b4b4;
      border-left: black 1px solid;
    }
    .info_wrap {
      padding: 0 5%;
      .fixed_info {
        p {
          font-size: 20px;
        }
      }

      .fourth_content {
        .wrap {
          border-bottom: 1px solid black;
        }
        .form-label {
          height: 50px;
          width: 115px;
        }
        .wrap:nth-child(1) {
          border-right: 1px solid black;
        }
        .wrap:nth-child(2) #readonly_box {
          height: 100%;
          width: 100%;
          background-color: #b4b4b4;
          text-align-last: left;
        }
        #readonly_box {
          display: flex;
          align-items: center;
          textarea {
            height: 100%;
            text-align: center;
          }
        }
      }
      .five_content {
        .form-control {
          height: auto;
          padding: 5px 10px 0;
        }

        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 100px;
        }

        .wrap:nth-child(2) {
          border-left: 1px solid black;
          label {
            width: 100px;
          }
          .input-group {
            border-left: 1px solid black;
            border-right: 1px solid black;
          }
        }
        .wrap:nth-child(3) {
          border-right: 1px solid black;
          #readonly_box {
            border-left: 1px solid black;
          }
        }
        .row:nth-child(3) .input-group {
          border-left: 1px solid black;
          border-right: 1px solid black;
          background-color: #b4b4b4;
        }
      }
      .wrap:nth-child(2) .input-group input,
      .wrap:nth-child(1) .input-group input {
        border-left: 1px solid black;
      }
      form {
        .row:nth-child(3) {
          .input-group {
            padding: 0 !important;
            textarea {
              padding: 5px 10px 0;
            }
          }
        }

        .row:nth-child(3) {
          textarea {
            padding: 0 10px;
          }
        }

        .wrap {
          label.use {
            border-right: 1px solid black;
          }
          .option {
            @include readonly_box;

            align-items: center;
            display: flex;
            .content {
              display: flex;
            }
          }
          .project_name {
            border-left: 1px solid black;
          }
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

      .fourth_content {
        border-bottom: 1px solid black;

        #readonly_box {
          background-color: #b4b4b4;
        }
        .wrap:nth-child(2) #readonly_box {
          width: 100%;
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
          p {
            font-size: 18px;
          }
        }
      }
      .five_content {
        .form-control {
          border-right: 1px solid black;
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
          height: 30px;
          width: 100%;
          border-bottom: 1px solid black;
          p {
            font-size: 18px;
          }
        }
        .wrap:nth-child(3),
        .wrap:nth-child(1) {
          border-right: 1px solid black;
        }

        .wrap:nth-child(2) {
          border-right: 1px solid black;
          .input-group {
            padding: 5px;
          }
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
            height: 100%;
            width: 100%;
            font-size: 18px;
            background: #b4b4b4;
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
          p {
            font-size: 18px;
          }
        }
      }
    }
  }
}

</style>
