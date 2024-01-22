<template>
    <Viewmodal/>
    <div class="modal fade" id="auth_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title">驗證</h5>
                    <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
                </div>
                <div class="modal-body">
                    <div class="col">
                        <div class="input-group mb-3">
                            <div class="modal-input-group-prepend">帳號：</div>
                            <input type="text" class="form-control" aria-label="Default" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <div class="modal-input-group-prepend">密碼：</div>
                            <input type="password" class="form-control" aria-label="Default" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer m-auto">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="validate(index)">驗證</button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>單號：</p>
                </div>
                <div>
                    <p>申請人員：</p>
                </div>
                <div>
                    <p>申請日期：</p>
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
                                <div class="form-check" v-for="(option, index) in options" :key="index">
                                    <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)" :disabled="option !== details.Use && details.Use !== ''">
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
                            <p class="readonly_box" readonly></p>
                        </div>
                    </div>
                    <div class="col d-flex wrap">
                        <label for="inputWithTitle" class="form-label project_name" id="project_name">
                                <p>專案名稱</p>
                            </label>
                        <div class="input-group" id="readonly_box">
                            <p class="readonly_box" readonly></p>
                        </div>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col d-flex wrap" style="border: none">
                        <label for="inputTextarea" class="form-label">
                                <p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p>
                            </label>
                        <div class="input-group" id='readonly_box'>
                            <textarea class="form-control readonly_box" readonly></textarea>
                        </div>
                    </div>
                </div>
            </form>
            <div class="fixed_info">
                <div>
                    <p>資產出庫項目</p>
                </div>
            </div>
            <div class="second_content">
                <!-- <DataTable size="small" :value="rowData1" resizableColumns columnResizeMode="expand" showGridlines scrollable scroll-height="420px">
                                    <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
                                </DataTable> -->
            </div>
            <div class="fixed_info">
                <div>
                    <p><span>*</span>資產出庫細項(請至少勾選一項)</p>
                </div>
            </div>
            <div class="third_content">
                <!-- <DataTable :size="'small'" :value="rowData2" resizableColumns columnResizeMode="expand" showGridlines scrollable scroll-height="600px" :row-style="({ OM_IsExecute }) => !OM_IsExecute ? 'background-color: #CEE4EB;': null ">
                                        <Column header="交付確認" class="datatable_checkbox">
                                            <template style="min-width:50px; " #body="slotProps">
                                              <input type="checkbox" class="p-checkbox p-component" v-model="slotProps.data.OM_IsExecute">
</template>
          </Column>
          <Column>
<template #body="slotProps">
    <AssetsView :params="slotProps" />
</template>
          </Column>
        <Column v-for="item in datagrid2field" :field="item.field" :header="item.header" :sortable="item.sortable" :style="{'min-width': item.width}"></Column>
        </DataTable> -->
      </div>
      <div class="fixed_info_count">
        <div>
          <p>總出庫數量：個</p>
        </div>
        <div>
          <p>已備數量：個</p>
        </div>
      </div>
      <div class="fourth_content">
    <div class="fixed_info">
        <div>
            <p>備料簽章</p>
        </div>
    </div>
    <div class="row g-0">
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>備料人員</p></label>
            <div class="input-group" id="readonly_box">
                <p class="readonly_box" readonly></p>
            </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備料完成日期</p></label>
            <div class="input-group" id="readonly_box">
                <p class="readonly_box" readonly></p>
            </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>備註</p></label>
            <div class="input-group" id='readonly_box'>
                <textarea class="form-control readonly_box" readonly></textarea>
            </div>
        </div>
    </div>
</div>

<div class="five_content">
    <div class="fixed_info">
        <div>
            <p>審核簽章</p>
        </div>
    </div>
    <div class="row g-0">
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>審核人員</p></label>
            <div class="input-group" id="readonly_box">
                <p class="readonly_box" readonly></p>
            </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>審核結果</p></label>
            <div class="input-group" id="readonly_box">
                <p class="readonly_box" readonly style="margin-bottom: 0;"></p>
            </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>審核日期</p></label>
            <div class="input-group" id="readonly_box">
                <p class="readonly_box" readonly></p>
            </div>
        </div>
    </div>
    <div class="row g-0">
        <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>審核意見</p></label>
            <div class="input-group" id="readonly_box">
                <textarea class="readonly_box form-control" readonly></textarea>
            </div>
        </div>
    </div>
</div>

