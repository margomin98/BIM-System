<template>
  <div>
    <div class="info_wrap col mb-5">
      <warn_title v-show="!hidden"></warn_title>
      <div class="fixed_info">
        <div>
          <p>
            申請人員 : {{ upperForm.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請入庫日期 : {{ upperForm.ApplicationDate }}
          </p>
        </div>
      </div>
      <div class="content">
        <!-- 單號 -->
        <div class="col mb-3" v-show="upperForm.AI_ID">
          <div class="input-group">
            <div class="input-group-prepend">單號 :</div>
            <input type="text" class="form-control readonly_box" v-model="upperForm.AI_ID" readonly>
          </div>
        </div>
        <!-- 訂購單號 -->
        <div class="col form_search_wrap mb-3">
          <div class="input-group">
            <div class="input-group-prepend">
              訂購單號 :
            </div>
            <div class="search_section">
              <input type="text" class="form-control readonly_box" v-model="upperForm.PO_ID" readonly />
            </div>
            <button class="form_search_btn" @click="storageStore.viewOrder(upperForm)">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{ name: 'Order_View', query: { search_id: upperForm.PO_ID } }" target="_blank"
              id="view-order" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 物流單號 -->
        <div class="col form_search_wrap mb-3">
          <div class="input-group">
            <div class="input-group-prepend">
              物流單號 :
            </div>
            <div class="search_section">
              <input type="text" class="form-control readonly_box" v-model="upperForm.ShipmentNum" readonly />
            </div>
            <button class="form_search_btn" @click="storageStore.viewReceive(upperForm)">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{ name: 'Receive_View', query: { search_id: upperForm.AR_ID } }" target="_blank"
              id="view-receive" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col mb-3">
          <div class="input-group">
            <div class="input-group-prepend">備註 :</div>
            <textarea style="height: 200px;" class="form-control readonly_box" v-model="upperForm.Memo"
              readonly></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <!-- 頁籤部分 -->
      <div v-show="tabData.length > 0" class="tab_section mt-5">
        <!-- tab頂端頁籤 -->
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button v-for="tab in parseInt(tabData.length)" :key="tab" :class="['nav-link', { active: tab === 1 }]"
              data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab">{{ tab }}</button>
          </div>
        </nav>
        <!-- tab內容 -->
        <div class="tab-content d-block" id="nav-tabContent">
          <div v-for="(tab, index) in tabData" :key="index"
            :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel">
            <!-- 頁籤資產類型 -->
            <div class="row">
              <div class="col-12">
                <div class="input-group mb-3 check_box_wrap">
                  <div class="input-group-prepend check_box">
                    資產類型 :
                  </div>
                  <div class="d-flex align-items-center radio_wrap">
                    <div class="form-check" v-for="(item, typeIndex) in DropdownArray.AssetType"
                      :key="'radio' + (typeIndex + 1)">
                      <input type="radio" class="form-check-input check_box"
                        :id="'radio_' + (index + 1) + (typeIndex + 1)"
                        style="border-radius: 100%; width: 16px; height: 16px;" :value="item"
                        v-model="tab.itemAssetType" :disabled="item !== tab.itemAssetType" />
                      <label class="form-check-label check_box" :for="'radio_' + (index + 1) + (typeIndex + 1)"
                        :data-toggle="typeIndex === 1 ? 'tooltip' : null"
                        :data-placement="typeIndex === 1 ? 'top' : null"
                        :title="typeIndex === 1 ? '註記此資產僅限特定專案出貨所使用' : null">
                        {{ item }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤專案代碼 -->
            <div class="col form_search_wrap">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  專案代碼 :
                </div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProjectCode" readonly>
              </div>
            </div>
            <!-- 頁籤專案名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">專案名稱 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProjectName" readonly>
              </div>
            </div>
            <!-- 頁籤設備 總類&分類 -->
            <div class="row row_wrap g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend equipment_wrap">
                    設備總類 :
                  </div>
                  <div class="dropdown">
                    <select class="form-select readonly_box" id="floatingSelect" v-model="tab.itemEquipType_Id"
                      disabled>
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.EquipType" :value="option.Id">{{ option.Name }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    設備分類 :
                  </div>
                  <div class="dropdown">
                    <select class="form-select readonly_box" id="floatingSelect" v-model="tab.itemCategory_Id" disabled>
                      <option v-if="tab.EquipCategoryArray.length == 0" value="">--請先選擇設備總類--</option>
                      <template v-else>
                        <option value="">--請選擇--</option>
                        <option v-for="option in tab.EquipCategoryArray" :value="option.Id">{{ option.Name }}</option>
                      </template>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤物品名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">物品名稱 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemAssetName" readonly>
              </div>
            </div>
            <!-- 頁籤資產編號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產編號 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemAssetsId" readonly>
              </div>
            </div>
            <!-- 頁籤廠商 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  廠商 :
                </div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemVendorName" readonly>
              </div>
            </div>
            <!-- 頁籤規格 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  規格 :
                </div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProductSpec" readonly>
              </div>
            </div>
            <!--頁籤型號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  型號 :
                </div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemProductType" readonly>
              </div>
            </div>
            <!-- 頁籤S/N -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N :</div>
                <input type="text" class="form-control readonly_box" aria-label="Default" v-model="tab.itemSN" readonly>
              </div>
            </div>
            <!-- 頁籤採購金額 -->
            <div class="row g-0 purchase_amount">
              <div class="col-xl-6 col-lg-auto col-md-auto col-12">
                <div class="input-group mb-xl-3 mb-lg-3 mb-md-3">
                  <div class="input-group-prepend">
                    採購金額 :
                  </div>
                  <div class="amount_input">
                    <span class="symbol">$</span> <input type="text" class="form-control readonly_box"
                      aria-label="Default" v-model="tab.itemPrice" readonly>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <span class="note">/每包裝單位<span v-show="tab.itemAssetType === '耗材'">($<span
                      class="purchase_total_amount">{{
        (tab.itemPrice / tab.itemCount).toFixed(2) }}</span>/每單位)</span></span>
              </div>
              <!-- <p>
                          / 每包裝單位 <p v-show="tab.itemAssetType==='耗材'">(NT${{ (tab.itemPrice / tab.itemCount).toFixed(2) }}/每單位)</p></p> -->
            </div>


            <!-- 頁籤 包裝數量 & 包裝單位 -->
            <div class="row g-0 row_wrap">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='number'>
                  <div class="input-group-prepend info  ">
                    <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none"
                      src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                    包裝數量 :<img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                  </div>
                  <input class="input-number readonly_box" type="number" v-model="tab.itemPackageNum" min="1" readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='unit'>
                  <div class="input-group-prepend">
                    包裝單位 :
                  </div>
                  <div class="dropdown">
                    <select class="form-select readonly_box" id="floatingSelect" v-model="tab.itemPackageUnit" disabled>
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.PackageUnit" :value="option">{{ option }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤 數量 & 單位 (only耗材) -->
            <div class="row g-0 row_wrap">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='number'>
                  <div class="input-group-prepend">
                    <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none"
                      src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top"
                      title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                    數量 :
                    <img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                  </div>

                  <input class="input-number readonly_box" type="number" v-model="tab.itemCount" min="1" readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='unit'>
                  <div class="input-group-prepend">
                    單位 :
                  </div>

                  <div class="dropdown">
                    <div v-if="tab.itemAssetType === '耗材'" class="dropdown">
                      <select class="form-select readonly_box" id="floatingSelect" v-model="tab.itemUnit" disabled>
                        <option v-for="option in DropdownArray.Unit" :value="option">{{ option }}</option>
                      </select>
                    </div>
                    <input v-else class="form-select readonly_box" type="text" v-model="tab.itemPackageUnit" min="1"
                      readonly>
                  </div>
                  <!-- <input  class="input-number" type="number" min="1"> -->
                  <!-- <input v-else class="input-number readonly_box" type="text" min="1" readonly> -->
                </div>
              </div>
            </div>
            <!-- 頁籤備註 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註 :</div>
                <textarea class="col readonly_box" rows="5" v-model="tab.itemMemo" readonly></textarea>
              </div>
            </div>
            <!-- 已上傳檔案 -->
            <div class="col selected_file">
              <div class="input-group my-3">
                <div class="input-group-prepend">已上傳檔案 :</div>
                <div class="store_new_file">
                  <div v-for="(file, file_index) in tab.existFile" :key="file_index" class="file_upload_wrap">
                    <p>{{ file.FileName }}
                      <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;"
                        @click="utilsStore.viewImgFile(file, file_index)" data-bs-toggle="modal"
                        data-bs-target="#viewFile_modal">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <view_modal />
    </div>
  </div>
</template>

<script setup>
// component
import view_modal from "@/components/view_modal.vue"
import warn_title from '@/components/utils/warn_title.vue';

// pinia
import { useUtilsStore } from '@/store'
import { useStorageStore } from '@/store/storage/_index'
import { useApplyStore } from '@/store/storage/apply'
import { storeToRefs } from "pinia";
import { onUnmounted } from "vue";
const storageStore = useStorageStore();
const applyStore = useApplyStore();
const utilsStore = useUtilsStore();
const { DropdownArray, upperForm, tabData } = storeToRefs(storageStore);
const { hidden } = storeToRefs(applyStore);

onUnmounted(() => {
  applyStore.$dispose();
  storageStore.$dispose();
  utilsStore.$dispose();
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

.form_search_btn {
  @include form_search_btn;
}

.readonly_box {
  @include readonly_box;
}

.purchase_amount {
  align-items: baseline;

  .input-group-prepend {
    margin-right: 10px;
  }

  .amount_input {
    display: flex;
    gap: 0 10px;
    margin-left: 0 !important;
  }

  span,
  p {
    color: white !important;
  }

  span.symbol {
    font-size: 22px;
  }

  span.note {
    font-weight: 700;
    font-size: 18px;
  }
}

textarea {
  padding: 5px 10px 30px;
}

.dropdown {

  #typeDropdown,
  #categoryDropdown,
  #areaDropdown {
    height: 38px;
    padding: 5px 10px !important;
  }
}

.delete_btn {
  background: var(--c-5, #e94b4b);
  justify-content: center;
  align-items: center;
  display: inline-flex;
  height: 40px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  border: none;
  position: absolute;
  bottom: -1%;
  width: 100%;
  z-index: 2;
  left: 0;
  right: 0;
  margin: 0;
  border-radius: 0 0 10px 10px;

  &:hover {
    background-color: #a51e1e;
  }
}

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

.count-modal {
  .modal-body {
    padding: 20px;
    margin: auto;

    p {
      text-align: center;
      font-weight: 800;
    }
  }

  .modal-content {
    margin: auto;
  }

  .modal-input-group-prepend {
    width: auto;
    font-weight: 700;
    font-size: 20px;
  }

  .modal-footer {
    padding: 0 12px 12px;
    border: none;
    justify-content: center;

    .confirm {
      color: white;
      background-color: #132238;

      &:hover {
        background-color: #426497;
      }
    }
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

.view_icon,
.trash_icon {
  cursor: pointer;
}

.options-list {
  position: absolute;
  z-index: 99;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  top: 40px;

  li {
    padding: 10px 10px 0;
    font-size: 18px;
    cursor: pointer;
  }
}

.search_section {
  position: relative;
  display: flex;
  flex: 1 1 auto;

  input {
    height: 35px;
    padding: 10px;
    border-radius: 5px;
    border: none;
  }

  .input-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: gray;
    font-size: 14px;
    pointer-events: none;
  }
}

.main_section {
  .info_wrap {
    margin: auto;

    .input-group-prepend {
      color: white;
      font-weight: 700;
      font-size: 20px;
      white-space: nowrap;
    }

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    .content {
      @include content_bg;

      .check_box_wrap {
        font-weight: 700;
        align-items: center;
        color: white;
        font-size: 18px;
      }

      .dropdown {
        .dropdown-menu {
          width: 100%;

          p {
            &:hover {
              cursor: pointer;
            }
          }
        }

        .dropdown-toggle {
          width: 100%;
          @include dropdown-btn;
          color: black;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    .tab_section {
      .nav {
        overflow-x: auto;
        overflow-y: hidden;
        flex-wrap: nowrap;
        border: none;

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
        border-radius: 0 10px 10px 10px;
        background: #3e4e5f;
        position: relative;

        .selected_file {
          display: flex;
          align-items: center;

          .file_upload_wrap {
            margin-bottom: 0;
            display: flex;
            align-items: center;

            img {
              width: 25px;
              height: 25px;
            }

            p {
              font-weight: 700;
              margin-bottom: 0;
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

        .check_box_wrap {
          font-weight: 700;
          align-items: center;
          color: white;
          font-size: 18px;
        }

        .dropdown {
          .dropdown-menu {
            width: 100%;
            max-height: 250px;
            overflow-y: auto;

            p {
              &:hover {
                cursor: pointer;
              }
            }
          }

          .dropdown-toggle {
            width: 100%;
            @include dropdown-btn;
            color: black;
            justify-content: space-between;
            align-items: center;
          }
        }

        .input-group {
          flex-wrap: nowrap;



          .input-number {
            @include count_btn;
          }

          .form-control {
            height: 35px;
          }

          .file_wrap {
            display: flex;
            flex-direction: column;

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
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      width: 800px;

      .input-group-prepend {
        width: calc(100px + 6%);
        text-align: end;
      }

      .input-number {
        width: 57%;
      }

      .content {
        .input-group-prepend {
          width: 150px;
          white-space: nowrap;
        }

        .check_box_wrap {
          div:nth-child(2) {
            gap: 0 10px;
            display: flex;
          }
        }

        .row_wrap {
          .input-group {
            flex-wrap: nowrap;
          }

          .flex {
            width: 130px;
          }
        }

        .dropdown {
          width: 218px;

          .dropdown-menu {
            max-height: 250px;
            overflow-y: auto;
          }
        }
      }
    }

    .tab_section {
      .tab-content {
        padding: 50px 20px;

        .input-number {
          width: 62.5%;
        }

        .check_box_wrap {
          div:nth-child(2) {
            gap: 0 10px;
            display: flex;
          }
        }

        .input-group {
          flex-wrap: nowrap;

          .input-group-prepend {
            width: 130px;
            text-align: end;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      width: 700px;

      .input-group-prepend {
        width: calc(100px + 6%);
        text-align: end;
      }

      .input-number {
        width: 62%;
      }

      .content {
        padding: 17px;

        .input-group-prepend {
          width: 117px;
          white-space: nowrap;
        }

        .check_box_wrap {
          div:nth-child(2) {
            gap: 0 10px;
            display: flex;
          }
        }

        .row_wrap {
          .input-group {
            flex-wrap: nowrap;
          }

          .flex {
            width: 130px;
          }
        }

        .dropdown {
          width: 205px;

          .dropdown-menu {
            max-height: 250px;
            overflow-y: auto;
          }
        }
      }
    }

    .tab_section {
      .tab-content {
        padding: 50px 20px;

        .input-number {
          width: 59%;
        }

        .check_box_wrap {
          div:nth-child(2) {
            gap: 0 10px;
            display: flex;
          }
        }

        .dropdown {
          width: 190px;
        }

        .input-group {
          flex-wrap: nowrap;

          .input-group-prepend {
            width: 130px;
            text-align: end;
          }
        }

        .purchase_amount {
          flex-wrap: nowrap;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .form_search_btn {
      border: none;
      color: white;
      width: 60px;
      height: 35px;
      margin-top: 10px;
      font-weight: 700;
      padding: 0 10px;
      background-color: #132238;

      &:hover {
        background-color: #43546d;
      }
    }

    .info_wrap {
      padding: 0 5%;

      .fixed_info {
        height: unset;
        flex-direction: column;
        padding: 10px;
      }

      .content {
        .check_box_wrap {
          .check_box {
            margin-right: 10px;
          }
        }

        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset;
          border-radius: 5px;
        }

        .input-group {
          flex-direction: column;

          .input-number {
            width: 100%;
          }

          .form-control {
            height: 35px;
            width: 100%;
          }

          .input-group-prepend {
            margin-bottom: 5px;
            margin-right: 10px;
          }
        }

        .info {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
        }
      }
    }

    .tab_section {
      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: unset !important;
      }

      .tab-content {
        padding: 50px 30px;

        .selected_file {
          .input-group {
            flex-direction: column;
          }
        }

        .check_box_wrap {
          .radio_wrap {
            gap: 0 10px;
            padding-left: 10px;
          }

          .input-group-prepend {
            width: auto !important;
            align-self: self-start;
          }
        }

        .dropdown {
          margin-left: unset !important;
          margin-top: 5px;
        }

        .input-group {
          flex-direction: column;

          .form-control {
            width: 100%;
            margin-left: unset !important;
            margin-top: 5px;
          }

          .input-group-prepend {
            width: 100%;
          }

          .file_wrap {
            .choose_btn {
              margin-top: 5px;
            }
          }
        }

        .purchase_amount {
          .amount_input {
            font-size: 20px;
            align-items: center;
          }

          span.note {
            margin-top: 5px;
            margin-bottom: 16px;
            display: block;
          }
        }
      }
    }
  }
}
</style>