export function debounce(func, delay) {
  //先定义一个参数赋值为空
  let timer = null;
  //在返回中 有一个函数用来返回并进行防抖计算 (...args) ...的意思是可以传多个值
  return function(...args) {
    //if循环一次执行是没有值得为空不执行clearTimeout，执行下面的函数因为console.log(111)执行的太频繁，在定时器的时间还没有执行完就进行第二次，
    //第二次执行的时候里面有值，所以会被clearTimeout给取消掉，到第三十次的时候，第二十九次会被取消掉给timer一个新的值，但是没有第三十一次，所以
    //三十次会等待延迟时间并执行fun.apply(this.args)
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}


function padLeftZero(str) {
    return ("00" + str).substr(str.length);
  }

// 时间格式化
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
  
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
  
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + "";
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
      }
    }
  
    return fmt;
  }
  