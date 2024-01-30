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
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const assetStore = useAssetStore();

// 解構
const { DropdownArray } = storeToRefs(assetStore) ;
const route = useRoute();
const AssetsId = route.query.search_id ;

onMounted(async ()=>{
  utilsStore.$reset();
  assetStore.$reset();
  assetStore.PageType = 'edit';
  DropdownArray.value.Custodian = await apiStore.getCustodian('');
  DropdownArray.value.Area = await apiStore.getArea();
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  await assetStore.getDetails(AssetsId);
  assetStore.searchHistory('','search');
  console.log(DropdownArray.value);
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
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
.empty_btn {
  @include empty_btn;
  &:hover {
    background-color: #244f86;
  }
}
.search_btn {
  @include search_and_send_btn;
  &:hover {
    background-color: #5e7aa2;
  }
}
</style>