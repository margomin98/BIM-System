<template>
  <div>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
檢視
</button>

  </div>
</template>

<script>

</script>


<style lang="scss" scoped>
  @import "@/assets/css/global.scss";

button{
    @include datagrid_view_button;
    color:black;
       &:hover {
      background: #1D7072;
      color: white
    }
}
</style>