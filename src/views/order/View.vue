<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        檢視訂購單
      </h1>
    </div>
    <Order_component :hidden="hidden" :placeholder="placeholder" :disabled="disabled"/>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, provide, reactive, ref, } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import Order_component from '@/components/order_page/Order_component.vue';
  import { goBack } from '@/assets/js/common_fn.js'
  import { getDetails } from '@/assets/js/common_api'
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const PO_ID = route.query.search_id;
  const formParams = reactive({
		PO_ID: '',
    Type: '',
		PurchaseNum: '',
		Source: '',
    ProjectCode: '',
    ProjectName: '',
    ProjectSelect: '',
		Use: '',
    Description: '',
    Links: [],
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
      selected_btn: true,
      selected_file: true,
      Link: true,
    },
    input: {
      file_trashcan: true,
      Type: true,
    },
  }
  const placeholder = {
    PurchaseNum: '',
    Source: '',
    Description: '',
  }
  const disabled = ref(true);
  const details = ref();
  const DropdownArray = reactive({
    ProjectCode: []
  })
  provide("form",formParams);
  provide("file",fileParams);
  provide("DropdownArray",DropdownArray);
  onMounted(()=>{
    getDetails('/GetDBdata/PurchasingGetData?po_id=',PO_ID)
    .then((r)=>{
      details.value = r;
      for(const key in details.value) {
        // 文字部分
        if(formParams.hasOwnProperty(key)) {
          formParams[key] = details.value[key];
        } else if(key == 'PO_PurchaseNum') {
          formParams['PurchaseNum'] = details.value[key];
        }
        // 檔案部分
        if(details.value.existDocument) {
          fileParams.existDoc = details.value.existDocument;
        }
        // fileParams.existDoc = [{"FileName": "20231226142509.png", "FileLink": "https://truth.bahamut.com.tw/s01/201909/9ede4b8227205d338399d2dfbb3e7938.JPG" , "exist": true}]
      }
    })
  })
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .button_wrap {
    display: flex;
    justify-content: center;
    margin: 30px auto 5%;
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