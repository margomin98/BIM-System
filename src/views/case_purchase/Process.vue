<template>
    <Navbar />
    <validate_modal :modal_id="'auth_modal'" :user="user"></validate_modal>
    <confirm_modal :id="'ConfirmModal'" @confirm="submit(true)" :text="warningText" />
    <div class="modal fade" data-bs-backdrop="static" id="propertymodal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="fixed_item_info mb-5">
                        <!-- 採購項目 -->
                        <div class='col'>
                            <p>採購項目</p>
                            <input type="text" class="form-control text-center readonly_box" readonly
                                v-model="tempParams.ItemName" />
                        </div>
                        <!-- 規格需求 -->
                        <div class='col'>
                            <p>規格需求</p>
                            <input type="text" class="form-control text-center readonly_box" readonly
                                v-model="tempParams.RequiredSpec" />
                        </div>
                        <!-- 已沖/待沖數量 -->
                        <div class='col'>
                            <p>已沖/待沖數量</p>
                            <p class="form-control text-center readonly_box" style="color: black;">{{ tempCombine }}</p>
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
                                <select class="form-select" v-model="searchParams.EquipType_Id"
                                    @change="async () => { DropdownArray.EquipCategory = await apiStore.getEquipCategory(searchParams.EquipType_Id); searchParams.Category_Id = ''; }">
                                    <option value="">--請選擇--</option>
                                    <option v-for="option in DropdownArray.EquipType" :value="option.Id">{{ option.Name }}
                                    </option>
                                </select>
                            </div>
                            <!-- 設備分類 -->
                            <div class='col'>
                                <p>設備分類</p>
                                <select class="form-select" v-model="searchParams.Category_Id">
                                    <option v-if="DropdownArray.EquipCategory.length == 0" value="">--請先選擇設備總類--</option>
                                    <template v-else>
                                        <option value="">--請選擇--</option>
                                        <option v-for="option in DropdownArray.EquipCategory" :value="option.Id">{{
                                            option.Name }}</option>
                                    </template>
                                </select>
                            </div>
                            <!-- 儲位區域 -->
                            <div class='col'>
                                <p>儲位區域</p>
                                <select class="form-select" v-model="searchParams.Area_Id"
                                    @change="async () => { DropdownArray.Layer = await apiStore.getLayer(searchParams.Area_Id); searchParams.Layer_Id = ''; }">
                                    <option value="">--請選擇--</option>
                                    <option v-for="option in DropdownArray.Area" :value="option.Id">{{ option.Name }}
                                    </option>
                                </select>
                            </div>
                            <!-- 儲位櫃位 -->
                            <div class='col'>
                                <p>儲位櫃位</p>
                                <select class="form-select" v-model="searchParams.Layer_Id">
                                    <option v-if="DropdownArray.Layer.length == 0" value="">--請先選擇儲位區域--</option>
                                    <template v-else>
                                        <option value="">--請選擇--</option>
                                        <option v-for="option in DropdownArray.Layer" :value="option.Id">{{ option.Name }}
                                        </option>
                                    </template>
                                </select>
                            </div>
                            <!-- 專案代碼 -->
                            <div class='col'>
                                <p>專案代碼</p>
                                <multiselect v-model="searchParams.ProjectSelect" :allow-empty="false"
                                    @select="onProjectSelect" :options="DropdownArray.ProjectCode" :max-height="300"
                                    placeholder="請選擇" label="Text" :showLabels="false" track-by="Text"></multiselect>
                            </div>
                            <!-- 資產編號 -->
                            <div class='col'>
                                <p>資產編號</p>
                                <input type="text" class="form-control text-center" placeholder="BFXXXXXXXX"
                                    v-model="searchParams.AssetsId" />
                            </div>
                            <!-- 物品名稱 -->
                            <div class='col'>
                                <p>物品名稱</p>
                                <input type="text" class="form-control text-center" placeholder="最多輸入20字"
                                    v-model="searchParams.AssetName" />
                            </div>
                        </div>
                        <div class='col d-flex justify-content-center'>
                            <button class="btn submit_btn" type="button" @click="searchInventory('', 'search')">搜尋</button>
                            <button class="btn submit_btn" style="margin-left: 0.5rem;" type="button"
                                @click="clear">清空</button>
                            <!-- <button class="btn add_btn" style="margin-left: 0.5rem;" type="button" data-bs-dismiss="modal" @click="addList">加入</button> -->
                        </div>
                    </div>
                </div>
                <div class="fixed_info">
                    <div>
                        <p>目前資產庫存（請優先選擇存貨）</p>
                    </div>
                </div>
                <DataTable :key="datagrid.key" lazy :first="datagrid.first" :size="'small'" :loading="datagrid.loading"
                    :value="rowData" :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns
                    columnResizeMode="expand" showGridlines scrollable scrollHeight="510px"
                    @page="searchInventory($event, 'page')" @sort="searchInventory($event, 'sort')"
                    v-model:selection="datagrid.selectedList" paginator :rows="10" :totalRecords="datagrid.totalRecords"
                    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                    <Column style="min-width: 60px;">
                        <template #body="slotProps">
                            <asset-view-btn :params="slotProps" />
                        </template>
                    </Column>
                    <Column style="min-width: 60px" header="選擇">
                        <template #body="slotProps">
                            <case_purchase_add_btn :params="slotProps" @add-material="addToList" />
                        </template>
                    </Column>
                    <Column style="min-width: 80px" header="數量">
                        <template #body="slotProps">
                            <Storage_number :params="slotProps" />
                        </template>
                    </Column>
                    <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable
                        :style="{ 'min-width': item.width }"></Column>
                </DataTable>
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
                        <textarea style="height: 150px;" class="form-control readonly_box" readonly
                            v-model="Form.Description"></textarea>
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
        <div class="info_wrap my-5">
            <div class="purchase_list" role="region" tabindex="0">
                <div class="fixed_info">
                    <div>
                        <p>待沖銷清單</p>
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
                            <tr v-for="(item, index) in itemData" :key="item.PI_ID">
                                <td class="table_content"><button class="writeoff_btn" data-bs-toggle="modal"
                                        data-bs-target="#propertymodal" @click="updateSearchingModal(index)">沖銷</button>
                                </td>
                                <td class="table_content">
                                    <div class="item_number_wrap">
                                        <div v-for="(asset, assetIndex) in item.AssetList" class="item_number"><img src="@/assets/delete.png" @click="deleteFromList(index, assetIndex)"><span>{{ asset.AssetsId}}&nbsp;&nbsp;&nbsp;&nbsp;*{{asset.Number}}</span></div>
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
                            <input type="text" class="form-control readonly_box" readonly v-model="user.resultName" />
                            <span class="icon-container">
                                <img src="@/assets/accept.png" class="checkmark-icon" v-show="user.isValidate" />
                            </span>
                            <button class="auth_btn" data-bs-toggle="modal" data-bs-target="#auth_modal">驗證</button>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">完成沖銷日期：</div>
                            <input type="text" class="form-control readonly_box" readonly v-model="utilsStore.today" />
                        </div>
                    </div>
                </div>
                <!-- 説明 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> 沖銷備註：</div>
                        <textarea style="height: 150px;" class="form-control" placeholder="最多輸入100字"
                            v-model="Form.WriteoffMemo"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="col button_wrap">
            <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
            <button class="save_btn" @click="submit(false)">暫存</button>
            <button class="send_btn" :class="{ 'send_btn_disabled': !user.isValidate }" data-bs-toggle="modal"
                data-bs-target="#ConfirmModal" :disabled="!user.isValidate">完成</button>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AssetViewBtn from '@/components/utils/asset_view_btn.vue'
