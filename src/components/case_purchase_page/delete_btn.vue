<template>
  <div class='button_div'>
    <button :class="{ disabled_btn: isDisabled, btn: !isDisabled }" @click="viewDelete()"
      :disabled="isDisabled">刪除</button>
  </div>
</template>

<script setup>
// import router from '@/router';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CasePurchase_Delete } from '@/assets/js/enter_status';
const props = defineProps(['params']);
const router = useRouter();
const status = props.params.data.Status;
const search_id = props.params.data.PP_ID;
const isDisabled = ref(false);
onMounted(() => {
  checkButton();
});
function viewDelete() {
  // console.log(props.params.data.search_id);
  if (search_id !== '') {
    router.push({
      name: 'Case_Purchase_Delete',
      query: {
        search_id
      }
    });
  }
}
function checkButton() {
  if (!CasePurchase_Delete.includes(status)) {
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
      width: 50px;
    }
  }
}
</style>