<template>
    <Navbar />
    <div class="main_section">
        <confirm_modal :id="'ConfirmModal'" @confirm="quickprocessStore.editQuick(true)" :text="warningText"/>
        <div class="title col">
            <h1>
                編輯快速入庫單
            </h1>
        </div>
        <quick_store_component></quick_store_component>
        <div class="col button_wrap">
            <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
            <button class="save_btn" @click="quickprocessStore.editQuick(false)">暫存</button>
            <button class="send_btn" data-bs-toggle="modal" data-bs-target="#ConfirmModal">送出</button>
        </div>
    </div>
</template>
  
<script setup>
import Navbar from '@/components/Navbar.vue';
import confirm_modal from '@/components/utils/confirm_modal.vue'
import quick_store_component from '@/components/quick_store_page/quick_store_component.vue';
import { useStorageStore } from '@/store/storage/_index'
import { useAPIStore, useUtilsStore } from '@/store';
import { useQuickProcessStore } from '@/store/storage/quick_process'
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { Store_Edit_Status } from '@/assets/js/enter_status';
const storageStore = useStorageStore();
const utilsStore = useUtilsStore();
const quickprocessStore = useQuickProcessStore();
const apiStore = useAPIStore();
// 解構
const { DropdownArray , upperForm , middleForm , hidden , tabData } = storeToRefs(storageStore) ;
const route = useRoute();
const AI_ID = route.query.search_id ;

const warningText = "按下確認後將無法再次變更，請確認是否正確填寫入庫項目"
onMounted(async() => {
    storageStore.$reset();
    quickprocessStore.$reset();
    quickprocessStore.editHidden = true;
    // DropdownArray.value.ProjectCode = [
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
    await storageStore.getDetails(AI_ID, true, Store_Edit_Status, false);
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
        width: 320px;
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
    .save_btn {
        @include save_btn;
        &:hover {
            background-color: #5e7aa2;
        }
    }

</style>