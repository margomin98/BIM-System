<template>
  <div class='button_wrap'>
    <button :class="{ disabled_btn: isDisabled, btn: !isDisabled}" @click="viewDelete()" :disabled="isDisabled">刪除</button>
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
      const search_id = props.params.data.AO_ID;
      const isDisabled = ref(false);
      onMounted(() => {
        checkButton();
      });
      function viewDelete() {
        // console.log(props.params.data.search_id);
        if (search_id !== '') {
          router.push({
            name: 'Rent_Process_Delete',
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