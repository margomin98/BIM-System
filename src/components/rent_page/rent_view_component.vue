<template>
  <div class="info_wrap col">
    <warn v-show="PageType === 'delete'"></warn>
    <div class="fixed_info">
      <div>
        <p>單號：{{ Form.AO_ID }}</p>
      </div>
      <div>
        <p>申請人員：{{ Form.Applicant }}</p>
      </div>
      <div>
        <p>申請日期：{{ Form.ApplicationDate }}</p>
      </div>
    </div>
    <form>
      <div class="row g-0">
        <div class="col d-flex wrap column_section">
          <label for="inputTitle1" class="form-label use">
            <p>用&ensp;&ensp;&ensp;&ensp;途</p>
          </label>
          <div class="option">
            <div class='content'>
              <div class="form-check" v-for="(option, index) in useOptions" :key="option">
                <input class="form-check-input" type="radio" :value="option" :id="'radio' + (index + 1)"
                  v-model="Form.Use" :disabled="option !== Form.Use && Form.Use !== ''">
                <label class="form-check-label" :for="'radio' + (index + 1)">{{ option }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-0 project_details">
        <div class="col-xl-4 col-lg-4 col-md-4 col-12 d-flex wrap">
          <label for="inputWithButton" class="form-label">
            <p>專案代碼</p>
          </label>
          <div class="input-group" id='readonly_box'>
            <p class='readonly_box' readonly>{{ Form.ProjectCode }}</p>
          </div>
        </div>
        <div class="col d-flex wrap ">
          <label for="inputWithTitle" class="form-label" id='project_name'>
            <p>專案名稱</p>
          </label>
          <div class="input-group" id='readonly_box'>
            <p class='readonly_box' readonly>{{ Form.ProjectName }}</p>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col d-flex wrap" style='border:none'>
          <label for="inputTextarea" class="form-label">
            <p>説&ensp;&ensp;&ensp;&ensp;明</p>
          </label>
          <textarea id='readonly_box' class='readonly_box' readonly>{{ Form.Description }}</textarea>
        </div>
      </div>
    </form>
    <div class="fixed_info">
      <div>
        <p>資產出庫項目</p>
      </div>
    </div>
    <div class='third_content'>
      <DataTable :size="'small'" :value="Form.ItemList" resizableColumns columnResizeMode="expand" showGridlines scrollable
        scrollHeight="420px" paginator :rows="20"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate=" 第{currentPage}頁 ，共{totalPages}頁 總筆數 {totalRecords}">
        <Column v-for="item in ItemList_field" :key="item.field" :field="item.field" :header="item.header" sortable :style="{ 'min-width': item.width }"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import warn from '@/components/Delete_warn.vue'
import { Rent_UseArray } from "@/assets/js/dropdown";
import { useAPIStore } from "@/store";
import { useRentStore } from "@/store/rent/_index";
import { storeToRefs } from "pinia";
import { onUnmounted, ref } from "vue";

const apiStore = useAPIStore();
const rentStore = useRentStore();

const { Form, requirementParams, DropdownArray, ItemList_field, PageType } = storeToRefs(rentStore);
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
 @import "@/assets/css/global.scss";
textarea {
  padding: 5px 10px 0;
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;
  .delete_btn {
    @include delete_btn;
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
}
.readonly_box {
  @include readonly_box;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.input-group {
  height: 100%;
}

.option {
  @include readonly_box;
  height: 100%;
  width: 100%;
  align-items: center;
}

.third_content {
  .fixed_info {
    border-top: none !important;
  }
}

.project_details #project_name {
  height: 100%;
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
    #readonly_box {
      background-color: #b4b4b4;
    }
    .fixed_info_count {
      display: flex;
      background: #3d5c67;
      color: white;
      font-weight: 700;
      align-items: center;
      height: 40px;
      border-radius: 0;
      border-bottom: 1px solid black;
      padding: 0 10px;
      justify-content: right;
      gap: 10px;
      p {
        font-size: 15px;
        margin-bottom: 0;
      }
    }

    form {
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;
      .row:nth-child(3) {
        .input-group {
          padding: 0 !important;
        }
        textarea {
          padding: 5px 10px 0;
        }
      }

      .wrap {
        background: white;
        border-bottom: 0.5px solid black;
        align-items: center;

        .option {
          @include readonly_box;
          height: 100%;
          width: 100%;
          padding: 0 10px;
          .content {
            gap: 0 10px;
          }
        }
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
        padding: 0 20px;
        p {
          width: 100px;
          margin-bottom: 0;
          text-align: center;
        }
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      width: 1000px;

      #readonly_box,
      #project_name {
        border-left: black 1px solid;
      }

      form {
        .row:nth-child(3) {
          .input-group {
            padding: 0 !important;
          }
          textarea {
            padding: 5px 10px 0;
          }
        }

        .form-control {
          padding: 0;
        }
        .wrap {
          background: white;
          border-bottom: 0.5px solid black;
          align-items: center;
          label.use {
            border-right: 1px solid black;
          }
          .option {
            display: flex;
            .content {
              display: flex;
            }
          }
          .project_name {
            border-left: 1px solid black;
          }
        }
        .form-label {
          width: 150px;
        }
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      padding: 0 5%;

      #readonly_box,
      #project_name {
        border-left: black 1px solid;
      }

      form {
        .row:nth-child(3) {
          .input-group {
            padding: 0 !important;
          }
          textarea {
            padding: 5px 10px 0;
          }
        }
        .form-check {
          margin-left: 10px;
        }
        .form-control {
          height: auto;
          border-radius: 0;
          padding: 0;
        }
        .wrap {
          label.use {
            border-right: 1px solid black;
          }
          .option {
            height: 100%;
            width: 100%;
            align-items: center;
            display: flex;
            .content {
              display: flex;
            }
          }
          .project_name {
            border-left: 1px solid black;
          }
        }
        .form-label {
          width: 150px;
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

      form {
        .form-check {
          margin-left: 10px;
          font-size: 18px;
        }
        .form-control {
          height: auto;
          border-radius: 0;
        }
        .wrap {
          flex-direction: column;
          label.use,
          .form-label {
            border-bottom: 1px solid black;
            width: 100%;
            height: 30px;
            justify-content: space-evenly;
          }
          .option {
            font-size: 18px;
            font-weight: 700;
            .content {
              padding: 5px;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr;
              gap: 0px 0px;
              grid-auto-flow: row;
              grid-template-areas: ". . ." ". . .";
              white-space: nowrap;
              justify-items: center;
              div {
                width: 90px;
              }
            }
          }
        }
        .form-label {
          height: 50px;

          padding: 0 30px;
          p {
            font-size: 18px;
          }
        }
      }
    }
  }
}

</style>