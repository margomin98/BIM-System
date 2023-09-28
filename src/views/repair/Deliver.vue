<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        交付作業
      </h1>
    </div>
    <div class="info_wrap col">
      <!-- 維修編號，申請人員，申請日期 -->
      <div class="fixed_info">
        <div>
          <p>
            維修編號: {{ details.RepairId }}
          </p>
        </div>
        <div>
          <p>
            申請人員: {{ details.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請日期: {{ details.ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row g-0">
          <!-- 資產編號 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                資產編號：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.AssetsId">
            </div>
          </div>
          <!-- 物品名稱 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                物品名稱：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.AssetName">
            </div>
          </div>
        </div>
        <!-- 問題描述 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              問題描述：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" readonly>{{ details.Question }}</textarea>
          </div>
        </div>
        <!-- 報修照片 -->
        <div class="col-12 repair_photo_section">
          <div class="input-group mt-3">
            <div class="input-group-prepend">報修照片：</div>
          </div>
          <swiper-container class="swiper_section" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
            <swiper-slide v-for="(item , index) in details.existFile" :key="index"> <img :src="item.FileLink"> </swiper-slide>
          </swiper-container>
          <div class="swiper_pagination">
          </div>
        </div>
      </div>
      <div class='confirm_section'>
        <h2>
          交付簽章
        </h2>
        <div class='final'>
          <!-- 交付日期 -->
          <div class="fixed_info">
            <div>
              <p>交付日期 : {{ deliveryDate }}</p>
            </div>
          </div>
          <div class="row auth g-0">
            <!-- 交付人員 -->
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 input-container">
              <div class="input-group">
                <div class="input-group-prepend">交付人員：</div>
                <div class="input-with-icon">
                  <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly :value="validationStatus(1)"/>
                  <span v-show="validation.user1.isValidate" class="icon-container">
                    <img src="@/assets/accept.png" class="checkmark-icon" />
                  </span>
                </div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">驗證</button>
                <!-- 交付人員驗證Modal -->
                <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ">
                      <div class="modal-header">
                        <h5 class="modal-title">交付人員驗證</h5>
                        <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
                      </div>
                      <div class="modal-body">
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">帳號：</div>
                            <input type="text" class="form-control" v-model="validation.user1.account"/>
                          </div>
                        </div>
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">密碼：</div>
                            <input type="password" class="form-control" v-model="validation.user1.password"/>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer m-auto">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate(1)">驗證</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 送修人員 -->
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 input-container">
              <div class="input-group">
                <div class="input-group-prepend">送修人員：</div>
                <div class="input-with-icon">
                  <input type="text" class="form-control readonly_box" readonly :value="validationStatus(2)"/>
                  <span v-show="validation.user2.isValidate" class="icon-container">
                    <img src="@/assets/accept.png" class="checkmark-icon" />
                  </span>
                </div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">驗證</button>
                <!-- 送修人員驗證Modal -->
                <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel2">送修人員驗證</h5>
                        <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
                      </div>
                      <div class="modal-body">
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">帳號：</div>
                            <input type="text" class="form-control" v-model="validation.user2.account"/>
                          </div>
                        </div>
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">密碼：</div>
                            <input type="password" class="form-control" v-model="validation.user2.password"/>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer m-auto">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate(2)">驗證</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" @click="submit" :disabled="!canSubmit()" :class="{ send_btn_disabled: !canSubmit() }">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router'
  import { getDate , goBack } from '@/assets/js/common_fn.js'
  import Navbar from '@/components/Navbar.vue';
  import axios from 'axios';
  import router from '@/router';
  import {
    register
  } from 'swiper/element/bundle';
  import {
    Pagination
  } from 'swiper/modules';
  register();
  export default {
    components: {
      Navbar
    },
    setup() {
      const route = useRoute();
      const RepairId = route.query.search_id;;
      const details = ref({});
      const deliveryDate = ref('');
      const validation = ref({
        user1: {
          account: '',
          password: '',
          isValidate: false,
          resultName: '',
        },
        user2: {
          account: '',
          password: '',
          isValidate: false,
          resultName: '',
        },
      });
      onMounted(()=>{
        getDetails();
        deliveryDate.value = getDate();
      });
      // 取得單筆資料
      async function getDetails() {
        axios.get(`http://192.168.0.177:7008/GetDBdata/GetRepairInfo?r_id=${RepairId}`)
        .then((response)=>{
          const data = response.data;
          if(data.state === 'success') {
            details.value = data.resultList;
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
          else {
            alert(data.messages);
          }
        })
        .catch((error)=>{
          console.error(error);
        })
      }
      //分別使用帳號密碼驗證、改變驗證狀態 user1為交付人員 user2為送修人員
      async function validate(user) {
        if (user === 1) {
          const axios = require('axios');
          const formData = new FormData();
          const formFields = {
            'userName': validation.value.user1.account,
            'userPassword': validation.value.user1.password,
            'id': 'R_ReceivedDelivery',
          };
          //將表格資料append到 formData
          for (const fieldName in formFields) {
            formData.append(fieldName, formFields[fieldName]);
            console.log(formData.get(`${fieldName}`));
          }
          const response = await axios.post('http://192.168.0.177:7008/Account/IdentityValidation', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          try {
            const data = response.data;
            console.log(data);
            if (data.state === 'success') {
              validation.value.user1.isValidate = true;
              validation.value.user1.resultName = validation.value.user1.account;
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
            'id': 'R_RepairDelivery',
          };
          //將表格資料append到 formData
          for (const fieldName in formFields) {
            formData.append(fieldName, formFields[fieldName]);
            console.log(formData.get(`${fieldName}`));
          }
          const response = await axios.post('http://192.168.0.177:7008/Account/IdentityValidation', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          try {
            const data = response.data;
            console.log(data);
            if (data.state === 'success') {
              validation.value.user2.isValidate = true;
              validation.value.user2.resultName = validation.value.user2.account;
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
          return validation.value.user1.isValidate ? validation.value.user1.resultName : '未驗證'
        } else if (user === 2) {
          return validation.value.user2.isValidate ? validation.value.user2.resultName : '未驗證'
        }
      }
      function canSubmit() {
        return validation.value.user1.isValidate && validation.value.user2.isValidate;
      }
      async function submit() {
        const requestData = {
          RepairId: RepairId,
          DeliveryOperator: validation.value.user1.resultName,
          RepairPerson: validation.value.user2.resultName,
        }
        axios.post('http://192.168.0.177:7008/RepairMng/Delivery',requestData)
        .then((response)=>{
          const data = response.data
          if(data.state === 'success') {
            alert('傳送維修交付表單成功\n單號為:' + data.resultList.R_ID);
            router.push({ name: 'Repair_Datagrid' });
          } else if( data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          } else {
            alert(data.messages);
          }
        })
        .catch((error)=>{
          console.error(error);
        })
      }
      return {
        details,
        deliveryDate,
        validation,
        validate,
        validationStatus,
        canSubmit,
        submit,
        goBack,
        pagination: {
          clickable: true,
        },
        modules: [Pagination]
      }
    }
  };
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  @media only screen and (min-width: 1200px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      .swiper_section {
        swiper-slide {
          align-self: baseline;
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
        }
      }
      h1 {
        margin-top: 100px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      h2 {
        margin-top: 50px;
        text-align: center;
        font-size: 35px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: 30px auto 5%;
        width: 750px;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .input-group {
            .input-number {
              @include count_btn;
            }
            .readonly_box {
              height: 37px;
            }
            .form-control {
              height: 37px;
              border-radius: 0;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              text-align: end;
              width: 155px;
              span {
                @include red_star
              }
            }
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
          }
          .send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          .send_btn_disabled {
            background: #878787;
            &:hover {
              background: #878787;
            }
          }
        }
        .confirm_section {
          .auth {
            border-radius: 0 0 10px 10px;
            background: white;
            height: 80px;
            padding: 20px;
            .input-group {
              display: flex;
              white-space: nowrap;
              flex-wrap: nowrap;
              justify-content: center;
            }
            button {
              @include auth_btn;
              &:hover {
                background: #5a6d87;
              }
            }
            .form-control {
              height: 35px;
              width: 150px;
              margin-right: 5px;
            }
            .input-group-prepend {
              font-weight: 700;
              font-size: 20px;
              text-align: end;
              position: relative;
              span {
                position: absolute;
              }
            }
            .input-container {
              position: relative;
            }
            .input-with-icon {
              position: relative;
            }
            .checkmark-icon {
              position: absolute;
              top: 10%;
              left: 89%;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
            }
          }
          .modal {
            .modal-body {
              padding: 16px 16px 0;
            }
            .modal-content {
              width: 400px;
              margin: auto;
            }
            .input-group-prepend {
              width: auto;
            }
            .modal-footer {
              padding: 0 12px 12px;
              border: none;
            }
            .modal-header {
              h5 {
                font-weight: 700;
              }
              background: #3D4E61;
              color: white;
              .close_icon {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      .swiper_section {
        swiper-slide {
          align-self: baseline;
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
        }
      }
      h1 {
        margin-top: 100px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      h2 {
        margin-top: 50px;
        text-align: center;
        font-size: 35px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: 30px auto 5%;
        padding: 0 5%;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .input-group {
            width: 100%;
            white-space: nowrap;
            flex-wrap: nowrap;
            .input-number {
              width: 100%;
              @include count_btn;
            }
            .readonly_box {
              height: 37px;
              width: 100%;
            }
            .form-control {
              height: 37px;
              width: 65%;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              text-align: end;
              width: 128px;
              span {
                @include red_star
              }
            }
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
          }
          .send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          .send_btn_disabled {
            background: #878787;
            &:hover {
              background: #878787;
            }
          }
        }
        .confirm_section {
          .auth {
            border-radius: 0 0 10px 10px;
            background: white;
            height: 80px;
            padding: 20px;
            .input-group {
              display: flex;
              white-space: nowrap;
              flex-wrap: nowrap;
            }
            button {
              @include auth_btn;
              &:hover {
                background: #5a6d87;
              }
            }
            .form-control {
              height: 35px;
              margin-right: 5px;
            }
            .input-group-prepend {
              font-weight: 700;
              font-size: 20px;
              width: 120px;
              text-align: end;
              position: relative;
              span {
                position: absolute;
              }
            }
            .input-container {
              position: relative;
            }
            .input-with-icon {
              position: relative;
            }
            .checkmark-icon {
              position: absolute;
              top: 10%;
              left: 93%;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
            }
          }
          .modal {
            .modal-body {
              padding: 16px 16px 0;
            }
            .modal-content {
              width: 400px;
              margin: auto;
            }
            .input-group-prepend {
              width: auto;
            }
            .modal-footer {
              padding: 0 12px 12px;
              border: none;
            }
            .modal-header {
              h5 {
                font-weight: 700;
              }
              background: #3D4E61;
              color: white;
              .close_icon {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
        height: 35px;
        text-align: center;
        margin-left: unset !important;
      }
      .swiper_section swiper-slide {
        img {
          width: 100%;
          height: auto;
          padding: 40px;
        }
      }
      h1 {
        margin-top: 80px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      h2 {
        margin-top: 50px;
        text-align: center;
        font-size: 35px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 0 5%;
        .fixed_info {
          @include fixed_info;
          height: unset;
          flex-direction: column;
          padding: 10px;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .input-group {
            flex-direction: column;
            .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
              margin-left: unset;
              border-radius: 5px;
              margin-top: 5px;
              height: 35px;
            }
            .input-number {
              @include count_btn;
              margin-left: unset !important;
            }
            .form-control {
              height: 35px;
              width: 100%;
              border-radius: 0;
              margin-left: unset !important;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 100px;
              white-space: nowrap;
              span {
                @include red_star
              }
            }
          }
        }
        .button_wrap {
          display: flex;
          justify-content: space-between;
          margin: 30px auto 5%;
          width: 190px;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              width: 100px;
              &:hover {
                background-color: #5d85bb;
              }
            }
          }
          .send_btn {
            @include search_and_send_btn;
            width: 70px;
            padding: 5px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          .send_btn_disabled {
            background: #878787;
            width: 70px;
            padding: 5px;
            &:hover {
              background: #878787;
            }
          }
        }
        .confirm_section {
          .auth {
            border-radius: 0 0 10px 10px;
            background: white;
            padding: 10px;
            .input-group {
              display: flex;
              white-space: nowrap;
              flex-wrap: nowrap;
              justify-content: center;
              margin: 5px 0;
            }
            button {
              @include auth_btn;
              &:hover {
                background: #5a6d87;
              }
            }
            .form-control {
              height: 35px;
              margin-right: 5px;
            }
            .input-group-prepend {
              font-weight: 700;
              font-size: 20px;
              width: 120px;
              text-align: end;
              position: relative;
              span {
                position: absolute;
              }
            }
            .input-container {
              position: relative;
            }
            .input-with-icon {
              position: relative;
            }
            .checkmark-icon {
              position: absolute;
              top: 10%;
              left: 89%;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
            }
          }
          .modal {
            .modal-body {
              padding: 16px 16px 0;
            }
            .modal-content {
              width: 400px;
              margin: auto;
            }
            .input-group-prepend {
              width: auto;
            }
            .modal-footer {
              padding: 0 12px 12px;
              border: none;
            }
            .modal-header {
              h5 {
                font-weight: 700;
              }
              background: #3D4E61;
              color: white;
              .close_icon {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>