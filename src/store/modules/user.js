import { login, logout, getInfo } from '@/api/login'
// import { logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Oidc from 'oidc-client'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    user: '',
    mgr: new Oidc.UserManager({
      userStore: new Oidc.WebStorageStateStore(),
      authority: 'http://localhost:5000',
      client_id: 'js2',
      redirect_uri: 'http://localhost:8080/static/callback.html',
      response_type: 'id_token token',
      scope: 'openid profile api1',
      post_logout_redirect_uri: 'http://localhost:8080/index.html',
      loadUserInfo: true
    })
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    loginSync: (state) => {
      state.mgr.signinRedirect().catch(function(err) {
        console.log(err)
      })
    },
    getUser: (state) => {
      state.mgr.getUser().then(function(user) {
        // console.log(user)
        return user
      }).catch(function(err) {
        console.log(err)
      })
    },
    signOut: (state) => {
      // var self = this
      state.mgr.signoutRedirect().then(function(resp) {
        // self.signedIn = false
        console.log('signed out', resp)
      }).catch(function(err) {
        console.log(err)
      })
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log('enter store user login')
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          console.log('enter store user login error')
          reject(error)
        })
      })
    },
    Login2(context) {
      //  处理登录
      console.log('enter store user login2')
      // context.state.mgr.signinRedirect().catch(function(err) {
      //   console.log(err)
      // })
      return new Promise((resolve, reject) => {
        // context.state.mgr.signinRedirect().catch(function(err) {
        //   console.log(err)
        // })
        context.state.mgr.getUser().then(function(user) {
          // console.log(user)
          if (user == null) {
            console.log('enter login2 mgr getUser user is null')
            // context.state.mgr.signIn()
            context.state.mgr.signinRedirect().catch(function(err) {
              console.log(err)
            })
          } else {
            console.log('enter login2 mgr getUser user is not null')
            console.log(user)
            //  设置vuex, cookies
            setToken(user.access_token)
            context.commit('SET_TOKEN', user.access_token)
            context.commit('SET_ROLES', user.profile)
            context.commit('SET_NAME', user.profile.name)
            resolve()
            // self.user = user
            // self.signedIn = true
            // self.$router.push({ path: '/' })
          }
        }).catch(function(err) {
          console.log(err)
          reject()
        })
      })
    },
    GetInfo2({ commit, state }) {
      return new Promise((resolve, reject) => {
        state.mgr.getUser().then(function(user) {
          // console.log(user)
          if (user == null) {
            console.log('enter getInfo2 mgr getUser user is null')
            state.signIn()
          } else {
            console.log('enter getInfo2 mgr getUser user is not null')
            console.log(user)
            //  设置vuex, cookies
            setToken(user.access_token)
            commit('SET_TOKEN', user.access_token)
            commit('SET_NAME', user.profile.name)
            if (user.profile) {
              commit('SET_ROLES', user.profile)
            }
            resolve(user)
          }
        }).catch(function(err) {
          console.log(err)
          reject(err)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          console.log('etner GetInfo error')
          console.log(error)
          reject(error)
        })
      })
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_NAME', '')
        removeToken()
        state.mgr.signoutRedirect().then(function(res) {
          console.log('signed out', res)
          resolve()
        }).catch(function(err) {
          console.log(err)
          reject(err)
        })
      })
    },
    // 登出
    LogOut2({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
