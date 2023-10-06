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
          <div class="input-group  mb-3">
            <div class="input-group-prepend">物流文件上傳：</div>
            <button class="upload_file_pt1" @click="openFileInput(0)">選擇檔案</button>
            <input type="file" id="fileInput" ref="fileInput1" style="display: none" @change="handleDocumentFile($event)" multiple />
          </div>
        </div>
        <div class="selected_file col">
          <div class="input-group">
            <div class="file_upload_box">
              <div v-for="(file, index) in fileParams.viewDoc" :key="index" class="file_upload_wrap">
                <p class='file_name'>{{ file.name }}</p>
                <img class="view_icon" src="@/assets/view.png" @click="handleDocPreview(file)">
                <img class="delete_icon" src="@/assets/trash.png" @click="deleteFile('document',index)">
              </div>
            </div>
          </div>
          <!-- doc/docx download hidden Link -->
          <a href="" style="display: none;" id="download-link"></a>
          <!-- Modal Trigger -->
          <button type="button" style="display: none" id="openModal" data-bs-toggle="modal" data-bs-target="#photoModal"></button>
          <!-- Photo Modal -->
          <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 800px !important">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="photoModalLabel">{{ previewParams.title }}</h5>
                  <p data-bs-dismiss="modal" class='close_icon'>X</p>
                </div>
                <div class="modal-body">
                  <img class="w-100" :src="previewParams.src" >
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
        <swiper-container class='swiper_section' :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{ 0: { slidesPerView: 1, }, 768: { slidesPerView: 3, }, 1200: { slidesPerView: 3, }, }">
          <swiper-slide v-for="(file , index) in fileParams.viewPic" :key="index" class="custom-slide">
            <img :src="file.link" alt="">
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
      <div v-show="Tabs.length > 0" class="tab_section mt-5">
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
              </div>
            </div>
            <div class="selected_file col mb-3">
              <div class="input-group">
                <div class="file_upload_box">
                  <div v-for="(file, index) in tab.viewDoc" :key="index" class="file_upload_wrap">
                    <p class="file_name">{{ file.name }}</p>
                    <img class="view_icon" src="@/assets/view.png" @click="handleDocPreview(file)">
                    <img class="delete_icon" src="@/assets/trash.png" @click="deleteFile('document',index)">
                  </div>
                </div>
              </div>
              <!-- doc/docx download hidden Link -->
              <a href="" style="display: none;" id="download-link"></a>
              <!-- Modal Trigger -->
              <button type="button" style="display: none" id="openModal" data-bs-toggle="modal" data-bs-target="#photoModal"></button>
              <!-- Photo Modal -->
              <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 800px !important">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="photoModalLabel">{{ previewParams.title }}</h5>
                      <p data-bs-dismiss="modal" class='close_icon'>X</p>
                    </div>
                    <div class="modal-body">
                      <img :src="previewParams.src" >
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
            <swiper-container class='swiper_section' :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{ 0: { slidesPerView: 1, }, 768: { slidesPerView: 3, }, 1200: { slidesPerView: 3, }, }">
              <swiper-slide v-for="file in tab.viewPic" class="custom-slide">
                <img :src="file.link" alt="">
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


