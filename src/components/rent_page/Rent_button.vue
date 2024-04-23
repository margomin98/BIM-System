<template>
  <div class='button_div'>
    <button @click="viewDetails()">檢視</button>
    <button :class="{ disabled: isDisabled, btn_edit: !isDisabled}" @click="viewEdit()" :disabled="isDisabled">編輯</button>
  </div>
</template>

<script>
// import router from '@/router';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Rent_Edit_Status , Quick_Rent_Status } from '@/assets/js/enter_status';


export default {
  props: ['params'],
  setup(props) {
    const router = useRouter();
    const search_id = props.params.data.AO_ID;
    const status = props.params.data.Status;
    const isDisabled = ref(false);

    onMounted(()=> {
      checkButton();
    });
    function viewDetails() {
      // console.log(props.params.data.AI_ID);
      if (search_id !== '') {
        let route_name = Quick_Rent_Status.includes(status) ? 'Quick_Rent_View' : 'Rent_View'
        router.push({ name: route_name, query: { search_id } });
      }
    }

    function viewEdit() {
      // console.log(props.params.data.search_id);
      if (search_id !== '') {
        router.push({ name: 'Rent_Edit', query: { search_id } });
      }
    }

    function checkButton() {
      if(!Rent_Edit_Status.includes(status) || !props.params.data.canEdit) {
        isDisabled.value = true;
      }
    }
    return { 
      viewDetails,
      viewEdit,
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
  }

  button:nth-child(1):hover {
    background: #1D7072;
    color: white
  }

  .btn_edit {
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