<template>
  <div class='button_wrap'>
    <button @click="viewDetails()">檢視</button>
    <button class="btn_edit" @click="viewEdit()">編輯</button>
    <button class="btn_store">入庫</button>
  </div>
</template>

<script>
  import {
    useRouter
  } from 'vue-router';
  export default {
    props: ['params'],
    setup(props) {
      const router = useRouter();
      const search_id = props.params.data.AssetsId;
      function viewDetails() {
        if (search_id !== '') {
          router.push({
            name: 'Assets_View',
            query: {
              search_id
            }
          });
        }
      }
      function viewEdit() {
        if (search_id !== '') {
          router.push({
            name: 'Assets_Edit',
            query: {
              search_id
            }
          });
        }
      }
      return {
        viewDetails,
        viewEdit,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .button_wrap {
    justify-content: center;
     :nth-child(1) {
      @include datagrid_view_button;
      height: 25px;
      &:hover {
        background: #1D7072;
        color: white
      }
    }
     :nth-child(2) {
      @include datagrid_edit_button;
      height: 25px;
      &:hover {
        background: #3B6162;
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
  }
</style>