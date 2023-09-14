<template>
  <div class='button_wrap'>
    <button  @click="DeleteFn" >刪除</button>
  </div>
</template>

<script>
  // import router from '@/router';
  import {
    ref,
  } from 'vue';
  import {
    useRouter
  } from 'vue-router';
  export default {
    props: ['params'],
    setup(props) {
      const data = props.params.data;
      function DeleteFn() {
        props.params.deleteFromAssetList(data);
      }
      return {
        DeleteFn,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
.button_wrap{
   display:flex;
  align-items:center;

 button{
  @include delete_button;
  height: 25px;
   &:hover {
      background: #FF7272
    }
}


}
</style>