<template>
  <button class='btn' @click="props.function(props.parameter1)">刪除</button>
</template>

<script setup>
  const props = defineProps(['function' , 'parameter1'])
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
.btn{
  @include delete_button;
  height: 25px;
   &:hover {
      background: #FF7272
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