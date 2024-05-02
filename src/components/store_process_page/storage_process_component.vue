<template>
  <div class="info_wrap col mb-5">
    <div class="fixed_info">
      <div>
        <p>
          申請人員 : {{ details.Applicant }}
        </p>
      </div>
      <div>
        <p>
          申請入庫日期 : {{ details.ApplicationDate }}
        </p>
      </div>
    </div>
    <!-- 上半部表單 -->
    <div class="content">
      <!-- 單號 -->
      <div class="col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">單號 :</div>
          <input type="text" class="form-control readonly_box" v-model="AI_ID" readonly />
        </div>
      </div>
      <!-- 狀態 -->
      <div class="row">
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              狀態 :
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.Status">
          </div>
        </div>
      </div>
      <!-- 物流單號 -->
      <div class="col form_search_wrap">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            物流單號 :
          </div>
          <input type="text" class="form-control readonly_box" v-model="details.ShipmentNum" readonly>
          <button class="form_search_btn" @click="viewReceive">檢視</button>
          <!-- 隱藏跳轉按鈕 -->
          <router-link :to="{name: 'Receive_View' , query:{ search_id : details.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
        </div>
      </div>
      <!-- 交付 人員&日期 -->
      <div class="row">
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              交付人員 :
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.DeliveryOperator">
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              交付日期 :
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.DeliveryDate">
          </div>
        </div>
      </div>
      <!-- 入庫 人員&日期 -->
      <div class="row">
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              入庫人員 :
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.AssetsInOperator">
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-12">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              入庫日期 :
            </div>
            <input type="text" class="form-control readonly_box" readonly v-model="details.AssetsInDate">
          </div>
        </div>
      </div>
    </div>
    <!-- 頁籤部分 -->
    <div v-show="details.Tabs" class="tab_section mt-5">
      <!-- tab頂端頁籤 -->
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button v-for="tab in parseInt(tabNumber)" :key="tab" :class="['nav-link', { active: tab === 1 }]" data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab">{{ tab }}</button>
        </div>
      </nav>
      <!-- tab內容 -->
      <div class="tab-content" id="nav-tabContent">
        <div v-for="(tab, index) in details.Tabs" :key="index" :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel">
          <!-- 頁籤資產類型 -->
          <div class="row">
            <div class="col">
              <div class="input-group mb-3 check_box_wrap">
                <div class="input-group-prepend check_box">
                  資產類型 :
                </div>
                <div class="d-flex align-items-center radio_wrap">
                    <input type="radio" class='form-check-input check_box' id="radio1" value="資產" v-model="tab.itemAssetType" :disabled="tab.itemAssetType!=='資產'"   style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" />
                    <label class="form-check-label check_box" for='radio1'>資產</label>
                    <input type="radio" class='form-check-input check_box ' id="radio2" value="存貨" v-model="tab.itemAssetType" :disabled="tab.itemAssetType!=='存貨'"   style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" />
                    <label class="form-check-label check_box" for='radio2' data-toggle="tooltip" data-placement="top" title="註記此資產僅限特定專案出貨所使用">存貨</label>
                    <input type="radio" class='form-check-input check_box' id="radio3" value="耗材" v-model="tab.itemAssetType" :disabled="tab.itemAssetType!=='耗材'"    style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"/>
                    <label class="form-check-label check_box" for='radio3'>耗材</label>
                </div>
              </div>
            </div>
          </div>
          <!-- 頁籤專案代碼 -->
          <div class="col form_search_wrap">
            <div class="input-group mb-3">
              <div class="input-group-prepend">專案代碼 :</div>
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
          <div class="row g-0 row_wrap">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend equipment_wrap">設備總類 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemEquipTypeName" readonly>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">設備分類 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemEquipCategoryName" readonly>
              </div>
            </div>
          </div>
          <!-- 頁籤儲位 區域&櫃位 -->
          <div class="row g-0 row_wrap">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend equipment_wrap">儲位區域 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemAreaName" readonly>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">儲位櫃位 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemLayerName" readonly>
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
              <div class="input-group-prepend">廠商 :</div>
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
              <input type="text" class="form-control readonly_box" v-model="tab.itemSN" readonly>
            </div>
          </div>
          <!-- 頁籤 包裝數量 & 包裝單位 -->
          <div class="row g-0 row_wrap">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3" id='number'>
                <div class="input-group-prepend info  d-xl-block d-lg-block d-md-block d-none">
                  <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">包裝數量 :
                </div>
                <div class="input-group-prepend info  d-xl-none d-lg-none d-md-none d-block">
                  包裝數量 :<img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                </div>
                <input type="text" class="input-number readonly_box" v-model="tab.itemPackageNum" readonly>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3" id='unit'>
                <div class="input-group-prepend">
                  包裝單位 :
                </div>
                <input type="text" class="input-number readonly_box" v-model="tab.itemPackageUnit" readonly>
              </div>
            </div>
          </div>
          <!-- 頁籤 數量 & 單位 (only耗材) -->
          <div class="row g-0 row_wrap">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3" id='number'>
                <div class="input-group-prepend d-xl-block d-lg-block d-md-block d-none">
                  <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">數量 :
                </div>
                <div class="input-group-prepend d-xl-none d-lg-none d-md-none d-block">
                  數量 :<img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">
                </div>
                <input type="text" class="input-number readonly_box" v-model="tab.itemCount" readonly>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3" id='unit'>
                <div class="input-group-prepend">
                  單位 :
                </div>
                <input type="text" class="input-number readonly_box" v-model="tab.itemUnit" readonly>
              </div>
            </div>
          </div>
          <!-- 頁籤保固期限 -->
          <div class="row g-0">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  保固期限 :
                </div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemWarranty" readonly>
              </div>
            </div>
          </div>
          <!-- 頁籤 保固 開始&結束 -->
          <div class="row g-0">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">保固開始日 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemWarrantyStartDate" readonly/>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">保固到期日 :</div>
                <input type="text" class="form-control readonly_box" v-model="tab.itemWarrantyEndDate" readonly/>
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
          <!-- 頁籤上傳檔案部分 -->
          <div class="col selected_file">
            <div class="input-group">
              <div class="input-group-prepend">已上傳檔案 :</div>
              <div class='selected_file_wrap'>
                <div v-for="(file , file_index) in tab.existFile" :key="fprepile_index" class="file_upload_wrap">
                  <p>{{ file.FileName }}
                    <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="viewImgFile(index , file_index)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- view Modal -->
      <div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ modalParams.title }}</h5>
              <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
            </div>
            <img :src="modalParams.src" alt="Uploaded Image" class="w-100" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import view_modal from "@/components/view_modal.vue"

