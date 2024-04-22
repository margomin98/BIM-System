<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>參數管理</h1>
    </div>
    <div class="info_wrap col">
      <div class="tab_section mt-2">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="equipment-tab" data-bs-toggle="tab" data-bs-target="#equipment"
              type="button" role="tab" aria-controls="equipment" aria-selected="true">設備總類</button>
            <button class="nav-link" id="storage-tab" data-bs-toggle="tab" data-bs-target="#equipmentCategory"
              type="button" role="tab" aria-controls="storage" aria-selected="false">設備分類</button>
            <button class="nav-link " id="equipment-tab" data-bs-toggle="tab" data-bs-target="#storage" type="button"
              role="tab" aria-controls="equipment" aria-selected="true">儲位區域</button>
            <button class="nav-link" id="storage-tab" data-bs-toggle="tab" data-bs-target="#storageLocation" type="button"
              role="tab" aria-controls="storage" aria-selected="false">儲位櫃位</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <!-- 設備總類tab -->
          <div class="tab-pane fade show active" id="equipment" role="tabpanel" aria-labelledby="equipment-tab"
            tabindex="0">
            <div class='row g-0'>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 grid'>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%" class="ag-theme-alpine" :rowDragManaged="true"
                    :suppressMoveWhenRowDragging="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs"
                    :rowData="rowData1" @rowDragEnd="onRowDragEnd('EquipTypeName', $event)" @grid-ready="dataApi1">
                  </ag-grid-vue>
                </div>
              </div>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
                <p>新增設備總類</p>
                <div class='d-flex  search_wrap'>
                  <input class="form-control" aria-label="With textarea" placeholder='最多輸入10字'
                    v-model="newParams.EquipType">
                  <button type="button" @click="insertNewType('EquipTypeName')">新增</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 設備分類tab -->
          <div class="tab-pane fade" id="equipmentCategory" role="tabpanel" aria-labelledby="storage-tab" tabindex="0">
            <div class='row g-0'>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 grid'>
                <div class="col search_dropdown d-flex">
                  <p>設備總類</p>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                      {{ EquipTypeName || '請選擇' }}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="typeDropdown">
                      <p v-for="(item, index) in EquipTypeArray" :key="index" class="dropdown-item"
                        @click="selectType(item)">{{ item.Name }}</p>
                    </div>
                  </div>
                </div>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%; height: 450px" class="ag-theme-alpine" :rowDragManaged="true"
                    :suppressMoveWhenRowDragging="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs"
                    :rowData="rowData2" @rowDragEnd="onRowDragEnd('EquipCategoryName', $event)" @grid-ready="dataApi2">
                  </ag-grid-vue>
                </div>
              </div>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
                <p>新增設備分類</p>
                <div class='d-flex'>
                  <input class="form-control" aria-label="With textarea" placeholder='最多輸入10字'
                    v-model="newParams.EquipCategory">
                  <button type="button" @click="insertNewType('EquipCategoryName')">新增</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 儲位區域tab -->
          <div class="tab-pane fade" id="storage" role="tabpanel" aria-labelledby="storage-tab" tabindex="0">
            <div class='row g-0'>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 grid'>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%; height: 450px" class="ag-theme-alpine" :rowDragManaged="true"
                    :suppressMoveWhenRowDragging="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs"
                    :rowData="rowData3" @rowDragEnd="onRowDragEnd('AreaName', $event)" @grid-ready="dataApi3">
                  </ag-grid-vue>
                </div>
              </div>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
                <p>新增儲位區域</p>
                <div class='d-flex'>
                  <input class="form-control" aria-label="With textarea" placeholder='最多輸入10字' v-model="newParams.Area">
                  <button type="button" @click="insertNewType('AreaName')">新增</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 儲位櫃位tab -->
          <div class="tab-pane fade" id="storageLocation" role="tabpanel" aria-labelledby="storage-tab" tabindex="0">
            <div class='row g-0'>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 grid'>
                <div class="col search_dropdown d-flex">
                  <p>儲位區域</p>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                      {{ AreaName || '請選擇' }}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="typeDropdown">
                      <p v-for="(item, index) in AreaArray" :key="index" class="dropdown-item" @click="selectArea(item)">
                        {{ item.Name }}</p>
                    </div>
                  </div>
                </div>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%; height: 450px" class="ag-theme-alpine" :rowDragManaged="true"
                    :suppressMoveWhenRowDragging="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs"
                    :rowData="rowData4" @rowDragEnd="onRowDragEnd('LayerName', $event)" @grid-ready="dataApi4">
                  </ag-grid-vue>
                </div>
              </div>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
                <p>新增儲位櫃位</p>
                <div class='d-flex'>
                  <input class="form-control" aria-label="With textarea" placeholder='最多輸入10字' v-model="newParams.Layer">
                  <button type="button" @click="insertNewType('LayerName')">新增</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div> -->
    </div>
    <!-- Edit Modal -->
    <div class="modal fade editModal" data-bs-backdrop="static" id="editModal" tabindex="-1"
      aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="fixed_info">
              <div>
                <p>修改名稱</p>
              </div>
              <div class="content">
                <input type="text" id="editInput" placeholder="最多輸入10字" v-model="editParams.input">
              </div>
              <div class="button_section">
                <button type="button" class="btn" data-bs-dismiss="modal">關閉</button>
                <button type="button" class="btn" data-bs-dismiss="modal" @click="editType">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Modal -->
    <div class="modal fade editModal2" data-bs-backdrop="static" id="editModal2" tabindex="-1"
      aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="fixed_info">
              <div>
                <p>確定刪除參數嗎?</p>
              </div>
              <div class="content">
                <!-- <input type="text" v-model="deleteParams.input" readonly disabled>  -->
                <span style="font-weight: 700;"> {{ deleteParams.input }} </span>
              </div>
              <div class="button_section">
                <button type="button" class="btn" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn" data-bs-dismiss="modal" @click="deleteType">確定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  AgGridVue
} from "ag-grid-vue3";
import Navbar from "@/components/Navbar.vue";
import Parameter_button from "@/components/Parameter_button";
import {
  onMounted,
  reactive,
  ref
} from "vue";
export default {
  components: {
    Navbar,
    AgGridVue,
    Parameter_button,
  },
  setup() {
    const newParams = reactive({
      EquipType: '',
      EquipCategory: '',
      Area: '',
      Layer: '',
    });
    const editParams = reactive({
      input: '',
      type: '',
      id: '',
    });
    const deleteParams = reactive({
      input: '',
      type: '',
      id: '',
    });
    const EquipTypeName = ref('');
    const EquipTypeId = ref('');
    const EquipTypeArray = ref([]);
    const AreaName = ref('');
    const AreaId = ref('');
    const AreaArray = ref([]);
    const columnDefs = [{
      field: "",
      cellRenderer: 'Parameter_button',
      cellRendererParams: {
        updateEditType: updateEditType,
        updateDeleteType: updateDeleteType,
      },
      width: 170,
      rowDrag: true
    },
    {
      field: "Name",
      flex: 1,
    }
    ]
    const rowData1 = ref([]);
    const rowData2 = ref([]);
    const rowData3 = ref([]);
    const rowData4 = ref([]);
    const grid = reactive({
      row1: null,
      row2: null,
      row3: null,
      row4: null,
    })
    function updateEditType(data) {
      editParams.input = data.Name;
      editParams.type = data.type;
      editParams.id = data.Id;
    }
    function updateDeleteType(data) {
      deleteParams.input = data.Name;
      deleteParams.type = data.type;
      deleteParams.id = data.Id;
    }
    onMounted(() => {
      getDataGrid('EquipTypeName');
      getDataGrid('AreaName');
    });
    // 讀取
    async function getDataGrid(type) {
      let apiUrl = '';
      const baseUrl = 'http://192.168.0.177:7008';
      const axios = require('axios');
      switch (type) {
        case 'EquipTypeName':
          apiUrl += baseUrl + '/GetParameter/EquipTypeParameter'
          break;
        case 'EquipCategoryName':
          apiUrl += baseUrl + '/GetParameter/EquipCategoryParameter?id=' + `${EquipTypeId.value}`
          break;
        case 'AreaName':
          apiUrl += baseUrl + '/GetParameter/AreaParameter'
          break;
        case 'LayerName':
          apiUrl += baseUrl + '/GetParameter/LayerParameter?id=' + `${AreaId.value}`
          break;
      }
      try {
        const response = await axios.get(`${apiUrl}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          switch (type) {
            case 'EquipTypeName':
              rowData1.value = data.resultList.TypeList;
              EquipTypeId.value = '';
              EquipTypeName.value = '';
              EquipTypeArray.value = [];
              data.resultList.TypeList.forEach(item => {
                EquipTypeArray.value.push(item);
              });
              rowData1.value.forEach(item => {
                item.type = 'EquipTypeName'
              })
              setTimeout(() => {
                grid.row1.setRowData(rowData1.value);
                grid.row2.setRowData([]);
              }, 50);
              break;
            case 'EquipCategoryName':
              rowData2.value = data.resultList.CategoryList;
              rowData2.value.forEach(item => {
                item.type = 'EquipCategoryName'
              })
              grid.row2.setRowData(rowData2.value)
              break;
            case 'AreaName':
              rowData3.value = data.resultList.AreaList;
              AreaId.value = '';
              AreaName.value = '';
              AreaArray.value = [];
              data.resultList.AreaList.forEach(item => {
                AreaArray.value.push(item);
              });
              rowData3.value.forEach(item => {
                item.type = 'AreaName'
              })
              setTimeout(() => {
                grid.row3.setRowData(rowData3.value);
                grid.row4.setRowData([]);
              }, 50);
              break;
            case 'LayerName':
              rowData4.value = data.resultList.LayerList;
              rowData4.value.forEach(item => {
                item.type = 'LayerName'
              })
              grid.row4.setRowData(rowData4.value)
              break;
          }
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
    // 移動
    async function onRowDragEnd(type, event) {
      const newRowIndex = event.overIndex;
      // console.log('newRowIndex', newRowIndex);
      const draggedData = event.node.data;
      // console.log('draggedData', draggedData);
      let originalIndex = -1;
      switch (type) {
        case 'EquipTypeName':
          originalIndex = rowData1.value.findIndex(item => item.Id === draggedData.Id);
          rowData1.value.splice(originalIndex, 1);
          rowData1.value.splice(newRowIndex, 0, draggedData);
          break;
        case 'EquipCategoryName':
          originalIndex = rowData2.value.findIndex(item => item.Id === draggedData.Id);
          rowData2.value.splice(originalIndex, 1);
          rowData2.value.splice(newRowIndex, 0, draggedData);
          break;
        case 'AreaName':
          originalIndex = rowData3.value.findIndex(item => item.Id === draggedData.Id);
          rowData3.value.splice(originalIndex, 1);
          rowData3.value.splice(newRowIndex, 0, draggedData);
          break;
        case 'LayerName':
          originalIndex = rowData4.value.findIndex(item => item.Id === draggedData.Id);
          rowData4.value.splice(originalIndex, 1);
          rowData4.value.splice(newRowIndex, 0, draggedData);
          break;
      }
      let apiUrl = '';
      const baseUrl = 'http://192.168.0.177:7008';
      const axios = require('axios');
      let requestData = {};
      switch (type) {
        case 'EquipTypeName':
          apiUrl = baseUrl + '/ParameterMng/EditEquipmentTypeIndex'
          requestData.TypeList = rowData1.value;
          break;
        case 'EquipCategoryName':
          apiUrl = baseUrl + '/ParameterMng/EditEquipmentCategoryIndex'
          requestData.CategoryList = rowData2.value;
          break;
        case 'AreaName':
          apiUrl = baseUrl + '/ParameterMng/EditAreaIndex'
          requestData.AreaList = rowData3.value;
          break;
        case 'LayerName':
          apiUrl = baseUrl + '/ParameterMng/EditLayerIndex'
          requestData.LayerList = rowData4.value;
          break;
      }
      try {
        const response = await axios.post(`${apiUrl}`, requestData);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          // switch (type) {
          //   case 'EquipTypeName':
          //     getDataGrid('EquipTypeName')
          //     break;
          //   case 'EquipCategoryName':
          //     getDataGrid('EquipCategoryName')
          //     break;
          //   case 'AreaName':
          //     getDataGrid('AreaName')
          //     break;
          //   case 'LayerName':
          //     getDataGrid('LayerName')
          //     break;
          // }
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
    // 編輯
    async function editType() {
      const type = editParams.type;
      const input = editParams.input.trim();
      const id = editParams.id;
      const axios = require('axios');
      const baseUrl = 'http://192.168.0.177:7008'
      let apiUrl = ''
      // 檢查輸入是否符合格式 1. 不為全空白 2. 字數<=10 
      if (!input) {
        alert('請輸入欲更改之名稱')
        return
      }
      if (!/^.{1,10}$/.test(input)) {
        alert('更改名稱不可超過10字')
        return
      }
      let requestData = {
        name: input,
      }
      switch (type) {
        case 'EquipTypeName':
          apiUrl += baseUrl + '/ParameterMng/EditEquipmentTypeName'
          requestData.TypeId = id;
          break;
        case 'EquipCategoryName':
          apiUrl += baseUrl + '/ParameterMng/EditEquipmentCategoryName'
          requestData.CategoryId = id;
          break;
        case 'AreaName':
          apiUrl += baseUrl + '/ParameterMng/EditAreaName'
          requestData.AreaId = id;
          break;
        case 'LayerName':
          apiUrl += baseUrl + '/ParameterMng/EditLayerName'
          requestData.LayerId = id;
          break;
      }
      try {
        const response = await axios.post(`${apiUrl}`, requestData);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          switch (type) {
            case 'EquipTypeName':
              getDataGrid('EquipTypeName')
              break;
            case 'EquipCategoryName':
              getDataGrid('EquipCategoryName')
              break;
            case 'AreaName':
              getDataGrid('AreaName')
              break;
            case 'LayerName':
              getDataGrid('LayerName')
              break;
          }
        }
        alert(data.messages);
      } catch (error) {
        console.error(error);
      }
    }
    // 新增
    async function insertNewType(type) {
      let apiUrl = '';
      const baseUrl = 'http://192.168.0.177:7008';
      const axios = require('axios');
      let requestData = {};
      switch (type) {
        case 'EquipTypeName':
          if (rowData1.value.length === 256) {
            alert('已達設備總類數量上限，請先刪除後再新增')
            return
          }
          newParams.EquipType = newParams.EquipType.trim();
          if (!newParams.EquipType) {
            alert('請輸入欲新增之名稱')
            return
          }
          if (!/^.{1,10}$/.test(newParams.EquipType)) {
            alert('新增名稱不可超過10字')
            return
          }
          apiUrl = baseUrl + '/ParameterMng/CreateEquipmentType'
          requestData.name = newParams.EquipType;
          break;
        case 'EquipCategoryName':
          if (!EquipTypeName.value) {
            alert('請先選擇設備總類')
            return
          }
          if (rowData2.value.length === 256) {
            alert('已達設備分類數量上限，請先刪除後再新增')
            return
          }
          newParams.EquipCategory = newParams.EquipCategory.trim();
          if (!newParams.EquipCategory) {
            alert('請輸入欲新增之名稱')
            return
          }
          if (!/^.{1,10}$/.test(newParams.EquipCategory)) {
            alert('新增名稱不可超過10字')
            return
          }
          apiUrl = baseUrl + '/ParameterMng/CreateEquipmentCategory'
          requestData.name = newParams.EquipCategory;
          requestData.TypeId = EquipTypeId.value;
          break;
        case 'AreaName':
          if (rowData3.value.length === 256) {
            alert('已達儲位區域數量上限，請先刪除後再新增')
            return
          }
          newParams.Area = newParams.Area.trim();
          if (!newParams.Area) {
            alert('請輸入欲新增之名稱')
            return
          }
          if (!/^.{1,10}$/.test(newParams.Area)) {
            alert('新增名稱不可超過10字')
            return
          }
          apiUrl = baseUrl + '/ParameterMng/CreateArea'
          requestData.name = newParams.Area;
          break;
        case 'LayerName':
          if (!AreaName.value) {
            alert('請先選擇儲位區域')
            return
          }
          if (rowData4.value.length === 256) {
            alert('已達儲位櫃位數量上限，請先刪除後再新增')
            return
          }
          newParams.Layer = newParams.Layer.trim();
          if (!newParams.Layer) {
            alert('請輸入欲新增之名稱')
            return
          }
          if (!/^.{1,10}$/.test(newParams.Layer)) {
            alert('新增名稱不可超過10字')
            return
          }
          apiUrl = baseUrl + '/ParameterMng/CreateLayer'
          requestData.name = newParams.Layer;
          requestData.AreaId = AreaId.value;
          break;
      }
      try {
        console.log('requsetData:', requestData);
        const response = await axios.post(`${apiUrl}`, requestData);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          switch (type) {
            case 'EquipTypeName':
              newParams.EquipType = '';
              getDataGrid('EquipTypeName')
              break;
            case 'EquipCategoryName':
              newParams.EquipCategory = '';
              getDataGrid('EquipCategoryName')
              break;
            case 'AreaName':
              newParams.Area = '';
              getDataGrid('AreaName')
              break;
            case 'LayerName':
              newParams.Layer = '';
              getDataGrid('LayerName')
              break;
          }
        }
        alert(data.messages);
      } catch (error) {
        console.error(error);
      }
    }
    // 刪除
    async function deleteType() {
      const type = deleteParams.type;
      const id = deleteParams.id;
      let apiUrl = '';
      const baseUrl = 'http://192.168.0.177:7008';
      const axios = require('axios');
      switch (type) {
        case 'EquipTypeName':
          apiUrl = baseUrl + '/ParameterMng/DeleteEquipmentType'
          break;
        case 'EquipCategoryName':
          apiUrl = baseUrl + '/ParameterMng/DeleteEquipmentCategory'
          break;
        case 'AreaName':
          apiUrl = baseUrl + '/ParameterMng/DeleteArea'
          break;
        case 'LayerName':
          apiUrl = baseUrl + '/ParameterMng/DeleteLayer'
          break;
      }
      try {
        const requestData = {
          DeleteId: id
        };
        const response = await axios.post(`${apiUrl}`, requestData);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          switch (type) {
            case 'EquipTypeName':
              getDataGrid('EquipTypeName')
              break;
            case 'EquipCategoryName':
              getDataGrid('EquipCategoryName')
              break;
            case 'AreaName':
              getDataGrid('AreaName')
              break;
            case 'LayerName':
              getDataGrid('LayerName')
              break;
          }
        }
        alert(data.messages);
      } catch (error) {
        console.error(error);
      }
    }
    const dataApi1 = (params) => {
      grid.row1 = params.api;
    };
    const dataApi2 = (params) => {
      grid.row2 = params.api;
    };
    const dataApi3 = (params) => {
      grid.row3 = params.api;
    };
    const dataApi4 = (params) => {
      grid.row4 = params.api;
    };
    const selectType = (item) => {
      EquipTypeId.value = item.Id
      EquipTypeName.value = item.Name;
      getDataGrid('EquipCategoryName');
    }
    const selectArea = (item) => {
      AreaId.value = item.Id;
      AreaName.value = item.Name;
      getDataGrid('LayerName');
    }
    return {
      newParams,
      editParams,
      deleteParams,
      EquipTypeName,
      EquipTypeId,
      EquipTypeArray,
      AreaName,
      AreaId,
      AreaArray,
      onRowDragEnd,
      editType,
      insertNewType,
      deleteType,
      columnDefs,
      rowData1,
      rowData2,
      rowData3,
      rowData4,
      dataApi1,
      dataApi2,
      dataApi3,
      dataApi4,
      selectType,
      selectArea,
    };
  },
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

#editInput {
  padding: 0 10px;
}

.editModal {
  .modal-content {
    border-radius: 0;
    margin: auto;
    width: 350px;

    .modal-body {
      border: 1px solid black;
      padding: 0 !important;

      p {
        border-bottom: 1px solid black;
        background: #528091;
        padding: 10px;
        text-align: center;
        font-weight: 700;
        color: white;
        font-size: 20px;
        margin-bottom: 0;
      }

      .content {
        padding: 20px 10px;
        display: flex;
        justify-content: center;
        background: #D9D9D9;

        input {
          border: none;
          border-radius: 10px;
          text-align: center;
        }
      }

      .button_section {
        background: #D9D9D9;
        display: flex;
        justify-content: center;
        gap: 0 10px;
        padding-bottom: 20px;

        :nth-child(1) {
          @include search_and_send_btn;
          font-size: 15px;
          width: 60px;
          height: 30px;
          padding: 6px 12px;
          background: #6C6C6C;
          border-radius: 7px;

          &:hover {
            background: #30343a;
            color: white
          }
        }

        :nth-child(2) {
          @include content_delete_button;
          font-size: 15px;
          width: 60px;
          height: 30px;
          background-color: #98CCD3;

          &:hover {
            background: #5979ab;
            color: white
          }
        }
      }
    }
  }
}

.editModal2 {
  .modal-content {
    border-radius: 0;
    margin: auto;
    width: 350px;

    .modal-body {
      border: 1px solid black;
      padding: 0;

      p {
        border-bottom: 1px solid black;
        background: #E94B4B;
        padding: 10px;
        text-align: center;
        font-weight: 700;
        color: white;
        font-size: 20px;
        margin-bottom: 0;
      }

      .content {
        padding: 20px 10px;
        display: flex;
        justify-content: center;
        background: #D9D9D9;

        input {
          border: none;
          border-radius: 10px;
          text-align: center;
        }
      }

      .button_section {
        background: #D9D9D9;
        display: flex;
        justify-content: center;
        gap: 0 10px;
        padding-bottom: 20px;

        :nth-child(1) {
          @include search_and_send_btn;
          font-size: 15px;
          width: 60px;
          height: 30px;
          padding: 6px 12px;
          background: #6C6C6C;
          border-radius: 7px;

          &:hover {
            background: #30343a;
            color: white
          }
        }

        :nth-child(2) {
          @include content_delete_button;
          font-size: 15px;
          width: 60px;
          height: 30px;
          background-color: #E94B4B;
          color: white;

          &:hover {
            background: #a70e0e;
            color: white
          }
        }
      }
    }
  }
}

.modal-body {
  padding: 0 !important;
}

.main_section{
  .info_wrap{
    .tab_section {
      .nav-tabs {
        button {
          @include tab_section_num;
          background: #5C7897;
          height: 50px;
          width: 100px;
        }

        .active {
          @include tab_section_num;
          background: #3E4E5F;
          width: 100px;
          height: 50px;
        }
      }

      .tab-content {
        background: #3E4E5F;
        padding: 20px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;

        .grid {
          padding: 30px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          background: #7B8799;

          .search_dropdown {
            color: #FFF;
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
            background: #132238;
            padding: 10px;
            align-items: center;
            gap: 0 20px;

            p {
              margin-bottom: 0;
            }

            .dropdown {
              width: 200px;
              height: 35px;
              @include dropdown_btn;
              margin-bottom: 0;

              .dropdown-toggle {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: none;
                width: 100%;
                padding: 0;
                color: black;
              }

              .dropdown-menu {
                width: 100%;
                transform: translate3d(-1px, 35px, 0px) !important;

                p {
                  font-size: 18px;
                  color: black;
                  font-weight: normal;
                }
              }
            }
          }
        }

        .submit_section {
          background: #132238;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;

          button {
            @include datagrid_edit_button;
           width: 70px;
            font-size: 18px;

            &:hover {
              background: #3B6162;
              color: white;
            }
          }

          p {
            color: white;
            font-weight: 800;
            font-size: 20px;
          }

         
        }

      }
    }
      
  }
}
@media only screen and (min-width: 1200px) {
  .main_section {
    .ag-theme-alpine {
      height: 450px
    }

    .info_wrap {
      margin: auto;
      width: 950px;

      .tab_section {
     
       
        .tab-content {


          .submit_section {
            padding: 30px;
            button {
              height: 35px;
              margin-left: 25px;
          
              
            }

     

            .form-control {
              height: 35px;
              width: 400px;
            }
          }

        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .ag-theme-alpine {
    height: 450px
  }

  .main_section {
    .info_wrap {
      padding: 0 5%;


      .tab_section {

   
       
        .tab-content {
        

          .submit_section {
            padding: 20px;

            button {
              height: 35px;
              margin-left: 10px;
              width: 90px;

            }

          
            .form-control {
              height: 35px;
              width: 400px;
            }
          
        }
      }
    }
  }
}
}

@media only screen and (max-width: 767px) {
  .ag-theme-alpine {
    height: 250px !important
  }

  .main_section {
    .info_wrap {
      padding: 0 5%;

      .tab_section {
        .nav-tabs {
          button {
            width: auto;
            padding: 5px;
            white-space: nowrap;
          }

          
        }

        .tab-content {

      

          .submit_section {
            padding: 20px;
            // .search_wrap {
            //   flex-direction: column;
            // }

            button {
              width: 90px;
    margin: 0 10px 0;
    height: auto;
            
            }

          }

        }
      }
    }
  }
}
</style>
