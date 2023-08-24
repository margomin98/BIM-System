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
              <div class="input-group-prepend info"><img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"> 數量：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Count" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Unit" />
            </div>
          </div>
        </div>
        <div v-if="details.IsConsumable" class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend info"><img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">包裝數量：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.PackageNum" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">包裝單位：</div>
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
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="item.AssetName" />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>資產編號：</div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="item.AssetsId" placeholder="BFXXXXXXXX" />
              </div>
            </div>
            <div class="row g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>區域：</div>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName(index)">
                            {{ item.itemAreaName || '請選擇' }}
                          </button>
                    <div class="dropdown-menu" aria-labelledby="areaDropdown">
                      <p v-for="(item, area_index) in item.AreaArray" :key="area_index" class="dropdown-item" @click="selectArea(index, `${item}`)">
                        {{ item }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3 justify-content-end">
                  <div class="input-group-prepend"><span>*</span> 櫃位：</div>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="item.itemAreaName === null || item.itemAreaName === ''">
                            {{ item.itemLayerName || item.LayerInit }}
                          </button>
                    <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                      <p v-for="(item, layer_index) in item.LayerArray" :key="layer_index" class="dropdown-item" @click="selectLayer(index, `${item}`)">{{ item }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="item.SN" />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  備註：
                </div>
                <input class="form-control" aria-label="With textarea" v-model="item.itemMemo">
              </div>
            </div>
            <div class="col">
              <!-- 選擇檔案button -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產照片：</div>
                <div class="mb-3 file_wrap">
                  <button class='choose_btn' @click="openFileExplorer(index)">選擇檔案</button>
                  <input type="file" accept="image/*" ref="fileInputs" style="display: none;" multiple @change="handleFileChange(index)" />
                </div>
                <div class='selected_file'>
                  <p class='title'>已上傳的檔案:</p>
                  <p class='file_upload_wrap' v-for="(file, img_index) in item.existFile" :key="img_index" style="cursor: pointer;">
                    <p @click="showExistFileImage(index, img_index)" data-bs-toggle="modal" data-bs-target="#existFile_modal">
                      {{ file.FileName }}
                    </p>
                    <img class='delete_icon' src="@/assets/trash.png" @click="deleteExistFile(index, img_index)" style="margin-left: 10px;">
                  </p>
                  <p class='title'>已選擇的檔案:</p>
                  <p class='file_upload_wrap' v-for="(file, img_index) in item.newFile" :key="img_index" style="cursor: pointer;">
                    <p @click="showNewFileImage(index, img_index)" data-bs-toggle="modal" data-bs-target="#newFile_modal">{{ file.name }}
                    </p>
                    <img class='delete_icon' src="@/assets/trash.png" @click="deleteNewFile(index, img_index)" style="margin-left: 10px;">
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
          if (initArray.itemLayerName) {
            getLayerName(i);
          }
        }
      }
      async function getAreaName(index) {
        if (formData[index].AreaArray.length == 0) {
          const axios = require('axios');
          try {
            const response = await axios.get('http://192.168.0.176:7008/GetParameter/GetAreaName');
            // console.log(response);
            const data = response.data;
            if (data.state === 'success') {
              // console.log('Area Get成功 資料如下\n', data.resultList.AreaName);
              formData[index].AreaArray = data.resultList.AreaName;
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
      }
      async function getLayerName(index) {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.176:7008/GetParameter/GetLayerName?id=${formData[index].itemAreaName}`);
          // console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            // console.log('Layer Get成功 資料如下\n', data.resultList.LayerName);
            formData[index].LayerArray = data.resultList.LayerName;
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
      function selectArea(index, item) {
        formData[index].itemAreaName = item;
        getLayerName(index);
        formData[index].LayerInit = '請選擇';
      }
      function selectLayer(index, item) {
        formData[index].itemLayerName = item;
      }
      async function temp() {
        const formDataArray = [];
        let promises = [];
        var InputMessages = '';
        var InputError = false;
        //檢查暫存必填項目(物品名稱)
        for (let i = 0; i < tabNumber.value; i++) {
          const form = formData[i];
          const pattern = /^(BF\d{8})$/;
          if (!form.AssetName) {
            alert('物品名稱必填');
            return
          }
          if (form.AssetsId && !pattern.test(form.AssetsId)) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　資產編號不符合格式' + '\n';
          }
        }
        if (InputError) {
          alert(InputMessages);
          return;
        }
        // 暫存 送出前查詢
        if (await queryFormData()) {
          return;
        }
        // 將陣列資料整理成N個FormData分N次傳送
        for (let i = 0; i < tabNumber.value; i++) {
          const myForm = formData[i];
          const form = new FormData();
          const formFields = {
            'AI_ID': AI_ID,
            'PadNum': i,
            'AssetName': myForm.AssetName,
            'AssetsId': myForm.AssetsId,
            'itemAreaName': myForm.itemAreaName,
            'itemLayerName': myForm.itemLayerName,
            'SN': myForm.SN,
            'itemMemo': myForm.itemMemo,
          };
          for (const fieldName in formFields) {
            if (formFields[fieldName] !== '' && formFields[fieldName] !== null) {
              form.append(fieldName, formFields[fieldName]);
              console.log(form.get(`${fieldName}`));
            }
          }
          if (myForm.deleteFile.length > 0) {
            for (let j = 0; j < myForm.deleteFile.length; j++) {
              form.append('deleteFile', myForm.deleteFile[j]);
            }
          }
          if (myForm.newFile) {
            for (let j = 0; j < myForm.newFile.length; j++) {
              form.append('newFile', myForm.newFile[j]);
            }
          }
          // 在這邊將每張form傳到後端使用promise陣列接起來
          formDataArray.push(form);
          const promise = sendFormData(form, 'temp');
          promises.push(promise);
        }
        await Promise.all(promises)
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
      async function submit() {
        const formDataArray = [];
        let promises = [];
        var InputMessages = '';
        var InputError = false;
        //檢查送出必要項目
        for (let i = 0; i < tabNumber.value; i++) {
          const form = formData[i];
          const pattern = /^(BF\d{8})$/;
          //物品名稱必填
          if (!form.AssetName) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　物品名稱必填' + '\n';
          }
          //資產編號必填、不全為空格、格式BF & 8位數
          if (!pattern.test(form.AssetsId) || form.AssetsId === '' || !checkSpace(form.AssetsId)) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　資產編號不符合格式' + '\n';
          }
          if (!form.itemAreaName) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　區域必填' + '\n';
          }
          if (!form.itemLayerName) {
            InputError = true;
            InputMessages += '頁籤 ' + (i + 1) + ' :　櫃位必填' + '\n';
          }
        }
        if (InputError) {
          alert(InputMessages);
          return;
        }
        //檢查資產編號是否有重複
        if (await checkAssetsIdRepeat()) {
          return;
        }
        // 暫存 送出前查詢
        if (await queryFormData()) {
          return;
        }
        // 將陣列資料整理成N個FormData分N次傳送
        for (let i = 0; i < tabNumber.value; i++) {
          const myForm = formData[i];
          const form = new FormData();
          const formFields = {
            'AI_ID': AI_ID,
            'PadNum': i,
            'AssetName': myForm.AssetName,
            'AssetsId': myForm.AssetsId,
            'itemAreaName': myForm.itemAreaName,
            'itemLayerName': myForm.itemLayerName,
            'SN': myForm.SN,
            'itemMemo': myForm.itemMemo,
          };
          for (const fieldName in formFields) {
            if (formFields[fieldName] !== '' && formFields[fieldName] !== null) {
              form.append(fieldName, formFields[fieldName]);
              console.log(form.get(`${fieldName}`));
            }
          }
          if (myForm.deleteFile.length > 0) {
            for (let j = 0; j < myForm.deleteFile.length; j++) {
              form.append('deleteFile', myForm.deleteFile[j]);
            }
          }
          if (myForm.newFile) {
            for (let j = 0; j < myForm.newFile.length; j++) {
              form.append('newFile', myForm.newFile[j]);
            }
          }
          // 在這邊將每張form傳到後端使用promise陣列接起來
          formDataArray.push(form);
          const promise = sendFormData(form, 'submit');
          promises.push(promise);
        }
        await Promise.all(promises)
          .then(result => {
            const allSuccess = result.every(result => result === 'success');
            if (allSuccess) {
              alert('入庫成功\n單號為:' + AI_ID);
              router.push({
                name: 'Store_Process_Datagrid'
              });
            } else {
              alert('入庫失敗');
            }
          })
          .catch(error => {
            console.error(error);
          })
      }
      async function queryFormData() {
        const axios = require('axios');
        const response = await axios.get(`http://192.168.0.176:7008/AssetsInMng/AssetsInAdd?ai_id=${AI_ID}`);
        const data = response.data;
        try {
          if (data.state !== 'success') {
            alert(data.messages);
            return true;
          }
        } catch (error) {
          console.error(error);
        }
        console.log(data.messages);
        return false;
      }
      async function sendFormData(formData, type) {
        var baseUrl = '';
        if (type === 'temp')
          baseUrl = '/AssetsInMng/TempAssetsIn'
        else if (type === 'submit') {
          baseUrl = '/AssetsInMng/AssetsIn'
        }
        const axios = require('axios');
        try {
          const response = await axios.post(`http://192.168.0.176:7008${baseUrl}`, formData);
          console.log(response.data);
          return response.data.state;
        } catch (error) {
          console.error(error);
        }
      }
      function openFileExplorer(index) {
        fileInputs[index].click();
      }
      function handleFileChange(index) {
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
        if (formData[index].existFile) {
          if (formData[index].newFile.length + formData[index].existFile.length + files.length > 5) {
            alert('上傳至多5張圖片');
            return;
          }
        } else {
          if (formData[index].newFile.length + files.length > 5) {
            alert('上傳至多5張圖片');
            return;
          }
        }
        console.log(event.target.files);
        // 压缩并处理图像
        const imgArray = formData[index].newFile;
        const previewUrl = formData[index].previewUrl;
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
                previewUrl.push(URL.createObjectURL(compressedFile));
              }, files[i].type, 0.8);
            };
          };
          reader.readAsDataURL(files[i]);
        }
        // console.log(formData[index].previewUrl);
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
      function deleteNewFile(index, img_index) {
        formData[index].newFile.splice(img_index, 1);
        formData[index].previewUrl.splice(img_index, 1);
      }
      function deleteExistFile(index, img_index) {
        const deleteFileName = formData[index].existFile[img_index].FileName;
        formData[index].deleteFile.push(deleteFileName);
        console.log(formData);
        formData[index].existFile.splice(img_index, 1);
      }
      function getNewFileUrl() {
        newFileImageUrl.value = formData[newFileData.value].previewUrl[newFileImage.value];
        newFileModalTitle.value = formData[newFileData.value].newFile[newFileImage.value].name;
      }
      function getExistFileUrl() {
        existFileImageUrl.value = details.value.Tabs[existFileData.value].existFile[existFileImage.value].FileLink;
        existFileModalTitle.value = details.value.Tabs[existFileData.value].existFile[existFileImage.value].FileName;
      }
      function checkSpace(AssetsId) {
        return !/^\s+$/.test(AssetsId);
      }
      //檢查 1. AssetsId之間是否重複 2. AseetsId比對資料庫是否重複
      async function checkAssetsIdRepeat() {
        var myForm = [];
        for (let i = 0; i < tabNumber.value; i++) {
          const form = formData[i];
          myForm.push(form.AssetsId);
        }
        console.log(myForm);
        //1.
        var seen = {};
        for (const value of myForm) {
          if (seen[value]) {
            alert('input之間有重複')
            return true
          }
          seen[value] = true;
        }
        //2.
        const repeatForm = new FormData();
        for (let i = 0; i < tabNumber.value; i++) {
          repeatForm.append('assetsIds', myForm[i]);
        }
        const axios = require('axios');
        const response = await axios.post('http://192.168.0.176:7008/GetDBdata/CheckAssetsInID', repeatForm);
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
        getAreaName,
        getLayerName,
        selectArea,
        selectLayer,
        temp,
        submit,
        openFileExplorer,
        handleFileChange,
        showNewFileImage,
        showExistFileImage,
        deleteExistFile,
        deleteNewFile,
        checkSpace,
        goBack,
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
              width: 120px;
              text-align: end;
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
              width: 120px;
              text-align: end;
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
  }
</style>
