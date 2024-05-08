<template>
  <Navbar />
  <div class="main_section">
    <div class="title col"><h1>檢視出貨簽收單</h1></div>
    <ship_receive></ship_receive>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
    </div>
  </div>
</template>

<script setup>
import ship_receive from '@/components/ship_receive_page/ship_receive.vue';
import Navbar from "@/components/Navbar.vue";
import { useRentStore } from '@/store/rent/_index';
import { useAPIStore, useUtilsStore } from '@/store';
import { storeToRefs } from 'pinia';
import { onMounted , onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
const rentStore = useRentStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const route = useRoute();
const AO_ID = route.query.search_id;
onMounted(()=>{
  rentStore.$reset();
  apiStore.$reset();
  rentStore.PageType = 'ShipReceiveView'
  rentStore.getDetails(AO_ID);
});
onUnmounted(()=>{
  rentStore.$dispose();
  utilsStore.$dispose();
  apiStore.$dispose();
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.button_wrap {
  display: flex;
  justify-content: center;
  margin: 30px auto 5%;
  width: 220px;
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
</style>
