<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-19 20:18:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-30 14:29:55
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
    <!-- 右边导航功能栏 -->
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
      <div class="mdlTool_box" v-if="activeIndex === 4">
        <el-select
          v-model="mdlNameValue"
          placeholder="请选择模型"
          @change="selectOnMdlchange"
        >
          <el-option
            v-for="item in mdlOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- cesium通过工具 -->
    <cesiumCommonTool
      @commonToolHandleOnClick="commonToolHandleOnClick"
      :isCesiumCommonToolVisible="isCesiumCommonToolVisible"
    ></cesiumCommonTool>
    <adjustMdlComponent
      v-show="isShowTool"
      :isWireframevCheck="isWireframevCheck"
      @sendWifeinfo="receptWifeinfo"
      >/</adjustMdlComponent
    >
    <!-- 钻孔分层显示信息 -->
    <holeLayerInfo
      :drillname="drillName"
      :layerInfo="layerInfo"
      :isVisible="isLayerDialogVisible"
      @sendCloseLayerDialog="isLayerDialogVisible = false"
    ></holeLayerInfo>

    <virtualBox
      :tableData="tableCommonData"
      :isVisible="isvirtualLayerDialogVisible"
      @sendCloseVirtualDialog="isvirtualLayerDialogVisible = false"
    ></virtualBox>

    <commonTableBox
      :virtualLayerInfo="virtualLayerInfo"
      :isCommonVisible="isCommonVisible"
      @sendCommonCloseInfo="isCommonVisible = false"
    ></commonTableBox>

    <!--  搜索框 -->
    <searchBar @sendSearchParmsFromSerachBar="receptSearchInfo"></searchBar>
  </div>
</template>

<script>
import * as Cesium from "cesium";

import adjustMdlComponent from "../../components/cesiumComponents/adjustMdlTool.vue";
import mapView from "../../components/cesiumComponents/2dView.vue";
import mdlView from "../../components/cesiumComponents/mdlView.vue";
import mdlFenxi from "../../components/cesiumComponents/mdlFenxi.vue";
import cesiumCommonTool from "../../components/cesiumComponents/cesiumCommonTool.vue";
import holeLayerInfo from "../../components/toolComponents/holeLayerInfo.vue";
import virtualBox from "../../components/toolComponents/virtualHoleInfo.vue";
import searchBar from "../../components/toolComponents/searchComopent.vue";
import commonTableBox from "../../components/toolComponents/commonTableInfo.vue";

import { CesiumUtils } from "../../utils/utils.js";
import { DrawPolygon } from "../../utils/drawUtils";
import TerrainClipPlan from "../../utils/TerrainClipPlan";

import { Notification } from "element-ui";

let tileSetList = [];
let viewer = null;
let imageryLayers = null;
var moveHighlighted = {
  feature: undefined,
  originalColor: new Cesium.Color(),
};
let rightClickHighted = {
  feature: undefined,
  originalColor: new Cesium.Color(),
};

let dbClickRay = null;

