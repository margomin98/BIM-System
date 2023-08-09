<template>
  <div class="navbar">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link class="navbar-brand" to="/home">
        <img src="@/assets/navbar/logo.png" alt="logo">
      </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="../assets/navbar/store.png" alt="入庫管理">
          入庫管理
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
         <router-link to="/store_new">新品入庫</router-link>
         <router-link to="">歸還入庫</router-link>
         <router-link to="store_datagrid">入庫填報管理</router-link>
         <router-link to="/">入庫作業</router-link>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="../assets/navbar/deliver.png" alt="出庫管理">
          出庫管理
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
         <router-link to="">出口填報</router-link>
         <router-link to="">出庫作業</router-link>
         <router-link to="">出庫審核</router-link>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="../assets/navbar/file.png" alt="資產管理">
          資產管理
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
         <router-link to="">資產管理</router-link>
         <router-link to="">設備集成管理</router-link>
         <router-link to="">盤點管理</router-link>
         <router-link to="">搜尋資產</router-link>
        </div>
      </li>      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="../assets/navbar/setting.png" alt="系統管理">
          系統管理
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
         <router-link to="">權限管理</router-link>
         <router-link to="">參數管理</router-link>
        </div>
      </li>
    </ul>
  
  </div>

  <p class="username">您好！Admin</p>
  <p class="logout">登出
    <img src="../assets/navbar/logout.png" alt="登出">
  </p>
</nav>

  </div>
</template>

<script>

export default {
    name: 'Navbar',
}
</script>

<style lang="scss" scoped>
.navbar{
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background: linear-gradient(151deg, #0E2135 1.56%, #4A74A1 42.39%, #FFF 96.44%);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
nav{
  padding: 13px 19.749px 12px 20.5px;
  a{
    font-size: 18px;
    color:white;
    padding: 0 5px;
  }
  .navbar-collapse ul{
    display: flex;
align-items: center;
gap: 15px;
margin-left: 50px;
  }
.dropdown-menu{
    border-radius: 0px 0px 5px 5px;
    background: #2D4864;
    box-shadow: 4px 2px 4px 0px rgba(0, 0, 0, 0.25);
    margin-top: 15px;
a{
  padding: 0 10px;
  text-decoration: none;
    justify-content: center;
    align-items: center;
    gap: 5px;
  flex-direction: column;
    display: flex;
    &:hover{
      background:white;
      color:black
    }
}
  }
.username{
  margin-right: 20px;
  font-size: 18px;
  margin-bottom: 0;
}
.logout{
  font-size: 18px;
  margin-bottom: 0;
}
}
  }
</style>