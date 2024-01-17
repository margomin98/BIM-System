import axios from 'axios'
import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue';
export const useCounterStore = defineStore('counter', {
  // data
  state: () => ({ 
    count: 0,
    name: 'Eduardo',
    input: '',
    items: [],
  }),
  // computed
  getters: {
    // 依賴state
    double: state => state.count * 2,
    // 可從其他getters中取值
    doubleDouble() {
      return this.double*2
    },
  },
  // method
  actions: {
    radomizeCount() {
      this.count = Math.round(100 * Math.random())
    },
    async callApi() {
      axios.post('api/values',this.input.toString(),{
        headers: {
          'Content-Type': 'application/json',
      }
      })
      .then((r)=>{
        this.name = r.data.message;
        console.log(r.data);
      })
      .catch((e)=>{console.error(e);})
    }
  },
})

export const StorageStore = defineStore('Storage', {
    // data
    state: () => ({ 
      count: 0,
      name: 'Eduardo',
      input: '',
      items: [],
    }),
    // computed
    getters: {
      // 依賴state
      double: state => state.count * 2,
      // 可從其他getters中取值
      doubleDouble() {
        return this.double*2
      },
    },
    // method
    actions: {
      radomizeCount() {
        this.count = Math.round(100 * Math.random())
      },
      async callApi() {
        axios.post('api/values',this.input.toString(),{
          headers: {
            'Content-Type': 'application/json',
        }
        })
        .then((r)=>{
          this.name = r.data.message;
          console.log(r.data);
        })
        .catch((e)=>{console.error(e);})
      }
    },
})