<template>
  <div class="button_wrap">
    <button class="btn1" @click="routeTo('檢視')">檢視</button>
    <button @click="routeTo('備料')" :class="{ disabled_btn2: isDisabled.new, btn2: !isDisabled.new }" :disabled="isDisabled.new">備料</button>
    <button @click="changeStatus" :class="{ disabled_btn3: isDisabled.deliveryNotify, btn3: !isDisabled.deliveryNotify }" :disabled="isDisabled.deliveryNotify">{{ deliveryNotify}}</button>
    <button @click="routeTo('交付')" :class="{ disabled_btn4: isDisabled.delivery, btn4: !isDisabled.delivery }" :disabled="isDisabled.delivery">交付</button>
  </div>
</template>

<script>
  import {
    onMounted,
    ref
  } from 'vue';
  import {
    useRouter
  } from "vue-router";
  export default {
    props: ["params", "refresh"],
    setup(props) {
      const router = useRouter();
      const search_id = props.params.data.AO_ID;
      const deliveryNotify = ref('通知交付');
      const isDisabled = ref({
        deliveryNotify: false, //通知交付
        delivery: false, //交付
        new: false, //備料
      });
      function routeTo(view) {
        switch (view) {
          case "檢視":
            router.push({
              name: "Rent_Process_View",
              query: {
                search_id,
              },
            });
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
        const response = await axios.get(
          `http://192.168.0.177:7008/AssetsOutMng/DeliveryNotification?ao_id=${search_id}`
        );
        try {
          const data = response.data;
          console.log(data);
          if (data.state === "success") {
            console.log(props.params);
            props.params.refresh();
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
        const disabledStatus = props.params.data.Status;
        if (disabledStatus === '待交付' || disabledStatus === '可交付') {
          isDisabled.value.deliveryNotify = false;
        } else {
          isDisabled.value.deliveryNotify = true;
        }
        if (disabledStatus === '可交付') {
          isDisabled.value.delivery = false;
        } else {
          isDisabled.value.delivery = true;
        }
        if (disabledStatus === '已填報') {
          isDisabled.value.new = false;
        } else {
          isDisabled.value.new = true;
        }
      }
      onMounted(() => {
        deliveryNotify.value = props.params.data.Status !== '可交付' ? '通知交付' : '暫停交付';
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
