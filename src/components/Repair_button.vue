<template>
  <div class='button_wrap'>
    <button class="" @click="view('View')">檢視</button>
    <button :class="{ disabled_btn: isDisabled.edit, btn2: !isDisabled.edit }" :disabled="isDisabled.edit" @click="view('Edit')">編輯</button>
    <button :class="{ disabled_btn: isDisabled.deliver, btn3: !isDisabled.deliver }" :disabled="isDisabled.deliver" @click="view('Deliver')">交付</button>
    <button :class="{ disabled_btn: isDisabled.review, btn4: !isDisabled.review }" :disabled="isDisabled.review" @click="view('Review')">審核</button>
    <button :class="{ disabled_btn: isDisabled.process, btn5: !isDisabled.process }" :disabled="isDisabled.process" @click="view('Process')">送修</button>
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
      const search_id = props.params.data.RepairId;
      const disabledStatus = props.params.data.Status;
      const isDisabled = ref({
        edit: false, //編輯
        deliver: false, //交付
        review: false, //審核
        process: false, //送修
      })
      function view(type) {
        if (search_id !== '') {
          switch (type) {
            case 'View':
              router.push({
                name: 'Repair_View',
                query: {
                  search_id
                }
              });
              break;
            case 'Edit':
              router.push({
                name: 'Repair_Edit',
                query: {
                  search_id
                }
              });
              break;
            case 'Process':
              router.push({
                name: 'Repair_Process',
                query: {
                  search_id
                }
              });
              break;
            case 'Review':
              router.push({
                name: 'Repair_Review',
                query: {
                  search_id
                }
              });
              break;
            case 'Deliver':
              router.push({
                name: 'Repair_Deliver',
                query: {
                  search_id
                }
              });
              break;
          }
        }
      }
      function checkButton() {
        // console.log(disabledStatus);
        if (disabledStatus !== '待交付') {
          isDisabled.value.edit = true;
          isDisabled.value.deliver = true;
        }
        if (disabledStatus !== '待審核') {
          isDisabled.value.review = true;
        }
        if (disabledStatus !== '待送修') {
          isDisabled.value.process = true;
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