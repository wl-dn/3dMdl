<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-20 10:25:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-10 14:14:50
-->
<template>
  <div class="mdlView">
    <el-tree
      :props="props"
      :data="treeData"
      show-checkbox
      node-key="id"
      :default-expanded-keys="['1', '2']"
      @check-change="handleCheckChange"
      @check="handleCheck"
      @node-contextmenu="handleContextMenu"
    >
    </el-tree>

    <mdlRightDialog
      :isShowDialog="isShowDialog"
      :positionX="positionX"
      :positionY="positionY"
      :nodeData="nodeData"
      @sendCloseR="isShowDialog = false"
    ></mdlRightDialog>
  </div>
</template>

<script>
import rightDialog from "../toolComponents/rightDialog.vue";
export default {
  data() {
    return {
      props: {
        label: "label",
        children: "children",
      },
      treeData: [
        {
          id: "1",
          label: "3DTiles",
          children: [
            {
              id: "1-1",
              label: "三维地质模型",
              name: "3dmdl",
              url: "3DTiles/model_3dtiles/tileset.json",
              serviceType: "3DTiles",
            },
          ],
        },
        {
          id: "2",
          label: "Gltf",
          children: [
            {
              id: "2-1",
              label: "三维地质模型",
              name: "",
              url: "",
              serviceType: "Gltf",
            },
          ],
        },
      ],
      currentChecked: false,
      positionX: 0,
      positionY: 0,
      isShowDialog: false,
      nodeData: null,
    };
  },
  components: {
    mdlRightDialog:rightDialog,
  },
  computed: {},
  methods: {
    onMessageFromComponent() {},
    destroyComponent() {},
    handleCheckChange(data, checked) {
      this.currentChecked = checked;
    },
    handleCheck(node, checked) {
      this.$emit("sendTree3dViewInfo", {
        nodeData: node,
        isChecked: this.currentChecked,
      });
    },
    handleContextMenu(event, dataList) {
      event.preventDefault();
      if (!dataList.children) {
        this.positionY = event.pageX;
        this.positionX = event.pageY;
        this.nodeData = JSON.parse(JSON.stringify(dataList));
        this.isShowDialog = true;
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.mdlView {
  width: 250px;
  height: 400px;
  overflow-y: scroll;
}
.el-tree >>> .el-tree-node .is-leaf + .el-checkbox .el-checkbox__inner {
  display: inline-block;
}
.el-tree >>> .el-tree-node .el-checkbox .el-checkbox__inner {
  display: none;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 12px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}
</style>