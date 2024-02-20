<template>
  <div>
    <button type="button" class="btn btn-primary" @click="add()">+</button>
  </div>
</template>

<script setup>

const props = defineProps(['params', 'selectedNumber', 'Number']);
const emit = defineEmits(['addMaterial']);
const add = () => {
  const selectedNumber = props.selectedNumber;
  const Number = props.Number;
  if (!numberIsValid(selectedNumber, Number)) {
    if (!props.params.data.selectNumber) {
      alert('所選數量不得為零');
    } else {
      alert('所選數量超過資產數量上限');
    }
    return;
  }
  emit('addMaterial', props.params.data);
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