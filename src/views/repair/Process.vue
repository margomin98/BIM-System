<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        送修作業
      </h1>
    </div>
    <div class="info_wrap col">
      <!-- 維修編號，申請人員，申請日期 -->
      <div class="fixed_info">
        <div>
          <p>
            維修編號 : {{ details.RepairId }}
          </p>
        </div>
        <div>
          <p>
            申請人員 : {{ details.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請日期 : {{ details.ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row g-0">
          <!-- 送修人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                送修人員 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.RepairPerson">
            </div>
          </div>
          <!-- 交付日期 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                交付日期 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.DeliveryDate">
            </div>
          </div>
        </div>
        <div class="row g-0">
          <!-- 審核人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                審核人員 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.VerifyPerson">
            </div>
          </div>
          <!-- 審核結果 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                審核結果 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.VerifyResult">
            </div>
          </div>
        </div>
        <!-- 審核日期 -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group d-flex mb-3">
            <div class="input-group-prepend">
              審核日期 :
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.VerifyDate">
          </div>
        </div>
        <div class="row g-0">
          <!-- 資產編號 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                資產編號 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.AssetsId">
            </div>
          </div>
          <!-- 物品名稱 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                物品名稱 :
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.AssetName">
            </div>
          </div>
        </div>
        <!-- 問題描述 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              問題描述 :
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" readonly>{{ details.Question }}</textarea>
          </div>
        </div>
        <!-- 報修照片 -->
        <div class="col-12 repair_photo_section">
          <div class="input-group mt-3">
            <div class="input-group-prepend">報修照片 :
            </div>
            <div>
            </div>
          </div>
          <swiper-container class="swiper_section" :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
            <swiper-slide v-for="(item , index) in details.existFile" :key="index"> 
            <img class="swiper_bottom_img" :src="item.FileLink"> 
            <button class='zoom_img' @click="handlePreview(item)">
              <img src="@/assets/zoom.png">
            </button>
            </swiper-slide>
          </swiper-container>
          <div class="swiper_pagination">
          </div>
        </div>
      </div>
      <div class="fixed_info mt-5">
        <div>
          <p>
            維修資訊
          </p>
        </div>
      </div>
      <div class="content">
        <!-- 維修廠商 -->
        <div class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span>*</span> 維修廠商 :
            </div>
            <input ref="inputElement" type="text" class="form-control" placeholder="最多輸入20字" v-model="formParams.RepairCompany">
          </div>
        </div>
        <!-- 外部維修單號 -->
        <div class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span>*</span> 外部維修單號 :
            </div>
            <input ref="inputElement" type="text" class="form-control" placeholder="最多輸入50字" v-model="formParams.ExternalRepairId">
          </div>
        </div>
        <div class="row g-0">
          <!-- 廠商聯絡人 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                廠商聯絡人 :
              </div>
              <input ref="inputElement" type="text" class="form-control" placeholder="最多輸入10字" v-model="formParams.ContactPerson">
            </div>
          </div>
          <!-- 聯絡電話 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                聯絡電話 :
              </div>
              <input ref="inputElement" type="text" class="form-control" placeholder="最多輸入20字" v-model="formParams.ContactPhone">
            </div>
          </div>
        </div>
        <!-- 送修日期 -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group d-flex mb-3">
            <div class="input-group-prepend">
              送修日期 :
            </div>
            <input ref="inputElement" type="date" class="form-control" v-model="formParams.RepairDate">
          </div>
        </div>
        <!-- 備註 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              備註 :
            </div>
            <textarea style="height: 200px;" class="form-control" placeholder="最多輸入500字" v-model="formParams.Memo"></textarea>
          </div>
        </div>
        <!-- 文件上傳 -->
        <div class="col-12 repair_photo_section">
          <div class="input-group mt-3">
            <div class="input-group-prepend">文件上傳 :</div>
            <div class="mb-3 file_wrap">
              <button class="choose_btn" @click="openFileInput">選擇檔案</button>
              <input type="file" ref="fileInput" style="display: none;" @change="handleDocumentFile($event)" multiple>
            </div>
          </div>
        </div>
        <div class="col selected_file">
          <div class="input-group">
            <div class="input-group-prepend mb-xl-3 mb-lg-3 mb-md-3">已選擇檔案 :</div>
            <div class='file_upload_box col'>
              <div v-for="(file, index) in formParams.viewDoc" :key="index" class="file_upload_wrap">
                <p class='file_name'>{{ file.FileName}}
                  <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="handlePreview(file)">
                  <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="deleteFile(index , file)"></p>
              </div>
            </div>
          </div>
        </div>
        <!-- 瀏覽 -->
        <!-- doc/docx download hidden Link -->
        <a href="" style="display: none;" id="download-link"></a>
        <!-- Modal Trigger -->
        <button type="button" style="display: none" id="openModal" data-bs-toggle="modal" data-bs-target="#documentModal"></button>
        <!-- Exist Document Modal -->
        <div class="modal fade" id="documentModal" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="photoModalLabel"> {{ previewParams.title }}</h5>
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
        <!-- 已上傳文件 -->
        <div class="col selected_file">
  <div class="input-group">
    <div class="input-group-prepend">已上傳文件 :</div>
  <div class="selected_file_wrap col">
        <div v-for="(file, index) in details.existDocument" :key="index" class="file_upload_wrap">
        <p>{{ file.FileName}}
          <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="handlePreview(file)">
          <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="deleteFile(index , file)"></p>
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
  import {
    ref,
    onMounted,
    reactive
  } from 'vue';
  import {
    useRoute
  } from 'vue-router'
  import axios from 'axios';
  import Navbar from '@/components/Navbar.vue';
  import router from '@/router';
  import {
    register
  } from 'swiper/element/bundle';
  import {
    Pagination
  } from 'swiper/modules';
  import {
    goBack,
    canEnterPage,
  } from '@/assets/js/common_fn.js'
  import {
    Repair_Process_Status
  } from '@/assets/js/enter_status';
import { GetAntiForgeryToken } from '@/assets/js/common_api';
  register();
  export default {
    components: {
      Navbar
    },
    setup() {
      const route = useRoute();
      const RepairId = route.query.search_id;
      const details = ref({});
      const token = ref('');
      const fileInput = ref(null);
      const previewParams = reactive({
        title: '',
        src: '',
      })
      const formParams = reactive({
        RepairId: RepairId,
        RepairCompany: '',
        ExternalRepairId: '',
        ContactPerson: '',
        ContactPhone: '',
        RepairDate: '',
        Memo: '',
        deleteDocument: [],
        newDoc: [],
        viewDoc: [],
      })
      onMounted(() => {
        getDetails();
      });
      // 取得單筆資料
      async function getDetails() {
        axios.get(`http://192.168.0.177:7008/GetDBdata/GetRepairInfo?r_id=${RepairId}`)
          .then((response) => {
            const data = response.data;
            if (data.state === 'success') {
              canEnterPage(data.resultList.Status, Repair_Process_Status)
              details.value = data.resultList;
              console.log('資料:\n', details.value);
              if (details.value.RepairDate) {
                details.value.RepairDate = details.value.RepairDate.replace(/\//g, '-');
              }
              // 若有已上傳的物流文件 則新增key值 exist: true
              if (details.value.existDocument) {
                details.value.existDocument.forEach(item => {
                  item.exist = true;
                });
              }
              // 將值帶入formParams
              for (const key in details.value) {
                if (formParams.hasOwnProperty(key) && details.value[key]) {
                  formParams[key] = details.value[key]
                }
              }
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
      }
      // 送出
      async function submit() {
        // 檢查必填項目、格式        
        if (!formParams.RepairCompany.trim() || !formParams.ExternalRepairId.trim()) {
          alert('請輸入必填項目');
          return
        }
        formParams.RepairCompany = formParams.RepairCompany.trim();
        if (!/^[\s\S]{0,20}$/.test(formParams.RepairCompany)) {
          alert('維修廠商不可輸入超過20字')
          return
        }
        formParams.ExternalRepairId = formParams.ExternalRepairId.trim();
        if (!/^[\s\S]{0,50}$/.test(formParams.ExternalRepairId)) {
          alert('外部維修單號不可輸入超過50字')
          return
        }
        formParams.ContactPerson = formParams.ContactPerson.trim();
        if (!/^[\s\S]{0,10}$/.test(formParams.ContactPerson)) {
          alert('廠商聯絡人不可輸入超過10字')
          return
        }
        formParams.ContactPhone = formParams.ContactPhone.trim();
        if (!/^[\s\S]{0,20}$/.test(formParams.ContactPhone)) {
          alert('連絡電話不可輸入超過20字')
          return
        }
        formParams.Memo = formParams.Memo.trim();
        if (!/^[\s\S]{0,500}$/.test(formParams.Memo)) {
          alert('備註不可輸入超過500字')
          return
        }
        try {
          token.value = await GetAntiForgeryToken();
          // 先編輯表單上半部內容
          await sendUpperForm();
          // 再依照R_ID將 文件 單次檔案上傳
          const filePromises = [];
          for (let i = 0; i < formParams.newDoc.length; i++) {
            filePromises.push(sendFileForm(RepairId, formParams.newDoc[i], i));
          }
          // 等待所有檔案上傳完成
          await Promise.all(filePromises)
            .then(result => {
              const allSuccess = result.every(result => result === 'success')
              if (allSuccess) {
                alert('傳送維修資訊成功\n單號為:' + RepairId);
                router.push({
                  name: 'Repair_Datagrid'
                });
              } else {
                alert('傳送維修資訊失敗')
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
          // 成功时，调用 resolve 并传递 R_ID
          // 失败时，调用 reject 并传递错误信息
          const axios = require('axios');
          const form = new FormData();
          let msg = ''
          for (const key in formParams) {
            if (formParams[key]) {
              msg += `${key} : ${formParams[key]}\n`
              form.append(key, formParams[key]);
            }
          }
          form.delete('newDoc')
          form.delete('viewDoc')
          form.delete('deleteDocument')
          if (formParams.deleteDocument.length > 0) {
            for (const item of formParams.deleteDocument) {
              form.append('deleteDocument', item)
            }
          }
          console.log('上半部資料(含刪除):\n', msg);
          axios.post('http://192.168.0.177:7008/RepairMng/SendingForRepair', form,{
            headers: { 
              'RequestVerificationToken': token.value,
            }
          })
            .then(response => {
              const data = response.data;
              if (data.state === 'success') {
                const R_ID = response.data.resultList.R_ID;
                console.log('編輯上半部表單成功R_ID:', R_ID);
                resolve(R_ID);
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
      function sendFileForm(RepairId, fileData, index) {
        return new Promise((resolve, reject) => {
          const form = new FormData();
          form.append('RepairId', RepairId);
          form.append('num', index);
          form.append('Document', fileData);
          const axios = require('axios');
          axios.post('http://192.168.0.177:7008/RepairMng/UploadDoc', form,{
            headers: { 
              'RequestVerificationToken': token.value,
            }
          })
            .then((response) => {
              const data = response.data;
              if (data.state === 'success') {
                // 文件表单提交成功，继续执行
                console.log(`第${index+1}個檔案上傳成功`);
                resolve(data.state)
              } else {
                // 如果状态不是 "success"，调用 reject 并传递错误信息
                console.error(`第${index+1}個檔案上傳失敗，` + response.data.messages);
                reject(new Error('文件表單提交失败'));
              }
            })
            .catch(error => {
              // 如果提交失败，调用 reject 并传递错误信息
              reject(error);
            });
        });
      }
      // 刪除 分為 
      // 1.已上傳文件 (從details刪除 並加入formParams.deleteDoc) 
      // 2.新選擇檔案 (直接從formParams的newDoc viewDoc刪除)
      function deleteFile(index, file) {
        // 1.
        if (file.exist) {
          formParams.deleteDocument.push(file.FileName);
          details.value.existDocument.splice(index, 1);
        }
        // 2.
        else {
          formParams.newDoc.splice(index, 1);
          formParams.viewDoc.splice(index, 1);
        }
      }
      // 處理維修文件
      function handleDocumentFile(event) {
        console.log('DocumentFiles:', event.target.files);
        const files = event.target.files;
        const imageExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'];
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
        const imgArray = formParams.newDoc;
        const previewUrl = formParams.viewDoc;
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
        console.log('uploaded viewDoc:', formParams.viewDoc);
        console.log('uploaded newDoc:', formParams.newDoc);
      }
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
      function openFileInput() {
        fileInput.value.click();
      }
      return {
        details,
        fileInput,
        previewParams,
        formParams,
        goBack,
        submit,
        deleteFile,
        handleDocumentFile,
        handlePreview,
        openFileInput,
        pagination: {
          clickable: true,
        },
        modules: [Pagination]
      }
    }
  };
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  span {
  @include red_star
}
.input-number {
  @include count_btn;
}
.readonly_box {
  @include readonly_box;
}
.form-check-input {
  align-self: center
}
.view_icon,
.trash_icon {
  cursor: pointer
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
    .close_icon {
      cursor: pointer;
    }
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
        .back_btn {
@include back_to_previous_btn;

&:hover {
  background-color: #5d85bb;
}
}
        .send_btn {
          @include search_and_send_btn;
          &:hover {
            background-color: #5e7aa2;
          }
        }
      }
      .main_section{
    
        .info_wrap{
          .swiper_section {
            swiper-slide img {
              width: 100%;
              height: auto;
              padding: 40px 0;
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
              .input-group {  
                .readonly_box ,.form-control{
                  height: 35px;
                  border-radius: 0;
                }
               
                .input-group-prepend {
                  color: white;
                  font-weight: 700;
                  font-size: 20px;
                }
              }
              .selected_file {
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
@media only screen and (min-width: 1200px) {
  .main_section {
 
    .swiper_section {
      swiper-slide img {
        padding: 40px 0;
      }
    }
 
    .info_wrap {
      margin: 8px auto 5%;
      width: 800px;
     
      .content {
        .input-group {
          flex-wrap: nowrap;
        
         
      
          .input-group-prepend {
            text-align: end;
            width: 155px;
          }
        }
  
        
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
  
    .swiper_section {
      swiper-slide img {
        padding: 40px 0;
      }
    }
   
    .info_wrap {
      margin: 8px auto 5%;
      padding: 0 5%;
     
      .content {
        .input-group {
          width: 100%;
          flex-wrap: nowrap;
          .input-number,.readonly_box{
            width: 100%;
           }
          .form-control {
            width: 54%;
          }
          .input-group-prepend {
            text-align: end;
            width: 145px;
          }
        }
      
       
      }
      .content:nth-child(4) {
        .input-group-prepend {
          width: 160px;
        }
        .input-group .form-control {
          width: 50%;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .main_section {
    .readonly_box, .form-control,.input-number {
      margin-left: unset !important;
    }
    .swiper_section {
      swiper-slide img {
        padding: 40px;
      }
    }
   
    .info_wrap {
      padding: 0 5%;
      .fixed_info {
       height: unset;
        flex-direction: column;
        padding: 10px;
      
      }
      .content {
        .input-group {
          flex-direction: column;
          .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
            margin-left: unset;
            border-radius: 5px;
            margin-top: 5px;
            height: 35px;
          }
        
          .form-control {
            width: 100%;
           }
          .input-group-prepend {
            margin-bottom: 5px;
            width: 100px;
            white-space: nowrap;
          }
        }
        .selected_file {
          .input-group {
            flex-direction: column;
          }
         
        }
     
        .file_wrap {
          margin-left: unset !important;
          .choose_btn {
            margin-top: 5px;
         
          }
        }
      }
    }
  }
}
</style>