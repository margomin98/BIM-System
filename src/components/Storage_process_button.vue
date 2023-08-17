<template>
  <div class='button_wrap'>
    <button @click="routeTo('檢視')">檢視</button>
    <button @click="changeStatus">通知交付</button>
    <button @click="routeTo('交付')">交付</button>
    <button @click="routeTo('入庫')">入庫</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: ['params','refresh'],
  setup(props) {
    const router = useRouter();
    const search_id = props.params.data.AI_ID;

    function routeTo(view) {
      switch (view) {
        case '檢視':
          router.push({ name: 'Store_Process_View', query: { search_id } });
          break;
        case '交付':
          router.push({ name: 'Store_Process_Confirm', query: { search_id } });
          break;
        case '入庫':
          router.push({ name: 'Store_Process_Edit', query: { search_id } });
          break;
      }
    }
    async function changeStatus() {
      const axios = require('axios');
      const response = await axios.get(`http://192.168.0.176:7008/AssetsInMng/DeliveryNotification?id=${search_id}`);
      try {
        const data = response.data;
        console.log(data);
        if(data.state === 'success') {
          // emit('refresh' , data.message);
          params.refresh(data.message);
        } else if( data.state === 'error') {
          alert(data.message);
        } else if( data.state === 'account_error') {
          alert(data.message);
          router.push('/');
        }
      } 
      catch (error) {
        console.log(error);  
      }
    }
    return {
      routeTo,
      changeStatus,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

.button_wrap {
  :nth-child(1) {
    @include datagrid_view_button;
  }

  :nth-child(2) {
    @include datagrid_inform_button;
  }

  :nth-child(3) {
    @include datagrid_pass_button;
  }

  :nth-child(4) {
    @include datagrid_edit_button;
  }

  button:nth-child(1):hover {
    background: #1D7072;
    color: white
  }

  button:nth-child(2):hover {
    background: #64a1a3;
    color: white
  }

  button:nth-child(3):hover {
    background: #597c7c;
    color: white
  }

  button:nth-child(4):hover {
    background: #3B6162;
    color: white
  }
}
</style>