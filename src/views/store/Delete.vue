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
  <delete_modal :delete="storageStore.deleteData" :id="AI_ID"></delete_modal>
</template>

<script setup>
import Store_View_Component from '@/components/store_page/store_view_component';
import delete_modal from '@/components/delete_modal.vue';
import Navbar from '@/components/Navbar.vue';
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { Store_Delete_Status } from '@/assets/js/enter_status';
const storageStore = useStorageStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray } = storeToRefs(storageStore) ;
const route = useRoute();
const AI_ID = route.query.search_id ;
onMounted(async()=>{
  storageStore.$reset();
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  DropdownArray.value.ShipmentNum = await apiStore.getShipmentNum();
  await storageStore.getDetails(AI_ID, false , Store_Delete_Status);
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

.delete_btn {
  background: var(--c-5, #E94B4B);
  justify-content: center;
  align-items: center;
  display: inline-flex;
  border-radius: 10px;
  height: 40px;
  width: 90px;
  color: #FFF;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  border: none;
  margin: 0 10px;
  &:hover {
    background-color: #a51e1e;
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
