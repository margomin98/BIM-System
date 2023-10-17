<template>
  <div class='button_wrap'>
    <button class="" @click="view('View')">檢視</button>
    <button :class="{ disabled_btn: isDisabled.edit, btn2: !isDisabled.edit }" :disabled="isDisabled.edit" @click="view('Edit')">編輯</button>
    <button :class="{ disabled_btn: isDisabled.deliver, btn3: !isDisabled.deliver }" :disabled="isDisabled.deliver" @click="view('Deliver')">交付</button>
    <button :class="{ disabled_btn: isDisabled.verify, btn4: !isDisabled.verify }" :disabled="isDisabled.verify" @click="view('Verify')">審核</button>
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
    Scrap_Edit_Status ,
    Scrap_Deliver_Status, 
    Scrap_Review_Status, 
  } from '@/assets/js/enter_status';
  export default {
    props: ['params'],
    setup(props) {
      const router = useRouter();
      const search_id = props.params.data.ScrapId;
      const disabledStatus = props.params.data.Status;
      const isDisabled = ref({
        edit: false, // 編輯
        deliver: false, // 交付
        verify: false, // 審核
      })
      function view(type) {
        if (search_id !== '') {
          switch (type) {
            case 'View':
              router.push({
                name: 'Scrap_View',
                query: {
                  search_id
                }
              });
              break;
            case 'Edit':
              router.push({
                name: 'Scrap_Edit',
                query: {
                  search_id
                }
              });
              break;
            case 'Deliver':
              router.push({
                name: 'Scrap_Deliver',
                query: {
                  search_id
                }
              });
              break;
            case 'Verify':
              router.push({
                name: 'Scrap_Review',
                query: {
                  search_id
                }
              });
              break;
          }
        }
      }
      function checkButton() {

        if (!Scrap_Edit_Status.includes(disabledStatus)) {
          isDisabled.value.edit = true;
        }
        if (!Scrap_Deliver_Status.includes(disabledStatus)) {
          isDisabled.value.deliver = true;
        }
        if (!Scrap_Review_Status.includes(disabledStatus)) {
          isDisabled.value.verify = true;
        }
      }
      onMounted(() => {
        checkButton();
      });
      return {
        view,
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