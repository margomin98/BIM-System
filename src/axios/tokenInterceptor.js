import { GetAntiForgeryToken } from '@/assets/js/common_api';
import axios from 'axios';

axios.interceptors.request.use(
  async config => {
    // 檢查請求的方法是否為 POST
    if (config.method === 'post') {
      if(config.url !== '/Manage/GetAntiForgeryToken') {
        const token = await GetAntiForgeryToken();
        console.log('攔截取得token成功',token);
        // 將 token 放入請求的 header 中
        config.headers['RequestVerificationToken'] = token;
      }
    }
    console.log('攔截後config',config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
