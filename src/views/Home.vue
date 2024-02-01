<template>
  <!-- 金額支出modal -->
  <div class="modal fade" id="amount_pie_modal" tabindex="-1" aria-labelledby="amount_pie_modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">金額支出詳情</h5>
          <div class="close_icon">
            <p type="button" data-bs-dismiss="modal" aria-label="Close">X</p>
          </div>
        </div>
        <div class="modal-body">
          <!-- <ag-charts-vue class="chart-container" :options="modalOptions"></ag-charts-vue>
          <div class="amount_text">
                  <p>總金額</p>
                  <p class="amount">100</p>
            </div>
     <div class="chart_data_table mt-3">
      <table>
  <tbody>
    <tr>
      <td class="details_name">電腦設備類</td>
      <td class="details_percentage">15%</td>
      <td class="details_amount">1,202</td>
    </tr>
    <tr>
      <td class="details_name">維修設備類</td>
      <td class="details_percentage">32.5%</td>
      <td class="details_amount">4,879</td>
    </tr>
    <tr>
      <td class="details_name">電腦設備類</td>
      <td class="details_percentage">5%</td>
      <td class="details_amount">4,555</td>
    </tr>
    <tr>
      <td class="details_name">耗材類</td>
      <td class="details_percentage">42%</td>
      <td class="details_amount">6,219</td>
    </tr>
  </tbody>
  </table>
     </div>   -->
          <div id="amount_pie" class="modal_pie"></div>
          <div class="amount_text d-flex">
            <p>總金額
              <p class="amount">100</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 件數modal -->
  <div class="modal fade" id="case_pie_modal" tabindex="-1" aria-labelledby="case_pie_modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">件數詳情</h5>
          <div class="close_icon">
            <p type="button" data-bs-dismiss="modal" aria-label="Close">X</p>
          </div>
        </div>
        <div class="modal-body">
          <!-- <ag-charts-vue class="chart-container" :options="modalOptions"></ag-charts-vue>
          <div class="amount_text">
                  <p>總件數</p>
                  <p class="amount">100</p>
            </div>
     <div class="chart_data_table mt-3">
      <table>
  <tbody>
    <tr>
      <td class="details_name">電腦設備類</td>
      <td class="details_percentage">15%</td>
      <td class="details_amount">1,202</td>
    </tr>
    <tr>
      <td class="details_name">維修設備類</td>
      <td class="details_percentage">32.5%</td>
      <td class="details_amount">4,879</td>
    </tr>
    <tr>
      <td class="details_name">電腦設備類</td>
      <td class="details_percentage">5%</td>
      <td class="details_amount">4,555</td>
    </tr>
    <tr>
      <td class="details_name">耗材類</td>
      <td class="details_percentage">42%</td>
      <td class="details_amount">6,219</td>
    </tr>
  </tbody>
  </table>
     </div>   -->
          <div id="case_pie" class="modal_pie"></div>
          <div class="amount_text d-flex">
            <p>總件數
              <p class="amount">100</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Navbar />
  <div class="row g-0 home_section">
    <div class="col-xl-auto col-lg-12 col-md-12 col-12 pt_left">
      <div class="user_line_wrap">
        <!-- 用戶名字 -->
        <div class="user_info">
          <div class="profile_icon">
            <img src="@/assets/manager_profile.png">
          </div>
          <div class="profile_name">
            <h4 class="name">Tony</h4>
          </div>
        </div>
        <!-- Lline通知 -->
        <div class="line_notification d-flex">
          <div class="line_title d-flex">
            <img src="@/assets/line.png">
            <p>LINE 通知設定</p>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          </div>
        </div>
      </div>
      <!-- 有代碼搜索框 -->
      <div class="code_search">
        <div class="search_section">
          <input type="text" placeholder="請輸入代碼">
          <button class="search_btn">搜尋</button>
        </div>
        <div class="search_result">
          <perfect-scrollbar>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap selected">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期第三期</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">148944568</p>
              <p class="case_name">中興_台電離岸風力發電第100000期XX</p>
            </div>
            <div class="result_wrap">
              <p class="case_code d-flex">1234568</p>
              <p class="case_name">中興_台電離岸風力發電第一期XX</p>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
      <!-- 沒有代碼搜索框 -->
      <!-- <div class="code_search with_search_input">
          <div class="search_result">
            <perfect-scrollbar>
              <div class="result_wrap">
                <p class="case_code d-flex">1234568</p>
                <p class="case_name">中興_台電離岸風力發電第一期XX</p>
              </div>
              <div class="result_wrap selected">
                <p class="case_code d-flex">1234568</p>
                <p class="case_name">中興_台電離岸風力發電第一期第三期</p>
              </div>
              <div class="result_wrap">
                <p class="case_code d-flex">1234568</p>
                <p class="case_name">中興_台電離岸風力發電第一期XX</p>
              </div>
              <div class="result_wrap">
                <p class="case_code d-flex">1234568</p>
                <p class="case_name">中興_台電離岸風力發電第一期XX</p>
              </div>
              <div class="result_wrap">
                <p class="case_code d-flex">1234568</p>
                <p class="case_name">中興_台電離岸風力發電第一期XX</p>
              </div>
              <div class="result_wrap">
                <p class="case_code d-flex">1234568</p>
                <p class="case_name">中興_台電離岸風力發電第一期XX</p>
              </div>
              <div class="result_wrap">
                <p class="case_code d-flex">148944568</p>
                <p class="case_name">中興_台電離岸風力發電第100000期XX</p>
              </div>
              <div class="result_wrap">
                <p class="case_code d-flex">1234568</p>
                <p class="case_name">中興_台電離岸風力發電第一期XX</p>
              </div>
            </perfect-scrollbar>
          </div>
        </div> -->
    </div>
    <div class="col pt_center">
      <div class="datagrid_section">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <!-- 總覽庫房資產 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link " id="home-tab" data-bs-toggle="tab" data-bs-target="#TotalProperty" type="button" role="tab" aria-controls="home" aria-selected="true">總覽庫房資產</button>
          </li>
          <!-- 待採購清單 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#PurchaseList" type="button" role="tab" aria-controls="profile" aria-selected="false">待採購清單</button>
          </li>
          <!-- 待交付資產列表 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#ProcessProperty" type="button" role="tab" aria-controls="contact" aria-selected="false">待交付資產列表</button>
          </li>
          <!-- 名下保管資產 -->
          <li class="nav-item" role="presentation">
            <button class="nav-link  active" id="contact-tab" data-bs-toggle="tab" data-bs-target="#organizeProperty" type="button" role="tab" aria-controls="contact" aria-selected="false">名下保管資產</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade TotalProperty" id="TotalProperty" role="tabpanel" aria-labelledby="home-tab">
            <div class="row dg_search_wrap">
              <!-- 資產類型 -->
              <div class="col">
                <p>資產類型</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select> </div>
              <!-- 資產狀態 -->
              <div class="col">
                <p>資產狀態</p>
                <select class="form-select" id="statusDropdown">
                        <option value="">請選擇</option>
                        <!-- <option v-for="(item, index) in DropdownArray.Status" :key="index" :value="item">{{ item }}</option> -->
                    </select>
              </div>
              <!-- 設備總類 -->
              <div class="col">
                <p>設備總類</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select> </div>
              <!-- 設備分類 -->
              <div class="col">
                <p>設備分類</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select>
              </div>
              <!-- 儲位區域 -->
              <div class="col">
                <p>儲位區域</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select>
              </div>
              <!-- 儲位櫃位 -->
              <div class="col">
                <p>儲位櫃位</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select>
              </div>
            </div>
            <div class="button_wrap">
              <button class="reset_btn">重設</button>
            </div>
            <div class="dg">
              dg
            </div>
          </div>
          <div class="tab-pane fade PurchaseList" id="PurchaseList" role="tabpanel" aria-labelledby="profile-tab">
            <div class="row dg_search_wrap">
              <!-- 採購項目 -->
              <div class="col-xl-auto col-lg-auto col-md col-12">
                <p>採購項目</p>
                <input type="text" placeholder="(模糊查詢)" />
              </div>
              <!-- 交貨期限(起) -->
              <div class="col-xl-auto col-lg-auto col-md col-12">
                <p>交貨期限(起)</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select>
              </div>
              <!-- 交貨期限(訖) -->
              <div class="col-xl-auto col-lg-auto col-md col-12">
                <p>交貨期限(訖)</p>
                <select class="form-select" id="statusDropdown">
                        <option value="">請選擇</option>
                        <!-- <option v-for="(item, index) in DropdownArray.Status" :key="index" :value="item">{{ item }}</option> -->
                    </select>
              </div>
              <div class="col-xl-auto col-lg-auto button_wrap">
                <button class="reset_btn">重設</button>
              </div>
              <div class="col-auto total_amount">
                <p>共計
                  <p class="total_number">100</p>件</p>
              </div>
            </div>
            <div class="dg">
              dg
            </div>
          </div>
          <div class="tab-pane fade ProcessProperty" id="ProcessProperty" role="tabpanel" aria-labelledby="contact-tab">
            <div class="warn_text">
              <p>
                *若未實際收到該資產而無法交付時，請按下拒絕交付後主動與指派人確認
              </p>
            </div>
            <div class="dg">
              dg
            </div>
          </div>
          <div class="tab-pane fade show active organizeProperty" id="organizeProperty" role="tabpanel" aria-labelledby="contact-tab">
            <div class="row dg_search_wrap">
              <!-- 資產狀態 -->
              <div class="col">
                <p>資產狀態</p>
                <select class="form-select" id="statusDropdown">
                        <option value="">請選擇</option>
                        <!-- <option v-for="(item, index) in DropdownArray.Status" :key="index" :value="item">{{ item }}</option> -->
                    </select>
              </div>
              <!-- 設備總類 -->
              <div class="col">
                <p>設備總類</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select> </div>
              <!-- 設備分類 -->
              <div class="col">
                <p>設備分類</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select>
              </div>
              <!-- 儲位區域 -->
              <div class="col">
                <p>儲位區域</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select>
              </div>
              <!-- 儲位櫃位 -->
              <div class="col">
                <p>儲位櫃位</p>
                <select class="date-input form-select">
                            <option value="" disabled selected>請選擇</option>
                            <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                        </select>
              </div>
              <!-- 資產編號 -->
              <div class="col">
                <p>資產編號</p>
                <input type="text" placeholder="(明確查詢)" />
              </div>
              <!-- 物品名稱 -->
              <div class="col">
                <p>物品名稱</p>
                <input type="text" placeholder="(模糊查詢)" />
              </div>
            </div>
            <div class="button_wrap">
              <button class="reset_btn">重設</button>
            </div>
            <div class="dg">
              dg
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-auto col-lg-12 col-md-12 col-12 pt_right">
      <!-- 警示消息窗口 -->
      <div class="warn_window">
        <div class="title">
          警示訊息
        </div>
        <div class="content">
          <perfect-scrollbar>
            <div class="warn_info">
              <p class="case_name">截止日期 2024/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2025/01/01 前，尚為完成文字文字文字文字文字文字文字......</p>
              <p class="case_name">截止日期 2025/01/01 前，尚為完成文字文字文字......</p>
              <p class="case_name">截止日期 2024/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2025/01/01 前，尚為完成文字文字文字......</p>
              <p class="case_name">截止日期 2024/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2025/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2024/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2025/01/01 前，尚為完成......</p>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
      <!-- 金額支出窗口 -->
      <div class="amount_chart">
        <div class="title">
          金額支出
          <button data-bs-toggle="modal" data-bs-target="#amount_pie_modal">詳情</button>
        </div>
        <div class="content d-flex">
          <div class="amount_info">
            <div class="chart">
              <div id="amount_window_pie" class="window_pie"></div>
            </div>
          </div>
          <div class="amount_text">
            <p>總金額</p>
            <p class="amount">100</p>
          </div>
        </div>
      </div>
      <!-- 件數窗口 -->
      <div class="case_chart">
        <div class="title">
          件數
          <button data-bs-toggle="modal" data-bs-target="#case_pie_modal">詳情</button>
        </div>
        <div class="content d-flex">
          <div class="case_info">
            <div class="chart">
              <ag-charts-vue class="chart-container" :options="options"></ag-charts-vue>
            </div>
          </div>
          <div class="case_text">
            <p>總件數</p>
            <p class="amount">100</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import JSCharting from 'jscharting-vue';
  import {
    onMounted,
    ref
  } from 'vue';
  import {
    AgChartsVue
  } from "ag-charts-vue3";
  import Navbar from '../components/Navbar.vue';
  import axios from 'axios';
  function getRandomColor() {
    // 隨機生成chart顔色
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  }
  export default {
    components: {
      AgChartsVue,
      Navbar,
      JSCharting
    },
    setup() {
      const total = ref(0);
      const rowData = ref([]);
      const options = ref({
        data: rowData.value,
        height: 150,
        width: 150,
        overlays: {
          noData: {
            renderer: () => '<p class="no_data" style="font-size:30px;font-weight:700;">無數據</p>'
          },
        },
        background: {
          fill: 'transparent',
        },
        series: [{
          fills: Array.from({
            length: 5
          }, () => getRandomColor()),
          strokes: ['white'],
          type: 'pie',
          angleKey: 'share',
          innerLabels: [{
            enabled: false,
          }],
          highlightStyle: {
            item: {
              fills: Array.from({
                length: 5
              }, () => getRandomColor()),
              stroke: 'white',
              strokeWidth: 2,
            },
          },
        }, ],
      });
      // modal的甜甜圈
      const modalTotal = ref(0);
      const modalRowData = ref([]);
      const modalOptions = ref({
        data: modalRowData.value,
        overlays: {
          noData: {
            renderer: () => '<p class="no_data" style="font-size:30px;font-weight:700;">無數據</p>'
          },
        },
        background: {
          fill: 'transparent',
        },
        series: [{
          fills: Array.from({
            length: 5
          }, () => getRandomColor()),
          strokes: ['white'],
          type: 'pie',
          angleKey: 'share',
          // labelKey: 'asset',
          calloutLabelKey: "asset",
          innerLabels: [{
              enabled: false,
            },
          ],
          highlightStyle: {
            item: {
              fills: Array.from({
                length: 5
              }, () => getRandomColor()),
              stroke: 'white',
              strokeWidth: 2,
            },
          },
        }, ],
        legend: {
          item: {
            marker: {
              shape: 'circle',
              size: 14,
            },
          },
          position: 'right',
        },
      });
      onMounted(() => {
        addRandomData(options, rowData, total);
        addRandomData(modalOptions, modalRowData, modalTotal);
      });
      function addRandomData(chartOptions, chartRowData, chartTotal) {
        const itemCount = 10; // Adjust as needed
        const randomData = [];
        const assetNames = ['耗材類', '維修設備類', '電腦設備類'];
        for (let i = 0; i < itemCount; i++) {
          const randomShare = Math.floor(Math.random() * 100); // Adjust range as needed
          const randomLabel = `Label ${i + 1}`; // Generate a random label
          const randomAsset = assetNames[i]; // Use the predefined asset names
          const item = {
            os: `Item ${i + 1}`,
            share: randomShare,
            label: randomLabel,
            asset: randomAsset, // Add the random asset name to the item
          };
          randomData.push(item);
          chartTotal.value += randomShare;
        }
        chartRowData.value = randomData;
        // Update chart options
        const newOptions = { ...chartOptions.value
        };
        newOptions.data = chartRowData.value;
        newOptions.series[0].innerLabels[0].text = chartTotal.value.toString();
        chartOptions.value = newOptions;
      }
      return {
        options,
        rowData,
        total,
        modalOptions,
        modalRowData,
        modalTotal,
      };
      // function getDetails() {
      //   axios.get('http://192.168.0.177:7008/GetParameter/GetDataOfWarehouse')
      //     .then((response) => {
      //       const data = response.data;
      //       if (data.state === 'success') {
      //         rowData.value = data.resultList;
      //         console.log('資料:', rowData.value);
      //         // 計算總件數
      //         rowData.value.forEach((item) => {
      //           total.value += item.share;
      //         })
      //       }
      //       const newOptions = { ...options.value
      //       };
      //       newOptions.data = rowData.value
      //       newOptions.series[0].innerLabels[0].text = total.value.toString()
      //       options.value = newOptions;
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     })
      // }
    },
    data() {
      return {
        amountpie: null,
        casepie: null,
        amountWindowPieChart: null,
      }
    },
    mounted() {
      this.initializeChart();
      this.initializeCasePieChart();
      this.initializeAmountWindowPieChart();
    },
    methods: {
      initializeChart() {
        const chartConfig = {
          debug: false,
          title_position: 'center',
          legend: {
            template: '%icon   %name    {%percentOfTotal:n1}%    %value',
            position: 'bottom',
          },
          defaultSeries: {
            type: 'pie',
            pointSelection: false,
          },
          // defaultPoint_label_text: '<b>%name</b>',
          yAxis: {
            label_text: '金額',
            formatString: 'n'
          },
          series: [{
            name: '占比',
            points: [{
                name: '電腦設備類',
                y: 30
              },
              {
                name: '維修保護類',
                y: 645
              },
              {
                name: '安裝類',
                y: 20
              },
              {
                name: '電子設備類',
                y: 540
              },
              {
                name: 'XX設備類',
                y: 282
              },
              {
                name: 'XX設備類',
                y: 60
              },
              {
                name: 'XXX類',
                y: 56
              },
              {
                name: 'XXX設備類',
                y: 58
              },
              {
                name: 'XX設備類',
                y: 58
              },
            ],
          }, ],
        };
        // 渲染pie
        this.amountpie = JSC.Chart('amount_pie', chartConfig);
      },
      initializeCasePieChart() {
        const caseChartData = this.generateRandomData();
        const caseChartConfig = {
          debug: false,
          title_position: 'center',
          legend: {
            template: '%icon   %name    {%percentOfTotal:n1}%    %value',
            position: 'bottom',
          },
          defaultSeries: {
            type: 'pie',
            pointSelection: false,
          },
          yAxis: {
            label_text: 'Cases',
            formatString: 'n'
          },
          series: [{
            name: 'Case Types',
            points: caseChartData,
          }, ],
        };
        this.casePieChart = JSC.Chart('case_pie', caseChartConfig);
      },
      initializeAmountWindowPieChart() {
      const amountWindowChartData = this.generateRandomData();

      const amountWindowChartConfig = {
        debug: false,
        chart: {
          fill:  "#FF0000"
        }
    ,
        legend: {
          visible:false
        },
        defaultSeries: {
          type: 'pie',
          pointSelection: false,
          seleted:false
        },
        // yAxis: { label_text: 'Amount Window', formatString: 'n' },
        series: [
          {
            
            name: 'Amount Window Types',
            points: amountWindowChartData,
          },
        ],
      };

      this.amountWindowPieChart = JSC.Chart('amount_window_pie', amountWindowChartConfig);
    },
    generateRandomData() {
      // Generate random data for the pie charts
      const categories = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'];
      return categories.map((category) => ({
        name: category,
        y: Math.floor(Math.random() * 100),
      }));
    },
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  $content_bg:#F4F4F4;
  $content_title_bg:#364E68;
  @mixin reset_btn {
    background-color: #364E68;
    color: white;
    font-weight: 700;
    border-radius: 15px;
    border: none;
    font-size: 18px;
    height: 40px;
    width: 70px;
  }
  .modal {
    .modal_pie {
      margin: auto
    }
    table {
      font-size: 18px;
      margin: auto;
      .details_name {
        text-align: right;
      }
      .details_percentage,
      .details_amount {
        text-align: right;
        width: 100px;
      }
      .details_amount::before {
        content: '$';
      }
    }
    .modal-header {
      h5 {
        font-weight: 700;
      }
      background:#528091;
      color: white;
      display: flex;
      justify-content: center;
      .close_icon {
        cursor: pointer;
        align-self: unset;
      }
      .modal-title {
        margin: auto;
      }
    }
    .amount_text {
      margin: auto;
      width: unset;
      p {
        font-size: 24px;
        width: unset;
        margin-bottom: 0;
      }
    }
  }
  .amount_text,
  .case_text {
    justify-content: center;
    gap: 0 10px;
    p {
      overflow-wrap: break-word;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      width: 100px;
    }
  }
  .amount_text .amount::before {
    content: '$';
  }
  .chart {
    height: 150px;
  }
  .dg {
    margin-top: 16px;
  }
  .nav-tabs,
  .nav-tabs .nav-link:hover,
  .nav-tabs .nav-link:focus,
  .nav-tabs .nav-link.active,
  .nav-tabs .nav-item.show .nav-link {
    border-color: transparent
  }
  .datagrid_section {
    .nav-link {
      padding: 6px 10px;
    }
    input,
    select {
      @include dropdown_btn;
      width: 100%;
      height: 35px;
      margin-top: 10px;
    }
    .TotalProperty,
    .organizeProperty {
      .button_wrap {
        display: flex;
        justify-content: center;
      }
    }
    .PurchaseList {
      .button_wrap {
        display: flex;
        align-items: end;
      }
      .total_amount {
        display: flex;
        justify-content: flex-end;
        align-items: end;
        p {
          display: flex;
          font-weight: 700;
        }
      }
    }
    .ProcessProperty .warn_text p {
      color: #E94B4B;
      font-weight: 700;
    }
    .tab-pane {
      border-radius: 0 10px 10px 10px;
      .dg_search_wrap {
        display: grid;
      }
      .button_wrap {
        .reset_btn {
          @include reset_btn;
          &:hover {
            background-color: #132238;
          }
        }
      }
    }
    li button.active,
    .active {
      background-color: $content_bg;
    }
    li button.active {
      font-weight: 800;
    }
    li button {
      color: white;
      border-radius: 10px 10px 0px 0px;
      border-right: 1px solid rgba(0, 0, 0, 0.50);
      background: #5C7897;
    }
  }
  .code_search .ps {
    display: flex;
    flex-direction: column;
  }
  .chart-container {
    width: 100%;
    height: 100%;
  }
  .donut-label {
    font-family: Arial, sans-serif;
    color: #333;
  }
  .home_section {
    background: rgba(90, 90, 90, 0.40);
    height: 100%;
    p {
      margin-bottom: 0;
    }
  }
  .form-check-input:focus,
  .form-select:focus {
    box-shadow: unset;
  }
  .user_info,
  .line_notification,
  .amount_chart,
  .case_amount,
  .warn_window,
  .search_section,
  .search_result,
  .warn_title {
    border-radius: 20px;
  }
  .search_section,
  .amount_chart .title,
  .case_chart .title,
  .warn_window .title {
    border-radius: 20px 20px 0 0;
  }
  .search_result {
    border-radius: 0 0 20px 20px;
  }
  .pt_left {
    display: inline-flex;
    flex-direction: column;
    .user_info {
      background-color: $content_bg;
      display: flex;
      align-items: center;
      .profile_name .name {
        font-weight: 700;
      }
    }
    .line_notification {
      background-color: #00C200;
      font-weight: bold;
      color: white;
      .form-check {
        display: flex;
        justify-content: end;
      }
      .form-check-input:checked {
        background-color: #1C4220;
        border-color: #1C4220;
      }
      .form-switch .form-check-input:focus {
        --bs-form-switch-bg: url(data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23dee2e6%27/%3e%3c/svg%3e);
      }
      .line_title {
        align-items: center;
        margin-right: auto;
      }
    }
    .code_search {
      .search_section {
        background-color: $content_title_bg;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        input {
          height: 40px;
          border-radius: 10px;
          border: none;
          width: 100%;
        }
        button {
          background: #132238;
          color: white;
          font-weight: 700;
          border-radius: 10px;
          border: none;
          &:hover {
            background-color: #5C7897;
          }
        }
      }
      .search_result {
        background-color: $content_bg;
        .result_wrap {
          background: #A7AFBB;
          border-radius: 10px;
        }
        .case_code {
          margin-bottom: 5px;
          font-size: 18px;
          &::before {
            content: '#';
            margin-right: 5px;
            content: '#';
            width: 25px;
            height: 25px;
            display: block;
            text-align: center;
            border-radius: 50%;
            background: white;
            color: var(--c4, #132238);
          }
        }
        .selected {
          color: white;
          border: 3px solid var(--home_hover, #3B6097);
          background: #363C45;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
    .with_search_input .search_result {
      border-radius: 20px;
    }
  }
  .pt_right {
    display: inline-flex;
    flex-direction: column;
    .warn_window {
      background-color: $content_bg;
      .title {
        background: #E94B4B;
        color: white;
        font-weight: 700;
        display: flex;
        align-items: center;
      }
      .content {
        p::before {
          content: '·';
          margin-right: 5px;
        }
      }
    }
    .amount_chart,
    .case_chart {
      .title {
        background-color: $content_title_bg;
        color: white;
        background-color: #364E68;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
        button {
          background: var(--c2, #98CCD3);
          border-radius: 15px;
          border: none;
          color: white;
          font-weight: 700;
          &:hover {
            background-color: #69a3ac;
          }
        }
      }
      .content {
        border-radius: 0 0 20px 20px;
        background: $content_bg;
        align-items: center;
      }
    }
  }
  @media only screen and (min-width: 1200px) and (max-width: 1999px) {
    .home_section {
      padding: 15px;
    }
    .tab-pane {
      padding: 16px;
      .dg_search_wrap {
        margin-bottom: 16px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 10px 0;
        grid-template-rows: 1fr 1fr;
        p {
          font-size: 18px
        }
      }
    }
    .PurchaseList .dg_search_wrap {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    .pt_left {
      margin-right: 15px;
      .user_info,
      .line_notification,
      .code_search {
        width: 270px;
      }
      .line_title {
        font-size: 18px;
      }
    }
    .pt_right {
      margin-left: 15px;
      .case_chart,
      .amount_chart,
      .warn_window {
        width: 250px;
      }
    }
  }
  @media only screen and (min-width: 1200px) {
    .modal-dialog {
      width: 700px;
    }
    .modal_pie {
      width: 100%;
      height: 100%
    }
    .PurchaseList .button_wrap .total_amount p,
    .ProcessProperty .warn_text p {
      font-size: 24px;
    }
    .tab-pane {
      padding: 16px;
      .dg_search_wrap {
        margin-bottom: 16px;
        p {
          font-size: 18px
        }
      }
    }
    .TotalProperty,
    .PurchaseList,
    .organizeProperty {
      .dg_search_wrap {
        grid-template-rows: 1fr;
        display: grid;
      }
    }
    .TotalProperty .dg_search_wrap {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .PurchaseList .dg_search_wrap {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    .organizeProperty .dg_search_wrap {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .datagrid_section {
      li button.active,
      li button {
        font-size: 18px;
      }
    }
    .code_search .ps {
      height: 485px;
      gap: 16px 0;
    }
    .with_search_input .search_result .ps {
      height: 556px;
    }
    .warn_window .ps {
      height: 225px;
    }
    .chart-container {
      width: 100%;
      height: 100%;
    }
    .donut-label {
      font-size: 16px;
    }
    .home_section {
      padding: 30px;
    }
    .pt_left {
      margin-right: 32px;
      gap: 16px 0;
      .user_line_wrap {
        gap: 16px 0;
        display: grid;
      }
      .user_info {
        width: 320px;
        height: 105px;
        padding: 16px;
        .profile_name .name {
          margin-left: 20px;
        }
      }
      .line_notification {
        width: 320px;
        height: 60px;
        padding: 15px;
        font-size: 22px;
        .line_title {
          gap: 0 5px;
        }
      }
      .code_search {
        width: 320px;
        .search_section {
          padding: 10px 20px;
          height: 70px;
          gap: 0 20px;
          input {
            padding: 0 10px;
          }
          button {
            height: 40px;
            width: 70px;
            &:hover {
              background-color: #5C7897;
            }
          }
        }
        .search_result {
          padding: 16px;
          .result_wrap {
            padding: 10px;
          }
        }
      }
      .with_search_input .search_result {
        height: 588px;
      }
    }
    .pt_right {
      gap: 29px 0;
      margin-left: 32px;
    
    .window_pie {
      width: 150px;
      height: 100%
    }
      .warn_window {
        width: 252px;
        height: 310px;
        .title {
          padding: 10px;
          height: 60px;
          font-size: 24px;
        }
        .content {
          padding: 10px 10px 10px 15px;
          height: 250px;
        }
      }
      .amount_text,
      .case_text {
        width: 80px;
      }
      .amount_chart,
      .case_chart {
        height: 210px;
        width: 252px;
      }
      .amount_chart,
      .case_chart {
        .title {
          padding: 10px 13px;
          font-size: 24px;
          button {
            font-size: 18px;
            width: 70px;
            height: 40px;
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1024px) and (max-width: 1199px) {
    .modal-dialog {
      width: 700px;
    }
    .modal_pie {
      width: 100%;
      height: 100%
    }
    .PurchaseList .button_wrap .total_amount p,
    .ProcessProperty .warn_text p {
      font-size: 24px;
    }
    .tab-pane {
      padding: 16px;
      .dg_search_wrap {
        margin-bottom: 16px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 10px 0;
        grid-template-rows: 1fr 1fr;
        p {
          font-size: 18px
        }
      }
    }
    .code_search .ps {
      height: 485px;
      gap: 16px 0;
    }
    .with_search_input .search_result .ps {
      height: 556px;
    }
    .warn_window .ps {
      height: 225px;
    }
    .chart-container {
      width: 100%;
      height: 100%;
    }
    .home_section {
      padding: 20px;
    }
    .pt_left {
      gap: 16px 0;
      .user_line_wrap {
        gap: 20px;
        display: flex;
      }
      .user_info {
        width: 100%;
        height: 105px;
        padding: 16px;
        .profile_name .name {
          margin-left: 20px;
        }
      }
      .line_notification {
        width: 100%;
        padding: 15px;
        font-size: 22px;
        align-items: center;
        .line_title {
          gap: 0 5px;
          P {
            font-size: 20px;
          }
        }
      }
      .code_search {
        margin-bottom: 20px;
        .search_section {
          padding: 10px 20px;
          height: 70px;
          gap: 0 20px;
          input {
            padding: 0 10px;
          }
          button {
            height: 40px;
            width: 70px;
            &:hover {
              background-color: #5C7897;
            }
          }
        }
        .search_result {
          padding: 16px;
          .result_wrap {
            padding: 10px;
          }
        }
      }
      .with_search_input .search_result {
        height: 588px;
      }
    }
    .pt_center {
      margin-bottom: 20px;
    }
    .pt_right {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      gap: 0 20px;
      .warn_window {
        .title {
          padding: 10px;
          height: 60px;
          font-size: 24px;
        }
        .content {
          padding: 10px 10px 10px 15px;
          height: 150px;
        }
        .ps {
          height: 130px;
        }
      }
      .amount_chart,
      .case_chart {
        .title {
          padding: 10px 13px;
          font-size: 24px;
          button {
            font-size: 18px;
            width: 70px;
          }
        }
        .content {
          height: auto;
          justify-content: center;
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    .modal-dialog {
      width: 700px;
      padding: 0;
    }
    .modal_pie {
      width: 100%;
      height: 100%
    }
    .PurchaseList .button_wrap .total_amount p,
    .ProcessProperty .warn_text p {
      font-size: 24px;
    }
    .tab-pane {
      padding: 16px;
      .dg_search_wrap {
        margin-bottom: 16px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 10px 0;
        grid-template-rows: 1fr 1fr;
        p {
          font-size: 18px
        }
      }
    }
    .code_search .ps {
      height: 485px;
      gap: 16px 0;
    }
    .warn_window .ps {
      height: 225px;
    }
    .chart-container {
      width: 100%;
      height: 100%;
    }
    .home_section {
      padding: 20px;
    }
    .pt_left {
      gap: 16px 0;
      .user_line_wrap {
        gap: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
      }
      .user_info {
        height: 105px;
        padding: 16px;
        .profile_name .name {
          margin-left: 20px;
        }
      }
      .line_notification {
        padding: 15px;
        font-size: 22px;
        align-items: center;
        .line_title {
          gap: 0 5px;
          P {
            font-size: 20px;
          }
        }
      }
      .code_search {
        margin-bottom: 20px;
        .search_section {
          padding: 10px 20px;
          height: 70px;
          gap: 0 20px;
          input {
            padding: 0 10px;
          }
          button {
            height: 40px;
            width: 70px;
            &:hover {
              background-color: #5C7897;
            }
          }
        }
        .search_result {
          padding: 16px;
          .result_wrap {
            padding: 10px;
          }
        }
      }
      .with_search_input .search_result {
        height: 588px;
      }
    }
    .pt_center {
      margin-bottom: 20px;
    }
    .pt_right {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      gap: 0 20px;
      .warn_window {
        .title {
          padding: 10px;
          height: 60px;
          font-size: 24px;
        }
        .content {
          padding: 10px 10px 10px 15px;
          height: 150px;
        }
        .ps {
          height: 130px;
        }
      }
      .amount_chart,
      .case_chart {
        .title {
          padding: 10px 13px;
          font-size: 24px;
          button {
            font-size: 18px;
            width: 70px;
          }
        }
        .content {
          height: auto;
          justify-content: center;
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .modal-dialog {
      padding: 0;
    }
    .modal_pie {
      overflow: scroll;
    }
    .home_section {
      padding: 20px;
    }
    .tab-pane {
      padding: 15px;
      .dg_search_wrap {
        margin-bottom: 8px;
      }
      .dg_search_wrap {
        display: flex;
        gap: 10px 0;
      }
      margin-bottom: 20px;
    }
    .pt_left {
      gap: 16px 0;
      .user_line_wrap {
        display: flex;
        flex-direction: column;
        gap: 16px 0;
      }
      .user_info {
        padding: 10px 16px;
        .profile_name .name {
          margin-left: 20px;
        }
      }
      .line_notification {
        padding: 15px;
        font-size: 22px;
        align-items: center;
        .line_title {
          gap: 0 5px;
          P {
            font-size: 20px;
          }
        }
      }
      .code_search {
        margin-bottom: 20px;
        .ps {
          height: 250px;
          gap: 16px 0;
        }
        .search_section {
          padding: 10px 20px;
          height: 70px;
          gap: 0 20px;
          input {
            padding: 0 10px;
          }
          button {
            height: 40px;
            width: 70px;
            &:hover {
              background-color: #5C7897;
            }
          }
        }
        .search_result {
          padding: 16px;
          .result_wrap {
            padding: 10px;
          }
        }
      }
      .with_search_input .search_result {
        height: 588px;
      }
    }
    .pt_center {
      .datagrid_section {
        ul {
          overflow-x: auto;
          overflow-y: hidden;
          flex-wrap: nowrap;
          li {
            button {
              white-space: nowrap;
            }
          }
        }
      }
    }
    .pt_right {
      display: flex;
      flex-direction: column;
      gap: 20px 0;
      .warn_window {
        .title {
          padding: 10px;
          height: 60px;
          font-size: 24px;
        }
        .content {
          padding: 10px 10px 10px 15px;
          height: 150px;
        }
        .ps {
          height: 130px;
        }
      }
      .amount_chart,
      .case_chart {
        .title {
          padding: 10px 13px;
          font-size: 24px;
          button {
            font-size: 18px;
            width: 70px;
          }
        }
        .content {
          height: auto;
          justify-content: center;
        }
      }
    }
  }
</style>