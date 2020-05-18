import request from '@/utils/request'

export function getUserProfile(userType, username, identity) {
  const data = {
    userType,
    username,
    identity
  }
  return request({
    url: '/getUserProfile',
    method: 'post',
    data:data
  });  
}

export function getCouponOverview(identity, username) {
  const data = {
    identity,
    username
  }
  return request({
    url: '/coupon/getCouponOverview',
    method: 'post',
    data:data
  });  
}

export function resetPrint(identity) {
  const data = {
    identity
  }
  return request({
    url: '/coupon/resetPrint',
    method: 'post',
    data:data
  });  
}