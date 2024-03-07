<template>
  <div class='button_wrap'>
    <button class='btn' @click="alertclick('刪除')">刪除</button>
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
  display: flex;
  align-items: center;

  .btn {
    @include content_delete_button;
    height: 25px;

    &:hover {
      background: #FF7272
    }
  }

  .disabled_btn {
    @include disabled_btn;
    height: 25px;
    width: 50px;

    &:hover {
      @include disabled_btn;
      width: 50px;
    }
  }
}</style>