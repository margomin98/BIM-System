import axios from 'axios';
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
    const response = await axios.get('http://192.168.0.177:7008/GetParameter/GetEquipType');
    const data = response.data;
    if (data.state === 'success') {
      console.log('設備總類options:\n', data.resultList.EquipType);
      return data.resultList.EquipType;
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
export const getEquipCategory = (async (params) => {
  try {
    const response = await axios.get(`http://192.168.0.177:7008/GetParameter/GetEquipCategory?id=${params}`);
    const data = response.data;
    if (data.state === 'success') {
      console.log('設備分類options:\n', data.resultList.EquipCategory);
      return data.resultList.EquipCategory;
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
    const response = await axios.get('http://192.168.0.177:7008/GetParameter/GetAreaName');
    const data = response.data;
    if (data.state === 'success') {
      console.log('儲位區域options:\n', data.resultList.AreaName);
      return data.resultList.AreaName;
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
export const getLayer = (async (params)=> {
  try {
    const response = await axios.get(`http://192.168.0.177:7008/GetParameter/GetLayerName?id=${params}`);
    const data = response.data;
    if (data.state === 'success') {
      console.log('儲位櫃位options:\n', data.resultList.LayerName);
      return data.resultList.LayerName;
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
// 專案名稱
export const getProject = (async (params) => {
  const form = new FormData();
  form.append('projectCode', params);
  const response = await axios.post('http://192.168.0.177:7008/GetDBdata/SearchProjectName', form);
  try {
    const data = response.data;
    if (data.state === 'success') {
      return data.resultList;
    } else if (data.state === 'account_error') {
      alert(data.messages);
      router.push('/');
    } else {
      ProjectName.value = data.messages.toString()
    }
  } catch (error) {
    console.error('專案名稱取得失敗:',error);
  }
})