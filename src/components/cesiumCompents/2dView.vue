<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-20 10:25:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-04 17:57:37
-->
<template>
  <div class="mapView">
    <el-tree
      :props="props"
      :data="treeData"
      show-checkbox
      @check-change="handleCheckChange"
      @check="handleCheck"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "label",
        children: "children",
      },
      treeData: [
        {
          label: "ArcGIS Server",
          children: [
            {
              label: "MapServer",
              children: [
                {
                  label: "区域地质图(株洲幅)",
                  name: "mapserver_geomap",
                  url: "https://tsy-gis1.portal.com/server/rest/services/geoinfo_geomap/MapServer/",
                  layers: "",
                  serviceType: "mapserver",
                },
              ],
            },
            {
              label: "WmsServer",
              children: [
                {
                  label: "区域地质图(株洲幅)",
                  name: "wmsserver_arc_geomap",
                  url: "https://tsy-gis1.portal.com/server/services/geoinfo_geomap/MapServer/WMSServer",
                  layers: "1,2,3,4,5,6",
                  serviceType: "wms",
                },
              ],
            },
            {
              label: "WfsServer",
              children: [
                {
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
          label: "GeoServer",
          children: [
            {
              label: "WmsServer",
              children: [
                {
                  label: "区域地质图(株洲幅)",
                  name: "geoserver_wms_geomap",
                  url: "http://192.10.3.237/geoserver/crcc-dev/wms",
                  layers: "crcc-dev:geomap-01",
                  serviceType: "wms",
                },
              ],
            },
            {
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
      ],
      currentChecked: false,
    };
  },
  components: {},
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
  background: rgba(255, 0, 0, 0.4);
}
</style>