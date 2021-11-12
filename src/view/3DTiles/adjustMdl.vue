<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-19 20:18:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 21:03:35
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
      <mdlView
        v-show="activeIndex === 2"
        @sendTree3dViewInfo="recept3dViewInfo"
      ></mdlView>
      <mdlFenxi
        v-if="activeIndex === 3"
        @sendFenxiInfo="receptFenxiInfo"
      ></mdlFenxi>
      <div class="CesiumTool" v-if="activeIndex === 4">
        <span @click="onClickGlobe">地球显隐</span>
        <span @click="onClickWireFrame">线框/实体</span>
        <span @click="onClickUnder">地下空间</span>
        <span @click="isShowTool = !isShowTool">调整工具</span>
        <span @click="onClickReset">复位</span>
      </div>
    </div>
    <adjustMdlComponent v-show="isShowTool">/</adjustMdlComponent>
  </div>
</template>

<script>
import * as Cesium from "cesium";

import adjustMdlComponent from "../../components/cesiumComponents/adjustMdlTool.vue";
import mapView from "../../components/cesiumComponents/2dView.vue";
import mdlView from "../../components/cesiumComponents/mdlView.vue";
import mdlFenxi from "../../components/cesiumComponents/mdlFenxi.vue";
import mdlTool from "../../components/cesiumComponents/mdlTool.vue";

import { CesiumUtils } from "../../utils/utils.js";
import { DrawPolygon } from "../../utils/drawUtils";
import TerrainClipPlan from "../../utils/TerrainClipPlan";

