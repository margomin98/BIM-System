<template>
  <div class='button_div'>
    <button @click="viewDetails()">檢視</button>
    <button class="btn_edit" @click="viewEdit()">編輯</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';


export default {
  props: ['params'],
  setup(props) {
    const router = useRouter();
    const search_id = props.params.data.AssetsId;

    function viewDetails() {
      if (search_id !== '') {
        router.push({ name: 'Assets_View', query: { search_id } });
      }
    }

    function viewEdit() {
      if (search_id !== '') {
        router.push({ name: 'Assets_Edit', query: { search_id } });
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

.button_div {
  justify-content: center;

  :nth-child(1) {
    @include datagrid_view_button;
    height: 25px;
  }

  button:nth-child(1):hover {
    background: #1D7072;
    color: white
  }

  .btn_edit {
    @include datagrid_edit_button;
    height: 25px;
    &:hover {
      background: #3B6162;
      color: white
    }
  }
  .disabled {
    @include disabled_btn;
    height: 25px;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
}</style>