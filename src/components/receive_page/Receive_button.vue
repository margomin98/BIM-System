<template>
  <div class='button_div'>
    <button @click="viewDetails()">檢視</button>
    <button :class="{ disabled_btn: !canEdit, btn_edit: canEdit }" @click="viewEdit()" :disabled="!canEdit">編輯</button>
    <button class="btn_store" @click="viewStore()">入庫</button>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import {
    useRouter
  } from 'vue-router';
  export default {
    props: ['params'],
    setup(props) {
      const router = useRouter();
      const search_id = props.params.data.AR_ID;
      const canEdit = ref(props.params.data.canEdit);
      const PO_ID = props.params.data.PO_ID;
      function viewDetails() {
        if (search_id !== '') {
          router.push({
            name: 'Receive_View',
            query: {
              search_id
            }
          });
        }
      }
      function viewEdit() {
        if (search_id !== '') {
          router.push({
            name: 'Receive_Edit',
            query: {
              search_id
            }
          });
        }
      }
      function viewStore() {
        if (PO_ID !== '') {
          router.push({
            name: 'Store_New',
            query: {
              PO_ID,
            }
          });
        }
      }
      return {
        canEdit,
        viewDetails,
        viewEdit,
        viewStore,
      };
    },
  };
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