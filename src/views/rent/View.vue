<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        檢視出庫填報
      </h1>
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
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>專案代碼</p></label>
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly>{{ details.ProjectCode }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label" id='project_name'><p>專案名稱</p></label>
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly>{{ details.ProjectName }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style='border:none'>
            <label for="inputTextarea" class="form-label"><p>説&ensp;&ensp;&ensp;&ensp;明</p></label>
            <textarea id='readonly_box' class='readonly_box' readonly>{{ details.Description }}</textarea>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>資產出庫項目</p>
        </div>
      </div>
      <div class='third_content'>
        <DataTable :size="'small'" :value="rowData" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" paginator :rows="20" @page="updatePage" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
          <Column style="min-width:50px;" header="項目">
            <template #body="slotProps">
              {{ calculateIndex(slotProps) }}
</template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        </DataTable>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
    </div>
  </div>
</template>

<script>
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import Navbar from '@/components/Navbar.vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import {
    Rent_UseArray
  } from "@/assets/js/dropdown";
  import {
    goBack,
    createDatagrid
  } from "@/assets/js/common_fn";
  import {
    onMounted,
    ref
  } from 'vue';
  export default {
    components: {
      Navbar,
      Column,
      DataTable,
    },
    setup() {
      const datagrid = createDatagrid();
      const datagridfield = [{
          field: 'EquipTypeName',
          header: '設備總類',
          width: '150px'
        },
        {
          field: 'EquipCategoryName',
          header: '設備分類',
          width: '150px'
        },
        {
          field: 'ProductName',
          header: '物品名稱',
          width: '150px'
        },
        {
          field: 'Number',
          header: '數量',
          width: '100px'
        },
        {
          field: 'RequiredSpec',
          header: '規格需求',
          width: '250px'
        },
      ]
      const rowData = ref([]);
      const route = useRoute();
      const router = useRouter();
      const AO_ID = route.query.search_id;
      const details = ref({});
      const options = Rent_UseArray;
      onMounted(() => {
        getDetails();
      });
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            rowData.value = data.resultList.ItemList;
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
      function updatePage(event) {
        datagrid.first = event.first;
      }
      function calculateIndex(slotProps) {
        return String(datagrid.first + slotProps.index + 1).padStart(2, '0');
      }
      return {
        datagridfield,
        rowData,
        details,
        options,
        updatePage,
        calculateIndex,
        goBack,
      };
    },
    data() {
      return {
        rowHeight: 35,
        pageSize: 15
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .readonly_box {
    @include readonly_box;
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        width: 1000px;
        #readonly_box {
          border-left: black 1px solid;
        }
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
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            label.use {
              border-right: 1px solid black;
            }
            .option {
              @include readonly_box;
              height: 100%;
              width: 100%;
              align-items: center;
              display: flex;
              .content {
                display: flex
              }
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
        .input-group {
          height: 100%;
        }
      }
      #project_name {
        border-left: 1px solid black;
      }
      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
        button {
          @include back_to_previous_btn;
          &:hover {
            background-color: #5d85bb;
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        padding: 0 5%;
        #readonly_box {
          border-left: 1px solid black;
        }
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
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            label.use {
              border-right: 1px solid black;
            }
            .option {
              @include readonly_box;
              height: 100%;
              width: 100%;
              align-items: center;
              display: flex;
              .content {
                display: flex
              }
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
        .input-group {
          height: 100%;
        }
      }
      #project_name {
        border-left: 1px solid black;
      }
      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
        button {
          @include back_to_previous_btn;
          &:hover {
            background-color: #5d85bb;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        padding: 0 5%;
        .fixed_info {
          @include fixed_info;
          background: #528091;
          border-radius: 0;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          flex-direction: column;
          height: unset;
          padding: 10px;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .column_section {
          flex-direction: column;
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .row:nth-child(3) {
            textarea {
              padding: 10px;
            }
          }
          .form-check {
            margin-left: 10px;
          }
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            flex-direction: column;
            label.use,
            .form-label {
              border-bottom: 1px solid black;
              width: 100%;
              height: 30px;
            }
            .option {
              height: 100%;
              width: 100%;
              font-size: 18px;
              background: #B4B4B4;
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
      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
        button {
          @include back_to_previous_btn;
          &:hover {
            background-color: #5d85bb;
          }
        }
      }
    }
  }
</style>