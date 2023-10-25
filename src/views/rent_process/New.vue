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
            <button type="button" class="close" data-bs-dismiss="modal">
                  x
                </button>
          </div>
          <div class="second_content">
            <div class="wrap1">
              <div class="col-xl-3 col-lg-12 col-md-12 col-12">
                <p>設備總類</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                        {{ searchParams.EquipTypeName || '請選擇' }}
                      </button>
                  <div class="dropdown-menu" aria-labelledby="typeDropdown">
                    <p v-for="(item, index) in searchParams.EquipTypeArray" :key="index" class="dropdown-item" @click="selectType(item)">
                      {{ item.Name }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-12 col-md-12 col-12">
                <p>設備分類</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(searchParams.EquipTypeName !== '') }">
                        {{ searchParams.EquipCategoryName || searchParams.EquipCategoryInit }}
                      </button>
                  <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                    <p v-for="(item, index) in searchParams.EquipCategoryArray" :key="index" class="dropdown-item" @click="selectCategory(item)">
                      {{ item.Name }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-12 col-md-12 col-12">
                <p>物品名稱</p>
                <div class="number-input-box">
                  <input class="input-number" type="text" v-model="searchParams.ProductName" :placeholder="searchPlaceholder" />
                </div>
              </div>
              <div class="col-xl-3 col-lg-12 col-md-12 col-12">
                <p>
                  已選/所需 數量
                  <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘" />
                </p>
                <div class="number-input-box">
                  <p class="input-number readonly_box" readonly>
                    {{ searchParams.selectedNumber }} / {{ searchParams.Number }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row g-0">
              <div class="col-12 d-flex wrap2">
                <label for="inputTextarea" class="form-label"><p>規格需求：</p></label
                    >
                    <div></div>
                    <textarea
                      class="form-control readonly_box"
                      id="inputTextarea"
                      rows="3"
                      readonly
                      >{{ searchParams.RequiredSpec }}</textarea
                    >
                  </div>
                </div>
                <div class="col d-flex justify-content-center">
                  <button
                    class="btn submit_btn"
                    type="button"
                    @click="searchInventory('','search');"
                  >
                    搜尋庫存
                  </button>
                </div>
              </div>
              <div class="fixed_info">
                <div>
                  <p>目前資產庫存</p>
                </div>
              </div>
              <DataTable
                lazy
                :key="datagrid3.key"
                :first="datagrid3.first"
                :size="'small'"
                :loading="datagrid3.loading"
                :value="rowData3"
                :sort-field="datagrid3.sortField"
                :sort-order="datagrid3.sortOrder"
                resizableColumns
                columnResizeMode="expand"
                showGridlines
                scrollable
                scrollHeight="420px"
                @page="searchInventory($event , 'page')"
                @sort="searchInventory($event , 'sort')"
                paginator
                :rows="datagrid3.rows"
                :totalRecords="datagrid3.totalRecords"
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}"
              >
              <Column style="min-width: 60px">
                <template #body="slotProps">
                  <AssetsView :params="slotProps" />
</template>
            </Column>
            <Column style="min-width: 60px" header="選擇">
<template #body="slotProps">
  <Storage_add :params="slotProps" :selectedNumber="searchParams.selectedNumber" :Number="searchParams.Number" @addMaterial="addMaterial" />
</template>
            </Column>
            <Column style="min-width: 80px" header="數量">
<template #body="slotProps">
  <Storage_number :params="slotProps" />
</template>
            </Column>
            <Column
              v-for="item in datagrid3field"
              :field="item.field"
              :header="item.header"
              sortable
              :style="{'min-width': item.width}"
            ></Column>
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
          <p>單號：{{ details.AO_ID}}</p>
        </div>
        <div>
          <p>申請人員：{{ details.Applicant}}</p>
        </div>
        <div>
          <p>申請日期：{{ details.ApplicationDate}}</p>
        </div>
      </div>
      <form>
        <div class="row g-0">
          <div class="col d-flex wrap column_section">
            <label for="inputTitle1" class="form-label use"
              ><p>用&ensp;&ensp;&ensp;&ensp;途</p></label
            >
            <div class="option">
              <div class="content">
                <div
                  class="form-check"
                  v-for="(option, index) in options"
                  :key="index"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :value="option"
                    :id="'radio' + (index + 1)"
                    v-model="details.Use"
                    :disabled="option !== details.Use && details.Use !== ''"
                  />
                  <label
                    class="form-check-label"
                    :for="'radio' + (index + 1)"
                    >{{ option }}</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithButton" class="form-label"
              ><p>專案代碼</p></label
            >
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.ProjectCode }}</p>
            </div>
          </div>
          <div class="col d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"
              ><p>專案名稱</p></label
            >
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.ProjectName}}</p>
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col d-flex wrap" style="border: none">
            <label for="inputTextarea" class="form-label"
              ><p>說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p></label
            >
            <div class="input-group" id="readonly_box">
              <p class="readonly_box" readonly>{{ details.Description}}</p>
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
        <DataTable
          :size="'small'"
          :value="rowData1"
          resizableColumns
          columnResizeMode="expand"
          showGridlines
          scrollable
          scroll-height="600px"
        >
          <Column>
