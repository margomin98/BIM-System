<template>
  <Navbar />
  <div class="main_section">
    <div class="title col"><h1>刪除專案採購單</h1></div>
    <case_purchase_view></case_purchase_view>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
    </div>
  </div>
  <delete_modal @delete="purchaseStore.deleteData(PP_ID)"></delete_modal>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import case_purchase_view from '@/components/case_purchase_page/case_purchase_view.vue';
import delete_modal from '@/components/utils/delete_modal.vue';
import { usePurchaseStore } from '@/store/purchase/_index'
import { useUtilsStore } from '@/store';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
const purchaseStore = usePurchaseStore();
const utilsStore = useUtilsStore();
const route = useRoute();
const PP_ID = route.query.search_id;
onMounted(async() => {
  purchaseStore.$reset();
  purchaseStore.PageType = 'delete';
  purchaseStore.getDetails(PP_ID);
});
onUnmounted(()=>{
  purchaseStore.$dispose();
  utilsStore.$dispose();
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';



.button_wrap {
  display: flex;
            justify-content: space-between;
            margin: 30px auto 5%;
            width: 210px;
  .back_btn{
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
    }

</style>