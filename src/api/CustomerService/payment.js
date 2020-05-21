import request from '@/utils/request'

export function getweeklyTx(username, rows, page) {
  const data = {
    username,
    rows, 
    page
  }
  return request({
    url: '/payment/weeklyTx',
    method: 'post',
    data:data
  });  
}

export function getweeklyTxDtl(username, weeklyTxId, rows, page) {
  const data = {
    username,
    weeklyTxId, 
    rows, 
    page
  }
  console.log(data)
  return request({
    url: '/payment/weeklyTxDtl',
    method: 'post',
    data:data
  });  
}