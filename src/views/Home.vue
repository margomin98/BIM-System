<template>
  <Navbar/>
   <div class="chart">
    <ag-charts-vue style="height: 650px" :options="options"></ag-charts-vue>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { AgChartsVue } from "ag-charts-vue3";

export default {
components:{
  AgChartsVue,
  Navbar
},
data: function () {
  
             return {
              
                 options: {
                  data: [
        { os: '在庫物件數', share:35 },
        { os: '等待申請數', share: 20 },
        { os: '入庫件數', share: 20 },
        { os: '出庫件數', share: 30 },
        
      ],
      padding: {
    top:50,
    right: 20,
    bottom: 20,
    left: 20,
  },
  background: {
    fill: '#73a1b282',
  
  },
  legend: {

    item: {
      toggleSeriesVisible: false,
      paddingX: 10,
      label:{
        fontSize: 18,
      },
      marker: {
        padding:10,
      },
    },
  },
      series: [
  

        {
            
     fills: [
            '#98CCD3',
            '#79A8A9',
            '#79A8A9',
            '#4B6F70',
        ],
          strokes: ['white'],
          type: 'pie',
          
          fontSize:20,
          calloutLabelKey: 'os',
          angleKey: 'share',
          sectorLabelKey: 'share',
          title: {
            text: '倉庫即時數據',
            fontSize:40,
        spacing:40,   
       color:'#132238'
          },
      
            
                fontSize:30,
        
         
          sectorLabel: {
            fontSize:30,
            color: 'white',
            fontWeight: 'bold',
            
          },
         
          highlightStyle: {
                fontSize:30,
            
              item: {
                fill: '#18191a',
                stroke: 'whtie',
                strokeWidth:1.5,
              },
            },
          
        },
      ],
                    
                 },
             };
         },
}
</script>

<style lang="scss" scoped>
.chart{
  margin-top: 5%;
    padding: 0 5%;

}
</style>