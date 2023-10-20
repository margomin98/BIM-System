<template>
  <div class='button_div'>
    <button class="view_btn" @click="view">檢視</button>
  </div>
</template>

<script>
  // import router from '@/router';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    props: ['params'],
    setup(props) {
      const router = useRouter();
      const search_id = props.params.data.Account;
      const isDisabled = ref(false);
      onMounted(() => {
        // checkButton();
      });
      function view() {
        // console.log(props.params.data.search_id);
        if (search_id !== '') {
          router.push({
            name: 'System_Log_View',
            query: {
              search_id
            }
          });
        }
      }
      // function checkButton() {
      //   const disabledStatus = props.params.data.Status;
      //   if (disabledStatus === '待入庫' || disabledStatus === '已入庫' || disabledStatus === '已歸還') {
      //     isDisabled.value = true;
      //   } else {
      //     isDisabled.value = false;
      //   }
      // }
      return {
        view,
        isDisabled,
      };
    },
  };
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .view_btn{
    @include datagrid_view_button;
    height: 25px;
    &:hover {
      background: #1d7072;
      color: white;
    }
  }
</style>