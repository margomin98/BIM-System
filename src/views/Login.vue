<template>
  <div class="home">
    <div class="container-fluid d-flex">
      <div class="col-xl-6 col-lg-6 col-md-12 col-12 left">
        <div class="logo">
          <img src="../assets/login/login_logo.png" alt="logo">
        </div>
        <div class="human text-center">
          <img src="../assets/login/login_img.png" alt="任務">
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-12 col-12 right">
        <div class="title">
          <h1>
            資產管理系統
          </h1>
        </div>
        <div class="form">
          <p>帳號</p>
          <input class="text_input" type="text" @keyup.enter="login" v-model="formParams.userName">
          <p class="mt-3">密碼</p>
          <input class="text_input" type="password" @keyup.enter="login" v-model="formParams.userPassword">
          <span style="color: rgb(243, 22, 22);">{{ errorHint }}</span>
          <label class="tick" for="RememberMe">
            <input type="checkbox" v-model="formParams.RememberMe" id="RememberMe">記住我
          </label>
        </div>
        <div class="login_btn">
          <button @click="login">登錄</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    onMounted,
    reactive,
    ref
  } from 'vue'
  import router from '@/router';
  import axios from 'axios';
import { GetAntiForgeryToken } from '@/assets/js/common_api';
  export default {
    name: 'Login',
    setup() {
      const formParams = reactive({
        userName: '',
        userPassword: '',
        RememberMe: false,
      })
      const errorHint = ref('');
      onMounted(()=>{
        // 檢查是否有已登入(有cookie)
        checkCookieIsExist();
      });
      // 登入
      async function login() {
        const form = new FormData();
        for(const key in formParams) {
          form.append(key, formParams[key]);
        }
        const axios = require('axios');
        try {
          const token = await GetAntiForgeryToken();
          const response = await axios.post('http://192.168.0.177:7008/Account/Login', form,{
            headers: {
              'RequestVerificationToken': token,
            }
          });
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            //接收成功，跳轉至首頁
            errorHint.value = '';
            router.push('/home');
          } else if (data.state === 'error') {
            // alert(data.messages);
            var hint = data.messages.toString().replace(/[\[\]"]/g, "");
            errorHint.value = hint;
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function checkCookieIsExist() {
        try {
          const response = await axios.get('http://192.168.0.177:7008/GetDBdata/GetApplicant');
          const data = response.data;
          if (data.state === 'success') {
            console.log('申請人名稱:', data.resultList.Applicant);
            router.push('/home');
          } 
        } catch (error) {
          console.error('申請人取得失敗:',error);
        }
      }
      return {
        formParams,
        errorHint,
        login,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .text_input {
    padding: 0 10px;
  }
  @media only screen and (min-width: 1200px) {
    .home {
      background-image: url('../assets/login/login_bg.png');
      height: 100vh;
      background-repeat: no-repeat;
      background-size: cover;
      .left {
        display: flex;
        flex-direction: column;
        .logo {
          margin: 20px;
          text-align: left;
        }
      }
      .right {
        margin-top: 13%;
        padding: 0 18% 0 8%;
        h1 {
          color: #132238;
          font-size: 60px;
          white-space: nowrap;
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }
        .form {
          margin: auto;
          p {
            margin-bottom: 5px;
            font-size: 25px;
            font-weight: 700;
            text-align: left;
          }
          .text_input {
            width: 100%;
            border: none;
            height: 45px;
            border-radius: 5px;
            background: #A7AFBB;
          }
        }
        .tick {
          margin-top: 20px;
          text-align: left;
          font-size: 20px;
          font-weight: 700;
          input {
            box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.25);
            margin-right: 10px;
          }
        }
        .login_btn {
          text-align: center;
          button {
            width: 100%;
            color: white;
            font-weight: 700;
            border-radius: 10px;
            margin: 50px auto 0;
            height: 45px;
            background: var(--c-4, #132238);
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .home {
      background-image: url('../assets/login/login_bg_md.png');
      height: 100vh;
      background-repeat: no-repeat;
      background-size: cover;
      div {
        flex-direction: column;
      }
      .left {
        display: flex;
        align-self: center;
        text-align: center;
        .human {
          img {
            display: none;
          }
        }
        .logo {
          margin-top: 70px;
        }
      }
      .right {
        margin: 13% auto 0;
        width: 500px;
        h1 {
          color: #132238;
          font-size: 50px;
          margin-bottom: 40px;
        }
        .form {
          margin: auto;
          p {
            margin-bottom: 5px;
            font-size: 25px;
            font-weight: 700;
            text-align: left;
          }
          .text_input {
            width: 100%;
            border: none;
            height: 45px;
            border-radius: 5px;
            background: #A7AFBB;
          }
        }
        .tick {
          margin-top: 20px;
          text-align: left;
          font-size: 20px;
          font-weight: 700;
          input {
            box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.25);
            margin-right: 10px;
          }
        }
        .login_btn {
          text-align: center;
          button {
            width: 100%;
            color: white;
            font-weight: 700;
            border-radius: 10px;
            margin: 50px auto 0;
            height: 45px;
            background: var(--c-4, #132238);
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .home {
      background-image: url('../assets/login/login_bg_xs.png');
      height: 100vh;
      background-repeat: no-repeat;
      background-size: cover;
      div {
        flex-direction: column;
      }
      .left {
        .human {
          display: none;
        }
        .logo {
          text-align: center;
          margin: 40px 20px 20px;
        }
      }
      .right {
        margin-top: 80px;
        padding: 0 15%;
        h1 {
          color: #132238;
          font-size: 40px;
          margin-bottom: 20px;
        }
        .form {
          margin: auto;
          p {
            margin-bottom: 5px;
            font-size: 20px;
            font-weight: 700;
            text-align: left;
          }
          .text_input {
            width: 100%;
            border: none;
            height: 45px;
            border-radius: 5px;
            background: #A7AFBB;
          }
        }
        .tick {
          margin-top: 20px;
          text-align: left;
          font-size: 20px;
          font-weight: 700;
          input {
            box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.25);
            margin-right: 10px;
          }
        }
        .login_btn {
          text-align: center;
          button {
            width: 100%;
            color: white;
            font-weight: 700;
            border-radius: 10px;
            margin: 20px auto 0;
            height: 45px;
            background: var(--c-4, #132238);
          }
        }
      }
    }
  }
</style>
