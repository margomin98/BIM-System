<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>刪除項目</h1>
    </div>
    <div class="info_wrap col">
      <div class="warn">
        <h4>確定刪除以下項目嗎？</h4>
      </div>
      <div class="fixed_info">
        <div>
          <p>設備整合箱</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">產編：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.IntegrationId"/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">名稱：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.IntegrationName"/>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位區域：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.AreaName"/>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位櫃位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.LayerName"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保管人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Custodian"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Integrator"/>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.IntegrateDate"/>
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
          <list-item v-for="(item, index) in details.AssetList" :key="index" :edit_btn="false" :delete_btn="false" :AssetData="item">
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
        <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :paginationPageSize="pageSize" :pagination="true">
        </ag-grid-vue>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
      </div>
    </div>
    <!-- Modal -->
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
    AgGridVue
  } from "ag-grid-vue3";
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
  export default {
    components: {
      Navbar,
      AgGridVue,
      ListItem,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const details = ref('');
      const IntegrationId = route.query.search_id
      const columnDefs = [{
          headerName: "記錄日期",
          field: "ExecutionDate",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "記錄行為",
          field: "Action",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "設備總類",
          field: "EquipTypeName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "設備分類",
          field: "EquipCategoryName",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        },
        {
          headerName: "資產編號",
          field: "AssetsId",
          unSortIcon: true,
          sortable: true,
          width: 200,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "物品名稱",
          field: "AssetName",
          unSortIcon: true,
          sortable: true,
          width: 200,
          resizable: true,
          suppressMovable: true
        },
        {
          headerName: "數量",
          field: "H_Number",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true
        },
        {
          headerName: "單位",
          field: "Unit",
          unSortIcon: true,
          sortable: true,
          width: 100,
          suppressMovable: true
        },
        {
          headerName: "作業人員",
          field: "ExecutionPerson",
          unSortIcon: true,
          sortable: true,
          width: 150,
          suppressMovable: true
        }
      ]
      const rowData = ref([]);
      onMounted(() => { 
        getDetails();
        getHistory();
      });
      async function getDetails() {
        const axios = require('axios');
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
      async function getHistory() {
        const axios = require('axios');
        const baseUrl = 'http://192.168.0.177:7008'
        let apiUrl = ''
        apiUrl += baseUrl + '/IntegrationMng/IntegratedHistory'
        const form = new FormData();
        form.append('IntegrationId' , IntegrationId);
        try {
          const response = await axios.post(`${apiUrl}`, form);
          // console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log(data.resultList);
            rowData.value = data.resultList;
            console.log('history', rowData.value);
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
        form.append('IntegrationId', IntegrationId);
        const axios = require('axios');
        const response = await axios.post(`http://192.168.0.177:7008/IntegrationMng/IntegrationDelete`, form);
        try {
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages + '\n';
            msg += '單號:' + data.resultList.B_Id;
            alert(msg);
            router.push({
              name: 'Equipment_Datagrid'
            });
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      function goBack() {
        window.history.back();
      }
      return {
        details,
        columnDefs,
        rowData,
        pageSize: 10,
        rowHeight: 35,
        deleteData,
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
  .delete_modal {
    .modal-content {
      border: solid 1px black;
      border-radius: 0;
      .modal-body {
        background: #E94B4B;
        text-align: center;
        font-weight: 700;
        color: white;
        border-bottom: solid 1px black;
      }
      .modal-footer {
        margin: auto;
        gap: 10px;
        button:nth-child(1) {
          background-color: #7E7E7E;
          border: none;
          color: white;
          width: 50px;
          font-weight: 700;
          &:hover {
            background-color: #464242;
          }
        }
        button:nth-child(2) {
          background-color: #E94B4B;
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
  @media only screen and (min-width: 1200px) {
    .main_section {
      .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
          color: white;
          margin-bottom: 0;
          font-weight: 700;
          &::before {
            content: "\26A0";
          }
        }
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
        width: 700px;
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
            width: 100%;
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
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
              width: 100px;
              text-align: end;
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
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 28%;
          margin-bottom: 5%;
          gap: 20px;
          .back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          .delete_btn {
            background: var(--c-5, #E94B4B);
            justify-content: center;
            align-items: center;
            display: inline-flex;
            border-radius: 10px;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            margin: 0 10px;
            &:hover {
              background-color: #a51e1e;
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
      .info_wrap:nth-child(4) {
        margin-top: 3%;
      }
    }
    .change_btn {
      @include change_btn
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
          color: white;
          margin-bottom: 0;
          font-weight: 700;
          &::before {
            content: "\26A0";
          }
        }
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
          .dropdown {
            width: 100%;
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
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
              width: 100px;
              text-align: end;
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
          .back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          .delete_btn {
            background: var(--c-5, #E94B4B);
            justify-content: center;
            align-items: center;
            display: inline-flex;
            border-radius: 10px;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            margin: 0 10px;
            &:hover {
              background-color: #a51e1e;
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
          .input-group {
            justify-content: left
          }
        }
      }
      .info_wrap:nth-child(4) {
        margin-top: 3%;
      }
    }
    .change_btn {
      @include change_btn
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
          color: white;
          margin-bottom: 0;
          font-weight: 700;
          &::before {
            content: "\26A0";
          }
        }
      }
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 50px;
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
        .content {
          @include content_bg;
          .row {
            gap: 10px 0;
          }
          .dropdown {
            margin-left: unset !important;
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
          .back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          .delete_btn {
            background: var(--c-5, #E94B4B);
            justify-content: center;
            align-items: center;
            display: inline-flex;
            border-radius: 10px;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            margin: 0 10px;
            &:hover {
              background-color: #a51e1e;
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
      .info_wrap:nth-child(4) {
        margin-top: 3%;
      }
    }
    .change_btn {
      @include change_btn
    }
  }
</style>