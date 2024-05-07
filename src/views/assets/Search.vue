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
               <input placeholder="請掃描資產編號" class="text-center" ref="myInput" v-model="AssetsId">
              </div>
          
            </div>
          </div>
        </div>
      
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" @click="searchAssets">搜尋</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  import router from "@/router";
  import axios from "axios";
  import {
onMounted,
    ref
  } from 'vue';
  export default {
    components: {
      Navbar
    },
    setup() {
      const myInput = ref(null);
      const AssetsId = ref('')
      onMounted(()=>{
        myInput.value.focus();
      });
      // 搜尋資產
      async function searchAssets() {
        axios.get(`http://192.168.0.117:7008/GetDBdata/GetAssetInfo?id=${AssetsId.value}`)
        .then((response) => {
          const data = response.data;
          if(data.state === 'success') {
            console.log('AssetsId: ',data.resultList.AssetsId);
            router.push({name: 'Assets_View', query: {search_id: AssetsId.value}})
          }
          else {
            alert('請輸入正確的資產編號');
            AssetsId.value ='';
            myInput.value.focus();

          }
        })
        .catch((error) => {
          console.error(error);
        })
      }
      const goBack = () => {
        window.history.back();
      };
      return {
        myInput,
        AssetsId,
        searchAssets,
        goBack,
      }
    },
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
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

  .send_btn {
    @include search_and_send_btn;

    &:hover {
      background-color: #5d85bd;
    }
  }
}
.main_section {
  .info_wrap {
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
  }
}
@media only screen and (min-width: 1200px) {
  .main_section {
    h1 {
      margin-top: 180px !important;
    }
    .info_wrap {
      margin: 8px auto 5%;
      width: 500px;

      .content {
        padding: 30px;
        .search_section {
          position: relative;
        }
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    h1 {
      margin-top: 180px !important;
    }
    .info_wrap {
      margin: 8px auto 5%;
      width: 500px;

      .content {
        padding: 30px;
        .search_section {
          position: relative;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .main_section {
    h1 {
      margin-top: 80px !important;
    }
    .info_wrap {
      margin: 10px auto 5%;
      padding: 0 5%;

      .content {
        .search_section {
          width: 100%;
        }
      }
    }
  }
}

</style>