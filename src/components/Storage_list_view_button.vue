<template>
    <router-link :to="{name: linkName , query:{search_id: id}}" target="_blank">
      <button type="button" class="btn btn-primary" @click="update">
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
    const id = ref(props.params.data.FormID);
    // console.log(props.params.data.FormID);
    function update() {
      id.value = props.params.data.FormID;
      switch (props.params.data.Type) {
        // 入庫
        case 0:
          linkName.value = 'Store_Process_View';
          break;
        // 出庫
        case 1:
          linkName.value = 'Rent_Process_View';
          break;
        // 盤點
        case 2:
          linkName.value = 'Inventory_View';
          break;
        // 設備整合
        case 3:
          linkName.value = 'Equipment_View';
          break;
        // 維修
        case 4:
          linkName.value = 'Repair_View';
          break;
        // 報廢
        case 5:
          linkName.value = 'Scrap_View';
          break;
        // Excel匯入(不應該顯示)
        case 6:
          break;
        // 入庫(快速入庫完成)
        case 7:
          linkName.value = 'Quick_Store_Process_View';
          break;
        // 快速出庫(可能是借測、內部領用、出貨)
        case 8:
          linkName.value = 'Quick_Rent_View';
          break;
      }
    }
    return {
      update,
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