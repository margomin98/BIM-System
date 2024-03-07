<template>
  <Navbar @username="setUsername" />
  <div class="main_section">
    <div class="title col">
      <h1>編輯收貨單</h1>
    </div>
    <!-- 上半部收貨資訊 -->
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>收貨資訊</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">收貨單號：</div>
            <input type="text" class="form-control text-center readonly_box" v-model="details.Show_AR_ID" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">訂購單號：</div>
            <input @input="details.PO_ID = '';getPurchaseNum()" placeholder="最多輸入20字" class="form-control" @focus="showOptions = true;" @blur="closeOption()" v-model="details.PurchaseNum" />
            <ul v-if="showOptions" class="options-list">
              <li v-for="(option, index) in DropdownArray.PurchaseNum" :key="index" @click="selectPurchaseNum(option)">{{ option.PurchaseNum }}
              </li>
            </ul>
            <view-order :id="details.PO_ID"></view-order>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>物流單號：</div>
            <input type="text" class="form-control text-center" placeholder="最多輸入20字" v-model="details.ShipmentNum" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>貨運公司：</div>
            <input type="text" class="form-control text-center" placeholder="最多輸入20字" v-model="details.ShipmentCompany" />
          </div>
        </div>
        <div class="col">
          <div class="input-group  mb-3">
            <div class="input-group-prepend"><span>*</span>到貨件數：</div>
            <div class="num_wrap d-flex ">
              <div class="number-input-box">
                <input class="input-number " type="number" min="1" v-model="details.GoodsNum" />
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">收件人員：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.Recipient" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>收件日期：</div>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" class="date-input" v-model="details.ReceivedDate" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group  mb-3">
            <div class="input-group-prepend">通知對象：</div>
            <div class="multi_user_select">
              <!-- :taggable="true"可以直接新增新的一個資料，@tag="tagFn"  -->
              <VueMultiselect v-model="details.InformedPersons" :options="DropdownArray.InformedPersons" :multiple="true" :close-on-select="false" :show-labels="false" :taggable="false" placeholder="輸入名字尋找對象" label="name" track-by="name" />
            </div>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <textarea class="form-control " style="height: 250px;" placeholder="最多輸入500字" v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- 中間物流文件上傳 -->
    <div class="info_wrap col">
      <div class="fixed_info mt-5">
        <div>
          <p>物流文件上傳</p>
        </div>
      </div>
      <div class="content row g-0">
        <div class="col-xl-2 col-lg-2 col-md-2 col-12">
          <button class="upload_file_pt1" @click="openFileInput(0)">選擇檔案</button>
          <input type="file" id="fileInput" ref="fileInput1" style="display: none" @change="handleDocumentFile($event)" multiple />
        </div>
        <div class="d-flex selected_file col-12">
          <!-- 已上傳文件 -->
          <p class="text-start mt-3 mb-2 uploaded_file">已上傳文件</p>
          <div class="icon" v-for="(file, index) in details.existDocument" :key="index">
            <p class="uploded_file_name">{{ file.FileName }}
              <img src="@/assets/view.png" @click="handlePreview(file)">
              <img class="close_icon" src="@/assets/trash.png" @click="deleteFile('document',index , file)">
            </p>
          </div>
          <!-- 新上傳檔案 -->
          <p class="text-start mb-0 uploaded_file">已選擇檔案</p>
          <div class="icon" v-for="(file, index) in fileParams.viewDoc" :key="index">
            <p class="uploded_file_name">{{ file.FileName }}
              <img src="@/assets/view.png" @click="handlePreview(file)">
              <img class="close_icon" src="@/assets/trash.png" @click="deleteFile('document',index , file)">
            </p>
          </div>
          <!-- doc/docx download hidden Link -->
          <a href="" style="display: none;" id="download-link"></a>
          <!-- Modal Trigger -->
          <button type="button" style="display: none" id="openModal" data-bs-toggle="modal" data-bs-target="#photoModal"></button>
          <!-- Photo Modal -->
          <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="photoModalLabel">{{ previewParams.title }}</h5>
                  <div class="close_icon">
                    <p type="button" data-bs-dismiss="modal" aria-label="Close">X</p>
                  </div>
                </div>
                <div class="modal-body">
                  <img :src="previewParams.src" class="w-100">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下半部照片上傳 -->
    <div class="info_wrap mt-5 col">
      <div class="fixed_info">
        <div>
          <p>照片上傳</p>
        </div>
      </div>
      <div class="content">
        <button class="upload_file_pt2" @click="openFileInput(1)">選擇檔案</button>
        <input type="file" id="fileInput2" ref="fileInput2" style="display: none" @change="handlePictureFile($event)" multiple />
        <swiper-container :autoHeight="true" class='swiper_section' :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{ 0: { slidesPerView: 1, }, 768: { slidesPerView: 3, }, 1200: { slidesPerView: 3, }, }">
          <swiper-slide v-for="(file , index) in fileParams.viewPic" :key="index" class="custom-slide">
            <img class="swiper_bottom_img"  :src="file.FileLink" alt="">
            <button class='zoom_img' @click="handlePreview(file)">
              <img src="@/assets/zoom.png">
            </button>
            <span @click="deleteFile('picture' , index , file)">x</span>
          </swiper-slide>
        </swiper-container>
        <div class="swiper_pagination">
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
  import { register } from 'swiper/element/bundle';
  import { Pagination } from 'swiper/modules';
  import Navbar from "@/components/Navbar.vue";
  import viewOrder from "@/components/receive_page/order_view_btn.vue"
  import { onMounted, ref, reactive, } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import VueMultiselect from 'vue-multiselect'
  import { getAccount, checkRole, } from '@/assets/js/common_api'
  import { goBack } from "@/assets/js/common_fn"
  import axios from 'axios';
  register();
  const pagination = { clickable: true, }
  const modules = [Pagination]
  const route = useRoute();
  const router = useRouter();
  const AR_ID = route.query.search_id;
  const details = ref({});
  const DropdownArray = reactive({
    InformedPersons: [],
    PurchaseNum: [],
  })
  const previewParams = reactive({
    title: '',
    src: '',
  })
  const fileParams = reactive({
    deleteDoc: [], //將刪除的 已上傳物流文件記錄於此
    newDoc: [],
    viewDoc: [],
    deletePic: [], //將刪除的 已上傳照片記錄於此
    newPic: [],
    viewPic: [],
  })
  const checkname = ref(''); //檢查編輯者是否為同一人
  // 控制按鈕
  const fileInput1 = ref();
  const fileInput2 = ref();
  const showOptions = ref(false);
  onMounted(() => {
    // getDetails();
    getAccountName();
    getPurchaseNum();
  })
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
  // 取得已有資料
  async function getDetails() {
    checkRole(checkname.value)
    .then(result => {

      axios.get(`http://192.168.0.177:7008/GetDBdata/ReceivingGetData?ar_id=${AR_ID}`)
      .then((response)=>{
        const data = response.data;
        if (data.state === 'success') {
          details.value = data.resultList;
          console.log(('flag result:'+ result));
          if (!result) {
            // false則檢查是否為填寫人(收件人員)
            if (checkname.value !== details.value.Recipient) {
              goBack();
            }
          }
          console.log('單筆資料如下\n', details.value);
        if (details.value.InformedPersons) {
          details.value.InformedPersons = details.value.InformedPersons.map((name) => ({
            name
          }))
        }
        if (details.value.ReceivedDate) {
          details.value.ReceivedDate = details.value.ReceivedDate.replace(/\//g, '-');
        }
        // 若有已上傳的物流文件 則新增key值 exist: true
        if (details.value.existDocument) {
          details.value.existDocument.forEach(item => {
            item.exist = true;
          });
        }
        // 若有已上傳的相片 則新增key值 exist: true
        if (details.value.existFile) {
          details.value.existFile.forEach(item => {
            item.exist = true;
            item.type = 'pic';
          });
          // 處理完後將existFile加入fileParams.viewPic
          fileParams.viewPic = details.value.existFile
        }
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        })
      .catch((error)=> {
        console.error(error);
      })
    })
    .catch(error => {
      console.error(error);
    })
  }
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
  // 送出
  async function submit() {
    // 檢查必填項目、格式        
    if (!details.value.ShipmentNum || !details.value.ShipmentCompany || details.value.GoodsNum < 1 || !details.value.ReceivedDate) {
      alert('請輸入必填項目');
      return
    }
    if (details.value.ShipmentNum && !/^[\s\S]{1,20}$/.test(details.value.ShipmentNum)) {
      alert('物流單號不可輸入超過20字')
      return
    }
    if (details.value.PurchaseNum && !/^[\s\S]{1,20}$/.test(details.value.PurchaseNum)) {
      alert('訂購單號不可輸入超過20字')
      return
    }
    if (details.value.ShipmentCompany && !/^[\s\S]{1,20}$/.test(details.value.ShipmentCompany)) {
      alert('貨運公司不可輸入超過20字')
      return
    }
    try {
      // 先編輯表單上半部內容
      const ShipmentNum = await sendUpperForm();
      // 再依照AR_ID將 中間部分物流文件 & 下半部照片 單次檔案上傳
      const filePromises = [];
      for (let i = 0; i < fileParams.newDoc.length; i++) {
        filePromises.push(sendFileForm(AR_ID, 'Document', fileParams.newDoc[i], i));
      }
      for (let i = 0; i < fileParams.newPic.length; i++) {
        filePromises.push(sendFileForm(AR_ID, 'File', fileParams.newPic[i], i));
      }
      // 等待所有檔案上傳完成
      await Promise.all(filePromises)
        .then(result => {
          const allSuccess = result.every(result => result === 'success')
          if (allSuccess) {
            alert('編輯收貨單成功\n單號為:' + ShipmentNum);
            router.push({
              name: 'Receive_Datagrid'
            });
          } else {
            alert('編輯收貨單失敗')
          }
        })
    } catch (error) {
      console.error(error);
    }
  }
  // 上半部表單
  function sendUpperForm() {
    return new Promise((resolve, reject) => {
      // 在这里发送上半部分表单数据的请求
      // 成功时，调用 resolve 并传递 AR_ID
      // 失败时，调用 reject 并传递错误信息
      const axios = require('axios');
      const form = new FormData();
      const formParams = {
        AR_ID: AR_ID,
        ShipmentNum: details.value.ShipmentNum,
        ShipmentCompany: details.value.ShipmentCompany,
        GoodsNum: details.value.GoodsNum,
        ReceivedDate: details.value.ReceivedDate,
        PO_ID: details.value.PO_ID,
        Memo: details.value.Memo,
      };
      for (const key in formParams) {
        // Memo可能為空
        if(formParams[key]) {
          form.append(key, formParams[key]);
        }
      }
      // 如果有通知對象則處理資料格式，無值則append空陣列
      if (details.value.InformedPersons) {
        const InformedArray = details.value.InformedPersons.map((x) => x.name);
        InformedArray.forEach((item) => {
          form.append('InformedPersons', item);
        })
      } else {
        form.append('InformedPersons', []);
      }
      // 欲刪除文件
      if (fileParams.deleteDoc.length > 0) {
        for (const item of fileParams.deleteDoc) {
          form.append('deleteDocument', item)
        }
      }
      // 欲刪除檔案
      if (fileParams.deletePic.length > 0) {
        for (const item of fileParams.deletePic) {
          form.append('deleteFile', item)
        }
      }
      axios.post('http://192.168.0.177:7008/ReceivingMng/EditReceipt', form)
        .then(response => {
          const data = response.data;
          if (data.state === 'success') {
            const ShipmentNum = response.data.resultList.ShipmentNum;
            console.log('編輯上半部表單成功Show_AR_ID:', ShipmentNum);
            resolve(ShipmentNum);
          } else {
            reject(data.messages);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // 中、下上傳檔案部分
  function sendFileForm(AR_ID, type, fileData, index) {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('AR_ID', AR_ID);
      form.append('num', index);
      form.append(type, fileData);
      const axios = require('axios');
      axios.post('http://192.168.0.177:7008/ReceivingMng/UploadFile', form)
        .then((response) => {
          const data = response.data;
          if (data.state === 'success') {
            // 文件表单提交成功，继续执行
            console.log(`第${index+1}個${type}檔案上傳成功`);
            resolve(data.state)
          } else {
            // 如果状态不是 "success"，调用 reject 并传递错误信息
            console.error(type + '上傳失敗，' + response.data.messages);
            reject(new Error('文件表单提交失败'));
          }
        })
        .catch(error => {
          // 如果提交失败，调用 reject 并传递错误信息
          reject(error);
        });
    });
  }
  // 處理中間物流文件
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
          FileName: files[i].name,
          FileLink: URL.createObjectURL(files[i]),
          type: fileExtension,
        });
      }
      // .doc/.docx
      else if (fileExtension === 'doc' || fileExtension == 'docx') {
        imgArray.push(files[i]);
        previewUrl.push({
          FileName: files[i].name,
          FileLink: URL.createObjectURL(files[i]),
          type: fileExtension,
        });
      }
      // 圖片
      else {
        reader.onload = (e) => {
          const file = files[i]; // 保持原始文件
          imgArray.push(file);
          previewUrl.push({
            FileName: file.name,
            FileLink: URL.createObjectURL(file),
            type: 'pic'
          });
        };
      }
      reader.readAsDataURL(files[i]);
    }
    console.log('uploaded viewDoc:', fileParams.viewDoc);
    console.log('uploaded newDoc:', fileParams.newDoc);
  }
  // 處理下半部照片
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
      reader.onload = (e) => {
          const file = files[i]; // 保持原始文件
          imgArray.push(file);
          previewUrl.push({
            FileName: file.name,
            FileLink: URL.createObjectURL(file),
            type: 'pic'
          });
        };
      reader.readAsDataURL(files[i]);
    }
  }
  // 預覽文件
  function handlePreview(file) {
    // 先提取副檔名
    // 以"."為基準分割字串
    const part = file.FileName.split(".");
    let extension = '';
    // 如果part長度大於1表示xxxx.aaa => ['xxxx','aaa']
    if (part.length > 1) {
      extension = part[part.length - 1];
    }
    // 1. pdf 2. word 3. picture
    switch (extension) {
      case 'pdf':
        window.open(file.FileLink)
        break;
      case 'doc':
      case 'docx':
        const downloadElement = document.getElementById('download-link');
        downloadElement.href = file.FileLink;
        downloadElement.download = file.FileName;
        downloadElement.click();
        break;
      default:
        previewParams.title = file.FileName;
        previewParams.src = file.FileLink;
        const modal = document.querySelector('#openModal');
        modal.click();
        break;
    }
  }
  // 刪除 分為 
  // 1.已上傳文件 (從details刪除 並加入fileParams.deleteDoc) 
  // 2.新選擇檔案 (直接從fileParams的newDoc viewDoc刪除)
  // 3.已上傳照片 (從輪播刪掉 並加入fileParams.deletePic)
  // 4.新選擇照片 (從輪播刪掉 從fileParams.newPic刪除)
  function deleteFile(type, index, file) {
    switch (type) {
      case 'document':
        // 1.
        if (file.exist) {
          fileParams.deleteDoc.push(file.FileName);
          details.value.existDocument.splice(index, 1);
          console.log('已加入的deleteDoc:', fileParams.deleteDoc);
        }
        // 2.
        else {
          fileParams.newDoc.splice(index, 1);
          fileParams.viewDoc.splice(index, 1);
          console.log('剩餘newDoc:', fileParams.newDoc);
        }
        break;
      case 'picture':
        // 3.
        if (file.exist) {
          fileParams.deletePic.push(file.FileName);
          console.log('已加入的deletePic:', fileParams.deletePic);
        }
        // 4.
        else {
          fileParams.newPic.splice(index, 1);
          console.log('剩餘newPic:', fileParams.newPic);
        }
        fileParams.viewPic.splice(index, 1);
        break;
    }
  }
  function setUsername(name) {
    checkname.value = name;
    console.log('username:', checkname.value);
    getDetails();
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
    details.value.PurchaseNum = option.PurchaseNum;
    details.value.PO_ID = option.PO_ID;
  });  
  // 取得訂購單號 下拉
  const getPurchaseNum = (() => {
    const value = details.value.PurchaseNum || '';
    axios.get(`http://192.168.0.177:7008/GetDBdata/SearchPurchaseOrderID?id=${value}`)
    .then((r)=>{
      const data = r.data;
      if(data.state === 'success') {
        console.log(data.resultList);
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
  span {
    @include red_star
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
    top: 0;
    top: 40px;
    border-radius: 5px;
    li {
      padding: 10px 10px 0;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .selected_file {
    flex-direction: column;
    .uploaded_file {
      font-weight: 700;
      color: white;
    }
    p.uploded_file_name::before {
      margin-right: 10px;
      content: '·';
      font-weight: 700;
      color: white;
    }
    .icon {
      margin: 0 10px;
      gap: 5px;
      display: flex;
      width: 100%;
      img {
        cursor: pointer;
        margin: 0 5px
      }
      .close_icon {
        scale: 1.5
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
  .custom-slide {
    display: flex;
    align-self: center;
  }
  .button_wrap {
    display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          button.send_btn {
            @include search_and_send_btn;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
  @media only screen and (min-width: 1200px) {
    .main_section {
      .multi_user_select {
        width: 80%
      }
      input {
        @include dropdown_btn;
        height: 35px;
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
      .readonly_box {
        @include readonly_box;
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
          p.uploded_file_name {
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
            word-break: break-word;
          }
          .input-group {
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
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
            width: 200px;
            input {
              width: 109%
            }
          }
        }
      }
      .info_wrap:nth-child(3) {
        margin-top: 3%;
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .multi_user_select {
        width: 80%
      }
      input {
        @include dropdown_btn;
        height: 35px;
      }
      .readonly_box {
        width: 100px !important;
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
      .readonly_box {
        @include readonly_box;
      }      .info_wrap {
        margin: auto;
        width: 650px;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          p.uploded_file_name {
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
            word-break: break-word;
          }
          .input-group {
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
              width: 80%
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
              width: 120px;
              text-align: end;
            }
            .date-input {
              width: 103%;
            }
          }
        }
      }
      .info_wrap:nth-child(3) {
        margin-top: 5%;
      }
    }
    .modal-dialog {
      padding: 0 10%
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
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
      input {
        @include dropdown_btn;
        height: 35px;
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
      .info_wrap {
        padding:0 5%;
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
          p.uploded_file_name {
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
            word-break: break-word;
          }
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
        }
      }
      .info_wrap:nth-child(3) {
        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset !important;
          border-radius: 5px;
        }
      }
    }
    .modal-dialog {
      padding: 0 10%
    }
  }
</style>