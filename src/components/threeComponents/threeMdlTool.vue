<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-09-19 10:51:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 21:16:01
-->
<template>
  <div class="CesiumTool" v-if="isShow">
    <transition name="el-zoom-in-center">
      <div v-show="isMenuTool">
        <span
          v-for="(item, i) in func3dList"
          :key="i"
          @click="onClickCesiumTool(item)"
          :class="{
            activeSpan: item.active === true,
          }"
          >{{ item.label }}</span
        >
      </div>
    </transition>
    <el-tooltip
      class="item"
      effect="dark"
      :content="contentTip"
      placement="top-start"
    >
      <span :class="['el-icon-rank', 'close_span']" @click="closeTool"></span>
    </el-tooltip>
  </div>
</template>

<script>
import eventVue from "../../assets/js/eventVue";
export default {
  props: ["isShow"],
  data() {
    return {
      isMenuTool: true,
      contentTip: "关闭工具栏",
      func3dList: [
        {
          label: "线框/实体",
          index: 1,
          active: false,
        },
        {
          label: "模型缩放(Z)",
          index: 2,
          active: false,
        },
        {
          label: "模型爆炸",
          index: 3,
          active: false,
        },
        {
          label: "模型透明度",
          index: 8,
          active: false,
        },
        {
          label: "模型切割",
          index: 4,
          active: false,
        },
        {
          label: "模型拾取",
          index: 5,
          active: false,
        },
        {
          label: "模型层级显示",
          index: 6,
          active: false,
        },
        // {
        //   label: "模型量算",
        //   index: 9,
        //   active: false,
        // },
        {
          label: "模型复原",
          index: 7,
          active: false,
        },
      ],
      activeIndex: 0,
      activeFlag: false,
    };
  },
  components: {},
  methods: {
    onClickCesiumTool(item) {
      item.active = !item.active;
      this.$emit("cesiumToolHandleOnClick", item);
    },
    closeTool() {
      this.isMenuTool = !this.isMenuTool;
      this.isMenuTool
        ? (this.contentTip = "关闭工具栏")
        : (this.contentTip = "打开工具栏");
      if (!this.isMenuTool) {
        eventVue.$emit("sendToolClose", 1);
      }
    },
  },
  created() {
    eventVue.$on("sendResetMdlInfo", (res) => {
      this.func3dList.forEach((item) => {
        item.active = res;
      });
    });
  },
};
</script>

<style scoped>
.CesiumTool {
  position: absolute;
  top: 10px;
  color: white;
  /* width: 300px; */
  height: 40px;
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
.close_span {
  position: absolute;
  left: -40px;
  top: 4px;
}
.activeSpan {
  background-color: darkcyan !important;
}
</style>
