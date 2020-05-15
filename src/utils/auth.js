import Cookies from 'js-cookie'

const TokenKey = 'JWTToken'
const UserRole = 'UserRole'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRole() {
  return Cookies.get(UserRole)
}

export function setRole(role) {
  return Cookies.set(UserRole, role)
}

export function removeRole() {
  return Cookies.remove(UserRole)
}
