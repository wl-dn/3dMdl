<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-20 10:25:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-30 10:11:48
-->
<template>
  <div class="mdlFenxi">
    <ul>
      <li v-for="(item, i) in fenxiList" :key="i" @click="sendInfo(item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fenxiList: [
        // {专业分析中，删除地形挖掘功能 sisi
        //   id: 1,
        //   label: "地形挖掘",
        // },
        {
          id: 2,
          label: "虚拟钻孔",
        },
        {
          id: 3,
          label: "清除绘制",
        },
      ],
    };
  },
  components: {},
  computed: {},
  methods: {
    onMessageFromComponent() {},
    destroyComponent() {},
    sendInfo(item) {
      this.$emit("sendFenxiInfo", item);
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.mdlFenxi {
  width: 150px;
  height: 250px;
}
.mdlFenxi ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.mdlFenxi ul li {
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.mdlFenxi ul li:hover {
  background-color: cadetblue;
}
</style>