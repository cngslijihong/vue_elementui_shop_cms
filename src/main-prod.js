import Vue from 'vue'
import App from './App.vue'
// 导入自定义的全局样式表
// 导入阿里矢量库字体图标样式表
import './assets/fonts/iconfont.css'
// 导入treetable插件
import TreeTable from 'vue-table-with-tree-grid'
import axios from 'axios'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 为了减小打包后项目的体积，其样式在index.html首页通过cdn引用
import router from './router'
import './assets/css/global.css'
// 导入nprogress的js和样式，加载产生进度条效果
import NProgress from 'nprogress'

// 设置发送网络请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios请求拦截
//   通过axios请求拦截器添加token，保证请求拥有获取数据的权限
axios.interceptors.request.use(config => {
  // 发送请求就开启加载进度条
  NProgress.start()
  // 为请求头对象添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config => {
  // 收到响应就关闭加载进度条
  NProgress.done()
  return config
})

// 将axios挂载到vue原型对象的$http属性上，全局可用
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 注册为全局组件，全局范围内可用
Vue.component('tree-table', TreeTable)

// 将富文本编辑器插件注册为全局组件
Vue.use(VueQuillEditor)

// 在全局定义一个格式化时间的过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}/${m}/${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
