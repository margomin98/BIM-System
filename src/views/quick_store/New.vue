<template>
    <Navbar />
    <div class="main_section">
        <div class="title col">
            <h1>
                快速入庫
            </h1>
        </div>
        <quick_store_component></quick_store_component>
        <div class="col button_wrap">
            <button class="back_btn" @click="goBack">回上一頁</button>
            <button class="send_btn" @click="store.submit()">送出</button>
      </div>
    </div>
</template>

<script setup>
import quick_store_component from '@/components/quick_store_page/quick_store_component.vue';
import Navbar from '@/components/Navbar.vue';
import { useStorageStore } from '@/store/storage'
import { useAPIStore, useUtilsStore } from '@/store';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const storageStore = useStorageStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray , upperForm , hidden } = storeToRefs(storageStore) ;
const route = useRoute();

onMounted(async() => {
  storageStore.$reset();
  hidden.value = true;
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  DropdownArray.value.ShipmentNum = await apiStore.getShipmentNum();
  if(route.query.ShipmentNum && route.query.search_id) {
    upperForm.value.ShipmentNum = route.query.ShipmentNum;
    upperForm.value.AR_ID = route.query.search_id;
  }
  storageStore.fuzzyShipmentNum(false);
});
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