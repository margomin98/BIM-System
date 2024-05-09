import { GetAntiForgeryToken } from '@/assets/js/common_api';
import router from '@/router';
import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  async config => {
    // 檢查請求的方法是否為 POST
    if (config.method === 'post') {
      if(config.url !== 'https://localhost:44302/Manage/GetAntiForgeryToken') {
        const token = await GetAntiForgeryToken();
        // console.log('攔截取得token成功',token);
        // 將 token 放入請求的 header 中
        config.headers['RequestVerificationToken'] = token;
      }
    }
    // console.log('攔截後config',config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async response => {
    const sourceUrl = response.config.url;
    // * ?no=y為檢查是否已登入的API才有的參數，如果返回account_error 不用alert跟導向
    if(response.data.state === 'account_error' && !sourceUrl.includes('/GetDBdata/GetApplicant?no=y')) {
      alert(response.data.messages);
      router.push({path: '/', query: {return: 'y'}});
    } else {
      return response;
    }
  }
)
export default axios;
