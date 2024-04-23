<template>
    <div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>申請人員：{{ Form.Applicant || utilsStore.userName }}</p>
                </div>
                <div>
                    <p>申請日期： {{ Form.ApplicationDate || utilsStore.today }}</p>
                </div>
            </div>
            <form>
                <div class="row g-0">
                    <div class="col d-flex wrap column_section">
                        <label for="inputTitle1" class="form-label use">
                            <p><span>*</span>用&ensp;&ensp;&ensp;&ensp;途</p>
                        </label>
                        <div class="option">
                            <div class="form-check" v-for="(option, index) in useOptions" :key="option">
                                <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)"
                                v-model="Form.Use">
                                <label class="form-check-label" :for="'radio' + (index + 1)">{{ option }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row g-0 project_details">
                    <div class="col-xl-5 col-lg-5 col-md-5 col-12 d-flex wrap column_section">
                        <label for="inputWithButton" class="form-label">
                            <p><span>*</span>專案代碼</p>
                        </label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="project_id" v-model="Form.ProjectCode" maxlength="10" placeholder="最多輸入10字">
                            <button class="btn code_search" type="button" onclick="()=>{ Form.ProjectName = await apiStore.getProject(Form.ProjectCode); }">搜尋</button>
                        </div>
                    </div>
                    <div class="col d-flex wrap">
                        <label for="inputWithTitle" class="form-label" id='project_name'>
                            <p>專案名稱</p>
                        </label>
                        <div class="input-group" id='readonly_box'>
                            <p class='readonly_box' readonly>{{ Form.ProjectName }}</p>
                        </div>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col d-flex wrap column_section" style='border:none'>
                        <label for="inputTextarea" class="form-label">
                            <p>&nbsp;&nbsp;說&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</p>
                        </label>
                        <textarea class="form-control" id="inputTextarea" v-model="Form.Description" maxlength="100" placeholder='最多輸入100字'></textarea>
                    </div>
                </div>
            </form>
            <div class="fixed_info">
                <div>
                    <p>填寫項目 填寫需求</p>
                </div>
            </div>
            <div class='second_content'>
                <div class='wrap d-flex first_row'>
                    <div class='col-xl-3 col-lg-3 col-md-3 col-12' style='padding-left:0'>
                        <p><span>*</span>設備總類</p>
                        <div class="dropdown">
                            <div class="dropdown">
                                <select class="form-select" id="floatingSelect" v-model="requirementParams.EquipType_Id" @change="async()=>{DropdownArray.EquipCategory = await apiStore.getEquipCategory(requirementParams.EquipType_Id); requirementParams.Category_Id = '';}">
                                    <option value="">--請選擇--</option>
                                    <option v-for="option in DropdownArray.EquipType" :key="option.Id" :value="option.Id">{{ option.Name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                        <p><span>*</span>設備分類</p>
                        <div class="dropdown">
                            <select class="form-select" id="floatingSelect" v-model="requirementParams.Category_Id">
                                <option v-if="DropdownArray.EquipCategory.length == 0" value="">--請先選擇設備總類--</option>
                                <template v-else>
                                    <option value="">--請選擇--</option>
                                    <option v-for="option in DropdownArray.EquipCategory" :key="option.Id" :value="option.Id">{{ option.Name }}</option>
                                </template>
                            </select>
                        </div>
                    </div>
                    <div class='col-xl-3 col-lg-3 col-md-3 col-12'>
                        <p><span>*</span>物品名稱</p>
                        <div class="number-input-box">
                            <input type="text" class="form-control" maxlength="20" placeholder="最多輸入20字" v-model="requirementParams.ProductName"/>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-12">
                        <p>
                            <span>*</span>數量 
                            <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">
                        </p>
                        <div class="number-input-box">
                            <input class="input-number" type="number" min="1" v-model="requirementParams.Number"/>
                        </div>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-12 d-flex wrap text_input">
                        <label for="inputTextarea" class="form-label">
                            <p>規格需求：</p>
                        </label>
                        <div>
                        </div>
                        <textarea class="form-control" id="inputTextarea" v-model="requirementParams.RequiredSpec" maxlength="100" placeholder='最多輸入100字'></textarea>
                    </div>
                </div>
                <div class='col d-flex justify-content-center'>
                    <button class="btn submit_btn" type="button">新增</button>
                </div>
            </div>
            <div class='third_content'>
                <div class="fixed_info">
                    <div>
                        <p><span>*</span>資產出庫項目(請至少新增一項)</p>
                    </div>
                </div>
                <!-- <DataTable :size="'small'" :value="rowData" resizableColumns columnResizeMode="expand" showGridlines scrollable scrollHeight="420px" paginator :rows="10" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                          :rowsPerPageOptions="[10, 20, 30]" currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
                          <Column style="min-width:80px;" class="datatable_checkbox">
                            <template #body="slotProps">
                                    <Delete :params = "slotProps" @deleteFromData="deleteFromData" />
</template>
</Column>
<Column v-for="item in datagridfield" :field="item.field" :header="item.header" sortable
    :style="{'min-width': item.width}"></Column>
</DataTable> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { Rent_UseArray } from "@/assets/js/dropdown";
import { useAPIStore, useUtilsStore } from "@/store";
import { useRentStore } from "@/store/rent/_index";
import { storeToRefs } from "pinia";
import { onUnmounted } from "vue";

const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const rentStore = useRentStore();

const { Form, requirementParams, DropdownArray } = storeToRefs(rentStore);

/**
 * 用途Array(for radio box)
 */
const useOptions = ref(Rent_UseArray);
onUnmounted(()=>{
    rentStore.$dispose();
    apiStore.$dispose();
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.readonly_box {
  @include readonly_box;
  height: 100%;
  align-items: center;
  width: 100%;
  padding: 5px 10px;

  p {
    margin-bottom: 0;
  }
}

.input-number {
  @include count_btn;
}

.column_section textarea {
  align-items: flex-start;
}

span {
  @include red_star;
}

.code_search {
  background: #48658c;
  color: white;
  font-weight: 800;
  height: 30px;
  width: 60px;
  margin-right: 10px;
  display: flex;
  align-self: center;
  align-items: center;

  &:hover {
    background-color: #5d85bd;
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

.main_section {
  .info_wrap {
    margin: auto;

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

    .second_content {
      border-left: 1px solid black;
      border-right: 1px solid black;
      border-top: 1px solid black;
      background: #d9d9d9;

      .submit_btn {
        margin-bottom: 20px;
        background: #48658c;
        color: white;
        font-weight: 700;
        width: 80px;
        font-size: 18px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #5d85bd;
        }
      }

      .number-input-box input,
      .dropdown-toggle {
        height: 37px;
        padding: 10px;
      }

      .wrap {
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
            p {
              font-size: 18px;
              font-weight: 700;
              color: black;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        div {
          p {
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
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

        .wrap {
          #project_name,
          #project_id,
          .readonly_box {
            border-left: 1px solid black;
          }
        }
      }

      .second_content {
        .submit_btn {
          margin-bottom: 20px;
        }

        .wrap {
          justify-content: space-evenly;
          padding: 10px 80px;

          .dropdown {
            .dropdown-menu {
              max-height: 250px;
              overflow-y: auto;
            }
          }

          div {
            p {
              text-align: center;
              white-space: nowrap;
              margin-bottom: 5px;
            }
          }
        }

        .first_row {
          div:nth-child(1),
          div:nth-child(3) {
            padding: 0 5px;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      padding: 0 5%;

      .second_content {
        .submit_btn {
          margin-bottom: 20px;
        }

        .wrap {
          justify-content: space-evenly;
          padding: 10px 80px;
        }

        .dropdown {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .dropdown-menu {
            max-height: 250px;
            overflow-y: auto;
          }
        }

        div {
          p {
            text-align: center;
            white-space: nowrap;
            margin-bottom: 5px;
          }
        }
      }

      .first_row {
        div:nth-child(1),
        div:nth-child(3) {
          padding: 0 5px;
        }
      }
    }

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

      .wrap {
        #project_name,
        #project_id,
        .readonly_box {
          border-left: 1px solid black;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .info_wrap {
      padding: 0 5%;

      .fixed_info {
        flex-direction: column;
        height: unset;
        padding: 10px;
      }

      .second_content {
        .submit_btn {
          margin: 20px 0;
        }

        input,
        textarea,
        .dropdown-toggle {
          margin: 5px 0;
        }

        .wrap {
          padding: 20px 20px 0;
          flex-direction: column;
        }

        .form-label {
          margin-bottom: 0;
        }

        .dropdown {
          .dropdown-menu {
            width: 100%;

            .dropdown-item {
              text-align: left;
            }
          }
        }

        div {
          p {
            text-align: center;
            white-space: nowrap;
            margin-bottom: 5px;
          }
        }
      }

      .text_input {
        padding: 0 20px;

        div {
          display: none;
        }
      }
    }

    .column_section {
      flex-direction: column;
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

        #project_id {
          border-right: black solid 1px;
        }
      }
    }
  }
}

</style>