import { reactive } from "vue";
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
  console.log('new size:', new_size);
  console.log('selct size:', select_size);
  // 留 1Mb 給文字內容
  if(new_size+select_size> 49*1024*1024) {
    alert('所上傳的檔案總大小不可超過50MB,請重新選擇檔案');
    return false ;
  }
  return true;
})