import axios  from 'axios'
import { ElMessage  } from 'element-plus'
const requset = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
requset.interceptors.request.use(config => {
    const token = localStorage.getItem('pz_token')
    const whiteUrl = ['/login','/register']
    if(token&&!whiteUrl.includes(config.url))
    {
        config.headers['x_token'] = token
    }
    return config
},function(error)
{
    return Promise.reject(error)
})

// 响应拦截器
requset.interceptors.response.use(res => {
  if(res.data.code === -1){
    return ElMessage.warning(res.data.msg)
  }
  //token有问题
  if(!res.data.code===-2){
    
    localStorage.removeItem('pz_token')
    localStorage.removeItem('pz_userInfo')
    localStorage.removeItem('pz_router')
    //token有问题跳转回登入页面
    window.location.href =window.location.origin
  }
  
  return res
},function(error){
    return Promise.reject(error)
})


export default requset