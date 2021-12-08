<!--
 * @Author: your name
 * @Date: 2021-11-30 12:42:04
 * @LastEditTime: 2021-11-30 14:19:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \geoinfocentere:\STUDY\开发\web3d\3dMdl\src\components\toolComponents\virtralHoleInfo.vue
-->
<template>
  <transition name="fade">
    <div class="virtualBox" v-if="isVisible">
      <div class="virtualBox_head_box">
        {{tableTheme}}  <!--sisi  设置表名-->
        <span class="close_span" @click="closeOnClick">×</span>
      </div>
      <el-table
        :data="virtualLayerInfo"
        border
        style="width: 100%"
        height="350px"
        v-if="virtualLayerInfo.length !== 0"
      >
        <!-- <el-table-column
          :prop="item.value"
          v-for="(item, i) in fieldsList"
          :key="i"
          :label="item.label"
        ></el-table-column> --> <!--sisi  设置表字段-->
        <el-table-column prop="topElevation" label="顶板高程">
        </el-table-column>
        <el-table-column prop="bottomElevation" label="底板高程">
        </el-table-column>
        <el-table-column prop="stratCode" label="地层编码"> </el-table-column> -->
        <!-- <el-table-column prop="qgenesis" label="地质成因"> </el-table-column> -->
        <!-- <el-table-column prop="stratumeras" label="地质年代"> </el-table-column>
        <el-table-column prop="lithology" label="岩性"> </el-table-column> --> -->
      </el-table>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    virtualLayerInfo: {
      type: Array,
      default() {
        return [];
      },
    },
    fieldsList: {
      type: Array,
      default() {
        return [];
      },
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    tableTheme: {  //<!--sisi  设置表名-->
      type: String,
      default: "",
    }
  },
  data() {
    return {};
  },
  methods: {
    closeOnClick() {
      this.$emit("sendCloseVirtualDialog", false);
    },
  },
};
</script>

<style scoped>
.virtualBox {
  width: 600px;
  padding: 5px;
  /* height: 500px; */
  background-color: rgb(244, 244, 245);
  position: fixed;
  z-index: 1;
  bottom: 0px;
  right: 0px;
}
.virtualBox_head_box {
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
/* 动画效果 */
.holefade-enter-active,
.holefade-leave-active {
  transition: all 0.2s ease;
}
.holefade-enter,
.holefade-leave-to {
  transform: translateX(600px);
  opacity: 0;
}
/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
