<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>刪除項目</h1>
    </div>
    <div class="info_wrap col mb-5">
      <storage_process_view />
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
    </div>
    <delete_modal @delete="storageStore.deleteData(AI_ID)"></delete_modal>
  </div>
</template>

<script setup>
import storage_process_view from '@/components/store_process_page/storage_process_view_component.vue';
import delete_modal from '@/components/utils/delete_modal.vue';
import Navbar from '@/components/Navbar.vue';
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
const storageStore = useStorageStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const { PageType } = storeToRefs(storageStore);

const route = useRoute();
const AI_ID = route.query.search_id ;
onMounted(async()=>{
  storageStore.$reset();
  PageType.value = 'delete';
  await storageStore.getDetails(AI_ID, false);
})
onUnmounted(()=>{
  utilsStore.$dispose();
  storageStore.$dispose();
  apiStore.$dispose();
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

textarea {
  padding: 5px 10px 30px;
}

.delete_modal {
  .modal-content {
    border: solid 1px black;
    border-radius: 0;

    .modal-body {
      background: #E94B4B;
      text-align: center;
      font-weight: 700;
      color: white;
      border-bottom: solid 1px black;
    }

    .modal-footer {
      margin: auto;
      gap: 10px;

      button:nth-child(1) {
        background-color: #7E7E7E;
        border: none;
        color: white;
        width: 50px;
        font-weight: 700;

        &:hover {
          background-color: #464242;
        }
      }

      button:nth-child(2) {
        background-color: #E94B4B;
        border: none;
        color: white;
        width: 50px;
        font-weight: 700;

        &:hover {
          background-color: #a70e0e;
        }
      }
    }
  }
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;

  .back_btn {
    @include back_to_previous_btn;

    &:hover {
      background-color: #5d85bb;
    }
  }

  .delete_btn {
    @include delete_btn;

    &:hover {
      background-color: #a51e1e;
    }
  }
}
.readonly_box {
  @include readonly_box;
}

.form_search_btn {
  @include form_search_btn;
}
.input-number {
  @include count_btn;
}

.main_section{
  .info_wrap{
    margin: auto;
    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }
    .input-group-prepend {
        color: white;
        font-weight: 700;
        font-size: 20px;
      }
    .content {
      @include content_bg;
    
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
          background: #5C7897;
        }

        .active {
          @include tab_section_num;
          background: #3E4E5F;
        }
      }

      .tab-content {
        background: #3E4E5F;
        border-radius: 0 0 20px 20px;


        .selected_file {
          display: flex;
          align-items: center;

          .input-group {
            flex-direction: column;
          }

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
                content: '·';
                font-weight: 700;
                color: white;
              }
            }
          }
        }

        .check_box_wrap {
          font-weight: 700;
          align-items: center;
          color: white;

         
        }

     

        .input-group {
          .file_upload_wrap {
            margin-bottom: 0;
            display: flex;

            img {
              width: 25px;
              height: 25px;
            }

            p {
              margin-bottom: 0;
              font-weight: 700;
              color: white;

              &::before {
                margin-right: 10px;
                content: '·';
                font-weight: 700;
                color: white;
              }
            }
          }

        


          .input-group-prepend {
            text-align: end;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    

    .info_wrap {
      width: 800px;


      .content {
        .input-group {
 

          .form-control {
            height: 35px;
            border-radius: 0;
          }

          .input-group-prepend {
            width: 125px;
            text-align: end;
          }
        }
      }

      .tab_section {
  

        .tab-content {
          padding: 50px 30px;

          .input-number {
            width: 64%
          }

        

          .check_box_wrap {

            label {
              font-size: 18px;
            }

            div:nth-child(2) {
              gap: 0 10px;
            }
          }

        

          .input-group {
        

          


            .input-group-prepend {
              width: 120px;
              text-align: end;
            }
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
      

          .form-control {
            height: 35px;
            border-radius: 0;
          }

          .input-group-prepend {
            width: 125px;
            text-align: end;
          }
        }
      }

      .tab_section {
        

        .tab-content {   
          padding: 50px 30px;

          .input-number {
            width: 62%
          }

      
          .check_box_wrap {
             label {
              font-size: 18px;
            }

            div:nth-child(2) {
              gap: 0 10px;
              display: flex;
            }
          }

        
          .input-group {
            


            .input-group-prepend {
              width: 120px;
              text-align: end;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .readonly_box {
      margin-top: 5px;
   
    }
    

    .form_search_btn {
      margin-top: 10px;
      margin-left: unset !important;
    }

    .info_wrap {
      padding: 1% 5% 0;
 .input-group-prepend {
            width: 100%;
            display: flex;  
            justify-content: left;
            text-align: start !important;
          }
      .fixed_info {
        flex-direction: column;
        padding: 10px;
        height: unset !important;

     
      }

      .content {
        .info {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
        }

        .input-group {
          flex-direction: column;

      

          .form-control {
            width: 100%;
            margin-top: 5px;
            margin-left: unset !important;
          }

         
        }
      }

      .tab_section {
   

        .tab-content {
          padding: 50px 30px;
       
        
          .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
            margin-left: unset;
          }

          .check_box_wrap {
          
            label {
              font-size: 18px;
            }

            .radio_wrap {
              gap: 0 10px;
            }

            .input-group-prepend {
              width: auto !important;
              align-self: self-start;
            }
          }

          
          .input-group {
            flex-direction: column;
    align-content: start;
            

            .form-control {
              height: 35px;
              border-radius: 0;
              width: 100%;
              margin-left: unset !important;
              margin-top: 5px;
            }

            .input-group-prepend {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
