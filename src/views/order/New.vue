<template>
  <Navbar @username="getUserName"/>
  <div class="main_section">
    <div class="title col">
      <h1>
        新增訂購單
      </h1>
    </div>
    <Order_component :hidden="hidden" :placeholder="placeholder"/>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="send_btn" :class="{'send_btn_disabled': loading}" :disabled="loading" @click="submit" >新增</button>
    </div>
  </div>
</template>

<script setup>
  import { provide, reactive, ref, } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import Order_component from '@/components/order_page/Order_component.vue';
  import router from '@/router';
  import { goBack, checkRequire, checkMaxLetter, } from '@/assets/js/common_fn.js'
  import axios from 'axios'
	const formParams = reactive({
		PO_ID: '',
		PurchaseNum: '',
		Source: '',
		Use: '',
		PurchaseDate: '',
		Executor: '',//承辦人員
		Quantity: 1,
	});
  const fileParams = reactive({
    newDoc: [],
    viewDoc: [],
    deleteDoc: [], //將刪除的 已上傳物流文件記錄於此
    existDoc: [],
  })
  const hidden = {
    div: {
      warning: true,
      existFile: true,
    },
    input: {
      PO_ID: true,
      // file_trashcan: true,
    },
  }
  const placeholder = {
    PurchaseNum: '最多50字',
    Source: '最多50字',
    Use: '最多100字',
  }
  const loading = ref(false);
  provide("form",formParams);
  provide("file",fileParams);
  const getUserName = ((name)=>{
    formParams.Executor = name;
  })
  const submit = (async ()=>{
    const RequireCheckList = ['PurchaseNum','PurchaseDate','Quantity'];
    const FormLetterCheckList = {
      PurchaseNum: {field:'訂單編號',max:50},
      Source: {field:'採購來源',max:50},
      Use: {field:'使用專案',max:100},
    }
    // 檢查必填
    if(!checkRequire(RequireCheckList,formParams,fileParams)) { return }
    // 檢查字數
    if(!checkMaxLetter(FormLetterCheckList,formParams)) { return }
    loading.value = true;
    try {
      // 先用文字部分建立訂購單，再用訂購單ID(PO_ID)將檔案上傳
      const PO_ID = await sendTextForm();
      let filePromises = [];
      fileParams.newDoc.forEach((file,index)=>{
        filePromises.push(sendFileForm(PO_ID, file, index));
      })
      await Promise.all(filePromises)
      .then((result)=>{
        const allSuccess = result.every(result => result === 'success')
        if (allSuccess) {
          alert('新增訂購單成功\n單號為:' + PO_ID);
          router.push({
            name: 'Order_Datagrid'
          });
        } else {
          alert('新增訂購單失敗');
        }
      })
      .catch((e)=>{
        console.error(e);
      })
    } 
    catch (error) {
      console.error(error);
    }
    finally {
      loading.value = false;
    }
    // console.log('form',formParams);
    // console.log('file',fileParams.newDoc);
  })
  const sendTextForm = (()=>{
    return new Promise((resolve, reject) => {
      const form = new FormData();
      for (const key in formParams) {
        if(formParams[key]) {
          form.append(key, formParams[key]);
        }
      }
      axios.post('http://192.168.0.177:7008/PurchasingMng/CreateOrder', form)
        .then(response => {
          const data = response.data;
          if (data.state === 'success') {
            const PO_ID = response.data.resultList.PO_ID;
            console.log('新增文字部分表單成功PO_ID:', PO_ID);
            resolve(PO_ID);
          } else {
            reject(data.messages);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  })
  const sendFileForm = (( PO_ID , file , index)=>{
    return new Promise((resolve, reject) => {
          const form = new FormData();
          form.append('PO_ID', PO_ID);
          form.append('num', index);
          form.append('Document', file);
          const axios = require('axios');
          axios.post('http://192.168.0.177:7008/PurchasingMng/UploadFile', form)
            .then((response) => {
              const data = response.data;
              if (data.state === 'success') {
                console.log(`第${index+1}個文件上傳成功`);
                resolve(data.state)
              } else {
                console.error(type + '上傳失敗，' + response.data.messages);
                resolve('fail');
              }
            })
            .catch(error => {
              reject(error);
            });
        });
  })
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
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
 
</style>