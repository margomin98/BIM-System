import axios from 'axios';
import router from '@/router';

// 申請人名稱 & Navbar 名稱
export const getApplication = (async ()=> {
  try {
    const response = await axios.get('http://192.168.0.177:7008/GetDBdata/GetApplicant');
    const data = response.data;
    if (data.state === 'success') {
      console.log('申請人名稱:', data.resultList.Applicant);
      return data.resultList.Applicant;
    } else if (data.state === 'error') {
      alert(data.messages);
    } else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    }
  } catch (error) {
    console.error('申請人取得失敗:',error);
  }
})
// 設備總類
export const getEquipType = (async ()=> {
  try {
    const response = await axios.get('http://192.168.0.177:7008/GetParameter/EquipTypeParameter');
    const data = response.data;
    if (data.state === 'success') {
      console.log('設備總類options:\n', data.resultList.TypeList);
      return data.resultList.TypeList;
    } else if (data.state === 'error') {
      alert(data.messages);
    } else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    }
  } catch (error) {
    console.error('總類取得失敗:',error);
  }
}) 
// 設備分類
export const getEquipCategory = (async (EquipType_Id) => {
  try {
    const response = await axios.get(`http://192.168.0.177:7008/GetParameter/EquipCategoryParameter?id=${EquipType_Id}`);
    const data = response.data;
    if (data.state === 'success') {
      console.log('設備分類options:\n', data.resultList.CategoryList);
      return data.resultList.CategoryList;
    } else if (data.state === 'error') {
      alert(data.messages);
    } else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    }
  } catch (error) {
    console.error('分類取得失敗:',error);
  }
})
// 儲位區域
export const getArea = (async () => {
  try {
    const response = await axios.get('http://192.168.0.177:7008/GetParameter/AreaParameter');
    const data = response.data;
    if (data.state === 'success') {
      console.log('儲位區域options:\n', data.resultList.AreaList);
      return data.resultList.AreaList;
    } else if (data.state === 'error') {
      alert(data.messages);
    } else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    }
  } catch (error) {
    console.error('區域取得失敗:',error);
  }
})
// 儲位櫃位
export const getLayer = (async (Area_Id)=> {
  try {
    const response = await axios.get(`http://192.168.0.177:7008/GetParameter/LayerParameter?id=${Area_Id}`);
    const data = response.data;
    if (data.state === 'success') {
      console.log('儲位櫃位options:\n', data.resultList.LayerList);
      return data.resultList.LayerList;
    } else if (data.state === 'error') {
      alert(data.messages);
    } else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    }
  } catch (error) {
    console.error('櫃位取得失敗:',error);
  }
}) 
// 取得人員List
export const getAcount = (async (name) => {
  const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/SearchName?name=${name}`);
  try {
    const data = response.data;
    if (data.state === 'success') {
      return data.resultList;
    }
  } catch (error) {
    console.error(error);
  }
})
// 專案名稱
export const getProject = (async (projectCode) => {
  const form = new FormData();
  form.append('projectCode', projectCode);
  const response = await axios.post('http://192.168.0.177:7008/GetDBdata/SearchProjectName', form);
  try {
    const data = response.data;
    if (data.state === 'success') {
      return data.resultList;
    } else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    } else {
      // 查無此專案代碼
      return data.messages.toString();
    }
  } catch (error) {
    console.error('專案名稱取得失敗:',error);
  }
})
// 檢視單筆資產資訊
export const getAssets = (async (AssetsId)=> {
  try {
    const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetAssetInfo?id=${AssetsId}`);
    const data = response.data;
    if (data.state === 'success') {
      console.log('資產資料:\n', data.resultList);
      return data.resultList;
    } else if (data.state === 'error') {
      // console.log(data.messages);
      throw new Error('查無此產編')
    } else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    }
  } catch (error) {
    // console.error(error);
  }
})