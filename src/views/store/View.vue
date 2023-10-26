<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        檢視入庫填報
      </h1>
    </div>
    <div class="info_wrap col mb-5">
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
      <div class="content">
        <!-- 單號 -->
        <div class="col mb-3">
          <div class="input-group">
            <div class="input-group-prepend">單號 :</div>
            <input type="text" class="form-control readonly_box" v-model="AI_ID" readonly>
          </div>
        </div>
        <!-- 物流單號 -->
        <div class="col form_search_wrap mb-3">
          <div class="input-group">
            <div class="input-group-prepend">
              物流單號 :
            </div>
            <div class="search_section">
              <input type="text" class="form-control readonly_box" v-model="details.ShipmentNum" readonly/>
            </div>
            <button class="form_search_btn" @click="viewReceive">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{name: 'Receive_View' , query:{ search_id : details.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col mb-3">
          <div class="input-group">
            <div class="input-group-prepend">備註 :</div>
            <textarea style="height: 200px;" class="form-control readonly_box" aria-label="With textarea" placeholder="最多輸入500字" v-model="details.Memo" disabled></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
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
              <div class="col-12">
                <div class="input-group mb-3 check_box_wrap">
                  <div class="input-group-prepend check_box">
                    資產類型 :
                  </div>
                  <div class="d-flex align-items-center radio_wrap">
                    <div class="form-check ">
                      <input type="radio" class='form-check-input check_box' id="radio1" value="資產" v-model="tab.itemAssetType" :disabled="tab.itemAssetType!=='資產'" />
                      <label class="form-check-label check_box" for='radio1'>資產</label>
                    </div>
                    <div class="form-check">
                      <input type="radio" class='form-check-input check_box ' id="radio2" value="存貨" v-model="tab.itemAssetType" :disabled="tab.itemAssetType!=='存貨'" />
                      <label class="form-check-label check_box" for='radio2' data-toggle="tooltip" data-placement="top" title="註記此資產僅限特定專案出貨所使用">存貨</label>
                    </div>
                    <div class="form-check">
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
                <div class="input-group-prepend">
                  專案代碼 :
                </div>
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
            <div class="row row_wrap g-0">
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
                <div class="input-group mb-3 " id='number'>
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
                <div class="input-group mb-3 justify-content-end" id='unit'>
                  <div class="input-group-prepend ">
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
                <div class="input-group mb-3 justify-content-end" id='unit'>
                  <div class="input-group-prepend">
                    單位 :
                  </div>
                  <input type="text" class="input-number readonly_box" v-model="tab.itemUnit" readonly>
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
            <div class="col">
              <div class="input-group">
                <div class="input-group-prepend">已上傳檔案 :</div>
                <div class="selected_file">
                  <div v-for="(file , file_index) in tab.existFile" :key="file_index" class="file_upload_wrap" style="cursor: pointer;">
                    <p @click="viewImgFile(index , file_index)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">{{ file.FileName }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ViewFile Modal -->
      <div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ modalParams.title }}</h5>
              <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
            </div>
            <div v-show="details.Tabs" class="modal-body">
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
  import Navbar from '@/components/Navbar.vue';
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import {
    onMounted,
    reactive,
    ref
  } from 'vue';
  import {
    goBack
  } from '@/assets/js/common_fn'
  export default {
    components: {
      Navbar
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
      onMounted(() => {
        getDetails();
      });
      // 帶入資料
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsInGetData?ai_id=${AI_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
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
        goBack,
        AI_ID,
        details,
        tabNumber,
        modalParams,
        viewReceive,
        viewImgFile,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  textarea {
    padding: 5px 10px 30px;
  }
  .check_box_wrap {
    .check_box {
      font-weight: 700;
      color: white;
      font-size: 18px;
    }
  }
  .modal {
    .modal-body {
      text-align: center;
      padding: 20px;
      margin: auto;
      img {
        width: 100%;
        height: auto;
      }
    }
    .modal-content {
      margin: auto;
    }
    .modal-input-group-prepend {
      width: auto;
      font-weight: 700;
      font-size: 20px;
    }
    .modal-footer {
      padding: 0 12px 12px;
      border: none;
    }
    .modal-header {
      h5 {
        font-weight: 700;
      }
      background: #528091;
      color: white;
      display: flex;
      justify-content: center;
    }
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      .form_search_btn {
        @include form_search_btn;
      }
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
        width: 850px;
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: calc(100px + 6%);
          text-align: end;
          white-space: nowrap;
          span {
            @include red_star
          }
        }
        .input-number {
          @include count_btn;
          width: 65%;
        }
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .search_section {
            position: relative;
            display: flex;
            flex: 1 1 auto; // width: 100%;
            .options-list {
              position: absolute;
              z-index: 99;
              background-color: white;
              border: 1px solid #ccc;
              max-height: 200px;
              overflow-y: auto;
              list-style-type: none;
              padding: 0;
              margin: 0;
              width: 100%;
              top: 0;
              top: 40px;
              border-radius: 5px;
            }
            .options-list li {
              padding: 10px 10px 0;
              font-size: 18px;
              cursor: pointer; // &:hover {
              //   // background: #7893b7;
              //   // color: white;
              //   font-weight: 700;
              // }
            }
            input {
              height: 35px;
              padding: 10px;
              border-radius: 5px;
              border: none;
            }
            .input-placeholder {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: gray;
              font-size: 14px;
              pointer-events: none;
            }
          }
          .input-group-prepend {
            width: 120px;
          }
          .row_wrap {
            .input-group {
              flex-wrap: nowrap
            }
            .flex {
              width: 130px
            }
          }
          .dropdown {
            width: 218px;
            .dropdown-menu {
              width: 100%;
              p {
                &:hover {
                  cursor: pointer;
                }
              }
            }
            .dropdown-toggle {
              width: 100%;
              @include dropdown-btn;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
        }
        .button_wrap {
          display: flex;
          justify-content: center;
          margin: 30px auto 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
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
          .radio_wrap {
            gap: 0 10px;
            margin-left: 13px !important;
            .check_box {
              margin-right: 10px;
            }
          }
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
              align-items: center;
              display: flex;
              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }
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
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .form_search_btn {
        @include form_search_btn;
      }
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
        width: 700px;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          .search_section {
            position: relative;
            display: flex;
            flex: 1 1 auto; // width: 100%;
            .options-list {
              position: absolute;
              z-index: 99;
              background-color: white;
              border: 1px solid #ccc;
              max-height: 200px;
              overflow-y: auto;
              list-style-type: none;
              padding: 0;
              margin: 0;
              width: 100%;
              top: 0;
              top: 40px;
              border-radius: 5px;
            }
            .options-list li {
              padding: 10px 10px 0;
              font-size: 18px;
              cursor: pointer; // &:hover {
              //   // background: #7893b7;
              //   // color: white;
              //   font-weight: 700;
              // }
            }
            input {
              height: 35px;
              padding: 10px;
              border-radius: 5px;
              border: none;
            }
            .input-placeholder {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: gray;
              font-size: 14px;
              pointer-events: none;
            }
          }
          .row_wrap {
            .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
              margin-left: 6px;
              border-radius: 5px;
            }
          }
          @include content_bg;
          .dropdown {
            .dropdown-menu {
              width: 100%;
              p {
                &:hover {
                  cursor: pointer;
                }
              }
            }
            button {
              @include dropdown-btn;
              width: 199px;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            .input-number {
              width: 199px;
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
              span {
                @include red_star
              }
            }
          }
          #size_wrap {
            flex: 0.74
          }
        }
        .button_wrap {
          display: flex;
          justify-content: center;
          margin: 30px auto 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
            }
          }
        }
        #unit,
        #number {
          flex-wrap: nowrap
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
          .radio_wrap {
            gap: 0 10px;
            margin-left: 10px !important;
            .check_box {
              margin-right: 10px;
            }
          }
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
              align-items: center;
              display: flex;
              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }
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
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .form_search_btn {
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
      .readonly_box {
        @include readonly_box;
      }
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
        .fixed_info {
          display: flex;
          background: #3D4E61;
          color: white;
          font-size: 25px;
          font-weight: 700;
          align-items: center;
          border-radius: 10px 10px 0px 0px;
          flex-direction: column;
          padding: 10px;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .search_section {
            position: relative;
            display: flex;
            flex: 1 1 auto; // width: 100%;
            .options-list {
              position: absolute;
              z-index: 99;
              background-color: white;
              border: 1px solid #ccc;
              max-height: 200px;
              overflow-y: auto;
              list-style-type: none;
              padding: 0;
              margin: 0;
              width: 100%;
              top: 0;
              top: 40px;
              border-radius: 5px;
            }
            .options-list li {
              padding: 10px 10px 0;
              font-size: 18px;
              cursor: pointer; // &:hover {
              //   // background: #7893b7;
              //   // color: white;
              //   font-weight: 700;
              // }
            }
            input {
              height: 35px;
              padding: 10px;
              border-radius: 5px;
              border: none;
            }
            .input-placeholder {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: gray;
              font-size: 14px;
              pointer-events: none;
            }
          }
          .dropdown {
            .dropdown-menu {
              width: 100%;
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
          .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
            margin-left: unset;
            border-radius: 5px;
          }
          .input-group {
            flex-direction: column;
            .input-number {
              width: 100%;
              @include count_btn;
            }
            .form-control {
              height: 35px;
              width: 100%;
              margin-top: 5px;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              white-space: nowrap;
              span {
                @include red_star
              }
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
          justify-content: center;
          margin: 30px auto 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
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
          border-radius: 0 0 10px 10px;
          .check_box {
            margin-right: 10px;
          }
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
              align-items: center;
              display: flex;
              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }
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
  }
</style>