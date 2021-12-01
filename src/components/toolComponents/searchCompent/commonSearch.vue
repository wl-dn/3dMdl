<!--
 * @Author: your name
 * @Date: 2021-12-01 16:56:38
 * @LastEditTime: 2021-12-01 17:21:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \geoinfocentere:\STUDY\开发\web3d\3dMdl\src\components\toolComponents\searchCompent\commenSearch.vue
-->
<template>
  <div class="commonSearchBox">
    <div>
      <el-radio v-model="radio" label="1">模糊查询：</el-radio>
      <span>模糊查询：</span>
    </div>
    <div>
      <div>
        <el-radio v-model="radio" label="2">图层选择</el-radio>

        <span>图层选择</span>
      </div>
      <div>
        <el-radio v-model="radio" label="3">检索字段</el-radio>

        <span>检索字段</span>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
    };
  },
};
</script>

<style scoped>
.commonSearchBox {
  width: 100%;
  height: 100%;
}
</style>
