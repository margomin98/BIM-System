<template>
  <div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>計畫內容</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend"><span>*</span>標題：</div>
            <input type="text" class="form-control text-center" placeholder="最多輸入20字" />
          </div>
        </div>
        <div class="row organizer_wrap">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend flex"><span>*</span>盤點人員：</div>
              <div class="dropdown">
                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  請選擇
                </button>
                <div class="dropdown-menu">
                  <!-- <p v-for="(item , index) in DropdownArray.InventoryStaff" :key="index" @click="selectStaff(item)">{{ item }}</p> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">盤點召集人：</div>
              <input type="text" class="form-control readonly_box organizer" readonly />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>盤點開始日期：</div>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" class="date-input" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-12 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend"><span>*</span>盤點結束日期：</div>
              <div class="date-selector">
                <div class="input-container">
                  <input type="date" class="date-input" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 專案代碼 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span>*</span>專案代碼：
            </div>
            <input type="text" class="form-control" placeholder="最多輸入10字" />
            <button class="form_search_btn" @click="getProjectName('upperForm')">搜尋</button>
          </div>
        </div>
        <!-- 專案名稱 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              專案名稱：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group" style="   justify-content: flex-start;">
            <div class="input-group-prepend"><span>*</span>盤點類型：</div>
            <!-- <div class="check_section">
                  <template v-for="(item , index) in PlanType" :key="item">
                    <div class="form-check d-flex align-items-center">
                      <input type="radio" :id="`no${index}`" name="radio" :value="item" />
                      <label :for="`no${index}`">{{ item }}</label>
                    </div>
</template>
        </div> -->
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
          <p>應盤內容 ： 項</p>
        </div>
        <div>
          <p>合格項目 ： 項</p>
        </div>
        <div>
          <p>差異項目 ：項</p>
        </div>
      </div>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>差異細項</p>
        </div>
      </div>
      <!-- <div class="content">
        <div style="width: 100%">
          <DataTable 
            :size="'small'"
            :value="rowData1" 
            resizableColumns 
            columnResizeMode="expand"
            showGridlines 
            scrollable 
            scrollHeight="820px" 
            v-model:selection="datagrid1.selectedList" 
            sort-field="NotBalanced"
            :sort-order= -1
            paginator
            :rows="20"
            @page="updatePage($event)"
            :row-style="({ NotBalanced }) => NotBalanced ? 'background-color: #FFE1E1;': null "
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
            <Column style="min-width: 50px;" header="項目">
<template #body="slotProps">
   {{ calculateIndex(1,slotProps) }}
</template>
            </Column>
            <Column style="min-width: 60px;">
<template #body="slotProps">
  <List_view_button :params="slotProps" />
</template>
            </Column>
            <Column header="認列" class="datatable_checkbox">
<template #body="slotProps">
  <input class="p-checkbox p-component" type="checkbox" :disabled="!slotProps.data.NotBalanced" :checked="!slotProps.data.NotBalanced" @change="updateList($event,slotProps)" />
</template>
            </Column>
            <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
          </DataTable>
        </div>
      </div> -->
      <div class="bottom_fixed">
        <div class="col d-flex auth_section">
          <div class="input-group">
            <div class="input-group-prepend">認列人員：</div>
            <input type="text" class="form-control text-center readonly_box" readonly />
            <!-- <span class="icon-container">
              <img src="@/assets/accept.png" class="checkmark-icon" />
            </span> -->
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
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">密碼：</div>
                    <input type="password" class="form-control" />
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
        <!-- <button class="send_btn" :class="{send_btn_disabled: !validation.isVerified}" @click="submit" :disabled="!validation.isVerified">確定認列</button>
        <button class="send_btn" :class="{send_btn_disabled: !validation.isVerified}" :disabled="!validation.isVerified" data-bs-toggle="modal" data-bs-target="#force_modal">完成平帳</button> -->
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
      <div class="col">
        <button class="add_btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
          @click="searchInventory('', 'search')">新增盤點項目</button>
        <!-- Modal -->
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
                    <div class='col'>
                      <p>設備總類</p>
                      <div class="dropdown">
                        <!-- <button class="btn dropdown-toggle" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getEquipTypeName">
                                            請選擇
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="typeDropdown">
                                            <p v-for="(item, index) in DropdownArray.EquipType" :key="index" class="dropdown-item" @click="selectType(item)">{{ item.Name }}</p>
                                        </div> -->
                      </div>
                    </div>
                    <!-- ... (other form fields) ... -->
                  </div>
                  <div class='col d-flex justify-content-center'>
                    <button class="btn submit_btn" type="button" @click="searchInventory('', 'search')">搜尋</button>
                    <button class="btn submit_btn" style="margin-left: 0.5rem;" type="button" @click="clear">清空</button>
                    <button class="btn add_btn" style="margin-left: 0.5rem;" type="button" data-bs-dismiss="modal"
                      @click="addList">加入</button>
                  </div>
                </div>
              </div>
              <div class="fixed_info">
                <div>
                  <p>目前資產庫存</p>
                </div>
              </div>
              <!-- <DataTable lazy :first="datagrid1.first" :size="'small'" :loading="datagrid1.loading" :value="rowData1" :sort-field="datagrid1.sortField" :sort-order="datagrid1.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="510px"
                        @page="searchInventory($event , 'page')" @sort="searchInventory($event , 'sort')" v-model:selection="datagrid1.selectedList" :selectAll="datagrid1.selectAll" @select-all-change="onSelectAll" @row-unselect="onRowUnselect" paginator :rows="10"
                        :totalRecords="datagrid1.totalRecords" paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                        <Column style="min-width: 60px;">
