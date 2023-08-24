<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>入庫作業</h1>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>設備總類</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
              {{ EquipTypeName || '請選擇' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="typeDropdown">
              <p v-for="(item, index) in EquipTypeArray" :key="index" class="dropdown-item"
                @click="selectType(`${item}`)">{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>設備分類</p>
          <div class="dropdown">
            <button style='  overflow: hidden;text-overflow: ellipsis;white-space: nowrap' class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(EquipTypeName !== '') }">
              {{ EquipCategoryName || EquipCategoryInit }}
            </button>
            <div class="dropdown-menu" aria-labelledby="categoryDropdown">
              <p v-for="(item, index) in EquipCategoryArray" :key="index" class="dropdown-item"
                @click="selectCategory(`${item}`)">{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>資產編號</p>
          <input type="text" v-model="AssetsId" />
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>物品名稱</p>
          <input type="text" v-model="AssetName" />
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>狀態</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              {{ Status || "請選擇" }}
            </button>
            <div class="dropdown-menu" aria-labelledby="statusDropdown">
              <p v-for="(item, index) in StatusArray" :key="index" class="dropdown-item" @click="selectStatus(`${item}`)">
                {{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>區域</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" @click="getAreaName">
              {{ AreaName || '請選擇' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="areaDropdown">
              <p v-for="(item, index) in AreaArray" :key="index" class="dropdown-item" @click="selectArea(`${item}`)">
                {{ item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>櫃位</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" :disabled="AreaName === ''">
              {{ LayerName || LayerInit }}
            </button>
            <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
              <p v-for="(item, index) in LayerArray" :key="index" class="dropdown-item" @click="selectLayer(`${item}`)">{{
                item }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>日期類型</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              {{ DateCategory || "請選擇" }}
            </button>
            <div class="dropdown-menu" aria-labelledby="statusDropdown">
              <p class="dropdown-item" @click="selectDateType('申請入庫日期')">申請入庫日期</p>
              <p class="dropdown-item" @click="selectDateType('交付日期')">交付日期</p>
              <p class="dropdown-item" @click="selectDateType('入庫日期')">入庫日期</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12">
          <p>日期(起)</p>
          <div class="date-selector">
            <div class="input-container">
              <input type="date" v-model="StartDate" class="date-input" @focus="showDatePicker = true"
                @blur="showDatePicker = false" :disabled="DateCategory === ''" />
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-12 flex-col">
          <p>日期(迄)</p>
          <div class="date-selector">
            <div class="input-container">
              <input type="date" v-model="EndDate" class="date-input" @focus="showEndDatePicker = true"
                @blur="showEndDatePicker = false" :disabled="DateCategory === ''" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn" @click="submit">檢索</button>
        <button class="empty_btn" @click="clear">清空</button>
        <button class="export_btn">匯出</button>
      </div>
    </div>
    <ag-grid-vue style="height: 380px" class="ag-theme-alpine" :rowHeight="rowHeight" :columnDefs="columnDefs" :rowData="rowData"
      :paginationPageSize="pageSize" :pagination="true">
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import Storage_process_button from "@/components/Storage_process_button";
import Delete from "@/components/Delete_button";
import Navbar from "@/components/Navbar.vue";
import { onMounted, ref } from "vue";

export default {
  components: {
    Navbar,
    AgGridVue,
    Storage_process_button,
    Delete,
  },
  data(){
      return{
        rowHeight: 35,
      }
    },
  setup() {
    const EquipTypeName = ref(''); //設備總類 *必填
    const EquipTypeArray = ref([]); //設備總類陣列 request拿到
    const EquipCategoryName = ref(''); //設備分類 *必填
    const EquipCategoryArray = ref([]); //設備分類陣列 request拿到
    const EquipCategoryInit = ref('請先選擇設備總類');
    const AssetsId = ref(''); //資產編號
    const AssetName = ref(''); //物品名稱
    const Status = ref(''); //狀態
    const StatusArray = ref(['申請入庫', '申請歸還', '可交付', '待入庫', '已入庫', '已歸還',])
    const AreaName = ref(""); //區域
    const AreaArray = ref([]); //區域陣列
    const LayerName = ref(""); //櫃位
    const LayerArray = ref([]); //櫃位陣列
    const LayerInit = ref('請先選擇區域');
    const DateCategory = ref("");
    const StartDate = ref(''); //申請入庫日期(起)
    const EndDate = ref(''); //申請入庫日期(迄)
    const total = ref(100);
    const pageSize = ref(10);
    const data = ref([]);
    const handleRefresh = ref(message => {
      alert(message);
    });
    const pagePosition = ref("bottom");
    const pageOptions = ref([
      { value: "bottom", text: "Bottom" },
      { value: "top", text: "Top" },
      { value: "both", text: "Both" }
    ]);



    const columnDefs = [{
      suppressMovable: true,
      field: "",
      cellRenderer: "Storage_process_button",
      cellRendererParams: {
        refresh: submit, // 传递回调函数的 ref 给渲染器组件
      },
      width: 300,
    },
    {
      headerName: "狀態",
      field: "Status",
      unSortIcon: true,
      sortable: true,
      width: 100,
      suppressMovable: true
    },
    {
      headerName: "編號",
      field: "AI_ID",
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
      width: 150,
      suppressMovable: true
    },
    {
      headerName: "物品名稱",
      field: "AssetName",
      unSortIcon: true,
      sortable: true,
      width: 160,
      suppressMovable: true
    },
    
    {
      headerName: "區域",
      field: "AreaName",
      unSortIcon: true,
      sortable: true,
      width: 100,
      suppressMovable: true
    },
    {
      headerName: "櫃位",
      field: "LayerName",
      unSortIcon: true,
      sortable: true,
      width: 100,
      suppressMovable: true,
      suppressMovable: true
    },
    {
      headerName: "申請入庫日期",
      field: "ApplicationDate",
      unSortIcon: true,
      sortable: true,
      width: 170,
      suppressMovable: true
    },
    {
      headerName: "申請人員",
      field: "Applicant",
      unSortIcon: true,
      sortable: true,
      width: 150,
      suppressMovable: true
    },
    {
      headerName: "交付日期",
      field: "DeliveryDate",
      unSortIcon: true,
      sortable: true,
      width: 170,
      suppressMovable: true
    },
    {
      headerName: "交付人員",
      field: "DeliveryOperator",
      unSortIcon: true,
      sortable: true,
      width: 150,
      suppressMovable: true
    },
    {
      headerName: "入庫日期",
      field: "AssetsInDate",
      unSortIcon: true,
      sortable: true,
      width: 170,
      suppressMovable: true
    },
    {
      headerName: "入庫人員",
      field: "AssetsInOperator",
      unSortIcon: true,
      sortable: true,
      width: 150,
      suppressMovable: true
    },
    {
      field: "",
      cellRenderer: "Delete",
    }
    ];
    const rowData = ref([
      {
        AI_ID: 'S202300001',
        EquipTypeName: "Type A",
        EquipCategoryName: "Category X",
        AssetsId: "A123",
        AssetName: "Asset 1",
        Status: "申請入庫",
        AreaName: "Area 1",
        LayerName: "Layer 1",
        ApplicationDate: "2023/08/14",
        Applicant: "John Doe"
      },
      {
        AI_ID: 'S202300002',
        EquipTypeName: "Type B",
        EquipCategoryName: "Category X",
        AssetsId: "A123",
        AssetName: "Asset 1",
        Status: "待入庫",
        AreaName: "Area 1",
        LayerName: "Layer 1",
        ApplicationDate: "2023/08/14",
        Applicant: "John Doe"
      },
    ]);

    async function submit() {
      const formData = new FormData();
      const formFields = {
        'EquipTypeName': EquipTypeName.value,
        'EquipCategoryName': EquipCategoryName.value,
        'AssetsId': AssetsId.value,
        'AssetName': AssetName.value,
        'Status': Status.value,
        'AreaName': AreaName.value,
        'LayerName': LayerName.value,
        'DateCategory': DateCategory.value,
        'StartDate': StartDate.value,
        'EndDate': EndDate.value,
      };
      //將表格資料append到 formData
      for (const fieldName in formFields) {
        formData.append(fieldName, formFields[fieldName]);
        // console.log(formData.get(`${fieldName}`));
      }
      //使用axios method:post傳送新品入庫表單
      const axios = require('axios');
      try {
        const response = await axios.post('http://192.168.0.176:7008/AssetsInMng/Operating', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          //取得datagrid成功
          console.log(data.messages);
          console.log('datagrid', data.resultList);
          rowData.value = data.resultList;
        } else if (data.state === 'error') {
          //取得datagrid失敗
          alert(data.messages);
        }
        else if (data.state === 'input_error') {
          //取得datagrid格式錯誤
          alert(data.messages);
        }
        else if (data.state === 'account_error') {
          //尚未登入
          alert(data.messages);
          router.push('/');
        } else {
          throw new Error('Request was not successful');
        }
      } catch (error) {
        console.error('Error sending data to backend', error);
      }
    }

    async function getEquipTypeName() {
      if (EquipTypeArray.value.length == 0) {
        const axios = require('axios');
        try {
          const response = await axios.get('http://192.168.0.176:7008/GetParameter/GetEquipType');
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('總類Get成功 資料如下\n', data.resultList.EquipType);
            EquipTypeArray.value = data.resultList.EquipType;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend');
        }
      }
    }
    async function getEquipCategoryName() {
      EquipCategoryName.value = '';
      const axios = require('axios');
      try {
        const response = await axios.get(`http://192.168.0.176:7008/GetParameter/GetEquipCategory?id=${EquipTypeName.value}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('分類Get成功 資料如下\n', data.resultList.EquipCategory);
          EquipCategoryArray.value = data.resultList.EquipCategory;
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error('Error sending applicant info request to backend', error);
      }
    }

    async function getAreaName() {
      if (AreaArray.value.length == 0) {
        const axios = require('axios');
        try {
          const response = await axios.get('http://192.168.0.176:7008/GetParameter/GetAreaName');
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Area Get成功 資料如下\n', data.resultList.AreaName);
            AreaArray.value = data.resultList.AreaName;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend');
        }
      }
    }

    async function getLayerName() {
      const axios = require('axios');
      try {
        const response = await axios.get(`http://192.168.0.176:7008/GetParameter/GetLayerName?id=${AreaName.value}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('Layer Get成功 資料如下\n', data.resultList.LayerName);
          LayerArray.value = data.resultList.LayerName;
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error('Error sending applicant info request to backend');
      }
    }

    function selectType(item) {
      EquipTypeName.value = item;
      console.log('選擇的總類:', EquipTypeName.value);
      getEquipCategoryName();
      EquipCategoryInit.value = '請選擇';
    }

    function selectCategory(item) {
      EquipCategoryName.value = item;
    }

    const selectStatus = (item) => {
      Status.value = item;
    };

    const selectArea = (item) => {
      AreaName.value = item;
      LayerName.value = '';
      //API function here
      getLayerName();
      LayerInit.value = '請選擇';
    };

    const selectLayer = (item) => {
      LayerName.value = item;
    };

    const selectDateType = (item) => {
      DateCategory.value = item;
    };

    const clear = () => {
      EquipTypeName.value = '';
      EquipCategoryInit.value = '請先選擇設備總類';
      EquipCategoryName.value = '';
      AssetsId.value = '';
      AssetName.value = '';
      Status.value = '';
      AreaName.value = '';
      LayerName.value = '';
      LayerInit.value = '請先選擇區域';
      DateCategory.value = '';
      StartDate.value = '';
      EndDate.value = '';
      submit();
    };

 
    const frameworkComponents = {
      agGridVue: AgGridVue
    };

    onMounted(() => {
      submit();
    });
    return {
      EquipTypeName,
      EquipTypeArray,
      getEquipTypeName,
      EquipCategoryName,
      EquipCategoryArray,
      EquipCategoryInit,
      getEquipCategoryName,
      AssetsId,
      AssetName,
      Status,
      StatusArray,
      AreaName,
      AreaArray,
      getAreaName,
      LayerName,
      LayerArray,
      LayerInit,
      getLayerName,
      DateCategory,
      StartDate,
      EndDate,
      total,
      pageSize,
      data,
      pagePosition,
      pageOptions,
      columnDefs,
      rowData,
      submit,
      selectType,
      selectCategory,
      selectStatus,
      selectArea,
      selectLayer,
      selectDateType,
      clear,
      frameworkComponents,
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

@media only screen and (min-width: 1200px) {
  .main_section {
    padding: 0 10%;

    h1 {
         margin: 50px 0 20px;
      text-align: center;
      font-size: 55px;
      font-weight: 600;
      @include title_color;
    }

    .button_wrap {
      margin-bottom: 25px;
      gap: 20px;

      .search_btn {
        @include search_and_send_btn;

        &:hover {
          background-color: #5e7aa2;
        }
      }

      .empty_btn {
        @include empty_btn;

        &:hover {
          background-color: #5d85bd;
        }
      }

      .export_btn {
        @include export_btn;

        &:hover {
          background-color: #274266;
        }
      }
    }

    .datagrid_section {
      .row {
        gap: 20px 50px;
        padding: 40px calc(100% - 98%);
        @include datagrid_bg;
justify-content: center;
        p {
          @include datagrid_title;
        }

        input {
          @include dropdown_btn;
          width: 200px;
          height: 35px;
        }

        button {
          padding: 0;
          width: 100%;
          font-size: 18px;
          height: 100%;
          border: none;
        }

        .dropdown {
          width: 200px;
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
            max-height: 250px;
            overflow-y: auto;

            p {
              font-size: 18px;
              color: black;
              font-weight: normal;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .datagrid-header-row {
      background: var(--c-7, #1f4e5f);
    }

    .datagrid-header .datagrid-cell {
      text-align: left importtant;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    padding: 5%;

    h1 {
      margin-top: 30px;
      text-align: center;
      font-size: 55px;
      font-weight: 600;
      @include title_color;
    }

    .button_wrap {
      margin-bottom: 25px;
      gap: 20px;

      .search_btn {
        @include search_and_send_btn;

        &:hover {
          background-color: #5e7aa2;
        }
      }

      .empty_btn {
        @include empty_btn;

        &:hover {
          background-color: #5d85bd;
        }
      }

      .export_btn {
        @include export_btn;

        &:hover {
          background-color: #274266;
        }
      }
    }

    .datagrid_section {
      .row {
        gap: 10px 0;
        padding: 30px;
        @include datagrid_bg;

        p {
          @include datagrid_title;
        }

        input {
          @include dropdown_btn;
          width: 100%;
          height: 35px;
        }

        button {
          padding: 0;
          width: 100%;
          font-size: 18px;
          height: 100%;
          text-align: left;
        }

        .dropdown {
          width: 100%;
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
            max-height: 250px;
            overflow-y: auto;
            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }
      }
    }

    .datagrid-header-row {
      background: var(--c-7, #1f4e5f);
    }

    .datagrid-header .datagrid-cell {
      text-align: left importtant;
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    padding: 5%;

    h1 {
      margin-top: 30px;
      text-align: center;
      font-size: 50px;
      font-weight: 600;
      @include title_color;
      margin-bottom: 20px;
    }

    .button_wrap {
      margin-bottom: 25px;
      justify-content: center;
      gap: 20px;

      .add_btn {
        @include datagrid_button_no1;
        font-size: 18px;
        width: 100%;
        height: auto;

        &:hover {
          background-color: #537ebc;
        }
      }

      .search_btn {
        @include search_and_send_btn;
        font-size: 18px;
        width: 100%;
        height: auto;

        &:hover {
          background-color: #5e7aa2;
        }
      }

      .empty_btn {
        @include empty_btn;
        font-size: 18px;
        width: 100%;
        height: auto;

        &:hover {
          background-color: #5d85bd;
        }
      }

      .export_btn {
        @include export_btn;
        font-size: 18px;
        width: 100%;
        height: auto;

        &:hover {
          background-color: #274266;
        }
      }
    }

    .datagrid_section {
      .row {
        gap: 10px 0;
        padding: 30px;
        @include datagrid_bg;

        p {
          @include datagrid_title;
          font-size: 18px;
        }

        input {
          @include dropdown_btn;
          width: 100%;
          height: 35px;
        }

        button {
          padding: 0;
          width: 100%;
          font-size: 18px;
          height: 100%;
          text-align: left;
        }

        .dropdown {
          width: 100%;
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
    }

    .datagrid-header-row {
      background: var(--c-7, #1f4e5f);
    }

    .datagrid-header .datagrid-cell {
      text-align: left importtant;
    }
  }
}
</style>