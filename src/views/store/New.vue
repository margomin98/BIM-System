<template>
  <Navbar />
  <div class="main_section">
    <div class="title col"><h1>新品入庫</h1></div>
    <Store_Component></Store_Component>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="send_btn" @click="applyStore.submit">送出</button>
    </div>
  </div>
</template>

<script setup>
import Store_Component from '@/components/store_page/store_component';
import Navbar from '@/components/Navbar.vue';
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { useApplyStore } from '@/store/storage/apply.js'
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const storageStore = useStorageStore();
const applyStore = useApplyStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray , upperForm } = storeToRefs(storageStore) ;
const { hidden } = storeToRefs(applyStore);
const route = useRoute();

onMounted(async() => {
  storageStore.$reset();
  hidden.value = true;
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  DropdownArray.value.ShipmentNum = await apiStore.getShipmentNum();
  if(route.query.ShipmentNum && route.query.search_id) {
    upperForm.value.ShipmentNum = route.query.ShipmentNum;
    upperForm.value.AR_ID = route.query.search_id;
    upperForm.value.ShipmentSelect = {ShipmentNum: upperForm.value.ShipmentNum , AR_ID: upperForm.value.AR_ID};
  }
});
onUnmounted(()=>{
  utilsStore.$dispose();
  storageStore.$dispose();
  applyStore.$dispose();
  apiStore.$dispose();
})
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
</style>