<template #body="slotProps">
  <List_view_button :params="slotProps" />
</template>
                        </Column>
                      
                    </DataTable> -->
            </div>
          </div>
        </div>
      </div>
      <div class="fixed_info">
        <div>
          <p><span>*</span>盤點範圍(請至少新增一項)</p>
        </div>
      </div>
      <div class="content">
        <div>
          <h2 class="no_content_text">尚未選取盤點項目</h2>
        </div>
        <div class="search_wrap col">
          <div class="title">
            <div>
              <p>掃描盤點</p>
            </div>
          </div>
          <div class="content">
            <div class="col">
              <div class="input-group">
                <div class="search_section">
                  <div class="input-wrapper">
                    <input ref="myInput" placeholder="請掃描資產編號" class="text-center" v-model="InputAssetsId" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col button">
              <button class="search_btn" @click="getDatagrid('', 'search');">
                搜索
              </button>
              <button class="empty_btn" @click="clear">清空</button>
            </div>
          </div>

        </div>
        <div style="height: 100%;">
          <!-- <DataTable 
                lazy 
                :first= "datagrid2.first"
                :size="'small'"
                :loading="datagrid2.loading"
                :value="rowData2" 
                :sort-field="datagrid2.sortField"
                :sort-order="datagrid2.sortOrder"
                resizableColumns 
                columnResizeMode="expand"
                showGridlines 
                scrollable 
                scrollHeight="820px" 
                @page="getRangeOfPlan($event , 'page')" 
                @sort="getRangeOfPlan($event , 'sort')"
                paginator 
                :rows="20" 
                :totalRecords="datagrid2.totalRecords"
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                <Column style="min-width: 60px;">
<template #body="slotProps">
  <Inventory_delete_button :params="slotProps" @delete="deleteFromAssetList" />
</template>
                </Column>
                <Column style="min-width: 60px;">
<template #body="slotProps">
  <List_view_button :params="slotProps" />
</template>
                </Column>
   
            </DataTable> -->
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>



  </div>
</template>



<style lang="scss" scoped>
@import "@/assets/css/global.scss";

span {
  @include red_star;
}

h1 {
  text-align: center;
  font-weight: 600;
  @include title_color;
}

