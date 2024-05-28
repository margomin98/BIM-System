<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產出庫檢視</h1>
    </div>
    <rent_process_view :totalNeed="totalNeed" :totalSelect="totalSelect" />
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
    </div>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AssetsView from '@/components/Rent_process_new_view_button'
import rent_process_view from '@/components/rent_process_page/rent_process_view_component.vue'
import {
  useRoute,
  useRouter
} from 'vue-router';
import Navbar from "@/components/Navbar.vue";
import { useRentStore } from '@/store/rent/_index';
import { useAPIStore, useUtilsStore } from '@/store';
import { storeToRefs } from 'pinia';
import {
  Rent_UseArray
} from "@/assets/js/dropdown";
import {
  onMounted,
  onUnmounted,
  ref,
} from "vue";
const rentStore = useRentStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const route = useRoute();
const AO_ID = route.query.search_id; // 單號
const totalNeed = ref(0); //總所需數量
const totalSelect = ref(0); //總已備數量
const options = Rent_UseArray; // 用途。Array for input[radio]
const { Form } = storeToRefs(rentStore);
onMounted(async() => {
  rentStore.$reset();
  apiStore.$reset();
  await rentStore.getDetails(AO_ID);
  setData();
});
onUnmounted(() => {
  rentStore.$dispose();
  apiStore.$dispose();
})
/**
 * 取完資料單後做變數處理
 */
function setData() {
  // 總出庫數量
  totalNeed.value = 0;
  Form.value.ItemList.forEach(item => {
    totalNeed.value += item.Number;
  });
  // 已備數量
  totalSelect.value = 0;
  Form.value.OM_List.forEach(item => {
    totalSelect.value += item.OM_Number;
  });
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.button_wrap {
  display: flex;
  justify-content: center;
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
</style>