<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <router-link class="navbar-brand" to="/home">
      <img class='logo_img' src="@/assets/navbar/logo.png" alt="logo">
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto d-flex">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="../assets/navbar/store.png" alt="入庫管理"> 入庫管理
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/case_purchase_datagrid">專案採購管理</router-link>
            <div class='dropdown-divider' style='border-color:white'></div>
            <router-link to="/order_datagrid">訂單管理</router-link>
            <div class='dropdown-divider' style='border-color:white'></div>
            <router-link to="/receive_new">新增收貨</router-link>
            <router-link to="/receive_datagrid">收貨管理</router-link>
            <div class='dropdown-divider' style='border-color:white'></div>
            <router-link to="/quick_store_new" class="d-flex speed_icon" style="flex-direction: row" @mouseover="changeImage" @mouseout="resetImage">
              <img :src="speedIcon" alt="快速入庫">快速入庫
            </router-link>
            <router-link to="/store_new">新品入庫</router-link>
            <router-link to="/store_return">歸還入庫</router-link>
            <router-link to="/store_datagrid">入庫填報管理</router-link>
            <div class='dropdown-divider' style='border-color:white'></div>
            <router-link to="/store_process_datagrid">入庫作業管理</router-link>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="../assets/navbar/deliver.png" alt="出庫管理"> 出庫管理
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/quick_rent_new" class="d-flex speed_icon" style="flex-direction: row" @mouseover="changeImage" @mouseout="resetImage">
              <img :src="speedIcon" alt="快速出庫">快速出庫
            </router-link>
            <router-link to="/rent_datagrid">出庫填報管理</router-link>
            <router-link to="/rent_process_datagrid">出庫作業管理</router-link>
            <router-link to="/rent_review_datagrid">出庫審核管理</router-link>
            <div class='dropdown-divider' style='border-color:white'></div>
            <router-link to="/ship_receive_datagrid">出貨簽收管理</router-link>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="../assets/navbar/file.png" alt="資產管理"> 資產管理
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/assets_datagrid">資產管理</router-link>
            <router-link to="/equipment_datagrid">設備整合管理</router-link>
            <router-link to="/inventory_datagrid">盤點管理</router-link>
            <router-link to="/assets_search">搜尋資產</router-link>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="../assets/navbar/manage.png" alt="總務管理"> 總務管理
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/repair_datagrid">維修管理</router-link>
            <router-link to="/scrap_datagrid">報廢管理</router-link>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="../assets/navbar/setting.png" alt="系統管理"> 系統管理
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/authority">權限管理</router-link>
            <router-link to="/system_parameter">參數管理</router-link>
            <router-link to="/system_log_datagrid">系統日誌管理</router-link>
          </div>
        </li>
      </ul>
      <div class='d-flex right_info'>
        <p class="username">{{ utilsStore.userName }}&nbsp;&nbsp;您好！</p>
        <div class='log_out_btn' @click="logout()" @touchstart="startTouch" @touchend="endTouch" @mouseover="hovered = true" @mouseout="hovered = false">
          <p class="logout">登出
            <img :src="hovered ? require('@/assets/navbar/logout_hover.png') : require('@/assets/navbar/logout.png')" alt="Image">
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import {
    useUtilsStore
  } from '@/store'
  import router from '@/router';
  import {
    onMounted,
    ref
  } from 'vue';
  const hovered = ref(false);
  const utilsStore = useUtilsStore();
  const emit = defineEmits(['username']);
  const speedIcon = ref(require('@/assets/navbar/speed.png')); // 快速的Icon
  const hoverImage = require('@/assets/navbar/speed_hover.png'); // 快速的Icon
  // Hover effect functions
  function changeImage() {
    speedIcon.value = hoverImage;
  }
  function resetImage() {
    speedIcon.value = require('@/assets/navbar/speed.png'); // 快速的Icon
  }
  // 登出按鈕手機的動作
  function startTouch() {
    hovered.value = true;
  }
  function endTouch() {
    hovered.value = false;
  }
  //登出function 沒有回傳值，正確直接回登入頁面
  async function logout() {
    const axios = require('axios');
    try {
      const response = await axios.post('http://192.168.0.177:7008/Account/LogOff');
      if (response.status === 200) {
        //登出成功，跳轉至首頁
        router.push('/');
      } else {
        throw new Error(response.data.messages);
      }
    } catch (error) {
      console.error('Error sending data to backend', error);
    }
  }
  onMounted(async() => {
    utilsStore.$reset();
    await utilsStore.getUserName();
    utilsStore.getDate();
    emit('username', utilsStore.userName); //收貨、入庫填報 edit修改後再移除
  });
