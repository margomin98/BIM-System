<template>
    <Navbar />
    <div class="modal fade" data-bs-backdrop="static" id="propertymodal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="fixed_item_info mb-5">
                        <!-- 採購項目 -->
                        <div class='col'>
                            <p>採購項目</p>
                            <input type="text" class="form-control text-center" />
                        </div>
                        <!-- 規格需求 -->
                        <div class='col'>
                            <p>規格需求</p>
                            <input type="text" class="form-control text-center" />
                        </div>
                        <!-- 已選/待選數量 -->
                        <div class='col'>
                            <p>已選/待選數量</p>
                            <input type="text" class="form-control text-center" />
                        </div>
                    </div>
                    <div class="fixed_info">
                        <div>
                            <p>檢索資產</p>
                        </div>
                        <button type="button" class="close" data-bs-dismiss="modal">x</button>
                    </div>
                    <div class='second_content'>
                        <div class='wrap1'>
                            <!-- 設備總類 -->
                            <div class='col'>
                                <p>設備總類</p>
                                <select class="form-select" v-model="selectedEquipType">
                          <option value="">請選擇</option>
                          <option value="equipType1">設備類型1</option>
                          <option value="equipType2">設備類型2</option>
                        </select>
                            </div>
                            <!-- 設備分類 -->
                            <div class='col'>
                                <p>設備分類</p>
                                <select class="form-select" v-model="selectedEquipCategory">
                          <option value="">請選擇</option>
                          <option value="equipCategory1">設備分類1</option>
                          <option value="equipCategory2">設備分類2</option>
                        </select>
                            </div>
                            <!-- 儲位區域 -->
                            <div class='col'>
                                <p>儲位區域</p>
                                <select class="form-select" v-model="selectedArea">
                          <option value="">請選擇</option>
                          <option value="area1">儲位區域1</option>
                          <option value="area2">儲位區域2</option>
                        </select>
                            </div>
                            <!-- 儲位櫃位 -->
                            <div class='col'>
                                <p>儲位櫃位</p>
                                <select class="form-select" v-model="selectedCabinet">
                          <option value="">請選擇</option>
                          <option value="cabinet1">儲位櫃位1</option>
                          <option value="cabinet2">儲位櫃位2</option>
                        </select>
                            </div>
                            <!-- 專案代碼 -->
                            <div class='col'>
                                <p>專案代碼</p>
                                <select class="form-select" v-model="selectedCabinet">
                          <option value="">請選擇</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                            </div>
                            <!-- 資產編號 -->
                            <div class='col'>
                                <p>資產編號</p>
                                <input type="text" class="form-control text-center" placeholder="(明確查詢)" v-model="itemName" />
                            </div>
                            <!-- 物品名稱 -->
                            <div class='col'>
                                <p>物品名稱</p>
                                <input type="text" class="form-control text-center" placeholder="(模糊查詢)" v-model="itemName" />
                            </div>
                        </div>
                        <div class='col d-flex justify-content-center'>
                            <button class="btn submit_btn" type="button" @click="searchInventory('','search')">搜尋</button>
                            <button class="btn submit_btn" style="margin-left: 0.5rem;" type="button" @click="clear">清空</button>
                            <button class="btn add_btn" style="margin-left: 0.5rem;" type="button" data-bs-dismiss="modal" @click="addList">加入</button>
                        </div>
                    </div>
                </div>
                <div class="fixed_info">
                    <div>
                        <p>目前資產庫存（請優先選擇存貨）</p>
                    </div>
                </div>
                <!-- <DataTable lazy :first="datagrid1.first" :size="'small'" :loading="datagrid1.loading" :value="rowData1" :sort-field="datagrid1.sortField" :sort-order="datagrid1.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="510px"
                                        @page="searchInventory($event , 'page')" @sort="searchInventory($event , 'sort')" v-model:selection="datagrid1.selectedList" :selectAll="datagrid1.selectAll" @select-all-change="onSelectAll" @row-unselect="onRowUnselect" paginator :rows="10"
                                        :totalRecords="datagrid1.totalRecords" paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                                        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                                        <Column style="min-width: 60px;">
                                            <template #body="slotProps">
                          <List_view_button :params="slotProps" />
