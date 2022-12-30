import service from '@/request/index'
import { LoginData } from '@/type/login'
export function login (data: LoginData) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}
export function getGoodList () {
  return service({
    url: '/getGoodsList',
    method: 'get'
  })
}
export function getUserList () {
  return service({
    url: '/getUserList',
    method: 'get'
  })
}
export function getRoleList () {
  return service({
    url: '/getRoleList',
    method: 'get'
  })
}
export function getAuthorityList () {
  return service({
    url: '/getAuthorityList',
    method: 'get'
  })
}
