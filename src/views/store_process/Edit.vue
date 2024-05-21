<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產入庫作業</h1>
    </div>
    <div class="modal fade" id="apply_storage_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel2" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content ">
          <div class="modal-header">
            <h5 class="modal-title">套用資料</h5>
            <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
          </div>
          <div class="modal-body">
            <div class="col">
              <p>確定套用儲位嗎？</p>
            </div>
          </div>
          <div class="modal-footer m-auto">
            <button type="button" class="btn" data-bs-dismiss="modal" @click="alignAreaLayer(index)">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>申請人員 : {{ upperForm.Applicant }}</p>
        </div>
        <div>
          <p>申請入庫日期 : {{ upperForm.ApplicationDate }}</p>
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
              <input type="text" class="form-control readonly_box" readonly v-model="upperForm.Status">
            </div>
          </div>
        </div>
        <!-- 物流單號 -->
        <div class="col form_search_wrap">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              物流單號 :
            </div>
            <input type="text" class="form-control readonly_box" v-model="upperForm.ShipmentNum" readonly>
            <button class="form_search_btn" @click="storageStore.viewReceive(upperForm)">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{name: 'Receive_View' , query:{ search_id : upperForm.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 交付 人員&日期 -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                交付人員：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="upperForm.DeliveryOperator">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                交付日期：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="upperForm.DeliveryDate">
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
              <input type="text" class="form-control readonly_box" readonly v-model="utilsStore.userName">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                入庫日期：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="utilsStore.today">
            </div>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col mb-3">
          <div class="input-group">
            <div class="input-group-prepend">備註 :</div>
            <textarea style="height: 200px;" class="form-control readonly_box" v-model="upperForm.Memo" disabled></textarea>
          </div>
        </div>
      </div>
      <!-- 頁籤部分 -->
      <div class="tab_section mt-5">
        <nav>
          <!-- 標頭 -->
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button v-for="tab in parseInt(tabData.length)" :key="tab" :class="['nav-link', { active: tab === 1 }]"
              data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab" :aria-selected="tab === 0">
              {{ tab }}
            </button>
          </div>
        </nav>
        <div v-if="tabData.length > 0" class="tab-content" id="nav-tabContent">
          <div v-for="(tab, index) in tabData" :key="index"
            :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel"
            aria-labelledby="tab1-tab">
            <!-- 頁籤專案類型 -->
            <div class="row">
              <div class="col-12">
                <div class="input-group mb-3 check_box_wrap">
                  <div class="input-group-prepend check_box">
                    <span class="required">*</span>專案類型：
                  </div>
                  <div class="d-flex align-items-center radio_wrap">
                    <input type="radio" class='form-check-input check_box' id="radio1"
                      style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="資產"
                      v-model="tab.itemAssetType"/>
                    <label class="form-check-label check_box" for='radio1'>資產</label>
                    <input type="radio" class='form-check-input check_box ' id="radio2"
                      style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="存貨"
                      v-model="tab.itemAssetType"/>
                    <label class="form-check-label check_box" for='radio2' data-toggle="tooltip" data-placement="top"
                      title="註記此資產僅限特定專案出貨所使用">存貨</label>
                    <input type="radio" class='form-check-input check_box' id="radio3"
                      style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="耗材"
                      v-model="tab.itemAssetType" @change="storageStore.resetUnitCount('tab',index)"/>
                    <label class="form-check-label check_box" for='radio3'>耗材</label>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤專案代碼 -->
            <div class="col form_search_wrap">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span v-show="tab.itemAssetType === '存貨'" class="required">*</span>專案代碼：
                </div>
                <input type="text" class="form-control" placeholder="最多輸入10字" maxlength="10" v-model="tab.itemProjectCode">
                <button class="form_search_btn"  @click="async()=>{ tab.itemProjectName = await apiStore.getProject(tab.itemProjectCode)}">搜尋</button>
              </div>
            </div>
            <!-- 頁籤專案名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">專案名稱：</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProjectName" readonly />
              </div>
            </div>
            <!-- 頁籤 設備總類 & 設備分類-->
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span class="required">*</span>設備總類：</div>
                  <div class="dropdown">
                    <select class="form-select" id="floatingSelect" v-model="tab.itemEquipType_Id" @change="async()=>{tab.EquipCategoryArray = await apiStore.getEquipCategory(tab.itemEquipType_Id); tab.itemCategory_Id = '';}">
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.EquipType" :key="option.Id" :value="option.Id">{{ option.Name }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3 justify-content-end">
                  <div class="input-group-prepend"><span class="required">*</span>設備分類：</div>
                  <div class="dropdown">
                    <select class="form-select" id="floatingSelect" v-model="tab.itemCategory_Id">
                      <option v-if="tab.EquipCategoryArray.length == 0" value="">--請先選擇設備總類--</option>
                      <template v-else>
                        <option value="">--請選擇--</option>
                        <option v-for="option in tab.EquipCategoryArray" :key="option.Id" :value="option.Id">{{ option.Name }}</option>
                      </template>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤儲位 區域&櫃位 -->
            <div class="row g-0 storage_dropdown">
              <div class="col">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span class="required">*</span>儲位區域：</div>
                  <div class="dropdown">
                    <select class="form-select" id="floatingSelect" v-model="tab.itemArea_Id" @change="async()=>{tab.LayerArray = await apiStore.getLayer(tab.itemArea_Id); tab.itemLayer_Id = '';}">
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.Area" :key="option.Id" :value="option.Id">{{ option.Name }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="input-group mb-3 justify-content-end">
                  <div class="input-group-prepend"><span class="required">*</span>儲位櫃位：</div>
                  <div class="dropdown">
                    <select class="form-select" id="floatingSelect" v-model="tab.itemLayer_Id">
                      <option v-if="tab.LayerArray.length == 0" value="">--請先選擇區域櫃位--</option>
                      <template v-else>
                        <option value="">--請選擇--</option>
                        <option v-for="option in tab.LayerArray" :key="option.Id" :value="option.Id">{{ option.Name }}</option>
                      </template>
                    </select>
                  </div>
                  <button v-show="tab.itemLayer_Id" class="apply_btn" data-bs-toggle="modal" data-bs-target="#apply_storage_modal" @click="updateIndex(index)">套用儲位</button>
                </div>
              </div>
            </div>
            <!-- 頁籤物品名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span class="required">*</span>物品名稱：</div>
                <input type="text" class="form-control" placeholder="最多輸入20字" maxlength="20" v-model="tab.itemAssetName" />
              </div>
            </div>
            <!-- 頁籤資產編號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span class="required">*</span>資產編號：</div>
                <input type="text" class="form-control" v-model="tab.itemAssetsId" maxlength="10" placeholder="BFXXXXXXXX"
                  :class="{ 'readonly_box': details.Type === 1 }" :disabled="details.Type === 1" />
              </div>
            </div>
            <!-- 頁籤廠商 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">廠商：</div>
                <input type="text" class="form-control" maxlength="100" placeholder="最多輸入100字" v-model="tab.itemVendorName"/>
              </div>
            </div>
            <!-- 頁籤規格 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">規格：</div>
                <input type="text" class="form-control " maxlength="100" placeholder="最多輸入100字" v-model="tab.itemProductSpec"/>
              </div>
            </div>
            <!-- 頁籤型號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">型號：</div>
                <input type="text" class="form-control " maxlength="100" placeholder="最多輸入100字" v-model="tab.itemProductType"/>
              </div>
            </div>
            <!-- 頁籤S/N -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input type="text" class="form-control" maxlength="100" placeholder="最多輸入100字" v-model="tab.itemSN"/>
              </div>
            </div>
            <!-- 頁籤 包裝數量 & 包裝單位 -->
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend info"><img class="info_icon" src="@/assets/info.png"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"> 包裝數量：
                  </div>
                  <input type="number" class="input-number readonly_box" readonly v-model="tab.itemPackageNum" />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3 justify-content-end">
                  <div class="input-group-prepend"><span class="required">*</span>包裝單位：</div>
                  <div class="dropdown">
                    <select class="form-select" id="floatingSelect" v-model="tab.itemPackageUnit">
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.PackageUnit" :key="option" :value="option">{{ option }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤 數量 & 單位 -->
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend info"><img class="info_icon" src="@/assets/info.png"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">
                    <span v-show="tab.itemAssetType === '耗材'" class="required">*</span>數量：
                  </div>
                  <input v-if="tab.itemAssetType === '耗材'" class="input-number" type="number" v-model="tab.itemCount" min="1">
                  <input v-else class="input-number readonly_box" type="number" v-model="tab.itemPackageNum" min="1" readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3 justify-content-end">
                  <div class="input-group-prepend"><span v-show="tab.itemAssetType === '耗材'" class="required">*</span>單位：</div>
                  <div v-if="tab.itemAssetType === '耗材'" class="dropdown">
                    <select class="form-select" id="floatingSelect" v-model="tab.itemUnit">
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.Unit" :key="option" :value="option">{{ option }}</option>
                    </select>
                  </div>
                  <input v-else class="form-select readonly_box" type="text" v-model="tab.itemPackageUnit" min="1" readonly>
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
                  <input type="text" class="form-control" placeholder="最多輸入10字" maxlength="10" v-model="tab.itemWarranty">
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
                <textarea class="col" rows="5" placeholder="最多輸入500字" maxlength="500" v-model="tab.itemMemo"></textarea>
              </div>
            </div>
            <!-- 頁籤選擇檔案 -->
            <div class="col">
              <div class="input-group">
                <div class="input-group-prepend">資產照片：</div>
                <div class="mb-3 file_wrap">
                  <button class='choose_btn' @click="storageStore.chooseFile(index)">選擇檔案</button>
                  <input type="file" accept="image/*"  style="display: none;" multiple @change="utilsStore.handleImgChange($event, tab)" />
                </div>
              </div>
            </div>
            <div class="selected_file col">
              <div class="input-group">
                <div class="input-group-prepend">已選擇檔案：</div>
                <div class="selected_file_wrap">
                  <div v-for="(file, file_index) in tab.viewFile" :key="file_index" class="file_upload_wrap">
                    <p>{{ file.FileName }}
                      <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="utilsStore.viewImgFile(file)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                      <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="utilsStore.deleteImgFile('new', tab, file_index)">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤已上傳檔案 -->
            <div class="col selected_file">
              <div class="input-group mt-3">
                <div class="input-group-prepend">已上傳檔案：</div>
                <div class='selected_file_wrap'>
                  <div v-for="(file , file_index) in tab.existFile" :key="file_index" class="file_upload_wrap">
                    <p>{{ file.FileName }}
                      <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="utilsStore.viewImgFile(file)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                      <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="utilsStore.deleteImgFile('exist', tab, file_index)">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ViewFile Modal -->
        <view_modal/>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
        <button class="save_btn" @click="temp">暫存</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import view_modal from "@/components/view_modal.vue"
import {
  ref,
  onMounted,
  reactive,
  onUnmounted
} from 'vue';
import Navbar from "@/components/Navbar.vue";
import {
  useRoute
} from 'vue-router';
import router from '@/router';
import axios from '@/axios/tokenInterceptor'
import {
  StoreProcess_Edit_Status
} from '@/assets/js/enter_status'
import { useAPIStore, useUtilsStore } from '@/store';
import { useStorageStore } from '@/store/storage/_index';
import { storeToRefs } from 'pinia';
  const storageStore = useStorageStore();
  const apiStore = useAPIStore();
  const utilsStore = useUtilsStore();
  const { upperForm, tabData, DropdownArray, Type } = storeToRefs(storageStore);

  const route = useRoute();
  const AI_ID = route.query.search_id;
  //上半部表單部分
  const details = ref({});
  //下半部頁籤部分
  const loading = ref(false);
  const alignIndex = ref(0);
  onMounted(async () => {
    storageStore.$reset();
    await storageStore.getDetails(AI_ID, false, StoreProcess_Edit_Status, false);
    await utilsStore.getUserName();
    DropdownArray.value.Area = await apiStore.getArea();
    DropdownArray.value.EquipType = await apiStore.getEquipType();
    utilsStore.getDate();
  });
  onUnmounted(()=>{
    storageStore.$dispose();
    apiStore.$dispose();
  })
  /**
   * 檢查頁籤 必填/字數/資產編號格式/專案代碼 限制的情況
   * @param {string} type  'temp' or 'submit'
   * @returns {Promise<boolean>} 通過與否
   */
  async function checkTabContent(type) {
    // temp: 1. 物品名稱必填 2. 字數上限 3. 專案代碼是否有效
    // submit: 1. 必填欄位 2. 字數上限 3. 資產編號(如果為新品入庫) 4. 專案代碼是否有效
    let InputErrorMessages = '';
    let projectCodeList = [];
    tabData.value.forEach((tab, index) => {
      let RequireCheckList = {}; // 暫存與送出檢查的項目數量不同
      switch (type) {
        case 'temp':
          RequireCheckList = {
            itemAssetName: '物品名稱',
          }        
          break;
        case 'submit':
          RequireCheckList = {
            itemAssetType: '資產類型',
            itemEquipType_Id: '設備總類',
            itemCategory_Id: '設備分類',
            itemArea_Id: '儲位區域',
            itemLayer_Id: '儲位櫃位',
            itemAssetName: '物品名稱',
            itemAssetsId: '資產編號',
            itemPackageUnit: '包裝單位',
          }
          if(tab.itemAssetType === '存貨') {
            RequireCheckList.itemProjectCode = '專案代碼'
          } else if(tab.itemAssetType === '耗材') {
            RequireCheckList.itemCount = '數量'
            RequireCheckList.itemUnit = '單位'
          }
          break;
      }
      // 必填
      InputErrorMessages += utilsStore.checkTabRequired(tab, RequireCheckList, index);
      // 字數
      InputErrorMessages += utilsStore.checkTabMaxLetter(tab, storageStore.TabLetterCheckList, index);
      // 資產編號格式(暫存不檢查)
      if(type === 'submit') {
        if(tab.itemAssetsId && (!utilsStore.BF_pattern.test(tab.itemAssetsId))) {
					InputErrorMessages += `頁籤${index+1} :　資產編號不符合格式\n`;
        }
      }
      // 迭代專案代碼List
      if (tab.itemProjectCode) {
        projectCodeList.push({
          PadNum: index,
          projectCode: tab.itemProjectCode,
        })
      }
    });
    // 專案代碼(須為有效才可暫存或送出)
    if (projectCodeList.length !== 0) {
      console.log('projectCodeList:', projectCodeList);
      try {
        const messages = await apiStore.checkProjectCode(projectCodeList);
        if (messages !== 'success') {
          InputErrorMessages += messages;
        }
      } catch (error) {
        console.error(error);
        InputErrorMessages += error;
      }
    }
    // 所有內容檢查完 若有不合格字串則alert並返回false
    if(InputErrorMessages) {
      alert(InputErrorMessages);
      return false;
    }
    // 無不合格，返回true
    return true;
  }
  // 暫存
  async function temp() {
    // console.log('test',await checkTabContent('temp'));
    if(!await checkTabContent('temp')) return
    const tabPromises = [];
    tabData.value.forEach((tab, index) => {
      const itemId = tab.itemId;
      tabPromises.push(storageStore.sendImgForm(itemId, tab, index));
    })
    await Promise.all(tabPromises)
      .then(result => {
        const allSuccess = result.every(result => result === 'success');
        if (allSuccess) {
          alert('表單暫存成功\n單號為:' + AI_ID);
          window.location.reload();
        }
      })
      .catch(error => {
        alert('表單暫存失敗');
        console.error(error);
      })
  }
  // 送出
  async function submit() {
    if(!await checkTabContent('submit')) return
    //若是新品入庫 檢查資產編號是否有重複
    if (Type.value === 0) {
      if(await storageStore.checkAssetsIdRepeat()) return;
    }
    if (!loading.value) {
      // loading flag open
      loading.value = true;
      const tabPromises = [];
      tabData.value.forEach((tab, index) => {
        const itemId = tab.itemId;
        tabPromises.push(storageStore.sendImgForm(itemId, tab, index));
      })
      await Promise.all(tabPromises)
      .then(async result => {
        const allSuccess = result.every(result => result === 'success');
        // 頁籤全部成功儲存後
        if (allSuccess) await storageStore.FinishStorageProcess(AI_ID, false);
      })
      .catch(error => {
        alert('表單送出失敗');
        console.error(error);
      })
      .finally(()=>{
        loading.value = false;
      })
    }
  }
  /**
   * 更新套用Index
   * @param {number} index 將modal點開時就先更新alignIndex。
   */
  function updateIndex(index) {
    alignIndex.value = index;
  }
  /**
   * 使用alignIndex套用所有區域櫃位;
   */
  async function alignAreaLayer() {
    for(const tab of tabData.value) {
      tab.itemArea_Id = tabData.value[alignIndex.value].itemArea_Id;
      tab.itemLayer_Id = tabData.value[alignIndex.value].itemLayer_Id;
      tab.LayerArray = await apiStore.getLayer(tab.itemArea_Id);
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
span.required {
  color: red;
}
textarea {
  padding: 5px 10px 30px;
}

.apply_btn {
  border: none;
  width: 110px;
  height: 35px;
  background: #132238;
  border-radius: 10px;
  color: white;
  font-weight: 700;

  &:hover {
    background: #5980b9;
  }
}

.dropdown-toggle {
  height: 35px;
}

#categoryDropdown {
  justify-content: right
}

.dropdown-toggle::after {
  margin-left: auto;
}

.view_icon,
.trash_icon {
  cursor: pointer
}

.modal {
  .modal-header {
    background: #528091;
    color: white;
    h5 {
                font-weight: 700;
            }
    .close_icon {
      color: white;
      font-weight: 700;
      margin-bottom: 0;
    }
  }
}

#apply_storage_modal {
  p {
    font-weight: 800;
    text-align: center;
    margin-bottom: 0;
  }

  .modal-header {
    margin-bottom: 10px;
  }

  button {
    color: white;
    background-color: #132238;

    &:hover {
      background-color: #426497
    }
  }

  .modal-footer {
    border: none;
  }
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 320px;

  .back_btn {
    @include back_to_previous_btn;

    &:hover {
      background-color: #5d85bb;
    }
  }

  .save_btn {
    @include empty_btn;

    &:hover {
      background-color: #5e7aa2;
    }
  }

  .send_btn {
    @include search_and_send_btn;

    &:hover {
      background-color: #5D85BD;
    }
  }
}

.readonly_box {
  @include readonly_box;
}

.form_search_btn {
  @include form_search_btn;
}

.input-number {
  @include count_btn;
}
.input-group-prepend {
            color: white;
            font-weight: 700;
            font-size: 20px;
}

.info_wrap {
    margin:auto;
      
    .choose_btn {
      margin-bottom: 10px;
      @include choose_file_btn;

      &:hover {
        background: #3f608f;
      }
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

        .form-control {
          height: 35px;
          border-radius: 0;
        }

        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
        }
      }
    }
 

  .tab_section {
    .nav {
      overflow-x: auto;
      overflow-y: hidden;
      flex-wrap: nowrap;
      border: none;

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
      border-radius: 0 0 20px 20px;

      .storage_dropdown {

        .col:nth-child(1),
        .col:nth-child(2) {
          .dropdown {
            button {
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }

      .selected_file {
        display: flex;
        align-items: center;

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

      .check_box_wrap {
        font-weight: 700;
        color: white;
        font-size: 18px;

      }

      .dropdown {
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

        .form-control {
          height: 35px;
          border-radius: 0;
        }

        .input-group-prepend {
          width: 120px;
          text-align: end;
          white-space: nowrap;
        }

        .file_wrap {
          display: flex;
          flex-direction: column;
        }

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
@media only screen and (min-width: 1200px) {
  .main_section {
   
    .info_wrap {
      width: 800px;
     
      .content {
      
        .input-group {
         
      
          .input-group-prepend {
            width: 125px;
            text-align: end;
            white-space: nowrap;
          }
        }
      }

      .tab_section {
       .dropdown{
        width: 60%;
       }
        .tab-content {
          padding: 50px 30px;
          .storage_dropdown {
            .col:nth-child(1),
            .col:nth-child(2) {
              .dropdown {
                button {
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
       
          .check_box_wrap {
            align-items: center;
            div:nth-child(2) {
              gap: 0 10px;
            }
          }
   
          .input-group {
             .input-number {
              width: 60%;
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
          
           
            .input-group-prepend {
              width: 120px;
              text-align: end;
              white-space: nowrap;
            }
            .file_wrap {
              display: flex;
              flex-direction: column;
            }
       
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
   
    .info_wrap {
      width: 700px;
      margin: auto;
      .apply_btn{
      width: 120px;
      }
     
      .content {
      
        .input-group {
       
          .input-group-prepend {
            width: 125px;
            text-align: end;
            white-space: nowrap;
          }
        }
      }
      .tab_section { 
        .dropdown{
        width: 60%;
       }
     
        .tab-content {
          padding: 25px;
          .storage_dropdown {
            .col:nth-child(1),
            .col:nth-child(2) {
              .dropdown {
                button {
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
    
          .check_box_wrap {
            align-items: center;
            div:nth-child(2) {
              gap: 0 10px;
            }
          }
        
          .input-group {
           .input-number {
              width: 60%;
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
           

            .input-group-prepend {
              width: 119px;
              text-align: end;
              white-space: nowrap;
            }
            .file_wrap {
              display: flex;
              flex-direction: column;
            
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
      margin-left: unset !important;
      background-color: #132238;
      &:hover {
        background-color: #43546d;
      }
    }
    .info_wrap {
      padding: 1% 5% 0;
      .fixed_info {
        flex-direction: column;
        padding: 10px;
        height: unset !important;
      
      }
      .content {
      
        .input-group {
             .form-control {
            width: 100%;
            margin-left: unset !important;
          }
          .input-group-prepend,.input{
            width: 100%;
          }
        }
        .info {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
        }
      }
      .tab_section {
      
        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset !important;
        }
    
        .tab-content {
          padding: 50px 30px;
          .storage_dropdown {
            display: flex;
            flex-direction: column;
            .apply_btn {
              margin-top: 10px;
            }
          }
          .selected_file {
            .input-group {
              flex-direction: column;
            }
          
          }
          .check_box_wrap {
            div:nth-child(2) {
              gap: 0 10px;
              display: flex;
            }
          }
          .input-group {
            flex-direction: column;
          
            .form-control {
              width: 100%;
              margin-left: unset !important;
            }
            .input-group-prepend {
              width: 100%;
              display: flex;
              justify-content: left
            }
            .file_wrap {
              display: flex;
              flex-direction: column;
           
            }
          }
        }
      }
    }
  }
}
</style>
