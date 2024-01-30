<template>
  <Navbar />
  <div class="row g-0 home_section">
  <div class="col pt_left">
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
<div class="dg_section">12</div>
  </div>
  <div class="col pt_right">
  <div class="warn_window">2</div>
  <div class="amount_chart"></div>
  <div class="case_chart"></div>
  </div>
  </div>
  <!-- <div class="chart">
    <ag-charts-vue class="chart-container" :options="options"></ag-charts-vue>
  </div> -->
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
          fills: Array.from({ length: 5 }, () => getRandomColor()), 
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
.home_section{
  padding:32px;
  background: rgba(90, 90, 90, 0.40);
  height: 100%;
  p{
    margin-bottom: 0;
  }
}
.user_info,.line_notification,.amount_chart,.case_amount,.warn_window,.search_section,.search_result{
  border-radius: 20px;
}
.pt_left{
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;

  .user_info{
    background-color: white;
    width: 320px;
    height: 105px;
  }
  .line_notification{
    background-color:#00C200 ;
    width: 320px;
    height: 60px;
  }
  .code_search{
    width: 320px;   
    .search_section{
   background-color: #132238; 
padding: 20px;
    width: 100%;

  border-radius :20px 20px 0 0;
    }
.search_result{
  background-color:#F4F4F4;
  height: 100%;
  padding: 16px;
  border-radius :0 0 20px 20px;
  height: 518px;
  .result_wrap{
    padding: 10px;
    background: #A7AFBB;
    border-radius: 10px;
  }
}
 }
 }
</style>