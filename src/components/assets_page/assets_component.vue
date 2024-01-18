<template>
    <div class="main_section">
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>資產編號:</p>
                </div>
                <div>
                    <p>物品名稱:</p>
                </div>
                <div>
                    <p>資產類型:</p>
                </div>
            </div>
            <div class="content">
                <!-- 狀態 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                狀態：
                            </div>
                            <input type="text" class="form-control readonly_box" readonly>
                        </div>
                    </div>
                </div>
                <!-- 專案代碼 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">專案代碼：</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- 專案名稱 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">專案名稱：</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- 物流單號 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            物流單號 :
                        </div>
                        <input type="text" class="form-control readonly_box" readonly>
                        <button class="form_search_btn" @click="viewReceive">檢視</button>
                        <!-- 隱藏跳轉按鈕 -->
                        <!-- <router-link :to="{name: 'Receive_View' , query:{ search_id : details.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link> -->
                    </div>
                </div>
                <!-- 設備 總類&分類 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">設備總類：</div>
                            <input type="text" class="form-control readonly_box" readonly>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">設備分類：</div>
                            <input type="text" class="form-control readonly_box" readonly>
                        </div>
                    </div>
                </div>
                <!-- 廠商 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">廠商：</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- 型號 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">型號：</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- 規格 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">規格：</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- S/N -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">S/N：</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- 採購金額 -->
                <div class="row  purchase_amount">
                    <div class="col-xl-6 col-lg-auto col-md-auto col-12">
                        <div class="input-group mb-xl-3 mb-lg-3 mb-md-3">
                            <div class="input-group-prepend   ">
                                採購金額：
                            </div>
                            <div class="amount_input">
                                <span class="symbol">$</span><input type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <span class="note">/每包裝單位<span>($<span class="purchase_total_amount">10</span>/每單位)</span>
                        </span>
                    </div>
                </div>
                <!-- 總庫存數量 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">總庫存數量：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">單位：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                </div>
                <!-- 儲位 區域&櫃位 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">儲位區域：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">儲位櫃位：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                </div>
                <!-- 保固期限 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                保固期限：
                            </div>
                            <input type="text" class="form-control readonly_box" readonly>
                        </div>
                    </div>
                </div>
                <!-- 保固 開始&結束 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">保固開始日：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">保固到期日：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                </div>
                <!-- 保管人員 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                保管人員：
                            </div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                </div>
                <!-- 入庫 人員&日期 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">入庫人員：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">入庫日期：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                </div>
                <!-- 備註 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">備註：</div>
                        <textarea style="height: 150px;" class="form-control readonly_box" aria-label="With textarea" readonly></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="info_wrap col photo">
            <div class="fixed_title">
                <div>
                    <h4>資產照片</h4>
                </div>
            </div>
            <div class="content">
                <h2 class="no_content_text">查無照片</h2>
                <div>
                    <!-- <swiper-container class='swiper_section' :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
                    <swiper-slide v-for="(item , index) in selectFiles.viewFile" :key="index" class="custom-slide">
                      <img class="swiper_bottom_img" :src="item.FileLink" alt="">
                       <button class='zoom_img' data-bs-toggle="modal" data-bs-target="#zoomImg" @click="handlePreview(item)">
              <img src="@/assets/zoom.png">
            </button>
                    </swiper-slide>
                  </swiper-container> -->
                    <div class="swiper_pagination">
                    </div>
                </div>
            </div>
        </div>
        <div class="info_wrap col log">
            <div class="fixed_title">
                <div>
                    <h4>進出庫歷史紀錄</h4>
                </div>
            </div>
            <div class="content_wrap">
                <div class="content">
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-6">
                            <p>作業日期(起)</p>
                            <div class="date-selector">
                                <div class="input-container">
                                    <input type="date" class="date-input" />
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-6">
                            <p>作業日期(迄)</p>
                            <div class="date-selector">
                                <div class="input-container">
                                    <input type="date" class="date-input" />
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-12">
                            <p>作業行為</p>
                            <div class="dropdown">
                                <!-- <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {{ searchParams.Action || "請選擇" }}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="statusDropdown">
                          <p v-for="(item , index) in ActionArray" :key="index" class="dropdown-item" @click="selectAction(item)">{{ item}}</p>
                        </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col button_wrap">
                    <!-- <button class="search_btn" @click="searchHistory('','search')">檢索</button>
                  <button class="empty_btn" @click="clear">清空</button> -->
                </div>
                <div class="info_wrap">
                    <!-- <DataTable
                    lazy
                    :key="datagrid.key"
                    :first= "datagrid.first"
                    :size="'small'"
                    :loading="datagrid.loading"
                    :value="rowData" 
                    :sort-field="datagrid.sortField"
                    :sort-order="datagrid.sortOrder"
                    resizableColumns 
                    columnResizeMode="expand"
                    showGridlines 
                    scrollable 
                    scrollHeight="420px" 
                    @page="searchHistory($event , 'page')" 
                    @sort="searchHistory($event , 'sort')"
                    paginator 
                    :rows="datagrid.rows" 
                    :totalRecords="datagrid.totalRecords"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    :rowsPerPageOptions="[10, 20, 30]"
                    currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                    <Column style="min-width: 60px;">
                      <template #body="slotProps">
                        <Storage_list_view_button :params = "slotProps" v-if="slotProps.data.FormID"/>