<div class="six_content">
    <div class="fixed_info">
        <div class="six_content_title">
            <p>交付簽章</p>
        </div>
        <div class="six_content_date">
            <p>{{ DeliveryDate }}</p>
        </div>
    </div>
    <div class="row g-0">
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"><p>領用人員</p></label>
            <div class="input-group" id="readonly_box">
                <p class="readonly_box" readonly></p>
            </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>交付人員</p></label>
            <div class="input-group" id="readonly_box">
                <p class="readonly_box" readonly style="margin-bottom: 0;"></p>
            </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"><p>交付完成日期</p></label>
            <div class="input-group" id="readonly_box">
                <p class="readonly_box" readonly></p>
            </div>
        </div>
    </div>

    <div class="row g-0">
        <div class="col d-flex wrap">
            <label for="inputWithButton" class="form-label" id="memo"><p>備註</p></label>
            <div class="input-group" id="memo_input">
                <textarea class="form-control" placeholder="最多輸入100字"></textarea>
            </div>
        </div>
    </div>
</div>

    </div>
       <!-- 空白簽收單 -->
    <div class="info_wrap print_section">
        <div class='content  d-flex'>
            <p>空白簽收單</p>
            <button>列印</button>
        </div>
    </div>

   <!-- 上傳簽收單 -->
    <div class="info_wrap upload_receive_section">
        <div class='content  d-flex'>
     
            <p>上傳簽收單</p>
            <div class="upload_wrap">
            <button>選擇檔案</button>
             
            <div class="selected_file col">
                <div class="input-group">
                  <div class="store_edit_file">
                    <div class="file_upload_wrap">
                      <p>123
                        <img class="view_icon" src="@/assets/view.png" style="margin-left:10px" @click="viewImgFile('new',index , file_index)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                        <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="deleteFileFunction('new',index,file_index)"></p>
                        <p>123
                            <img class="view_icon" src="@/assets/view.png" style="margin-left:10px" @click="viewImgFile('new',index , file_index)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                            <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="deleteFileFunction('new',index,file_index)"></p>
                    </div>
                  </div>
                </div>
              </div>
             
        </div>
        </div>
        <div class="auth_section d-flex">
              <p><span class="red_star">*</span>上傳人員</p> 
            <input type="text" name="" value="">
            <button data-bs-toggle="modal" data-bs-target="#auth_modal">驗證</button>
              </div>
        </div>
    </div>
</template>

<script>
    import Viewmodal from '@/components/View_modal.vue'
    export default {
        components: {
            Viewmodal
        },
    }
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
        background: white;
        padding: 5px 0;
        border-radius: 0 0 10px 10px;
        gap: 0 10px;
        p {
            margin-bottom: 0;
            color: black !important;
        }
        button {
            padding: 10px 17px;
            font-size: 18px;
            background: #3569AF;
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
            font-size: 20px;
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
    .project_details #project_name {
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
                            @include delete_button;
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
                        padding: 0;
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
                        border-bottom: 0.5px solid black;
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
            .button_wrap {
                display: flex;
                justify-content: space-between;
                margin: 30px auto 5%;
                width: 220px;
                button {
                    &:nth-child(1) {
                        @include back_to_previous_btn;
                        &:hover {
                            background-color: #5d85bb;
                        }
                    }
                }
                .send_btn {
                    @include search_and_send_btn;
                    &:hover {
                        background-color: #5e7aa2;
                    }
                }
                .send_btn_disabled {
                    background: #878787;
                    &:hover {
                        background: #878787;
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
                            @include delete_button;
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
                        padding: 0;
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
                        border-bottom: 0.5px solid black;
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
            .button_wrap {
                display: flex;
                justify-content: space-between;
                margin: 30px auto 5%;
                width: 220px;
                button {
                    &:nth-child(1) {
                        @include back_to_previous_btn;
                        &:hover {
                            background-color: #5d85bb;
                        }
                    }
                }
                .send_btn {
                    @include search_and_send_btn;
                    &:hover {
                        background-color: #5e7aa2;
                    }
                }
                .send_btn_disabled {
                    background: #878787;
                    &:hover {
                        background: #878787;
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
            #readonly_box {
                background: #b4b4b4;
            }
            .upload_receive_section .content {
                flex-direction: column;
                .upload_wrap {
                    margin-top: 10px;
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
                .fixed_info:nth-child(5) {
                    border-top: unset;
                }
                .fixed_info:nth-child(3),
                .fixed_info:nth-child(5) {
                    border-bottom: 1px solid black;
                }
                .third_content {
                    .list {
                        border: 1px solid black;
                        button {
                            @include delete_button;
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
                        border-bottom: 1px solid black;
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
                .input-group-prepend {
                    color: white;
                    font-weight: 700;
                    font-size: 20px;
                    width: 120px;
                    text-align: end;
                }
            }
            .button_wrap {
                display: flex;
                justify-content: space-between;
                margin: 30px auto 5%;
                width: 220px;
                button {
                    &:nth-child(1) {
                        @include back_to_previous_btn;
                        &:hover {
                            background-color: #5d85bb;
                        }
                    }
                }
                .send_btn {
                    @include search_and_send_btn;
                    &:hover {
                        background-color: #5e7aa2;
                    }
                }
                .send_btn_disabled {
                    background: #878787;
                    &:hover {
                        background: #878787;
                    }
                }
            }
        }
    }
</style>