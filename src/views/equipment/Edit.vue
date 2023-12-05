<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>更換設備</h1>
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
            <div class="input-group-prepend">產編：</div>
            <input type="text" class="form-control text-center readonly_box" v-model="details.IntegrationId" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>名稱：</div>
            <input type="text" class="form-control text-center" v-model="details.IntegrationName" placeholder="最多輸入20字" />
          </div>
        </div>
        <div class="row row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex">儲位區域：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName">
                          {{ details.AreaName || '請選擇' }}
                        </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item" @click="selectArea(item)">{{ item.Name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex">儲位櫃位：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="details.AreaName === '' || details.AreaName === null">
                          {{ details.LayerName || LayerInit }}
                        </button>
                <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                  <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item" @click="selectLayer(item)">{{ item.Name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保管人員：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {{ details.Custodian || '請選擇' }}
                        </button>
                <div class="dropdown-menu">
                  <p v-for="(item, index) in DropdownArray.Custodian" :key="index" class="dropdown-item" @click="selectAccount(item)">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合人員：</div>
              <input type="text" class="form-control readonly_box" v-model="details.Integrator" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合日期：</div>
              <input type="text" class="form-control readonly_box" v-model="details.IntegrateDate" readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p><span>*</span>整合箱內容物(請至少新增一項)</p>
        </div>
      </div>
      <div class="content">
        <div class="search_section">
          <div class="row row_wrap">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
              <div class="input-group mb-3">
                <div class="input-group-prepend flex">設備總類：</div>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                            {{ searchParams.EquipTypeName || '請選擇' }}
                          </button>
                  <div class="dropdown-menu" aria-labelledby="typeDropdown">
                    <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item" @click="selectType(item)">{{ item.Name }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
              <div class="input-group mb-3">
                <div class="input-group-prepend flex">設備分類：</div>
                <div class="dropdown">
                  <button style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap' class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(searchParams.EquipTypeName !== '') }">
                            {{ searchParams.EquipCategoryName || EquipCategoryInit }}
                          </button>
                  <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                    <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item" @click="selectCategory(item)">{{ item.Name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn_section">
            <button class="send_btn" data-bs-toggle="modal" data-bs-target="#searchModal" @click="searchInventory('','search','add')">搜索庫存</button>
            <!-- Modal -->
            <div class="modal fade" data-bs-backdrop="static" id="searchModal" tabindex="-1">
              <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="fixed_info">
                      <div>
                        <p>檢索資產</p>
                      </div>
                      <button type="button" class="close" id="close-modal" data-bs-dismiss="modal">x</button>
                    </div>
                    <div class='second_content'>
                      <div class='wrap1'>
                        <div class='col-xl-3 col-lg-3 col-md-3 col-12' style='padding-left:0'>
                          <p>設備總類</p>
                          <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                                      {{ searchParams.EquipTypeName || '請選擇' }}
                                    </button>
                            <div class="dropdown-menu" aria-labelledby="typeDropdown">
                              <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item" @click="selectType(item)">{{ item.Name }}</p>
                            </div>
                          </div>
                        </div>
                        <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                          <p>設備分類</p>
                          <div class="dropdown">
                            <button style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap' class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="{ disabled: !(searchParams.EquipTypeName !== '') }">
                                      {{ searchParams.EquipCategoryName || EquipCategoryInit }}
                                    </button>
                            <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                              <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item" @click="selectCategory(item)">{{ item.Name }}</p>
                            </div>
                          </div>
                        </div>
                        <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                          <p>物品名稱</p>
                          <input type="text" class="form-control text-center" placeholder="最多輸入20字" v-model="searchParams.ProductName" />
                        </div>
                      </div>
                      <div class='col d-flex justify-content-center'>
                        <button class="btn submit_btn" type="button" @click="searchInventory('','search')">搜尋庫存</button>
                      </div>
                    </div>
                  </div>
                  <div class="fixed_info">
                    <div>
                      <p>目前資產庫存</p>
                    </div>
                  </div>
                  <DataTable lazy :key="datagrid.key" :first="datagrid.first" :size="'small'" :loading="datagrid.loading" :value="rowData" :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px"
                    @page="searchInventory($event , 'page')" @sort="searchInventory($event , 'sort')" :rows="datagrid.rows" :totalRecords="datagrid.totalRecords" paginator paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                    <Column style="min-width: 60px;">
                      <template #body="slotProps">
                            <AssetsView :params = "slotProps" />
