<template>
  <div class='button_wrap'>
    <button @click="alertclick('刪除')">刪除</button>
  </div>
</template>

<script>
  export default {
    setup(props) {
      function alertclick(s) {
        alert("hi")
      }
      return {
        alertclick
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .button_wrap {
    button {
      @include delete_button;
    }
    &:hover {
      background: #FF7272
    }
  }
</style>