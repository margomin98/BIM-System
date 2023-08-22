<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>權限管理</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>變更權限</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend"><span>*</span>帳號：</div>
            <input class="dropdown-toggle" type="text" id="InputDropdown" data-bs-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false" @keyup="queryAccount" v-model="queryText">
            <div v-if="queryArray" class="dropdown-menu" aria-labelledby="InputDropdown">
              <p v-for="(item , index) in queryArray" :key="index" class="dropdown-item" @click="selectAccount(item)">{{item}}</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend"><span>*</span>權限：</div>
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {{ selectedRole || "請選擇" }}
              </button>
              <div class="dropdown-menu" aria-labelledby="statusDropdown">
                <p class="dropdown-item" @click="selectrole('選項1')">選項1</p>
                <p class="dropdown-item" @click="selectrole('選項2')">選項2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { reactive, ref } from "vue";
export default {
  components: {
    Navbar,
  },
  setup() {

    const queryText = ref('');
    const queryArray = ref([]);
    const selectedRole = ref('');
    async function queryAccount() {
      const axios = require('axios');
      const response = await axios.get(`http://192.168.0.176:7008/GetDBdata/SearchName?name=${queryText.value}`);
      try {
        const data = response.data;
        if(data.state === 'success') {
          queryArray.value = data.resultList;
        }
      } catch (error) {
        console.error(error);
      }
    }

    function selectAccount(item) {
      queryText.value = item;
    }
    function goBack() {
      window.history.back();
    }
    return {
      queryText,
      queryArray,
      selectedRole,
      selectAccount,
      queryAccount,
      goBack,
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

@media only screen and (min-width: 1200px) {
  .main_section {
    h1 {
      margin-top: 180px;
      text-align: center;
      font-size: 55px;
      font-weight: 600;
      @include title_color;
    }

    .info_wrap {
      margin: 30px auto 5%;
      width: 500px;

      .fixed_info {
        @include fixed_info;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      .content {
        @include content_bg;

        .dropdown {
          width: 100%;
          height: 35px;
          @include dropdown_btn;

          .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
            width: 100%;
          }

          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;

            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }

        input {
          @include dropdown_btn;
          width: 200px;
          height: 35px;
        }

        .input-group {
          flex-wrap: nowrap;

          .input-group-prepend {
            white-space: nowrap;
            color: white;
            font-weight: 700;
            font-size: 20px;
            text-align: end;

            span {
              @include red_star;
            }
          }
        }
      }

      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 250px;
        gap: 10px;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5d85bd;
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    h1 {
      margin-top: 180px;
      text-align: center;
      font-size: 55px;
      font-weight: 600;
      @include title_color;
    }

    .info_wrap {
      margin: 30px auto 5%;
      width: 500px;

      .fixed_info {
        @include fixed_info;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      .content {
        @include content_bg;

        .dropdown {
          width: 100%;
          height: 35px;
          @include dropdown_btn;

          .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
            width: 100%;
          }

          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;

            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }

        input {
          @include dropdown_btn;
          width: 200px;
          height: 35px;
        }

        .input-group {
          flex-wrap: nowrap;

          .input-group-prepend {
            white-space: nowrap;
            color: white;
            font-weight: 700;
            font-size: 20px;
            text-align: end;

            span {
              @include red_star;
            }
          }
        }
      }

      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 250px;
        gap: 10px;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5d85bd;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    h1 {
      margin-top: 180px;
      text-align: center;
      font-size: 50px;
      font-weight: 600;
      @include title_color;
    }

    .info_wrap {
      margin: 30px auto 5%;
      padding: 5%;

      .fixed_info {
        @include fixed_info;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      .content {
        @include content_bg;

        .dropdown {
          width: 100%;
          height: 35px;
          @include dropdown_btn;

          .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
            width: 100%;
          }

          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;

            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }

        input {
          @include dropdown_btn;
          width: 200px;
          height: 35px;
        }

        .input-group {
          flex-wrap: nowrap;

          .input-group-prepend {
            white-space: nowrap;
            color: white;
            font-weight: 700;
            font-size: 20px;
            text-align: end;

            span {
              @include red_star;
            }
          }
        }
      }

      .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 250px;
        gap: 10px;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5d85bd;
            }
          }
        }
      }
    }
  }
}</style>
