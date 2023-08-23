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
          <div class="input-group mb-4 first">
            <div class="input-group-prepend"><span>*</span>帳號：</div>
            <div class="search_section">
              <div class="input-wrapper">
                <input v-model="inputValue" @input="filterOptions" @click="handleInputClick" @blur="handleBlur" ref="input" />
              </div>
              <div class="arrow-icon" @click="handleInputClick"></div>
              <ul v-if="showOptions && filteredOptions.length > 0" class="options-list">
                <li v-for="(option, index) in filteredOptions" :key="index" @click="selectOption(option)">{{ option }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col authority">
          <div class="input-group-prepend"><span>*</span>權限：</div>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ selectedItem || "請選擇" }}
                          </button>
            <div class="dropdown-menu" aria-labelledby="statusDropdown">
              <p class="dropdown-item" @click="selectStatus('選項1')">選項1</p>
              <p class="dropdown-item" @click="selectStatus('選項2')">選項2</p>
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
  import {
    ref
  } from 'vue';
  export default {
    components: {
      Navbar
    },
    setup() {
      const inputValue = ref('');
      const dropdownOptions = ["ben", "lisa", "mic", "michael"];
      const filteredOptions = ref(dropdownOptions);
      const showOptions = ref(false);
      const filterOptions = () => {
        if (inputValue.value.trim() === '') {
          filteredOptions.value = dropdownOptions;
        } else {
          filteredOptions.value = dropdownOptions.filter(option =>
            option.toLowerCase().includes(inputValue.value.toLowerCase())
          );
        }
      };
      const selectOption = (option) => {
        inputValue.value = option;
        showOptions.value = false;
      };
      const handleBlur = () => {
        if (!filteredOptions.value.includes(inputValue.value)) {
          inputValue.value = '';
        }
      };
      const handleInputClick = () => {
        if (inputValue.value.trim() !== '') {
          filterOptions();
        }
        showOptions.value = !showOptions.value;
      };
      const showDropdown = ref(false);
      const toggleDropdown = () => {
        showDropdown.value = !showDropdown.value;
      };
      return {
        inputValue,
        filteredOptions,
        filterOptions,
        showOptions,
        selectOption,
        handleBlur,
        handleInputClick,
        toggleDropdown
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
              &:hover {
                color: black
              }
            }
            .dropdown-menu {
              width: 100%;
              transform: translate3d(-1px, 35px, 0px) !important;
              p {
                color: black;
                font-weight: normal;
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
              &:hover {
                color: black
              }
            }
            .dropdown-menu {
              width: 100%;
              transform: translate3d(-1px, 35px, 0px) !important;
              p {
                color: black;
                font-weight: normal;
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
              &:hover {
                color: black
              }
            }
            .dropdown-menu {
              width: 100%;
              transform: translate3d(-1px, 35px, 0px) !important;
              p {
                color: black;
                font-weight: normal;
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
