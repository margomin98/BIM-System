<template>
  <div class='button_wrap'>
    <button @click="alertclick('檢視')">檢視</button>
    <button @click="alertclick('通知入庫')">通知入庫</button>
        <button @click="alertclick('交付')">交付</button>
    <button @click="alertclick('入庫')">入庫</button>
  </div>
</template>

<script>
export default {
   setup(props){
      function alertclick(s) {
        alert("hi")
      }
      return {alertclick}
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

  .button_wrap{
     :nth-child(1){
  @include datagrid_view_button;
} 
     :nth-child(2){
  @include datagrid_inform_button;
} 
     :nth-child(3){
  @include datagrid_pass_button;
} 
     :nth-child(4){
  @include datagrid_edit_button;
} 
button:nth-child(1):hover{
       background: #1D7072;
       color:white
    }
    button:nth-child(2):hover{
       background: #64a1a3;
       color:white
    }
    button:nth-child(3):hover{
       background: #597c7c;
       color:white
    }
    button:nth-child(4):hover{
       background: #3B6162;
       color:white
    }
  }
</style>