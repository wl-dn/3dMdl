<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-25 15:37:11
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-27 16:31:21
-->
<template>
  <div class="TilesThree" id="TilesThree"></div>
</template>

<script>
import * as THREE from "three";
import { TilesRenderer, DebugTilesRenderer } from "3d-tiles-renderer";
import { ThreeUtils } from "../../utils/utils";
export default {
  data() {
    return {
      initFlag: 0,
    };
  },
  methods: {
    load3DTiles() {
      const SCRC = ThreeUtils.initScene(document.getElementById("TilesThree"));
      const { scene, camera, renderer, controls } = SCRC;

      const helper = new THREE.CameraHelper(camera);
      scene.add(helper);

      // const tilesRenderer = new TilesRenderer(
      //   "http://10.101.140.3/CesiumData/3DTiles/data/tileset.json"
      // );
      const tilesRenderer = new DebugTilesRenderer(
        "http://10.101.140.3/CesiumData/3DTiles/north/tileset.json"
      );
      tilesRenderer.displayBoxBounds = true;
      tilesRenderer.displaySphereBounds = true;
      tilesRenderer.displayActiveTiles = true;
      tilesRenderer.onLoadModel = (scene) => {
        scene.traverse((mesh) => {
          // console.log(mesh);
          mesh.scale.set(1, 1, 1);
        });
      };
      tilesRenderer.setCamera(camera);
      tilesRenderer.setResolutionFromRenderer(camera, renderer);
      scene.add(tilesRenderer.group);
      // 创建渲染器必须的
      this.animate(renderer, scene, camera, tilesRenderer, controls);
    },

    // 动画
    animate(renderer, scene, camera, tilesRenderer, controls) {
      requestAnimationFrame(() =>
        this.animate(renderer, scene, camera, tilesRenderer, controls)
      );

      this.transLateMdl(tilesRenderer);
      controls.update();
      camera.updateMatrixWorld();
      tilesRenderer.update();
      renderer.render(scene, camera);
    },
    // 移动模型模型
    transLateMdl(tilesRenderer) {
      if (this.initFlag === 0 && tilesRenderer.root) {
        let vectorCenter = ThreeUtils.getSphereCenter(tilesRenderer.root);
        tilesRenderer.group.position.set(
          -vectorCenter.x,
          -vectorCenter.y,
          -vectorCenter.z
        );
        this.initFlag = 1;
      }
    },
 
  },
  components: {},
  mounted() {
    this.load3DTiles();
  },
};
</script>

<style scoped>
.TilesThree {
  height: 100%;
  width: 100%;
}
</style>
