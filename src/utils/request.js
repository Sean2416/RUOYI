import axios from 'axios'
import {
  Notification,
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

const service = axios.create({
  // axios中請求配置有baseURL選項，表示請求URL公共部分
  baseURL:  process.env.VUE_APP_CLIENT_API,
  // 超時
  withCredentials: false
})

const isWithAuth = (config = {}) => {
  return config.hasOwnProperty('withAuth') && !config.withAuth ?
    false : true
}

// request攔截器
service.interceptors.request.use(
  config => {
    if (isWithAuth(config) && getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 讓每個請求攜帶自定義token 請根據實際情況自行修改
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 響應攔截器
service.interceptors.response.use(res => {
    console.log(res)
    if (!res.data.hasOwnProperty("code"))
    {
      if(res.status === 200)
       return res.data
      else{
        Notification.error({
          title: res.data.msg
        })
        return Promise.reject('error');
      }
    }
    
    const code = res.data.code
    if (code === "0004") {
      Notification.error({
        title: '系統提示',
        message: '登入狀態過期，請重新登入'
      });

      store.dispatch('FedLogOut').then(() => {
        location.reload() // 為了重新例項化vue-router物件 避免bug
      });

    } else if (code !== "0000") {
      Notification.error({
        title: res.data.msg
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
