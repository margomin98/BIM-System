<template>
  <div class="navbar">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link class="navbar-brand" to="/home">
        <img class='logo_img' src="@/assets/navbar/logo.png" alt="logo">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="../assets/navbar/store.png" alt="入庫管理"> 入庫管理
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/order_datagrid">訂單管理</router-link>
              <div class='dropdown-divider' style='border-color:white'></div>
              <router-link to="/receive_new">新增收貨</router-link>
              <router-link to="/receive_datagrid">收貨管理</router-link>
              <div class='dropdown-divider' style='border-color:white'></div>
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
              <router-link to="/rent_datagrid">出庫填報管理</router-link>
              <router-link to="/rent_process_datagrid">出庫作業管理</router-link>
              <router-link to="/rent_review_datagrid">出庫審核管理</router-link>
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
          <p class="username">{{ userName }}&nbsp;&nbsp;您好！</p>
          <div class='log_out_btn' @click="logout()"  @touchstart="startTouch" @touchend="endTouch" @mouseover="hovered = true" @mouseout="hovered = false">
            <p class="logout">登出
              <img :src="hovered ? require('@/assets/navbar/logout_hover.png') : require('@/assets/navbar/logout.png')" alt="Image">
            </p>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import router from '@/router';
  import {
    onMounted,
    ref
  } from 'vue';
  export default {
    data() {
    return {
      hovered: false
    };
  },
  // 登出按鈕手機的動作
  methods: {
    startTouch() {
      this.hovered = true;
    },
    endTouch() {
      this.hovered = false;
    }
  },
    name: 'Navbar',
    setup(props,{emit}) {
      const userName = ref('');
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
      //取得navbar使用者名稱
      async function getUserName() {
        const axios = require('axios');
        try {
          const response = await axios.get('http://192.168.0.177:7008/GetDBdata/GetApplicant');
          // console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            //接收成功，顯示使用者名稱
            // console.log(data.messages);
            userName.value = data.resultList.Applicant;
            emit('username',data.resultList.Applicant);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          } else {
            alert(data.messages);
            throw new Error(data.messages);
          }
        } catch (error) {
          console.error('Error sending data to backend', error);
        }
      }
      onMounted(() => {
        getUserName();
      });
      return {
        userName,
        logout,
      }
    },
  }
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
  .log_out_btn{
    border: 1px dashed black;
    border-radius: 20px;
    width: 80px;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    p{
      align-items: center;
    display: flex;
    gap: 5px;
    }
    &:hover{
      color: white;
      border-color: white;
      background-color: rgb(113, 130, 148);
    }
  }
  @media only screen and (min-width: 1200px) {
    .navbar-nav .nav-link.active,
    .navbar-nav .nav-link.show {
      color: white;
    }
    .navbar {
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      background: linear-gradient(151deg, #0E2135 1.56%, #4A74A1 42.39%, #FFF 96.44%);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      .nav-link:hover {
        background: #213d5d;
        border-radius: 5px;
      }
      nav {
        padding: 13px 19.749px 12px 20.5px;
        a {
          font-size: 18px;
          color: white;
          padding: 5px;
        }
        .navbar-collapse {
          justify-content: space-between;
          .right_info {
            align-items: center;
            p {
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 0;
              display: flex;
              align-items: center;
              gap: 5px;
            }
          }
          ul {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-left: 50px;
            a {
              display: flex;
              align-items: center;
              gap: 5px;
            }
          }
        }
        .dropdown-menu {
          border-radius: 0px 0px 5px 5px;
          background: #2D4864;
          box-shadow: 4px 2px 4px 0px rgba(0, 0, 0, 0.25);
          margin-top: 10px;
          left: calc(100% - 111%);
          a {
            padding: 0 10px;
            text-decoration: none;
            justify-content: center;
            align-items: center;
            gap: 5px;
            flex-direction: column;
            display: flex;
            &:hover {
              background: white;
              color: black
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .navbar-nav .nav-link.active,
    .navbar-nav .nav-link.show {
      color: white;
    }
    .navbar {
      padding: 0;
      width: 100%;
      display: flex;
      align-items: center;
      nav {
        background: linear-gradient(151deg, #0E2135 1.56%, #4A74A1 42.39%, #FFF 96.44%);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        a {
          font-size: 18px;
          color: white;
          padding: 0 5px;
        }
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
          justify-content: space-between;
          padding: 20px 10px;
          ul {
            display: flex;
            gap: 15px;
          }
          .right_info {
            font-size: 18px;
            font-weight: 800;
            margin-top: 20px;
            p {
              font-size: 18px;
              margin-bottom: 0;
              display: flex;
              align-items: center;
              gap: 5px;
            }
          }
        }
        .dropdown-menu {
          border-radius: 0px 0px 5px 5px;
          background: #2D4864;
          box-shadow: 4px 2px 4px 0px rgba(0, 0, 0, 0.25);
          margin-top: 15px;
          left: -15%;
          a {
            padding: 2px 10px;
            text-decoration: none;
            justify-content: left;
            align-items: start;
            display: flex;
            margin: 5px 0;
            &:hover {
              background: white;
              color: black;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .navbar-nav .nav-link.active,
    .navbar-nav .nav-link.show {
      color: white;
    }
    .navbar {
      padding: 0;
      width: 100%;
      display: flex;
      align-items: center;
      nav {
        background: linear-gradient(151deg, #0E2135 1.56%, #4A74A1 42.39%, #FFF 96.44%);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        a {
          font-size: 18px;
          color: white;
          padding: 0 5px;
        }
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
          justify-content: space-between;
          padding: 20px 10px;
          ul {
            display: flex;
            gap: 15px;
          }
          .right_info {
            font-size: 18px;
            margin-top: 20px;
            font-weight: 800;
            p {
              margin-bottom: 0;
            }
          }
        }
        .dropdown-menu {
          border-radius: 0px 0px 5px 5px;
          background: #2D4864;
          box-shadow: 4px 2px 4px 0px rgba(0, 0, 0, 0.25);
          margin-top: 15px;
          a {
            padding: 0 10px;
            text-decoration: none;
            justify-content: center;
            align-items: start;
            gap: 5px;
            flex-direction: column;
            display: flex;
            margin: 10px 0;
            &:hover {
              background: white;
              color: black;
            }
          }
        }
      }
    }
  }
</style>