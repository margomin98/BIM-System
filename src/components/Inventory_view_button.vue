<template>
    <router-link :to="{name: linkName , query:{search_id: id}}" target="_blank">
      <button type="button" class="btn btn-primary">
        檢視
      </button>
    </router-link>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['params'],
  setup(props){
    const linkName = ref('');
    const id = ref('');
    const data = props.params.data;
    console.log('data:' ,data);
    // 已被整合
    if(data.I_Source === 1) {
      id.value = data.B_Id;
      linkName.value = 'Equipment_View';
    }
    else {
      id.value = data.AssetsId;
      linkName.value = 'Assets_View';
    }
    return {
      linkName,
      id,
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