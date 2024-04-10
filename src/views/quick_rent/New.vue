<template>
    <Navbar />
    <confirm_modal :id="'ConfirmModal'" @confirm="quickrentStore.submit" :text="warningText" />
    <div class="modal fade" data-bs-backdrop="static" id="exampleModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
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
                            <!-- 設備總類 -->
                            <div class='col'>
                                <p>設備總類</p>
                                <select class="form-select" v-model="searchParams.EquipType_Id"
                                    @change="async () => { searchParams.Category_Id = ''; DropdownArray.EquipCategory = await apiStore.getEquipCategory(searchParams.EquipType_Id) }">
                                    <option value="">--請選擇--</option>
                                    <option v-for="option in DropdownArray.EquipType" :key="option.Id"
                                        :value="option.Id">{{ option.Name }}</option>
                                </select>
                            </div>
                            <!-- 設備分類 -->
                            <div class='col'>
                                <p>設備分類</p>
                                <select class="form-select" v-model="searchParams.Category_Id">
                                    <option v-if="DropdownArray.EquipCategory.length === 0" value="">--請先選擇設備總類--
                                    </option>
                                    <template v-else>
                                        <option value="">--請選擇--</option>
                                        <option v-for="option in DropdownArray.EquipCategory" :key="option.Id"
                                            :value="option.Id">{{ option.Name }}</option>
                                    </template>
                                </select>
                            </div>
                            <!-- 儲位區域 -->
                            <div class='col'>
                                <p>儲位區域</p>
                                <select class="form-select" v-model="searchParams.Area_Id"
                                    @change="async () => { searchParams.Layer_Id = ''; DropdownArray.Layer = await apiStore.getLayer(searchParams.Area_Id) }">
                                    <option value="">--請選擇--</option>
                                    <option v-for="option in DropdownArray.Area" :key="option.Id" :value="option.Id">{{
        option.Name }}</option>
                                </select>
                            </div>
                            <!-- 儲位櫃位 -->
                            <div class='col'>
                                <p>儲位櫃位</p>
                                <select class="form-select" v-model="searchParams.Layer_Id">
                                    <option v-if="DropdownArray.Layer.length === 0" value="">--請先選擇儲位區域--</option>
                                    <template v-else>
                                        <option value="">--請選擇--</option>
                                        <option v-for="option in DropdownArray.Layer" :key="option.Id"
                                            :value="option.Id">{{ option.Name }}</option>
                                    </template>
                                </select>
                            </div>
                            <!-- 專案代碼 -->
                            <div class='col'>
                                <p>專案代碼</p>
                                <vue-multiselect v-model="searchParams.ProjectSelect"
                                    :options="DropdownArray.ProjectCode" :allow-empty="false" :max-height="300"
                                    placeholder="請選擇" label="Text" :showLabels="false" track-by="Text"
                                    :show-no-results="false" @select="rentStore.onSearchProjectSelect">
                                </vue-multiselect>
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
                                <input type="text" class="form-control text-center" placeholder="最多輸入10字"
                                    v-model="searchParams.ProductName" />
                            </div>
                        </div>
                        <div class='col d-flex justify-content-center'>
                            <button class="btn submit_btn" type="button"
                                @click="quickrentStore.searchInventory('', 'search')">搜尋</button>
                            <button class="btn submit_btn" style="margin-left: 0.5rem;" type="button"
                                @click="resetParams">清空</button>
                        </div>
                    </div>
                </div>
                <div class="fixed_info">
                    <div>
                        <p>目前資產庫存（請優先選擇存貨）</p>
                    </div>
                </div>
                <DataTable lazy :key="datagrid1.key" :first="datagrid1.first" :size="'small'"
                    :loading="datagrid1.loading" :value="rowData1" :sort-field="datagrid1.sortField"
                    :sort-order="datagrid1.sortOrder" resizableColumns columnResizeMode="expand" showGridlines
                    scrollable scrollHeight="510px" @page="quickrentStore.searchInventory($event, 'page')"
                    @sort="quickrentStore.searchInventory($event, 'sort')" paginator :rows="10"
                    :totalRecords="datagrid1.totalRecords"
                    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                    <Column style="min-width: 60px;">
                        <template #body="slotProps">
                            <asset-view-btn :params="slotProps" />
                        </template>
                    </Column>
                    <Column style="min-width: 60px" header="選擇">
                        <template #body="slotProps">
                            <!-- <Storage_add :params="slotProps" :selectedNumber="searchParams.selectedNumber" :Number="searchParams.Number" @addMaterial="addMaterial" /> -->
                            <quick_add_btn :params="slotProps" />
                        </template>
                    </Column>
                    <Column style="min-width: 80px" header="數量">
                        <template #body="slotProps">
                            <Storage_number :params="slotProps" />
                        </template>
                    </Column>
                    <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable
                        :style="{ 'min-width': item.width }"></Column>
                </DataTable>
            </div>
        </div>
    </div>
    <div class="main_section">

        <div class="title col">
            <h1>
                快速出庫
            </h1>
        </div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>
                        申請人員 : {{ utilsStore.userName }}
                    </p>
                </div>
                <div>
                    <p>
                        申請日期 : {{ utilsStore.today }}
                    </p>
                </div>
            </div>
            <div class="content">
                <!-- 用途 -->
                <div class="row">
                    <div class="col-12">
                        <div class="input-group mb-3 check_box_wrap">
                            <div class="input-group-prepend check_box">
                                <span>*</span>用途 :
                            </div>
                            <div class="d-flex align-items-center radio_wrap">
                                <template v-for="(option, index) in rentStore.DropdownArray.Use" :key="option">
                                    <div class="form-check d-flex align-items-center">
                                        <input type="radio" class="form-check-input check_box" :id="'radio' + index"
                                            style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"
                                            :value="option" v-model="Form.Use" />
                                        <label class="form-check-label check_box" :for="'radio' + index">{{ option
                                            }}</label>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 領用人員 -->
                <div class="col-xl-5 col-lg-5 col-md-5 col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> <span>*</span>領用人員 :</div>
                        <select class="form-select" v-model="Form.Recipient">
                            <option value="">--請選擇--</option>
                            <option v-for="option in DropdownArray.Recipient" :value="option">{{ option }}</option>
                        </select>
                    </div>
                </div>
                <!-- 專案代碼 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span>*</span>專案代碼 :
                        </div>
                        <div class="option_section">
                            <vue-multiselect v-model="Form.ProjectSelect" :options="DropdownArray.ProjectCode"
                                :allow-empty="false" :max-height="300" placeholder="請選擇" label="Text"
                                :showLabels="false" track-by="Text" :show-no-results="false"
                                @select="rentStore.onProjectSelect">
                            </vue-multiselect>
                        </div>
                    </div>
                </div>

                <!-- 説明 -->
                <div class="col mb-3">
                    <div class="input-group">
                        <div class="input-group-prepend">説明 :</div>
                        <textarea style="height: 200px;" class="form-control" placeholder="最多輸入100字"
                            v-model="Form.Description"></textarea>
                    </div>
                </div>
            </div>

        </div>
        <div class="info_wrap">
            <button class="add_btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="updateProjectCode">新增出庫資產</button>
            <div class="fixed_info">
                <div>
                    <p>
                        <span>*</span>資產出庫細項(請至少出庫一項)
                    </p>
                </div>

            </div>
            <div class="content">
                <DataTable :size="'small'" :value="Form.ItemList" resizableColumns columnResizeMode="expand"
                    showGridlines scrollable scrollHeight="510px" paginator :rows="10"
                    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                    <Column style="min-width: 60px;">
                        <template #body="slotProps">
                            <delete_btn :function="quickrentStore.deleteFromItemList"
                                :parameter1="slotProps.data.AssetsId" />
                        </template>
                    </Column>
                    <Column style="min-width: 60px;">
                        <template #body="slotProps">
                            <asset-view-btn :params="slotProps" />
                        </template>
                    </Column>
                    <Column field="OM_Number" header="選擇數量" sortable style="{'min-width': '100px';}"></Column>
                    <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable
                        :style="{ 'min-width': item.width }"></Column>
                </DataTable>
            </div>
        </div>
        <div class="col button_wrap">
            <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
            <button class="send_btn" data-bs-toggle="modal" data-bs-target="#ConfirmModal">送出</button>
        </div>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import confirm_modal from '@/components/utils/confirm_modal.vue'
