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
            <button class="nav-link active" id="equipment-tab" data-bs-toggle="tab" data-bs-target="#equipment" type="button" role="tab" aria-controls="equipment" aria-selected="true">設備總類</button>
            <button class="nav-link" id="storage-tab" data-bs-toggle="tab" data-bs-target="#equipmentCategory" type="button" role="tab" aria-controls="storage" aria-selected="false">設備分類</button>
            <button class="nav-link " id="equipment-tab" data-bs-toggle="tab" data-bs-target="#storage" type="button" role="tab" aria-controls="equipment" aria-selected="true">儲位區域</button>
            <button class="nav-link" id="storage-tab" data-bs-toggle="tab" data-bs-target="#storageLocation" type="button" role="tab" aria-controls="storage" aria-selected="false">儲位櫃位</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <!-- 設備總類tab -->
          <div class="tab-pane fade show active" id="equipment" role="tabpanel" aria-labelledby="equipment-tab" tabindex="0">
            <div class='row g-0'>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 grid'>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%" class="ag-theme-alpine" :rowDragManaged="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs1" :rowData="rowData1" @rowDragEnd="onRowDragEnd('EquipTypeName' ,$event)"
                    @grid-ready="dataApi1">
                  </ag-grid-vue>
                </div>
              </div>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
                <p>新增設備總類</p>
                <div class='d-flex'>
                  <input class="form-control" aria-label="With textarea" placeholder='最多輸入10字' v-model="newParams.EquipType">
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
                    <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {{ EquipTypeName || '請選擇' }}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="typeDropdown">
                      <p v-for="(item, index) in EquipTypeArray" :key="index" class="dropdown-item" @click="selectType(`${item}`)">{{ item }}</p>
                    </div>
                  </div>
                </div>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%; height: 450px" class="ag-theme-alpine" :rowDragManaged="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs2" :rowData="rowData2" @rowDragEnd="onRowDragEnd('area' ,$event)" 
                    @grid-ready="dataApi2">
                  </ag-grid-vue>
                </div>
              </div>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
                <p>新增設備分類</p>
                <div class='d-flex'>
                  <input class="form-control" aria-label="With textarea" placeholder='最多輸入10字' v-model="newParams.EquipCategory">
                  <button type="button" @click="insertNewType('area')">新增</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 儲位區域tab -->
          <div class="tab-pane fade" id="storage" role="tabpanel" aria-labelledby="storage-tab" tabindex="0">
            <div class='row g-0'>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 grid'>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%; height: 450px" class="ag-theme-alpine" :rowDragManaged="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs1" :rowData="rowData2" @rowDragEnd="onRowDragEnd('area' ,$event)" 
                    @grid-ready="dataApi2">
                  </ag-grid-vue>
                </div>
              </div>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
                <p>新增儲位區域</p>
                <div class='d-flex'>
                  <input class="form-control" aria-label="With textarea" placeholder='最多輸入10字' v-model="newArea">
                  <button type="button" @click="insertNewType('area')">新增</button>
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
                    <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ selectedItem || "請選擇" }}
                          </button>
                    <div class="dropdown-menu" aria-labelledby="statusDropdown">
                      <p class="dropdown-item" @click="selectStatus('選項1')">選項1</p>
                      <p class="dropdown-item" @click="selectStatus('選項2')">選項2</p>
                    </div>
                  </div>
                </div>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%; height: 450px" class="ag-theme-alpine" :rowDragManaged="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs2" :rowData="rowData2" @rowDragEnd="onRowDragEnd('area' ,$event)" 
                    @grid-ready="dataApi2">
                  </ag-grid-vue>
                </div>
              </div>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
                <p>新增儲位櫃位</p>
                <div class='d-flex'>
                  <input class="form-control" aria-label="With textarea" placeholder='最多輸入10字' v-model="newArea">
                  <button type="button" @click="insertNewType('area')">新增</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
      </div>
    </div>
    <!-- Edit Modal1 -->
    <div class="modal fade editModal" data-bs-backdrop="static" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="fixed_info">
              <div>
                <p>修改名稱</p>
              </div>
              <div class="content">
                <input type="text" placeholder="最多輸入10字" v-model="editParams.input">
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
  </div>
