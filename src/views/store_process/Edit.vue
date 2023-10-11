<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產入庫作業</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>申請人員: {{ details.Applicant }}</p>
        </div>
        <div>
          <p>申請入庫日期: {{ details.ApplicationDate }}</p>
        </div>
      </div>
      <!-- 上半部表單 -->
      <div class="content">
        <!-- 單號 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">單號：</div>
            <input type="text" class="form-control readonly_box" v-model="AI_ID" readonly />
          </div>
        </div>
        <!-- 狀態 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                狀態：
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
                交付人員：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.DeliveryOperator">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                交付日期：
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
                入庫人員：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="AssetsInOperator">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                入庫日期：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="AssetsInDate">
            </div>
          </div>
        </div>
      </div>
      <!-- 頁籤部分 -->
      <div class="tab_section mt-5">
        <nav>
          <!-- 標頭 -->
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button v-for="tab in parseInt(tabData.length)" :key="tab" :class="['nav-link', { active: tab === 1 }]" data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab" :aria-selected="tab === 0">
                {{ tab }}
              </button>
          </div>
        </nav>
        <div v-if="tabData.length > 0" class="tab-content" id="nav-tabContent">
          <div v-for="(tab, index) in tabData" :key="index" :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel" aria-labelledby="tab1-tab">
            <!-- 頁籤專案類型 -->
            <div class="row">
              <div class="col-12">
                <div class="input-group mb-3 check_box_wrap">
                  <div class="input-group-prepend check_box">
                    專案類型：
                  </div>
                  <div class="d-flex align-items-center radio_wrap">
                    <input type="radio" class='form-check-input check_box' id="radio1" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="資產" v-model="tab.itemAssetType" @change="resetUnitCount(index)" />
                    <label class="form-check-label check_box" for='radio1'>資產</label>
                    <input type="radio" class='form-check-input check_box ' id="radio2" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="存貨" v-model="tab.itemAssetType" @change="resetUnitCount(index)" />
                    <label class="form-check-label check_box" for='radio2' data-toggle="tooltip" data-placement="top" title="註記此資產僅限特定專案出貨所使用">存貨</label>
                    <input type="radio" class='form-check-input check_box' id="radio3" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="耗材" v-model="tab.itemAssetType" />
                    <label class="form-check-label check_box" for='radio3'>耗材</label>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤專案代碼 -->
            <div class="col form_search_wrap">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span v-show="tab.itemAssetType === '存貨'">*</span>專案代碼：
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="tab.itemProjectCode">
                <button class="form_search_btn" @click="getProjectName(index)">搜尋</button>
              </div>
            </div>
            <!-- 頁籤專案名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">專案名稱：</div>
                <input type="text" class="form-control readonly_box" aria-label="Default" v-model="tab.itemProjectName" readonly/>
              </div>
            </div>
            <!-- 頁籤 設備總類 & 設備分類-->
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>設備總類：</div>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                        {{ tab.itemEquipTypeName || '請選擇' }}
                      </button>
                    <div class="dropdown-menu" aria-labelledby="typeDropdown">
                      <p v-for="item in DropdownArray.EquipType" class="dropdown-item" @click="selectType(item , index)">{{ item.Name }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3 justify-content-end">
                  <div class="input-group-prepend"><span>*</span>設備分類：</div>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="!tab.itemEquipTypeName">
                        {{ tab.itemEquipCategoryName || tab.EquipCategoryInit }}
                      </button>
                    <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                      <p v-for="item in tab.EquipCategoryArray" class="dropdown-item" @click="selectCategory(item , index)">{{ item.Name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤儲位 區域&櫃位 -->
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>儲位區域：</div>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName(index)">
                          {{ tab.itemAreaName || '請選擇' }}
                        </button>
                    <div class="dropdown-menu" aria-labelledby="areaDropdown">
                      <p v-for="(item, area_index) in DropdownArray.Area" :key="area_index" class="dropdown-item" @click="selectArea(index, item)">{{ item.Name }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3 justify-content-end">
                  <div class="input-group-prepend"><span>*</span>儲位櫃位：</div>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="!tab.itemAreaName">
                          {{ tab.itemLayerName || tab.LayerInit }}
                        </button>
                    <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                      <p v-for="(item, layer_index) in tab.LayerArray" :key="layer_index" class="dropdown-item" @click="selectLayer(index, item)">{{ item.Name }}</p>
                    </div>
                  </div>
                  <!-- <input type="text" class="form-control " aria-label="Default" aria-describedby="inputGroup-sizing-default" /> -->
                </div>
              </div>
            </div>
            <!-- 頁籤物品名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>物品名稱：</div>
                <input type="text" class="form-control" placeholder="最多輸入20字" v-model="tab.itemAssetName" />
              </div>
            </div>
            <!-- 頁籤資產編號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>資產編號：</div>
                <input type="text" class="form-control" v-model="tab.itemAssetsId" placeholder="BFXXXXXXXX" :class="{'readonly_box': details.Type === 1}" :disabled="details.Type === 1" />
              </div>
            </div>
            <!-- 頁籤廠商 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">廠商：</div>
                <input type="text" class="form-control " aria-label="Default" placeholder="最多輸入100字" v-model="tab.itemVendorName" />
              </div>
            </div>
            <!-- 頁籤規格 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">規格：</div>
                <input type="text" class="form-control " aria-label="Default" placeholder="最多輸入100字" v-model="tab.itemProductSpec" />
              </div>
            </div>
            <!-- 頁籤型號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">型號：</div>
                <input type="text" class="form-control " aria-label="Default" placeholder="最多輸入100字" v-model="tab.itemProductType" />
              </div>
            </div>
            <!-- 頁籤S/N -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input type="text" class="form-control" aria-label="Default" placeholder="最多輸入100字" v-model="tab.itemSN" />
              </div>
            </div>
            <!-- 頁籤 包裝數量 & 包裝單位 -->
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend info"><img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"> 包裝數量：
                  </div>
                  <input type="number" class="input-number readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="tab.itemPackageNum" />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3 justify-content-end">
                  <div class="input-group-prepend"><span>*</span>包裝單位：</div>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ tab.itemPackageUnit || '請選擇' }}
                      </button>
                    <div class="dropdown-menu" aria-labelledby="areaDropdown">
                      <p v-for="item in DropdownArray.PackageUnit" class="dropdown-item" @click="selectPackageUnit(item , index)">{{ item }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤 數量 & 單位 -->
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend info"><img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">
                    <span v-show="tab.itemAssetType === '耗材'">*</span>數量：
                  </div>
                  <input v-if="tab.itemAssetType === '耗材'" class="input-number" type="number" v-model="tab.itemCount" min="1">
                  <input v-else class="input-number readonly_box" type="number" v-model="tab.itemPackageNum" min="1" readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3 justify-content-end">
                  <div class="input-group-prepend"><span v-show="tab.itemAssetType === '耗材'">*</span>單位：</div>
                  <div v-if="tab.itemAssetType === '耗材'" class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="tab.itemAssetType !== '耗材'">
                          {{ tab.itemUnit || '請選擇' }}
                        </button>
                    <div class="dropdown-menu" aria-labelledby="areaDropdown">
                      <p v-for="item in DropdownArray.Unit" class="dropdown-item" @click="selectUnit(item , index)">{{ item }}</p>
                    </div>
                  </div>
                  <input v-else class="input-number readonly_box" type="text" v-model="tab.itemPackageUnit" min="1" readonly>
                </div>
              </div>
            </div>
            <!-- 頁籤保固期限 -->
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    保固期限：
                  </div>
                  <input type="text" class="form-control" placeholder="最多輸入10字" v-model="tab.itemWarranty">
                </div>
              </div>
            </div>
            <!-- 頁籤 保固 開始&結束 -->
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">保固開始日：</div>
                  <input type="date" class="form-control " v-model="tab.itemWarrantyStartDate" />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">保固到期日：</div>
                  <input type="date" class="form-control " v-model="tab.itemWarrantyEndDate" />
                </div>
              </div>
            </div>
            <!-- 頁籤備註 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  備註：
                </div>
                <textarea class="col" rows="5" placeholder="最多輸入500字" v-model="tab.itemMemo"></textarea>
              </div>
            </div>
            <!-- 頁籤選擇檔案 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產照片 :</div>
                <div class="mb-3 file_wrap">
                  <button class='choose_btn' @click="openFileExplorer(index)">選擇檔案</button>
                  <input type="file" accept="image/*" ref="fileInputs" style="display: none;" multiple @change="handleFileChange(index , $event)" />
                </div>
              </div>
            </div>
            <div class="selected_file col">
              <div class="input-group">
                <div class="input-group-prepend">已選擇檔案 :</div>
                <div v-for="(file , file_index) in tab.viewFile" :key="file_index" class="file_upload_wrap" style="cursor: pointer;">
                  <p @click="viewImgFile('new',index , file_index)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">{{ file.FileName }}</p>
                  <img class="delete_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="deleteFileFunction('new',index,file_index)">
                </div>
              </div>
            </div>
            <!-- 頁籤已上傳檔案 -->
            <div class="col selected_file">
              <div class="input-group mt-3">
                <div class="input-group-prepend">已上傳檔案 :</div>
                <div v-for="(file , file_index) in tab.existFile" :key="file_index" class="file_upload_wrap" style="cursor: pointer;">
                  <p @click="viewImgFile('exist',index , file_index)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">{{ file.FileName }}</p>
                  <img class="delete_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="deleteFileFunction('exist',index,file_index)">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ViewFile Modal -->
        <div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width: 800px !important;">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ modalParams.title }}</h5>
                <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
              </div>
              <div v-show="tabData" class="modal-body">
                <img :src="modalParams.src" alt="Uploaded Image" class="w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="save_btn" @click="temp">暫存</button>
        <button class="send_btn" @click="submit">送出</button>
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
  import axios from 'axios';
  import {
    UnitArray,
    PackageUnitArray
  } from '@/assets/js/dropdown'
  import {
    getApplication,
    getEquipType,
    getEquipCategory,
    getArea,
    getLayer,
    getProject
  } from '@/assets/js/common_api';
  import {
    getDate,
    goBack
  } from '@/assets/js/common_fn';
  export default {
    components: {
      Navbar,
    },
    setup() {
      const route = useRoute();
      const AI_ID = route.query.search_id;
      const DropdownArray = reactive({
        EquipType: [],
        Area: [],
        Unit: UnitArray,
        PackageUnit: PackageUnitArray,
      })
      const AssetsInDate = ref('');
      const AssetsInOperator = ref('');
      //上半部表單部分
      const details = ref({});
      //下半部頁籤部分
      const tabData = reactive([]);
      const fileInputs = reactive([]);
      // Modal Params
      const modalParams = reactive({
        title: '',
        src: '',
      })
      onMounted(() => {
        getApplicationInfo(); // 申請人
        getDetails();
        AssetsInDate.value = getDate();
      });
      //依照單號取得資料並生成tab資料
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsInGetData?ai_id=${AI_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            // console.log('Details Get成功 資料如下\n', data.resultList);
            if (data.resultList.Status !== '待入庫') {
              window.history.back();
              // router.push({name: 'Store_Process_Datagrid'});
            }
            details.value = data.resultList;
            console.log('Details Get成功 資料如下\n', details.value);
            //生成tab資料
            details.value.Tabs.forEach(tab => {
              tabData.push({
                ...tab, // 保留原始 tab 的所有屬性
                LayerInit: '請先選擇區域',
                deleteFile: [],
                newFile: [],
                viewFile: [],
                // 如果需要，可以選擇性地添加其他屬性，或者不需要添加viewFile屬性
              });
              if (tab.itemAreaName) {
                getLayerName(0);
              }
              if (tab.itemEquipTypeName) {
                getEquipCategoryName(0);
              }
            });
            if (details.value.DeliveryDate) {
              details.value.DeliveryDate = details.value.DeliveryDate.replace(/-/g, '/');
            }
            if (details.value.ApplicationDate) {
              details.value.ApplicationDate = details.value.ApplicationDate.replace(/-/g, '/');
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
      async function getAreaName() {
        if (DropdownArray.Area.length == 0) {
          getArea()
            .then((data) => {
              DropdownArray.Area = data;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      async function getLayerName(index) {
        getLayer(tabData[index].itemArea_Id)
          .then((data) => {
            tabData[index].LayerArray = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      async function getEquipTypeName() {
        if (DropdownArray.EquipType.length == 0) {
          getEquipType()
            .then((data) => {
              DropdownArray.EquipType = data;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      async function getEquipCategoryName(index) {
        var params = tabData[index].itemEquipType_Id
        getEquipCategory(params)
          .then((data) => {
            tabData[index].EquipCategoryArray = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      async function getProjectName(index) {
        let code = ''
        if (tabData[index].itemProjectCode) {
          tabData[index].itemProjectCode = tabData[index].itemProjectCode.trim();
        }
        code = tabData[index].itemProjectCode;
        if (!/^(?![ 　]{10}$)[\s\S]{1,10}$/.test(code)) {
          alert('專案代碼格式錯誤');
          return;
        }
        getProject(code)
          .then((data) => {
            tabData[index].itemProjectName = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      async function getApplicationInfo() {
        getApplication()
          .then((data) => {
            AssetsInOperator.value = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      // 暫存
      async function temp() {
        var InputMessages = '';
        var InputError = false;
        // 只檢查 1.物品名稱必填 2.其他子項目是否超過字數限制(不額外寫function) 3.有填的專案代碼是否有效
        for (let i = 0; i < tabData.length; i++) {
          const form = tabData[i];
          //1. 檢查暫存必填項目(物品名稱)
          form.itemAssetName = form.itemAssetName.trim()
          if (!form.itemAssetName) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　物品名稱必填' + '\n';
          }
          //2. 檢查字數限制
          // 專案代碼不可超過10字
          if (!/^[\s\S]{0,10}$/.test(form.itemProjectCode)) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　專案代碼不可輸入超過10字' + '\n';
          }
          // 保固期限不可超過10字
          if (!/^[\s\S]{0,10}$/.test(form.itemWarranty)) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　保固期限不可輸入超過10字' + '\n';
          }
          // 物品名稱不可超過20字
          if (!/^[\s\S]{0,20}$/.test(form.itemAssetName)) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　物品名稱不可輸入超過20字' + '\n';
          }
          // 廠商、規格、型號、S/N、備註不可超過100/500字
          if (form.itemVendorName) {
            form.itemVendorName = form.itemVendorName.trim();
            if (!/^[\s\S]{1,100}$/.test(form.itemVendorName)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　廠商不可輸入超過100字' + '\n';
            }
          }
          if (form.itemProductSpec) {
            form.itemProductSpec = form.itemProductSpec.trim();
            if (!/^[\s\S]{1,100}$/.test(form.itemProductSpec)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　規格不可輸入超過100字' + '\n';
            }
          }
          if (form.itemProductType) {
            form.itemProductType = form.itemProductType.trim();
            if (!/^[\s\S]{1,100}$/.test(form.itemProductType)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　型號不可輸入超過100字' + '\n';
            }
          }
          if (form.itemSN) {
            form.itemSN = form.itemSN.trim();
            if (!/^[\s\S]{1,100}$/.test(form.itemSN)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　S/N不可輸入超過100字' + '\n';
            }
          }
          if (form.itemMemo) {
            form.itemMemo = form.itemMemo.trim();
            if (!/^[\s\S]{1,500}$/.test(form.itemMemo)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　備註不可輸入超過500字' + '\n';
            }
          }
        }
        if (InputError) {
          alert(InputMessages);
          return;
        }
        // 3.檢查頁籤專案代碼是否有效
        let projectCodeList = [];
        tabData.forEach((item,index)=>{
          if(item.itemProjectCode) {
            projectCodeList.push({
              PadNum: index,
              projectCode: item.itemProjectCode,
            })
          }
        })
        if(projectCodeList.length !== 0) {
          console.log('projectCodeList:', projectCodeList);
          try {
            const messages =  await checkProjectCode(projectCodeList);
            if(messages !== 'success') {
              alert(messages);
              throw new Error(messages);
            }
          } catch (error) {
            console.error(error);
            return
          }
        }
        const filePromises = [];
        for (let i = 0; i < tabData.length; i++) {
          filePromises.push(sendFileForm(tabData[i], i));
        }
        await Promise.all(filePromises)
          .then(result => {
            const allSuccess = result.every(result => result === 'success');
            if (allSuccess) {
              alert('表單暫存成功\n單號為:' + AI_ID);
              window.location.reload();
            } else {
              alert('表單暫存失敗');
            }
          })
          .catch(error => {
            console.error(error);
          })
      }
      // 送出
      async function submit() {
        if (!checkRequireParams()) {
          return;
        }
        //若是新品入庫 檢查資產編號是否有重複
        if (details.value.Type === 0) {
          if (await checkAssetsIdRepeat()) {
            return;
          }
        }
        // 檢查頁籤專案代碼是否有效
        let projectCodeList = [];
        tabData.forEach((item,index)=>{
          if(item.itemProjectCode) {
            projectCodeList.push({
              PadNum: index,
              projectCode: item.itemProjectCode,
            })
          }
        })
        if(projectCodeList.length !== 0) {
          console.log('projectCodeList:', projectCodeList);
          try {
            const messages =  await checkProjectCode(projectCodeList);
            if(messages !== 'success') {
              alert(messages);
              throw new Error(messages);
            }
          } catch (error) {
            console.error(error);
            return
          }
        }
        const filePromises = [];
        for (let i = 0; i < tabData.length; i++) {
          filePromises.push(sendFileForm(tabData[i], i));
        }
        await Promise.all(filePromises)
          .then(result => {
            const allSuccess = result.every(result => result === 'success');
            if (allSuccess) {
              // 全部暫存成功後，打api轉狀態
              const form = new FormData();
              form.append('AI_ID', AI_ID);
              axios.post('http://192.168.0.177:7008/AssetsInMng/AssetsIn', form)
                .then((response) => {
                  const data = response.data
                  if (data.state === 'success') {
                    // 成功
                    alert('入庫成功\n單號為:' + AI_ID);
                    router.push({
                      name: 'Store_Process_Datagrid'
                    });
                  } else if (data.state === 'account_error') {
                    alert(data.messages);
                    router.push('/');
                  } else {
                    alert(data.messages);
                  }
                })
                .catch((error) => {
                  console.error(error);
                })
            } else {
              alert('表單送出失敗');
            }
          })
          .catch(error => {
            console.error(error);
          })
      }
      // 單次傳送頁籤
      function sendFileForm(tabData, index) {
        return new Promise((resolve, reject) => {
          const form = new FormData();
          for (const key in tabData) {
            // 不為null、undefined、空字串就append
            if (tabData[key]) {
              form.append(key, tabData[key]);
            }
          }
          // 先剔除不需要key值
          form.delete('EquipCategoryArray')
          form.delete('EquipCategoryInit')
          form.delete('itemEquipCategoryName')
          form.delete('itemEquipTypeName')
          form.delete('itemAreaName')
          form.delete('itemLayerName')
          form.delete('itemProjectName')
          form.delete('viewFile')
          form.delete('existFile')
          // 不是耗材的話 剔除itemCount、itemUnit
          if (tabData.itemAssetType !== '耗材') {
            form.delete('itemUnit')
            form.delete('itemCount')
          }
          // newFile額外append 先剔除
          form.delete('newFile')
          for (let i = 0; i < tabData.newFile.length; i++) {
            form.append('newFile', tabData.newFile[i]);
          }
          // deleteFile額外append 先剔除
          form.delete('deleteFile')
          for (let i = 0; i < tabData.deleteFile.length; i++) {
            form.append('deleteFile', tabData.deleteFile[i]);
          }
          const axios = require('axios');
          axios.post('http://192.168.0.177:7008/AssetsInMng/ItemEdit', form)
            .then((response) => {
              const data = response.data;
              if (data.state === 'success') {
                // 文件表单提交成功，继续执行
                console.log(`第${index+1}個頁籤上傳成功`);
                resolve(data.state)
              } else {
                // 如果状态不是 "success"，调用 reject 并传递错误信息
                console.error(`第${index+1}個頁籤上傳失敗，${data.messages}`);
              }
            })
            .catch(error => {
              // 如果提交失败，调用 reject 并传递错误信息
              reject(error);
            });
        });
      }
      //檢查 1. itemAssetsId之間是否重複 2. itemAseetsId比對資料庫是否重複
      async function checkAssetsIdRepeat() {
        var myForm = [];
        for (let i = 0; i < tabData.length; i++) {
          const form = tabData[i];
          myForm.push(form.itemAssetsId);
        }
        console.log(myForm);
        //1.
        var seen = {};
        for (const value of myForm) {
          if (seen[value]) {
            alert('頁籤內資產編號不可重複，請再次確認資產編號欄位')
            return true
          }
          seen[value] = true;
        }
        //2.
        const repeatForm = new FormData();
        for (let i = 0; i < tabData.length; i++) {
          repeatForm.append('assetsIds', myForm[i]);
        }
        const axios = require('axios');
        const response = await axios.post('http://192.168.0.177:7008/GetDBdata/CheckAssetsInID', repeatForm);
        try {
          const data = response.data;
          if (data.state === 'error') {
            alert(data.messages);
            return true;
          }
        } catch (error) {
          console.error(error);
        }
        return false;
      }
      // 檢查送出頁籤
      function checkRequireParams() {
        // 檢查頁籤必填、格式
        // 必填只需檢查:設備分類、物品名稱、資產編號格式、儲位區域&櫃位、存貨的專案代碼、耗材的數量&單位
        const BF_pattern = /^(BF\d{8})$/;
        var InputMessages = '';
        var InputError = false;
        for (let i = 0; i < tabData.length; i++) {
          const form = tabData[i];
          // 設備分類必填
          if (!form.itemCategory_Id) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　設備分類必填' + '\n';
          }
          // 物品名稱必填
          form.itemAssetName = form.itemAssetName.trim()
          if (!form.itemAssetName) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　物品名稱必填' + '\n';
          }
          // 資產編號必填
          if (!BF_pattern.test(form.itemAssetsId)) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　資產編號不符合格式' + '\n';
          }
          // 儲位區域必填
          if (!form.itemArea_Id) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　儲位區域必填' + '\n';
          }
          // 儲位櫃位必填
          if (!form.itemLayer_Id) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　儲位櫃位必填' + '\n';
          }
          // 存貨需額外檢查專案代碼
          if (form.itemAssetType === '存貨' && !form.itemProjectCode) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　專案代碼必填' + '\n';
          }
          // 耗材需額外檢查 數量、單位
          if (form.itemAssetType === '耗材') {
            if (!form.itemCount) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　數量必填' + '\n';
            }
            if (!form.itemUnit) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　單位必填' + '\n';
            }
          }
          // 專案代碼不可超過10字
          if (!/^[\s\S]{0,10}$/.test(form.itemProjectCode)) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　專案代碼不可輸入超過10字' + '\n';
          }
          // 保固期限不可超過10字
          if (!/^[\s\S]{0,10}$/.test(form.itemWarranty)) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　保固期限不可輸入超過10字' + '\n';
          }
          // 物品名稱不可超過20字
          if (!/^[\s\S]{0,20}$/.test(form.itemAssetName)) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　物品名稱不可輸入超過20字' + '\n';
          }
          // 廠商、規格、型號、S/N、備註不可超過100/500字
          if (form.itemVendorName) {
            form.itemVendorName = form.itemVendorName.trim();
            if (!/^[\s\S]{1,100}$/.test(form.itemVendorName)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　廠商不可輸入超過100字' + '\n';
            }
          }
          if (form.itemProductSpec) {
            form.itemProductSpec = form.itemProductSpec.trim();
            if (!/^[\s\S]{1,100}$/.test(form.itemProductSpec)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　規格不可輸入超過100字' + '\n';
            }
          }
          if (form.itemProductType) {
            form.itemProductType = form.itemProductType.trim();
            if (!/^[\s\S]{1,100}$/.test(form.itemProductType)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　型號不可輸入超過100字' + '\n';
            }
          }
          if (form.itemSN) {
            form.itemSN = form.itemSN.trim();
            if (!/^[\s\S]{1,100}$/.test(form.itemSN)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　S/N不可輸入超過100字' + '\n';
            }
          }
          if (form.itemMemo) {
            form.itemMemo = form.itemMemo.trim();
            if (!/^[\s\S]{1,500}$/.test(form.itemMemo)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　備註不可輸入超過500字' + '\n';
            }
          }
        }
        if (InputError) {
          alert(InputMessages);
          return false;
        }
        // 檢查頁籤之間有填寫的AssetsId有無重複
        let seen = [];
        for (let i = 0; i < tabData.length; i++) {
          if (tabData[i].itemAssetsId) {
            if (!seen[tabData[i].itemAssetsId]) {
              seen[tabData[i].itemAssetsId] = true;
            } else {
              InputError = true;
              InputMessages = '頁籤內資產編號不可重複，請再次確認資產編號欄位'
            }
          }
        }
        if (InputError) {
          alert(InputMessages);
          return false;
        }
        // 格式、必填皆正確
        return true;
      }
      // 檢查頁籤專案代碼
      async function checkProjectCode(projectCodeList) {
        return new Promise((resolve, reject) => {
          axios.post('http://192.168.0.177:7008/GetDBdata/CheckProjectCode', projectCodeList)
            .then(response => {
              const data = response.data;
              if (data.state === 'success') {
                resolve('success');
              } else {
                resolve(data.messages.toString());
              }
            })
            .catch(error => {
              reject(error);
            });
        });
      }
      function selectType(item, index) {
        tabData[index].itemEquipTypeName = item.Name;
        tabData[index].itemEquipType_Id = item.Id;
        tabData[index].itemEquipCategoryName = '';
        tabData[index].itemCategory_Id = '';
        getEquipCategoryName(index);
        tabData[index].EquipCategoryInit = '請選擇';
      }
      function selectCategory(item, index) {
        tabData[index].itemEquipCategoryName = item.Name;
        tabData[index].itemCategory_Id = item.Id;
      }
      function selectArea(index, item) {
        tabData[index].itemAreaName = item.Name;
        tabData[index].itemArea_Id = item.Id;
        tabData[index].itemLayerName = '';
        tabData[index].itemLayer_Id = '';
        getLayerName(index);
        tabData[index].LayerInit = '請選擇';
      }
      function selectLayer(index, item) {
        tabData[index].itemLayerName = item.Name;
        tabData[index].itemLayer_Id = item.Id;
      }
      function selectUnit(item, index) {
        tabData[index].itemUnit = item;
      }
      function selectPackageUnit(item, index) {
        tabData[index].itemPackageUnit = item;
      }
      function resetUnitCount(index) {
        tabData[index].itemUnit = '';
        tabData[index].itemCount = 1;
      }
      // 開啟選擇檔案
      function openFileExplorer(index) {
        console.log('fileInputs', fileInputs);
        fileInputs[index].click();
      }
      // 處理選擇的照片
      function handleFileChange(index, event) {
        const files = event.target.files;
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        //檢查檔名
        for (let i = 0; i < files.length; i++) {
          const fileName = files[i].name;
          const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
          if (!imageExtensions.includes(fileExtension.toLowerCase())) {
            alert(fileExtension + '不在允許的格式範圍內，請重新選取');
            return;
          }
        }
        //圖片總數量不超過五張
        if (tabData[index].newFile.length + files.length > 5) {
          alert('上傳至多5張圖片');
          return;
        }
        console.log(event.target.files);
        // 压缩并处理图像
        const imgArray = tabData[index].newFile;
        const previewUrl = tabData[index].viewFile;
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const maxWidth = 800; // 设置最大宽度
              const scaleRatio = Math.min(maxWidth / img.width, 1);
              canvas.width = img.width * scaleRatio;
              canvas.height = img.height * scaleRatio;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              canvas.toBlob((blob) => {
                const compressedFile = new File([blob], files[i].name, {
                  type: files[i].type,
                  lastModified: files[i].lastModified,
                });
                // 记录压缩前后的大小
                const originalSize = Math.round(files[i].size / 1024); // 原始大小（KB）
                const compressedSize = Math.round(compressedFile.size / 1024); // 壓縮後大小（KB）
                console.log(`原始大小: ${originalSize} KB，壓縮後大小: ${compressedSize} KB`);
                imgArray.push(compressedFile);
                previewUrl.push({
                  FileName: files[i].name,
                  FileLink: URL.createObjectURL(compressedFile),
                });
              }, files[i].type, 0.8);
            };
          };
          reader.readAsDataURL(files[i]);
        }
        // console.log(formData[index].previewUrl);
      }
      // 查看收貨單
      function viewReceive() {
        if (details.value.AR_ID) {
          const link = document.getElementById('view-receive');
          link.click();
        }
      }
      // 瀏覽檔案
      function viewImgFile(type, index, file_index) {
        switch (type) {
          case 'new':
            modalParams.title = tabData[index].viewFile[file_index].FileName;
            modalParams.src = tabData[index].viewFile[file_index].FileLink;
            break;
          case 'exist':
            modalParams.title = tabData[index].existFile[file_index].FileName;
            modalParams.src = tabData[index].existFile[file_index].FileLink;
            break;
        }
      }
      // 刪除檔案
      function deleteFileFunction(type, index, file_index) {
        // 1.尚未上傳->從tab資料的new、view裡面刪掉
        // 2.已上傳->從tab資料的existFile裡面刪掉 、 將檔案名稱加入tab資料的deleteFile
        switch (type) {
          case 'new':
            tabData[index].newFile.splice(file_index, 1);
            tabData[index].viewFile.splice(file_index, 1);
            break;
          case 'exist':
            const fileName = tabData[index].existFile[file_index].FileName
            tabData[index].deleteFile.push(fileName)
            tabData[index].existFile.splice(file_index, 1);
            break;
        }
      }
      return {
        details,
        AI_ID,
        AssetsInDate,
        AssetsInOperator,
        DropdownArray,
        tabData,
        fileInputs,
        modalParams,
        getAreaName,
        getEquipTypeName,
        selectType,
        selectCategory,
        selectArea,
        selectLayer,
        selectUnit,
        selectPackageUnit,
        getProjectName,
        temp,
        submit,
        resetUnitCount,
        openFileExplorer,
        handleFileChange,
        viewImgFile,
        deleteFileFunction,
        viewReceive,
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
              p {
                &:hover {
                  cursor: pointer;
                }
              }
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
              @include search_and_send_btn;
              &:hover {
                background-color: #5e7aa2;
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
            .check_box_wrap {
              font-weight: 700;
              align-items: center;
              color: white;
              font-size: 20px;
              div:nth-child(2) {
                gap: 0 5px;
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
              .input-number {
                width: 60%;
              }
              span {
                @include red_star
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
                width: 126px;
                text-align: end;
                white-space: nowrap;
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
        width: 700px;
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
              p {
                &:hover {
                  cursor: pointer;
                }
              }
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
              @include search_and_send_btn;
              &:hover {
                background-color: #5e7aa2;
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
            padding: 25px;
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
            .check_box_wrap {
              font-weight: 700;
              align-items: center;
              color: white;
              font-size: 20px;
              div:nth-child(2) {
                gap: 0 5px;
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
              .input-number {
                width: 60%;
              }
              span {
                @include red_star
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
                width: 126px;
                text-align: end;
                white-space: nowrap;
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
              @include search_and_send_btn;
              padding: 10px;
              &:hover {
                background-color: #5e7aa2;
              }
            }
          }
        }
        .tab_section {
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
            .check_box_wrap {
              font-weight: 700;
              color: white;
              div:nth-child(2) {
                gap: 0 5px;
                display: flex;
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
  }
</style>
