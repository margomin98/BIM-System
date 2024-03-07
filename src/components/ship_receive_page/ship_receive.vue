<template>
    <Viewmodal />
    <!-- 上傳人員 -->
    <validate_modal :modal_id="'auth_modal'" :user="rentStore.user1"></validate_modal>
    <div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>單號：{{ Form.AO_ID }}</p>
                </div>
                <div>
                    <p>申請人員：{{ Form.Applicant }}</p>
                </div>
                <div>
                    <p>申請日期：{{ Form.ApplicationDate }}</p>
                </div>
            </div>
            <form>
                <div class="row g-0">
                    <div class="col d-flex wrap column_section">
                        <label for="inputTitle1" class="form-label use">
                            <p>用&ensp;&ensp;&ensp;&ensp;途</p>
                        </label>
                        <div class="option">
                            <div class='content'>
                                <div class="form-check" v-for="(option, index) in DropdownArray.Use" :key="index">
                                    <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)"
                                        :disabled="option !== Form.Use" v-model="Form.Use">
                                    <label class="form-check-label" :for="'radio' + (index + 1)">{{ option }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row g-0 project_details">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithButton" class="form-label">
                            <p>專案代碼</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box">{{ Form.ProjectCode }}</p>
                        </div>
                    </div>
                    <div class="col d-flex wrap">
                        <label for="inputWithTitle" class="form-label project_name">
                            <p>專案名稱</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box" readonly> {{ Form.ProjectName }}</p>
                        </div>
                    </div>
                </div>
                <div class="row g-0 ">
                    <div class="col d-flex wrap">
                        <label for="inputTextarea" class="form-label">
                            <p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p>
                        </label>
                        <div class="input-group" id='readonly_box'>
                            <textarea class="form-control readonly_box" readonly v-model="Form.Description"></textarea>
                        </div>
                    </div>
                </div>
                <div v-show="Form.Status === '快速出庫完成'" class="row g-0 project_date_wrap">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithButton" class="form-label">
                            <p>領用人員</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box">{{ Form.Recipient }}</p>
                        </div>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-12 d-flex wrap">
                        <label for="inputWithTitle" class="form-label project_date">
                            <p>交付完成日期</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box"> {{ Form.DeliveryDate }}</p>
                        </div>
                    </div>
                </div>
            </form>
            <div v-show="Form.Status !== '快速出庫完成'" class="fixed_info">
                <div>
                    <p>資產出庫項目</p>
                </div>
            </div>
            <div v-show="Form.Status !== '快速出庫完成'" class="second_content">
                <DataTable size="small" :value="Form.ItemList" resizableColumns columnResizeMode="expand" showGridlines
                    scrollable scroll-height="420px">
                    <Column v-for="item in rentStore.ItemList_field" :field="item.field" :header="item.header" sortable
                        :style="{ 'min-width': item.width }"></Column>
                </DataTable>
            </div>
            <div class="fixed_info">
                <div>
                    <p>資產出庫細項</p>
                </div>
            </div>
            <div class="third_content">
                <DataTable :size="'small'" :value="Form.OM_List" resizableColumns columnResizeMode="expand" showGridlines
                    scrollable scroll-height="600px">
                    <Column header="交付確認" class="datatable_checkbox">
                        <template style="min-width:50px; " #body="slotProps">
                            <input type="checkbox" class="p-checkbox p-component" v-model="slotProps.data.OM_IsExecute"
                                disabled>
                        </template>
                    </Column>
                    <Column>
                        <template #body="slotProps">
                            <asset_view_btn :params="slotProps" />
                        </template>
                    </Column>
                    <Column v-for="item in rentStore.OMList_field" :field="item.field" :header="item.header"
                        :sortable="item.sortable" :style="{ 'min-width': item.width }"></Column>
                </DataTable>
            </div>
            <div class="fixed_info_count">
            </div>
            <div v-show="Form.Status !== '快速出庫完成'" class="fourth_content">
                <div class="fixed_info">
                    <div>
                        <p>備料簽章</p>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithButton" class="form-label">
                            <p>備料人員</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box">{{ Form.PreparedPerson }}</p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithTitle" class="form-label project_name">
                            <p>備料完成日期</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box">{{ Form.PrepareDate }}</p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithTitle" class="form-label project_name">
                            <p>備註</p>
                        </label>
                        <div class="input-group" id='readonly_box'>
                            <textarea class="form-control readonly_box" v-model="Form.PrepareMemo" readonly></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="Form.Status !== '快速出庫完成'" class="five_content">
                <div class="fixed_info">
                    <div>
                        <p>審核簽章</p>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithButton" class="form-label">
                            <p>審核人員</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box">{{ Form.VerifyPerson }}</p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithTitle" class="form-label project_name">
                            <p>審核結果</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box" style="margin-bottom: 0;">{{ Form.VerifyResult }}</p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithTitle" class="form-label project_name">
                            <p>審核日期</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box">{{ Form.VerifyDate }}</p>
                        </div>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col d-flex wrap">
                        <label for="inputWithButton" class="form-label">
                            <p>審核意見</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <textarea class="readonly_box form-control" readonly v-model="Form.VerifyMemo"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="Form.Status !== '快速出庫完成'" class="six_content">
                <div class="fixed_info">
                    <div class="six_content_title">
                        <p>交付簽章</p>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithButton" class="form-label">
                            <p>領用人員</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box">{{ Form.Recipient }}</p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithTitle" class="form-label project_name">
                            <p>交付人員</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box" style="margin-bottom: 0;">{{ Form.DeliveryOperator }}</p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
                        <label for="inputWithTitle" class="form-label project_name">
                            <p>交付完成日期</p>
                        </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box">{{ Form.DeliveryDate }}</p>
                        </div>
                    </div>
                </div>

                <div class="row g-0">
                    <div class="col d-flex wrap">
                        <label for="inputWithButton" class="form-label" id="memo">
                            <p>備註</p>
                        </label>
                        <div class="input-group" id="memo_input">
                            <textarea class="form-control readonly_box" readonly v-model="Form.DeliveryMemo"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 空白簽收單 -->
        <div class="info_wrap print_section">
            <div class='content  d-flex'>
                <p>空白簽收單</p>
                <print-btn :datagrid="Form.OM_List" :title="Form" />
            </div>
        </div>
        <!-- 上傳簽收單 -->
        <div class="info_wrap upload_receive_section">
            <div class='content'>
                <div class="d-flex content_wrap">
                    <p v-show="PageType === 'ShipReceiveConfirm'"><span>*</span>上傳簽收單</p>
                    <div class="upload_wrap">
                        <button v-show="PageType === 'ShipReceiveConfirm'"
                            @click="openFileExplorer(fileinput)">選擇檔案</button>
                        <input type="file" accept="image/*,.doc,.docs,.pdf" style="display: none;" ref="fileinput"
                            @input="utilsStore.handleFileChange($event, { newDoc: Form.newFile, viewDoc: Form.viewFile, existDoc: Form.existFile }, 1)">
                        <button type="button" id="openModal" data-bs-toggle="modal" data-bs-target="#viewFile_modal"
                            style="display:none;">開啟modal隱藏按鈕</button>
                        <div class="selected_file col">
                            <div class="input-group">
                                <div class="store_edit_file">
                                    <div class="file_upload_wrap">
                                        <p v-for="(file, file_index) in Form.viewFile">{{ file.FileName }}
                                            <img class="view_icon" src="@/assets/view.png" style="margin-left:10px"
                                                @click="utilsStore.viewImgFile(file)">
                                            <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;"
                                                @click="utilsStore.deleteImgFile('new', Form, file_index)">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>已上傳簽收單</p>
                    <div class="upload_wrap">
                        <div class="selected_file col">
                            <div class="input-group">
                                <div class="store_edit_file">
                                    <div class="file_upload_wrap">
                                        <p v-for="(file, file_index) in Form.existFile">{{ file.FileName }}
                                            <img class="view_icon" src="@/assets/view.png" style="margin-left:10px"
                                                @click="utilsStore.viewImgFile(file)">
                                            <img v-show="PageType === 'ShipReceiveConfirm'" class="trash_icon"
                                                src="@/assets/trash.png" style="margin-left: 10px;"
                                                @click="utilsStore.deleteImgFile('exist', Form, file_index)">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="auth_section d-flex">
                <p><span v-show="PageType === 'ShipReceiveConfirm'" class="red_star">*</span>上傳人員</p>
                <input v-show="PageType === 'ShipReceiveConfirm'" type="text" class="readonly_box"
                    v-model="user1.resultName" readonly>
                <input v-show="PageType === 'ShipReceiveView'" type="text" class="readonly_box" v-model="Form.UploadPerson"
                    readonly>
                <button v-show="PageType === 'ShipReceiveConfirm'" data-bs-toggle="modal"
                    data-bs-target="#auth_modal">驗證</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Viewmodal from '@/components/view_modal.vue'
import validate_modal from '@/components/utils/validate_modal.vue';
import asset_view_btn from '@/components/utils/asset_view_btn.vue';
import printBtn from '@/components/ship_receive_page/ship_receive_print_btn.vue'
import {
    useAPIStore,
    useUtilsStore
} from '@/store';
import {
    useRentStore
} from '@/store/rent/_index';
import {
    storeToRefs
} from 'pinia';
import {
    openFileExplorer
} from '@/assets/js/common_fn';
import {
    ref
} from 'vue';
const utilsStore = useUtilsStore();
const rentStore = useRentStore();
const apiStore = useAPIStore();
const {
    Form,
    DropdownArray,
    PageType,
    user1
} = storeToRefs(rentStore)
const fileinput = ref();
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";

.six_content .fixed_info {
    position: relative;

    .six_content_title,
    .six_content_date {
        position: absolute;
    }

    .six_content_date {
        right: 10px;

        p {
            font-size: 16px !important
        }
    }
}

.auth_section {
    justify-content: center;
    align-items: center;
    background: #283344;
    padding: 10px 0;
    border-radius: 0 0 10px 10px;
    gap: 0 10px;

    p {
        margin-bottom: 0;
    }

    button {
        padding: 10px 17px;
        font-size: 18px;
        background: #3569AF;
    }

    .readonly_box {
        cursor: not-allowed;
        width: unset;
        height: 35px;
        border-radius: 5px;
    }
}

.selected_file {
    display: flex;
    align-items: center;

    .file_upload_wrap {
        margin-bottom: 0;
        flex-direction: column;
        display: flex;
        align-items: center;

        img {
            width: 25px;
            height: 25px;
        }

        p {
            font-weight: 700;
            font-size: 18px;
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

.upload_receive_section,
.print_section {
    margin-top: 24px !important;

    .content {
        gap: 0 20px;
        padding: 10px 20px;
        background: rgba(82, 136, 156, 0.8)
    }

    p {
        margin-bottom: 0;
        font-size: 20px;
        color: white;
        font-weight: 700;
    }

    button {
        border-radius: 5px;
        display: flex;
        height: 35px;
        font-size: 18px;
        justify-content: center;
        color: #FFF;
        align-items: center;
        font-weight: 700;
        border: none;
    }
}

.print_section {
    .content {
        align-items: center;
        height: 60px;
        border-radius: 10px !important;

        button {
            padding: 10px 25px;
            background: var(--c3, #364E68);
        }
    }
}

.upload_receive_section {
    .content {
        border-radius: 10px 10px 0 0 !important;

        .upload_wrap {
            margin-left: 20px;

            button {
                padding: 10px 25px;
                background: #7CA6DD;
            }
        }

        .selected_file {
            margin-top: 10px;
        }
    }
}

.readonly_box {
    @include readonly_box;
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
}

.input-group {
    height: 100%;
}

.option {
    @include readonly_box;
    height: 100%;
    width: 100%;
    align-items: center;
}

span {
    @include red_star;
}

.modal {
    .modal-body {
        padding: 16px 16px 0;
    }

    button {
        background: #506b91;
        border: none;
        font-weight: 700;
        font-size: 18px;

        &:hover {
            background: #6d92b3;
        }
    }

    .modal-input-group-prepend {
        width: auto;
        font-weight: 700;
        font-size: 20px;
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
        display: flex;
        justify-content: center;

        .close_icon {
            cursor: pointer;
        }

        .modal-title {
            margin: auto;
        }
    }
}

#confirmModal {
    .modal-content {
        border-radius: 0;
        border: 1px solid black;

        .modal-body {
            background: #528091;
            color: white;
            font-weight: 700;
            text-align: center;
            height: 80px;
            border-bottom: 1px solid black;
        }

        .modal-footer {
            margin: auto;
            padding: 10px;
            gap: 5px;

            button:nth-child(1) {
                font-weight: 700;
                border: none;

                &:hover {
                    background: #636260
                }
            }

            button:nth-child(2) {
                background: #132238;
                font-weight: 700;
                border: none;

                &:hover {
                    background: #426497
                }
            }
        }
    }
}

.input-with-icon {
    position: relative;
}

.checkmark-icon {
    position: absolute;
    top: 10%;
    left: 93%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
}

.project_details .project_name {
    height: 100%;
}

h1 {
    margin-top: 50px;
    text-align: center;
    font-weight: 600;
    @include title_color;
}

@media only screen and (min-width: 1200px) {
    .main_section {
        h1 {
            font-size: 55px;
        }

        .modal-content {
            width: 400px;
            margin: auto;
        }

        .info_wrap {
            margin: auto;
            width: 1000px;

            .input-group-prepend {
                width: 100% !important;
                text-align: center !important;
            }

            .fixed_info {
                @include fixed_info;
                background: #528091;
                border-radius: 0;
                border-top: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;

                p {
                    font-size: 20px;
                    margin-bottom: 0;
                }
            }

            .fixed_info:nth-child(5) {
                border-top: unset;
            }


            #readonly_box {
                padding: 0;
                background-color: #B4B4B4;
                border-left: black 1px solid;
            }

            .third_content {
                .list {
                    border-top: 1px solid black;
                    border-left: 1px solid black;
                    border-right: 1px solid black;

                    button {
                        @include content_delete_button;

                        &:hover {
                            background: #ff7272;
                        }
                    }
                }
            }

            .fixed_info_count {
                display: flex;
                background: #3d5c67;
                color: white;
                font-weight: 700;
                align-items: center;
                height: 40px;
                border-radius: 0;
                border-bottom: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;
                padding: 0 10px;
                justify-content: right;
                gap: 10px;

                p {
                    font-size: 15px;
                    margin-bottom: 0;
                }
            }

            .fourth_content {
                border-left: 1px solid black;
                border-right: 1px solid black;
                background: white;

                .fixed_info {
                    border: none;
                    border-bottom: 1px solid black;
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                    padding: 0;
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    padding: 0 10px;
                    width: 150px;

                    p {
                        margin-bottom: 0;
                        text-align: center;
                    }
                }

                #readonly_box {
                    border-right: 1px solid black;
                }

                .wrap:nth-child(3) #readonly_box {
                    border-right: none;
                }
            }

            .five_content {
                border-left: 1px solid black;
                border-bottom: 1px solid black;

                .fixed_info {
                    border: none;
                    border-top: 1px solid black;
                    border-right: 1px solid black;
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                }

                #readonly_box {
                    background: #b4b4b4;
                    font-weight: 700;
                }

                .wrap {
                    background: white;
                    border-top: 1px solid black;
                    align-items: center;
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    padding: 0 16px;
                    width: 120px;

                    p {
                        margin-bottom: 0;
                        text-align: center;
                    }
                }

                .wrap:nth-child(1) #readonly_box,
                .wrap:nth-child(3) #readonly_box {
                    border-right: 1px solid black;
                }

                .wrap:nth-child(2) {
                    label {
                        width: 205px;
                    }

                    .input-group {
                        border-left: 1px solid black;
                        border-right: 1px solid black;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        gap: 5px;
                    }
                }
            }

            .six_content {
                border-left: 1px solid black;
                background: white;
                border-bottom: 1px solid black;

                span {
                    @include red_star;
                }

                .fixed_info {
                    border-left: none;
                    border-top: none;
                    border-right: 1px solid black;
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                    padding: 5px 10px 0;
                }

                .wrap {
                    background: white;
                    border-top: 1px solid black;
                    align-items: center;
                    border-right: 1px solid black;

                    button {
                        margin: 0 10px;
                        border-radius: 7px;
                        height: 30px;
                        width: 100px;
                        border: none;
                        background: #48658c;
                        color: white;
                        font-weight: 700;
                        font-size: 18px;

                        &:hover {
                            background-color: #5d85bd;
                        }
                    }
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    padding: 0 10px;
                    width: 154px;

                    p {
                        margin-bottom: 0;
                        text-align: center;
                    }
                }

                .wrap:nth-child(2) {
                    border-right: 1px solid black;

                    label {
                        width: 80%;
                    }
                }

                .wrap:nth-child(3) {
                    border-right: 1px solid black;
                }

                .wrap:nth-child(1) {
                    border-right: 1px solid black;

                    textarea {
                        border-bottom: 0;
                    }

                    #memo {
                        width: 120px;
                        border: none
                    }
                }

                #memo_input {
                    border-left: 1px solid black;
                }

                .use_acc {
                    border-right: 1px solid black;
                }
            }

            form {
                border-top: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;

                .row:nth-child(3) {
                    textarea {
                        padding: 5px 10px 0;
                    }
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                    padding: 0;
                }

                .wrap {
                    background: white;

                    align-items: center;

                    label.use {
                        border-right: 1px solid black;
                    }

                    .option {
                        @include readonly_box;
                        height: 100%;
                        width: 100%;
                        align-items: center;
                        display: flex;

                        .content {
                            display: flex;
                        }
                    }

                    .project_name {
                        border-left: 1px solid black;
                    }

                }

                .column_section,
                .project_details {
                    border-bottom: 1px solid black;
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    padding: 0 20px;
                    width: 150px;

                    p {
                        width: 100px;
                        margin-bottom: 0;
                        text-align: center;
                    }
                }
            }

            .input-group-prepend {
                color: white;
                font-weight: 700;
                font-size: 20px;
                width: 120px;
                text-align: end;
            }
        }

        .project_date_wrap {
            border-top: 1px solid black;
            border-bottom: 1px solid black;

            .project_date {
                border-left: 1px solid black;

                p {
                    width: 150px !important;
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

        .modal-content {
            width: 400px;
            margin: auto;
        }

        .info_wrap {
            margin: auto;
            padding: 0 5%;

            .input-group-prepend {
                width: 100% !important;
                text-align: center !important;
            }

            .fixed_info {
                @include fixed_info;
                background: #528091;
                border-radius: 0;
                border-top: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;

                p {
                    font-size: 20px;
                    margin-bottom: 0;
                }
            }

            .fixed_info:nth-child(5) {
                border-top: unset;
            }

            .fixed_info:nth-child(3),
            .fixed_info:nth-child(5) {
                border-bottom: 1px solid black;
            }

            #readonly_box {
                padding: 0;
                background-color: #B4B4B4;
                border-left: black 1px solid;
            }

            .third_content {
                .list {
                    border-top: 1px solid black;
                    border-left: 1px solid black;
                    border-right: 1px solid black;

                    button {
                        @include content_delete_button;

                        &:hover {
                            background: #ff7272;
                        }
                    }
                }
            }

            .fixed_info_count {
                display: flex;
                background: #3d5c67;
                color: white;
                font-weight: 700;
                align-items: center;
                height: 40px;
                border-radius: 0;
                border-bottom: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;
                padding: 0 10px;
                justify-content: right;
                gap: 10px;

                p {
                    font-size: 15px;
                    margin-bottom: 0;
                }
            }

            .fourth_content {
                border-left: 1px solid black;
                border-right: 1px solid black;
                background: white;

                .fixed_info {
                    border: none;
                    border-bottom: 1px solid black;
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                    padding: 0;
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    padding: 0 10px;
                    width: 150px;

                    p {
                        margin-bottom: 0;
                        text-align: center;
                    }
                }

                #readonly_box {
                    border-right: 1px solid black;
                }

                .wrap:nth-child(3) #readonly_box {
                    border-right: none;
                }
            }

            .five_content {
                border-left: 1px solid black;
                border-bottom: 1px solid black;

                .fixed_info {
                    border: none;
                    border-top: 1px solid black;
                    border-right: 1px solid black;
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                }

                #readonly_box {
                    background: #b4b4b4;
                    font-weight: 700;
                }

                .wrap {
                    background: white;
                    border-top: 1px solid black;
                    align-items: center;
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    padding: 0 16px;
                    width: 120px;

                    p {
                        margin-bottom: 0;
                        text-align: center;
                    }
                }

                .wrap:nth-child(1) #readonly_box,
                .wrap:nth-child(3) #readonly_box {
                    border-right: 1px solid black;
                }

                .wrap:nth-child(2) {
                    label {
                        width: 205px;
                    }

                    .input-group {
                        border-left: 1px solid black;
                        border-right: 1px solid black;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        width: 280px;
                    }
                }
            }

            .six_content {
                border-left: 1px solid black;
                background: white;
                border-bottom: 1px solid black;

                span {
                    @include red_star;
                }

                .fixed_info {
                    border-left: none;
                    border-top: none;
                    border-right: 1px solid black;
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                    padding: 5px 10px 0;
                }

                .wrap {
                    background: white;
                    border-top: 1px solid black;
                    align-items: center;
                    border-right: 1px solid black;

                    button {
                        margin: 0 10px;
                        border-radius: 7px;
                        height: 30px;
                        width: 70px;
                        border: none;
                        background: #48658c;
                        color: white;
                        font-weight: 700;
                        font-size: 18px;

                        &:hover {
                            background-color: #5d85bd;
                        }
                    }
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    padding: 0 10px;
                    width: 168px;

                    p {
                        margin-bottom: 0;
                        text-align: center;
                    }
                }

                .wrap:nth-child(2) {
                    border-right: 1px solid black;

                    label {
                        width: 80%;
                    }
                }

                .wrap:nth-child(3) {
                    border-right: 1px solid black;
                }

                .wrap:nth-child(1) {
                    border-right: 1px solid black;

                    textarea {
                        border-bottom: 0;
                    }

                    #memo {
                        width: 123px;
                        border: none
                    }
                }

                #memo_input {
                    border-left: 1px solid black;
                }

                .use_acc {
                    border-right: 1px solid black;
                    width: 100px;
                }
            }

            form {
                border-top: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;

                .row:nth-child(3) {
                    textarea {
                        padding: 5px 10px 0;
                    }
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                    padding: 0;
                }

                .wrap {
                    background: white;

                    align-items: center;

                    label.use {
                        border-right: 1px solid black;
                    }

                    .option {
                        @include readonly_box;
                        height: 100%;
                        width: 100%;
                        align-items: center;
                        display: flex;

                        .content {
                            display: flex;
                        }
                    }

                    .project_name {
                        border-left: 1px solid black;
                    }

                }

                .column_section,
                .project_details {
                    border-bottom: 1px solid black;
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    padding: 0 20px;
                    width: 150px;

                    p {
                        width: 100px;
                        margin-bottom: 0;
                        text-align: center;
                    }
                }
            }

            .input-group-prepend {
                color: white;
                font-weight: 700;
                font-size: 20px;
                width: 120px;
                text-align: end;
            }
        }

        .project_date_wrap {
            border-top: 1px solid black;
            border-bottom: 1px solid black;

            .project_date {
                border-left: 1px solid black;

                p {
                    width: 150px !important;
                }
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .main_section {
        .readonly_box {
            @include readonly_box;
        }

        .upload_receive_section .content {
            flex-direction: column;

            .upload_wrap {
                margin-left: unset;
                margin-top: 10px;
            }

            .content_wrap {
                flex-direction: column;
            }
        }

        h1 {
            font-size: 40px;
        }

        .info_wrap {
            margin: auto;
            padding: 0 5%;

            .input-group-prepend {
                width: 100% !important;
                text-align: center !important;
            }

            .fixed_info {
                @include fixed_info;
                background: #528091;
                border-radius: 0;
                border-top: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;
                flex-direction: column;
                height: unset;
                padding: 10px;

                p {
                    font-size: 18px;
                    margin-bottom: 0;
                }
            }


            .third_content {
                .list {
                    border: 1px solid black;

                    button {
                        @include content_delete_button;

                        &:hover {
                            background: #ff7272;
                        }
                    }
                }
            }

            .fixed_info_count {
                display: flex;
                background: #3d5c67;
                color: white;
                font-weight: 700;
                align-items: center;
                height: 40px;
                border-radius: 0;
                border-bottom: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;
                padding: 0 10px;
                justify-content: right;
                gap: 10px;

                p {
                    font-size: 15px;
                    margin-bottom: 0;
                }
            }

            .fourth_content {
                border-bottom: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;

                .fixed_info {
                    border: none;
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                }

                .wrap {
                    background: white;
                    border-top: 1px solid black;
                    align-items: center;
                    flex-direction: column;

                    .option {
                        display: flex;
                    }
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: 30px;
                    border-bottom: 1px solid black;

                    p {
                        font-size: 18px;
                        margin-bottom: 0;
                        text-align: center;
                    }
                }
            }

            .five_content {
                border-bottom: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;

                .fixed_info {
                    border: none;
                }

                #readonly_box {
                    background: #b4b4b4;
                    font-weight: 700;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                    padding: 5px;
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                }

                .wrap {
                    background: white;
                    border-top: 1px solid black;
                    align-items: center;
                    flex-direction: column;

                    .option {
                        display: flex;
                    }
                }

                .form-label {
                    border-bottom: 1px solid black;
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: 30px;

                    p {
                        font-size: 18px;
                        margin-bottom: 0;
                        text-align: center;
                    }
                }
            }

            .six_content {
                border-bottom: 1px solid black;
                border-left: 1px solid black;

                .fixed_info {
                    height: 47px;
                    border: none;
                    border-bottom: 1px solid black;
                    border-right: 1px solid black;
                }

                .form-check {
                    margin-left: 10px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                    border: none
                }

                #memo {
                    border-top: 1px solid black;
                }

                #readonly_box {
                    background: #b4b4b4;
                    font-weight: 700;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                    padding: 5px;
                }

                .wrap {
                    background: white;
                    align-items: center;
                    flex-direction: column;

                    button {
                        margin: 10px;
                        border-radius: 7px;
                        height: 30px;
                        width: 100px;
                        border: none;
                        background: #48658c;
                        color: white;
                        font-weight: 700;
                        font-size: 18px;

                        &:hover {
                            background-color: #5d85bd;
                        }
                    }
                }

                .form-label {
                    border-bottom: 1px solid black;
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: 30px;

                    p {
                        font-size: 18px;
                        margin-bottom: 0;
                        text-align: center;
                    }
                }

                .wrap:nth-child(1) {
                    border-right: 1px solid black;
                }

                .wrap:nth-child(2) {
                    border-top: 1px solid black;
                    border-right: 1px solid black;
                }

                .wrap:nth-child(3),
                .wrap:nth-child(4) {
                    border-right: 1px solid black;
                    border-top: 1px solid black;
                }

                .wrap:nth-child(5) {
                    border-bottom: 1px solid black;
                    border-right: 1px solid black;
                    border-top: 1px solid black;
                }
            }

            form {
                border-top: 1px solid black;
                border-left: 1px solid black;
                border-right: 1px solid black;

                .form-check {
                    margin-left: 10px;
                    font-size: 18px;
                }

                .form-control {
                    height: auto;
                    border-radius: 0;
                }

                .wrap {
                    background: white;
                    align-items: center;
                    flex-direction: column;

                    label.use,
                    .form-label {
                        border-bottom: 1px solid black;
                        width: 100%;
                        height: 30px;
                        justify-content: space-evenly;
                    }

                    .option {
                        height: 100%;
                        width: 100%;
                        font-size: 18px;
                        background: #b4b4b4;
                        font-weight: 700;

                        .content {
                            padding: 5px;
                            display: grid;
                            grid-template-columns: 1fr 1fr 1fr;
                            grid-template-rows: 1fr 1fr;
                            gap: 0px 0px;
                            grid-auto-flow: row;
                            grid-template-areas: ". . ." ". . .";
                            white-space: nowrap;
                            justify-items: center;

                            div {
                                width: 90px;
                            }
                        }
                    }
                }

                .column_section,
                .project_details {
                    border-bottom: 1px solid black;
                }

                .form-label {
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                    height: 50px;
                    align-items: center;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    padding: 0 30px;

                    p {
                        width: 100px;
                        font-size: 18px;
                        margin-bottom: 0;
                        text-align: center;
                    }
                }
            }

            .auth_section .readonly_box {
                width: 100px;
                text-overflow: ellipsis;
                white-space: nowrap
            }

            .input-group-prepend {
                color: white;
                font-weight: 700;
                font-size: 20px;
                width: 120px;
                text-align: end;
            }
        }

        .project_date_wrap,
        .project_name,
        .project_date {
            border-top: 1px solid black;

        }
    }
}</style>