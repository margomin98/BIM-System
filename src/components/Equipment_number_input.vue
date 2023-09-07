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
        // props.params.updateData();
        const rowNode = props.params.node;
        console.log('rowNode:', rowNode);
        // 若input數量為0或空格 則選擇數量為0
        rowNode.data.selectNumber = selectNumber.value ? selectNumber.value : 0
        // 若input數量大於最大數量 則選擇數量為最大數量
        rowNode.data.selectNumber = rowNode.data.selectNumber > rowNode.data.OM_Number ? rowNode.data.OM_Number : selectNumber.value
        // 将整个更新后的数组重新应用到表格中
        setTimeout(()=>{
          props.params.api.applyTransaction({
            update: [rowNode.data]
          });
        },50);
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
      height: 30px;
      width: 100%;
    }
  }
</style>