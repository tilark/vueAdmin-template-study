import request from '@/utils/request'
import Oidc from 'oidc-client'

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

var mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore(),
  authority: 'http://localhost:5000',
  client_id: 'js3',
  redirect_uri: 'http://localhost:8080/static/callback.html',
  response_type: 'id_token token',
  scope: 'openid profile identity',
  post_logout_redirect_uri: 'http://localhost:8080/index.html',
  loadUserInfo: true
})
export function login2() {
  return new Promise((resolve, reject) => {
    if (mgr !== undefined || mgr !== '') {
      mgr.getUser().then(function(user) {
        if (user == null) {
          console.log('enter login2 mgr getUser user is null')
          mgr.signinRedirect().catch(function(err) {
            console.log(err)
          })
        } else {
          console.log('enter login2 mgr getUser user is not null')
          // console.log(user)
          resolve(user)
        }
      }).catch(function(err) {
        console.log(err)
        reject(err)
      })
    } else {
      reject('api/login:Oidc-client配置不正确')
    }
  })
}
export function getInfo2() {
  return new Promise((resolve, reject) => {
    if (mgr !== undefined || mgr !== '') {
      mgr.getUser().then(function(user) {
        if (user == null) {
          console.log('enter login2 mgr getUser user is null')
          mgr.signinRedirect().catch(function(err) {
            console.log(err)
          })
        } else {
          console.log('enter login2 mgr getUser user is not null')
          // console.log(user)
          resolve(user)
        }
      }).catch(function(err) {
        console.log(err)
        reject()
      })
    } else {
      reject('api/getInfo:Oidc-client配置不正确')
    }
  })
}

export function logout2() {
  return new Promise((resolve, reject) => {
    if (mgr !== undefined || mgr !== '') {
      mgr.signoutRedirect().then(function(res) {
        console.log('signed out', res)
        resolve()
      }).catch(function(err) {
        console.log(err)
        reject(err)
      })
    } else {
      reject('api/logout2:Oidc-client配置不正确')
    }
  })
}
