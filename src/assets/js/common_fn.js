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