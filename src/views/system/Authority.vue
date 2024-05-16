<template>
  <Navbar />
  <div class="main_section">
    <!-- 編輯權限名稱 Modal  -->
    <div class="modal fade editModal" id="EditModal" tabindex="-1">
      <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="fixed_info">
              <div>
                <p>修改名稱</p>
              </div>
              <div class="content">
                <input type="text" id="editInput" placeholder="最多輸入10字" v-model="permissionParams.input" maxlength="10">
              </div>
              <div class="button_section">
                <button type="button" class="btn" data-bs-dismiss="modal">關閉</button>
                <button type="button" class="btn" data-bs-dismiss="modal" @click="permissionCUDI('Update')">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除權限名稱 Modal  -->
    <div class="modal fade editModal2" id="DeleteModal" tabindex="-1">
      <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="fixed_info">
              <div>
                <p>確定刪除參數嗎?</p>
              </div>
              <div class="content">
                <span style="font-weight: 700;"> {{ permissionParams.input }} </span>
              </div>
              <div class="button_section">
                <button type="button" class="btn" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn" data-bs-dismiss="modal" @click="permissionCUDI('Delete')">確定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title col">
      <h1>權限管理</h1>
    </div>
    <div class="info_wrap">
      <ul class="nav nav-tabs" id="Tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="change-tab" data-bs-toggle="tab" data-bs-target="#change" type="button"
            role="tab">變更人員權限</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="name-tab" data-bs-toggle="tab" data-bs-target="#name" type="button"
            role="tab">權限名稱</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="setting-tab" data-bs-toggle="tab" data-bs-target="#setting" type="button"
            role="tab">權限設定</button>
        </li>
      </ul>
      <div class="tab-content" id="authorityTab">
        <div class="tab-pane fade show active" id="change" role="tabpanel">
          <div class="tab-pane_wrap">
            <div class="fixed_info">
              <div>
                <p> 變更人員權限 </p>
              </div>
            </div>
            <div class="content">
              <!-- 帳號 -->
              <div class="d-flex mb-3 content_wrap">
                <div class="input-group-prepend">
                  <span class="red_star">*</span>帳號：
                </div>
                <div class="select_wrap">
                  <select class="form-select" v-model="User.name" @change="getCurrentPermission">
                    <option selected value="">--請選擇--</option>
                    <option v-for="option in DropdownArray.account" :key="option" :value="option">{{ option }}</option>
                  </select>
                  <p class="warn_note" v-show="!User.name">請先選擇帳號</p>
                </div>
              </div>
              <!-- 目前權限 -->
              <div class="d-flex mb-3 content_wrap">
                <div class="input-group-prepend"> 目前權限： </div>
                <input type="text" class="form-control readonly_box" v-model="User.currentPermission" readonly>
              </div>
              <!-- 變更權限 -->
              <div class="d-flex content_wrap">
                <div class="input-group-prepend">
                  <span class="red_star">*</span>變更權限：
                </div>
                <div class="select_wrap">
                  <select class="form-select" v-model="User.selectPermission">
                    <option selected value="">--請選擇--</option>
                    <option v-for="option in DropdownArray.role" :key="option" :value="option.Id">{{ option.Name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button class='submit_btn' type="button" @click="saveUserRole">確認變更</button>
          </div>
        </div>
        <div class="tab-pane fade name_tab" id="name" role="tabpanel">
          <div class="tab-pane_wrap">
            <div class="fixed_info">
              <div>
                <p> 權限名稱 </p>
              </div>
            </div>
            <div class="content">
              <!-- 輸入框 -->
              <div class="d-flex mb-3 content_wrap">
                <div class="select_wrap">
                  <input type="text" class="form-control" placeholder="最長可輸入10字" v-model.trim="newPermission"
                    maxlength="10">
                  <p class="warn_note">類型命名條件....</p>
                </div>
                <button class="add_btn" type="button" @click="permissionCUDI('Create')">+ 新增</button>
              </div>
              <div class="name_dg">
                <ag-grid-vue :headerHeight="0" @grid-ready="dataApi" @rowDragEnd="onRowDragEnd($event)"
                  :rowDragManaged="true" :animateRows="true" :suppressMoveWhenRowDragging="true" :rowData="rowData"
                  :columnDefs="colDefs" style="height: 425px" class="ag-theme-alpine"></ag-grid-vue>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade setting_tab" id="setting" role="tabpanel">
          <div class="tab-pane_wrap">
            <div class="fixed_info ">
              <div>
                <p> 權限設定 </p>
              </div>
            </div>
            <div class="content">
              <!-- 選擇權限名稱 -->
              <div class="d-flex mb-3 content_wrap">
                <p class='text_title'>請先選擇權限名稱</p>
                <select class="form-select" @change="getPagePermission(roleChoice)" v-model="roleChoice">
                  <option selected value="">--請選擇--</option>
                  <option v-for="option in DropdownArray.role" :key="option" :value="option.Id">{{ option.Name }}
                  </option>
                </select>
              </div>
              <div class="dropdown_section">
                <div class="fixed_info">
                  <div>
                    <p> 權限選單 </p>
                  </div>
                </div>
                <PerfectScrollbar>
                  <div class="accordion authority_accordion" id="authority_accordion">
                    <div v-for="(main, mainIndex) in permissionList" :key="main.id">
                      <div class="accordion-header">
                        <ul>
                          <li>
                            <label :for="'#header_' + main.id">
                              <input type="checkbox" v-model="main.checked" :id="'header_' + main.id"
                                @click="selectAllitems($event, mainIndex)"> {{ main.TitleName }}
                            </label>
                            <img class="accordion-toggle" @click="toggleAccordion(mainIndex)"
                              src="@/assets/accordion_arrow.png" alt="">
                          </li>
                        </ul>
                      </div>
                      <div v-show="isOpen.includes(mainIndex)" class="accordion-body" id="accordion-body-1">
                        <ul>
                          <li v-for="sub in main.List" :key="sub.id">
                            <label :for="`#${sub.id}`">
                              <input type="checkbox" :id="sub.id" v-model="sub.checked"
                                @change="isAllSelected(mainIndex)"> {{ sub.TitleName }}
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </PerfectScrollbar>
              </div>
            </div>
            <div class="button_wrap">
              <button class='confirm_btn' type="button" @click="saveRolePermission">確認</button>
              <button class='cancel_btn' type="button" @click="getPagePermission(roleChoice)">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  AgGridVue
} from "ag-grid-vue3";
import Navbar from "@/components/Navbar.vue";
import Parameter_button from "@/components/system_page/Permission_Parameter_button.vue";
import router from "@/router";
import {
  onMounted,
  onUnmounted,
  reactive,
  ref
} from 'vue';
import { useAPIStore, useUtilsStore } from "@/store";
import axios from '@/axios/tokenInterceptor';
import allPermission from "@/assets/json/permission.json"
const apiStore = useAPIStore();
const utilsStore = useUtilsStore();
const permissionList = ref(allPermission.Data);
/**
 * 頁面所需下拉選單
 */
const DropdownArray = reactive({
  account: [], // 在職員工下拉選單
  role: [], // 權限下拉選單
})

// ----- "變更人員權限"頁籤 -----
/**
 * "變更人員權限"的使用者資訊
 */
const User = reactive({
  name: '',
  currentPermission: '',
  selectPermission: '',
})
// ----- "權限名稱"頁籤 -----
/**
 * 將彈出視窗資訊更新為所選的data(宣告在colDefs上方，否則會出現error)
 * @param {object} data 選中的該行資料
 */
const updatePermission = (data) => {
  permissionParams.input = data.Name;
  permissionParams.id = data.Id;
}
/**
 * AGgrid 資料內容
 */
const rowData = ref();
/**
 * AGgrid Header、Column設定
 */
const colDefs = [
  {
    rowDrag: true,
    field: "",
    cellRenderer: Parameter_button,
    cellRendererParams: {
      updatePermission: updatePermission,
    },
    width: 170
  },
  {
    field: "Name",
    flex: 1,
  },
];
/**
 * AGgridAPI 更新datagrid用
 */
const grid = ref();
/**
 * "UpdateModal" & "DeleteModal"的參數，變更/刪除 權限名稱使用
 */
const permissionParams = reactive({
  input: '',
  id: '',
});
/**
 * 新增權限名稱input
 */
const newPermission = ref('');
// ----- "權限設定"頁籤 -----
/**
 * 權限設定的role下拉選單綁定
 */
const roleChoice = ref('');
/**
 * 決定哪些手風琴選單為展開的Array
 */
const isOpen = ref([]);
onMounted(async () => {
  DropdownArray.role = await apiStore.getRoleOption();
  DropdownArray.account = await apiStore.getCustodian('');
  rowData.value = DropdownArray.role;
  // 預設全開
  permissionList.value.forEach((item, index) => {
    isOpen.value.push(index);
  })
})
onUnmounted(() => {
  apiStore.$dispose();
})
/**
 * 將此大選單全選或全不選
 * @param {number} index 第幾個大選單
 * @param {boolean} checked 選/不選
 */
const checkAll = (index, checked) => {
  console.log(permissionList.value);
  permissionList.value[index].List.forEach((item) => {
    item.checked = checked;
  })
}
/**
 * 取得選擇的使用者目前的權限名稱
 */
const getCurrentPermission = async () => {
  User.currentPermission = User.name ? await apiStore.getRoleName(User.name) : "";
}
/**
 * 完成拖曳後 1.更新rowData 1.5更新Index 2.更新Datagrid 3.打API變更實際資料庫順序
 * @param {Event} e 拖曳事件
 */
const onRowDragEnd = async (e) => {
  // TODO
  const newRowIndex = e.overIndex;
  const draggedData = e.node.data;
  let originalIndex = -1;
  originalIndex = rowData.value.findIndex(item => item.Id === draggedData.Id);
  // 1.
  rowData.value.splice(originalIndex, 1);
  rowData.value.splice(newRowIndex, 0, draggedData);
  // 1.5
  rowData.value.forEach((role, index) => {
    role.Index = index;
  })
  // 2.
  setTimeout(() => {
    grid.value.setRowData(rowData.value);
  }, 50);
  console.log('rowData', rowData.value);

  // 3.
  permissionCUDI('IndexEdit');
}
/**
 * AGgrid 完成創建時將grid api綁定到ref
 * @param {*} params 
 */
const dataApi = (params) => {
  grid.value = params.api;
};
// ----- 變更人員權限 -----
/**
 * 儲存選擇的使用者權限
 */
const saveUserRole = async () => {
  if (!utilsStore.checkRequired(User, ['name'])) return;
  // selectPermission可能為整數0 要拆開判斷
  if (User.selectPermission === '' || User.selectPermission === null || User.selectPermission === undefined) { alert('請輸入必填項目'); return }
  const form = new FormData();
  form.append('userName', User.name);
  form.append('role', User.selectPermission);
  try {
    const reseponse = await axios.post('https://localhost:44302/AuthorityMng/AccoutChangeRole', form);
    const data = reseponse.data;
    if (data.state === 'success') {
      let msg = data.messages + '\n';
      let currentSelect = DropdownArray.role.find(role => role.Id === User.selectPermission)
      msg += `${User.name}　變更為　${currentSelect.Name}`
      getCurrentPermission();
      alert(msg);
    } else {
      console.error('error', data.messages);
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 權限的新增/更新名稱/刪除/改變順序
 * @param {string} type determine Create/Update/Delete/IndexEdit
 */
const permissionCUDI = async (type) => {
  let baseUrl = 'https://localhost:44302/'
  let url = ''
  let requestData = {};
  switch (type) {
    case 'Create':
      url = '/AuthorityMng/CreateRole';
      // Find Max Index
      let maxIndex = -1;
      DropdownArray.role.forEach((role) => {
        if (role.Index > maxIndex) maxIndex = role.Index;
      })
      requestData = {
        RoleName: newPermission.value, // 新增的權限名稱
        Index: maxIndex + 1, // 新增的權限Index為最後一個(Index+1)，等同於現在的array.length
      }
      break;
    case 'Update':
      url = '/AuthorityMng/EditRoleName';
      requestData = {
        RoleId: permissionParams.id, // 欲編輯的權限id
        NewRoleName: permissionParams.input, // 欲編輯的內容
      }
      break;
    case 'Delete':
      url = '/AuthorityMng/DeleteRole';
      requestData = {
        RoleId: permissionParams.id, // 欲刪除的權限id
      }
      break;
    case 'IndexEdit':
      url = '/AuthorityMng/EditRolesIndex';
      requestData = {
        RolesList: rowData.value
      }
  }
  try {
    const response = await axios.post(baseUrl + url, requestData);
    const data = response.data;
    alert(data.messages);
    if (data.state === 'success') {
      if (type === 'create') { newPermission.value = '' };
      DropdownArray.role = await apiStore.getRoleOption();
      rowData.value = DropdownArray.role;
      grid.value.setRowData(rowData.value);
    }
  } catch (error) {
    console.error(error);
  }
}
// ----- 權限設定 -----
/**
 * 勾選子選項時檢查是否為全選(顯示用)
 * @param {number} mainIndex 要控制的大選單index
 */
const isAllSelected = (mainIndex) => {
  const allSeleted = permissionList.value[mainIndex].List.every(sub => sub.checked);
  permissionList.value[mainIndex].checked = allSeleted;
};
/**
 * 勾選大選單時改變其相關子選單(全選/全不選)
 * @param {event} event 事件，檢查target.checked
 * @param {number} mainIndex 要控制的大選單index
 */
const selectAllitems = (event, mainIndex) => {
  permissionList.value[mainIndex].List.forEach((item) => {
    item.checked = event.target.checked;
  })
};
/**
 * 開關手風琴選單
 * @param {number} mainIndex 要控制的大選單index
 */
const toggleAccordion = (mainIndex) => {
  const indexToRemove = isOpen.value.findIndex(number => number === mainIndex);
  // 已存在(index!==-1)->移除，不存在->加入
  if (indexToRemove !== -1) {
    isOpen.value.splice(indexToRemove, 1);
  } else {
    isOpen.value.push(mainIndex);
  }
};
/**
 * 取得所選的人員權限的各業面權限選單
 * @param {number} Id 權限id
 */
const getPagePermission = async (Id) => {
  // Id 為number且可為0
  if (Id === undefined || Id === null || Id === '') return
  const form = new FormData();
  form.append('Id', Id);
  try {
    const response = await axios.post('https://localhost:44302/AuthorityMng/GetRoleSettingById', form);
    const data = response.data;
    if (data.state === 'success') {
      console.log(data.messages);
      setPagePermission(data.resultList);
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 處理API return結果並更新頁面權限手風琴
 * @param {object} newPermissionList API return
 */
const setPagePermission = (newPermissionList) => {
  // 更新各個權限的check boolean
  const updatedData = permissionList.value.map(dataItem => {
    const updatedList = dataItem.List.map(listItem => {
      if (newPermissionList.hasOwnProperty(listItem.id)) {
        return { ...listItem, checked: newPermissionList[listItem.id] }
      } else {
        return listItem
      }
    });
    return { ...dataItem, List: updatedList };
  });
  permissionList.value = updatedData;
  // 重新檢查是否每個都是全選
  permissionList.value.forEach((item, index) => {
    isAllSelected(index);
  })
}
/**
 * 儲存勾選的設定內容(tab-權限設定)
 */
const saveRolePermission = async () => {
  let submitPermissionList = {};
  permissionList.value.forEach((dataList) => {
    dataList.List.forEach((itemList) => {
      submitPermissionList[itemList.id] = itemList.checked;
    })
  })
  // console.log('submitPermissionList', submitPermissionList);
  const role = DropdownArray.role.find(role => role.Id === roleChoice.value);
  let requestData = {
    ...submitPermissionList,
    Id: role.Id,
    RoleName: role.Name,
    Index: role.Index,
    IsEnable: true // 不加的話。會因為接收ViewModel的關係讓所選帳號變成停用(消失在DropdownList)
  }
  try {
    const reseponse = await axios.post('https://localhost:44302/AuthorityMng/SetRoleSettingById', requestData);
    const data = reseponse.data;
    if (data.state === 'success') {
      alert(data.messages);
    } else {
      console.error('error', data.messages);
    }
  } catch (e) {
    console.error(e);
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";

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
        background: #d9d9d9;

        input {
          border: none;
          border-radius: 10px;
          padding: 5px 10px;
        }
      }

      .button_section {
        background: #d9d9d9;
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
          background: #6c6c6c;
          border-radius: 7px;

          &:hover {
            background: #30343a;
            color: white;
          }
        }

        :nth-child(2) {
          @include content_delete_button;
          font-size: 15px;
          width: 60px;
          height: 30px;
          background-color: #98ccd3;

          &:hover {
            background: #5979ab;
            color: white;
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
        background: #e94b4b;
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
        background: #d9d9d9;

        input {
          border: none;
          border-radius: 10px;
          text-align: center;
        }
      }

      .button_section {
        background: #d9d9d9;
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
          background: #6c6c6c;
          border-radius: 7px;

          &:hover {
            background: #30343a;
            color: white;
          }
        }

        :nth-child(2) {
          @include content_delete_button;
          font-size: 15px;
          width: 60px;
          height: 30px;
          background-color: #e94b4b;
          color: white;

          &:hover {
            background: #a70e0e;
            color: white;
          }
        }
      }
    }
  }
}

.modal .modal-body {
  padding: 0 !important;
}

.add_btn {
  border-radius: 5px;
  border: none;
  background: #132238;
  color: white;
  font-weight: 700;
  width: 80px;
  height: 38px;
}

.submit_btn {
  margin: 20px auto 0;
}

.submit_btn,
.confirm_btn {
  @include search_and_send_btn;
  width: unset;

  &:hover {
    background-color: #5d85bd;
  }
}

.button_wrap {
  display: flex;
  gap: 0 20px;
  margin-top: 18px;
  justify-content: center;

  .cancel_btn {
    @include back_to_previous_btn;
    width: 90px;

    &:hover {
      background-color: #5d85bb;
    }
  }
}

span {
  @include red_star;
}

.readonly_box {
  @include readonly_box;
}

p {
  margin-bottom: 0;
}

.main_section {
  .info_wrap {
    .select_wrap {
      width: 100%;
      flex-direction: column;
    }

    .warn_note {
      color: #00438b;
      font-weight: 700;
      margin-top: 5px;
    }

    .nav-link.active {
      color: black;
      border: none;
    }

    .nav-link {
      font-weight: 700;
      background: #5c7897;
      box-shadow: 2px -1px 1px 0px rgba(0, 0, 0, 0.25);
      color: white;
      border: none;
    }

    .tab-content>.active,
    .nav-link.active {
      background: #e3e3e3;
    }

    .nav-link {
      font-weight: 700;
    }

    .content,
    .tab-pane {
      padding: 20px;
    }

    .tab-pane {
      border-radius: 0px 10px 10px 10px;
    }

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
      }
    }

    .setting_tab {
      p.text_title {
        align-content: center;
        margin-right: 25px;
      }
    }

    .input-group-prepend,
    .setting_tab {
      white-space: nowrap;
      color: white;
      font-weight: 800;
      font-size: 20px;
    }

    .content {
      border-radius: 0px 0 10px 10px;
      background: #8495a8;

      .input-group-prepend {
        width: 140px;
        text-align: right;
        margin-right: 10px;
      }

      .accordion {
        font-size: 16px;

        .accordion-item {
          background: #dedede;
          border: 0;
        }

        .accordion-header {
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .accordion-toggle {
            height: 10px;
            width: 15px;
            cursor: pointer;
            transition: transform 0.3s ease;
            transform: rotate(180deg);
          }

          .accordion-toggle:hover {
            transform: rotate(0deg);
          }
        }

        .accordion-header,
        .accordion-button:not(.collapsed),
        button {
          background-color: #86abb0;
          box-shadow: unset;
        }

        .form-check-input {
          margin-top: 0;
          margin-right: 10px;
        }

        input {
          width: 15px;
        }

        button {
          border-radius: 0;
          font-weight: 700;
          color: white;
          height: 38px;
          padding: 10px;
        }

        .accordion-button:focus {
          box-shadow: unset !important;
          border-color: transparent !important;
        }

        .accordion-body {
          padding: 16px;

          .check_wrap {
            display: flex;
            font-size: 15px;

            .inner_form_check {
              margin-right: 10px;
            }
          }
        }
      }

      .authority_accordion {
        background: #86abb0;

        ul {
          list-style: none;
          margin-bottom: 0;
          padding: 5px 10px;
        }

        .accordion-body {
          background: #dedede;
          padding: 10px;
          color: black;
        }
      }

      .ps {
        height: 345px;
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      margin: 8px auto 5%;
      width: 600px;

      .tab-pane_wrap {
        height: 600px;

        .content {
          height: 490px;

          .add_btn {
            margin-left: 10px;
          }
        }
      }

      .name_tab .content {
        height: 550px;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      margin: 8px auto 5%;
      width: 600px;

      .tab-pane_wrap {
        height: 600px;

        .content {
          height: 490px;

          .add_btn {
            margin-left: 10px;
          }
        }
      }

      .name_tab .content {
        height: 550px;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .info_wrap {
      padding:0 5% 5%;

      .tab-pane_wrap {
        height: 640px;

        .content {
          height: 525px;

          .content_wrap {
            flex-direction: column;

            .input-group-prepend {
              text-align: left;
              margin-bottom: 5px;
            }
          }
        }
      }

      .name_tab .content {
        height: 590px;
      }
    }
  }
}
</style>
