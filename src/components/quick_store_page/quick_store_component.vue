<template>
    <div class="main_section">
        <!-- 放大Swiper圖片 -->
        <div class="zoom_img_modal modal fade" id="zoomImg" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">標題</h5>
                        <p data-bs-dismiss="modal" class='close_icon'>X</p>
                    </div>
                    <div class="modal-body">
                        <img src="https://www.akc.org/wp-content/uploads/2018/05/Three-Australian-Shepherd-puppies-sitting-in-a-field.jpg" alt="Zoomed Image">
                    </div>
                </div>
            </div>
        </div>
        <view_modal/>
        <div class="info_wrap col mb-5">
            <div class="fixed_info">
                <div>
                    <p>
                        申請人員 : {{ Applicant }}
                    </p>
                </div>
                <div>
                    <p>
                        申請入庫日期 : {{ ApplicationDate }}
                    </p>
                </div>
            </div>
            <div class="content">
                <!-- 單號 -->
                <div class="col mb-3">
                    <div class="input-group">
                        <div class="input-group-prepend">單號 :</div>
                        <input type="text" class="form-control ">
                    </div>
                </div>
                <!-- 物流單號 -->
                <div class="col form_search_wrap mb-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            物流單號 :
                        </div>
                        <div class="search_section">
                            <input type="text" class="form-control " />
                        </div>
                        <button class="form_search_btn" @click="viewReceive">檢視</button>
                        <router-link to="#" target="_blank" id="view-receive" style="display: none;"></router-link>
                    </div>
                </div>
                <!-- 備註 -->
                <div class="col mb-3">
                    <div class="input-group">
                        <div class="input-group-prepend">備註 :</div>
                        <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入500字" v-model="Memo"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>填寫資產資訊</p>
                </div>
            </div>
            <div class="content">
                <!-- 資產類型 -->
                <div class="row">
                    <div class="col-12">
                        <div class="input-group mb-3 check_box_wrap">
                            <div class="input-group-prepend check_box">
                                <span>*</span>資產類型 :
                            </div>
                            <div class="d-flex align-items-center radio_wrap">
                                <input type="radio" class='form-check-input check_box' id="radio1" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="資產" />
                                <label class="form-check-label check_box" for='radio1'>資產</label>
                                <input type="radio" class='form-check-input check_box ' id="radio2" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="存貨" />
                                <label class="form-check-label check_box" for='radio2' data-toggle="tooltip" data-placement="top" title="註記此資產僅限特定專案出貨所使用">存貨</label>
                                <input type="radio" class='form-check-input check_box' id="radio3" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="耗材" />
                                <label class="form-check-label check_box" for='radio3'>耗材</label>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 專案代碼 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span>*</span>專案代碼 :
                        </div>
                        <div class="option_section">
                            <div>
                                <input @input="handleInput" @focus="handleInput" @blur="handleBlur" v-model="searchTerm" type="text" class="form-control" placeholder="請選擇" />
                                <ul v-if="showDropdown" class="options-list">
                                    <li v-for="(option, index) in filteredOptions" :key="index" @click="selectItem(option)">
                                        {{ option.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 設備 總類&分類 -->
                <div class="row row_wrap g-0">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend equipment_wrap">
                                <span>*</span>設備總類:
                            </div>
                            <select class="form-select" id="typeDropdown">
                    <option value="" selected>請選擇</option>
                    <!-- Add your options here -->
                </select>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span>*</span>設備分類:
                            </div>
                            <select class="form-select" id="categoryDropdown">
                    <option value="" selected>請選擇</option>
                    <!-- Add your options here -->
                </select>
                        </div>
                    </div>
                </div>
                <!-- 物品名稱 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span>*</span>物品名稱 :
                        </div>
                        <input type="text" class="form-control" placeholder="最多輸入20字">
                    </div>
                </div>
                <!-- 包裝數量 & 包裝單位 -->
                <div class="row g-0 row_wrap">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3" id='number'>
                            <div class="input-group-prepend info  ">
                                <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                                <span>*</span>包裝數量 :<img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                            </div>
                            <input class="input-number" type="number" min="1">
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3" id='unit'>
                            <div class="input-group-prepend">
                                <span>*</span>包裝單位:
                            </div>
                            <select class="form-select" id="areaDropdown">
                <option value="" selected>請選擇</option>
                <!-- Add your options here -->
            </select>
                        </div>
                    </div>
                </div>
                <!-- 數量 & 單位 (only耗材) -->
                <div class="row g-0 row_wrap">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3" id='number'>
                            <div class="input-group-prepend">
                                <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                                <span>*</span>數量 :<img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                            </div>
                            <input class="input-number" type="number" min="1">
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3" id="unit">
                            <div class="input-group-prepend">
                                <span>*</span>單位:
                            </div>
                            <select class="form-select" id="areaDropdown">
                <option value="" selected>請選擇</option>
                <!-- Add your options here -->
            </select>
                        </div>
                    </div>
                </div>
                <!-- 備註 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            備註 :
                        </div>
                        <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入500字"></textarea>
                    </div>
                </div>
            </div>
            <!-- 入庫方式 -->
            <div class="store_option_wrap mt-5">
                <div class="fixed_info">
                    <p>
                        入庫方式
                    </p>
                </div>
                <div class="content">
                    <!-- 直接入庫/指派給保管人 -->
                    <div class="option_wrap">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                            <label class="form-check-label" for="inlineRadio1">直接入庫</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                            <label class="form-check-label" for="inlineRadio2">指派給保管人</label>
                        </div>
                    </div>
                    <!-- 用途 -->
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group mb-3 check_box_wrap">
                                <div class="input-group-prepend check_box">
                                    <span>*</span>用途 :
                                </div>
                                <div class="d-flex align-items-center radio_wrap">
                                    <input type="radio" class='form-check-input check_box' id="radio1" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="内部領用" />
                                    <label class="form-check-label check_box" for='radio1'>内部領用</label>
                                    <input type="radio" class='form-check-input check_box ' id="radio2" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="借測" />
                                    <label class="form-check-label check_box" for='radio2'>借測</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 保管人員 -->
                    <div class="col">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend"> <span>*</span>保管人員 :</div>
                            <select class="form-select" v-model="selectedKeeper">
                    <option value="">請選擇</option>
                    <option value="Michal">Michal</option>
                    <option value="Michelle">Michelle</option>
                  </select>
                        </div>
                    </div>
                    <!-- 儲位區域/儲位櫃位 -->
                    <div class="store_location row g-0">
                        <div class="col row">
                            <label for="inputPassword" class="col col-form-label"><span>*</span>儲位區域：</label>
                            <select class="form-select col" aria-label="Default select example">
                  <option selected>請選擇</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                        </div>
                        <div class="col row">
                            <label for="inputPassword" class="col col-form-label"><span>*</span>儲位櫃位：</label>
                            <select class="form-select col" aria-label="Default select example">
                  <option selected>請選擇</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 頁籤部分 -->
            <div class="tab_section mt-5">
                <!-- tab頂端頁籤 -->
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button :key="tab" class="nav-link" data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab">1 </button>
                    </div>
                </nav>
                <!-- tab內容 -->
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="" role="tabpanel">
                        <!-- deleteButton -->
                        <button class="delete_btn" @click="deleteTab(index)">刪除此筆</button>
                        <!-- 頁籤專案類型 -->
                        <div class="row">
                            <div class="col-12">
                                <div class="input-group mb-3 check_box_wrap">
                                    <div class="input-group-prepend check_box">
                                        <span>*</span>專案類型 :
                                    </div>
                                    <div class="d-flex align-items-center radio_wrap">
                                        <input type="radio" class='form-check-input check_box' id="radio1" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="資產" />
                                        <label class="form-check-label check_box" for='radio1'>資產</label>
                                        <input type="radio" class='form-check-input check_box ' id="radio2" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="存貨" />
                                        <label class="form-check-label check_box" for='radio2' data-toggle="tooltip" data-placement="top" title="註記此資產僅限特定專案出貨所使用">存貨</label>
                                        <input type="radio" class='form-check-input check_box' id="radio3" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="耗材" />
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
                                <div class="option_section">
                                    <div>
                                        <input @input="handleInput" @focus="handleInput" @blur="handleBlur" v-model="searchTerm" type="text" class="form-control" placeholder="請選擇" />
                                        <ul v-if="showDropdown" class="options-list">
                                            <li v-for="(option, index) in filteredOptions" :key="index" @click="selectItem(option)">
                                                {{ option.name }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤設備 總類&分類 -->
                        <div class="row row_wrap g-0">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend equipment_wrap">
                                        <span>*</span>設備總類 :
                                    </div>
                                    <select class="form-select" id="typeDropdown">
                    <option value="" selected>請選擇</option>
                    <!-- Add your options here -->
                </select>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span>*</span>設備分類 :
                                    </div>
                                    <select class="form-select" id="categoryDropdown">
                    <option value="" selected>請選擇</option>
                    <!-- Add your options here -->
                </select>
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤物品名稱 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend"><span>*</span>物品名稱 :</div>
                                <input type="text" class="form-control" placeholder="最多輸入20字">
                            </div>
                        </div>
                        <!-- 頁籤資產編號 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">資產編號 :</div>
                                <input type="text" class="form-control" placeholder="BFXXXXXXXX">
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
                        <div class="row g-0 row_wrap">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3" id='number'>
                                    <div class="input-group-prepend info  ">
                                        <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                                        <span>*</span>包裝數量 :<img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                                    </div>
                                    <input class="input-number" type="number" min="1">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3" id="unit">
                                    <div class="input-group-prepend">
                                        <span>*</span>單位:
                                    </div>
                                    <select class="form-select" id="areaDropdown">
                <option value="" selected>請選擇</option>
                <!-- Add your options here -->
            </select>
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤 數量 & 單位 (only耗材) -->
                        <div class="row g-0 row_wrap">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3" id='number'>
                                    <div class="input-group-prepend">
                                        <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                                        <span>*</span>數量 :<img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                                    </div>
                                    <input class="input-number" type="number" min="1">
                                    <!-- <input v-else class="input-number readonly_box" type="number" min="1" readonly> -->
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3" id='unit'>
                                    <div class="input-group-prepend">
                                        <span>*</span>單位 :
                                    </div>
                                    <select class="form-select" id="areaDropdown">
                <option value="" selected>請選擇</option>
                <!-- Add your options here -->
            </select>
                                    <!-- <input  class="input-number" type="number" min="1"> -->
                                    <!-- <input v-else class="input-number readonly_box" type="text" min="1" readonly> -->
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤保固期限 -->
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        保固期限：
                                    </div>
                                    <input type="text" class="form-control" placeholder="最多輸入10字">
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤 保固 開始&結束 -->
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">保固開始日：</div>
                                    <input type="date" class="form-control " />
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">保固到期日：</div>
                                    <input type="date" class="form-control " />
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤備註 -->
                        <div class="col">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">備註 :</div>
                                <textarea class="col" rows="5" placeholder="最多輸入500字"></textarea>
                            </div>
                        </div>
                        <!-- 頁籤選擇檔案 -->
                        <div class="col">
                            <div class="input-group">
                                <div class="input-group-prepend">資產照片：</div>
                                <div class="mb-3 file_wrap">
                                    <button class='choose_btn'>選擇檔案</button>
                                    <input style="display: none;" />
                                </div>
                            </div>
                        </div>
                        <div class="selected_file col">
                            <div class="input-group">
                                <div class="input-group-prepend">已選擇檔案：</div>
                                <div class="selected_file_wrap">
                                    <div class="file_upload_wrap">
                                        <p>
                                            <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                                            <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Swiper -->
                        <div class="col mb-3">
                            <div>
                                <div>
                                    <swiper-container class='swiper_section' :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
                                        <swiper-slide>
                                            <img class="swiper_bottom_img" src="https://www.akc.org/wp-content/uploads/2018/05/Three-Australian-Shepherd-puppies-sitting-in-a-field.jpg">
                                            <button class='zoom_img' data-bs-toggle="modal" data-bs-target="#zoomImg" onclick="handlePreview(item)">
                  <img src="@/assets/zoom.png" alt="Zoom">
                </button>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <img class="swiper_bottom_img" src="https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/bernese-mountain-dog.jpg?crop=1.00xw:0.668xh;0,0.252xh&resize=640:*">
                                            <button class='zoom_img' data-bs-toggle="modal" data-bs-target="#zoomImg" onclick="handlePreview(item)">
                  <img src="@/assets/zoom.png" alt="Zoom">
                </button>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <img class="swiper_bottom_img" src="https://hips.hearstapps.com/hmg-prod/images/best-dog-breeds-for-kids-beagle-1565102201.jpg?crop=0.668xw:1.00xh;0.0816xw,0.00255xh&resize=980:*">
                                            <button class='zoom_img' data-bs-toggle="modal" data-bs-target="#zoomImg" onclick="handlePreview(item)">
                  <img src="@/assets/zoom.png" alt="Zoom">          </button>
                                        </swiper-slide>
                                        <swiper-slide>
                                            <img class="swiper_bottom_img" src="https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/bernese-mountain-dog.jpg?crop=1.00xw:0.668xh;0,0.252xh&resize=640:*">
                                            <button class='zoom_img' data-bs-toggle="modal" data-bs-target="#zoomImg" onclick="handlePreview(item)">
                  <img src="@/assets/zoom.png" alt="Zoom">          </button>
                                        </swiper-slide>
                                    </swiper-container>
                                    <div class="swiper_pagination"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 頁籤入庫方式 -->
                        <div class="store_option">
                            <div class="title">
                                <p>
                                    入庫方式
                                </p>
                            </div>
                            <div class="content">
                                <!-- 直接入庫/指派給保管人 -->
                                <div class="option_wrap">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                        <label class="form-check-label" for="inlineRadio1">直接入庫</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                        <label class="form-check-label" for="inlineRadio2">指派給保管人</label>
                                    </div>
                                </div>
                                <!-- 儲位區域/儲位櫃位 -->
                                <div class="store_location row g-xl-0 g-lg-0 g-md-0">
                                    <div class="col row">
                                        <label for="inputPassword" class="col col-form-label"><span>*</span>儲位區域：</label>
                                        <select class="form-select col" aria-label="Default select example">
                  <option selected>請選擇</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                                    </div>
                                    <div class="col row">
                                        <label for="inputPassword" class="col col-form-label"><span>*</span>儲位櫃位：</label>
                                        <select class="form-select col" aria-label="Default select example">
                  <option selected>請選擇</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                                    </div>
                                </div>
                            </div>
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
    import view_modal from "@/components/View_modal.vue"
    export default {
        components: {
            view_modal
        },
        data() {
            return {
                searchTerm: "",
                dropdownOptions: [], // Array to store all options
                showDropdown: false,
            };
        },
        computed: {
            filteredOptions() {
                // Filter options based on searchTerm
                return this.dropdownOptions.filter(option =>
                    option.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            },
        },
        methods: {
            handleInput() {
                // Perform search and update dropdownOptions based on searchTerm
                // For demo purposes, using random data
                this.dropdownOptions = this.generateRandomData();
                this.showDropdown = true; // Always show dropdown when input is focused
            },
            selectItem(item) {
                // Handle selection of an item from the dropdown
                // For example, you can set the selected item to the input field
                this.searchTerm = item.name;
                this.showDropdown = false;
            },
            handleBlur() {
                // Close the dropdown when input loses focus
                this.showDropdown = false;
            },
            generateRandomData() {
                // Function to generate random data for demo purposes
                const data = [];
                for (let i = 0; i < 5; i++) {
                    data.push({
                        id: i,
                        name: `Item ${i}`
                    });
                }
                return data;
            },
        },
        setup() {
            return {
                pagination: {
                    clickable: true,
                },
                modules: [Pagination],
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
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
        background: var(--c-5, #E94B4B);
        justify-content: center;
        align-items: center;
        display: inline-flex;
        height: 40px;
        color: #FFF;
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
            background-color: #5D85BD;
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
        cursor: pointer
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
    }
    .options-list li {
        padding: 10px 10px 0;
        font-size: 18px;
        cursor: pointer; // &:hover {
        //   // background: #7893b7;
        //   // color: white;
        //   font-weight: 700;
        // }
    }
    .search_section {
        position: relative;
        display: flex;
        flex: 1 1 auto; // width: 100%;
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
    .store_option {
        padding: 10px 0;
        .title {
            background: white !important;
            display: flex;
            justify-content: center;
            background: #3D4E61;
            align-items: center;
            border-radius: 10px 10px 0px 0px;
            height: 45px;
        }
        p {
            color: black;
            font-weight: 700;
            margin-bottom: 0;
            font-size: 20px;
        }
        .content {
            border-right: 1px solid #FFF;
            border-bottom: 1px solid #FFF;
            border-left: 1px solid #FFF;
            background: rgba(255, 255, 255, 0.30) !important;
            .option_wrap {
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                .form-check-label {
                    font-size: 20px;
                    color: white;
                    font-weight: 700;
                }
            }
            .store_location {
                .col-form-label {
                    padding: 0 3px;
                    display: flex;
                    align-items: center;
                    justify-content: end;
                }
                .form-select {
                    height: 37px
                }
            }
        }
    }
    .store_option_wrap {
        padding: 10px 0;
        .content {
            .option_wrap {
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                .form-check-label {
                    font-size: 20px;
                    color: white;
                    font-weight: 700;
                }
            }
            .store_location {
                gap: 0 30px;
                .col-form-label {
                    padding: 0 3px;
                    display: flex;
                    align-items: center;
                    justify-content: end;
                }
                .form-select {
                    height: 37px
                }
            }
        }
    }
    .swiper_section {
        swiper-slide {
            span {
                cursor: pointer;
                position: absolute;
                background: #E94B4B;
                height: 30px;
                width: 30px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-weight: 700;
            }
        }
        swiper-slide img {
            width: 100%;
            height: auto;
        }
    }
    .tab-content {
        border-radius: 0 10px 0 0
    }
    @media only screen and (min-width: 1200px) {
        .main_section {
            .form_search_btn {
                @include form_search_btn;
            }
            .readonly_box {
                @include readonly_box;
            }
            .swiper_section {
                swiper-slide {
                    align-self: baseline;
                    top: 25px;
                    right: -14px;
                }
                swiper-slide img {
                    padding: 40px 0;
                }
            }
            .content .option_section,
            .content .option_section .options-list {
                width: 78.5%;
            }
            .tab-content .option_section,
            .tab-content .option_section .options-list {
                width: 82%;
            }
            .info_wrap {
                margin: auto;
                width: 800px;
                .input-group-prepend,
                .col-form-label {
                    color: white;
                    font-weight: 700;
                    font-size: 20px;
                    width: calc(100px + 6%);
                    text-align: end;
                    white-space: nowrap;
                    span {
                        @include red_star
                    }
                }
                .input-number {
                    @include count_btn;
                    width: 57%;
                }
                .fixed_info {
                    @include fixed_info;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                    span {
                        @include red_star
                    }
                }
                .content {
                    @include content_bg;
                    .input-group-prepend {
                        width: 150px;
                        white-space: nowrap;
                    }
                    .check_box_wrap {
                        font-weight: 700;
                        align-items: center;
                        color: white;
                        font-size: 18px;
                        div:nth-child(2) {
                            gap: 0 10px;
                            display: flex;
                        }
                    }
                    .row_wrap {
                        .input-group {
                            flex-wrap: nowrap
                        }
                        .flex {
                            width: 130px
                        }
                    }
                    .dropdown {
                        width: 218px;
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
                        background: #5C7897;
                    }
                    .active {
                        @include tab_section_num;
                        background: #3E4E5F;
                    }
                }
                .tab-content {
                    background: #3E4E5F;
                    padding: 50px 20px;
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
                                    content: '·';
                                    font-weight: 700;
                                    color: white;
                                }
                            }
                        }
                    }
                    .input-number {
                        width: 60.5%;
                    }
                    .check_box_wrap {
                        font-weight: 700;
                        align-items: center;
                        color: white;
                        font-size: 18px;
                        div:nth-child(2) {
                            gap: 0 10px;
                            display: flex;
                        }
                    }
                    .dropdown {
                        width: 240px;
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
                        span {
                            @include red_star
                        }
                        .input-number {
                            @include count_btn;
                        }
                        .form-control {
                            height: 35px;
                        }
                        .input-group-prepend {
                            color: white;
                            font-weight: 700;
                            font-size: 20px;
                            width: 130px;
                            text-align: end;
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
    @media only screen and (min-width: 768px) and (max-width: 1199px) {
        .main_section {
            .form_search_btn {
                @include form_search_btn;
            }
            .readonly_box {
                @include readonly_box;
            }
            .content .option_section,
            .content .option_section .options-list {
                width: 80%;
            }
            .tab-content .option_section,
            .tab-content .option_section .options-list {
                width: 79%;
            }
            .swiper_section {
                swiper-slide {
                    align-self: baseline;
                    top: 25px;
                    right: -14px;
                }
                swiper-slide img {
                    padding: 40px 0;
                }
            }
            .info_wrap {
                margin: auto;
                width: 700px;
                .input-group-prepend,
                .col-form-label {
                    color: white;
                    font-weight: 700;
                    font-size: 20px;
                    width: calc(100px + 6%);
                    text-align: end;
                    white-space: nowrap;
                    span {
                        @include red_star
                    }
                }
                .input-number {
                    @include count_btn;
                    width: 62%;
                }
                .fixed_info {
                    @include fixed_info;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                    span {
                        @include red_star
                    }
                }
                .content {
                    @include content_bg;
                    padding: 17px;
                    .input-group-prepend {
                        width: 117px;
                        white-space: nowrap;
                    }
                    .check_box_wrap {
                        font-weight: 700;
                        align-items: center;
                        color: white;
                        font-size: 18px;
                        div:nth-child(2) {
                            gap: 0 10px;
                            display: flex;
                        }
                    }
                    .row_wrap {
                        .input-group {
                            flex-wrap: nowrap
                        }
                        .flex {
                            width: 130px
                        }
                    }
                    .dropdown {
                        width: 205px;
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
                .file_upload_wrap {
                    margin-bottom: 0;
                    display: flex;
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
                            margin-right: 5px;
                            content: '·';
                            font-weight: 700;
                            color: white;
                        }
                    }
                }
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
                    padding: 50px 20px;
                    position: relative;
                    .input-number {
                        width: 54%;
                    }
                    .check_box_wrap {
                        font-weight: 700;
                        align-items: center;
                        color: white;
                        font-size: 18px;
                        div:nth-child(2) {
                            gap: 0 10px;
                            display: flex;
                        }
                    }
                    .dropdown {
                        width: 190px;
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
                        span {
                            @include red_star
                        }
                        .input-number {
                            @include count_btn;
                        }
                        .form-control {
                            height: 35px;
                        }
                        .input-group-prepend {
                            color: white;
                            font-weight: 700;
                            font-size: 20px;
                            width: 130px;
                            text-align: end;
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
    @media only screen and (max-width: 767px) {
        .main_section {
            .form-select {
                width: 100%
            }
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
            .readonly_box {
                @include readonly_box;
            }
            .swiper_section {
                swiper-slide {
                    top: 25px;
                    right: 27px;
                }
                swiper-slide img {
                    padding: 40px;
                }
            }
            .content .option_section,
            .content .option_section .options-list,
            .tab-content .option_section,
            .tab-content .option_section .options-list,
            .input-number {
                width: 100%;
            }
            .info_wrap {
                margin: auto;
                padding: 0 5%;
                .store_option .content {
                    .option_wrap {
                        flex-direction: column;
                        align-items: self-start;
                    }
                    .store_location {
                        gap: 10px 0;
                        flex-direction: column;
                    }
                }
                .input-group-prepend,
                .col-form-label {
                    color: white;
                    font-weight: 700;
                    font-size: 20px;
                    margin-bottom: 5px;
                    margin-right: 10px;
                    white-space: nowrap;
                    span {
                        @include red_star
                    }
                }
                .fixed_info {
                    @include fixed_info;
                    height: unset;
                    flex-direction: column;
                    padding: 10px;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                    span {
                        @include red_star
                    }
                }
                .content {
                    @include content_bg;
                    .check_box_wrap {
                        flex-direction: row;
                        font-weight: 700;
                        color: white;
                        font-size: 18px;
                        .check_box {
                            margin-right: 10px;
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
                            width: 100%;
                            color: black;
                            justify-content: space-between;
                            align-items: center;
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
                            @include count_btn;
                        }
                        .form-control {
                            height: 35px;
                            width: 100%;
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
                .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
                    margin-left: unset !important;
                }
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
                    position: relative;
                    .selected_file {
                        display: flex;
                        align-items: center;
                        .input-group {
                            flex-direction: column;
                        }
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
                                    content: '·';
                                    font-weight: 700;
                                    color: white;
                                }
                            }
                        }
                    }
                    .check_box_wrap {
                        flex-direction: column;
                        font-weight: 700;
                        color: white;
                        font-size: 18px;
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
                        button {
                            @include dropdown-btn;
                            width: 100%;
                            color: black;
                            justify-content: space-between;
                            align-items: center;
                        }
                    }
                    .input-group {
                        flex-direction: column;
                        span {
                            @include red_star
                        }
                        .input-number {
                            @include count_btn;
                        }
                        .form-control {
                            height: 35px;
                            width: 100%;
                            margin-left: unset !important;
                            margin-top: 5px;
                        }
                        .input-group-prepend {
                            color: white;
                            font-weight: 700;
                            font-size: 20px;
                            width: 100%;
                        }
                        .file_wrap {
                            display: flex;
                            flex-direction: column;
                            .choose_btn {
                                margin-top: 5px;
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
</style>