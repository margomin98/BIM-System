<template>
  <Navbar />
  <!-- Modal視窗 -->
  <div class="modal fade" data-bs-backdrop="static" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="fixed_info">
            <div>
              <p>檢索資產</p>
            </div>
            <button type="button" class="close" data-bs-dismiss="modal">x</button>
          </div>
          <div class="second_content">
            <div class="wrap1">
              <div class="col">
                <p class="search_label">設備總類</p>
                <div class="dropdown">
                  <select class="form-select" v-model="searchParams.EquipType_Id" @change="async()=>{DropdownArray.EquipCategory = await apiStore.getEquipCategory(searchParams.EquipType_Id); searchParams.Category_Id = '';}">
                    <option value="">--請選擇--</option>
                    <option v-for="option in DropdownArray.EquipType" :key="option.Id" :value="option.Id">{{ option.Name }}</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <p class="search_label">設備分類</p>
                <div class="dropdown">
                  <select class="form-select" v-model="searchParams.Category_Id">
                    <option v-if="DropdownArray.EquipCategory.length == 0" value="">--請先選擇設備總類--</option>
                    <template v-else>
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.EquipCategory" :key="option.Id" :value="option.Id">{{ option.Name }}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col">
                <p class="search_label">物品名稱</p>
                <div class="number-input-box">
                  <input class="form-control" type="text" v-model="searchParams.ProductName" :placeholder="searchPlaceholder"/>
                </div>
              </div>
              <div class="col">
                <p class="search_label">資產編號</p>
                <div class="number-input-box">
                  <input class="form-control" type="text" v-model="searchParams.AssetsId" placeholder="BFXXXXXXXX"/>
                </div>
              </div>
              <div class="col">
                <p class="search_label">
                  已選/所需 數量
                  <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘"/>
                </p>
                <div class="number-input-box">
                  <input class="input-number readonly_box" readonly :value="searchParams.selectedNumber + ' / ' + searchParams.Number">
                </div>
              </div>
            </div>
            <div class="row g-0">
              <div class="col-12 d-flex wrap2">
                <label for="inputTextarea" class="form-label">
                  <p class="search_label">規格需求：</p>
                </label>
                <textarea class="form-control readonly_box" id="inputTextarea" rows="3" v-model="searchParams.RequiredSpec" readonly></textarea>
              </div>
            </div>
            <div class="col d-flex justify-content-center">
              <button class="btn submit_btn" type="button" @click="searchInventory('', 'search');">搜尋庫存</button>
            </div>
          </div>
          <div class="fixed_info">
            <div>
              <p>目前資產庫存（請優先選擇存貨）</p>
            </div>
          </div>
          <DataTable lazy :key="datagrid3.key" :first="datagrid3.first" :size="'small'" :loading="datagrid3.loading"
            :value="rowData3" :sort-field="datagrid3.sortField" :sort-order="datagrid3.sortOrder" resizableColumns
            columnResizeMode="expand" showGridlines scrollable scrollHeight="420px"
            @page="searchInventory($event, 'page')" @sort="searchInventory($event, 'sort')" paginator
            :rows="datagrid3.rows" :totalRecords="datagrid3.totalRecords"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 60px">
              <template #body="slotProps">
                <AssetsView :params="slotProps" />
              </template>
            </Column>
            <Column style="min-width: 60px" header="選擇">
              <template #body="slotProps">
                <Rent_process_add_button :params="slotProps" :selectedNumber="searchParams.selectedNumber" :Number="searchParams.Number" @SubtractFromInventory="SubtractFromInventory" />
              </template>
            </Column>
            <Column style="min-width: 90px" header="數量">
              <template #body="slotProps">
                <Storage_number :params="slotProps" />
              </template>
            </Column>
            <Column v-for="item in datagrid3field" :key="item.field" :field="item.field" :header="item.header" sortable
              :style="{ 'min-width': item.width }"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <div class="main_section">
    <div class="title col">
      <h1>出庫備料作業</h1>
    </div>
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
              <div class="content">
                <div class="form-check" v-for="(option, index) in useOptions" :key="index">
                  <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)"
                    v-model="Form.Use" :disabled="option !== Form.Use && Form.Use !== ''" />
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
              <p class="readonly_box" readonly>{{ Form.ProjectCode }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name" id="project_name">
              <p>專案名稱</p>
            </label>
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ Form.ProjectName }}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label">
              <p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p>
            </label>
            <div class="input-group" id="readonly_box">
              <textarea class="form-control readonly_box" readonly v-model="Form.Description"></textarea>
            </div>
          </div>
        </div>
      </form>
      <div class="second_content">
        <div class="fixed_info">
          <div>
            <p>資產出庫項目</p>
          </div>
        </div>
        <DataTable :size="'small'" :value="Form.ItemList" resizableColumns columnResizeMode="expand" showGridlines scrollable
          scroll-height="600px">
          <Column>
            <template #body="slotProps">
              <Storage_button :params="slotProps" @searchList="searchList" />
            </template>
          </Column>
          <Column v-for="item in ItemList_field" :key="item.field" :field="item.field" :header="item.header" sortable
            :style="{ 'min-width': item.width }"></Column>
        </DataTable>
      </div>
      <div class="third_content">
        <div class="fixed_info">
          <div>
            <p>資產出庫細項</p>
          </div>
        </div>
        <DataTable :size="'small'" :value="Form.OM_List" resizableColumns columnResizeMode="expand" showGridlines scrollable
          scroll-height="600px">
          <Column>
            <template #body="slotProps">
              <Delete :params="slotProps" @deleteMaterial="deleteMaterial" />
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <AssetsView :params="slotProps" />
            </template>
          </Column>
          <Column v-for="item in OMList_field" :key="item.field" :field="item.field" :header="item.header" :sortable="item.sortable"
            :style="{ 'min-width': item.width }"></Column>
        </DataTable>
      </div>
      <div class="fixed_info_count">
        <div>
          <p>總出庫數量：{{ totalNeed }}個</p>
        </div>
        <div>
          <p>已備數量：{{ totalSelect }}個</p>
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
            <label for="inputWithButton" class="form-label">
              <p>備料人員</p>
            </label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box" id="inputWithButton" readonly v-model="utilsStore.userName" />
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>備料完成日期</p>
            </label>
            <div class="input-group">
              <input type="text" class="form-control readonly_box" id="inputWithTitle" readonly v-model="utilsStore.today" />
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name">
              <p>備料備註</p>
            </label>
            <div class="input-group">
              <textarea placeholder="最多輸入100字" class="form-control" id="inputTextarea" style="height: 100%" rows="1" v-model="PrepareMemo"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="send_btn" data-bs-toggle="modal" data-bs-target="#confirmModal">送出</button>
    </div>
    <!-- Modal -->
    <confirm_modal :id="'confirmModal'" :text="warningText" @confirm="submit"></confirm_modal>
  </div>
