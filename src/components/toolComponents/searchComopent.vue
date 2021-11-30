<!--
 * @Author: your name
 * @Date: 2021-11-22 10:34:44
 * @LastEditTime: 2021-11-30 10:09:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \geoinfocentere:\STUDY\开发\web3d\3dMdl\src\components\toolComponents\searchComopent.vue
-->
<template>
  <div class="searchBar">
    <el-autocomplete
      v-model="searchState"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    >
      <i class="el-icon-search el-input__icon" slot="suffix"> </i>
      <template slot-scope="{ item }">
        <i class="el-icon-search"></i>
        <span class="georesName my-font">{{ item.worksiteid }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchState: "",
      timeout: null,
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (queryString === "")  {
        cb([])
      }
      else if (queryString === "钻孔") {
        this.$http
          .get("/getAllHoleInfo")
          .then((res) => {
            cb(res.data.data);
          })
          .then((err) => {
            cb([])
          });
      }else {
        setTimeout(() => {
          cb([])
        }, 1000);
      }
    },
    handleSelect(item) {
      this.searchState = item.worksiteid;
      this.$emit("sendSearchParmsFromSerachBar", item);
    },
  },
};
</script>
<style scoped>
.searchBar {
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 1;
}
.searchBar > span {
  color: rgb(255, 255, 255);
  font-size: 20px;
  cursor: pointer;
}
</style>