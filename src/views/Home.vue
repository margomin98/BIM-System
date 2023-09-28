<template>
  <Navbar/>
  <div class="chart">
    <ag-charts-vue  style="height: 650px" :options="options"></ag-charts-vue>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue';
  import {
    AgChartsVue
  } from "ag-charts-vue3";

  const data = [
  { type: '在庫物件數', count: 35 },
  { type: '等待申請數', count: 20 },
  { type: '入庫件數', count: 5 },
  { type: '出庫件數', count: 12 },

];


  export default {
  components: {
    AgChartsVue,
    Navbar
  },
  data() {
    const numFormatter = new Intl.NumberFormat('en-US');
    const total = data.reduce((sum, d) => sum + d['count'], 0);

    return {
      options: {
        autoSize: true,
        data,
        title: {
          text: '倉庫即時數據',
          fontSize:55,
          color:'#132238',
          spacing: 25,
        },
        // footnote: {
        //   text: 'Source: Home Office',
        // },
        background: {
            fill: '#73a1b282',
          }, 
          padding: {
            top: 50,
            right: 20,
            bottom:30,
            left: 20,
          },
        series: [
          {
            type: 'pie',
            calloutLabelKey: 'type',
            fillOpacity: 0.9,
            strokeWidth: 0,
            angleKey: 'count',
            sectorLabelKey: 'count',
            calloutLabel: {
              enabled: false,
            },
            
            sectorLabel: {
              color: 'white',
              fontWeight: 'bold',
              formatter: ({ datum, sectorLabelKey }) => {
                const value = datum[sectorLabelKey];
                return numFormatter.format(value);
              },
            },
            // title: {
            //   text: 'Annual Count',
            // },
            fills: [
              '#2A3C4F',
              '#364E68',
              '#79A8A9',
              '#132238',
            ],
            innerRadiusRatio: 0.5,
            innerLabels: [
              {
                text: numFormatter.format(total),
                fontSize: 30,
                fontWeight: 'bold',
              },
              {
                text: '件數',
                fontSize: 16,
              },
            ],
            highlightStyle: {
              item: {
                fillOpacity: 0,
                stroke: 'white',
                strokeWidth:2,
              },
            },
            // tooltip: {
            //   renderer: ({ datum, calloutLabelKey, title, sectorLabelKey }) => {
            //     return {
            //       title,
            //       content: `${datum[calloutLabelKey]}: ${numFormatter.format(
            //         datum[sectorLabelKey]
            //       )}`,
            //     };
            //   },
            // },
          },
        ],
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
  .custom-doughnut-label {
  /* Your custom styles for the doughnut labels */
  font-family: Arial, sans-serif;
  color: #333;
  font-size: 16px;
  /* Add any other styles you want */
}
</style>