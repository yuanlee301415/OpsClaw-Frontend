/*
 * 设置、获取、删除 用户认证 Token
 * */

const key = 'opsclaw.control.token.v1'

export function getAuthToken() {
  return sessionStorage.getItem(key)
}

export function setAuthToken(token) {
  sessionStorage.setItem(key, token)
}

export function removeAuthToken() {
  sessionStorage.removeItem(key)
}
