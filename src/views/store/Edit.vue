<template>
  <Navbar />
  <div class="main_section">
    <div class="title col"><h1>編輯入庫</h1></div>
    <Store_Component></Store_Component>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="send_btn" @click="applyStore.submit('edit')">送出</button>
    </div>
  </div>
</template>

<script setup>
import Store_Component from '@/components/store_page/store_component';
import Navbar from '@/components/Navbar.vue';
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { useApplyStore } from '@/store/storage/apply'
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { Store_Edit_Status } from '@/assets/js/enter_status';
const storageStore = useStorageStore();
const applyStore = useApplyStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray } = storeToRefs(storageStore) ;
const route = useRoute();
const AI_ID = route.query.search_id ;
onMounted(async()=>{
  applyStore.$reset();
  storageStore.$reset();
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  DropdownArray.value.ShipmentNum = await apiStore.getShipmentNum();
  await storageStore.getDetails(AI_ID, false, Store_Edit_Status, true);
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
  justify-content: space-between;
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
