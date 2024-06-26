import axios from '@/axios/tokenInterceptor'
import router from '@/router';
// 取得 AntiForgery Token
export const GetAntiForgeryToken = async () => {
  try {
    const response = await axios.post('https://localhost:44302/Manage/GetAntiForgeryToken');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// 取得資料單
export const getDetails = (async (url,id)=>{
  const response = await axios.get(`https://localhost:44302${url}${id}`);
  try {
    const data = response.data;
    if (data.state === 'success') {
      // console.log(data.resultList);
      return Promise.resolve(data.resultList);
    }
  } catch (error) {
    console.error(error);
  }
})
// 管理頁面datagrid
export const getMngDatagrid = (async (url , rowData, datagrid,form)=>{
  datagrid.loading = true;
  try {
    const baseUrl = 'https://localhost:44302'
    let apiurl = baseUrl + url
    axios.post(`${apiurl}`, form)
    .then((response)=>{
      const data = response.data;
      if (data.state === 'success') {
        console.log('datagrid', data.resultList);
        rowData.value = data.resultList.rows;
        datagrid.totalRecords = data.resultList.total;
        datagrid.key++;
      } else {
        //取得datagrid失敗
        alert(data.messages);
      }
    })
    .catch((error)=>{
      console.error(error);
    })
  } catch (error) {
    console.error('Get Datagrid Error:', error);
  } finally {
    datagrid.loading = false;
  }
})
// 申請人名稱 & Navbar 名稱
export const getApplication = (async ()=> {
  try {
    const response = await axios.get('https://localhost:44302/GetDBdata/GetApplicant');
    const data = response.data;
    if (data.state === 'success') {
      console.log('申請人名稱:', data.resultList.Applicant);
      return data.resultList.Applicant;
    } else if (data.state === 'error') {
      alert(data.messages);
    }
  } catch (error) {
    console.error('申請人取得失敗:',error);
  }
})
// 設備總類
export const getEquipType = (async ()=> {
  try {
    const response = await axios.get('https://localhost:44302/GetParameter/EquipTypeParameter');
    const data = response.data;
    if (data.state === 'success') {
      // console.log('設備總類options:\n', data.resultList.TypeList);
      return data.resultList.TypeList;
    } else if (data.state === 'error') {
      alert(data.messages);
    }
  } catch (error) {
    console.error('總類取得失敗:',error);
  }
}) 
// 設備分類
export const getEquipCategory = (async (EquipType_Id) => {
  try {
    const response = await axios.get(`https://localhost:44302/GetParameter/EquipCategoryParameter?id=${EquipType_Id}`);
    const data = response.data;
    if (data.state === 'success') {
      // console.log('設備分類options:\n', data.resultList.CategoryList);
      return data.resultList.CategoryList;
    } else if (data.state === 'error') {
      alert(data.messages);
    }
  } catch (error) {
    console.error('分類取得失敗:',error);
  }
})
// 儲位區域
export const getArea = (async () => {
  try {
    const response = await axios.get('https://localhost:44302/GetParameter/AreaParameter');
    const data = response.data;
    if (data.state === 'success') {
      // console.log('儲位區域options:\n', data.resultList.AreaList);
      return data.resultList.AreaList;
    } else if (data.state === 'error') {
      alert(data.messages);
    }
  } catch (error) {
    console.error('區域取得失敗:',error);
  }
})
// 儲位櫃位
export const getLayer = (async (Area_Id)=> {
  try {
    const response = await axios.get(`https://localhost:44302/GetParameter/LayerParameter?id=${Area_Id}`);
    const data = response.data;
    if (data.state === 'success') {
      // console.log('儲位櫃位options:\n', data.resultList.LayerList);
      return data.resultList.LayerList;
    } else if (data.state === 'error') {
      alert(data.messages);
    }
  } catch (error) {
    console.error('櫃位取得失敗:',error);
  }
}) 
// 取得人員List
export const getAccount = (async (name) => {
  const response = await axios.get(`https://localhost:44302/GetDBdata/SearchName?name=${name}`);
  try {
    const data = response.data;
    if (data.state === 'success') {
      const filteredRoles = data.resultList.filter(role => role !== 'admin' && role !== 'guest');
      return filteredRoles;
    }
  } catch (error) {
    console.error(error);
  }
})
// 專案名稱
export const getProject = (async (projectCode) => {
  const form = new FormData();
  form.append('projectCode', projectCode);
  const response = await axios.post('https://localhost:44302/GetDBdata/SearchProjectName', form);
  try {
    const data = response.data;
    if (data.state === 'success') {
      return data.resultList;
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
    const response = await axios.get(`https://localhost:44302/GetDBdata/GetAssetInfo?id=${AssetsId}`);
    const data = response.data;
    if (data.state === 'success') {
      console.log('資產資料:\n', data.resultList);
      return data.resultList;
    } else if (data.state === 'error') {
      // console.log(data.messages);
      throw new Error('查無此產編')
    }
  } catch (error) {
    // console.error(error);
  }
})
export const getRoleOption = (array)=> {
  axios.get('https://localhost:44302/GetParameter/GetRoles')
  .then((response)=>{
    const data = response.data;
    if (data.state === 'success') {
      console.log('get role option:' ,data.resultList.RoleList);
      array.value = data.resultList.RoleList;
    }
  })
  .catch((error)=>{
    console.error(error);
  })
}
// 檢查權限
export const checkRole = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`https://localhost:44302/GetDBdata/GetRoleFromName?name=${username}`);
      const data = response.data;

      if (data.state === 'success') {
        if (data.resultList.role.Id === 1 || data.resultList.role.Id === 4) {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        // resolve(true); //測試用
        reject('get role failed');
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};