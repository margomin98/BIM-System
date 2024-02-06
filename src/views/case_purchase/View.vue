<template>
    <Navbar />
    <div class="main_section">
        <div class="title col">
            <h1>檢視專案採購單</h1>
        </div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>申請人員：{{ Form.Applicant }}</p>
                </div>
                <div>
                    <p>申請日期：{{ Form.ApplicationDate }}</p>
                </div>
            </div>
            <div class="content">
                <!-- 單號 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 單號：</div>
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.PP_ID"/>
                    </div>
                </div>
                <!-- 狀態 -->
                <div class="row ">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                狀態：
                            </div>
                            <input type="text" class="form-control readonly_box" readonly v-model="Form.Status">
                        </div>
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
                        <textarea style="height: 150px;" class="form-control readonly_box" readonly v-model="Form.Description"></textarea>
                    </div>
                </div>
                <!-- 採購人員/完成採購日期 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">採購人員：</div>
                            <input type="text" class="form-control readonly_box" readonly  v-model="Form.PurchasePerson"/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">完成採購日期：</div>
                            <input type="text" class="form-control readonly_box" readonly  v-model="Form.PurchaseDate"/>
                        </div>
                    </div>
                </div>
                <!-- 採購備註 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 採購備註：</div>
                        <textarea style="height: 150px;" class="form-control readonly_box" readonly v-model="Form.PurchaseMemo"></textarea>
                    </div>
                </div>
                <!-- 沖銷人員/完成沖銷日期 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">沖銷人員：</div>
                            <input type="text" class="form-control readonly_box" readonly  v-model="Form.WriteoffPerson"/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">完成沖銷日期：</div>
                            <input type="text" class="form-control readonly_box" readonly  v-model="Form.WriteoffDate"/>
                        </div>
                    </div>
                </div>
                <!-- 沖銷備註 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 沖銷備註：</div>
                        <textarea style="height: 150px;" class="form-control readonly_box" readonly v-model="Form.WriteoffMemo"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="info_wrap mt-5">
            <div class="purchase_list" role="region" tabindex="0">
                <div class="fixed_info">
                    <div>
                        <p>採購清單</p>
                    </div>
                </div>
                <div class="purchase_table">
                    <table>
                        <thead>
                            <tr>
                                <th class="edit_order"><span></span></th>
                                <th class="check_col"><span>勾選<br>下訂</span></th>
                                <th class="check_col">暫緩<br>採購<span></span></th>
                                <th class="writeoff_property"><span>沖銷所選資產</span></th>
                                <th class="item_col"><span>採購項目</span></th>
                                <th class="amount_col"><span>已沖/待沖數量</span></th>
                                <th><span>規格需求</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="table_content edit_order_btn"><button>編輯訂單</button></td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" disabled>
                                </td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" disabled>
                                </td>
                                <td class="table_content">
                                    <div class="item_number_wrap">
                                        <div class="item_number"><span>B05234311</span></div>
                                        <div class="item_number"><span>B232511</span></div>
                                        <div class="item_number"><span>B98574311</span></div>
                                    </div>
                                </td>
                                <td class="table_content">路由器</td>
                                <td class="table_content">0/11</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                            <tr>
                                <td class="table_content edit_order_btn"><button>編輯訂單</button></td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td class="table_content">
                                    <div class="item_number_wrap">
                                    </div>
                                </td>
                                <td class="table_content">路由器</td>
                                <td class="table_content">0/11</td>
                                <td class="table_content">文字文字文字</td>
                            </tr>
                            <tr>
                                <td class="table_content edit_order_btn"><button class="edit_order_btn_grey">編輯訂單</button></td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="" id="flexCheckDefault">
                                </td>
                                <td class="table_content">
                                    <div class="item_number_wrap">
                                        <div class="item_number"><span>B05234311</span></div>
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
        <div class="col button_wrap">
            <button class="back_btn" @click="goBack">回上一頁</button>
        </div>
    </div>
</template>
<script setup>
import Navbar from '@/components/Navbar.vue';
import { usePurchaseStore } from '@/store/purchase/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const purchaseStore = usePurchaseStore();
// 解構
const { Form } = storeToRefs(purchaseStore) ;
const route = useRoute();

const PP_ID = route.query.search_id;
onMounted(async() => {
  purchaseStore.$reset();
  purchaseStore.getDetails(PP_ID);
});
onUnmounted(()=>{
  purchaseStore.$dispose();
})
</script>

<style lang="scss" scoped>
    @import "@/assets/css/global.scss";
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
            tbody tr {
                height: 46px;
            }
            .check_col {
                width: 70px
            }
            .edit_order {
                width: 120px
            }
            .writeoff_property {
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
            .edit_order_btn {
                text-align: center;
                button {
                    background: #79A8A9;
                    border: none;
                    border-radius: 5px;
                    width: 94px;
                    font-size: 18px;
                    &:hover {
                        background: #608485
                    }
                }
                .edit_order_btn_grey {
                    background: #A7AFBB;
                    opacity: 0.5;
                    cursor: not-allowed;
                    &:hover {
                        background: #A7AFBB;
                    }
                }
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
    }
    @media only screen and (min-width: 1200px) {
        .main_section {
            h1 {
                font-size: 55px;
            }
            .info_wrap {
                margin: auto;
                .content {
                    .input-group {
                        .input-group-prepend {
                            width: 140px;
                            text-align: end;
                        }
                    }
                }
            }
            .info_wrap:nth-child(2) {
                width: 800px;
            }
            .info_wrap:nth-child(3) {
                width: 1200px;
            }
            .purchase_list td {
                padding: 8px
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
            .info_wrap:nth-child(2) {
                width: 700px;
            }
            .info_wrap:nth-child(3) {
                width: 750px;
            }
            .purchase_list td {
                padding: 8px
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
                .purchase_list td {
                    white-space: nowrap
                }
                .purchase_list table {
                    display: block;
                    overflow-y: scroll;
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