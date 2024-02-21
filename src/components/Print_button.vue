<template>
  <button class="print_btn" @click="printDataGrid">列印</button>
</template>
  
<script setup>
import { reactive, ref } from 'vue';
const props = defineProps(['datagrid','title']);
const title = reactive({
  pj_code: '',
  pj_name: '',
  person: '',
})
const grid_data = ref(null);
const printDataGrid = () => {
  // grid_data.value =  getData();
  grid_data.value =  props.datagrid;
  title.pj_code = props.title.pj_code || '';
  title.pj_name = props.title.pj_name || '';
  title.person = props.title.person || '';
  // 開啟一個新的窗口進行列印
  const printWindow = window.open('', '_blank');
  // 創建列印友好的 HTML 模板
  const printContent = `
  <html>
    <head>
      <style>
        @media print {
          title {
            display: none;
          }
        }
      </style>
        <title>採購項目報表</title>
    </head>
    <body>
      <div style='display: flex;gap: 0 20px;'>
        <p style='font-size: 14px'>製表人:<br>${ title.person }</p>
        <p style='font-size: 14px'>專案代碼:<br>${ title.pj_code }</p>
        <p style='font-size: 14px'>專案名稱:<br>${ title.pj_name }</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
        <thead>
          <tr>
            <th style="border: 1px solid black; font-size: 12px;">項目</th>
            <th style="border: 1px solid black; font-size:12px">序號</th>
            <th style="border: 1px solid black; font-size: 12px;">物品名稱</th>
            <th style="border: 1px solid black;font-size:12px">設備總類</th>
            <th style="border: 1px solid black;font-size:12px">設備分類</th>
            <th style="border: 1px solid black;font-size:12px">應盤</th>
            <th style="border: 1px solid black;font-size:12px">實盤</th>
            <th style="border: 1px solid black;font-size:12px">差異</th>
            <th style="border: 1px solid black;font-size:12px">單位</th>
          </tr>
        </thead>
        <tbody>
          ${getPrintableData()}
        </tbody>
      </table>
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
      (item,index) => `
        <tr>
          <td style="border: 1px solid black; font-size: 12px;padding:5px; text-align: center;">${(index + 1).toString().padStart(2, '0')}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.AssetsId}</td>
          <td style="border: 1px solid black; font-size: 12px;padding:5px">${item.AssetName}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.EquipTypeName}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px">${item.EquipCategoryName}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px; text-align: center;">${item.ReceivableNum}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px; text-align: center;">${item.ActualNum}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px; text-align: center;">${item.Discrepancy}</td>
          <td style="border: 1px solid black;font-size:12px;padding:5px; text-align: center;">${item.Unit}</td>
        </tr>
      `
    )
    .join('');
};
const getData = () => {
  // 生成用於演示的隨機數據
  return Array.from({
    length: 100
  }, () => ({
    AssetName: '滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠',
    AssetsId: 'BF00001186',
    EquipTypeName: '電腦設備類假資料',
    EquipCategoryName: '顯示器',
    ReceivableNum: 200,
    ActualNum: 199,
    Discrepancy: -1,
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