</template>

<script setup>
import AssetsView from '@/components/Rent_process_new_view_button'
import Storage_button from "@/components/Storage_button";
import Rent_process_add_button from "@/components/rent_process_page/Rent_process_add_button";
import Storage_number from "@/components/Storage_number_input"
import Delete from "@/components/Rent_proccess_new_delete_button";
import Navbar from "@/components/Navbar.vue";
import confirm_modal from '@/components/utils/confirm_modal.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {
  Rent_UseArray
} from "@/assets/js/dropdown";
import { useRentStore } from '@/store/rent/_index';
import { useAPIStore, useUtilsStore } from '@/store';
import { storeToRefs } from 'pinia';
import {
  createDatagrid,
  UpdatePageParameter,
} from "@/assets/js/common_fn";
import {
  onMounted,
  ref,
  reactive,
  onUnmounted
} from "vue";
import {
  useRoute,
  useRouter
} from "vue-router";
import {
  RentProcess_New_Status
} from "@/assets/js/enter_status";
import axios from 'axios';
const rentStore = useRentStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const route = useRoute();
const router = useRouter();
const AO_ID = route.query.search_id;
const useOptions = ref(Rent_UseArray);
const selectedNumberArray = ref([]); //紀錄不同項目已選數量array
const totalNeed = ref(0); //總所需數量
const totalSelect = ref(0); //總已備數量
const PrepareMemo = ref('');
const { Form, DropdownArray, ItemList_field, OMList_field } = storeToRefs(rentStore);
const searchParams = reactive({
  // 查詢條件
  EquipType_Id: '',
  Category_Id: '',
  ProductName: '',
  ProjectCode: '',
  AssetsId: '',
  // 顯示
  RequiredSpec: '', // 規格需求
  Number: 1, // 所需數量(各別)
  selectedNumber: 0, // 已選數量(各別)
  // 加入rowData3
  id: 1, //前端紀錄各項目已備數量
  item_id: '', //出庫需求的item_id(後端項目id)
});
const searchPlaceholder = ref('');
const warningText = ref('按下確認後將無法再次進行備料作業，請確認資產出庫細項是否備料正確');
// 檢索datagrid
const datagrid3 = createDatagrid();
const datagrid3field = [{
  field: "OM_Unit",
  width: '100px',
  header: "單位"
},
{
  field: "AssetType",
  width: '100px',
  header: "類型"
},
{
  field: "AssetsId",
  width: '150px',
  header: "資產編號"
},
{
  field: "AssetName",
  width: '150px',
  header: "物品名稱"
},
{
  field: "ProductType",
  width: '150px',
  header: "型號"
},
{
  field: "ProductSpec",
  width: '150px',
  header: "規格"
},
{
  field: "VendorName",
  width: '150px',
  header: "廠商"
},
{
  field: "AreaName",
  width: '150px',
  header: "儲位區域"
},
{
  field: "LayerName",
  width: '150px',
  header: "儲位櫃位"
},
]
const rowData3 = ref([]);
onMounted(async() => {
  rentStore.$reset();
  await rentStore.getDetails(AO_ID, RentProcess_New_Status);
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  setData();
  datagrid3.sortField = '';
});
onUnmounted(()=>{
  rentStore.$dispose();
  apiStore.$dispose();
})
/**
 * 拿到資料單後，做一些變數處理
 */
