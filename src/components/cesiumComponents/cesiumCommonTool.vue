<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-20 10:25:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 20:34:13
-->
<template>
  <div class="CesiumTool_box" v-if="isCesiumCommonToolVisible">
    <span
      :class="{
        activeSpan: item.active === true,
      }"
      v-for="(item, i) in toolList"
      :key="i"
      @click="onClickCesiumTool(item)"
    >
      {{ item.label }}</span
    >
  </div>
</template>

<script>
export default {
  props: ["isCesiumCommonToolVisible"],
  data() {
    return {
      toolList: [
        {
          label: "地球显影",
          index: 1,
          active: false,
        },
        {
          label: "地下空间",
          index: 2,
          active: false,
        },
        {
          label: "复位",
          index: 3,
          active: false,
        },
      ],
    };
  },
  components: {},
  computed: {},
  methods: {
    onClickCesiumTool(item) {
      if (item.index !== 3) {
        item.active = !item.active;
      }
      this.$emit("commonToolHandleOnClick", item);
    },
    onMessageFromComponent() {},
    destroyComponent() {},
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.CesiumTool_box {
  position: fixed;
  bottom: -40px;
  color: white;
  height: 100px;
  z-index: 1;
  right: 20px;
}
.CesiumTool_box span {
  display: inline-block;
  background-color: rgb(84, 92, 100);
  padding: 10px;
  box-shadow: 0 0 5px #fff;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}
.CesiumTool_box span:hover {
  cursor: pointer;
}
.activeSpan {
  background-color: darkcyan !important;
}
</style>