<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>刪除收貨單</h1>
    </div>
    <!-- 收貨資訊 -->
    <div class="info_wrap col">
      <warn/>
      <div class="fixed_info">
        <div>
          <p>收貨資訊</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">收貨單號：</div>
            <input type="text" class="form-control text-center readonly_box" v-model="details.AR_ID" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">訂購單號：</div>
            <input type="text" class="form-control text-center readonly_box" v-model="details.PurchaseNum" readonly />
            <view-order :id="details.PO_ID"></view-order>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">物流單號：</div>
            <input type="text" class="form-control text-center readonly_box" v-model="details.ShipmentNum" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">貨運公司：</div>
            <input type="text" class="form-control text-center readonly_box" v-model="details.ShipmentCompany" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group  mb-3">
            <div class="input-group-prepend">到貨件數：</div>
            <div class="num_wrap d-flex ">
              <div class="number-input-box">
                <input class="input-number readonly_box" type="number" v-model="details.GoodsNum" readonly/>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">收件人員：</div>
              <input type="text" class="form-control readonly_box" v-model="details.Recipient" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">收件日期：</div>
              <input type="text" class="form-control readonly_box" v-model="details.ReceivedDate" readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 物流文件部分 -->
    <div class="info_wrap col">
      <div class="fixed_info mt-5">
        <div>
          <p>已上傳物流文件</p>
        </div>
      </div>
      <div class="content row g-0">
        <div class="d-flex selected_file col">
          <!-- v-for讀取已上傳物流文件 -->
          <div v-for="(file , index) in details.existDocument" :key="index" class="icon">
            <p>{{ file.FileName }}
              <!-- 在handlePreview依據不同副檔名做不同處理 -->
              <img src="@/assets/view.png" @click="handlePreview(file)">
            </p>
          </div>
          <!-- doc/docx download hidden Link -->
          <a href="" style="display: none;" id="download-link"></a>
          <!-- Modal Trigger -->
          <button type="button" style="display: none" id="openModal" data-bs-toggle="modal" data-bs-target="#documentModal"></button>
          <!-- Exist Document Modal -->
          <div class="modal fade" id="documentModal" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="photoModalLabel"> {{ previewParams.title }}</h5>
                  <div class="close_icon">
                    <p type="button" data-bs-dismiss="modal" aria-label="Close">X</p>
                  </div>
                </div>
                <div class="modal-body">
                  <img :src="previewParams.src" class="w-75">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 照片部分 -->
    <div class="info_wrap mt-5 col">
      <div class="fixed_info">
        <div>
          <p>已上傳照片</p>
        </div>
      </div>
      <div class="content">
        <swiper-container class='swiper_section' :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
          <swiper-slide v-for="(file , index) in details.existFile" :key="index" class="custom-slide">
            <img  class="swiper_bottom_img" :src="file.FileLink" alt="">
            <button class='zoom_img' @click="handlePreview(file)">
      <img src="@/assets/zoom.png">
    </button>
          </swiper-slide>
        </swiper-container>
        <div class="swiper_pagination">
        </div>
        <!-- <div class="modal fade" id="photo1" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="photoModalLabel">瀏覽</h5>
                  <div class="close_icon">
                    <p type="button" data-bs-dismiss="modal" aria-label="Close">X</p>
                  </div>
                </div>
                <div class="modal-body">
                </div>
              </div>
            </div>
          </div> -->
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
      </div>
      <!-- Delete Modal -->
      <div class="modal fade delete_modal" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              確定刪除這筆項目嗎？
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">否</button>
              <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="deleteData">是</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    register
  } from 'swiper/element/bundle';
  import {
    Pagination
  } from 'swiper/modules';
  register();
  import warn from '@/components/utils/warn_title.vue'
  import Navbar from "@/components/Navbar.vue";
  import viewOrder from "@/components/receive_page/order_view_btn.vue"
  import {
    onMounted,
    ref,
    reactive,
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import axios from '@/axios/tokenInterceptor';
  export default {
    components: {
      Navbar,
      viewOrder,
      warn
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AR_ID = route.query.search_id;
      const details = ref({});
      const previewParams = reactive({
        title: '',
        src: '',
      })
      onMounted(() => {
        getDetails();
      })
      async function getDetails() {
        try {
          const response = await axios.get(`https://localhost:44302/GetDBdata/ReceivingGetData?ar_id=${AR_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            // if(data.resultList.Status !== '待入庫') {
            // window.history.back();
            // // router.push({name: 'Store_Process_Datagrid'});
            // }
            details.value = data.resultList;
            console.log('單筆資料如下\n', details.value);
            if (details.value.WarrantyStartDate) {
              details.value.WarrantyStartDate = details.value.WarrantyStartDate.replace(/-/g, '/');
            }
            if (details.value.WarrantyEndDate) {
              details.value.WarrantyEndDate = details.value.WarrantyEndDate.replace(/-/g, '/');
            }
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
      async function deleteData() {
        const form = new FormData();
        form.append('AR_ID', AR_ID);
        try {
          const response = await axios.post(`https://localhost:44302/ReceivingMng/DeleteReceipt`, form);
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages + '\n';
            msg += '單號:' + data.resultList.ShipmentNum;
            alert(msg);
            router.push({
              name: 'Receive_Datagrid'
            });
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      function handlePreview(file) {
        // 先提取副檔名
        // 以"."為基準分割字串
        const part = file.FileName.split(".");
        let extension = '';
        // 如果part長度大於1表示xxxx.aaa => ['xxxx','aaa']
        if (part.length > 1) {
          extension = part[part.length - 1];
        }
        // 1. pdf 2. word 3. picture
        switch (extension) {
          case 'pdf':
            window.open(file.FileLink)
            break;
          case 'doc':
          case 'docx':
            const downloadElement = document.getElementById('download-link');
            downloadElement.href = file.FileLink;
            downloadElement.download = file.FileName;
            downloadElement.click();
            break;
          default:
            previewParams.title = file.FileName;
            previewParams.src = file.FileLink;
            const modal = document.querySelector('#openModal');
            modal.click();
            break;
        }
      }
      function goBack() {
        window.history.back();
      }
      return {
        details,
        previewParams,
        deleteData,
        handlePreview,
        goBack,
        pagination: {
          clickable: true,
        },
        modules: [Pagination],
      }
    },
  }
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";

.readonly_box {
  @include readonly_box;
}

.input-number {
  @include count_btn;
}

.main_section {
  input {
    @include dropdown_btn;
    height: 35px;
  }

  .swiper_section swiper-slide {
    img {
      padding: 40px;
    }
  }

  .info_wrap {
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
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
        }
      }
    }
  }
}

.selected_user_wrap {
  gap: 0 5px;
  display: flex;

  .selected_user {
    background: #8B8989;
    color: white !important;
    border-radius: 7px;
    padding: 5px;
  }
}

span {
  @include red_star
}

.selected_file {
  flex-direction: column;

  .icon {
    margin: 0 10px;
    gap: 5px;
    display: flex;
    ;

    img {
      cursor: pointer;
      margin: 0 5px
    }

    .close_icon {
      scale: 1.5
    }
  }

  p::before {
    margin-right: 10px;
    content: '·';
    font-weight: 700;
    color: white;
  }
}

.modal {
  .modal-body {
    padding: 20px;
    margin: auto;
  }

  .modal-content {
    margin: auto;
  }

  .modal-header {
    h5 {
      font-weight: 700;
    }

    background: #528091;
    color: white;
    display: flex;
    justify-content: center;
    padding: 0 16px 16px;

    .close_icon {
      height: 40px;
      cursor: pointer;
    }

    .modal-title {
      margin: auto;
      padding-top: 16px;
    }
  }
}

.custom-slide {
  display: flex;
  align-self: center;
}

.button_wrap {
  display: flex;
            justify-content: space-between;
            margin: 30px auto 5%;
            width: 210px;
  .back_btn{
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

@media only screen and (min-width: 1200px) {
  .main_section {
    .swiper_section {
      swiper-slide img {
        padding: 40px 0;
      }
    }

    .info_wrap {
      margin: auto;
      width: 800px;

      .content {
        p {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
          color: white;
        }

        .input-group {
          flex-wrap: nowrap;

          .input-group-prepend {
            white-space: nowrap;
            width: 135px;
            text-align: end;
          }
        }
      }
    }

    .info_wrap:nth-child(3) {
      margin-top: 3%;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .readonly_box {
      width: 150px !important;
    }

    .swiper_section {
      swiper-slide img {
        padding: 40px 0;
      }
    }

    .info_wrap {
      margin: auto;
      width: 700px;

      .content {
        p {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
          color: white;
        }

        .input-group {
          flex-wrap: nowrap;

          .form-control {
            width: 55%;
          }

          .input-group-prepend {
            white-space: nowrap;
            width: 170px;
            text-align: end;
          }
        }
      }
    }

    .info_wrap:nth-child(3) {
      margin-top: 5%;
    }

    .info_wrap:nth-child(2) {
      .content {
        padding: 20px 39px 20px 0
      }
    }
  }


}

@media only screen and (max-width: 767px) {
  .main_section {
    .selected_file {
      margin-top: 10px;
      color: white;
      align-items: flex-start;
      font-weight: 700;
      flex-direction: column;

      .icon {
        margin: 0 10px;
        gap: 5px;
        display: flex;
        align-items: flex-start;

        img {
          margin: 0 5px;
        }
      }
    }

    .number-input-box,
    input {
      width: 100%
    }

    .swiper_section swiper-slide {
      img {
        padding: 40px;
      }
    }

    .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
      margin-left: 0 !important;
      border-radius: 5px;
    }

    .info_wrap {
      padding: 0 5%;

      .content {
        .row {
          gap: 10px 0;
        }

        .input-group {
          flex-direction: column;

          .input-number {
            width: 100%;
          }

          .form-control {
            width: 100%;
            height: 35px;
            border-radius: 0;
            margin-left: unset !important;
          }

          .input-group-prepend {
            margin-bottom: 5px;
          }
        }
      }
    }

    .info_wrap:nth-child(3) {
      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: unset !important;
        border-radius: 5px;
      }
    }
  }

}
</style>