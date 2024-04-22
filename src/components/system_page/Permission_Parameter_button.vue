<template>
  <div class='button_wrap'>
    <button class="edit_btn" data-bs-toggle="modal" data-bs-target="#EditModal" @click="props.params.updatePermission(data)">編輯</button>
    <button :class="{ 'disabled_btn': disabled, 'delete_btn': !disabled }" :disabled="disabled" data-bs-toggle="modal"
      data-bs-target="#DeleteModal" @click="props.params.updatePermission(data)">刪除</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps(['params']);
const data = props.params.data;
const disabled = ref(false);
onMounted(() => {
  // 有幾個特定的權限不能被刪除
  let excludeId = [0,1,3,4];
  if (excludeId.includes(props.params.data.Id)) {
    disabled.value = true
  }
})
</script>

<style lang="scss">
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