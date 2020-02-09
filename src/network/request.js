import axios from 'axios'

export function request(config) {
    const instance = axios.create({
       baseURL:'http://106.54.54.237:8000/api/hy',
       timeout: 5000
    })
// axios拦截器
// 请求拦截的作用:
// 比如config中的一些消息不符合服务器的要求
// 比如每次发送网络请求时，都希望在界面中显示一个请求
// 比如某些网络请求（登录（token）），必须携带一些特殊的信息
instance.interceptors.request.use(config =>{
 
  return config
}), err =>{
  
}
//相应拦截
instance.interceptors.response.use(res =>{
  return res.data
}),err =>{
  
}


//发送真正的网络请求，instance会返回一个promise
    return instance(config)
}

