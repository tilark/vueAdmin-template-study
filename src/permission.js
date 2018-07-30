import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log('enter router.beforeEach')
  console.log(to.path)
  NProgress.start()
  if (getToken()) {
    console.log('gettoken is not null')
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
      // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // console.log('enter not login')
      if (store.getters.roles.length === 0) {
        console.log('store.getters.roles is null')
        store.dispatch('GetInfo2').then(res => { // 拉取用户信息
          const roles = Object.keys(res.profile)
          console.log(roles)
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            console.log('before addRoutes')
            console.log(store.getters.addRoutes)
            router.addRoutes(store.getters.addRoutes)
            console.log('after addRoutes')
            next({ ...to, replace: true })
          }).catch(err => {
            console.log(err)
          })
          // next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        console.log('store.getters.roles is not null')
        //  是否需要添加动态路由？
        next()
      }
    }
  } else {
    console.log('token is null')
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('enter permission whitelist login')
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
