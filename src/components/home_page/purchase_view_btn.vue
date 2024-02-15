<template>
  <router-link :to="{name: linkName , query:{search_id: id}}" target="_blank">
    <button type="button" class="btn btn-primary" @click="view">訂貨</button>
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
  id.value = props.params.data.PP_ID;
  linkName.value = 'Case_Purchase_Order';

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