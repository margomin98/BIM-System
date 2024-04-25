<template>
  <Navbar />
  <div class="main_section">
    <div class="title col"><h1>刪除項目</h1></div>
    <Store_View_Component></Store_View_Component>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
    </div>
  </div>
  <delete_modal @delete="storageStore.deleteData(AI_ID)"></delete_modal>
</template>

<script setup>
import Store_View_Component from '@/components/store_page/store_view_component';
import delete_modal from '@/components/utils/delete_modal.vue';
import Navbar from '@/components/Navbar.vue';
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { useApplyStore } from '@/store/storage/apply'
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { Store_Delete_Status } from '@/assets/js/enter_status';
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
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  DropdownArray.value.ShipmentNum = await apiStore.getShipmentNum();
  await storageStore.getDetails(AI_ID, false , Store_Delete_Status);
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

.delete_btn {
  @include delete_btn;
  &:hover {
    background-color: #a51e1e;
  }
}
</style>
