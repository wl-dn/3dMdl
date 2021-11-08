<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-09-19 11:21:53
 * @LastEditors: wenlong
 * @LastEditTime: 2021-09-19 11:30:27
-->
<template>
  <div class="mdlHeight_box" v-show="isAdjustHeightMdl">
    <el-slider
      v-model="scaleValue"
      :min="10"
      :max="100"
      :step="5"
      show-stops
    ></el-slider>
  </div>
</template>

<script>
export default {
  props: ["isAdjustHeightMdl"],
  data() {
    return {
      scaleValue: 20,
    };
  },
  components: {},
};
</script>

<style scoped>
.mdlHeight_box {
  height: 40px;
  width: 400px;
  /* background-color: antiquewhite; */
  position: absolute;
  top: 60px;
  left: 80px;
  border-radius: 5px;
}
</style>
