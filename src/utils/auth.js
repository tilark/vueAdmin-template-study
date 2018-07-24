import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
// const TokenKey = 'idsrv'
const UserKey = 'User-Key'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.get(UserKey)
}
export function setUserInfo(user) {
  return Cookies.set(UserKey, user)
}
export function removeUserInfo() {
  return Cookies.remove(UserKey)
}
