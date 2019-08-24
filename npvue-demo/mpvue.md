# mpvue 

## mpvue简介
- 美团工程师推出的基于vue.js封装的用于开发小程序的框架
- 融合了原生小程序和vue.js的特点
- 可完全组件化开发

### 特点
1. 组件化开发
2. 完善的vue.js开发体验
3. 可使用vuex管理状态
4. webpack构建项目
5. 最终h5转换工具将项目编译成小程序(微信、百度、头条、支付宝)识别的文件

## 项目开启
### 初始化项目
1. npm install vue-cli -g 或 yarn yarn global add vue-cli
2. vue init mpvue/mpvue-quickstart myproject 初始化项目
3. cd myproject 进入项目根目录
4. npm install 或 yarn 根据 `package.json` 安装项目依赖
5. npm start:wx || yarn start:wx  启动初始化项目

### 项目文件介绍
- src源文件 主要代码编写区
- dist文件夹  自动打包后的小程序代码
- project.config.json 项目配置文件
- static文件夹 存放静态资源

### 注册小程序
1. src/app.json 全局配置文件
2. src/App.vue 等同于原生小程序中的app.js, 可再次写小程序应用的实例的声明周期 || 全局样式(style中编写)

### 入口文件(src/main.js)介绍
```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import Fly from 'flyio/dist/npm/wx'

// 设置vue的提示功能关闭
Vue.config.productionTip = false

// 声明当前组件的类型 应用
App.mpType = 'app'

// 将store对象放置Vue的原型上，为的是每个实例都可以使用
Vue.prototype.$store = store
// 第三方网络请求插件
let fly = new Fly
Vue.prototype.$fly = fly
// 生成应用的实例
const app = new Vue(App)
// 挂载整个应用
app.$mount()
```

### 页面级文件
#### 页面所需文件
1. index.vue 等同于原生中的 wxml+wxss+js 必须有
2. main.js  当前组件页面的入口文件，用于生成当前组件实例, 并挂载组件
3. main.json 当前页面的局部配置文件(页面无配置，可不写)

```javascript
// main.js 注册页面
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

// main.json 配置页面
{
  "navigationBarTitleText": "主页",
  "navigationBarBackgroundColor": "#8ed145"
}
```
**注意事项：**
- 每一个页面都需要进行单独挂载(页面实例.$mount()), 否则不能生效
- 测试代码只能在小程序工具中
- mpvue绑定小程序原生事件不能使用bind + 事件名, 需要使用@(语法糖) + 事件名
- 新创建的页面需要重新执行`npm start:wx` 才能将新页面打包到`dist`文件中

## mpvue生命周期
在mpvue中vue的生命周期和小程序的生命周期都可以使用，但应优先使用vue的生命周期钩子

### vue生命周期
- beforeCreate 实例初始化后，数据观测(data observer)和 event/watcher 事件配置之前被调用
- create 实例创建完成后被调用，此时数据(数据观测-data observer, 属性和方法的运算，watch/event事件回调)已初始化,但挂载阶段还未开始。    
- beforeMount 在挂载开始之前被调用, 相关的render函数首次被调用
- mounted el被新创建的vm.$el替换，并挂载到实例上后调用该钩子
- beforeUpdate 数据更新时调用，发生在虚拟dom重新渲染和打补丁之前。可在此钩子进一步更改状态，不会触发重渲染过程
- updated 由于数据更改导致的虚拟dom重新渲染和打补丁，在此之后调用
- beforeDestroy  实例销毁之前调用，在这一步，实例仍可用
- destroyed  vue实例销毁后调用。调用后，vue实例的所有东西都会解绑定，所有事件监听被移除，所有子实例被销毁。该钩子在服务器端渲染期间不被调用

### 小程序应用app实例生命周期
- onLauch: 小程序应用初始化
- onShow: 小程序启动获取后台进入前台
- onHide: 小程序应用从前台进入后台

### 小程序页面page实例生命周期
- onLoad: 监听页面加载
- onShow: 页面显示
- onReady: 监听页面初始化渲染完成
- onHide: 监听页面隐藏，注意当前页面实例依然存活
- onUnload: 监听页面卸载
- onPullDownRefresh: 监听用户下拉动作
- onReachBottom: 监听用户上拉触底操作
- onShareAppMessage: 用户点击右上角分享功能
- onPageScroll: 页面滚动
- onTabItemTap: 当前是tab页时，点击tab时触发

## mpvue 中使用vue-router && axios
### vue-router
1. 在mpvue中对vue-router的支持不好，问题较多
2. 进行页面跳转可使用小程序提供的api
  + wx.navigateTo() 保留当前页面, 可回调
  + wx.redirectTo() 不保留，不能回退
  + wx.switchTab()  用于tabBar页面

### axios 
1. 小程序不支持axios 会报错：XMLHttpRequest is not a constructor
2. 原因: 小程序的环境和浏览器的环境不一样（小程序没有window对象）
3. 解决方法：使用其他库: flyio 

### fly使用教程
gitHub地址：[https://github.com/wendux/fly](https://github.com/wendux/fly)

1. 下载: npm install flyio
2. 引入：import Fly from 'flyio/dist/npm/wx'  flyio支持很多环境下使用
3. 生成实例：let fly = new Fly
4. 配置：Vue.prototype.$fly = fy
5. 使用：组件中 this.$fly.get()

## mpvue vs 小程序 状态管理
### 原生小程序
1. 在data中初始化状态数据
2. 修改状态：this.setData({key: value})
3. 页面公共状态：
  + App 程序实例的data中定义
  + 获取状态数据：let datas = getApp()
  + 修改状态数据：datas.data.xxx = value
4. 或者利用storage本地存储

### mpvue
- 在组件中通过getApp无法拿到对应的数据
- mpvue中支持vuex, 所有可以使用vuex集中管理状态
- vuex几个重要概念
  + state 对象(仓库, 统一管理数据)
  + getters 用于全局动态计算状态
  + mutations 用于修改状态，并将状态提交给state对象（同步）
  + actions 携带参与修改状态的数据，并触发 mutations(异步请求)
  + dispath() 分发状态

## 原生小程序和 mpvue对比总结
- 原生小程序运行更稳定，兼容性好，mpvue在某些方面存在兼容性问题(vue-router)
- mpvue支持vue组件化开发，效率更高，功能更强大（双向数据绑定，vuex）
- mpvue 可基于webpack工程化开发
- 原生不支持npm安装包，不支持css预处理
- 支持computed计算属性和watcher监听器，模板语法中只支持简单的js表达式。可直接写div,span等标签
