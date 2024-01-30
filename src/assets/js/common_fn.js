import { reactive , ref } from "vue";
// 取得今日日期
export const getDate = (()=>{
  const today = new Date();
  var date = '';
  date += (today.getFullYear() + '/');
  date += ((today.getMonth() + 1).toString().padStart(2, '0') + '/');
  date += ((today.getDate()).toString().padStart(2, '0'));
  return date;
});
// 回上一頁
export const goBack = (()=> {
  window.history.back();
});
// 檢查必填
export const checkRequire = ((checkList,formParams,fileParams)=>{
  for(const key of checkList) {
    if(!formParams[key]) {
      alert('請輸入必填項目')
      return false;
    }
  }
  if(fileParams) {
    if(fileParams.newDoc.length == 0 && fileParams.existDoc.length == 0) {
      alert('請上傳至少一份文件')
      return false;
    }
  }
  return true;
})
export const checkMaxLetter = ((maxLengthList,formParams)=>{
  for(const key in maxLengthList) {
    const { field, max } = maxLengthList[key];
    const regexPattern = new RegExp(`^[\\s\\S]{0,${max}}$`);
    if(!regexPattern.test(formParams[key])) {
      alert(`${field}不可輸入超過${max}字`);
      return false;
    }
  }
  return true;
})
// 檢查狀態是否可進入頁面(編輯、交付、刪除等需要鎖定狀態的頁面)
export const canEnterPage = ((Status , Condition)=>{
  if(!Condition.includes(Status)) {
    window.history.back();
  }
})
// 更新datagrid切頁資訊(rows、page、order、sort)
export const UpdatePageParameter= (( datagrid,event, type , form)=>{
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
})
// 創建datagrid切頁參數
export const createDadagridObject=(sortField = '')=>{
  return {
    key: 0,
    totalRecords: 0,
    first: 0,
    rows: 10,
    currentPage: 1,
    sortField: sortField,
    sortOrder: -1,
    loading: false,
    selectAll: false,
    selectedList: [],
  }
}
export const createDatagrid=(()=>{
  return reactive({
    key: 0,
    totalRecords: 0,
    first: 0,
    rows: 10,
    currentPage: 1,
    sortField: 'AssetsId',
    sortOrder: -1,
    loading: false,
    selectAll: false,
    selectedList: [],
  })
})
// 檢查圖片size
export const checkFileSize = ((files,selectedFiles,exception)=>{
  var new_size = 0;
  var select_size = 0;
  for (const img of files) {
    new_size+= img.size;
  }
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
  if(new_size+select_size> 49*1024*1024) {
    alert('所上傳的檔案總大小不可超過50MB,請重新選擇檔案');
    return false ;
  }
  return true;
})
// 圖片上傳
export const handleFileChange = ((event,formParams) => {
  const files = event.target.files;
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  //檢查檔名
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].name;
    const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
    if (!imageExtensions.includes(fileExtension.toLowerCase())) {
      alert(fileExtension + '不在允許的格式範圍內，請重新選取');
      return;
    }
  }
  //圖片總數量不超過五張
  if(formParams.existFile) {
    if (formParams.existFile.length + formParams.newFile.length + files.length > 5) {
      alert('上傳至多5張圖片');
      return;
    }
  } else {
    if (formParams.newFile.length + files.length > 5) {
      alert('上傳至多5張圖片');
      return;
    }
  }
  // 檢查圖片大小
  if(!checkFileSize(files,formParams.newFile)) {  
    return
  }
  const imgArray = formParams.newFile;
  const previewUrl = formParams.viewFile;
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const file = files[i]; // 保持原始文件
      imgArray.push(file);
      previewUrl.push({
        FileName: file.name,
        FileLink: URL.createObjectURL(file),
        Type: 'new',
      });
    };
    reader.readAsDataURL(files[i]);
  }
});
export const viewImgFile = ((index,formParams,modalParams,type) => {
  switch (type) {
    case 'new':
      modalParams.title = formParams.viewFile[index].FileName;
      modalParams.src = formParams.viewFile[index].FileLink;
      break;
    case 'exist':
      modalParams.title = formParams.existFile[index].FileName;
      modalParams.src = formParams.existFile[index].FileLink;
      break;
  }
});
export const deleteFile = ((index,formParams,type) => {
  switch (type) {
    case 'new':
      formParams.newFile.splice(index, 1);
      formParams.viewFile.splice(index, 1);
      break;
    case 'exist':
      formParams.deleteFile.push(formParams.existFile[index].FileName);
      formParams.existFile.splice(index, 1);
      break;
  }
});
export const openFileExplorer = ((fileInputs) => {
  fileInputs.click();
});
// 文件上傳
export const handleDocumentFile =((event,fileParams) => {
  console.log('DocumentFiles:', event.target.files);
  const files = event.target.files;
  const acceptExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];
  const maxFileSize = 28 * 1024 * 1024; // 28MB
  // 檢查副檔名 &檔案大小
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].name;
    const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //取得副檔名
    if (!acceptExtensions.includes(fileExtension.toLowerCase())) {
      alert(fileExtension + '不在允許的格式範圍內，請重新選取');
      return;
    }
    if (files[i].size > maxFileSize) {
      alert('檔案' + fileName + '大於28MB，請重新選取');
      return;
    }
  }
  // 處理檔案
  const fileArray = fileParams.newDoc;
  const previewUrl = fileParams.viewDoc;
  for (let i = 0; i < files.length; i++) {
    // 依據檔案格式 分為 1.圖片(可預覽) 2.pdf(可預覽) 3. doc/docx(可下載)
    const file = files[i];
    const fileName = file.name;
    const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2); //得到副檔名
    const reader = new FileReader();
    let type = '';
    // .pdf/.doc/.docx
    if (fileExtension === 'pdf' || fileExtension === 'doc' || fileExtension === 'docx') {
      type = fileExtension;
    }
    // 圖片
    else {
      type = 'pic';
    }
    fileArray.push(file);
    previewUrl.push({
      FileName: file.name,
      FileLink: URL.createObjectURL(file),
      type: type,
    });
    reader.readAsDataURL(file);
  }
  // console.log('uploaded viewDoc:', fileParams.viewDoc);
  // console.log('uploaded newDoc:', fileParams.newDoc);
})
export const handlePreview = ((file,modalParams) => {
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
      const downloadElement = document.createElement('a');
      downloadElement.href = file.FileLink;
      downloadElement.download = file.FileName;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
      break;
    default:
      modalParams.title = file.FileName;
      modalParams.src = file.FileLink;
      const modal = document.querySelector('#open_modal');
      // console.log('modea',modal);
      modal.click();
      break;
  }
})
export const deleteDocument = ((index, file ,fileParams) => {
  // 1.
  if (file.exist) {
    fileParams.deleteDoc.push(file.FileName);
    fileParams.existDoc.splice(index, 1);
    console.log('已加入的deleteDoc:', fileParams.deleteDoc);
  }
  // 2.
  else {
    fileParams.newDoc.splice(index, 1);
    fileParams.viewDoc.splice(index, 1);
    console.log('剩餘newDoc:', fileParams.newDoc);
  }
})

// select option
export const selectItem = ((item,formParams,key) => {
  formParams[key] = item ;
})

