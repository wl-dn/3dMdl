<!--
 * @Author: your name
 * @Date: 2021-11-30 14:16:54
 * @LastEditTime: 2021-11-30 21:24:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \geoinfocentere:\STUDY\开发\web3d\3dMdl\src\components\toolComponents\commonTableInfo.vue
-->
<template>
  <transition name="fade">
    <div class="commonTableBox" v-if="isCommonVisible">
      <div class="head_box">
        {{tableTheme}}
        <span class="close_span" @click="closeOnClick">×</span>
      </div>
      <div class="content_box">
        <table>
          <tr v-for="(item, row) in tableData" :key="row">
            <td>{{ item.label }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </table>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    isCommonVisible: {
      type: Boolean,
      default: false,
    },
    tableTheme: {
      type: String,
      default: "",
    }
  },
  data() {
    return {};
  },
  methods: {
    closeOnClick() {
      this.$emit("sendCommonCloseInfo", false);
    },
  },
};
</script>

<style scoped>
.commonTableBox {
  width: 600px;
  height: 400px;
  padding: 5px;
  /* height: 500px; */
  background-color: rgb(244, 244, 245);
  position: fixed;
  z-index: 1;
  bottom: 0px;
  right: 0px;
}
.commonTableBox .head_box {
  width: 100%;
  height: 40px;
  background-color: rgb(144, 147, 153);
  color: rgb(255, 255, 255);
  line-height: 40px;
  padding-left: 3px;
  box-sizing: border-box;
}
.commonTableBox .content_box {
  width: 100%;
  height: 350px;
  overflow-y: auto;
}
.commonTableBox table {
  width: 100%;
  border-top: 1px solid #999;
  border-spacing: 0;
  border-left: 1px solid #999;
  /* height: 400px; */
}
.commonTableBox table tr {
  height: 30px;
  text-align: center;
}
.commonTableBox table tr td {
  width: 50%;
  height: 30px;
  padding: 10px 30px;
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
}
.close_span {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 20px;
  cursor: pointer;
}
/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(600px);
  opacity: 0;
}
</style>