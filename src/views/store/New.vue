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
        <div class="row">
          <div class="col-12">
            <div class="input-group mb-3 check_box_wrap">
              <div class="input-group-prepend check_box">
                資產類型 :
              </div>
              <div class="d-flex align-items-center">
                <input type="radio" class='form-check-input check_box' id="radio1" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="資產" v-model="isConsumableComputed" />
                <label class="form-check-label check_box" for='radio1'>資產</label>
                <input type="radio" class='form-check-input check_box ' id="radio1" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="存貨" v-model="isConsumableComputed" />
                <label class="form-check-label check_box" for='radio1' data-toggle="tooltip" data-placement="top" title="註記此資產僅限特定專案出貨所使用">存貨</label>
                <input type="radio" class='form-check-input check_box' id="radio2" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="耗材" v-model="isConsumableComputed" />
                <label class="form-check-label check_box" for='radio2'>耗材</label>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span>*</span>申請入庫日期 :
              </div>
              <input id='date_wrap' type="date" class="form-control" aria-label="Default" placeholder="最多輸入10字" v-model="WarrantyDate">
            </div>
          </div>
        </div>
        <div class="col form_search_wrap">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>專案代碼 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="請輸入代碼" v-model="VendorName">
            <button class="form_search_btn">搜尋</button>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              專案名稱 :
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="最多輸入100字" v-model="VendorName" readonly>
          </div>
        </div>
        <div class="col form_search_wrap">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              物流單號 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="請輸入物流單號，最多20字" v-model="VendorName">
            <button class="form_search_btn">檢視</button>
          </div>
        </div>
        <div class="row row_wrap g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend equipment_wrap">
                <span>*</span>設備總類 :
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                              {{ EquipTypeName || '請選擇' }}
                            </button>
                <div class="dropdown-menu" aria-labelledby="typeDropdown">
                  <p v-for="(item, index) in EquipTypeArray" :key="index" class="dropdown-item" @click="selectType(`${item}`)">{{ item }}</p>
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
                <button class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(EquipTypeName !== '') }">
                              {{ EquipCategoryName || EquipCategoryInit }}
                            </button>
                <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                  <p v-for="(item, index) in EquipCategoryArray" :key="index" class="dropdown-item" @click="selectCategory(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span>*</span>物品名稱 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="最多輸入20字" v-model="AssetName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="最多輸入100字" v-model="VendorName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="最多輸入100字" v-model="ProductSpec">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號 :
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="最多輸入100字" v-model="ProductType">
          </div>
        </div>
        <div class="row g-0 row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4" id='number'>
              <div class="input-group-prepend info  d-xl-block d-lg-block d-md-block d-none">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"><span>*</span>包裝數量 :
              </div>
              <div class="input-group-prepend info  d-xl-none d-lg-none d-md-none d-block">
                <span>*</span>包裝數量 :<img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
              </div>
              <input class="input-number" type="number" v-model="Count" min="1">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4" id='unit'>
              <div class="input-group-prepend">
                <span>*</span>包裝單位 :
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {{ Unit || '請選擇' }}
                            </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in UnitArray" :key="index" class="dropdown-item" @click="selectUnit(`${item}`)">
                    {{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="IsConsumable" class="row g-0 row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4" id='number'>
              <div class="input-group-prepend d-xl-block d-lg-block d-md-block d-none">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包"><span>*</span>數量 :
              </div>
              <div class="input-group-prepend d-xl-none d-lg-none d-md-none d-block">
                <span>*</span> 數量 :<img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">
              </div>
              <input class="input-number" type="number" v-model="PackageNum" min="1">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4" id='unit'>
              <div class="input-group-prepend">
                <span>*</span>單位 :
              </div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {{ PackageUnit || '請選擇' }}
                            </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in PackageUnitArray" :key="index" class="dropdown-item" @click="selectPackageUnit(`${item}`)">
                    {{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固期限 :
              </div>
              <input id='date_wrap' type="text" class="form-control" aria-label="Default" placeholder="最多輸入10字" v-model="WarrantyDate">
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend ">
                保固開始日 :
              </div>
              <input type="date" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="WarrantyStartDate">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend date_wrap">
                保固到期日 :
              </div>
              <input type="date" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="WarrantyEndDate">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註 :
            </div>
            <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入500字" v-model="Memo"></textarea>
          </div>
        </div>
      </div>
      <div class="tab_section mt-5">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-selected="true">1</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="tab1" role="tabpanel">
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>物品名稱：</div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產編號：</div>
                <input type="text" class="form-control" placeholder="BFXXXXXXXX">
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input type="text" class="form-control" aria-label="Default" placeholder="最多輸入100字">
              </div>
            </div>
            <div class="col form_search_wrap">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span>*</span>專案代碼 :
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="請輸入代碼" v-model="VendorName">
                <button class="form_search_btn">搜尋</button>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">專案名稱：</div>
                <input type="text" class="form-control readonly_box" readonly>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註：</div>
                <textarea class="col" rows="5" placeholder="最多輸入500字"></textarea>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產照片：</div>
                <div class="mb-3 file_wrap">
                  <button class="choose_btn">選擇檔案</button>
                  <input type="file" accept="image/*" style="display: none;">
                </div>
                <div class="selected_file">
                  <p class="title">已選擇的檔案:</p>
                  <p class="file_upload_wrap" style="cursor: pointer;">
                    <p>File 1</p>
                    <img class="delete_icon" src="@/assets/trash.png" style="margin-left: 10px;">
                  </p>
                  <p class="file_upload_wrap" style="cursor: pointer;">
                    <p>File 2</p>
                    <img class="delete_icon" src="@/assets/trash.png" style="margin-left: 10px;">
                  </p>
                </div>
              </div>
            </div>
            <!-- <div class="col">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">已上傳檔案：</div>
                    <div class="d-flex  flex-column">
                      <p class="file_upload_wrap d-flex" style="cursor: pointer;">
                        <p>Uploaded File 1</p>
                        <img class="delete_icon" src="@/assets/trash.png" style="margin-left: 10px;">
                      </p>
                      <p class="file_upload_wrap d-flex" style="cursor: pointer;">
                        <p>Uploaded File 2</p>
                        <img class="delete_icon" src="@/assets/trash.png" style="margin-left: 10px;">
                      </p>
                    </div>
                  </div>
                </div> -->
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
  import router from '@/router';
  import {
    computed,
    onMounted,
    reactive,
    ref
  } from 'vue';
  export default {
    components: {
      Navbar
    },
    setup() {
      const Applicant = ref(''); //申請人 發API 帶入
      const ApplicationDate = ref(''); //申請日期 function帶入
      const IsConsumable = ref(false);
      const formParams = reactive({
        AssetType: '',
        ProjectCode: '',
        ShipmentNum: '',
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
        WarrantyDate: '',
        WarrantyStartDate: '',
        WarrantyEndDate: '',
        Memo: '',
      });
      const EquipTypeName = ref(''); //設備總類 *必填
      const EquipTypeArray = ref([]); //設備總類陣列 request拿到
      const EquipCategoryName = ref(''); //設備分類 *必填
      const EquipCategoryArray = ref([]); //設備分類陣列 request拿到
      const EquipCategoryInit = ref('請先選擇設備總類');
      const AssetName = ref(''); //物品名稱 *必填
      const VendorName = ref(''); //廠商
      const ProductSpec = ref(''); //規格
      const ProductType = ref(''); //型號
      const Count = ref(1); //數量 *必填
      const Unit = ref(''); //單位 *必填
      const UnitArray = (['個', '對', '箱', '包', '組', '台', '件']);
      const PackageNum = ref(1);
      const PackageUnit = ref('');
      const PackageUnitArray = (['個', '支', '枝', '隻', '根', '條', '顆']);
      const WarrantyDate = ref(''); //保固期限
      const WarrantyStartDate = ref(''); //保固開始日
      const WarrantyEndDate = ref(''); //保固到期日
      const Memo = ref(''); //備註
      const isConsumableComputed = computed({
        get() {
          return IsConsumable.value.toString();
        },
        set(value) {
          IsConsumable.value = value === 'true';
        }
      });
      function getDate() {
        const today = new Date();
        var date = '';
        date += (today.getFullYear() + '/');
        date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
        date += ((today.getDate()).toString().padStart(2, '0'));
        return date;
      }
      function selectType(item) {
        EquipTypeName.value = item;
        // console.log('選擇的總類:', EquipTypeName.value);
        getEquipCategoryName();
        EquipCategoryInit.value = '請選擇';
      }
      function selectCategory(item) {
        EquipCategoryName.value = item;
      }
      function selectUnit(item) {
        Unit.value = item;
      }
      function selectPackageUnit(item) {
        PackageUnit.value = item;
      }
      function goBack() {
        window.history.back();
      }
      async function submit() {
        // 檢查所有required項目
        // 耗材需額外檢查包裝數量、單位
        if (IsConsumable.value) {
          if (!PackageNum.value || !PackageUnit.value || PackageNum.value == 0) {
            alert('請填寫所有必填項目');
            return;
          }
        }
        if (!EquipCategoryName.value || !EquipTypeName.value || !AssetName.value || !Count.value || !Unit.value || Count.value == 0) {
          alert('請填寫所有必填項目');
          return;
        }
        if (WarrantyDate.value && !/^.{1,10}$/.test(WarrantyDate.value)) {
          alert('保固期限不可輸入超過10字');
          return
        }
        const formData = new FormData();
        const formFields = {
          'IsConsumable': IsConsumable.value,
          'EquipTypeName': EquipTypeName.value,
          'EquipCategoryName': EquipCategoryName.value,
          'AssetName': AssetName.value,
          'VendorName': VendorName.value,
          'ProductSpec': ProductSpec.value,
          'ProductType': ProductType.value,
          'Count': Count.value,
          'Unit': Unit.value,
          'WarrantyDate': WarrantyDate.value,
          'WarrantyStartDate': WarrantyStartDate.value,
          'WarrantyEndDate': WarrantyEndDate.value,
          'Memo': Memo.value
        };
        //將表格資料append到 formData
        for (const fieldName in formFields) {
          formData.append(fieldName, formFields[fieldName]);
        }
        //耗材額外將包裝數量、單位append到 formData
        if (IsConsumable.value) {
          formData.append('PackageNum', PackageNum.value);
          formData.append('PackageUnit', PackageUnit.value);
        }
        //使用axios method:post傳送新品入庫表單
        const axios = require('axios');
        try {
          const response = await axios.post('http://192.168.0.177:7008/AssetsInMng/NewAssetsIn', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            //新品表單傳送成功，跳轉至入庫管理頁面
            let msg = data.messages;
            msg += '\n單號:' + data.resultList.AI_ID;
            alert(msg);
            router.push({
              name: 'Store_Datagrid'
            });
          } else if (data.state === 'error') {
            //新品表單傳送失敗
            let msg = data.messages;
            alert(msg);
          } else if (data.state === 'input_error') {
            //新品表單格式失敗
            alert(data.messages);
          } else {
            throw new Error('Request was not successful');
          }
        } catch (error) {
          console.error('Error sending data to backend', error);
        }
      }
      async function getApplicationInfo() {
        const axios = require('axios');
        try {
          const response = await axios.get('http://192.168.0.177:7008/GetDBdata/GetApplicant');
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('申請人名稱:', data.resultList.Applicant);
            if (data.resultList.Applicant) {
              Applicant.value = data.resultList.Applicant;
            }
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend');
        }
      }
      async function getEquipTypeName() {
        if (EquipTypeArray.value.length == 0) {
          const axios = require('axios');
          try {
            const response = await axios.get('http://192.168.0.177:7008/GetParameter/GetEquipType');
            console.log(response);
            const data = response.data;
            if (data.state === 'success') {
              console.log('總類Get成功 資料如下\n', data.resultList.EquipType);
              EquipTypeArray.value = data.resultList.EquipType;
            } else if (data.state === 'error') {
              alert(data.messages);
            } else if (data.state === 'account_error') {
              alert(data.messages);
              router.push('/');
            }
          } catch (error) {
            console.error('Error sending applicant info request to backend');
          }
        }
      }
      async function getEquipCategoryName() {
        EquipCategoryName.value = '';
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetParameter/GetEquipCategory?id=${EquipTypeName.value}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('分類Get成功 資料如下\n', data.resultList.EquipCategory);
            EquipCategoryArray.value = data.resultList.EquipCategory;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push({
              name: 'Store_Datagrid'
            });
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend');
        }
      }
      onMounted(() => {
        getApplicationInfo();
        ApplicationDate.value = getDate();
      });
      return {
        isConsumableComputed,
        getDate,
        Applicant,
        ApplicationDate,
        formParams,
        IsConsumable,
        EquipTypeName,
        EquipTypeArray,
        getEquipTypeName,
        EquipCategoryName,
        EquipCategoryArray,
        EquipCategoryInit,
        getEquipCategoryName,
        AssetName,
        VendorName,
        ProductSpec,
        ProductType,
        Count,
        Unit,
        UnitArray,
        PackageNum,
        PackageUnit,
        PackageUnitArray,
        WarrantyDate,
        WarrantyStartDate,
        WarrantyEndDate,
        Memo,
        selectType,
        selectUnit,
        selectPackageUnit,
        selectCategory,
        goBack,
        submit,
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  textarea {
    padding: 5px 10px 30px;
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
