<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        刪除訂購單
      </h1>
    </div>
    <Order_component :hidden="hidden" :placeholder="placeholder" :disabled="disabled" />
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
    </div>
    <!-- Delete Modal -->
    <div class="modal fade delete_modal" id="deleteModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            確定刪除這筆項目嗎？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">否</button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="deleteData">是</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, provide, reactive, ref, } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Order_component from '@/components/order_page/Order_component.vue';
import router from '@/router';
import { goBack } from '@/assets/js/common_fn.js'
import { getDetails } from '@/assets/js/common_api'
import axios from '@/axios/tokenInterceptor';
import { useRoute } from 'vue-router';
const route = useRoute();
const PO_ID = route.query.search_id;
const formParams = reactive({
		PO_ID: '',
    Type: '',
		PurchaseNum: '',
		Source: '',
    ProjectCode: '',
    ProjectName: '',
    ProjectSelect: '',
		Use: '',
    Memo: '',
    Links: [],
		PurchaseDate: '',
		Executor: '',//承辦人員
		Quantity: 1,
	});
const fileParams = reactive({
  newDoc: [],
  viewDoc: [],
  deleteDoc: [], //將刪除的 已上傳物流文件記錄於此
  existDoc: [],
})
const hidden = {
  div: {
    selected_btn: true,
    selected_file: true,
    Link: true,
  },
  input: {
    file_trashcan: true,
    Type: true,
  },
}
const placeholder = {
  PurchaseNum: '',
  Source: '',
  Use: '',
}
const disabled = ref(true);
const details = ref();
const DropdownArray = reactive({
  ProjectCode: []
})
provide("form", formParams);
provide("file", fileParams);
provide("DropdownArray",DropdownArray);
onMounted(() => {
  getDetails('/GetDBdata/PurchasingGetData?po_id=', PO_ID)
    .then((r) => {
      details.value = r;
      for (const key in details.value) {
        // 文字部分
        if (formParams.hasOwnProperty(key)) {
          formParams[key] = details.value[key];
        } else if (key == 'PO_PurchaseNum') {
          formParams['PurchaseNum'] = details.value[key];
        }
        // 檔案部分
        if(details.value.existDocument) {
          fileParams.existDoc = details.value.existDocument;
        }
        // fileParams.existDoc = [{ "FileName": "20231226142509.png", "FileLink": "https://truth.bahamut.com.tw/s01/201909/9ede4b8227205d338399d2dfbb3e7938.JPG", "exist": true }]
      }
    })
})
async function deleteData() {
  const form = new FormData();
  form.append('PO_ID', PO_ID);
  try {
    const response = await axios.post(`https://localhost:44302/PurchasingMng/DeleteOrder`, form);
    const data = response.data;
    if (data.state === 'success') {
      alert(data.messages + '\n單號:' + data.resultList.PO_ID);
      router.push({
        name: 'Order_Datagrid'
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
@import '@/assets/css/global.scss';

.delete_modal {
  .modal-content {
    border: solid 1px black;
    border-radius: 0;
    width: 300px;
    margin: auto;

    .modal-body {
      margin: unset;
      background: #E94B4B;
      text-align: center;
      font-weight: 700;
      color: white;
      border-bottom: solid 1px black;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center
    }

    .modal-footer {
      margin: auto;
      gap: 10px;
      padding: 20px;
      background: white;
      width: 100%;
      justify-content: center;

      button:nth-child(1) {
        background-color: #7E7E7E;
        border: none;
        color: white;
        width: 50px;
        font-weight: 700;

        &:hover {
          background-color: #464242;
        }
      }

      button:nth-child(2) {
        background-color: #E94B4B;
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

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;

  button.back_btn {
    @include back_to_previous_btn;

    &:hover {
      background-color: #5d85bb;
    }
  }

  .delete_btn {
    @include delete_btn;

    &:hover {
      background-color: #a51e1e;
    }
  }
}
</style>