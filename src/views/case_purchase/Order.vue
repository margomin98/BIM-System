<template>
    <Navbar />
    <div class="modal fade" id="auth_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel1">採購人員驗證</h5>
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
            <h1>下訂作業</h1>
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
                <div class="row expire_date_wrap">
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
        <div class="info_wrap mt-5">
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
                                <th class="check_col"><span>勾選<br>下訂</span></th>
                                <th class="check_col">暫緩<br>採購<span></span></th>
                                <th class="item_col"><span>採購項目</span></th>
                                <th class="amount_col"><span>數量</span></th>
                                <th><span>規格需求</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td class="table_content">路由器</td>
                                <td class="table_content">1</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                            <tr>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td class="table_content">電腦主機</td>
                                <td class="table_content">2</td>
                                <td class="table_content">文字文字文字文字文字文字</td>
                            </tr>
                            <tr>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td class="table_content">滑鼠</td>
                                <td class="table_content">6</td>
                                <td class="table_content">文字文字文字文字文字文字文字文字文字</td>
                            </tr>
                            <tr>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td class="table_content">電腦主機</td>
                                <td class="table_content">4</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                            <tr>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td class="table_content">電腦主機</td>
                                <td class="table_content">4</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                            <tr>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td class="table_content">電腦主機</td>
                                <td class="table_content">4</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="purchase_list_note">
                <p>*可勾選多個採購項目後，合併新增訂單</p>
            </div>
            <div class="add_btn">
                <button class="">新增訂單</button>
            </div>
        </div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>採購簽章</p>
                </div>
            </div>
            <div class="content">
                <!-- 採購人員/完成採購日期 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend"><span>*</span>採購人員：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                            <button class="auth_btn" data-bs-toggle="modal" data-bs-target="#auth_modal">驗證</button>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">完成採購日期：</div>
                            <input type="text" class="form-control readonly_box" readonly />
                        </div>
                    </div>
                </div>
                <!-- 説明 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 説明：</div>
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
    .modal {
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
    .main_section {
        .fixed_info {
            @include fixed_info;
            p {
                font-size: 20px;
                margin-bottom: 0;
            }
        }
        .add_btn {
            display: flex;
            justify-content: center;
            button {
                border-radius: 10px;
                padding: 5px 25px;
                color: white;
                font-size: 20px;
                font-weight: 700;
                background: #132238;
                border: none;
                margin: 24px 0;
                display: flex;
                justify-content: center;
                &:hover {
                    background-color: #456ca7
                }
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
                table-layout: fixed;
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
                white-space: nowrap;
            }
            tbody tr {
                height: 46px;
            }
            .check_col,
            .amount_col {
                width: 70px
            }
            .item_col {
                width: 160px
            }
            .table_content {
                text-align: left;
            }
        }
        .purchase_list_note {
            background: #3D4E61;
            border-radius: 0 0 10px 10px;
            padding: 10px 0;
            text-align: center;
            color: white;
            font-weight: 700;
            p {
                margin-bottom: 0
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
            }
        }
    }
    @media only screen and (max-width: 767px) {
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