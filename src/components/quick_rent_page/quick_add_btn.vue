<template>
  <div>
    <button type="button" class="btn btn-primary" @click="add()">+</button>
  </div>
</template>

<script setup>
import { useRentStore } from '@/store/rent/_index';
import { useQuickRentStore } from '@/store/rent/quick';

const props = defineProps(['params', 'selectedNumber', 'Number']);
const emit = defineEmits(['addMaterial']);
const rentStore = useRentStore();
const quickrentStore = useQuickRentStore();
const add = () => {
  const selectedNumber = props.selectedNumber;
  const Number = props.Number;
  if (!numberIsValid(selectedNumber, Number)) {
    if (!props.params.data.selectNumber) {
      alert('所選數量不得為零');
    } else {
      alert('所選數量超過所需數量上限');
    }
    return;
  }
  // 將物品加入，更新下方清單
  // 出庫數量看的是OM_Number，所以從搜尋拉下來要將OM_Number替換成剛剛所選的數量
  // Number是檢索api所需要的key
  let exist = false;
  let data = props.params.data;
  rentStore.Form.ItemList.forEach(item=>{
    if(item.AssetsId === data.AssetsId) {
      item.OM_Number += data.selectNumber
      item.Number += data.selectNumber
      exist = true; 
    }
  })
  if(!exist) {
    data.OM_Number = data.selectNumber;
    rentStore.Form.ItemList.splice(0,0,{
      ...data,
      Number: data.selectNumber
    });
  }
  quickrentStore.searchInventory('','');
};

const numberIsValid = (selectedNumber, Number) => {
  const data = props.params.data;
  // 檢查選擇數量是否正常 1.超過 2.為零 3.正常執行
  if ((data.selectNumber + selectedNumber) > Number || !data.selectNumber) {
    // 1. || 2.
    return false;
  }
  // 2. 正常執行
  return true;
};
</script>



<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  button {
    @include datagrid_edit_button;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    font-weight: 700;
    font-size: 20px;
    &:hover {
      background: #3B6162;
      color: white
    }
  }
</style>