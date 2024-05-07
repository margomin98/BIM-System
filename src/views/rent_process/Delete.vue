<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>刪除項目</h1>
    </div>
    <rent_process_view :totalNeed="totalNeed" :totalSelect="totalSelect" />
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
    </div>
    <delete_modal @delete="deleteData"></delete_modal>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AssetsView from '@/components/Rent_process_new_view_button'
import rent_process_view from '@/components/rent_process_page/rent_process_view_component.vue'
import {
  useRoute,
  useRouter
} from 'vue-router';
import Navbar from "@/components/Navbar.vue";
import delete_modal from '@/components/utils/delete_modal.vue';
import { useRentStore } from '@/store/rent/_index';
import { useAPIStore, useUtilsStore } from '@/store';
import { storeToRefs } from 'pinia';
import {
  Rent_UseArray
} from "@/assets/js/dropdown";
import {
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import axios from '@/axios/tokenInterceptor'
const rentStore = useRentStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const route = useRoute();
const router = useRouter();
const AO_ID = route.query.search_id; // 單號
const totalNeed = ref(0); //總所需數量
const totalSelect = ref(0); //總已備數量
const options = Rent_UseArray; // 用途。Array for input[radio]
const { Form, PageType } = storeToRefs(rentStore);
onMounted(async() => {
  rentStore.$reset();
  apiStore.$reset();
  PageType.value = 'delete';
  await rentStore.getDetails(AO_ID);
  setData();
});
onUnmounted(() => {
  rentStore.$dispose();
  apiStore.$dispose();
})
/**
 * 取完資料單後做變數處理
 */
function setData() {
  // 總出庫數量
  totalNeed.value = 0;
  Form.value.ItemList.forEach(item => {
    totalNeed.value += item.Number;
  });
  // 已備數量
  totalSelect.value = 0;
  Form.value.OM_List.forEach(item => {
    totalSelect.value += item.OM_Number;
  });
}
/**
 * 刪除出庫作業單
 */
async function deleteData() {
  const form = new FormData();
  form.append('AO_ID', AO_ID);
  const response = await axios.post(`https://localhost:44302/AssetsOutMng/ApplicationDelete`, form);
  try {
    const data = response.data;
    if (data.state === 'success') {
      let msg = data.messages + '\n';
      msg += '單號:' + data.resultList.AO_ID;
      alert(msg);
      router.push({
        name: 'Rent_Datagrid'
      });
    } else if (data.state === 'error') {
      alert(data.messages);
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
textarea {
  padding: 5px 0 0 5px !important;
}

.project_details #project_name {
  height: 100%;
}

.delete_modal {
  .modal-content {
    border: solid 1px black;
    border-radius: 0;

    .modal-body {
      background: #e94b4b;
      text-align: center;
      font-weight: 700;
      color: white;
      border-bottom: solid 1px black;
    }

    .modal-footer {
      margin: auto;
      gap: 10px;

      button:nth-child(1) {
        background-color: #7e7e7e;
        border: none;
        color: white;
        width: 50px;
        font-weight: 700;

        &:hover {
          background-color: #464242;
        }
      }

      button:nth-child(2) {
        background-color: #e94b4b;
        border: none;
        color: white;
        width: 50px;
        font-weight: 700;

        &:hover {
          background-color: #a70e0e;
        }
      }
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

span {
  @include red_star;
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;
}

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
.main_section {
  .info_wrap {
    margin: auto;

    .input-group-prepend {
      width: 100% !important;
      text-align: center !important;
    }
    .fixed_info {
      @include fixed_info;
      background: #528091;
      border-radius: 0;
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;

      p {
        margin-bottom: 0;
      }
    }
    .fixed_info:nth-child(5) {
      border-top: unset;
    }
    #readonly_box {
      background-color: #b4b4b4;
    }
    .third_content {
      .fixed_info {
        border-top: unset;
      }
      .list {
        button {
          @include content_delete_button;

          &:hover {
            background: #ff7272;
          }
        }
      }
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
      border-left: 1px solid black;
      border-right: 1px solid black;
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
      }

      .wrap {
        background: white;
        border-bottom: 1px solid black;
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
      .input-group-prepend {
        color: white;
        font-weight: 700;
        font-size: 20px;
        width: 120px;
        text-align: end;
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
  .main_section {
    .modal-content {
      width: 400px;
      margin: auto;
    }

    .info_wrap {
      width: 1000px;

      .option {
        display: flex;
      }

      .fixed_info {
        p {
          font-size: 20px;
        }
      }

      #readonly_box {
        padding: 0;
        border-left: black 1px solid;
      }

      .third_content {
        .list {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
        }
      }

      form {
        .row:nth-child(3) {
          textarea {
            padding: 5px 10px 0;
          }
        }

        .form-control {
          padding: 0;
        }

        .wrap {
          label.use {
            border-right: 1px solid black;
          }

          .option {
            .content {
              display: flex;
            }
          }

          .project_name {
            border-left: 1px solid black;
          }
        }

        .form-label {
          padding: 0 20px;
          width: 150px;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .modal-content {
      width: 400px;
      margin: auto;
    }

    .info_wrap {
      padding: 0 5%;

      .option {
        display: flex;
      }

      .fixed_info {
        p {
          margin-bottom: 0;
          font-size: 20px;
        }
      }

      #readonly_box {
        padding: 0;
        border-left: black 1px solid;
      }

      .third_content {
        .list {
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
        }
      }

      form {
        .row:nth-child(3) {
          textarea {
            padding: 5px 10px 0;
          }
        }

        .form-control {
          padding: 0;
        }

        .wrap {
          label.use {
            border-right: 1px solid black;
          }

          .option {
            .content {
              display: flex;
            }
          }

          .project_name {
            border-left: 1px solid black;
          }
        }

        .form-label {
          padding: 0 20px;
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

        p {
          font-size: 18px;
        }
      }

      .third_content {
        .list {
          border: 1px solid black;
        }
      }

      form {
        .form-check {
          font-size: 18px;
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