<template style="min-width: 115px" #body="slotProps">
  <Storage_button :params="slotProps" @searchList="searchList" />
</template>
          </Column>
          <Column
            v-for="item in datagrid1field"
            :field="item.field"
            :header="item.header"
            sortable
            :style="{'min-width': item.width}"
          ></Column>
        </DataTable>
      </div>

      <div class="third_content">
        <!-- <modal-overlay v-if="modalVisible" @close="closeModal" /> -->
        <div class="fixed_info">
          <div>
            <p>資產出庫細項</p>
          </div>
        </div>
        <DataTable
          :size="'small'"
          :value="rowData2"
          resizableColumns
          columnResizeMode="expand"
          showGridlines
          scrollable
          scroll-height="600px"
        >
          <Column>
<template style="min-width: 50px" #body="slotProps">
  <Delete :params="slotProps" @deleteMaterial="deleteMaterial" />
</template>
          </Column>
          <Column>
<template #body="slotProps">
  <AssetsView :params="slotProps" />
</template>
          </Column>
          <Column
            v-for="item in datagrid2field"
            :field="item.field"
            :header="item.header"
            :sortable="item.sortable"
            :style="{'min-width': item.width}"
          ></Column>
        </DataTable>
      </div>
      <div class="fixed_info_count">
        <div>
          <p>總出庫數量：{{ totalNeed}}個</p>
        </div>
        <div>
          <p>已備數量: {{ totalSelect}}個</p>
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
            <label for="inputWithButton" class="form-label"
              ><p>備料人員</p></label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control readonly_box"
                id="inputWithButton"
                readonly
                v-model="PreparedPerson"
              />
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"
              ><p>備料完成日期</p></label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control readonly_box"
                id="inputWithTitle"
                readonly
                v-model="PreparedDate"
              />
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
            <label for="inputWithTitle" class="form-label project_name"
              ><p>備料備註</p></label
            >
            <div class="input-group">
              <textarea
                placeholder="最多輸入100字"
                class="form-control"
                id="inputTextarea"
                style="height: 100%"
                rows="1"
                v-model="details.PrepareMemo"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button
        class="send_btn"
        data-bs-toggle="modal"
        data-bs-target="#confirmModal"
      >
        送出
      </button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm confirm_modal">
        <div class="modal-content">
          <div class="modal-body">
            按下確認後將無法再次進行備料作業，請確認資產出庫細項是否備料正確
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="submit"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AssetsView from '@/components/Rent_process_new_view_button'
  import Storage_button from "@/components/Storage_button";
  import Storage_add from "@/components/Storage_add_button";
  import Storage_number from "@/components/Storage_number_input"
  import Delete from "@/components/Rent_proccess_new_delete_button";
  import Navbar from "@/components/Navbar.vue";
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import {
    Rent_UseArray
  } from "@/assets/js/dropdown";
  import {
    getApplication,
    getEquipType,
    getEquipCategory
  } from "@/assets/js/common_api";
  import {
    canEnterPage,
    getDate,
    goBack,
    createDatagrid,
    UpdatePageParameter,
  } from "@/assets/js/common_fn";
  import {
    onMounted,
    ref,
    reactive
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import {
    RentProcess_New_Status
  } from "@/assets/js/enter_status";
  export default {
    components: {
      Navbar,
      Column,
      DataTable,
      Storage_button,
      Delete,
      Storage_add,
      Storage_number,
      AssetsView,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AO_ID = route.query.search_id;
      const details = ref({});
      const options = Rent_UseArray;
      const selectedNumberArray = ref([]); //紀錄不同項目已選數量array
      const totalNeed = ref(0); //總所需數量
      const totalSelect = ref(0); //總已備數量
      const PreparedPerson = ref('');
      const PreparedDate = ref('');
      const PrepareMemo = ref('');
      const searchParams = reactive({
        EquipTypeName: '',
        EquipType_Id: '',
        EquipTypeArray: [],
        EquipCategoryName: '',
        Category_Id: '',
        EquipCategoryArray: [],
        EquipCategoryInit: '請先選擇設備總類',
        ProductName: '',
        ProjectCode: '',
        Number: 1,
        RequiredSpec: '',
        id: 1,
        item_id: '',
        selectedNumber: 0,
      });
      const searchPlaceholder = ref('');
      // 資產出庫項目
      const datagrid1field = [{
          field: "id",
          width: '50px',
          header: "項目"
        },
        {
          field: "EquipTypeName",
          width: '150px',
          header: "設備總類"
        },
        {
          field: "EquipCategoryName",
          width: '150px',
          header: "設備分類"
        },
        {
          field: "ProductName",
          width: '150px',
          header: "物品名稱"
        },
        {
          field: "Number",
          width: '100px',
          header: "數量"
        },
        {
          field: "RequiredSpec",
          width: '250px',
          header: "規格需求"
        },
      ]
      // 資產出庫細項
      const datagrid2field = [{
          field: "OM_List_id",
          width: '50px',
          header: "需求項目",
          sortable: false,
        },
        {
          field: "OM_Number",
          width: '30px',
          header: "數量",
          sortable: false,
        },
        {
          field: "OM_Unit",
          width: '30px',
          header: "單位",
          sortable: false,
        },
        {
          field: "AssetsId",
          width: '150px',
          header: "資產編號",
          sortable: true,
        },
        {
          field: "AssetName",
          width: '150px',
          header: "物品名稱",
          sortable: true,
        },
        {
          field: "AreaName",
          width: '150px',
          header: "儲位區域",
          sortable: true,
        },
        {
          field: "LayerName",
          width: '150px',
          header: "儲位櫃位",
          sortable: true,
        },
        {
          field: "VendorName",
          width: '150px',
          header: "廠商",
          sortable: true,
        },
        {
          field: "ProductType",
          width: '150px',
          header: "型號",
          sortable: true,
        },
        {
          field: "ProductSpec",
          width: '150px',
          header: "規格",
          sortable: true,
        },
      ]
      // 檢索datagrid
      const datagrid3 = createDatagrid();
      const datagrid3field = [
        // { field: "selectNumber", width: '100px', header: "已選數量" },
        {
          field: "OM_Unit",
          width: '100px',
          header: "單位"
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
          field: "AreaName",
          width: '150px',
          header: "儲位區域"
        },
        {
          field: "LayerName",
          width: '150px',
          header: "儲位櫃位"
        },
        {
          field: "VendorName",
          width: '150px',
          header: "廠商"
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
        }
      ]
      const rowData1 = ref([]);
      const rowData2 = ref([]);
      const rowData3 = ref([]);
      onMounted(() => {
        getDetails();
        getApplicationInfo();
        PreparedDate.value = getDate();
      });
      async function getEquipTypeName() {
        if (searchParams.EquipTypeArray.length == 0) {
          getEquipType()
            .then((data) => {
              searchParams.EquipTypeArray = data;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      async function getEquipCategoryName() {
        getEquipCategory(searchParams.EquipType_Id)
          .then((data) => {
            searchParams.EquipCategoryArray = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/AssetsOutGetData?ao_id=${AO_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            canEnterPage(data.resultList.Status, RentProcess_New_Status)
            console.log('getDetails 成功 資料如下\n', data.resultList);
            // 設定搜尋參數的專案代碼
            searchParams.ProjectCode = data.resultList.ProjectCode
            // 設定datagrid、details
            details.value = data.resultList;
            rowData1.value = data.resultList.ItemList;
            rowData2.value = data.resultList.OM_List;
            // 初始化已選數量array(從1開始)
            for (let i = 1; i <= rowData1.value.length; i++) {
              selectedNumberArray.value[i] = 0;
            }
            // 遍歷OM_list 將已選數量疊加上去
            rowData2.value.forEach(item => {
              selectedNumberArray.value[item.OM_List_id] += item.OM_Number;
            });
            totalNeed.value = 0;
            rowData1.value.forEach(item => {
              totalNeed.value += item.Number;
            });
            totalSelect.value = 0;
            selectedNumberArray.value.forEach(item => {
              totalSelect.value += item;
            });
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function searchInventory(event, type) {
        if (!/^.{0,20}$/.test(searchParams.ProductName)) {
          alert('物品名稱不可輸入超過20字')
          return
        }
        const axios = require('axios');
        try {
          const form = new FormData();
          form.append('EquipType_Id', searchParams.EquipType_Id);
          form.append('Category_Id', searchParams.Category_Id);
          form.append('ProductName', searchParams.ProductName);
          form.append('ProjectCode', searchParams.ProjectCode);
          UpdatePageParameter(datagrid3, event, type, form);
          const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/SearchInventory', form);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            // searchParams.id : 哪一個項目(前端紀錄個項目已備數量)
            // searchParams.item_id : 項目的item_id(後端項目id)
            datagrid3.totalRecords = data.resultList.total;
            rowData3.value = data.resultList.rows.map(item => ({
              ...item,
              item_id: searchParams.item_id,
              selectNumber: item.OM_Number,
              id: searchParams.id,
            }));
            // console.log(rowData3.value);
            datagrid3.key++;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function submit() {
        if (details.value.PrepareMemo) {
          details.value.PrepareMemo = details.value.PrepareMemo.trim();
        }
        if (details.value.PrepareMemo && !/^[\s\S]{1,100}$/.test(details.value.PrepareMemo)) {
          alert('備料備註不可輸入超過100字');
          return
        }
        if (rowData2.value.length === 0) {
          alert('請至少出庫一個細項');
          return
        }
        const requestData = {
          AO_ID: AO_ID,
          PrepareMemo: details.value.PrepareMemo,
        };
        // console.log(requestData);
        try {
          const axios = require('axios');
          const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/MaterialPreparation', requestData);
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
      function selectType(item) {
        searchParams.EquipTypeName = item.Name;
        searchParams.EquipType_Id = item.Id;
        searchParams.EquipCategoryName = '';
        searchParams.Category_Id = '';
        getEquipCategoryName();
        searchParams.EquipCategoryInit = '請選擇';
      }
      function selectCategory(item) {
        searchParams.EquipCategoryName = item.Name;
        searchParams.Category_Id = item.Id;
      }
      async function getApplicationInfo() {
        getApplication()
          .then((data) => {
            PreparedPerson.value = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      function calculateIndex(slotProps) {
        return String(slotProps.index + 1).padStart(2, '0');
      }
      // 點選搜尋庫存，預帶入參數
      function searchList(data) {
        // console.log('data:', data);
        for (const key in data) {
          searchParams[key] = data[key];
        }
        searchPlaceholder.value = searchParams.ProductName;
        searchParams.ProductName = '';
        getEquipCategoryName();
        // 額外處理data沒有的參數
        searchParams.selectedNumber = selectedNumberArray.value[data.id]
        searchInventory('', 'search');
        // console.log('設定後搜尋參數:\n', searchParams);
      }
      // 新增庫存
      function addMaterial(data) {
        selectedNumberArray.value[data.id] += data.selectNumber
        searchParams.selectedNumber = selectedNumberArray.value[data.id]
        // searchInventory刷新庫存數量
        searchInventory('', 'search');
        // getDetail刷新rowData1、2
        getDetails();
      }
      // 刪除庫存
      function deleteMaterial(data) {
        selectedNumberArray.value[data.id] -= data.selectNumber
        searchParams.selectedNumber = selectedNumberArray.value[data.id]
        getDetails()
      }
      return {
        details,
        options,
        searchParams,
        searchPlaceholder,
        datagrid1field,
        datagrid2field,
        datagrid3field,
        datagrid3,
        rowData1,
        rowData2,
        rowData3,
        totalNeed,
        totalSelect,
        PrepareMemo,
        PreparedPerson,
        PreparedDate,
        getEquipTypeName,
        selectType,
        selectCategory,
        searchInventory,
        submit,
        getDate,
        searchList,
        addMaterial,
        deleteMaterial,
        calculateIndex,
        goBack,
      };
    },
    data() {
      return {
        rowHeight: 35,
      };
    },
  };
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
  .input-group {
    height: 100%;
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
  @media only screen and (min-width: 1200px) {
    .modal {
      padding: 0 5%;
      .modal-content {
        background-color: unset;
        border: 0;
      }
      .confirm_modal .modal-content {
        width: 300px;
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
          font-size: 20px;
          margin-bottom: 0 !important;
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          align-self: start;
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
        background: #D9D9D9;
        .submit_btn {
          margin-bottom: 20px;
          background: #48658C;
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
          display: flex;
          justify-content: space-evenly;
          padding: 10px 80px;
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
              width: 225px;
              max-height: 250px;
              overflow-y: auto;
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
    }
    .main_section {
      .readonly_box {
        @include readonly_box;
        height: 100%;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
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
        #readonly_box {
          background-color: #b4b4b4;
          border-left: black 1px solid;
        }
        .second_content {
          background: #D9D9D9;
          .submit_btn {
            margin-bottom: 20px;
            background: #48658C;
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
            display: flex;
            justify-content: space-evenly;
            padding: 10px 80px;
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
                width: 225px;
                max-height: 250px;
                overflow-y: auto;
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
          border-bottom: 1px solid black;
          background: white;
          .fixed_info {
            border-top: none;
            border-left: none;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
          }
          .input-group {
            border-left: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
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
            padding: 0;
          }
          .wrap {
            border-bottom: 1px solid black;
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
        .input-number {
          @include count_btn;
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
          &:nth-child(2) {
            @include search_and_send_btn;
            &:hover {
              background-color: #5d85bd;
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .modal {
      padding: 0 5%;
      .modal-content {
        background-color: unset;
        border: 0;
      }
      .confirm_modal .modal-content {
        width: 300px;
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
          font-size: 20px;
          margin-bottom: 0 !important;
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          align-self: start;
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
        background: #D9D9D9;
        .submit_btn {
          margin-bottom: 20px;
          background: #48658C;
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
          display: flex;
          justify-content: space-evenly;
          padding: 10px 80px;
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
              width: 150px;
              .dropdown-item {
                text-align: left;
              }
            }
          }
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
        .wrap1 {
          display: grid;
          grid-auto-flow: column;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 10px 10px;
          grid-template-areas: ". ." ". .";
        }
      }
    }
    .main_section {
      .readonly_box {
        @include readonly_box;
        height: 100%;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
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
        #readonly_box {
          background-color: #b4b4b4;
          border-left: black 1px solid;
        }
        .second_content {
          background: #D9D9D9;
          .submit_btn {
            margin-bottom: 20px;
            background: #48658C;
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
            display: flex;
            justify-content: space-evenly;
            padding: 10px 80px;
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
                width: 225px;
                max-height: 250px;
                overflow-y: auto;
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
          border-bottom: 1px solid black;
          background: white;
          .fixed_info {
            border-top: none;
            border-left: none;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
          }
          .input-group {
            border-left: 1px solid black;
          }
          .form-check {
            margin-left: 10px;
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
            padding: 0;
          }
          .wrap {
            border-bottom: 1px solid black;
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
        .input-number {
          @include count_btn;
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
          &:nth-child(2) {
            @include search_and_send_btn;
            &:hover {
              background-color: #5d85bd;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .modal {
      .modal-dialog {
        padding: 0 5%;
      }
      .modal-content {
        background-color: unset;
        border: 0;
      }
      .fixed_info {
        @include fixed_info;
        background: #528091;
        border-radius: 0;
        border-bottom: unset !important;
        border: 1px solid black;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 18px;
          margin-bottom: 0 !important;
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          align-self: start;
          padding: 0;
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
        background: #D9D9D9;
        .submit_btn {
          margin-bottom: 20px;
          background: #48658C;
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
        .wrap1 {
          justify-content: space-evenly;
          padding: 20px 20px 0;
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
              width: 225px;
              .dropdown-item {
                text-align: left;
              }
            }
          }
          div {
            margin: 10px 0;
            p {
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
            }
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
      .readonly_box {
        @include readonly_box;
      }
      #readonly_box {
        background: #b4b4b4;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
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
        .second_content {
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
          .wrap1 {
            justify-content: space-evenly;
            padding: 20px 20px 0;
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
                width: 225px;
                .dropdown-item {
                  text-align: left;
                }
              }
            }
            div {
              margin: 10px 0;
              p {
                white-space: nowrap;
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 5px;
              }
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
        .third_content {
          .fixed_info {
            border-top: unset;
          }
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
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;
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
            border-bottom: 1px solid black;
            border-top: none;
            border-left: none;
            border-right: none;
          }
          .row {
            flex-direction: column;
            .wrap {
              flex-direction: column;
            }
          }
          .form-check {
            margin-left: 10px;
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
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            p {
              font-size: 18px;
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
        .input-number {
          @include count_btn;
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
          &:nth-child(2) {
            @include search_and_send_btn;
            &:hover {
              background-color: #5d85bd;
            }
          }
        }
      }
    }
  }
</style>
