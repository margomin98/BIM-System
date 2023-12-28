<template>
  <div class='button_div'>
    <button @click="viewDetails()">檢視</button>
    <button :class="{ disabled_btn: !canEdit, btn_edit: canEdit }"  :disabled="!canEdit" @click="viewEdit()">編輯</button>
    <!-- <button class="btn_edit" @click="viewEdit()">編輯</button> -->
    <button class="btn_store" @click="viewReceive()">收貨</button>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import {
    useRouter
  } from 'vue-router';
    const props = defineProps(['params']);
    const router = useRouter();
    const search_id = props.params.data.PO_ID;
    const canEdit = ref(props.params.data.canEdit);
    const PurchaseNum = props.params.data.PurchaseNum;
    function viewDetails() {
      if (search_id !== '') {
        router.push({
          name: 'Order_View',
          query: {
            search_id
          }
        });
      }
    }
    function viewEdit() {
      if (search_id !== '') {
        router.push({
          name: 'Order_Edit',
          query: {
            search_id
          }
        });
      }
    }
    function viewReceive() {
      router.push({
        name: 'Receive_New',
        query: {
          search_id,
          PurchaseNum,
        }
      });
    }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .button_div {
    justify-content: center;
     :nth-child(1) {
      @include datagrid_view_button;
      height: 25px;
      &:hover {
        background: #1D7072;
        color: white
      }
    }
     :nth-child(3) {
      @include datagrid_inform_button;
      width: 50px;
      height: 25px;
      &:hover {
        background: #359699
      }
    }
    .btn_edit {
      @include datagrid_edit_button;
      height: 25px;
      &:hover {
        background: #3B6162;
        color: white
      }
      }
    .disabled_btn {
      @include disabled_btn;
      width: 50px;
      height: 25px;
    }
  }
</style>