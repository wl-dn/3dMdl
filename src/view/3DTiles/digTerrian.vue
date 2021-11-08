<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-23 14:08:28
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-27 14:26:52
-->
<template>
  <div class="digTerrian_box">
    <div id="cesiumContainer"></div>

    <div class="ToolBox">
      <el-input
        v-model="inputHeight"
        placeholder="输入挖掘深度"
        onkeyup="value=value.replace(/[^\d]/g,'')"
      ></el-input>
      <el-button @click="startDig">开始挖掘</el-button>
    </div>
  </div>
</template>

<script>
let viewer = null;
import * as Cesium from "cesium";
import { CesiumUtils } from "../../utils/utils.js";
export default {
  data() {
    return {
      inputHeight: "1000",
      handler: null,
      pointsList: [],
    };
  },
  components: {},
  methods: {
    initCesium() {
      viewer = new Cesium.Viewer("cesiumContainer", {
        terrainProvider: Cesium.createWorldTerrain(),
      });
      this.drawTool = CesiumUtils.drawUtils(viewer);
    },
    startDig() {
      let digHeight = Number(this.inputHeight);
      if (!this.handler)
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      if (viewer.entities) viewer.entities.removeAll();
      this.handler.setInputAction((movement) => {
        const position = this.getCoordinateFXY(movement.position);
        this.pointsList.push(position);
        let tempLength = this.pointsList.length;
        this.drawTool.drawPointEntity(position);
        if (tempLength > 1) {
          this.drawTool.drawPolyLineEntity([
            this.pointsList[tempLength - 2],
            this.pointsList[tempLength - 1],
          ]);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      this.handler.setInputAction((movement) => {},
      Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      this.handler.setInputAction((movement) => {
        const position = this.getCoordinateFXY(movement.position);
        if (position) {
          let tempLength = this.pointsList.length;
          if (tempLength < 3) {
            alert("请选择3个以上的点再执行闭合操作命令");
          } else {
            //闭合最后一条线
            this.drawTool.drawPolyLineEntity([
              this.pointsList[tempLength - 1],
              this.pointsList[0],
            ]);
            if (viewer.scene.highDynamicRangeSupported) {
              viewer.scene.highDynamicRange = true;
            }
            this.drawTool.drawTerrianDig(this.pointsList, {
              bottomMaterial: "material/excavate_bottom_min.jpg",
              wallMaterial: "material/excavate_bottom_min.jpg",
              height: digHeight,
              lerpInterval: 50,
            });

            this.pointsList = [];
            this.handler.destroy(); //关闭事件句柄
            this.handler = null;
          }
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    //屏幕坐标转地表坐标-获取加载地形后对应的经纬度和高程。是贴地的
    getCoordinateFXY(position) {
      let ray = viewer.camera.getPickRay(position);
      let rposition = viewer.scene.globe.pick(ray, viewer.scene);
      return rposition;
    },
  },
  mounted() {
    this.initCesium();
  },
};
</script>

<style scoped>
.digTerrian_box {
  height: 100%;
  width: 100%;
}
.ToolBox {
  z-index: 1;
  position: absolute;
  top: 40px;
  left: 20px;
  color: aliceblue;
}
.el-button {
  margin-top: 10px;
  float: right;
}
</style>