import case_purchase_add_btn from '@/components/case_purchase_page/case_purchase_add_btn.vue'
import Storage_number from "@/components/Storage_number_input"
import confirm_modal from '@/components/utils/confirm_modal.vue'
import validate_modal from '@/components/utils/validate_modal.vue';
import Multiselect from 'vue-multiselect';
import { usePurchaseStore } from '@/store/purchase/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { onMounted, onUnmounted, reactive, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { CasePurchase_Process } from '@/assets/js/enter_status'
import axios from 'axios';
import router from '@/router';
import { createDadagridObject } from '@/assets/js/common_fn';
const purchaseStore = usePurchaseStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
// 解構
const { Form, DropdownArray } = storeToRefs(purchaseStore);

const route = useRoute();
const PP_ID = route.query.search_id;
// datagrid 參數
const datagrid = reactive(createDadagridObject(''));
const rowData = ref([]);
const datagridfield = [
    { field: "OM_Unit", width: '100px', header: "單位" },
    { field: "AssetType", width: '60', header: "類型" },
    { field: "AssetsId", width: '150px', header: "資產編號" },
    { field: "AssetName", width: '150px', header: "物品名稱" },
    { field: "ProductType", width: '150px', header: "型號" },
    { field: "ProductSpec", width: '150px', header: "規格" },
    { field: "VendorName", width: '150px', header: "廠商" },
    { field: "AreaName", width: '150px', header: "儲位區域" },
    { field: "LayerName", width: '150px', header: "儲位櫃位" }
]
const warningText = "按下確認後將無法再次變更，請確認待沖銷清單是否沖銷正確";


