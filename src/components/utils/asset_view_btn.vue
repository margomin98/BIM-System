<template>
  <router-link :to="{name: linkName , query:{search_id: id}}" target="_blank">
    <button type="button" class="btn btn-primary" @click="view">檢視</button>
  </router-link>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['params']);
const linkName = ref('');
const id = ref('');

const view = () => {
  // 已被整合
  console.log();
  if (props.params.data.I_Source) {
    id.value = props.params.data.B_Id;
    linkName.value = 'Equipment_View';
  } else {
    id.value = props.params.data.AssetsId;
    linkName.value = 'Assets_View';
  }
};

</script>



<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  button {
    @include datagrid_view_button;
    height: 25px;
    color: black;
    &:hover {
      background: #1D7072;
      color: white
    }
  }
</style>