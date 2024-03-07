<template>
  <div class='button_wrap'>
    <!-- <button @click="viewEdit()">編輯</button> -->

    <button :class="{ 'disabled_btn_nomargin': disabled, 'edit_btn': !disabled }" :disabled="disabled"
      data-bs-toggle="modal" data-bs-target="#editModal" @click="viewEdit()">編輯</button>
    <button :class="{ 'disabled_btn': disabled, 'delete_btn': !disabled }" :disabled="disabled" data-bs-toggle="modal"
      data-bs-target="#editModal2" @click="viewDelete()">刪除</button>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps(['params']);
const data = props.params.data;
const disabled = ref(false);
onMounted(() => {
  if (data.Id === 'A0000' || data.Id === 'L0000') {
    disabled.value = true
  }
})
function viewDelete() {
  props.params.updateDeleteType(data);
}
function viewEdit() {
  console.log(data);
  props.params.updateEditType(data);
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.button_wrap {
  justify-content: center;
  display: flex;

}

.edit_btn {
  @include search_and_send_btn;
  width: 50px;
  height: 30px;
  font-size: 15px;
  border-radius: 7px;

  &:hover {
    background: #5D85BD;
    color: white
  }
}

.delete_btn {
  @include content_delete_button;

  &:hover {
    background: #FF7272;
    color: white
  }
}

.disabled_btn {
  @include disabled_btn;
  width: 50px;

  &:hover {
    width: 50px;
  }
}

.disabled_btn_nomargin {
  @include disabled_btn;
  margin: 0;
  width: 50px;

  &:hover {
    width: 50px;
  }
}</style>