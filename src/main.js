import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


import './router/auth'

import './assets/icon-fonts/iconfont.css'
import './assets/icon-fonts/iconfont'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios' //导入axios
axios.defaults.baseURL = 'http://192.168.123.110:8080' //配置根域名
Vue.prototype.axios = axios  //把axios挂载到Vue的原型上
Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
