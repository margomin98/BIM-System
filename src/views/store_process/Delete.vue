<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>刪除項目</h1>
    </div>
    <div class="info_wrap col">
      <div class="warn">
        <h4>
          確定刪除以下項目嗎？
        </h4>
      </div>
      <div class="fixed_info">
        <div>
          <p>申請人員: {{ details.Applicant }}</p>
        </div>
        <div>
          <p>申請入庫日期: {{ details.ApplicationDate }}</p>
        </div>
        <div>
          <p>資產類型:{{ details.IsConsumable ? '耗材' : '資產' }}</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">編號：</div>
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
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductSpec" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">規格：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductType" />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend info"><img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"> 包裝數量：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Count" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">包裝單位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Unit" />
            </div>
          </div>
        </div>
        <div v-if="details.IsConsumable" class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend info"><img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">數量：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.PackageNum" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.PackageUnit" />
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
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">交付人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Applicant" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">交付日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ApplicationDate" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetsInOperator" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetsInDate" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <textarea class="form-control readonly_box" style="height: 250px;" aria-label="With textarea" readonly v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
      <div class="tab_section mt-5">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button v-for="tab in parseInt(tabNumber)" :key="tab" :class="['nav-link', { active: tab === 1 }]" data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab" :aria-selected="tab === 0">
                {{ tab }}
              </button>
          </div>
        </nav>
        <div v-if="formData.length > 0" class="tab-content" id="nav-tabContent">
          <div v-for="(item, index) in formData" :key="index" :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel" aria-labelledby="tab1-tab">
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>物品名稱：</div>
                <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="item.AssetName" readonly />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>資產編號：</div>
                <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="item.AssetsId" readonly />
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span>*</span>區域：
                  </div>
                  <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="item.itemAreaName" placeholder="BFXXXXXXXX" readonly />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span>*</span> 櫃位：
                  </div>
                  <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="item.itemLayerName" placeholder="BFXXXXXXXX" readonly />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="item.SN" readonly />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  備註：
                </div>
                <input class="form-control readonly_box" aria-label="With textarea" v-model="item.itemMemo" readonly>
              </div>
            </div>
            <div class="col">
              <!-- 選擇檔案button -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產照片：</div>
                <div class='selected_file'>
                  <p class='title'>已上傳的檔案:</p>
                  <p class='file_upload_wrap' v-for="(file, img_index) in item.existFile" :key="img_index" style="cursor: pointer;">
                    <p @click="showExistFileImage(index, img_index)" data-bs-toggle="modal" data-bs-target="#existFile_modal">
                      {{ file.FileName }}
                    </p>
                    <img class='delete_icon' src="@/assets/trash.png" @click="deleteExistFile(index, img_index)" style="margin-left: 10px;">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ExistFileModal -->
        <div class="modal fade" id="existFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ existFileModalTitle }}</h5>
                <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
              </div>
              <div v-if="formData" class="modal-body">
                <img :src="existFileImageUrl" alt="Existed Image" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <!-- NewFileModal -->
        <div class="modal fade" id="newFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ newFileModalTitle }}</h5>
                <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
              </div>
              <div v-if="formData" class="modal-body">
                <img :src="newFileImageUrl" alt="Uploaded Image" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
      </div>
      <!-- DeleteModal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
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
  </div>
</template>

