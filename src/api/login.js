import request from '@/utils/request'

export function reqLogin(data) {
  console.log(request, 'request request');
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function reqLogout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}