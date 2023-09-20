<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產入庫交付</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>
            申請人員 : {{ details.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請入庫日期 : {{ details.ApplicationDate }}
          </p>
        </div>
        <div>
          <p>
            資產類型 : {{ details.AssetType}}
          </p>
        </div>
      </div>
      <!-- 上半部表單 -->
      <div class="content">
        <!-- 專案代碼 -->
        <div v-show="details.AssetType === '存貨'" class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              專案代碼：
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.ProjectCode">
          </div>
        </div>
        <!-- 專案名稱 -->
        <div v-show="details.AssetType === '存貨'" class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              專案名稱：
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.ProjectName">
          </div>
        </div>
        <!-- 物流單號 -->
        <div class="col form_search_wrap">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              物流單號 :
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="details.ShipmentNum" readonly>
            <button class="form_search_btn" @click="viewReceive">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{name: 'Receive_View' , query:{ search_id : details.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 設備總類 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                設備總類：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipTypeName">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                設備分類：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipCategoryName">
            </div>
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetName">
          </div>
        </div>
        <!-- 廠商 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.VendorName">
          </div>
        </div>
        <!-- 規格 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductSpec">
          </div>
        </div>
        <!-- 型號 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductType">
          </div>
        </div>
        <!-- 包裝數量 & 包裝單位-->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend info">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">包裝數量：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Count">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                包裝單位：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Unit">
            </div>
          </div>
        </div>
        <!-- 數量 & 單位  -->
        <div v-show="details.AssetType === '耗材'" class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend info">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">數量：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.PackageNum">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                單位：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.PackageUnit">
            </div>
          </div>
        </div>
        <!-- 保固期限 -->
        <div class='row'>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.WarrantyDate">
            </div>
          </div>
        </div>
        <!-- 保固 開始&到期 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固開始日：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.WarrantyStartDate">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固到期日：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.WarrantyEndDate">
            </div>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" aria-label="With textarea" readonly v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
      <!-- 頁籤部分 -->
      <div class="tab_section mt-5">
        <!-- tab頂端頁籤 -->
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button v-for="tab in parseInt(tabNumber)" :key="tab" :class="['nav-link', { active: tab === 1 }]" data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab">{{ tab }}</button>
          </div>
        </nav>
        <!-- tab內容 -->
        <div class="tab-content" id="nav-tabContent">
          <div v-for="(tab, index) in details.Tabs" :key="index" :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel">
            <!-- 頁籤物品名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">物品名稱：</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemAssetName" readonly>
              </div>
            </div>
            <!-- 頁籤資產編號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產編號：</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemAssetsId" readonly>
              </div>
            </div>
            <!-- 頁籤S/N -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemSN" readonly>
              </div>
            </div>
            <!-- 頁籤專案代碼 -->
            <div v-show="details.AssetType === '存貨'" class="col form_search_wrap">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  專案代碼 :
                </div>
                <input type="text" class="form-control readonly_box" aria-label="Default" v-model="tab.itemProjectCode" readonly>
              </div>
            </div>
            <!-- 頁籤專案名稱 -->
            <div v-show="details.AssetType === '存貨'" class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">專案名稱：</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProjectName" readonly>
              </div>
            </div>
            <!-- 頁籤備註 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註：</div>
                <textarea class="col readonly_box" rows="5" v-model="tab.itemMemo" readonly></textarea>
              </div>
            </div>
            <!-- 頁籤上傳檔案部分 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">已上傳檔案：</div>
                <div class="d-flex  flex-column">
                  <div v-for="(file , file_index) in tab.existFile" :key="file_index" class="file_upload_wrap" style="cursor: pointer;">
                    <p @click="viewImgFile(index , file_index)" data-bs-toggle="modal" data-bs-target="#existFile_modal">{{ file.FileName }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- view Modal -->
        <div class="modal fade" id="existFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 800px !important;">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ modalParams.title }}</h5>
              <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
            </div>
            <img :src="modalParams.src" alt="Uploaded Image" class="w-100" />
          </div>
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
              <p>交付日期 : {{ deliveryDate }}</p>
            </div>
          </div>
          <div class="row auth g-0">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 input-container">
              <div class="input-group">
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
              <div class="input-group">
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
        <button class="send_btn" @click="submit" :disabled="!canSubmit()" :class="{ send_btn_disabled: !canSubmit() }">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { onMounted, ref , reactive} from "vue";
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
    const tabNumber = ref(1);
    // Modal Params
    const modalParams = reactive({
      title: '',
      src: '',
    })
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
    // 帶入資料
    async function getDetails() {
      const axios = require('axios');
      try {
        const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsInGetData?ai_id=${AI_ID}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('Details Get成功 資料如下\n', data.resultList);
          details.value = data.resultList;
          if (details.value.WarrantyStartDate) {
            details.value.WarrantyStartDate = details.value.WarrantyStartDate.replace(/\//g, '-');
          }
          if (details.value.WarrantyEndDate) {
            details.value.WarrantyEndDate = details.value.WarrantyEndDate.replace(/\//g, '-');
          }
          tabNumber.value = details.value.Tabs.length
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
    // 查看收貨單
    function viewReceive() {
      if(details.value.AR_ID) {
        const link = document.getElementById('view-receive');
        link.click();
      }
    }
    // 查看已上傳相片
    function viewImgFile(index , file_index) {
      modalParams.title = details.value.Tabs[index].existFile[file_index].FileName;
      modalParams.src = details.value.Tabs[index].existFile[file_index].FileLink;
      console.log('modalParams',modalParams);
    }
    //分別使用帳號密碼驗證、改變驗證狀態 user1為設備工程師 user2為倉管人員
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
        const response = await axios.post('http://192.168.0.177:7008/Account/IdentityValidationForE_Operator', formData, {
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
        const response = await axios.post('http://192.168.0.177:7008/Account/IdentityValidationForW_Operator', formData, {
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
        return validation.value.user1.isValidate ? validation.value.user1.resultName : '未驗證'
      } else if (user === 2) {
        return validation.value.user2.isValidate ? validation.value.user2.resultName : '未驗證'
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
        'DeliveryOperator': validation.value.user1.resultName,
        'AssetsInOperator': validation.value.user2.resultName,
      };
      //將表格資料append到 formData
      for (const fieldName in formFields) {
        formData.append(fieldName, formFields[fieldName]);
        console.log(formData.get(`${fieldName}`));
      }
      const response = await axios.post('http://192.168.0.177:7008/AssetsInMng/Delivery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      try {
        const data = response.data;
        console.log(data);
        if (data.state === 'success') {
          let msg = data.messages;
          msg += '\n單號:' + data.resultList.AI_ID;
          alert(msg);
          router.push({ name: 'Store_Process_Datagrid' });
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
      tabNumber,
      modalParams,
      validation,
      viewReceive,
      viewImgFile,
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
    .form_search_btn {
        @include form_search_btn;
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
      margin: auto;
      width: 800px;
      .fixed_info {
        @include fixed_info;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      .content {
        @include content_bg;

        .form_search_wrap {
            .input-group {
              .input-group-prepend {
                width: 114px;
              }
              input {
                margin-left: 15px !important
              }
            }
          }
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
            white-space: nowrap;
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
    
    .tab_section {
        .nav-tabs {
          button {
            @include tab_section_num;
            background: #5C7897;
          }
          .active {
            @include tab_section_num;
            background: #3E4E5F;
          }
        }
        .tab-content {
          background: #3E4E5F;
          padding: 50px 30px;
          .modal {
            .modal-header {
              background: #3D4E61;
              color: white;
              .close_icon {
                color: white;
                font-weight: 700;
                margin-bottom: 0;
              }
            }
          }
          .dropdown {
            width: 60%;
            .dropdown-menu {
              width: 100%;
              max-height: 250px;
              overflow-y: auto;
              p {
                &:hover {
                  cursor: pointer;
                }
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
            flex-wrap: nowrap;
            span {
              @include red_star
            }
            .selected_file {
              margin-left: 20px;
              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }
              .file_upload_wrap {
                margin-bottom: 0;
                display: flex;
                img {
                  width: 25px;
                  height: 25px;
                }
                p {
                  margin-bottom: 0;
                  font-weight: 700;
                  color: white;
                  &::before {
                    margin-right: 10px;
                    content: '·';
                    font-weight: 700;
                    color: white;
                  }
                }
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
              width: 120px;
              text-align: end;
            }
            .file_wrap {
              display: flex;
              flex-direction: column;
              .choose_btn {
                margin-bottom: 10px;
                @include choose_file_btn;
                &:hover {
                  background: #3f608f;
                }
              }
            }
          }
          .form_search_wrap {
            .input-group {
              .input-group-prepend {
                width: 114px;
              }
              input {
                margin-left: 15px !important
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
    .form_search_btn {
        @include form_search_btn;
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
      margin: auto;
      width: 800px;
  
      .fixed_info {
        @include fixed_info;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      .content {
        @include content_bg;

        .form_search_wrap {
            .input-group {
              .input-group-prepend {
                width: 114px;
              }
              input {
                margin-left: 15px !important
              }
            }
          }

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
            white-space: nowrap;
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
      .tab_section {
        .nav-tabs {
          button {
            @include tab_section_num;
            background: #5C7897;
          }
          .active {
            @include tab_section_num;
            background: #3E4E5F;
          }
        }
        .tab-content {
          background: #3E4E5F;
          padding: 50px 30px;
          .modal {
            .modal-header {
              background: #3D4E61;
              color: white;
              .close_icon {
                color: white;
                font-weight: 700;
                margin-bottom: 0;
              }
            }
          }
          .dropdown {
            width: 60%;
            .dropdown-menu {
              width: 100%;
              max-height: 250px;
              overflow-y: auto;
              p {
                &:hover {
                  cursor: pointer;
                }
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
            flex-wrap: nowrap;
            span {
              @include red_star
            }
            .selected_file {
              margin-left: 20px;
              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }
              .file_upload_wrap {
                margin-bottom: 0;
                display: flex;
                img {
                  width: 25px;
                  height: 25px;
                }
                p {
                  margin-bottom: 0;
                  font-weight: 700;
                  color: white;
                  &::before {
                    margin-right: 10px;
                    content: '·';
                    font-weight: 700;
                    color: white;
                  }
                }
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
              width: 120px;
              text-align: end;
            }
            .file_wrap {
              display: flex;
              flex-direction: column;
              .choose_btn {
                margin-bottom: 10px;
                @include choose_file_btn;
                &:hover {
                  background: #3f608f;
                }
              }
            }
          }
          .form_search_wrap {
            .input-group {
              .input-group-prepend {
                width: 114px;
              }
              input {
                margin-left: 15px !important
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
    }      .form_search_btn {
        border: none;
        color: white;
        width: 60px;
        height: 35px;
        margin-top: 10px;
        font-weight: 700;
        padding: 0 10px;
        background-color: #132238;
        &:hover {
          background-color: #43546d;
        }
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
 .form_search_wrap {
            .input-group {
            
              button {
                margin-left: unset !important
              }
            }
          }
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
            display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
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
    } .tab_section {
        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset !important;
        }
        .nav-tabs {
          button {
            @include tab_section_num;
            background: #5C7897;
          }
          .active {
            @include tab_section_num;
            background: #3E4E5F;
          }
        }
        .tab-content {
          background: #3E4E5F;
          padding: 50px 30px;
          .modal {
            .modal-header {
              background: #3D4E61;
              color: white;
              .close_icon {
                color: white;
                font-weight: 700;
                margin-bottom: 0;
              }
            }
          }
          .dropdown {
            margin-left: unset !important;
            margin-top: 5px;
            .dropdown-menu {
              width: 100%;
              max-height: 250px;
              overflow-y: auto;
              p {
                &:hover {
                  cursor: pointer;
                }
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
            flex-direction: column;
            span {
              @include red_star
            }
            .selected_file {
              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }
              .file_upload_wrap {
                margin-bottom: 0;
                display: flex;
                img {
                  width: 25px;
                  height: 25px;
                }
                p {
                  margin-bottom: 0;
                  font-weight: 700;
                  color: white;
                  &::before {
                    margin-right: 10px;
                    content: '·';
                    font-weight: 700;
                    color: white;
                  }
                }
              }
            }
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              width: 100%;
              border-radius: 0;
              margin-left: unset !important;
              margin-top: 5px;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 100%;
            }
            .file_wrap {
              display: flex;
              flex-direction: column;
              .choose_btn {
                margin-top: 5px;
                margin-bottom: 10px;
                @include choose_file_btn;
                &:hover {
                  background: #3f608f;
                }
              }
            }
          }
        }
      }
  }
}</style>
