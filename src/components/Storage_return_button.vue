<template>
  <div class='button_wrap'>
    <button @click="alertclick()">檢視</button>
    <button >編輯</button>
  </div>
</template>

<script>
// import router from '@/router';
import { useRouter } from 'vue-router';


export default {
  props: ['params'], // 声明 params 为 props
  setup(props) {
    const router = useRouter();

    async function alertclick() {
      // console.log(props.params.data.AI_ID);
      const AI_ID = props.params.data.AI_ID;
      if (AI_ID !== '') {
        router.push({ name: 'Store_View', query: { AI_ID } });
      }
    }
    return { 
      alertclick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.button_wrap {
  justify-content: center;

  :nth-child(1) {
    @include datagrid_view_button;
  }

  button:nth-child(1):hover {
    background: #1D7072;
    color: white
  }

  :nth-child(2) {
    @include datagrid_edit_button
  }

  button:nth-child(2):hover {
    background: #3B6162;
    color: white
  }
}</style>