<template>
    <div class="main_section">
    
       <div class="info_wrap col mb-5">
         <div class="fixed_info">
           <div>
             <p>
               申請人員 : {{ utilsStore.userName }}
             </p>
           </div>
           <div>
             <p>
               申請入庫日期 : {{ utilsStore.today }}
             </p>
           </div>
         </div>
         <div class="content">
           <!-- 物流單號 -->
           <div class="col form_search_wrap mb-3">
             <div class="input-group">
               <div class="input-group-prepend">
                 物流單號 :
               </div>
               <div class="search_section">
                 <input @input="storageStore.fuzzyShipmentNum" class="form-control" @focus="showOptions = true;" @blur="storageStore.handleBlur" v-model="upperForm.ShipmentNum" />
                 <ul v-if="showOptions" class="options-list">
                   <li v-for="(option, index) in DropdownArray.fuzzyShipmentNum" :key="index" @click="storageStore.selectShipmentNum(option)">{{ option.ShipmentNum }}
                   </li>
                 </ul>
               </div>
               <button class="form_search_btn" @click="storageStore.viewReceive">檢視</button>
               <!-- 隱藏跳轉按鈕 -->
               <router-link :to="{name: 'Receive_View' , query:{ search_id : upperForm.AR_ID}}" target="_blank" id="view-receive" style="display: none;"></router-link>
             </div>
           </div>
           <!-- 備註 -->
           <div class="col mb-3">
             <div class="input-group">
               <div class="input-group-prepend">備註 :</div>
               <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入500字" v-model="upperForm.Memo"></textarea>
             </div>
           </div>
         </div>
       </div>
       <div class="info_wrap col">
         <div class="fixed_info">
           <div>
             <p><span>*</span>填寫資產資訊(請至少填寫一項)</p>
           </div>
         </div>
         <div class="content">
       <!-- 資產類型 -->
       <div class="row">
           <div class="col-12">
               <div class="input-group mb-3 check_box_wrap">
                   <div class="input-group-prepend check_box">
                       <span>*</span>資產類型 :
                   </div>
                   <div class="d-flex align-items-center radio_wrap">
                     <template v-for="(item, index) in DropdownArray.AssetType" :key="'radio' + (index + 1)">
                       <input
                         v-if="item !== '耗材'"
                         type="radio"
                         class="form-check-input check_box"
                         :id="'radio' + (index + 1)"
                         style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"
                         :value="item"
                         v-model="middleForm.itemAssetType"
                         @change="storageStore.resetUnitCount('middleForm')"
                       />
                       <input
                         v-else
                         type="radio"
                         class="form-check-input check_box"
                         :id="'radio' + (index + 1)"
                         style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"
                         :value="item"
                         v-model="middleForm.itemAssetType"
                       />
                       <label
                         class="form-check-label check_box"
                         :for="'radio' + (index + 1)"
                         :data-toggle="index === 1 ? 'tooltip' : null"
                         :data-placement="index === 1 ? 'top' : null"
                         :title="index === 1 ? '註記此資產僅限特定專案出貨所使用' : null"
                       >
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
               <input type="text" class="form-control" placeholder="最多輸入10字" v-model="middleForm.itemProjectCode">
               <button class="form_search_btn" @click="async()=>{ middleForm.itemProjectName = await apiStore.getProject(middleForm.itemProjectCode)}">搜尋</button>
           </div>
       </div>
       <!-- 專案名稱 -->
       <div class="col">
           <div class="input-group mb-3">
               <div class="input-group-prepend">
                 專案名稱 :
               </div>
               <input type="text" class="form-control readonly_box" v-model="middleForm.itemProjectName" readonly>
           </div>
       </div>
       <!-- 設備 總類&分類 -->
       <div class="row row_wrap g-0">
         <div class="col-xl-6 col-lg-6 col-md-6 col-12">
           <div class="input-group mb-3">
               <div class="input-group-prepend equipment_wrap">
                 <span>*</span>設備總類 :
               </div>
               <div class="dropdown">
                 <select class="form-select" id="floatingSelect" v-model="middleForm.itemEquipType_Id" @change="async()=>{DropdownArray.EquipCategory = await apiStore.getEquipCategory(middleForm.itemEquipType_Id); middleForm.itemCategory_Id = '';}">
                   <option value="">--請選擇--</option>
                   <option v-for="option in DropdownArray.EquipType" :value="option.Id">{{ option.Name }}</option>
                 </select>
               </div>
           </div>
         </div>
         <div class="col-xl-6 col-lg-6 col-md-6 col-12">
           <div class="input-group mb-3">
             <div class="input-group-prepend">
               <span>*</span>設備分類 :
             </div>
             <div class="dropdown">
               <select class="form-select" id="floatingSelect" v-model="middleForm.itemCategory_Id">
                 <option v-if="DropdownArray.EquipCategory.length == 0" value="">--請先選擇設備總類--</option>
                 <template v-else>
                   <option value="">--請選擇--</option>
                   <option v-for="option in DropdownArray.EquipCategory" :value="option.Id">{{ option.Name }}</option>
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
                 <span>*</span>物品名稱 :
             </div>
             <input type="text" class="form-control" placeholder="最多輸入20字" v-model="middleForm.itemAssetName">
         </div>
       </div>
       <!-- 資產編號 -->
       <div class="col">
           <div class="input-group mb-3">
               <div class="input-group-prepend">資產編號 :</div>
               <input type="text" class="form-control" placeholder="BFXXXXXXXX" v-model="middleForm.itemAssetsId">
           </div>
       </div>
       <!-- 廠商 -->
       <div class="col">
           <div class="input-group mb-3">
               <div class="input-group-prepend">
                   廠商 :
               </div>
               <input type="text" class="form-control" placeholder="最多輸入100字" v-model="middleForm.itemVendorName">
           </div>
       </div>
       <!-- 規格 -->
       <div class="col">
           <div class="input-group mb-3">
               <div class="input-group-prepend">
                   規格 :
               </div>
               <input type="text" class="form-control" placeholder="最多輸入100字" v-model="middleForm.itemProductSpec">
           </div>
       </div>
       <!-- 型號 -->
       <div class="col">
           <div class="input-group mb-3">
               <div class="input-group-prepend">
                   型號 :
               </div>
               <input type="text" class="form-control" placeholder="最多輸入100字" v-model="middleForm.itemProductType">
           </div>
       </div>
       <!-- S/N -->
       <div class="col">
           <div class="input-group mb-3">
               <div class="input-group-prepend">S/N :</div>
               <input type="text" class="form-control" aria-label="Default" placeholder="最多輸入100字" v-model="middleForm.itemSN">
           </div>
       </div>
       <!-- 包裝數量 & 包裝單位 -->
       <div class="row g-0 row_wrap">
           <div class="col-xl-6 col-lg-6 col-md-6 col-12">
               <div class="input-group mb-3" id='number'>
                   <div class="input-group-prepend info  ">
                     <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                     <span>*</span>包裝數量 :<img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                   </div>
                   <input class="input-number" type="number" min="1" v-model="middleForm.itemPackageNum">
               </div>
           </div>
           <div class="col-xl-6 col-lg-6 col-md-6 col-12">
               <div class="input-group mb-3" id='unit'>
                   <div class="input-group-prepend">
                       <span>*</span>包裝單位 :
                   </div>
                   <div class="dropdown">
                     <select class="form-select" id="floatingSelect" v-model="middleForm.itemPackageUnit">
                       <option value="">--請選擇--</option>
                       <option v-for="option in DropdownArray.PackageUnit" :value="option">{{ option }}</option>
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
                     <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                     <span v-show="middleForm.itemAssetType === '耗材'">*</span>數量 :
                     <img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                   </div>
                   <input v-if="middleForm.itemAssetType === '耗材'" class="input-number" type="number" v-model="middleForm.itemCount" min="1">
                   <input v-else class="input-number readonly_box" type="number" v-model="middleForm.itemCount" min="1" readonly>
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
                       <option v-for="option in DropdownArray.Unit" :value="option">{{ option }}</option>
                     </select>
                   </div>
                   <input v-else class="input-number readonly_box" type="text" v-model="middleForm.itemPackageUnit" min="1" readonly>
               </div>
           </div>
       </div>
       <!-- 備註 -->
       <div class="col">
           <div class="input-group mb-3">
               <div class="input-group-prepend">
                   備註 :
               </div>
               <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入500字" v-model="middleForm.itemMemo"></textarea>
           </div>
       </div>
       <div class="d-flex justify-content-center">
           <button class="send_btn" @click="storageStore.insertTab">新增</button>
       </div>
   </div>
   
      <!-- 頁籤部分 -->
   <div v-show="tabData.length > 0" class="tab_section mt-5">
       <!-- tab頂端頁籤 -->
       <nav>
         <div class="nav nav-tabs" id="nav-tab" role="tablist">
           <button v-for="tab in parseInt(tabData.length)" :key="tab" :class="['nav-link', { active: tab === 1 }]" data-bs-toggle="tab" :data-bs-target="'#tab' + (tab)" type="button" role="tab">{{ tab }}</button>
         </div>
       </nav>
       <!-- tab內容 -->
       <div class="tab-content d-block" id="nav-tabContent">
           <div v-for="(tab, index) in tabData" :key="index" :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel">      
                <!-- deleteButton -->
               <button class="delete_btn" @click="storageStore.deleteTab(index)">刪除此筆</button>
               <!-- 頁籤資產類型 -->
               <div class="row">
                   <div class="col-12">
                       <div class="input-group mb-3 check_box_wrap">
                           <div class="input-group-prepend check_box">
                               <span>*</span>資產類型 :
                           </div>
                           <div class="d-flex align-items-center radio_wrap">
                             <template v-for="(item, typeIndex) in DropdownArray.AssetType" :key="'radio' + (typeIndex + 1)">
                               <input
                                 v-if="item !== '耗材'"
                                 type="radio"
                                 class="form-check-input check_box"
                                 :id="'radio' + (typeIndex + 1)"
                                 style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"
                                 :value="item"
                                 v-model="tab.itemAssetType"
                                 @change="storageStore.resetUnitCount('tab',index)"
                               />
                               <input
                                 v-else
                                 type="radio"
                                 class="form-check-input check_box"
                                 :id="'radio' + (typeIndex + 1)"
                                 style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;"
                                 :value="item"
                                 v-model="tab.itemAssetType"
                               />
                               <label
                                 class="form-check-label check_box"
                                 :for="'radio' + (typeIndex + 1)"
                                 :data-toggle="typeIndex === 1 ? 'tooltip' : null"
                                 :data-placement="typeIndex === 1 ? 'top' : null"
                                 :title="typeIndex === 1 ? '註記此資產僅限特定專案出貨所使用' : null"
                               >
                               {{ item }}
                               </label>
                             </template>
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
                       <input type="text" class="form-control" placeholder="最多輸入10字" v-model="tab.itemProjectCode">
                       <button class="form_search_btn">搜尋</button>
                   </div>
               </div>
               <!-- 頁籤專案名稱 -->
               <div class="col">
                   <div class="input-group mb-3">
                       <div class="input-group-prepend">專案名稱 :</div>
                       <input type="text" class="form-control readonly_box" readonly v-model="tab.itemProjectName">
                   </div>
               </div>
               <!-- 頁籤設備 總類&分類 -->
               <div class="row row_wrap g-0">
                   <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                       <div class="input-group mb-3">
                           <div class="input-group-prepend equipment_wrap">
                               <span>*</span>設備總類 :
                           </div>
                           <div class="dropdown">
                             <select class="form-select" id="floatingSelect" v-model="tab.itemEquipType_Id" @change="async()=>{tab.EquipCategoryArray = await apiStore.getEquipCategory(tab.itemEquipType_Id); tab.itemCategory_Id = '';}">
                               <option value="">--請選擇--</option>
                               <option v-for="option in DropdownArray.EquipType" :value="option.Id">{{ option.Name }}</option>
                             </select>
                           </div>
                       </div>
                   </div>
                   <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                       <div class="input-group mb-3">
                           <div class="input-group-prepend">
                               <span>*</span>設備分類 :
                           </div>
                           <div class="dropdown">
                             <select class="form-select" id="floatingSelect" v-model="tab.itemCategory_Id">
                               <option v-if="tab.EquipCategoryArray.length == 0" value="">--請先選擇設備總類--</option>
                               <template v-else>
                                 <option value="">--請選擇--</option>
                                 <option v-for="option in tab.EquipCategoryArray" :value="option.Id">{{ option.Name }}</option>
                               </template>
                             </select>
                           </div>
                       </div>
                   </div>
               </div>
               <!-- 頁籤物品名稱 -->
               <div class="col">
                   <div class="input-group mb-3">
                       <div class="input-group-prepend"><span>*</span>物品名稱 :</div>
                       <input type="text" class="form-control" placeholder="最多輸入20字" v-model="tab.itemAssetName">
                   </div>
               </div>
               <!-- 頁籤資產編號 -->
               <div class="col">
                   <div class="input-group mb-3">
                       <div class="input-group-prepend">資產編號 :</div>
                       <input type="text" class="form-control" placeholder="BFXXXXXXXX" v-model="tab.itemAssetsId">
                   </div>
               </div>
               <!-- 頁籤廠商 -->
               <div class="col">
                   <div class="input-group mb-3">
                       <div class="input-group-prepend">
                           廠商 :
                       </div>
                       <input type="text" class="form-control" placeholder="最多輸入100字" v-model="tab.itemVendorName">
                   </div>
               </div>
               <!-- 頁籤規格 -->
               <div class="col">
                   <div class="input-group mb-3">
                       <div class="input-group-prepend">
                           規格 :
                       </div>
                       <input type="text" class="form-control" placeholder="最多輸入100字" v-model="tab.itemProductSpec">
                   </div>
               </div>
               <!--頁籤型號 -->
               <div class="col">
                   <div class="input-group mb-3">
                       <div class="input-group-prepend">
                           型號 :
                       </div>
                       <input type="text" class="form-control" placeholder="最多輸入100字" v-model="tab.itemProductType">
                   </div>
               </div>
               <!-- 頁籤S/N -->
               <div class="col">
                   <div class="input-group mb-3">
                       <div class="input-group-prepend">S/N :</div>
                       <input type="text" class="form-control" aria-label="Default" placeholder="最多輸入100字" v-model="tab.itemSN">
                   </div>
               </div>
               <!-- 頁籤 包裝數量 & 包裝單位 -->
               <div class="row g-0 row_wrap">
                   <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                       <div class="input-group mb-3" id='number'>
                           <div class="input-group-prepend info  ">
                               <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                               <span>*</span>包裝數量 :<img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                           </div>
                           <input v-if="tab.itemAssetType === '耗材'" class="input-number" type="number" v-model="tab.itemPackageNum" min="1">
                           <input v-else class="input-number readonly_box" type="number" v-model="tab.itemPackageNum" min="1" readonly>
                       </div>
                   </div>
                   <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                       <div class="input-group mb-3" id='unit'>
                           <div class="input-group-prepend">
                               <span>*</span>包裝單位 :
                           </div>
                           <div class="dropdown">
                             <select class="form-select" id="floatingSelect" v-model="tab.itemPackageUnit">
                               <option value="">--請選擇--</option>
                               <option v-for="option in DropdownArray.PackageUnit" :value="option">{{ option }}</option>
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
                               <img class="info_icon d-xl-inline-block d-lg-inline-block d-md-inline-block d-none" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                               <span v-show="tab.itemAssetType === '耗材'">*</span>數量 :
                               <img class="info_icon d-xl-none d-lg-none d-md-none d-inline-block" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘">
                           </div>
                  
                           <input v-if="tab.itemAssetType === '耗材'" class="input-number" type="number" v-model="tab.itemCount" min="1">
                           <input v-else class="input-number readonly_box" type="number" v-model="tab.itemCount" min="1" readonly>
                       </div>
                   </div>
                   <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                       <div class="input-group mb-3" id='unit'>
                           <div class="input-group-prepend">
                               <span v-show="tab.itemAssetType === '耗材'">*</span>單位 :
                           </div>
                       
                           <div  class="dropdown">
                             <div v-if="tab.itemAssetType === '耗材'" class="dropdown">
                               <select class="form-select" id="floatingSelect" v-model="tab.itemUnit">
                                 <option value="">--請選擇--</option>
                                 <option v-for="option in DropdownArray.Unit" :value="option">{{ option }}</option>
                               </select>
                             </div>
                             <input v-else class="input-number readonly_box" type="text" v-model="tab.itemPackageUnit" min="1" readonly>
                           </div>
                           <!-- <input  class="input-number" type="number" min="1"> -->
                           <!-- <input v-else class="input-number readonly_box" type="text" min="1" readonly> -->
                       </div>
                   </div>
               </div>
               <!-- 頁籤備註 -->
               <div class="col">
                   <div class="input-group mb-3">
                       <div class="input-group-prepend">備註 :</div>
                       <textarea class="col" rows="5" placeholder="最多輸入500字"  v-model="tab.itemMemo"></textarea>
                   </div>
               </div>
               <!-- 頁籤上傳檔案部分 -->
               <div class="col">
                   <div class="input-group mb-3">
                       <div class="input-group-prepend">資產照片 :</div>
                       <div class="file_wrap">
                         <button class='choose_btn' @click="storageStore.chooseFile(index)">選擇檔案</button>
                         <input type="file" accept="image/*"  style="display: none;" multiple 
                         @change="utilsStore.handleImgChange($event, tab)" />
                       </div>
                   </div>
               </div>
               <div class="col selected_file">
                   <div class="input-group">
                       <div class="input-group-prepend">已選擇的檔案 :</div>
                       <div class="store_new_file">
                           <div v-for="(file , file_index) in tab.viewFile" :key="file_index" class="file_upload_wrap">
                               <p>{{ file.FileName }}
                                   <img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="utilsStore.viewImgFile(file, file_index)" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                                   <img class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="utilsStore.deleteImgFile('new', tab, file_index)"></p>
                           </div>
                       </div>
                   </div>
               </div> 
           </div>
       </div>
   </div>
   
         <!-- ViewFile Modal -->
         <!-- <div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
           <div class="modal-dialog modal-dialog-centered">
             <div class="modal-content">
               <div class="modal-header">
                 <h5 class="modal-title">標題</h5>
                 <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
               </div>
               <div class="modal-body">
       <img src="path_to_your_image" alt="Uploaded Image" class="w-100" />
   </div>
   
             </div>
           </div>
         </div> -->
         <view_modal/>
    
       </div>
     </div>
   </template>
   
   <script setup>
   // component
   import view_modal from "@/components/view_modal.vue"
   
   // pinia
   import { useUtilsStore , useAPIStore } from '@/store'
   import { useStorageStore } from '@/store/storage'
   import { storeToRefs } from "pinia";
   const storageStore = useStorageStore();
   const utilsStore = useUtilsStore();
   const apiStore = useAPIStore();
   const { DropdownArray , upperForm , middleForm , tabData , showOptions } = storeToRefs(storageStore) ;
   
   // function insertTab() {
     
   // }
   </script>
   
   <style lang="scss" scoped>
     @import '@/assets/css/global.scss';
     textarea {
       padding: 5px 10px 30px;
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
       background: var(--c-5, #E94B4B);
       justify-content: center;
       align-items: center;
       display: inline-flex;
       height: 40px;
       color: #FFF;
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
         background-color: #5D85BD;
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
       cursor: pointer
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
     @media only screen and (min-width: 1200px) {
       .main_section {
         h1 {
           margin-top: 50px;
           text-align: center;
           font-size: 55px;
           font-weight: 600;
           @include title_color;
         }
         .form_search_btn {
           @include form_search_btn;
         }
         .readonly_box {
           @include readonly_box;
         }
         .info_wrap {
           margin: auto;
           width: 800px;
       
           .input-group-prepend {
             color: white;
             font-weight: 700;
             font-size: 20px;
             width: calc(100px + 6%);
             text-align: end;
             white-space: nowrap;
             span {
               @include red_star
             }
           }
           .input-number {
             @include count_btn;
             width: 57%;
           }
           .fixed_info {
             @include fixed_info;
             p {
               font-size: 20px;
               margin-bottom: 0;
             }
             span {
               @include red_star
             }
           }
           .content {
             @include content_bg;
             
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
               .input-group {
                 flex-wrap: nowrap
               }
               .flex {
                 width: 130px
               }
             }
             .dropdown {
               width: 218px;
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
           .nav-tabs {
             button {
               @include tab_section_num;
               background: #5C7897;
             }
             .active {
               @include tab_section_num;
               background: #3E4E5F;
             }
           }
           .tab-content {
             background: #3E4E5F;
             padding: 50px 20px;
             position: relative;
             .selected_file {
               display: flex;
               align-items: center;
               .file_upload_wrap {
                 margin-bottom: 0;
                 display: flex;
                 align-items: center;
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
                     margin-right: 10px;
                     content: '·';
                     font-weight: 700;
                     color: white;
                   }
                 }
               }
             }
             .input-number {
               width: 62.5%;
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
             .dropdown {
               width: 240px;
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
               span {
                 @include red_star
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
                 width: 130px;
                 text-align: end;
               }
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
     }
     @media only screen and (min-width: 768px) and (max-width: 1199px) {
       .main_section {
         h1 {
           margin-top: 50px;
           text-align: center;
           font-size: 55px;
           font-weight: 600;
           @include title_color;
         }
         .form_search_btn {
           @include form_search_btn;
         }
         .readonly_box {
           @include readonly_box;
         }
         .info_wrap {
           margin: auto;
           width: 700px;
          
           .input-group-prepend {
             color: white;
             font-weight: 700;
             font-size: 20px;
             width: calc(100px + 6%);
             text-align: end;
             white-space: nowrap;
             span {
               @include red_star
             }
           }
           .input-number {
             @include count_btn;
             width: 62%;
           }
           .fixed_info {
             @include fixed_info;
             p {
               font-size: 20px;
               margin-bottom: 0;
             }
             span {
               @include red_star
             }
           }
           .content {
             @include content_bg;
             padding: 17px;
           
             .input-group-prepend {
               width: 117px;
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
               .input-group {
                 flex-wrap: nowrap
               }
               .flex {
                 width: 130px
               }
             }
             .dropdown {
               width: 205px;
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
               margin-bottom:0;
               color: white;
               word-break: break-word;
               &::before {
                 margin-right: 5px;
                 content: '·';
                 font-weight: 700;
                 color: white;
               }
             }
           }
           .nav-tabs {
             button {
               @include tab_section_num;
               background: #5C7897;
             }
             .active {
               @include tab_section_num;
               background: #3E4E5F;
             }
           }
           .tab-content {
             background: #3E4E5F;
             padding: 50px 20px;
             position: relative;
             .input-number {
               width: 59%;
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
             .dropdown {
               width: 190px;
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
               span {
                 @include red_star
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
                 width: 130px;
                 text-align: end;
               }
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
     }
     @media only screen and (max-width: 767px) {
       .main_section {
         h1 {
           margin-top: 50px;
           text-align: center;
           font-size: 50px;
           font-weight: 600;
           @include title_color;
         }
         .form_search_btn {
           border: none;
           color: white;
           width: 60px;
           height: 35px;
           margin-top: 10px;
           font-weight: 700;
           padding: 0 10px;
           background-color: #132238;
           &:hover {
             background-color: #43546d;
           }
         }
         .readonly_box {
           @include readonly_box;
         }
         .info_wrap {
           margin: auto;
           padding: 0 5%;
           .fixed_info {
             @include fixed_info;
             height: unset;
             flex-direction: column;
             padding: 10px;
             p {
               font-size: 20px;
               margin-bottom: 0;
             }
             span {
               @include red_star
             }
           }
           .content {
             @include content_bg;
             .check_box_wrap {
               flex-direction: row;
               font-weight: 700;
               color: white;
               font-size: 18px;
               .check_box {
                 margin-right: 10px;
               }
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
               button {
                 @include dropdown-btn;
                 width: 100%;
                 color: black;
                 justify-content: space-between;
                 align-items: center;
               }
             }
             .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
               margin-left: unset;
               border-radius: 5px;
             }
             .input-group {
               flex-direction: column;
               .input-number {
                 width: 100%;
                 @include count_btn;
               }
               .form-control {
                 height: 35px;
                 width: 100%;
               }
               .input-group-prepend {
                 color: white;
                 font-weight: 700;
                 font-size: 20px;
                 margin-bottom: 5px;
                 margin-right: 10px;
                 white-space: nowrap;
                 span {
                   @include red_star
                 }
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
           .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
             margin-left: unset !important;
           }
           .nav-tabs {
             button {
               @include tab_section_num;
               background: #5C7897;
             }
             .active {
               @include tab_section_num;
               background: #3E4E5F;
             }
           }
           .tab-content {
             background: #3E4E5F;
             padding: 50px 30px;
             position: relative;
             .selected_file {
               display: flex;
               align-items: center;
               .input-group {
                 flex-direction: column;
               }
               .file_upload_wrap {
                 margin-bottom: 0;
                 display: flex;
                 align-items: center;
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
                     margin-right: 10px;
                     content: '·';
                     font-weight: 700;
                     color: white;
                   }
                 }
               }
             }
             .check_box_wrap {
               flex-direction: column;
               font-weight: 700;
               color: white;
               font-size: 18px;
               .radio_wrap {
                 gap: 0 10px;
                 padding-left: 10px;
               }
               .input-group-prepend {
                 width: auto !important;
                 align-self: self-start;
               }
             }
          
             .dropdown {
               margin-left: unset !important;
               margin-top: 5px;
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
               button {
                 @include dropdown-btn;
                 width: 100%;
                 color: black;
                 justify-content: space-between;
                 align-items: center;
               }
             }
             .input-group {
               flex-direction: column;
               span {
                 @include red_star
               }
               .input-number {
                 @include count_btn;
               }
               .form-control {
                 height: 35px;
                 width: 100%;
                 border-radius: 0;
                 margin-left: unset !important;
                 margin-top: 5px;
               }
               .input-group-prepend {
                 color: white;
                 font-weight: 700;
                 font-size: 20px;
                 width: 100%;
               }
               .file_wrap {
                 display: flex;
                 flex-direction: column;
                 .choose_btn {
                   margin-top: 5px;
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
     }
   </style>