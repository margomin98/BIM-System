<template>
  <div>
    <button type="button" class="btn btn-primary" @click="add()">+</button>
  </div>
</template>

<script>
import { GetAntiForgeryToken } from '@/assets/js/common_api';

  export default {
    props: ['params','selectedNumber','Number'],
    setup(props,{emit}) {
      function add() {
        const selectedNumber = props.selectedNumber;
        const Number = props.Number;
        if (numberIsValid(selectedNumber , Number)) {
          // API將物品從資料庫扣除後，更新rowData
          SubtractFromInventory();
        } else {
          if (!props.params.data.selectNumber) {
            alert('所選數量不得為零')
          } else {
            alert('所選數量超過所需數量上限');
          }
        }
      }
      const numberIsValid = (selectedNumber,Number) => {
        const data = props.params.data
        // 檢查選擇數量是否正常 1.超過 2.為零 3.正常執行
        if ((data.selectNumber + selectedNumber) > Number || !data.selectNumber ) {
          // 1. || 2.
          return false;
        }
        // 2. 正常執行
        return true;
      }
      async function SubtractFromInventory() {
        console.log(props.params.data);
        const axios = require('axios');
        const requestData = {
          item_id: props.params.data.item_id,
          AssetsId: props.params.data.AssetsId,
          OM_Number: props.params.data.selectNumber,
        }
        try {
          const token = await GetAntiForgeryToken();
          const response = await axios.post('http://192.168.0.177:7008/AssetsOutMng/SubtractFromInventory', requestData,{
            headers:{
              'RequestVerificationToken': token,
            }
          });
          const data = response.data;
          if (data.state === 'success') {
            console.log('暫存結果:' +data);
            // props.params.addMaterial(props.params.data);
            emit('addMaterial',props.params.data)
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          } else {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      return {
        add,
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  button {
    @include datagrid_edit_button;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    font-weight: 700;
    font-size: 20px;
    &:hover {
      background: #3B6162;
      color: white
    }
  }
</style>