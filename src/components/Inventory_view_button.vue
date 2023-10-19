<template>
  <router-link :to="{name: linkName , query:{search_id: id}}" target="_blank">
    <button type="button" class="btn btn-primary" @click="view">檢視</button>
  </router-link>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['params'],
  setup(props){
    const linkName = ref('');
    const id = ref('');
    // console.log('data:' ,data);
    function view() {
      // 已被整合
      if(props.params.data.I_Source === 1) {
        id.value = props.params.data.B_Id;
        linkName.value = 'Equipment_View';
      }
      else {
      id.value = props.params.data.AssetsId;
      linkName.value = 'Assets_View';
      }
  }
    return {
      linkName,
      id,
      view,
    }
  },
}
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