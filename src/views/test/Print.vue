<template>
  <div>
    <div style="margin:20px 0;">
      <button class="print_btn" @click="printDataGrid">Print</button>
    </div>
    <table ref="dataGrid" title="Export DataGrid" style="width:900px;height:250px">
      <thead>
        <tr>
          <th data-options="field:'projectCode',width:120">專案代碼</th>
          <th data-options="field:'projectName',width:200">專案名稱</th>
          <th data-options="field:'negativeItems',width:150">負數差異的項目</th>
          <th data-options="field:'timestamp',width:150">輸出時間戳記</th>
          <th data-options="field:'listprice',width:90,align:'right'">資產編號</th>
          <!-- <th data-options="field:'recognizePersonnel',width:120">認列人員</th> -->
          <th data-options="field:'equipmentCategory',width:120">設備總類</th>
          <th data-options="field:'equipmentClassification',width:120">設備分類</th>
          <th data-options="field:'itemName',width:120">物品名稱</th>
          <!-- <th data-options="field:'storageArea',width:120">儲位區域</th>
            <th data-options="field:'storageCabinet',width:120">儲位櫃位</th> -->
          <th data-options="field:'expectedInventory',width:80,align:'right'">應盤</th>
          <th data-options="field:'actualInventory',width:80,align:'right'">實盤</th>
          <th data-options="field:'difference',width:80,align:'right'">差異</th>
          <th data-options="field:'unit',width:80">單位</th>
        </tr>
      </thead>
    </table>
  </div>
</template>
  
<script>
  // import "@/assets/js/print.js"
  export default {
    mounted() { // Load jquery.easyui.min.js script
      const jqueryScript = document.createElement("script");
      jqueryScript.setAttribute("src", "https://code.jquery.com/jquery-3.7.1.js");
      document.head.appendChild(jqueryScript);
      const easyuiScript = document.createElement("script");
      easyuiScript.setAttribute("src", "http://www.jeasyui.com/easyui/jquery.easyui.min.js");
      document.head.appendChild(easyuiScript);
      // Load jquery-3.7.1.js script
      // Load icon.css stylesheet
      const iconLink = document.createElement("link");
      iconLink.setAttribute("rel", "stylesheet");
      iconLink.setAttribute("type", "text/css");
      iconLink.setAttribute("href", "http://www.jeasyui.com/easyui/themes/icon.css");
      document.head.appendChild(iconLink);
      // Load icon.css stylesheet
      const iconLinkcss = document.createElement("link");
      iconLink.setAttribute("rel", "stylesheet");
      iconLink.setAttribute("type", "text/css");
      iconLink.setAttribute("href", "http://www.jeasyui.com/easyui/themes/default/easyui.css");
      document.head.appendChild(iconLinkcss);
      const checkEasyUIInterval = setInterval(() => {
        if ($.fn.datagrid) {
          clearInterval(checkEasyUIInterval);
          this.initializeDataGrid();
        }
      }, 100);
    },
    methods: {
      initializeDataGrid() {
        // Initialize the data grid
        $(this.$refs.dataGrid).datagrid({
          rownumbers: true,
          singleSelect: true,
          data: this.getData(),
        });
      },
      printDataGrid() {
        // Open a new window for printing
        const printWindow = window.open('', '_blank');
        // Create a print-friendly HTML template
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
          <title>打印表格</title>
        </head>
        <body>
          <div style='display: flex;
      gap: 0 20px;'>
          <p style='font-size: 14px'>專案代碼:12345678902</p>
          <p style='font-size: 14px'>專案名稱:長佳TPKC資料中心IDC及MSC機房機電新建工程BIM服務</p>
          <p style='font-size: 14px'>製表人名稱:蕭敬騰</p></div>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
            <thead>
              <tr>
                <th style="border: 1px solid black; font-size: 12px;">專案代碼</th>
                <th style="border: 1px solid black; font-size: 12px;">專案名稱</th>
                <th style="border: 1px solid black; font-size: 12px;">負數差異的項目</th>
                <th style="border: 1px solid black; font-size: 12px;">輸出時間戳記</th>
                <th style="border: 1px solid black;font-size:12px">資產編號</th>
                <th style="border: 1px solid black;font-size:12px">設備總類</th>
                <th style="border: 1px solid black;font-size:12px">設備分類</th>
                <th style="border: 1px solid black;font-size:12px">物品名稱</th>
                <th style="border: 1px solid black;font-size:12px">應盤</th>
                <th style="border: 1px solid black;font-size:12px">實盤</th>
                <th style="border: 1px solid black;font-size:12px">差異</th>
                <th style="border: 1px solid black;font-size:12px">單位</th>
              </tr>
            </thead>
            <tbody>
              ${this.getPrintableData()}
            </tbody>
          </table>
        </body>
      </html>
    `;
        // Write the content to the new window
        printWindow.document.write(printContent);
        // Close the document to ensure proper rendering
        printWindow.document.close();
        // Trigger the print function
        printWindow.print();
      },
      getPrintableData() {
        const data = this.getData();
        return data
          .map(
            (item) => `
          <tr>
            <td style="border: 1px solid black; font-size: 12px;padding:5px">${item.projectCode}</td>
            <td style="border: 1px solid black; font-size: 12px;padding:5px">${item.projectName}</td>
            <td style="border: 1px solid black; font-size: 12px;padding:5px">${item.negativeItems}</td>
            <td style="border: 1px solid black; font-size: 12px;padding:5px">${item.timestamp}</td>
            <td style="border: 1px solid black;font-size:12px;padding:5px">${item.listprice}</td>
            <td style="border: 1px solid black;font-size:12px;padding:5px">${item.equipmentCategory}</td>
            <td style="border: 1px solid black;font-size:12px;padding:5px">${item.equipmentClassification}</td>
            <td style="border: 1px solid black;font-size:12px;padding:5px">${item.itemName}</td>
            <td style="border: 1px solid black;font-size:12px;padding:5px">${item.expectedInventory}</td>
            <td style="border: 1px solid black;font-size:12px;padding:5px">${item.actualInventory}</td>
            <td style="border: 1px solid black;font-size:12px;padding:5px">${item.difference}</td>
            <td style="border: 1px solid black;font-size:12px;padding:5px">${item.unit}</td>
          </tr>
        `
          )
          .join('');
      },
      getData() {
        // Generate random data for demonstration
        return Array.from({
          length: 55
        }, () => ({
          projectCode: 'P1234567890',
          projectName: '長佳TPKC資料中心IDC及MSC機房機電新建工程BIM服務',
          negativeItems: '滑鼠',
          timestamp: '2023-01-10 12:34:56',
          listprice: 'BF00001186',
          // recognizePersonnel: '-',
          equipmentCategory: '電腦設備類假資料',
          equipmentClassification: '顯示器',
          itemName: '滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠滑鼠',
          storageArea: '3A辦公空間',
          storageCabinet: '技術總監辦公室',
          expectedInventory: 200,
          actualInventory: 199,
          difference: -1,
          unit: '模',
        }));
      },
    },
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