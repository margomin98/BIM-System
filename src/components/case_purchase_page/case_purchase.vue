<template>
    <div>
        <div class="info_wrap col mb-5">
            <div class="fixed_info">
                <div>
                    <p>申請人員：{{  Form.Applicant || utilsStore.userName }}</p>
                </div>
                <div>
                    <p>申請日期：{{  Form.ApplicationDate || utilsStore.today }}</p>
                </div>
            </div>
            <div class="content">
                <!-- 單號 -->
                <div v-show="Form.PP_ID" class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 單號：</div>
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.PP_ID" />
                    </div>
                </div>
                <!-- 專案 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> <span class="red_star">*</span>專案：</div>
                        <div class="option_section">
                            <multiselect v-model="Form.ProjectSelect" :allow-empty="false" @select="purchaseStore.onProjectSelect" :options="DropdownArray.ProjectCode" :max-height="300" placeholder="請選擇" label="Text" :showLabels="false" track-by="Text"></multiselect>
                        </div>
                    </div>
                </div>
                <!-- 説明 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> <span class="red_star">*</span>説明：</div>
                        <textarea style="height: 150px;" class="form-control " placeholder="最多輸入100字" v-model="Form.Description"></textarea>
                    </div>
                </div>
                <!-- 交貨期限 -->
                <div class="row expire_date_wrap">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="red_star">*</span>交貨期限：
                            </div>
                            <input type="date" class="form-control" v-model="Form.Deadline">
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <span class="date_note">若有多個交貨期限，請填寫最接近的交貨日期</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>填寫採購需求</p>
                </div>
            </div>
            <div class="content">
                <!-- 採購項目 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> <span class="red_star">*</span>採購項目：</div>
                        <input type="text" class="form-control " placeholder="最多輸入20字"  v-model="itemParams.ItemName"/>
                    </div>
                </div>
                <!-- 數量 -->
                <div class="row expire_date_wrap">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="red_star">*</span>數量：
                            </div>
                            <input type="number" class="form-control " min="1"  v-model="itemParams.Number"/>
                        </div>
                    </div>
                </div>
                <!-- 説明 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">規格需求：</div>
                        <textarea style="height: 150px;" class="form-control " placeholder="最多輸入100字"  v-model="itemParams.RequiredSpec"/>
                    </div>
                </div>
            </div>
            <div class="add_btn">
                <button class="" @click="purchaseStore.addItem">新增</button>
            </div>
        </div>
        <div class="info_wrap">
            <div class="purchase_list" role="region" tabindex="0">
                <div class="fixed_info">
                    <div>
                        <p><span class="red_star">*</span>待採購清單(請至少新增一項)</p>
                    </div>
                </div>
                <div class="purchase_table">
                <table>
                    <thead>
                        <tr>
                            <th class="delete_col"><span>刪除</span></th>
                            <th class="item_col"><span>採購項目</span></th>
                            <th class="amount_col"><span>數量</span></th>
                            <th><span>規格需求</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item , index) in Form.Requisitions" :key="item.RequiredSpec">
                            <td @click="purchaseStore.deleteItem(index)"><img class="table_delete_icon" src='@/assets/delete.png'></td>
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
</template>

<script setup>
import { useUtilsStore } from '@/store';
import { usePurchaseStore } from '@/store/purchase/_index';
import { storeToRefs } from 'pinia';
import { onUnmounted } from 'vue';
import Multiselect from 'vue-multiselect';

const utilsStore = useUtilsStore();
const purchaseStore = usePurchaseStore();
const { DropdownArray , Form , itemParams } = storeToRefs(purchaseStore);

onUnmounted(()=>{
    utilsStore.$dispose();
    purchaseStore.$dispose();
})
</script>

<style lang="scss" scoped>
    @import "@/assets/css/global.scss";
    .main_section {
        .option_section {
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
                top: 40px;
            }
            .options-list li {
                padding: 10px 10px 0;
                font-size: 18px;
                cursor: pointer;
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
        span.red_star {
            @include red_star
        }
        .date_note {
            color: white;
            font-weight: 700;
        }
        .expire_date_wrap {
            align-items: baseline;
        }
        .table_delete_icon {
            cursor: pointer;
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
        .purchase_table{
            max-height: 250px;
            overflow-y: scroll;
        }
        .purchase_list {
            overflow: auto;
            width: 100%;
            table {
                border: 1px solid #000000;
                height: 100%;
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
            .delete_col,
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
        .readonly_box {
            @include readonly_box;
        }
    }
    @media only screen and (min-width: 1200px) {
        .main_section {
            .info_wrap {
                width: 850px;
                margin: auto;
                .content {
                    .option_section {
                        width: 83.8%;
                        .options-list {
                            width: 83.5%;
                        }
                    }
                    .input-group {
                        .input-group-prepend {
                            width: 120px;
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
                margin: auto;
                .content {
                    .option_section {
                        width: 80%;
                        .options-list {
                            width: 79%;
                        }
                    }
                    .input-group {
                        .input-group-prepend {
                            width: 120px;
                            text-align: end;
                        }
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .main_section {
            .info_wrap {
                padding:0 5%;
                .purchase_list td{
                    white-space:nowrap
                }
                .purchase_list table {
                    display: block;
                    overflow-y: scroll;
                }
                input,
                textarea {
                    width: 100%;
                }
                .fixed_info {
                    height: unset;
                    padding: 10px;
                    flex-direction: column;
                }
                .content {
                    .option_section {
                        .options-list {
                            margin-top: 30px;
                            width: 100%
                        }
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