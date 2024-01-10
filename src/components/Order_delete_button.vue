<template>
  <div class='button_div'>
    <button :class="{ disabled_btn: isDisabled, btn: !isDisabled}" @click="viewDelete()" :disabled="isDisabled">刪除</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Order_Delete } from '@/assets/js/enter_status';
import { onMounted, ref } from 'vue';
const props = defineProps(['params']);
const router = useRouter();
const search_id = props.params.data.PO_ID
const isDisabled = ref(false);
onMounted(() => {
  checkButton();
});
function viewDelete() {
  router.push({
    name: 'Order_Delete',
    query: {
      search_id
    }
  });
}
function checkButton() {
  const disabledStatus = props.params.data.Status;
  if (!Order_Delete.includes(disabledStatus)) {
    isDisabled.value = true;
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.button_div {
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
    &:hover{
      @include disabled_btn;
      height: 25px;
      width: 50px;
    }
  }
}
</style>