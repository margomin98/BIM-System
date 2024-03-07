<template>
  <div class='button_div'>
    <button class="btn" @click="viewDelete()">刪除</button>
  </div>
</template>

<script>
// import router from '@/router';
import {
  ref,
  onMounted
} from 'vue';
import {
  useRouter
} from 'vue-router';
export default {
  props: ['params'],
  setup(props) {
    const router = useRouter();
    const search_id = props.params.data.IntegrationId;
    const isDisabled = ref(false);
    onMounted(() => {
      // checkButton();
    });
    function viewDelete() {
      // console.log(props.params.data.search_id);
      if (search_id !== '') {
        router.push({
          name: 'Equipment_Delete',
          query: {
            search_id
          }
        });
      }
    }
    function checkButton() {
      const disabledStatus = props.params.data.Status;
      if (disabledStatus !== '已填報') {
        isDisabled.value = true;
      } else {
        isDisabled.value = false;
      }
    }
    return {
      viewDelete,
      isDisabled,
    };
  },
};
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