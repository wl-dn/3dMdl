/*
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-05-20 16:35:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-10 09:48:10
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import "@/plugins/element.js"
import '@/assets/global.css'
import 'cesium/Source/Widgets/widgets.css'

// 引入自定义图标
import "@/assets/css/iconfont/iconfont.css"
// 全局获取ION
import { Ion } from 'cesium';
// wl的token
//Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZWM0MzQ0NC1jYzAyLTQ0NmEtYWQ1Ni1jNzRkM2IwNTQ0MzMiLCJpZCI6NjI0NTMsImlhdCI6MTYyNzA0MjkyMH0.2-f-HKsGf6wkvsllwghP0jcYZ1-mlKD3MeIu3UAFPH8";
// cesium官网的token，可加载模型
//Ion.efaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNmY0NTdiNi0yMWU0LTQ4ODYtOTI4ZC01YTNkMjBmOGJiNWIiLCJpZCI6MjU5LCJpYXQiOjE2MzU3ODA2MDR9.y50NF0p5ljbH7Tau2KiGsZdCNx0Icx905QiljL43nYM";
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNjdiMzcwNi1iZTJiLTRjZGQtYjU3Yy1jMmNkNjY4OGY4NzIiLCJpZCI6NjI0NTMsImlhdCI6MTYzNjQyNzY5M30.jds-Nm_IMMRZ6jM4m7TeutzlxssVzgt0o_EPDOVJVco"

// 配置axios请求
import axios from 'axios'
axios.defaults.baseURL = "http://192.10.3.237"; //ztyq内网
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