</template>
                  </Column>
                  <Column style="min-width: 60px;" header="選擇">
<template #body="slotProps">
  <Equipment_add :params="slotProps" :action="action" @addAssetList="addAssetList" @editAssetList="editAssetList" />
</template>
                  </Column>
                  <Column style="min-width: 80px;"  header="數量">
<template #body="slotProps">
  <Equipment_number :params="slotProps" />
</template>
                  </Column>
                  <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item_wrap">
          <list-item v-for="(item, index) in formParams.AssetList" :key="index" :edit_btn="true" :delete_btn="true" :AssetData="item" @editAction="handleEdit" @deleteId="handleDelete">
          </list-item>
        </div>
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
  import {
    getEquipType,
    getEquipCategory,
    getArea,
    getLayer,
    getAccount,
GetAntiForgeryToken
  } from '@/assets/js/common_api'
  import {
    UpdatePageParameter,
    createDatagrid,
    goBack
  } from "@/assets/js/common_fn";
  import ListItem from "@/components/Equipment/item.vue"
  import Navbar from "@/components/Navbar.vue";
  import {
    onMounted,
    ref,
    reactive,
  } from "vue";
  import {
    useRoute,
    useRouter
  } from "vue-router";
import axios from 'axios';
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
      const route = useRoute();
      const router = useRouter();
      const details = ref({});
      const Integration = reactive({ //整合人員、日期
        IntegrationId: route.query.search_id,
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
      const EquipCategoryInit = ref('請先選擇設備總類');
      const LayerInit = ref('請先選擇區域');
      const ChangeParams = reactive({
        id: '',
        index: -1,
        exist: false,
      });
      const formParams = reactive({
        IntegrationId: '',
        IntegrationName: '',
        AreaName: '',
        Area_Id: '',
        LayerName: '',
        Layer_Id: '',
        Custodian: '',
        AssetList: [],
        DeleteList: [],
      })
      const action = ref('');
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
        getAccountName();
        getDetails();
      });
      async function getDetails() {
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetIntegrationBoxInfo?id=${Integration.IntegrationId}`);
          // console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            details.value = data.resultList;
            details.value.AssetList.forEach(item => {
              item.exist = true;
              item.error_msg = '';
            });
            if (details.value.AreaName) {
              getLayerName()
            }
            formParams.AssetList =  details.value.AssetList;
            // console.log('details', details.value.AssetList);
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
        getLayer(details.value.Area_Id)
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
        const axios = require('axios');
        try {
          const form = new FormData();
          
          form.append('IntegrationId', Integration.IntegrationId);
          form.append('EquipType_Id', searchParams.EquipType_Id);
          form.append('Category_Id', searchParams.Category_Id);
          form.append('ProductName', searchParams.ProductName);
          form.append('AssetList', JSON.stringify(formParams.AssetList));
          UpdatePageParameter(datagrid, event, type, form);
          const token = await GetAntiForgeryToken();
          const response = await axios.post('http://192.168.0.177:7008/IntegrationMng/SearchInventory', form,{
            headers:{
              'RequestVerificationToken': token,
            }
          });
          const data = response.data;
          if (data.state === 'success') {
            // console.log('資產搜尋成功 資料如下\n', data.resultList);
            // 取得資料
            rowData.value = data.resultList.rows;
            rowData.value.forEach(item=>{
              item.selectNumber = item.OM_Number;
            })
            datagrid.totalRecords = data.resultList.total;
            datagrid.key++;
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
        console.log(details.value);
        // 檢查必填項目
        if (!details.value.IntegrationName || details.value.AssetList.length === 0) {
          alert('請填寫所有必填項目');
          return;
        }
        if (!/^.{1,20}$/.test(details.value.IntegrationName)) {
          alert('設備箱名稱不可輸入超過20字');
          return
        }
        const axios = require('axios');
        let requestData = {
          IntegrationId: details.value.IntegrationId,
          IntegrationName: details.value.IntegrationName,
          Area_Id: details.value.Area_Id,
          Layer_Id: details.value.Layer_Id,
          Custodian: details.value.Custodian,
          AssetList: formParams.AssetList,
        };
        try {
          const token = await GetAntiForgeryToken();
          const response = await axios.post('http://192.168.0.177:7008/IntegrationMng/ChangeEquipment', requestData,{
            headers:{
              'RequestVerificationToken': token,
            }
          });
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
            console.error('error state', data.resultList);
            // 先將所有項目變回正常色、警告字串初始化
            details.value.AssetList.forEach((item) => {
              item.Failed = false
              item.error_msg = ''
            });
            // 再將不足的物品HILIGHT成紅色、變更警告字串
            data.resultList.forEach((item) => {
              const index = details.value.AssetList.findIndex(list => list.AssetsId === item.AssetsId)
              if (index != -1) {
                details.value.AssetList[index].Failed = true;
                details.value.AssetList[index].error_msg = '　目前庫存量：' + item.Number;
              }
            });
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
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
        EquipCategoryInit.value = '請選擇';
      }
      function selectCategory(item) {
        searchParams.EquipCategoryName = item.Name;
        searchParams.Category_Id = item.Id;
      }
      function selectArea(item) {
        details.value.AreaName = item.Name;
        details.value.Area_Id = item.Id;
        details.value.LayerName = '';
        details.value.Layer_Id = '';
        getLayerName();
        LayerInit.value = '請選擇';
      };
      function selectLayer(item) {
        details.value.LayerName = item.Name;
        details.value.Layer_Id = item.Id;
      };
      const selectAccount = (item) => {
        details.value.Custodian = item;
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
            EquipTypeName: data.EquipTypeName,
            EquipCategoryName: data.EquipCategoryName,
            Failed: false,
            error_msg: '',
          })
        }
        console.log(formParams.AssetList);
        // 處理完AssetList後更新rowData
        searchInventory('', 'search', 'add')
      }
      function editAssetList(data) {
        // 更改
        formParams.AssetList[ChangeParams.index] = {
          AssetsId: data.AssetsId,
          Number: data.selectNumber,
          AssetName: data.AssetName,
          EquipTypeName: data.EquipTypeName,
          EquipType_Id: data.EquipType_Id,
          EquipCategoryName: data.EquipCategoryName,
          Category_Id: data.Category_Id,
          Failed: false,
        };
        console.log('edited AssetList:', formParams.AssetList);
        // 
        const element = document.querySelector('#close-modal');
        // console.log(element);
        element.click();
        searchInventory('', 'search', 'edit')
      }
      function handleDelete(data) {
        // console.log(data);
        let deleteIndex = -1;
          // 資料庫已存在資料欲刪除
          deleteIndex = formParams.AssetList.findIndex(item => item.AssetsId === data.AssetsId);
          formParams.AssetList.splice(deleteIndex, 1);
      }
      function handleEdit(data) {
        console.log('欲被替換data', data);
        const editIndex = details.value.AssetList.findIndex(item => item.AssetsId === data.AssetsId)
        ChangeParams.id = data.AssetsId;
        ChangeParams.index = editIndex;
        // 預帶入變更資產之設備總類、分類
        searchParams.EquipTypeName = data.EquipTypeName
        searchParams.EquipType_Id = data.EquipType_Id
        searchParams.EquipCategoryName = data.EquipCategoryName
        searchParams.Category_Id = data.Category_Id
        getEquipCategoryName();
        searchInventory('', 'search', 'edit')
      }
      return {
        details,
        Integration,
        searchParams,
        DropdownArray,
        LayerInit,
        EquipCategoryInit,
        formParams,
        action,
        datagrid,
        datagridfield,
        rowData,
        getEquipTypeName,
        getAreaName,
        searchInventory,
        submit,
        selectType,
        selectCategory,
        selectArea,
        selectLayer,
        selectAccount,
        addAssetList,
        editAssetList,
        handleDelete,
        handleEdit,
        goBack,
      };
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  span {
    @include red_star
  }
  .modal-body {
    padding: 0 !important;
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 80px;
        margin-bottom: 40px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        width: 700px;
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
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
          }
          .dropdown {
            width: 100%;
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
              }
            }
            button {
              @include dropdown-btn;
              width: 100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            justify-content: right;
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 100px;
              text-align: end;
            }
          }
          .search_section {
            background: #B5C9D0;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 40px;
            .input-group-prepend {
              color: black;
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
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 28%;
          margin-bottom: 5%;
          gap: 20px;
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
        .dropdown {
          width: calc(100% - 10%);
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
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .info_wrap:nth-child(3) {
        margin-top: 3%;
        .count {
          .input-group {
            justify-content: left
          }
          .btn_section {
            margin-left: 10px;
            .delete_btn {
              display: flex;
              align-items: center;
              @include delete_button;
              height: 100%;
              padding: 5px;
              &:hover {
                background: #FF7272
              }
            }
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
          font-size: 20px;
          margin-bottom: 0 !important
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
        background: #D9D9D9;
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
          } // .dropdown {
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
    .change_btn {
      @include change_btn
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 80px;
        margin-bottom: 40px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        padding: 0 5%;
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
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
          }
          .dropdown {
            width: 100%;
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
              }
            }
            button {
              @include dropdown-btn;
              width: 100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            justify-content: right;
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 100px;
              text-align: end;
            }
          }
          .search_section {
            background: #B5C9D0;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            .input-group-prepend {
              color: black;
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
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 28%;
          margin-bottom: 5%;
          gap: 20px;
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
        .dropdown {
          width: calc(100% - 10%);
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
        margin-top: 3%;
        .count {
          .input-group {
            justify-content: left
          }
          .btn_section {
            margin-left: 10px;
            .delete_btn {
              display: flex;
              align-items: center;
              @include delete_button;
              height: 100%;
              padding: 5px;
              &:hover {
                background: #FF7272
              }
            }
          }
        }
      }
      .item_wrap {
        height: 350px;
        overflow: auto;
        .item {
          background-color: #526F8E;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
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
        border-radius: 0 !important;
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
        background: #D9D9D9;
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
          } // .dropdown {
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
    .change_btn {
      @include change_btn
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 50px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 1% 5% 0;
        .fixed_title {
          @include fixed_title;
        }
        .fixed_info {
          @include fixed_info;
          flex-direction: column;
          height: unset;
          padding: 10px;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .row {
            gap: 10px 0;
          }
          .dropdown {
            margin-left: unset !important;
            .dropdown-menu {
              width: 100%;
            }
            button {
              @include dropdown-btn;
              width: 100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            flex-direction: column;
            .input-number {
              @include count_btn;
              width: 100%;
            }
            .form-control {
              width: 100%;
              height: 35px;
              border-radius: 0;
              margin-left: unset !important;
            }
            .input-group-prepend {
              margin-bottom: 5px;
              color: white;
              font-weight: 700;
              font-size: 20px;
            }
          }
          .search_section {
            background: #B5C9D0;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            .input-group-prepend {
              color: black;
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
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 15%;
          margin-bottom: 5%;
          gap: 10px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          button.send_btn {
            @include search_and_send_btn;
            padding: 5px;
            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .info_wrap:nth-child(3) {
        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset !important;
          border-radius: 5px;
        }
        margin-top: 3%;
        .count {
          .number-input-box {
            width: 100%;
            margin-left: unset !important;
          }
          .btn_section {
            margin-left: 10px;
            .delete_btn {
              display: flex;
              align-items: center;
              @include delete_button;
              height: 100%;
              padding: 5px;
              width: 80px;
              font-size: 18px;
              &:hover {
                background: #FF7272
              }
            }
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
        border-radius: 0 !important;
        border: 1px solid black;
        border-bottom: unset !important;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 18px;
          margin-bottom: 0 !important
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
      .list {
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }
      .second_content {
        border-left: 1px solid black;
        border-right: 1px solid black;
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
          p.content {
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            background: white;
            height: 35px;
            border-radius: 5px;
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
              width: 100%;
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
      }
    }
    .change_btn {
      @include change_btn
    }
  }
</style>