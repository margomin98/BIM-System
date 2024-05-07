<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        檢視報廢
      </h1>
    </div>
    <div class="info_wrap col">
      <!-- 報廢編號，申請人員，申請日期 -->
      <div class="fixed_info">
        <div>
          <p>
            報廢編號 : {{ details.ScrapId }}
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
          <!-- 報廢人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                報廢人員：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.ScrapPerson">
            </div>
          </div>
          <!-- 交付日期 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                交付日期：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.DeliveryDate">
            </div>
          </div>
        </div>
        <div class="row g-0">
          <!-- 審核人員 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                審核人員：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.VerifyPerson">
            </div>
          </div>
          <!-- 審核結果 -->
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                審核結果：
              </div>
              <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.VerifyResult">
            </div>
          </div>
        </div>
        <!-- 審核日期 -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group d-flex mb-3">
            <div class="input-group-prepend">
              審核日期：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.VerifyDate">
          </div>
        </div>
        <!--  資產編號 -->
        <div class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              資產編號：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.AssetsId">
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="details.AssetName">
          </div>
        </div>
        <!-- 報廢方式 -->
        <div v-show="Assets.Type==='耗材'" class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">報廢方式：</div>
            <div class="check_section d-flex">
              <template v-for="(item,index) in Scrap_TypeArray" :key="item">
                <div class="form-check d-flex align-items-center">
                  <input type="radio" :id="'no'+index" name="radio" :value="item" v-model="details.ConsumableScrap" :disabled="details.ConsumableScrap !== item"/>
                  <label :for="'no'+index">{{ item }}</label>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- scrap_hint -->
        <div v-show="Assets.Type==='耗材'" class="col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
            </div>
            <span v-if="details.ConsumableScrap == '歸還報廢'" class="scrap_hint">對已出庫耗材進行報廢處理</span>
            <span v-else-if="details.ConsumableScrap == '庫內報廢'" class="scrap_hint">對庫內耗材進行報廢處理(有庫存上限)</span>
          </div>
        </div>
        <!-- 報廢數量 -->
        <div v-show="Assets.Type==='耗材'" class="col-12">
          <div class="input-group  mb-3">
            <div class="input-group-prepend">報廢數量：</div>
            <div class="num_wrap d-flex ">
              <div class="number-input-box">
                <input class="input-number readonly_box" type="number" readonly v-model="details.ConsumableNum"/>
                <span class="scrap_quantity">{{ Assets.Unit }}</span>
                <!-- <span class="scrap_quantity_storage">（總庫存量 {{ Assets.Max }}）</span> -->
              </div>
            </div>
          </div>
        </div>
        <!-- 報廢原因 -->
        <div class="col-12">
          <div class="input-group d-flex">
            <div class="input-group-prepend">
              報廢原因：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" readonly v-model="details.Reason"></textarea>
          </div>
        </div>
        <!-- 已上傳檔案 -->
    <!-- 已上傳檔案 -->
    <div class="selected_file col-12">
      <div class="input-group mt-3">
        <div class="input-group-prepend">已上傳檔案：</div>
        <div class="d-flex  flex-column selected_file_wrap">
          <div v-for="(file , index) in details.existFile" :key="index" class="file_upload_wrap">
            <p class='file_name'>{{ file.FileName }}
              <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;"  @click="viewImgFile(index,details,modalParams,'exist')" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
            </p>
          </div>
        </div>
      </div>
    </div>
        <!-- ViewFile Modal -->
        <div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ modalParams.title }}</h5>
                <p data-bs-dismiss="modal" class='close_icon'>X</p>
              </div>
              <div class="modal-body">
                <img :src="modalParams.src" alt="Uploaded Image" class="w-100" />
              </div>
            </div>
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
  import {
    ref,
    reactive,
    onMounted
  } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import router from '@/router';
  import {
    viewImgFile,
    goBack
  } from '@/assets/js/common_fn.js'
  import {
    getAssets
  } from '@/assets/js/common_api.js'
  import axios from '@/axios/tokenInterceptor';
  import {
    useRoute
  } from 'vue-router';
  import { Scrap_TypeArray } from '@/assets/js/dropdown';
  export default {
    components: {
      Navbar
    },
    setup() {
      const route = useRoute();
      const ScrapId = route.query.search_id;
      const details = ref({});
      const Assets = reactive({
        Name: '',
        Type: '',
        Status: '',
        Unit: '',
        Max: 1,
      });
      const modalParams = reactive({
        title: '',
        src: '',
      });
      onMounted(() => {
        getDetails()
      });
      async function getDetails() {
        axios.get(`https://localhost:44302/GetDBdata/GetScrapInfo?s_id=${ScrapId}`)
          .then((response) => {
            const data = response.data
            if (data.state === 'success') {
              details.value = data.resultList
              getAssets(details.value.AssetsId)
              .then((data)=>{
                Assets.Type = data.AssetType;
                Assets.Unit = data.Unit;
                Assets.Max = data.Number;
              })
              .catch((error) => {
                console.error(error);
              })
            } else if (data.state === 'account_error') {
              alert(data.messages)
              router.push('/');
            } else {
              alert(data.messages)
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
      return {
        details,
        modalParams,
        Assets,
        Scrap_TypeArray,
        viewImgFile,
        goBack,
      }
    },
  };
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .input-number {
  @include count_btn;
}
.readonly_box {
  @include readonly_box;
}
span {
  @include red_star;
}
.scrap_quantity,
.scrap_quantity_storage {
  font-size: 20px;
  color: white;
  font-weight: 700;
  margin-left: 10px;
}
.scrap_hint {
  font-weight: 700;
  color: #00438b;
  font-size: 18px;
}
.check_section {
  gap: 10px;
  .form-check {
    gap: 5px;
    padding: 0;
    margin: 0;
    input {
      width: 15px;
      padding: 0;
      height: 15px;
      border-radius: 50%;
    }
    label {
      color: white;
      font-size: 20px;
      font-weight: 600;
    }
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
  }
}
.file_wrap {
  display: flex;
  flex-direction: column;
  .choose_btn {
    margin-bottom: 10px;
    @include choose_file_btn;
    &:hover {
      background: #3f608f;
    }
  }
}
.file_name::before {
  margin-right: 5px;
  content: "·";
  font-weight: 700;
  color: white;
}
.selected_file {
  display: flex;
  align-items: center;

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
.button_wrap {
  display: flex;
  justify-content: center;
  margin: 30px auto 5%;
  width: 220px;
  button {
    &:nth-child(1) {
      @include back_to_previous_btn;
      &:hover {
        background-color: #5d85bb;
      }
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
          height: 37px;
        }
        flex-wrap: nowrap;
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          white-space: nowrap;
        }
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      margin: 8px auto 5%;
      width: 750px;

      .content {
        .input-group {
          .input-group-prepend {
            text-align: end;
            width: 120px;
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
      padding: 0 5%;

      .content {
        .input-group {
          width: 100%;
          .num_wrap {
            .input-number {
              width: 50%;
            }
          }
          .readonly_box {
            width: 100%;
          }
          .form-control {
            width: 65%;
          }
          .input-group-prepend {
            text-align: end;
            width: 110px;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .main_section {
    .readonly_box,
    .input-group .number-input-box,
    .form-control {
      margin-left: unset !important;
    }

    .form-control,
    .input-number,
    .input-group-prepend,
    .num_wrap .number-input-box {
      width: 100%;
    }
    .info_wrap {
      padding: 0 5%;
      .fixed_info {
        height: unset;
        flex-direction: column;
        padding: 10px;
      }
      .content {
        .input-group
          > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
            .valid-feedback
          ):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset;
          border-radius: 5px;
          margin-top: 5px;
        }
        .input-group {
          flex-direction: column;
          .num_wrap {
            .number-input-box {
              .input-number {
                width: 20%;
              }
            }
          }

          .input-group-prepend {
            white-space: nowrap;
          }
        }
      }
    }
  }
}


</style>