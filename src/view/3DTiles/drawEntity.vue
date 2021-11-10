<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-23 14:06:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-10 10:28:50
-->
<template>
  <div class="drawEntity_Box">
    <div id="cesiumContainer"></div>
    <drawTool></drawTool>
  </div>
</template>

<script>
import * as Cesium from "cesium";
import drawTool from "../../components/cesiumComponents/drawTool.vue";
import eventVue from "../../plugins/eventVue";
import {CesiumUtils} from "../../utils/utils"

let viewer = null;
export default {
  data() {
    return {
      drawTool: null,
      handler: null,
      pointsList: [],
    };
  },
  components: {
    drawTool,
  },
  methods: {
    initCesium() {
      viewer = new Cesium.Viewer("cesiumContainer", {
        terrainProvider: Cesium.createWorldTerrain(),
        infoBox: false,
      });
      viewer.scene.globe.depthTestAgainstTerrain = true;
      // const tileset = new Cesium.Cesium3DTileset({
      //   url: Cesium.IonResource.fromAssetId(354759),
      // });
      // viewer.scene.primitives.add(tileset);
      // viewer.zoomTo(tileset);
    },
    //绘制点
    drawPoint() {
      this.handler.setInputAction((movement) => {
        // 得到笛卡尔坐标系下的坐标
        // const position = viewer.camera.pickEllipsoid(
        //   movement.position,
        //   viewer.scene.globe.ellipsoid
        // );
        const position = this.getCoordinateFXY(movement.position);
        console.log(position);
        if (this.drawTool) this.drawTool.drawPointEntity(position);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      this.handler.setInputAction((movement) => {},
      Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      this.handler.setInputAction((movement) => {
        this.handler.destroy();
        this.handler = null;
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    // 绘制线
    drawLine() {
      this.handler.setInputAction((movement) => {
        // 得到笛卡尔坐标系下的坐标
        // const position = viewer.camera.pickEllipsoid(
        //   movement.position,
        //   viewer.scene.globe.ellipsoid
        // );
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
        return;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      this.handler.setInputAction((movement) => {},
      Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      this.handler.setInputAction((movement) => {
        this.handler.destroy();
        this.handler = null;
        this.pointsList = [];
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    // 绘制面
    drawPolygon() {
      this.handler.setInputAction((movement) => {
        // 得到笛卡尔坐标系下的坐标
        // const position = viewer.camera.pickEllipsoid(
        //   movement.position,
        //   viewer.scene.globe.ellipsoid
        // );
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
        // let position = viewer.camera.pickEllipsoid(
        //   movement.position,
        //   viewer.scene.globe.ellipsoid
        // );
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

            this.drawTool.drawPolygonEntity(this.pointsList);
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
  created() {
    eventVue.$on("sendDrawParams", (res) => {
      if (!this.handler)
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      if (!this.drawTool)
        this.drawTool = CesiumUtils.drawUtils(viewer);
      if (this.pointsList.length > 0) this.pointsList = [];
      if (res === "deleteDraw") {
        this.drawTool = null;
        viewer.entities.removeAll();
        this.handler.destroy();
        this.handler = null;
        this.pointsList = [];
      } else if (res === "point") {
        this.drawPoint();
      } else if (res === "polyline") {
        this.drawLine();
      } else if (res === "polygon") {
        this.drawPolygon();
      }
    });
  },
  mounted() {
    this.initCesium();
  },
  beforeDestroy() {
    eventVue.$off("sendDrawParams");
  },
};
</script>

<style scoped>
.drawEntity_Box {
  height: 100%;
  width: 100%;
}
</style>
