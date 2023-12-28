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