<template>
  <Navbar />
  <div class="row g-0 home_section">
    <div class="col-auto pt_left">
      <div class="user_info">
        2</div>
      <div class="line_notification">
        1
      </div>
      <div class="code_search">
        <div class="search_section">
          <input type="text">
          <button class="search_btn">搜尋</button>
        </div>
        <div class="search_result">
          <div class="result_wrap">
            <p class="case_code">1234568</p>
            <p class="case_name">中興_台電離岸風力發電第一期XX</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col pt_center">
      <div class="datagrid_section">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link " id="home-tab" data-bs-toggle="tab" data-bs-target="#TotalProperty" type="button" role="tab" aria-controls="home" aria-selected="true">總覽庫房資產</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#PurchaseList" type="button" role="tab" aria-controls="profile" aria-selected="false">待採購清單</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#ProcessProperty" type="button" role="tab" aria-controls="contact" aria-selected="false">待交付資產列表</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="contact-tab" data-bs-toggle="tab" data-bs-target="#organizeProperty" type="button" role="tab" aria-controls="contact" aria-selected="false">名下保管資產</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade" id="TotalProperty" role="tabpanel" aria-labelledby="home-tab">
            <div class="row dg_search_wrap">
              <!-- 資產類型 -->
              <div class="col-xl-2  col-lg-2 col-md-6 col-12">
                <p>資產類型</p>
                <select class="date-input form-select">
                      <option value="" disabled selected>請選擇</option>
                      <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                  </select> </div>
              <!-- 資產狀態 -->
              <div class="col-xl-2  col-lg-2 col-md-6 col-12">
                <p>資產狀態</p>
                <select class="form-select" id="statusDropdown">
                  <option value="">請選擇</option>
                  <!-- <option v-for="(item, index) in DropdownArray.Status" :key="index" :value="item">{{ item }}</option> -->
              </select>
              </div>
              <!-- 設備總類 -->
              <div class="col-xl-2  col-lg-2 col-md-6 col-12">
                <p>設備總類</p>
                <select class="date-input form-select">
                      <option value="" disabled selected>請選擇</option>
                      <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                  </select> </div>
              <!-- 設備分類 -->
              <div class="col-xl-2  col-lg-2 col-md-6 col-12">
                <p>設備分類</p>
                <select class="date-input form-select">
                      <option value="" disabled selected>請選擇</option>
                      <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                  </select>
              </div>
              <!-- 儲位區域 -->
              <div class="col-xl-2  col-lg-2 col-md-6 col-12">
                <p>儲位區域</p>
                <select class="date-input form-select">
                      <option value="" disabled selected>請選擇</option>
                      <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                  </select>
              </div>
              <!-- 儲位櫃位 -->
              <div class="col-xl-2  col-lg-2 col-md-6 col-12">
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
          <div class="tab-pane fade show" id="PurchaseList" role="tabpanel" aria-labelledby="profile-tab">
            <div class="row dg_search_wrap">
              <!-- 採購項目 -->
              <div class="col-xl-2  col-lg-2 col-md-6 col-12">
                <p>採購項目</p>
                <input type="text" placeholder="(模糊查詢)" />
              </div>
              <!-- 交貨期限(起) -->
              <div class="col-xl-2  col-lg-2 col-md-6 col-12">
                <p>交貨期限(起)</p>
                <select class="date-input form-select">
                      <option value="" disabled selected>請選擇</option>
                      <!-- <option v-for="category in DropdownArray.DateCategory" :key="category" :value="category">{{ category }}</option> -->
                  </select>
              </div>
              <!-- 交貨期限(訖) -->
              <div class="col-xl-2  col-lg-2 col-md-6 col-12">
                <p>交貨期限(訖)</p>
                <select class="form-select" id="statusDropdown">
                  <option value="">請選擇</option>
                  <!-- <option v-for="(item, index) in DropdownArray.Status" :key="index" :value="item">{{ item }}</option> -->
              </select>
              </div>
              <div class="col-xl-2 button_wrap">
                <button class="reset_btn">重設</button>
              </div>
              <div class="col total_amount">
             <p>共計<p class="total_number">100</p>件</p>
             </div>
            </div>
            <div class="dg">
              dg
            </div>
          </div>
          <div class="tab-pane fade" id="ProcessProperty" role="tabpanel" aria-labelledby="contact-tab">
          <div class="warn_text">
          <p>
            *若未實際收到該資產而無法交付時，請按下拒絕交付後主動與指派人確認
          </p>
          </div>
            <div class="dg">
              dg
            </div>
          </div>
          <div class="tab-pane fade active" id="organizeProperty" role="tabpanel" aria-labelledby="contact-tab">
         
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
    <div class="col-auto pt_right">
      <div class="warn_window">
        <div class="title">
          警示訊息
        </div>
        <div class="content">
          <perfect-scrollbar>
            <div class="warn_info">
              <p class="case_name">截止日期 2024/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2025/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2024/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2025/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2024/01/01 前，尚為完成......</p>
              <p class="case_name">截止日期 2025/01/01 前，尚為完成......</p>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
      <div class="amount_chart">
        <div class="title">
          金額支出
          <button>詳情</button>
        </div>
        <div class="content">
          <div class="amount_info">
            1
            <!-- <div class="chart">
      <ag-charts-vue class="chart-container" :options="options"></ag-charts-vue>
    </div> -->
          </div>
        </div>
      </div>
      <div class="case_chart">
        <div class="title">
          件數
          <button>詳情</button>
        </div>
        <div class="content">
          <div class="case_info">
            1
            <!-- <div class="chart">
      <ag-charts-vue class="chart-container" :options="options"></ag-charts-vue>
    </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      Navbar
    },
    setup() {
      const total = ref(0);
      const rowData = ref([]);
      const options = ref({
        height: 700,
        data: rowData.value,
        padding: {
          top: 50,
          bottom: 40,
        },
        overlays: {
          noData: {
            renderer: () => '<p class="no_data" style="font-size:30px;font-weight:700;">無數據</p>'
          },
        },
        background: {
          fill: '#73a1b282',
        },
        legend: {
          spacing: 40,
          item: {
            toggleSeriesVisible: false,
            paddingX: 30,
            label: {
              fontWeight: '900',
              fontSize: 20,
            },
            marker: {
              shape: 'circle',
              padding: 10,
              size: 20,
              strokeWidth: 0
            },
          },
        },
        series: [{
          fills: Array.from({
            length: 5
          }, () => getRandomColor()),
          strokes: ['white'],
          type: 'pie',
          calloutLabelKey: 'os',
          angleKey: 'share',
          innerRadiusRatio: 0.40,
          rotation: -50,
          innerLabels: [{
              text: total.value.toString(),
              fontSize: 35,
              color: '#132238',
              fontWeight: 'bold',
            },
            {
              text: '件數',
              color: '#132238',
              fontSize: 20,
              fontWeight: 'bold',
            },
          ],
          calloutLabel: {
            fontSize: 18,
            fontWeight: '600',
            color: '#000000'
          },
          calloutLine: {
            strokeWidth: 2,
            colors: ['#ffffff']
          },
          title: {
            text: '倉庫即時數據',
            fontSize: 45,
            spacing: 40,
            fontWeight: 'bold',
            color: '#132238',
          },
          sectorLabelKey: 'share',
          sectorLabel: {
            fontSize: 23,
            color: 'white',
            fontWeight: 'bold',
          },
          highlightStyle: {
            item: {
              fill: '#283441',
              stroke: 'white',
              strokeWidth: 2,
            },
          },
        }, ],
      });
      onMounted(() => {
        getDetails();
      });
      function getDetails() {
        axios.get('http://192.168.0.177:7008/GetParameter/GetDataOfWarehouse')
          .then((response) => {
            const data = response.data;
            if (data.state === 'success') {
              rowData.value = data.resultList;
              console.log('資料:', rowData.value);
              // 計算總件數
              rowData.value.forEach((item) => {
                total.value += item.share;
              })
            }
            const newOptions = { ...options.value
            };
            newOptions.data = rowData.value
            newOptions.series[0].innerLabels[0].text = total.value.toString()
            options.value = newOptions;
          })
          .catch((error) => {
            console.error(error);
          })
      }
      return {
        options,
        rowData,
        total,
      };
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  $content_bg:#F4F4F4;
  $content_title_bg:#364E68;
  @mixin rest_btn {
    background-color: #364E68;
    padding: 0 20px;
    color: white;
    font-weight: 700;
    border-radius: 15px;
    border: none;
    font-size: 18px;
    height: 40px;
  }
  .dg {
    margin-top: 16px;
  }

  .datagrid_section {
    input,
    select {
      @include dropdown_btn;
      width: 100%;
      height: 35px;
      margin-top: 10px;
    }
    #TotalProperty,#organizeProperty {
      .button_wrap {
        display: flex;
        justify-content: center;
      }
    }
    #PurchaseList{
      .button_wrap{
        display: flex;
    align-items: end;
      }
    .total_amount{
      display: flex;
    justify-content: flex-end;
    align-items: end;
    p{
      display: flex;
      font-size: 24px;
      font-weight: 700;
    }
    }
    }
    #ProcessProperty .warn_text p{
      color: #E94B4B;
