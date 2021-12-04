/*
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-05-20 16:35:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-01 13:04:33
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import "@/plugins/element.js"
import '@/assets/global.css'

// 引入cesium的css
import 'cesium/Source/Widgets/widgets.css'

// 引入自定义图标
import "@/assets/css/iconfont/iconfont.css"
// 全局获取ION
import { Ion } from 'cesium';
// wl的token
//Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZWM0MzQ0NC1jYzAyLTQ0NmEtYWQ1Ni1jNzRkM2IwNTQ0MzMiLCJpZCI6NjI0NTMsImlhdCI6MTYyNzA0MjkyMH0.2-f-HKsGf6wkvsllwghP0jcYZ1-mlKD3MeIu3UAFPH8";
//Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNjdiMzcwNi1iZTJiLTRjZGQtYjU3Yy1jMmNkNjY4OGY4NzIiLCJpZCI6NjI0NTMsImlhdCI6MTYzNjQyNzY5M30.jds-Nm_IMMRZ6jM4m7TeutzlxssVzgt0o_EPDOVJVco"
//Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZjEzMjIxZS1hODZiLTRhY2EtOWQ5Yy0yZTkyNTljNDZlZDkiLCJpZCI6NjI0NTMsImlhdCI6MTYzNjY4OTkwNH0.MUOoQjk2jBJCXtTiS-zlcc3H1EmH_KQxKagLgCidiV4"
// cesium官网的token，可加载模型
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNmY0NTdiNi0yMWU0LTQ4ODYtOTI4ZC01YTNkMjBmOGJiNWIiLCJpZCI6MjU5LCJpYXQiOjE2MzU3ODA2MDR9.y50NF0p5ljbH7Tau2KiGsZdCNx0Icx905QiljL43nYM";


// 配置axios请求
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8383/tsy"; //tsy内网
// axios.defaults.baseURL = "http://192.10.3.237:8383/tsy"; //tsy内网

Vue.prototype.$http = axios;

// 配置天地图token
Vue.prototype.tiandituTk = "59e1f33a85b33bcf1b27dea77be6b96d";

// 引入xml转json工具
import X2JS from 'x2js';
Vue.prototype.$x2js = new X2JS()

// 引入行政区划
import vRegion from 'v-region'
Vue.use(vRegion)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
