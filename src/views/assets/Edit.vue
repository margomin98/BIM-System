<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>編輯資產</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_title">
        <div>
          <h4>資產資訊</h4>
        </div>
      </div>
      <div class="fixed_info">
        <div>
          <p>入庫人員: {{ details.AssetsInOperator }}</p>
        </div>
        <div>
          <p>入庫日期: {{ details.InboundDate }}</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">資產編號：</div>
            <input type="text" class="form-control readonly_box" readonly v-model="AssetsId" />
          </div>
        </div>
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
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>設備總類：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                    {{ details.EquipTypeName || '請選擇' }}
                  </button>
                <div class="dropdown-menu" aria-labelledby="statusDropdown">
                  <p v-for="(item, index) in EquipTypeArray" :key="index" class="dropdown-item" @click="selectType(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>設備分類：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(details.EquipTypeName !== '') }">
                    {{ details.EquipCategoryName || EquipCategoryInit }}
                  </button>
                <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                  <p v-for="(item, index) in EquipCategoryArray" :key="index" class="dropdown-item" @click="selectCategory(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>物品名稱：</div>
            <input type="text" class="form-control " placeholder="最多輸入20字" v-model="details.AssetName" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">廠商：</div>
            <input type="text" class="form-control " placeholder="最多輸入100字" v-model="details.VendorName" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">型號：</div>
            <input type="text" class="form-control " placeholder="最多輸入100字" v-model="details.ProductType" />
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">規格：</div>
              <input type="text" class="form-control " placeholder="最多輸入100字" v-model="details.ProductSpec" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">S/N：</div>
              <input type="text" class="form-control " placeholder="最多輸入100字" v-model="details.SN" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">總庫存數量：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" readonly v-model="details.Number" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" readonly v-model="details.Unit" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>儲位區域：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName(index)">
                  {{ details.AreaName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in AreaArray" :key="index" class="dropdown-item" @click="selectArea(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>儲位櫃位：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="details.AreaName === null || details.AreaName === ''">
                  {{ details.LayerName || LayerInit }}
                </button>
                <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                  <p v-for="(item, index) in LayerArray" :key="index" class="dropdown-item" @click="selectLayer(`${item}`)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control " readonly v-model="details.WarrantyDate">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固開始日： </div>
              <input type="date" class="form-control " v-model="details.WarrantyStartDate" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固到期日：</div>
              <input type="date" class="form-control " v-model="details.WarrantyEndDate" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <textarea style="height: 150px;" class="form-control " aria-label="With textarea" v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col photo">
      <div class="fixed_title">
        <div>
          <h4>資產照片</h4>
        </div>
      </div>
      <div class="content">
        <swiper-container class='swiper_section' :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" 
        :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">

          <swiper-slide v-for="(item , index) in existFile" :key="index" class="custom-slide">
            <img :src="item" alt="">
            <span @click="deleteFileFunction(index)">x</span>
          </swiper-slide>
        </swiper-container>
        <div class="swiper_pagination">
        </div>
      </div>
      <div class="col button_wrap">
        <button class='select_btn' @click="openFileExplorer()">選擇檔案</button>
        <input type="file" accept="image/*" ref="fileInputs" style="display: none;" multiple @change="handleFileChange($event)" />
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
    <div class="info_wrap col log">
      <div class="fixed_title">
        <div>
          <h4>進出庫歷史紀錄</h4>
        </div>
      </div>
      <div class="content_wrap">
        <div class="content">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4 col-6">
              <p>作業日期(起)</p>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" class="date-input"/>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-6">
              <p>作業日期(迄)</p>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" class="date-input" />
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-12">
              <p>作業行為</p>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ 'selectedItem' || "請選擇" }}
                              </button>
                <div class="dropdown-menu" aria-labelledby="statusDropdown">
                  <p class="dropdown-item" @click="selectStatus('選項1')">選項1</p>
                  <p class="dropdown-item" @click="selectStatus('選項2')">選項2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col button_wrap">
          <button class="search_btn">檢索</button>
          <button class="empty_btn">清空</button>
        </div>
        <div class="info_wrap">
          <ag-grid-vue style="width: 100%; height:380px; background-color: #402a2a;margin-bottom:50px" :rowHeight="rowHeight" id='grid_table' class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :paginationAutoPageSize="true"
            :pagination="true">
          </ag-grid-vue>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Storage_list_view_button from "@/components/Storage_list_view_button";
  import {
    register
  } from 'swiper/element/bundle';
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
    Pagination
  } from 'swiper/modules';
  register();
  export default {
    components: {
      Navbar,
      AgGridVue,
      Storage_list_view_button,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AssetsId = route.query.search_id;
      const details = ref({});
      const EquipTypeArray = ref([]); //設備總類陣列 request拿到
      const EquipCategoryArray = ref([]); //設備分類陣列 request拿到
      const EquipCategoryInit = ref('請先選擇設備總類');
      const AreaArray = ref([]); //區域陣列
      const LayerArray = ref([]); //櫃位陣列
      const LayerInit = ref('請先選擇區域');
      const fileInputs = ref();
      const existFile = reactive([
        'https://www.cityonelimo.com/uploaded_files/seo-flyer/BLOG072202304240720_Remote%20work%20image.jpeg',
        'https://static01.nyt.com/images/2021/01/17/fashion/13workathome/13workathome-superJumbo.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_Down_%28250260941%29.jpeg',
        'https://www.cityonelimo.com/uploaded_files/seo-flyer/BLOG072202304240720_Remote%20work%20image.jpeg',
        'https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_Down_%28250260941%29.jpeg',
      ]);
      const Files = reactive({
        newFile: [],
        deleteFile: [],
      })
      onMounted(() => {
        getDetails();
      });
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.176:7008/GetDBdata/GetAssetInfo?id=${AssetsId}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            if (details.value.WarrantyStartDate && details.value.WarrantyEndDate) {
              details.value.WarrantyStartDate = details.value.WarrantyStartDate.replace(/\//g, '-');
              details.value.WarrantyEndDate = details.value.WarrantyEndDate.replace(/\//g, '-');
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
      async function submit() {
        console.log(details.value);
        // const axios = require('axios');
        // const formData = new FormData();
        // const formFields = {
        //   'AI_ID': details.value.AI_ID,
        //   'DeliveryOperator': validation.value.user1.account,
        //   'AssetsInOperator': validation.value.user2.account,
        // };
        // //將表格資料append到 formData
        // for (const fieldName in formFields) {
        //   formData.append(fieldName, formFields[fieldName]);
        //   console.log(formData.get(`${fieldName}`));
        // }
        // const response = await axios.post('http://192.168.0.176:7008/AssetsInMng/Delivery', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
        // try {
        //   const data = response.data;
        //   console.log(data);
        //   if (data.state === 'success') {
        //     let msg = data.messages;
        //     msg += '\n編號:' + data.resultList.AI_ID;
        //     alert(msg);
        //     router.push({
        //       name: 'Store_Process_Datagrid'
        //     });
        //   } else if (data.state === 'error') {
        //     alert(data.messages);
        //     console.log('error state', response);
        //   }
        // } catch (error) {
        //   console.error(error);
        // }
      }
      async function getEquipTypeName() {
        if (EquipTypeArray.value.length == 0) {
          const axios = require('axios');
          try {
            const response = await axios.get('http://192.168.0.176:7008/GetParameter/GetEquipType');
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
        details.value.EquipCategoryName = '';
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.176:7008/GetParameter/GetEquipCategory?id=${details.value.EquipTypeName}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('分類Get成功 資料如下\n', data.resultList.EquipCategory);
            EquipCategoryArray.value = data.resultList.EquipCategory;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend', error);
        }
      }
      async function getAreaName() {
        if (AreaArray.value.length == 0) {
          const axios = require('axios');
          try {
            const response = await axios.get('http://192.168.0.176:7008/GetParameter/GetAreaName');
            console.log(response);
            const data = response.data;
            if (data.state === 'success') {
              console.log('Area Get成功 資料如下\n', data.resultList.AreaName);
              AreaArray.value = data.resultList.AreaName;
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
      async function getLayerName() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.176:7008/GetParameter/GetLayerName?id=${details.value.AreaName}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Layer Get成功 資料如下\n', data.resultList.LayerName);
            LayerArray.value = data.resultList.LayerName;
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
      function selectType(item) {
        details.value.EquipTypeName = item;
        // console.log('選擇的總類:', EquipTypeName.value);
        getEquipCategoryName();
        EquipCategoryInit.value = '請選擇';
      }
      function selectCategory(item) {
        details.value.EquipCategoryName = item;
      }
      const selectArea = (item) => {
        details.value.AreaName = item;
        details.value.LayerName = '';
        //API function here
        getLayerName();
        LayerInit.value = '請選擇';
      };
      const selectLayer = (item) => {
        details.value.LayerName = item;
      };
      //輪播部分
      function openFileExplorer() {
        fileInputs.value.click();
      }
      function handleFileChange(event) {
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
        // const previewUrl = formData[index].previewUrl;
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
                Files.newFile.push(compressedFile);
                existFile.push(URL.createObjectURL(compressedFile));
              }, files[i].type, 0.8);
            };
          };
          reader.readAsDataURL(files[i]);
        }
        console.log('newFile' , Files.newFile);
        // existFile.push
      }
      function deleteFileFunction(index) {
        Files.deleteFile.push(existFile[index]);
        existFile.splice(index,1);
        console.log('deleteFile' , Files.deleteFile);
      }
      function goBack() {
        window.history.back();
      }
      return {
        AssetsId,
        details,
        EquipTypeArray,
        EquipCategoryArray,
        EquipCategoryInit,
        AreaArray,
        LayerArray,
        LayerInit,
        fileInputs,
        existFile,
        submit,
        getEquipTypeName,
        getAreaName,
        selectType,
        selectCategory,
        selectArea,
        selectLayer,
        openFileExplorer,
        handleFileChange,
        deleteFileFunction,
        goBack,
        rowHeight: 35,
        pagination: {
          clickable: true,
        },
        modules: [Pagination],
        columnDefs: [{
            suppressMovable: true,
            field: "",
            cellRenderer: "Storage_list_view_button",
            width: '100',
          },
          {
            headerName: "作業日期",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "作業行為",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "單號",
            field: "price",
            unSortIcon: true,
            sortable: true,
            width: '300',
            resizable: true,
            suppressMovable: true
          },
          {
            headerName: "數量",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '100',
            suppressMovable: true
          },
          {
            headerName: "單位",
            field: "model",
            unSortIcon: true,
            sortable: true,
            width: '100',
            suppressMovable: true
          },
          {
            headerName: "申請人員",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          },
          {
            headerName: "承辦人員",
            field: "make",
            unSortIcon: true,
            sortable: true,
            width: '150',
            suppressMovable: true
          }
        ],
        rowData: [{
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Toyota",
            model: "Celica",
            price: 35000
          },
          {
            make: "Ford",
            model: "Mondeo",
            price: 32000
          },
          {
            make: "Porsche",
            model: "Boxster",
            price: 72000
          },
        ],
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  span {
    @include red_star
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      .swiper_section {
        swiper-slide {
          align-self: baseline;
          span {
            cursor: pointer;
            position: absolute;
            top: 25px;
            right: -14px;
            background: #E94B4B;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: 700;
          }
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
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
        margin: auto;
        width: 800px;
        .fixed_info {
          @include fixed_info;
          border-radius: 0 10px 0 0;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .fixed_title {
          @include fixed_title;
        }
        .content {
          @include content_bg;
          .dropdown {
            .dropdown-menu {
              width: 100%;
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
          padding: 0 28%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          button.empty_btn {
            @include empty_btn;
            &:hover {
              background-color: #244f86;
            }
          }
          button.select_btn {
            @include empty_btn;
            width: 150px;
            &:hover {
              background-color: #244f86;
            }
          }

          button.send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          button.search_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
        .dropdown {
          width: calc(100% - 10%);
          height: 35px;
          @include dropdown_btn;
          .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
          }
          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;
            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }
      }
      .log {
        .info_wrap {
          width: 100%;
          #grid_table {
            margin-bottom: 0 !important;
          }
        }
        .content_wrap {
          background-color: #E6EAEC;
          border-radius: 0 10px 10px 10px;
          padding: 20px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          .content {
            border-radius: 10px;
          }
          p {
            @include datagrid_title;
          }
          input {
            display: flex;
            border: none;
            border-radius: 5px;
            background-color: white;
            padding: 5px 10px;
            font-size: 18px;
            width: 200px;
            height: 35px;
          }
        }
      }
      .photo {
        .content {
          border-radius: 0 10px 10px 10px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          background-color: #e5e8e9;
        }
        margin: 5% auto;
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .swiper_section {
        swiper-slide {
          align-self: baseline;
          span {
            cursor: pointer;
            position: absolute;
            top: 25px;
            right: -14px;
            background: #E94B4B;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: 700;
          }
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
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
        margin: auto;
        padding: 0 5%;
        .fixed_info {
          @include fixed_info;
          border-radius: 0 10px 0 0;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .fixed_title {
          @include fixed_title;
        }
        .content {
          @include content_bg;
          .dropdown {
            .dropdown-menu {
              width: 100%;
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
        .content:nth-child(1),
        .content:nth-child(2) {
          border-radius: 0px 10px 10px 10px
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
          button.empty_btn {
            @include empty_btn;
            &:hover {
              background-color: #244f86;
            }
          }
          button.select_btn {
            @include empty_btn;
            width: 150px;
            &:hover {
              background-color: #244f86;
            }
          }

          button.send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          button.search_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
        .dropdown {
          width: calc(100% - 10%);
          height: 35px;
          @include dropdown_btn;
          .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
          }
          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;
            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }
      }
      .info_wrap:nth-child(4) .info_wrap {
        padding: 0;
      }
      .log {
        .info_wrap {
          width: 100%;
          #grid_table {
            margin-bottom: 0 !important;
          }
        }
        .content_wrap {
          background-color: #E6EAEC;
          border-radius: 0 10px 10px 10px;
          padding: 20px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          .content {
            border-radius: 10px;
          }
          p {
            @include datagrid_title;
          }
          input {
            display: flex;
            border: none;
            border-radius: 5px;
            background-color: white;
            padding: 5px 10px;
            font-size: 18px;
            width: 200px;
            height: 35px;
          }
        }
      }
      .photo {
        .content {
          border-radius: 0 10px 10px 10px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          background-color: #e5e8e9;
        }
        margin: 5% auto;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .swiper_section swiper-slide {
        span {
            cursor: pointer;
            position: absolute;
            top: 25px;
            right: -14px;
            background: #E94B4B;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: 700;
          }
        img {
          width: 100%;
          height: auto;
          padding: 40px;
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
      .photo {
        margin: 5% auto;
      }
      .info_wrap {
        padding: 1% 5% 0;
        .fixed_title {
          @include fixed_title;
        }
        .fixed_info {
          @include fixed_info;
          flex-direction: column;
          height: unset;
          padding: 10px;
          border-radius: 0 10px 0 0;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .row {
            gap: 10px 0;
          }
          .dropdown {
            .dropdown-menu {
              width: 100%;
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
              color: white;
              font-weight: 700;
              font-size: 20px;
            }
          }
        }
        .content:nth-child(1),
        .content:nth-child(2) {
          border-radius: 0px 10px 10px 10px
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 20%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          button.empty_btn {
            @include empty_btn;
            padding: 5px;
            &:hover {
              background-color: #244f86;
            }
          }
          button.select_btn {
            @include empty_btn;
            padding: 5px;
            width: 140px;
            &:hover {
              background-color: #244f86;
            }
          }

          button.send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
          button.search_btn {
            @include search_and_send_btn;
            padding: 5px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
      }
      .info_wrap:nth-child(4) .info_wrap {
        padding: 0;
      }
      .log {
        .info_wrap {
          width: 100%;
          #grid_table {
            margin-bottom: 0 !important;
          }
        }
        .content_wrap {
          background-color: #E6EAEC;
          border-radius: 0 10px 10px 10px;
          padding: 20px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          .content {
            border-radius: 10px;
          }
          p {
            @include datagrid_title;
          }
          input {
            display: flex;
            border: none;
            border-radius: 5px;
            background-color: white;
            padding: 5px 10px;
            font-size: 18px;
            width: 100%;
            height: 35px;
          }
        }
      }
      .photo {
        .content {
          padding: 0;
          border-radius: 0 10px 10px 10px;
          box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
          background-color: #e5e8e9;
        }
        margin: 5% auto;
      }
    }
  }
</style>