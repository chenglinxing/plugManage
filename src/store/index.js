import Vue from 'vue'
import Vuex from 'vuex'
import { getUserRights } from "@api/user.js"

import persistedstate from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null, //用户id
    userInfo: {},//用户信息
    loginStatus: false, //登录状态 默认false
    userMenuList: [], //菜单
    currentMenuList: [],//数据未处理过 只存path
    // currentTreeData: {},//当前点击树形菜单的详细数据  用户权限中的树形菜单
  },
  mutations: {
    getUserId(state, data) {
      state.userId = data
    },

    /**修改登录状态 */
    getLoginStatus(state, data) {
      state.loginStatus = data
      //存入登录状态
      // window.localStorage.setItem('loginStatus', data)
    },

    /**获取用户菜单 */
    getUserMenu(state, data) {
      state.userMenuList = data
    },

    /**获取未处理过的菜单数据 只存path */
    getCurrentMenuList(state, data) {
      state.currentMenuList = data
    },

    // /**获取树形菜单的数据 */
    // getCurrentTreeData(state, data) {
    //   state.currentTreeData = data
    // }

    /**获取用户信息 */
    getUserInfo(state, data) {
      state.userInfo = data
    }
  },
  actions: {
    getLoginStatusAction({ commit }) {
      return new Promise(resolve => {
        let status = window.localStorage.getItem('loginStatus')
        // commit('getLoginStatus')
        resolve(status)
      })
    },

    async getUserMenuAction({ commit }) {

      let userId = localStorage.getItem('userId')
      let menuList = []
      const { data, code } = await getUserRights(userId)

      // console.log(data, 'action中获取用户权限')
      if (code == 200) {
        commit('getUserMenu', data.toTreeData)
      }
      return new Promise(resolve => {
        resolve(data)
      })
    }
  },
  modules: {
  },
  plugins: [persistedstate({})]
})