const itemData = ref([]);
const testData = ref([
    {
        "PI_ID": "PP24020005_01",
        "ItemName": "iphone 15",
        "AssetList": [
            {AssetsId: 'BF12345678' , Number: 1, Deletable: true},
            {AssetsId: 'BF98765321' , Number: 1, Deletable: true},
            {AssetsId: 'BF65417891' , Number: 1, Deletable: true},
            {AssetsId: 'BF98741235' , Number: 1, Deletable: true},
            {AssetsId: 'BF00001234' , Number: 1, Deletable: true}
        ],
        "Number": 5,
        "RequiredSpec": "玫瑰金"
    },
    {
        "PI_ID": "PP24020005_02",
        "ItemName": "行動充電器",
        "AssetList": [
            {AssetsId: 'BF56781234' , Number: 1, Deletable: true},
            {AssetsId: 'BF98765123' , Number: 1, Deletable: true}
        ],
        "Number": 2,
        "RequiredSpec": "小台的，至少20000mAh"
    },
    {
        "PI_ID": "PP24020005_03",
        "ItemName": "TypeC線",
        "AssetList": [
            {AssetsId: 'BF12345876' , Number: 2, Deletable: true},
            {AssetsId: 'BF98765231' , Number: 1, Deletable: true},
            {AssetsId: 'BF65417198' , Number: 2, Deletable: true},
            {AssetsId: 'BF00004321' , Number: 3, Deletable: true}
        ],
        "Number": 8,
        "RequiredSpec": "2米長"
    }
])
// 驗證資訊
const user = reactive({
    title: '沖銷人員',
    userName: '',
    userPassword: '',
    resultName: '未驗證',
    isValidate: false,
    id: 'PP_Writeoff',
});
// 檢索上方顯示欄位
const tempParams = reactive({
    ItemName: '', // 採購項目
    Number: 0, // 所需數量
    SelectedNumber: 0, // 已選數量
    RequiredSpec: '', // 規格需求
    index: 0, // 採購清單index
})
// 檢索欄位
const searchParams = reactive({
    EquipType_Id: '',
    Category_Id: '',
    Area_Id: '',
    Layer_Id: '',
    ProjectCode: '',
    ProjectSelect: { Text: '--請選擇--', Value: '' },
    AssetsId: '',
    AssetName: '',
    AssetList: [],
})
// 檢索上方顯示欄位之一
const tempCombine = computed(() => {
    return `${tempParams.SelectedNumber}/${tempParams.Number}`
})
onMounted(async () => {
    purchaseStore.$reset();
    await purchaseStore.getDetails(PP_ID, CasePurchase_Process);
    itemData.value = [...Form.value.NotOrdered,...Form.value.Ordered];
    DropdownArray.value.ProjectCode = await apiStore.getFuzzyProject();
    DropdownArray.value.EquipType = await apiStore.getEquipType();
    DropdownArray.value.Area = await apiStore.getArea();
    updateSelectedNumber();

});
onUnmounted(() => {
    purchaseStore.$dispose();
    utilsStore.$dispose();
})

