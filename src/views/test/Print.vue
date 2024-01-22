<template>
  <button class="print_btn" @click="printDataGrid">列印</button>
</template>
  
<script setup>
import { onMounted , ref } from 'vue';
const props = defineProps(['datagrid']);

const grid_data = ref(null);
onMounted(()=>{
grid_data.value =  getData();
});
const printDataGrid = () => {
  // 開啟一個新的窗口進行列印
  const printWindow = window.open('', '_blank');
  // 創建列印友好的 HTML 模板
  const printContent = `
  <html>
    <head>
      <style>
      @media print {
          title, head {
            display: none;
          }
        }

        h2 {
          text-align: center;
        }

        .bottom_info_title {
          text-align: center;
          padding: 10px;
          border-right: 1px solid black;
          border-left: 1px solid black;
          font-weight: 700;
        }
        .print_info p{
          margin:5px 0
        }

        .info_wrap_top {
          display: flex;
          border: 1px solid black;
        }
        .info_wrap_bottom{
          display:flex; border-bottom: 1px solid black;   border-right: 1px solid black; border-left: 1px solid black;
        }

        .left_col {
          justify-content: center;
          width: 100px;
          text-align: center;
          border-right: 1px solid black;
          padding: 10px;
          display: flex;
          height: auto;
          align-items: center;
        }
        .info_wrap_bottom .left_col{
          height:100px
        }
        .right_col {
          padding: 5px 20px;
        }
      </style>
      <title>出貨簽收單</title>
    </head>
    <body>
      <h2>出貨簽收單</h2>
      <img src='https://www.bimfm.com.tw/image/logo.png' style='width: 180px; margin: 10px 0'>
      <div class='print_info' style='display: flex;flex-direction:column; gap: 0 20px;'>
        <p style='font-size: 14px'>單號：12345678902</p>
        <p style='font-size: 14px'>專案名稱：長佳TPKC資料中心IDC及MSC機房機電新建工程BIM服務</p>
        <p style='font-size: 14px'>廠商名稱：三星電子</p>
        <p style='font-size: 14px'>承辦人：蕭敬騰</p>
        <p style='font-size: 14px'>日期：2022/01/01</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
        <thead>
          <tr>
            <th style="border: 1px solid black; font-size: 12px;"></th>
            <th style="border: 1px solid black; font-size: 12px;">序號</th>
            <th style="border: 1px solid black;font-size:12px">物品名稱</th>
            <th style="border: 1px solid black;font-size:12px">廠商</th>
            <th style="border: 1px solid black;font-size:12px">型號</th>
            <th style="border: 1px solid black;font-size:12px">規格</th>
            <th style="border: 1px solid black;font-size:12px">數量</th>
            <th style="border: 1px solid black;font-size:12px">單位</th>
          </tr>
        </thead>
        <tbody>
          ${getPrintableData()}
        </tbody>
      </table>
      <div class='bottom_info_title'>請收貨單位驗收物品後填寫下欄，此簽收單由本公司收存</div>
      <div class='row info_wrap_top'>
        <div class='left_col'>
          簽收欄
        </div>
        <div class='col-auto right_col'>
          <p>以上貨物已於西元<span style='width: 60px; display: inline-block;'></span>年<span style='width: 60px; display: inline-block;'></span>月<span style='width: 60px; display: inline-block;'></span>日清點及交付無誤。</p>
          <p>收貨單位：</p>
          <p>收貨人簽章：</p>
        </div>
      </div>
      <div class='row info_wrap_bottom' >
        <div class=' left_col'>
          備註
        </div>
        <div class='col-auto right_col'>
        
        </div>
      </div>
    </body>
  </html>
`;

  // 將內容寫入新窗口
  printWindow.document.write(printContent);
  // 關閉文件以確保正確呈現
  printWindow.document.close();
  // 觸發列印功能
  printWindow.print();
};
const getPrintableData = () => {
  return grid_data.value
    .map(
      (item, index) => `
        <tr>
          <td style="border: 1px solid black; font-size: 12px;padding:5px;  text-align: center;">${(index + 1).toString().padStart(2, '0')}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.AssetsId}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.AssetName}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.Manufacturer}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.Model}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.Specification}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.Quantity}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.Unit}</td>
        </tr>
      `
    )
    .join('');
};
const getData = () => {
  // Generate sample data for demonstration
  return Array.from({ length: 5 }, (_, index) => ({
    SerialNumber: (index + 1).toString().padStart(2, '0'),
    AssetsId: 'BF00001186',
    AssetName: '滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠',
    Manufacturer: 'LG',
    Model: 'S156498',
    Specification: '黑色 100g',
    Quantity: 200,
    Unit: '模',
  }));
};

</script>


<style lang="scss" scoped>
@import "@/assets/css/global.scss";

button.print_btn {
  margin-left: 10px;
  @include search_and_send_btn;

  &:hover {
    background-color: #5e7aa2;
  }
}



</style>