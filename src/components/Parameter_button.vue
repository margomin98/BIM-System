<template>
  <div class='button_wrap'>
    <!-- <button @click="viewEdit()">編輯</button> -->
    
    <button data-bs-toggle="modal" data-bs-target="#editModal" @click="viewEdit()">編輯</button>
    <button @click="viewDelete()">刪除</button>
   
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

  export default {
    props: ['params'],
    setup(props) {
      const data = props.params.data;
      function viewDelete() {
        alert('刪除')
      }
      function viewEdit() {
        // console.log(type);
        props.params.updateEditType(data);
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