function setData() {
  // 1. 已選數量
  // 初始化已選數量Array (從1開始，因為對照的OM_List_id為從1開始)
  for(let i = 1 ; i <= Form.value.ItemList.length; i++) {
    selectedNumberArray.value[i] = 0;
  }
  // 遍歷OM_list(出庫細項) 將已選數量疊加上去
  Form.value.OM_List.forEach(item => {
    selectedNumberArray.value[item.OM_List_id] += item.OM_Number;
  })
  // 2. 已備數量 & 總出庫數量
  // 總出庫數量
  totalNeed.value = 0;
  Form.value.ItemList.forEach(item => {
    totalNeed.value += item.Number;
  });
  // 已備數量
  totalSelect.value = 0;
  selectedNumberArray.value.forEach(item => {
    totalSelect.value += item;
  });
}
/**
 * 檢索資產
 * @param {Event} event null || $event
 * @param {string} type 'sort', 'page', 'take', 'search', ''
 */
async function searchInventory(event, type) {
  const form = new FormData();
  form.append('EquipType_Id', searchParams.EquipType_Id);
  form.append('Category_Id', searchParams.Category_Id);
  form.append('ProductName', searchParams.ProductName);
  form.append('ProjectCode', searchParams.ProjectCode);
  form.append('AssetsId', searchParams.AssetsId);
  utilsStore.UpdatePageParameter(datagrid3, event, type, form);
  const resultList = await apiStore.getMngDatagrid('/AssetsOutMng/SearchInventory', datagrid3, form);
  datagrid3.totalRecords = resultList.total;
  rowData3.value = resultList.rows.map(item => ({
    ...item,
    selectNumber: item.OM_Number, // 選擇數量欲帶入數量上限
    item_id: searchParams.item_id,
    id: searchParams.id,
  }));
  datagrid3.key++;
}
/**
 * 送出備料作業
 */
