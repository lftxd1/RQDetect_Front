import request from '../request'

export function login(data) {
  return request({
    url: 'http://192.168.123.30:8080/user/login',
    method: 'get',
    data
  })
}

export function getUserInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}
