<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-20 10:25:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-04 17:09:31
-->
<template>
  <div class="mapView">
    <el-tree
      :props="props"
      :data="treeData"
      show-checkbox
      node-key="id"
      :default-expanded-keys="['1', '2', '3', '4', '5', '6']"
      @check-change="handleCheckChange"
      @check="handleCheck"
      @node-contextmenu="handleContextMenu"
    >
    </el-tree>

    <mapRightDialog
      :isShowDialog="isShowDialog"
      :positionX="positionX"
      :positionY="positionY"
      :nodeData="nodeData"
      @sendCloseR="isShowDialog = false"
    ></mapRightDialog>
  </div>
</template>

<script>
import rightDialog from "../toolComponents/rightDialog.vue";
export default {
  data() {
    return {
      props: {
        label: "label",
        children: "children",
      },
      treeData: [
        {
          id: "1",
          label: "ArcGIS Server",
          children: [
            {
              id: "1-1",
              label: "MapServer",
              children: [
                {
                  id: "1-1-1",
                  label: "区域地质图(株洲幅)",
                  name: "mapserver_geomap",
                  url: "https://tsy-gis1.portal.com/server/rest/services/geoinfo_geomap/MapServer/",
                  layers: "",
                  serviceType: "mapserver",
                },
              ],
            },
            {
              id: "1-2",
              label: "WmsServer",
              children: [
                {
                  id: "1-2-1",
                  label: "区域地质图(株洲幅)",
                  name: "wmsserver_arc_geomap",
                  url: "https://tsy-gis1.portal.com/server/services/geoinfo_geomap/MapServer/WMSServer",
                  layers: "1,2,3,4,5,6",
                  serviceType: "wms",
                },
              ],
            },
            // {
            //   id: "1-3",
            //   label: "WfsServer",
            //   children: [
            //     {
            //       id: "1-3-1",
            //       label: "区域地质图(株洲幅)",
            //       name: "wfsserver_arc_geomap",
            //       url: "https://tsy-gis1.portal.com/server/rest/services/Hosted/geoinfo_geomap/MapServer?f=pjson",
            //       layers: "",
            //       serviceType: "wfs",
            //     },
            //   ],
            // },
          ],
        },
        {
          id: "2",
          label: "GeoServer",
          children: [
            {
              id: "2-1",
              label: "WmsServer",
              children: [
                {
                  id: "2-1-1",
                  label: "区域地质图(株洲幅)",
                  name: "geoserver_wms_geomap",
                  // url: "http://192.10.3.237/geoserver/crcc-dev/wms",
                  // layers: "crcc-dev:geomap-01",
                  // layers:"geostratumzone",

                  url:"http://10.101.140.3/geoserver/db-24/wms",
                  layers:"map-124",
                  // layers:"map_124_lyr_1",
                  serviceType: "wms",
                },
                {
                  id: "2-1-2",
                  label: "长赣-遥感解译",
                  name: "changgan_wms+geo",
                  url: "http://192.10.3.237/geoserver/wms",
                  layers: "geomap-rs",
                  serviceType: "wms",
                },
              ],
            },
            {
              id: "2-2",
              label: "WfsServer",
              children: [
                {
                  label: "地层界限分布",
                  name: "dicengjiexian_wfs_geomap",
                  url: "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:geoboundzone&maxFeatures=50&outputFormat=application/json",
                  layers: "",
                  serviceType: "wfs",
                },
              ],
            },
          ],
        },
        {
          id: "3",
          label: "KML",
          children: [
            {
              id: "3-1",
              label: "可研报批版-赣州段-(赣州北水东设站方案-绕避戒毒所)",
              name: "kml_1",
              url: "KML/kml_1.kml",
              serviceType: "kml",
            },
            {
              id: "3-2",
              label:
                "可研报批版-赣州段-(赣州北水东设站方案-绕避戒毒所右线绕行)",
              name: "kml_2.kml",
              url: "KML/kml_2.kml",
              serviceType: "kml",
            },
            {
              id: "3-3",
              label: "可研报批版-井冈山段-(替换桥隧表)",
              name: "kml_3.kml",
              url: "KML/kml_3.kml",
              serviceType: "kml",
            },
            {
              id: "3-4",
              label: "可研报批版-萍乡段-(萍乡北并站方案替换桥隧表)",
              name: "kml_4.kml",
              url: "KML/kml_4.kml",
              serviceType: "kml",
            },
            {
              id: "3-5",
              label: "可研报批版-长沙段-(机场负三层、浏阳北设站方案)",
              name: "kml_5.kml",
              url: "KML/kml_5.kml",
              serviceType: "kml",
            },
          ],
        },
        {
          id: "4",
          label: "KMZ",
          children: [
            {
              id: "4-1",
              label: "株洲",
              name: "zhuzhou",
              url: "KMZ/zhuzhou.kmz",
              serviceType: "kml",
            },
          ],
        },
        // {
        //   id: "5",
        //   label: "CZML",
        //   children: [
        //     {
        //       id: "5-1",
        //       label: "",
        //     },
        //   ],
        // },
        {
          id: "6",
          label: "地形影像",
          children: [
            {
              id: "6-1",
              label: "天地图影像",
              name: "TDMap",
              url:
                "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
                this.tiandituTk,
              layers: "tdtImgLayer",
              serviceType: "天地图",
            },
            {
              id: "6-2",
              label: "天地图注记",
              url:
                "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
                this.tiandituTk,
              name: "TDMark",
              layers: "tdtCiaLayer",
              serviceType: "天地图",
            },
          ],
        },
        {
          id: "7",
          label: "钻孔",
          url: "/getAllHoleInfo",
          name:"holeLayer",
          layer:"",
          serviceType:"billboards"
        },
      ],
      currentChecked: false,
      positionX: 0,
      positionY: 0,
      isShowDialog: false,
      nodeData: null,
    };
  },
  components: {
    mapRightDialog: rightDialog,
  },
  computed: {},
  methods: {
    onMessageFromComponent() {},
    destroyComponent() {},
    handleCheckChange(data, checked) {
      this.currentChecked = checked;
    },
    handleCheck(node, checked) {
      this.$emit("sendTree2dViewInfo", {
        nodeData: node,
        isChecked: this.currentChecked,
      });
    },
    handleContextMenu(event, dataList) {
      event.preventDefault();
      if (!dataList.children) {
        this.positionY = event.pageX;
        this.positionX = event.pageY;
        this.nodeData = JSON.parse(JSON.stringify(dataList));
        this.isShowDialog = true;
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.mapView {
  width: 250px;
  height: 400px;
  overflow-y: scroll;
}
.el-tree >>> .el-tree-node .is-leaf + .el-checkbox .el-checkbox__inner {
  display: inline-block;
}
.el-tree >>> .el-tree-node .el-checkbox .el-checkbox__inner {
  display: none;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 12px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(84, 92, 100, 0.1);
}
</style>