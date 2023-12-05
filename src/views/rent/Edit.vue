<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        編輯出庫填報
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
            <label for="inputTitle1" class="form-label use"><p><span>*</span>用&ensp;&ensp;&ensp;&ensp;途</p></label>
            <div class="option">
              <div class="form-check" v-for="(option, index) in options" :key="index">
                <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)" v-model="details.Use">
                <label class="form-check-label" :for="'radio' + (index + 1)">{{ option }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-5 col-lg-5 col-md-5 col-12 d-flex wrap column_section">
            <label for="inputWithButton" class="form-label"><p><span>*</span>專案代碼</p></label>
            <div class="input-group">
              <input type="text" class="form-control" id="project_id" placeholder="最多輸入10字" v-model="details.ProjectCode">
              <button class="btn code_search" type="button" @click="getProjectName">搜尋</button>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label" id='project_name'> <p>專案名稱</p></label>
            <div class="input-group" id='readonly_box'>
              <p class='readonly_box' readonly>{{ details.ProjectName}}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap column_section" style='border:none'>
            <label for="inputTextarea" class="form-label"><p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p></label>
            <textarea class="form-control" id="inputTextarea" rows="1" placeholder='最多輸入100字' v-model="details.Description"></textarea>
          </div>
        </div>
      </form>
      <div class="fixed_info">
        <div>
          <p>填寫項目</p>
        </div>
      </div>
      <div class='second_content'>
        <div class='wrap d-flex first_row'>
          <div class='col-xl-3 col-lg-3 col-md-3 col-12' style='padding-left:0'>
            <p><span>*</span>設備總類</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                      {{ myForm.EquipTypeName || '請選擇' }}
                    </button>
              <div class="dropdown-menu" aria-labelledby="typeDropdown">
                <p v-for="(item, index) in myForm.EquipTypeArray" :key="index" class="dropdown-item" @click="selectType(item)">{{ item.Name }}</p>
              </div>
            </div>
          </div>
          <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
            <p><span>*</span>設備分類</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(myForm.EquipTypeName !== '') }">
                      {{ myForm.EquipCategoryName || myForm.EquipCategoryInit }}
                    </button>
              <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                <p v-for="(item, index) in myForm.EquipCategoryArray" :key="index" class="dropdown-item" @click="selectCategory(item)">{{ item.Name }}</p>
              </div>
            </div>
          </div>
          <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
            <p><span>*</span>物品名稱</p>
            <input class="input-number" type="text" placeholder="最多輸入20字" v-model="myForm.ProductName" />
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 col-12">
            <p><span>*</span>數量<img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"></p>
            <div class="number-input-box">
              <input class="input-number" type="number" v-model="myForm.Number" min="1" />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-12 d-flex wrap text_input">
            <label for="inputTextarea" class="form-label"><p>規格需求：</p></label>
            <div>
            </div>
            <textarea class="form-control" id="inputTextarea" rows="3" placeholder='最多輸入100字' v-model="myForm.RequiredSpec"></textarea>
          </div>
        </div>
        <div class='col d-flex justify-content-center'>
          <button class="btn submit_btn" type="button" @click="insertItemList">新增</button>
        </div>
      </div>
      <div class="fixed_info">
        <div>
          <p><span>*</span>資產出庫項目(請至少新增一項)</p>
        </div>
      </div>
      <div class='third_content'>
        <DataTable :size="'small'" :value="rowData" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" paginator :rows="10" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
          <Column style="min-width:80px;">
            <template #body="slotProps">
                  <Delete :params = "slotProps" @updateDeleteList="updateDeleteList" @updateItemList="updateItemList" />
</template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        </DataTable>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="send_btn" @click="submit">送出</button>
    </div>
  </div>
</template>

