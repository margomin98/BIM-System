<template>
  <div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="searchByRow()">搜索庫存</button>
  </div>
</template>

<script>
export default {
  props: ['params'],
  setup(props,{emit}) {
    function searchByRow() {

      // const rowNode = props.params.node;
      // props.params.api.applyTransaction({remove: [rowNode.data]});
      // console.log(props.params);

      // ag-grid api
      // props.params.searchList(props.params.data);

      emit('searchList',props.params.data) 
    }
    return {
      searchByRow,
    }
  }
}
</script>


<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  button {
    @include empty_btn;
    height: 25px;
    width: 80px;
    font-size: 15px;
    &:hover {
      background-color: #5e7aa2;
      height: 25px;
      width: 80px;
      font-size: 15px;
    }
  }
</style>