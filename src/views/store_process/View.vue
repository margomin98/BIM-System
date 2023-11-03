<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>檢視入庫作業</h1>
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
      </div>
      <!-- 上半部表單 -->
      <div class="content">
        <!-- 單號 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">單號 :</div>
            <input type="text" class="form-control readonly_box" v-model="AI_ID" readonly />
          </div>
        </div>
        <!-- 狀態 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                狀態 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.Status">
            </div>
          </div>
        </div>
        <!-- 物流單號 -->
        <div class="col form_search_wrap">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              物流單號 :
            </div>
            <input type="text" class="form-control readonly_box" v-model="details.ShipmentNum" readonly>
            <button class="form_search_btn" @click="viewReceive">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{name: 'Receive_View' , query:{ search_id : details.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 交付 人員&日期 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                交付人員 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.DeliveryOperator">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                交付日期 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.DeliveryDate">
            </div>
          </div>
        </div>
        <!-- 入庫 人員&日期 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                入庫人員 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.AssetsInOperator">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                入庫日期 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.AssetsInDate">
            </div>
          </div>
        </div>
      </div>
      <!-- 頁籤部分 -->
      <div v-show="details.Tabs" class="tab_section mt-5">
        <!-- tab頂端頁籤 -->
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button v-for="tab in parseInt(tabNumber)" :key="tab" :class="['nav-link', { active: tab === 1 }]" data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab">{{ tab }}</button>
          </div>
        </nav>
        <!-- tab內容 -->
        <div class="tab-content" id="nav-tabContent">
          <div v-for="(tab, index) in details.Tabs" :key="index" :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel">
            <!-- 頁籤資產類型 -->
            <div class="row">
              <div class="col">
                <div class="input-group mb-3 check_box_wrap">
                  <div class="input-group-prepend check_box">
                    資產類型 :
                  </div>
                  <div class="d-flex align-items-center radio_wrap">
                    <div class="form-check ">
                      <input type="radio" class='form-check-input check_box' id="radio1" value="資產" v-model="tab.itemAssetType" :disabled="tab.itemAssetType!=='資產'" />
                      <label class="form-check-label check_box" for='radio1'>資產</label>
                    </div>
                    <div class="form-check ">
                      <input type="radio" class='form-check-input check_box ' id="radio2" value="存貨" v-model="tab.itemAssetType" :disabled="tab.itemAssetType!=='存貨'" />
                      <label class="form-check-label check_box" for='radio2' data-toggle="tooltip" data-placement="top" title="註記此資產僅限特定專案出貨所使用">存貨</label>
                    </div>
                    <div class="form-check ">
                      <input type="radio" class='form-check-input check_box' id="radio3" value="耗材" v-model="tab.itemAssetType" :disabled="tab.itemAssetType!=='耗材'" />
                      <label class="form-check-label check_box" for='radio3'>耗材</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤專案代碼 -->
            <div class="col form_search_wrap">
              <div class="input-group mb-3">
                <div class="input-group-prepend">專案代碼 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProjectCode" readonly>
              </div>
            </div>
            <!-- 頁籤專案名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">專案名稱 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProjectName" readonly>
              </div>
            </div>
            <!-- 頁籤設備 總類&分類 -->
            <div class="row g-0 row_wrap">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend equipment_wrap">設備總類 :</div>
                  <input type="text" class="form-control readonly_box" v-model="tab.itemEquipTypeName" readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">設備分類 :</div>
                  <input type="text" class="form-control readonly_box" v-model="tab.itemEquipCategoryName" readonly>
                </div>
              </div>
            </div>
            <!-- 頁籤儲位 區域&櫃位 -->
            <div class="row g-0 row_wrap">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend equipment_wrap">儲位區域 :</div>
                  <input type="text" class="form-control readonly_box" v-model="tab.itemAreaName" readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">儲位櫃位 :</div>
                  <input type="text" class="form-control readonly_box" v-model="tab.itemLayerName" readonly>
                </div>
              </div>
            </div>
            <!-- 頁籤物品名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">物品名稱 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemAssetName" readonly>
              </div>
            </div>
            <!-- 頁籤資產編號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產編號 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemAssetsId" readonly>
              </div>
            </div>
            <!-- 頁籤廠商 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">廠商 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemVendorName" readonly>
              </div>
            </div>
            <!-- 頁籤規格 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  規格 :
                </div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProductSpec" readonly>
              </div>
            </div>
            <!--頁籤型號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  型號 :
                </div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProductType" readonly>
              </div>
            </div>
            <!-- 頁籤S/N -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemSN" readonly>
              </div>
            </div>
            <!-- 頁籤 包裝數量 & 包裝單位 -->
            <div class="row g-0 row_wrap">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='number'>
                  <div class="input-group-prepend info  d-xl-block d-lg-block d-md-block d-none">
                    <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">包裝數量 :
                  </div>
                  <div class="input-group-prepend info  d-xl-none d-lg-none d-md-none d-block">
                    包裝數量 :<img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                  </div>
                  <input type="text" class="input-number readonly_box" v-model="tab.itemPackageNum" readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='unit'>
                  <div class="input-group-prepend">
                    包裝單位 :
                  </div>
                  <input type="text" class="input-number readonly_box" v-model="tab.itemPackageUnit" readonly>
                </div>
              </div>
            </div>
            <!-- 頁籤 數量 & 單位 (only耗材) -->
            <div class="row g-0 row_wrap">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='number'>
                  <div class="input-group-prepend d-xl-block d-lg-block d-md-block d-none">
                    <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">數量 :
                  </div>
                  <div class="input-group-prepend d-xl-none d-lg-none d-md-none d-block">
                    數量 :<img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">
                  </div>
                  <input type="text" class="input-number readonly_box" v-model="tab.itemCount" readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='unit'>
                  <div class="input-group-prepend">
                    單位 :
                  </div>
                  <input type="text" class="input-number readonly_box" v-model="tab.itemUnit" readonly>
                </div>
              </div>
            </div>
            <!-- 頁籤保固期限 -->
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    保固期限 :
                  </div>
                  <input type="text" class="form-control readonly_box" v-model="tab.itemWarranty" readonly>
                </div>
              </div>
            </div>
            <!-- 頁籤 保固 開始&結束 -->
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">保固開始日 :</div>
                  <input type="text" class="form-control readonly_box" v-model="tab.itemWarrantyStartDate" readonly/>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">保固到期日 :</div>
                  <input type="text" class="form-control readonly_box" v-model="tab.itemWarrantyEndDate" readonly/>
                </div>
              </div>
            </div>
            <!-- 頁籤備註 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註 :</div>
                <textarea class="col readonly_box" rows="5" v-model="tab.itemMemo" readonly></textarea>
              </div>
            </div>
            <!-- 頁籤上傳檔案部分 -->
            <div class="col selected_file">
              <div class="input-group">
                <div class="input-group-prepend">已上傳檔案 :</div>
                <div class='selected_file_wrap'>
                  <div v-for="(file , file_index) in tab.existFile" :key="fprepile_index" class="file_upload_wrap">
                    <p>{{ file.FileName }}
                      <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="viewImgFile(index , file_index)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- view Modal -->
        <div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
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
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    ref,
    reactive
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import {
    goBack
  } from "@/assets/js/common_fn";
  export default {
    components: {
      Navbar,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AI_ID = route.query.search_id;
      const details = ref({});
      const tabNumber = ref(0);
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
      onMounted(() => {
        getDetails();
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
            details.value.Tabs.forEach(tab => {
              if (tab.itemWarrantyStartDate) {
                tab.itemWarrantyStartDate = tab.itemWarrantyStartDate.replace(/-/g, '/');
              }
              if (tab.itemWarrantyEndDate) {
                tab.itemWarrantyEndDate = tab.itemWarrantyEndDate.replace(/-/g, '/');
              }
            });
            if (details.value.AssetsInDate) {
              details.value.AssetsInDate = details.value.AssetsInDate.replace(/-/g, '/');
            }
            if (details.value.DeliveryDate) {
              details.value.DeliveryDate = details.value.DeliveryDate.replace(/-/g, '/');
            }
            if (details.value.ApplicationDate) {
              details.value.ApplicationDate = details.value.ApplicationDate.replace(/-/g, '/');
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
        if (details.value.AR_ID) {
          const link = document.getElementById('view-receive');
          link.click();
        }
      }
      // 查看已上傳相片
      function viewImgFile(index, file_index) {
        modalParams.title = details.value.Tabs[index].existFile[file_index].FileName;
        modalParams.src = details.value.Tabs[index].existFile[file_index].FileLink;
        console.log('modalParams', modalParams);
      }
      return {
        AI_ID,
        details,
        tabNumber,
        modalParams,
        validation,
        viewReceive,
        viewImgFile,
        goBack,
      }
    },
  };
</script>
<style lang="scss" scoped>
  textarea {
    padding: 5px 10px 30px;
  }
  @import "@/assets/css/global.scss";
  .view_icon {
    cursor: pointer;
  }
  .check_box_wrap {
    .radio_wrap {
      margin-left: unset !important;
    }
    .check_box {
      font-weight: 700;
      color: white;
      font-size: 18px;
    }
  }
  .modal {
    .modal-header {
      background: #528091;
      color: white;
      .close_icon {
        color: white;
        font-weight: 700;
        margin-bottom: 0;
      }
    }
  }
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
      .info_wrap {
        width: 850px;
        margin: auto;
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
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 125px;
              text-align: end;
              white-space: nowrap;
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          gap: 20px;
          margin-bottom: 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
            }
            &:nth-child(2) {
              @include empty_btn;
              &:hover {
                background-color: #5e7aa2;
              }
            }
            &:nth-child(3) {
              display: inline-flex;
              padding: 10px 10px;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              background: #385E96;
              height: 40px;
              width: 90px;
              color: #FFF;
              text-align: center;
              font-size: 20px;
              font-weight: 700;
              border: none;
              &:hover {
                background-color: #57677c;
              }
            }
            &:nth-child(4) {
              @include search_and_send_btn;
              &:hover {
                background-color: #5e7aa2;
              }
            }
          }
        }
        .tab_section {
          .nav {
            overflow-x: auto;
            overflow-y: hidden;
            flex-wrap: nowrap;
            border: none;
          }
           ::-webkit-scrollbar {
            height: 6px;
            border: 1px solid rgb(219, 218, 218);
            border-radius: 5px;
            width: 8px;
          }
           ::-webkit-scrollbar-thumb {
            display: block;
            border-radius: 5px;
            background-color: rgb(176, 175, 175);
            border: 1px solid rgb(86, 85, 85);
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
            border-radius: 0 0 10px 10px;
            .selected_file {
              .selected_file_wrap {
                flex-direction: column;
                .file_upload_wrap {
                  margin-bottom: 0;
                  display: flex;
                  img {
                    width: 25px;
                    height: 25px;
                  }
                  p {
                    font-weight: 700;
                    margin-bottom: 5px;
                    color: white;
                    word-break: break-word;
                    &::before {
                      margin-right: 10px;
                      content: '·';
                      font-weight: 700;
                      color: white;
                    }
                  }
                }
              }
            }
            .check_box {
              margin-right: 10px;
            }
            .input-group-prepend {
              width: 135px;
            }
            .readonly_box {
              width: 63%;
            }
            .input-group {
              flex-wrap: nowrap;
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
                text-align: end;
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
      .info_wrap {
        width: 750px;
        margin: auto;
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
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 125px;
              text-align: end;
              white-space: nowrap;
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          gap: 20px;
          margin-bottom: 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
            }
            &:nth-child(2) {
              @include empty_btn;
              &:hover {
                background-color: #5e7aa2;
              }
            }
            &:nth-child(3) {
              display: inline-flex;
              padding: 10px 10px;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              background: #385E96;
              height: 40px;
              width: 90px;
              color: #FFF;
              text-align: center;
              font-size: 20px;
              font-weight: 700;
              border: none;
              &:hover {
                background-color: #57677c;
              }
            }
            &:nth-child(4) {
              @include search_and_send_btn;
              &:hover {
                background-color: #5e7aa2;
              }
            }
          }
        }
        .tab_section {
          .nav {
            overflow-x: auto;
            overflow-y: hidden;
            flex-wrap: nowrap;
            border: none;
          }
           ::-webkit-scrollbar {
            height: 6px;
            border: 1px solid rgb(219, 218, 218);
            border-radius: 5px;
            width: 8px;
          }
           ::-webkit-scrollbar-thumb {
            display: block;
            border-radius: 5px;
            background-color: rgb(176, 175, 175);
            border: 1px solid rgb(86, 85, 85);
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
            border-radius: 0 0 10px 10px;
            .selected_file {
              .file_upload_wrap {
                margin-bottom: 0;
                display: flex;
                img {
                  width: 25px;
                  height: 25px;
                }
                p {
                  font-weight: 700;
                  margin-bottom: 0;
                  color: white;
                  word-break: break-word;
                  display: flex;
                  align-items: center;
                  &::before {
                    margin-right: 10px;
                    content: '·';
                    font-weight: 700;
                    color: white;
                  }
                }
              }
            }
            .check_box {
              margin-right: 10px;
            }
            .input-group-prepend {
              width: 115px;
            }
            .readonly_box {
              width: 63%;
            }
            .input-group {
              flex-wrap: nowrap;
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
                text-align: end;
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
      .form_search_btn {
        border: none;
        color: white;
        width: 60px;
        height: 35px;
        margin-top: 10px;
        font-weight: 700;
        padding: 0 10px;
        margin-left: unset !important;
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
      .info_wrap {
        padding: 1% 5% 0;
        .fixed_info {
          @include fixed_info;
          flex-direction: column;
          padding: 10px;
          height: unset;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .input-group {
            flex-direction: column;
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              border-radius: 0;
              width: 100%;
              margin-top: 5px;
              margin-left: unset !important;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 100%;
            }
          }
          .info {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          gap: 20px;
          margin-bottom: 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              padding: 10px;
              &:hover {
                background-color: #5d85bb;
              }
            }
            &:nth-child(2) {
              @include empty_btn;
              padding: 10px;
              &:hover {
                background-color: #5e7aa2;
              }
            }
            &:nth-child(3) {
              display: inline-flex;
              padding: 10px 10px;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              background: #385E96;
              height: 40px;
              width: 90px;
              color: #FFF;
              text-align: center;
              font-size: 20px;
              font-weight: 700;
              border: none;
              padding: 10px;
              &:hover {
                background-color: #57677c;
              }
            }
            &:nth-child(4) {
              @include search_and_send_btn;
              padding: 10px;
              &:hover {
                background-color: #5e7aa2;
              }
            }
          }
        }
        .tab_section {
          .nav {
            overflow-x: auto;
            overflow-y: hidden;
            flex-wrap: nowrap;
            border: none;
          }
           ::-webkit-scrollbar {
            height: 6px;
            border: 1px solid rgb(219, 218, 218);
            border-radius: 5px;
            width: 8px;
          }
           ::-webkit-scrollbar-thumb {
            display: block;
            border-radius: 5px;
            background-color: rgb(176, 175, 175);
            border: 1px solid rgb(86, 85, 85);
          }
          .check_box_wrap {
            .check_box {
              margin-right: 10px;
            }
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
            border-radius: 0 0 10px 10px;
            .selected_file {
              .input-group {
                flex-direction: column;
              }
              .file_upload_wrap {
                margin-bottom: 0;
                display: flex;
                img {
                  width: 25px;
                  height: 25px;
                }
                p {
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: white;
                  word-break: break-word;
                  &::before {
                    margin-right: 10px;
                    content: '·';
                    font-weight: 700;
                    color: white;
                  }
                }
              }
            }
            .input-group {
              flex-direction: column;
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
            }
          }
        }
      }
    }
  }
</style>
