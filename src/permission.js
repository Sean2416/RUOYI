import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  getToken,
  getRole
} from '@/utils/auth'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken() && getRole()) {
    /* has token*/
    if (to.path === '/login') {
      next({
        path: '/index'
      })
      NProgress.done()
    } else {
      //判斷是否擁有客服權限
      if (getRole().indexOf("CS") < 0) {
        store.dispatch('FedLogOut').then(() => {
          Message.error("您沒有操作客服系統權限")
          next({
            path: '/'
          })
        });
      }
      else
        next()
    }
  } else {
    // 沒有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登入白名單，直接進入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否則全部重定向到登入頁
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
