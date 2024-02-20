<template>
    <Navbar />
    <validate_modal :modal_id="'auth_modal'" :user="user"></validate_modal>

    <div class="main_section">
        <div class="title col">
            <h1>下訂作業</h1>
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
                <!-- 專案代碼 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 專案代碼：</div>
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.ProjectCode"/>
                    </div>
                </div>
                <!-- 專案名稱 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 專案名稱：</div>
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.ProjectName"/>
                    </div>
                </div>
                <!-- 説明 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 説明：</div>
                        <textarea style="height: 150px;" class="form-control readonly_box" readonly v-model="Form.Description"></textarea>
                    </div>
                </div>
                <!-- 交貨期限 -->
                <div class="row expire_date_wrap">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                交貨期限：
                            </div>
                            <input type="date" class="form-control readonly_box" readonly v-model="Form.Deadline">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info_wrap mt-5">
            <div class="purchase_list" role="region" tabindex="0">
                <div class="fixed_info">
                    <div>
                        <p>未新增訂購單項目</p>
                    </div>
                </div>
                <div class="purchase_table">
                    <table>
                        <thead>
                            <tr>
                                <th class="check_col"><span>勾選<br>下訂</span></th>
                                  <th class="item_col"><span>採購項目</span></th>
                                <th class="amount_col"><span>數量</span></th>
                                <th><span>規格需求</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item , index) in Form.NotOrdered" :key="item.PI_ID">
                                <td><input class="form-check-input order_check" type="checkbox" value="true" v-model="NotOrderedList[index]"></td>
                                <td class="table_content">{{item.ItemName}}</td>
                                <td class="table_content">{{item.Number}}</td>
                                <td class="table_content">{{ item.RequiredSpec}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="purchase_list_note">
                <p>*可勾選多個採購項目後，合併新增訂單</p>
            </div>
            <div class="add_btn">
                <button @click="submitOrder('NotOrdered')">新增訂單</button>
            </div>
        </div>
        <div class="info_wrap mb-5">
            <div class="purchase_list" role="region" tabindex="0">
                <div class="fixed_info">
                    <div>
                        <p>已新增訂購單項目</p>
                    </div>
                </div>
                <div class="purchase_table">
                    <table>
                        <thead>
                            <tr>
                                <th class="check_col"><span>取消<br>下訂</span></th>
                                <th class="item_col"><span>採購項目</span></th>
                                <th class="amount_col"><span>數量</span></th>
                                <th><span>規格需求</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item , index) in Form.Ordered" :key="item.PI_ID">
                                <td>
                                    <input class="form-check-input order_check" type="checkbox" value="true" v-model="OrderedList[index]">
                                </td>
                                  <td class="table_content">{{item.ItemName}}</td>
                                <td class="table_content">{{item.Number}}</td>
                                <td class="table_content">{{ item.RequiredSpec}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="purchase_list_note cancel_note_wrap d-flex">
                <p>*可勾選多個採購項目後，取消項目</p>
                <button class="cancel_order_btn" @click="submitOrder('Ordered')">取消訂購</button>
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
                            <input type="text" class="form-control readonly_box" readonly v-model="user.resultName"/>
                            <span class="icon-container">
                                <img src="@/assets/accept.png" class="checkmark-icon" v-show="user.isValidate" />
                            </span>
                            <button class="auth_btn" data-bs-toggle="modal" data-bs-target="#auth_modal">驗證</button>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">完成採購日期：</div>
                            <input type="text" class="form-control readonly_box" readonly v-model="utilsStore.today"/>
                        </div>
                    </div>
                </div>
                <!-- 説明 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 説明：</div>
                        <textarea style="height: 150px;" class="form-control" placeholder="最多輸入100字" v-model="Form.PurchaseMemo"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="col button_wrap">
            <button class="back_btn" @click="goBack">回上一頁</button>
            <!-- <button class="save_btn" @click="temp">暫存</button> -->
            <button class="send_btn" :class="{'send_btn_disabled': !user.isValidate}" @click="submit" :disabled="!user.isValidate">完成</button>
        </div>
    </div>
</template>
<script setup>
import Navbar from '@/components/Navbar.vue';
import validate_modal from '@/components/utils/validate_modal.vue';
import { usePurchaseStore } from '@/store/purchase/_index'
import { useUtilsStore } from '@/store';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { CasePurchase_Order } from '@/assets/js/enter_status'
import axios from 'axios';
import router from '@/router';
const purchaseStore = usePurchaseStore();
const utilsStore = useUtilsStore();
// 解構
const { Form } = storeToRefs(purchaseStore) ;

const route = useRoute();
const PP_ID = route.query.search_id;

const user = reactive({
    title: '採購人員',
    userName: '',
    userPassword: '',
    resultName: '未驗證',
    isValidate: false,
    id: 'PP_Order',
});
const NotOrderedList = ref([]);
const OrderedList = ref([]);
const submitOrder = async (type) => {
    let array = [];
    let url = '';
    switch (type) {
        case 'NotOrdered':
            url='/OrderForRequisitionItems'
            for(let i=0 ; i<Form.value.NotOrdered.length; i++) {
                if(NotOrderedList.value[i]) {
                    array.push(Form.value.NotOrdered[i].PI_ID);
                }
            }
            break;
        case 'Ordered':
            url='/CancelForRequisitionItems'
            for(let i=0 ; i<Form.value.Ordered.length; i++) {
                if(OrderedList.value[i]) {
                    array.push(Form.value.Ordered[i].PI_ID);
                }
            }
            break;
    }
    if(array.length === 0 ) {
        alert('請至少勾選一項項目');
        return
    }
    // 下訂API
    const form = new FormData ;
    for(const item of array) {
        // console.log(item);
        form.append('RequisitionItems', item);
    }
    try {
        const response = await axios.post('http://192.168.0.177:7008/PurchasingMng'+ url, form);
        const data = response.data;
        if(data.state === 'success') {
            // 成功reset & refresh表格
            await purchaseStore.getDetails(PP_ID, CasePurchase_Order);
            switch (type) {
                case 'NotOrdered':
                    alert(data.messages+'\n'+data.resultList.PO_ID);
                    NotOrderedList.value = Array(Form.value.NotOrdered.length).fill(false);
                    break;
                case 'Ordered':
                    alert(data.messages);
                    OrderedList.value = Array(Form.value.Ordered.length).fill(false);
                    break;
            }
        } else if(data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
        } else {
            alert(data.messages);
        }
    } catch (e) {
        console.error(e);
    }
}
const submit = async() =>{
    // 檢查字數上限
    if(!utilsStore.checkMaxLetter(Form.value,purchaseStore.FormLetterCheckList)) return;
    const form = new FormData;
    form.append('PP_ID',PP_ID);
    form.append('PurchasePerson', user.resultName);
    form.append('Memo', Form.value.PurchaseMemo);
    try {
        const response = await axios.post('http://192.168.0.177:7008/PurchasingMng/PurchaseConfirmed',form);
        const data = response.data;
        if(data.state === 'success') {
            alert(data.messages+'\n'+data.resultList.PP_ID);
            router.push({name: 'Case_Purchase_Datagrid'});
        } else if(data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
        } else {
            alert(data.messages);
        }
    } catch (e) {
        console.error(e);
    }
}
onMounted(async() => {
  purchaseStore.$reset();
  await purchaseStore.getDetails(PP_ID, CasePurchase_Order);
  NotOrderedList.value = Array(Form.value.NotOrdered.length).fill(false);
  OrderedList.value = Array(Form.value.Ordered.length).fill(false);
});
onUnmounted(()=>{
  purchaseStore.$dispose();
  utilsStore.$dispose();
})
</script>

<style lang="scss" scoped>
    @import "@/assets/css/global.scss";
    .checkmark-icon {
        position: absolute;
        top: 10%;
        left: 74%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
    }
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
            background: white;
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
        .cancel_note_wrap{
            padding:10px;
            align-items: center;
                    .cancel_order_btn{
                background: #87AADD;
                border-radius: 10px;
                height: 35px;
                color: white;
                font-weight: 700;
                padding:0 25px;
                border: none;
                &:hover{
                    background-color: #6d8fc1;
                }
            }
        }
    }
    .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        gap: 20px;
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
    .send_btn_disabled {
        background: #878787;

        &:hover {
            background: #878787;
        }
    }
    .save_btn {
        @include save_btn;
        &:hover {
            background-color: #5e7aa2;
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
                   
                } .cancel_note_wrap{
            justify-content: space-between;
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
                  
                }  .cancel_note_wrap{
            justify-content: space-between;
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
                    
                }.cancel_note_wrap{
                    gap:10px 0;
flex-direction: column;
                    }
            }
        }
    }
</style>