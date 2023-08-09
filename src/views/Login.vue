<template>
  <div class="home">
 <div class="container-fluid d-flex">
  <div class="col-xl-6 col-lg-6 col-md-6 col-12 left">
<div class="logo">
  <img src="../assets/login/login_logo.png" alt="logo">
</div>
<div class="human text-center">
  <img src="../assets/login/login_img.png" alt="任務">
</div>
  </div>
  <div class="col-xl-6 col-lg-6 col-md-6 col-12 right">
<div class="title">
  <h1>
  資產管理系統
  </h1>
</div>
<div class="form">
  <p>帳號</p>
  <input class="text_input" type="text">
  <p class="mt-3">密碼</p>
  <input  class="text_input" type="text">
  <div class="tick">
    <input type="checkbox">記住我
  </div>
</div>
<div class="login_btn">
  <router-link to="/home">
  <button>登錄</button>
  </router-link>
</div>
  </div>
 </div>
  </div>
</template>

<script>


export default {
  name: 'Login',

}
</script>

<style lang="scss" scoped>
.left{
  display: flex;
    flex-direction: column;
    .logo{
      margin:20px;
      text-align: left;
    }
}
.right{
  padding-right: 10%;
    margin-top: 13%;
  h1{
    color: #132238;
    font-size: 65px;
    font-weight: 700;
    margin-bottom: 40px;
    text-align: center;
  }
  .form{
    margin:auto;
    width: 350px;
   
    p{
       margin-bottom: 5px;
      font-size: 25px;
    font-weight: 700;
    text-align: left;
    }
    .text_input{
      width: 100%;
    border: none;
    height: 45px;
    border-radius: 5px;
    background: #A7AFBB;
    }
  }
  .tick{
    margin-top: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: 700;
    input{
      box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.25);
      margin-right: 10px;
    }
  }
  .login_btn{
    text-align: center;
    button{
      width: 355px;
      color:white;
      font-weight: 700;
      border-radius: 10px;
      margin:50px auto 0;
      height: 45px;
background: var(--c-4, #132238);
    }
  }
}
.home{
  background-image: url('../assets/login/login_bg.png');
  height: 100vh;
}
</style>
