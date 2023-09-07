<template>
  <div>
    <router-link :to="{name: 'Assets_View' , query:{search_id: id}}" target="_blank">
      <button type="button" class="btn btn-primary">
        檢視
      </button>
    </router-link>

  </div>
</template>

<script>

export default {
  props: ['params'],
  setup(props){
    // console.log(props.params.data.AssetsId);
    return {
      id: props.params.data.AssetsId,
    }
  },
}
</script>


<style lang="scss" scoped>
  @import "@/assets/css/global.scss";

button{
    @include datagrid_view_button;
    height: 25px;
    color:black;
       &:hover {
      background: #1D7072;
      color: white
    }
}
</style>