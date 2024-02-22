<template>
  <!-- Modal -->
  <button type="button" style="display: none;" data-bs-toggle="modal" data-bs-target="#ExecuteModal" ref="exbtn"></button>
  <button type="button" style="display: none;" data-bs-toggle="modal" data-bs-target="#LineModal" ref="linebtn"></button>
  <Confirm_modal :id="'ExecuteModal'" :text="warningText" :function="changeIsExcute" :parameter1="itemData"
    @cancel="submit('DeliveredItem', '', '')"></Confirm_modal>
  <Line_modal :id="'LineModal'" :isChecked="SwitchProps" @confirm="handleLineSwitch"
    @cancel="() => { lineSwitch.checked = !lineSwitch.checked; SwitchProps = !SwitchProps }"></Line_modal>
  <!-- 金額支出modal -->
  <div class="modal fade" id="amount_pie_modal" tabindex="-1" aria-labelledby="amount_pie_modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">金額支出詳情</h5>
          <div class="close_icon">
            <p type="button" data-bs-dismiss="modal" aria-label="Close">X</p>
          </div>
        </div>
        <div class="modal-body">
          <div v-show="amount_pie_data.length !== 0">
            <div id="amount_pie" class="modal_pie"></div>
            <div class="amount_text d-flex">
              <p>總金額
              <p class="amount">{{ total_amount.toLocaleString() }}</p>
              </p>
            </div>
          </div>
          <div v-show="amount_pie_data.length == 0">
            <div class="empty_text d-flex">
              <p>無數據</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 件數modal -->
  <div class="modal fade" id="case_pie_modal" tabindex="-1" aria-labelledby="case_pie_modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">件數詳情</h5>
          <div class="close_icon">
            <p type="button" data-bs-dismiss="modal" aria-label="Close">X</p>
          </div>
        </div>
        <div class="modal-body">
          <div v-show="case_pie_data.length !== 0">
            <div id="case_pie" class="modal_pie"></div>
            <div class="amount_text d-flex">
              <p>總件數
              <p>{{ total_case.toLocaleString() }}</p>
              </p>
            </div>
          </div>
          <div v-show="case_pie_data.length == 0">
            <div class="empty_text d-flex">
              <p>無數據</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Navbar />
  <div class="row g-0 home_section">
    <div class="col-xl-auto col-lg-12 col-md-12 col-12 pt_left">
      <div class="user_line_wrap">
        <!-- 用戶名字 -->
        <div class="user_info">
          <div class="profile_icon">
            <img src="@/assets/manager_profile.png">
          </div>
          <div class="profile_name">
            <h4 class="name">{{ utilsStore.userName }}</h4>
          </div>
        </div>
        <!-- Lline通知 -->
        <div class="line_notification d-flex">
          <div class="line_title d-flex">
            <img src="@/assets/line.png">
            <p>LINE 通知設定</p>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" ref="lineSwitch" @change="clickLineSwitch">
          </div>
        </div>
      </div>
      <!-- 有代碼搜索框 -->
      <div class="code_search">
        <div class="search_section">
          <input type="text" placeholder="請輸入代碼或名稱" v-model="project.input">
        </div>
        <div class="search_result">
          <perfect-scrollbar>
            <div v-for="option in filterProject" class="result_wrap"
              :class="{ 'selected': project.Project_Id === option.Value }" @click="selectProject(option)">
              <p class="case_code d-flex">{{ option.Value }}</p>
              <p class="case_name">{{ option.Text }}</p>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
      <!-- 沒有代碼搜索框 -->
      <!-- <div class="code_search with_search_input">
        <div class="search_result">
          <perfect-scrollbar>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap selected">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期第三期</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">148944568</p>
              <p class="case_name">中興_台電離岸風力發電第100000期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
          </perfect-scrollbar>
        </div>
      </div> -->
    </div>
    <div class="col pt_center">
      <div class="datagrid_section">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <!-- 總覽庫房資產 -->
          <li v-show="roleId === 1 || roleId === 4" class="nav-item" role="presentation">
            <button class="nav-link " id="home-tab" data-bs-toggle="tab" data-bs-target="#TotalProperty" type="button"
              role="tab" aria-controls="home" aria-selected="true">總覽庫房資產</button>
          </li>
          <!-- 待採購清單 -->
          <li v-show="roleId === 1 || roleId === 4" class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#PurchaseList" type="button"
              role="tab" aria-controls="profile" aria-selected="false">待採購清單</button>
          </li>
          <!-- 待交付資產列表 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link " id="contact-tab" data-bs-toggle="tab" data-bs-target="#ProcessProperty"
              type="button" role="tab" aria-controls="contact" aria-selected="false">待交付資產列表</button>
          </li>
          <!-- 名下保管資產 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link  " id="contact-tab" data-bs-toggle="tab" data-bs-target="#organizeProperty"
              type="button" role="tab" aria-controls="contact" aria-selected="false">名下保管資產</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <!-- 總覽庫房資產 -->
          <div v-show="roleId === 1 || roleId === 4" class="tab-pane fade TotalProperty" id="TotalProperty"
            role="tabpanel" aria-labelledby="home-tab">
            <div class="row dg_search_wrap">
              <!-- 資產類型 -->
              <div class="col">
                <p>資產類型</p>
                <select class="date-input form-select" v-model="Warehouse.searchParams.AssetType">
                  <option value="">--請選擇--</option>
                  <option value="資產">資產</option>
                  <option value="存貨">存貨</option>
                  <option value="耗材">耗材</option>
                </select>
              </div>
              <!-- 資產狀態 -->
              <div class="col">
                <p>資產狀態</p>
                <select class="form-select" v-model="Warehouse.searchParams.Status">
                  <option value="">--請選擇--</option>
                  <option v-for="(item, index) in Asset_StastusArray" :key="index" :value="item">{{ item }}</option>
                </select>
              </div>
              <!-- 資產編號 -->
              <div class="col">
                <p>資產編號</p>
                <input type="text" placeholder="請輸入資產編號" v-model="CustodyAssets.searchParams.AssetsId" />
              </div>
              <!-- 物品名稱 -->
              <div class="col">
                <p>物品名稱</p>
                <input type="text" placeholder="最多輸入20字" v-model="CustodyAssets.searchParams.AssetName" />
              </div>
              <!-- 設備總類 -->
              <div class="col">
                <p>設備總類</p>
                <select class="form-select" v-model="Warehouse.searchParams.EquipType_Id"
                  @change="async () => { Warehouse.DropdownArray.EquipCategory = await apiStore.getEquipCategory(Warehouse.searchParams.EquipType_Id); Warehouse.searchParams.Category_Id = ''; }">
                  <option value="">--請選擇--</option>
                  <option v-for="(option, index) in util_Dropdown.EquipType" :key="index" :value="option.Id">{{
                    option.Name }}</option>
                </select>
              </div>
              <!-- 設備分類 -->
              <div class="col">
                <p>設備分類</p>
                <select class="date-input form-select" v-model="Warehouse.searchParams.Category_Id">
                  <option v-if="Warehouse.DropdownArray.EquipCategory.length === 0" value="">--請先選擇設備總類--</option>
                  <template v-else>
                    <option value="">--請選擇--</option>
                    <option v-for="(option, index) in Warehouse.DropdownArray.EquipCategory" :key="index"
                      :value="option.Id">{{ option.Name }}</option>
                  </template>
                </select>
              </div>
              <!-- 儲位區域 -->
              <div class="col">
                <p>儲位區域</p>
                <select class="form-select" v-model="Warehouse.searchParams.Area_Id"
                  @change="async () => { Warehouse.DropdownArray.Layer = await apiStore.getLayer(Warehouse.searchParams.Area_Id); Warehouse.searchParams.Layer_Id = ''; }">
                  <option value="">--請選擇--</option>
                  <option v-for="(option, index) in util_Dropdown.Area" :key="index" :value="option.Id">{{ option.Name }}
                  </option>
                </select>
              </div>
              <!-- 儲位櫃位 -->
              <div class="col">
                <p>儲位櫃位</p>
                <select class="date-input form-select" v-model="Warehouse.searchParams.Layer_Id">
                  <option v-if="Warehouse.DropdownArray.Layer.length === 0" value="">--請先選擇儲位區域--</option>
                  <template v-else>
                    <option value="">--請選擇--</option>
                    <option v-for="(option, index) in Warehouse.DropdownArray.Layer" :key="index" :value="option.Id">{{
                      option.Name }}</option>
                  </template>
                </select>
              </div>
            </div>
            <div class="button_wrap">
              <button class="search_btn" @click="submit('Warehouse', '', 'search')">檢索</button>
              <button class="reset_btn" @click="clear('Warehouse')">重設</button>
            </div>
            <div class="dg">
              <DataTable lazy :key="Warehouse.datagrid.key" :first="Warehouse.datagrid.first" :size="'small'"
                :loading="Warehouse.datagrid.loading" :value="Warehouse.rowData"
                :sort-field="Warehouse.datagrid.sortField" :sort-order="Warehouse.datagrid.sortOrder" resizableColumns
                columnResizeMode="expand" showGridlines scrollable scrollHeight="420px"
                @page="submit('Warehouse', $event, 'page')" @sort="submit('Warehouse', $event, 'sort')" paginator
                :rows="Warehouse.datagrid.rows" :totalRecords="Warehouse.datagrid.totalRecords"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                :rowsPerPageOptions="[10, 20, 30]"
                currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                <Column style="min-width: 60px;">
                  <template #body="slotProps">
                    <asset_view_btn :params="slotProps" />
                  </template>
                </Column>
                <Column v-for="item in Warehouse.datagridField" :field="item.field" :header="item.header" sortable
                  :style="{ 'min-width': item.width }"></Column>
              </DataTable>
            </div>
          </div>
          <!-- 待採購清單 -->
          <div v-show="roleId === 1 || roleId === 4" class="tab-pane fade PurchaseList" id="PurchaseList" role="tabpanel"
            aria-labelledby="profile-tab">
            <div class="row dg_search_wrap">
              <!-- 採購項目 -->
              <div class="col-xl-auto col-lg-auto col-md col-12">
                <p>採購項目</p>
                <input type="text" placeholder="最多輸入20字" v-model="PurchasedItem.searchParams.PurchasedItem" />
              </div>
              <!-- 交貨期限(起) -->
              <div class="col-xl-auto col-lg-auto col-md col-12">
                <p>交貨期限(起)</p>
                <input type="date" v-model="PurchasedItem.searchParams.StartDate">
              </div>
              <!-- 交貨期限(訖) -->
              <div class="col-xl-auto col-lg-auto col-md col-12">
                <p>交貨期限(訖)</p>
                <input type="date" v-model="PurchasedItem.searchParams.EndDate">
              </div>
              <div class="col-xl-auto col-lg-auto button_wrap">
                <button class="search_btn" @click="submit('PurchasedItem', '', 'search')">檢索</button>
                <button class="reset_btn" @click="clear('PurchasedItem')">重設</button>
              </div>
            </div>
            <div class="dg">
              <DataTable lazy :key="PurchasedItem.datagrid.key" :first="PurchasedItem.datagrid.first" :size="'small'"
                :loading="PurchasedItem.datagrid.loading" :value="PurchasedItem.rowData"
                :sort-field="PurchasedItem.datagrid.sortField" :sort-order="PurchasedItem.datagrid.sortOrder"
                resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px"
                @page="submit('PurchasedItem', $event, 'page')" @sort="submit('PurchasedItem', $event, 'sort')" paginator
                :rows="PurchasedItem.datagrid.rows" :totalRecords="PurchasedItem.datagrid.totalRecords"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                :row-style="({ IsDue }) => IsDue ? 'background-color: #FFE1E1;' : null" :rowsPerPageOptions="[10, 20, 30]"
                currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                <Column style="min-width: 60px;">
                  <template #body="slotProps">
                    <purchase_view_btn :params="slotProps" />
                  </template>
                </Column>
                <Column v-for="item in PurchasedItem.datagridField" :field="item.field" :header="item.header" sortable
                  :style="{ 'min-width': item.width }"></Column>
              </DataTable>
            </div>
          </div>
          <!-- 待交付資產列表 -->
          <div class="tab-pane fade ProcessProperty " id="ProcessProperty" role="tabpanel" aria-labelledby="contact-tab">
            <div class="warn_text">
              <p>
                *若未實際收到該資產而無法交付時，請按下拒絕交付後主動與指派人確認
              </p>
            </div>
            <div class="dg">
              <DataTable lazy :key="DeliveredItem.datagrid.key" :first="DeliveredItem.datagrid.first" :size="'small'"
                :loading="DeliveredItem.datagrid.loading" :value="DeliveredItem.rowData"
                :sort-field="DeliveredItem.datagrid.sortField" :sort-order="DeliveredItem.datagrid.sortOrder"
                resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px"
                @page="submit('DeliveredItem', $event, 'page')" @sort="submit('DeliveredItem', $event, 'sort')" paginator
                :rows="DeliveredItem.datagrid.rows" :totalRecords="DeliveredItem.datagrid.totalRecords"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                :rowsPerPageOptions="[10, 20, 30]"
                currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                <Column style="min-width: 60px;" header="接受交付">
                  <template #body="slotProps">
                    <input type="radio" value="true" v-model="slotProps.data.IsExecute"
                      @change="updateItemData(slotProps.data)">
                  </template>
                </Column>
                <Column style="min-width: 60px;" header="拒絕交付">
                  <template #body="slotProps">
                    <input type="radio" value="false" v-model="slotProps.data.IsExecute"
                      @change="updateItemData(slotProps.data)">
                  </template>
                </Column>
                <Column v-for="item in DeliveredItem.datagridField" :field="item.field" :header="item.header" sortable
                  :style="{ 'min-width': item.width }"></Column>
              </DataTable>
            </div>
          </div>
          <!-- 名下保管資產 -->
          <div class="tab-pane fade organizeProperty" id="organizeProperty" role="tabpanel" aria-labelledby="contact-tab">
            <div class="row dg_search_wrap">
              <!-- 設備總類 -->
              <div class="col">
                <p>設備總類</p>
                <select class="form-select" v-model="CustodyAssets.searchParams.EquipType_Id"
                  @change="async () => { CustodyAssets.DropdownArray.EquipCategory = await apiStore.getEquipCategory(CustodyAssets.searchParams.EquipType_Id); CustodyAssets.searchParams.Category_Id = ''; }">
                  <option value="">--請選擇--</option>
                  <option v-for="(option, index) in util_Dropdown.EquipType" :key="index" :value="option.Id">{{
                    option.Name }}</option>
                </select>
              </div>
              <!-- 設備分類 -->
              <div class="col">
                <p>設備分類</p>
                <select class="date-input form-select" v-model="CustodyAssets.searchParams.Category_Id">
                  <option v-if="CustodyAssets.DropdownArray.EquipCategory.length === 0" value="">--請先選擇設備總類--</option>
                  <template v-else>
                    <option value="">--請選擇--</option>
                    <option v-for="(option, index) in CustodyAssets.DropdownArray.EquipCategory" :key="index"
                      :value="option.Id">{{ option.Name }}</option>
                  </template>
                </select>
              </div>
              <!-- 儲位區域 -->
              <div class="col">
                <p>儲位區域</p>
                <select class="form-select" v-model="CustodyAssets.searchParams.Area_Id"
                  @change="async () => { CustodyAssets.DropdownArray.Layer = await apiStore.getLayer(CustodyAssets.searchParams.Area_Id); CustodyAssets.searchParams.Layer_Id = ''; }">
                  <option value="">--請選擇--</option>
                  <option v-for="(option, index) in util_Dropdown.Area" :key="index" :value="option.Id">{{ option.Name }}
                  </option>
                </select>
              </div>
              <!-- 儲位櫃位 -->
              <div class="col">
                <p>儲位櫃位</p>
                <select class="date-input form-select" v-model="CustodyAssets.searchParams.Layer_Id">
                  <option v-if="CustodyAssets.DropdownArray.Layer.length === 0" value="">--請先選擇儲位區域--</option>
                  <template v-else>
                    <option value="">--請選擇--</option>
                    <option v-for="(option, index) in CustodyAssets.DropdownArray.Layer" :key="index" :value="option.Id">
                      {{ option.Name }}</option>
                  </template>
                </select>
              </div>
              <!-- 資產狀態 -->
              <div class="col">
                <p>資產狀態</p>
                <select class="form-select" v-model="CustodyAssets.searchParams.Status">
                  <option value="">--請選擇--</option>
                  <option v-for="(item, index) in Asset_StastusArray" :key="index" :value="item">{{ item }}</option>
                </select>
              </div>
              <!-- 專案名稱 -->
              <div class="col">
                <p>專案名稱</p>
                <input type="text" placeholder="請輸入專案名稱" v-model="CustodyAssets.searchParams.AssetsId" />
              </div>
              <!-- 資產編號 -->
              <div class="col">
                <p>資產編號</p>
                <input type="text" placeholder="請輸入資產編號" v-model="CustodyAssets.searchParams.AssetsId" />
              </div>
              <!-- 物品名稱 -->
              <div class="col">
                <p>物品名稱</p>
                <input type="text" placeholder="最多輸入20字" v-model="CustodyAssets.searchParams.AssetName" />
              </div>
            </div>
            <div class="button_wrap">
              <button class="search_btn" @click="submit('CustodyAssets', '', 'search')">檢索</button>
              <button class="reset_btn" @click="clear('CustodyAssets')">重設</button>
            </div>
            <div class="dg">
              <DataTable lazy :key="CustodyAssets.datagrid.key" :first="CustodyAssets.datagrid.first" :size="'small'"
                :loading="CustodyAssets.datagrid.loading" :value="CustodyAssets.rowData"
                :sort-field="CustodyAssets.datagrid.sortField" :sort-order="CustodyAssets.datagrid.sortOrder"
                resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px"
                @page="submit('CustodyAssets', $event, 'page')" @sort="submit('CustodyAssets', $event, 'sort')" paginator
                :rows="CustodyAssets.datagrid.rows" :totalRecords="CustodyAssets.datagrid.totalRecords"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                :rowsPerPageOptions="[10, 20, 30]"
                currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                <Column style="min-width: 60px;">
                  <template #body="slotProps">
                    <asset_view_btn :params="slotProps" />
                  </template>
                </Column>
                <Column v-for="item in CustodyAssets.datagridField" :field="item.field" :header="item.header" sortable
                  :style="{ 'min-width': item.width }"></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-auto col-lg-12 col-md-12 col-12 pt_right">
      <!-- 警示消息窗口 -->
      <div v-show="roleId === 1 || roleId === 4" class="warn_window">
        <div class="title">
          警示訊息
          <button class="refresh_btn">刷新</button>
        </div>
        <div class="content">
          <perfect-scrollbar>
            <div class="warn_info">
              <p class="case_name" v-for="object in alertMsgArray">{{ object.Message }}</p>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
      <!-- 金額支出窗口 -->
      <div v-show="roleId === 1 || roleId === 4" class="amount_chart">
        <div class="title">
          金額支出
          <button data-bs-toggle="modal" data-bs-target="#amount_pie_modal">詳情</button>
        </div>
        <div v-show="amount_pie_data.length !== 0">
          <div class="content d-flex">
            <div class="amount_info">
              <div class="chart">
                <div id="amount_window_pie" class="window_pie"></div>
              </div>
            </div>
            <div class="amount_text">
              <p>總金額</p>
              <p class="amount">{{ total_amount.toLocaleString() }}</p>
            </div>
          </div>
        </div>
        <div v-show="amount_pie_data.length == 0">
          <div class="content d-flex">
            <div class="amount_info">
            </div>
            <div class="empty_text d-flex">
              <p>無數據</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 件數窗口 -->
      <div v-show="roleId === 1 || roleId === 4" class="case_chart">
        <div class="title">
          件數
          <button data-bs-toggle="modal" data-bs-target="#case_pie_modal">詳情</button>
        </div>
        <div v-show="case_pie_data.length !== 0">
          <div class="content d-flex">
            <div class="case_info">
              <div class="chart">
                <div id="case_window_pie" class="window_pie"></div>
              </div>
            </div>
            <div class="case_text">
              <p>總件數</p>
              <p class="amount">{{ total_case.toLocaleString() }}</p>
            </div>
          </div>
        </div>
        <div v-show="case_pie_data.length == 0">
          <div class="content d-flex">
            <div class="case_info">
            </div>
            <div class="empty_text d-flex">
              <p>無數據</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Confirm_modal from '@/components/home_page/Confirm_modal.vue';
