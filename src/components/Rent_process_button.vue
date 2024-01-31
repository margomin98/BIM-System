<template>
  <div class="button_div">
    <button class="btn1" @click="routeTo('檢視')">檢視</button>
    <button @click="routeTo('備料')" :class="{ disabled_btn2: isDisabled.new, btn2: !isDisabled.new }" :disabled="isDisabled.new">備料</button>
    <button v-if="!deliveryNotify" @click="changeStatus" :class="{ disabled_btn3: isDisabled.deliveryNotify, btn3: !isDisabled.deliveryNotify }" :disabled="isDisabled.deliveryNotify">通知交付</button>
    <button v-else @click="changeStatus" :class="{ disabled_btn3: isDisabled.deliveryNotify, btn3: !isDisabled.deliveryNotify }" :disabled="isDisabled.deliveryNotify">暫停交付</button>
    <button @click="routeTo('交付')" :class="{ disabled_btn4: isDisabled.delivery, btn4: !isDisabled.delivery }" :disabled="isDisabled.delivery">交付</button>
  </div>
</template>

<script>
  import {
    onMounted,
    ref,
    reactive,
  } from 'vue';
  import {
    useRouter
  } from "vue-router";
  import { 
    RentProcess_New_Status, 
    RentProcess_NotifyConfirm_Status ,
    RentProcess_Confirm_Status, 
    Quick_Rent_Status
  } from '@/assets/js/enter_status';
  export default {
    props: ["params", "refresh"],
    setup(props,{emit}) {
      const router = useRouter();
      const search_id = props.params.data.AO_ID;
      const status = props.params.data.Status;
      const deliveryNotify = ref(true);
      const isDisabled = reactive({
        deliveryNotify: false, //通知交付
        delivery: false, //交付
        new: false, //備料
      });
      function routeTo(view) {
        switch (view) {
          case "檢視":
            let route_name = Quick_Rent_Status.includes(status) ? 'Quick_Rent_View' : 'Rent_Process_View'
            router.push({ name: route_name, query: { search_id } });
            break;
          case "備料":
            router.push({
              name: "Rent_Process_New",
              query: {
                search_id,
              },
            });
            break;
          case "交付":
            router.push({
              name: "Rent_Process_Confirm",
              query: {
                search_id,
              },
            });
            break;
        }
      }
      async function changeStatus() {
        const axios = require("axios");
        const response = await axios.get(`http://192.168.0.177:7008/AssetsOutMng/DeliveryNotification?ao_id=${search_id}`);
        try {
          const data = response.data;
          if (data.state === "success") {
            deliveryNotify.value = props.params.data.Status === '可交付';
            emit('updategrid');
          } else if (data.state === "error") {
            alert(data.message);
          } else if (data.state === "account_error") {
            alert(data.message);
            router.push("/");
          }
        } catch (error) {
          console.log(error);
        }
      }
      function checkButton() {
        if (!RentProcess_New_Status.includes(status)) {
          isDisabled.new = true;
        }
        if (!RentProcess_NotifyConfirm_Status.includes(status)) {
          isDisabled.deliveryNotify = true;
        }
        if (!RentProcess_Confirm_Status.includes(status)) {
          isDisabled.delivery = true;
        }
      }
      onMounted(() => {
        deliveryNotify.value = props.params.data.Status === '可交付';
        checkButton();
      });
      return {
        deliveryNotify,
        routeTo,
        changeStatus,
        isDisabled,
      };
    },
  };
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
    @include datagrid_inform_button;
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
    width: 80px;
     :hover {
      @include disabled_btn;
      width: 80px;
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
