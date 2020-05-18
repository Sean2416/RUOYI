import request from '@/utils/request'

// 登入方法
export function login(username, password, code, uuid) {
  var data = {
    username,
    password,
    code,
    uuid
  }
console.log(data)

  return request({
    url: '/common/login',
    method: 'post',
    data:data
  });  
}

// 獲取使用者詳細資訊
export function getInfo() {
 // return request.get('/getInfo', {params: {parameters}});
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 獲取驗證碼
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}