</script>

<style lang="scss" scoped>
  .dropdown-menu {
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translate3d(0, -2%, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  }
  .log_out_btn {
    border: 1px dashed black;
    border-radius: 20px;
    width: 80px;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    p {
      align-items: center;
      display: flex;
      gap: 5px;
    }
    &:hover {
      color: white;
      border-color: white;
      background-color: rgb(113, 130, 148);
    }
  }
  nav {
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    background: linear-gradient(151deg, #0E2135 1.56%, #4A74A1 42.39%, #FFF 96.44%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    .navbar-collapse {
      padding: 20px 10px;
    }
    a {
      font-size: 18px;
      color: white;
      padding: 5px;
    }
    .right_info {
      p {
        margin-bottom: 0;
        font-weight: 700;
        font-size: 18px;
      }
    }
    ul {
      gap: 15px;
    }
    .dropdown-menu {
      border-radius: 0px 0px 5px 5px;
      background: #2D4864;
      box-shadow: 4px 2px 4px 0px rgba(0, 0, 0, 0.25);
      a {
        display: flex;
        padding: 0 10px;
        text-decoration: none;
        align-items: center;
        gap: 5px;
        &:hover {
          background: white;
          color: black
        }
      }
    }
    .nav-link:hover {
      background: #213d5d;
      border-radius: 5px;
    }
  }
  .navbar-nav .nav-link.show,
  .navbar-nav .nav-link:hover {
    color: white;
  }
  @media only screen and (min-width: 1200px) {
    nav {
      padding: 13px 19.749px 12px 20.5px;
      .navbar-collapse {
        justify-content: space-between;
        .right_info {
          align-items: center;
          p {
            display: flex;
            align-items: center;
            gap: 5px;
          }
        }
        ul {
          margin-left: 50px;
          a {
            display: flex;
            align-items: center;
            gap: 5px;
          }
        }
      }
      .dropdown-menu {
        margin-top: 10px;
        left: calc(100% - 111%);
        a {
          justify-content: center;
          gap: 5px;
          flex-direction: column;
        }
      }
    }
  }
 
  @media only screen and (max-width:993px) {
    nav {
      width: 100%;
      .logo_img {
        margin-top: 10px;
        width: 80%;
        height: 80%;
      }
      button {
        margin-right: 20px;
        border: #13223833 solid 1px;
      }
      .navbar-collapse {
        background: linear-gradient(151deg, #0E2135 1.56%, #4A74A1 42.39%, #FFF 96.44%);
   
        .right_info {
          margin-top: 20px;
        }
      }
      .dropdown-menu {
        margin-top: 15px;
        a {
          justify-content: left;
          margin: 10px 0;
        }
      }
    }
  }
  
  @media only screen and (max-width: 767px) {
    nav {
      .logo_img {
        margin-top: 10px;
        width: 80%;
        height: 80%;
      }
      button {
        margin-right: 20px;
        border: #13223833 solid 1px;
      }
      .navbar-collapse {
        background: linear-gradient(151deg, #0E2135 1.56%, #4A74A1 42.39%, #FFF 96.44%);
        .right_info {
          margin-top: 20px;
        }
      }
      .dropdown-menu {
        margin-top: 15px;
        a {
          justify-content: left;
          margin: 10px 0;
        }
      }
    }
  }
</style>