async function submit() {
  if (PrepareMemo.value && !/^[\s\S]{1,100}$/.test(PrepareMemo.value)) {
    alert('備料備註不可輸入超過100字');
    return
  }
  if (Form.value.OM_List.length === 0) {
    alert('請至少出庫一個細項');
    return
  }
  const requestData = {
    AO_ID: AO_ID,
    PrepareMemo: PrepareMemo.value,
  };
  try {
    const response = await axios.post('http://192.168.0.117:7008/AssetsOutMng/MaterialPreparation', requestData);
    const data = response.data;
    if (data.state === 'success') {
      let msg = data.messages + '\n';
      msg += '單號為:' + data.resultList.AO_ID;
      alert(msg);
      router.push({
        name: 'Rent_Process_Datagrid'
      });
    } else if (data.state === 'error') {
      alert(data.messages);
    }
  } catch (error) {
    console.error(error);
  }
}
/**
 * 點選搜尋庫存，預帶入參數
 * @param {object} data 欲帶入的資料
 */
async function searchList(data) {
  for (const key in data) {
    searchParams[key] = data[key];
  }
  searchPlaceholder.value = searchParams.ProductName;
  searchParams.ProductName = '';
  DropdownArray.value.EquipCategory = await apiStore.getEquipCategory(searchParams.EquipType_Id);
  // 額外處理data沒有的參數
  searchParams.selectedNumber = selectedNumberArray.value[data.id]
  searchInventory('', 'search');
}
/**
 * 將資產加入出庫細項
 * @param {object} itemData 欲加入細項的物品資料
 */
async function SubtractFromInventory(itemData) {
  console.log('欲加入data',itemData);
  const requestData = {
    item_id: itemData.item_id,
    AssetsId: itemData.AssetsId,
    OM_Number: itemData.selectNumber,
    CI_ID: itemData.CI_ID // for 存貨耗材
  }
  try {
    const response = await axios.post('http://192.168.0.117:7008/AssetsOutMng/SubtractFromInventory', requestData);
    const data = response.data;
    if (data.state === 'success') {
      addMaterial(itemData);
    }
    else {
      alert(data.messages);
    }
  } catch (error) {
    console.error(error);
  }
}
/**
 * 更新已備數量並重新檢索(新增後)
 * @param {object} itemData 欲加入細項的物品資料
 */
async function addMaterial(itemData) {
  selectedNumberArray.value[itemData.id] += itemData.selectNumber
  searchParams.selectedNumber = selectedNumberArray.value[itemData.id]
  // searchInventory刷新庫存數量
  searchInventory('', 'search');
  // getDetail刷新 出庫項目&出庫細項
  await rentStore.getDetails(AO_ID);
  setData();
}
/**
 * 更新已備數量(刪除後)
 * @param {object} itemData 欲從細項刪除的物品資料
 */
async function deleteMaterial(itemData) {
  selectedNumberArray.value[itemData.id] -= itemData.selectNumber
  searchParams.selectedNumber = selectedNumberArray.value[itemData.id]
  await rentStore.getDetails(AO_ID);
  setData();
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.readonly_box {
  @include readonly_box;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
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
      padding: 20px 10px;
      border-bottom: 1px solid black;
    }

    .modal-footer {
      padding: 10px;
      gap: 5px;
      background: white;
      width: 100%;
      display: flex;
      justify-content: center;
      border-radius: 0;

      button:nth-child(1) {
        font-weight: 700;
        border: none;

        &:hover {
          background: #636260;
        }
      }

      button:nth-child(2) {
        background: #132238;
        font-weight: 700;
        border: none;

        &:hover {
          background: #426497;
        }
      }
    }
  }
}

.project_details #project_name,
.input-group {
  height: 100%;
}

