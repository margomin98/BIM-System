<template>
    <ConfirmModal/>
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
                                <select class="form-select" v-model="selectedEquipType">
                          <option value="">請選擇</option>
                          <option value="equipType1">設備類型1</option>
                          <option value="equipType2">設備類型2</option>
                        </select>
                            </div>
                            <!-- 設備分類 -->
                            <div class='col'>
                                <p>設備分類</p>
                                <select class="form-select" v-model="selectedEquipCategory">
                          <option value="">請選擇</option>
                          <option value="equipCategory1">設備分類1</option>
                          <option value="equipCategory2">設備分類2</option>
                        </select>
                            </div>
                            <!-- 儲位區域 -->
                            <div class='col'>
                                <p>儲位區域</p>
                                <select class="form-select" v-model="selectedArea">
                          <option value="">請選擇</option>
                          <option value="area1">儲位區域1</option>
                          <option value="area2">儲位區域2</option>
                        </select>
                            </div>
                            <!-- 儲位櫃位 -->
                            <div class='col'>
                                <p>儲位櫃位</p>
                                <select class="form-select" v-model="selectedCabinet">
                          <option value="">請選擇</option>
                          <option value="cabinet1">儲位櫃位1</option>
                          <option value="cabinet2">儲位櫃位2</option>
                        </select>
                            </div>
                            <!-- 專案代碼 -->
                            <div class='col'>
                                <p>專案代碼</p>
                                <select class="form-select" v-model="selectedCabinet">
                          <option value="">請選擇</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                            </div>
                            <!-- 資產編號 -->
                            <div class='col'>
                                <p>資產編號</p>
                                <input type="text" class="form-control text-center" placeholder="(明確查詢)" v-model="itemName" />
                            </div>
                            <!-- 物品名稱 -->
                            <div class='col'>
                                <p>物品名稱</p>
                                <input type="text" class="form-control text-center" placeholder="(模糊查詢)" v-model="itemName" />
                            </div>
                        </div>
                        <div class='col d-flex justify-content-center'>
                            <button class="btn submit_btn" type="button" @click="searchInventory('','search')">搜尋</button>
                            <button class="btn submit_btn" style="margin-left: 0.5rem;" type="button" @click="clear">清空</button>
                            <button class="btn add_btn" style="margin-left: 0.5rem;" type="button" data-bs-dismiss="modal" @click="addList">加入</button>
                        </div>
                    </div>
                </div>
                <div class="fixed_info">
                    <div>
                        <p>目前資產庫存（請優先選擇存貨）</p>
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
              <Column v-for="item in datagrid1field" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
              </DataTable> -->
            </div>
          </div>
        </div>
    <div class="main_section">
        <Navbar />
        <div class="title col">
            <h1>
                快速出庫
            </h1>
        </div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>
                        申請人員 : {{ Applicant }}
                    </p>
                </div>
                <div>
                    <p>
                        申請入庫日期 : {{ ApplicationDate }}
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
                                <input type="radio" class="form-check-input check_box" id="radio1" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="内部領用" name="radioGroup" />
                                <label class="form-check-label check_box" for="radio1">内部領用</label>
                                <input type="radio" class="form-check-input check_box" id="radio2" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="借測" name="radioGroup" />
                                <label class="form-check-label check_box" for="radio2">借測</label>
                                <input type="radio" class="form-check-input check_box" id="radio3" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="出貨" name="radioGroup" />
                                <label class="form-check-label check_box" for="radio3">出貨</label>
                                <input type="radio" class="form-check-input check_box" id="radio4" style="border-radius: 100%; width: 16px; height: 16px; margin-top: 0;" value="退貨" name="radioGroup" />
                                <label class="form-check-label check_box" for="radio4">退貨</label>
                            </div>
                        </div>
                    </div>
                </div>
                    <!-- 領用人員 -->
                <div class="col-xl-5 col-lg-5 col-md-5 col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"> <span>*</span>領用人員 :</div>
                        <select class="form-select" v-model="selectedKeeper">
                        <option value="">請選擇</option>
                        <option value="Michal">Michal</option>
                        <option value="Michelle">Michelle</option>
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
                            <div>
                                <input @input="handleInput" @focus="handleInput" @blur="handleBlur" v-model="searchTerm" type="text" class="form-control" placeholder="請選擇" />
                                <ul v-if="showDropdown" class="options-list">
                                    <li v-for="(option, index) in filteredOptions" :key="index" @click="selectItem(option)">
                                        {{ option.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            
                <!-- 説明 -->
                <div class="col mb-3">
                    <div class="input-group">
                        <div class="input-group-prepend">説明 :</div>
                        <textarea style="height: 200px;" class="form-control" aria-label="With textarea" placeholder="最多輸入100字" v-model="Memo"></textarea>
                    </div>
                </div>
            </div>
           
        </div>
         <div class="info_wrap">
            <button class="add_btn" data-bs-toggle="modal" data-bs-target="#exampleModal" >新增出庫資產</button>
            <div class="fixed_info">
                <div>
                    <p>
                        資產出庫細項
                    </p>
                </div>
                <div class="prepare_amount">
                    <p class="d-flex">
                        已備數量：<p>6個</p>
                    </p>
                </div>
            </div>
            <div class="content">
            12
            </div>
            </div>
            <div class="col button_wrap">
            <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="send_btn" @click="store.submit()" data-bs-toggle="modal" data-bs-target="#staticBackdrop">送出</button>
      </div>
    </div>
</template>

<script>
    import ConfirmModal from '@/components/Confirm_modal.vue'
    import Navbar from '@/components/Navbar.vue';
    export default {
        components: {
            Navbar,
            ConfirmModal
        },
        data() {
            return {
                searchTerm: "",
                dropdownOptions: [], // Array to store all options
                showDropdown: false,
            };
        },
        computed: {
            filteredOptions() {
                // Filter options based on searchTerm
                return this.dropdownOptions.filter(option =>
                    option.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            },
        },
        methods: {
            handleInput() {
                // Perform search and update dropdownOptions based on searchTerm
                // For demo purposes, using random data
                this.dropdownOptions = this.generateRandomData();
                this.showDropdown = true; // Always show dropdown when input is focused
            },
            selectItem(item) {
                // Handle selection of an item from the dropdown
                // For example, you can set the selected item to the input field
                this.searchTerm = item.name;
                this.showDropdown = false;
            },
            handleBlur() {
                // Close the dropdown when input loses focus
                this.showDropdown = false;
            },
            generateRandomData() {
                // Function to generate random data for demo purposes
                const data = [];
                for (let i = 0; i < 5; i++) {
                    data.push({
                        id: i,
                        name: `Item ${i}`
                    });
                }
                return data;
            },
        },
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    .modal .modal-body {
        padding: 0 !important;
    }
    h1 {
        margin-top: 50px;
        text-align: center;
        font-weight: 600;
        @include title_color;
    }
    .button_wrap {
        display: flex;
        justify-content: space-between;
        margin: 30px auto 5%;
        width: 220px;
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
        background: #314F7A;
        height: 50px;
        width: 174px;
        color: #FFF;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        border: none;
        margin-bottom: 20px;
        &:hover {
            background-color: #456ca7
        }
    }
    .info_wrap:nth-child(4) .fixed_info {
        position: relative;
    }
    .fixed_info .prepare_amount {
        display: flex;
        position: absolute;
        right: 20px;
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
        .dropdown-toggle {
            width: 100%
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
            padding: 0 10px;
            div {
                flex-grow: 1;
                text-align: center;
            }
            p {
                font-size: 20px;
                margin-bottom: 0 !important
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
            background: #D9D9D9;
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
                background: #48658C;
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
    span {
        @include red_star
    } // Media Queries
    @media only screen and (min-width: 1200px) {
        .modal .second_content .wrap1 {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 15px;
            padding: 10px 80px;
        }
        .main_section {
            h1 {
                font-size: 55px;
            }
            .info_wrap {
                margin: auto;
                .option_section {
                    width: 85%;
                    .options-list {
                        width: 84%;
                    }
                }
                .input-number {
                    @include count_btn;
                    width: 65%;
                }
                .fixed_info {
                    @include fixed_info;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                }
                .content {
                    @include content_bg;
                    .input-group {
                        flex-wrap: nowrap;
                        .input-group-prepend {
                            color: white;
                            font-weight: 700;
                            font-size: 20px;
                            width: calc(100px + 6%);
                            text-align: end;
                            white-space: nowrap;
                            width: 120px;
                        }
                    }
                }
            }
            .info_wrap:nth-child(3) {
                width: 850px;
                margin-bottom: 60px;
            }
            .info_wrap:nth-child(4) {
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
            h1 {
                font-size: 55px;
            }
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
                    @include count_btn;
                    width: 65%;
                }
                .fixed_info {
                    @include fixed_info;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                }
                .content {
                    @include content_bg;
                    .input-group {
                        flex-wrap: nowrap;
                        .input-group-prepend {
                            color: white;
                            font-weight: 700;
                            font-size: 20px;
                            width: calc(100px + 6%);
                            text-align: end;
                            white-space: nowrap;
                            width: 120px;
                        }
                    }
                }
            }
            .info_wrap:nth-child(3) {
                margin-bottom: 60px;
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .modal {
            .fixed_info {
                height: unset!important;
            }
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
            h1 {
                font-size: 50px;
            }
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
                .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
                    margin-left: unset !important;
                    margin-top: 5px;
                }
                .input-number {
                    @include count_btn;
                    width: 65%;
                }
                .fixed_info {
                    @include fixed_info;
                    flex-direction: column;
                    padding: 10px 0;
                    height: unset;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                    .prepare_amount {
                        position: unset
                    }
                }
                .content {
                    @include content_bg;
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
