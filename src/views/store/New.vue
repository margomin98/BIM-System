<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        新品入庫
      </h1>
    </div>
    <Store_Component></Store_Component>
    <div class="col button_wrap">
      <button class="back_btn" @click="goBack">回上一頁</button>
      <button class="send_btn" @click="store.submit()">送出</button>
    </div>
  </div>
</template>

<script setup>
import Store_Component from '@/components/store_page/store_component';
import Navbar from '@/components/Navbar.vue';
import { useStorageStore } from '@/store'
import { onMounted } from 'vue';
const store = useStorageStore();
onMounted(() => {
  store.$reset();
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.title {
  h1 {

    margin-top: 50px;
    text-align: center;
    font-size: 55px;
    font-weight: 600;
    color: #132238;
  }
}

.button_wrap {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 5%;
  width: 220px;
}


.back_btn {
  @include back_to_previous_btn;

  &:hover {
    background-color: #5d85bb;
  }
}

.send_btn {
  @include search_and_send_btn;

  &:hover {
    background-color: #5D85BD;
  }
}

@media only screen and (max-width: 767px) {
  .title {
    h1 {
      font-size: 50px;
    }
  }
}</style>