.dropdown-toggle {
  padding: 5px 10px;
  height: 35px;
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;

  .back_btn {
    @include back_to_previous_btn;

    &:hover {
      background-color: #5d85bb;
    }
  }

  .send_btn {
    @include search_and_send_btn;

    &:hover {
      background-color: #5d85bd;
    }
  }
}

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
.dropdown {
  button {
    background: white;
    width: 100%;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dropdown-menu {
    p {
      font-size: 18px;
      color: black;
      font-weight: normal;

      &:hover {
        cursor: pointer;
      }
    }

    .dropdown-item {
      text-align: left;
    }
  }
}
.modal {
  padding: 0 5%;

  .modal-content {
    background-color: unset;
    border: 0;
  }

  .fixed_info {
    @include fixed_info;
    background: #528091;
    border-radius: 0;
    border: 1px solid black;
    border-bottom: unset !important;
    padding: 0 10px;

    div {
      flex-grow: 1;
      text-align: center;
    }

    p {
      margin-bottom: 0 !important;
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
    border-top: 1px solid black;
    background: #d9d9d9;

    .submit_btn {
      margin-bottom: 20px;
      background: #48658c;
      color: white;
      font-weight: 700;
      width: 100px;
      font-size: 18px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: #5d85bd;
      }
    }

    .wrap1,
    .wrap2 {
      padding: 10px 80px;

      div {
        p {
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

.main_section {
  .info_wrap {
    margin: auto;
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
        margin-bottom: 0;
        font-size:20px
      }
    }
    .second_content {
      background: #d9d9d9;

      .submit_btn {
        margin-bottom: 20px;
        background: #48658c;
        color: white;
        font-weight: 700;
        width: 100px;
        font-size: 18px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #5d85bd;
        }
      }

      .wrap1,
      .wrap2 {
        div {
          padding: 0 5px;

          p {
            text-align: center;
            white-space: nowrap;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 5px;
          }
        }
      }
    }
    .third_content {
      .fixed_info {
        border-top: unset;
      }

      .list {
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
      background: white;

      .fixed_info {
        border-top: none;
        border-left: none;
        border-bottom: 1px solid black;
      }

      .form-check {
        margin-left: 10px;
      }

      .form-label {
        font-weight: 700;
        font-size: 20px;
        white-space: nowrap;
        align-items: center;
        margin: 0;
        display: flex;
        justify-content: center;

        p {
          margin-bottom: 0;
          text-align: center;
        }
      }
    }
    form {
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;

      .row:nth-child(3) {
        p {
          justify-content: left;
          padding: 5px 10px 0;
          align-items: normal;
        }
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
        border-bottom: 1px solid black;
        align-items: center;

        .option {
          background-color: #b4b4b4;
          height: 100%;
          width: 100%;
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
}
@media only screen and (min-width: 1200px) {
  .modal {
    .confirm_modal .modal-content {
      width: 300px;
    }

    .fixed_info {
      p {
        font-size: 20px;
      }
    }

    .second_content {
      .wrap2 {
        display: flex;
        justify-content: space-evenly;
      }

      .wrap1,
      .wrap2 {
        padding: 10px 80px;

        .dropdown {
          .dropdown-menu {
            max-height: 250px;
            overflow-y: auto;
          }
        }
      }
      .wrap1 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 10px;
      }
    }
  }

  .main_section {
    .info_wrap {
      width: 1000px;


      #readonly_box {
        background-color: #b4b4b4;
        border-left: black 1px solid;
      }

      .second_content {
        background: #d9d9d9;

        .wrap1,
        .wrap2 {
          display: flex;
          justify-content: space-evenly;
          padding: 10px 80px;

          .dropdown {
            button {
              background: white;
              width: 100%;
              border: none;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .dropdown-menu {
              width: 225px;
              max-height: 250px;
              overflow-y: auto;

              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
              }
            }
          }

          div {
            padding: 0 5px;
          }
        }
      }

      .third_content {
        .list {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
        }
      }

      .fourth_content {
        border-bottom: 1px solid black;

        .fixed_info {
          border-right: 1px solid black;
        }

        .input-group {
          border-left: 1px solid black;
        }

        .form-control {
          height: auto;
          border-radius: 0;
          border-right: 1px solid black;
        }

        .wrap:nth-child(3) .input-group {
          border-right: 1px solid black;

          textarea {
            padding: 0 6px;
            border-bottom: 0;
            border-right: 0;
          }
        }

        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 150px;
        }
      }

      form {
        .form-control {
          padding: 5px;
        }

        .wrap {
          label.use {
            border-right: 1px solid black;
          }

          .option {
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
      }
    }
  }

  .modal .second_content .wrap1 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .modal {
    .confirm_modal .modal-content {
      width: 300px;
    }

    .fixed_info {
      p {
        font-size: 20px;
      }
    }

    .second_content {
      .wrap1,
      .wrap2 {
        display: flex;
        justify-content: space-evenly;
        padding: 10px 30px;
      }

      .wrap1 {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 10px 10px;
        grid-template-areas: ". ." ". .";

        .search_label {
          font-weight: 700;
        }
      }
    }
  }

  .main_section {
    .info_wrap {
      padding: 0 5%;

      .fixed_info {
        p {
          font-size: 20px;
        }
      }

      #readonly_box {
        background-color: #b4b4b4;
        border-left: black 1px solid;
      }

      .second_content {
        background: #d9d9d9;

        .wrap1,
        .wrap2 {
          display: flex;
          justify-content: space-evenly;
          padding: 10px 80px;

          .dropdown {
            .dropdown-menu {
              width: 225px;
              max-height: 250px;
              overflow-y: auto;

              p {
                font-size: 18px;
                color: black;
                font-weight: normal;
              }
            }
          }

          div {
            padding: 0 5px;
          }
        }
      }

      .third_content {
        .list {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
        }
      }

      .fourth_content {
        border-bottom: 1px solid black;

        .fixed_info {
          border-right: 1px solid black;
        }

        .input-group {
          border-left: 1px solid black;
        }

        .form-control {
          height: auto;
          border-radius: 0;
          border-right: 1px solid black;
        }

        .wrap:nth-child(3) .input-group {
          border-right: 1px solid black;

          textarea {
            padding: 0 6px;
            border-bottom: 0;
            border-right: 0;
          }
        }

        .form-label {
          height: 50px;
          padding: 0 10px;
          width: 150px;
        }
      }

      form {
        .form-control {
          padding: 5px;
        }

        .wrap {
          label.use {
            border-right: 1px solid black;
          }

          .option {
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
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .modal {
    .fixed_info {
      p {
        font-size: 18px;
      }

      button {
        padding: 0;
      }
    }

    .second_content {
      .wrap1 {
        justify-content: space-evenly;
        padding: 20px 20px 0;

        .dropdown {
          .dropdown-menu {
            .dropdown-item {
              text-align: left;
            }
          }
        }

        div {
          margin: 10px 0;
        }
      }

      .wrap2 {
        flex-direction: column;
        padding: 0 20px;
        margin-bottom: 20px;

        p {
          margin-bottom: 0;
        }

        .form-label {
          white-space: nowrap;
          font-weight: 800;
          font-size: 18px;
        }
      }
    }
  }

  .main_section {
    .info_wrap {
      padding: 0 5%;

      .fixed_info {
        flex-direction: column;
        height: unset;
        padding: 10px;

        p {
          font-size: 18px;
        }
      }

      .second_content {
        .wrap1 {
          justify-content: space-evenly;
          padding: 20px 20px 0;

          .dropdown {
            .dropdown-menu {
              width: 225px;
            }
          }

          div {
            margin: 10px 0;
          }
        }

        .wrap2 {
          flex-direction: column;
          padding: 0 20px;
          margin-bottom: 20px;

          p {
            margin-bottom: 0;
          }
        }
      }

      .third_content {
        .list {
          border: 1px solid black;
        }
      }

      .fourth_content {
        border-right: 1px solid black;

        .fixed_info {
          border-bottom: 1px solid black;
          border-right: none;
        }

        .row {
          flex-direction: column;

          .wrap {
            flex-direction: column;
          }
        }

        .wrap:nth-child(1) .form-control,
        .wrap:nth-child(2) .form-control {
          height: auto;
          border-radius: 0;
          border-bottom: 1px solid black;
        }

        .wrap:nth-child(3) .form-control {
          height: auto;
          border-radius: 0;
          border-bottom: 1px solid black;
        }

        .form-label {
          border-bottom: 1px solid black;

          p {
            font-size: 18px;
          }
        }
      }

      form {
        .form-check {
          font-size: 18px;
        }

        .wrap {
          flex-direction: column;

          label.use,
          .form-label {
            border-bottom: 1px solid black;
            width: 100%;
            height: 30px;
            justify-content: space-evenly;
          }

          .option {
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
          p {
            font-size: 18px;
          }
        }
      }
    }
  }
}

</style>
