<template>
    <div class="main_section">
        <div class="info_wrap col">
            <deletewarn/>
            <div class="fixed_info">
                <div>
                    <p>單號：</p>
                </div>
                <div>
                    <p>申請人員：</p>
                </div>
                <div>
                    <p>申請日期：</p>
                </div>
            </div>
            <form>
                <div class="row g-0">
                    <div class="col d-flex wrap column_section">
                        <label for="inputTitle1" class="form-label use">
                                                <p>用&ensp;&ensp;&ensp;&ensp;途</p>
                                            </label>
                        <div class="option readonly_box">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="radio1">
                                <label class="form-check-label" for="radio1">内部領用</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="radio2">
                                <label class="form-check-label" for="radio2">借測</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="radio2">
                                <label class="form-check-label" for="radio2">借測</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="radio2">
                                <label class="form-check-label" for="radio2">借測</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="radio2">
                                <label class="form-check-label" for="radio2">借測</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row g-0 project_details">
                    <div class="col-xl-5 col-lg-5 col-md-5 col-12 d-flex wrap column_section">
                        <label for="inputWithButton" class="form-label"><p>專案代碼</p></label>
                        <div class="input-group">
                            <input type="text" class="form-control readonly_box" id="project_id" readonly>
                        </div>
                    </div>
                    <div class="col d-flex wrap">
                        <label for="inputWithTitle" class="form-label" id='project_name'>
                                                <p>專案名稱</p>
                                            </label>
                        <div class="input-group" id='readonly_box'>
                            <p class='readonly_box' readonly>D2564658</p>
                        </div>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col d-flex wrap column_section" style='border:none'>
                        <label for="inputTextarea" class="form-label">
                                                <p>&nbsp;&nbsp;說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p>
                                            </label>
                        <textarea class="form-control readonly_box" id="inputTextarea" readonly></textarea>
                    </div>
                </div>
            </form>
            <div class='third_content'>
                <div class="fixed_info">
                    <div>
                        <p>資產出庫項目</p>
                    </div>
                </div>
                <!-- <DataTable :size="'small'" :value="rowData" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" paginator :rows="10" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                              :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                              <Column style="min-width:80px;" class="datatable_checkbox">
                                <template #body="slotProps">
                                        <Delete :params = "slotProps" @deleteFromData="deleteFromData" />
</template>
        </Column>
        <Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable :style="{'min-width': item.width}"></Column>
        </DataTable> -->
      </div>
        </div>
    </div>
</template>

<script>
    import deletewarn from '@/components/Delete_warn.vue';
    export default {
        components: {
            deletewarn
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    .readonly_box {
        display: flex;
        @include readonly_box;
        height: 100%;
        align-items: center;
        width: 100%;
        p {
            margin-bottom: 0
        }
    }
    .column_section textarea {
        align-items: flex-start;
    }
    .fixed_info {
        @include fixed_info;
        background: #528091;
        border-radius: 0;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        p {
            font-size: 20px;
            margin-bottom: 0;
        }
    }
    form {
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        .form-check {
            margin-left: 10px;
        }
        .wrap {
            background: white;
            border-bottom: 0.5px solid black;
            align-items: center;
        }
        .form-label {
            font-weight: 700;
            font-size: 20px;
            white-space: nowrap;
            height: 50px;
            align-items: center;
            margin: 0;
            display: flex;
            justify-content: center;
            p {
                width: 100px;
                margin-bottom: 0;
                text-align: center;
            }
        }
    }
    .input-group,
    .form-control {
        height: 100%;
    }
    .project_details input,
    .column_section textarea {
        border-radius: 0;
    }
    .input-number {
        @include count_btn;
    }
    @media only screen and (min-width: 1200px) {
        .main_section {
            .info_wrap {
                margin: auto;
                width: 1000px;
                form {
                    label.use,
                    #project_id {
                        border-right: 1px solid black;
                    }
                    .option {
                        display: flex;
                    }
                    .form-control {
                        border-left: 1px solid black;
                    }
                    .form-label {
                        padding: 0 30px;
                    }
                    .project_details .readonly_box {
                        border-left: 1px solid black;
                    }
                }
            }
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 1199px) {
        .main_section {
            .info_wrap {
                margin: auto;
                padding: 0 5%;
                form {
                    label.use,
                    #project_id {
                        border-right: 1px solid black;
                    }
                    .option {
                        display: flex
                    }
                    .form-control {
                        border-left: 1px solid black;
                    }
                    .form-label {
                        padding: 0 30px;
                    }
                    .project_details .readonly_box {
                        border-left: 1px solid black;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .main_section {
            .info_wrap {
                margin: auto;
                padding: 0 5%;
                .fixed_info {
                    flex-direction: column;
                    height: unset;
                    padding: 10px;
                }
                .column_section {
                    flex-direction: column
                }
                form {
                    .form-check {
                        font-size: 18px;
                    }
                    .form-control {
                        height: 50px;
                    }
                    .wrap {
                        flex-direction: column;
                        label.use,
                        .form-label {
                            border-bottom: 1px solid black;
                            width: 100%;
                            height: 30px;
                        }
                        .option {
                            padding: 5px;
                            display: grid;
                            grid-template-columns: 1fr 1fr 1fr;
                            grid-template-rows: 1fr 1fr;
                            gap: 0px 0px;
                            grid-auto-flow: row;
                            grid-template-areas: ". . ." ". . .";
                            white-space: nowrap;
                            justify-items: center;
                            width: 100%;
                            div {
                                width: 90px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>