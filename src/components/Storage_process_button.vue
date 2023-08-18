<template>
  <div class='button_wrap'>
    <button class='btn1' @click="routeTo('檢視')">檢視</button>
    <button @click="changeStatus"
      :class="{ disabled_btn2: isDisabled.deliveryNotify, btn2: !isDisabled.deliveryNotify }"
      :disabled="isDisabled.deliveryNotify">{{ deliveryNotify}}</button>
    <button @click="routeTo('交付')" :class="{ disabled_btn3: isDisabled.delivery, btn3: !isDisabled.delivery }"
      :disabled="isDisabled.delivery">交付</button>
    <button @click="routeTo('入庫')" :class="{ disabled_btn4: isDisabled.edit, btn4: !isDisabled.edit }"
      :disabled="isDisabled.edit">入庫</button>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: ['params', 'refresh'],
  setup(props) {
    const router = useRouter();
    const search_id = props.params.data.AI_ID;
    const deliveryNotify = ref('通知交付');
    const isDisabled = ref({
      deliveryNotify: false,
      delivery: false,
      edit: false,
    });

    function routeTo(view) {
      switch (view) {
        case '檢視':
          router.push({ name: 'Store_Process_View', query: { search_id } });
          break;
        case '交付':
          router.push({ name: 'Store_Process_Confirm', query: { search_id } });
          break;
        case '入庫':
          router.push({ name: 'Store_Process_Edit', query: { search_id ,tab_number: 3 } });
          break;
      }
    }
    //改變狀態 通知交付or暫停交付
    async function changeStatus() {
      const axios = require('axios');
      const response = await axios.get(`http://192.168.0.176:7008/AssetsInMng/DeliveryNotification?id=${search_id}`);
      try {
        const data = response.data;
        if (data.state === 'success') {
          console.log(data.messages);
          // emit('refresh' , data.message);
          props.params.colDef.cellRendererParams.refresh();
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      }
      catch (error) {
        console.log(error);
      }
    }

    function checkButton() {
      const disabledStatus = props.params.data.Status;
      if (disabledStatus === '申請入庫' || disabledStatus === '申請歸還' || disabledStatus === '可交付') {
        isDisabled.value.deliveryNotify = false;
        isDisabled.value.delivery = false;
      }
      else {
        isDisabled.value.deliveryNotify = true;
        isDisabled.value.delivery = true;
      }

      if (disabledStatus === '待入庫') {
        isDisabled.value.edit = false;
      }
      else {
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
    &:hover {
      background: #1D7072;
      color: white
    }
  }
  .btn2 {
    @include datagrid_inform_button;
    &:hover {
      background: #64a1a3;
      color: white
    }
  }
  .btn3 {
    @include datagrid_pass_button;
    &:hover {
      background: #597c7c;
      color: white
    }
  }
  .btn4 {
    @include datagrid_edit_button;
    &:hover {
      background: #3B6162;
      color: white
    }
  }
  .disabled_btn1 {
    @include disabled_btn;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
  .disabled_btn2 {
    @include disabled_btn;
    width: 80px;
     :hover {
      @include disabled_btn;
      width: 80px;
    }
  }
  .disabled_btn3 {
    @include disabled_btn;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
  .disabled_btn4 {
    @include disabled_btn;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
</style>