import { Notification } from "element-ui";
import PathGraphics from "cesium/Source/DataSources/PathGraphics";
let tileSetList = [];
let viewer = null;
let imageryLayers = null;
// 设置这些初始值，都是应为要针对于初始tileset
export default {
  data() {
    return {
      isShowTool: false,
      flag: 0, // 记录首次加载
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
      activeImageUrl: [
        "https://tsy-gis1.portal.com/server/rest/services/geoinfo_geomap/MapServer/",
        "https://tsy-gis1.portal.com/server/services/geoinfo_geomap/MapServer/WMSServer",
        "http://192.10.3.237/geoserver/crcc-dev/wms",
        "http://192.10.3.237/geoserver/wms",
        "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:geoboundzone&maxFeatures=50&outputFormat=application/json",
      ],
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
    cesiumMenuList: {
      deep: true,
      handler: function (newV) {
        if (!newV[3].checked) this.isShowTool = false;
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
        // terrainProvider: new Cesium.createWorldTerrain(), // 这一块接口容易失败
        shadows: false,
        imageryProvider:new Cesium.SingleTileImageryProvider({ url: "GlobalBkLayer.jpg" }),// 简单加载，解决无法加载地图的问题
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

      // 将三维球定位到中国
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
        orientation: {
          heading: Cesium.Math.toRadians(348.4202942851978),
          pitch: Cesium.Math.toRadians(-89.74026687972041),
          roll: Cesium.Math.toRadians(0),
        },
        complete: function callback() {
          // 定位完成之后的回调函数
        },
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
    loadWfsLayer(url, name, isChecked) {
      let flagObj = this.kmlSourceIsExist(name);
      console.log(flagObj);
      if (flagObj.flag) {
        flagObj.dataSource.show = isChecked;
        return;
      }
      this.$http.get(url).then(async (res) => {
        // res.data就是真是geojson数据
        let datasource = await Cesium.GeoJsonDataSource.load(res.data);
        datasource.name = name;
        viewer.dataSources.add(datasource);
        viewer.flyTo(datasource.entities);
      });

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
    loadTDMapLayer(url, layers, isChecked) {
      let obj = this.layerIsExist(url);
      if (obj.flag) {
        imageryLayers._layers[obj.index].show = isChecked;
        return;
      }
      const subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
      let wmtsImageLayer = new Cesium.WebMapTileServiceImageryProvider({
        url: url,
        subdomains: subdomains,
        layer: layers,
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: true,
      });
      imageryLayers.addImageryProvider(wmtsImageLayer);
    },

    // 加载kml文件
    loadKmlSource(url, name, isChecked) {
      // 判断是否加载过kml
      let flagObj = this.kmlSourceIsExist(name);
      if (flagObj.flag) {
        flagObj.dataSource.show = isChecked;
        return;
      }
      let kmlOptions = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true, // 开启贴地
      };
      let geocachePromise = Cesium.KmlDataSource.load(url, kmlOptions);
      geocachePromise.then((dataSource) => {
        dataSource.name = name;
        viewer.dataSources.add(dataSource);
        viewer.flyTo(dataSource.entities);
      });
    },
    // 加载三维模型
    async load3dTiles(url, name, isChecked) {
      if (url === "") return;
      const loadFlagObj = this.judgeIs3DTiles(url);
      if (loadFlagObj.flag) {
        loadFlagObj.tile.show = isChecked;
        return;
      }
      // 加载3Dtiles文件
      let tileSet = new Cesium.Cesium3DTileset({
        url: url,
      });
      const tileset = await tileSet.readyPromise;
      console.log(tileset);
      // 向场景中添加tileset
      viewer.scene.primitives.add(tileset);

      let modelMatrix = tileset.modelMatrix.clone(); // 必须要是哟个clone进行深拷贝
      let boundingSphereCenter = tileset.boundingSphere.center.clone(); // 需要记录原始网格的中央坐标

      tileSetList.push({
        tileSet: tileset,
        modelMatrix: modelMatrix,
        boundingSphereCenter: boundingSphereCenter,
        name: name,
      });
      // 设置模型选装的初始值
      // 获取经度和纬度
      let cartographicCenter =
        Cesium.Cartographic.fromCartesian(boundingSphereCenter);
      let mdlCenterParams = this.getMdlDegreeCenter(cartographicCenter);
      let tempParams = JSON.parse(
        JSON.stringify(this.$store.getters.getTileMdlTool)
      );
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
      // });
    },

    // 判断三维模型是否存在
    judgeIs3DTiles(mdlUrl) {
      const tilePrimitives = viewer.scene.primitives._primitives;
      if (tilePrimitives.length === 0)
        return {
          flag: false,
          tile: null,
        };
      for (let i = 0; i < tilePrimitives.length; i++) {
        if (tilePrimitives[i]._url === mdlUrl) {
          return {
            flag: true,
            tile: tilePrimitives[i],
          };
        }
      }
      return {
        flag: false,
        tile: null,
      };
    },
    // 判断图层是否存在
    layerIsExist(url) {
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
    // 判断kml有没有加载过
    kmlSourceIsExist(name) {
      let flag = false;
      let dataSource = null;
      let dataSourceList = viewer.dataSources._dataSources;
      if (dataSourceList.length === 0) return { flag, dataSource };

      for (let i = 0; i < dataSourceList.length; i++) {
        if (dataSourceList[i].name === name) {
          flag = true;
          dataSource = dataSourceList[i];
          break;
        }
      }
      return {
        flag,
        dataSource,
      };
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
    updateMatrixMdl(mdlParams, url) {
      if (tileSetList.length === 0) return;
      for (let i = 0; i < tileSetList.length; i++) {
        const tranformTool = CesiumUtils.transformUtils(
          tileSetList[i].modelMatrix,
          tileSetList[i].boundingSphereCenter
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
        tileSetList[i].tileSet.modelMatrix = resultM;

        viewer.scene.globe.translucency.frontFaceAlphaByDistance.nearValue =
          Cesium.Math.clamp(mdlParams.alpha, 0.0, 1.0);
      }
    },
    onClickGlobe() {
      if (viewer) {
        viewer.scene.globe.show = !viewer.scene.globe.show;
      }
    },
    onClickWireFrame() {
      let tileSetList = viewer.scene.primitives._primitives;
      if (tileSetList.length === 0) return;
      tileSetList.forEach((item) => {
        item.debugWireframe = !item.debugWireframe;
      });
    },
    //复位
    onClickReset() {
      if (tileSetList.length === 0) return;
      viewer.flyTo(tileSetList[0].tileSet, {
        duration: 1,
        offset: new Cesium.HeadingPitchRange(
          0.0,
          -0.5,
          tileSetList[0].tileSet.boundingSphere.radius * 4.0
        ),
      });
    },
    onClickUnder() {
      if (viewer) {
        viewer.scene.screenSpaceCameraController.enableCollisionDetection =
          !viewer.scene.screenSpaceCameraController.enableCollisionDetection;
      }
    },

    // 地形开挖
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
            if (leftIndex === -1) {
              leftIndex = urlStr.indexOf("%5C") + 2;
            }
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
              // 只有显示的并且是geoserver和arcgisserver的可以用
              // 确定哪个图层可查
              let tempImageryProvider = this.getQueryImageryProvider();
              if (!tempImageryProvider) return;
              if (tempImageryProvider.ready) {
                xy = tempImageryProvider.tilingScheme.positionToTileXY(
                  cartographic,
                  level,
                  xy
                );
                let promise = tempImageryProvider.pickFeatures(
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
    // 获取能够查询imageryProvider
    getQueryImageryProvider() {
      let tempImagerys = imageryLayers._layers;
      for (let i = 0; i < tempImagerys.length; i++) {
        let url = tempImagerys[i].imageryProvider.url;
        if (this.activeImageUrl.indexOf(url) >= 0 && tempImagerys[i].show)
          return tempImagerys[i].imageryProvider;
      }
      return null;
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
        this.loadWfsLayer(
          data.nodeData.url,
          data.nodeData.name,
          data.isChecked
        );
      } else if (data.nodeData.serviceType === "mapserver") {
        this.loadMapServer(data.nodeData.url, data.isChecked);
      } else if (data.nodeData.serviceType === "kml") {
        this.loadKmlSource(
          data.nodeData.url,
          data.nodeData.name,
          data.isChecked
        );
      } else if (data.nodeData.serviceType === "天地图") {
        this.loadTDMapLayer(
          data.nodeData.url,
          data.nodeData.layers,
          data.isChecked
        );
      }
    },
    recept3dViewInfo(data) {
      if (data.nodeData.serviceType === "3DTiles") {
        this.load3dTiles(data.nodeData.url, data.nodeData.name, data.isChecked);
      }
    },
    receptFenxiInfo(data) {
      if (data.label === "地形挖掘") {
        this.dig3DTerrian();
      } else if (data.label === "清除绘制") {
        this.clearDraw();
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
    tileSetList = [];
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
  position: fixed;
  top: 160px;
  color: white;
  /* width: 300px; */
  height: 100px;
  z-index: 1;
  right: 102px;
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

