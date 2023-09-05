<template>
  <div class='button_wrap'>
    <button class='btn' @click="deleteRow()">刪除</button>
  </div>
</template>

<script>
export default {
  props: ['params', 'parentRef'],
  setup(props) {
    function deleteRow() {

      // const index = props.params.data.index;
      const rowNode = props.params.node;
      // const deletedData = rowNode.data;
      // const indexToDelete = props.parentRef.rowData.value.findIndex(item => item === deletedData);
      console.log(props.params.data);
      props.params.api.applyTransaction({remove: [rowNode.data]});
      const data = props.params.data;
      if(data.hasOwnProperty('item_id')) {
        props.params.insertDeleteList(data);
      }
      else
      props.params.removeItemList(data);
    }
    return {
      deleteRow
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.button_wrap {
  display: flex;
  align-items: center;

  .btn {
    @include delete_button;
height: 25px;
    &:hover {
      background: #FF7272
    }
  }

  .disabled_btn {
    @include disabled_btn;
    width: 50px;

    &:hover {
      @include disabled_btn;
      width: 50px;
    }
  }
}</style>