<template>
  <Navbar />
  <div class="chart">
    <ag-charts-vue style="height: 650px" :options="options"></ag-charts-vue>
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
  export default {
    components: {
      AgChartsVue,
      Navbar
    },
    setup() {
      const total = ref(0);
      const rowData = ref([]);
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
            paddingX: 30,
            label: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            marker: {
              shape: 'circle',
              padding: 10,
            },
          },
        },
        series: [{
          fills: ['#98CCD3', '#79A8A9', '#4D6988', '#4B6F70', '#516D8B'],
          strokes: ['white'],
          type: 'pie',
          calloutLabelKey: 'os',
          angleKey: 'share',
          innerRadiusRatio: 0.50,
          innerLabels: [{
              text: total.value.toString(),
              fontSize: 30,
              fontWeight: 'bold',
            },
            {
              text: '件數',
              fontSize: 25,
              fontWeight: 'bold',
            },
          ],
          sectorLabelKey: 'share',
          title: {
            text: '倉庫即時數據',
            fontSize: 40,
            spacing: 60,
            color: '#132238',
          },
          sectorLabel: {
            fontSize: 25,
            color: 'white',
            fontWeight: 'bold',
          },
          highlightStyle: {
            item: {
              fill: '#18191a',
              stroke: 'whtie',
              strokeWidth: 1,
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