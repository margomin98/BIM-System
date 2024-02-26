<template>
    <div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>資產編號: {{ Form.AssetsId }}</p>
                </div>
                <div v-show="PageType === 'view'">
                    <p>物品名稱: {{ Form.AssetName }}</p>
                </div>
                <div v-show="PageType === 'view'">
                    <p>資產類型: {{ Form.AssetType }}</p>
                </div>
            </div>
            <div class="content">
                <!-- 狀態 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                狀態：
                            </div>
                            <input type="text" class="form-control readonly_box" readonly v-model="Form.Status">
                        </div>
                    </div>
                </div>
                <!-- 資產類型 (耗材為readonly ，資產<->存貨 可互換 )-->
                <div v-if="PageType === 'edit'" class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend flex"><span class="red_star" v-if="Form.AssetType !== '耗材'">*</span>資產類型：</div>
                            <select v-if="Form.AssetType !== '耗材'" class="form-select" v-model="Form.AssetType">
                                <option value="資產">資產</option>
                                <option value="存貨">存貨</option>
                            </select>
                            <input v-else type="text" class="form-control readonly_box" readonly v-model="Form.AssetType">
                        </div>
                    </div>
                </div>
                <!-- 專案代碼 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"><span class="red_star" v-show="PageType==='edit' && Form.AssetType === '存貨'">*</span>專案代碼：</div>
                        <input type="text" class="form-control" :class="{'readonly_box': PageType === 'view'}" :readonly="PageType === 'view'" v-model="Form.ProjectCode" />
                        <button v-show="PageType==='edit'" class="form_search_btn" @click="async()=>{ Form.ProjectName = await apiStore.getProject(Form.ProjectCode)}">搜尋</button>
                    </div>
                </div>
                <!-- 專案名稱 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">專案名稱：</div>
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.ProjectName" />
                    </div>
                </div>
                <!-- 物流單號 -->
                <div class="col form_search_wrap">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            物流單號：
                        </div>
                        <input type="text" class="form-control readonly_box" readonly v-model="Form.ShipmentNum">
                        <button class="form_search_btn" @click="storageStore.viewReceive(Form)">檢視</button>
                        <!-- 隱藏跳轉按鈕 -->
                        <router-link :to="{name: 'Receive_View' , query:{ search_id : Form.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
                    </div>
                </div>
                <!-- 設備 總類&分類 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend"><span v-show="PageType==='edit'" class="red_star">*</span>設備總類：</div>
                            <select v-if="PageType === 'edit'" class="form-select" v-model="Form.EquipType_Id" @change="async()=>{DropdownArray.EquipCategory = await apiStore.getEquipCategory(Form.EquipType_Id); Form.Category_Id = '';}">
                                <option value="">--請選擇--</option>
                                <option v-for="option in DropdownArray.EquipType" :value="option.Id">{{ option.Name }}</option>
                            </select>
                            <input v-else-if="PageType === 'view'" type="text" class="form-control readonly_box" v-model="Form.EquipType_Id" readonly>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend"><span v-show="PageType==='edit'" class="red_star">*</span>設備分類：</div>
                            <select v-if="PageType === 'edit'" class="form-select" v-model="Form.Category_Id">
                                    <option v-if="DropdownArray.EquipCategory.length == 0" value="">--請先選擇設備總類--</option>
                                    <template v-else>
                                        <option value="">--請選擇--</option>
                                        <option v-for="option in DropdownArray.EquipCategory" :value="option.Id">{{ option.Name }}</option>
                                    </template>
                            </select>
                            <input v-else-if="PageType === 'view' " type="text" class="form-control readonly_box" v-model="Form.Category_Id" readonly>
                        </div>
                    </div>
                </div>
                <!-- 物品名稱 -->
                <div v-show="PageType==='edit'" class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"><span class="red_star">*</span>物品名稱：</div>
                        <input type="text" class="form-control " placeholder="最多輸入20字" v-model="Form.AssetName" />
                    </div>
                </div>
                <!-- 廠商 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">廠商：</div>
                        <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.VendorName"/>
                        <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入100字" v-model="Form.VendorName"/>
                    </div>
                </div>
                <!-- 型號 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">型號：</div>
                        <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.ProductSpec"/>
                        <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入100字" v-model="Form.ProductSpec"/>
                    </div>
                </div>
                <!-- 規格 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">規格：</div>
                        <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.ProductType"/>
                        <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入100字" v-model="Form.ProductType"/>
                    </div>
                </div>
                <!-- S/N -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">S/N：</div>
                        <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.SN"/>
                        <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入100字" v-model="Form.SN"/>
                    </div>
                </div>
                <!-- 採購金額 -->
                <div v-if="roleId === 1 || roleId === 4" class="row  purchase_amount">
                    <div class="col-xl-6 col-lg-auto col-md-auto col-12">
                        <div class="input-group mb-xl-3 mb-lg-3 mb-md-3">
                            <div class="input-group-prepend">
                                採購金額：
                            </div>
                            <div class="amount_input">
                                <span class="symbol">$</span><input type="text" class="form-control readonly_box" readonly v-model="Form.AmountPerPackage">
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <span class="note">/每包裝單位<span v-show="Form.AssetType === '耗材'">($<span class="purchase_total_amount">{{ Form.AmountPerUnit}}</span>/每單位)</span>
                        </span>
                    </div>
                </div>
                <!-- 總庫存數量、單位 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">總庫存數量：</div>
                            <input type="text" class="form-control readonly_box" readonly v-model="Form.Number"/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">單位：</div>
                            <input type="text" class="form-control readonly_box" readonly v-model="Form.Unit"/>
                        </div>
                    </div>
                </div>
                <!-- 儲位 區域&櫃位 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">儲位區域：</div>
                            <select v-if="PageType === 'edit'" class="form-select col" v-model="Form.Area_Id" @change="async()=>{DropdownArray.Layer = await apiStore.getLayer(Form.Area_Id); Form.Layer_Id = '';}">
                                <option value="">--請選擇--</option>
                                <option v-for="option in DropdownArray.Area" :value="option.Id">{{ option.Name }}</option>
                            </select>
                            <input v-else-if="PageType === 'view' " type="text" class="form-control readonly_box" v-model="Form.Area_Id" readonly>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">儲位櫃位：</div>
                            <select v-if="PageType === 'edit'" class="form-select col" v-model="Form.Layer_Id">
                                <option v-if="DropdownArray.Layer.length == 0" value="">--請先選擇設備總類--</option>
                                <template v-else>
                                    <option value="">
                                        --請選擇--</option>
                                    <option v-for="option in DropdownArray.Layer" :value="option.Id">{{ option.Name }}</option>
                                </template>
                            </select>
                            <input v-else-if="PageType === 'view' " type="text" class="form-control readonly_box" v-model="Form.Layer_Id" readonly>
                        </div>
                    </div>
                </div>
                <!-- 保固期限 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                保固期限：
                            </div>
                            <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入10字" v-model="Form.WarrantyDate">
                            <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.WarrantyDate">
                        </div>
                    </div>
                </div>
                <!-- 保固 開始&結束 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">保固開始日：</div>
                            <input type="date" class="form-control" :class="{'readonly_box': PageType === 'view'}" :readonly="PageType === 'view'" v-model="Form.WarrantyStartDate"/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">保固到期日：</div>
                            <input type="date" class="form-control" :class="{'readonly_box': PageType === 'view'}" :readonly="PageType === 'view'" v-model="Form.WarrantyEndDate"/>
                        </div>
                    </div>
                </div>
                <!-- 保管人員 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                保管人員：
                            </div>
                            <select v-if="PageType === 'edit'" class="form-select" v-model="Form.Custodian">
                                <option value="">--請選擇--</option>
                                <option v-for="option in DropdownArray.Custodian" :value="option">{{ option }}</option>
                            </select>
                            <input v-else-if="PageType === 'view' " type="text" class="form-control readonly_box" v-model="Form.Custodian" readonly>
                        </div>
                    </div>
                </div>
                <!-- 入庫 人員&日期 -->
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">入庫人員：</div>
                            <input type="text" class="form-control readonly_box" readonly v-model="Form.AssetsInOperator"/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">入庫日期：</div>
                            <input type="text" class="form-control readonly_box" readonly v-model="Form.InboundDate"/>
                        </div>
                    </div>
                </div>
                <!-- 備註 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">備註：</div>
                        <textarea v-show="PageType === 'edit'" style="height: 150px;" class="form-control" aria-label="With textarea" v-model="Form.Memo"></textarea>
                        <textarea v-show="PageType === 'view'" style="height: 150px;" class="form-control readonly_box" aria-label="With textarea" readonly v-model="Form.Memo"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
          <!-- 狀態 -->
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend"> 狀態： </div>
                <input type="text" class="form-control readonly_box" readonly v-model="Form.Status">
              </div>
            </div>
          </div>
          <!-- 資產類型 (耗材為readonly ，資產<->存貨 可互換 )-->
          <div v-if="PageType === 'edit'" class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend flex">
                  <span class="red_star" v-if="Form.AssetType !== '耗材'">*</span>資產類型：
                </div>
                <select v-if="Form.AssetType !== '耗材'" class="form-select" v-model="Form.AssetType">
                  <option value="資產">資產</option>
                  <option value="存貨">存貨</option>
                </select>
                <input v-else type="text" class="form-control readonly_box" readonly v-model="Form.AssetType">
              </div>
            </div>
          </div>
          <!-- 專案代碼 -->
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="red_star" v-show="PageType==='edit' && Form.AssetType === '存貨'">*</span>專案代碼：
              </div>
              <input type="text" class="form-control" :class="{'readonly_box': PageType === 'view'}" :readonly="PageType === 'view'" v-model="Form.ProjectCode" />
              <button v-show="PageType==='edit'" class="form_search_btn" @click="async()=>{ Form.ProjectName = await apiStore.getProject(Form.ProjectCode)}">搜尋</button>
            </div>
          </div>
          <!-- 專案名稱 -->
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">專案名稱：</div>
              <input type="text" class="form-control readonly_box" readonly v-model="Form.ProjectName" />
            </div>
          </div>
          <!-- 物流單號 -->
          <div class="col form_search_wrap">
            <div class="input-group mb-3">
              <div class="input-group-prepend"> 物流單號： </div>
              <input type="text" class="form-control readonly_box" readonly v-model="Form.ShipmentNum">
              <button class="form_search_btn" @click="storageStore.viewReceive(Form)">檢視</button>
              <!-- 隱藏跳轉按鈕 -->
              <router-link :to="{name: 'Receive_View' , query:{ search_id : Form.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
            </div>
          </div>
          <!-- 設備 總類&分類 -->
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span v-show="PageType==='edit'" class="red_star">*</span>設備總類：
                </div>
                <select class="form-select" :class="{'readonly_box': PageType==='view'}" :disabled="PageType==='view'" v-model="Form.EquipType_Id" @change="async()=>{DropdownArray.EquipCategory = await apiStore.getEquipCategory(Form.EquipType_Id); Form.Category_Id = '';}">
                  <option value="">--請選擇--</option>
                  <option v-for="option in DropdownArray.EquipType" :value="option.Id">{{ option.Name }}</option>
                </select>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span v-show="PageType==='edit'" class="red_star">*</span>設備分類：
                </div>
                <select class="form-select" :class="{'readonly_box': PageType==='view'}" :disabled="PageType==='view'" v-model="Form.Category_Id">
                  <option v-if="DropdownArray.EquipCategory.length == 0" value="">--請先選擇設備總類--</option>
                  <template v-else>
                    <option value="">--請選擇--</option>
                    <option v-for="option in DropdownArray.EquipCategory" :value="option.Id">{{ option.Name }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <!-- 物品名稱 -->
          <div v-show="PageType==='edit'" class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="red_star">*</span>物品名稱：
              </div>
              <input type="text" class="form-control " placeholder="最多輸入20字" v-model="Form.AssetName" />
            </div>
          </div>
          <!-- 廠商 -->
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">廠商：</div>
              <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.VendorName" />
              <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入100字" v-model="Form.VendorName" />
            </div>
          </div>
          <!-- 型號 -->
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">型號：</div>
              <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.ProductSpec" />
              <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入100字" v-model="Form.ProductSpec" />
            </div>
          </div>
          <!-- 規格 -->
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">規格：</div>
              <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.ProductType" />
              <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入100字" v-model="Form.ProductType" />
            </div>
          </div>
          <!-- S/N -->
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">S/N：</div>
              <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.SN" />
              <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入100字" v-model="Form.SN" />
            </div>
          </div>
          <!-- 採購金額 -->
          <div v-if="roleId === 1 || roleId === 4" class="row  purchase_amount">
            <div class="col-xl-6 col-lg-auto col-md-auto col-12">
              <div class="input-group mb-xl-3 mb-lg-3 mb-md-3">
                <div class="input-group-prepend"> 採購金額： </div>
                <div class="amount_input">
                  <span class="symbol">$</span>
                  <input type="text" class="form-control readonly_box" readonly v-model="Form.AmountPerPackage">
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <span class="note">/每包裝單位 <span v-show="Form.AssetType === '耗材'">($ <span class="purchase_total_amount">{{ Form.AmountPerUnit}}</span>/每單位) </span>
              </span>
            </div>
          </div>
          <!-- 總庫存數量、單位 -->
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">總庫存數量：</div>
                <input type="text" class="form-control readonly_box" readonly v-model="Form.Number" />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">單位：</div>
                <input type="text" class="form-control readonly_box" readonly v-model="Form.Unit" />
              </div>
            </div>
          </div>
          <!-- 儲位 區域&櫃位 -->
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">儲位區域：</div>
                <select class="form-select col" :class="{'readonly_box': PageType === 'view'}" v-model="Form.Area_Id" @change="async()=>{DropdownArray.Layer = await apiStore.getLayer(Form.Area_Id); Form.Layer_Id = '';}" :disabled="PageType === 'view'">
                  <option value="">--請選擇--</option>
                  <option v-for="option in DropdownArray.Area" :value="option.Id">{{ option.Name }}</option>
                </select>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">儲位櫃位：</div>
                <select class="form-select col" :class="{'readonly_box': PageType === 'view'}" v-model="Form.Layer_Id" :disabled="PageType === 'view'">
                  <option v-if="DropdownArray.Layer.length == 0" value="">--請先選擇設備總類--</option>
                  <template v-else>
                    <option value=""> --請選擇--</option>
                    <option v-for="option in DropdownArray.Layer" :value="option.Id">{{ option.Name }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <!-- 保固期限 -->
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend"> 保固期限： </div>
                <input v-show="PageType === 'edit'" type="text" class="form-control" placeholder="最多輸入10字" v-model="Form.WarrantyDate">
                <input v-show="PageType === 'view'" type="text" class="form-control readonly_box" readonly v-model="Form.WarrantyDate">
              </div>
            </div>
          </div>
          <!-- 保固 開始&結束 -->
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">保固開始日：</div>
                <input type="date" class="form-control" :class="{'readonly_box': PageType === 'view'}" :readonly="PageType === 'view'" v-model="Form.WarrantyStartDate" />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">保固到期日：</div>
                <input type="date" class="form-control" :class="{'readonly_box': PageType === 'view'}" :readonly="PageType === 'view'" v-model="Form.WarrantyEndDate" />
              </div>
            </div>
          </div>
          <!-- 保管人員 -->
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend"> 保管人員： </div>
                <select class="form-select" :class="{'readonly_box': PageType === 'view'}" v-model="Form.Custodian" :disabled="PageType === 'view'">
                  <option value="">--請選擇--</option>
                  <option v-for="option in DropdownArray.Custodian" :value="option">{{ option }}</option>
                </select>
              </div>
            </div>
          </div>
          <!-- 入庫 人員&日期 -->
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">入庫人員：</div>
                <input type="text" class="form-control readonly_box" readonly v-model="Form.AssetsInOperator" />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
              <div class="input-group mb-3">
                <div class="input-group-prepend">入庫日期：</div>
                <input type="text" class="form-control readonly_box" readonly v-model="Form.InboundDate" />
              </div>
            </div>
          </div>
          <!-- 備註 -->
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">備註：</div>
              <textarea v-show="PageType === 'edit'" style="height: 150px;" class="form-control" aria-label="With textarea" v-model="Form.Memo"></textarea>
              <textarea v-show="PageType === 'view'" style="height: 150px;" class="form-control readonly_box" aria-label="With textarea" readonly v-model="Form.Memo"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="info_wrap col photo">
        <div class="fixed_title">
          <div>
            <h4>資產照片</h4>
          </div>
        </div>
        <div class="content">
          <h2 v-show="Form.viewFile.length === 0" class="no_content_text">查無照片</h2>
          <div v-show="Form.viewFile.length !== 0">
            <swiper-container class='swiper_section' :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
              <swiper-slide v-for="(file , index) in Form.viewFile" :key="index" class="custom-slide">
                <img class="swiper_bottom_img" :src="file.FileLink" alt="">
                <button class='zoom_img' data-bs-toggle="modal" data-bs-target="#viewFile_modal" @click="utilsStore.viewImgFile(file)">
                  <img src="@/assets/zoom.png">
                </button>
                <span v-show="PageType==='edit'" @click="utilsStore.deleteImgFile2(file, Form, index)">x</span>
              </swiper-slide>
            </swiper-container>
            <div class="swiper_pagination"></div>
          </div>
        </div>
        <div v-show="PageType==='edit'" class="col button_wrap">
          <button class='select_btn' @click="openFileExplorer()">選擇檔案</button>
          <input type="file" ref="fileInput" accept="image/*" style="display: none;" multiple @change="utilsStore.handleImgChange2($event, Form)" />
          <button class="send_btn" @click="editStore.submit">送出</button>
        </div>
      </div>
      <div class="info_wrap col log">
        <div class="fixed_title">
          <div>
            <h4>進出庫歷史紀錄</h4>
          </div>
        </div>
        <div class="content_wrap">
          <div class="content">
            <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-4 col-12">
                <p>作業日期(起)</p>
                <div class="date-selector">
                  <div class="input-container">
                    <input type="date" class="date-input" v-model="searchParams.StartDate" />
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-4 col-12">
                <p>作業日期(迄)</p>
                <div class="date-selector">
                  <div class="input-container">
                    <input type="date" class="date-input" v-model="searchParams.EndDate" />
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-4 col-12">
                <p>作業行為</p>
                <select class="form-select col" v-model="searchParams.Action">
                  <option value="">--請選擇--</option>
                  <option v-for="option in DropdownArray.Actions" :value="option">{{ option }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col button_wrap">
            <button class="search_btn" @click="assetStore.searchHistory('','search')">檢索</button>
            <button class="empty_btn" @click="()=>{utilsStore.clearSearchParams(searchParams); assetStore.searchHistory('','search'); }">清空</button>
          </div>
          <div>
            <DataTable lazy :key="datagrid.key" :first="datagrid.first" :size="'small'" :loading="datagrid.loading" :value="rowData" :sort-field="datagrid.sortField" :sort-order="datagrid.sortOrder" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" @page="assetStore.searchHistory($event , 'page')" @sort="assetStore.searchHistory($event , 'sort')" paginator :rows="datagrid.rows" :totalRecords="datagrid.totalRecords" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
              <Column style="min-width: 60px;">
                <template #body="slotProps">
                  <Storage_list_view_button :params="slotProps" v-if="slotProps.data.FormID" />
                </template>
              </Column>
              <Column v-for="item in datagridField" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <view_modal></view_modal>
  </template>

<script setup>
    import Storage_list_view_button from '../Storage_list_view_button.vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import view_modal from '../view_modal.vue';
    import {
        useAssetStore
    } from "@/store/asset/_index";
    import {
        useAPIStore,
        useUtilsStore
    } from '@/store';
    import {
        useStorageStore
    } from '@/store/storage/_index';
    import {
        useEditStore
    } from "@/store/asset/edit";
    import {
        onMounted,
        onUnmounted,
        ref
    } from 'vue';
    import {
        storeToRefs
    } from 'pinia';
    import {
        useRoute
    } from 'vue-router';
    // swiper
    import {
        register
    } from 'swiper/element/bundle';
    import {
        Pagination
    } from 'swiper/modules';
    const utilsStore = useUtilsStore();
    const storageStore = useStorageStore();
    const editStore = useEditStore();
    const apiStore = useAPIStore();
    const assetStore = useAssetStore();
    const pagination = {
        clickable: true
    }
    const modules = [Pagination]
    const fileInput = ref();
    const roleId = ref();
    // 解構
    const {
        DropdownArray,
        Form,
        searchParams,
        PageType,
        datagrid,
        datagridField,
        rowData
    } = storeToRefs(assetStore);
    onMounted(async () => {
        register(); 
        roleId.value = await apiStore.getRoleId('admin');
        // roleId.value = await apiStore.getRoleId(utilsStore.userName);
    })
    onUnmounted(()=>{
      apiStore.$dispose();
      utilsStore.$dispose();
      editStore.$dispose();
      assetStore.$dispose();
      storageStore.$dispose();
    })
    const openFileExplorer = () => {
        fileInput.value.click();
    }
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.form-select:disabled {
    background-color: #B4B4B4;
}
.input-group
 > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
  .valid-feedback
 ):not(.invalid-tooltip):not(.invalid-feedback) {
 margin-left: unset;
}

.button_wrap {
 display: flex;
 margin-top: 30px;
 justify-content: center;
 margin-bottom: 5%;
 gap: 20px;
}

.back_btn {
 @include back_to_previous_btn;
 &:hover {
  background-color: #5d85bb;
 }
}

.empty_btn {
 @include empty_btn;
 &:hover {
  background-color: #244f86;
 }
}

.search_btn,
.send_btn {
 @include search_and_send_btn;
 &:hover {
  background-color: #5e7aa2;
 }
}

.select_btn {
 @include select_btn;
 &:hover {
  background-color: #899bb6;
 }
}

.no_content_text {
 padding: 5px 0;
 text-align: center;
 font-weight: 700;
}

.photo {
 .content {
  border-radius: 0 10px 10px 10px !important;
  box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
  background-color: #e5e8e9 !important;
 }
 margin: 5% auto;
}

.log {
 margin-top: 3% !important;
 .info_wrap {
  width: 100%;
  #grid_table {
   margin-bottom: 0 !important;
  }
 }
 .content_wrap {
  background-color: #e6eaec;
  border-radius: 0 10px 10px 10px;
  padding: 20px;
  box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.25);
  .content {
   border-radius: 10px !important;
  }
  p {
   @include datagrid_title;
  }
  input {
   display: flex;
   border: none;
   border-radius: 5px;
   background-color: white;
   padding: 5px 10px;
   font-size: 18px;
   height: 35px;
  }
 }
}
.info_wrap:nth-child(1) {
 margin-bottom: 3% !important;
}
span.red_star {
 @include red_star;
}
 .readonly_box {
   @include readonly_box;
  }
  .form_search_btn {
   @include form_search_btn;
   margin-left: 10px !important;
  }


  .purchase_amount {

    .input-group-prepend {
      margin-right: 10px;
     }
     .amount_input {
      display: flex;
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
}

.info_wrap {
  margin: auto;
  .fixed_info {
    @include fixed_info;
    border-radius: 10px 10px 0 0;
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
   
    .dropdown {
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
       width: 120px;
       text-align: end;
      }
     }
  }
  .content:nth-child(1) {
    border-radius: 0px 10px 10px 10px;
   }
   .content:nth-child(2) {
    border-radius: 0px 0px 10px 10px;
   }
 
}
@media only screen and (min-width: 1200px) {
 .main_section {
 

  .purchase_amount {
   align-items: baseline;
   flex-wrap: nowrap;

   .amount_input {
    gap: 0 13px;
    margin-left: 0;
   }
 
   span.note {
    margin-left: -5%;
   }
  }
  .info_wrap {
   width: 800px;
  
  
   .content {

 
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
   .date-selector input {
    width: 100%;
   }
  }
 }
}
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
 .main_section {

  .purchase_amount {
   align-items: baseline;
   flex-wrap: nowrap;
   input {
    width: calc(100% - 36%);
   }
  
   .amount_input {
    gap: 0 13px;
    margin-left: 0;
   }
  
   span.note {
    margin-left: calc(100% - 120%);
   }
  }
  .info_wrap {
   padding: 0 5%;
   width: 800px;
  
   .content {

   
   
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
     p {
      font-size: 18px;
      color: black;
      font-weight: normal;
     }
    }
   }
  }
  .info_wrap:nth-child(4) .info_wrap {
   padding: 0;
  }
 }
}
}

@media only screen and (max-width: 767px) {
 .main_section {
  select,
  input {
   width: 100%;
  }
  .form_search_btn {
   border: none;
   color: white;
   width: 60px;
   height: 35px;
   margin-top: 10px;
   font-weight: 700;
   padding: 0 10px;
   margin-left: unset !important;
   background-color: #132238;

  }

  .purchase_amount {
   .amount_input {
    gap: 0 10px;
    font-size: 20px;
    align-items: center;
   }
  
   span.note {
    margin-top: 5px;
    margin-bottom: 16px;
    display: block;
   }
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
  
    .input-group {
     flex-direction: column;
   
     .form-control {
      width: 100%;
      margin-left: unset !important;
     }
     .input-group-prepend {
      margin-bottom: 5px;
      text-align: left;
     }
    }
   }
   
  }
  .info_wrap:nth-child(4) .info_wrap {
   padding: 0;
  }
 }
}
</style>
