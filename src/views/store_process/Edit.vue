<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產入庫作業</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>申請人員: 陳奕迅</p>
        </div>
        <div>
          <p>申請入庫日期: 2023/04/01</p>
        </div>
        <div>
          <p>資產類型:耗材</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">編號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                狀態：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly placeholder="備料中">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備總類：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備分類：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">物品名稱：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">廠商：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">型號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">規格：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">數量：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固開始日：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固到期日：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <input class="form-control readonly_box" aria-label="With textarea" readonly>
          </div>
        </div>
      </div>
      <div class="tab_section mt-5">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab"
              aria-selected="true">
              1
            </button>
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab"
              aria-selected="false">
              2
            </button>
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab"
              aria-selected="false">
              3
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">

          <div v-for="(item, index) in formData" :key="index"
            :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel"
            aria-labelledby="tab1-tab">
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>物品名稱：</div>
                <input type="text" class="form-control" aria-label="Default"
                  aria-describedby="inputGroup-sizing-default" />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>資產編號：</div>
                <input type="text" class="form-control" aria-label="Default"
                  aria-describedby="inputGroup-sizing-default" />
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span>*</span>區域：
                  </div>
                  <input type="text" class="form-control" aria-label="Default"
                    aria-describedby="inputGroup-sizing-default">
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span>*</span> 櫃位：
                  </div>
                  <input type="text" class="form-control" aria-label="Default"
                    aria-describedby="inputGroup-sizing-default">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span>*</span>數量：
                  </div>
                  <input type="text" class="form-control" aria-label="Default"
                    aria-describedby="inputGroup-sizing-default">
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span>*</span>單位：
                  </div>
                  <input type="text" class="form-control" aria-label="Default"
                    aria-describedby="inputGroup-sizing-default">
                </div>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input type="text" class="form-control" aria-label="Default"
                  aria-describedby="inputGroup-sizing-default" />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  備註：
                </div>
                <input class="form-control" aria-label="With textarea">
              </div>
            </div>
            <div class="col">
              <!-- 選擇檔案button -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產照片：</div>
                <div class="mb-3 file_wrap">
                  <button class='choose_btn' @click="openFileExplorer">選擇檔案</button>
                  <input ref="fileInput" type="file" style="display: none;" multiple @change="handleFileChange" />
                </div>
                <div class='selected_file'>
                  <p class='title'>已選擇的檔案:</p>
                  <p class='file_upload_wrap' v-for="(file, index) in selectedFiles" :key="index">
                  <p @click="openImageModal(file.name)">{{ file.name }}</p>
                  <img class='delete_icon' src="@/assets/trash.png" @click="deleteFile(index)">
                  </p>
                </div>
              </div>
              <!-- 列出已選擇檔案 -->
              <div v-for="(file, index) in selectedFiles" :key="index" :id="'imageModal' + index" class="modal fade"
                tabindex="-1" role="dialog" aria-labelledby="imageModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="imageModalLabel">{{ file.name }}</h5>
                      <p data-bs-dismiss="modal" class='close_icon'>X</p>
                    </div>
                    <div class="modal-body">
                      <img :src="file.src" alt="Uploaded Image" class="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="save_btn">暫存</button>
        <button class="send_btn">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive , nextTick  } from 'vue';
import Navbar from "@/components/Navbar.vue";
import { useRoute } from 'vue-router';

