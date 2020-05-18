import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // axios中請求配置有baseURL選項，表示請求URL公共部分
  baseURL: 'https://cors-anywhere.herokuapp.com/'+ process.env.VUE_APP_CLIENT_API,
  // 超時
  timeout: 10000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
})
// request攔截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 讓每個請求攜帶自定義token 請根據實際情況自行修改
    }
    console.log(config)
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
    const code = res.status
    if (code === 401) {
      Notification.error({
        title: '系統提示',
        message: '登入狀態過期，請重新登入'
      });
      
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 為了重新例項化vue-router物件 避免bug
      });

    } else if (code !== 200) {
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
