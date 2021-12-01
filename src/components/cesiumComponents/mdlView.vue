<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-20 10:25:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-01 15:57:59
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
            {
              id: "1-2",
              label: "三维钻孔模型",
              name: "holemdl",
              url: "3DTiles/drill_3dtiles/tileset.json",
              serviceType: "3DTiles",
            },
            {
              id: "1-3",
              label: "sec-1",
              name: "sec1mdl",
              url: "3DTiles/sectionMdl/sec-1/tileset.json",
              serviceType: "3DTiles",
            },
            {
              id: "1-4",
              label: "sec-2",
              name: "sec2mdl",
              url: "3DTiles/sectionMdl/sec-2/tileset.json",
              serviceType: "3DTiles",
            },
            {
              id: "1-5",
              label: "sec-3",
              name: "sec3mdl",
              url: "3DTiles/sectionMdl/sec-3/tileset.json",
              serviceType: "3DTiles",
            },
            {
              id: "1-6",
              label: "holeTEST-20",
              name: "holeTEST-20",
              url: "3DTiles/模型/z_20/tileset.json",
              serviceType: "3DTiles",
            },
            {
              id: "1-7",
              label: "holeTEST-50",
              name: "holeTEST-50",
              url: "3DTiles/模型/z_50/tileset.json",
              serviceType: "3DTiles",
            },
            {
              id: "1-8",
              label: "holeTEST-100",
              name: "holeTEST-100",
              url: "3DTiles/模型/z_100/tileset.json",
              serviceType: "3DTiles",
            },
            {
              id: "1-9",
              label: "holeTEST-200",
              name: "holeTEST-200",
              url: "3DTiles/模型/z_200/tileset.json",
              serviceType: "3DTiles",
            },
            {
              id: "1-10",
              label: "holeTEST-400",
              name: "holeTEST-400",
              url: "3DTiles/模型/z_400/tileset.json",
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
    mdlRightDialog: rightDialog,
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