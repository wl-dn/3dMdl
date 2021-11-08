<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-19 15:49:34
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-19 19:57:45
-->

<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import * as Cesium from "cesium";
export default {
  data() {
    return {
      loadBIM3DTitles() {
        var viewer = new Cesium.Viewer("cesiumContainer",{
          terrainProvider:Cesium.createWorldTerrain() // 加载世界坐标系
        });
        // 开启深度检测https://blog.csdn.net/qq_38956940/article/details/113096231?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.control&spm=1001.2101.3001.4242
        viewer.scene.globe.depthTestAgainstTerrain = true;

        var scene = viewer.scene;

        // 隐藏球
        scene.globe.show = false
        // 加载3dtitles监视器
        viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
        // 加载3DTitles
        var tileset = scene.primitives.add(
          new Cesium.Cesium3DTileset({
             url: Cesium.IonResource.fromAssetId(8564),

          })
        );

      // 定位到该地区
      //zoomTo会定位到该模型的区域
      // params:target必填项（目标对象），offset是偏移量：航向（弧度）、俯仰角（弧度）、具体目标模型的距离
        tileset.readyPromise
          .then(function (tileset) {
            console.log(tileset.boundingSphere.radius);
            viewer.zoomTo(
              tileset,
              new Cesium.HeadingPitchRange(
                0.5,
                -0.2,
                tileset.boundingSphere.radius*8.0
              )
            );
          })
          .otherwise(function (error) {
            console.log(error);
          });
      },
    };
  },
  components: {},
  mounted() { 
    this.loadBIM3DTitles();
  }
};
</script>

<style scoped>
</style>