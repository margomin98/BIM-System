<template>
    <Navbar />
    <div class="main_section">
        <div class="title col">
            <h1>
                檢視快速入庫單
            </h1>
        </div>
        <quick_store_view_component></quick_store_view_component>
        <div class="col button_wrap">
        <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      </div>
    </div>
</template>
  
<script setup>
import Navbar from '@/components/Navbar.vue';
import quick_store_view_component from '@/components/quick_store_page/quick_store_view_component.vue';
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { useQuickProcessStore } from '@/store/storage/quick_process'
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const storageStore = useStorageStore();
const utilsStore = useUtilsStore();
const quickprocessStore = useQuickProcessStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray , upperForm , middleForm , hidden , tabData } = storeToRefs(storageStore) ;
const route = useRoute();
const AI_ID = route.query.search_id ;

onMounted(async() => {
    storageStore.$reset();
    quickprocessStore.$reset();
    DropdownArray.value.EquipType = await apiStore.getEquipType();
    DropdownArray.value.ShipmentNum = await apiStore.getShipmentNum();
    DropdownArray.value.Area = await apiStore.getArea();
    DropdownArray.value.Custodian = await apiStore.getCustodian('');
    await storageStore.getDetails(AI_ID, true, null, false);
//   DropdownArray.value.ProjectCode = await apiStore.getFuzzyProject();
//   console.log(DropdownArray.value);
});

onUnmounted(()=>{
    utilsStore.$dispose();
    storageStore.$dispose();
    quickprocessStore.$dispose();
    apiStore.$dispose();
})
</script>
  
<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    h1 {
        margin-top: 50px;
        text-align: center;
        font-weight: 600;
        @include title_color;
    }
    .button_wrap {
  display: flex;
  justify-content:center;
  margin: 30px auto 5%;
  width: 220px;
}


.back_btn {
  @include back_to_previous_btn;

  &:hover {
    background-color: #5d85bb;
  }
}

    @media only screen and (min-width: 1200px) {
        .main_section {
            h1 {
                font-size: 55px;
            }
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 1199px) {
        .main_section {
            h1 {
                font-size: 55px;
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .main_section {
            h1 {
                font-size: 50px;
            }
        }
    }
</style>