<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-24 10:06:02
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-25 14:47:12
-->
<template>
  <div class="MdlClip_box">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import * as Cesium from "cesium";
let viewer = null;
export default {
  data() {
    return {
      initCesiumGoble() {
        viewer = new Cesium.Viewer("cesiumContanier");
        // viewer.scene.globe.show = false;
      },
    };
  },
  components: {},
  mounted() {
    this.initCesiumGoble()
  }
};
</script>

<style scoped>
.MdlClip_box {
  height: 100%;
  width: 100%;
}
</style>
