<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>檢視資產</h1>
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
const { DropdownArray, isPermitted } = storeToRefs(assetStore);
const route = useRoute();
const AssetsId = route.query.search_id;

onMounted(async () => {
  assetStore.$reset();
  assetStore.PageType = 'view';
  DropdownArray.value.Custodian = await apiStore.getCustodian('');
  DropdownArray.value.Area = await apiStore.getArea();
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  utilsStore.getUserName();
  const roleId = await apiStore.getRoleId(utilsStore.userName);
  if(roleId === 1 || roleId === 4) isPermitted.value = true ;
  await assetStore.getDetails(AssetsId);
  assetStore.searchHistory('', 'search');
})
onUnmounted(() => {
  utilsStore.$dispose();
  assetStore.$dispose();
  apiStore.$dispose();
})
</script>


<style lang="scss" scoped>
@import "@/assets/css/global.scss";

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
</style>
