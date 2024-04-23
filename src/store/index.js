import axios from '@/axios/tokenInterceptor'
import { defineStore } from 'pinia'
import router from '@/router';
import { createDadagridObject } from '@/assets/js/common_fn';
// 所有通用的function、API、dropdownList
export const useUtilsStore = defineStore('Utils',{
  state: ()=>({
    isLoading: false,
    userName: '',
    userRoleId: null,
    today: '',
    imgExtensions: ['jpg', 'jpeg', 'png'],
    fileExtensions: ['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png'],
    BF_pattern: /^(BF\d{8})$/,
    imgId: 1,
    modalParams:{
      title: '',
      src: ''
    },
    // 給各個模組管理頁面使用
    dg: createDadagridObject(''),
    dgRowData: [],
    dgSearchParams: {
      ProjectCode: '',
      ProjectSelect: { Text: '--請選擇--',Value: '' },
    },
  }),
  getters: {
  },
  actions: {
    /**
     * 更新使用者名稱
     */
    async getUserName() {
      try {
        const response = await axios.get('http://192.168.0.177:7008/GetDBdata/GetApplicant');
        const data = response.data;
        if (data.state === 'success') {
          // console.log('申請人名稱:', data.resultList.Applicant);
          this.userName =  data.resultList.Applicant;
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (error) {
        console.error('申請人取得失敗:',error);
      }
    },
    // 回上一頁
    goBack() {
      window.history.back();
    },
    // 今天日期 yyyy-mm-dd
    getDate() {
      const today = new Date();
      let date = '';
      date += (today.getFullYear() + '/');
      date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
      date += ((today.getDate()).toString().padStart(2, '0'));
      this.today = date;
    },
    // 更新切頁資訊
    UpdatePageParameter( datagrid, event, type, form) {
      switch (type) {
        case 'sort':
          datagrid.currentPage = 1;
          datagrid.sortField = event.sortField;
          datagrid.sortOrder = event.sortOrder;
          datagrid.first = event.first;
          break;
        case 'page':
          datagrid.currentPage = (event.page+1);
          datagrid.rows = event.rows;
          datagrid.first = event.first;
          break
        case 'take':
        case 'search':
          datagrid.currentPage = 1;
          datagrid.first = 0;
          break
      }
      const order = datagrid.sortOrder === 1 ? 'asc' : 'desc'
      form.append('rows',datagrid.rows);
      form.append('page',datagrid.currentPage);
      form.append('sort',datagrid.sortField);
      form.append('order',order);
    },
    // 檢查頁籤必填
    checkTabRequired(tab = {}, checkList = {}, index) {
      let ErrorMessages = '';
      for(const key in checkList) {
        if(!tab[key]) {
          ErrorMessages += `頁籤${index+1} :　${checkList[key]}必填\n`;
        }
      }
      return ErrorMessages ;
    },
    // 檢查頁籤字數上限
    checkTabMaxLetter(tab = {}, maxLengthList = {}, index) {
      let ErrorMessages = '';
      for(const key in maxLengthList) {
        const { field, max } = maxLengthList[key];
        const regexPattern = new RegExp(`^[\\s\\S]{0,${max}}$`);
        if(!regexPattern.test(tab[key])) {
          ErrorMessages += `頁籤${index+1} :　${field}不可輸入超過${max}字\n`;
        }
      }
      return ErrorMessages ;
    },
    // 表單必填
    /**
     * 
     * @param {object} formParams Object that need to checked.
     * @param {string[]} checkList key list to check.
     * @param {object} fileParams if exists, then check.
     * @returns {boolean} Pass: true , Invalid: false
     */
    checkRequired(formParams = {}, checkList = [], fileParams) {
      let result = true;
      for(const key of checkList) {
        if(!formParams[key]) {
          console.log(key);
          alert('請輸入必填項目')
          result =  false;
          break
        }
      }
      if(fileParams) {
        if(fileParams.newDoc.length == 0 && fileParams.existDoc.length == 0) {
          alert('請上傳至少一份文件')
          result =  false;
        }
      }
      return result;
    },
    // 表單字數上限
    checkMaxLetter(formParams = {}, maxLengthList = {}) {
      for(const key in maxLengthList) {
        const { field, max } = maxLengthList[key];
        const regexPattern = new RegExp(`^[\\s\\S]{0,${max}}$`);
        if(!regexPattern.test(formParams[key])) {
          alert(`${field}不可輸入超過${max}字`);
          return false;
        }
      }
      return true;
    },
    // -----圖片相關
    // 方法一 (已上傳、未上傳分開)
    handleImgChange(event, formParams, LimitSize = 50, LimitLength = 5) {
      const files = event.target.files;
      // 檢查副檔名
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
        if (!this.imgExtensions.includes(fileExtension.toLowerCase())) {
          alert(fileExtension + '不在允許的格式範圍內，請重新選取');
          return;
        }
      }
      // 檢查圖片上限
      if (formParams.newFile.length + formParams.existFile.length + files.length > LimitLength) {
        alert('上傳至多5張圖片');
        return;
      }
      // 檢查圖片檔案上限
      if(!this.checkFileSize(files,formParams.newFile,false, LimitSize)) {
        return
      }
      // 
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const file = files[i]; // 保持原始文件
          formParams.newFile.push(file);
          formParams.viewFile.push({
            FileName: file.name,
            FileLink: URL.createObjectURL(file),
          });
        };
        reader.readAsDataURL(files[i]);
      }
    },
    deleteImgFile(type, formParams, file_index) {
      // 1.尚未上傳->從資料的new、view裡面刪掉
      // 2.已上傳->從資料的existFile裡面刪掉 、 將檔案名稱加入資料的deleteFile
      switch (type) {
        case 'new':
          formParams.newFile.splice(file_index, 1);
          formParams.viewFile.splice(file_index, 1);
          break;
        case 'exist':
          const fileName = formParams.existFile[file_index].FileName
          formParams.deleteFile.push(fileName);
          formParams.existFile.splice(file_index, 1);
        // console.log(`已加入頁籤${index}的deleteFile:\n${tabData[index].deleteFile}`);
        break;
      }
    },
    // 方法二 (使用輪播展示) 
    // ---->需要一個imgID來記錄push的時候作為檢索依據(因為將已上傳和未上傳放在同一個array，在deleteImgFile上會有問題)
    handleImgChange2(event, formParams, LimitSize = 50, LimitLength = 5){
      const files = event.target.files;
      // 檢查副檔名
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
        if (!this.imgExtensions.includes(fileExtension.toLowerCase())) {
          alert(fileExtension + '不在允許的格式範圍內，請重新選取');
          return;
        }
      }
      // 檢查圖片上限(與方法一稍微不同)
      if (formParams.viewFile.length + files.length > LimitLength) {
        alert(`上傳至多${LimitLength}張圖片`);
        return;
      }
      // 檢查圖片檔案上限
      if(!this.checkFileSize(files,formParams.newFile, true, LimitSize)) {
        return
      }
      // 加入FileId
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const file = files[i]; // 保持原始文件
          formParams.newFile.push({
            file: file,
            FileId: this.imgId,
          });
          formParams.viewFile.push({
            FileName: file.name,
            FileLink: URL.createObjectURL(file),
            FileType: 'new',
            FileId: this.imgId,
          });
          this.imgId++;
        };
        reader.readAsDataURL(files[i]);
      }
    },
    deleteImgFile2(file, formParams, file_index) {
      switch (file.FileType) {
        // 已上傳檔案 ->從輪播陣列刪除 & 加到deleteFile
        case 'exist':
          formParams.deleteFile.push(file.FileName);
          console.log('deleteFile', formParams.deleteFile);
          break;
          // 新上傳檔案 ->從輪播陣列刪除 & 從newFile移除
        case 'new':
          const newFileIndex = formParams.newFile.findIndex(item => item.FileId === file.FileId);
          formParams.newFile.splice(newFileIndex, 1);
          console.log('newFile', formParams.newFile);
          break;
      }
      formParams.viewFile.splice(file_index, 1);
    },
    // 查看圖片
    viewImgFile(file) {
      // 先提取副檔名
      // 以"."為基準分割字串
      const part = file.FileName.split(".");
      let extension = '';
      // 如果part長度大於1表示xxxx.aaa => ['xxxx','aaa']
      if (part.length > 1) {
        extension = part[part.length - 1];
      }
      // 1. pdf 2. word 3. picture
      switch (extension) {
        case 'pdf':
          window.open(file.FileLink)
          break;
        case 'doc':
        case 'docx':
          const downloadElement = document.getElementById('download-link');
          downloadElement.href = file.FileLink;
          downloadElement.download = file.FileName;
          downloadElement.click();
          break;
        default:
          this.modalParams.title = file.FileName ;
          this.modalParams.src = file.FileLink ;
          const modal = document.querySelector('#openModal');
          if(modal) {
            // 如果是文件上傳圖片，有trigger按鈕的話
            modal.click();
          }
          break;
      }

    },
    // -----
    // -----上傳檔案相關
    handleFileChange(event,formParams, LimitLength = 0, LimitSize = 28) {
      // ****參數說明: 呼叫函式使用object來包裝formParams，避免call by vlaue和key值不同的問題
      const newFile = formParams.newDoc;
      const viewFile = formParams.viewDoc;
      const existFile = formParams.existDoc;
      const files = event.target.files;
      // 文件通常不限件數，但如果有 就檢查
      if(LimitLength > 0) {
        console.log(newFile.length);
        if (newFile.length + existFile.length + files.length  > LimitLength) {
          alert(`上傳至多${LimitLength}個文件`);
          return;
        }
      }
      // 檢查副檔名 & 檔案大小
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
        if (!this.fileExtensions.includes(fileExtension.toLowerCase())) {
          alert(fileExtension + '不在允許的格式範圍內，請重新選取');
          return;
        }
        if (files[i].size > LimitSize * 1024 * 1024) {
          alert('檔案' + fileName + '大於28MB，請重新選取');
          return;
        }
      }
      // 處理檔案

      for (let i = 0; i < files.length; i++) {
        // 依據檔案格式 分為 1.圖片(可預覽) 2.pdf(可預覽) 3. doc/docx(可下載)
        const fileName = files[i].name;
        const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
        const reader = new FileReader();
        // .pdf/.doc/.docx
        if (fileExtension === 'pdf' || fileExtension === 'doc' || fileExtension == 'docx') {
          newFile.push(files[i]);
          viewFile.push({
            FileName: files[i].name,
            FileLink: URL.createObjectURL(files[i]),
            type: fileExtension,
          });
        }
        // 圖片
        else {
          reader.onload = (e) => {
            const file = files[i]; // 保持原始文件
            newFile.push(file);
            viewFile.push({
              FileName: file.name,
              FileLink: URL.createObjectURL(file),
              type: 'pic'
            });
          };
        }
        reader.readAsDataURL(files[i]);
      }
    },
    // -----
    // 檢查檔案大小
    checkFileSize(files,selectedFiles,exception = false,LimitSize = 50) {
      let new_size = 0;
      let select_size = 0;
      for (const img of files) {
        new_size+= img.size;
      }
      // file多包一層與否(未上傳、已上傳合再一起的會多一層)
      if(!exception) {
        for( const img of selectedFiles) {
          select_size+= img.size;
        }
      } else {
        for( const img of selectedFiles) {
          select_size+= img.file.size;
        }
      }
      // console.log('new size:', new_size);
      // console.log('selct size:', select_size);
      // 留 1Mb 給文字內容
      if(new_size+select_size> (LimitSize-1)*1024*1024) {
        alert(`所上傳的檔案總大小不可超過${LimitSize}MB,請重新選擇檔案`);
        return false ;
      }
      return true;
    },
    // 檢查權限
    checkRole(Applicant) {
      return new Promise(async(resolve, reject)=>{
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetRoleFromName?name=${this.userName}`);
          const data = response.data;
          // console.log('userName', this.userName);
          // console.log('Applicant',Applicant);
          if (data.state === 'success') {
            // 填寫人 = 查看人
            if(Applicant === this.userName) {
              resolve(true);
            }
            //權限正確
            else if (data.resultList.role.Id === 1 || data.resultList.role.Id === 4) {
              resolve(true);
            } 
            // 都不是
            else {
              resolve(false);
            }
          } 
          // 存取失敗
          else {
            // resolve(true); //測試用
            reject('get role failed');
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
    // 檢查單號狀態是否可進入(編輯、交付、刪除等需要鎖定狀態的頁面)
    canEnterPage(Status , Conditions) {
      if(!Conditions.includes(Status)) {
        window.history.back();
      }
    },
    // 清除搜尋內容(string 和 number)
    clearSearchParams(searchParams) {
      for(const key in searchParams) {
        const type = typeof searchParams[key]
        if (type === 'string') {
          searchParams[key] = ''
        } else if (type === 'number') {
          searchParams[key] = 1;
        }
      }
    },
    onDGProjectSelect(option){
      this.dgSearchParams.ProjectCode = option.Value;
    },
  },

})
export const useAPIStore = defineStore('API',{
  state: ()=>({
  }),
  getters: {
  },
  actions: {
    /**
     * 取得AntiForegeory Token
     * @returns {Promise<string>>} 返回AntiForegeory Token
     */
    async GetAntiForgeryToken() {
      try {
        const response = await axios.post('/Manage/GetAntiForgeryToken');
        if(response.data.state === 'account_error') {
          alert(response.data.messages);
          router.push('/');
        }
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    /**
     * 取得設備總類
     * @returns {Promise<Array<{Text: string, Value: string}>>} 返回設備總類Array
     */
    async getEquipType() {
      try {
        const response = await axios.get('http://192.168.0.177:7008/GetParameter/EquipTypeParameter');
        const data = response.data;
        if (data.state === 'success') {
          // console.log('設備總類options:\n', data.resultList.TypeList);
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
    },
    /**
     * 取得設備分類
     * @param {string} EquipType_Id 設備總類Id
     * @returns {Promise<Array<{Text: string, Value: string}>>} 返回設備分類Array
     */
    async getEquipCategory(EquipType_Id) {
      if(!EquipType_Id) { return []}
      try {
        const response = await axios.get(`http://192.168.0.177:7008/GetParameter/EquipCategoryParameter?id=${EquipType_Id}`);
        const data = response.data;
        if (data.state === 'success') {
          // console.log('設備總類options:\n', data.resultList.TypeList);
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
    },
    /**
     * 取得儲位區域
     * @returns {Promise<Array<{Text: string, Value: string}>>} 返回儲位區域Array
     */
    async getArea() {
      try {
        const response = await axios.get('http://192.168.0.177:7008/GetParameter/AreaParameter');
        const data = response.data;
        if (data.state === 'success') {
          // console.log('儲位區域options:\n', data.resultList.AreaList);
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
    },
    /**
     * 取得儲位櫃位
     * @param {string} Area_Id 儲位區域Id
     * @returns {Promise<Array<{Text: string, Value: string}>>} 返回儲位櫃位Array
     */
    async getLayer(Area_Id) {
      if(!Area_Id) { return []}
      try {
        const response = await axios.get(`http://192.168.0.177:7008/GetParameter/LayerParameter?id=${Area_Id}`);
        const data = response.data;
        if (data.state === 'success') {
          // console.log('儲位櫃位options:\n', data.resultList.LayerList);
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
    },
    /**
     * 取得員工列表-Enabled (現在在公司的員工)
     * @param {string} name 權限管理模糊搜尋使用，空字串帶入時為全在職員工列表
     * @returns {Promise<string[]>} 返回員工列表Array
     */
    async getCustodian(name='') {
      try {
        const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/SearchName?name=${name}`);
        const data = response.data;
        if (data.state === 'success') {
          const filteredRoles = data.resultList.filter(role => role !== 'admin' && role !== 'guest');
          return filteredRoles;
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * 取得員工列表-Not Enabled (包括已離職員工)
     * @returns {string[]} 返回員工列表Array
     */
    async getStaff() {
      try {
        const response = await axios.get(`http://192.168.0.177:7008/GetParameter/GetUsernames`);
        const data = response.data;
        if (data.state === 'success') {
          const filteredRoles = data.resultList.filter(role => role !== 'admin' && role !== 'guest');
          return filteredRoles;
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * 精準查詢專案名稱
     * @param {string} projectCode 專案代碼
     * @returns {Promise<string>} 專案名稱 or 無此專案代碼
     */    
    async getProject(projectCode) {
      const form = new FormData();
      form.append('projectCode', projectCode);
      try {
        const response = await axios.post('http://192.168.0.177:7008/GetDBdata/SearchProjectName', form);
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
    },
    /**
     * 取得權限下可看的專案下拉選單
     * @returns {Promise<Array<{Text: string, Value: string}>>} 返回專案列表Array
     */        
    async getFuzzyProject() {
      try {
        const response = await axios.get(`http://192.168.0.177:7008/GetParameter/GetProjects`);
        let data = response.data;
        console.log(data);
        if (data.state === 'success') {
          data.resultList.ProjList.splice(0,0,{Text:'--請選擇--' , Value: ''});
          return data.resultList.ProjList;
        } else {
          return [{Text:'--請選擇--' , Value: ''}]
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * 取得所有的專案下拉選單(僅快速出庫-新增可用)
     * @returns {Promise<Array<{Text: string, Value: string}>>} 返回專案列表Array
     */        
    async getFuzzyProjectAll() {
      try {
        const response = await axios.get(`http://192.168.0.177:7008/GetParameter/GetProjects?all=true`);
        let data = response.data;
        console.log(data);
        if (data.state === 'success') {
          data.resultList.ProjList.splice(0,0,{Text:'--請選擇--' , Value: ''});
          return data.resultList.ProjList;
        } else {
          return [{Text:'--請選擇--' , Value: ''}]
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * 檢查專案代碼是否與資料庫重複
     * @param {Array} projectCodeList 要檢查的專案代碼Array
     * @returns {Promise<string>} "success" | error_message
     */   
    async checkProjectCode(projectCodeList) {
      return new Promise((resolve, reject) => {
        axios.post('http://192.168.0.177:7008/GetDBdata/CheckProjectCode', projectCodeList)
          .then(response => {
            const data = response.data;
            if (data.state === 'success') {
              resolve('success');
            } else {
              resolve(data.messages.toString());
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     * 取得物流單號列表
     * @param {string} ShipmentNum 可查詢單一結果
     * @returns {Promise<Array<{Text: string, Value: string}>>} 返回物流單號列表Array
     */   
    async getShipmentNum(ShipmentNum = '') {
      const axios = require('axios');
      const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/SearchShipmentNum?id=${ShipmentNum}`);
      try {
        let data = response.data;
        if (data.state === 'success') {
          // console.log('物流單號查詢結果', data.resultList);
          data.resultList.splice(0,0,{ShipmentNum:'--請選擇--' , AR_ID: ''});
          return data.resultList;
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        } else {
          alert(data.messages);
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * 取得Datagrid
     * @param {string} url 查詢的api url
     * @param {object} datagrid 用來決定datagrid loading開關
     * @param {string} form 查詢的條件
     * @returns {Promise<Array<object>>} 返回Datagrid
     */   
    async getMngDatagrid(url, datagrid, form) {
      datagrid.loading = true;
      const baseUrl = 'http://192.168.0.177:7008';
      let apiurl = baseUrl + url;
      try {
        const token = await this.GetAntiForgeryToken();
        const response = await axios.post(apiurl, form);
        const data = response.data;
        if (data.state === 'success') {
          console.log('datagrid', data.resultList);
          // rowData = data.resultList.rows;
          // datagrid.totalRecords = data.resultList.total;
          // datagrid.key++;
          return data.resultList;
        } else if (data.state === 'account_error') {
          //尚未登入
          alert(data.messages);
          router.push('/');
        } else {
          //取得datagrid失敗
          alert(data.messages);
        }
      } catch (error) {
        console.error(error);
      } finally {
        datagrid.loading = false;
      }
    },
    /**
     * 取得資產資料
     * @param {string} AssetsId 資產ID
     * @returns {Promise<Object>} 返回資產資料Object
     */       
    async getAssetData(AssetsId) {
      try {
        const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetAssetInfo?id=${AssetsId}`);
        const data = response.data;
        if (data.state === 'success') {
          console.log('資產資料:\n', data.resultList);
          return data.resultList;
        } else if (data.state === 'error') {
          alert(data.messages);
        } else if (data.state === 'account_error') {
          alert(data.messages);
          router.push('/');
        }
      } catch (e) {
        console.error(e);
      }
    },
    /**
     * @typedef userObject 驗證之使用者
     * @property {string} userName 使用者名稱
     * @property {string} userPassword 使用者密碼
     * @property {string} resultName 驗證結果
     * @property {boolean} isValidate 是否驗證成功
     */

    /**
     * 驗證人員(除了出庫情況)，並改變user驗證結果
     * @param {userObject} user 使用者Obejct
     */        
    async validateUser(user) {
      const requestData = {
        userName: user.userName,
        userPassword: user.userPassword,
        id: user.id,
      }
      const form = new FormData;
      for (const key in requestData) {
        form.append(key, requestData[key]);
      }
      //
      try {
        const response = await axios.post('http://192.168.0.177:7008/Account/IdentityValidation', form);
        const data = response.data;
        if (data.state === 'success') {
          user.isValidate = true;
          user.resultName = user.userName;
        } else if (data.state === 'error') {
          alert(data.messages);
          user.isValidate = false;
          user.resultName = '未驗證';
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * 查詢User權限Id(0:訪客(無法登入系統) 1:系統管理員 2.設備工程師 3:倉管人員 4.主管 5.收貨人員)
     * @param {string} userName 使用者名稱
     * @returns {Promise<number | string>} 成功返回roleId, 失敗返回異常訊息
     */   
    async getRoleId(userName) {
      return new Promise(async(resolve, reject)=>{
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetRoleFromName?name=${userName}`);
          const data = response.data;
          // console.log('userName', this.userName);
          // console.log('Applicant',Applicant);
          if (data.state === 'success') {
            resolve(data.resultList.role.Id);
          } 
          // 存取失敗
          else {
            reject(data.messages);
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
    /**
     * 查詢User權限名稱
     * @param {string} userName 使用者名稱
     * @returns {Promise<number | string>} 成功返回roleId, 失敗返回異常訊息
     */   
    async getRoleName(userName) {
      return new Promise(async(resolve, reject)=>{
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetDBdata/GetRoleFromName?name=${userName}`);
          const data = response.data;
          // console.log('userName', this.userName);
          // console.log('Applicant',Applicant);
          if (data.state === 'success') {
            resolve(data.resultList.role.Name);
          } 
          // 存取失敗
          else {
            reject(data.messages);
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
    /**
     * 取得權限的下拉選單(全部的)
     * @returns {Promise<string[]>} 返回所有帳號權限種類Array
     */
    async getRoleOption() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get('http://192.168.0.177:7008/GetParameter/GetRoles');
          const data = response.data ;
          if(data.state === 'success') {
            console.log(data.resultList.RoleList);
            resolve (data.resultList.RoleList);
          }
        } catch(e) {
          console.error(e);
        }
      });
    },
    /**
     * 檢查使用者在指定頁面是否有瀏覽權限
     * @param {string} permissionName 權限名稱(資料庫)
     * @returns {Promise<boolean | string> } 成功: 返回boolean，失敗: 返回error_massage
     */
    async checkPermission(permissionName) {
      return new Promise(async(resolve, reject)=>{
        try {
          const response = await axios.get(`http://192.168.0.177:7008/GetParameter/HasPermission?id=${permissionName}`);
          const data = response.data;
          if (data.state === 'success') {
            resolve (data.resultList) ;
          } 
        } catch(e) {
          console.error(e);
          resolve (false) ;
        }
      });
    },

  }
})
