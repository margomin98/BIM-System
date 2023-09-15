<template>
  <button v-show="display" type="button" class="btn btn-primary" @click="updateActual">>></button>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  props: ['params'],
  setup(props){
    const display = ref(false)
    onMounted(()=>{ 
      display.value = props.params.data.IsConsumables
    });
    
    // const linkName = ref('');
    function updateActual() {
      props.params.update(props.params.data)
      // console.log(display.value);
    }
    return {
      updateActual,
      display,
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