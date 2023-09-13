<template>
  <Navbar/>
  <div class="chart">
    <ag-charts-vue style="height: 650px" :options="options"></ag-charts-vue>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue';
  import {
    AgChartsVue
  } from "ag-charts-vue3";
  export default {
    components: {
      AgChartsVue,
      Navbar
    },
    data: function() {
      return {
        options: {
          
          data: [{
              os: '在庫物件數',
              share: 35
            },
            {
              os: '等待申請數',
              share: 20
            },
            {
              os: '入庫件數',
              share: 20
            },
            {
              os: '出庫件數',
              share: 30
            },
          ],
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
                padding: 10
              }
            },
          },
          series: [{
            fills: [
              '#98CCD3',
              '#79A8A9',
              '#79A8A9',
              '#4B6F70',
            ],
            strokes: ['white'],
            type: 'pie',
            calloutLabelKey: 'os',
            angleKey: 'share',
            innerRadiusRatio: 0.50,
            sectorLabelKey: 'share',
            title: {
              text: '倉庫即時數據',
              fontSize: 40,
              spacing: 40,
              color: '#132238'
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
          }, ],
        },
        
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