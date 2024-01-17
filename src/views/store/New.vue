<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        新品入庫
      </h1>
    </div>
    <Store_Component></Store_Component>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Store_Component from '@/components/store_page/storage_component.vue'
import { useRoute } from 'vue-router';
import router from '@/router';
import { UnitArray, PackageUnitArray } from '@/assets/js/dropdown'
import {
  getApplication,
  getEquipType,
  getEquipCategory,
  getProject
} from '@/assets/js/common_api'
import { goBack, getDate, checkFileSize, } from "@/assets/js/common_fn"
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
const route = useRoute();
const Applicant = ref(''); //申請人 發API 帶入
const ApplicationDate = ref(''); //申請日期 function帶入
const ShipmentNum = ref('')
const AR_ID = ref('')
const Memo = ref('')
const itemParams = reactive({
  AssetType: '',
  ProjectCode: '',
  ProjectName: '', //提交時不需要加入form
  EquipTypeName: '',
  EquipType_Id: '',
  EquipCategoryName: '',
  Category_Id: '',
  AssetName: '',
  AssetsId: '',
  VendorName: '',
  ProductSpec: '',
  ProductType: '',
  SN: '',
  Count: 1,
  Unit: '',
  PackageNum: 1,
  PackageUnit: '',
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
const tabNumber = ref(1); //v-for不直接使用 itemParams.Count(input改成空白會error)
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
  if (route.query.search_id && route.query.ShipmentNum) {
    ShipmentNum.value = route.query.ShipmentNum;
    AR_ID.value = route.query.search_id;
  }
});
// 生成Tab頁籤資料，生成後清空填寫欄位
function insertTab() {
  // 檢查填寫欄位
  if (!checkItemForm()) {
    return;
  }
  // 生成頁籤
  for (let i = 0; i < itemParams.PackageNum; i++) {
    tabData.push({
      // PadNum: i,
      itemAssetType: itemParams.AssetType,
      itemProjectCode: itemParams.ProjectCode,
      itemProjectName: itemParams.ProjectName, //不需要傳
      itemEquipTypeName: itemParams.EquipTypeName,
      itemEquipType_Id: itemParams.EquipType_Id,
      itemEquipCategoryName: itemParams.EquipCategoryName,
      itemCategory_Id: itemParams.Category_Id,
      EquipCategoryArray: [],
      EquipCategoryInit: '請先選擇設備總類',
      itemAssetName: itemParams.AssetName,
      itemAssetsId: itemParams.AssetsId,
      itemVendorName: itemParams.VendorName,
      itemProductSpec: itemParams.ProductSpec,
      itemProductType: itemParams.ProductType,
      itemSN: itemParams.SN,
      itemCount: itemParams.Count, //耗材就要傳
      itemUnit: itemParams.Unit, //耗材就要傳
      itemPackageNum: 1,
      itemPackageUnit: itemParams.PackageUnit,
      itemMemo: itemParams.Memo,
      newFile: [],
      viewFile: [], //不需要傳
    });
    getEquipCategoryName('tab', tabData.length - 1)
  }
  // 清空填寫欄位
  for (const key in itemParams) {
    const type = typeof itemParams[key]
    if (type === 'string') {
      itemParams[key] = ''
    } else if (type === 'number') {
      itemParams[key] = 1;
    }
  }
  EquipCategoryInit.value = '請先選擇設備總類'
}
function deleteTab(index) {
  tabData.splice(index, 1);
  // 若刪除的為最後一筆 則將頁籤切換到現有的最後一筆
  if (index == tabData.length && index != 0) {
    const tabs = document.querySelectorAll('button.nav-link');
    console.log('tabs:', tabs);
    tabs[index - 1].classList.add('active');
    // 显示对应的标签页内容
    const tabContents = document.querySelectorAll('.tab-pane');
    tabContents[index - 1].classList.add('show', 'active');
  }
}
// 檢查填寫欄位 1.必填 2.字數限制
function checkItemForm() {
  for (const key in itemParams) {
    if (typeof itemParams[key] === 'string') {
      itemParams[key] = itemParams[key].trim();
    }
  }
  // 1-1 一般欄位
  if (!itemParams.AssetType || !itemParams.EquipType_Id || !itemParams.Category_Id || !itemParams.AssetName || !itemParams.PackageNum || !itemParams.PackageUnit) {
    alert('請輸入必填項目');
    return false;
  }
  // 1-2 存貨->專案代碼必填
  if (itemParams.AssetType === '存貨' && !itemParams.ProjectCode) {
    alert('請輸入必填項目');
    return false;
  }
  // 1-3 耗材->數量、單位必填
  if (itemParams.AssetType === '耗材') {
    if (!itemParams.Count || !itemParams.Unit) {
      alert('請輸入必填項目');
      return false;
    }
  }
  // 2.
  if (!/^[\s\S]{0,10}$/.test(itemParams.ProjectCode)) {
    alert('專案代碼不可輸入超過10字')
    return false;
  }
  if (!/^[\s\S]{0,20}$/.test(itemParams.AssetName)) {
    alert('物品名稱不可輸入超過20字')
    return false;
  }
  if (!/^[\s\S]{0,100}$/.test(itemParams.VendorName)) {
    alert('廠商不可輸入超過100字')
    return false;
  }
  if (!/^[\s\S]{0,100}$/.test(itemParams.ProductSpec)) {
    alert('規格不可輸入超過100字')
    return false;
  }
  if (!/^[\s\S]{0,100}$/.test(itemParams.ProductType)) {
    alert('型號不可輸入超過100字')
    return false;
  }
  if (!/^[\s\S]{0,100}$/.test(itemParams.SN)) {
    alert('S/N不可輸入超過100字')
    return false;
  }
  if (!/^[\s\S]{0,500}$/.test(itemParams.Memo)) {
    alert('備註不可輸入超過500字')
    return false;
  }
  // 都正確 
  return true;
}
// 檢查頁籤
function checkRequireParams() {
  if (tabData.length === 0) {
    alert('請至少填寫一項資產資訊')
    return false;
  }
  // 檢查頁籤必填、格式
  // 必填只需檢查:設備分類、物品名稱、存貨的專案代碼、耗材的數量&單位
  const BF_pattern = /^(BF\d{8})$/;
  var InputMessages = '';
  var InputError = false;
  for (let i = 0; i < tabData.length; i++) {
    const form = tabData[i];
    // 設備分類必填
    form.itemCategory_Id = form.itemCategory_Id.trim()
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
    // 資產編號若有value 格式為 BF+8位數  
    if (form.itemAssetsId) {
      form.itemAssetsId = form.itemAssetsId.trim();
      if (!BF_pattern.test(form.itemAssetsId)) {
        InputError = true;
        InputMessages += '頁籤 ' + (i + 1) + ' :　資產編號不符合格式' + '\n';
      }
    }
    // 專案代碼不可超過10字
    if (!/^[\s\S]{0,10}$/.test(form.itemProjectCode)) {
      InputError = true;
      InputMessages += '頁籤 ' + (i + 1) + ' :　專案代碼不可輸入超過10字' + '\n';
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
function resetUnitCount(type, index) {
  switch (type) {
    case 'upperForm':
      itemParams.Unit = '';
      itemParams.Count = 1;
      break;
    case 'tab':
      tabData[index].itemUnit = '';
      tabData[index].itemCount = 1;
      break;
  }
}
function selectShipmentNum(item) {
  ShipmentNum.value = item.ShipmentNum;
  AR_ID.value = item.AR_ID;
  showOptions.value = false;
}
function selectType(type, item, index) {
  switch (type) {
    case 'upperForm':
      itemParams.EquipTypeName = item.Name;
      itemParams.EquipType_Id = item.Id;
      itemParams.EquipCategoryName = '';
      itemParams.Category_Id = '';
      getEquipCategoryName('upperForm');
      EquipCategoryInit.value = '請選擇';
      break;
    case 'tab':
      console.log('index:', tabData[index]);
      tabData[index].itemEquipTypeName = item.Name;
      tabData[index].itemEquipType_Id = item.Id;
      tabData[index].itemEquipCategoryName = '';
      tabData[index].itemCategory_Id = '';
      getEquipCategoryName('tab', index);
      tabData[index].EquipCategoryInit = '請選擇';
      break;
  }
}
function selectCategory(type, item, index) {
  switch (type) {
    case 'upperForm':
      itemParams.EquipCategoryName = item.Name;
      itemParams.Category_Id = item.Id;
      break;
    case 'tab':
      tabData[index].itemEquipCategoryName = item.Name;
      tabData[index].itemCategory_Id = item.Id;
      break;
  }
}
function selectUnit(type, item, index) {
  switch (type) {
    case 'upperForm':
      itemParams.Unit = item;
      break;
    case 'tab':
      console.log('1');
      tabData[index].itemUnit = item;
      break;
  }
}
function selectPackageUnit(type, item, index) {
  switch (type) {
    case 'upperForm':
      itemParams.PackageUnit = item;
      break;
    case 'tab':
      tabData[index].itemPackageUnit = item;
      break;
  }
}
// 開啟選擇檔案
function openFileExplorer(index) {
  // console.log('fileInputs', fileInputs);
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
  // 檢查圖片大小
  if (!checkFileSize(files, tabData[index].newFile)) {
    return
  }
  const imgArray = tabData[index].newFile;
  const previewUrl = tabData[index].viewFile;
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const file = files[i]; // 保持原始文件
      imgArray.push(file);
      previewUrl.push({
        FileName: file.name,
        FileLink: URL.createObjectURL(file),
      });
    };
    reader.readAsDataURL(files[i]);
  }
  // console.log(formData[index].previewUrl);
}
function viewImgFile(index, file_index) {
  modalParams.title = tabData[index].viewFile[file_index].FileName;
  modalParams.src = tabData[index].viewFile[file_index].FileLink;
  console.log('modalParams', modalParams);
}
function deleteFile(index, file_index) {
  tabData[index].newFile.splice(file_index, 1);
  tabData[index].viewFile.splice(file_index, 1);
}
// 關掉物流單號下拉式選單
function handleBlur() {
  setTimeout(() => {
    showOptions.value = false;
  }, 100);
}
function viewReceive() {
  if (AR_ID.value) {
    const link = document.getElementById('view-receive');
    link.click();
  }
}
// 送出
async function submit() {
  // 檢查必填項目、格式
  if (!checkRequireParams()) {
    return
  }
  // 檢查頁籤專案代碼是否有效
  let projectCodeList = [];
  tabData.forEach((item, index) => {
    if (item.itemProjectCode) {
      projectCodeList.push({
        PadNum: index,
        projectCode: item.itemProjectCode,
      })
    }
  })
  if (projectCodeList.length !== 0) {
    console.log('projectCodeList:', projectCodeList);
    try {
      const messages = await checkProjectCode(projectCodeList);
      if (messages !== 'success') {
        alert(messages);
        throw new Error(messages);
      }
    } catch (error) {
      console.error(error);
      return
    }
  }
  console.log('頁籤資料', tabData);
  try {
    // 先建立表單並回傳resultList
    const resultList = await sendUpperForm();
    console.log('上半部resultList', resultList);
    // 再依照resultList將 下半部頁籤 單次分別上傳
    const filePromises = [];
    for (let i = 0; i < tabData.length; i++) {
      const itemId = resultList.Tabs[i]
      filePromises.push(sendFileForm(itemId, tabData[i], i));
    }
    // 等待所有檔案上傳完成
    await Promise.all(filePromises)
      .then(result => {
        const allSuccess = result.every(result => result === 'success')
        if (allSuccess) {
          alert('傳送新品入庫表單成功\n單號為:' + resultList.AI_ID);
          router.push({
            name: 'Store_Datagrid'
          });
        } else {
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
    const axios = require('axios');
    const form = new FormData();
    form.append('AR_ID', AR_ID.value);
    form.append('tab_count', tabData.length);
    form.append('Memo', Memo.value);
    axios.post('http://192.168.0.177:7008/AssetsInMng/NewAssetsIn', form)
      .then(response => {
        const data = response.data;
        if (data.state === 'success') {
          const resultList = response.data.resultList;
          resolve(resultList);
        } else {
          reject(data.messages);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
// 頁籤部分
function sendFileForm(itemId, tabData, index) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    // 先append itemId
    form.append('itemId', itemId);
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
    form.delete('itemProjectName')
    form.delete('viewFile')
    // 不是耗材的話 剔除itemCount、itemUnit
    if (tabData.itemAssetType !== '耗材') {
      form.delete('itemUnit')
      form.delete('itemCount')
    }
    // newFile等等額外append 先剔除
    form.delete('newFile')
    for (let i = 0; i < tabData.newFile.length; i++) {
      form.append('newFile', tabData.newFile[i]);
    }
    const axios = require('axios');
    axios.post('http://192.168.0.177:7008/AssetsInMng/ItemEdit', form)
      .then((response) => {
        const data = response.data;
        if (data.state === 'success') {
          // 文件表单提交成功，继续执行
          console.log(`第${index + 1}個頁籤上傳成功`);
          resolve(data.state)
        } else {
          // 如果状态不是 "success"，调用 reject 并传递错误信息
          console.error(`第${index + 1}個頁籤上傳失敗，${data.messages}`);
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
    .then((data) => {
      Applicant.value = data;
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
async function getEquipCategoryName(type, index) {
  var params = ''
  switch (type) {
    case 'upperForm':
      params = itemParams.EquipType_Id
      break;
    case 'tab':
      params = tabData[index].itemEquipType_Id
      break;
  }
  getEquipCategory(params)
    .then((data) => {
      switch (type) {
        case 'upperForm':
          DropdownArray.EquipCategory = data;
          break;
        case 'tab':
          tabData[index].EquipCategoryArray = data;
          break;
      }
    })
    .catch((error) => {
      console.error(error);
    })
}
async function getShipmentNum() {
  // 物流單號有變動就將AR_ID清空 只有使用下拉選單才會傳AR_ID
  AR_ID.value = '';
  ShipmentNum.value = ShipmentNum.value.trim();
  const form = new FormData();
  form.append('projectCode', itemParams.ProjectCode);
  const axios = require('axios');
  const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/SearchShipmentNum?id=${ShipmentNum.value}`);
  try {
    const data = response.data;
    if (data.state === 'success') {
      // console.log('物流單號查詢結果', data.resultList);
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
async function getProjectName(type, index) {
  let code = ''
  switch (type) {
    case 'upperForm':
      code = itemParams.ProjectCode;
      itemParams.ProjectCode = itemParams.ProjectCode.trim();
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
    .then((data) => {
      switch (type) {
        case 'upperForm':
          itemParams.ProjectName = data;
          break;
        case 'tab':
          tabData[index].itemProjectName = data;
          break;
      }
    })
    .catch((error) => {
      console.error(error);
    })
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

textarea {
  padding: 5px 10px 30px;
}

.dropdown {

  #typeDropdown,
  #categoryDropdown,
  #areaDropdown {
    height: 38px;
    padding: 5px 10px !important;
  }
}

.delete_btn {
  background: var(--c-5, #E94B4B);
  justify-content: center;
  align-items: center;
  display: inline-flex;
  height: 40px;
  color: #FFF;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  border: none;
  position: absolute;
  bottom: -1%;
  width: 100%;
  z-index: 2;
  left: 0;
  right: 0;
  margin: 0;
  border-radius: 0 0 10px 10px;

  &:hover {
    background-color: #a51e1e;
  }
}

.back_btn {
  @include back_to_previous_btn;

  &:hover {
    background-color: #5d85bb;
  }
}

.send_btn {
  @include search_and_send_btn;

  &:hover {
    background-color: #5D85BD;
  }
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

.view_icon,
.trash_icon {
  cursor: pointer
}

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
  top: 40px;
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

.search_section {
  position: relative;
  display: flex;
  flex: 1 1 auto; // width: 100%;

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
        width: 57%;
      }

      .fixed_info {
        @include fixed_info;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }

        span {
          @include red_star
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
          font-size: 18px;

          div:nth-child(2) {
            gap: 0 10px;
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
        padding: 50px 20px;
        position: relative;

        .selected_file {
          display: flex;
          align-items: center;

          .file_upload_wrap {
            margin-bottom: 0;
            display: flex;
            align-items: center;

            img {
              width: 25px;
              height: 25px;
            }

            p {
              font-weight: 700;
              margin-bottom: 0;
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

        .input-number {
          width: 64%;
        }

        .check_box_wrap {
          font-weight: 700;
          align-items: center;
          color: white;
          font-size: 18px;

          div:nth-child(2) {
            gap: 0 10px;
            display: flex;
          }
        }

        .dropdown {
          width: 245px;

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
          flex-wrap: nowrap;

          span {
            @include red_star
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
            width: 130px;
            text-align: end;
          }

          .file_wrap {
            display: flex;
            flex-direction: column;

            .choose_btn {
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
      width: 700px;

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
        width: 65%;
      }

      .fixed_info {
        @include fixed_info;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }

        span {
          @include red_star
        }
      }

      .content {
        @include content_bg;
        padding: 12px;

        .input-group-prepend {
          width: 113.5px;
          white-space: nowrap;
        }

        .check_box_wrap {
          font-weight: 700;
          align-items: center;
          color: white;
          font-size: 18px;

          div:nth-child(2) {
            gap: 0 10px;
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

          &::before {
            margin-right: 5px;
            content: '·';
            font-weight: 700;
            color: white;
          }
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
        padding: 50px 20px;
        position: relative;

        .input-number {
          width: 59%;
        }

        .check_box_wrap {
          font-weight: 700;
          align-items: center;
          color: white;
          font-size: 18px;

          div:nth-child(2) {
            gap: 0 10px;
            display: flex;
          }
        }

        .dropdown {
          width: 190px;

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
          flex-wrap: nowrap;

          span {
            @include red_star
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
            width: 130px;
            text-align: end;
          }

          .file_wrap {
            display: flex;
            flex-direction: column;

            .choose_btn {
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
        height: unset;
        flex-direction: column;
        padding: 10px;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }

        span {
          @include red_star
        }
      }

      .content {
        @include content_bg;

        .check_box_wrap {
          flex-direction: row;
          font-weight: 700;
          color: white;
          font-size: 18px;

          .check_box {
            margin-right: 10px;
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
            margin-bottom: 5px;
            margin-right: 10px;
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
        justify-content: space-between;
        margin: 30px auto 5%;
        width: 210px;

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
        position: relative;

        .selected_file {
          display: flex;
          align-items: center;

          .input-group {
            flex-direction: column;
          }

          .file_upload_wrap {
            margin-bottom: 0;
            display: flex;
            align-items: center;

            img {
              width: 25px;
              height: 25px;
            }

            p {
              font-weight: 700;
              margin-bottom: 0;
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
          flex-direction: column;
          font-weight: 700;
          color: white;
          font-size: 18px;

          .radio_wrap {
            gap: 0 10px;
            padding-left: 10px;
          }

          .input-group-prepend {
            width: auto !important;
            align-self: self-start;
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
