<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產入庫交付</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>申請人員: {{ details.Applicant }}</p>
        </div>
        <div>
          <p>申請入庫日期: {{ details.ApplicationDate }}</p>
        </div>
        <div>
          <p>資產類型：{{ details.IsConsumable ? '耗材' : '重要資產' }}</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">編號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.AI_ID" />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                狀態：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.Status">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備總類：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipTypeName" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備分類：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipCategoryName" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">物品名稱：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetName" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">廠商：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.VendorName" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">規格：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductSpec" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">型號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductType" />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">數量：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.Count" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.Unit" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyDate">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固開始日：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyStartDate" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固到期日：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyEndDate" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <textarea style="height: 250px;" class="form-control readonly_box" aria-label="With textarea" readonly
              v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
      <div class='confirm_section'>
        <h2>
          交付確認
        </h2>
        <div class='final'>
          <div class="fixed_info">
            <div>
              <p>交付日期: {{ deliveryDate }}</p>
            </div>
          </div>
          <div class="row auth g-0">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 input-container">
              <div class="input-group mb-3">
                <div class="input-group-prepend">交付人員：</div>
                <div class="input-with-icon">
                  <input type="text" class="form-control readonly_box" aria-label="Default"
                    aria-describedby="inputGroup-sizing-default" readonly :value="validationStatus(1)" />
                  <span class="icon-container">
                    <img src="@/assets/accept.png" class="checkmark-icon" v-show="validation.user1.isValidate" />
                  </span>
                </div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                  驗證
                </button>
                <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false"
                  tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel1">交付人員驗證</h5>
                        <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
                      </div>
                      <div class="modal-body">
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">帳號：</div>
                            <input type="text" class="form-control" aria-label="Default"
                              aria-describedby="inputGroup-sizing-default" v-model="validation.user1.account" />
                          </div>
                        </div>
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">密碼：</div>
                            <input type="password" class="form-control" aria-label="Default"
                              aria-describedby="inputGroup-sizing-default" v-model="validation.user1.password" />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer m-auto">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                          @click="validate(1)">驗證</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 input-container">
              <div class="input-group mb-3">
                <div class="input-group-prepend">入庫人員：</div>
                <div class="input-with-icon">
                  <input type="text" class="form-control readonly_box" aria-label="Default"
                    aria-describedby="inputGroup-sizing-default" readonly :value="validationStatus(2)" />
                  <span class="icon-container">
                    <img src="@/assets/accept.png" class="checkmark-icon" v-show="validation.user2.isValidate" />
                  </span>
                </div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                  驗證
                </button>
                <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false"
                  tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel2">入庫人員驗證</h5>
                        <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
                      </div>
                      <div class="modal-body">
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">帳號：</div>
                            <input type="text" class="form-control" aria-label="Default"
                              aria-describedby="inputGroup-sizing-default" v-model="validation.user2.account" />
                          </div>
                        </div>
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">密碼：</div>
                            <input type="password" class="form-control" aria-label="Default"
                              aria-describedby="inputGroup-sizing-default" v-model="validation.user2.password" />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer m-auto">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                          @click="validate(2)">驗證</button>
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
        <button class="send_btn send_btn_disabled" @click="submit" :disabled="!canSubmit()">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    Navbar,
  },
  setup() {
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
          }
          else if (data.state === 'error') {
            alert(data.messages);
            validation.value.user1.isValidate = false;
          }
        } catch (error) {
          console.error(error);
        }
      }
      else if (user === 2) {
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
          }
          else if (data.state === 'error') {
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
            alert(data.messages);
            router.push({name: 'Store_Process_Datagrid'});
          }
          else if (data.state === 'error') {
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
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

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

    h2 {
      margin-top: 50px;
      text-align: center;
      font-size: 35px;
      font-weight: 600;
      @include title_color;
    }

    .info_wrap {
      padding: 1% 29% 0;

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
          .dropdown-menu {
            width: 100%;
          }

          button {
            @include dropdown-btn;
            width: 187px;
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

        button.send_btn {
          @include search_and_send_btn;

          &:hover {
            background-color: #5e7aa2;
          }
        }

        button.send_btn_disabled {
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

    h2 {
      margin-top: 50px;
      text-align: center;
      font-size: 35px;
      font-weight: 600;
      @include title_color;
    }

    .info_wrap {
      padding: 1% 5% 0;

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
          .dropdown-menu {
            width: 100%;
          }

          button {
            @include dropdown-btn;
            width: 187px;
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

        button.send_btn {
          @include search_and_send_btn;

          &:hover {
            background-color: #5e7aa2;
          }
        }

        button.send_btn_disabled {
          background: #878787;
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
    }

    h1 {
      margin-top: 50px;
      text-align: center;
      font-size: 50px;
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
      padding: 1% 5% 0;

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

        .dropdown {
          .dropdown-menu {
            width: 100%;
          }

          button {
            @include dropdown-btn;
            width: 187px;
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

      .button_wrap {
        display: flex;
        margin-top: 30px;
        justify-content: center;
        padding: 0 15%;
        margin-bottom: 5%;
        gap: 20px;

        button.back_btn {
          @include back_to_previous_btn;

          &:hover {
            background-color: #5d85bb;
          }
        }

        button.send_btn {
          @include search_and_send_btn;

          &:hover {
            background-color: #5e7aa2;
          }
        }

        button.send_btn_disabled {
          background: #878787;
        }
      }

      .confirm_section {
        .auth {
          border-radius: 0 0 10px 10px;
          background: white;
          padding: 10px 10px 0 10px;

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
}</style>
