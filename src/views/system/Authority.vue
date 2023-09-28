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
        <div>
          <p>目前權限: {{ roleSearchResult }}</p>
        </div>
        
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-4 first">
            <div class="input-group-prepend"><span>*</span>帳號：</div>
            <div class="search_section">
              <div class="input-wrapper">
                <input @input="searchFunction" @focus="showOptions = true;" @blur="handleBlur" v-model="inputValue" />
              </div>
              <ul v-if="showOptions" class="options-list">
                <li v-for="(option, index) in dropdownOptions" :key="index" @click="selectAccount(option)">{{ option }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col authority">
          <div class="input-group-prepend"><span>*</span>權限：</div>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ selectedRole || "請選擇" }}
                  </button>
            <div class="dropdown-menu" aria-labelledby="statusDropdown">
              <p v-for="(item, index) in roleArray" :key="index" class="dropdown-item" @click="selectRole(item)">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  import router from "@/router";
  import {
    onMounted,
    reactive,
    ref
  } from 'vue';
  export default {
    components: {
      Navbar
    },
    setup() {
      const inputValue = ref(''); //帳號
      const dropdownOptions = ref([]); //帳號搜尋結果(選項)
      const filteredOptions = ref(dropdownOptions);
      const roleSearchResult = ref('');
      const selectedRole = ref(''); //權限
      const roleArray = ref() //權限選項
      const showOptions = ref(false); //控制搜尋選單出現與否
      onMounted(() => {
        searchFunction();
        getRoleOption();
      });
      function searchAccount() {
        return new Promise(async(resolve, reject) => {
          try {
            const axios = require('axios');
            const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/SearchName?name=${inputValue.value}`);
            const data = response.data;
            if (data.state === 'success') {
              resolve(data.resultList);
            } else {
              reject(new Error('Search account failed.'));
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      function searchRole() {
        return new Promise(async(resolve, reject) => {
          try {
            const axios = require('axios');
            const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetRoleFromName?name=${inputValue.value}`);
            const data = response.data;
            if (data.state === 'success') {
              resolve(data.resultList.role);
            } else {
              resolve(''); // Resolve with empty value when role search fails
            }
          } catch (error) {
            console.error(error);
            reject(error);
          }
        });
      }
      async function searchFunction() {
        try {
          const accountResult = await searchAccount();
          dropdownOptions.value = accountResult;
          const roleResult = await searchRole();
          roleSearchResult.value = roleResult;
        } catch (error) {
          console.error(error);
          // Handle error
        }
      }
      async function submit() {
        if(!inputValue.value || !selectedRole.value) {
          alert('請輸入必填項目');
          return
        }
        const axios = require('axios');
        const form = new FormData();
        form.append('userName', inputValue.value);
        form.append('role', selectedRole.value);
        const response = await axios.post('http://192.168.0.177:7008/AuthorityMng/AccoutChangeRole', form);
        try {
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages + '\n';
            msg += `${inputValue.value}　變更為　${selectedRole.value}`
            alert(msg);
            router.push('/home');
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function getRoleOption() {
        const axios = require('axios');
        const response = await axios.get('http://192.168.0.177:7008/GetParameter/GetRoles');
        try {
          const data = response.data;
          if (data.state === 'success') {
            console.log('get role option:' ,data.resultList);
            roleArray.value = data.resultList;
          }
        } catch (error) {
          console.error(error);
        }
      }
      function selectAccount(item) {
        inputValue.value = item;
        searchFunction();
        showOptions.value = false;
      }
      function selectRole(item) {
        selectedRole.value = item;
      }
      function handleBlur() {
        setTimeout(() => {
          showOptions.value = false;
        }, 100);
      }
      function goBack() {
        window.history.back();
      }
      return {
        inputValue,
        dropdownOptions,
        filteredOptions,
        roleSearchResult,
        selectedRole,
        roleArray,
        showOptions,
        searchFunction,
        submit,
        selectAccount,
        selectRole,
        handleBlur,
        goBack,
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  span {
    @include red_star;
  }
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
          .search_section {
            position: relative;
            width: 100%;
            .options-list {
              position: absolute;
              z-index: 1;
              background-color: white;
              border: 1px solid #ccc;
              max-height: 200px;
              overflow-y: auto;
              list-style-type: none;
              padding: 0;
              margin: 0;
              width: 100%;
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
            }
            .options-list li {
              padding: 5px 5px 0;
              cursor: pointer;
              &:hover {
                background: #7893b7;
                color: white;
                font-weight: 700;
              }
            }
            .arrow-icon {
              z-index: 2;
              position: absolute;
              cursor: pointer;
              border-top: 0.3em solid;
              border-right: 0.3em solid transparent;
              border-bottom: 0;
              border-left: 0.3em solid transparent;
              position: absolute;
              top: 50%;
              right: 0;
              margin-right: 8px
            }
            input {
              padding: 10px;
            }
            .input-placeholder {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: gray;
              font-size: 14px;
              pointer-events: none;
            }
          }
          .authority {
            white-space: nowrap;
            color: white;
            font-weight: 700;
            font-size: 20px;
            display: flex;
          }
          .dropdown {
            width: 100%;
            height: 35px;
            @include dropdown_btn;
            white-space: nowrap;
            color: white;
            font-weight: 700;
            font-size: 20px;
            margin-left: 10px;
            .dropdown-toggle {
              padding: 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border: none;
              width: 100%;
              color: black
            }
            .dropdown-menu {
              width: 100%;
              transform: translate3d(-1px, 35px, 0px) !important;
              max-height: 250px;
              overflow-y: auto;
              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
          input {
            @include dropdown_btn;
            width: 100%;
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
          .search_section {
            position: relative;
            width: 100%;
            .options-list {
              position: absolute;
              z-index: 1;
              background-color: white;
              border: 1px solid #ccc;
              max-height: 200px;
              overflow-y: auto;
              list-style-type: none;
              padding: 0;
              margin: 0;
              width: 100%;
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
            }
            .options-list li {
              padding: 5px 5px 0;
              cursor: pointer;
              &:hover {
                background: #7893b7;
                color: white;
                font-weight: 700;
              }
            }
            .arrow-icon {
              z-index: 2;
              position: absolute;
              cursor: pointer;
              border-top: 0.3em solid;
              border-right: 0.3em solid transparent;
              border-bottom: 0;
              border-left: 0.3em solid transparent;
              position: absolute;
              top: 50%;
              right: 0;
              margin-right: 8px
            }
            input {
              padding: 10px;
            }
            .input-placeholder {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: gray;
              font-size: 14px;
              pointer-events: none;
            }
          }
          .authority {
            white-space: nowrap;
            color: white;
            font-weight: 700;
            font-size: 20px;
            display: flex;
          }
          .dropdown {
            width: 100%;
            height: 35px;
            @include dropdown_btn;
            white-space: nowrap;
            color: white;
            font-weight: 700;
            font-size: 20px;
            margin-left: 10px;
            .dropdown-toggle {
              padding: 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border: none;
              width: 100%;
              color: black
            }
            .dropdown-menu {
              width: 100%;
              transform: translate3d(-1px, 35px, 0px) !important;
              max-height: 250px;
              overflow-y: auto;
              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
          input {
            @include dropdown_btn;
            width: 100%;
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
        margin-top: 80px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: 10px auto 5%;
        padding: 0 5%;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .search_section {
            position: relative;
            width: 100%;
            margin-left: unset !important;
            .options-list {
              position: absolute;
              z-index: 1;
              background-color: white;
              border: 1px solid #ccc;
              max-height: 200px;
              overflow-y: auto;
              list-style-type: none;
              padding: 0;
              margin: 0;
              width: 100%;
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
            }
            .options-list li {
              padding: 5px 5px 0;
              cursor: pointer;
              &:hover {
                background: #7893b7;
                color: white;
                font-weight: 700;
              }
            }
            .arrow-icon {
              z-index: 2;
              position: absolute;
              cursor: pointer;
              border-top: 0.3em solid;
              border-right: 0.3em solid transparent;
              border-bottom: 0;
              border-left: 0.3em solid transparent;
              position: absolute;
              top: 50%;
              right: 0;
              margin-right: 8px
            }
            input {
              padding: 10px;
            }
            .input-placeholder {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: gray;
              font-size: 14px;
              pointer-events: none;
            }
          }
          .authority {
            white-space: nowrap;
            color: white;
            font-weight: 700;
            font-size: 20px;
            display: flex;
            flex-direction: column;
            margin-bottom: 5px;
            .dropdown {
              margin-left: unset !important;
            }
          }
          .dropdown {
            width: 100%;
            height: 35px;
            @include dropdown_btn;
            white-space: nowrap;
            color: white;
            font-weight: 700;
            font-size: 20px;
            margin-left: 10px;
            .dropdown-toggle {
              padding: 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border: none;
              width: 100%;
              color: black
            }
            .dropdown-menu {
              width: 100%;
              transform: translate3d(-1px, 35px, 0px) !important;
              max-height: 250px;
              overflow-y: auto;
              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
          input {
            @include dropdown_btn;
            width: 100%;
            height: 35px;
          }
          .input-group {
            flex-direction: column;
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              margin-bottom: 5px;
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
</style>
