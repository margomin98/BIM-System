<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產入庫交付</h1>
    </div>
    <div class="info_wrap col">
      <storage_process_view />
      <div class='confirm_section'>
        <h2>
          交付確認
        </h2>
        <div class='final'>
          <div class="fixed_info">
            <div>
              <p>交付日期 : {{ utilsStore.today }}</p>
            </div>
          </div>
          <div class="row auth g-0">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 input-container">
              <div class="input-group">
                <div class="input-group-prepend"><span class='red_star'>*</span>交付人員：</div>
                <div class="input-with-icon">
                  <select class="form-select" name="" id="" v-model="requestData.DeliveryOperator">
                    <option value="">--請選擇--</option>
                    <option v-for="option in DropdownArray.Custodian" :key="option" :value="option">{{ option }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 input-container">
              <div class="input-group">
                <div class="input-group-prepend">入庫人員：</div>
                <div class="input-with-icon">
                  <input type="text" class="form-control readonly_box" v-model="utilsStore.userName" readonly/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
        <button class="send_btn" @click="submit" :disabled="!requestData.DeliveryOperator" :class="{ send_btn_disabled: !requestData.DeliveryOperator }">送出</button>
      </div>
    </div>
  </div>
  <view_modal/>
</template>

<script setup>
  import storage_process_view from '@/components/store_process_page/storage_process_view_component.vue';
  import view_modal from "@/components/view_modal.vue"
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    onUnmounted,
    ref,
    reactive
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import {
    useUtilsStore,
    useAPIStore
  } from '@/store'
  import {
    useApplyStore
  } from '@/store/storage/apply.js'
  import {
    useStorageStore
  } from '@/store/storage/_index'
  import {
    storeToRefs
  } from "pinia";
  import {
    StoreProcess_Confirm_Status
  } from "@/assets/js/enter_status"
  import axios from '@/axios/tokenInterceptor'
  const storageStore = useStorageStore();
  const applyStore = useApplyStore();
  const utilsStore = useUtilsStore();
  const apiStore = useAPIStore();
  const {
    DropdownArray,
    upperForm,
    tabData,
    PageType,
  } = storeToRefs(storageStore);
  const route = useRoute();
  const router = useRouter();
  const AI_ID = route.query.search_id;
  const requestData = reactive({
    DeliveryOperator: '',
  })
  onMounted(async() => {
    PageType.value = 'confirm'
    DropdownArray.value.Custodian = await apiStore.getCustodian('');
    await storageStore.getDetails(AI_ID, false, StoreProcess_Confirm_Status);
    await utilsStore.getUserName(); // 重新拿使用者名稱
    requestData.DeliveryOperator = upperForm.value.Applicant;
  });
  onUnmounted(()=>{
    applyStore.$dispose();
    storageStore.$dispose();
    utilsStore.$dispose();
    apiStore.$dispose();
  })
  /**
   * 提交交付內容
   */
  async function submit() {
    const formData = new FormData();
    const formFields = {
      'AI_ID': AI_ID,
      'DeliveryOperator': requestData.DeliveryOperator,
      'AssetsInOperator': utilsStore.userName,
    };
    //將表格資料append到 formData
    for (const fieldName in formFields) {
      formData.append(fieldName, formFields[fieldName]);
      console.log(formData.get(`${fieldName}`));
    }
    const response = await axios.post('https://localhost:44302/AssetsInMng/Delivery', formData);
    try {
      const data = response.data;
      console.log(data);
      if (data.state === 'success') {
        let msg = data.messages;
        msg += '\n單號:' + data.resultList.AI_ID;
        alert(msg);
        router.push({
          name: 'Store_Process_Datagrid'
        });
      } else if (data.state === 'error') {
        alert(data.messages);
        console.log('error state', response);
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

h2 {
  margin-top: 50px;
  text-align: center;
  font-size: 35px;
  font-weight: 600;
  @include title_color;
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;

  button.back_btn {
    @include back_to_previous_btn;

    &:hover {
      background-color: #5d85bb;
    }
  }

  button.send_btn {
    @include search_and_send_btn;

    &:hover {
      background-color: #5e7aa2;
    }
  }

  button.send_btn_disabled {
    background: #878787;

    &:hover {
      background: #878787;
    }
  }
}

.readonly_box {
  @include readonly_box;
}

.form_search_btn {
  @include form_search_btn;
}
span {
  @include red_star;
}
.info_wrap {
  margin: auto;

  .input-group {
    .input-group-prepend {
      color: white;
      font-weight: 700;
      font-size: 20px;
      text-align: end;
    }
  }

  .fixed_info {
    @include fixed_info;

    p {
      font-size: 20px;
      margin-bottom: 0;
    }
  }

  .content {
    @include content_bg;

    .input-number {
      @include count_btn;
    }
  }

  .tab_section {
    .nav {
      overflow-x: auto;
      overflow-y: hidden;
      flex-wrap: nowrap;
      border: none;
    }

    ::-webkit-scrollbar {
      height: 6px;
      border: 1px solid rgb(219, 218, 218);
      border-radius: 5px;
      width: 8px;
    }

    ::-webkit-scrollbar-thumb {
      display: block;
      border-radius: 5px;
      background-color: rgb(176, 175, 175);
      border: 1px solid rgb(86, 85, 85);
    }

    .nav-tabs {
      button {
        @include tab_section_num;
        background: #5c7897;
      }

      .active {
        @include tab_section_num;
        background: #3e4e5f;
      }
    }

    .tab-content {
      background: #3e4e5f;
      border-radius: 0 0 20px 20px;

      .selected_file {
        .selected_file_wrap {
          flex-direction: column;

          .file_upload_wrap {
            margin-bottom: 0;
            display: flex;

            img {
              width: 25px;
              height: 25px;
            }

            p {
              font-weight: 700;
              margin-bottom: 5px;
              color: white;
              word-break: break-word;

              &::before {
                margin-right: 10px;
                content: "·";
                font-weight: 700;
                color: white;
              }
            }
          }
        }
      }



      .input-group {
        flex-wrap: nowrap;

        .input-number {
          @include count_btn;
        }

        .form-control {
          height: 35px;
          border-radius: 0;
        }
      }
    }
  }
}

.check_box_wrap {
  font-weight: 700;
  align-items: center;
  color: white;
  label {
              font-size: 18px;
            }


}

.confirm_section {
  .auth {
    border-radius: 0 0 10px 10px;
    background: white;
    padding: 20px;

    .input-group {
      display: flex;
      white-space: nowrap;
      flex-wrap: nowrap;
      justify-content: center;
    }

    button {
      @include auth_btn;

      &:hover {
        background: #5a6d87;
      }
    }

    .form-control {
      height: 35px;
      margin-right: 5px;
    }

    .input-group-prepend {
      font-weight: 700;
      font-size: 20px;
      text-align: end;
      color: black;
    }

    .input-container {
      // position: relative;
      align-self: center;
    }

    // .input-with-icon {
    //   position: relative;

    // }

    // .checkmark-icon {
    //   position: absolute;
    //   top: 10%;
    //   left: 93%;
    //   transform: translateY(-50%);
    //   width: 20px;
    //   height: 20px;
    // }
  }

  .modal {
    button {
      background: #506b91;
      border: none;
      font-weight: 700;
      font-size: 18px;

      &:hover {
        background: #6d92b3;
      }
    }

    .modal-body {
      padding: 16px 16px 0;
    }

    .modal-content {
      width: 400px;
      margin: auto;
    }

    .input-group-prepend {
      width: auto;
    }

    .modal-footer {
      padding: 0 12px 12px;
      border: none;
    }

    .modal-header {
      h5 {
        font-weight: 700;
      }

      background: #3D4E61;
      color: white;

      .close_icon {
        cursor: pointer;
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .auth {
      height: 80px;
      .input-with-icon{
        width:180px
      }
    }

    .info_wrap {
      width: 850px;

      .content {
        .input-group-prepend {
          width: 100px;
        }
      }

      .tab_section {
        .tab-content {
          padding: 50px 30px;

          .selected_file {
            .selected_file_wrap {
              flex-direction: column;
            }
          }

          .check_box {
            margin-right: 10px;
          }

          .input-group-prepend {
            width: 135px;
          }

          .readonly_box {
            width: 63%;
          }

          .input-group {
            flex-wrap: nowrap;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .auth {
      height: 80px;
      .input-with-icon{
        width:150px
      }
    }

    .info_wrap {
      width: 750px;

      .content {
        .input-group {
          .selected_file {
            .selected_file_wrap {
              flex-direction: column;
            }
          }

          .input-group-prepend {
            width: 125px;
            white-space: nowrap;
          }
        }
      }

      .tab_section {
        .tab-content {
          padding: 50px 30px;

          .check_box {
            margin-right: 10px;
          }

          .input-group-prepend {
            width: 115px;
          }

          .readonly_box {
            width: 63%;
          }

          .input-group {
            flex-wrap: nowrap;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {

    .auth {
      .input-group {
        margin: 5px 0;
        gap: 0 10px;
      }
    }

    .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
      margin-left: unset !important;
      border-radius: 5px;
    }

    .form_search_btn {
      border: none;
      color: white;
      width: 60px;
      height: 35px;
      margin-top: 10px;
      font-weight: 700;
      padding: 0 10px;
      margin-left: unset !important;
      background-color: #132238;

      &:hover {
        background-color: #43546d;
      }
    }

    .info_wrap {
      padding: 1% 5% 0;

      .fixed_info {
        flex-direction: column;
        padding: 10px;
        height: unset !important;
      }

      .input-group-prepend {
        margin-bottom: 5px;
        display: flex;
        width: auto !important;
        text-align: left;
      }

      .content {
        .input-group {
          flex-direction: column;

          .form-control {
            width: 100%;
            margin-left: unset !important;
          }
        }

        .info {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
        }
      }

      .tab_section {
        .check_box_wrap {

          .radio_wrap {
            gap: 0 10px;
            align-self: start;
          }

          .input-group-prepend {
            width: auto !important;
            align-self: self-start;
          }
        }

        .tab-content {
          padding: 50px 30px;

          .input-group {
            flex-direction: column;

            .form-control {
              margin-left: unset !important;
            }

            input,
            textarea {
              width: 100%;
            }
          }
        }
      }
      .confirm_section .auth .input-group{
        flex-direction: column;
        
      }
    }
  }
}
</style>
