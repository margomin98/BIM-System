<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>新增收貨單</h1>
    </div>
    <!-- 上半部收貨資訊 -->
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>收貨資訊</p>
        </div>
      </div>
      <div class="content">
        <!-- 貨運公司 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>貨運公司：</div>
            <input type="text" class="form-control " placeholder="最多輸入20字" v-model="formParams.ShipmentCompany" />
          </div>
        </div>
        <!-- 訂購單號 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">訂購單號：</div>
            <input @input="getPurchaseNum" class="form-control" placeholder="最多輸入20字" @focus="showOptions = true;" @blur="closeOption()" v-model="formParams.PurchaseNum" />
            <ul v-if="showOptions" class="options-list">
              <li v-for="(option, index) in DropdownArray.PurchaseNum" :key="index" @click="selectPurchaseNum(option)">{{ option.PurchaseNum }}
              </li>
            </ul>
            <view-order :id="formParams.PO_ID"></view-order>
          </div>
        </div>
        <div class="row g-0">
          <!-- 收件人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">收件人員：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="Applicant" />
            </div>
          </div>
          <!-- 收件日期 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>收件日期：</div>
              <div class="date-selector">
                <input type="date" class="date-input" v-model="formParams.ReceivedDate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 中間填報物流細項 -->
    <div class="info_wrap mt-5 col">
      <div class="fixed_info">
        <p><span>*</span>填報物流細項(請至少新增一項)</p>
      </div>
      <div class="content">
        <!-- 物流單號 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>物流單號：</div>
            <input type="text" class="form-control " placeholder="最多輸入20字" v-model="itemParams.ShipmentNum" />
          </div>
        </div>
        <!-- 到貨件數 -->
        <div class="col">
          <div class="input-group  mb-3">
            <div class="input-group-prepend"><span>*</span>到貨件數：</div>
            <div class="num_wrap d-flex ">
              <div class="number-input-box">
                <input class="input-number " type="number" min="1" v-model="itemParams.GoodsNum" />
              </div>
            </div>
          </div>
        </div>
        <!-- 通知對象 -->
        <div class="col">
          <div class="input-group  mb-3">
            <div class="input-group-prepend">通知對象：</div>
            <div class="multi_user_select">
              <!-- :taggable="true"可以直接新增新的一個資料，@tag="tagFn"  -->
              <VueMultiselect v-model="itemParams.InformedPersons" :options="DropdownArray.InformedPersons" :multiple="true" :close-on-select="false" :show-labels="false" :taggable="false" placeholder="輸入名字尋找對象" label="name" track-by="name" />
            </div>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <textarea class="form-control " style="height: 250px;" placeholder="最多輸入500字" v-model="itemParams.Memo"></textarea>
          </div>
        </div>
        <!-- 物流文件上傳 -->
        <div class="col">
          <div class="input-group">
            <div class="input-group-prepend">物流文件上傳：</div>
            <button class="upload_file_pt1" @click="openFileInput(0)">選擇檔案</button>
            <input type="file" id="fileInput" ref="fileInput1" style="display: none" @change="handleDocumentFile($event)" multiple />
          </div>
          <div class="selected_file col ">
            <div class="input-group pt-2">
              <div class="file_upload_box">
                <div v-for="(file, index) in fileParams.viewDoc" :key="index" class="file_upload_wrap">
                  <p class='file_name'>{{ file.name }}
                    <img class="view_icon" src="@/assets/view.png" @click="handleDocPreview(file)">
                    <img class="trash_icon" src="@/assets/trash.png" @click="deleteFile('document',index)"></p>
                </div>
              </div>
            </div>
            <!-- doc/docx download hidden Link -->
            <a href="" style="display: none;" id="download-link"></a>
            <!-- Modal Trigger -->
            <button type="button" style="display: none" id="openModal" data-bs-toggle="modal" data-bs-target="#photoModal"></button>
            <!-- Photo Modal -->
            <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="photoModalLabel">{{ previewParams.title }}</h5>
                    <p data-bs-dismiss="modal" class='close_icon'>X</p>
                  </div>
                  <div class="modal-body">
                    <img class="w-100" :src="previewParams.src">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 照片上傳 -->
        <div class="col">
          <div class="input-group">
            <div class="input-group-prepend">照片上傳：</div>
            <button class="upload_file_pt2" @click="openFileInput(1)">選擇檔案</button>
            <input type="file" id="fileInput" ref="fileInput2" style="display: none" @change="handlePictureFile($event)" multiple />
          </div>
        </div>
        <swiper-container :autoHeight="true" class='swiper_section' :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{ 0: { slidesPerView: 1, }, 768: { slidesPerView: 3, }, 1200: { slidesPerView: 3, }, }">
          <swiper-slide v-for="(file , index) in fileParams.viewPic" :key="index" class="custom-slide">
            <img class="swiper_bottom_img"  :src="file.link" alt="">
            <button class='zoom_img' @click="handleDocPreview(file)">
              <img src="@/assets/zoom.png">
            </button>
            <span @click="deleteFile('picture' , index)">x</span>
          </swiper-slide>
        </swiper-container>
        <div class="swiper_pagination">
        </div>
        <button class="m-auto send_btn" @click="insertTabs">新增</button>
      </div>
    </div>
    <!-- 下半部上傳細項 -->
    <div class="info_wrap mt-5 col">
      <div v-show="Tabs.length > 0" class="tab_section">
        <!-- tab頂端頁籤 -->
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <!-- <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#tabs" type="button" role="tab" aria-controls="tab" aria-selected="true">1</button> -->
            <button v-for="tab in parseInt(Tabs.length)" :key="tab" :class="['nav-link', { active: tab === 1 }]" data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab">{{ tab }}</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div v-for="(tab, index) in Tabs" :key="index" :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel">
            <!-- <div class="tab-pane fade show active" id="tabs" role="tabpanel" aria-labelledby="tab"> -->
            <h4 class="empty_text d-none">暫無有細項</h4>
            <!-- 物流單號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">物流單號：</div>
                <input type="text" class="form-control readonly_box" readonly v-model="tab.ShipmentNum" />
              </div>
            </div>
            <!-- 到貨件數 -->
            <div class="col">
              <div class="input-group  mb-3">
                <div class="input-group-prepend">到貨件數：</div>
                <div class="num_wrap d-flex ">
                  <div class="number-input-box">
                    <input class="input-number readonly_box" type="number" readonly v-model="tab.GoodsNum" />
                  </div>
                </div>
              </div>
            </div>
            <!-- 通知對象 -->
            <div class="col">
              <div class="input-group  mb-3">
                <div class="input-group-prepend">通知對象：</div>
                <div class="selected_user_wrap">
                  <span v-for="person in tab.InformedPersons" class="selected_user">{{ person }}</span>
                </div>
                <!-- <input class="input-number readonly_box" type="number" readonly /> -->
              </div>
            </div>
            <!-- 備註 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註：</div>
                <textarea class="form-control readonly_box" style="height: 250px;" readonly v-model="tab.Memo"></textarea>
              </div>
            </div>
            <!-- 物流文件 -->
            <div class="col">
              <div class="input-group">
                <div class="input-group-prepend">物流文件：</div>
                <div class="selected_file col mb-3">
                  <div class="input-group">
                    <div class="file_upload_box">
                      <div v-for="(file, index) in tab.viewDoc" :key="index" class="file_upload_wrap">
                        <p class="file_name">{{ file.name }}
                          <img class="view_icon" src="@/assets/view.png" @click="handleDocPreview(file)"></p>
                        <!-- <img class="delete_icon" src="@/assets/trash.png" @click="deleteFile('document',index)"> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- doc/docx download hidden Link -->
              <a href="" style="display: none;" id="download-link"></a>
              <!-- Modal Trigger -->
              <button type="button" style="display: none" id="openModal" data-bs-toggle="modal" data-bs-target="#photoModal"></button>
              <!-- Photo Modal -->
              <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered ">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="photoModalLabel">{{ previewParams.title }}</h5>
                      <p data-bs-dismiss="modal" class='close_icon'>X</p>
                    </div>
                    <div class="modal-body">
                      <img :src="previewParams.src">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 照片 -->
            <div class="col">
              <div class="input-group">
                <div class="input-group-prepend">照片：</div>
              </div>
            </div>
            <swiper-container class='swiper_section' :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{ 0: { slidesPerView: 1, }, 768: { slidesPerView: 3, }, 1200: { slidesPerView: 3, }, }">
              <swiper-slide v-for="file in tab.viewPic" class="custom-slide">
                <img class="swiper_bottom_img" :src="file.link" alt="">
                <button class='zoom_img' @click="handleDocPreview(file)">
                  <img src="@/assets/zoom.png">
                </button>
              </swiper-slide>
            </swiper-container>
            <div class="swiper_pagination">
            </div>
            <div class="fixed_bottom_info">
              <div>
                <p @click="deleteTabs(index)">刪除此筆</p>
              </div>
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


