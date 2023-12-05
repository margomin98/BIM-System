<template>
  <div class='button_div'>
    <button class='btn' @click="Delete()">刪除</button>
  </div>
</template>

<script>
import { GetAntiForgeryToken } from '@/assets/js/common_api';

  export default {
    props: ['params'],
    setup(props, {emit}) {
      function Delete() {
        // API將物品還回去之後，扣除已備料數量

        //API here
        AddToInventory();
      }
      async function AddToInventory() {
        const axios = require('axios');
        const requestData = {
          OM_id: props.params.data.OM_id,
          AssetsId: props.params.data.AssetsId,
          OM_Number: props.params.data.OM_Number,
        }
        try {
          const token = await GetAntiForgeryToken();
          const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/AddToInventory', requestData , {
            headers:{
              'RequestVerificationToken': token,
            }
          });
          const data = response.data;
          if (data.state === 'success') {
            console.log('刪除暫存結果:' +data);
            // props.params.deleteMaterial(props.params.data)
            emit('deleteMaterial',props.params.data);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
          else {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      return {
        Delete,
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
.button_div{
   display:flex;
  align-items:center;

.btn{
  @include delete_button;
  height: 25px;
   &:hover {
      background: #FF7272
    }
}

.disabled_btn{
  @include disabled_btn;
  height: 25px;
  width: 50px;
  &:hover{
      @include disabled_btn;
  width: 50px;
  }
}
}
</style>