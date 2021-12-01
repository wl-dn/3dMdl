<!--
 * @Author: your name
 * @Date: 2021-11-22 10:34:44
 * @LastEditTime: 2021-12-01 17:31:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \geoinfocentere:\STUDY\开发\web3d\3dMdl\src\components\toolComponents\searchComopent.vue
-->
<template>
  <!-- <div class="searchBar">
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
  </div> -->
  <div class="searchBox">
    <div class="searchBar">
      <div :class="['ladder', { ladder_selected: selectIndex === 1 }]">
        <span class="position_center" @click="selectIndex = 1">通用检索</span>
      </div>
      <div :class="['ladder', { ladder_selected: selectIndex === 2 }]">
        <span class="position_center" @click="selectIndex = 2">高级检索</span>
      </div>
    </div>
    <div class="serachContent">
      <commonSearch v-if="selectIndex === 1"></commonSearch>
      <specialSearch v-if="selectIndex === 2"></specialSearch>
    </div>
    <div></div>
  </div>
</template>
<script>
import commonSearch from "./commonSearch.vue";
import specialSearch from "./specialSearch.vue";
export default {
  data() {
    return {
      searchState: "",
      timeout: null,
      selectIndex: 1,
    };
  },
  components: {
    commonSearch,
    specialSearch,
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (queryString === "") {
        cb([]);
      } else if (queryString === "钻孔") {
        this.$http
          .get("/getAllHoleInfo")
          .then((res) => {
            cb(res.data.data);
          })
          .then((err) => {
            cb([]);
          });
      } else {
        setTimeout(() => {
          cb([]);
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
.searchBox {
  position: relative;
}
.searchBar {
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 1;
}
/* .searchBar > span {
  color: rgb(255, 255, 255);
  font-size: 20px;
  cursor: pointer;
} */

.ladder {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 20px solid #ccc;
  width: 60px;

  display: inline-block;
  margin-right: -60px;
  z-index: -1;
  /* font-weight: bold; */
  font-size: 12px;
  vertical-align: middle;
  text-align: center;
}
.ladder_selected {
  /*z-index只能在position
	属性值为relative或absolute或fixed的元素上有效!
	非常关键.
	*/
  position: relative;
  z-index: 0;
  border-bottom-color: RGB(137, 157, 192);
  color: white;
}
.ladder:hover {
  cursor: pointer;
}
.position_center {
  line-height: 20px;
}
.serachContent {
  position: absolute;
  width: 500px;
  height: 280px;
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0 0 10px RGB(137, 157, 192);
  background-color: rgb(254, 254, 254);
  top: 30px;
  left: 30px;
  z-index: 1;
  border-radius: 5px;
}
</style>