const BASE_URL = 'http://localhost:3000/'


function simpleDate(dateParam) {
    let date_ob = new Date(dateParam);
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    return year + "-" + month + "-" + date;
  }
  
  function fullDate(dateParam) {
    let date_ob = new Date(dateParam);
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
  
    let hours = date_ob.getHours();
  
    // current minutes
    let minutes = date_ob.getMinutes();
  
    // current seconds
    let seconds = date_ob.getSeconds();
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  }
  
export {  simpleDate, fullDate, BASE_URL };
  
// export default BASE_URL