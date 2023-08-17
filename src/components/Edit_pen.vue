<template>
  <span>
    <span >{{ params.value }}</span>
  <button @click="onButtonClicked">✎</button>
  </span>
</template>

<script>
  export default {
    name: 'Edit_pen',
    props: ['params'],
    methods: {
      onButtonClicked() {
        const startEditingParams = {
          rowIndex: this.params.rowIndex,
          colKey: this.params.column.getId(),
        };
        this.params.api.startEditingCell(startEditingParams);
      },
    },
  };
</script>

<style scoped>
  button {
    height: 30px;
    border: none;
    background: none;
  }
</style>