font-size: 24px;
font-weight: 700;
    }
    .tab-pane {
      padding: 16px;
      border-radius: 0 10px 10px 10px;
      .dg_search_wrap {
        margin-bottom: 16px;
      }
      .button_wrap {
        .reset_btn {
          @include rest_btn;
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
  }
  .ps {
    height: 225px;
  }
  .chart {
    margin-top: 6%;
    padding: 0 5%;
  }
  .chart-container {
    width: 100%;
    height: 100%;
  }
  .donut-label {
    /* Your custom styles for the donut chart labels */
    font-family: Arial, sans-serif;
    color: #333;
    font-size: 16px;
    /* Add any other styles you want */
  }
  @media only screen and (max-width: 767px) {
    .chart {
      margin-bottom: 5%;
    }
  }
  .home_section {
    padding: 32px;
    gap: 0 32px;
    background: rgba(90, 90, 90, 0.40);
    height: 100%;
    p {
      margin-bottom: 0;
    }
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
  .search_result,
  .amount_chart .content,
  .case_chart .content,
  .warn_window .content {
    border-radius: 0 0 20px 20px;
  }
  .pt_left {
    display: inline-flex;
    flex-direction: column;
    gap: 16px 0;
    .user_info {
      background-color: $content_bg;
      width: 320px;
      height: 105px;
    }
    .line_notification {
      background-color: #00C200;
      width: 320px;
      height: 60px;
    }
    .code_search {
      width: 320px;
      .search_section {
        background-color: $content_title_bg;
        padding: 20px;
        width: 100%;
      }
      .search_result {
        background-color: $content_bg;
        height: 100%;
        padding: 16px;
        height: 518px;
        .result_wrap {
          padding: 10px;
          background: #A7AFBB;
          border-radius: 10px;
        }
      }
    }
  }
  .pt_right {
    display: inline-flex;
    flex-direction: column;
    gap: 29px 0;
    .warn_window {
      background-color: $content_bg;
      width: 252px;
      height: 310px;
      .title {
        background: #E94B4B;
        padding: 10px;
        height: 60px;
        color: white;
        font-size: 24px;
        font-weight: 700;
        display: flex;
        align-items: center;
      }
      .content {
        padding: 10px 10px 10px 15px;
        height: 250px;
        p::before {
          content: '·';
          margin-right: 5px;
        }
      }
    }
    .amount_chart,
    .case_amount {
      height: 210px;
    }
    .amount_chart,
    .case_chart {
      .title {
        background-color: $content_title_bg;
        padding: 10px 13px;
      }
      .content {
        background: $content_bg;
      }
    }
  }
</style>