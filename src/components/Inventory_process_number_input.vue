<template>
  <div class="number-input-box">
    <input class="input-number" type="text" v-model="selectNumber" @change="changeSelectNumber()" />
  </div>
</template>

<script>
  import {
    ref,
    onMounted
  } from 'vue';
  export default {
    props: ['params'],
    setup(props, {emit}) {
      const data = props.params.data
      const selectNumber = ref('');
      onMounted(() => {
        // 如果有盤點過，將初始值帶入
        if(data.ActualNum || data.ActualNum === 0)
          selectNumber.value = data.ActualNum;
      });
      function changeSelectNumber() {
          const check = parseFloat(selectNumber.value);
          // 檢查輸入值，正常則進盤點function
          if(selectNumber.value === '') {
            // props.params.takeParams(data , selectNumber.value);
            emit('takeParams',data , selectNumber.value)
          }
          else {
            if(Number.isNaN(check)) {
              alert('輸入值非數字');
              selectNumber.value = ''
            }
            else {
              // props.params.takeParams(data , selectNumber.value);
              emit('takeParams',data , selectNumber.value)
            }
          }
        }
      return {
        selectNumber,
        changeSelectNumber,
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  button {
    @include datagrid_edit_button;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    font-weight: 700;
    font-size: 20px;
    &:hover {
      background: #3B6162;
      color: white
    }
  }
  .number-input-box {
    color: black;
    .input-number {
      height: 30px;
      width: 100%;
    }
  }
</style>