<template>
  <button type="button" class="btn btn-primary" @click="updateActual">➜</button>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  props: ['params'],
  setup(props,{emit}){
    // const linkName = ref('');
    function updateActual() {
      // props.params.update(props.params.data)
      emit('update', props.params.data)
    }
    return {
      updateActual,
    }
  },
}
</script>


<style lang="scss" scoped>
@import "@/assets/css/global.scss";
button {
  @include datagrid_view_button;
  height: 20px;
  color: black;
  width: 40px;
  border-radius: 15px;
  &:hover {
    background: #1D7072;
    color: white
  }
}
</style>