export default {
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();
    const tabNumber = route.query.tab_number;
    const formData = reactive([]);
    function initFormDataArray() {
      for (let i = 0; i < tabNumber; i++) {
        formData.push({
          AssetName: '',
          AssetsId: '',
          AreaName: '',
          LayerName: '',
          Count: '',
          Unit: '',
          SN: '',
          Memo: '',
          File: [],
          previewUrl: []
        });
      }
    }
    const fileInputRef = ref(null);

    let currentTabIndex = null;

    const openFileExplorer = async (tabIndex) => {
      currentTabIndex = tabIndex;
      await nextTick(); // 等待下一個 DOM 更新周期，確保元素被初始化
      fileInputRef.value.click();
    };
    onMounted(() => {
      initFormDataArray();
    });

    return {
      formData,
      fileInputRef,
      openFileExplorer,
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

@media only screen and (min-width: 1200px) {
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
          }
        }
      }

      .button_wrap {
        display: flex;
        margin-top: 30px;
        justify-content: center;
        gap: 20px;
        margin-bottom: 5%;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include empty_btn;

            &:hover {
              background-color: #5e7aa2;
            }
          }

          &:nth-child(3) {
            display: inline-flex;
            padding: 10px 10px;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background: #385E96;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;

            &:hover {
              background-color: #57677c;
            }
          }

          &:nth-child(4) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
      }

      .tab_section {
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
          padding: 50px 30px;

          .modal {
            .modal-header {
              background: #3D4E61;
              color: white;

              .close_icon {
                color: white;
                font-weight: 700;
                margin-bottom: 0;
              }
            }
          }

          .input-group {
            span {
              @include red_star
            }

            .selected_file {
              margin-left: 20px;

              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }

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
            }

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

              .upload_btn {
                @include upload_file_btn;

                &:hover {
                  background: #2f507e;
                }
              }
            }
          }
        }
      }
    }
  }
}


@media only screen and (min-width: 768px) and (max-width: 1199px) {
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
      padding: 1% 5% 0;

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
          }
        }
      }

      .button_wrap {
        display: flex;
        margin-top: 30px;
        justify-content: center;
        gap: 20px;
        margin-bottom: 5%;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include empty_btn;

            &:hover {
              background-color: #5e7aa2;
            }
          }

          &:nth-child(3) {
            display: inline-flex;
            padding: 10px 10px;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background: #385E96;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;

            &:hover {
              background-color: #57677c;
            }
          }

          &:nth-child(4) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
      }

      .tab_section {
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
          padding: 50px 30px;

          .modal {
            .modal-header {
              background: #3D4E61;
              color: white;

              .close_icon {
                color: white;
                font-weight: 700;
                margin-bottom: 0;
              }
            }
          }

          .input-group {
            span {
              @include red_star
            }

            .selected_file {
              margin-left: 20px;

              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }

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
            }

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

              .upload_btn {
                @include upload_file_btn;

                &:hover {
                  background: #2f507e;
                }
              }
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
      @include readonly_box;
    }

    h1 {
      margin-top: 50px;
      text-align: center;
      font-size: 50px;
      font-weight: 600;
      @include title_color;
    }

    .info_wrap {
      padding: 1% 5% 0;

      .fixed_info {
        @include fixed_info;
        flex-direction: column;
        padding: 10px;
        height: unset;

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
          }
        }
      }

      .button_wrap {
        display: flex;
        margin-top: 30px;
        justify-content: center;
        gap: 20px;
        margin-bottom: 5%;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;
            padding: 10px;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include empty_btn;
            padding: 10px;

            &:hover {
              background-color: #5e7aa2;
            }
          }

          &:nth-child(3) {
            display: inline-flex;
            padding: 10px 10px;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background: #385E96;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            padding: 10px;

            &:hover {
              background-color: #57677c;
            }
          }

          &:nth-child(4) {
            @include search_and_send_btn;
            padding: 10px;

            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
      }

      .tab_section {
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
          padding: 50px 30px;

          .modal {
            .modal-header {
              background: #3D4E61;
              color: white;

              .close_icon {
                color: white;
                font-weight: 700;
                margin-bottom: 0;
              }
            }
          }

          .input-group {
            span {
              @include red_star
            }

            .selected_file {
              margin-left: 20px;

              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }

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
            }

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

              .upload_btn {
                @include upload_file_btn;

                &:hover {
                  background: #2f507e;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
