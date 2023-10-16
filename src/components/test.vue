<template>
  <!-- Your custom content here -->
  <div class='button_div'>
    <button @click="viewDetails()">檢視</button>
    <button class="btn_emit" @click="emitParams()">傳送參數</button>
    <button class="btn_edit" @click="viewEdit()">編輯</button>
  </div>
</template>
  
<script>
import { useRouter } from 'vue-router';

export default {
  props: ['params','msg'],
  setup(props , {emit}) {
    const router = useRouter();
    function emitParams() {
      // emit('msg' , '傳送參數:'+search_id)
      // console.log(props.msg);
      emit('msg' , 'konichiwa, '+props.params.data.AssetsId)
    }
    function viewDetails() {
    const search_id = props.params.data.AssetsId;
      if (search_id !== '') {
        router.push({ name: 'Assets_View', query: { search_id } });
      }
    }

    function viewEdit() {
    const search_id = props.params.data.AssetsId;
      if (search_id !== '') {
        router.push({ name: 'Assets_Edit', query: { search_id } });
      }
    }

    return { 
      emitParams,
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

  .btn_emit {
    @include datagrid_inform_button;
    height: 25px;
    &:hover {
      background: #3B6162;
      color: white
    }
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
  