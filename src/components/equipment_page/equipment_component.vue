<template>
  <div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>設備整合箱</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>產編：</div>
            <input type="text" class="form-control text-center" placeholder="請輸入資產編號" />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>名稱：</div>
            <input type="text" class="form-control text-center" placeholder="最多輸入20字" />
          </div>
        </div>
        <div class="row row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex">儲位區域：</div>
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getAreaName">
                                {{ '請選擇' }}
                            </button>
                <div class="dropdown-menu" aria-labelledby="areaDropdown">
                  <!-- <p v-for="(item, index) in DropdownArray.Area" :key="index" class="dropdown-item"
                                    @click="selectArea(item)">{{ item.Name }}</p> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex">儲位櫃位：</div>
              <div class="dropdown">
                <!-- <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" :disabled="formParams.AreaName === ''">
                                {{ LayerInit }}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                                <p v-for="(item, index) in DropdownArray.Layer" :key="index" class="dropdown-item"
                                    @click="selectLayer(item)">{{ item.Name }}</p>
                            </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保管人員：</div>
              <div class="dropdown">
                <!-- <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                {{ '請選擇' }}
                            </button>
                            <div class="dropdown-menu">
                                <p v-for="(item, index) in DropdownArray.Custodian" :key="index" class="dropdown-item"
                                    @click="selectAccount(item)">{{ item }}</p>
                            </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合人員：</div>
              <input type="text" class="form-control readonly_box" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">整合日期：</div>
              <input type="text" class="form-control readonly_box" readonly />
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
                  <!-- <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                        {{ searchParams.EquipTypeName || '請選擇' }}
                      </button>
                      <div class="dropdown-menu" aria-labelledby="typeDropdown">
                        <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item"
                          @click="selectType(item)">{{ item.Name }}</p>
                      </div> -->
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
              <div class="input-group mb-3">
                <div class="input-group-prepend flex">設備分類：</div>
                <div class="dropdown">
                  <!-- <button style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap' class="btn dropdown-toggle"
                        type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false" :class="{ disabled: !(searchParams.EquipTypeName !== '') }">
                        {{ searchParams.EquipCategoryName || EquipCategoryInit }}
                      </button>
                      <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                        <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item"
                          @click="selectCategory(item)">{{ item.Name }}</p>
                      </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="btn_section">
            <!-- <button class="send_btn" data-bs-toggle="modal" data-bs-target="#searchModal"
                  @click="searchInventory('', 'search', 'add')">搜索庫存</button> -->
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
                            <!-- <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                                  {{ searchParams.EquipTypeName || '請選擇' }}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="typeDropdown">
                                  <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item"
                                    @click="selectType(item)">{{ item.Name }}</p>
                                </div> -->
                          </div>
                        </div>
                        <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                          <p>設備分類</p>
                          <div class="dropdown">
                            <!-- <button style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap'
                                  class="btn dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false"
                                  :class="{ disabled: !(searchParams.EquipTypeName !== '') }">
                                  {{ searchParams.EquipCategoryName || EquipCategoryInit }}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="categoryDropdown">
                                  <p v-for="(item, index) in DropdownArray.EquipCategory" :key="index" class="dropdown-item"
                                    @click="selectCategory(item)">{{ item.Name }}</p>
                                </div> -->
                          </div>
                        </div>
                        <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                          <p>物品名稱</p>
                          <input type="text" class="form-control text-center" placeholder="最多輸入20字" />
                        </div>
                      </div>
                      <div class='col d-flex justify-content-center'>
                        <button class="btn submit_btn" type="button" @click="searchInventory('', 'search')">搜尋庫存</button>
                      </div>
                    </div>
                  </div>
                  <div class="fixed_info">
                    <div>
                      <p>目前資產庫存</p>
                    </div>
                  </div>
                  <!-- <DataTable lazy :key="datagrid.key" :first="datagrid.first" :size="'small'" :loading="datagrid.loading"
                        :value="rowData" :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns
                        columnResizeMode="expand" showGridlines scrollable scrollHeight="420px"
                        @page="searchInventory($event, 'page')" @sort="searchInventory($event, 'sort')" paginator
                        :rows="datagrid.rows" :totalRecords="datagrid.totalRecords"
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
                  </DataTable> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item_wrap">
          <!-- <list-item v-for="(item, index) in formParams.AssetList" :key="index" :edit_btn="false" :delete_btn="true"
            :AssetData="item" @deleteId="handleDelete">
          </list-item> -->
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>更換設備歷史紀錄</p>
        </div>
      </div>
      <div style="width: 100%" class="content">
        <!-- <DataTable
          lazy
          :key="datagrid.key"
          :first= "datagrid.first"
          :size="'small'"
          :loading="datagrid.loading"
          :value="rowData" 
          :sort-field="datagrid.sortField"
          :sort-order="datagrid.sortOrder"
          resizableColumns 
          columnResizeMode="expand"
          showGridlines 
          scrollable 
          scrollHeight="420px" 
          @page="getHistory($event , 'page')" 
          @sort="getHistory($event , 'sort')"
          paginator 
          :rows="datagrid.rows" 
          :totalRecords="datagrid.totalRecords"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          :rowsPerPageOptions="[10, 20, 30]"
          currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
          <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        </DataTable> -->
      </div>

    </div>
    </div>
</template>

<script>
  import ListItem from "@/components/Equipment/item.vue"
  export default {
    components: {
      ListItem,
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .item_wrap {
  height: 350px;
  overflow: auto;
  display: grid;
  gap: 20px 0;
}
span {
  @include red_star;
}
.modal-body {
  padding: 0 !important;
}
.info_wrap:nth-child(1) {
  margin-bottom: 3% !important;
}
.readonly_box {
  @include readonly_box;
}
h1 {
  text-align: center;
  font-weight: 600;
  @include title_color;
}
.fixed_title {
  @include fixed_title;
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
  .failed_storage {
    background-color: #8a2828;
    border: 1px solid white;
  }
}
.main_section {
  .fixed_info {
    @include fixed_info;
    p {
      font-size: 20px;
      margin-bottom: 0;
    }
  }

  .content {
    @include content_bg;
    .dropdown {
      width: 100%;
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
    }
    .search_section {
      background: #b5c9d0;
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
  .info_wrap:nth-child(3) {
    margin-top: 3%;
    .count {
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
            background: #ff7272;
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
@media only screen and (min-width: 1200px) {
  .main_section {
    h1 {
      margin: 50px 0 20px;
      font-size: 55px;
    }
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
            width: 100%;
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
      .count {
        .input-group {
          justify-content: left;
        }
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    h1 {
      margin-top: 30px;
      font-size: 55px;
      margin-bottom: 20px;
    }
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
        transform: translate3d(-1px, 35px, 0px) !important;
        max-height: 250px;
        overflow-y: auto;
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
}
@media only screen and (max-width: 767px) {
  .main_section {
    h1 {
      margin-top: 30px;
      font-size: 50px;
      margin-bottom: 20px;
    }
    .info_wrap {
      padding: 1% 5% 0;

      .fixed_info {
        flex-direction: column;
        height: unset;
        padding: 10px;
      }
      .content {
        .row {
          gap: 10px 0;
        }
        .dropdown {
          margin-left: unset !important;
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
      .input-group
        > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
          .valid-feedback
        ):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: unset !important;
        border-radius: 5px;
      }

      .count {
        .number-input-box {
          width: 100%;
          margin-left: unset !important;
        }
      }
    }
  }
  .modal {
    .fixed_info {
      button {
        font-size: 22px;
        position: absolute;
        right: 3%;
        top: 1%;
        padding: 0;
      }
    }
  }
}

</style>