/*eslint-disable*/
import router from "./index"
import store from "../store"


//取决于vuex 刷新页面后会变化 使用插件vuex-persistedstate存本地缓存保存状态

let routerFlag = false
router.beforeEach(async (to, from, next) => {
    //路由权限 
    let flag = store.state.currentMenuList.includes(to.path)
    if (to.path == '/login') {
        next()
    } else {
        //登录状态
        if (store.state.loginStatus) {
            next()
            // /**菜单权限 */
            // if (flag) {
            //     next()
            // } else {
            //     next('/login')
            // }
        } else {
            next('/login')
        }
    }
})