import Line_modal from '@/components/home_page/Line_modal.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import asset_view_btn from '@/components/utils/asset_view_btn.vue';
import purchase_view_btn from '@/components/home_page/purchase_view_btn.vue'
import { Asset_StastusArray } from '@/assets/js/dropdown';
import JSCharting from 'jscharting-vue';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useAPIStore, useUtilsStore } from '@/store';
import _ from "lodash"
import { createDadagridObject } from '@/assets/js/common_fn';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const apiStore = useAPIStore();
const utilsStore = useUtilsStore();
const util_Dropdown = reactive({
  EquipType: [],
  Area: [],
})
const roleId = ref(null);
// 左側專案代碼
const project = reactive({
  OriginOptions: [
    // { Text: "0000-1 資產管理系統開發-內部領用/借測", Value: "0000-1    " },
    // { Text: "0000-2 資產管理系統開發-出貨", Value: "0000-2    " },
    // { Text: "0000-3 資產管理系統開發-維修", Value: "0000-3    " },
    // { Text: "0000-4 資產管理系統開發-報廢", Value: "0000-4    " },
    // { Text: "0000-5 資產管理系統開發-退貨", Value: "0000-5    " }
  ],
  FuzzyOptions: [],
  Project_Id: '',
  input: '',
})
// 總覽庫房資產
const Warehouse = reactive({
  datagrid: createDadagridObject(''),
  datagridField: [
    { field: "AssetType", width: '150px', header: "類型" },
    { field: "Status", width: '120px', header: "狀態" },
    { field: "AssetsId", width: '150px', header: "資產編號" },
    { field: "AssetName", width: '150px', header: "物品名稱" },
    { field: "InitNumber", width: '150px', header: "總入庫量" },
    { field: "AvailableNum", width: '150px', header: "庫存量" },
    { field: "Amount", width: '150px', header: "採購金額" },
    { field: "ProductSpec", width: '150px', header: "規格" },
    { field: "ProjectName", width: '150px', header: "專案名稱" },
    { field: "EquipTypeName", width: '150px', header: "設備總類" },
    { field: "EquipCategoryName", width: '150px', header: "設備分類" },
    { field: "AreaName", width: '150px', header: "儲位區域" },
    { field: "LayerName", width: '150px', header: "儲位櫃位" },
  ],
  rowData: [],
  searchParams: {
    EquipType_Id: '',
    Category_Id: '',
    Area_Id: '',
    Layer_Id: '',
    Status: '',
    AssetType: '',
    Project_Id: '',
  },
  DropdownArray: {
    EquipType: [],
    EquipCategory: [],
    Area: [],
    Layer: [],
  }
})
// 待採購資產
const PurchasedItem = reactive({
  datagrid: createDadagridObject(''),
  datagridField: [
    { field: "DeadLine", width: '150px', header: "交貨期限" },
    { field: "ProjectName", width: '150px', header: "專案名稱" },
    { field: "PurchasedItem", width: '150px', header: "採購項目" },
    { field: "Number", width: '150px', header: "數量" },
    { field: "ProductSpec", width: '150px', header: "規格" },
  ],
  rowData: [],
  searchParams: {
    PurchasedItem: '',
    StartDate: '',
    EndDate: '',
    Project_Id: '',
  },
})
// 待交付資產
const DeliveredItem = reactive({
  datagrid: createDadagridObject(''),
  datagridField: [
    { field: "AO_ID", width: '150px', header: "出庫單編號" },
    { field: "ProjectName", width: '150px', header: "專案名稱" },
    { field: "Reason", width: '150px', header: "出庫原因" },
    { field: "AssetsId", width: '150px', header: "資產編號" },
    { field: "AssetName", width: '150px', header: "物品名稱" },
    { field: "Number", width: '150px', header: "數量" },
    { field: "AssigneeName", width: '150px', header: "指派人名稱" },
  ],
  rowData: [],
  searchParams: {
    Project_Id: '',
  }
})
// 名下保管資產
const CustodyAssets = reactive({
  datagrid: createDadagridObject(''),
  datagridField: [
    { field: "Status", width: '120px', header: "狀態" },
    { field: "ProjectName", width: '150px', header: "專案名稱" },
    { field: "AssetsId", width: '150px', header: "資產編號" },
    { field: "AssetName", width: '150px', header: "物品名稱" },
    { field: "Number", width: '150px', header: "數量" },
    { field: "EquipTypeName", width: '150px', header: "設備總類" },
    { field: "EquipCategoryName", width: '150px', header: "設備分類" },
    { field: "AreaName", width: '150px', header: "儲位區域" },
    { field: "LayerName", width: '150px', header: "儲位櫃位" },
  ],
  rowData: [],
  searchParams: {
    AssetsId: '',
    AssetName: '',
    EquipType_Id: '',
    Category_Id: '',
    Area_Id: '',
    Layer_Id: '',
    Status: '',
    Project_Id: '',
  },
  DropdownArray: {
    Status: [],
    EquipType: [],
    EquipCategory: [],
    Area: [],
    Layer: [],
  }
})
// 右側警示訊息
const alertMsgArray = ref([]);
// 點擊選擇專案，並將結果帶入其餘4項datagrid searchParams
const selectProject = (option) => {
  let value = ''
  // Poject_id === option.Value ->原本未選擇-> 將value套用option.Value
  // Poject_id !== option.Value ->原本已選擇-> 將value套用空字串來取消選擇
  if (project.Project_Id !== option.Value) {
    value = option.Value;
  }
  project.Project_Id = value;
  Warehouse.searchParams.Project_Id = value;
  PurchasedItem.searchParams.Project_Id = value;
  DeliveredItem.searchParams.Project_Id = value;
  CustodyAssets.searchParams.Project_Id = value;
  // 重新刷新4個datagrid
  // submit('Warehouse','','');
  // submit('PurchasedItem','','');
  // submit('DeliveredItem','','');
  // submit('CustodyAssets','','');
}
// 模糊查詢左側專案代碼
const filterProject = computed(() => {
  return project.FuzzyOptions.filter(option => {
    return option.Text.toLowerCase().includes(project.input.toLowerCase()) || option.Value.toLowerCase().includes(project.input.toLowerCase())
  })
});
// ExecuteModal資訊 
const exbtn = ref(null);
const warningText = '請確認是否要變更交付狀態'
const itemData = reactive({
  IsExecute: true,
  OM_ID: '',
});
// Modal pie chart
const total_amount = ref(0);
const total_case = ref(0);
const amount_pie_data = ref([]);
const case_pie_data = ref([]);
const fake_amount_data = [
  {
    name: '電腦設備類',
    y: 12200
  },
  {
    name: '維修保護類',
    y: 7467
  },
  {
    name: '安裝類',
    y: 5460
  },
  {
    name: '電子設備類',
    y: 3305
  },
  {
    name: '電腦設備類',
    y: 12200
  },
  {
    name: '維修保護類',
    y: 7467
  },
  {
    name: '安裝類',
    y: 5460
  },
  {
    name: '電子設備類',
    y: 3305
  },
  {
    name: '電腦設備類',
    y: 12200
  },
  {
    name: '維修保護類',
    y: 7467
  },
  {
    name: '安裝類',
    y: 5460
  },
  {
    name: '電子設備類',
    y: 3305
  },
  {
    name: '電腦設備類',
    y: 12200
  },
  {
    name: '維修保護類',
    y: 7467
  },
  {
    name: '安裝類',
    y: 5460
  },
  {
    name: '電子設備類',
    y: 3305
  },
  {
    name: '電腦設備類',
    y: 12200
  },
  {
    name: '維修保護類',
    y: 7467
  },
  {
    name: '安裝類',
    y: 5460
  },
  {
    name: '電子設備類',
    y: 3305
  },
]
const fake_case_data = [
  {
    "name": "電腦設備類",
    "y": 131,
  },
  {
    "name": "監測設備類",
    "y": 17,
  },
  {
    "name": "線材與轉接頭",
    "y": 16,
  },
  {
    "name": "音響類",
    "y": 5,
  },
  {
    "name": "支架類",
    "y": 2,
  },
  {
    "name": "工具類",
    "y": 6,
  },
  {
    "name": "未分類",
    "y": 547,
  },
  {
    "name": "電源類",
    "y": 18,
  },
  {
    "name": "其他",
    "y": 11,
  },
  {
    "name": "網通設備類",
    "y": 1,
  }
]
// line
const lineSwitch = ref(null);
const SwitchProps = ref(false);
const linebtn = ref(null);
onMounted(async () => {
  utilsStore.$reset();
  await utilsStore.getUserName();
  // 取得權限id 決定顯示欄位
  roleId.value = await apiStore.getRoleId('admin');
  // roleId.value = await apiStore.getRoleId(utilsStore.userName);
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  if (roleId.value === 1 || roleId.value === 4) {
    tabs[0].classList.add('active');
    const element = document.getElementById('TotalProperty');
    element.classList.add('show');
    element.classList.add('active');
  }
  else {
    tabs[2].classList.add('active');
    const element = document.getElementById('ProcessProperty');
    element.classList.add('show');
    element.classList.add('active');
  }
  // 檢查是否為Line通知跳轉回來首頁
  if (route.query.ResponseMsg) {
    alert(route.query.ResponseMsg);
  }
  await getLineNotificationStatus();
  // await project api, then handle "Text" part
  // project.OriginOptions = await apiStore.getFuzzyProject();
  project.OriginOptions = project.OriginOptions.map(option => {
    const newValue = option.Text.replace(option.Value.trim(), '');
    return { Text: newValue, Value: option.Value };
  });
  project.FuzzyOptions = project.OriginOptions;
  // 取得共通的dropdown(設備總類、儲位區域)
  util_Dropdown.EquipType = await apiStore.getEquipType();
  util_Dropdown.Area = await apiStore.getArea();
  // 4個dg搜尋
  // submit('Warehouse','','search');
  // submit('PurchasedItem','','search');
  // submit('DeliveredItem','','search');
  // submit('CustodyAssets','','search');
  // 警示訊息
  // getAlertMsg();
  updatePie();

  //測試data

  DeliveredItem.rowData = [
    {
      "AO_ID": "W202400006",
      "Reason": "快速出庫交付",
      "AssetsId": "BF10000013",
      "AssetName": "伺服器",
      "Number": 1,
      "ProjectName": "0010-昆明南站BIMFM示範系統建置服務",
      "Project_Id": "0010",
      "AssigneeName": "admin",
      "IsExecute": true,
      "OM_ID": "OM00000054"
    },
    {
      "AO_ID": "W202400006",
      "Reason": "快速出庫交付",
      "AssetsId": "BF00000763",
      "AssetName": "UPS相關用品",
      "Number": 5,
      "ProjectName": "0010-昆明南站BIMFM示範系統建置服務",
      "Project_Id": "0010",
      "AssigneeName": "admin",
      "IsExecute": true,
      "OM_ID": "OM00000055"
    },
    {
      "AO_ID": "W202400006",
      "Reason": "快速出庫交付",
      "AssetsId": "BF01000005",
      "AssetName": "pixel 8 pro",
      "Number": 1,
      "ProjectName": "0010-昆明南站BIMFM示範系統建置服務",
      "Project_Id": "0010",
      "AssigneeName": "admin",
      "IsExecute": true,
      "OM_ID": "OM00000056"
    }
  ]
});
onUnmounted(() => {
  utilsStore.$dispose();
  apiStore.$dispose();
})
const submit = async (type = '', event, action = '') => {
  // 檢查查詢欄位(如果有需要)
  if (type === 'PurchasedItem') {
    const regexPattern = new RegExp(`^[\\s\\S]{0,20}$`);
    if (!regexPattern.test(PurchasedItem.searchParams.PurchasedItem)) {
      alert(`採購項目不可輸入超過20字`);
      return;
    }
  } else if (type === 'CustodyAssets') {
    const regexPattern = new RegExp(`^[\\s\\S]{0,20}$`);
    if (!regexPattern.test(CustodyAssets.searchParams.AssetName)) {
      alert(`物品名稱不可輸入超過20字`);
      return;
    }

  }
  const typeMappings = {
    // 總覽庫房包括 圓餅圖*2
    Warehouse: {
      datagrid: Warehouse.datagrid,
      rowData: Warehouse.rowData,
      url: '/HomePage/GetDataOfWarehouse',
      Form: Warehouse.searchParams
    },
    PurchasedItem: {
      datagrid: PurchasedItem.datagrid,
      rowData: PurchasedItem.rowData,
      url: '/HomePage/GetListOfPurchasedItem',
      Form: PurchasedItem.searchParams
    },
    DeliveredItem: {
      datagrid: DeliveredItem.datagrid,
      rowData: DeliveredItem.rowData,
      url: '/HomePage/GetListOfDeliveredItem',
      Form: DeliveredItem.searchParams
    },
    CustodyAssets: {
      datagrid: CustodyAssets.datagrid,
      rowData: CustodyAssets.rowData,
      url: '/HomePage/GetListOfCustodyAssets',
      Form: CustodyAssets.searchParams
    }
  };

  const { datagrid, url, Form } = typeMappings[type];
  const form = new FormData();
  //將表格資料append到 form
  for (const key in Form) {
    if (Form[key]) {
      form.append(key, Form[key]);
    }
  }
  utilsStore.UpdatePageParameter(datagrid, event, action, form);
  // 要對resultList做map運算=>不能用const
  let resultList = await apiStore.getMngDatagrid(url, datagrid, form);
  console.log('resultList', resultList);
  switch (type) {
    case 'Warehouse':
      Warehouse.rowData = resultList.rows;
      // 如果是Warehouse，要更新pie chart數據
      Warehouse.rowData.forEach((item, index) => {
        Warehouse.rowData[index].Amount = '$' + item.Amount.toLocaleString();
      })
      amount_pie_data.value = resultList.AmountAnalysis.map(item => ({
        name: item.EquipTypeName,
        y: item.Amount
      }));
      case_pie_data.value = resultList.EquipTypeAnalysis.map(item => ({
        name: item.EquipTypeName,
        y: item.Count
      }));
      updatePie();
      break;
    case 'PurchasedItem':
      PurchasedItem.rowData = resultList.rows;
      break;
    case 'DeliveredItem':
      DeliveredItem.rowData = resultList.rows;
      break;
    case 'CustodyAssets':
      CustodyAssets.rowData = resultList.rows;
      break;
  }
  datagrid.totalRecords = resultList.total;
  datagrid.key++;
}
const getAlertMsg = async () => {
  try {
    const response = await axios.post('http://192.168.0.177:7008/HomePage/GetAlertMessage', '');
    const data = response.data;
    if (data.state === 'success') {
      alertMsgArray.value = data.resultList.MsgArray;
    }
    else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    } else {
      alert(data.messages);
    }
  } catch (error) {
    console.error(error);
  }
}
const clear = (type) => {
  switch (type) {
    case 'Warehouse':
      for (const key in Warehouse.searchParams) {
        if (Warehouse.searchParams[key] && key != 'Project_Id') {
          Warehouse.searchParams[key] = '';
        }
      }
      Warehouse.DropdownArray.EquipCategory = [];
      Warehouse.DropdownArray.Layer = [];
      break;
    case 'PurchasedItem':
      for (const key in PurchasedItem.searchParams) {
        if (PurchasedItem.searchParams[key] && key != 'Project_Id') {
          PurchasedItem.searchParams[key] = '';
        }
      }
      break;
    case 'CustodyAssets':
      for (const key in CustodyAssets.searchParams) {
        if (CustodyAssets.searchParams[key] && key != 'Project_Id') {
          CustodyAssets.searchParams[key] = '';
        }
      }
      CustodyAssets.DropdownArray.EquipCategory = [];
      CustodyAssets.DropdownArray.Layer = [];
      break;
  }
  submit(type, '', 'search');
}
// 圓餅圖設定
const PieChartSetting = (label_text = '', target_id = '', pie_data = [], isOuterPie = true) => {
  // 如果為詳情圓餅圖(isOuter為false)，則addtionalConfig為{}、legend設定也不同
  const baseConfig = {
    debug: false,
    legend: {
      template: '%icon   %name    {%percentOfTotal:n1}%    %value',
      position: 'bottom',
      // height: 200,
    },
    defaultSeries: {
      type: 'pie',
      pointSelection: false,
      seleted: false,
    },
    series: [
      {
        name: 'all',
        points: pie_data,
      },
    ],
    yAxis: {
      label_text: label_text,
      // formatString: 'n元'
    },
    width: 150,
    height: 150,
  };
  const additionalConfig = isOuterPie ? {
    legend: {
      visible: false
    },
    fill: "#F4F4F4",
    box: {
      radius: 20,
      //  Pie後面的背景顏色
      fill: "#F4F4F4"
    },
    //  Pie後面的背景顏色
    chartArea: {
      fill: "transparent",
    },
    boxVisible: false,
  } : {
    width: 640,
    height: 600,
  };
  const chartConfig = {
    ...baseConfig,
    ...additionalConfig,
  }
  JSC.Chart(target_id, chartConfig);
};
// 更新圓餅圖
const updatePie = () => {
  // 更新總金額
  total_amount.value = 0;
  if (fake_amount_data.length !== 0) {
    fake_amount_data.forEach((item) => {
      total_amount.value += item.y;
    })
  }
  // 更新總件數
  total_case.value = 0;
  if (fake_case_data.length !== 0) {
    fake_case_data.forEach((item) => {
      total_case.value += item.y;
    })
  }
  // 詳情modal圓餅
  PieChartSetting('金額', 'amount_pie', amount_pie_data.value, false);
  PieChartSetting('件數', 'case_pie', case_pie_data.value, false);
  // 外側圓餅
  PieChartSetting('金額', 'amount_window_pie', amount_pie_data.value, true);
  PieChartSetting('件數', 'case_window_pie', case_pie_data.value, true);
}
// 1.暫存交付資料2. -> modal決定執行與否
const updateItemData = (data) => {
  itemData.IsExecute = data.IsExecute;
  itemData.OM_ID = data.OM_ID;
  exbtn.value.click();
}
// 變更交付
const changeIsExcute = async (itemData) => {
  console.group("交付資訊");
  console.log('狀態:', itemData.IsExecute);
  console.log('OM_ID:', itemData.OM_ID);
  console.groupEnd();

  try {
    const response = await axios.post('http://192.168.0.177:7008/HomePage/SetExecuteOfDeliveredItem', { OM_ID: itemData.OM_ID, IsExecute: itemData.IsExecute });
    const data = response.data;
    if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    } else {
      alert(data.messages);
    }
  } catch (error) {
    console.error(error);
  } finally {
    submit('DeliveredItem', '', '');
  }
}
// LineAPI相關
const getLineNotificationStatus = async () => {
  try {
    const response = await axios.post('http://192.168.0.177:7008/HomePage/GetLineSetting', '');
    const data = response.data;
    if (data.state === 'success') {
      // 有開啟
      lineSwitch.value.checked = true;
      SwitchProps.value = true;
    }
    else if (data.state === 'error') {
      // 無開啟
      lineSwitch.value.checked = false;
      SwitchProps.value = false;
    }
    else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    }
    else {
      alert(data.messages);
    }
  } catch (error) {
    console.error(error);
  }
}
const clickLineSwitch = () => {
  SwitchProps.value = lineSwitch.value.checked;
  setTimeout(() => { linebtn.value.click() }, 10);
}
const handleLineSwitch = async () => {
  // console.log('isChecked', lineSwitch.value.checked);
  try {
    const response = await axios.post('http://192.168.0.177:7008/HomePage/SetLineSetting', { isOpen: lineSwitch.value.checked });
    const data = response.data;
    if (data.state === 'success') {
      switch (data.resultList.ResponseState) {
        // 從未建立授權
        case 0:
          // 導向到line首頁
          window.location.href = data.resultList.ResponseMsg
          break;
        // case 1、2、3(已建立授權、成功取消、已取消過授權)
        default:
          alert(data.resultList.ResponseMsg);
          break;
      }
    }
    else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    } else {
      alert(data.messages);
    }
  } catch (error) {
    console.error(error);
  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
$content_bg: #F4F4F4;
$content_title_bg: #364E68;

.user_info,
.line_notification,
.code_search,
.tab-pane,
.warn_window,
.amount_chart,
.case_chart {
  box-shadow: 3px 2px 3.9px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}
.empty_text {
margin:auto;
font-weight: 700;
font-size: 24px;
}
@mixin reset_btn {
  background-color: #364E68;
  color: white;
  font-weight: 700;
  border-radius: 15px;
  border: none;
  font-size: 18px;
  height: 40px;
  width: 70px;
}

@mixin search_btn {
  background-color: #132238;
  color: white;
  font-weight: 700;
  border-radius: 15px;
  border: none;
  font-size: 18px;
  height: 40px;
  width: 70px;
}

.refresh_btn {
  background-color: #411111;
  color: white;
  font-weight: 700;
  border-radius: 15px;
  border: none;
  font-size: 18px;
  height: 40px;
  width: 70px;

  &:hover {
    background-color: #601d1d;
  }
}

.search_btn {
  @include search_btn;

  &:hover {
    background-color: #5e7aa2;
  }
}

.modal {
  .modal_pie {
    margin: auto
  }

  table {
    font-size: 18px;
    margin: auto;

    .details_name {
      text-align: right;
    }

    .details_percentage,
    .details_amount {
      text-align: right;
      width: 100px;
    }

    .details_amount::before {
      content: '$';
    }
  }

  .modal-header {
    h5 {
      font-weight: 700;
    }

    background:#528091;
    color: white;
    display: flex;
    justify-content: center;

    .close_icon {
      cursor: pointer;
      align-self: unset;
    }

    .modal-title {
      margin: auto;
    }
  }

  .amount_text {
    margin: auto;
    width: unset;

    p {
      font-size: 24px;
      width: unset;
      margin-bottom: 0;
    }
  }
}

.amount_text,
.case_text {
  justify-content: center;
  gap: 0 10px;

  p {
    overflow-wrap: break-word;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    width: 100px;
  }
}

.amount_text .amount::before {
  content: '$';
}

.chart {
  height: 150px;
}

.dg {
  margin: 16px auto 0;
.p-datatable{
  display: inline-grid;
}
}

.nav-tabs,
.nav-tabs .nav-link:hover,
.nav-tabs .nav-link:focus,
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  border-color: transparent
}

