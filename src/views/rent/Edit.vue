<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        編輯出庫填報
      </h1>
    </div>
    <rent_component></rent_component>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
      <button class="send_btn" @click="submit">送出</button>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import rent_component from '@/components/rent_page/rent_component.vue';
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import router from "@/router";
import { useRentStore } from '@/store/rent/_index';
import { useAPIStore, useUtilsStore } from '@/store';
import { storeToRefs } from 'pinia';
import { Rent_Edit_Status } from '@/assets/js/enter_status';
import axios from '@/axios/tokenInterceptor'
import { useRoute } from 'vue-router';
const rentStore = useRentStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();
const { Form, DropdownArray, ItemList_field, FormLetterCheckList } = storeToRefs(rentStore);

const route = useRoute();
const AO_ID = route.query.search_id;
onMounted(async () => {
  rentStore.$reset();
  utilsStore.getUserName();
  utilsStore.getDate();
  await rentStore.getDetails(AO_ID, Rent_Edit_Status);
  DropdownArray.value.EquipType = await apiStore.getEquipType();
  // 填報時id尚不確定，故不顯示僅作為刪除primary key
  ItemList_field.value = ItemList_field.value.filter((item)=> item.field !== 'id');
});
onUnmounted(() => {
  rentStore.$dispose();
  apiStore.$dispose();
})

async function submit() {
  const checkList = ['Use', 'ProjectCode','ItemList'];
  if(!utilsStore.checkRequired(Form.value, checkList)) return
  if(!utilsStore.checkMaxLetter(Form.value, FormLetterCheckList.value)) return
  const requestData = {
    AO_ID: AO_ID,
    Use: Form.value.Use,
    ProjectCode: Form.value.ProjectCode,
    Description: Form.value.Description,
    ItemList: Form.value.newItemList,
    deleteList: Form.value.deleteItemList,
  };
  console.log('requestData:', requestData);
  try {
    const response = await axios.post('https://localhost:44302/AssetsOutMng/ApplicationEdit', requestData);
    const data = response.data;
    if (data.state === 'success') {
      let msg = data.messages + '\n';
      msg += '單號為:' + data.resultList.AO_ID;
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
@import '@/assets/css/global.scss';

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 210px;
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
</style>
