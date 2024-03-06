<template>
  <Navbar />
  <div class="main_section">
    <div class="title col"><h1>編輯專案採購單</h1></div>
    <case_purchase></case_purchase>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="send_btn" @click="purchaseStore.submit('edit')">送出</button>
    </div>
  </div>
</template>

<script setup>
import case_purchase from '@/components/case_purchase_page/case_purchase.vue';
import Navbar from '@/components/Navbar.vue';
import { usePurchaseStore } from '@/store/purchase/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { CasePurchase_Edit } from '@/assets/js/enter_status'
const purchaseStore = usePurchaseStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray , Form } = storeToRefs(purchaseStore) ;
const route = useRoute();

const PP_ID = route.query.search_id;
onMounted(async() => {
  purchaseStore.$reset();
  // DropdownArray.value.ProjectCode = [
  //   {Text:'--請選擇--' , Value: ''},
  //   {Text:'0000-1  資產管理系統開發-內部領用/借測' , Value: "0000-1" },
  //   {Text:'0000-2  asdasdasdwqweqwasdaw' , Value: '0000-2'},
  // ]
  DropdownArray.value.ProjectCode = await apiStore.getFuzzyProject();
  purchaseStore.getDetails(PP_ID, CasePurchase_Edit);
});
onUnmounted(()=>{
  utilsStore.$dispose();
  purchaseStore.$dispose();
  apiStore.$dispose();
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';


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
</style>