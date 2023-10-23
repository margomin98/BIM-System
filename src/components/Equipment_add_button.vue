<template>
  <div>
    <button type="button" class="btn btn-primary" @click="add()">+</button>
  </div>
</template>

<script>
  export default {
    props: ['params','action'],
    setup(props,{emit}) {
      function add() {
        const action = props.action;
        const data = props.params.data
        if (numberIsValid()) {
          // 選擇數量在範圍內
          // 根據參數action來決定這次按下按鈕是屬於更換還是新增
          // console.log(props.params);
          switch (action) {
            case 'edit':
              // only for edit equipment page
              // props.params.editAssetList(data);
              emit('editAssetList',data)
              break;
            case 'add':
              // for new & edit equipment page
              // console.log(data);
              // props.params.addAssetList(data);
              emit('addAssetList',data)
              break;
          }
        } else {
          if (!props.params.data.selectNumber) {
            alert('所選數量不得為零')
          } else {
            alert('所選數量超過最大數量上限');
          }
        }
      }
      const numberIsValid = () => {
        const data = props.params.data
        // 檢查選擇數量是否正常 1.超過 2.為零 3.正常執行
        if (data.selectNumber > data.OM_Number || !data.selectNumber ) {
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