<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-19 20:18:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-04 21:21:19
-->
<template>
  <div id="cesiumContainer">
    <div class="cesiumMenu_box">
      <ul>
        <li
          v-for="(item, i) in cesiumMenuList"
          :key="i"
          :class="{ active: activeIndex === item.id }"
          @click="activeMenuItemOnClick(item)"
        >
          <span :class="['iconfont', item.icon]">{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <div class="cesiumContent_box">
      <mapView
        v-show="activeIndex === 1"
        @sendTree2dViewInfo="recept2dViewInfo"
      ></mapView>
      <mdlView v-if="activeIndex === 2"></mdlView>
      <mdlFenxi v-if="activeIndex === 3"></mdlFenxi>
      <mdlTool v-if="activeIndex === 4"></mdlTool>
    </div>
    <div class="CesiumTool" v-if="false">
      <span @click="onClickGlobe">地球显隐</span>
      <span @click="showImageLayer">地形显影</span>
      <span @click="onClickModelShow">模型显隐</span>
      <span @click="onClickWireFrame">线框/实体</span>
      <span @click="onClickUnder">地下空间</span>
      <span @click="onClickReset">复位</span>
      <span @click="isShowTool = !isShowTool">调整工具</span>
      <span @click="dig3DTerrian">地形挖掘</span>
      <span @click="clearDraw"> 清除绘制</span>
    </div>
    <adjustMdlComponent v-if="isShowTool">/</adjustMdlComponent>
  </div>
</template>

<script>
import * as Cesium from "cesium";

import adjustMdlComponent from "../../components/cesiumCompents/adjustMdlTool.vue";
import mapView from "../../components/cesiumCompents/2dView.vue";
import mdlView from "../../components/cesiumCompents/mdlView.vue";
import mdlFenxi from "../../components/cesiumCompents/mdlFenxi.vue";
import mdlTool from "../../components/cesiumCompents/mdlTool.vue";

import { CesiumUtils } from "../../utils/utils.js";
import { DrawPolygon } from "../../utils/drawUtils";
import TerrainClipPlan from "../../utils/TerrainClipPlan";

import { Notification } from "element-ui";
let tileSet = null;
let boundingSphereCenter = null;
let viewer = null;
let modelMatrix = null;
let imageryLayers = null;
// 设置这些初始值，都是应为要针对于初始tileset
export default {
  data() {
    return {
      isShowTool: false,
      flag: 0, // 记录首次加载
      oriModelMatrix: null,
      _acrgisImagelayer: null,
      _wmsImageLayer: null,
      cesiumMenuList: [
        {
          id: 1,
          checked: false,
          icon: "icon-map",
          label: "二维服务",
        },
        {
          id: 2,
          checked: false,
          icon: "icon-diqiu",
          label: "三维服务",
        },
        {
          id: 3,
          checked: false,
          icon: "icon-fenxi",
          label: "专业分析",
        },
        {
          id: 4,
          checked: false,
          icon: "icon-gongju",
          label: "实用工具",
        },
      ],
      activeIndex: 0,
    };
  },
  components: {
    adjustMdlComponent,
    mapView,
    mdlView,
    mdlFenxi,
    mdlTool,
  },
  computed: {
    mdlParmsChange() {
      return this.$store.getters.getTileMdlTool;
    },
  },
  watch: {
    // 根据变换动态旋转矩阵
    mdlParmsChange: {
      deep: true,
      handler: function (newV) {
        this.updateMatrixMdl(newV);
      },
    },
  },
  methods: {
    // 切换图层杨样式
    activeMenuItemOnClick(item) {
      item.checked = !item.checked;
      this.activeIndex = item.checked === true ? item.id : 0;
      this.cesiumMenuList.forEach((child) => {
        if (child.id !== item.id) child.checked = false;
      });
    },
    // 初始化3DTILES模型
    initCesium() {
      // 初始化地球
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
        // terrainProvider: Cesium.createWorldTerrain(),
        shadows: false,
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; //是否显示cesium

      // 初始化imagelauers
      imageryLayers = viewer.imageryLayers;
      let mdlScene = viewer.scene;

      // 是否开启深度检测深度检测
      mdlScene.globe.depthTestAgainstTerrain = true;

      // // 开启地下透明
      mdlScene.globe.translucency.enabled = true; // 开启地表透明
      mdlScene.globe.translucency.frontFaceAlphaByDistance =
        new Cesium.NearFarScalar(1000.0, 1, 1000000.0, 1);
      // 加载3Dtiles文件
      tileSet = new Cesium.Cesium3DTileset({
        // url: "http://10.101.140.3/CesiumData/3DTiles/testTile/tileset.json",
        // url: "3DTiles/geoModel/3dtiles/tileset.json",
        url: "3DTiles/model_3dtiles/tileset.json",
        // url: "http://60.205.223.69/CesiumData/3DTiles/testTile/tileset.json",
      });
      tileSet.readyPromise.then((tileset) => {
        // 向场景中添加tileset
        mdlScene.primitives.add(tileset);

        // 设置模型透明度
        // tileset.style = new Cesium.Cesium3DTileStyle({
        //   color: "color('rgba(255,255,255,1)')",
        // });
        modelMatrix = tileset.modelMatrix.clone(); // 必须要是哟个clone进行深拷贝
        boundingSphereCenter = tileset.boundingSphere.center.clone(); // 需要记录原始网格的中央坐标
        // 设置模型选装的初始值
        // 获取经度和纬度
        let cartographicCenter =
          Cesium.Cartographic.fromCartesian(boundingSphereCenter);
        let mdlCenterParams = this.getMdlDegreeCenter(cartographicCenter);
        let tempParams = JSON.parse(
          JSON.stringify(this.$store.getters.getTileMdlTool)
        );

        // tempParams.height = mdlCenterParams[0] * 4;
        // tempParams.longitude = mdlCenterParams[1];
        // tempParams.latitude = mdlCenterParams[2];
        tempParams.height = mdlCenterParams[0];
        tempParams.longitude = 113.805972;
        tempParams.latitude = 27.664014;
        this.$store.commit("setTileMdlToolInfo", tempParams);
        this.isShowTool = false; //调用工具会调用input值进行矩阵变换

        // 定位到该模型
        viewer.zoomTo(
          tileSet,
          new Cesium.HeadingPitchRange(
            0.0,
            -0.5,
            tileSet.boundingSphere.radius * 4.0
          )
        );
      });
    },
    // 加载地形服务
    loadWmsLayer(url, layers, isChecked) {
      // 判断图层是否存在
      let obj = this.layerIsExist(url);
      if (obj.flag) {
        imageryLayers._layers[obj.index].show = isChecked;
      } else {
        let wmsImageLayer = new Cesium.WebMapServiceImageryProvider({
          url: url,
          layers: layers,
          parameters: {
            transparent: true, //是否透明
            format: "image/png",
            VERSION: "1.1.1",
            srs: "EPSG:4326",
            service: "WMS",
            exceptions: "application/vnd.ogc.se_inimage",
          },
        });
        if (imageryLayers) imageryLayers.addImageryProvider(wmsImageLayer);
      }
    },
    loadWfsLayer(url, isChecked) {
      alert("只能单图层添加");
      return;
    },
    loadMapServer(url, isChecked) {
      // 判断图层是否存在
      let obj = this.layerIsExist(url);
      if (obj.flag) {
        imageryLayers._layers[obj.index].show = isChecked;
      } else {
        let acrgisImagelayer = new Cesium.ArcGisMapServerImageryProvider({
          url: url,
        });
        if (imageryLayers) imageryLayers.addImageryProvider(acrgisImagelayer);
      }
    },

    // 判断图层是否存在
    layerIsExist(url) {
      console.log(imageryLayers);
      let flag = false;
      let index = 0;
      for (let i = 0; i < imageryLayers._layers.length; i++) {
        if (imageryLayers._layers[i].imageryProvider.url === url) {
          flag = true;
          index = i;
          break;
        }
      }
      return { flag, index };
    },

    //地形显隐藏
    showImageLayer() {
      console.log(imageryLayers);
      if (imageryLayers) {
        console.log(imageryLayers._layers);
        imageryLayers._layers[1].show = !imageryLayers._layers[1].show;
      }
    },
    // 获取模型的中心经纬度
    getMdlDegreeCenter(cartographic) {
      let mdlCenterHeight;
      let mdlCenterLongitude;
      let mdlCenterLatitude;
      mdlCenterHeight = cartographic.height;
      // 弧度转经纬度
      mdlCenterLongitude = Number(
        Cesium.Math.toDegrees(cartographic.longitude).toFixed(6)
      );
      mdlCenterLatitude = Number(
        Cesium.Math.toDegrees(cartographic.latitude).toFixed(6)
      );
      return [mdlCenterHeight, mdlCenterLongitude, mdlCenterLatitude];
    },
    // 更新模型矩阵
    updateMatrixMdl(mdlParams) {
      const tranformTool = CesiumUtils.transformUtils(
        modelMatrix,
        boundingSphereCenter
      );
      const tranM = tranformTool.translationMdl(
        mdlParams.longitude,
        mdlParams.latitude,
        mdlParams.height
      );
      const rotateM = tranformTool.rotationMdl(
        mdlParams.rotateX,
        mdlParams.rotateY,
        mdlParams.rotateZ
      );
      const scaleM = tranformTool.scaleMdl(
        mdlParams.scale,
        mdlParams.scale,
        mdlParams.scale
      );
      const resultM = new Cesium.Matrix4();
      Cesium.Matrix4.multiply(tranM, rotateM, resultM);
      Cesium.Matrix4.multiply(resultM, scaleM, resultM);
      tileSet.modelMatrix = resultM;

      if (this.flag === 0) {
        this.oriModelMatrix = resultM;
        this.flag = 1;
      }
    },
    onClickGlobe() {
      if (viewer) {
        viewer.scene.globe.show = !viewer.scene.globe.show;
      }
    },
    onClickWireFrame() {
      tileSet.debugWireframe = !tileSet.debugWireframe;
    },
    onClickReset() {
      if (tileSet) {
        tileSet.modelMatrix = this.oriModelMatrix;
        viewer.flyTo(tileSet, {
          duration: 1,
          offset: new Cesium.HeadingPitchRange(
            0.0,
            -0.5,
            tileSet.boundingSphere.radius * 4.0
          ),
        });
      }
    },
    onClickUnder() {
      if (viewer) {
        viewer.scene.screenSpaceCameraController.enableCollisionDetection =
          !viewer.scene.screenSpaceCameraController.enableCollisionDetection;
      }
    },
    onClickModelShow() {
      if (tileSet) {
        tileSet.show = !tileSet.show;
      }
    },

    dig3DTerrian() {
      if (viewer.entities) {
        if (viewer.scene.globe.clippingPlanes) {
          viewer.scene.globe.clippingPlanes.removeAll();
        }
        viewer.entities.removeAll();
      }
      let drawed = new DrawPolygon(viewer);
      drawed.startCreate((digPosition) => {
        const length = digPosition.length;
        if (digPosition[length - 1] === digPosition[length - 2]) {
          digPosition.splice(length - 1);
        }
        new TerrainClipPlan(viewer, {
          points: digPosition,
          bottomMaterial: "material/excavate_bottom_min.jpg",
          wallMaterial: "material/excavate_bottom_min.jpg",
          height: 8000,
          lerpInterval: 50,
        });
      });
    },
    clearDraw() {
      if (viewer.entities) {
        if (viewer.scene.globe.clippingPlanes) {
          viewer.scene.globe.clippingPlanes.removeAll();
        }
        viewer.entities.removeAll();
      }
    },
    // 注册点击事件
    registerOnclickEvent() {
      if (viewer) {
        // 注册右键事件
        viewer.screenSpaceEventHandler.setInputAction(function (movement) {
          let pickedFeature = viewer.scene.pick(movement.position);
          if (Cesium.defined(pickedFeature)) {
            let urlStr = pickedFeature.content.url;
            let leftIndex = urlStr.indexOf("\\");
            let rightIndex = urlStr.lastIndexOf(".");
            let resStr = urlStr.substring(leftIndex + 1, rightIndex - 2);
            Notification({
              title: "标准层号",
              message: resStr,
              duration: "2000",
            });
          }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        // 注册左键事件
        viewer.screenSpaceEventHandler.setInputAction((movement) => {
          const ray = viewer.camera.getPickRay(movement.position);
          const cartesian = viewer.scene.globe.pick(ray, viewer.scene);

          if (cartesian) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian); // 获取当前点击点的世界坐标系
            if (cartographic) {
              let xy = new Cesium.Cartesian2();
              let alti = viewer.camera.positionCartographic.height;
              let level = this.getMapLevel(alti);
              if (this._acrgisImagelayer.ready) {
                xy = this._acrgisImagelayer.tilingScheme.positionToTileXY(
                  cartographic,
                  level,
                  xy
                );
                let promise = this._acrgisImagelayer.pickFeatures(
                  xy.x,
                  xy.y,
                  level,
                  cartographic.longitude,
                  cartographic.latitude
                );
                Cesium.when(promise, (layerInfo) => {
                  console.log(layerInfo);
                  //查询结果展示
                  if (layerInfo && layerInfo.length > 0) {
                    Notification({
                      title: "图层名称",
                      message: layerInfo[0].name,
                      duration: "2000",
                    });
                  }
                });
              }
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //注册左键事件
      }
    },
    getMapLevel(height) {
      if (height > 48000000) {
        return 0;
      } else if (height > 24000000) {
        return 1;
      } else if (height > 12000000) {
        return 2;
      } else if (height > 6000000) {
        return 3;
      } else if (height > 3000000) {
        return 4;
      } else if (height > 1500000) {
        return 5;
      } else if (height > 750000) {
        return 6;
      } else if (height > 375000) {
        return 7;
      } else if (height > 187500) {
        return 8;
      } else if (height > 93750) {
        return 9;
      } else if (height > 46875) {
        return 10;
      } else if (height > 23437.5) {
        return 11;
      } else if (height > 11718.75) {
        return 12;
      } else if (height > 5859.38) {
        return 13;
      } else if (height > 2929.69) {
        return 14;
      } else if (height > 1464.84) {
        return 15;
      } else if (height > 732.42) {
        return 16;
      } else if (height > 366.21) {
        return 17;
      } else {
        return 18;
      }
    },
    recept2dViewInfo(data) {
      if (data.nodeData.serviceType === "wms") {
        this.loadWmsLayer(
          data.nodeData.url,
          data.nodeData.layers,
          data.isChecked
        );
      } else if (data.nodeData.serviceType === "wfs") {
        this.loadWfsLayer(data.nodeData.url, data.isChecked);
      } else if (data.nodeData.serviceType === "mapserver") {
        this.loadMapServer(data.nodeData.url, data.isChecked);
      }
    },
    onMessageFromComponent() {},
    destroyMessage() {},
  },
  created() {
    this.onMessageFromComponent(); // 接收其他组件传递过来的值
  },
  mounted() {
    this.initCesium(); // cesim初始化必须放在mounted里面
    this.registerOnclickEvent();
  },
  beforeDestroy() {
    this.destroyMessage();
    if (viewer) {
      if (!viewer.isDestroyed()) {
        viewer.destroy();
      }
      viewer = null;
    }
  },
};
</script>

<style scoped>
.cesiumMenu_box {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 100px;
  z-index: 1;
  background-color: rgb(244, 244, 245);
}
.cesiumMenu_box ul {
  font-size: 12px;
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.cesiumMenu_box ul li {
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  margin-bottom: 1px;
}
.cesiumMenu_box ul li:hover {
  background-color: rgb(144, 147, 153);
}
.active {
  background-color: rgb(144, 147, 153);
  color: white;
}
.cesiumContent_box {
  position: absolute;
  right: 100px;
  top: 0px;
  z-index: 1;
  background-color: rgb(255, 255, 245);
}

.CesiumTool {
  position: absolute;
  top: 10px;
  color: white;
  /* width: 300px; */
  height: 100px;
  z-index: 1;
  left: 100px;
}
.CesiumTool span {
  display: inline-block;
  background-color: rgb(84, 92, 100);
  padding: 10px;
  box-shadow: 0 0 5px #fff;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}
.CesiumTool span:hover {
  cursor: pointer;
}
</style>

