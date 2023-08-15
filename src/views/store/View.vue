<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        檢視入庫填報
      </h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>
            申請人員: {{ details.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請入庫日期: {{ details.ApplicationDate }}
          </p>
        </div>
        <div>
          <p>
            資產類型：耗材
          </p>
        </div>
      </div>
      <div class="content">
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group mb-4 check_box_wrap">
            <div class="input-group-prepend check_box">
              資產類型：
            </div>
            <input type="checkbox" class='check_box' v-model="details.IsConsumable" disabled />耗材
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              編號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.AI_ID">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              入庫單狀態：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.Status">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              資產編號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetsId">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                設備總類：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipTypeName">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                設備分類：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipCategoryName">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.VendorName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductSpec">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductType">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                數量：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.Count">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                單位：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.Unit">
            </div>
          </div>
        </div>
        <div class='row'>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyDate">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固開始日：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyStartDate">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固到期日：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyEndDate">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註：
            </div>
            <input class="form-control readonly_box" aria-label="With textarea" readonly v-model="details.Memo">
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
export default {
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const AI_ID = route.query.search_id;
    const details = ref({});
    // console.log(AI_ID);
    async function getDetails() {
      const axios = require('axios');
      try {
        const response = await axios.get(`/GetDBdata/GetApplicationInfo?ai_id=${AI_ID}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('Details Get成功 資料如下\n', data.resultList);
          details.value = data.resultList;
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
    onMounted(() => {
      getDetails();
    });
    function goBack() {
      window.history.back();
    }
    return {
      goBack,
      AI_ID,
      details,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.main_section {

  .readonly_box {
    @include readonly_box;
  }

  h1 {
    margin-top: 50px;
    text-align: center;
    font-size: 55px;
    font-weight: 600;
    @include title_color;
  }

  .info_wrap {
    padding: 1% 31% 0;

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    .content {
      @include content_bg;

      .dropdown {
        .dropdown-menu {
          width: 100%;
        }

        button {
          @include dropdown-btn;
          width: 187px;
          color: black;
          justify-content: space-between;
          align-items: center;
        }
      }

      .input-group {
        .input-number {
          @include count_btn;
        }

        .form-control {
          height: 35px;
          border-radius: 0;
        }

        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;

          span {
            @include red_star
          }
        }
      }
    }

    .button_wrap {
      display: flex;
      margin-top: 30px;
      justify-content: center;
      padding: 0 28%;
      margin-bottom: 5%;

      button {
        &:nth-child(1) {
          @include back_to_previous_btn;

          &:hover {
            background-color: #5d85bb;
          }
        }

      }

    }
  }
}
</style>