.main_section {
  input {
    @include dropdown_btn;
    height: 35px;
  }

  .readonly_box {
    @include readonly_box;
  }

  .info_wrap {
    .fixed_title {
      @include fixed_title;
    }

    .fixed_info {
      @include fixed_info;

      p {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    .add_btn {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 9px;
      background: #314f7a;
      height: 50px;
      width: 150px;
      color: #fff;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      border: none;

      &:hover {
        background-color: #456ca7;
      }
    }

    .content {
      @include content_bg;

      .dropdown {
        .dropdown-menu {
          p {
            text-align: left;
            padding: 0 10px;
          }
        }

        button {
          border: none;
    border-radius: 5px;
    font-size: 18px;
    width: 100%;
    color: black;
    justify-content: space-between;
    align-items: center;
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
  }
}

.form_search_btn {
  @include form_search_btn;

  &:hover {
    background-color: #43546d;
  }
}

.no_content_text {
  padding: 5px 0;
  text-align: center;
  font-weight: 700;
}

.modal {
  .dropdown-toggle {
    width: 100%;
  }

  padding: 0 5%;

  .modal-content {
    background: unset;
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
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 40px 5px;

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

.modal-body {
  padding: 0 !important;
}

.search_wrap {
  margin-bottom: 20px;

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

    p {
      margin-bottom: 0;
    }
  }

  .content {
    background-color: #c3d3da !important;
  }

  .button {
    display: flex;
    margin-top: 20px;
    justify-content: center;
    gap: 20px;

    button.empty_btn {
      @include empty_btn;

      &:hover {
        background-color: #244f86;
      }
    }

    button.search_btn {
      @include search_and_send_btn;

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
  padding: 0 30%;

  .input-group {
    height: auto;
    input{
      width: 100% !important;
    }
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

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap:nth-child(1) {
      margin-bottom: 3%;
    }

    h1 {
      margin-top: 80px;
      margin-bottom: 40px;
      font-size: 55px;
    }

    .info_wrap {
      margin: auto;
      width: 800px;

      .date-input {
        width: 120%;
      }

      .add_btn {
        padding: 10px 20px;
        margin-bottom: 20px;
      }

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
          width: 55%;

          .dropdown-menu {
            width: 100%;
          }
        }

        .input-group {
          justify-content: right;
          flex-wrap: nowrap;

          .form-control {
            border-radius: 5px;
          }

          .input-group-prepend {
            white-space: nowrap;

            width: 157px;
            text-align: end;
          }
        }

        .check_section {
          gap: 10px;
          display: flex;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-menu {
          width: 100%;
          transform: translate3d(-1px, 35px, 0px) !important;
          max-height: 250px;
          overflow-y: auto;

          p {
            padding-top: 5px;
            text-align: left;
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
    }

    .row:nth-child(3) {
      .input-group {
        justify-content: flex-start;
      }
    }
  }

  .modal {
    padding: 0 5%;

    .fixed_info {
      div {
        flex-grow: 1;
        text-align: center;
      }

      p {
        font-size: 20px;
        margin-bottom: 0 !important;
      }
    }

    .second_content {
      p.content {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        background: white;
        height: 35px;
        border-radius: 5px;
      }

      .wrap1 {
        gap: 15px;
        padding: 10px 80px;

        div {
          padding: 0 5px;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap:nth-child(1) {
      margin-bottom: 3%;
    }
    h1 {
      margin-top: 80px;
      margin-bottom: 40px;
      font-size: 55px;
    }

    .info_wrap {
      margin: auto;
      width: 700px;

      .add_btn {
        padding: 10px 20px;
        margin-bottom: 20px;
      }

      .content {
        .organizer_wrap {
          --bs-gutter-x: unset;
        }

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
          }
        }

        .input-group {
          flex-wrap: nowrap;

          .form-control {
            width: 55%;
          }

          .input-group-prepend {
            white-space: nowrap;

            width: 170px;
            text-align: end;
          }
        }

        .check_section {
          gap: 10px;
          display: flex;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-menu {
          width: 100%;
          transform: translate3d(-1px, 35px, 0px) !important;
          max-height: 250px;
          overflow-y: auto;

          p {
            padding-top: 5px;
            text-align: left;
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
    }
  }

  .modal {
    padding-left: 5% !important;

    .second_content {
      p.content {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        background: white;
        height: 35px;
        border-radius: 5px;
      }

      .wrap1 {
        div {
          padding: 0 5px;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    padding: 5% 0;
    .info_wrap:nth-child(2) {
      margin: 5% 0;
    }

    .input-group
      > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
        .valid-feedback
      ):not(.invalid-tooltip):not(.invalid-feedback) {
      margin-left: 0 !important;
      border-radius: 5px;
    }

    h1 {
      margin-top: 50px;
      font-size: 50px;
    }

    .info_wrap {
      .date-input {
        width: 100%;
      }

      .form_search_btn {
        margin-top: 10px;
      }

      .fixed_info {
        flex-direction: column;
        height: unset;
        padding: 10px;
      }

      .add_btn {
        padding: 10px;
        margin-bottom: 15px;
      }

      .content {
        flex-direction: column;

        p {
          font-weight: 700;
          margin-bottom: 5px;
          color: white;
        }

        .dropdown {
          margin-left: unset !important;

          .dropdown-menu {
            width: 100%;
          }
        }

        .input-group {
        flex-direction: column;
    
          .input-number {
            width: 100%;
          }

          .form-control {
            width: 100%;
            border-radius: 5px;
            margin-left: unset !important;
          }

          .input-group-prepend {
            margin-bottom: 5px;
            white-space: nowrap;
          }
        }
      }
      .auth_section{
        .input-group{
          flex-direction: unset;
          flex-wrap: nowrap;
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
      .dropdown {
        height: 35px;
        @include dropdown_btn;
      }
      .button_wrap,
      .search_wrap .search_section {
        padding: unset;
      }
      .bottom_fixed {
        padding:0 10px;
      }
    }
  }

  .modal {
    padding-left: 5% !important;

    .fixed_info {
      p {
        font-size: 18px;
      }
    }

    .second_content {
      .wrap1 {
        p.content {
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          background: white;
          height: 35px;
          border-radius: 5px;
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
          margin: 0 0 10px;

          p {
            padding: 5px 5px 0;
          }
        }
      }
    }
  }

  .check_section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 5px;
    margin-left: 0 !important;
  }
}

</style>