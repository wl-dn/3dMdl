<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-19 10:01:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-04 17:20:06
-->
<template>
  <div class="geoMdl_box">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import * as Cesium from "cesium";
import { CesiumUtils } from "../../utils/utils.js";
let viewer = null;
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    initCesium() {
      viewer = new Cesium.Viewer("cesiumContainer", {
        terrainProvider: Cesium.createWorldTerrain(),
      });
      const tileSet = new Cesium.Cesium3DTileset({
        url: "http://10.101.140.3/CesiumData/3DTiles/testTile/tileset.json",
      });
      viewer.scene.globe.depthTestAgainstTerrain = true;

      tileSet.readyPromise.then((tileset) => {
        viewer.scene.primitives.add(tileset);
        const modelMatrix = tileset.modelMatrix.clone();
        const boundingSphereCenter = tileset.boundingSphere.center;
        console.log(boundingSphereCenter);
        const transformTool = CesiumUtils.transformUtils(modelMatrix,boundingSphereCenter);
        const transM = transformTool.translationMdl(109.3062,21.66081,500);
        const rotateM = transformTool.rotationMdl(17.9,-7.3,0);
        const resultmM = Cesium.Matrix4.multiply(transM,rotateM,new Cesium.Matrix4());
        tileset.modelMatrix = resultmM;
      });
      viewer.zoomTo(tileSet);
    },

    getRotateMatrix4(rotateM3, modelMatrix, boundingSphereCenter) {
      const tmp = Cesium.Matrix4.clone(modelMatrix);
      const tilesetMat = Cesium.Matrix4.fromArray(Cesium.Matrix4.toArray(tmp));
      // 根据仿射变换矩阵获取左上角的3×3的旋转矩阵
      const tilesetMatRotation = Cesium.Matrix4.getMatrix3(
        tilesetMat,
        new Cesium.Matrix3()
      );

      // 计算逆矩阵
      const inverseTilesetMatRotation = Cesium.Matrix3.inverse(
        tilesetMatRotation,
        new Cesium.Matrix3()
      );
      // 获取矩阵的平移部分
      const tilesetMatTranslation = Cesium.Matrix4.getTranslation(
        tilesetMat,
        new Cesium.Cartesian3()
      );
      // 创建以tileset的中心为原点的坐标系
      // 构建原始中心到世界坐标中心的变换矩阵
      const originMat =
        Cesium.Transforms.eastNorthUpToFixedFrame(boundingSphereCenter);
      console.log(originMat);
      const originMatRotation = Cesium.Matrix4.getMatrix3(
        originMat,
        new Cesium.Matrix3()
      );
      const originMatTranslation = Cesium.Matrix4.getTranslation(
        originMat,
        new Cesium.Cartesian3()
      );

      // 从平移矩阵返回一个matrix4的矩阵
      const tilesetToOriginTranslation = Cesium.Matrix4.fromTranslation(
        // 为什么要subtract？
        // tileset减origin得到的矩阵能将模型负向移动origin的偏移量
        Cesium.Cartesian3.subtract(
          tilesetMatTranslation,
          originMatTranslation,
          new Cesium.Cartesian3()
        ),
        new Cesium.Matrix4()
      );
      // 从左上角代表的martix3旋转矩阵获取代表martix4的旋转矩阵
      const tilesetToOriginRotation = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.inverse(
          Cesium.Matrix3.multiply(
            inverseTilesetMatRotation,
            originMatRotation,
            new Cesium.Matrix3()
          ),
          new Cesium.Matrix4()
        )
      );

      const rotateM4 = Cesium.Matrix4.fromRotationTranslation(rotateM3);

      // 转过去
      Cesium.Matrix4.multiply(originMat, rotateM4, originMat);
      // 调整角度
      Cesium.Matrix4.multiply(originMat, tilesetToOriginRotation, originMat);
      // 转回来
      Cesium.Matrix4.multiply(originMat, tilesetToOriginTranslation, originMat);
      return originMat;
    },
  },
  mounted() {
    this.initCesium();
  },
};
</script>

<style scoped>
.geoMdl_box {
  height: 100%;
  width: 100%;
}
</style>