</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
textarea {
  padding: 5px 10px 30px;
}

.apply_btn {
  border: none;
  width: 110px;
  height: 35px;
  background: #132238;
  border-radius: 10px;
  color: white;
  font-weight: 700;

  &:hover {
    background: #5980b9;
  }
}

.dropdown-toggle {
  height: 35px;
}

#categoryDropdown {
  justify-content: right;
}

.dropdown-toggle::after {
  margin-left: auto;
}

.view_icon,
.trash_icon {
  cursor: pointer;
}

.modal {
  .modal-header {
    background: #528091;
    color: white;

    .close_icon {
      color: white;
      font-weight: 700;
      margin-bottom: 0;
    }
  }
}

#apply_storage_modal {
  p {
    font-weight: 800;
    text-align: center;
    margin-bottom: 0;
  }

  .modal-header {
    margin-bottom: 10px;
  }

  button {
    color: white;
    background-color: #132238;

    &:hover {
      background-color: #426497;
    }
  }

  .modal-footer {
    border: none;
  }
}

.readonly_box {
  @include readonly_box;
}

.form_search_btn {
  @include form_search_btn;
}

.input-number {
  @include count_btn;
}

.info_wrap {
  margin: auto;

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

  .input-group-prepend {
    color: white;
    font-weight: 700;
    font-size: 20px;
  }

  .fixed_info {
    @include fixed_info;

    p {
      font-size: 20px;
      margin-bottom: 0;
    }
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

    button {
      @include dropdown-btn;
      width: 187px;
      color: black;
      justify-content: space-between;
      align-items: center;
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
      background: #3e4e5f;
      border-radius: 0 0 20px 20px;

      .selected_file {
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
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      width: 800px;

      .content {
        .input-group {
          .input-group-prepend {
            width: 125px;
            text-align: end;
            white-space: nowrap;
          }
        }
      }
      .tab_section {
        .tab-content {
          padding: 50px 30px;
          .storage_dropdown {
            .col:nth-child(1),
            .col:nth-child(2) {
              .dropdown {
                width: 180px;
                button {
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
          .selected_file {
            display: flex;
            align-items: center;
          }

          .check_box_wrap {
            font-weight: 700;
            align-items: center;
            color: white;
            font-size: 18px;
            div:nth-child(2) {
              gap: 0 10px;
            }
          }
          .dropdown {
            width: 60%;
            .dropdown-menu {
              max-height: 250px;
              overflow-y: auto;
            }
          }
          .input-group {
            flex-wrap: nowrap;
            .input-number {
              width: 62%;
            }

            .input-group-prepend {
              width: 120px;
              text-align: end;
              white-space: nowrap;
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
      width: 700px;

      .content {
        .input-group {
          .input-group-prepend {
            width: 125px;
            text-align: end;
            white-space: nowrap;
          }
        }
      }
      .tab_section {
        .tab-content {
          padding: 25px;
          .storage_dropdown {
            .col:nth-child(1),
            .col:nth-child(2) {
              .dropdown {
                width: 150px;
                button {
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
          .selected_file {
            display: flex;
            align-items: center;
            .selected_file_wrap {
              flex-direction: column;
            }
          }
          .check_box_wrap {
            font-weight: 700;
            align-items: center;
            color: white;
            font-size: 18px;
            div:nth-child(2) {
              gap: 0 10px;
            }
          }
          .dropdown {
            width: 60%;
            .dropdown-menu {
              max-height: 250px;
              overflow-y: auto;
            }
          }
          .input-group {
            flex-wrap: nowrap;
            .input-number {
              width: 56.5%;
            }

            .input-group-prepend {
              width: 119px;
              text-align: end;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .main_section {
    .info_wrap {
      padding: 1% 5% 0;
      .fixed_info {
        height: unset !important;
        padding: 10px;
        flex-direction: column;
      }
      .content {
        .input-group {
          flex-direction: column;

          .form-control {
            height: 35px;
            width: 100%;
            margin-top: 5px;
            margin-left: unset !important;
          }
          .input-group-prepend {
            width: 100%;
          }
        }
        .info {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
        }
      }
      .tab_section {
        .input-group
          > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
            .valid-feedback
          ):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset !important;
        }

        .tab-content {
          padding: 50px 30px;
          .storage_dropdown {
            display: flex;
            flex-direction: column;
            .apply_btn {
              margin-top: 10px;
            }
          }
          .selected_file {
            display: flex;
            align-items: center;
            .input-group {
              flex-direction: column;
            }
          }
          .check_box_wrap {
            font-weight: 700;
            color: white;
            font-size: 18px;
            div:nth-child(2) {
              gap: 0 10px;
              display: flex;
            }
          }
          .dropdown {
            margin-left: unset !important;
            margin-top: 5px;
            .dropdown-menu {
              max-height: 250px;
              overflow-y: auto;
            }
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
        }
      }
    }
  }
}

</style>