<script>
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Delete from "@/components/Rent_Edit_Delete_button";
  import Navbar from '@/components/Navbar.vue';
  import {
    Rent_UseArray
  } from "@/assets/js/dropdown";
  import {
    onMounted,
    ref,
    reactive,
  } from 'vue';
  import {
    getEquipType,
    getEquipCategory,
    getProject,
GetAntiForgeryToken
  } from "@/assets/js/common_api";
  import {
    Rent_Edit_Status
  } from "@/assets/js/enter_status";
  import {
    goBack,
    canEnterPage
  } from "@/assets/js/common_fn";
  export default {
    components: {
      Navbar,
      Column,
      DataTable,
      Delete,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AO_ID = route.query.search_id;
      const options = Rent_UseArray;
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
      const details = ref({});
      const increaseId = ref(0);
      const myForm = reactive({
        EquipTypeName: '',
        EquipType_Id: '',
        EquipTypeArray: [],
        EquipCategoryArray: [],
        EquipCategoryName: '',
        Category_Id: '',
        EquipCategoryInit: '請先選擇設備總類',
        ProductName: '',
        Number: 1,
        RequiredSpec: '',
        ItemList: [],
        deleteList: [],
      });
      onMounted(() => {
        getDetails();
      });
      async function getEquipTypeName() {
        if (myForm.EquipTypeArray.length == 0) {
          getEquipType()
            .then((data) => {
              myForm.EquipTypeArray = data;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      async function getEquipCategoryName() {
        getEquipCategory(myForm.EquipType_Id)
          .then((data) => {
            myForm.EquipCategoryArray = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      async function getProjectName() {
        if (!/^(?![ 　]{10}$)[\s\S]{1,10}$/.test(details.value.ProjectCode)) {
          alert('專案代碼格式錯誤');
          return;
        }
        details.value.ProjectCode = details.value.ProjectCode.trim()
        getProject(details.value.ProjectCode)
          .then((data) => {
            details.value.ProjectName = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      function selectType(item) {
        myForm.EquipTypeName = item.Name;
        myForm.EquipType_Id = item.Id;
        myForm.EquipCategoryName = '';
        myForm.Category_Id = '';
        getEquipCategoryName();
        myForm.EquipCategoryInit = '請選擇';
      }
      function selectCategory(item) {
        myForm.EquipCategoryName = item.Name;
        myForm.Category_Id = item.Id;
      }
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            canEnterPage(data.resultList.Status, Rent_Edit_Status)
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            rowData.value = data.resultList.ItemList;
            increaseId.value = data.resultList.ItemList.length + 1;
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
      async function submit() {
        if (!details.value.Use || !details.value.ProjectCode || rowData.value.length === 0) {
          alert('請輸入必填項目');
          return;
        }
        if (!/^(?![ 　]{10}$)[\s\S]{1,10}$/.test(myForm.ProjectCode)) {
          alert('專案代碼格式錯誤');
          return;
        }
        if (details.value.Description) {
          details.value.Description = details.value.Description.trim();
        }
        if (details.value.Description && !/^[\s\S]{1,100}$/.test(details.value.Description.trim())) {
          alert('說明不可輸入超過100字')
          return
        }
        const requestData = {
          AO_ID: AO_ID,
          Use: details.value.Use,
          ProjectCode: details.value.ProjectCode,
          Description: details.value.Description,
          deleteList: myForm.deleteList,
          ItemList: myForm.ItemList,
        };
        console.log(requestData);
        try {
          const axios = require('axios');
          const token = await GetAntiForgeryToken();
          const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/ApplicationEdit', requestData,{
            headers:{
              'RequestVerificationToken': token,
            }
          });
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages + '\n';
            msg += '單號為:' + data.resultList.AO_ID;
            alert(msg);
            router.push({
              name: 'Rent_Datagrid'
            });
          } else if (data.state === 'account_error') {
            //尚未登入
            alert(data.messages);
            router.push('/');
          } else {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      function insertItemList() {
        //檢查必填子項目
        myForm.ProductName = myForm.ProductName.trim()
        if (!myForm.EquipTypeName || !myForm.EquipCategoryName || !myForm.ProductName || myForm.Number < 1) {
          alert('請輸入必填子項目');
          return
        }
        // 檢查 物品名稱是否20字內
        if (!/^.{1,20}$/.test(myForm.ProductName)) {
          alert('物品名稱不可輸入超過20字');
          return
        }
        // 如果有規格需求 不能超過100字
        if (myForm.RequiredSpec) {
          myForm.RequiredSpec = myForm.RequiredSpec.trim();
        }
        if (myForm.RequiredSpec && !/^[\s\S]{1,100}$/.test(myForm.RequiredSpec.trim())) {
          alert('規格需求不可輸入超過100字')
          return
        }
        // 顯示datagrid
        rowData.value.push({
          EquipTypeName: myForm.EquipTypeName,
          EquipType_Id: myForm.EquipType_Id,
          EquipCategoryName: myForm.EquipCategoryName,
          Category_Id: myForm.Category_Id,
          ProductName: myForm.ProductName,
          Number: myForm.Number,
          RequiredSpec: myForm.RequiredSpec,
          id: increaseId.value,
        });
        // 提交ItemList
        myForm.ItemList.push({
          EquipTypeName: myForm.EquipTypeName,
          EquipType_Id: myForm.EquipType_Id,
          EquipCategoryName: myForm.EquipCategoryName,
          Category_Id: myForm.Category_Id,
          ProductName: myForm.ProductName,
          Number: myForm.Number,
          RequiredSpec: myForm.RequiredSpec,
          id: increaseId.value,
        });
        increaseId.value++;
        console.log(myForm.ItemList);
        //清空子項目
        myForm.EquipTypeName = '';
        myForm.EquipType_Id = '';
        myForm.EquipCategoryName = '';
        myForm.Category_Id = '';
        myForm.EquipCategoryInit = '請先選擇設備總類';
        myForm.ProductName = '';
        myForm.Number = 1;
        myForm.RequiredSpec = '';
      }
      function updateDeleteList(newValue) {
        myForm.deleteList.push(newValue.item_id);
        const deleteIndex = rowData.value.findIndex(item => item.id === newValue.id)
        // console.log(deleteIndex);
        rowData.value.splice(deleteIndex, 1);
      }
      function updateItemList(newValue) {
        const deleteIndex = rowData.value.findIndex(item => item.id === newValue.id);
        // console.log(deleteIndex);
        rowData.value.splice(deleteIndex, 1);
        const deleteIndex2 = myForm.ItemList.findIndex(item => item.id === newValue.id);
        myForm.ItemList.splice(deleteIndex2, 1);
        console.log(myForm.ItemList);
      }
      return {
        options,
        datagridfield,
        rowData,
        details,
        myForm,
        getEquipTypeName,
        selectType,
        selectCategory,
        getProjectName,
        submit,
        insertItemList,
        updateDeleteList,
        updateItemList,
        goBack,
      };
    },
    data() {
      return {
        count: 1,
        rowHeight: 35,
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
        .code_search {
          background: #48658C;
          color: white;
          font-weight: 800;
          height: 30px;
          width: 60px;
          margin-right: 10px;
          display: flex;
          align-self: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        #readonly_box {
          border-left: black 1px solid;
        }
        span {
          @include red_star
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
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #D9D9D9;
          .submit_btn {
            margin-bottom: 20px;
            background: #48658C;
            color: white;
            font-weight: 700;
            width: 80px;
            font-size: 18px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              background-color: #5d85bd;
            }
          }
          .wrap {
            justify-content: space-evenly;
            padding: 10px 80px;
            .number-input-box {
              color: black;
              .input-number {
                width: 100%;
              }
            }
            .form-label {
              white-space: nowrap;
              font-weight: 800;
              font-size: 18px;
            }
            .dropdown {
              button {
                background: white;
                width: 100%;
                border: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .dropdown-menu {
                width: 100%;
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
                .dropdown-item {
                  text-align: left;
                }
              }
            }
            div {
              p {
                text-align: center;
                white-space: nowrap;
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 5px;
              }
            }
          }
          .first_row {
            div:nth-child(1),
            div:nth-child(3) {
              padding: 0 5px;
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
            border-left: 1px solid black;
          }
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            label.use,
            #project_id {
              border-right: 1px solid black;
            }
            .option {
              display: flex
            }
            #project_name,
            #project_id {
              border-left: 1px solid black;
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
        .input-number {
          @include count_btn;
          width: 100%;
        }
        .form-control {
          height: 100%;
          border-radius: 0;
        }
      }
      .button_wrap {
        display: flex;
        justify-content: space-between;
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
              background-color: #5D85BD;
            }
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
        .code_search {
          background: #48658C;
          color: white;
          font-weight: 800;
          height: 30px;
          width: 60px;
          margin-right: 10px;
          display: flex;
          align-self: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        #readonly_box {
          border-left: 1px solid black;
        }
        span {
          @include red_star
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
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #D9D9D9;
          .submit_btn {
            margin-bottom: 20px;
            background: #48658C;
            color: white;
            font-weight: 700;
            width: 80px;
            font-size: 18px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              background-color: #5d85bd;
            }
          }
          .wrap {
            justify-content: space-evenly;
            padding: 10px 80px;
            .number-input-box {
              color: black;
              .input-number {
                width: 100%;
              }
            }
            .form-label {
              white-space: nowrap;
              font-weight: 800;
              font-size: 18px;
            }
            .dropdown {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              button {
                background: white;
                width: 100%;
                border: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .dropdown-menu {
                width: 100%;
                .dropdown-item {
                  text-align: left;
                }
              }
            }
            div {
              p {
                text-align: center;
                white-space: nowrap;
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 5px;
              }
            }
          }
          .first_row {
            div:nth-child(1),
            div:nth-child(3) {
              padding: 0 5px;
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
            border-left: 1px solid black;
          }
          .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
            label.use,
            #project_id {
              border-right: 1px solid black;
            }
            .option {
              display: flex
            }
            #project_name {
              border-left: 1px solid black
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
            padding: 0 10px;
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
        .input-number {
          @include count_btn;
          width: 100%;
        }
        .form-control {
          height: 100%;
          border-radius: 0;
        }
      }
      .button_wrap {
        display: flex;
        justify-content: space-between;
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
              background-color: #5D85BD;
            }
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
        .code_search {
          background: #48658C;
          color: white;
          font-weight: 800;
          height: 30px;
          width: 60px;
          margin-right: 10px;
          display: flex;
          align-self: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        span {
          @include red_star
        }
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
        .second_content {
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-top: 1px solid black;
          background: #D9D9D9;
          .submit_btn {
            margin: 20px 0;
            background: #48658C;
            color: white;
            font-weight: 700;
            width: 80px;
            font-size: 18px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              background-color: #5d85bd;
            }
          }
          .wrap {
            padding: 20px 20px 0;
            flex-direction: column;
            .number-input-box {
              color: black;
              .input-number {
                width: 100%;
              }
            }
            .form-label {
              white-space: nowrap;
              font-weight: 800;
              font-size: 18px;
              margin-bottom: 0;
            }
            .dropdown {
              button {
                background: white;
                width: 100%;
                border: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .dropdown-menu {
                width: 100%;
                .dropdown-item {
                  text-align: left;
                }
              }
            }
            div {
              margin-bottom: 5px;
              p {
                text-align: center;
                white-space: nowrap;
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 5px;
              }
            }
          }
          .text_input {
            padding: 0 20px;
            div {
              display: none;
            }
            p {
              margin-bottom: 0;
              padding-bottom: 5px
            }
            .form-control {
              height: 150px
            }
          }
        }
        .column_section {
          flex-direction: column;
          p {
            text-align: center;
          }
        }
        form {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          .form-check {
            margin-left: 10px;
            font-size: 18px;
          }
          .form-control {
            height: 50px;
            border-radius: 0;
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
              padding: 5px;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr;
              gap: 0px 0px;
              grid-auto-flow: row;
              grid-template-areas: ". . ." ". . .";
              white-space: nowrap;
              justify-items: center;
              width: 100%;
              div {
                width: 90px;
              }
            }
            #project_id {
              border-right: black solid 1px
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
            p {
              width: 100px;
              margin-bottom: 0;
              text-align: center;
            }
          }
        }
        .input-number {
          @include count_btn;
          width: 100%;
        }
      }
      .button_wrap {
        display: flex;
        justify-content: space-between;
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
              background-color: #5D85BD;
            }
          }
        }
      }
    }
  }
</style>