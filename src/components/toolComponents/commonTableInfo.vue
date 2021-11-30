<!--
 * @Author: your name
 * @Date: 2021-11-30 14:16:54
 * @LastEditTime: 2021-11-30 14:29:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \geoinfocentere:\STUDY\开发\web3d\3dMdl\src\components\toolComponents\commonTableInfo.vue
-->
<template>
  <div class="commonTableBox" v-if="isCommonVisible">
    <div class="head_box">
      <span class="close_span" @click="closeOnClick">×</span>
    </div>
    <div>
      <table>
        <tr v-for="(item, row) in tableData" :key="row">
          <td>{{ item.label }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
    </div>
  </div>
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
  },
  data() {
    return {
      tableData: [
        {
          label: "标准编号",
          value: "QH1",
        },
      ],
    };
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
  width: 300px;
  padding: 5px;
  /* height: 500px; */
  background-color: rgb(244, 244, 245);
  position: fixed;
  z-index: 1;
  top: 50%;
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
</style>