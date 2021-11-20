<!--
 * @Author: your name
 * @Date: 2021-11-18 13:28:39
 * @LastEditTime: 2021-11-18 17:51:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \geoinfocentere:\STUDY\开发\web3d\3dMdl\src\components\toolComponents\holeLayerInfo.vue
-->
<template>
  <div class="holeLayerBox" v-if="isVisible">
    <div class="holeLayer_head_box">
      <span>{{ drillname }}</span>
      <span class="close_span" @click="closeOnClick">×</span>
    </div>
    <el-table :data="layerInfo" border style="width: 100%">
      <el-table-column prop="stdstratumcode" label="标准层号">
      </el-table-column>
      <el-table-column prop="topsidedepth" label="顶板埋深"> </el-table-column>
      <el-table-column prop="undersidedepth" label="顶底埋深">
      </el-table-column>
      <el-table-column prop="qgenesis" label="地质成因"> </el-table-column>
      <el-table-column prop="stratumeras" label="地质年代"> </el-table-column>
      <el-table-column prop="lithology" label="岩性"> </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  props: {
    drillname: {
      type: String,
    },
    layerInfo: {
      type: Array,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeOnClick() {
      this.$emit("sendCloseLayerDialog", false);
    },
  },
};
</script>

<style>
.holeLayerBox {
  width: 600px;
  padding: 5px;
  /* height: 500px; */
  background-color: rgb(244, 244, 245);
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
}
.holeLayer_head_box {
  width: 100%;
  height: 40px;
  background-color: rgb(144, 147, 153);
  color: rgb(255, 255, 255);
  line-height: 40px;
  padding-left: 3px;
  box-sizing: border-box;
}
.holelayer_table {
  width: 100%;
}
.holelayer_table tr td {
  height: 30px;
}
.holelayer_table tr td:nth-child(1) {
  width: 30%;
  background-color: cornflowerblue;
}
.close_span {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 20px;
  cursor: pointer;
}
</style>
