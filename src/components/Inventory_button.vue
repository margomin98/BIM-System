<template>
  <div class='button_wrap'>
    <button @click="view('View')">檢視</button>
    <button @click="view('Edit')">編輯</button>
    <button @click="view('Process')">盤點</button>
    <button @click="view('Balance')">平帳</button>
    <button @click="view('Balance_Result')">結果</button>
  </div>
</template>

<script>
// import router from '@/router';
import { useRouter } from 'vue-router';


export default {
  props: ['params'],
  setup(props) {
    const router = useRouter();
    const search_id = props.params.data.PlanId;

    function view(type) {
      if (search_id !== '') {
        switch (type) {
          case 'View':
            router.push({ name: 'Inventory_View', query: { search_id } });
            break;
          case 'Edit':
            router.push({ name: 'Inventory_View', query: { search_id } });
            break;
          case 'Process':
            router.push({ name: 'Inventory_Process', query: { search_id } });
            break;
          case 'Balance':
            router.push({ name: 'Inventory_Balance', query: { search_id } });
            break;
          case 'Balance_Result':
            router.push({ name: 'Inventory_Balance_Result', query: { search_id } });
            break;
        }
      }
    }

    function viewEdit() {
      if (search_id !== '') {
        router.push({ name: 'Inventory_Edit', query: { search_id } });
      }
    }
    return { 
      view,
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
   &:hover {
    background: #1D7072;
    color: white
  }

  }

  :nth-child(2) {
    @include datagrid_edit_button;
    height: 25px;
     &:hover {
    background: #3B6162;
    color: white
  }
  }

  :nth-child(3) {
    @include datagrid_inform_button;
    height: 25px;
    width:50px;
   &:hover {
    background: #64a1a3;
    color: white
  }

  }

  :nth-child(4) {
    @include datagrid_pass_button;
    height: 25px;
     &:hover {
    background: #597c7c;
    color: white
  }
  }

  :nth-child(5) {
    @include datagrid_result_button;
    height: 25px;
   &:hover {
    background: #1D7072;
    color: white
  }

  }



}
</style>