import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout'
import { asyncRoutes } from './routes'

Vue.use(Router)

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '401',
    name: '401',
    component: () => import('../views/error-page/401'),
    hidden: true,
    meta: { title: '401' }
  },
  {
    path: '404',
    name: '404',
    component: () => import('../views/error-page/404'),
    hidden: true,
    meta: { title: '404' }
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('../views/Home'),
      meta: {
        title: '首页',
        icon: 'vue-dsn-icon-index',
        // fixed: true
      }
    }]
  },
  {
    path: '/',
    name: '仓库管理',
    component: Layout,
    children: [{
      path: '/warehouseManage',
      name: '仓库管理',
      component: () => import('../views/manage/page1warehouse'),
      meta: {
        title: '仓库管理',
        icon: 'el-icon-s-home',
        fixed: true
      },
    }]
  },
  {
    path: '/',
    name: '报警管理',
    component: Layout,
    children: [{
      path: '/alarmManage',
      name: '报警管理',
      component: () => import('../views/manage/page2alarm'),
      meta: {
        title: '报警管理',
        icon: 'el-icon-warning',
        fixed: true
      },
    }]
  },
  {
    path: '/',
    name: '用户管理',
    component: Layout,
    children: [{
      path: '/userManage',
      name: '用户管理',
      component: () => import('../views/manage/page3user'),
      meta: {
        title: '用户管理',
        icon: 'el-icon-user',
        fixed: true
      },
    }]
  },
  {
    path: '/',
    name: '角色管理',
    component: Layout,
    children: [{
      path: '/roleManage',
      name: '角色管理',
      component: () => import('../views/manage/page4role'),
      meta: {
        title: '角色管理',
        icon: 'el-icon-s-custom',
        fixed: true
      },
    }]
  },
  {
    path: '/',
    name: '部门管理',
    component: Layout,
    children: [{
      path: '/departmentManage',
      name: '部门管理',
      component: () => import('../views/manage/page5department'),
      meta: {
        title: '部门管理',
        icon: 'el-icon-menu',
        fixed: true
      },
    }]
  },
  {
    path: '/',
    name: '接口管理',
    component: Layout,
    children: [{
      path: '/apiManage',
      name: '接口管理',
      component: () => import('../views/manage/page6api'),
      meta: {
        title: '接口管理',
        icon: 'el-icon-connection',
        fixed: true
      },
    }]
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/user-center',
    hidden: true,
    children: [{
      path: 'user-center',
      name: 'UserCenter',
      component: () => import('../views/UserCenter'),
      meta: {
        title: '个人中心'
      }
    }]
  }
]

const routes = [...constantRoutes, ...asyncRoutes]

export default new Router({
  routes
})
