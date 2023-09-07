<template>
  <div>
    <button type="button" class="btn btn-primary" @click="add()">
          +
            </button>
  </div>
</template>

<script>
  export default {
    props: ['params'],
    setup(props) {
      function add() {
        const data = props.params.data
        if (props.params.numberIsValid(data)) {
          // 選擇數量在範圍內
          // 根據參數action來決定這次按下按鈕是屬於編輯還是新增
          const action = props.params.action
          // alert(props.params.action)
          console.log(props.params);
          switch (action) {
            case 'edit':
              break;
            case 'add':
              // console.log(data);
              props.params.addAssetList(data);
              break;
          }
        } else {
          if (props.params.data.selectNumber === 0) {
            alert('所選數量不得為零')
          } else {
            alert('所選數量超過最大數量上限');
          }
        }
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