<script>
  import {
    ref,
    onMounted,
    reactive
  } from 'vue';
  import Navbar from "@/components/Navbar.vue";
  import {
    useRoute
  } from 'vue-router';
  import router from '@/router';
  export default {
    components: {
      Navbar,
    },
    setup() {
      const route = useRoute();
      const tabNumber = ref(0);
      const AI_ID = route.query.search_id;
      onMounted(() => {
        getDetails();
      });
      //上半部表單部分
      const details = ref({});
      //依照單號取得資料並生成tab資料
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.176:7008/GetDBdata/AssetsInGetData?ai_id=${AI_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            // console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            console.log('Details Get成功 資料如下\n', details.value);
            tabNumber.value = details.value.Count;
            //生成tab資料
            initFormDataArray();
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
      //下半部表單部分
      const formData = reactive([]);
      const fileInputs = reactive([]);
      const newFileData = ref(0);
      const newFileImage = ref(0);
      const newFileImageUrl = ref('');
      const newFileModalTitle = ref('');
      const existFileData = ref(0);
      const existFileImage = ref(0);
      const existFileImageUrl = ref('');
      const existFileModalTitle = ref('');
      //生成tab資料
      function initFormDataArray() {
        for (let i = 0; i < tabNumber.value; i++) {
          const initArray = details.value.Tabs[i];
          formData.push({
            AssetName: initArray.itemAssetName,
            AssetsId: initArray.AssetsId,
            itemAreaName: initArray.itemAreaName,
            AreaArray: [],
            itemLayerName: initArray.itemLayerName,
            LayerArray: [],
            LayerInit: '請先選擇區域',
            SN: initArray.SN,
            itemMemo: initArray.itemMemo,
            existFile: initArray.existFile,
            deleteFile: [],
            newFile: [],
            previewUrl: [],
          });
        }
      }
      function showNewFileImage(index, img_index) {
        newFileData.value = index;
        newFileImage.value = img_index;
        getNewFileUrl();
      }
      function showExistFileImage(index, img_index) {
        existFileData.value = index;
        existFileImage.value = img_index;
        getExistFileUrl();
      }
      function getNewFileUrl() {
        newFileImageUrl.value = formData[newFileData.value].previewUrl[newFileImage.value];
        newFileModalTitle.value = formData[newFileData.value].newFile[newFileImage.value].name;
      }
      function getExistFileUrl() {
        existFileImageUrl.value = details.value.Tabs[existFileData.value].existFile[existFileImage.value].FileLink;
        existFileModalTitle.value = details.value.Tabs[existFileData.value].existFile[existFileImage.value].FileName;
      }

      async function deleteData() {
        const form = new FormData();
        form.append('AI_ID' , AI_ID);

        const axios = require('axios');
        const response = await axios.post('http://192.168.0.176:7008/AssetsInMng/ApplicationDelete',form);
        try {
          const data = response.data;
          if(data.state === 'success') {
            let msg = data.messages + '\n';
            msg+= '單號為'+data.resultList.AI_ID;
            alert(msg);
            router.push({name: 'Store_Datagrid'});
          }
          else if(data.state === 'error') {
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
        tabNumber,
        formData,
        fileInputs,
        newFileImageUrl,
        newFileModalTitle,
        existFileImageUrl,
        existFileModalTitle,
        showNewFileImage,
        showExistFileImage,
        goBack,
        deleteData,
      }
    },
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .nav {
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    border: none;
  }
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgb(176, 175, 175);
    border: 1px solid rgb(86, 85, 85);
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
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        width: 800px;
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
              width: 125px;
              text-align: end;
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          margin-bottom: 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
            }
            &:nth-child(2) {
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
            .input-group {
              span {
                @include red_star
              }
              .selected_file {
                margin-left: 10px;
                display: flex;
                align-items: center;
                p.title {
                  font-weight: 700;
                  color: white;
                  margin-bottom: unset !important;
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
            }
          }
        }
      }
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
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 0 5%;
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
              width: 125px;
              text-align: end;
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          margin-bottom: 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
            }
            &:nth-child(2) {
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
            .input-group {
              span {
                @include red_star
              }
              .selected_file {
                margin-left: 10px;
                display: flex;
                align-items: center;
                p.title {
                  font-weight: 700;
                  color: white;
                  margin-bottom: unset !important;
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
            }
          }
        }
      }
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
          .info {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
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
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
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
            .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
              margin-left: unset !important;
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
                width: 100%;
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
