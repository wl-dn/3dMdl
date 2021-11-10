<!--
 * @Author: your name
 * @Date: 2021-11-10 10:24:15
 * @LastEditTime: 2021-11-10 13:45:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \geoinfocentere:\STUDY\开发\web3d\3dMdl\src\components\toolComponents\rightDialog.vue
-->
<template>
  <div
    class="rightClickBox"
    v-if="isShowDialog"
    @mouseleave="handleMouseClose"
  >
    <ul>
      <li
        v-for="(item, i) in rightClickList"
        :key="i"
        @click="clickSendFunc(item.id)"
      >
        <span :class="item.icon"></span>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import eventVue from "../../assets/js/eventVue";
export default {
  props: ["positionX", "positionY", "isShowDialog", "nodeData"],
  // porps: {
  //   positionX: {
  //     type: Number,
  //     default: 0,
  //   },
  //   positionY: {
  //     type: Number,
  //     default: 0,
  //   },
  //   isShowDialog: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   nodeData: {
  //     type: Object,
  //     default: null,
  //   },
  // },
  watch: {
    positionX(val) {
      this.$nextTick(() => {
        this.moveDialog();
      });
    },
    nodeData(val) {
      console.log(val);
    },
  },
  computed: {},
  data() {
    return {
      rightClickList: [
        {
          id: 1,
          icon: "el-icon-top-right icon_span",
          name: "打开",
        },
        {
          id: 2,
          icon: "el-icon-download   icon_span",
          name: "下载",
        },
        {
          id: 3,
          icon: "el-icon-delete icon_span",
          name: "删除",
        },
        {
          id: 4,
          icon: "el-icon-edit icon_span",
          name: "重命名",
        },
      ],
    };
  },
  components: {},
  methods: {
    moveDialog() {
      let rightDiadom = document.getElementsByClassName("rightClickBox")[0];
      rightDiadom.style.top = this.positionX + "px";
      rightDiadom.style.left = this.positionY + "px";
    },
    clickSendFunc(id) {
      eventVue.$emit("sendRightFunc", id);
    },
    handleMouseClose() {
      this.$emit("sendCloseR", false);
    },
  },
  created() {},
  mounted() {
    // this.moveDialog(); //解决首次加载bug
  },
};
</script>

<style scoped>
.rightClickBox {
  position: fixed;
  top: 0;
  left: 0;
  height: 180px;
  width: 100px;
  background-color: #fff;
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.4);
  /* border-radius: 8px; */
  border: 1px solid rgba(0, 0, 0, 0.5);
  z-index: 100;
  font-size: 12px;
}
.rightClickBox ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.rightClickBox ul li {
  padding: 6px 10px;
  border-bottom: 1px solid gray;
}
.rightClickBox ul li:hover {
  background-color: rgb(234, 246, 253);
  cursor: pointer;
}
.icon_span {
  padding-right: 20px;
}
</style>
