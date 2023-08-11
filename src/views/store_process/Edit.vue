<template>
  <Navbar />
  <input
    class="file_list"
    type="file"
    ref="fileInput"
    style="display: none"
    @change="handleFileChange"
    multiple
  />
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
          <p>資產類型：耗材</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">編號：</div>
            <input
              type="text"
              class="form-control readonly_box"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              readonly
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">狀態：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
                placeholder="備料中"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備總類：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
              />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備分類：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">物品名稱：</div>
            <input
              type="text"
              class="form-control readonly_box"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              readonly
            />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">廠商：</div>
            <input
              type="text"
              class="form-control readonly_box"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              readonly
            />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">型號：</div>
            <input
              type="text"
              class="form-control readonly_box"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              readonly
            />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">規格：</div>
            <input
              type="text"
              class="form-control readonly_box"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              readonly
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">數量：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
              />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固期限：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固開始日：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
              />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固到期日：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫人員：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
              />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫日期：</div>
              <input
                type="text"
                class="form-control readonly_box"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <input
              class="form-control readonly_box"
              aria-label="With textarea"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="tab_section mt-5">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              1
            </button>
            <button
              class="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              2
            </button>
            <button
              class="nav-link"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              3
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            tabindex="0"
          >
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>物品名稱：</div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  readonly
                />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>資產編號：</div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  readonly
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>區域：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    readonly
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>櫃位：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>數量：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    readonly
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>單位：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  readonly
                />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註：</div>
                <input class="form-control" aria-label="With textarea" />
              </div>
            </div>
            <div class="col">
              <div class="col">
                <div class="input-group file_wrap">
                  <div class="input-group-prepend">資產照片：</div>
                  <button class="choose_btn" @click="openFileExplorer">選擇檔案</button>
                  <div class="selected-files">
                    <div
                      v-for="(file, index) in selectedFiles"
                      :key="index"
                      class="selected-file"
                    >
                      <p class="file-number">{{ index + 1 }}.</p>
                      {{ file.name }}
                      <span @click="removeSelectedFile(index)" class="delete-icon">
                        <img src="@/assets/trash.png" alt="Delete" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
            tabindex="0"
          >
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>物品名稱：</div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>資產編號：</div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>區域：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>櫃位：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>數量：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>單位：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註：</div>
                <input
                  class="form-control"
                  aria-label="With textarea"
                />
              </div>
            </div>
             <div class="col">
              <div class="col">
                <div class="input-group file_wrap">
                  <div class="input-group-prepend">資產照片：</div>
                  <button class="choose_btn" @click="openFileExplorer">選擇檔案</button>
                  <div class="selected-files">
                    <div
                      v-for="(file, index) in selectedFiles"
                      :key="index"
                      class="selected-file"
                    >
                      <p class="file-number">{{ index + 1 }}.</p>
                      {{ file.name }}
                      <span @click="removeSelectedFile(index)" class="delete-icon">
                        <img src="@/assets/trash.png" alt="Delete" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
            tabindex="0"
          >
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>物品名稱：</div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>資產編號：</div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>區域：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>櫃位：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>數量：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend"><span>*</span>單位：</div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註：</div>
                <input
                  class="form-control"
                  aria-label="With textarea"
                />
              </div>
            </div>
         <div class="col">
              <div class="col">
                <div class="input-group file_wrap">
                  <div class="input-group-prepend">資產照片：</div>
                  <button class="choose_btn" @click="openFileExplorer">選擇檔案</button>
                  <div class="selected-files">
                    <div
                      v-for="(file, index) in selectedFiles"
                      :key="index"
                      class="selected-file"
                    >
                      <p class="file-number">{{ index + 1 }}.</p>
                      {{ file.name }}
                      <span @click="removeSelectedFile(index)" class="delete-icon">
                        <img src="@/assets/trash.png" alt="Delete" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">上一頁</button>
        <button class="empty_btn">清空</button>
        <button class="save_btn">暫存</button>
        <button class="send_btn">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      selectedFiles: [],
      storedImages: {
        tab1: [],
        tab2: [],
        tab3: [],
      },
    };
  },
  methods: {
    sortSelectedFiles() {
      this.selectedFiles.sort((a, b) => a.name.localeCompare(b.name));
    },
    openFileExplorer() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const files = event.target.files;
      this.selectedFiles = Array.from(files).map((file) => {
        return {
          name: file.name,
          src: URL.createObjectURL(file),
        };
      });
    },
    removeSelectedFile(index) {
      this.selectedFiles.splice(index, 1);
    },
    goBack() {
      window.history.back();
    },
  },
  mounted() {
    const storedImages = JSON.parse(localStorage.getItem("storedImages"));
    if (storedImages) {
      this.storedImages = storedImages;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
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
          background: #385e96;
          height: 40px;
          width: 90px;
          color: #fff;
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
      .selected-files {
            align-items: center;
    display: flex;
        color: white;
        div {
          display: flex;
          gap: 5px;
          text-decoration: underline;
          font-weight: 700;
          p {
            margin-bottom: 0;
          }
        }
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
        padding: 50px 30px;
        .input-group {
          span {
            @include red_star;
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
          .delete_icon {
            align-items: center;
            display: flex;
          }
          .img_visit {
            border: none;
            font-weight: 800;
            color: white;
            font-size: 18px;
            padding: 0;
            text-decoration: underline;
            &::before {
              content: "·";
              font-weight: 800;
              font-size: 18px;
            }
          }
          .choose_btn {
            @include choose_file_btn;
            &:hover {
              background: #3f608f;
            }
          }
        }
      }
    }
  }
}
</style>
