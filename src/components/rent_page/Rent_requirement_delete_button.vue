<template>
  <div class='button_div'>
    <button class='btn' @click="deleteRow()">刪除</button>
  </div>
</template>

<script>
export default {
  props: ['params'],
  setup(props, { emit }) {
    function deleteRow() {
      // console.log(props.params.data);
      const type = props.params.data.item_id ? 'edit' : 'new'
      emit('deleteFromItemList', props.params.data, type);
    }
    return {
      deleteRow
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.button_div {
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    @include content_delete_button;
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
}
</style>