const submit = async (isDone) => {
    // 檢查字數上限
    const regexPattern = new RegExp(`^[\\s\\S]{0,100}$`);
    if (!regexPattern.test(Form.value.WriteoffMemo)) {
        alert(`沖銷備註不可輸入超過100字`);
        return
    }
    // 完成要檢查是否全部沖銷完畢
    if (isDone) {
        for (let i = 0; i < itemData.value.length; i++) {
            let total = 0;
            itemData.value[i].AssetList.forEach(item =>{
                total += item.Number;
            })
            if (total !== itemData.value[i].Number) {
                console.log(`${total}/${itemData.value[i].Number}`);
                alert('請先將所有項目沖銷完畢');
                return
            }
        }
    }
    let requestData = {
        PP_ID: PP_ID,
        WriteoffPerson: user.resultName,
        Memo: Form.value.WriteoffMemo,
        WriteoffAssets: itemData.value,
        Done: isDone
    }
    if (!isDone) {
        delete requestData.WriteoffPerson;
    }
    console.log('requestData', requestData);
    try {
        const response = await axios.post('http://192.168.0.177:7008/PurchasingMng/ItemsWriteOff', requestData);
        const data = response.data;
        if (data.state === 'success') {
            alert(data.messages + '\n' + data.resultList.PP_ID);
            if (isDone) {
                router.push({ name: 'Case_Purchase_Datagrid' });
            } else {
                window.location.reload();
            }
        } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
        } else {
            alert(data.messages);
        }
    } catch (e) {
        console.error(e);
    }
}
// 清空檢索欄位(不包含已選項目)
const clear = () => {
    utilsStore.clearSearchParams(searchParams);
    searchParams.ProjectSelect = { Text: '--請選擇--', Value: '' };
    DropdownArray.value.EquipCategory = [];
    DropdownArray.value.Layer = [];
    searchInventory('', 'search');
}
const onProjectSelect = (option) => {
    searchParams.ProjectCode = option.Value;
}
// 點擊"沖銷"時將項目資訊帶入檢索上方(以及index =>用於新增項目時)
const updateSearchingModal = (index) => {
    updateSelectedNumber();
    updateSelectedList();
    tempParams.ItemName = itemData.value[index].ItemName
    tempParams.Number = itemData.value[index].Number
    tempParams.SelectedNumber = itemData.value[index].SelectedNumber
    tempParams.RequiredSpec = itemData.value[index].RequiredSpec
    tempParams.index = index
    searchInventory('', 'search');
}
// 更新各採購項目的已沖數量
const updateSelectedNumber = () => {
    itemData.value.forEach(item => {
        const total = item.AssetList.reduce((total,asset)=> total + asset.Number,0);
        item.SelectedNumber = total;
    })
}
// 更新搜尋時的AssetList清單
const updateSelectedList = () => {
    searchParams.AssetList = [];
    itemData.value.forEach((item)=>{
        item.AssetList.forEach((asset)=>{
            searchParams.AssetList.push(asset);
        })
    })
}
// 搜尋
const searchInventory = async (event, type) => {
    //檢查字數
    const regexPattern = new RegExp(`^[\\s\\S]{0,20}$`);
    if (!regexPattern.test(searchParams.AssetName)) {
        alert(`物品名稱不可輸入超過20字`);
        return
    }
    try {
        const form = new FormData();
        // 將表格資料 append 到 form
        for (const key in searchParams) {
            if (searchParams[key] && key !== 'AssetList') {
                form.append(key, searchParams[key]);
            }
        }
        // console.log('ItemList',searchParams.AssetList);
        form.append('PP_ID', PP_ID);
        form.append('ItemList', JSON.stringify(searchParams.AssetList));
        utilsStore.UpdatePageParameter(datagrid, event, type, form);
        const resultList = await apiStore.getMngDatagrid('/PurchasingMng/SearchInventory', datagrid, form);
        rowData.value = resultList.rows.map(item => ({
            ...item,
            selectNumber: item.OM_Number,
        }));
        datagrid.totalRecords = resultList.total;
        datagrid.key++;
    } catch (e) {
        console.error(e);
    }
}
// 刪除已沖項目
const deleteFromList = (index, itemIndex) => {
    if(itemData.value[index].AssetList[itemIndex].Deletable) {
        itemData.value[index].AssetList.splice(itemIndex,1);
        updateSelectedNumber()
    } else {
        alert('此資產已被本專案出庫使用，因此無法移除');
    }
}
const addToList = (data) => {
    if (tempParams.SelectedNumber + data.selectNumber > tempParams.Number) {
        alert('所選數量超過沖銷所需數量');
        return
    }
    const index = tempParams.index;
    let exist = false;
    itemData.value[index].AssetList.forEach(item=>{
        if(item.AssetsId === data.AssetsId) {
            item.Number += data.selectNumber ;
            exist = true;
        }
    })
    if(!exist) {
        itemData.value[index].AssetList.splice(0,0,{
            AssetsId: data.AssetsId,
            Number: data.selectNumber,
            Deletable: true
        })
    }
    updateSelectedNumber();
    tempParams.SelectedNumber = itemData.value[index].SelectedNumber
    updateSelectedList();
    searchInventory('', '');
}

</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";

.readonly_box {
    @include readonly_box;
}

.checkmark-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    transform: translateY(-50%);
}

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
                // width: min-content;
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

    .checkmark-icon {
        top: 10%;
        left: 74%;
        transform: translateY(-50%);

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

    .checkmark-icon {
        top: 10%;
        left: 69%;

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
            height: unset !important;
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

    .checkmark-icon {
        top: 30%;
        left: 96%;
    }

}</style>