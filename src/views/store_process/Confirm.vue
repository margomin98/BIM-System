<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產入庫交付</h1>
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
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <input class="form-control readonly_box" aria-label="With textarea" readonly>
          </div>
        </div>
      </div>
      <div class='confirm_section'>
        <h2>
          交付確認
        </h2>
        <div class='final'>
          <div class="fixed_info">
            <div>
              <p>交付日期: 2023/04/01</p>
            </div>
          </div>
          <div class="row auth g-0">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">交付人員：</div>
                <input type="text" class="form-control readonly_box" aria-label="Default"
                  aria-describedby="inputGroup-sizing-default" readonly :value="validationStatus(1)" />
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                  驗證
                </button>
                <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false"
                  tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel1">交付人員驗證</h5>
                        <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
                      </div>
                      <div class="modal-body">
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">帳號：</div>
                            <input type="text" class="form-control" aria-label="Default"
                              aria-describedby="inputGroup-sizing-default" v-model="validation.user1.account" />
                          </div>
                        </div>
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">密碼：</div>
                            <input type="password" class="form-control" aria-label="Default"
                              aria-describedby="inputGroup-sizing-default" v-model="validation.user1.password" />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer m-auto">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate(1)">驗證</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">入庫人員：</div>
                <input type="text" class="form-control readonly_box" aria-label="Default"
                  aria-describedby="inputGroup-sizing-default" readonly :value="validationStatus(2)" />
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                  驗證
                </button>
                <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false"
                  tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content ">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel2">入庫人員驗證</h5>
                        <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
                      </div>
                      <div class="modal-body">
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">帳號：</div>
                            <input type="text" class="form-control" aria-label="Default"
                              aria-describedby="inputGroup-sizing-default" v-model="validation.user2.account" />
                          </div>
                        </div>
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">密碼：</div>
                            <input type="password" class="form-control" aria-label="Default"
                              aria-describedby="inputGroup-sizing-default" v-model="validation.user2.password" />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer m-auto">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate(2)">驗證</button>
                      </div>
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
        <button class="send_btn" @click="submit" :disabled ="!canSubmit()">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
export default {
  components: {
    Navbar,
  },
  setup() {
    const validation = ref({
      user1: {
        account: '',
        password: '',
        isValidate: false,
      },
      user2: {
        account: '',
        password: '',
        isValidate: false,
      },
    });
    //分別使用帳號密碼驗證、改變驗證狀態
    async function validate(user) {
      var msg = '';
      if(user === 1 ) {
        msg+= validation.value.user1.account + '\n' +validation.value.user1.password;
        alert(msg);
        validation.value.user1.isValidate =true;
      }
      if(user === 2 ) {
        msg+= validation.value.user2.account + '\n' +validation.value.user2.password;
        alert(msg);
        validation.value.user2.isValidate =true;
      }
    }

    function validationStatus(user) {
      if(user === 1) {
        return validation.value.user1.isValidate ? '已驗證' : '未驗證'
      }
      else if(user === 2) {
        return validation.value.user2.isValidate ? '已驗證' : '未驗證'
      }
    }
    function canSubmit() {
      return validation.value.user1.isValidate && validation.value.user2.isValidate;
    }
    function submit() {
      alert('pass');
    }
    function goBack() {
      window.history.back();
    }
    return {
      validation,
      validate,
      validationStatus,
      canSubmit,
      submit,
      goBack,
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

  h2 {
    margin-top: 50px;
    text-align: center;
    font-size: 35px;
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
      padding: 0 28%;
      margin-bottom: 5%;
      gap: 20px;

      button.back_btn {
        @include back_to_previous_btn;

        &:hover {
          background-color: #5d85bb;
        }
      }

      button.send_btn {
        @include search_and_send_btn;

        &:hover {
          background-color: #5e7aa2;
        }
      }
    }

    .confirm_section {
      .auth {
        border-radius: 0 0 10px 10px;
        background: white;
        height: 80px;
        padding: 20px;

        button {
          @include auth_btn;

          &:hover {
            background: #5a6d87;
          }
        }

        .form-control {
          height: 35px;
          border-radius: 0;
        }

        .input-group-prepend {
          font-weight: 700;
          font-size: 20px;
          width: 120px;
          text-align: end;
        }
      }

      .modal {
        .modal-body {
          padding: 16px 16px 0;
        }

        .modal-content {
          width: 400px;
          margin: auto;
        }

        .input-group-prepend {
          width: auto;
        }

        .modal-footer {
          padding: 0 12px 12px;
          border: none;
        }

        .modal-header {
          h5 {
            font-weight: 700;
          }

          background: #3D4E61;
          color: white;

          .close_icon {
            cursor: pointer;
          }
        }
      }
    }
  }
}</style>
