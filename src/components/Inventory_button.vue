<template>
  <div class='button_div'>
    <button class="" @click="view('View')">檢視</button>
    <button :class="{ disabled_btn: isDisabled.edit, btn2: !isDisabled.edit }" :disabled="isDisabled.edit" @click="view('Edit')">編輯</button>
    <button v-if="Status === '待盤點'" :class="{ disabled_btn: isDisabled.process, btn3: !isDisabled.process }" :disabled="isDisabled.process" @click="emitView" data-bs-toggle="modal" data-bs-target="#staticBackdrop">盤點</button>
    <button v-else :class="{ disabled_btn: isDisabled.process, btn3: !isDisabled.process }" :disabled="isDisabled.process" @click="view('Process')">盤點</button>
    <button :class="{ disabled_btn: isDisabled.balance, btn4: !isDisabled.balance }" :disabled="isDisabled.balance" @click="view('Balance')">平帳</button>
    <button :class="{ disabled_btn: isDisabled.balance_result, btn5: !isDisabled.balance_result }" :disabled="isDisabled.balance_result" class="" @click="view('Balance_Result')">結果</button>
  </div>
</template>

<script>
  // import router from '@/router';
  import {
    onMounted,
    ref
  } from 'vue';
  import {
    useRouter
  } from 'vue-router';
  import {
    Inventory_Edit_Status,
    Inventory_Process_Status,
    Inventory_Balance_Status,
    Inventory_BalanceResult_Status,
  } from '@/assets/js/enter_status'
  export default {
    props: ['params'],
    setup(props, {emit}) {
      const router = useRouter();
      const search_id = props.params.data.PlanId;
      const Status = props.params.data.PlanStatus;
      const isDisabled = ref({
        edit: false, //編輯
        process: false, //盤點
        balance: false, //平帳
        balance_result: false, //結果
      })
      function view(type) {
      const search_id = props.params.data.PlanId;
        if (search_id !== '') {
          switch (type) {
            case 'View':
              router.push({
                name: 'Inventory_View',
                query: {
                  search_id
                }
              });
              break;
            case 'Edit':
              router.push({
                name: 'Inventory_Edit',
                query: {
                  search_id
                }
              });
              break;
            case 'Process':
              router.push({
                name: 'Inventory_Process',
                query: {
                  search_id
                }
              });
              break;
            case 'Balance':
              router.push({
                name: 'Inventory_Balance',
                query: {
                  search_id
                }
              });
              break;
            case 'Balance_Result':
              router.push({
                name: 'Inventory_Balance_Result',
                query: {
                  search_id
                }
              });
              break;
          }
        }
      }
      function checkButton() {
        // console.log(Status);
        if (!Inventory_Edit_Status.includes(Status)) {
          isDisabled.value.edit = true;
        }
        if (!Inventory_Process_Status.includes(Status)) {
          isDisabled.value.process = true;
        }
        if (!Inventory_Balance_Status.includes(Status)) {
          isDisabled.value.balance = true;
        }
        if (!Inventory_BalanceResult_Status.includes(Status)) {
          isDisabled.value.balance_result = true;
        }
      }
      function emitView() {
        // props.params.updateSearchId(search_id);
        emit('updateSearchId' , search_id)
      }
      onMounted(() => {
        checkButton();
      });
      return {
        view,
        emitView,
        Status,
        isDisabled,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .button_div {
    justify-content: center;
     :nth-child(1) {
      @include datagrid_view_button;
      height: 25px;
      &:hover {
        background: #1D7072;
        color: white
      }
    }
    .btn2 {
      @include datagrid_edit_button;
      height: 25px;
      &:hover {
        background: #3B6162;
        color: white
      }
    }
    .btn3 {
      @include datagrid_inform_button;
      height: 25px;
      width: 50px;
      &:hover {
        background: #64a1a3;
        color: white
      }
    }
    .btn4 {
      @include datagrid_pass_button;
      height: 25px;
      &:hover {
        background: #597c7c;
        color: white
      }
    }
    .btn5 {
      @include datagrid_result_button;
      height: 25px;
      &:hover {
        background: #1D7072;
        color: white
      }
    }
    .disabled_btn {
      @include disabled_btn;
      height: 25px;
      width: 50px;
       :hover {
        @include disabled_btn;
        width: 50px;
      }
    }
  }
</style>