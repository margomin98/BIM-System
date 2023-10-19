<template>
  <div class='button_wrap'>
    <button class='btn1' @click="routeTo('檢視')">檢視</button>
    <button @click="changeStatus" :class="{ disabled_btn2: isDisabled.deliveryNotify, btn2: !isDisabled.deliveryNotify }" :disabled="isDisabled.deliveryNotify">{{ deliveryNotify}}</button>
    <button @click="routeTo('交付')" :class="{ disabled_btn3: isDisabled.delivery, btn3: !isDisabled.delivery }" :disabled="isDisabled.delivery">交付</button>
    <button @click="routeTo('入庫')" :class="{ disabled_btn4: isDisabled.edit, btn4: !isDisabled.edit }" :disabled="isDisabled.edit">入庫</button>
  </div>
</template>

<script>
  import {
    onMounted,
    ref
  } from 'vue';
  import {
    useRouter
  } from 'vue-router';
  import { 
    StoreProcess_NotifyConfirm_Status ,
    StoreProcess_Confirm_Status, 
    StoreProcess_Edit_Status, 
  } from '@/assets/js/enter_status';
  export default {
    props: ['params', 'refresh'],
    setup(props) {
      const router = useRouter();
      const search_id = props.params.data.AI_ID;
      const deliveryNotify = ref('通知交付');
      const isDisabled = ref({
        deliveryNotify: false, //通知交付
        delivery: false, //交付
        edit: false, //入庫
      });
      function routeTo(view) {
        switch (view) {
          case '檢視':
            router.push({
              name: 'Store_Process_View',
              query: {
                search_id
              }
            });
            break;
          case '交付':
            router.push({
              name: 'Store_Process_Confirm',
              query: {
                search_id
              }
            });
            break;
          case '入庫':
            router.push({
              name: 'Store_Process_Edit',
              query: {
                search_id
              }
            });
            break;
        }
      }
      //改變狀態 通知交付or暫停交付
      async function changeStatus() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/AssetsInMng/DeliveryNotification?id=${search_id}`);
          const data = response.data;
          if (data.state === 'success') {
            props.params.refresh();
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.log(error);
        }
      }
      function checkButton() {
        const disabledStatus = props.params.data.Status;
        if(!StoreProcess_NotifyConfirm_Status.includes(disabledStatus)) {
          isDisabled.value.deliveryNotify = true;
        }
        if(!StoreProcess_Confirm_Status.includes(disabledStatus)) {
          isDisabled.value.delivery = true;
        }
        if(!StoreProcess_Edit_Status.includes(disabledStatus)) {
          isDisabled.value.edit = true;
        }
      }
      onMounted(() => {
        deliveryNotify.value = props.params.data.Status !== '可交付' ? '通知交付' : '暫停交付';
        checkButton();
      });
      return {
        deliveryNotify,
        routeTo,
        changeStatus,
        isDisabled,
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .btn1 {
    @include datagrid_view_button;
    height: 25px;
    &:hover {
      background: #1D7072;
      color: white
    }
  }
  .btn2 {
    @include datagrid_inform_button;
    height: 25px;
    &:hover {
      background: #64a1a3;
      color: white
    }
  }
  .btn3 {
    @include datagrid_pass_button;
    height: 25px;
    &:hover {
      background: #597c7c;
      color: white
    }
  }
  .btn4 {
    @include datagrid_edit_button;
    height: 25px;
    &:hover {
      background: #3B6162;
      color: white
    }
  }
  .disabled_btn1 {
    @include disabled_btn;
    height: 25px;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
  .disabled_btn2 {
    @include disabled_btn;
    height: 25px;
    width: 80px;
     :hover {
      @include disabled_btn;
      width: 80px;
    }
  }
  .disabled_btn3 {
    @include disabled_btn;
    height: 25px;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
  .disabled_btn4 {
    @include disabled_btn;
    height: 25px;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
</style>