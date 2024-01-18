<template>
  <div class="main_section">
    <Navbar />
        <div class="title col">
    <h1>
            快速入庫
      </h1>
        </div>
        

    </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';

  export default {
    components:{
        Navbar
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';

  h1 {
        margin-top: 50px;
        text-align: center;
        font-weight: 600;
        @include title_color;
      }

      @media only screen and (min-width: 1200px) {
        .main_section{
            h1 {
        font-size: 55px;
      } 
        }
      }
      @media only screen and (min-width: 768px) and (max-width: 1199px) {
        .main_section{
            h1 {
        font-size: 55px;
      } 
        }
      }
      @media only screen and (max-width: 767px) {
        .main_section{
            h1 {
        font-size: 50px;
      } 
        }
      }
</style>