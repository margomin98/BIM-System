<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>注意:您未具備本項操作權限!</h1>
    </div>
    <div class="text-center">
      <img src="../assets/authorized.png" alt="權限不足">
    </div>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue';
  export default {
    components: {
      Navbar
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  @media only screen and (min-width: 1200px) {
    .main_section {
      h1 {
        margin-top: 150px;
        color: #c92626
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      h1 {
        margin-top: 150px;
        color: #c92626
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      h1 {
        padding: 0 5%;
        font-size: 40px;
        color: #c92626
      }
    }
  }
</style>