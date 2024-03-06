<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>檢視設備整合</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>設備整合箱</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">產編：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.IntegrationId" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">名稱：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.IntegrationName" />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位區域：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.AreaName" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位櫃位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.LayerName" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保管人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.Custodian" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.Integrator" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.IntegrateDate" />
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>整合箱內容物</p>
        </div>
      </div>
      <div class="content">
        <div class="item_wrap">

          <list-item v-for="(item, index) in details.AssetList" :key="index" :edit_btn="false" :delete_btn="false"
            :AssetData="item">
          </list-item>

        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>更換設備歷史紀錄</p>
        </div>
      </div>
      <div style="width: 100%" class="content">
        <DataTable lazy :key="datagrid.key" :first="datagrid.first" :size="'small'" :loading="datagrid.loading"
          :value="rowData" :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns
          columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" @page="getHistory($event, 'page')"
          @sort="getHistory($event, 'sort')" paginator :rows="datagrid.rows" :totalRecords="datagrid.totalRecords"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          :rowsPerPageOptions="[10, 20, 30]"
          currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
          <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable
            :style="{ 'min-width': item.width }"></Column>
        </DataTable>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Navbar from "@/components/Navbar.vue";
import ListItem from "@/components/Equipment/item.vue"
import {
  onMounted,
  ref
} from "vue";
import {
  useRoute,
  useRouter
} from "vue-router";
import {
  getMngDatagrid,
} from '@/assets/js/common_api'
import { UpdatePageParameter, createDatagrid, goBack } from '@/assets/js/common_fn';
import axios from 'axios';
export default {
  components: {
    Navbar,
    DataTable,
    Column,
    ListItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const details = ref('');
    const IntegrationId = route.query.search_id
    const datagrid = createDatagrid();
    const datagridfield = [
      { field: "ExecutionDate", width: '150px', header: "記錄日期" },
      { field: "Action", width: '50px', header: "記錄行為" },
      { field: "EquipTypeName", width: '150px', header: "設備總類" },
      { field: "EquipCategoryName", width: '150px', header: "設備分類" },
      { field: "AssetsId", width: '150px', header: "資產編號" },
      { field: "AssetName", width: '150px', header: "物品名稱" },
      { field: "H_Number", width: '50px', header: "數量" },
      { field: "Unit", width: '50px', header: "單位" },
      { field: "ExecutionPerson", width: '150px', header: "作業人員" }
    ]
    const rowData = ref([]);
    onMounted(() => {
      datagrid.sortField = 'ExecutionDate'
      getDetails();
      getHistory('', 'search');
    });
    async function getDetails() {
      const baseUrl = 'http://192.168.0.177:7008'
      let apiUrl = ''
      apiUrl += baseUrl + '/GetDBdata/GetIntegrationBoxInfo?id=' + `${IntegrationId}`
      try {
        const response = await axios.get(`${apiUrl}`);
        // console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log(data.resultList);
          details.value = data.resultList;
          console.log('details', details.value.AssetList);
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
    async function getHistory(event, type) {
      const form = new FormData();
      form.append('IntegrationId', IntegrationId);
      UpdatePageParameter(datagrid, event, type, form)
      getMngDatagrid('/IntegrationMng/IntegratedHistory', rowData, datagrid, form)
    }
    return {
      details,
      datagrid,
      datagridfield,
      rowData,
      getHistory,
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

.item_wrap {
  height: 350px;
  overflow: auto;
  display: grid;
  gap: 20px 0;
}

.readonly_box {
  @include readonly_box;
}


.main_section {
  .fixed_info {
    @include fixed_info;

    p {
      font-size: 20px;
      margin-bottom: 0;
    }
  }

  .content {
    @include content_bg;

    .dropdown {
      width: 100%;

      .dropdown-menu {
        width: 100%;
      }

      button {
        @include dropdown-btn;
        width: 100%;
        color: black;
        justify-content: space-between;
        align-items: center;
      }
    }

    .input-number {
      @include count_btn;
    }

    .form-control {
      height: 35px;
      border-radius: 0;
    }

    .input-group-prepend {
      color: white;
      font-weight: 700;
      font-size: 20px;
    }
  }
  .info_wrap:nth-child(4) {
      margin-top: 3%;
      .btn_section {
            margin-left: 10px;
            .delete_btn {
              display: flex;
              align-items: center;
              @include delete_button;
              height: 100%;
              padding: 5px;
              &:hover {
                background: #FF7272
              }
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

@media only screen and (min-width: 1200px) {
  .main_section {

    .info_wrap {
      margin: auto;
      width: 700px;



      .content {

        p {
          text-align: center;
          white-space: nowrap;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
          color: white;
        }

        .dropdown {
          .dropdown-menu {

            p {
              text-align: left;
              padding: 0 10px
            }
          }


        }

        .input-group {
          justify-content: right;
          flex-wrap: nowrap;




          .input-group-prepend {
            white-space: nowrap;
            width: 100px;
            text-align: right;
          }
        }

      }



      .dropdown {
        width: calc(100% - 10%);
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

          p {
            font-size: 18px;
            color: black;
            font-weight: normal;
          }
        }
      }
    }

    .info_wrap:nth-child(3) {
      margin-top: 3%;

      .count {
        .input-group {
          justify-content: left
        }
      }
    }

   
  }


}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {


    .info_wrap {
      margin: auto;
      padding: 0 5%;


      .content {

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

          .input-group-prepend {
            white-space: nowrap;
            width: 100px;
            text-align: end;
          }
        }
      }


      .dropdown {
        width: calc(100% - 10%);
        height: 35px;

        .dropdown-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none;
        }

        .dropdown-menu {
          width: 100%;
          transform: translate3d(-1px, 35px, 0px) !important;

          p {
            font-size: 18px;
            color: black;
            font-weight: normal;
          }
        }
      }

    }

    .info_wrap:nth-child(3) {
      margin-top: 3%;

      .count {
        .input-group {
          justify-content: left
        }
      }
    }

 
  }


}

@media only screen and (max-width: 767px) {
  .main_section {

    .info_wrap {
      padding: 1% 5% 0;




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


        }
      }



    }

    .info_wrap:nth-child(3) {
      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: unset !important;
        border-radius: 5px;
      }

      margin-top: 3%;

      .count {
        .number-input-box {
          width: 100%;
          margin-left: unset !important;
        }
      }
    }

  
  }

 
}
</style>