<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>編輯資產</h1>
    </div>
    <assets_component></assets_component>
  </div>
  <div class="col button_wrap">
    <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
  </div>
</template>
<script setup>
import Navbar from "@/components/Navbar.vue";
import assets_component from "@/components/assets_page/assets_component.vue";
import { useAssetStore } from "@/store/asset/_index";
import { useAPIStore, useUtilsStore } from '@/store';
// import { useEditStore } from "@/store/asset/edit";
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const assetStore = useAssetStore();

// 解構
const { DropdownArray, Form, isPermitted } = storeToRefs(assetStore) ;
const route = useRoute();
const AssetsId = route.query.search_id ;

onMounted(async ()=>{
  assetStore.$reset();
  assetStore.PageType = 'edit';
  DropdownArray.value.Custodian = await apiStore.getCustodian('');
  DropdownArray.value.Area = await apiStore.getArea();
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  DropdownArray.value.PO_ID = await apiStore.getFuzzyOrder();
  utilsStore.getUserName();
  const roleId = await apiStore.getRoleId(utilsStore.userName);
  if(roleId === 1 || roleId === 4) isPermitted.value = true ;
  await assetStore.getDetails(AssetsId);
  if(Form.value.PO_ID) Form.value.PO_IDSelect = {PO_ID: Form.value.PO_ID};
  assetStore.searchHistory('','search');
})

onUnmounted(()=>{
  utilsStore.$dispose();
  assetStore.$dispose();
  apiStore.$dispose();
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";

.button_wrap {
  display: flex;
  margin-top: 30px;
  justify-content: center;
  padding: 0 28%;
  margin-bottom: 5%;
  gap: 20px;
}
.back_btn {
  @include back_to_previous_btn;
  &:hover {
    background-color: #5d85bb;
  }
}
</style>