</template>
            </Column>
            <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
          </DataTable> -->
        </div>
      </div>
   
    </div>
    </div>
</template>

<script>
    import view_modal from "@/components/view_modal.vue"
    export default {
        components: {
            view_modal
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/css/global.scss";
    .no_content_text {
        padding: 5px 0;
        text-align: center;
        font-weight: 700;
    }
    .photo {
        .content {
            border-radius: 0 10px 10px 10px!important;
            box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
            background-color: #e5e8e9 !important;
        }
        margin: 5% auto;
    }
    .log {
        margin-top: 3% !important;
        .info_wrap {
            width: 100%;
            #grid_table {
                margin-bottom: 0 !important;
            }
        }
        .content_wrap {
            background-color: #E6EAEC;
            border-radius: 0 10px 10px 10px;
            padding: 20px;
            box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
            .content {
                border-radius: 10px !important;
            }
            p {
                @include datagrid_title;
            }
            input {
                display: flex;
                border: none;
                border-radius: 5px;
                background-color: white;
                padding: 5px 10px;
                font-size: 18px;
                width: 200px;
                height: 35px;
            }
        }
    }
    .info_wrap:nth-child(1) {
        margin-bottom: 3% !important
    }
    @media only screen and (min-width: 1200px) {
        .main_section {
            .readonly_box {
                @include readonly_box;
            }
            .form_search_btn {
                @include form_search_btn;
            }
            .purchase_amount {
                align-items: baseline;
                flex-wrap: nowrap;
                .input-group-prepend {
                    margin-right: 10px;
                }
                .amount_input {
                    display: flex;
                    gap: 0 13px;
                    margin-left: 0;
                }
                span {
                    color: white !important;
                }
                span.symbol {
                    font-size: 22px;
                }
                span.note {
                    margin-left: -5%;
                    font-weight: 700;
                    font-size: 18px;
                }
            }
            .info_wrap {
                margin: auto;
                width: 800px;
                .fixed_info {
                    @include fixed_info;
                    border-radius: 10px 10px 0 0;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                }
                .fixed_title {
                    @include fixed_title;
                }
                .content {
                    @include content_bg;
                    .form_search_wrap {
                        .input-group {
                            .input-group-prepend {
                                width: 114px;
                            }
                            input {
                                margin-left: 15px !important
                            }
                        }
                    }
                    .dropdown {
                        .dropdown-menu {
                            width: 100%;
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
                            width: 120px;
                            text-align: end;
                        }
                    }
                }
                .content:nth-child(1) {
                    border-radius: 0px 10px 10px 10px
                }
                .content:nth-child(2) {
                    border-radius: 0px 0px 10px 10px
                }
                .dropdown {
                    width: calc(100% - 10%);
                    height: 35px;
                    @include dropdown_btn;
                    .dropdown-toggle {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border: none;
                    }
                    .dropdown-menu {
                        width: 100%;
                        transform: translate3d(-1px, 35px, 0px) !important;
                        max-height: 250px;
                        overflow-y: auto;
                        p {
                            font-size: 18px;
                            color: black;
                            font-weight: normal;
                            &:hover {
                                cursor: pointer;
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
            .purchase_amount {
                align-items: baseline;
                flex-wrap: nowrap;
                input{
                    width: calc(100% - 36%);
                }
                .input-group-prepend {
                    margin-right: 10px;
                }
                .amount_input {
                    display: flex;
                    gap: 0 13px;
                    margin-left: 0;
                }
                span {
                    color: white !important;
                }
                span.symbol {
                    font-size: 22px;
                }
                span.note {
                    font-weight: 700;
    margin-left: calc(100% - 120%);
    font-size: 18px;
                }
            }
            .info_wrap {
                margin: auto;
                padding: 0 5%;
                width: 800px;
                .fixed_info {
                    @include fixed_info;
                    border-radius: 10px 10px 0 0;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                }
                .fixed_title {
                    @include fixed_title;
                }


                .content {
                    @include content_bg;
                    .form_search_wrap {
                        .input-group {
                            .input-group-prepend {
                                width: 114px;
                            }
                            input {
                                margin-left: 15px !important
                            }
                        }
                    }
                    .dropdown {
                        .dropdown-menu {
                            width: 100%;
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
                            width: 120px;
                            text-align: end;
                        }
                    }
                }
                .content:nth-child(1) {
                    border-radius: 0px 10px 10px 10px
                }
                .content:nth-child(2) {
                    border-radius: 0px 0px 10px 10px
                }
                .dropdown {
                    width: calc(100% - 10%);
                    height: 35px;
                    @include dropdown_btn;
                    .dropdown-toggle {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border: none;
                    }
                    .dropdown-menu {
                        width: 100%;
                        transform: translate3d(-1px, 35px, 0px) !important;
                        p {
                            font-size: 18px;
                            color: black;
                            font-weight: normal;
                        }
                    }
                }
            }
            .info_wrap:nth-child(4) .info_wrap {
                padding: 0;
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
                margin-left: unset !important;
                background-color: #132238;
                &:hover {
                    background-color: #43546d;
                }
            }
            .readonly_box {
                @include readonly_box;
            }
            .purchase_amount {
                .amount_input {
                    display: flex;
                    gap: 0 10px;
                    font-size: 20px;
                    align-items: center;
                }
                .input-group-prepend {
                    margin-right: 10px;
                }
                span {
                    color: white !important;
                }
                span.note {
                    margin-top: 5px;
                    margin-bottom: 16px;
                    display: block;
                    font-weight: 700;
                    font-size: 18px;
                }
            }
            .info_wrap {
                padding: 1% 5% 0;
                .fixed_title {
                    @include fixed_title;
                }
                .fixed_info {
                    @include fixed_info;
                    flex-direction: column;
                    height: unset;
                    padding: 10px;
                    border-radius: 10px 10px 0 0;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                }
                .content {
                    @include content_bg;
                    .row {
                        gap: 10px 0;
                    }
                    .dropdown {
                        .dropdown-menu {
                            width: 100%;
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
                        .input-number {
                            @include count_btn;
                        }
                        .form-control {
                            width: 100%;
                            height: 35px;
                            margin-left: unset !important;
                        }
                        .input-group-prepend {
                            margin-bottom: 5px;
                            color: white;
                            font-weight: 700;
                            font-size: 20px;
                        }
                    }
                }
                .content:nth-child(1) {
                    border-radius: 0px 10px 10px 10px
                }
                .content:nth-child(2) {
                    border-radius: 0px 0px 10px 10px
                }
            }
            .info_wrap:nth-child(4) .info_wrap {
                padding: 0;
            }
        }
    }
</style>