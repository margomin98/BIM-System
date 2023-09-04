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
    console.log(props.params.data.FormID);
    switch (props.params.data.Type) {
      case 0:
        linkName.value = 'Store_View';
        break;
        case 1:
        linkName.value = 'Rent_View';
        break;
      default:
        break;
    }
    return {
      linkName,
      id: props.params.data.FormID,
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