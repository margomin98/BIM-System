<template>
    <Navbar />
    <div class="main_section">
        <div class="title col">
            <h1>檢視專案採購單</h1>
        </div>
        <case_purchase_view></case_purchase_view>
        <div class="col button_wrap">
            <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
        </div>
    </div>
</template>
<script setup>
import Navbar from '@/components/Navbar.vue';
import case_purchase_view from '@/components/case_purchase_page/case_purchase_view.vue';
import { usePurchaseStore } from '@/store/purchase/_index'
import { useUtilsStore } from '@/store';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
const purchaseStore = usePurchaseStore();
const utilsStore = useUtilsStore();
const route = useRoute();
const PP_ID = route.query.search_id;
onMounted(async() => {
  purchaseStore.$reset();
  purchaseStore.PageType = 'view';
  purchaseStore.getDetails(PP_ID);
});
onUnmounted(()=>{
  purchaseStore.$dispose();
  utilsStore.$dispose();
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