<script>
  import VueMultiselect from 'vue-multiselect'
  import {
    register
  } from 'swiper/element/bundle';
  import {
    Pagination
  } from 'swiper/modules';
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    useRouter
  } from "vue-router";
  import {
    getApplication,
    getAccount
  } from '@/assets/js/common_api'
  import {
    goBack
  } from "@/assets/js/common_fn"
  import axios from 'axios';
  register();
  export default {
    components: {
      Navbar,
      VueMultiselect
    },
    data() {
      return {
        taggingOptions: [{
            name: 'Tag 1',
            code: 'T1'
          },
          {
            name: 'Tag 2',
            code: 'T2'
          },
          {
            name: 'Tag 3',
            code: 'T3'
          },
          {
            name: 'Tag 4',
            code: 'T4'
          },
          {
            name: 'Tag 5',
            code: 'T5'
          },
          {
            name: 'Tag 6',
            code: 'T6'
          },
          {
            name: 'Tag 7',
            code: 'T7'
          },
          {
            name: 'Tag 8',
            code: 'T8'
          },
          {
            name: 'Tag 9',
            code: 'T9'
          }
        ],
        taggingSelected: []
      }
    },
    methods: {
      addTag(newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
        };
        this.taggingOptions.push(tag);
        this.taggingSelected.push(tag);
      }
    },
    setup() {
      const router = useRouter();
      const Applicant = ref('')
      const DropdownArray = reactive({
        InformedPersons: [],
      })
      // 上半部表單參數
      const formParams = reactive({
        ShipmentCompany: '',
        ReceivedDate: '',
      })
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
                    // type: files[i].type,
                    lastModified: files[i].lastModified,
                  });
                  // 记录压缩前后的大小
                  const originalSize = Math.round(files[i].size / 1024); // 原始大小（KB）
                  const compressedSize = Math.round(compressedFile.size / 1024); // 壓縮後大小（KB）
                  // console.log(`原始大小: ${originalSize} KB，壓縮後大小: ${compressedSize} KB`);
                  imgArray.push(compressedFile);
                  previewUrl.push({
                    name: files[i].name,
                    link: URL.createObjectURL(compressedFile),
                    type: 'pic'
                  });
                }, files[i].type, 0.8);
              };
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
        // 處理檔案
        const imgArray = fileParams.newPic;
        const previewUrl = fileParams.viewPic;
        for (let i = 0; i < files.length; i++) {
          // 依據檔案格式 分為 1.圖片(壓縮、可預覽) 2.pdf(可預覽) 3. doc/docx(可下載)
          const fileName = files[i].name;
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
                const compressedFile = new File([blob], fileName, {
                  // type: files[i].type,
                  lastModified: files[i].lastModified,
                });
                // 记录压缩前后的大小
                const originalSize = Math.round(files[i].size / 1024); // 原始大小（KB）
                const compressedSize = Math.round(compressedFile.size / 1024); // 壓縮後大小（KB）
                console.log(`原始大小: ${originalSize} KB，壓縮後大小: ${compressedSize} KB`);
                imgArray.push(compressedFile);
                previewUrl.push({
                  name: fileName,
                  link: URL.createObjectURL(compressedFile),
                  type: 'pic'
                });
              }, files[i].type, 0.8);
            };
          };
          reader.readAsDataURL(files[i]);
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
      return {
        Applicant,
        DropdownArray,
        formParams,
        itemParams,
        fileParams,
        previewParams,
        Tabs,
        fileInput1,
        fileInput2,
        pagination: {
          clickable: true,
        },
        modules: [Pagination],
        openFileInput,
        handleDocumentFile,
        handlePictureFile,
        handleDocPreview,
        deleteFile,
        insertTabs,
        deleteTabs,
        submit,
        goBack,
      }
    },
  }
</script>
<style src="@/assets/css/vue-multiselect.css">

