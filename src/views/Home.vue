<template>
  <Navbar />
  <div class="chart">
    <ag-charts-vue style="height: 650px" :options="options" ref="agCharts"></ag-charts-vue>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { AgChartsVue } from "ag-charts-vue3";
import Navbar from '../components/Navbar.vue';
import axios from 'axios';
export default {
  components: {
    AgChartsVue,
    Navbar
  },
  setup() {
    const agCharts = ref(null);
    const total = ref(0);
    const rowData = ref([
      {
        "os": "在庫件數",
        "share": 313
      },
      {
        "os": "內部使用件數",
        "share": 0
      },
      {
        "os": "借測件數",
        "share": 0
      },
      {
        "os": "報修件數",
        "share": 3
      }
    ]);
    const options = ref({
      data: rowData.value,
      padding: {
        top: 50,
        right: 20,
        bottom: 20,
        left: 20,
      },
      background: {
        fill: '#73a1b282',
      },
      legend: {
        spacing: 60,
        item: {
          toggleSeriesVisible: false,
          paddingX: 40,
          label: {
            fontWeight: 'bold',
            maxLength: 25,
            fontSize: 20,
          },
          marker: {
            shape: 'circle',
            padding: 10,
          },
        },
      },
      series: [
        {
          fills: ['#98CCD3', '#79A8A9', '#79A8A9', '#4B6F70'],
          strokes: ['white'],
          type: 'pie',
          calloutLabelKey: 'os',
          angleKey: 'share',
          innerRadiusRatio: 0.50,
          innerLabels: [
            {
              text: total.value.toString(),
              fontSize: 30,
              fontWeight: 'bold',
            },
            {
              text: '件數',
              fontSize: 30,
              fontWeight: 'bold',
            },
          ],
          sectorLabelKey: 'share',
          title: {
            text: '倉庫即時數據',
            fontSize: 40,
            spacing: 40,
            color: '#132238',
          },
          sectorLabel: {
            fontSize: 30,
            color: 'white',
            fontWeight: 'bold',
          },
          highlightStyle: {
            item: {
              fill: '#18191a',
              stroke: 'whtie',
              strokeWidth: 1.5,
            },
          },
        },
      ],
    });
    onMounted(() => {
      getDetails();
      console.log('ag api:', agCharts.value);
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
          agCharts.value.options = options.value
        })
        .catch((error) => {
          console.error(error);
        })
    }
    return {
      agCharts,
      options,
    };
  },
}
</script>

<style lang="scss" scoped>
.chart {
  margin-top: 5%;
  padding: 0 5%;
}

.donut-label {
  /* Your custom styles for the donut chart labels */
  font-family: Arial, sans-serif;
  color: #333;
  font-size: 16px;
  /* Add any other styles you want */
}
</style>