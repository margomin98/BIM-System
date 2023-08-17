<template>
  <span>
    <button @click="onButtonClicked" style="height: 30px">✎</button>
    <span style="padding-left: 4px;">{{ params.value }}</span>
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
/* Add any necessary styling here */
</style>
