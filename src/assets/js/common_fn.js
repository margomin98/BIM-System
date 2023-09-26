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