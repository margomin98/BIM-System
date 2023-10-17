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