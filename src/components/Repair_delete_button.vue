<template>
  <div class='button_wrap'>
    <button :class="{ disabled_btn: isDisabled, btn: !isDisabled}" @click="viewDelete()" :disabled="isDisabled">刪除</button>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  export default {
    setup(props) {
      const router = useRouter();
      const search_id = props.params.data.RepairId
      const isDisabled = ref(false);
      onMounted(() => {
        checkButton();
      });
      function viewDelete() {
        router.push({
          name: 'Repair_Delete',
          query: {
            search_id
          }
        });
      }
      function checkButton() {
        const disabledStatus = props.params.data.Status;
        if (disabledStatus !== '待交付') {
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
.button_wrap{
   display:flex;
  align-items:center;

.btn{
  @include delete_button;
  height: 25px;
   &:hover {
      background: #FF7272
    }
}

.disabled_btn{
  @include disabled_btn;
  height: 25px;
  width: 50px;
  &:hover{
      @include disabled_btn;
  width: 50px;
  }
}
}
</style>