.datagrid_section {
  .nav-link {
    padding: 6px 10px;
  }

  input:not([type="radio"]),
  select {
    @include dropdown_btn;
    width: 100%;
    height: 35px;
    margin-top: 10px;
  }

  .TotalProperty,
  .organizeProperty {
    .button_wrap {
      display: flex;
      justify-content: center;
      gap: 0 10px;
    }
  }

  .PurchaseList {
    .button_wrap {
      display: flex;
      align-items: end;
      gap: 0 10px
    }

    .total_amount {
      display: flex;
      justify-content: flex-end;
      align-items: end;

      p {
        display: flex;
        font-weight: 700;
      }
    }
  }

  .ProcessProperty .warn_text p {
    color: #E94B4B;
    font-weight: 700;
  }

  .tab-pane {

    border-radius: 0 10px 10px 10px;

    select {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dg_search_wrap {
      display: grid;
    }

    .button_wrap {
      .reset_btn {
        @include reset_btn;

        &:hover {
          background-color: #132238;
        }
      }
    }
  }

  li button.active,
  .active {
    background-color: $content_bg;
  }

  li button.active {
    font-weight: 800;
  }

  li button {
    color: white;
    border-radius: 10px 10px 0px 0px;
    border-right: 1px solid rgba(0, 0, 0, 0.50);
    background: #5C7897;
  }
}

.code_search .ps {
  display: flex;
  flex-direction: column;
}

.chart-container {
  width: 100%;
  height: 100%;
}

.donut-label {
  font-family: Arial, sans-serif;
  color: #333;
}

.home_section {
  height: 100%;

  p {
    margin-bottom: 0;
  }
}

.form-check-input:focus,
.form-select:focus {
  box-shadow: unset;
}

.user_info,
.line_notification,
.amount_chart,
.case_amount,
.warn_window,
.search_section,
.search_result,
.warn_title {
  border-radius: 20px;
}

.search_section,
.amount_chart .title,
.case_chart .title,
.warn_window .title {
  border-radius: 20px 20px 0 0;
}

.search_result {
  border-radius: 0 0 20px 20px;
}

.pt_left {
  display: inline-flex;
  flex-direction: column;

  .user_info {
    background-color: $content_bg;
    display: flex;
    align-items: center;

    .profile_name .name {
      font-weight: 700;
    }
  }

  .line_notification {
    background-color: #00C200;
    font-weight: bold;
    color: white;

    .form-check {
      display: flex;
      justify-content: end;
    }

    .form-check-input:checked {
      background-color: #1C4220;
      border-color: #1C4220;
    }

    .form-switch .form-check-input:focus {
      --bs-form-switch-bg: url(data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23dee2e6%27/%3e%3c/svg%3e);
    }

    .line_title {
      align-items: center;
      margin-right: auto;
    }
  }

  .code_search {
    .search_section {
      background-color: $content_title_bg;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        height: 40px;
        border-radius: 10px;
        border: none;
        width: 100%;
      }

      button {
        background: #132238;
        color: white;
        font-weight: 700;
        border-radius: 10px;
        border: none;

        &:hover {
          background-color: #5C7897;
        }
      }
    }

    .search_result {
      background-color: $content_bg;

      .result_wrap {
        background: #A7AFBB;
        border-radius: 10px;
        border: 3px solid var(--home_hover, transparent);

        &:hover {
          color: white;
          border: 3px solid var(--home_hover, #3B6097);
          background: #363C45;
        }
      }

      .case_code {
        margin-bottom: 5px;
        font-size: 18px;

        &::before {
          content: '#';
          margin-right: 5px;
          content: '#';
          width: 25px;
          height: 25px;
          display: block;
          text-align: center;
          border-radius: 50%;
          background: white;
          color: var(--c4, #132238);
        }
      }

      .selected {
        color: white;
        border: 3px solid var(--home_hover, #3B6097);
        background: #363C45;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .with_search_input .search_result {
    border-radius: 20px;
  }
}

.pt_right {
  display: inline-flex;
  flex-direction: column;

  .warn_window {
    background-color: $content_bg;

    .title {
      background: #E94B4B;
      color: white;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .content {
      p::before {
        content: '·';
        margin-right: 5px;
      }
    }
  }

  .amount_chart,
  .case_chart {
    .title {
      background-color: $content_title_bg;
      color: white;
      background-color: #364E68;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        background: var(--c2, #98CCD3);
        border-radius: 15px;
        border: none;
        color: white;
        font-weight: 700;

        &:hover {
          background-color: #69a3ac;
        }
      }
    }

    .content {
      height: 150px;
      border-radius: 0 0 20px 20px;
      background: $content_bg;
      align-items: center;
    }
  }
}

.pt_left,
.pt_right,
.pt_center {
  padding: 0
}

@media only screen and (min-width: 1200px) and (max-width: 1999px) {
  .home_section {
    padding: 15px;
  }

  .tab-pane {
    padding: 16px;

    .dg_search_wrap {
      margin-bottom: 16px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 10px 0;
      grid-template-rows: 1fr 1fr;

      p {
        font-size: 18px
      }
    }
  }

  .PurchaseList .dg_search_wrap {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  .pt_left {
    margin-right: 15px;

    .user_info,
    .line_notification,
    .code_search {
      width: 270px;
    }

    .line_title {
      font-size: 18px;
    }
  }

  .pt_right {
    margin-left: 15px;

    .case_chart,
    .amount_chart,
    .warn_window {
      width: 250px;

    }
  }
}

@media only screen and (min-width: 1200px) {
  .modal-dialog {
    width: 700px;
  }

 
  .modal_pie {
    width: 100%;
    height: 100%;
  }

  .PurchaseList .button_wrap .total_amount p,
  .ProcessProperty .warn_text p {
    font-size: 24px;
  }

  .tab-pane {
    padding: 16px;

    .dg_search_wrap {
      margin-bottom: 16px;

      p {
        font-size: 18px
      }
    }
  }

  .TotalProperty,
  .PurchaseList,
  .organizeProperty {
    .dg_search_wrap {
      grid-template-rows: 1fr;
      display: grid;
    }
  }

  .TotalProperty .dg_search_wrap {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .PurchaseList .dg_search_wrap {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  .organizeProperty .dg_search_wrap {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .datagrid_section {

    li button.active,
    li button {
      font-size: 18px;
    }
  }

  .code_search .ps {
    height: 485px;
    gap: 16px 0;
  }

  .with_search_input .search_result .ps {
    height: 556px;
  }

  .warn_window .ps {
    height: 225px;
  }

  .chart-container {
    width: 100%;
    height: 100%;
  }

  .donut-label {
    font-size: 16px;
  }

  .home_section {
    padding: 30px;
  }

  .pt_left {
    margin-right: 32px;
    gap: 16px 0;

    .user_line_wrap {
      gap: 16px 0;
      display: grid;
    }

    .user_info {
      width: 320px;
      height: 105px;
      padding: 16px;

      .profile_name .name {
        margin-left: 20px;
      }
    }

    .line_notification {
      width: 320px;
      height: 60px;
      padding: 15px;
      font-size: 22px;

      .line_title {
        gap: 0 5px;
      }
    }

    .code_search {
      width: 320px;

      .search_section {
        padding: 10px 20px;
        height: 70px;
        gap: 0 20px;

        input {
          padding: 0 10px;
        }

        button {
          height: 40px;
          width: 70px;

          &:hover {
            background-color: #5C7897;
          }
        }
      }

      .search_result {
        padding: 16px;

        .result_wrap {
          padding: 10px;
        }
      }
    }

    .with_search_input .search_result {
      height: 588px;
    }
  }

  .pt_right {
    gap: 29px 0;
    margin-left: 32px;

    .window_pie {
      width: 150px;
      height: 100%
    }

    .warn_window {
      width: 252px;
      height: 310px;

      .title {
        padding: 10px;
        height: 60px;
        font-size: 24px;
      }

      .content {
        padding: 10px 10px 10px 15px;
        height: 250px;
      }
    }

    .amount_text,
    .case_text {
      width: 80px;
    }

    .amount_chart,
    .case_chart {
      height: 210px;
      width: 252px;
    }

    .amount_chart,
    .case_chart {
      .title {
        padding: 10px 13px;
        font-size: 24px;

        button {
          font-size: 18px;
          width: 70px;
          height: 40px;
        }
      }
    }
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1199px) {
  .modal-dialog {
    width: 700px;
  }



  .modal_pie {
    width: 100%;
    height: 100%
  }

  .PurchaseList .button_wrap .total_amount p,
  .ProcessProperty .warn_text p {
    font-size: 24px;
  }

  .tab-pane {
    padding: 16px;

    .dg_search_wrap {
      margin-bottom: 16px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 10px 0;
      grid-template-rows: 1fr 1fr;

      p {
        font-size: 18px
      }
    }
  }

  .code_search .ps {
    height: 485px;
    gap: 16px 0;
  }

  .with_search_input .search_result .ps {
    height: 556px;
  }

  .warn_window .ps {
    height: 225px;
  }

  .chart-container {
    width: 100%;
    height: 100%;
  }

  .home_section {
    padding: 20px;
  }

  .pt_left {
    gap: 16px 0;

    .user_line_wrap {
      gap: 20px;
      display: flex;
    }

    .user_info {
      width: 100%;
      height: 105px;
      padding: 16px;

      .profile_name .name {
        margin-left: 20px;
      }
    }

    .line_notification {
      width: 100%;
      padding: 15px;
      font-size: 22px;
      align-items: center;

      .line_title {
        gap: 0 5px;

        P {
          font-size: 20px;
        }
      }
    }

    .code_search {
      margin-bottom: 20px;

      .search_section {
        padding: 10px 20px;
        height: 70px;
        gap: 0 20px;

        input {
          padding: 0 10px;
        }

        button {
          height: 40px;
          width: 70px;

          &:hover {
            background-color: #5C7897;
          }
        }
      }

      .search_result {
        padding: 16px;

        .result_wrap {
          padding: 10px;
        }
      }
    }

    .with_search_input .search_result {
      height: 588px;
    }
  }

  .pt_center {
    margin-bottom: 20px;
  }

  .pt_right {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0 20px;

    .warn_window {
      .title {
        padding: 10px;
        height: 60px;
        font-size: 24px;
      }

      .content {
        padding: 10px 10px 10px 15px;
        height: 150px;
      }

      .ps {
        height: 130px;
      }
    }

    .amount_chart,
    .case_chart {
      .title {
        padding: 10px 13px;
        font-size: 24px;

        button {
          font-size: 18px;
          width: 70px;
        }
      }

      .content {
        justify-content: center;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .modal-dialog {
    width: 700px;
    padding: 0;
  }

  .modal_pie {
    width: 100%;
    height: 100%
  }

  .PurchaseList .button_wrap .total_amount p,
  .ProcessProperty .warn_text p {
    font-size: 24px;
  }

  .tab-pane {
    padding: 16px;

    .dg_search_wrap {
      margin-bottom: 16px;
    
      gap: 10px 0;

      p {
        font-size: 18px
      }
    }
  }
  .TotalProperty .dg_search_wrap {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .PurchaseList .dg_search_wrap {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .organizeProperty .dg_search_wrap {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .code_search .ps {
    height: 485px;
    gap: 16px 0;
  }

  .warn_window .ps {
    height: 225px;
  }

  .chart-container {
    width: 100%;
    height: 100%;
  }

  .home_section {
    padding: 20px;
  }

  .pt_left {
    gap: 16px 0;

    .user_line_wrap {
      gap: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
    }

    .user_info {
      height: 105px;
      padding: 16px;

      .profile_name .name {
        margin-left: 20px;
      }
    }

    .line_notification {
      padding: 15px;
      font-size: 22px;
      align-items: center;

      .line_title {
        gap: 0 5px;

        P {
          font-size: 20px;
        }
      }
    }

    .code_search {
      margin-bottom: 20px;

      .search_section {
        padding: 10px 20px;
        height: 70px;
        gap: 0 20px;

        input {
          padding: 0 10px;
        }

        button {
          height: 40px;
          width: 70px;

          &:hover {
            background-color: #5C7897;
          }
        }
      }

      .search_result {
        padding: 16px;

        .result_wrap {
          padding: 10px;
        }
      }
    }

    .with_search_input .search_result {
      height: 588px;
    }
  }

  .pt_center {
    margin-bottom: 20px;
  }

  .pt_right {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0 20px;

    .warn_window {
      .title {
        padding: 10px;
        height: 60px;
        font-size: 24px;
      }

      .content {
        padding: 10px 10px 10px 15px;
        height: 150px;
      }

      .ps {
        height: 130px;
      }
    }

    .amount_chart,
    .case_chart {
      .title {
        padding: 10px 13px;
        font-size: 24px;

        button {
          font-size: 18px;
          width: 70px;
        }
      }

      .content {
        justify-content: center;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .modal-dialog {
    padding: 0;
  }

  .modal_pie {
    overflow: scroll;
  }

  .home_section {
    padding: 20px;
  }

  .tab-pane {
    padding: 15px;

    .dg_search_wrap {
      margin-bottom: 8px;
    }

    .dg_search_wrap {
      display: flex;
      gap: 10px 0;
    }

    margin-bottom: 20px;
  }

  .pt_left {
    gap: 16px 0;

    .user_line_wrap {
      display: flex;
      flex-direction: column;
      gap: 16px 0;
    }

    .user_info {
      padding: 10px 16px;

      .profile_name .name {
        margin-left: 20px;
      }
    }

    .line_notification {
      padding: 15px;
      font-size: 22px;
      align-items: center;

      .line_title {
        gap: 0 5px;

        P {
          font-size: 20px;
        }
      }
    }

    .code_search {
      margin-bottom: 20px;

      .ps {
        height: 250px;
        gap: 16px 0;
      }

      .search_section {
        padding: 10px 20px;
        height: 70px;
        gap: 0 20px;

        input {
          padding: 0 10px;
        }

        button {
          height: 40px;
          width: 70px;

          &:hover {
            background-color: #5C7897;
          }
        }
      }

      .search_result {
        padding: 16px;

        .result_wrap {
          padding: 10px;
        }
      }
    }

    .with_search_input .search_result {
      height: 588px;
    }
  }

  .pt_center {
    .datagrid_section {
      ul {
        overflow-x: auto;
        overflow-y: hidden;
        flex-wrap: nowrap;

        li {
          button {
            white-space: nowrap;
          }
        }
      }
      .PurchaseList .button_wrap{
        justify-content: center;
      }
    }
  }

  .pt_right {
    display: flex;
    flex-direction: column;
    gap: 20px 0;

    .warn_window {
      .title {
        padding: 10px;
        height: 60px;
        font-size: 24px;
      }

      .content {
        padding: 10px 10px 10px 15px;
        height: 150px;
      }

      .ps {
        height: 130px;
      }
    }

    .amount_chart,
    .case_chart {
      .title {
        padding: 10px 13px;
        font-size: 24px;

        button {
          font-size: 18px;
          width: 70px;
        }
      }

      .content {
        justify-content: center;
      }
    }
  }
}
</style>