<template>
  <div class="main_section">
      <div class="content">
          <div class="input-group">
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
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    ref
  } from 'vue';
  export default {
    components: {
      Navbar
    },
    setup(props, {emit}) {
      const inputValue = ref(''); //帳號
      const dropdownOptions = ref([]); //帳號搜尋結果(選項)
      const filteredOptions = ref(dropdownOptions);
      const roleSearchResult = ref('');
      const selectedRole = ref(''); //權限
      const roleArray = ref() //權限選項
      const showOptions = ref(false); //控制搜尋選單出現與否
      onMounted(() => {
        searchFunction();
      });
      function searchAccount() {
        return new Promise(async(resolve, reject) => {
          try {
            const axios = require('axios');
            const response = await axios.get(`http://192.168.0.176:7008/GetDBdata/SearchName?name=${inputValue.value}`);
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
      async function searchFunction() {
        emit('Custodian', inputValue.value);
        try {
          const accountResult = await searchAccount();
          dropdownOptions.value = accountResult;
        } catch (error) {
          console.error(error);
          // Handle error
        }
      }
      function selectAccount(item) {
        inputValue.value = item;
        emit('Custodian' , inputValue.value);
        searchFunction();
        showOptions.value = false;
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
        selectAccount,
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
      flex: 1 1 auto;
      .info_wrap {
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
          input {
            padding: 10px;
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
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      flex: 1 1 auto;
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
      margin-left: 0 !important;
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
