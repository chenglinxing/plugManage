import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@c/Layout"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/login/index')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/home',
        meta: {
          title: '首页',
          icon: "el-icon-s-home"
        },
        component: () => import('../views/home/index')
      },
      // {
      //   path: '/plugUnit',
      //   meta: {
      //     title: '插件信息',
      //     icon: "el-icon-s-home"
      //   },
      //   // component: () => import('../views/plugUnit/plugList/index'),
      // },
      {
        path: "/plugList",
        meta: {
          title: '插件列表',
          icon: "el-icon-s-home"
        },
        component: () => import('../views/plugUnit/plugList/index')
      },
      {
        path: "/plugType",
        meta: {
          title: '插件类型',
          icon: "el-icon-s-home"
        },
        component: () => import('../views/plugUnit/plugType/index')
      },
      {
        path: "/userList",
        meta: {
          title: '用户列表',
          icon: 'el-icon-user',
          requiredRight: false
        },
        component: () => import("../views/userInfo/userList/index")
      },
      {
        path: "/userRights",
        meta: {
          title: '用户权限',
          icon: 'el-icon-user'
        },
        component: () => import("../views/userInfo/userRights/index")
      },
      {
        path: "/personInfo",
        meta: {
          title: '用户信息',
          icon: 'el-icon-user'
        },
        component: () => import("../views/userInfo/personInfo/index")
      },

    ],

  },
  {
    path: "/offWebsite",
    component: () => import("../views/offWebsite/index")
  },
  {
    path: "/404",
    component: () => import("../components/404")
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



