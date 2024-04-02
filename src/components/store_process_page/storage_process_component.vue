<template>
    <div>
        <div class="info_wrap col mb-5">
            <div class="fixed_info">
                <div>
                    <p>申請人員 : </p>
                </div>
                <div>
                    <p>申請入庫日期 : </p>
                </div>
            </div>
            <!-- 上半部表單 -->
            <div class="content">
                <!-- 單號 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">單號 :</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- 狀態 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                狀態 :
                            </div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                </div>
                <!-- 物流單號 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            物流單號 :
                        </div>
                        <input type="text" class="form-control readonly_box" readonly>
                        <button class="form_search_btn">檢視</button>
                        <!-- 隱藏跳轉按鈕 -->
                        <a href="#view-receive" target="_blank" id="view-receive" style="display: none;"></a>
                    </div>
                </div>
                <!-- 交付 人員&日期 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                交付人員 :
                            </div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                交付日期 :
                            </div>
                            <input type="text" class="form-control readonly_box" readonly />
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
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                入庫日期 :
                            </div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab_section mt-5">
                <nav>
                    <!-- 標頭 -->
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button :key="tab" class="nav-link" data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)"
                            type="button" role="tab" :aria-selected="tab === 0">
                            {{ tab }}
                        </button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="" role="tabpanel">
                        <!-- 頁籤專案類型 -->
                        <div class="row">
                            <div class="col-12">
                                <div class="input-group mb-3 check_box_wrap">
                                    <div class="input-group-prepend check_box">
                                        專案類型 :
                                    </div>
                                    <div class="d-flex align-items-center radio_wrap">
                                        <input type="radio" class='form-check-input check_box' id="radio1"
                                            style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"
                                            value="資產" @change="resetUnitCount(index)" />
                                        <label class="form-check-label check_box" for='radio1'>資產</label>
                                        <input type="radio" class='form-check-input check_box ' id="radio2"
                                            style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"
                                            value="存貨" @change="resetUnitCount(index)" />
                                        <label class="form-check-label check_box" for='radio2' data-toggle="tooltip"
                                            data-placement="top" title="註記此資產僅限特定專案出貨所使用">存貨</label>
                                        <input type="radio" class='form-check-input check_box' id="radio3"
                                            style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"
                                            value="耗材" />
                                        <label class="form-check-label check_box" for='radio3'>耗材</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤專案代碼 -->
                        <div class="col form_search_wrap">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span>*</span>專案代碼 :
                                </div>
                                <input type="text" class="form-control" aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default">
                                <button class="form_search_btn" @click="getProjectName(index)">搜尋</button>
                            </div>
                        </div>
                        <!-- 頁籤專案名稱 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">專案名稱 :</div>
                                <input type="text" class="form-control readonly_box" aria-label="Default" readonly />
                            </div>
                        </div>
                        <!-- 頁籤 設備總類 & 設備分類-->
                        <div class="row g-0">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend"><span>*</span>設備總類 :</div>
                                    <div class="dropdown">
                                        <button class="btn dropdown-toggle" type="button" id="typeDropdown"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            @click="getEquipTypeName">
                                            <!-- {{ tab.itemEquipTypeName || '請選擇' }} --> 請選擇
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="typeDropdown">
                                            <!-- <p v-for="item in DropdownArray.EquipType" class="dropdown-item" @click="selectType(item , index)">{{ item.Name }}</p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3 justify-content-end">
                                    <div class="input-group-prepend"><span>*</span>設備分類 :</div>
                                    <div class="dropdown">
                                        <button class="btn dropdown-toggle" type="button" id="categoryDropdown"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <!-- {{ tab.itemEquipCategoryName || tab.EquipCategoryInit }} 請選擇 -->
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                                            <!-- <p v-for="item in tab.EquipCategoryArray" class="dropdown-item" @click="selectCategory(item , index)">{{ item.Name }}</p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤儲位 區域&櫃位 -->
                        <div class="row g-0 storage_dropdown">
                            <div class="col">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend"><span>*</span>儲位區域 :</div>
                                    <div class="dropdown">
                                        <button class="btn dropdown-toggle" type="button" id="areaDropdown"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            @click="getAreaName(index)">
                                            <!-- {{ tab.itemAreaName || '請選擇' }}  -->請選擇
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="areaDropdown">
                                            <!-- <p v-for="(item, area_index) in DropdownArray.Area" :key="area_index" class="dropdown-item" @click="selectArea(index, item)">{{ item.Name }}</p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3 justify-content-end">
                                    <div class="input-group-prepend"><span>*</span>儲位櫃位 :</div>
                                    <div class="dropdown">
                                        <button class="btn dropdown-toggle" type="button" id="cabinetDropdown"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <!-- {{ tab.itemLayerName || tab.LayerInit }} --> 請選擇
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                                            <!-- <p v-for="(item, layer_index) in tab.LayerArray" :key="layer_index" class="dropdown-item" @click="selectLayer(index, item)">{{ item.Name }}</p> -->
                                        </div>
                                    </div>
                                    <button class="apply_btn" data-bs-toggle="modal"
                                        data-bs-target="#apply_storage_modal" @click="updateIndex(index)">套用儲位</button>
                                    <!-- <input type="text" class="form-control " aria-label="Default" aria-describedby="inputGroup-sizing-default" /> -->
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤物品名稱 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend"><span>*</span>物品名稱 :</div>
                                <input type="text" class="form-control" placeholder="最多輸入20字" />
                            </div>
                        </div>
                        <!-- 頁籤資產編號 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend"><span>*</span>資產編號 :</div>
                                <input type="text" class="form-control" placeholder="BFXXXXXXXX" />
                            </div>
                        </div>
                        <!-- 頁籤廠商 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">廠商 :</div>
                                <input type="text" class="form-control " aria-label="Default" placeholder="最多輸入100字" />
                            </div>
                        </div>
                        <!-- 頁籤規格 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">規格 :</div>
                                <input type="text" class="form-control " aria-label="Default" placeholder="最多輸入100字" />
                            </div>
                        </div>
                        <!-- 頁籤型號 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">型號 :</div>
                                <input type="text" class="form-control " aria-label="Default" placeholder="最多輸入100字" />
                            </div>
                        </div>
                        <!-- 頁籤S/N -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">S/N :</div>
                                <input type="text" class="form-control" aria-label="Default" placeholder="最多輸入100字" />
                            </div>
                        </div>
                        <!-- 頁籤 包裝數量 & 包裝單位 -->
                        <div class="row g-0">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend info">
                                        <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none"
                                            src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="資產數量 ex: 3包螺絲釘"> 包裝數量 :<img
                                            class="info_icon d-xl-none d-lg-none d-md-none d-inline-block"
                                            src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="資產數量 ex: 3包螺絲釘">
                                    </div>
                                    <input type="number" class="input-number readonly_box" aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default" readonly />
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3 justify-content-end">
                                    <div class="input-group-prepend"><span>*</span>包裝單位 :</div>
                                    <div class="dropdown">
                                        <button class="btn dropdown-toggle" type="button" id="areaDropdown"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <!-- {{ tab.itemPackageUnit || '請選擇' }}  -->請選擇
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="areaDropdown">
                                            <!-- <p v-for="item in DropdownArray.PackageUnit" class="dropdown-item" @click="selectPackageUnit(item , index)">{{ item }}</p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤 數量 & 單位 -->
                        <div class="row g-0">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend info">
                                        <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none"
                                            src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">
                                        <span>*</span>數量 :<img
                                            class="info_icon d-xl-none d-lg-none d-md-none d-inline-block"
                                            src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">
                                    </div>
                                    <input class="input-number" type="number" min="1">
                                    <!-- <input v-else class="input-number readonly_box" type="number" v-model="tab.itemPackageNum" min="1" readonly> -->
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3 justify-content-end">
                                    <div class="input-group-prepend"><span>*</span>單位 :</div>
                                    <div class="dropdown">
                                        <button class="btn dropdown-toggle" type="button" id="areaDropdown"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            請選擇
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="areaDropdown">
                                            <!-- <p v-for="item in DropdownArray.Unit" class="dropdown-item" @click="selectUnit(item , index)">{{ item }}</p> -->
                                        </div>
                                    </div>
                                    <!-- <input v-else class="input-number readonly_box" type="text" v-model="tab.itemPackageUnit" min="1" readonly> -->
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤保固期限 -->
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        保固期限 :
                                    </div>
                                    <input type="text" class="form-control" placeholder="最多輸入10字">
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤 保固 開始&結束 -->
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">保固開始日 :</div>
                                    <input type="date" class="form-control " />
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">保固到期日 :</div>
                                    <input type="date" class="form-control " />
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤備註 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    備註 :
                                </div>
                                <textarea class="col" rows="5" placeholder="最多輸入500字"></textarea>
                            </div>
                        </div>
                        <!-- 頁籤選擇檔案 -->
                        <div class="col">
                            <div class="input-group">
                                <div class="input-group-prepend">資產照片 :</div>
                                <div class="mb-3 file_wrap">
                                    <button class='choose_btn' @click="openFileExplorer(index)">選擇檔案</button>
                                    <input type="file" accept="image/*" ref="fileInputs" style="display: none;" multiple
                                        @change="handleFileChange(index, $event)" />
                                </div>
                            </div>
                        </div>
                        <div class="selected_file col">
                            <div class="input-group">
                                <div class="input-group-prepend">已選擇檔案 :</div>
                                <div class="selected_file_wrap">
                                    <div class="file_upload_wrap">
                                        <p>
                                            <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;"
                                                @click="viewImgFile('new', index, file_index)" data-bs-toggle="modal"
                                                data-bs-target="#viewFile_modal">
                                            <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;"
                                                @click="deleteFileFunction('new', index, file_index)">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤已上傳檔案 -->
                        <div class="col selected_file">
                            <div class="input-group mt-3">
                                <div class="input-group-prepend">已上傳檔案 :</div>
                                <div class='selected_file_wrap'>
                                    <div class="file_upload_wrap">
                                        <p>
                                            <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;"
                                                @click="viewImgFile('exist', index, file_index)" data-bs-toggle="modal"
                                                data-bs-target="#viewFile_modal">
                                            <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;"
                                                @click="deleteFileFunction('exist', index, file_index)">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ViewFile Modal -->
                <!-- <div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
                                      <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <h5 class="modal-title">{{ modalParams.title }}</h5>
                                            <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
                                          </div>
                                          <div v-show="tabData" class="modal-body">
                                            <img :src="modalParams.src" alt="Uploaded Image" class="w-100" />
                                          </div>
                                        </div>
                                      </div>
                                    </div> -->
                <view_modal />
            </div>
        </div>
    </div>
</template>

<script>
import view_modal from "@/components/View_modal.vue"
export default {
    components: {
        view_modal
    }
}
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