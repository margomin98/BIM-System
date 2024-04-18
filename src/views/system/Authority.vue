<template>
  <Navbar />
  <div class="main_section">
    <!-- 編輯權限名稱 Modal  -->
    <div class="modal fade editModal" id="editModal" tabindex="-1">
      <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="fixed_info">
              <div>
                <p>修改名稱</p>
              </div>
              <div class="content">
                <input type="text" id="editInput" placeholder="最多輸入10字">
              </div>
              <div class="button_section">
                <button type="button" class="btn" data-bs-dismiss="modal">關閉</button>
                <button type="button" class="btn" data-bs-dismiss="modal" @click="editType">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除權限名稱 Modal  -->
    <div class="modal fade editModal2" id="editModal2" tabindex="-1">
      <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="fixed_info">
              <div>
                <p>確定刪除參數嗎?</p>
              </div>
              <div class="content">
                <span style="font-weight: 700;"></span>
              </div>
              <div class="button_section">
                <button type="button" class="btn" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn" data-bs-dismiss="modal" @click="deleteType">確定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title col">
      <h1>權限管理</h1>
    </div>
    <!--
        <div class="info_wrap col"><div class="fixed_info"><div><p>變更權限</p></div><div><p>目前權限 : {{ roleSearchResult }}</p></div></div><div class="content"><div class="col"><div class="input-group mb-4 first"><div class="input-group-prepend"><span>*</span>帳號：</div><div class="search_section"><div class="input-wrapper"><input @input="searchFunction" @focus="showOptions = true;" @blur="handleBlur" v-model="inputValue" /></div><ul v-if="showOptions" class="options-list"><li v-for="(option, index) in dropdownOptions" :key="index" @click="selectAccount(option)">{{ option }}
                </li></ul></div></div></div><div class="col authority"><div class="input-group-prepend"><span>*</span>權限：</div><div class="dropdown"><button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ selectedRole || "請選擇" }}
              </button><div class="dropdown-menu" aria-labelledby="statusDropdown"><p v-for="(item, index) in roleArray" :key="index" class="dropdown-item" @click="selectRole(item)">{{ item.Name }}</p></div></div></div></div><div class="col button_wrap"><button class="back_btn" @click="goBack">回上一頁</button><button class="send_btn" @click="submit">送出</button></div></div>-->
    <div class="info_wrap">
      <ul class="nav nav-tabs" id="Tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="change-tab" data-bs-toggle="tab" data-bs-target="#change" type="button" role="tab">變更人員權限</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="name-tab" data-bs-toggle="tab" data-bs-target="#name" type="button" role="tab">權限名稱</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="setting-tab" data-bs-toggle="tab" data-bs-target="#setting" type="button" role="tab">權限設定</button>
        </li>
      </ul>
      <div class="tab-content" id="authorityTab">
        <div class="tab-pane fade" id="change" role="tabpanel">
          <div class="tab-pane_wrap">
            <div class="fixed_info">
              <div>
                <p> 變更人員權限 </p>
              </div>
            </div>
            <div class="content">
              <!-- 賬號 -->
              <div class="d-flex mb-3 content_wrap">
                <div class="input-group-prepend">
                  <span class="red_star">*</span>帳號：
                </div>
                <div class="select_wrap">
                  <select class="form-select">
                    <option selected>請選擇</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                  </select>
                  <p class="warn_note">請先選擇帳號</p>
                </div>
              </div>
              <!-- 目前權限 -->
              <div class="d-flex mb-3 content_wrap">
                <div class="input-group-prepend"> 目前權限： </div>
                <input type="text" class="form-control readonly_box" readonly>
              </div>
              <!-- 變更權限 -->
              <div class="d-flex content_wrap">
                <div class="input-group-prepend">
                  <span class="red_star">*</span>變更權限：
                </div>
                <div class="select_wrap">
                  <select class="form-select">
                    <option selected>請選擇</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                  </select>
                </div>
              </div>
            </div>
            <button class='submit_btn' type="button">確認變更</button>
          </div>
        </div>
        <div class="tab-pane fade name_tab" id="name" role="tabpanel">
          <div class="tab-pane_wrap">
            <div class="fixed_info">
              <div>
                <p> 權限名稱 </p>
              </div>
            </div>
            <div class="content">
              <!-- 輸入框 -->
              <div class="d-flex mb-3 content_wrap">
                <div class="select_wrap">
                  <input type="text" class="form-control" placeholder="最長可輸入10字">
                  <p class="warn_note">類型命名條件....</p>
                </div>
                <button class="add_btn" type="button">+ 新增</button>
              </div>
              <div class="name_dg">
                <ag-grid-vue :headerHeight="0" @rowDragEnd="onRowDragEnd('LayerName', $event)" :rowDragManaged="true" :animateRows="true" :suppressMoveWhenRowDragging="true" :rowData="rowData" :columnDefs="colDefs" style="height: 425px" class="ag-theme-alpine"></ag-grid-vue>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade setting_tab show active" id="setting" role="tabpanel">
          <div class="tab-pane_wrap">
            <div class="fixed_info ">
              <div>
                <p> 權限設定 </p>
              </div>
            </div>
            <div class="content">
              <!-- 選擇權限名稱 -->
              <div class="d-flex mb-3 content_wrap">
                <p class='text_title'>請先選擇權限名稱</p>
                <select class="form-select">
                  <option selected>請選擇</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </select>
              </div>
              <div class="dropdown_section">
                <div class="fixed_info">
                  <div>
                    <p> 權限設定 </p>
                  </div>
                </div>
                <div class="accordion authority_accordion" id="authority_accordion">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        <input class="form-check-input" type="checkbox" value="" id="authority_check"> 專案採購管理 </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#authority_accordion">
                      <div class="accordion-body">
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="authority_check">檢視專案採購管理
                        </div>
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="authority_check">檢視專案採購單
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                        <input class="form-check-input" type="checkbox" value="" id="authority_check"> 訂單管理 </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#authority_accordion">
                      <div class="accordion-body">
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="authority_check">檢視訂單管理
                        </div>
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="authority_check">檢視訂購單
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                        <input class="form-check-input" type="checkbox" value="" id="authority_check_three"> 項目三 </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#authority_accordion">
                      <div class="accordion-body">
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_three_1">項目三選項一
                        </div>
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_three_2">項目三選項二
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFour">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                        <input class="form-check-input" type="checkbox" value="" id="authority_check_four"> 項目四 </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#authority_accordion">
                      <div class="accordion-body">
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_four_1">項目四選項一
                        </div>
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_four_2">項目四選項二
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFive">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                        <input class="form-check-input" type="checkbox" value="" id="authority_check_five"> 項目五 </button>
                    </h2>
                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#authority_accordion">
                      <div class="accordion-body">
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_five_1">項目五選項一
                        </div>
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_five_2">項目五選項二
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingSix">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix">
                        <input class="form-check-input" type="checkbox" value="" id="authority_check_six"> 項目六 </button>
                    </h2>
                    <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#authority_accordion">
                      <div class="accordion-body">
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_six_1">項目六選項一
                        </div>
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_six_2">項目六選項二
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingSeven">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven">
                        <input class="form-check-input" type="checkbox" value="" id="authority_check_seven"> 項目七 </button>
                    </h2>
                    <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#authority_accordion">
                      <div class="accordion-body">
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_seven_1">項目七選項一
                        </div>
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_seven_2">項目七選項二
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingEight">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight">
                        <input class="form-check-input" type="checkbox" value="" id="authority_check_eight"> 項目八 </button>
                    </h2>
                    <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#authority_accordion">
                      <div class="accordion-body">
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_eight_1">項目八選項一
                        </div>
                        <div class="check_wrap">
                          <input class="inner_form_check" type="checkbox" value="" id="inner_form_check_eight_2">項目八選項二
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="button_wrap">
              <button class='confirm_btn' type="button">確認</button>
              <button class='cancel_btn' type="button">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  AgGridVue
} from "ag-grid-vue3";
import Navbar from "@/components/Navbar.vue";
import Parameter_button from "@/components/Parameter_button";
import Edit_pen from "@/components/Edit_pen";
// import router from "@/router";
// import {
//   getRoleOption
// } from "@/assets/js/common_api";
// import {
//   goBack
// } from "@/assets/js/common_fn";
import {
  onMounted,
  reactive,
  ref
} from 'vue';
export default {
  components: {
    Navbar,
    AgGridVue,
    Parameter_button,
    Edit_pen,
  },
  setup() {
    const rowData = ref([
      { make: "Tesla" },
      { make: "Ford" },
      { make: "Toyota" },
    ]);
    const colDefs = [{
      rowDrag: true,
       cellRenderer: 'Parameter_button',
      width:170

     
    },
  {
    field: "make",
        flex: 1,
  }];

    return {
      rowData,
      colDefs,
    };
  },
  // setup() {
  //   const inputValue = ref(''); //帳號
  //   const dropdownOptions = ref([]); //帳號搜尋結果(選項)
  //   const filteredOptions = ref(dropdownOptions);
  //   const roleSearchResult = ref('');
  //   const selectedRole = ref(''); //權限名稱(顯示
  //   const selectedRoleId = ref(''); //權限id
  //   const roleArray = ref() //權限選項
  //   const showOptions = ref(false); //控制搜尋選單出現與否
  //   onMounted(() => {
  //     searchFunction();
  //     getRoleOption(roleArray);
  //   });
  //   function searchAccount() {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const axios = require('axios');
  //         const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/SearchName?name=${inputValue.value}`);
  //         const data = response.data;
  //         if (data.state === 'success') {
  //           // const filteredRoles = data.resultList.filter(role => role !== 'admin' && role !== 'guest');
  //           resolve(data.resultList);
  //         } else {
  //           reject(new Error('Search account failed.'));
  //         }
  //       } catch (error) {
  //         reject(error);
  //       }
  //     });
  //   }
  //   function searchRole() {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const axios = require('axios');
  //         const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetRoleFromName?name=${inputValue.value}`);
  //         const data = response.data;
  //         if (data.state === 'success') {
  //           resolve(data.resultList.role.Name);
  //         } else {
  //           resolve(''); // Resolve with empty value when role search fails
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         reject(error);
  //       }
  //     });
  //   }
  //   async function searchFunction() {
  //     try {
  //       const accountResult = await searchAccount();
  //       dropdownOptions.value = accountResult;
  //       const roleResult = await searchRole();
  //       roleSearchResult.value = roleResult;
  //     } catch (error) {
  //       console.error(error);
  //       // Handle error
  //     }
  //   }
  //   async function submit() {
  //     if (!inputValue.value || !selectedRoleId.value) {
  //       alert('請輸入必填項目');
  //       return
  //     }
  //     const axios = require('axios');
  //     const form = new FormData();
  //     form.append('userName', inputValue.value);
  //     form.append('role', parseInt(selectedRoleId.value));
  //     const response = await axios.post('http://192.168.0.177:7008/AuthorityMng/AccoutChangeRole', form);
  //     try {
  //       const data = response.data;
  //       if (data.state === 'success') {
  //         let msg = data.messages + '\n';
  //         msg += `${inputValue.value}　變更為　${selectedRole.value}`
  //         alert(msg);
  //         router.push('/change');
  //       } else {
  //         alert(data.messages);
  //         console.log('error', data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   function selectAccount(item) {
  //     inputValue.value = item;
  //     searchFunction();
  //     showOptions.value = false;
  //   }
  //   function selectRole(item) {
  //     selectedRole.value = item.Name;
  //     selectedRoleId.value = item.Id;
  //   }
  //   function handleBlur() {
  //     setTimeout(() => {
  //       showOptions.value = false;
  //     }, 100);
  //   }
  //   return {
  //     inputValue,
  //     dropdownOptions,
  //     filteredOptions,
  //     roleSearchResult,
  //     selectedRole,
  //     selectedRoleId,
  //     roleArray,
  //     showOptions,
  //     searchFunction,
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
.editModal {
  .modal-content {
    border-radius: 0;
    margin: auto;
    width: 350px;

    .modal-body {
      border: 1px solid black;
      padding: 0 !important;

      p {
        border-bottom: 1px solid black;
        background: #528091;
        padding: 10px;
        text-align: center;
        font-weight: 700;
        color: white;
        font-size: 20px;
        margin-bottom: 0;
      }

      .content {
        padding: 20px 10px;
        display: flex;
        justify-content: center;
        background: #d9d9d9;

        input {
          border: none;
          border-radius: 10px;
          padding: 5px 10px;
        }
      }

      .button_section {
        background: #d9d9d9;
        display: flex;
        justify-content: center;
        gap: 0 10px;
        padding-bottom: 20px;

        :nth-child(1) {
          @include search_and_send_btn;
          font-size: 15px;
          width: 60px;
          height: 30px;
          padding: 6px 12px;
          background: #6c6c6c;
          border-radius: 7px;

          &:hover {
            background: #30343a;
            color: white;
          }
        }

        :nth-child(2) {
          @include content_delete_button;
          font-size: 15px;
          width: 60px;
          height: 30px;
          background-color: #98ccd3;

          &:hover {
            background: #5979ab;
            color: white;
          }
        }
      }
    }
  }
}
.editModal2 {
  .modal-content {
    border-radius: 0;
    margin: auto;
    width: 350px;

    .modal-body {
      border: 1px solid black;
      padding: 0;

      p {
        border-bottom: 1px solid black;
        background: #e94b4b;
        padding: 10px;
        text-align: center;
        font-weight: 700;
        color: white;
        font-size: 20px;
        margin-bottom: 0;
      }

      .content {
        padding: 20px 10px;
        display: flex;
        justify-content: center;
        background: #d9d9d9;

        input {
          border: none;
          border-radius: 10px;
          text-align: center;
        }
      }

      .button_section {
        background: #d9d9d9;
        display: flex;
        justify-content: center;
        gap: 0 10px;
        padding-bottom: 20px;

        :nth-child(1) {
          @include search_and_send_btn;
          font-size: 15px;
          width: 60px;
          height: 30px;
          padding: 6px 12px;
          background: #6c6c6c;
          border-radius: 7px;

          &:hover {
            background: #30343a;
            color: white;
          }
        }

        :nth-child(2) {
          @include content_delete_button;
          font-size: 15px;
          width: 60px;
          height: 30px;
          background-color: #e94b4b;
          color: white;

          &:hover {
            background: #a70e0e;
            color: white;
          }
        }
      }
    }
  }
}
.modal .modal-body {
  padding: 0 !important;
}

.add_btn {
  border-radius: 5px;
  border: none;
  background: #132238;
  color: white;
  font-weight: 700;
  width: 80px;
  height: 38px;
}

.submit_btn {
  margin: 20px auto 0;
}

.submit_btn,
.confirm_btn {
  @include search_and_send_btn;
  width: unset;

  &:hover {
    background-color: #5d85bd;
  }
}

.button_wrap {
  display: flex;
  gap: 0 20px;
  margin-top: 18px;
  justify-content: center;

  .cancel_btn {
    @include back_to_previous_btn;
    width: 90px;

    &:hover {
      background-color: #5d85bb;
    }
  }
}

span {
  @include red_star;
}

.readonly_box {
  @include readonly_box;
}

p {
  margin-bottom: 0;
}

.main_section {
  .info_wrap {
    .select_wrap {
      width: 100%;
      flex-direction: column;
    }

    .warn_note {
      color: #00438b;
      font-weight: 700;
      margin-top: 5px;
    }

    .nav-link.active {
      color: black;
      border: none;
    }

    .nav-link {
      font-weight: 700;
      background: #5c7897;
      box-shadow: 2px -1px 1px 0px rgba(0, 0, 0, 0.25);
      color: white;
      border: none;
    }

    .tab-content > .active,
    .nav-link.active {
      background: #e3e3e3;
    }

    .nav-link {
      font-weight: 700;
    }

    .content,
    .tab-pane {
      padding: 20px;
    }

    .tab-pane {
      border-radius: 0px 10px 10px 10px;
    }

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
      }
    }

    .setting_tab {
      p.text_title {
        align-content: center;
        margin-right: 25px;
      }
    }

    .input-group-prepend,
    .setting_tab {
      white-space: nowrap;
      color: white;
      font-weight: 800;
      font-size: 20px;
    }

    .content {
      border-radius: 0px 0 10px 10px;
      background: #8495a8;

      .input-group-prepend {
        width: 140px;
        text-align: right;
        margin-right: 10px;
      }

      .accordion {
        .accordion-item {
          background: #dedede;
          border: 0;
        }

        .accordion-header,
        .accordion-button:not(.collapsed),
        button {
          background-color: #86abb0;
          box-shadow:unset
        }

        .form-check-input {
          margin-top: 0;
          margin-right: 10px;
        }

        input {
          width: 15px;
        }

        button {
          border-radius: 0;
          font-weight: 700;
          color: white;
          height: 38px;
          padding: 10px;
        }

        .accordion-button:focus {
          box-shadow: unset !important;
          border-color: transparent !important;
        }

        .accordion-body {
          padding: 16px;
          .check_wrap {
            display: flex;
            font-size: 15px;

            .inner_form_check {
              margin-right: 10px;
            }
          }
        }
      }

      .authority_accordion {
        height: 345px;
        overflow-y: scroll;
        background: #86abb0;
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      margin: 30px auto 5%;
      width: 600px;

      .tab-pane_wrap {
        height: 600px;

        .content {
          height: 490px;

          .add_btn {
            margin-left: 10px;
          }
        }
      }

      .name_tab .content {
        height: 550px;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      margin: 30px auto 5%;
      width: 600px;

      .tab-pane_wrap {
        height: 600px;

        .content {
          height: 490px;

          .add_btn {
            margin-left: 10px;
          }
        }
      }

      .name_tab .content {
        height: 550px;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .info_wrap {
      padding: 5%;

      .tab-pane_wrap {
        height: 640px;

        .content {
          height: 525px;

          .content_wrap {
            flex-direction: column;

            .input-group-prepend {
              text-align: left;
              margin-bottom: 5px;
            }
          }
        }
      }

      .name_tab .content {
        height: 590px;
      }
    }
  }
}

</style>
