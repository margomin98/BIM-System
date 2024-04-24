<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        刪除維修單
      </h1>
    </div>
    <div class="info_wrap col">
     <warn/>
      <!-- 維修編號，申請人員，申請日期 -->
      <div class="fixed_info">
        <div>
          <p>
            維修編號 : {{ details.RepairId }}
          </p>
        </div>
        <div>
          <p>
            申請人員 : {{ details.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請日期 : {{ details.ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row g-0">
          <!-- 送修人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                送修人員：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.RepairPerson">
            </div>
          </div>
          <!-- 交付日期 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                交付日期：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.DeliveryDate">
            </div>
          </div>
        </div>
        <div class="row g-0">
          <!-- 審核人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                審核人員：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.VerifyPerson">
            </div>
          </div>
          <!-- 審核結果 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                審核結果：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.VerifyResult">
            </div>
          </div>
        </div>
        <!-- 審核日期 -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group d-flex mb-4">
            <div class="input-group-prepend">
              審核日期：
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.VerifyDate">
          </div>
        </div>
        <div class="row g-0">
          <!-- 資產編號 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                資產編號：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.AssetsId">
            </div>
          </div>
          <!-- 物品名稱 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                物品名稱：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.AssetName">
            </div>
          </div>
        </div>
        <!-- 問題描述 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              問題描述：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" readonly>{{ details.Question }}</textarea>
          </div>
        </div>
        <!-- 報修照片 -->
        <div class="col-12 repair_photo_section">
          <div class="input-group mt-3">
            <div class="input-group-prepend">報修照片：
            </div>
            <div>
            </div>
          </div>
          <swiper-container class="swiper_section" :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
            <swiper-slide v-for="(item , index) in details.existFile" :key="index"> 
            <img  class="swiper_bottom_img" :src="item.FileLink">
            <button class='zoom_img' @click="handlePreview(item)">
              <img src="@/assets/zoom.png">
            </button>
             </swiper-slide>
          </swiper-container>
          <div class="swiper_pagination">
          </div>
        </div>
      </div>
      <div class="fixed_info mt-5">
        <div>
          <p>
            維修資訊
          </p>
        </div>
      </div>
      <div class="content">
        <!-- 維修廠商 -->
        <div class="col-12">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              維修廠商：
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.RepairCompany">
          </div>
        </div>
        <!-- 外部維修單號 -->
        <div class="col-12">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              外部維修單號：
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.ExternalRepairId">
          </div>
        </div>
        <div class="row g-0">
          <!-- 廠商聯絡人 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                廠商聯絡人：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.ContactPerson">
            </div>
          </div>
          <!-- 聯絡電話 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                聯絡電話：
              </div>
              <input type="text" class="form-control readonly_box" readonly v-model="details.ContactPhone">
            </div>
          </div>
        </div>
        <!-- 送修日期 -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group d-flex mb-4">
            <div class="input-group-prepend">
              送修日期：
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.RepairDate">
          </div>
        </div>
        <!-- 備註 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              備註：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" readonly> {{ details.Memo }}</textarea>
          </div>
        </div>
        <!-- 已上傳文件-->
        <div class="col-12 repair_photo_section">
          <div class="input-group mt-3">
            <div class="input-group-prepend">已上傳的文件：</div>
            <div class="selected_file">
              <!-- v-for讀取已上傳物流文件 -->
              <div class="file_upload_wrap" v-for="(file , index) in details.existDocument" :key="index">
                <p>{{ file.FileName }}
                  <!-- 在handlePreview依據不同副檔名做不同處理 -->
                  <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;cursor: pointer;" @click="handlePreview(file)">
                </p>
              </div>
              <!-- doc/docx download hidden Link -->
              <a href="" style="display: none;" id="download-link"></a>
              <!-- Modal Trigger -->
              <button type="button" style="display: none" id="openModal" data-bs-toggle="modal" data-bs-target="#documentModal"></button>
              <!-- Exist Document Modal -->
              <div class="modal preview_modal fade" id="documentModal" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
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
              <!-- <div class="file_upload_wrap" style="cursor: pointer;">
                      <p>File 1</p>
                      <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;">
                    </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <!-- Modal Trigger -->
        <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
      </div>
      <!-- delete Modal -->
      <div class="modal fade delete_modal" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-sm">
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
    ref,
    onMounted,
    reactive
  } from 'vue';
  import {
    useRoute
  } from 'vue-router'
  import axios from 'axios';
  import warn from "@/components/Delete_warn.vue"
  import Navbar from '@/components/Navbar.vue';
  import router from '@/router';
  import {
    register
  } from 'swiper/element/bundle';
  import {
    Pagination
  } from 'swiper/modules';
  import {
    canEnterPage,
    goBack
  } from '@/assets/js/common_fn.js'
  import {
    Repair_Delete_Status
  } from '@/assets/js/enter_status';
  register();
  export default {
    components: {
      Navbar,
      warn
    },
    setup() {
      const route = useRoute();
      const RepairId = route.query.search_id;
      const details = ref({});
      const previewParams = reactive({
        title: '',
        src: '',
      })
      onMounted(() => {
        getDetails();
      });
      // 取得單筆資料
      async function getDetails() {
        axios.get(`http://192.168.0.177:7008/GetDBdata/GetRepairInfo?r_id=${RepairId}`)
          .then((response) => {
            const data = response.data;
            if (data.state === 'success') {
              canEnterPage(data.resultList.Status, Repair_Delete_Status)
              details.value = data.resultList;
              console.log('資料:\n', details.value);
            } else if (data.state === 'account_error') {
              alert(data.messages);
              router.push('/');
            } else {
              alert(data.messages);
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
      async function deleteData() {
        const form = new FormData();
        form.append('RepairId', RepairId);
        const axios = require('axios');
        const response = await axios.post(`http://192.168.0.177:7008/RepairMng/DeleteReceipt`, form);
        try {
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages + '\n';
            msg += '單號:' + data.resultList.R_ID;
            alert(msg);
            router.push({
              name: 'Repair_Datagrid'
            });
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      // 處理瀏覽文件
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
      return {
        details,
        previewParams,
        goBack,
        deleteData,
        handlePreview,
        pagination: {
          clickable: true,
        },
        modules: [Pagination]
      }
    }
  };
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
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
  
.preview_modal {
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
  }
}
.readonly_box {
  @include readonly_box;
}
.input-number {
  @include count_btn;
}
span {
  @include red_star;
}
.button_wrap {
  display: flex;
  justify-content: center;
  margin: 30px auto 5%;
  width: 220px;
  .back_btn {
    @include back_to_previous_btn;
    &:hover {
      background-color: #5d85bb;
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
      .input-group {
        .readonly_box,
        .form-control {
          height: 35px;
          border-radius: 0;
        }

        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
        }
      }
      .repair_photo_section {
        .selected_file {
          p.title {
            font-weight: 700;
            color: white;
            margin-bottom: 5px;
          }
          .file_upload_wrap {
            display: flex;
            img {
              width: 25px;
              height: 25px;
            }
            p {
              margin-bottom: 0;
              font-weight: 700;
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
@media only screen and (min-width: 1200px) {
  .main_section {
 
    .info_wrap {
      margin: 8px auto 5%;
      width: 800px;

      .content {
        .input-group {
          .input-group-prepend {
            text-align: end;
            width: 140px;
          }
        }
        .repair_photo_section {
          .input-group {
            flex-wrap: unset;
          }
          .input-group-prepend {
            white-space: nowrap;
          }
          .selected_file {
            .file_upload_wrap {
              margin-bottom: 5px;
              gap: 5px 0;
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
      margin: 8px auto 5%;
      width: 750px;

      .content {
        .input-group {
          width: 100%;
          white-space: nowrap;
          flex-wrap: nowrap;

          .readonly_box,
          .input-number {
            width: 100%;
          }
          .form-control {
            width: 55%;
          }
          .input-group-prepend {
            text-align: end;
            width:140px;
          }
        }
        .repair_photo_section {
          .input-group {
            white-space: unset;
            .input-group-prepend {
              white-space: nowrap;
            }
          }
        }
        .selected_file {
          margin-left: 20px;

          .file_upload_wrap {
            margin-bottom: 5px;
            gap: 5px 0;
          }
        }
      }
      .content:nth-child(4) {
        .input-group-prepend {
          width: 140px;
        }
        .input-group .form-control {
          width: 54%;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .main_section {
    .readonly_box {
      height: 35px;
      margin-left: unset !important;
    }
    .info_wrap {
      padding: 0 5%;
      .fixed_info {
        height: unset;
        flex-direction: column;
        padding: 10px;
      }
      .content {
        .input-group {
          flex-direction: column;
          .input-group
            > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
              .valid-feedback
            ):not(.invalid-tooltip):not(.invalid-feedback) {
            margin-left: unset;
            border-radius: 5px;
            margin-top: 5px;
          }
          .input-number,
          .form-control {
            margin-left: unset !important;
          }
          .form-control {
            width: 100%;
          }
          .input-group-prepend {
            margin-bottom: 5px;
            width: 100px;
            white-space: nowrap;
          }
        }
        .selected_file {
          .file_upload_wrap {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>