<template>
  <div>
    <view_modal />
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>申請人員 : {{ upperForm.Applicant || utilsStore.userName }}</p>
        </div>
        <div>
          <p>申請入庫日期 : {{ upperForm.ApplicationDate || utilsStore.today }}</p>
        </div>
      </div>
      <div class="content">
        <!-- 單號 -->
        <div class="col mb-3" v-show="upperForm.AI_ID">
          <div class="input-group">
            <div class="input-group-prepend">單號 :</div>
            <input type="text" class="form-control readonly_box" v-model="upperForm.AI_ID" readonly>
          </div>
        </div>
        <!-- 訂購單號 -->
        <div v-show="!quickprocessStore.createHidden" class="col form_search_wrap mb-3">
          <div class="input-group">
            <div class="input-group-prepend">
              訂購單號 :
            </div>
            <div class="search_section">
              <div class="search_option_section">
                <vue-multiselect v-model="upperForm.PO_IDSelect" :options="DropdownArray.PO_ID" :allow-empty="false"
                  :max-height="300" placeholder="請選擇" label="PO_ID" :showLabels="false" track-by="PO_ID"
                  :show-no-results="false" @select="storageStore.onOrderSelect">
                </vue-multiselect>
              </div>
            </div>
            <button class="form_search_btn" @click="storageStore.viewOrder(upperForm)">檢視</button>
            <!-- 隱藏跳轉按鈕 -->
            <router-link :to="{ name: 'Order_View', query: { search_id: upperForm.PO_ID } }" target="_blank"
              id="view-order" style="display: none;"></router-link>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col mb-3">
          <div class="input-group">
            <div class="input-group-prepend">備註 :</div>
            <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入500字"
              v-model="upperForm.Memo"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col my-5">
      <div v-show="!quickprocessStore.editHidden" class="fixed_info">
        <div>
          <p><span class='red_star'>*</span>填寫資產資訊(請至少填寫一項)</p>
        </div>
      </div>
      <div v-show="!quickprocessStore.editHidden" class="content">
        <!-- 資產類型 -->
        <div class="row">
          <div class="col-12">
            <div class="input-group mb-3 check_box_wrap">
              <div class="input-group-prepend check_box">
                <span class='red_star'>*</span>資產類型 :
              </div>
              <div class="d-flex align-items-center radio_wrap">
                <template v-for="(item, index) in DropdownArray.AssetType" :key="'radio' + (index + 1)">
                  <input v-if="item !== '耗材'" type="radio" class="form-check-input check_box"
                    :id="'radio' + (index + 1)" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"
                    :value="item" v-model="middleForm.itemAssetType"
                    @change="storageStore.resetUnitCount('middleForm')" />
                  <input v-else type="radio" class="form-check-input check_box" :id="'radio' + (index + 1)"
                    style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" :value="item"
                    v-model="middleForm.itemAssetType" />
                  <label class="form-check-label check_box" :for="'radio' + (index + 1)"
                    :data-toggle="index === 1 ? 'tooltip' : null" :data-placement="index === 1 ? 'top' : null"
                    :title="index === 1 ? '註記此資產僅限特定專案出貨所使用' : null">
                    {{ item }}
                  </label>
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- 專案代碼 -->
        <div class="col form_search_wrap">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span v-show="middleForm.itemAssetType === '存貨'">*</span>專案代碼 :
            </div>
            <div class="option_section">
              <vue-multiselect v-model="middleForm.itemProjectSelect" :options="DropdownArray.ProjectCode"
                :allow-empty="false" :max-height="300" placeholder="請選擇" label="Text" :showLabels="false"
                track-by="Text" :show-no-results="false" @select="storageStore.onFormProjectcodeSelect">
              </vue-multiselect>
            </div>
          </div>
        </div>
        <!-- 設備 總類&分類 -->
        <div class="row row_wrap g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend equipment_wrap">
                <span class='red_star'>*</span>設備總類 :
              </div>
              <div class="dropdown">
                <select class="form-select" id="floatingSelect" v-model="middleForm.itemEquipType_Id"
                  @change="async () => { DropdownArray.EquipCategory = await apiStore.getEquipCategory(middleForm.itemEquipType_Id); middleForm.itemCategory_Id = ''; }">
                  <option value="">--請選擇--</option>
                  <option v-for="option in DropdownArray.EquipType" :key="option.Id" :value="option.Id">{{ option.Name
                    }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class='red_star'>*</span>設備分類 :
              </div>
              <div class="dropdown">
                <select class="form-select" id="floatingSelect" v-model="middleForm.itemCategory_Id">
                  <option v-if="DropdownArray.EquipCategory.length == 0" value="">--請先選擇設備總類--</option>
                  <template v-else>
                    <option value="">--請選擇--</option>
                    <option v-for="option in DropdownArray.EquipCategory" :key="option.Id" :value="option.Id">{{
            option.Name }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- 物品名稱 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class='red_star'>*</span>物品名稱 :
            </div>
            <input type="text" class="form-control" placeholder="最多輸入20字" v-model="middleForm.itemAssetName">
          </div>
        </div>
        <!-- 包裝數量 & 包裝單位 -->
        <div class="row g-0 row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3" id='number'>
              <div class="input-group-prepend info  ">
                <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none"
                  src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                <span class='red_star'>*</span>包裝數量 :<img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block"
                  src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
              </div>
              <input class="input-number" type="number" min="1" v-model="middleForm.itemPackageNum">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3" id='unit'>
              <div class="input-group-prepend">
                <span class='red_star'>*</span>包裝單位 :
              </div>
              <div class="dropdown">
                <select class="form-select" id="floatingSelect" v-model="middleForm.itemPackageUnit">
                  <option value="">--請選擇--</option>
                  <option v-for="option in DropdownArray.PackageUnit" :key="option" :value="option">{{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- 數量 & 單位 (only耗材) -->
        <div class="row g-0 row_wrap">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3" id='number'>
              <div class="input-group-prepend">
                <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none"
                  src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top"
                  title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                <span v-show="middleForm.itemAssetType === '耗材'">*</span>數量 :
                <img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png"
                  data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
              </div>
              <input v-if="middleForm.itemAssetType === '耗材'" class="input-number" type="number"
                v-model="middleForm.itemCount" min="1">
              <input v-else class="input-number readonly_box" type="number" v-model="middleForm.itemCount" min="1"
                readonly>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3" id='unit'>
              <div class="input-group-prepend">
                <span v-show="middleForm.itemAssetType === '耗材'">*</span>單位 :
              </div>
              <div v-if="middleForm.itemAssetType === '耗材'" class="dropdown">
                <select class="form-select" id="floatingSelect" v-model="middleForm.itemUnit">
                  <option value="">--請選擇--</option>
                  <option v-for="option in DropdownArray.Unit" :key="option" :value="option">{{ option }}</option>
                </select>
              </div>
              <input v-else class="input-number readonly_box" type="text" v-model="middleForm.itemPackageUnit" min="1"
                readonly>
            </div>
          </div>
        </div>
        <!-- 備註 -->
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              備註 :
            </div>
            <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入500字"
              v-model="middleForm.itemMemo"></textarea>
          </div>
        </div>
      </div>
      <!-- 入庫方式 -->
      <div v-show="!quickprocessStore.editHidden" class="store_option_wrap mt-5 mb-3">
        <div class="fixed_info">
          <p><span class='red_star'>*</span>入庫方式</p>
        </div>
        <div class="content">
          <!-- 直接入庫/指派給保管人 -->
          <div class="row">
            <div class="col-12">
              <div class="input-group mb-3 check_box_wrap">
                <div class="input-group-prepend check_box">
                  <span class='red_star'>*</span>入庫方式 :
                </div>
                <div class="d-flex align-items-center radio_wrap">
                  <template v-for="(item, index) in DropdownArray.InboundWay" :key="'radio' + (index + 1)">
                    <input type="radio" class="form-check-input check_box" :id="'InboundRadio' + (index + 1)"
                      :value="item" v-model="middleForm.itemInboundWay"
                      @change="storageStore.changeInboundWay('middleForm')" />
                    <label class="form-check-label check_box" :for="'InboundRadio' + (index + 1)"> {{ item }} </label>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <!-- 用途 -->
          <div v-show="middleForm.itemInboundWay === '指派給保管人'" class="row">
            <div class="col-12">
              <div class="input-group mb-3 check_box_wrap">
                <div class="input-group-prepend check_box">
                  <span class='red_star'>*</span>用途 :
                </div>
                <div class="d-flex align-items-center radio_wrap">
                  <template v-for="(item, index) in DropdownArray.Use" :key="'radio' + (index + 1)">
                    <input type="radio" class="form-check-input check_box" :id="'UseRadio' + (index + 1)" :value="item"
                      v-model="middleForm.itemUse" />
                    <label class="form-check-label check_box" :for="'UseRadio' + (index + 1)">
                      {{ item }}
                    </label>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <!-- 保管人員 -->
          <div v-show="middleForm.itemInboundWay === '指派給保管人'" class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend"> <span class='red_star'>*</span>保管人員 :</div>
              <select class="form-select" v-model="middleForm.itemCustodian">
                <option value="">--請選擇--</option>
                <option v-for="option in DropdownArray.Custodian" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
          </div>
          <!-- 儲位區域/儲位櫃位 -->
          <div v-show="middleForm.itemInboundWay === '直接入庫'" class="store_location row g-0">
            <div class="col row g-0">
              <label for="inputPassword" class="col col-form-label"><span class='red_star'>*</span>儲位區域 :</label>
              <select class="form-select col" v-model="middleForm.itemArea_Id"
                @change="async () => { DropdownArray.Layer = await apiStore.getLayer(middleForm.itemArea_Id); middleForm.itemLayer_Id = ''; }">
                <option value="">--請選擇--</option>
                <option v-for="option in DropdownArray.Area" :key="option" :value="option.Id">{{ option.Name }}</option>
              </select>
            </div>
            <div class="col row g-0">
              <label for="inputPassword" class="col col-form-label"><span class='red_star'>*</span>儲位櫃位 :</label>
              <select class="form-select col" v-model="middleForm.itemLayer_Id">
                <option v-if="DropdownArray.Layer.length == 0" value="">--請先選擇儲位區域--</option>
                <template v-else>
                  <option value="">--請選擇--</option>
                  <option v-for="option in DropdownArray.Layer" :key="option.Id" :value="option.Id">{{ option.Name }}
                  </option>
                </template>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button v-show="!quickprocessStore.editHidden" class="send_btn"
          @click="storageStore.insertTab(true)">新增</button>
      </div>
      <!-- 頁籤部分 -->
      <div v-show="tabData.length > 0" class="tab_section mt-5">
        <!-- tab頂端頁籤 -->
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button v-for="tab in parseInt(tabData.length)" :key="tab" :class="['nav-link', { active: tab === 1 }]"
              data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab">{{ tab }}</button>
          </div>
        </nav>
        <!-- tab內容 -->
        <div class="tab-content" id="nav-tabContent">
          <div v-for="(tab, index) in tabData" :key="index"
            :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel">
            <!-- deleteButton -->
            <button class="delete_btn" v-show="!quickprocessStore.editHidden"
              @click="storageStore.deleteTabFn(index)">刪除此筆</button>
            <!-- 頁籤專案類型 -->
            <div v-show="!quickprocessStore.editHidden" class="row">
              <div class="col-12">
                <div class="input-group mb-3 check_box_wrap">
                  <div class="input-group-prepend check_box">
                    <span class='red_star'>*</span>專案類型 :
                  </div>
                  <div class="d-flex align-items-center radio_wrap">
                    <template v-for="(item, typeIndex) in DropdownArray.AssetType" :key="'radio' + (typeIndex + 1)">
                      <input type="radio" class="form-check-input check_box"
                        :id="'tabProjectType_' + (index + 1) + (typeIndex + 1)"
                        style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" :value="item"
                        v-model="tab.itemAssetType" @input="storageStore.resetUnitCount('tab', index)" />
                      <label class="form-check-label check_box" :for="'tabProjectType_' + (index + 1) + (typeIndex + 1)"
                        :data-toggle="typeIndex === 1 ? 'tooltip' : null"
                        :data-placement="typeIndex === 1 ? 'top' : null"
                        :title="typeIndex === 1 ? '註記此資產僅限特定專案出貨所使用' : null">
                        {{ item }}
                      </label>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="!quickprocessStore.createHidden" class="row">
              <div class="col-12">
                <div class="input-group mb-3 check_box_wrap">
                  <div class="input-group-prepend check_box">
                    <span class='red_star'>*</span>專案類型 :
                  </div>
                  <div class="d-flex align-items-center radio_wrap">
                    <div v-if="tab.itemAssetType !== '耗材'" class="dropdown">
                      <select class="form-select" id="floatingSelect" v-model="tab.itemAssetType">
                        <option value="資產">資產</option>
                        <option value="存貨">存貨</option>
                      </select>
                    </div>
                    <input v-else type="text" class="form-control readonly_box" readonly v-model="tab.itemAssetType">
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤專案代碼 -->
            <div class="col form_search_wrap">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span v-show="tab.itemAssetType === '存貨'">*</span>專案代碼 :
                </div>
                <div class="option_section">
                  <vue-multiselect v-model="tab.itemProjectSelect" :options="tab.tabProjectCode" :max-height="300"
                    placeholder="請選擇" label="Text" :allow-empty="false" :showLabels="false" track-by="Text"
                    :show-no-results="false" @select="storageStore.onTabProjectcodeSelect">
                  </vue-multiselect>
                </div>
              </div>
            </div>
            <!-- 頁籤設備 總類&分類 -->
            <div class="row row_wrap g-0">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend equipment_wrap">
                    <span class='red_star'>*</span>設備總類 :
                  </div>
                  <div class="dropdown">
                    <select class="form-select" id="floatingSelect" v-model="tab.itemEquipType_Id"
                      @change="async () => { tab.EquipCategoryArray = await apiStore.getEquipCategory(tab.itemEquipType_Id); tab.itemCategory_Id = ''; }">
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.EquipType" :key="option.Id" :value="option.Id">{{
            option.Name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class='red_star'>*</span>設備分類 :
                  </div>
                  <div class="dropdown">
                    <select class="form-select" id="floatingSelect" v-model="tab.itemCategory_Id">
                      <option v-if="tab.EquipCategoryArray.length == 0" value="">--請先選擇設備總類--</option>
                      <template v-else>
                        <option value="">--請選擇--</option>
                        <option v-for="option in tab.EquipCategoryArray" :key="option.Id" :value="option.Id">{{
            option.Name }}</option>
                      </template>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤物品名稱 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span class='red_star'>*</span>物品名稱 :</div>
                <input type="text" class="form-control" placeholder="最多輸入20字" v-model="tab.itemAssetName">
              </div>
            </div>
            <!-- 頁籤資產編號 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span class='red_star'>*</span>資產編號 :</div>
                <input type="text" class="form-control" :class="{ 'readonly_box': quickprocessStore.editHidden }"
                  placeholder="BFXXXXXXXX" v-model="tab.itemAssetsId" :readonly="quickprocessStore.editHidden">
              </div>
            </div>
            <!-- 頁籤廠商 -->
            <div v-show="!quickprocessStore.createHidden" class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  廠商 :
                </div>
                <input type="text" class="form-control" placeholder="最多輸入100字" v-model="tab.itemVendorName">
              </div>
            </div>
            <!-- 頁籤規格 -->
            <div v-show="!quickprocessStore.createHidden" class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  規格 :
                </div>
                <input type="text" class="form-control" placeholder="最多輸入100字" v-model="tab.itemProductSpec">
              </div>
            </div>
            <!--頁籤型號 -->
            <div v-show="!quickprocessStore.createHidden" class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  型號 :
                </div>
                <input type="text" class="form-control" placeholder="最多輸入100字" v-model="tab.itemProductType">
              </div>
            </div>
            <!-- 頁籤S/N -->
            <div v-show="!quickprocessStore.createHidden" class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N :</div>
                <input type="text" class="form-control" aria-label="Default" placeholder="最多輸入100字"
                  v-model="tab.itemSN">
              </div>
            </div>
            <!-- 頁籤選購金額 -->
            <div v-show="!quickprocessStore.createHidden" class="row g-0 purchase_amount">
              <div class="col-xl-6 col-lg-auto col-md-auto col-12">
                <div class="input-group mb-xl-3 mb-lg-3 mb-md-3">
                  <div class="input-group-prepend">
                    選購金額 :
                  </div>
                  <div class="amount_input">
                    <span class="symbol">$</span>
                    <input class="form-control" type="number" v-model="tab.itemPrice" min="1">
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <span class="note">
                  / 每包裝單位<span v-show="tab.itemAssetType === '耗材'">(NT${{ (tab.itemPrice / tab.itemCount).toFixed(2)
                    }}/每單位)</span>
                </span>
              </div>
            </div>

            <!-- 頁籤 包裝數量 & 包裝單位 -->
            <div class="row g-0 row_wrap">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='number'>
                  <div class="input-group-prepend info  ">
                    <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none"
                      src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                    <span class='red_star'>*</span>包裝數量 :<img
                      class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                  </div>
                  <input v-if="tab.itemAssetType === '耗材'" class="input-number" type="number"
                    v-model="tab.itemPackageNum" min="1">
                  <input v-else class="input-number readonly_box" type="number" v-model="tab.itemPackageNum" min="1"
                    readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='unit'>
                  <div class="input-group-prepend">
                    <span class='red_star'>*</span>包裝單位 :
                  </div>
                  <div class="dropdown">
                    <select class="form-select" id="floatingSelect" v-model="tab.itemPackageUnit">
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.PackageUnit" :key="option" :value="option">{{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤 數量 & 單位 (only耗材) -->
            <div class="row g-0 row_wrap">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='number'>
                  <div class="input-group-prepend">
                    <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none"
                      src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top"
                      title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                    <span v-show="tab.itemAssetType === '耗材'">*</span>數量 :
                    <img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                  </div>

                  <input v-if="tab.itemAssetType === '耗材'" class="input-number" type="number" v-model="tab.itemCount"
                    min="1">
                  <input v-else class="input-number readonly_box" type="number" v-model="tab.itemCount" min="1"
                    readonly>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3" id='unit'>
                  <div class="input-group-prepend">
                    <span v-show="tab.itemAssetType === '耗材'">*</span>單位 :
                  </div>

                  <div class="dropdown">
                    <div v-if="tab.itemAssetType === '耗材'" class="dropdown">
                      <select class="form-select" id="floatingSelect" v-model="tab.itemUnit">
                        <option value="">--請選擇--</option>
                        <option v-for="option in DropdownArray.Unit" :key="option" :value="option">{{ option }}</option>
                      </select>
                    </div>
                    <input v-else class="form-select readonly_box" type="text" v-model="tab.itemPackageUnit" min="1"
                      readonly>
                  </div>
                  <!-- <input  class="input-number" type="number" min="1"> -->
                  <!-- <input v-else class="input-number readonly_box" type="text" min="1" readonly> -->
                </div>
              </div>
            </div>
            <!-- 頁籤保固期限 -->
            <div v-show="!quickprocessStore.createHidden" class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    保固期限 :
                  </div>
                  <input type="text" class="form-control" placeholder="最多輸入10字" v-model="tab.itemWarranty">
                </div>
              </div>
            </div>
            <!-- 頁籤 保固 開始&結束 -->
            <div v-show="!quickprocessStore.createHidden" class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">保固開始日 :</div>
                  <input type="date" class="form-control " v-model="tab.itemWarrantyStartDate" />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">保固到期日 :</div>
                  <input type="date" class="form-control " v-model="tab.itemWarrantyEndDate" />
                </div>
              </div>
            </div>
            <!-- 頁籤備註 -->
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">備註 :</div>
                <textarea class="col" rows="5" placeholder="最多輸入500字" v-model="tab.itemMemo"></textarea>
              </div>
            </div>
            <!-- 頁籤選擇檔案 -->
            <div v-show="!quickprocessStore.createHidden" class="col">
              <div class="input-group">
                <div class="input-group-prepend">資產照片 :</div>
                <div class="mb-3 file_wrap">
                  <button class='choose_btn' @click="storageStore.chooseFile(index)">選擇檔案</button>
                  <input type="file" accept="image/*" style="display: none;" multiple
                    @change="utilsStore.handleImgChange($event, tab)" />
                </div>
              </div>
            </div>
            <!-- 頁籤已選擇檔案 -->
            <div v-show="!quickprocessStore.createHidden" class="selected_file col">
              <div class="input-group my-3">
                <div class="input-group-prepend">已選擇檔案 :</div>
                <div class="selected_file_wrap">
                  <div v-for="(file, file_index) in tab.viewFile" :key="file_index" class="file_upload_wrap">
                    <p>{{ file.FileName }}
                      <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;"
                        @click="utilsStore.viewImgFile(file, file_index)" data-bs-toggle="modal"
                        data-bs-target="#viewFile_modal">
                      <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;"
                        @click="utilsStore.deleteImgFile('new', tab, file_index)">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 已上傳檔案 -->
            <div v-show="!quickprocessStore.createHidden" class="selected_file col">
              <div class="input-group my-3">
                <div class="input-group-prepend">已上傳檔案 :</div>
                <div class="selected_file_wrap">
                  <div v-for="(file, file_index) in tab.existFile" :key="file_index" class="file_upload_wrap">
                    <p>{{ file.FileName }}
                      <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;"
                        @click="utilsStore.viewImgFile(file, file_index)" data-bs-toggle="modal"
                        data-bs-target="#viewFile_modal">
                      <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;"
                        @click="utilsStore.deleteImgFile('exist', tab, file_index)">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 頁籤入庫方式 -->
            <div class="store_option">
              <div class="title">
                <p>入庫方式</p>
              </div>
              <div class="content">
                <!-- 直接入庫/指派給保管人 -->
                <div class="row">
                  <div class="col-12">
                    <div class="input-group mb-3 check_box_wrap">
                      <div class="input-group-prepend check_box">
                        <span class='red_star'>*</span>入庫方式 :
                      </div>
                      <div v-if="!quickprocessStore.editHidden" class="d-flex radio_wrap store_staff">
                        <template v-for="(item, InboundIndex) in DropdownArray.InboundWay"
                          :key="'radio' + (InboundIndex + 1)">
                          <div class="form-check">
                            <input type="radio" class="form-check-input check_box"
                              :id="'InboundRadio_' + (index + 1) + (InboundIndex + 1)" :value="item"
                              v-model="tab.itemInboundWay" @change="storageStore.changeInboundWay('tab', index)" />
                            <label class="form-check-label check_box"
                              :for="'InboundRadio_' + (index + 1) + (InboundIndex + 1)"> {{ item }} </label>
                          </div>
                        </template>
                      </div>
                      <div v-else-if="!quickprocessStore.createHidden" class="d-flex radio_wrap store_staff">
                        <template v-for="(item, InboundIndex) in DropdownArray.InboundWay"
                          :key="'radio' + (InboundIndex + 1)">
                          <div class="form-check">
                            <input type="radio" class="form-check-input check_box"
                              :id="'InboundRadio_' + (index + 1) + (InboundIndex + 1)" :value="item"
                              v-model="tab.itemInboundWay" :disabled="item !== tab.itemInboundWay" />
                            <label class="form-check-label check_box"
                              :for="'InboundRadio_' + (index + 1) + (InboundIndex + 1)"> {{ item }} </label>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 用途 -->
                <div v-show="tab.itemInboundWay === '指派給保管人'" class="row">
                  <div class="col-12">
                    <div class="input-group mb-3 check_box_wrap">
                      <div class="input-group-prepend check_box">
                        <span class='red_star'>*</span>用途 :
                      </div>
                      <div class="d-flex align-items-center radio_wrap">
                        <template v-for="(item, UseIndex) in DropdownArray.Use" :key="'radio' + (UseIndex + 1)">
                          <input type="radio" class="form-check-input check_box"
                            :id="'UseRadio_' + (index + 1) + (UseIndex + 1)" :value="item" v-model="tab.itemUse" />
                          <label class="form-check-label check_box" :for="'UseRadio_' + (index + 1) + (UseIndex + 1)">
                            {{ item }}
                          </label>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 保管人員 -->
                <div v-show="tab.itemInboundWay === '指派給保管人'" class="col">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"> <span class='red_star'>*</span>保管人員 :</div>
                    <select class="form-select" v-model="tab.itemCustodian">
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.Custodian" :key="option" :value="option">{{ option }}
                      </option>
                    </select>
                  </div>
                </div>
                <!-- 儲位區域/儲位櫃位 -->
                <div v-show="tab.itemInboundWay === '直接入庫'" class="store_location row g-xl-0 g-lg-0 g-md-0">
                  <div class="col row">
                    <label for="inputPassword" class="col col-form-label"><span class='red_star'>*</span>儲位區域 :</label>
                    <select class="form-select col" v-model="tab.itemArea_Id"
                      @change="async () => { tab.LayerArray = await apiStore.getLayer(tab.itemArea_Id); tab.itemLayer_Id = ''; }">
                      <option value="">--請選擇--</option>
                      <option v-for="option in DropdownArray.Area" :key="option" :value="option.Id">{{ option.Name }}
                      </option>
                    </select>
                  </div>
                  <div class="col row">
                    <label for="inputPassword" class="col col-form-label"><span class='red_star'>*</span>儲位櫃位 :</label>
                    <select class="form-select col" v-model="tab.itemLayer_Id">
                      <option v-if="tab.LayerArray.length == 0" value="">--請先選擇設備總類--</option>
                      <template v-else>
                        <option value="">--請選擇--</option>
                        <option v-for="option in tab.LayerArray" :key="option.Id" :value="option.Id">{{ option.Name }}
                        </option>
                      </template>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import view_modal from "@/components/view_modal.vue"
import VueMultiselect from 'vue-multiselect'
// pinia
import { useUtilsStore, useAPIStore } from '@/store'
import { useStorageStore } from '@/store/storage/_index'
import { storeToRefs } from "pinia";
import { useQuickProcessStore } from "@/store/storage/quick_process";
import { onUnmounted } from "vue";
const storageStore = useStorageStore();
const utilsStore = useUtilsStore();
const quickprocessStore = useQuickProcessStore();
const apiStore = useAPIStore();
const { DropdownArray, upperForm, middleForm, tabData, Type, hidden } = storeToRefs(storageStore);

onUnmounted(() => {
  quickprocessStore.$dispose();
  storageStore.$dispose();
  utilsStore.$dispose();
  apiStore.$dispose();
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

textarea {
  padding: 5px 10px 30px;
}

.input-group-prepend {
  color: white;
  font-weight: 700;
  font-size: 20px;
  text-align: end;
}

.form_search_btn {
  @include form_search_btn;
}

.readonly_box {
  @include readonly_box;
}

.purchase_amount {
  .input-group-prepend {
    margin-right: 10px;
  }

  .amount_input {
    display: flex;
    margin-left: unset !important;
  }

  span {
    color: white !important;
  }

  span.symbol {
    font-size: 22px;
  }

  span.note {
    font-weight: 700;
    font-size: 18px;
  }

  input {
    border-radius: 5px;
    border: none;
  }
}

.dropdown {

  #typeDropdown,
  #categoryDropdown,
  #areaDropdown {
    height: 38px;
    padding: 5px 10px !important;
  }
}

.delete_btn {
  background: var(--c-5, #e94b4b);
  justify-content: center;
  align-items: center;
  display: inline-flex;
  height: 40px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  border: none;
  position: absolute;
  bottom: -1%;
  width: 100%;
  z-index: 2;
  left: 0;
  right: 0;
  margin: 0;
  border-radius: 0 0 10px 10px;

  &:hover {
    background-color: #a51e1e;
  }
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

.count-modal {
  .modal-body {
    padding: 20px;
    margin: auto;

    p {
      text-align: center;
      font-weight: 800;
    }
  }

  .modal-content {
    margin: auto;
  }

  .modal-input-group-prepend {
    width: auto;
    font-weight: 700;
    font-size: 20px;
  }

  .modal-footer {
    padding: 0 12px 12px;
    border: none;
    justify-content: center;

    .confirm {
      color: white;
      background-color: #132238;

      &:hover {
        background-color: #426497;
      }
    }
  }

  .modal-header {
    h5 {
      font-weight: 700;
    }

    background: #528091;
    color: white;
    display: flex;
    justify-content: center;
    padding: 0 16px 16px;

    .close_icon {
      height: 40px;
      cursor: pointer;
    }

    .modal-title {
      margin: auto;
      padding-top: 16px;
    }
  }
}

.view_icon,
.trash_icon {
  cursor: pointer;
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
  cursor: pointer; // &:hover {
  //   // background: #7893b7;
  //   // color: white;
  //   font-weight: 700;
  // }
}

.search_section {
  position: relative;
  display: flex;
  flex: 1 1 auto; // width: 100%;

  input {
    height: 35px;
    padding: 10px;
    border-radius: 5px;
    border: none;
  }

  .input-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: gray;
    font-size: 14px;
    pointer-events: none;
  }
}

.store_option {
  padding: 10px 0;

  .title {
    background: white !important;
    display: flex;
    justify-content: center;
    background: #3d4e61;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    height: 45px;
  }

  p {
    color: black;
    font-weight: 700;
    margin-bottom: 0;
    font-size: 20px;
  }

  .content {
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
    background: rgba(255, 255, 255, 0.3) !important;

    .option_wrap {
      margin-bottom: 15px;
      display: flex;
      align-items: center;

      .form-check-label {
        font-size: 20px;
        color: white;
        font-weight: 700;
      }
    }

    .store_location {
      .col-form-label {
        // padding: 0 3px;
        display: flex;
        align-items: center;
        justify-content: end;
      }

      .form-select {
        height: 37px;
      }
    }
  }
}

.store_option_wrap {
  // padding: 10px 0;

  .content {
    .option_wrap {
      margin-bottom: 15px;
      display: flex;
      align-items: center;

      .form-check-label {
        font-size: 20px;
        color: white;
        font-weight: 700;
      }
    }

    .store_location {
      .col-form-label {
        // padding: 0 3px;
        display: flex;
        align-items: center;
        justify-content: end;
      }

      .form-select {
        height: 37px;
      }
    }
  }
}

.swiper_section {
  swiper-slide {
    span {
      cursor: pointer;
      position: absolute;
      background: #e94b4b;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 700;
    }
  }

  swiper-slide img {
    width: 100%;
    height: auto;
  }
}

.tab-content {
  border-radius: 0 0 20px 20px;
}

.form_search_btn {
  @include form_search_btn;
}

.readonly_box {
  @include readonly_box;
}


.input-number {
  @include count_btn;
}

.info_wrap {
  margin: auto;

  .fixed_info {
    @include fixed_info;

    p {
      font-size: 20px;
      margin-bottom: 0;
    }
  }

  .search_option_section {
    width: 100%;
  }

  .check_box_wrap {
    font-weight: 700;
    color: white;
    font-size: 18px;
  }

  .input-group-prepend {
    white-space: nowrap;
  }

  .dropdown {
    .dropdown-menu {
      width: 100%;

      p {
        &:hover {
          cursor: pointer;
        }
      }
    }

    .dropdown-toggle {
      width: 100%;
      @include dropdown-btn;
      color: black;
      justify-content: space-between;
      align-items: center;
    }
  }

  .tab_section {
    .nav {
      overflow-x: auto;
      overflow-y: hidden;
      flex-wrap: nowrap;
      border: none;

      ::-webkit-scrollbar {
        height: 6px;
        border: 1px solid rgb(219, 218, 218);
        border-radius: 5px;
        width: 8px;
      }

      ::-webkit-scrollbar-thumb {
        display: block;
        border-radius: 5px;
        background-color: rgb(176, 175, 175);
        border: 1px solid rgb(86, 85, 85);
      }
    }

    .file_upload_wrap {
      margin-bottom: 0;
      display: flex;

      img {
        width: 25px;
        height: 25px;
      }

      p {
        font-weight: 700;
        margin-bottom: 0;
        color: white;
        word-break: break-word;

        &::before {
          content: "·";
          font-weight: 700;
          color: white;
        }
      }
    }

    .nav-tabs {
      button {
        @include tab_section_num;
        background: #5c7897;
      }

      .active {
        @include tab_section_num;
        background: #3e4e5f;
      }
    }

    .tab-content {
      background: #3e4e5f;
      position: relative;

      .check_box_wrap {
        font-weight: 700;
        color: white;
        font-size: 18px;
      }

      .dropdown {
        .dropdown-menu {
          width: 100%;
          max-height: 250px;
          overflow-y: auto;

          p {
            &:hover {
              cursor: pointer;
            }
          }
        }

        .dropdown-toggle {
          width: 100%;
          @include dropdown-btn;
          color: black;
          justify-content: space-between;
          align-items: center;
        }
      }

      .input-group {
        flex-wrap: nowrap;

        .file_wrap {
          display: flex;
          flex-direction: column;

          .choose_btn {
            @include choose_file_btn;

            &:hover {
              background: #3f608f;
            }
          }
        }
      }
    }
  }
}

.col-form-label {
  color: white;
  font-weight: 700;
  font-size: 20px;
  width: 130px;
  text-align: end;
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      width: 800px;

      .input-group-prepend {
        width: calc(100px + 6%);
        text-align: end;
      }

      .input-number {
        width: 57%;
      }

      .store_option_wrap {
        .store_location {
          gap: 0 43px;
        }
      }

      .content {
        @include content_bg;

        .store_location {
          display: flex;

          .col {
            align-items: center;
          }

          .col-form-label {
            padding-right: 13px;
          }

          .form-select {
            margin-left: -3px;
          }
        }

        .option_section {
          width: 78.5%;
        }

        .input-group-prepend {
          width: 150px;
          white-space: nowrap;
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

        .row_wrap {
          .flex {
            width: 130px;
          }
        }

        .dropdown {
          width: 218px;

          .dropdown-menu {
            max-height: 250px;
            overflow-y: auto;
          }
        }
      }
    }

    .tab_section {
      .amount_input {
        gap: 0 14px;
      }

      .tab-content {
        padding: 50px 20px;

        .store_option .check_box_wrap {
          margin-left: 3.2%;
        }

        .store_location {
          gap: 0 10px;

          .col {
            align-items: center;
          }
        }

        .selected_file {
          display: flex;
          align-items: center;
        }

        .input-number {
          width: 60.5%;
        }

        .check_box_wrap {
          align-items: center;

          div:nth-child(2) {
            gap: 0 10px;
            display: flex;
          }
        }

        .dropdown {
          width: 240px;

          .dropdown-menu {
            max-height: 250px;
            overflow-y: auto;
          }
        }

        .input-group {
          .input-group-prepend {
            width: 130px;
            text-align: end;
          }

          .option_section {
            width: 82%;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      width: 700px;

      .input-group-prepend {
        width: 117px;
        text-align: end;
      }

      .input-number,
      .dropdown {
        width: 60%;
      }

      .radio_wrap {
        gap: 0 10px;
      }

      .store_option_wrap {
        .option_section {
          width: 80.5%;
        }

        .input-group-prepend {
          width: 117px;
          white-space: nowrap;
        }

        .check_box_wrap {
          align-items: center;

          div:nth-child(2) {
            gap: 0 10px;
            display: flex;
          }
        }

        .row_wrap {
          .flex {
            width: 130px;
          }
        }

        .dropdown {
          width: 205px;

          .dropdown-menu {
            max-height: 250px;
            overflow-y: auto;
          }
        }

        .store_location {
          gap: 0 77px;
        }
      }

      .content {
        @include content_bg;
        padding: 17px;

        .store_location {
          display: flex;

          .col {
            align-items: center;
          }

          .col-form-label {
            padding-right: 13px;
          }

          .form-select {
            margin-left: -3px;
          }
        }
      }
    }

    .tab_section {
      .purchase_amount {
        flex-wrap: nowrap;

        span.note {
          position: relative;
          right: 8%;
        }

        .amount_input {
          gap: 0 5px;

          input {
            width: 73%;
          }
        }
      }

      .tab-content {
        padding: 50px 20px;

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

        .dropdown {
          width: 190px;

          .dropdown-menu {
            max-height: 250px;
            overflow-y: auto;
          }
        }

        .input-group {
          .input-group-prepend {
            color: white;
            font-weight: 700;
            font-size: 20px;
            width: 130px;
            text-align: end;
          }

          .option_section {
            width: 80%;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .form_search_btn {
      margin-top: 10px;
    }

    .info_wrap {
      padding: 0 5%;

      .store_option_wrap {
        .row {
          flex-direction: column;

          .col-form-label {
            padding-top: 0;
            justify-content: left;
            margin-bottom: 5px;
          }
        }

        .store_location {
          gap: 16px 0;
        }
      }

      .store_staff,
      .store_option {
        flex-direction: column;
      }

      .fixed_info {
        height: unset !important;
        padding: 10px;
        flex-direction: column;
      }

      .input-group-prepend {
        margin-bottom: 5px;
        margin-right: 10px;
        text-align: left;
      }

      .content {
        @include content_bg;

        .check_box_wrap {
          flex-direction: row;

          .check_box {
            margin-right: 10px;
          }
        }

        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset;
          border-radius: 5px;
        }

        .input-group {
          flex-direction: column;

          .input-number,
          .form-control,
          .form-select {
            width: 100%;
          }
        }

        .info {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
        }
      }
    }

    .tab_section {
      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: unset !important;
      }

      .tab-content {
        padding: 50px 30px;

        .selected_file {
          display: flex;
          align-items: center;

          .input-group {
            flex-direction: column;
          }
        }

        .check_box_wrap {
          flex-direction: column;
          font-weight: 700;
          color: white;
          font-size: 18px;

          .input-group-prepend {
            width: auto !important;
            align-self: self-start;
          }

          .radio_wrap {
            gap: 0 10px;
          }
        }

        .dropdown {
          margin-left: unset !important;
          margin-top: 5px;
          width: 100%;

          .dropdown-menu {
            max-height: 250px;
            overflow-y: auto;
          }
        }

        .input-group {
          flex-direction: column;

          .form-control {
            width: 100%;
            margin-left: unset !important;
            margin-top: 5px;
          }
        }

        .purchase_amount {
          .amount_input {
            display: flex;
            gap: 0 10px;
            font-size: 20px;
            align-items: center;
          }

          .input-group-prepend {
            margin-right: 10px;
          }

          span {
            color: white !important;
          }

          span.note {
            margin-top: 5px;
            margin-bottom: 16px;
            display: block;
            font-weight: 700;
            font-size: 18px;
          }
        }

        .store_location {
          justify-content: center;
          flex-direction: column;
          gap: 16px 0;

          .row {
            margin: 0;
            flex-direction: column;
          }

          label {
            padding-left: 0;
            justify-content: left;
          }
        }
      }
    }
  }
}
</style>