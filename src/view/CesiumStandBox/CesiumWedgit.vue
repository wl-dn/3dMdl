<template>
  <div class="cesiumWedgit_box" id="cesiumContainer">
    <div class="wedgit_box">
      <ul>
        <li v-for="(item, i) in wedgitList" :key="i">
          <input
            id="select_all"
            name="select_all"
            type="checkbox"
            @change="handleChange(item)"
            v-model="item.isChecked"
          />
          <span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as Cesium from "cesium";
export default {
  data() {
    return {
      wedgitList: [
        {
          id: 1,
          name: "搜索控件",
          attribute: "geocoder",
          isChecked: true,
        },
        {
          id: 2,
          name: "复位控件",
          attribute: "homeButton",
          isChecked: true,
        },
        {
          id: 3,
          name: "时间滚动条控件",
          attribute: "timeline",
          isChecked: true,
        },

        {
          id: 5,
          name: "切换视角控件 ",
          attribute: "sceneModePicker",
          isChecked: true,
        },
        {
          id: 6,
          name: "全屏控件 ",
          attribute: "fullscreenButton",
          isChecked: true,
        },
        {
          id: 7,
          name: "底图切换控件 ",
          attribute: "baseLayerPicker",
          isChecked: true,
        },
        {
          id: 8,
          name: "动画控件 ",
          attribute: "animation",
          isChecked: true,
        },
        {
          id: 9,
          name: "版本控件",
          attribute: "CreditsDisplay",
          isChecked: true,
        },
        {
          id: 4,
          name: "提示控件",
          attribute: "navigationHelpButton",
          isChecked: true,
        },
      ],
      viewerOption: {
        geocoder: false, // 地理位置查询定位控件
        homeButton: false, // 默认相机位置控件
        timeline: false, // 时间滚动条控件
        navigationHelpButton: false, // 默认的相机控制提示控件
        sceneModePicker: false, // 切换2D、3D和Columbus View（CV）模式
        fullscreenButton: false, // 全屏控件
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        baseLayerPicker: false, // 底图切换控件
        animation: false, // 控制场景动画的播放速度控件
      },
      cesiumViewer: null,
      cesiumTool: null,
    };
  },
  components: {},
  methods: {
    // 简单的初始化cesium项目
    initMap() {
      this.cesiumViewer = new Cesium.Viewer("cesiumContainer");
    },
    // 切换组件
    handleChange(item) {
      let wedgitBoxName = "_" + item.attribute;
      console.log(wedgitBoxName);
      const id = item.id;
      if (id === 1 || id === 6 || id === 8) {
        item.isChecked
          ? (this.cesiumViewer[wedgitBoxName]._container.style.display =
              "inline-block")
          : (this.cesiumViewer[wedgitBoxName]._container.style.display =
              "none");
      } else if (id === 2 || id === 7) {
        item.isChecked
          ? (this.cesiumViewer[wedgitBoxName]._element.style.display =
              "inline-block")
          : (this.cesiumViewer[wedgitBoxName]._element.style.display = "none");
      } else if (id === 3) {
        item.isChecked
          ? (this.cesiumViewer[wedgitBoxName].container.style.display =
              "inline-block")
          : (this.cesiumViewer[wedgitBoxName].container.style.display = "none");
      } else if (id === 4) {
        item.isChecked
          ? (this.cesiumViewer[
              wedgitBoxName
            ]._container.childNodes[5].style.display = "inline-block")
          : (this.cesiumViewer[
              wedgitBoxName
            ]._container.childNodes[5].style.display = "none");
      } else if (id === 5) {
        item.isChecked
          ? (this.cesiumViewer[
              wedgitBoxName
            ]._container.childNodes[2].style.display = "inline-block")
          : (this.cesiumViewer[
              wedgitBoxName
            ]._container.childNodes[2].style.display = "none");
      } else if (id === 9) {
        item.isChecked
          ? (this.cesiumViewer._cesiumWidget._creditContainer.style.display =
              "inline-block")
          : (this.cesiumViewer._cesiumWidget._creditContainer.style.display =
              "none");
      }
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
#cesiumContainer {
  position: relative;
}
.wedgit_box {
  top: 40px;
  position: absolute;
  z-index: 1;
  color: white;
}
.wedgit_box ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
</style>
