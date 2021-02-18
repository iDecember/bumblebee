import Vue from 'vue'
import App from './App'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import qs from 'qs'
import '../static/reset.css'
import echarts from 'echarts'
import Print from 'vue-print-nb'
import'./assets/css/global.css'
import axios from 'axios'
import{Message} from 'element-ui'


axios.defaults.baseURL='https://api.mifengzixi.com/bee_api'
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
});

Vue.prototype.$http=axios



Vue.prototype.$echarts = echarts // 全局使用this.$echarts
Vue.use(elementUI)
Vue.prototype.$qs = qs // 可全局调用 this.$qs
Vue.use(Print) // 打印功能
Vue.prototype.$message=Message

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
