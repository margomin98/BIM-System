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
            <button class="nav-link" id="storage-tab" data-bs-toggle="tab" data-bs-target="#storage" type="button" role="tab" aria-controls="storage" aria-selected="false">儲位區域</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <!-- 設備總類tab -->
          <div class="tab-pane fade show active" id="equipment" role="tabpanel" aria-labelledby="equipment-tab" tabindex="0">
            <div class='row g-0'>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 grid'>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%" class="ag-theme-alpine" :rowDragManaged="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs" :rowData="rowData1" @rowDragEnd="onRowDragEnd('equip_type' ,$event)" @cellValueChanged="onCellValueChanged('equip_type')" @grid-ready="dataApi1">
                  </ag-grid-vue>
                </div>
              </div>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 submit_section'>
                <p>新增設備總類</p>
                <div class='d-flex'>
                  <input class="form-control" aria-label="With textarea" placeholder='最多輸入10字' v-model="newType">
                  <button type="button" @click="insertNewType('equip_type')">新增</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 儲位區域tab -->
          <div class="tab-pane fade" id="storage" role="tabpanel" aria-labelledby="storage-tab" tabindex="0">
            <div class='row g-0'>
              <div class='col-xl-6 col-lg-6 col-md-6 col-12 grid'>
                <div style='width:100%'>
                  <ag-grid-vue style="width: 100%; height: 450px" class="ag-theme-alpine" :rowDragManaged="true" :animateRows="true" :headerHeight="0" :columnDefs="columnDefs" :rowData="rowData2" @rowDragEnd="onRowDragEnd('area' ,$event)" @cellValueChanged="onCellValueChanged('area')" @grid-ready="dataApi2">
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
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
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
  // import Edit_pen from "@/components/Edit_pen";
  import {
reactive,
    ref
  } from "vue";
  export default {
    components: {
      Navbar,
      AgGridVue,
      Parameter_button,
      // Edit_pen
    },
    setup() {
      const newType = ref('');
      const newArea = ref('');
      const rowData1 = ref([{
          model: "設備總類1",
        },
        {
          model: "設備總類2",
        },
        {
          model: "設備總類3",
        },
        {
          model: "設備總類4",
        },
        {
          model: "設備總類5",
        },
        {
          model: "設備總類6",
        },
      ]);
      const rowData2 = ref([{
          model: "儲位區域1",
        },
        {
          model: "儲位區域2",
        },
        {
          model: "儲位區域3",
        },
        {
          model: "儲位區域4",
        },
        {
          model: "儲位區域5",
        },
        {
          model: "儲位區域6",
        },
      ]);
      const grid = reactive({
        row1: null,
        row2: null,
      })
      // 移動
      function onRowDragEnd(type, event) {
        const newRowIndex = event.overIndex;
        console.log('newRowIndex', newRowIndex);
        const draggedData = event.node.data;
        console.log('draggedData', draggedData);
        let originalIndex = -1;
        switch (type) {
          case 'equip_type':
            originalIndex = rowData1.value.findIndex(item => item.model === draggedData.model);
            console.log('originalIndex', originalIndex);
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
          default:
            break;
        }
      }
      // 編輯
      function onCellValueChanged(type) {
        switch (type) {
          case 'equip_type':
            console.log(rowData1.value);
            break;
          case 'area':
            console.log(rowData2.value);
            break;
        }
      }
      // 新增
      function insertNewType(type) {
        switch (type) {
          case 'equip_type':
            rowData1.value.push({
              model: newType.value,
            });
            newType.value = '';
            setTimeout(() => {
              grid.row1.setRowData(rowData1.value)
            }, 50);
            break;
          case 'area':
            rowData2.value.push({
              model: newArea.value,
            });
            setTimeout(() => {
              grid.row2.setRowData(rowData2.value)
            }, 50);
            newArea.value = '';
            break;
        }
        // API here if OK then refresh datagrid
      }
      // 刪除
      const dataApi1 = (params) => {
        grid.row1 = params.api;
      };
      const dataApi2 = (params) => {
        grid.row2 = params.api;
      };
      return {
        newType,
        newArea,
        onRowDragEnd,
        onCellValueChanged,
        insertNewType,
        columnDefs: [{
            field: "make",
            cellRenderer: 'Parameter_button',
            width: 170,
            rowDrag: true
          },
          {
            field: "model",
            flex: 1,
            editable: true,
            cellRenderer: 'Edit_pen',
          }
        ],
        rowData1,
        rowData2,
        dataApi1,
        dataApi2,
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
              background: #7B8799
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
              background: #7B8799
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
              background: #7B8799
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
