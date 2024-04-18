<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        刪除項目
      </h1>
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
        <DataTable :size="'small'" :value="rowData" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" paginator @page="updatePage" :rows="20" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
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
      <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
    </div>
    <div class="modal fade delete_modal" id="deleteModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-body">
            確定刪除這筆項目嗎？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">否</button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="deleteData">是</button>
          </div>
        </div>
      </div>
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
  import warn from '@/components/Delete_warn.vue'
  import {
    Rent_UseArray
  } from "@/assets/js/dropdown";
  import {
    onMounted,
    ref
  } from 'vue';
  import {
    goBack,
    canEnterPage,
    createDatagrid
  } from "@/assets/js/common_fn";
  import {
    Rent_Delete_Status
  } from "@/assets/js/enter_status";
import { GetAntiForgeryToken } from '@/assets/js/common_api';
  export default {
    components: {
      Navbar,
      warn,
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
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            canEnterPage(data.resultList.Status, Rent_Delete_Status)
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
      async function deleteData() {
        const form = new FormData();
        form.append('AO_ID', AO_ID);
        const axios = require('axios');
        try {
          const token = await GetAntiForgeryToken();
          const response = await axios.post(`http://192.168.0.177:7008/AssetsOutMng/ApplicationDelete`, form,{
            headers:{
              'RequestVerificationToken': token,
            }
          });
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages + '\n';
            msg += '單號:' + data.resultList.AO_ID;
            alert(msg);
            router.push({
              name: 'Rent_Datagrid'
            });
          } else if (data.state === 'account_error') {
            //尚未登入
            alert(data.messages);
            router.push('/');
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
        deleteData,
        updatePage,
        calculateIndex,
        goBack,
      };
    },
    data() {
      return {
        rowHeight: 35,
      };
    }
  };
</script>

<style lang="scss" scoped>
 @import "@/assets/css/global.scss";
textarea {
  padding: 5px 10px 0;
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

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;
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

.third_content {
  .fixed_info {
    border-top: none !important;
  }
}

.project_details #project_name {
  height: 100%;
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
        font-size: 20px;
        margin-bottom: 0;
      }
    }
    #readonly_box {
      background-color: #b4b4b4;
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
        .input-group {
          padding: 0 !important;
        }
        textarea {
          padding: 5px 10px 0;
        }
      }

      .wrap {
        background: white;
        border-bottom: 0.5px solid black;
        align-items: center;

        .option {
          @include readonly_box;
          height: 100%;
          width: 100%;
          padding: 0 10px;
          .content {
            gap: 0 10px;
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
        padding: 0 20px;
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
    .info_wrap {
      width: 1000px;

      #readonly_box,
      #project_name {
        border-left: black 1px solid;
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
          background: white;
          border-bottom: 0.5px solid black;
          align-items: center;
          label.use {
            border-right: 1px solid black;
          }
          .option {
            display: flex;
            .content {
              display: flex;
            }
          }
          .project_name {
            border-left: 1px solid black;
          }
        }
        .form-label {
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

      #readonly_box,
      #project_name {
        border-left: black 1px solid;
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
        .form-check {
          margin-left: 10px;
        }
        .form-control {
          height: auto;
          border-radius: 0;
          padding: 0;
        }
        .wrap {
          label.use {
            border-right: 1px solid black;
          }
          .option {
            height: 100%;
            width: 100%;
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
        .form-label {
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

      form {
        .form-check {
          margin-left: 10px;
          font-size: 18px;
        }
        .form-control {
          height: auto;
          border-radius: 0;
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
          height: 50px;

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