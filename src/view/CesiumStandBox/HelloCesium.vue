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
    // const options = CesiumUtils.initMap(false);
    const showWedgit = false;
    viewer = new Cesium.Viewer("cesiumContainer", {
      geocoder: showWedgit, // 地理位置查询定位控件
      homeButton: showWedgit, // 默认相机位置控件
      timeline: showWedgit, // 时间滚动条控件
      navigationHelpButton: showWedgit, // 默认的相机控制提示控件
      sceneModePicker: showWedgit, // 切换2D、3D和Columbus View（CV）模式
      fullscreenButton: showWedgit, // 全屏控件
      creditsDisplay: showWedgit, //展示商标版权和数据源
      // scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存.与sceneModePiker不能共存
      baseLayerPicker: showWedgit, // 底图切换控件
      animation: showWedgit, // 控制场景动画的播放速度控件
      // terrainProvider: new Cesium.createWorldTerrain(), // 这一块接口容易失败
      shadows: false,
      imageryProvider: new Cesium.SingleTileImageryProvider({
        url: "GlobalBkLayer.jpg",
      }),
    });
    Viewer._cesiumWidget._creditContainer.style.display = "none"; //是否显示cesium
  },
};
</script>

<style scoped>
</style>
