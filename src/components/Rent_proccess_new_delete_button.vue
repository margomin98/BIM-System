<template>
  <div class='button_wrap'>
    <button class='btn' @click="Delete()">刪除</button>
  </div>
</template>

<script>
  export default {
    setup(props) {
      function Delete() {
        // API將物品還回去之後，將物品從資料中刪除

        //API here
        AddToInventory();
        props.params.deleteMaterial(props.params.data)
        //之後刪掉
        // const rowNode = props.params.node;
        // props.params.api.applyTransaction({remove: [rowNode.data]});
      }
      async function AddToInventory() {
        const axios = require('axios');
        const requestData = {
          OM_id: props.params.data.OM_id,
          AssetsId: props.params.data.AssetsId,
          OM_Number: props.params.data.OM_Number,
        }
        try {
          const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/AddToInventory', requestData);
          const data = response.data;
          if (data.state === 'success') {
            console.log('刪除暫存結果:' +data);
            props.params.deleteMaterial(props.params.data)
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
.button_wrap{
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