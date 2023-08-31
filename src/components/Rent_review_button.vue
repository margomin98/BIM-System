<template>
  <div class='button_wrap'>
    <button @click="viewDetails()">檢視</button>
    <button :class="{ disabled: isDisabled, btn_verify: !isDisabled}" @click="viewEdit()" :disabled="isDisabled">審核</button>
  </div>
</template>

<script>
// import router from '@/router';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


export default {
  props: ['params'],
  setup(props) {
    const router = useRouter();
    const search_id = props.params.data.AO_ID;
    const isDisabled = ref(false);

    onMounted(()=> {
      checkButton();
    });

    function viewDetails() {
      // console.log(props.params.data.AI_ID);
      if (search_id !== '') {
        router.push({ name: 'Rent_Review_View', query: { search_id } });
      }
    }

    function viewEdit() {
      // console.log(props.params.data.search_id);
      if (search_id !== '') {
        router.push({ name: 'Rent_Review_New', query: { search_id } });
      }
    }
    function checkButton() {
      const disabledStatus = props.params.data.Status;
      console.log(disabledStatus);
      if(disabledStatus !== '待審核') {
        isDisabled.value = true;
      }
    }
    return { 
      isDisabled,
      viewDetails,
      viewEdit,
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
  }

  button:nth-child(1):hover {
    background: #1D7072;
    color: white
  }

  .btn_verify {
    @include datagrid_edit_button;
    height: 25px;
    &:hover {
      background: #3B6162;
      color: white
    }
  }
  .disabled {
    @include disabled_btn;
    height: 25px;
    width: 50px;
     :hover {
      @include disabled_btn;
      width: 50px;
    }
  }
}</style>