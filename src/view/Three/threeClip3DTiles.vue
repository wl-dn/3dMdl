<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-26 17:08:35
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-26 19:19:16
-->
<template>
  <div class="TilesClip" id="3DTilesClipMap"></div>
</template>

<script>
import { ThreeUtils } from "../../utils/utils";
import * as THREE from "three";
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    init3Dtiles() {
      const initObj = ThreeUtils.initScene(
        document.getElementById("3DTilesClipMap")
      );
    },
  },

  mounted() {
    this.init3Dtiles();
  },
};
</script>

<style scoped>
.TilesClip { 
    height: 100%;
    width: 100%;
}
</style>