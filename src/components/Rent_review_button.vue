<template>
  <div class='button_wrap'>
    <button @click="viewDetails()">檢視</button>
    <button @click="viewEdit()">編輯</button>
  </div>
</template>

<script>
// import router from '@/router';
import { useRouter } from 'vue-router';


export default {
  props: ['params'],
  setup(props) {
    const router = useRouter();
    const search_id = props.params.data.AI_ID;

    function viewDetails() {
      // console.log(props.params.data.AI_ID);
      if (search_id !== '') {
        router.push({ name: 'Store_View', query: { search_id } });
      }
    }

    function viewEdit() {
      // console.log(props.params.data.search_id);
      if (search_id !== '') {
        router.push({ name: 'Store_Edit', query: { search_id } });
      }
    }
    return { 
      viewDetails,
      viewEdit,
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
    height: 25px;
  }

  button:nth-child(1):hover {
    background: #1D7072;
    color: white
  }

  :nth-child(2) {
    @include datagrid_edit_button;
    height: 25px;
  }

  button:nth-child(2):hover {
    background: #3B6162;
    color: white
  }
}</style>