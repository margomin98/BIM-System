<template>
  <div class='button_wrap'>
    <button class="" @click="view('View')">檢視</button>
    <button :class="{ disabled_btn: isDisabled.edit, btn2: !isDisabled.edit }" :disabled="isDisabled.edit" @click="view('Edit')">編輯</button>
    <button v-if="disabledStatus === '待盤點'" :class="{ disabled_btn: isDisabled.process, btn3: !isDisabled.process }" :disabled="isDisabled.process" @click="emitView" data-bs-toggle="modal" data-bs-target="#staticBackdrop">盤點</button>
    <button v-else :class="{ disabled_btn: isDisabled.process, btn3: !isDisabled.process }" :disabled="isDisabled.process" @click="view('Process')">盤點</button>
    <button :class="{ disabled_btn: isDisabled.balance, btn4: !isDisabled.balance }" :disabled="isDisabled.balance" @click="view('Balance')">平帳</button>
    <button class="" @click="view('Balance_Result')">結果</button>
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
  export default {
    props: ['params'],
    setup(props) {
      const router = useRouter();
      const search_id = props.params.data.PlanId;
      const disabledStatus = props.params.data.PlanStatus;
      const isDisabled = ref({
        edit: false, //編輯
        process: false, //盤點
        balance: false, //平帳
      })
      function view(type) {
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
        console.log(disabledStatus);
        if (disabledStatus !== '待盤點') {
          isDisabled.value.edit = true;
        }
        if (disabledStatus !== '待盤點' && disabledStatus !== '盤點中') {
          isDisabled.value.process = true;
        }
        if (disabledStatus !== '待平帳') {
          isDisabled.value.balance = true;
        }
      }
      function emitView() {
        props.params.updateSearchId(search_id);
      }
      onMounted(() => {
        checkButton();
      });
      return {
        view,
        emitView,
        disabledStatus,
        isDisabled,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .button_wrap {
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
     :nth-child(5) {
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