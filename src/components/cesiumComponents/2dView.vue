<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-20 10:25:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-10 17:55:10
-->
<template>
  <div class="mapView">
    <el-tree
      :props="props"
      :data="treeData"
      show-checkbox
      node-key="id"
      :default-expanded-keys="['1', '2', '3', '4', '5']"
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
            {
              id: "1-3",
              label: "WfsServer",
              children: [
                {
                  id: "1-3-1",
                  label: "区域地质图(株洲幅)",
                  name: "mfsserver_arc_geomap",
                  url: "",
                  layers: "",
                  serviceType: "wfs",
                },
              ],
            },
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
                  url: "http://192.10.3.237/geoserver/crcc-dev/wms",
                  layers: "crcc-dev:geomap-01",
                  serviceType: "wms",
                },
              ],
            },
            {
              id: "2-2",
              label: "WfsServer",
              children: [
                {
                  label: "区域地质图(株洲幅)",
                  name: "mapserver_wfs_geomap",
                  url: "",
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
              name: "可研报批版-赣州段-(赣州北水东设站方案-绕避戒毒所).kml",
              url: "KML/可研报批版-赣州段-(赣州北水东设站方案-绕避戒毒所).kml",
              serviceType: "kml",
            },
            {
              id: "3-2",
              label:
                "可研报批版-赣州段-(赣州北水东设站方案-绕避戒毒所右线绕行)",
              name: "可研报批版-赣州段-(赣州北水东设站方案-绕避戒毒所右线绕行).kml",
              url: "KML/可研报批版-赣州段-(赣州北水东设站方案-绕避戒毒所右线绕行).kml",
              serviceType: "kml",
            },
            {
              id: "3-3",
              label: "可研报批版-井冈山段-(替换桥隧表)",
              name: "可研报批版-井冈山段-(替换桥隧表).kml",
              url: "KML/可研报批版-井冈山段-(替换桥隧表).kml",
              serviceType: "kml",
            },
            {
              id: "3-4",
              label: "可研报批版-萍乡段-(萍乡北并站方案替换桥隧表)",
              name: "可研报批版-萍乡段-(萍乡北并站方案替换桥隧表).kml",
              url: "KML/可研报批版-萍乡段-(萍乡北并站方案替换桥隧表).kml",
              serviceType: "kml",
            },
            {
              id: "3-5",
              label: "可研报批版-长沙段-(机场负三层、浏阳北设站方案)",
              name: "可研报批版-长沙段-(机场负三层、浏阳北设站方案).kml",
              url: "KML/可研报批版-长沙段-(机场负三层、浏阳北设站方案).kml",
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
              name: "株洲",
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