<script setup>
  import VueMultiselect from 'vue-multiselect'
  import {
    register
  } from 'swiper/element/bundle';
  import {
    Pagination
  } from 'swiper/modules';
  import Navbar from "@/components/Navbar.vue";
  import viewOrder from "@/components/receive_page/order_view_btn.vue"
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import {
    getApplication,
    getAccount
  } from '@/assets/js/common_api'
  import {
    goBack,
  } from "@/assets/js/common_fn"
  import axios from 'axios';
  register();
  const pagination = { clickable: true, }
  const modules = [Pagination]
  const router = useRouter();
  const route = useRoute();
  const Applicant = ref('')
  const DropdownArray = reactive({
    InformedPersons: [],
    PurchaseNum: [],
  })
  // 上半部表單參數
  const formParams = reactive({
    ShipmentCompany: '',
    ReceivedDate: '',
    PurchaseNum: route.query.PurchaseNum || '',
    PO_ID: '',
  })
  const showOptions = ref(false);
  // 中間 填報細項&文件&檔案
  const itemParams = reactive({
    ShipmentNum: '',
    GoodsNum: 1,
    InformedPersons: [],
    Memo: '',
  })
  const fileParams = reactive({
    newDoc: [],
    viewDoc: [],
    newPic: [],
    viewPic: [],
  })
  const previewParams = reactive({
    title: '',
    src: '',
  })
  // 下半部頁籤
  const Tabs = ref([]);
  // 控制按鈕
  const fileInput1 = ref();
  const fileInput2 = ref();
  onMounted(() => {
    getApplicationInfo();
    getAccountName();
    getPurchaseNum();
    formParams.PO_ID = route.query.search_id || '';
  });
  // 控制 "選擇檔案"按鈕
  const openFileInput = (index) => {
    switch (index) {
      case 0:
        fileInput1.value.click();
        break;
      case 1:
        fileInput2.value.click();
        break;
    }
  }
  // 處理物流文件
  function handleDocumentFile(event) {
    console.log('DocumentFiles:', event.target.files);
    const files = event.target.files;
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];
    const maxFileSize = 28 * 1024 * 1024; // 28MB
    // 檢查副檔名 &檔案大小
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
      if (!imageExtensions.includes(fileExtension.toLowerCase())) {
        alert(fileExtension + '不在允許的格式範圍內，請重新選取');
        return;
      }
      if (files[i].size > maxFileSize) {
        alert('檔案' + fileName + '大於28MB，請重新選取');
        return;
      }
    }
    // 處理檔案
    const imgArray = fileParams.newDoc;
    const previewUrl = fileParams.viewDoc;
    for (let i = 0; i < files.length; i++) {
      // 依據檔案格式 分為 1.圖片(壓縮、可預覽) 2.pdf(可預覽) 3. doc/docx(可下載)
      const fileName = files[i].name;
      const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
      const reader = new FileReader();
      // .pdf
      if (fileExtension === 'pdf') {
        imgArray.push(files[i]);
        previewUrl.push({
          name: files[i].name,
          link: URL.createObjectURL(files[i]),
          type: fileExtension,
        });
      }
      // .doc/.docx
      else if (fileExtension === 'doc' || fileExtension == 'docx') {
        imgArray.push(files[i]);
        previewUrl.push({
          name: files[i].name,
          link: URL.createObjectURL(files[i]),
          type: fileExtension,
        });
      }
      // 圖片
      else {
        reader.onload = (e) => {
          const file = files[i]; // 保持原始文件
          imgArray.push(file);
          previewUrl.push({
            name: file.name,
            link: URL.createObjectURL(file),
            type: 'pic'
          });
        };
      }
      reader.readAsDataURL(files[i]);
    }
    console.log('uploaded viewDoc:', fileParams.viewDoc);
    console.log('uploaded newDoc:', fileParams.newDoc);
  }
  // 處理照片
  function handlePictureFile(event) {
    console.log('PictureFiles:', event.target.files);
    const files = event.target.files;
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const maxFileSize = 28 * 1024 * 1024; // 28MB
    //檢查副檔名
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
      if (!imageExtensions.includes(fileExtension.toLowerCase())) {
        alert(fileExtension + '不在允許的格式範圍內，請重新選取');
        return;
      }
      if (files[i].size > maxFileSize) {
        alert('檔案' + fileName + '大於28MB，請重新選取');
        return;
      }
    }
    const imgArray = fileParams.newPic;
    const previewUrl = fileParams.viewPic;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file = files[i]; // 保持原始文件
      reader.onload = (e) => {
        imgArray.push(file);
        previewUrl.push({
          name: file.name,
          link: URL.createObjectURL(file),
          type: 'pic'
        });
      };
      reader.readAsDataURL(file);
    }
  }
  // 處理物流文件預覽 1.pdf ->開分頁瀏覽 2.pic ->Open Modal 3.doc/docx ->下載
  function handleDocPreview(file) {
    switch (file.type) {
      case 'pdf':
        window.open(file.link)
        break;
      case 'pic':
        previewParams.title = file.name;
        previewParams.src = file.link;
        const modal = document.querySelector('#openModal');
        modal.click();
        break;
      default: //doc & docx
        const downloadElement = document.getElementById('download-link');
        downloadElement.href = file.link;
        downloadElement.download = file.name;
        downloadElement.click();
        break;
    }
  }
  // 處理物流文件刪除
  function deleteFile(type, index) {
    switch (type) {
      case 'document':
        fileParams.newDoc.splice(index, 1);
        fileParams.viewDoc.splice(index, 1);
        break;
      case 'picture':
        fileParams.newPic.splice(index, 1);
        fileParams.viewPic.splice(index, 1);
        break;
    }
  }
  // 新增頁籤
  function insertTabs() {
    if (!checkValid('item')) {
      return;
    }
    const InformedArray = itemParams.InformedPersons.map((x) => x.name);
    // 將細項、文件、照片push至頁籤
    Tabs.value.push({
      ShipmentNum: itemParams.ShipmentNum,
      GoodsNum: itemParams.GoodsNum,
      InformedPersons: InformedArray,
      Memo: itemParams.Memo,
      newDoc: fileParams.newDoc,
      viewDoc: fileParams.viewDoc,
      newPic: fileParams.newPic,
      viewPic: fileParams.viewPic,
    })
    // 清空細項、文件、照片
    itemParams.ShipmentNum = '';
    itemParams.GoodsNum = 1;
    itemParams.InformedPersons = [];
    itemParams.Memo = '';
    for (const key in fileParams) {
      fileParams[key] = []
    }
  }
  // 刪除頁籤
  function deleteTabs(index) {
    Tabs.value.splice(index, 1);
    // 若刪除的為最後一筆 則將頁籤切換到現有的最後一筆
    if (index == Tabs.value.length && index != 0) {
      const tabs = document.querySelectorAll('button.nav-link');
      tabs[index - 1].classList.add('active');
      // 显示对应的标签页内容
      const tabContents = document.querySelectorAll('.tab-pane');
      tabContents[index - 1].classList.add('show', 'active');
    }
  }
  // 檢查細項必填function
  function checkValid(type) {
    switch (type) {
      case 'submit':
        if (!formParams.ShipmentCompany || !formParams.ReceivedDate) {
          alert('請輸入必填項目');
          return false;
        }
        if (!/^[\s\S]{0,20}$/.test(formParams.ShipmentCompany)) {
          alert('貨運公司不可輸入超過20字');
          return false;
        }
        if (!/^[\s\S]{0,20}$/.test(formParams.PurchaseNum)) {
          alert('訂購單號不可輸入超過20字');
          return false;
        }
        if (Tabs.value.length === 0) {
          alert('請至少新增一項');
          return false;
        }
        break;
      case 'item':
        if (!itemParams.ShipmentNum || !itemParams.GoodsNum) {
          alert('請輸入必填細項');
          return false;
        }
        if (!/^[\s\S]{0,500}$/.test(itemParams.Memo)) {
          alert('備註不可輸入超過500字');
          return false;
        }
        if (!/^[\s\S]{0,20}$/.test(itemParams.ShipmentNum)) {
          alert('物流單號不可輸入超過20字');
          return false;
        }
        break;
    }
    return true;
  }
  // 通知對象dropdown
  async function getAccountName() {
    getAccount('')
      .then((data) => {
        data.forEach((Name) => {
          DropdownArray.InformedPersons.push({
            name: Name,
          })
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }
  // 收件人員資訊
  async function getApplicationInfo() {
    getApplication()
      .then((data) => {
        Applicant.value = data;
      })
      .catch((error) => {
        console.error(error);
      })
  }
  // 送出
  async function submit() {
    // 檢查必填項目、格式        
    if (!checkValid('submit')) {
      return;
    }
    console.log('下半部頁籤', Tabs.value);
    try {
      // 先建立表單並回傳resultList
      const resultList = await sendTextForm();
      console.log('resultList:', resultList);
      // 再依照resultList.AR_ID將 物流文件 & 照片 單次上傳
      const filePromises = [];
      for (let i = 0; i < Tabs.value.length; i++) {
        const Doc = Tabs.value[i].newDoc
        const Pic = Tabs.value[i].newPic
        const AR_ID = resultList.Tabs[i]
        for (let j = 0; j < Doc.length; j++) {
          filePromises.push(sendFileForm(AR_ID, 'Document', Doc[j], j));
        }
        for (let j = 0; j < Pic.length; j++) {
          filePromises.push(sendFileForm(AR_ID, 'File', Pic[j], j));
        }
      }
      // 等待所有檔案上傳完成
      await Promise.all(filePromises)
        .then(result => {
          const allSuccess = result.every(result => result === 'success')
          if (allSuccess) {
            alert('新增收貨單成功\n單號為:' + resultList.Show_AR_ID);
            router.push({
              name: 'Receive_Datagrid'
            });
          } else {
            alert('新增收貨單失敗')
          }
        })
    } catch (error) {
      console.error(error);
    }
  }
  // 共同、頁籤文字部分
  function sendTextForm() {
    return new Promise((resolve, reject) => {
      const itemList = Tabs.value.map((item) => {
        return {
          ShipmentNum: item.ShipmentNum,
          GoodsNum: item.GoodsNum,
          InformedPersons: item.InformedPersons,
          Memo: item.Memo,
        }
      })
      // 先傳送除了檔案以外的內容
      const requestJson = {
        CommonInfo: {
          ShipmentCompany: formParams.ShipmentCompany,
          ReceivedDate: formParams.ReceivedDate,
          PO_ID: formParams.PO_ID,
        },
        Tabs: itemList,
      }
      console.log('共同、頁籤文字部分', requestJson);
      axios.post('http://192.168.0.177:7008/ReceivingMng/CreateReceipt', requestJson)
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
  // 頁籤檔案部分
  function sendFileForm(AR_ID, type, fileData, index) {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('AR_ID', AR_ID);
      form.append('num', index);
      form.append(type, fileData);
      axios.post('http://192.168.0.177:7008/ReceivingMng/UploadFile', form)
        .then((response) => {
          const data = response.data;
          if (data.state === 'success') {
            // 文件表单提交成功，继续执行
            console.log(`第${index+1}個${type}檔案上傳成功`);
            resolve(data.state)
          } else {
            // 如果状态不是 "success"，调用 reject 并传递错误信息
            reject(new Error(`第${index+1}個${type}檔案上傳失敗` + response.data.messages));
          }
        })
        .catch(error => {
          // 如果提交失败，调用 reject 并传递错误信息
          reject(error);
        });
    });
  }
  // -------訂購單號 function
  // close option(模糊搜尋使用, EX: 物流單號、訂購單號)
  const closeOption = () => {
    setTimeout(() => {
      showOptions.value = false;
    }, 100);
  }
  // 選擇
  const selectPurchaseNum = ((option)=>{
    formParams.PurchaseNum = option.PurchaseNum;
    formParams.PO_ID = option.PO_ID;
  });
  // 取得訂購單號 下拉
  const getPurchaseNum = (() => {
    formParams.PO_ID = '';
    axios.get(`http://192.168.0.177:7008/GetDBdata/SearchPurchaseOrderID?id=${formParams.PurchaseNum}`)
    .then((r)=>{
      const data = r.data;
      if(data.state === 'success') {
        console.log('pu',data.resultList);
        DropdownArray.PurchaseNum = data.resultList;
      }
    })
    .catch((e)=>{
      console.error(e);
    })
  })

</script>
<style src="@/assets/css/vue-multiselect.css">

</style>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
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
    li {
      padding: 10px 10px 0;
      font-size: 18px;
      cursor: pointer;
    }
  }
  span {
    @include red_star
  }
  .selected_user_wrap {
    gap: 0 5px;
    display: flex;
    .selected_user {
      background: #8B8989;
      color: white !important;
      border-radius: 7px;
      padding: 5px;
    }
  }
  .empty_text {
    text-align: center;
    color: white;
    margin-bottom: 0;
    font-weight: 700;
  }
 
  .view_icon,
  .trash_icon {
    cursor: pointer;
    margin: 0 3px
  }
  .fixed_bottom_info {
    p {
      margin-bottom: 0;
    }
    display: flex;
    cursor: pointer;
    justify-content: space-around;
    background: #E94B4B;
    color: white;
    font-size: 20px;
    font-weight: 700;
    align-items: center;
    border-radius: 0 0 10px 10px;
    height: 50px;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: -2%;
  }
  .selected_file {
    p {
      margin-bottom: 5px;
      font-weight: 700;
      color: white;
    }
    .file_upload_box {
      .file_upload_wrap {
        margin-bottom: 0;
        display: flex;
        word-break: break-word;
        img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
  .upload_file_pt1,
  .upload_file_pt2 {
    width: 100px;
    text-align: center;
    font-weight: 700;
    border: none;
    display: flex;
    padding: 10px;
    background: #314F7A;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: white;
    &:hover {
      background: #586d8b
    }
  }
  .modal {
    .modal-body {
      padding: 20px;
      margin: auto;
    }
    .modal-content {
      margin: auto;
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
  .file_name::before {
    margin-right: 10px;
    content: '·';
    font-weight: 700;
    color: white;
  }
  button.send_btn {
    @include search_and_send_btn;
    &:hover {
      background-color: #5e7aa2;
    }
  }
  .custom-slide {
    display: flex;
    align-self: center;
  }
     .readonly_box {
        @include readonly_box;
      }

      //beautify code
      
      //beautify code
  @media only screen and (min-width: 1200px) {
    .main_section {
      .multi_user_select {
        width: 80%
      }
      .swiper_section {
        swiper-slide {
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
   
      h1 {
        margin-top: 80px;
        margin-bottom: 40px;
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
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .selected_file {
            margin-left: calc(100px + 65px);
            margin-bottom: 3%;
          }
          .input-group {
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
              height: 35px
            }
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 152px;
              text-align: end;
            }
          }
          .date-selector {
            width: 220px;
            input {
              width: 100%;
              border: none;
              height: 35px;
              border-radius: 5px;
              padding: 5px;
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
        }
      }
      .tab_section {
        .nav {
          overflow-x: auto;
          overflow-y: hidden;
          flex-wrap: nowrap;
          border: none;
          .active {
            @include tab_section_num;
            background: #3E4E5F;
          }
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
        }
        .tab-content {
          background: #3E4E5F;
          background: #3E4E5F;
          position: relative;
          padding: 50px 30px;
          border-radius: 0 10px 0 0;
          position: relative;
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
            .file_upload_wrap {
              margin-bottom: 0;
              display: flex;
              img {
                width: 25px;
                height: 25px;
              }
              .file_name::before {
                margin-right: 10px;
                content: '·';
                font-weight: 700;
                color: white;
              }
              p {
                margin-bottom: 0;
                font-weight: 700;
                color: white;
              }
            }
            .input-number {
              @include count_btn;
              height: 35px;
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
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {

      .multi_user_select {
        width: 77%
      }
      .swiper_section {
        swiper-slide {
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
   
      h1 {
        margin-top: 80px;
        margin-bottom: 40px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        padding: 0 5%;
        .selected_file {
          margin-left: 150px;
          margin-bottom: 3%;
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
          .input-group {
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
              height: 35px
            }
            .form-control {
              height: 35px;
              width: 55%;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 145px;
              text-align: end;
            }
            .date-selector {
              width: 80%;
              input {
                width: 100%;
                border: none;
                height: 35px;
                border-radius: 5px;
                padding: 5px;
              }
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
        }
      }
    }
    .modal {
      padding: 0 5%;
      .modal-content {
        border: 0;
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-radius: 0 !important;
        border: 1px solid black;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 20px;
          margin-bottom: 0;
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          align-self: start;
        }
      }
    }
    .tab_section {
      .nav {
        overflow-x: auto;
        overflow-y: hidden;
        flex-wrap: nowrap;
        border: none; .active {
          @include tab_section_num;
          background: #3E4E5F;
        }
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
      }
      .tab-content {
        background: #3E4E5F;
        background: #3E4E5F;
        position: relative;
        padding: 50px 30px;
        border-radius: 0 10px 0 0;
        position: relative;
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
          .selected_file {
            margin-left: 20px;
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
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {

      .selected_file {
        margin-top: 10px;
        color: white;
        align-items: flex-start;
        font-weight: 700;
        flex-direction: column
      }
      .number-input-box {
        width: 100%
      }
      .swiper_section swiper-slide {
        span {
          cursor: pointer;
          position: absolute;
          top: 25px;
          right: 27px;
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
          padding: 40px
        }
      }
      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: 0 !important;
        border-radius: 5px;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 1% 5% 0;
        .fixed_info {
          @include fixed_info;
          flex-direction: column;
          height: unset;
          padding: 10px;
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
          .input-group {
            flex-direction: column;
            .input-number {
              @include count_btn;
              width: 100%;
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
          .date-selector {
            input {
              width: 100%;
              border: none;
              height: 35px;
              border-radius: 5px;
              padding: 5px;
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 15%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            padding: 5px;
            &:hover {
              background-color: #5d85bb;
            }
          }
        }
      }
      .info_wrap:nth-child(3) {
        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset !important;
          border-radius: 5px;
        }
      }
    }
    .modal {
      padding: 0 5%;
      .modal-content {
        border: 0;
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-radius: 0 !important;
        border: 1px solid black;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 18px;
          margin-bottom: 0;
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          position: absolute;
          right: 3%;
        }
      }
    }
    .tab_section {
      .nav {
        overflow-x: auto;
        overflow-y: hidden;
        flex-wrap: nowrap;
        border: none; .active {
          @include tab_section_num;
          background: #3E4E5F;
        }
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
      }
      .tab-content {
        background: #3E4E5F;
        position: relative;
        background: #3E4E5F;
        position: relative;
        padding: 50px 30px;
        border-radius: 0 10px 0 0;
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
          flex-direction: column;
          span {
            @include red_star
          }
          .selected_file {
            .file_upload_box {
              padding: 0 0 5px;
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
        }
      }
    }
  }
</style>
