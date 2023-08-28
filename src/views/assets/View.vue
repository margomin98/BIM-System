<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>檢視資產</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_title">
        <div>
          <h4>資產資訊</h4>
        </div>
      </div>
      <div class="fixed_info">
        <div>
          <p>入庫人員: {{ details.Applicant }}</p>
        </div>
        <div>
          <p>入庫日期: {{ details.ApplicationDate }}</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">資產編號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.AI_ID" />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                狀態：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Status">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備總類：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipTypeName" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備分類：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipCategoryName" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">物品名稱：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetName" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">廠商：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.VendorName" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">型號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductType" />
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">規格：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductSpec" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">S/N：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductSpec" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">總庫存數量：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Count" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Unit" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位區域：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Count" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">儲位櫃位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Unit" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyDate">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固開始日：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyStartDate" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固到期日：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyEndDate" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <textarea style="height: 150px;" class="form-control readonly_box" aria-label="With textarea" readonly v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col photo">
      <div class="fixed_title">
        <div>
          <h4>資產照片</h4>
        </div>
      </div>
      <div class="content">
        <swiper-container class='swiper_section' :space-between="20" :pagination="pagination" :modules="modules" :breakpoints="{
                0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          },
                        }" @progress="onProgress" @slidechange="onSlideChange">
          <swiper-slide>
            <img src="https://www.cityonelimo.com/uploaded_files/seo-flyer/BLOG072202304240720_Remote%20work%20image.jpeg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_Down_%28250260941%29.jpeg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="https://www.cityonelimo.com/uploaded_files/seo-flyer/BLOG072202304240720_Remote%20work%20image.jpeg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_Down_%28250260941%29.jpeg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="https://static01.nyt.com/images/2021/01/17/fashion/13workathome/13workathome-superJumbo.jpg" alt="">
          </swiper-slide>
        </swiper-container>
        <div class="swiper_pagination">
        </div>
      </div>
    </div>
    <div class="info_wrap col log">
      <div class="fixed_title">
        <div>
          <h4>進出庫歷史紀錄</h4>
        </div>
      </div>
      <div class="content">
        <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-4 col-6">
            <p>作業日期(起)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="selectedDate" class="date-input" @focus="showDatePicker = true" @blur="showDatePicker = false" />
                <div class="date-picker" v-if="showDatePicker">
                  <datepicker v-model="selectedDate"></datepicker>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-6">
            <p>作業日期(迄)</p>
            <div class="date-selector">
              <div class="input-container">
                <input type="date" v-model="selectedEndDate" class="date-input" @focus="showEndDatePicker = true" @blur="showEndDatePicker = false" />
                <div class="date-picker" v-if="showEndDatePicker">
                  <datepicker v-model="selectedEndDate"></datepicker>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12">
            <p>作業行為</p>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {{ selectedItem || "請選擇" }}
                        </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p class="dropdown-item" @click="selectStatus('選項1')">選項1</p>
                <p class="dropdown-item" @click="selectStatus('選項2')">選項2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="search_btn">檢索</button>
        <button class="empty_btn">清空</button>
      </div>
      <div class="info_wrap">
      <div style="width: 100%">
      <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;margin-bottom:50px" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :defaultColDef="defaultColDef" :paginationAutoPageSize="true"
        :pagination="true">
      </ag-grid-vue>
    </div>
    </div>
      <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
    </div>
    </div>
  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Button from "@/components/Storage_list_view_button";
  import {
    register
  } from 'swiper/element/bundle';
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    ref
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import Swiper from 'swiper';
  import '@/assets/css/swiper-bundle.css';
  import {
    Pagination
  } from 'swiper/modules';
  register();
  export default {
    components: {
      Navbar,
      AgGridVue,
      Button,
      Swiper,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      const route = useRoute();
      const router = useRouter();
      const AI_ID = route.query.search_id;
      const deliveryDate = ref('');
      const details = ref({});
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.176:7008/GetDBdata/GetApplicationInfo?ai_id=${AI_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            if (details.value.WarrantyStartDate && details.value.WarrantyEndDate) {
              details.value.WarrantyStartDate = details.value.WarrantyStartDate.replace(/-/g, '/');
              details.value.WarrantyEndDate = details.value.WarrantyEndDate.replace(/-/g, '/');
            }
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
      const validation = ref({
        user1: {
          account: 'user_1',
          password: 'Test_123',
          isValidate: false,
        },
        user2: {
          account: 'user_2',
          password: 'Test_123',
          isValidate: false,
        },
      });
      //分別使用帳號密碼驗證、改變驗證狀態
      async function validate(user) {
        if (user === 1) {
          const axios = require('axios');
          const formData = new FormData();
          const formFields = {
            'userName': validation.value.user1.account,
            'userPassword': validation.value.user1.password,
          };
          //將表格資料append到 formData
          for (const fieldName in formFields) {
            formData.append(fieldName, formFields[fieldName]);
            console.log(formData.get(`${fieldName}`));
          }
          const response = await axios.post('http://192.168.0.176:7008/Account/IdentityValidationForD_Operator', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          try {
            const data = response.data;
            console.log(data);
            if (data.state === 'success') {
              validation.value.user1.isValidate = true;
            } else if (data.state === 'error') {
              alert(data.messages);
              validation.value.user1.isValidate = false;
            }
          } catch (error) {
            console.error(error);
          }
        } else if (user === 2) {
          const axios = require('axios');
          const formData = new FormData();
          const formFields = {
            'userName': validation.value.user2.account,
            'userPassword': validation.value.user2.password,
          };
          //將表格資料append到 formData
          for (const fieldName in formFields) {
            formData.append(fieldName, formFields[fieldName]);
            console.log(formData.get(`${fieldName}`));
          }
          const response = await axios.post('http://192.168.0.176:7008/Account/IdentityValidationForAI_Operator', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          try {
            const data = response.data;
            console.log(data);
            if (data.state === 'success') {
              validation.value.user2.isValidate = true;
            } else if (data.state === 'error') {
              alert(data.messages);
              validation.value.user2.isValidate = false;
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
      function validationStatus(user) {
        if (user === 1) {
          return validation.value.user1.isValidate ? validation.value.user1.account : '未驗證'
        } else if (user === 2) {
          return validation.value.user2.isValidate ? validation.value.user2.account : '未驗證'
        }
      }
      function canSubmit() {
        return validation.value.user1.isValidate && validation.value.user2.isValidate;
      }
      async function submit() {
        const axios = require('axios');
        const formData = new FormData();
        const formFields = {
          'AI_ID': details.value.AI_ID,
          'DeliveryOperator': validation.value.user1.account,
          'AssetsInOperator': validation.value.user2.account,
        };
        //將表格資料append到 formData
        for (const fieldName in formFields) {
          formData.append(fieldName, formFields[fieldName]);
          console.log(formData.get(`${fieldName}`));
        }
        const response = await axios.post('http://192.168.0.176:7008/AssetsInMng/Delivery', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        try {
          const data = response.data;
          console.log(data);
          if (data.state === 'success') {
            let msg = data.messages;
            msg += '\n編號:' + data.resultList.AI_ID;
            alert(msg);
            router.push({
              name: 'Store_Process_Datagrid'
            });
          } else if (data.state === 'error') {
            alert(data.messages);
            console.log('error state', response);
          }
        } catch (error) {
          console.error(error);
        }
      }
      function getDate() {
        const today = new Date();
        var date = '';
        date += (today.getFullYear() + '/');
        date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
        date += ((today.getDate()).toString().padStart(2, '0'));
        return date;
      }
      onMounted(() => {
        getDetails();
        deliveryDate.value = getDate();
      });
      function goBack() {
        window.history.back();
      }
      return {
        validation,
        validate,
        validationStatus,
        canSubmit,
        submit,
        goBack,
        deliveryDate,
        details,
        onSwiper,
        onSlideChange,
        pagination: {
          el: '.swiper_pagination', // Use the class name of the pagination div
          clickable: true,
        },
        modules: [Pagination],
        columnDefs: [{
            suppressMovable: true,
            field: "",
            cellRenderer: "Button",
            width: '100',

          },
          {
            headerName: "作業日期",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "作業行為",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "單號",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: '300',
            resizable:true,
            suppressMovable: true
          },
          {
            headerName: "數量",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '100',
            suppressMovable: true
          },
          {
            headerName: "單位",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '100',
            suppressMovable: true
          },
          {
            headerName: "申請人員",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "承辦人員",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          }
        ],
        rowData: [{
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000
          },
        ],
      }
    },
    mounted() {
      this.swiper = new Swiper('.swiper-container', {
        // Swiper configuration options
        pagination: {
          el: '.swiper_pagination',
        },
      });
    },
    beforeDestroy() {
      if (this.swiper) {
        this.swiper.destroy();
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .swiper_section {
    height: 300px;
    swiper-slide {
      display: flex;
      align-items: center;
    }
    swiper-slide img {
      width: 100%;
      margin: auto;
    }
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
    
      .info_wrap {
        margin: auto;
        width: 800px;
        .fixed_info {
          @include fixed_info;
          border-radius: 0 10px 0 0;
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
          
          .dropdown {
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
              width: 120px;
              text-align: end;
            }
          }
        }
        
        .content:nth-child(1),.content:nth-child(2){
          border-radius:0px 10px 10px 10px
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
    
      .log {
        p {
          @include datagrid_title;
        }
        input {
          display: flex;
          border: none;
          border-radius: 5px;
          background-color: white;
          padding: 5px 10px;
          font-size: 18px;
          width: 200px;
          height: 35px;
        }
      }
      .photo {
        margin: 5% auto;
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
    
      .info_wrap {
        margin: auto;
       padding:0 5%;
        .fixed_info {
          @include fixed_info;
          border-radius: 0 10px 0 0;
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
          
          .dropdown {
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
              width: 120px;
              text-align: end;
            }
          }
        }
        
        .content:nth-child(1),.content:nth-child(2){
          border-radius:0px 10px 10px 10px
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
      .info_wrap:nth-child(4) .info_wrap{
        padding:0;
      }
      .log {
        p {
          @include datagrid_title;
        }
        input {
          display: flex;
          border: none;
          border-radius: 5px;
          background-color: white;
          padding: 5px 10px;
          font-size: 18px;
          width: 200px;
          height: 35px;
        }
      }
      .photo {
        margin: 5% auto;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
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

      .photo{
        margin:5% auto;
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
          border-radius:0 10px 0 0;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .row{
            gap:10px 0;
          }
          .dropdown {
            .dropdown-menu {
              width: 100%;
            }
            button {
              @include dropdown-btn;
              width:100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            flex-direction: column;

            .input-number {
              @include count_btn;
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
        
        .content:nth-child(1),.content:nth-child(2){
          border-radius:0px 10px 10px 10px
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 20%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            
            &:hover {
              background-color: #5d85bb;
            }
          }
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
      }
      .info_wrap:nth-child(4) .info_wrap{
        padding:0;
      }
      .log {
        p {
          @include datagrid_title;
        }
        input {
          display: flex;
          border: none;
          border-radius: 5px;
          background-color: white;
          padding: 5px 10px;
          font-size: 18px;
          width:100% 
        }

      }
    }
  }
</style>
