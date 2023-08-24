<template>
  <div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  搜索庫存
  </button>
  </div>
</template>

<script>

</script>


<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  button {
    @include empty_btn;
    height: 25px;
    width: 80px;
    font-size: 15px;
    &:hover {
      background-color: #5e7aa2;
      height: 25px;
      width: 80px;
      font-size: 15px;
    }
  }
</style>