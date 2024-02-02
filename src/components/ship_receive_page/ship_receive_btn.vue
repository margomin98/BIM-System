<template>
  <div class='button_div'>
    <button @click="view('Ship_Receive_View')">檢視</button>
    <button class="btn_edit" @click="view('Ship_Receive_Confirm')">上傳簽收</button>
  </div>
</template>

<script setup>
import router from '@/router';

const props = defineProps(['params']);
const search_id = props.params.data.AO_ID;
const view = (name)=>{
  router.push({name: name, query: { search_id }});
}
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
    width: 75px;
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
