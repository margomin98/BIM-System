<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>平帳作業</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>計畫內容</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">計畫編號：</div>
            <input type="text" class="form-control readonly_box" v-model="details.PlanId" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">標題：</div>
            <input type="text" class="form-control readonly_box" v-model="details.PlanTitle" readonly />
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點人員：</div>
              <input type="text" class="form-control readonly_box" v-model="details.InventoryStaffName" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點召集人：</div>
              <input type="text" class="form-control readonly_box" v-model="details.ConvenerName" readonly />
            </div>
          </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點開始日期：</div>
              <input type="text" class="form-control readonly_box" v-model="details.PlanStart" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點結束日期：</div>
              <input type="text" class="form-control readonly_box" v-model="details.PlanEnd" readonly />
            </div>
          </div>
        </div>
        <!-- 專案代碼 -->
        <div v-show="details.PlanType === '專案盤點'" class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">專案代碼 :</div>
            <input type="text" class="form-control readonly_box" v-model="details.ProjectCode" readonly>
          </div>
        </div>
        <!-- 專案名稱 -->
        <div v-show="details.PlanType === '專案盤點'" class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">專案名稱 :</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" v-model="details.ProjectName" readonly>
          </div>
        </div>
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend">盤點類型：</div>
            <div class="check_section">
              <template v-for="(item, index) in PlanType" :key="item">
                <div class="form-check d-flex align-items-center">
                  <input type="radio" :id="`no${index}`" name="radio" :value="item" v-model="details.PlanType"
                    :disabled="details.PlanType !== item" />
                  <label :for="`no${index}`">{{ item }}</label>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>盤點結果</p>
        </div>
      </div>
      <div class="content d-flex">
        <div>
          <p>應盤內容 ： {{ details.ReceivableCount }}項</p>
        </div>
        <div>
          <p>合格項目 ： {{ details.PassCount }}項</p>
        </div>
        <div>
          <p>差異項目 ： {{ details.DiscrepancyCount }}項</p>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>差異細項</p>
        </div>
      </div>
      <div class="content">
        <div style="width: 100%">
          <DataTable :size="'small'" :value="rowData1" resizableColumns columnResizeMode="expand" showGridlines scrollable
            scrollHeight="820px" v-model:selection="datagrid1.selectedList" sort-field="NotBalanced" :sort-order=-1
            paginator :rows="20" @page="updatePage($event)"
            :row-style="({ NotBalanced }) => NotBalanced ? 'background-color: #FFE1E1;' : null"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 50px;" header="項目">
              <template #body="slotProps">
                {{ calculateIndex(1, slotProps) }}
              </template>
            </Column>
            <Column style="min-width: 60px;">
              <template #body="slotProps">
                <!-- Add the custom component here -->
                <List_view_button :params="slotProps" />
              </template>
            </Column>
            <Column header="認列" class="datatable_checkbox">
              <template #body="slotProps">
                <input class="p-checkbox p-component" type="checkbox" :disabled="!slotProps.data.NotBalanced"
                  :checked="!slotProps.data.NotBalanced" @change="updateList($event, slotProps)" />
              </template>
            </Column>
            <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable
              :style="{ 'min-width': item.width }"></Column>
          </DataTable>
        </div>
      </div>
      <div class="bottom_fixed">
        <div class="col d-flex">
          <div class="input-group">
            <div class="input-group-prepend">認列人員：</div>
            <input type="text" class="form-control text-center readonly_box authorize_user" readonly v-model="validation.VerifyPerson" />
            <span class="icon-container">
              <img src="@/assets/accept.png" class="checkmark-icon" v-show="validation.isVerified" />
            </span>
          </div>
          <button class="send_btn" data-bs-toggle="modal" data-bs-target="#auth_modal">驗證</button>
        </div>
        <!--Validation Modal -->
        <div class="modal fade" id="auth_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
          aria-labelledby="staticBackdropLabel2" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title">認列人員驗證</h5>
                <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
              </div>
              <div class="modal-body">
                <div class="col">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">帳號：</div>
                    <input type="text" class="form-control" v-model="validation.account" />
                  </div>
                </div>
                <div class="col">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">密碼：</div>
                    <input type="password" class="form-control" v-model="validation.password" />
                  </div>
                </div>
              </div>
              <div class="modal-footer m-auto">
                <button type="button" class="btn" data-bs-dismiss="modal" @click="validate()">驗證</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="send_btn" :class="{ send_btn_disabled: !validation.isVerified }" @click="submit"
          :disabled="!validation.isVerified">確定認列</button>
        <button class="send_btn" :class="{ send_btn_disabled: !validation.isVerified }" :disabled="!validation.isVerified"
          data-bs-toggle="modal" data-bs-target="#force_modal">完成平帳</button>
      </div>
      <!--Force Warning Modal -->
      <div class="modal force_modal fade" id="force_modal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">警示</h5>
              <div class="close_icon">
                <p type="button" data-bs-dismiss="modal" aria-label="Close">X</p>
              </div>
            </div>
            <div class="modal-body">
              <p>請確認差異細項是否認列無誤，按下"確認"後將會立即結束本次盤點平帳作業，不可再做修正。</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn confirm" data-bs-dismiss="modal" @click="submit('force')">確認</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>盤點範圍</p>
        </div>
      </div>
      <div class="content">
        <div class="search_wrap col">
          <div class="content">
            <div class="wrap row">
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p class="search_label">設備總類</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                    {{ searchParams.EquipTypeName || '請選擇' }}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="typeDropdown">
                    <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item"
                      @click="selectType(item)">{{ item.Name }}</p>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p class="search_label">設備分類</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"
                    :class="{ disabled: !(searchParams.EquipTypeName !== '') }">
                    {{ searchParams.EquipCategoryName || EquipCategoryInit }}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                    <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item"
                      @click="selectCategory(item)">{{ item.Name }}</p>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p class="search_label">資產編號</p>
                <input type="text" class="form-control text-center" placeholder="" v-model="searchParams.AssetsId" />
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p>物品名稱</p>
                <input type="text" class="form-control text-center" placeholder="最多輸入20字"
                  v-model="searchParams.AssetName" />
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p class="search_label">儲位區域</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" @click="getAreaName">
                    {{ searchParams.AreaName || '請選擇' }}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="areaDropdown">
                    <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item"
                      @click="selectArea(item)">{{ item.Name }}</p>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                <p class="search_label">儲位櫃位</p>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" :disabled="searchParams.AreaName === ''">
                    {{ searchParams.LayerName || LayerInit }}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                    <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item"
                      @click="selectLayer(item)">{{ item.Name }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-12 button">
              <button class="search_btn" @click="getDatagrid('', 'search')">搜索</button>
              <button class="empty_btn" @click="clear">清空</button>
            </div>
          </div>
        </div>
        <div style="height: 100%;">
          <DataTable lazy :first="datagrid2.first" :size="'small'" :loading="datagrid2.loading" :value="rowData2"
            :sort-field="datagrid2.sortField" :sort-order="datagrid2.sortOrder" resizableColumns columnResizeMode="expand"
            showGridlines scrollable scrollHeight="490px" @page="getDatagrid($event, 'page')"
            @sort="getDatagrid($event, 'sort')" paginator :rows="datagrid2.rows" :totalRecords="datagrid2.totalRecords"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            :rowsPerPageOptions="[10, 20, 30]"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 50px;" header="項目">
              <template #body="slotProps">
                {{ calculateIndex(2, slotProps) }}
              </template>
            </Column>
            <Column style="min-width: 60px;">
              <template #body="slotProps">
                <List_view_button :params="slotProps" />
              </template>
            </Column>
            <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable
              :style="{ 'min-width': item.width }"></Column>
          </DataTable>
        </div>
      </div>
      <div class="col bottom_button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Navbar from "@/components/Navbar.vue";
  import List_view_button from "@/components/Inventory_view_button.vue"
  import {
    onMounted,
    reactive,
    ref
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import {
    getEquipType,
    getEquipCategory,
    getArea,
    getLayer,
  } from '@/assets/js/common_api'
  import {
    goBack,
    canEnterPage,
    createDatagrid,
    UpdatePageParameter,
  } from "@/assets/js/common_fn";
  import {
    PlanType
  } from '@/assets/js/dropdown';
  import {
    Inventory_Balance_Status
  } from '@/assets/js/enter_status'
  import axios from '@/axios/tokenInterceptor';
  export default {
    components: {
      Navbar,
      DataTable,
      Column,
      List_view_button,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const IP_ID = route.query.search_id;
      const details = ref('');
      const DropdownArray = reactive({
        EquipType: [],
        EquipCategory: [],
        Area: [],
        Layer: [],
      });
      const EquipCategoryInit = ref('請先選擇設備總類');
      const LayerInit = ref('請先選擇區域');
      const searchParams = reactive({
        EquipTypeName: '',
        EquipType_Id: '',
        EquipCategoryName: '',
        Category_Id: '',
        AssetsId: '',
        AssetName: '',
        AreaName: '',
        Area_Id: '',
        LayerName: '',
        Layer_Id: '',
      });
      const validation = reactive({
        account: '',
        password: '',
        VerifyOption: false,
        isVerified: false,
        VerifyPerson: '未驗證',
      })
      const datagrid1 = createDatagrid()
      const datagrid2 = createDatagrid()
      const datagrid1field = [{
          field: 'AssetsId',
          header: '資產編號',
          width: '150px',
        },
        {
          field: 'RecognizePerson',
          header: '認列人員',
          width: '150px',
        },
        {
          field: 'EquipTypeName',
          header: '設備總類',
          width: '150px',
        },
        {
          field: 'EquipCategoryName',
          header: '設備分類',
          width: '150px',
        },
        {
          field: 'AssetName',
          header: '物品名稱',
          width: '150px',
        },
        {
          field: 'AreaName',
          header: '儲位區域',
          width: '150px',
        },
        {
          field: 'LayerName',
          header: '儲位櫃位',
          width: '150px',
        },
        {
          field: 'ReceivableNum',
          header: '應盤',
          width: '80px',
        },
        {
          field: 'ActualNum',
          header: '實盤',
          width: '80px',
        },
        {
          field: 'Discrepancy',
          header: '差異',
          width: '80px',
        },
        {
          field: 'Unit',
          header: '單位',
          width: '80px',
        },
      ];
      const rowData1 = ref([]);
      const rowData2 = ref([]);
      onMounted(() => {
        datagrid1.rows = 20
        datagrid1.sortField = 'RecognizePerson'
        getDetails();
        getDatagrid('', 'search');
      });
      async function submit(type) {
        if (!validation.isVerified) {
          alert('未驗證');
          return
        }
        if (type !== 'force' && datagrid1.selectedList.length === 0) {
          alert('請至少認列一項');
          return
        }
        const AssetList = datagrid1.selectedList.map(item => ({
          I_id: item.I_Id,
          Discrepancy: item.Discrepancy,
        }));
        let requestData = {
          PlanId: IP_ID,
          RecognizePerson: validation.VerifyPerson,
          AssetList: AssetList,
          IsCompleted: type === 'force' ? true : false,
        }
        if (AssetList.length === 0) {
          delete requestData.AssetList;
        }
        console.log('requestData:', requestData);
        try {
          const response = await axios.post('https://localhost:44302/StocktakingMng/BalanceAsset', requestData);
          const data = response.data;
          if (data.state === 'success') {
            let msg = data.messages;
            msg += '\n計畫編號:' + data.resultList.IP_Id;
            alert(msg);
            router.push({
              name: 'Inventory_Datagrid'
            });
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function validate() {
        const formData = new FormData();
        const formFields = {
          'userName': validation.account,
          'userPassword': validation.password,
          'id': 'IP_FlatProcess',
        };
        //將表格資料append到 formData
        for (const fieldName in formFields) {
          formData.append(fieldName, formFields[fieldName]);
        }
        const response = await axios.post('https://localhost:44302/Account/IdentityValidation', formData);
        try {
          const data = response.data;
          console.log(data);
          if (data.state === 'success') {
            validation.isVerified = true;
            validation.VerifyPerson = validation.account;
          } else if (data.state === 'error') {
            alert(data.messages);
            validation.isVerified = false;
            validation.VerifyPerson = '未驗證';
          }
        } catch (error) {
          console.error(error);
        }
      }
      // 上半部資料 + 差異細項Datagrid
      async function getDetails() {
        try {
          const response = await axios.get(`https://localhost:44302/GetDBdata/GetInventoryResult?id=${IP_ID}`);
          const data = response.data;
          if (data.state === 'success') {
            // 檢查資料狀態是否可平帳
            canEnterPage(data.resultList.PlanStatus, Inventory_Balance_Status);
            console.log('上半部資料如下\n', data.resultList);
            details.value = data.resultList;
            rowData1.value = data.resultList.AssetList
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      // 下半部盤點範圍Datagrid
      async function getDatagrid(event, type) {
        searchParams.AssetName = searchParams.AssetName.trim();
        if (searchParams.AssetName && !/^[\s\S]{0,20}$/.test(searchParams.AssetName)) {
          alert('物品名稱不可輸入超過20字')
          return
        }
        const form = new FormData();
        form.append('PlanId', IP_ID)
        for (const key in searchParams) {
          if (searchParams[key]) {
            form.append(key, searchParams[key]);
          }
        }
        UpdatePageParameter(datagrid2, event, type, form)
        try {
          const response = await axios.post('https://localhost:44302/StocktakingMng/InventoryResult', form);
          const data = response.data;
          if (data.state === 'success') {
            console.log('下半部datagrid\n', data.resultList);
            rowData2.value = data.resultList.rows;
            datagrid2.totalRecords = data.resultList.total;
          } else if (data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function getEquipTypeName() {
        if (DropdownArray.EquipType.length == 0) {
          getEquipType()
            .then((data) => {
              DropdownArray.EquipType = data;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      async function getEquipCategoryName() {
        getEquipCategory(searchParams.EquipType_Id)
          .then((data) => {
            DropdownArray.EquipCategory = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      async function getAreaName() {
        if (DropdownArray.Area.length == 0) {
          getArea()
            .then((data) => {
              DropdownArray.Area = data;
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      async function getLayerName() {
        getLayer(searchParams.Area_Id)
          .then((data) => {
            DropdownArray.Layer = data;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      function selectType(item) {
        searchParams.EquipTypeName = item.Name;
        searchParams.EquipType_Id = item.Id;
        searchParams.EquipCategoryName = '';
        searchParams.Category_Id = '';
        getEquipCategoryName();
        EquipCategoryInit.value = '請選擇';
      }
      function selectCategory(item) {
        searchParams.EquipCategoryName = item.Name;
        searchParams.Category_Id = item.Id;
      }
      function selectArea(item) {
        searchParams.AreaName = item.Name;
        searchParams.Area_Id = item.Id;
        searchParams.LayerName = '';
        searchParams.Layer_Id = '';
        getLayerName();
        LayerInit.value = '請選擇';
      };
      function selectLayer(item) {
        searchParams.LayerName = item.Name;
        searchParams.Layer_Id = item.Id;
      };
      function updatePage(event) {
        // console.log('event',event);
        datagrid1.first = event.first
      }
      function clear() {
        for (const key in searchParams) {
          searchParams[key] = '';
        }
        EquipCategoryInit.value = '請先選擇設備總類'
        LayerInit.value = '請先選擇區域'
        getDatagrid();
      }
      function updateList(event, slotProps) {
        if (event.target.checked) {
          datagrid1.selectedList.push(slotProps.data);
        } else {
          datagrid1.selectedList = datagrid1.selectedList.filter((item) => item.AssetsId !== slotProps.data.AssetsId)
        }
      }
      function calculateIndex(number, slotProps) {
        switch (number) {
          case 1:
            return String(datagrid1.first + slotProps.index + 1).padStart(2, '0');
            break;
          case 2:
            return String(datagrid2.first + slotProps.index + 1).padStart(2, '0');
            break;
        }
      }
      return {
        details,
        DropdownArray,
        EquipCategoryInit,
        LayerInit,
        searchParams,
        validation,
        datagrid1,
        datagrid1field,
        datagrid2,
        rowData1,
        rowData2,
        rowHeight: 35,
        PlanType,
        submit,
        validate,
        getDatagrid,
        getAreaName,
        getEquipTypeName,
        selectType,
        selectCategory,
        selectArea,
        selectLayer,
        updatePage,
        clear,
        goBack,
        updateList,
        calculateIndex,
      };
    },
  }
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.force_modal {
  .modal-body {
    padding: 20px;
    margin: auto;

    p {
      text-align: center;
      font-weight: 800;
    }
  }

  .modal-content {
    margin: auto;
  }

  .modal-input-group-prepend {
    width: auto;
    font-weight: 700;
    font-size: 20px;
  }

  .modal-footer {
    padding: 0 12px 12px;
    border: none;
    justify-content: center;

    .confirm {
      color: white;
      background-color: #132238;

      &:hover {
        background-color: #426497;
      }
    }
  }

  .modal-header {
    h5 {
      font-weight: 700;
    }

    background: #3d4e61;
    color: white;
    display: flex;
    justify-content: center;

    .close_icon {
      cursor: pointer;

      p {
        margin-bottom: 0;
      }
    }
  }
}

.checkmark-icon {
  position: absolute;
  top: 10%;
  left: 93%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.main_section {
  input {
    @include dropdown_btn;
    height: 35px;
  }
  .info_wrap:nth-child(3) {
    margin-top: 3%;
    .content {
      justify-content: space-around;
        p{
        font-weight: 700;
      }
    }
  }
  .info_wrap:nth-child(4) {
    margin-top: 3%;
    .content {
      border-radius: unset;
    
    }
  }
  .info_wrap:nth-child(5) {
    .content {
      .search_wrap {
        margin-bottom: 20px;
.search_label{
  font-weight: 700;
}
        .title {
          display: flex;
          justify-content: space-around;
          background: #3d4e61;
          color: white;
          font-size: 25px;
          font-weight: 700;
          align-items: center;
          border-radius: 10px 10px 0px 0px;
          height: 50px;
        }
        .content {
          border-radius: 10px;
          background-color: #c3d3da !important;
        }
        .button {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 20px auto 0;
          button.empty_btn {
            @include empty_btn;
            padding: 5px;
            &:hover {
              background-color: #244f86;
            }
          }
          button.search_btn {
            @include search_and_send_btn;
            padding: 5px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
        .search_section {
          padding: 0 80px;
          width: 100%;
          input {
            @include dropdown_btn;
            width: 100%;
            height: 35px;
          }
        }
      }
      .wrap {
        gap: 10px 0;
      }
      p {
        color: black;
      }
      .dropdown {
        width: 100%;
      }
    }
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
  .check_section {
    .form-check {
      gap: 5px;
      padding: 0;
      input {
        width: 15px;
        padding: 0;
        height: 15px;
        border-radius: 50%;
      }
      label {
        color: white;
        font-weight: 600;
      }
    }
  }
  .readonly_box {
    @include readonly_box;
  }

  .fixed_info {
    @include fixed_info;
    p {
      font-size: 20px;
      margin-bottom: 0;
    }
  }
  .fixed_title {
    @include fixed_title;
  }
  .content {
    @include content_bg;
    p {
      text-align: center;
      white-space: nowrap;
      font-size: 20px;
      margin-bottom: 5px;
      color: white;
    }
  }
}
.button_wrap {
  display: flex;
            justify-content: space-between;
            margin: 30px auto 5%;
            width: 260px;
  button.back_btn {
    @include back_to_previous_btn;
    &:hover {
      background-color: #5d85bb;
    }
  }
  button.send_btn {
    @include search_and_send_btn;
    width: 120px;
    padding: 10px;
    &:hover {
      background-color: #8eb2e3;
    }
  }
  button.send_btn_disabled {
    background: #878787;
    &:hover {
      background: #878787;
    }
  }
}
.bottom_button_wrap {
  display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        width: 220px;
  button.back_btn {
    @include back_to_previous_btn;
    &:hover {
      background-color: #5d85bb;
    }
  }
}
.dropdown {
  @include dropdown_btn;
  height: 35px;
  .dropdown-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    padding: 0;
  }
  .dropdown-menu {
    width: 100%;
    transform: translate3d(-1px, 35px, 0px) !important;
    max-height: 250px;
    overflow-y: auto;
    .dropdown-item {
      text-align: left;
    }
  }
}
.item_wrap {
  height: 350px;
  overflow: auto;
  .item {
    background-color: #526f8e;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
  }
}
.bottom_fixed {
  display: flex;
  justify-content: space-around;
  background: white;
  color: white;
  font-size: 25px;
  font-weight: 700;
  align-items: center;
  border-radius: 0 0 10px 10px;
  height: 70px;

  .input-group {
    height: auto;
  }
  .input-group-prepend {
    font-size: 20px;
    margin-bottom: 0;
    color: black !important;
  }
  button {
    margin-left: 15px;
    @include auth_btn;
    font-size: 20px;
    border-radius: 7px;
    &:hover {
      background: #5a6d87;
    }
  }
}
.modal {
  .modal-body {
    padding: 16px 16px 0;
  }
  .modal-content {
    width: 400px;
    margin: auto;
  }
  input {
    border: 1px solid lightgrey;
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
    background: #3d4e61;
    color: white;
    .close_icon {
      cursor: pointer;
    }
  }
}
@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      margin: auto;
      padding: 0 20%;

      .check_section {
        display: flex;
        gap: 10px;
      }
      .content {
        .input-group-prepend {
          white-space: nowrap;
          width: 162px;
          text-align: end;
        }
      }
      .bottom_fixed {
        padding: 0 30%;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
  
    .info_wrap {
      margin: auto;
      padding: 0 5%;
      .check_section {
        display: flex;
        gap: 10px;
      }
      .content {
        .input-group {
          justify-content: right;
          flex-wrap: nowrap;
          .input-group-prepend {
            white-space: nowrap;
            width: 162px;
            text-align: end;
          }
        }
      }
      .bottom_fixed {
        padding: 0 30%;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .info_wrap {
      padding: 1% 5% 0;
      .input-group-prepend {
        margin-bottom: 5px;
      }
      .check_section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 5px;
        margin-left: 0 !important;
        .form-check {
          gap: 5px;
          padding: 0;
          input {
            width: 15px;
            padding: 0;
            height: 15px;
            border-radius: 50%;
          }
          label {
            color: white;
            font-weight: 600;
          }
        }
      }
      .input-group {
        flex-direction: column;
        input {
          width: 100%;
        }

        .form-control {
          margin-left: unset !important;
        }
      }
      .bottom_fixed {
        padding: 10px 16%;
        .input-group {
          flex-direction: row;
          input {
            width: 1%;
          }
        }

        button {
          margin-left: unset;
        }
      }
    }
    .info_wrap:nth-child(3) {
      margin-top: 3%;
      .content {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}


</style>