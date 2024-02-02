<template>
  <Navbar />
  <div class="main_section">
    <div class="title col"><h1>檢視入庫填報</h1></div>
    <Store_View_Component></Store_View_Component>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
    </div>
  </div>
</template>

<script setup>
import Store_View_Component from '@/components/store_page/store_view_component';
import Navbar from '@/components/Navbar.vue';
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { useApplyStore } from '@/store/storage/apply'
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const storageStore = useStorageStore();
const applyStore = useApplyStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray } = storeToRefs(storageStore) ;
const { hidden } = storeToRefs(applyStore);
const route = useRoute();
const AI_ID = route.query.search_id ;
onMounted(async()=>{
  applyStore.$reset();
  storageStore.$reset();
  hidden.value = true;
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  DropdownArray.value.ShipmentNum = await apiStore.getShipmentNum();
  await storageStore.getDetails(AI_ID);
})
onUnmounted(()=>{
  utilsStore.$dispose();
  storageStore.$dispose();
  applyStore.$dispose();
  apiStore.$dispose();
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.title {
  h1 {

    margin-top: 50px;
    text-align: center;
    font-size: 55px;
    font-weight: 600;
    color: #132238;
  }
}

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

@media only screen and (max-width: 767px) {
  .title {
    h1 {
      font-size: 50px;
    }
  }
}</style>
