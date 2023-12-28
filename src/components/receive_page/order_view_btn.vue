<template>
  <button class="form_search_btn" @click="viewOrder">檢視</button>
  <!-- 隱藏跳轉按鈕 -->
  <router-link :to="{ name: 'Order_View', query: { search_id: props.id } }" target="_blank" id="view-order" style="display: none;"></router-link>
</template>

<script setup>
const props = defineProps(['id']);
const viewOrder = (()=>{
  if(props.id) {
    const link = document.getElementById('view-order');
    link.click();
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

.form_search_btn {
  @include form_search_btn;
}

#view-order {
  display: none;
}

@media only screen and (max-width: 767px) {
  .form_search_btn {
    border: none;
    color: white;
    width: 60px;
    height: 35px;
    margin-top: 10px;
    font-weight: 700;
    padding: 0 10px;
    background-color: #132238;

    &:hover {
      background-color: #43546d;
    }
  }
}
</style>