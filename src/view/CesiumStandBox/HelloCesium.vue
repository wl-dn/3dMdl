<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-05-20 16:35:09
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-24 15:16:31
-->
<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import { CesiumUtils } from "../../utils/utils";
import * as Cesium from "cesium";

export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    const options = CesiumUtils.initMap(false);
    const Viewer = new Cesium.Viewer("cesiumContainer", options);
    Viewer._cesiumWidget._creditContainer.style.display = "none"; //是否显示cesium
  },
};
</script>

<style scoped>
</style>
