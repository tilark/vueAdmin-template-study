import request from '@/utils/request'
// import Oidc from 'oidc-client'

export function login(username, password) {
  return request({
    url: 'user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method: 'post'
  })
}

// export function login2() {
//   let mgr = new Oidc.UserManager({
//     userStore: new Oidc.WebStorageStateStore(),
//     authority: 'http://localhost:5000',
//     client_id: 'js2',
//     redirect_uri: 'http://localhost:8080/static/callback.html',
//     response_type: 'id_token token',
//     scope: 'openid profile api1',
//     post_logout_redirect_uri: 'http://localhost:8080/index.html',
//     loadUserInfo: true
//   })
// }
