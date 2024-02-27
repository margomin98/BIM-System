<template>
    <div class="info_wrap col">
        <Delete_warn v-show="PageType === 'delete'"></Delete_warn>
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
                    <input type="text" class="form-control readonly_box" readonly v-model="Form.PP_ID" />
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
            <!-- 專案代碼 -->
            <div class="col form_search_wrap">
                <div class="input-group mb-3">
                    <div class="input-group-prepend"> 專案代碼：</div>
                    <input type="text" class="form-control readonly_box" readonly v-model="Form.ProjectCode" />
                </div>
            </div>
            <!-- 專案名稱 -->
            <div class="col form_search_wrap">
                <div class="input-group mb-3">
                    <div class="input-group-prepend"> 專案名稱：</div>
                    <input type="text" class="form-control readonly_box" readonly v-model="Form.ProjectName" />
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
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.PurchasePerson" />
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">完成採購日期：</div>
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.PurchaseDate" />
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
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.WriteoffPerson" />
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">完成沖銷日期：</div>
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.WriteoffDate" />
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
        <div v-show="PageType==='delete'" class="info_wrap mt-5">
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
                                <th class="item_col"><span>採購項目</span></th>
                                <th class="amount_col"><span>數量</span></th>
                                <th><span>規格需求</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item , index) in Form.Requisitions" :key="item.RequiredSpec">
                                <td class="table_content">{{ item.ItemName }}</td>
                                <td class="table_content">{{ item.Number }}</td>
                                <td class="table_content">{{ item.RequiredSpec }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div v-show="PageType==='view'" class="info_wrap mt-5">
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
                            <th class="check_col"><span>採購狀態</span></th>
                            <th class="writeoff_property"><span>沖銷所選資產</span></th>
                            <th class="item_col"><span>採購項目</span></th>
                            <th class="amount_col"><span>已沖/待沖數量</span></th>
                            <th><span>規格需求</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- NotOrdered -->
                        <tr v-for="item in Form.NotOrdered">
                            <td class="table_content edit_order_btn"><button class="edit_order_btn_grey">編輯訂單</button></td>
                            <td>
                                <p v-if="Form.Status === '待採購'">尚未決定</p>
                                <p v-else-if="Form.Status === '採購中'">暫緩採購</p>
                                <p v-else-if="Form.Status === '沖銷中' && item.Number != item.selectNumber">沖銷中</p>
                                <p v-else>已沖銷</p>
                            </td>
                            <td class="table_content">
                                <div class="item_number_wrap">
                                    <div v-for="asset in item.AssetList" :key="asset.AssetsId" class="item_number"><span>{{ asset.AssetsId }}</span></div>
                                </div>
                            </td>
                            <td class="table_content">{{ item.ItemName }}</td>
                            <td class="table_content">{{ item.SelectedNumber }}/{{ item.Number }}</td>
                            <td class="table_content">{{ item.RequiredSpec }}</td>
                        </tr>
                        <!-- Ordered -->
                        <tr v-for="item in Form.Ordered">
                            <td class="table_content edit_order_btn"><button :class="{'edit_order_btn_grey': Form.Status !== '採購中'}" @click="editOrder(item.PO_ID)" :disabled="Form.Status !=='採購中'">編輯訂單</button></td>
                            <td>
                                <p v-if="Form.Status === '採購中'">已採購</p>
                                <p v-else-if="Form.Status === '沖銷中' && item.Number != item.selectNumber">沖銷中</p>
                                <p v-else>已沖銷</p>
                            </td>
                            <td class="table_content">
                                <div class="item_number_wrap">
                                    <div v-for="asset in item.AssetList" :key="asset.AssetsId" class="item_number"><span>{{ asset.AssetsId }}&nbsp;&nbsp;&nbsp;&nbsp;*{{asset.Number}}</span></div>
                                </div>
                            </td>
                            <td class="table_content">{{ item.ItemName }}</td>
                            <td class="table_content">{{ item.SelectedNumber }}/{{ item.Number }}</td>
                            <td class="table_content">{{ item.RequiredSpec }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        useUtilsStore
    } from '@/store';
    import {
        usePurchaseStore
    } from '@/store/purchase/_index';
    import Delete_warn from '@/components/Delete_warn.vue';
    import {
        storeToRefs
    } from 'pinia';
    import {
        onMounted,
        onUnmounted,
        ref
    } from 'vue';
    import router from '@/router';
    const utilsStore = useUtilsStore();
    const purchaseStore = usePurchaseStore();
    const {
        Form,
        PageType
    } = storeToRefs(purchaseStore);
    const fullproject = ref('');
    fullproject.value = purchaseStore.Project;
    onUnmounted(() => {
        utilsStore.$dispose();
        purchaseStore.$dispose();
    })
    const editOrder = (PO_ID) => {
        if (PO_ID) {
            router.push({
                name: 'Order_Edit',
                query: {
                    search_id: PO_ID
                }
            });
        }
    }
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
            max-height: 500px;
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
    @media only screen and (min-width: 1200px) {
        .main_section {
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
                width: 1400px;
            }
            .purchase_list td {
                padding: 8px
            }
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 1199px) {
        .main_section {
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
                width: 800px;
            }
            .purchase_list td {
                padding: 8px
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .main_section {
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