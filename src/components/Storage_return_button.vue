<template>
  <div class='button_wrap'>
    <button @click="alertclick('檢視')">檢視</button>
    <button @click="alertclick('編輯')">編輯</button>
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
@import '@/assets/css/global.scss';

.button_wrap{
     justify-content:center;
  :nth-child(1){
  @include datagrid_view_button;
} 
button:nth-child(1):hover{
       background: #1D7072;
       color:white
    }
  :nth-child(2){
  @include datagrid_edit_button
} 
button:nth-child(2):hover{
       background: #3B6162;
       color:white
    }
}

</style>