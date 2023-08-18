<template>
  <div class='button_wrap'>
    <button class='btn' @click="alertclick('搜索庫存')">搜索庫存</button>
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
.button_wrap{
  display:flex;
  align-items:center;

.btn{
  @include empty_btn;
   height:30px;
    width: 80px;
    border-radius: 7px;
align-items: center;
    display: inline-flex;
    justify-content: center;
    font-weight: 700;
    font-size: 15px;
  &:hover {
            background-color: #5d85bd;
          }
}
}
</style>