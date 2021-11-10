<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-20 10:25:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-10 16:02:03
-->
<template>
  <div class="adjustMdlBox">
    <div>
      <span>比例(Z)</span>
      <el-input-number
        v-model="tileModelTool.scale"
        label="描述文字"
        :step="0.1"
      ></el-input-number>
    </div>
    <div>
      <span>经度</span>
      <el-input-number
        v-model="tileModelTool.longitude"
        label="描述文字"
        :step="0.0005"
      ></el-input-number>
    </div>
    <div>
      <span>纬度</span>
      <el-input-number
        v-model="tileModelTool.latitude"
        label="描述文字"
        :step="0.0005"
      ></el-input-number>
    </div>
    <div>
      <span>高度</span>
      <el-slider
        v-model="tileModelTool.height"
        :min="-10000"
        :max="10000"
      ></el-slider>
    </div>
    <div>
      <span>绕x轴旋转</span>
      <el-slider
        v-model="tileModelTool.rotateX"
        :min="-180"
        :max="180"
      ></el-slider>
    </div>
    <div>
      <span>绕y轴旋转</span>
      <el-slider
        v-model="tileModelTool.rotateY"
        :min="-180"
        :max="180"
      ></el-slider>
    </div>
    <div>
      <span>绕z轴旋转</span>
      <el-slider
        v-model="tileModelTool.rotateZ"
        :min="-180"
        :max="180"
      ></el-slider>
    </div>

    <div>
      <span>透明度</span>
      <el-slider
        v-model="tileModelTool.alpha"
        :min="0.5"
        :max="1"
        :step="0.05"
      ></el-slider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    // 当v-model绑定的变量名与vuex里面的变量名一致时，会发生类似于commit修改的效果,修改store的值
    // 不知道在生产环境下有没有bug
    tileModelTool() {
      return this.$store.getters.getTileMdlTool;
    },
  },
  methods: {
    onMessageFromComponent() {},
    destroyComponent() {},
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.adjustMdlBox {
  position: fixed;
  bottom: 10px;
  right: 20px;
  z-index: 1;
  background-color: rgba(1, 8, 6, 0.5);
  padding: 1rem;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 6px #ffffff;
}
.adjustMdlBox div {
  margin: 5px 0 0 0;
  padding: 0px;
  font-size: 14px;
  height: 100%;
  width: 100%;
}
.adjustMdlBox div .el-input-number {
  width: 70%;
  float: right;
}
.adjustMdlBox div .el-slider {
  width: 70%;
  float: right;
}
.adjustMdlBox div span {
  line-height: 44px;
}
</style>