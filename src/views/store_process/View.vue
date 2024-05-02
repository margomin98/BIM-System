<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>檢視入庫作業</h1>
    </div>
    <div class="info_wrap col mb-5">
      <storage_process_view />
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
    </div>
  </div>
</template>

<script setup>
import storage_process_view from '@/components/store_process_page/storage_process_view_component.vue';
import Navbar from '@/components/Navbar.vue';
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { useApplyStore } from '@/store/storage/apply'
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
const storageStore = useStorageStore();
const applyStore = useApplyStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();

const route = useRoute();
const AI_ID = route.query.search_id ;
onMounted(async()=>{
  applyStore.$reset();
  storageStore.$reset();
  await storageStore.getDetails(AI_ID, false);
})
onUnmounted(()=>{
  utilsStore.$dispose();
  storageStore.$dispose();
  applyStore.$dispose();
  apiStore.$dispose();
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
textarea {
  padding: 5px 10px 30px;
}
.view_icon {
  cursor: pointer;
}
.check_box_wrap {
  .radio_wrap {
    margin-left: unset !important;
  }
  .check_box {
    font-weight: 700;
    color: white;
    font-size: 18px;
  }
}
.modal {
  .modal-header {
    background: #528091;
    color: white;
    .close_icon {
      color: white;
      font-weight: 700;
      margin-bottom: 0;
    }
  }
}
.button_wrap {
  display: flex;
  justify-content: center;
  margin: 30px auto 5%;
  .back_btn {
    @include back_to_previous_btn;
    &:hover {
      background-color: #5d85bb;
    }
  }
}
.readonly_box {
  @include readonly_box;
}
.form_search_btn {
  @include form_search_btn;
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
      .check_box {
        margin-right: 10px;
      }

      .readonly_box {
        width: 63%;
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
@media only screen and (min-width: 1200px) {
  .main_section {
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
    .input-group
      > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
        .valid-feedback
      ):not(.invalid-tooltip):not(.invalid-feedback) {
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
          .check_box {
            margin-right: 10px;
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
    }
  }
}


</style>
