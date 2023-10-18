<template>
  <div>
    <router-link :to="{name: 'Assets_View' , query:{search_id: id}}" target="_blank" class="d-flex">
      <button type="button" class="btn btn-primary" @click="view">檢視</button>
    </router-link>

  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: ['params'],
  setup(props){
    const id = ref()
    function view() {
      id.value = props.params.data.AssetsId
    }
    // console.log(props.params.data.AssetsId);
    return {
      view,
      id,
    }
  },
}
</script>


<style lang="scss" scoped>
  @import "@/assets/css/global.scss";

button{
    @include datagrid_view_button;
    height: 25px;
    color: black;
    &:hover {
      background: #1D7072;
      color: white
    }
}
</style>