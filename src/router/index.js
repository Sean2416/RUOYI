import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置項
 *
 * hidden: true                   // 當設定 true 的時候該路由不會再側邊欄出現 如401，login等頁面，或者如一些編輯頁面/edit/1
 * alwaysShow: true               // 當你一個路由下面的 children 宣告的路由大於1個時，自動會變成巢狀的模式--如元件頁面
 *                                // 只有一個時，會將那個子路由當做根路由顯示在側邊欄--如引導頁面
 *                                // 若你想不管路由下面的 children 宣告的個數都顯示你的根路由
 *                                // 你可以設定 alwaysShow: true，這樣它就會忽略之前定義的規則，一直顯示根路由
 * redirect: noRedirect           // 當設定 noRedirect 的時候該路由在麵包屑導航中不可被點選
 * name:'router-name'             // 設定路由的名字，一定要填寫不然使用<keep-alive>時會出現各種問題
 * meta : {
    roles: ['admin','editor']    // 設定該路由進入的許可權，支援多個許可權疊加
    title: 'title'               // 設定該路由在側邊欄和麵包屑中展示的名字
    icon: 'svg-name'             // 設定該路由的圖示，對應路徑src/icons/svg
    breadcrumb: false            // 如果設定為false，則不會在breadcrumb麵包屑中顯示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/CustomerService/BasicInfo/Query'),
        name: '首頁',
        meta: { title: '首頁', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '個人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/whiteList',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'query',
        component: () => import('@/views/CustomerService/WhiteList/Query'),
        name: 'WhiteListQuery',
        meta: { title: '白名單查詢', icon: '' }
      }
    ]
  },
  {
    path: '/ACH',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'datatAccess',
        component: () => import('@/views/CustomerService/ACH/DatatAccess'),
        name: 'ACHDataAccess',
        meta: { title: 'ACH上傳、下載', icon: '' }
      }
    ]
  },
  {
    path: '/coupon',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'consumerQuery',
        component: () => import('@/views/CustomerService/Coupon/ConsumerQuery'),
        name: 'CouponConsumerQuery',
        meta: { title: '抵用券狀態查詢', icon: '' }
      },
      {
        path: 'consumptionHistory',
        component: () => import('@/views/CustomerService/Coupon/ConsumptionHistory'),
        name: 'CouponConsumptionHistory',
        meta: { title: '消費紀錄查詢', icon: '' }
      },
      {
        path: 'chargeHistory',
        component: () => import('@/views/CustomerService/Coupon/ChargeHistory'),
        name: 'CouponChargeHistoryHistory',
        meta: { title: '收款紀錄查詢', icon: '' }
      },
      {
        path: 'writeOffHistory',
        component: () => import('@/views/CustomerService/Coupon/WriteOffHistory'),
        name: 'CouponWriteOffHistory',
        meta: { title: '抵用券核銷查詢', icon: '' }
      }
    ]
  },
  {
    path: '/basicInfo',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'query',
        component: () => import('@/views/CustomerService/BasicInfo/Query'),
        name: 'basicInfoQuery',
        meta: { title: '消費者/店家基本資料查詢', icon: '' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
