<template>
  <div class='button_div'>
    <button class='btn' @click="viewDelete()">刪除</button>
  </div>
</template>

<script>
import {
  useRouter
} from 'vue-router';
export default {
  props: ['params'],
  setup(props) {
    const router = useRouter();
    const search_id = props.params.data.AR_ID
    function viewDelete() {
      router.push({
        name: 'Receive_Delete',
        query: {
          search_id
        }
      });
    }
    return {
      viewDelete,
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.button_div {
  display: flex;
  align-items: center;

  .btn {
    @include content_delete_button;
    height: 25px;

    &:hover {
      background: #FF7272
    }
  }

  .disabled_btn {
    @include disabled_btn;
    height: 25px;
    width: 50px;

    &:hover {
      @include disabled_btn;
      width: 50px;
    }
  }
}</style>