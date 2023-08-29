<template>
  <div class='button_wrap'>
    <button class='btn' @click="addDeleteList()">刪除</button>
  </div>
</template>

<script>
  export default {
    setup(props) {
      function addDeleteList() {
        // API將物品還回去之後，將物品從資料中刪除
        const rowNode = props.params.node;
        props.params.api.applyTransaction({remove: [rowNode.data]});
        // alert("hiii")
      }
      return {
        addDeleteList,
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
  @include delete_button;
  height: 25px;
   &:hover {
      background: #FF7272
    }
}

.disabled_btn{
  @include disabled_btn;
  height: 25px;
  width: 50px;
  &:hover{
      @include disabled_btn;
  width: 50px;
  }
}
}
</style>