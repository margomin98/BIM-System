<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>整合設備</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>設備整合箱</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span class='red_star'>*</span>產編：</div>
            <input type="text" class="form-control text-center" v-model="formParams.IntegrationId"
              placeholder="請輸入資產編號" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span class='red_star'>*</span>名稱：</div>
            <input type="text" class="form-control text-center" v-model="formParams.IntegrationName"
              placeholder="最多輸入20字" />
          </div>
        </div>
        <div class="row row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex">儲位區域：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" @click="getAreaName">
                  {{ formParams.AreaName || '請選擇' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item"
                    @click="selectArea(item)">{{ item.Name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex">儲位櫃位：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" :disabled="formParams.AreaName === ''">
                  {{ formParams.LayerName || LayerInit }}
                </button>
                <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                  <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item"
                    @click="selectLayer(item)">{{ item.Name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保管人員：</div>
              <select class="form-select" v-model="formParams.Custodian">
                <option value="">--請選擇--</option>
                <option v-for="option in DropdownArray.Custodian" :value="option">{{ option }}</option>
              </select>
              <!-- <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {{ formParams.Custodian || '請選擇' }}
                </button>
                <div class="dropdown-menu">
                  <p v-for="(item, index) in DropdownArray.Custodian" :key="index" class="dropdown-item"
                    @click="selectAccount(item)">{{ item }}</p>
                </div> -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合人員：</div>
              <input type="text" class="form-control readonly_box" v-model="Integration.Integrator" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合日期：</div>
              <input type="text" class="form-control readonly_box" v-model="Integration.IntegrateDate" readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p><span class='red_star'>*</span>整合箱內容物(請至少新增一項)</p>
        </div>
      </div>
      <div class="content">
        <div class="search_section">
          <div class="row row_wrap">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
              <div class="input-group mb-3">
                <div class="input-group-prepend flex">設備總類：</div>
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
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
              <div class="input-group mb-3">
                <div class="input-group-prepend flex">設備分類：</div>
                <div class="dropdown">
                  <button style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap'
                    class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown"
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
            </div>
          </div>
          <div class="btn_section">
            <button class="send_btn" data-bs-toggle="modal" data-bs-target="#searchModal"
              @click="searchInventory('', 'search', 'add')">搜索庫存</button>
            <!-- Modal -->
            <div class="modal fade" data-bs-backdrop="static" id="searchModal" tabindex="-1">
              <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="fixed_info">
                      <div>
                        <p>檢索資產</p>
                      </div>
                      <button type="button" class="close" data-bs-dismiss="modal">x</button>
                    </div>
                    <div class='second_content'>
                      <div class='wrap1'>
                        <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                          <p>設備總類</p>
                          <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" id="typeDropdown"
                              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                              @click="getEquipTypeName">
                              {{ searchParams.EquipTypeName || '請選擇' }}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="typeDropdown">
                              <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item"
                                @click="selectType(item)">{{ item.Name }}</p>
                            </div>
                          </div>
                        </div>
                        <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                          <p>設備分類</p>
                          <div class="dropdown">
                            <button style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap'
                              class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown"
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
                          <p>物品名稱</p>
                          <input type="text" class="form-control text-center" placeholder="最多輸入20字"
                            v-model="searchParams.ProductName" />
                        </div>
                      </div>
                      <div class='col d-flex justify-content-center'>
                        <button class="btn submit_btn" type="button"
                          @click="searchInventory('', 'search')">搜尋庫存</button>
                      </div>
                    </div>
                  </div>
                  <div class="fixed_info">
                    <div>
                      <p>目前資產庫存（請優先選擇存貨）</p>
                    </div>
                  </div>
                  <DataTable lazy :key="datagrid.key" :first="datagrid.first" :size="'small'"
                    :loading="datagrid.loading" :value="rowData" :sort-field="datagrid.sortField"
                    :sort-order="datagrid.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable
                    scrollHeight="420px" @page="searchInventory($event, 'page')" @sort="searchInventory($event, 'sort')"
                    paginator :rows="datagrid.rows" :totalRecords="datagrid.totalRecords"
                    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                    <Column style="min-width: 60px;">
                      <template #body="slotProps">
                        <AssetsView :params="slotProps" />
                      </template>
                    </Column>
                    <Column style="min-width: 60px;" header="選擇">
                      <template #body="slotProps">
                        <Equipment_add :params="slotProps" :action="action" @addAssetList="addAssetList" />
                      </template>
                    </Column>
                    <Column style="min-width: 100px;" header="數量">
                      <template #body="slotProps">
                        <Equipment_number :params="slotProps" />
                      </template>
                    </Column>
                    <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable
                      :style="{ 'min-width': item.width }"></Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PerfectScrollbar>
          <div class="item_wrap">
            <list-item v-for="(item, index) in formParams.AssetList" :key="index" :edit_btn="false" :delete_btn="true"
              :AssetData="item" @deleteId="handleDelete">
            </list-item>
          </div>
        </PerfectScrollbar>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AssetsView from "@/components/Rent_process_new_view_button";
import Equipment_add from "@/components/Equipment_add_button";
import Equipment_number from "@/components/Equipment_number_input.vue";
import ListItem from "@/components/Equipment/item.vue"
import Navbar from "@/components/Navbar.vue";
import {
  getEquipType,
  getEquipCategory,
  getArea,
  getLayer,
  getApplication,
  getAccount,
} from '@/assets/js/common_api'
import {
  UpdatePageParameter,
  createDatagrid,
  getDate,
  goBack
} from "@/assets/js/common_fn";
import {
  onMounted,
  ref,
  reactive,
} from "vue";
import {
  useRouter
} from "vue-router";
import axios from '@/axios/tokenInterceptor';
export default {
  components: {
    Navbar,
    DataTable,
    Column,
    AssetsView,
    Equipment_add,
    Equipment_number,
    ListItem,
  },
  setup() {
    const router = useRouter();
    const Integration = reactive({ //整合人員、日期
      Integrator: '',
      IntegrateDate: '',
    })
    const searchParams = reactive({ //搜尋參數
      EquipTypeName: '',
      EquipType_Id: '',
      EquipCategoryName: '',
      Category_Id: '',
      ProductName: '',
      Action: '',
    })
    const DropdownArray = reactive({
      EquipType: [],
      EquipCategory: [],
      Custodian: [],
      Area: [],
      Layer: [],
    })
    const formParams = reactive({
      IntegrationId: '',
      IntegrationName: '',
      AreaName: '',
      Area_Id: '',
      LayerName: '',
      Layer_Id: '',
      Custodian: '',
      AssetList: [],
    })
    const action = ref('');
    const EquipCategoryInit = ref('請先選擇設備總類');
    const LayerInit = ref('請先選擇區域');
    const datagrid = createDatagrid();
    const datagridfield = [{
      field: "OM_Unit",
      width: '100px',
      header: "單位"
    },
    {
      field: "AssetsId",
      width: '180px',
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
      width: '160px',
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
    },
    ]
    const rowData = ref([]);
    onMounted(() => {
      getApplicationInfo();
      getAccountName();
      Integration.IntegrateDate = getDate();
    });
    async function getApplicationInfo() {
      getApplication()
        .then((data) => {
          Integration.Integrator = data;
        })
        .catch((error) => {
          console.error(error);
        })
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
      getLayer(formParams.Area_Id)
        .then((data) => {
          DropdownArray.Layer = data;
        })
        .catch((error) => {
          console.error(error);
        })
    }
    async function getAccountName() {
      getAccount('')
        .then((data) => {
          DropdownArray.Custodian = data;
        })
        .catch((error) => {
          console.error(error);
        })
    }
    async function searchInventory(event, type, Action) {
      if (Action) {
        // 更新+按鈕的行為
        action.value = Action;
      }
      // 檢查物品名稱字數
      searchParams.ProductName = searchParams.ProductName.trim();
      if (!/^.{0,20}$/.test(searchParams.ProductName)) {
        alert('物品名稱不可輸入超過20字')
        return
      }
      try {
        const form = new FormData();
        form.append('EquipType_Id', searchParams.EquipType_Id);
        form.append('Category_Id', searchParams.Category_Id);
        form.append('ProductName', searchParams.ProductName);
        form.append('AssetList', JSON.stringify(formParams.AssetList));
        UpdatePageParameter(datagrid, event, type, form);
        const response = await axios.post('https://localhost:44302/IntegrationMng/SearchInventory', form);
        const data = response.data;
        if (data.state === 'success') {
          // 取得資料
          // console.log('search result:',data.resultList);
          rowData.value = data.resultList.rows;
          rowData.value.forEach(item => {
            item.selectNumber = item.OM_Number;
          })
          datagrid.totalRecords = data.resultList.total;

          datagrid.key++;
        } else if (data.state === 'error') {
          alert(data.messages);
        }
      } catch (error) {
        console.error(error);
      }
    }
    async function submit() {
      // console.log(details.value);
      // 檢查必填項目
      if (!formParams.IntegrationId || !formParams.IntegrationName || formParams.AssetList.length === 0) {
        alert('請填寫所有必填項目');
        return;
      }
      if (!/^.{1,20}$/.test(formParams.IntegrationName)) {
        alert('設備箱名稱不可輸入超過20字');
        return
      }
      if (!/^(BF\d{8})$/.test(formParams.IntegrationId)) {
        alert('資產編號格式錯誤');
        return
      }
      // 檢查設備箱產編是否被使用過
      if (await checkAssetsIdRepeat()) {
        return
      }
      // 送出
      let requestData = {};
      for (const keyname in formParams) {
        if (formParams[keyname]) {
          requestData[keyname] = formParams[keyname]
        }
      }
      try {
        const response = await axios.post('https://localhost:44302/IntegrationMng/Integrate', requestData);
        const data = response.data;
        console.log(data);
        if (data.state === 'success') {
          let msg = data.messages;
          msg += '\n單號:' + data.resultList.B_Id;
          alert(msg);
          router.push({
            name: 'Equipment_Datagrid'
          });
        } else if (data.state === 'error') {
          alert(data.messages);
          console.log('error state', response);
          // 先將所有項目變回正常色、警告字串初始化
          formParams.AssetList.forEach((item) => {
            item.Failed = false
            item.error_msg = ''
          });
          // 再將不足的物品HILIGHT成紅色、變更警告字串
          data.resultList.forEach((item) => {
            const index = formParams.AssetList.findIndex((list) => {
              list.AssetsId === item.AssetsId
            })
            if (index != -1) {
              formParams.AssetList[index].Failed = true;
              formParams.AssetList[index].error_msg = '　目前庫存量：' + item.Number;
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    async function checkAssetsIdRepeat() {
      const repeatForm = new FormData();
      repeatForm.append('assetsIds', formParams.IntegrationId);
      const response = await axios.post('https://localhost:44302/GetDBdata/CheckAssetsInID', repeatForm);
      try {
        const data = response.data;
        if (data.state === 'error') {
          alert('此資產編號已使用過');
          return true;
        }
      } catch (error) {
        console.error(error);
      }
      return false;
    }
    function addAssetList(data) {
      let exist = false;
      // 重複項目直接將數量疊上
      formParams.AssetList.forEach(item => {
        if (item.AssetsId === data.AssetsId) {
          item.Number += data.selectNumber;
          exist = true;
        }
      })
      // 新的項目插入至最前方
      if (!exist) {
        formParams.AssetList.splice(0, 0, {
          AssetsId: data.AssetsId,
          Number: data.selectNumber,
          AssetName: data.AssetName,
          Failed: false,
          error_msg: '',
        })
      }
      // 處理完AssetList後更新rowData
      searchInventory('', 'search', 'add')
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
      formParams.AreaName = item.Name;
      formParams.Area_Id = item.Id;
      formParams.LayerName = '';
      formParams.Layer_Id = '';
      getLayerName();
      LayerInit.value = '請選擇';
    };
    function selectLayer(item) {
      formParams.LayerName = item.Name;
      formParams.Layer_Id = item.Id;
    };
    const selectAccount = (item) => {
      formParams.Custodian = item;
    }
    function handleDelete(data) {
      const deleteIndex = formParams.AssetList.findIndex(item => item.AssetsId === data.AssetsId)
      formParams.AssetList.splice(deleteIndex, 1);
    }


    return {
      Integration,
      searchParams,
      DropdownArray,
      formParams,
      action,
      LayerInit,
      EquipCategoryInit,
      datagrid,
      datagridfield,
      rowData,
      getEquipTypeName,
      getAreaName,
      searchInventory,
      submit,
      addAssetList,
      selectType,
      selectCategory,
      selectArea,
      selectLayer,
      selectAccount,
      handleDelete,
      goBack,
    };
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";


.readonly_box {
  @include readonly_box;
}

.modal-body {
  padding: 0 !important;
}

.ps {
  height: 350px
}

.item_wrap {
  display: grid;
  gap: 20px 0;
}

.main_section {
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

    .dropdown {
      width: 100%;
      @include dropdown_btn;

      .dropdown-menu {
        width: 100%;
      }

      button {
        width: 100%;
        color: black;
        justify-content: space-between;
        align-items: center;
      }
    }

    select {
      width: 100%;
    }

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

  .info_wrap:nth-child(3) {
    margin-top: 3%;
  }

  .info_wrap {
    .item_wrap {
      .item {
        background-color: #526f8e;
        border-radius: 10px;
        padding: 20px;
      }

      .failed_storage {
        background-color: #8a2828;
        border: 1px solid white;
      }
    }
  }

  .info_wrap:nth-child(3) {
    .count {
      .btn_section {
        margin-left: 10px;

        .delete_btn {
          display: flex;
          align-items: center;
          @include content_delete_button;
          height: 100%;
          padding: 5px;

          &:hover {
            background: #ff7272;
          }
        }
      }
    }
  }
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;

  button.back_btn {
    @include back_to_previous_btn;

    &:hover {
      background-color: #5d85bb;
    }
  }

  button.send_btn {
    @include search_and_send_btn;

    &:hover {
      background-color: #5e7aa2;
    }
  }
}

.search_section {
  background: #b5c9d0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;

  .input-group-prepend {
    color: black !important;
  }

  .btn_section {
    display: flex;
    justify-content: center;

    button.send_btn {
      @include search_and_send_btn;
      font-size: 18px;
      padding: 5px;

      &:hover {
        background-color: #5e7aa2;
      }
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
    background: #528091 !important;
    border-bottom: unset !important;
    border-radius: 0 !important;
    border: 1px solid black;
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
    background: #d9d9d9;

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
      display: flex;
      justify-content: center;
      border-top: 1px solid black;

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

      .dropdown-toggle {
        padding: 5px 10px;
      }

      // .dropdown {
      //   button {
      //     background: white;
      //     width: 100%;
      //     border: none;
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //   }
      //   .dropdown-menu {
      //     width: 225px;
      //     .dropdown-item {
      //       text-align: left;
      //     }
      //   }
      // }
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

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      margin: auto;
      width: 700px;

      .content {
        p {
          text-align: center;
          white-space: nowrap;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
          color: white;
        }

        .dropdown {
          .dropdown-menu {
            p {
              text-align: left;
              padding: 0 10px;
            }
          }
        }

        .input-group {
          justify-content: right;
          flex-wrap: nowrap;

          .input-group-prepend {
            white-space: nowrap;
            width: 100px;
            text-align: end;
          }
        }
      }

      .dropdown {

        height: 35px;
        @include dropdown_btn;

        .dropdown-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none;
        }

        .dropdown-menu {
          width: 100%;
          transform: translate3d(-1px, 35px, 0px) !important;
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
        }
      }
    }

    .info_wrap:nth-child(3) {
      .count {
        .input-group {
          justify-content: left;
        }
      }
    }
  }

  .modal {
    padding: 0 5%;

    .fixed_info {
      p {
        font-size: 20px;
      }
    }

    .second_content {
      .wrap1 {
        padding: 10px 80px;

        //  .dropdown {
        //   button {
        //     background: white;
        //     width: 100%;
        //     border: none;
        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //   }
        //   .dropdown-menu {
        //     width: 225px;
        //     .dropdown-item {
        //       text-align: left;
        //     }
        //   }
        // }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      margin: auto;
      padding: 0 5%;

      .content {
        p {
          text-align: center;
          white-space: nowrap;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
          color: white;
        }

        .dropdown {
          .dropdown-menu {
            p {
              text-align: left;
              padding: 0 10px;
            }
          }
        }

        .input-group {
          justify-content: right;
          flex-wrap: nowrap;

          .input-group-prepend {
            white-space: nowrap;
            width: 100px;
            text-align: end;
          }
        }
      }

      .dropdown {
        height: 35px;
        @include dropdown_btn;

        .dropdown-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none;
        }

        .dropdown-menu {
          width: 100%;
          transform: translate3d(-1px, 35px, 0px) !important;
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
        }
      }
    }

    .info_wrap:nth-child(3) {
      .count {
        .input-group {
          justify-content: left;
        }
      }
    }
  }

  .modal {
    .fixed_info {
      p {
        font-size: 20px;
      }
    }

    .second_content {
      .wrap1 {
        padding: 10px 80px;

        // .dropdown {
        //   button {
        //     background: white;
        //     width: 100%;
        //     border: none;
        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //   }
        //   .dropdown-menu {
        //     width: 225px;
        //     .dropdown-item {
        //       text-align: left;
        //     }
        //   }
        // }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {

    .info_wrap {
      padding: 1% 5% 0;

      .content {
        select {
          margin-left: unset !important;
        }

        .dropdown {
          margin-left: unset !important;

          .dropdown-menu {
            padding: 0;
            transform: translate3d(0, 35px, 0px) !important;
          }
        }

        .input-group {
          flex-direction: column;

          .input-number {
            width: 100%;
          }

          .form-control {
            width: 100%;
            margin-left: unset !important;
          }

          .input-group-prepend {
            margin-bottom: 5px;
          }
        }
      }
    }

    .info_wrap:nth-child(3) {
      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: unset !important;
        border-radius: 5px;
      }

      .count {
        .number-input-box {
          width: 100%;
          margin-left: unset !important;
        }

        .btn_section {
          .delete_btn {
            width: 80px;
            font-size: 18px;
          }
        }
      }
    }
  }

  .modal {
    padding: 0 5%;

    .fixed_info {
      p {
        font-size: 18px;
      }

      button {
        border: none;
        background: none;
        color: white;
        font-weight: 700;
        font-size: 22px;
        position: absolute;
        right: 3%;
        top: 1%;
        padding: 0;
      }
    }

    .second_content {
      .wrap1 {
        padding: 20px;
        flex-direction: column;
        gap: 6px 0;
        // .dropdown {
        //   button {
        //     background: white;
        //     width: 100%;
        //     border: none;
        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //   }

        //   .dropdown-menu {
        //     width: 100%;

        //     .dropdown-item {
        //       text-align: left;
        //     }
        //   }
        // }

        div {
          margin: 5px 0;
        }
      }
    }
  }

}
</style>