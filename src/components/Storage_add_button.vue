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
      // call API將物品從資料庫扣除後，加入出庫細項
      console.log(props.params.node);
      props.params.addMaterial(props.params.data);
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