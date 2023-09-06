<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>搜尋資產</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>掃描資產</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group ">
            <div class="search_section">
              <div class="input-wrapper">
               <input placeholder="請掃描資產編號(完整檢索)" class="text-center" ref="myInput">
              </div>
          
            </div>
          </div>
        </div>
      
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" @click="submit">搜尋</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  import router from "@/router";
  import {
    onMounted,
    ref
  } from 'vue';
  export default {
    components: {
      Navbar
    },
    mounted() {
    this.$refs.myInput.focus();
  }
    // setup() {
    //   const inputValue = ref(''); //帳號
    //   const dropdownOptions = ref([]); //帳號搜尋結果(選項)
    //   const filteredOptions = ref(dropdownOptions);
    //   const selectedRole = ref(''); //權限
    //   const roleArray = ['訪客', '系統管理員', '設備工程師', '倉管人員', '主管'] //權限選項
    //   const showOptions = ref(false); //控制搜尋選單出現與否
    //   onMounted(() => {
    //     queryAccount();
    //   });
    //   async function queryAccount() {
    //     const axios = require('axios');
    //     const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/SearchName?name=${inputValue.value}`);
    //     try {
    //       const data = response.data;
    //       if (data.state === 'success') {
    //         dropdownOptions.value = data.resultList;
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    //   async function submit() {
    //     const axios = require('axios');
    //     const form = new FormData();
    //     form.append('userName', inputValue.value);
    //     form.append('role', selectedRole.value);
    //     const response = await axios.post('http://192.168.0.177:7008/AuthorityMng/AccoutChangeRole', form);
    //     try {
    //       const data = response.data;
    //       if (data.state === 'success') {
    //         let msg = data.messages + '\n';
    //         msg += `${inputValue.value}　變更為　${selectedRole.value}`
    //         alert(msg);
    //         router.push('/home');
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    //   function selectAccount(item) {
    //     inputValue.value = item;
    //     showOptions.value = false;
    //   }
    //   function selectRole(item) {
    //     selectedRole.value = item;
    //   }
    //   function handleBlur() {
    //     setTimeout(() => {
    //       showOptions.value = false;
    //     }, 100);
    //   }
    //   function goBack() {
    //     window.history.back();
    //   }
    //   return {
    //     inputValue,
    //     dropdownOptions,
    //     filteredOptions,
    //     selectedRole,
    //     roleArray,
    //     showOptions,
    //     queryAccount,
    //     submit,
    //     selectAccount,
    //     selectRole,
    //     handleBlur,
    //     goBack,
    //   };
    // }
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
          padding: 30px;
          .search_section {
            position: relative;
            width: 100%;
        
           
          }
     
          input {
            @include dropdown_btn;
            width: 100%;
            height: 35px;
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
          padding: 30px;
          .search_section {
            position: relative;
            width: 100%;
        
           
          }
     
          input {
            @include dropdown_btn;
            width: 100%;
            height: 35px;
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
            width: 100%;
           
         
          }
        
          input {
            @include dropdown_btn;
            width: 100%;
            height: 35px;
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