</style>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
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
  .modal-dialog {
    width: 80% !important;
    max-width: unset
  }
  .view_icon,
  .delete_icon {
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
      padding: 0 20px 5px;
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
  @media only screen and (min-width: 1200px) {
    .main_section {
      .multi_user_select {
        width: 80%
      }
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
        .fixed_title {
          @include fixed_title;
        }
        .add_btn {
          display: inline-flex;
          padding: 10px 25px;
          justify-content: center;
          align-items: center;
          border-radius: 9px;
          background: #314F7A;
          height: 50px;
          width: 174px;
          color: #FFF;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          border: none;
          margin-bottom: 20px;
          &:hover {
            background-color: #456ca7
          }
        }
        .content {
          @include content_bg;
          .dropdown {
            width: 55%;
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
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
        .dropdown {
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
              padding-top: 5px;
              text-align: left;
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .row:nth-child(3) {
        .input-group {
          justify-content: flex-start;
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
              background: #3E4E5F;
        position: relative;
        padding: 50px 30px;border-radius: 0 10px 0 0;
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
      .readonly_box {
        width: 100px !important;
      }
      .multi_user_select {
        width: 77%
      }
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
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .fixed_title {
          @include fixed_title;
        }
        .add_btn {
          display: inline-flex;
          padding: 10px 25px;
          justify-content: center;
          align-items: center;
          border-radius: 9px;
          background: #314F7A;
          height: 50px;
          width: 174px;
          color: #FFF;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          border: none;
          margin-bottom: 20px;
          &:hover {
            background-color: #456ca7
          }
        }
        .content {
          @include content_bg;
          .organizer_wrap {
            --bs-gutter-x: unset;
            .flex:nth-child(1) {
              width: 210px
            }
          }
          .dropdown {
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
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
              padding-top: 5px;
              text-align: left;
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
    }
    .modal {
      .dropdown-toggle {
        width: 100%
      }
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
      .list {
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }
      .second_content {
        border-left: 1px solid black;
        border-right: 1px solid black;
        background: #D9D9D9;
        padding: 20px;
        p.content {
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          background: white;
          height: 35px;
          border-radius: 5px;
        }
        .submit_btn {
          margin-top: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 80px;
          font-size: 20px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1 {
          display: flex;
          justify-content: space-evenly;
          padding: 20px;
          .input-number {
            @include count_btn;
          }
          .number-input-box {
            color: black;
            .input-number {
              width: 100%;
            }
          }
          .form-label {
            white-space: nowrap;
            font-weight: 800;
            font-size: 18px;
          } // .dropdown {
          //   button {
          //     background: white;
          //     width: 100%;
          //     border: none;
          //     display: flex;
          //     justify-content: space-between;
          //     align-items: center;
          //   }
          //   .dropdown-menu {
          //     width: 225px;
          //     .dropdown-item {
          //       text-align: left;
          //     }
          //   }
          // }
          div {
            padding: 0 5px;
            p {
              color: black;
              text-align: center;
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
            }
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
            background: #3E4E5F;
        position: relative;
        padding: 50px 30px;border-radius: 0 10px 0 0;
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
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
        width: 100%;
      }
      .selected_file {
        margin-top: 10px;
        color: white;
        align-items: flex-start;
        font-weight: 700;
        flex-direction: column;
        .icon {
          margin: 0 10px;
          gap: 5px;
          display: flex;
          align-items: flex-start;
          img {
            margin: 0 5px;
          }
        }
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
          padding: 40px;
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
        .fixed_title {
          @include fixed_title;
        }
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
        .add_btn {
          display: inline-flex;
          padding: 10px;
          justify-content: center;
          align-items: center;
          border-radius: 9px;
          background: #314F7A;
          height: 50px;
          width: 150px;
          color: #FFF;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          border: none;
          margin-bottom: 15px;
          &:hover {
            background-color: #456ca7
          }
        }
        .content {
          @include content_bg;
          .row {
            gap: 10px 0;
          }
          .dropdown {
            margin-left: unset !important;
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
          padding: 0 20%;
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
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .info_wrap:nth-child(3) {
        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset !important;
          border-radius: 5px;
        }
        .count {
          .number-input-box {
            width: 100%;
            margin-left: unset !important;
          }
          .btn_section {
            margin-left: 10px;
            .delete_btn {
              display: flex;
              align-items: center;
              @include delete_button;
              height: 100%;
              padding: 5px;
              width: 80px;
              font-size: 18px;
              &:hover {
                background: #FF7272
              }
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
      .list {
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }
      .second_content {
        border-left: 1px solid black;
        border-right: 1px solid black;
        background: #D9D9D9;
        padding: 20px;
        .submit_btn {
          margin-top: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 80px;
          font-size: 20px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1 {
          p.content {
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            background: white;
            height: 35px;
            border-radius: 5px;
          }
          .input-number {
            @include count_btn;
          }
          .number-input-box {
            color: black;
            .input-number {
              width: 100%;
            }
          }
          .form-label {
            white-space: nowrap;
            font-weight: 800;
            font-size: 18px;
          }
          .dropdown {
            button {
              background: white;
              width: 100%;
              border: none;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .dropdown-menu {
              width: 100%;
              .dropdown-item {
                text-align: left;
              }
            }
          }
          div {
            margin: 10px 0;
            p {
              padding: 5px;
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
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
        position: relative;
            background: #3E4E5F;
        position: relative;
        padding: 50px 30px;border-radius: 0 10px 0 0;
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
</style>
