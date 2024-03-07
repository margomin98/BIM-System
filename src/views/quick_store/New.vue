<template>
    <Navbar />
    <confirm_modal :id="'ConfirmModal'" @confirm="quickprocessStore.createQuick()" :text="warningText"/>
    <div class="main_section">
        <div class="title col">
            <h1>
                快速入庫
            </h1>
        </div>
        <quick_store_component></quick_store_component>
        <div class="col button_wrap">
            <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
            <button class="send_btn" data-bs-toggle="modal" data-bs-target="#ConfirmModal">送出</button>
      </div>
    </div>
</template>

<script setup>
import quick_store_component from '@/components/quick_store_page/quick_store_component.vue';
import Navbar from '@/components/Navbar.vue';
import confirm_modal from '@/components/utils/confirm_modal.vue'
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { useQuickProcessStore } from '@/store/storage/quick_process'
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const storageStore = useStorageStore();
const utilsStore = useUtilsStore();
const quickprocessStore = useQuickProcessStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray , upperForm , middleForm , hidden , tabData } = storeToRefs(storageStore) ;
const route = useRoute();

const warningText = "按下確認後將無法再次變更，請確認相關資訊是否填寫正確"
onMounted(async() => {
    storageStore.$reset();
    quickprocessStore.$reset();
    quickprocessStore.createHidden = true;

    // DropdownArray.value.ProjectCode = [
    //     {Text: '--請選擇--',Value: '' },
    //     {Text: '專案1', Value: '0001'},
    //     {Text: '專案2', Value: '0002'},
    //     {Text: '專案3', Value: '0003'},
    //     {Text: '專案4', Value: '0004'},
    //     {Text: '專案5', Value: '0005'}
    // ]
    DropdownArray.value.EquipType = await apiStore.getEquipType();
    DropdownArray.value.ShipmentNum = await apiStore.getShipmentNum();
    DropdownArray.value.Area = await apiStore.getArea();
    DropdownArray.value.Custodian = await apiStore.getCustodian('');
      DropdownArray.value.ProjectCode = await apiStore.getFuzzyProject();
//   console.log(DropdownArray.value);
});

onUnmounted(()=>{
    utilsStore.$dispose();
    storageStore.$dispose();
    quickprocessStore.$dispose();
    apiStore.$dispose();
})
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