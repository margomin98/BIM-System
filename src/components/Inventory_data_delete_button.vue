<template>
  <div class='button_wrap'>
    <button :class="{ disabled_btn: isDisabled, btn: !isDisabled}" @click="viewDelete()" :disabled="isDisabled">刪除</button>
  </div>
</template>

<script>
  import {
    onMounted,
    ref
  } from 'vue';
  import {
    useRouter
  } from 'vue-router';
  export default {
    setup(props) {
      const router = useRouter();
      const disabledStatus = props.params.data.PlanStatus;
      const search_id = props.params.data.PlanId;
      const isDisabled = ref(false);
      onMounted(() => {
        checkButton();
      });
      function viewDelete() {
        router.push({
          name: 'Inventory_Delete',
          query: {
            search_id
          }
        });
      }
      function checkButton() {
        console.log(disabledStatus);
        if (disabledStatus !== '待盤點') {
          isDisabled.value = true;
        }
      }
      return {
        viewDelete,
        isDisabled,
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
      height: 25px;
      width: 50px;
      &:hover {
        @include disabled_btn;
        height: 25px;
        width: 50px;
      }
    }
  }
</style>