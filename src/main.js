import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "element-ui/lib/theme-chalk/index.css"
import ElementUI from "element-ui"
import './styles/index.scss'
import './assets/iconfront/iconfont.css'
// import Print from "vue-print-nb"
import './styles/elementui-theme.scss'
import VCharts from "v-charts"
import qs from "qs"
import './assets/alicon/iconfont.css'
import './router/beforeRoute'
import i18n from './i18n/index'; //国际化


// 使用 Event Bus  事件总线
const bus = new Vue();
Vue.prototype.$bus = bus
//添加序列化
Vue.prototype.qs = qs
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
