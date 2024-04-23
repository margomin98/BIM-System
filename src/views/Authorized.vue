<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <p class="alert_title">注意:您未具備本項操作權限!</p>
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
  .alert_title{
    color: #c92626;
    text-align: center;
    font-weight: 800;
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      p.alert_title {
        margin-top: 130px;
    font-size: 50px;
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      p.alert_title {
        margin-top: 130px;
    font-size: 50px;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      p.alert_title {
        width:250px;
        font-size: 35px;
    margin: 50px auto 0;
      }
    }
  }
</style>