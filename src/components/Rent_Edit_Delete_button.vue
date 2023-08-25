<template>
  <div class='button_wrap'>
    <button class='btn' @click="deleteRow('刪除')">刪除</button>
  </div>
</template>

<script>
export default {
  props: ['params', 'parentRef'],
  setup(props) {
    function deleteRow(s) {

      // const index = props.params.data.index;
      const rowNode = props.params.node;
      props.params.api.applyTransaction({remove: [rowNode.data]});
      console.log(props.params);
      props.params.lose(props.params.data.id);
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