<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        新品入庫
      </h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>
            申請人員 : {{ Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請入庫日期 : {{ ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <!-- 資產類型 -->
        <div class="row">
          <div class="col-12">
            <div class="input-group mb-3 check_box_wrap">
              <div class="input-group-prepend check_box">
                <span>*</span>資產類型 :
              </div>
              <div class="d-flex align-items-center">
                <input type="radio" class='form-check-input check_box' id="radio1" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="資產" v-model="formParams.AssetType" />
                <label class="form-check-label check_box" for='radio1'>資產</label>
                <input type="radio" class='form-check-input check_box ' id="radio2" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="存貨" v-model="formParams.AssetType" />
                <label class="form-check-label check_box" for='radio2' data-toggle="tooltip" data-placement="top" title="註記此資產僅限特定專案出貨所使用">存貨</label>
                <input type="radio" class='form-check-input check_box' id="radio3" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="耗材" v-model="formParams.AssetType" />
                <label class="form-check-label check_box" for='radio3'>耗材</label>
              </div>
            </div>
          </div>
        </div>
        <!-- 專案代碼 -->
        <div v-show="formParams.AssetType === '存貨'" class="col form_search_wrap">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>專案代碼 :
            </div>
            <input type="text" class="form-control" placeholder="最多輸入10字" v-model="formParams.ProjectCode">
            <button class="form_search_btn" @click="getProjectName('upperForm')">搜尋</button>
          </div>
        </div>
        <!-- 專案名稱 -->
        <div v-show="formParams.AssetType === '存貨'" class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              專案名稱 :
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="ProjectName" readonly>
          </div>
        </div>
        <!-- 物流單號 -->
        <div class="col form_search_wrap">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              物流單號 :
            </div>
            <div class="search_section">
              <input @input="getShipmentNum" class="form-control" @focus="showOptions = true;" @blur="handleBlur" v-model="formParams.ShipmentNum" />
              <ul v-if="showOptions" class="options-list">
                <li v-for="(option, index) in DropdownArray.ShipmentNum" :key="index" @click="selectShipmentNum(option)">{{ option.ShipmentNum }}
                </li>
              </ul>
            </div>
            <button class="form_search_btn" @click="viewReceive">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{name: 'Receive_View' , query:{ search_id : formParams.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 設備總類 &設備分類 -->
        <div class="row row_wrap g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend equipment_wrap">
                <span>*</span>設備總類 :
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                  {{ formParams.EquipTypeName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="typeDropdown">
                  <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item" @click="selectType(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>設備分類 :
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(formParams.EquipTypeName !== '') }">
                  {{ formParams.EquipCategoryName || EquipCategoryInit }}
                </button>
                <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                  <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item" @click="selectCategory(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>物品名稱 :
            </div>
            <input type="text" class="form-control" placeholder="最多輸入20字" v-model="formParams.AssetName">
          </div>
        </div>
        <!-- 廠商 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商 :
            </div>
            <input type="text" class="form-control" placeholder="最多輸入100字" v-model="formParams.VendorName">
          </div>
        </div>
        <!-- 規格 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格 :
            </div>
            <input type="text" class="form-control" placeholder="最多輸入100字" v-model="formParams.ProductSpec">
          </div>
        </div>
        <!-- 型號 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號 :
            </div>
            <input type="text" class="form-control" placeholder="最多輸入100字" v-model="formParams.ProductType">
          </div>
        </div>
        <!-- 包裝數量 & 包裝單位 -->
        <div class="row g-0 row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4" id='number'>
              <div class="input-group-prepend info  d-xl-block d-lg-block d-md-block d-none">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"><span>*</span>包裝數量 :
              </div>
              <div class="input-group-prepend info  d-xl-none d-lg-none d-md-none d-block">
                <span>*</span>包裝數量 :<img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
              </div>
              <input class="input-number" type="number" v-model="formParams.Count" min="1">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4" id='unit'>
              <div class="input-group-prepend">
                <span>*</span>包裝單位 :
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ formParams.Unit || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in DropdownArray.Unit" :key="index" class="dropdown-item" @click="selectUnit(`${item}`)">
                    {{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 數量 & 單位 (only耗材) -->
        <div v-show="formParams.AssetType === '耗材'" class="row g-0 row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4" id='number'>
              <div class="input-group-prepend d-xl-block d-lg-block d-md-block d-none">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包"><span>*</span>數量 :
              </div>
              <div class="input-group-prepend d-xl-none d-lg-none d-md-none d-block">
                <span>*</span> 數量 :<img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">
              </div>
              <input class="input-number" type="number" v-model="formParams.PackageNum" min="1">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4" id='unit'>
              <div class="input-group-prepend">
                <span>*</span>單位 :
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ formParams.PackageUnit || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in DropdownArray.PackageUnit" :key="index" class="dropdown-item" @click="selectPackageUnit(`${item}`)">
                    {{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 保固期限 -->
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固期限 :
              </div>
              <input id='date_wrap' type="text" class="form-control" placeholder="最多輸入10字" v-model="formParams.WarrantyDate">
            </div>
          </div>
        </div>
        <!-- 保固開始 & 保固結束 -->
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend ">
                保固開始日 :
              </div>
              <input type="date" class="form-control" v-model="formParams.WarrantyStartDate">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend date_wrap">
                保固到期日 :
              </div>
              <input type="date" class="form-control" v-model="formParams.WarrantyEndDate">
            </div>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註 :
            </div>
            <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入500字" v-model="formParams.Memo"></textarea>
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
          <div v-for="(tab, index) in tabData" :key="index" :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel">
            <!-- 頁籤物品名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>物品名稱：</div>
                <input type="text" class="form-control" v-model="tab.itemAssetName">
              </div>
            </div>
            <!-- 頁籤資產編號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產編號：</div>
                <input type="text" class="form-control" placeholder="BFXXXXXXXX" v-model="tab.itemAssetsId">
              </div>
            </div>
            <!-- 頁籤S/N -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input type="text" class="form-control" aria-label="Default" placeholder="最多輸入100字" v-model="tab.itemSN">
              </div>
            </div>
            <!-- 頁籤專案代碼 -->
            <div v-show="formParams.AssetType === '存貨'" class="col form_search_wrap">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span>*</span>專案代碼 :
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="請輸入代碼" v-model="tab.itemProjectCode">
                <button class="form_search_btn" @click ="getProjectName('tab' , index)">搜尋</button>
              </div>
            </div>
            <!-- 頁籤專案名稱 -->
            <div v-show="formParams.AssetType === '存貨'" class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">專案名稱：</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProjectName" readonly>
              </div>
            </div>
            <!-- 頁籤備註 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註：</div>
                <textarea class="col" rows="5" placeholder="最多輸入500字" v-model="tab.itemMemo"></textarea>
              </div>
            </div>
            <!-- 頁籤上傳檔案部分 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產照片：</div>
                <div class="mb-3 file_wrap">
                  <button class='choose_btn' @click="openFileExplorer(index)">選擇檔案</button>
                  <input type="file" accept="image/*" ref="fileInputs" style="display: none;" multiple @change="handleFileChange(index , $event)" />
                </div>
                <div class="selected_file">
                  <p class="title">已選擇的檔案:</p>
                  <div v-for="(file , file_index) in tab.viewFile" :key="file_index" class="file_upload_wrap" style="cursor: pointer;">
                    <p @click="viewImgFile(index , file_index)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">{{ file.FileName }}</p>
                    <img class="delete_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="deleteFile(index,file_index)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- NewFileModal -->
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
      <!-- 數量Modal Trigger Button -->
      <button type="button" data-bs-toggle="modal" data-bs-target="#editCount_modal" style="display: none;" id="count-modal"></button>
      <!-- 確認變更數量Modal -->
      <div class="modal fade count-modal" id="editCount_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">警示</h5>
              <div class="close_icon"><p type="button" data-bs-dismiss="modal" aria-label="Close">x</p></div>
            </div>
            <div class="modal-body">
            <p>按下確認後將會清空頁籤內容。</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn confirm" data-bs-dismiss="modal" @click="formParams.Count = oldCount">取消</button>
              <button type="button" class="btn confirm" data-bs-dismiss="modal" @click="initFormDataArray">確認</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';
  import { useRoute } from 'vue-router';
  import router from '@/router';
  import { UnitArray , PackageUnitArray} from '@/assets/js/dropdown'
  import { getApplication , getEquipType , getEquipCategory , getProject } from '@/assets/js/common_api'
  import {
    onMounted,
    reactive,
    ref,
    watch,
  } from 'vue';
  export default {
    components: {
      Navbar
    },
    setup() {
      const route = useRoute();
      const Applicant = ref(''); //申請人 發API 帶入
      const ApplicationDate = ref(''); //申請日期 function帶入
      const formParams = reactive({
        AssetType: '',
        ProjectCode: '',
        AR_ID: '',
        EquipTypeName: '',
        EquipCategoryName: '',
        AssetName: '',
        VendorName: '',
        ProductSpec: '',
        ProductType: '',
        Count: 1,
        Unit: '',
        PackageNum: 1,
        PackageUnit: '',
        ShipmentNum: '', //提交時不需要加入form
        WarrantyDate: '',
        WarrantyStartDate: '',
        WarrantyEndDate: '',
        Memo: '',
      }); //上半部表單參數
      const DropdownArray = reactive({
        ShipmentNum: [],
        EquipType: [],
        EquipCategory: [],
        Unit: UnitArray,
        PackageUnit: PackageUnitArray,
      })
      const showOptions = ref(false);
      const EquipCategoryInit = ref('請先選擇設備總類');
      const ProjectName = ref(''); //專案名稱(搜尋結果)
      // 下半部頁籤內容
      const tabData = reactive([]); // 頁籤資料
      const tabNumber = ref(1); //v-for不直接使用 formParams.Count(input改成空白會error)
      const newCount = ref(1);
      const oldCount = ref(1);
      const fileInputs = reactive([]);
      // Modal Params
      const modalParams = reactive({
        title: '',
        src: '',
      })
      onMounted(() => {
        getApplicationInfo(); // 申請人
        getShipmentNum(); //物流單號選單選項
        ApplicationDate.value = getDate();
        // 若從收貨管理點進來 自動帶入AR_ID & 物流單號
        if(route.query.search_id && route.query.ShipmentNum) {
          formParams.AR_ID = route.query.search_id;
          formParams.ShipmentNum = route.query.ShipmentNum;
          formParams.AssetType = '存貨'
        }
        initFormDataArray();
      });
      function getDate() {
        const today = new Date();
        var date = '';
        date += (today.getFullYear() + '/');
        date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
        date += ((today.getDate()).toString().padStart(2, '0'));
        return date;
      }
      // (重新)生成Tab頁籤資料
      function initFormDataArray() {
        if(newCount.value) {
          tabNumber.value = newCount.value
        }
        tabData.splice(0 , tabData.length); //先清空再重新生成
        for (let i = 0; i < formParams.Count; i++) {
          tabData.push({
            PadNum: i,
            itemAssetName: formParams.AssetName,
            itemAssetsId: '',
            itemSN: '',
            itemProjectCode: formParams.ProjectCode,
            itemProjectName: ProjectName.value, //不需要傳
            itemMemo: '',
            newFile: [],
            viewFile: [], //不需要傳
          });
        }
      }
      function selectShipmentNum(item) {
        formParams.ShipmentNum = item.ShipmentNum;
        formParams.AR_ID = item.AR_ID;
        showOptions.value = false;
      }
      function selectType(item) {
        formParams.EquipTypeName = item;
        // console.log('選擇的總類:', EquipTypeName.value);
        getEquipCategoryName();
        EquipCategoryInit.value = '請選擇';
      }
      function selectCategory(item) {
        formParams.EquipCategoryName = item;
      }
      function selectUnit(item) {
        formParams.Unit = item;
      }
      function selectPackageUnit(item) {
        formParams.PackageUnit = item;
      }
      function checkRequireParams() {
        for (const key in formParams) {
          if (typeof formParams[key] === 'string') {
            formParams[key] = formParams[key].trim();
          }
        }
        const BF_pattern = /^(BF\d{8})$/;
        // 檢查上半部必填
        if (!formParams.AssetType || !formParams.EquipCategoryName || !formParams.EquipTypeName || !formParams.AssetName || !formParams.Count || !formParams.Unit) {
          alert('請填寫所有必填項目');
          return false;
        }
        // 存貨需額外檢查專案代碼(上半部)
        if (formParams.AssetType === '存貨') {
          if (!formParams.ProjectCode) {
            alert('請填寫所有必填項目');
            return false;
          }
          if(!/^[\s\S]{1,100}$/.test(formParams.ProjectCode)) {
            alert('專案代碼不可超過10字');
            return false;
          }
        }
        // 耗材需額外檢查包裝數量、單位(上半部)
        if (formParams.AssetType === '耗材') {
          if (!formParams.PackageNum || !formParams.PackageUnit ) {
            alert('請填寫所有必填項目');
            return false;
          }
        }
        // 檢查下半部必填、格式
        var InputMessages = '';
        var InputError = false;
        for (let i = 0; i < tabNumber.value; i++) {
          const form = tabData[i];
          //1. 物品名稱必填
          form.itemAssetName = form.itemAssetName.trim()
          if (!form.itemAssetName) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　物品名稱必填' + '\n';
          }
          //2. 資產編號若有value 格式為 BF+8位數
          if (form.itemAssetsId) {
            form.itemAssetsId = form.itemAssetsId.trim();
            if (!BF_pattern.test(form.itemAssetsId)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　資產編號不符合格式' + '\n';
            }
          }
          //3. 存貨需額外檢查專案代碼
          if ( formParams.AssetType === '存貨') {
            // 未填寫
            if(!form.itemProjectCode) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　專案代碼必填' + '\n';
            }
            // 填寫 但不符合格式
            if(form.itemProjectCode && !/^[\s\S]{1,100}$/.test(form.itemProjectCode)) {
              InputError = true;
              InputMessages += '頁籤 ' + (i + 1) + ' :　專案代碼不可輸入超過10字' + '\n';
            }
            
          }
          //4. S/N、備註不可超過100/500字
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
        // 檢查頁籤之間AssetsId有無重複
        let seen = [];
        for (let i=0 ; i< tabData.length ; i++) {
          if(tabData[i].itemAssetsId) {
            if(!seen[tabData[i].itemAssetsId]) {
              seen[tabData[i].itemAssetsId] = true;
            }
            else {
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
      function viewImgFile(index , file_index) {
        modalParams.title = tabData[index].viewFile[file_index].FileName;
        modalParams.src = tabData[index].viewFile[file_index].FileLink;
        console.log('modalParams',modalParams);
      }
      function deleteFile(index , file_index) {
        tabData[index].newFile.splice(file_index,1);
        tabData[index].viewFile.splice(file_index,1);
      }
      // 關掉物流單號下拉式選單
      function handleBlur() {
        setTimeout(() => {
          showOptions.value = false;
        }, 100);
      }
      function viewReceive() {
        if(formParams.AR_ID) {
          const link = document.getElementById('view-receive');
          link.click();
        }
      }
      // 送出
      async function submit() {
        // 檢查必填項目、格式
        if(!checkRequireParams()) {
          return
        }
        console.log('上半部form',formParams);
        console.log('下半部頁籤資料' , tabData);

        try {
          // 先建立表單並回傳AR_ID
          const AI_ID = await sendUpperForm();
          console.log('建立上半部表單成功AI_ID(resolve):' , AI_ID);
          // 再依照AI_ID將 下半部頁籤 單次分別上傳
          const filePromises = [];
          for (let i = 0; i < tabData.length; i++) {
            filePromises.push(sendFileForm(AI_ID, tabData[i] , i));
          }
          // 等待所有檔案上傳完成
          await Promise.all(filePromises)
          .then(result =>{
            const allSuccess = result.every(result => result === 'success')
            if(allSuccess) {
            alert('傳送新品入庫表單成功\n單號為:' + AI_ID);
              router.push({
                name: 'Store_Datagrid'
              });
            }
            else {
              alert('傳送新品入庫表單失敗')
            }
          })
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }
      // 上半部表單
      function sendUpperForm() {
        return new Promise((resolve, reject) => {
          // 在这里发送上半部分表单数据的请求
          // 成功时，调用 resolve 并传递 AI_ID
          // 失败时，调用 reject 并传递错误信息
          const axios = require('axios');
          const form = new FormData();
          for (const key in formParams) {
            // 不為null、undefined、空字串就append
            if(formParams[key]) {
              form.append(key, formParams[key]);
            }
          }
          // 先剔除不需要key值
          form.delete('ShipmentNum')
          // 不是存貨->將ProjectCode、ProjectName從form移除
          if(formParams.AssetType !== '存貨') {
            form.delete('ProjectCode')
          }
          // 不是耗材->將PackageNum、PackageUnit從form移除
          if(formParams.AssetType !== '耗材') {
            form.delete('PackageNum')
            form.delete('PackageUnit')
          }
          axios.post('http://192.168.0.177:7008/AssetsInMng/NewAssetsIn', form)
            .then(response => {
              const data = response.data;
              if (data.state === 'success') {
                const AI_ID = response.data.resultList.AI_ID;
                // console.log('建立上半部表單成功AI_ID(response):' , AI_ID);
                resolve(AI_ID);
              }
              else {
                reject(data.messages);
              }
            })
            .catch(error => {
              reject(error);
            });
        });
      }
      // 中、下上傳檔案部分
      function sendFileForm(AI_ID ,tabData ,index) {
        return new Promise((resolve, reject) => {
          const form = new FormData();
          form.append('AI_ID' , AI_ID);
          for (const key in tabData) {
            // 不為null、undefined、空字串就append
            if(tabData[key]) {
              form.append(key, tabData[key]);
            }
          }
          // 先剔除不需要key值
          form.delete('itemProjectName')
          form.delete('viewFile')
          // newFile等等額外判斷 先剔除
          form.delete('newFile')
          // 不是存貨->將ProjectCode、ProjectName從form移除
          if(formParams.AssetType !== '存貨') {
            form.delete('itemProjectCode')
          }
          for( let i=0 ; i < tabData.newFile.length ; i++) {
            form.append('newFile' , tabData.newFile[i]);
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
                console.error(`第${index+1}個頁籤上傳失敗，`);
                reject(new Error('文件表单提交失败'));
              }
            })
            .catch(error => {
              // 如果提交失败，调用 reject 并传递错误信息
              reject(error);
            });
        });
      }
      async function getApplicationInfo() {
        getApplication()
          .then((data)=>{
            Applicant.value = data;
          })
          .catch((error) =>{
            console.error(error);
          })
      }
      async function getEquipTypeName() {
        if (DropdownArray.EquipType.length == 0) {
          getEquipType()
          .then((data)=>{
            DropdownArray.EquipType = data;
          })
          .catch((error) =>{
            console.error(error);
          })
        }
      }
      async function getEquipCategoryName() {
        formParams.EquipCategoryName = '';
        getEquipCategory(formParams.EquipTypeName)
        .then((data)=>{
            DropdownArray.EquipCategory = data;
          })
        .catch((error) =>{
          console.error(error);
        })
      }
      async function getShipmentNum() {
        // 物流單號有變動就將AR_ID清空 只有使用下拉選單才會傳AR_ID
        formParams.AR_ID = '';
        formParams.ShipmentNum = formParams.ShipmentNum.trim();
        const form = new FormData();
        form.append('projectCode', formParams.ProjectCode);
        const axios = require('axios');
        const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/SearchShipmentNum?id=${formParams.ShipmentNum}`);
        try {
          const data = response.data;
          if (data.state === 'success') {
            console.log('物流單號查詢結果',data.resultList);
            DropdownArray.ShipmentNum = data.resultList;
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          } else {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function getProjectName(type , index) {
        let code = ''
        switch (type) {
          case 'upperForm':
            code = formParams.ProjectCode;
            formParams.ProjectCode = formParams.ProjectCode.trim();
            break;
          case 'tab':
            code = tabData[index].itemProjectCode;
            tabData[index].itemProjectCode = tabData[index].itemProjectCode.trim();
            break;
        }
        if (!/^(?![ 　]{10}$)[\s\S]{1,10}$/.test(code)) {
          alert('專案代碼格式錯誤');
          return;
        }
        getProject(code)
        .then((data)=>{
          switch (type) {
            case 'upperForm':
              ProjectName.value = data;
              break;
            case 'tab':
              tabData[index].itemProjectName = data;
              break;
          }
        })
        .catch((error) =>{
          console.error(error);
        })
      }
      // 監聽formParams.Count(包裝數量)的數值變動 -> 重新生成tab頁籤內容
      watch(()=>formParams.Count, (newValue , oldValue) => {
        // console.log(`包裝數量從${oldValue}變成${newValue}`);
        if(newValue) {
          newCount.value = newValue;
          oldCount.value = oldValue;
          const button = document.getElementById('count-modal');
          button.click();
        }
      });
      function goBack() {
        window.history.back();
      }
      return {
        getDate,
        initFormDataArray,
        Applicant,
        ApplicationDate,
        formParams,
        DropdownArray,
        EquipCategoryInit,
        newCount,
        oldCount,
        showOptions,
        ProjectName,
        tabData,
        tabNumber,
        fileInputs,
        modalParams,
        selectShipmentNum,
        selectType,
        selectUnit,
        selectPackageUnit,
        selectCategory,
        openFileExplorer,
        handleFileChange,
        handleBlur,
        viewImgFile,
        viewReceive,
        deleteFile,
        submit,
        getEquipTypeName,
        getEquipCategoryName,
        getProjectName,
        getShipmentNum,
        goBack,
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  textarea {
    padding: 5px 10px 30px;
  }
  .count-modal {
      .modal-body {
        padding: 20px;
        margin: auto;
        p {
          text-align: center;
          font-weight: 800;
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
        justify-content: center;
        .confirm {
          color: white;
          background-color: #132238;
          &:hover {
            background-color: #426497;
          }
        }
      }
      .modal-header {
        h5 {
          font-weight: 700;
        }
        background: #528091;
        color: white;
        display: flex;
        justify-content: center;
        padding: 0 16px 16px;
        .close_icon {
          height: 40px;
          cursor: pointer;
        }
        .modal-title {
          margin: auto;
          padding-top: 16px;
        }
      }
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
      .form_search_btn {
        @include form_search_btn;
      }
      .readonly_box {
        @include readonly_box;
      }
      .info_wrap {
        margin: auto;
        width: 800px;
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
          width:58%;
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
            flex: 1 1 auto;
            // width: 100%;
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
              cursor: pointer;
              // &:hover {
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
            width: 150px;
            white-space: nowrap;
          }
          .check_box_wrap {
            font-weight: 700;
            align-items: center;
            color: white;
            font-size: 20px;
            div:nth-child(2) {
              gap: 0 5px;
              display: flex;
            }
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
              max-height: 250px;
              overflow-y: auto;
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
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .form_search_btn {
        @include form_search_btn;
      }
      .readonly_box {
        @include readonly_box;
      }
      .info_wrap {
        margin: auto;
        width: 800px;
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
          width: 58%;
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
            flex: 1 1 auto;
            // width: 100%;
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
              cursor: pointer;
              // &:hover {
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
            width: 150px;
            white-space: nowrap;
          }
          .check_box_wrap {
            font-weight: 700;
            align-items: center;
            color: white;
            font-size: 20px;
            div:nth-child(2) {
              gap: 0 5px;
              display: flex;
            }
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
              max-height: 250px;
              overflow-y: auto;
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
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 50px;
        font-weight: 600;
        @include title_color;
      }
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
      .info_wrap {
        margin: auto;
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
          .search_section {
            position: relative;
            display: flex;
            flex: 1 1 auto;
            // width: 100%;
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
              cursor: pointer;
              // &:hover {
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
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              margin-right: 10px;
              white-space: nowrap;
              span {
                @include red_star
              }
            }
          }
          .check_box_wrap {
            flex-direction: row;
            font-weight: 700;
            align-items: center;
            color: white;
            font-size: 20px;
            .check_box {
              margin-right: 10px;
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
  }
</style>
