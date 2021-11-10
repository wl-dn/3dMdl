<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-23 14:20:46
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-23 14:45:26
-->
<template>
  <div class="drawToolBox">
    <span
      v-for="(item, i) in DrawList"
      :key="i"
      @click="drawParamsOnClick(item)"
    >
      {{ item.label }}
    </span>
  </div>
</template>

<script>
import eventVue from "../../plugins/eventVue"
export default {
  data() {
    return {
      DrawList: [
        {
          label: "绘制点",
          value: "point",
        },
        {
          label: "绘制线",
          value: "polyline",
        },
        {
          label: "绘制多边形",
          value: "polygon",
        },
        {
          label: "清除",
          value: "deleteDraw",
        },
      ],
    };
  },
  components: {},
  methods: {
    drawParamsOnClick(item) {
    eventVue.$emit("sendDrawParams",item.value)
    },
  },
};
</script>

<style scoped>
.drawToolBox {
  position: absolute;
  top: 40px;
  left: 10px;
  max-width: 300px;
  box-sizing: border-box;
  z-index: 1;
}
.drawToolBox span {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  background-color: rgb(29, 154, 242);
  color: #ffffff;
  margin: 10px;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.7);
}
.drawToolBox span:last-child {
  background-color: red;
}
.drawToolBox span:hover {
  border: 2px solid red;
}
</style>
