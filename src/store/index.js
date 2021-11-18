/*
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-05-20 16:35:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 20:50:39
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tileModelTool: {
      scale: 1.0, // 缩放比例
      longitude: 0, // 经度
      latitude: 0, // 纬度
      height: 0, // 离地面高度
      rotateX: 0, // 绕X轴旋转
      rotateY: 0, // 绕Y轴旋转
      rotateZ: 0, // 绕Z轴旋转
      alpha: 1, // 透明度
    },
  },
  getters: {
    getTileMdlTool(state) {
      return state.tileModelTool
    }
  },
  mutations: {
    setTileMdlToolInfo(state, params) {
      state.tileModelTool = params
    }
  },
  actions: {
  },
  modules: {
  }
})
