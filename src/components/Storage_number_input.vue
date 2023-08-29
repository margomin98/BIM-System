<template>
  <div class="number-input-box">
    <input class="input-number" type="number" min="1" v-model="selectNumber" :max="maxNumber" @input="changeSelectNumber()" />
  </div>
</template>

<script>
  import {
    ref,
    onMounted
  } from 'vue';
  export default {
    props: ['params'],
    setup(props) {
      const maxNumber = props.params.data.OM_Number;
      const selectNumber = ref(1);
      onMounted(() => {
        // console.log(props.params.data.OM_Number);
        selectNumber.value = props.params.data.OM_Number;
      });
      function changeSelectNumber() {
        const rowNode = props.params.node;
        // 更新特定行的 selectNumber 字段
        if(selectNumber.value) {
          rowNode.data.selectNumber = selectNumber.value;
          // 将整个更新后的数组重新应用到表格中
          props.params.api.applyTransaction({
            update: [rowNode.data]
          });
        }
      }
      return {
        maxNumber,
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
      width: 100%;
    }
  }
</style>