// 设置这些初始值，都是应为要针对于初始tileset
export default {
  data() {
    return {
      isShowTool: false,
      flag: 0, // 记录首次加载
      mdlNameValue: "", // 记录选择的模型名称
      mdlOptions: [], // 记录加载过的模型
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
          label: "模型工具",
        },
      ],
      activeIndex: 0,
      isWireframevCheck: false,
      mdlName: "",
      layerInfo: [],
      drillName: "Jz-Ⅲ2101-123533-2",
      isLayerDialogVisible: false,
      isMdlSelectVisible: false,
      isCesiumCommonToolVisible: true,
      activeImageUrl: [
        "https://tsy-gis1.portal.com/server/rest/services/geoinfo_geomap/MapServer/",
        "https://tsy-gis1.portal.com/server/services/geoinfo_geomap/MapServer/WMSServer",
        "http://192.10.3.237/geoserver/crcc-dev/wms",
        "http://192.10.3.237/geoserver/wms",
        "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:geoboundzone&maxFeatures=50&outputFormat=application/json",
      ],

      // 图形是否闪烁
      flashX: 0.5,
      flashFlag: true,

      activeDoubleEvent: false, // 是否激活双击事件
      flagTimer: null, // 区分单击和双击

      //虚拟钻孔
      isvirtualLayerDialogVisible: false,
      virtualLayerInfo: [],

      // 通用盒子信息
      isCommonVisible: true,
    };
  },
  components: {
    adjustMdlComponent,
    mapView,
    mdlView,
    mdlFenxi,
    cesiumCommonTool,
    holeLayerInfo,
    searchBar,
    virtualBox,
    commonTableBox,
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
        if (!newV[3].checked) {
          this.isShowTool = false;
          this.mdlNameValue = "";
        }
      },
    },
    isShowTool(val) {
      if (val) {
        let tempParams = JSON.parse(
          JSON.stringify(this.$store.getters.getTileMdlTool)
        );
        for (let i = 0; i < tileSetList.length; i++) {
          if (tileSetList[i].name === this.mdlName) {
            tempParams.longitude = tileSetList[i].longitude;
            tempParams.latitude = tileSetList[i].latitude;
            tempParams.height = tileSetList[i].height;
            this.$store.commit("setTileMdlToolInfo", tempParams);
          }
        }
      }
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
        shadows: false,

        // terrainProvider: new Cesium.createWorldTerrain(), // Cesium在线Ion地形,地图上有3d起伏的地形 这一块接口容易失败
        // terrainProvider:new Cesium.CesiumTerrainProvider(url), // 加载自定义的地形
        // terrainProvider: new Cesium.EllipsoidTerrainProvider(), // 不适用地形

        imageryProvider: new Cesium.SingleTileImageryProvider({
          url: "GlobalBkLayer.jpg",
        }), // 简单加载，解决无法加载地图的问题
      });

      // 加载三维地形
      let terrainProvider = new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(3957),
        requestVertexNormals: true,
        requestWaterMask: true,
      });
      viewer.terrainProvider = terrainProvider;

      viewer._cesiumWidget._creditContainer.style.display = "none"; //是否显示cesium标识

      // 初始化imagelauers
      imageryLayers = viewer.imageryLayers;
      let mdlScene = viewer.scene;

      // viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin); 3dtiles监视器
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
    selectOnMdlchange(val) {
      this.mdlName = val;
      let tempParams = JSON.parse(
        JSON.stringify(this.$store.getters.getTileMdlTool)
      );
      for (let i = 0; i < tileSetList.length; i++) {
        if (tileSetList[i].name === this.mdlName) {
          tempParams.longitude = tileSetList[i].longitude;
          tempParams.latitude = tileSetList[i].latitude;
          tempParams.height = tileSetList[i].height;
          this.$store.commit("setTileMdlToolInfo", tempParams);
        }
      }

      this.isShowTool = true;
    },
    // 加载三维模型
    async load3dTiles(url, name, isChecked, label) {
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
      tileset.name = name;
      // 向场景中添加tileset
      viewer.scene.primitives.add(tileset);

      let modelMatrix = tileset.modelMatrix.clone(); // 必须要是哟个clone进行深拷贝
      let boundingSphereCenter = tileset.boundingSphere.center.clone(); // 需要记录原始网格的中央坐标

      // 设置模型选装的初始值
      // 获取经度和纬度
      let cartographicCenter =
        Cesium.Cartographic.fromCartesian(boundingSphereCenter);
      let mdlCenterParams = this.getMdlDegreeCenter(cartographicCenter);
      let tempParams = JSON.parse(
        JSON.stringify(this.$store.getters.getTileMdlTool)
      );
      tempParams.longitude = mdlCenterParams[1];
      tempParams.latitude = mdlCenterParams[2];
      tempParams.height = mdlCenterParams[0];

      // 根据不同的模型设置不同的位移参数
      if (name === "3dmdl") {
        // tempParams.longitude = 113.805972;
        // tempParams.latitude = 27.664014;
        // tempParams.height = -1687;
      } else if (name === "holemdl") {
        tempParams.longitude = 113.624622;
        tempParams.latitude = 27.849269;
        // tempParams.height = -1693;
      } else if (name === "sec1mdl") {
        // tempParams.longitude = 113.858972;
        // tempParams.latitude = 27.749514;
        // tempParams.height = 1165;
      } else if (name === "sec2mdl") {
        // tempParams.longitude = 113.988072;
        // tempParams.latitude = 27.505514;
        // tempParams.height = 90;
        // tempParams.height = 1165;
      } else if (name === "sec3mdl") {
        // tempParams.longitude = 113.978072;
        // tempParams.latitude = 27.402714;
        // tempParams.height = -20;
        // tempParams.height = 1165;
      } else {
      }

      // 缓存数据
      tileSetList.push({
        tileSet: tileset,
        modelMatrix: modelMatrix,
        boundingSphereCenter: boundingSphereCenter,
        name: name,
        longitude: tempParams.longitude,
        latitude: tempParams.latitude,
        height: tempParams.height,
      });
      this.mdlOptions.push({
        value: name,
        label: label,
      });
      this.mdlName = name;

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

    // 加载广告牌
    async loadHoleLayer(url, name, isChecked) {
      let flagObj = this.billbordsIsExist(name);
      if (flagObj.isChecked) {
        flagObj.obj.show = isChecked;
        return;
      }
      //初始化广告牌
      let billboards = viewer.scene.primitives.add(
        new Cesium.BillboardCollection()
      );
      billboards.name = name;
      let holeResult = await this.$http.get(url);
      for (let i = 0; i < holeResult.data.data.length; i++) {
        let lon = holeResult.data.data[i].borelon;
        let lat = holeResult.data.data[i].borelat;
        let label = holeResult.data.data[i].worksiteid;
        const position = Cesium.Cartesian3.fromDegrees(lon, lat);
        this.addHolePrimitive(billboards, position, label);
      }
      console.log(billboards);
      this.billbordsIsExist(1);
    },

    // 加载广告牌（钻孔）
    addHolePrimitive(billboards, position, label) {
      let image = document.createElement("img");
      image.src = require("../../assets/images/hole.png");
      image.onload = (e) => {
        // 异步加载的过程
        billboards.add({
          position: position,
          // image: require("../../assets/images/hole.png"),
          image: this.drawCanvas(image, label, 10), // 绘制带注记的秃瓢
          show: true,

          pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
          eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
          scale: 2.0, // default: 1.0
          color: Cesium.Color.LIME, // default: WHITE
          // rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
          alignedAxis: Cesium.Cartesian3.ZERO, // default
          // width: 10, // default: undefined
          // height: 10, // default: undefined
          id: label,
        });
      };
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
        if (
          tilePrimitives[i] instanceof Cesium.Cesium3DTileset &&
          tilePrimitives[i]._url === mdlUrl
        ) {
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
    // 判断是否加载过billbords
    billbordsIsExist(name) {
      let primitivesList = viewer.scene._primitives._primitives;
      let flagObj = {
        isChecked: false,
        obj: null,
      };
      for (let i = 0; i < primitivesList.length; i++) {
        if (
          primitivesList[i] instanceof Cesium.BillboardCollection &&
          primitivesList[i].name === name
        ) {
          flagObj.isChecked = true;
          flagObj.obj = primitivesList[i];
        }
      }
      return flagObj;
    },
    // 获取模型的经纬度和拾取高度
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
      if (tileSetList.length === 0) return;
      for (let i = 0; i < tileSetList.length; i++) {
        if (tileSetList[i].name === this.mdlName) {
          // 偏移
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
      }
    },
    // 根据图片和文字绘制canvas
    drawCanvas(img, text, fontsize) {
      var canvas = document.createElement("canvas"); //创建canvas标签
      var ctx = canvas.getContext("2d");

      // ctx.fillStyle = "#99f";
      ctx.font = fontsize + "px Arial";

      canvas.width = ctx.measureText(text).width + fontsize * 2; //根据文字内容获取宽度
      canvas.height = fontsize * 2; // fontsize * 1.5

      ctx.drawImage(img, fontsize / 2, fontsize / 2, fontsize, fontsize);

      ctx.fillStyle = "#000";
      ctx.font = fontsize + "px Calibri,sans-serif";
      ctx.shadowOffsetX = 1; //阴影往左边偏，横向位移量
      ctx.shadowOffsetY = 0; //阴影往左边偏，纵向位移量
      ctx.shadowColor = "#fff"; //阴影颜色
      ctx.shadowBlur = 1; //阴影的模糊范围
      ctx.fillText(text, (fontsize * 7) / 6, (fontsize * 4) / 3);
      return canvas;
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
    onClickUnder() {},

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
    // 清除绘制
    clearDraw() {
      if (viewer.entities) {
        if (viewer.scene.globe.clippingPlanes) {
          viewer.scene.globe.clippingPlanes.removeAll();
        }
        viewer.entities.removeAll();
      }
      this.activeDoubleEvent = false;
    },
    // 注册cesium事件
    registerOnclickEvent() {
      if (viewer) {
        // 注册右键事件
        viewer.screenSpaceEventHandler.setInputAction((movement) => {
          // If a feature was previously highlighted, undo the highlight
          if (Cesium.defined(rightClickHighted.feature)) {
            rightClickHighted.feature.color = rightClickHighted.originalColor;
            rightClickHighted.feature = undefined;
          }

          // Pick a new feature
          var pickedFeature = viewer.scene.pick(movement.position);
          if (!Cesium.defined(pickedFeature)) {
            // this.isLayerDialogVisible = false;
            return;
          }

          //undo the moveFeature Highlight the feature
          // moveHighlighted.feature.color = moveHighlighted.originalColor;
          // moveHighlighted.feature = undefined;

          rightClickHighted.feature = pickedFeature;
          Cesium.Color.clone(
            pickedFeature.color,
            rightClickHighted.originalColor
          );
          pickedFeature.color = Cesium.Color.BLUE;
          // let pickedFeature = viewer.scene.pick(movement.position);
          if (Cesium.defined(pickedFeature)) {
            // var cartesian = viewer.scene.pickPosition(movement.position);
            // var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            // console.log(this.getMdlDegreeCenter(cartographic));
            if (pickedFeature.tileset) {
              if (
                pickedFeature.tileset._url ===
                "3DTiles/drill_3dtiles/tileset.json"
              ) {
                const holecode = pickedFeature.getProperty("钻孔编码");
                this.$http
                  .get("/getHoleLayerInfoByHoleCode", {
                    params: {
                      holecode: holecode,
                    },
                  })
                  .then((res) => {
                    this.drillName = holecode;
                    this.layerInfo = res.data.data;
                    this.isLayerDialogVisible = true;
                  });
              } else if (
                pickedFeature.tileset._url ===
                "3DTiles/model_3dtiles/tileset.json"
              ) {
                let titles = "地层信息";
                let resStr = pickedFeature.getProperty("地层编码");

                Notification({
                  title: titles,
                  message: resStr,
                  duration: "2000",
                });
              } else {
                let titles = "地层信息";
                let resStr =
                  pickedFeature.getProperty("profilegeostratumcode") +
                  "  " +
                  pickedFeature.getProperty("profilelithology");

                Notification({
                  title: titles,
                  message: resStr,
                  duration: "2000",
                });
              }
            } else {
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
          }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

        // 注册左键事件
        viewer.screenSpaceEventHandler.setInputAction((movement) => {
          clearTimeout(this.flagTimer);
          this.flagTimer = window.setTimeout(() => {
            let pick = viewer.scene.pick(movement.position);
            if (Cesium.defined(pick) && Cesium.defined(pick.id)) {
              this.$http
                .get("/getHoleLayerInfoByHoleCode", {
                  params: {
                    holecode: pick.id,
                  },
                })
                .then((res) => {
                  this.drillName = pick.id;
                  this.layerInfo = res.data.data;
                  this.isLayerDialogVisible = true;
                });
            }

            if (Cesium.defined(rightClickHighted.feature)) {
              rightClickHighted.feature.color = rightClickHighted.originalColor;
              rightClickHighted.feature = undefined;
            }
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
          }, 200);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //注册移动事件
        //Color a feature yellow on hover.
        viewer.screenSpaceEventHandler.setInputAction((movement) => {
          // 移动变小手
          const moveFeature = viewer.scene.pick(movement.endPosition);
          if (Cesium.defined(moveFeature)) {
            viewer._container.style.cursor = "pointer";
          } else {
            viewer._container.style.cursor = "default";
          }
          return;
          // If a feature was previously highlighted, undo the highlight
          if (Cesium.defined(moveHighlighted.feature)) {
            moveHighlighted.feature.color = moveHighlighted.originalColor;
            moveHighlighted.feature = undefined;
          }

          // Pick a new feature
          var pickedFeature = viewer.scene.pick(movement.endPosition);
          if (!Cesium.defined(pickedFeature)) {
            return;
          }

          // Highlight the feature
          moveHighlighted.feature = pickedFeature;
          Cesium.Color.clone(
            pickedFeature.color,
            moveHighlighted.originalColor
          );
          pickedFeature.color = Cesium.Color.YELLOW;
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // 注册双击事件（注意区分单击和双击事件）
        viewer.screenSpaceEventHandler.setInputAction((movement) => {
          clearTimeout(this.flagTimer);
          if (this.activeDoubleEvent) {
            let pick = viewer.scene.pick(movement.position);
            if (Cesium.defined(pick)) {
              let cartesian = viewer.scene.pickPosition(movement.position);
              let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
              let degreeCenter = this.getMdlDegreeCenter(cartographic);
              let startPoint = Cesium.Cartesian3.fromDegrees(
                degreeCenter[1],
                degreeCenter[2],
                -99999
                // 10000
              );
              let endPoint = Cesium.Cartesian3.fromDegrees(
                degreeCenter[1],
                degreeCenter[2],
                10000
                // -99999
              );
              // this.drawLine(startPoint, endPoint, Cesium.Color.RED); //绘制交汇线
              var direction = Cesium.Cartesian3.normalize(
                Cesium.Cartesian3.subtract(
                  endPoint,
                  startPoint,
                  new Cesium.Cartesian3()
                ),
                new Cesium.Cartesian3()
              );
              dbClickRay = new Cesium.Ray(startPoint, direction);

              let resultFeatureList = viewer.scene.drillPickFromRay(dbClickRay); // 计算交互点，返回第一个
              let resultLayerData = [];
              for (let i = 0; i < resultFeatureList.length; i++) {
                if (
                  resultFeatureList[i].object instanceof
                  Cesium.Cesium3DTileFeature
                ) {
                  let properList =
                    resultFeatureList[i].object.getPropertyNames();
                  let drillLayerInfo = {
                    layerNum:
                      resultFeatureList[i].object.getProperty("地层编码"),
                  };
                  resultLayerData.push(drillLayerInfo);
                }
              }
              this.virtualLayerInfo = resultLayerData;
              console.log(this.virtualLayerInfo);
              this.isvirtualLayerDialogVisible = true;
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      }
    },
    // 绘制线
    drawLine(leftPoint, secPoint, color) {
      viewer.entities.add({
        polyline: {
          positions: [leftPoint, secPoint],
          arcType: Cesium.ArcType.NONE,
          width: 5,
          material: color,
          depthFailMaterial: color,
        },
      });
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
    // 接收二维服务
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
      } else if (data.nodeData.serviceType === "billboards") {
        this.loadHoleLayer(
          data.nodeData.url,
          data.nodeData.name,
          data.isChecked
        );
      }
    },
    // 接收三维服务
    recept3dViewInfo(data) {
      if (data.nodeData.serviceType === "3DTiles") {
        this.load3dTiles(
          data.nodeData.url,
          data.nodeData.name,
          data.isChecked,
          data.nodeData.label
        );
      }
    },
    // 接收通用组件传递过来的值
    commonToolHandleOnClick(item) {
      switch (item.index) {
        case 1:
          if (viewer) {
            viewer.scene.globe.show = !viewer.scene.globe.show;
          }
          break;
        case 2:
          if (viewer) {
            viewer.scene.screenSpaceCameraController.enableCollisionDetection =
              !viewer.scene.screenSpaceCameraController
                .enableCollisionDetection;
          }
          break;
        case 3:
          if (viewer) {
            this.onClickReset();
          }
          break;
        default:
          break;
      }
    },
    receptWifeinfo(val) {
      for (let i = 0; i < tileSetList.length; i++) {
        if (tileSetList[i].name === this.mdlName) {
          tileSetList[i].tileSet.debugWireframe = val;
        }
      }
    },
    receptFenxiInfo(data) {
      if (data.label === "地形挖掘") {
        this.dig3DTerrian();
      } else if (data.label === "清除绘制") {
        this.clearDraw();
      } else if (data.label === "虚拟钻孔") {
        this.activeDoubleEvent = true;
      }
    },
    async receptSearchInfo(item) {
      // 是否加载钻孔并显示
      let flagObj = this.billbordsIsExist("holeLayer");
      if (flagObj.isChecked && flagObj.obj.show) {
        let billboardsList = flagObj.obj._billboards;
        for (let i = 0; i < billboardsList.length; i++) {
          let primitiveId = billboardsList[i].id;
          if (primitiveId === item.worksiteid) {
            console.log(billboardsList[i]);
            let originalColor = billboardsList[i].color.clone();
            let flashColor = new Cesium.Color(255, 255, 255, 1);
            billboardsList[i].color = flashColor;
            viewer.camera.flyTo({
              destination: Cesium.Cartesian3.fromDegrees(
                item.borelon,
                item.borelat,
                500
              ),
              orientation: {
                heading: Cesium.Math.toRadians(0.0),
                pitch: Cesium.Math.toRadians(-90.0),
                roll: 0.0,
              },
            });
          }
        }
      } else {
        if (billboardsList.length === 0) {
          this.$message({
            type: "warning",
            message: "请先加载钻孔",
          });
          return;
        }
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
  background-color: rgb(255, 255, 255);
}

.mdlTool_box {
  position: fixed;
  top: 160px;
  right: 100px;
}
</style>

