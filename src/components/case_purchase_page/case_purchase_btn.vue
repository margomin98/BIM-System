<template>
  <div class="button_div">
    <button class="btn1" @click="routeTo('Case_Purchase_View')">檢視</button>
    <button @click="routeTo('Case_Purchase_Edit')" :class="{ disabled_btn2: isDisabled.edit, btn2: !isDisabled.edit }" :disabled="isDisabled.edit">編輯</button>
    <button @click="routeTo('Case_Purchase_Order')" :class="{ disabled_btn3: isDisabled.order, btn3: !isDisabled.order }" :disabled="isDisabled.order">訂貨</button>
    <button @click="routeTo('Case_Purchase_Process')" :class="{ disabled_btn4: isDisabled.process, btn4: !isDisabled.process }" :disabled="isDisabled.process">沖銷</button>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { 
    CasePurchase_Edit,
    CasePurchase_Order,
    CasePurchase_Process
  } from '@/assets/js/enter_status';
  import { onMounted, reactive } from "vue";
  const router = useRouter();
  const props = defineProps(['params']);
  const search_id = props.params.data.PP_ID;
  const status = props.params.data.Status;
  const isDisabled = reactive({
    edit: false, // 編輯
    order: false, // 下訂
    process: false, // 沖銷
  });

  function routeTo(route_name) {
    router.push({ name: route_name, query: { search_id } });
  }

  function checkButton() {
    if (!CasePurchase_Edit.includes(status) || !props.params.data.canEdit) {
      isDisabled.edit = true;
    }
    if (!CasePurchase_Order.includes(status) || !props.params.data.canOrder) {
      isDisabled.order = true;
    }
    if (!CasePurchase_Process.includes(status) || !props.params.data.canWritoff) {
      isDisabled.process = true;
    }
  }

  onMounted(() => {
    checkButton();
  });

</script>


<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  .btn1 {
    @include datagrid_view_button;
    height: 25px;
    &:hover {
      background: #1d7072;
      color: white;
    }
  }
  .btn2 {
    @include datagrid_edit_button;
    height: 25px;
    &:hover {
      background: #3b6162;
      color: white;
    }
  }
  .btn3 {
    @include datagrid_result_button;
    height: 25px;
    &:hover {
      background: #64a1a3;
      color: white;
    }
  }
  .btn4 {
    @include datagrid_pass_button;
    height: 25px;
    &:hover {
      background: #597c7c;
      color: white;
    }
  }
  .disabled_btn1 {
    @include disabled_btn;
    height: 25px;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
  .disabled_btn2 {
    @include disabled_btn;
    height: 25px;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
  .disabled_btn3 {
    @include disabled_btn;
    height: 25px;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
  .disabled_btn4 {
    @include disabled_btn;
    height: 25px;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
</style>
