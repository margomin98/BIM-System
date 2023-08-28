<template>
  <div class='button_wrap'>
    <button @click="viewEdit()">編輯</button>
    <button @click="viewDelete()">刪除</button>
  </div>
</template>

<script>
  // import router from '@/router';
  import {
    useRouter
  } from 'vue-router';
  export default {
    props: ['params'], // 声明 params 为 props
    setup(props) {
      const router = useRouter();
      const search_id = props.params.data.AI_ID;
      function viewDelete() {
        alert('刪除')
        // console.log(props.params.data.AI_ID);
        // if (search_id !== '') {
        //   router.push({
        //     name: 'Store_View',
        //     query: {
        //       search_id
        //     }
        //   });
        // }
      }
      function viewEdit() {
        // console.log(props.params.data.search_id);
        if (search_id !== '') {
          router.push({
            name: 'System_Parameter_Edit',
            query: {
              search_id
            }
          });
        }
      }
      return {
        viewDelete,
        viewEdit,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .button_wrap {
    justify-content: center;
    display: flex;
     :nth-child(1) {
      @include search_and_send_btn;
      width: 50px;
      height: 30px;
      font-size: 15px;
      border-radius: 7px;
      &:hover {
        background: #5D85BD;
        color: white
      }
    }
     :nth-child(2) {
      @include delete_button;
      &:hover {
        background: #FF7272;
        color: white
      }
    }
  }
</style>