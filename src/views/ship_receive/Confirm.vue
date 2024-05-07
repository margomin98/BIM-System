<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>出貨簽收單</h1>
    </div>
    <ship_receive></ship_receive>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="send_btn" :class="{'send_btn_disabled': !rentStore.user1.isValidate}" :disabled="!rentStore.user1.isValidate" @click="submit">送出</button>
    </div>
  </div>
</template>

<script setup>
import ship_receive from '@/components/ship_receive_page/ship_receive.vue';
import Navbar from "@/components/Navbar.vue";
import { useRentStore } from '@/store/rent/_index';
import { useAPIStore, useUtilsStore } from '@/store';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import axios from '@/axios/tokenInterceptor'
import router from '@/router';
const rentStore = useRentStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const route = useRoute();
const AO_ID = route.query.search_id;
const { Form , user1 } = storeToRefs(rentStore);
onMounted(() => {
  rentStore.$reset();
  utilsStore.$reset();
  apiStore.$reset();
  rentStore.PageType = 'ShipReceiveConfirm'
  rentStore.user1.title = '上傳人員驗證'
  rentStore.user1.id = 'SR_Upload'
  rentStore.getDetails(AO_ID);
});
onUnmounted(() => {
  rentStore.$dispose();
  utilsStore.$dispose();
  apiStore.$dispose();
})

const submit = async () => {
  // 檢查必填
  if(Form.value.newFile.length == 0 ) {
    alert('請上傳簽收單');
    return
  }
  const form = new FormData;
  form.append('Document', Form.value.newFile[0]);
  form.append('AO_ID', Form.value.AO_ID);
  form.append('UploadPerson', user1.value.resultName);
  try {
    const reseponse = await axios.post('https://localhost:44302/AssetsOutMng/UploadSignatures',form);
    const data = reseponse.data;
    if(data.state === 'success') {
      alert(`${data.messages}\n單號:${data.resultList.AO_ID}`);
      router.push({name: 'Ship_Receive_Datagrid'});
    } else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    } else {
      alert(data.messages);
    }
  } catch (e) {
    console.error(e);
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;
}


.back_btn {
  @include back_to_previous_btn;

  &:hover {
    background-color: #5d85bb;
  }
}

.send_btn {
  @include search_and_send_btn;

  &:hover {
    background-color: #5D85BD;
  }
}

.send_btn_disabled {
  background: #878787;

  &:hover {
    background: #878787;
  }
}
</style>
