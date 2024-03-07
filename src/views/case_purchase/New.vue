<template>
  <Navbar />
  <div class="main_section">
    <div class="title col"><h1>新增專案待採購清單</h1></div>
    <case_purchase></case_purchase>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="send_btn" @click="purchaseStore.submit">送出</button>
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
const purchaseStore = usePurchaseStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray , Form } = storeToRefs(purchaseStore) ;

onMounted(async() => {
  purchaseStore.$reset();
  // DropdownArray.value.ProjectCode = [
  //   {Text:'--請選擇--' , Value: ''},
  //   {Text:'000-1  12345678901234567890' , Value: '000-1'},
  //   {Text:'000-2  asdasdasdwqweqwasdaw' , Value: '000-2'},
  // ]
  DropdownArray.value.ProjectCode = await apiStore.getFuzzyProject();
});
onUnmounted(()=>{
  utilsStore.$dispose();
  purchaseStore.$dispose();
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

@media only screen and (max-width: 767px) {
  .title {
    h1 {
      font-size: 32px;
    }
  }
}</style>