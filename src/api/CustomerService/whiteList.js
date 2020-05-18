import request from '@/utils/request'

// 登入方法
export function getWhiteListInfo(type, identity) {
  const data = {
    type,
    identity
  }
  return request({
    url: '/whitelist/getWhiteListInfo',
    method: 'post',
    withAuth: false,
    data:data
  });  
}