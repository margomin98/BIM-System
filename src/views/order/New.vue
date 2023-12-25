<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        新增訂購單
      </h1>
    </div>
    <Order_component/>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="send_btn" :disabled="!canSubmit" :class="{send_btn_disabled: !canSubmit}" @click="submit">新增</button>
    </div>
  </div>
</template>

<script>
  import {
    onMounted,
    reactive,
    ref,
    watch
  } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import Order_component from '@/components/Order_component.vue';
  import router from '@/router';
  import {
    getDate,
    goBack,
    checkFileSize,
  } from '@/assets/js/common_fn.js'
  import {
    getApplication,
    getAssets
  } from '@/assets/js/common_api.js'
  import axios from 'axios'
  export default {
    components: {
      Navbar,
      Order_component
    },
    setup() {
      const Applicant = ref('');
      const ApplicationDate = ref('');
      const Assets = reactive({
        Name: '',
        Type: '',
        Status: '',
      });
      const formParams = reactive({
        AssetsId: '',
        Question: '',
        newFile: [],
        viewFile: [], //不需要傳
      });
      const modalParams = reactive({
        title: '',
        src: '',
      })
      const alertMsg = ref('');
      const wrongStatus = ref(false);
      const canSubmit = ref(false);
      const fileInputs = ref(null);
      onMounted(() => {
        getApplicationInfo()
        ApplicationDate.value = getDate()
      });
      async function getApplicationInfo() {
        getApplication()
          .then((data) => {
            Applicant.value = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      // async function getAssetsInfo() {
      //   getAssets(formParams.AssetsId)
      //     .then((data)=>{
      //       Assets.Name = data.AssetName;
      //       Assets.Type = data.AssetType;
      //       Assets.Status = data.Status;
      //       // 檢查資產類型
      //       if(Assets.Type === '耗材') {
      //         wrongStatus.value = true;
      //         canSubmit.value = false;
      //         alertMsg.value = '僅提供資產類型為非耗材的物品進行維修'
      //       }
      //       // 檢查資產狀態(只有非耗材才會有這個Status)
      //       else if(Assets.Status === '已被設備整合') {
      //         wrongStatus.value = true;
      //         canSubmit.value = false;
      //         alertMsg.value = '此資產已被設備整合，請先移出設備箱'
      //       }
      //       // 可報修
      //       else {
      //         wrongStatus.value = false;
      //         canSubmit.value = true;
      //         alertMsg.value = ''
      //       }
      //     })
      //     .catch((error) =>{
      //       wrongStatus.value = true;
      //       canSubmit.value = false;
      //       Assets.Name = '';
      //       alertMsg.value = '請輸入正確的資產編號'
      //     })
      // }
      async function submit() {
        const pattern = /^(BF\d{8})$/;
        // 檢查必填項目、格式        
        if (!pattern.test(formParams.AssetsId)) {
          alert('資產編號格式錯誤');
          return
        }
        if (!/^[\s\S]{0,500}$/.test(formParams.Question)) {
          alert('問題描述不可超過500字');
          return
        }
        const form = new FormData();
        for (const key in formParams) {
          if (formParams[key]) {
            form.append(key, formParams[key]);
          }
        }
        // 移除viewFile
        form.delete('viewFile');
        // newFile額外append
        form.delete('newFile');
        for (let i = 0; i < formParams.newFile.length; i++) {
          form.append('newFile', formParams.newFile[i]);
        }
        axios.post('http://192.168.0.177:7008/RepairMng/CreateOrder', form)
          .then((response) => {
            const data = response.data;
            if (data.state === 'success') {
              alert('新增報修單成功\n單號為:' + data.resultList.R_ID);
              router.push({
                name: 'Repair_Datagrid'
              });
            } else if (data.state === 'account_error') {
              alert(data.messages);
              router.push('/');
            } else {
              alert('新增報修單失敗')
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
      const openFileExplorer = (() => {
        fileInputs.value.click();
      });
      const handleFileChange = ((event) => {
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
        if (formParams.newFile.length + files.length > 5) {
          alert('上傳至多5張圖片');
          return;
        }
        // 檢查圖片大小
        if (!checkFileSize(files, formParams.newFile)) {
          return
        }
        console.log(event.target.files);
        // 压缩并处理图像
        const imgArray = formParams.newFile;
        const previewUrl = formParams.viewFile;
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
      });
      const deleteFile = ((index) => {
        formParams.newFile.splice(index, 1);
        formParams.viewFile.splice(index, 1);
      });
      const viewImgFile = ((index) => {
        modalParams.title = formParams.viewFile[index].FileName;
        modalParams.src = formParams.viewFile[index].FileLink;
      });
      // 監聽formParams.AssetsId(資產編號)的數值變動 -> 搜尋
      watch(() => formParams.AssetsId, (newValue, oldValue) => {
        getAssets(newValue)
          .then((data) => {
            Assets.Name = data.AssetName;
            Assets.Type = data.AssetType;
            Assets.Status = data.Status;
            // 檢查資產類型
            if (Assets.Type === '耗材') {
              wrongStatus.value = true;
              canSubmit.value = false;
              alertMsg.value = '僅提供資產類型為非耗材的物品進行維修'
            } else {
              // 檢查資產狀態(只有非耗材才會檢查)
              const Status = Assets.Status
              const Type = Assets.Type
              wrongStatus.value = true;
              canSubmit.value = false;
              switch (Status) {
                case '已被設備整合':
                  alertMsg.value = `此${Type}已被設備整合，請先移出設備箱`
                  break;
                case '維修':
                  alertMsg.value = `此${Type}已送修`
                  break;
                case '報廢':
                  alertMsg.value = `此${Type}已${Status}`
                  break;
                case '出貨':
                  alertMsg.value = `此${Type}已${Status}`
                  break;
                case '退貨':
                  alertMsg.value = `此${Type}已${Status}`
                  break;
                default: // 可報修
                  wrongStatus.value = false;
                  canSubmit.value = true;
                  alertMsg.value = ''
                  break;
              }
            }
          })
          .catch((error) => {
            wrongStatus.value = true;
            canSubmit.value = false;
            Assets.Name = '';
            alertMsg.value = '請輸入正確的資產編號'
          })
      }, {
        immediate: false
      });
      return {
        Applicant,
        ApplicationDate,
        Assets,
        formParams,
        modalParams,
        alertMsg,
        wrongStatus,
        canSubmit,
        fileInputs,
        // getAssetsInfo,
        submit,
        openFileExplorer,
        handleFileChange,
        deleteFile,
        viewImgFile,
        goBack,
      }
    },
  };
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
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
    }
    .send_btn {
      @include search_and_send_btn;
      &:hover {
        background-color: #5e7aa2;
      }
    }
    .send_btn_disabled {
      background: #878787;
      &:hover {
        background: #878787;
      }
    }
  }
  h1 {
    text-align: center;
    font-weight: 600;
    @include title_color;
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      h1 {
        margin-top: 100px;
        font-size: 55px;
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      h1 {
        margin-top: 100px;
        font-size: 55px;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      h1 {
        margin-top: 80px;
        font-size: 40px;
      }
    }
  }
</style>