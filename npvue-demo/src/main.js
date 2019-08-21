import Vue from 'vue'
import App from './App.vue'
import store from './store/index'

// 设置vue的提示功能关闭
Vue.config.productionTip = false

// 声明当前组件的类型 应用
App.mpType = 'app'

// 将store对象放置Vue的原型上，为的是每个实例都可以使用
Vue.prototype.$store = store

// 生成应用的实例
const app = new Vue(App)

// 挂载整个应用
app.$mount()
