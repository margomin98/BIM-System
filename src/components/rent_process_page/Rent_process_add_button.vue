<template>
  <div>
    <button type="button" class="btn btn-primary" @click="add()">+</button>
  </div>
</template>

<script>
  export default {
    props: ['params','selectedNumber','Number'],
    setup(props,{emit}) {
      function add() {
        // 目前已選擇數量
        const selectedNumber = props.selectedNumber;
        // 所需數量
        const Number = props.Number;
        if (numberIsValid(selectedNumber , Number)) {
          // API將物品從資料庫扣除後，更新rowData
          emit('SubtractFromInventory', props.params.data);
        } else {
          if (!props.params.data.selectNumber) {
            alert('所選數量不得為零')
          } else {
            alert('所選數量超過所需數量上限');
          }
        }
      }
      /**
       * 檢查選擇數量是否正常
       * @param {number} selectedNumber 已選擇數量
       * @param {number} Number 所需數量
       * @returns {boolean} 不正常:false / 正常: true
       */
      const numberIsValid = (selectedNumber,Number) => {
        const data = props.params.data
        //  1.超過 2.為零 3.正常執行
        if ((data.selectNumber + selectedNumber) > Number || !data.selectNumber ) {
          // 1. || 2.
          return false;
        }
        // 2. 正常執行
        return true;
      }
      return {
        add,
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
</style>