</template>
              </Column>
              <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
              </DataTable> -->
            </div>
          </div>
        </div>
    <div class="modal fade" id="auth_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel1">沖銷人員驗證</h5>
                    <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
                </div>
                <div class="modal-body">
                    <div class="col">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">帳號：</div>
                            <input type="text" class="form-control" v />
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">密碼：</div>
                            <input type="password" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer m-auto">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate(1)">驗證</button>
                </div>
            </div>
        </div>
    </div>
    <div class="main_section">
        <div class="title col">
            <h1>沖銷作業</h1>
        </div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>申請人員：</p>
                </div>
                <div>
                    <p>申請日期：</p>
                </div>
            </div>
            <div class="content">
                <!-- 單號 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 單號：</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- 專案 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 專案：</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- 説明 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 説明：</div>
                        <textarea style="height: 150px;" class="form-control readonly_box" readonly></textarea>
                    </div>
                </div>
                <!-- 交貨期限 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                交貨期限：
                            </div>
                            <input type="date" class="form-control readonly_box" readonly>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info_wrap my-5">
            <div class="purchase_list" role="region" tabindex="0">
                <div class="fixed_info">
                    <div>
                        <p>待採購清單</p>
                    </div>
                </div>
                <div class="purchase_table">
                    <table>
                        <thead>
                            <tr>
                                <th class="check_col"></th>
                                <th class="to_buy_list"><span>所選清單</span></th>
                                <th class="item_col"><span>採購項目</span></th>
                                <th class="amount_col"><span>已沖/待沖數量</span></th>
                                <th><span>規格需求</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="table_content"><button class="writeoff_btn" data-bs-toggle="modal" data-bs-target="#propertymodal">沖銷</button></td>
                                <td class="table_content">
                                    <div class="item_number_wrap">
                                        <div class="item_number"><img src="@/assets/delete.png"><span>B05234311</span></div>
                                        <div class="item_number"><img src="@/assets/delete.png"><span>B554111</span></div>
                                        <div class="item_number"><img src="@/assets/delete.png"><span>B12123314311</span></div>
                                        <div class="item_number"><img src="@/assets/delete.png"><span>B554111</span></div>
                                        <div class="item_number"><img src="@/assets/delete.png"><span>B12123314311</span></div>
                                    </div>
                                </td>
                                <td class="table_content">路由器</td>
                                <td class="table_content">0/11</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                            <tr>
                                <td class="table_content"><button class="writeoff_btn" data-bs-toggle="modal" data-bs-target="#propertymodal">沖銷</button></td>
                                <td class="table_content">
                                    <div class="item_number_wrap">
                                    </div>
                                </td>
                                <td class="table_content">路由器</td>
                                <td class="table_content">0/11</td>
                                <td class="table_content">文字字文字字文字文字文字</td>
                            </tr>
                            <tr>
                                <td class="table_content"><button class="writeoff_btn" data-bs-toggle="modal" data-bs-target="#propertymodal">沖銷</button></td>                                <td class="table_content">
                                    <div class="item_number_wrap">
                                    </div>
                                </td>
                                <td class="table_content">路由器</td>
                                <td class="table_content">0/11</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                            <tr>
                                <td class="table_content"><button class="writeoff_btn" data-bs-toggle="modal" data-bs-target="#propertymodal">沖銷</button></td>                                <td class="table_content">
                                    <div class="item_number_wrap">
                                    </div>
                                </td>
                                <td class="table_content">路由器</td>
                                <td class="table_content">0/11</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                            <tr>
                                <td class="table_content"><button class="writeoff_btn" data-bs-toggle="modal" data-bs-target="#propertymodal">沖銷</button></td>
                                <td class="table_content">
                                    <div class="item_number_wrap">
                                    </div>
                                </td>
                                <td class="table_content">路由器</td>
                                <td class="table_content">0/11</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>沖銷簽章</p>
                </div>
            </div>
            <div class="content">
                <!-- 沖銷人員/完成沖銷日期 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend"><span>*</span>沖銷人員：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                            <button class="auth_btn" data-bs-toggle="modal" data-bs-target="#auth_modal">驗證</button>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">完成沖銷日期：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                </div>
                <!-- 説明 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 沖銷備註：</div>
                        <textarea style="height: 150px;" class="form-control" placeholder="最多輸入100字"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="col button_wrap">
            <button class="back_btn" @click="goBack">回上一頁</button>
            <button class="save_btn" @click="temp">暫存</button>
            <button class="send_btn" @click="submit">完成</button>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue';
    export default {
        components: {
            Navbar
        },
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/css/global.scss";
    .modal .modal-body {
        padding: 0 !important;
    }
    #propertymodal {
        .fixed_item_info {
            background: #528091;
            display: grid;
            border: 1px solid black;
            p {
                color: white;
                text-align: center;
                white-space: nowrap;
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 5px
            }
        }
        
        padding: 0 5%;
        .modal-content {
            background: unset;
            border: 0;
        }
        .fixed_info {
            @include fixed_info;
            background: #528091 !important;
            border-radius: 0 !important;
            border: 1px solid black;
            padding: 0 10px;
            div {
                flex-grow: 1;
                text-align: center;
            }
            p {
                font-size: 20px;
                margin-bottom: 0 !important
            }
            button {
                border: none;
                background: none;
                color: white;
                font-weight: 700;
                font-size: 22px;
            }
        }
        .list {
            border-left: 1px solid black;
            border-bottom: 1px solid black;
            border-right: 1px solid black;
        }
        .second_content {
            border-left: 1px solid black;
            border-right: 1px solid black;
            background: #D9D9D9;
            padding: 20px;
            p.content {
                display: flex;
                justify-content: center;
                align-items: center;
                color: black;
                background: white;
                height: 35px;
                border-radius: 5px;
            }
            .submit_btn {
                margin-top: 20px;
                background: #48658C;
                color: white;
                font-weight: 700;
                width: 80px;
                font-size: 20px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover {
                    background-color: #5d85bd;
                }
            }
            .add_btn {
                margin-top: 20px;
                background: #132238;
                color: white;
                font-weight: 700;
                width: 80px;
                font-size: 20px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0;
                border-radius: 7px;
                &:hover {
                    background-color: #426497;
                }
            }
            .wrap1 {
                display: grid;
                .input-number {
                    @include count_btn;
                }
                .number-input-box {
                    color: black;
                    .input-number {
                        width: 100%;
                    }
                }
                .form-label {
                    white-space: nowrap;
                    font-weight: 800;
                    font-size: 18px;
                }
                div {
                    padding: 0 5px;
                    p {
                        color: black;
                        text-align: center;
                        white-space: nowrap;
                        font-size: 18px;
                        font-weight: 700;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
    #auth_modal {
        button {
            background: #506b91;
            border: none;
            font-weight: 700;
            font-size: 18px;
            &:hover {
                background: #6d92b3;
            }
        }
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
    .writeoff_btn {
        background: #79A8A9;
        border: none;
        border-radius: 10px;
        width: 72px;
        padding: 8px 0;
        color: white;
        &:hover {
            background: #608485
        }
    }
    .main_section {
        .fixed_info {
            @include fixed_info;
            p {
                font-size: 20px;
                margin-bottom: 0;
            }
        }
        .content {
            @include content_bg;
            span {
                @include red_star
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
                }
            }
        }
        h1 {
            margin-top: 50px;
            text-align: center;
            font-weight: 600;
            @include title_color;
        }
        .readonly_box {
            @include readonly_box;
        }
        .auth_btn {
            @include auth_btn;
            &:hover {
                background: #5a6d87;
            }
        }
        .purchase_table {
            height: 250px;
            overflow-y: scroll;
        }
        .purchase_list {
            overflow: auto;
            width: 100%;
            table {
                border: 1px solid #000000;
                width: 100%;
                border-collapse: collapse;
                border-spacing: 1px;
                text-align: center;
            }
            caption {
                caption-side: top;
                text-align: center;
            }
            th,
            td {
                border: 1px solid #000000;
                background-color: #ffffff;
                color: #000000;
                padding: 5px;
            }
            td {
                padding: 8px;
            }
            tbody tr {
                height: 46px;
            }
            .check_col {
                width: 90px
            }
            .to_buy_list {
                width: 300px
            }
            .amount_col {
                width: 130px
            }
            .item_col {
                width: 160px
            }
            .table_content {
                text-align: left;
                .item_number {
                    background: #A7AFBB;
                    width: min-content;
                    border-radius: 10px;
                    padding: 5px 10px;
                    margin: 3px;
                    display: inline-flex;
                    align-items: center;
                    gap: 0 8px;
                    img {
                        cursor: pointer;
                    }
                }
            }
            &:focus-visible {
                outline: unset;
            }
        }
    }
    .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        gap: 20px;
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
        .save_btn {
            @include save_btn;
            &:hover {
                background-color: #5e7aa2;
            }
        }
    }
    @media only screen and (min-width: 1200px) {
        .fixed_item_info {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            gap: 30px;
            padding: 20px 160px;
        }
        #propertymodal .second_content .wrap1 {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 15px;
            padding: 10px 80px;
        }
        .main_section {
            h1 {
                font-size: 55px;
            }
            .info_wrap {
                margin: auto;
                width: 850px;
                .content {
                    .input-group {
                        .input-group-prepend {
                            width: 140px;
                            text-align: end;
                        }
                    }
                }
            }
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 1199px) {
        .fixed_item_info {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            gap: 30px;
            padding: 20px 50px;
        }
        .main_section {
            h1 {
                font-size: 55px;
            }
            .info_wrap {
                margin: auto;
                width: 700px;
                .content {
                    .input-group {
                        .input-group-prepend {
                            width: 140px;
                            text-align: end;
                        }
                    }
                }
                .purchase_list .table_content {
                    white-space: nowrap
                }
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .fixed_item_info {
            gap: 10px 0;
            padding: 20px
        }
        #propertymodal .second_content .wrap1 {
            gap: 10px 0;
        }
        .modal {
            .fixed_info {
                height: unset!important;
            }
            .second_content .wrap1 {
                gap: 10px;
                padding: 5px;
            }
        }
        .main_section {
            h1 {
                font-size: 50px;
            }
            .fixed_info {
                flex-direction: column;
                height: unset;
                padding: 10px
            }
            .info_wrap {
                padding: 0 5%;
                .purchase_list td {
                    white-space: nowrap
                }
                .purchase_list table {
                    display: block;
                    overflow-y: scroll;
                    input {
                        width: 50%
                    }
                }
                input,
                textarea {
                    width: 100%;
                }
                .content {
                    .auth_btn {
                        margin-top: 10px
                    }
                    .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
                        margin-left: unset;
                        border-radius: 5px;
                    }
                    .input-group {
                        flex-direction: column;
                    }
                }
            }
        }
    }
</style>