<template>
  <div class="home_box">
    <!-- <div class="aside_box" v-if="isShowAsideBox">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545C64"
        text-color="#fff"
        width="100%"
        router
        :default-active="activeItem"
      >
        <el-submenu
          v-for="(item, i) in cesiumRouterList"
          :key="i"
          :index="item.index"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.label }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, j) in item.children"
            :key="j"
            :index="subItem.index"
          >
            {{ subItem.label }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div> -->
    <div class="main_box" id="view_map">
      <router-view />
      <!-- <img src="../assets/images/CRCC.png" style="z-index : 999"/> -->
    </div>
    <!-- <span
      :class="[
        isShowAsideBox ? 'el-icon-caret-left' : 'el-icon-caret-right',
        'taggleAsideSpan',
        isShowAsideBox ? 'taggleOpenSpan' : 'taggleHiddenSpan',
      ]"
      @click="isShowAsideBox = !isShowAsideBox"
    ></span> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      cesiumRouterList: [
        // {
        //   index: "CesiumSandBox",
        //   label: "Cesium沙盒学习",
        //   children: [
        //     {
        //       index: "HelloCesium",
        //       label: "初始Cesium",
        //     },
        //     {
        //       index: "CesiumWedgit",
        //       label: "Cesium控件",
        //     },
        //   ],
        // },
        {
          // label: "3DTILES",
          label: "地理地质信息系统测试平台",
          index: "三维地质模型",
          children: [
            // {
            //   index:"BIM3DTiles",
            //   label:"BIM三维模型"
            // },
            {
              index: "adjust3DTiles",
              label: "三维地质模型",
            },
            // {
            //   index:"drawEntity",
            //   label:"绘制点线面"
            // },
            // {
            //   index:"digTerrian",
            //   label:"地形挖掘",
            // },
            // {
            //   index:"3DTilesClip",
            //   label:"3DTiles模型切割",
            // },
            // {
            //   index: "Geo3DTiles",
            //   label: "地质三维模型",
            // },
            {
              index:"mdlScene",
              label:"模型分析"
            }
          ],
        },
        // {
        //   index:"threeJSStudy",
        //   label:"ThreeJS学习",
        //   children:[
        //     {
        //       index:"load3DTilesByThree",
        //       label:"three加载3DTiles"
        //     },
        //     {
        //       index:"threeClip3DTiles",
        //       label:"three切割3DTiles"
        //     }
        //   ]
        // }
      ],
      activeItem: "adjust3DTiles",
      isShowAsideBox: true,
    };
  },
  watch: {
    $route(to, from) {
      this.changeActiveItem(to.path);
    },
  },
  components: {},
  methods: {
    changeActiveItem(routeName) {
      const routeTempName = routeName.substring(1);
      this.activeItem = routeTempName;
    },
  },
  created() {
    this.changeActiveItem(this.$route.path);
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
</style>
<style scoped>
.home_box {
  display: flex;
  height: 100%;
  width: 100%;
}

.home_box .aside_box {
  flex: 1;
  background-color: rgb(84, 92, 100);
}
.home_box .main_box {
  flex: 6;
  position: relative;
}
.taggleAsideSpan {
  position: absolute;
  color: #ffffff;
  z-index: 1;
  font-size: 40px;
  cursor: pointer;
}
.taggleOpenSpan {
  left: 14%;
}
.taggleHiddenSpan {
  left: 2px;
}
</style>
