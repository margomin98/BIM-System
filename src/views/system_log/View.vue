<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>檢視日誌</h1>
    </div>
    <!-- 執行時間 -->
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>執行時間：{{ details.LogTime}}</p>
        </div>
      </div>
      <div class="content">
      <!-- 使用者帳號 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">使用者帳號：</div>
            <input type="text" class="form-control text-center readonly_box" readonly v-model="details.Account_Id"/>
          </div>
        </div>
        <!-- 執行動作 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">執行動作：</div>
            <input type="text" class="form-control text-center readonly_box" readonly v-model="details.Active"/>
          </div>
        </div>
        <!-- Controller -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">Controller：</div>
            <input type="text" class="form-control text-center readonly_box"  readonly v-model="details.Controller"/>
          </div>
        </div>
        <!-- Action -->
        <div class="col">
          <div class="input-group  mb-3">
            <div class="input-group-prepend">Action：</div>
            <input type="text" class="form-control text-center readonly_box"  readonly v-model="details.Action"/>
          </div>
        </div>
        <!-- 訊息 -->
        <div class="col">
          <div class="input-group  mb-3">
            <div class="input-group-prepend">訊息：</div>
            <textarea class="form-control readonly_box" style="height: 70px;overflow-y: scroll;" readonly>{{ details.Message }}</textarea>
          </div>
        </div>
        <!-- 原始資料 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">原始資料：</div>
            <textarea class="form-control readonly_box" style="height: 300px;overflow-y: scroll;" readonly>{{ details.OriData }}</textarea>
          </div>
        </div>
          <!-- 更新資料 -->
          <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">更新資料：</div>
            <textarea class="form-control readonly_box" style="height: 300px;overflow-y: scroll;" readonly>{{ details.UpdateData }}</textarea>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    ref,
    reactive,
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import { goBack } from "@/assets/js/common_fn";
  import axios from "axios";
  export default {
    components: {
      Navbar,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const ID = route.query.search_id;
      const details = ref({});
      onMounted(() => {
        getDetails();
      })
      async function getDetails() {
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetSystemLog?id=${ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            // if(data.resultList.Status !== '待入庫') {
            // window.history.back();
            // // router.push({name: 'Store_Process_Datagrid'});
            // }
            details.value = data.resultList;
            console.log('單筆資料如下\n', details.value);
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error(error);
        }
      }
      return {
        details,
        goBack,
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  textarea {
    resize: none;
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

  @media only screen and (min-width: 1200px) {
    .main_section {
      input {
        @include dropdown_btn;
        height: 35px;
      }
    
      .readonly_box {
        @include readonly_box;
      }
      .info_wrap {
        margin: auto;
        width: 800px;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
      
        .content {
          @include content_bg;
          p {
            text-align: center;
            white-space: nowrap;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
          }
         
          .input-group {
            flex-wrap: nowrap;
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 135px;
              text-align: end;
            }
          }
         
        }
        
      }
     
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      input {
        @include dropdown_btn;
        height: 35px;
      }
      .readonly_box {
        width: 150px !important;
      }
   
      .readonly_box {
        @include readonly_box;
      }
      .info_wrap {
        margin: auto;
        width: 700px;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
       
        .content {
          @include content_bg;
          p {
            text-align: center;
            white-space: nowrap;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
          }
      
          .input-group {
            flex-wrap: nowrap;
            .form-control {
              height: 35px;
              width: 55%;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 170px;
              text-align: end;
            }
          }
        }
      }
   
    }
  
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      
   
      input {
        @include dropdown_btn;
        height: 35px;
        width: 100%
      }
      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: 0 !important;
        border-radius: 5px;
      }
      .info_wrap {
        padding: 1% 5% 0;
        .fixed_info {
          @include fixed_info;
          flex-direction: column;
          height: unset;
          padding: 10px;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
     
        .content {
          @include content_bg;
      
          .input-group {
            flex-direction: column;
            .form-control {
              width: 100%;
              height: 35px;
              border-radius: 0;
              margin-left: unset !important;
            }
            .input-group-prepend {
              margin-bottom: 5px;
              color: white;
              font-weight: 700;
              font-size: 20px;
            }
          }
        }
      }
    }
   
  }
</style>