import Navbar from '@/components/Navbar.vue';
import AssetViewBtn from '@/components/utils/asset_view_btn.vue'
import delete_btn from '@/components/utils/delete_btn.vue';
import quick_add_btn from "@/components/quick_rent_page/quick_add_btn.vue";
import Storage_number from "@/components/Storage_number_input"
import VueMultiselect from 'vue-multiselect'
import { useAPIStore, useUtilsStore } from '@/store';
import { useRentStore } from '@/store/rent/_index'
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useQuickRentStore } from '@/store/rent/quick';
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const rentStore = useRentStore();
const quickrentStore = useQuickRentStore();
const { Form, DropdownArray, searchParams, datagrid1, datagrid1field, rowData1 } = storeToRefs(rentStore);

const warningText = '按下確認後將無法再次變更，請確認是否正確填寫出庫項目';
onMounted(async () => {
    // utilsStore.$reset();
    rentStore.$reset();
    // DropdownArray.value.ProjectCode = [
    //     {Text: '專案1', Value: '0001'},
    //     {Text: '專案2', Value: '0002'},
    //     {Text: '專案3', Value: '0003'},
    //     {Text: '專案4', Value: '0004'},
    //     {Text: '專案5', Value: '0005'}
    // ]
    DropdownArray.value.Recipient = await apiStore.getCustodian('');
    DropdownArray.value.EquipType = await apiStore.getEquipType();
    DropdownArray.value.Area = await apiStore.getArea();
    DropdownArray.value.ProjectCode = await apiStore.getFuzzyProject();
    datagrid1.value.sortField = ''
    datagrid1field.value = [
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
})
onUnmounted(() => {
    utilsStore.$dispose();
    rentStore.$dispose();
    apiStore.$dispose();
})
const updateProjectCode = () => {
    searchParams.value.ProjectCode = Form.value.ProjectCode;
    searchParams.value.ProjectSelect = Form.value.ProjectSelect;
    quickrentStore.searchInventory('', 'search');
}

const resetParams = () => {
    quickrentStore.clear();
    quickrentStore.searchInventory('', 'search');
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.radio_wrap .form-check {
  gap: 0 5px;
}

.modal .modal-body {
  padding: 0 !important;
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;
}

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

.options-list {
  position: absolute;
  z-index: 99;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  top: 40px;
}

.options-list li {
  padding: 10px 10px 0;
  font-size: 18px;
  cursor: pointer;
}

.add_btn {
  display: inline-flex;
  padding: 10px 25px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #314f7a;
  height: 50px;
  width: 174px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  border: none;
  margin-bottom: 20px;

  &:hover {
    background-color: #456ca7;
  }
}

.check_box_wrap {
  font-weight: 700;
  align-items: center;
  color: white;
  font-size: 18px;

  div:nth-child(2) {
    gap: 0 10px;
    display: flex;
  }
}

.modal {
  padding: 0 5%;

  .modal-content {
    background: unset;
    border: 0;
  }

  .fixed_info {
    @include fixed_info;
    background: #528091 !important;
    border-radius: 0 !important;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
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
    }
  }

  .list {
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
  }

  .second_content {
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    background: #d9d9d9;
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
      background: #48658c;
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

span {
  @include red_star;
}

.input-number {
  @include count_btn;
}

.fixed_info {
  @include fixed_info;

  p {
    font-size: 20px;
    margin-bottom: 0 !important;
  }
}

.main_section {
  .info_wrap {
    .content {
      @include content_bg;

      .input-group {
        flex-wrap: nowrap;

        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
        }
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .modal .second_content .wrap1 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 15px;
    padding: 10px 80px;
  }
  .main_section {
    .info_wrap {
      margin: auto;
      .option_section {
        width: 85%;
        .options-list {
          width: 84%;
        }
      }
      .input-number {
        width: 65%;
      }

      .content {
        .input-group {
          flex-wrap: nowrap;
          .input-group-prepend {
            width: calc(100px + 6%);
            text-align: end;
            white-space: nowrap;
            width: 120px;
          }
        }
      }
    }
    .info_wrap:nth-child(2) {
      width: 850px;
      margin-bottom: 60px;
    }
    .info_wrap:nth-child(3) {
      width: 1200px;
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .modal .second_content .wrap1 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 15px;
    padding: 10px 40px;
  }
  .main_section {
    .info_wrap {
      margin: auto;
      width: 700px;
      .option_section {
        width: 80%;
        .options-list {
          width: 79%;
        }
      }
      .input-number {
        width: 65%;
      }

      .content {
        .input-group {
          flex-wrap: nowrap;
          .input-group-prepend {
            width: calc(100px + 6%);
            text-align: end;
            white-space: nowrap;
            width: 120px;
          }
        }
      }
    }
    .info_wrap:nth-child(3) {
      margin-top: 60px;
    }
  }
}
@media only screen and (max-width: 767px) {
  .modal {
    .second_content .wrap1 {
      gap: 10px;
      padding: 5px;
    }
  }
  .modal {
    .fixed_info button {
      position: absolute;
      right: 10px;
    }
  }
  .main_section {
    .info_wrap {
      padding: 5%;
      .input-group {
        flex-direction: column;
        align-items: flex-start;
        select,
        .option_section,
        textarea {
          width: 100%;
        }
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
        }
      }
      .input-group
        > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
          .valid-feedback
        ):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: unset !important;
        margin-top: 5px;
      }
      .input-number {
        width: 65%;
      }
      .fixed_info {
        flex-direction: column;
        padding: 10px;
        height: unset !important;
      }
      .content {
        .check_box_wrap div:nth-child(2) {
          gap: 0 5px;
        }
        .options-list {
          margin-top: 35px;
        }
      }
    }
  }
}

</style>