</template>

<script>
  import {
    AgGridVue
  } from "ag-grid-vue3";
  import Navbar from "@/components/Navbar.vue";
  import Parameter_button from "@/components/Parameter_button";
  import Edit_pen from "@/components/Edit_pen";
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
      Edit_pen,
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
      const newArea = ref('');
      const EquipTypeName = ref('');
      const EquipTypeArray = ref([]);
      const columnDefs1 =[{
            field: "",
            cellRenderer: 'Parameter_button',
            cellRendererParams: {
              updateEditType: updateEditType,
            },
            width: 170,
            rowDrag: true
          },
          {
            field: "Name",
            flex: 1,
          }
        ]
      const columnDefs2 =[{
            field: "",
            cellRenderer: 'Parameter_button',
            cellRendererParams: {
              updateEditType: updateEditType,
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
      const grid = reactive({
        row1: null,
        row2: null,
      })
      function updateEditType(data) {
        editParams.input = '' ;
        editParams.type = data.type;
        editParams.id =data.Id;
      }
      onMounted(() => {
        getDataGrid('EquipTypeName');
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
            apiUrl += baseUrl + '/GetParameter/EquipCategoryParameter?id=' + `${EquipTypeName.value}`
            break;
          case 'AreaName':
            apiUrl += baseUrl + '/GetParameter/GetAreaName'
            break;
          case 'LayerName':
            apiUrl += baseUrl + '/GetParameter/LayerParameter?id=' + ``
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
                EquipTypeArray.value = [];
                data.resultList.TypeList.forEach(item => {
                  EquipTypeArray.value.push(item.Name)
                });
                rowData1.value.forEach(item=> {
                  item.type = 'EquipTypeName'
                })
                setTimeout(() => {
                  grid.row1.setRowData(rowData1.value)
                }, 50);
                break;
              case 'EquipCategoryName':
                rowData2.value = data.resultList.CategoryList;
                rowData2.value.forEach(item=> {
                  item.type = 'EquipCategoryName'
                })
                grid.row2.setRowData(rowData2.value)
                break;
              case 'AreaName':
                data.resultList.EquipType.forEach(item => {
                  rowData2.value.push({
                    Area: item,
                  })
                });
                break;
              default:
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
            // console.log('originalIndex', originalIndex);
            rowData1.value.splice(originalIndex, 1);
            rowData1.value.splice(newRowIndex, 0, draggedData);
            console.log('rowData1', rowData1.value);
            break;
          case 'area':
            originalIndex = rowData2.value.findIndex(item => item.model === draggedData.model);
            console.log('originalIndex', originalIndex);
            rowData2.value.splice(originalIndex, 1);
            rowData2.value.splice(newRowIndex, 0, draggedData);
            console.log('rowData2', rowData2.value);
            break;
        }
        let apiUrl = '';
        let input = null;
        const baseUrl = 'http://192.168.0.177:7008';
        const axios = require('axios');
        let requestData = {};
        switch (type) {
          case 'EquipTypeName':
            apiUrl = baseUrl + '/ParameterMng/EditEquipmentTypeIndex'
            input += rowData1.value;
            break;
          case 'EquipCategoryName':
            apiUrl = baseUrl + '/ParameterMng/EditEquipmentCategoryIndex'
            input += rowData2.value;
          break;
          case 'AreaName':
            apiUrl = baseUrl + '/ParameterMng/EditAreaIndex'
            break;
          case 'LayerName':
            apiUrl = baseUrl + '/ParameterMng/EditLayerIndex'
            break;
        }
        try {
          const response = await axios.post(`${apiUrl}`,requestData);
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
        const input = editParams.input;
        const id = editParams.id;
        const axios = require('axios');
        const baseUrl = 'http://192.168.0.177:7008'
        let apiUrl = ''
        let requestData = {
          name: input,
        }
        switch (type) {
          case 'EquipTypeName':
            apiUrl += baseUrl+ '/ParameterMng/EditEquipmentTypeName'
            requestData.TypeId = id;
            break;
          case 'EquipCategoryName':
            apiUrl += baseUrl+ '/ParameterMng/EditEquipmentCategoryName'
            requestData.CategoryId = id;
            break;
          case 'AreaName':
            apiUrl += baseUrl+ '/ParameterMng/EditAreaName'
            requestData.AreaId = id;
            break;
          case 'LayerName':
            apiUrl += baseUrl+ '/ParameterMng/EditLayerName'
            requestData.LayerId = id;
            break;
        }
        try {
          const response = await axios.post(`${apiUrl}`,requestData);
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
      // 新增
      async function insertNewType(type) {
        let apiUrl = '';
        let input = '';
        const baseUrl = 'http://192.168.0.177:7008';
        const axios = require('axios');
        switch (type) {
          case 'EquipTypeName':
            apiUrl = baseUrl + '/ParameterMng/CreateEquipmentType'
            input = newParams.EquipType;
            break;
          case 'EquipCategoryName':
            apiUrl = baseUrl + '/ParameterMng/CreateEquipmentCategory'
            input = newParams.EquipCategory;
            break;
          case 'AreaName':
            apiUrl = baseUrl + '/ParameterMng/CreateArea'
            break;
          case 'LayerName':
            apiUrl = baseUrl + '/ParameterMng/CreateLayer'
            break;
        }
        try {
          const requestData = {name: input};
          const response = await axios.post(`${apiUrl}`,requestData);
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
      // 刪除
      const dataApi1 = (params) => {
        grid.row1 = params.api;
      };
      const dataApi2 = (params) => {
        grid.row2 = params.api;
      };
      const selectType = (item)=>{
        EquipTypeName.value = item;
        getDataGrid('EquipCategoryName');
      }
      return {
        newParams,
        editParams,
        newArea,
        EquipTypeName,
        EquipTypeArray,
        onRowDragEnd,
        editType,
        insertNewType,
        columnDefs1,
        columnDefs2,
        rowData1,
        rowData2,
        dataApi1,
        dataApi2,
        selectType,
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
  .editModal {
    .modal-content {
      border-radius: 0;
      .modal-body {
        border: 1px solid black;
        padding: 0;
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
            @include delete_button;
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
  @media only screen and (min-width: 1200px) {
    .main_section {
      .ag-theme-alpine {
        height: 450px
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 1% 20% 0;
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          gap: 20px;
          margin-bottom: 5%;
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
                background-color: #5e7aa2;
              }
            }
          }
        }
        .tab_section {
          .nav-tabs {
            button {
              @include tab_section_num;
              background: #5C7897;
              width: 100px;
              height: 50px;
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
                @include datagrid_title;
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
              padding: 30px;
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
              button {
                @include datagrid_edit_button;
                height: 35px;
                margin-left: 25px;
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
              .form-control {
                height: 35px;
                width: 400px;
              }
            }
            .modal {
              .modal-header {
                background: #3D4E61;
                color: white;
                .close_icon {
                  color: white;
                  font-weight: 700;
                  margin-bottom: 0;
                }
              }
            }
            .input-group {
              span {
                @include red_star
              }
              .selected_file {
                margin-left: 20px;
                p.title {
                  font-weight: 700;
                  color: white;
                  margin-bottom: 5px;
                }
                .file_upload_wrap {
                  margin-bottom: 0;
                  display: flex;
                  img {
                    width: 25px;
                    height: 25px;
                  }
                  p {
                    margin-bottom: 0;
                    font-weight: 700;
                    color: white;
                    &::before {
                      margin-right: 10px;
                      content: '·';
                      font-weight: 700;
                      color: white;
                    }
                  }
                }
              }
              .input-number {
                @include count_btn;
              }
              .form-control {
                height: 35px;
                border-radius: 0;
              }
              .input-group-prepend {
                color: white;
                font-weight: 700;
                font-size: 20px;
                width: 120px;
                text-align: end;
              }
              .file_wrap {
                display: flex;
                flex-direction: column;
                .choose_btn {
                  margin-bottom: 10px;
                  @include choose_file_btn;
                  &:hover {
                    background: #3f608f;
                  }
                }
                .upload_btn {
                  @include upload_file_btn;
                  &:hover {
                    background: #2f507e;
                  }
                }
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
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 0 5%;
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          gap: 20px;
          margin-bottom: 5%;
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
                background-color: #5e7aa2;
              }
            }
          }
        }
        .tab_section {
          .nav-tabs {
            button {
              @include tab_section_num;
              background: #5C7897;
              width: 100px;
              height: 50px;
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
              padding: 20px;
              border-top-left-radius: 5px;
              border-bottom-left-radius: 5px;
              background: #7B8799;
              .search_dropdown {
                @include datagrid_title;
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
              padding: 20px;
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
              button {
                @include datagrid_edit_button;
                height: 35px;
                margin-left: 10px;
                width: 90px;
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
              .form-control {
                height: 35px;
                width: 400px;
              }
            }
            .modal {
              .modal-header {
                background: #3D4E61;
                color: white;
                .close_icon {
                  color: white;
                  font-weight: 700;
                  margin-bottom: 0;
                }
              }
            }
            .input-group {
              span {
                @include red_star
              }
              .selected_file {
                margin-left: 20px;
                p.title {
                  font-weight: 700;
                  color: white;
                  margin-bottom: 5px;
                }
                .file_upload_wrap {
                  margin-bottom: 0;
                  display: flex;
                  img {
                    width: 25px;
                    height: 25px;
                  }
                  p {
                    margin-bottom: 0;
                    font-weight: 700;
                    color: white;
                    &::before {
                      margin-right: 10px;
                      content: '·';
                      font-weight: 700;
                      color: white;
                    }
                  }
                }
              }
              .input-number {
                @include count_btn;
              }
              .form-control {
                height: 35px;
                border-radius: 0;
              }
              .input-group-prepend {
                color: white;
                font-weight: 700;
                font-size: 20px;
                width: 120px;
                text-align: end;
              }
              .file_wrap {
                display: flex;
                flex-direction: column;
                .choose_btn {
                  margin-bottom: 10px;
                  @include choose_file_btn;
                  &:hover {
                    background: #3f608f;
                  }
                }
                .upload_btn {
                  @include upload_file_btn;
                  &:hover {
                    background: #2f507e;
                  }
                }
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
      h1 {
        margin-top: 50px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 50px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 0 5%;
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          gap: 20px;
          margin-bottom: 5%;
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
                background-color: #5e7aa2;
              }
            }
          }
        }
        .tab_section {
          .nav-tabs {
            button {
              @include tab_section_num;
              background: #5C7897;
              width: auto;
              height: 50px;
              padding: 5px;
              white-space: nowrap;
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
              padding: 20px;
              border-top-left-radius: 5px;
              border-bottom-left-radius: 5px;
              background: #7B8799;
              .search_dropdown {
                @include datagrid_title;
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
              padding: 20px;
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
              button {
                @include datagrid_edit_button;
                height: 35px;
                margin-left: 10px;
                width: 90px;
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
              .form-control {
                height: 35px;
                width: 400px;
              }
            }
            .modal {
              .modal-header {
                background: #3D4E61;
                color: white;
                .close_icon {
                  color: white;
                  font-weight: 700;
                  margin-bottom: 0;
                }
              }
            }
            .input-group {
              span {
                @include red_star
              }
              .selected_file {
                margin-left: 20px;
                p.title {
                  font-weight: 700;
                  color: white;
                  margin-bottom: 5px;
                }
                .file_upload_wrap {
                  margin-bottom: 0;
                  display: flex;
                  img {
                    width: 25px;
                    height: 25px;
                  }
                  p {
                    margin-bottom: 0;
                    font-weight: 700;
                    color: white;
                    &::before {
                      margin-right: 10px;
                      content: '·';
                      font-weight: 700;
                      color: white;
                    }
                  }
                }
              }
              .input-number {
                @include count_btn;
              }
              .form-control {
                height: 35px;
                border-radius: 0;
              }
              .input-group-prepend {
                color: white;
                font-weight: 700;
                font-size: 20px;
                width: 120px;
                text-align: end;
              }
              .file_wrap {
                display: flex;
                flex-direction: column;
                .choose_btn {
                  margin-bottom: 10px;
                  @include choose_file_btn;
                  &:hover {
                    background: #3f608f;
                  }
                }
                .upload_btn {
                  @include upload_file_btn;
                  &:hover {
                    background: #2f507e;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>