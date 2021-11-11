<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-09-18 18:14:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 21:15:04
-->
<!--
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-09-13 14:59:47
 * @LastEditors: wenlong
 * @LastEditTime: 2021-09-18 17:43:26
-->
<template>
  <div class="cesiumContainer">
    <!-- <div class="cesium_Aside">
      <cesiumAside></cesiumAside>
    </div> -->
    <div class="cesium_Container" id="cesiumContainer">
      <threeMdlCommonTool
        :isShow="isThreeTool"
        @cesiumToolHandleOnClick="cesiumToolEvent"
      ></threeMdlCommonTool>

      <div class="mdlHeight_box" v-show="isAdjustHeightMdlTool">
        <el-slider
          v-model="scaleValue"
          :min="10"
          :max="200"
          :step="5"
          show-stops
        ></el-slider>
      </div>
      <div class="controlGroup" v-if="isClipBoxShow">
        <el-tabs type="border-card" @tab-click="tabOnClick">
          <el-tab-pane label="平面切割">
            <div>
              <el-radio-group
                v-model="clipPlaneVlaue"
                @change="changeClipValue"
              >
                <el-radio :label="1">X平面切割</el-radio>
                <el-radio :label="2">Y平面切割</el-radio>
                <el-radio :label="3">Z平面切割</el-radio>
              </el-radio-group>
            </div>
            <div class="slide_box">
              <!-- <span class="demonstration">X平面距离</span> -->
              <el-slider
                v-model="distancePlane"
                :min="minDistance"
                :max="maxDistance"
                :step="0.001"
                @input="onSlide"
              ></el-slider>
              <!-- <span class="demonstration">Y平面距离</span> -->
              <!-- <el-slider
            v-model="distance.y"
            :min="-10"
            :max="10"
            :step="0.001"
            @input="onSlideY"
          ></el-slider> -->
              <!-- <span class="demonstration">Z平面距离</span> -->
              <!-- <el-slider
            v-model="distance.z"
            :min="-10"
            :max="10"
            :step="0.001"
            @input="onSlideZ"
          ></el-slider> -->
            </div>
            <div>
              <el-checkbox v-model="showPlaneValue" @change="showPlaneOnChange"
                >只显示切面</el-checkbox
              >
              <el-checkbox
                v-model="animatePlaneValue"
                @change="animateClipOnChange"
                >动画展示</el-checkbox
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="自定义切割">
            <el-button type="primary" @click="addPlaneRoute">画线</el-button>

            <el-button type="primary" @click="customStartClip">剖切</el-button>
            <el-button type="primary" @click="clearClip">清除</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="mdlAlpha_box" v-show="isMdlAlphaTool">
        <el-slider
          v-model="alphaValue"
          :min="0"
          :max="1"
          :step="0.01"
          show-stops
        ></el-slider>
      </div>
      <div></div>
      <div class="mdlBlow_box" v-if="isMdlBlowShow">
        <el-button type="primary" size="mini" @click="blastMdl">爆炸</el-button>
        <el-button size="mini" @click="restoreMdl">还原</el-button>
      </div>
      <div class="geoLevel_box" v-if="isLevelCtrlShow">
        <!-- <el-tree
          :props="treeProps"
          :data="levelTreeData"
          show-checkbox
          @check-change="handleCheckChange"
        >
        </el-tree> -->
        <div style="margin-left: 10px; margin-top: 2px">
          <el-checkbox v-model="levelAllChecked">全选</el-checkbox>
        </div>
        <ul class="geoLevel_ul">
          <li v-for="(item, i) in objGeoLevelList" :key="i">
            <el-checkbox
              v-model="item.isChecked"
              @change="geoMdlOnChange(item)"
              >{{ item.objName }}</el-checkbox
            >
          </li>
        </ul>
      </div>
      <transition name="fade">
        <div class="geoMdlAttr_box" v-if="isGeoMdlShow">
          <div class="geoMdlAttr_head_box">
            属性信息
            <span class="geoMdlAttr_close_span" @click="colseMdlBoxOnclick"
              >×</span
            >
          </div>
          <div class="geoMdlAttr_content_box">
            <ul>
              <li>
                <div>模型属性</div>
                <div>模型信息</div>
              </li>
              <li>
                <div>标准层号</div>
                <div>{{ mdlAttrParam.layer_number }}</div>
              </li>
              <li>
                <div>地质时代</div>
                <div>{{ mdlAttrParam.geo_age }}</div>
              </li>
              <li>
                <div>岩性名称</div>
                <div>{{ mdlAttrParam.layer_naming }}</div>
              </li>
              <li>
                <div>标准编号</div>
                <div>{{ mdlAttrParam.standard_number }}</div>
              </li>
              <li>
                <div>地层颜色</div>
                <div
                  :style="{ backgroundColor: mdlAttrParam.s3dm_stratclr }"
                ></div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import threeMdlCommonTool from "../../components/threeComponents/threeMdlTool.vue";
import adjustMdlHeight from "../../components/threeComponents/adjustMdlHeight.vue";
import eventVue from "../../assets/js/eventVue.js";

//  加载three
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Stats from "three/examples/jsm/libs/stats.module.js";

// import { Notification } from "element-ui";

let scene = null;
let camera = null;
let renderer = null;
let controls = null;
let mdlGroup = null;
let clipPlanes = []; // 裁剪面
let stencilGroup = null; // 模板缓冲面
let poGroup = null; // 记录剖切面
let objAndMtls = [];
let planeObjects = null;
let raycaster = null;
let lineGroup = null;
// let stats = null;
// let clock = null;

export default {
  data() {
    return {
      isThreeTool: false,
      isWireframe: false, //线框模式
      isAdjustHeightMdlTool: false,
      isMdlBlowShow: false,
      scaleValue: 10,
      alphaValue: 1,
      isClipBoxShow: false, //是否显示模型切割盒子
      isPlaneShow: false, // 是否显示裁切盒子
      isLevelCtrlShow: false,
      isMdlAlphaTool: false,
      isGeoMdlShow: false,
      centerVec: null,

      distance: {
        x: 10,
        y: 10,
        z: 10,
      },
      distancePlane: 120,
      minDistance: -120,
      maxDistance: 120,
      mdlName: "",
      mouse: null,
      clipPlaneVlaue: 1,
      showPlaneValue: false,
      levelAllChecked: true,
      animatePlaneValue: false,
      // 动画定时器
      flashTimeOut_1: null,
      flashTimeOut_2: null,
      flashTimeOut_3: null,
      selectPolyline: [],
      objGeoLevelList: [],
      treeProps: {
        label: "label",
        children: "children",
      },
      levelTreeData: [
        {
          label: "1-1",
          children: [
            {
              label: "1-1-1",
            },
          ],
        },
      ],
      animateIndex: 1,
      moveSpeed: 0.1,
      // 记录模性属性信息
      mdlAttrParam: {
        layer_number: "",
        geo_age: "",
        layer_naming: "",
        standard_number: "",
        s3dm_stratclr: "rgb(255,0,0)",
      },
      objNameList: [
        "Bu52",
        "C1d",
        "C1sx",
        "C1y",
        "C1z",
        "C2h",
        "D2ld",
        "D2y",
        "D3m",
        "D3q",
        "D3s",
        "D3t",
        "D3x",
        "D3zd",
        "H",
        "Jxa",
        "K1",
        "K21",
        "K22",
        "ln51",
        "P1g",
        "P1m",
        "P1q",
        "P1x",
        "P21g",
        "P2c",
        "P2l",
        "P2w",
        "Ptbn2j1",
        "Ptbn2j2",
        "Ptbn2j3",
        "Ptbn2l1",
        "Qh",
        "Qnk1",
        "Qnk2",
        "Qns1",
        "Qns2",
        "qo51",
        "Qpjx",
        "T1qg",
        "T1qy",
        "T3s",
        "T3sq1",
        "T3sq2",
        "T3z",
        "yn51",
        "yq51",
        "yqn52",
        "Zaj",
        "Zb",
      ],
    };
  },
  components: {
    threeMdlCommonTool,
    adjustMdlHeight,
  },
  computed: {},
  watch: {
    levelAllChecked(val) {
      this.objGeoLevelList.forEach((item) => {
        item.isChecked = val;
      });
      if (mdlGroup.children.length > 0) {
        mdlGroup.children.forEach((element) => {
          element.visible = val;
        });
      }
    },
    scaleValue(val) {
      //进行z值缩放
      if (mdlGroup) {
        mdlGroup.scale.set(1, 1, this.scaleValue / 10.0);
      }
      if (stencilGroup) {
        stencilGroup.scale.set(1, 1, this.scaleValue / 10.0);
      }
    },
    alphaValue(val) {
      // 进行透明度改变
      if (mdlGroup) {
        mdlGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.transparent = true;
            child.material.opacity = this.alphaValue;
          }
        });
      }
    },
    isWireframe(val) {
      //进行线框模式
      if (mdlGroup) {
        mdlGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.wireframe = this.isWireframe;
          }
        });
      }
    },
  },
  methods: {
    // 初始化场景
    initScene() {
      // clock = new THREE.Clock();
      // 创建一个视角camera ,透视摄像机
      let container = document.getElementById("cesiumContainer");
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        10000000000000
      );

      // camera.position.set(0, 0, 4);
      camera.position.set(180, 0, 4);
      camera.up.set(0, 0, 1);

      // 创建一个scene和光照
      scene = new THREE.Scene();
      let ambientLight = new THREE.AmbientLight(0xcccccc, 0.6); // 无方向的环境光
      scene.add(ambientLight);
      // 直接光源
      let dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      camera.add(dirLight);
      // 点光源 就像灯泡一样的效果  白色灯光 亮度0.6
      // let pointLight = new THREE.PointLight(0xffffff, 0.6);
      // camera.add(pointLight);

      scene.add(camera);

      //辅助调试

      // render配置
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      // 把自动清除颜色缓存关闭 这个如果不关闭 后期处理这块会不能有效显示
      // 书上的描述是 如果不这样做，每次调用效果组合器的render()函数时，之前渲染的场景会被清理掉。通过这种方法，我们只会在render循环开始时，把所有东西清理一遍

      renderer.autoClear = false;

      // 背景透明 配合alpha
      renderer.setPixelRatio(window.devicePixelRatio); // 兼容高清屏幕
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x263238);
      renderer.localClippingEnabled = true;
      renderer.logarithmicDepthBuffer = true; // 使用深度缓存

      // 伽马值启动 更像人眼观察的场景
      renderer.gammaInput = true;
      renderer.gammaOutput = true;
      // 渲染到dom 中去
      // stats = new Stats();
      container.appendChild(renderer.domElement);
      // container.appendChild(stats.dom);
      // renderer.render(scene, camera);

      // 控制器添加
      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 0.01;
    },
    // 初始化动画
    animate() {
      requestAnimationFrame(this.animate);
      controls.update();
      // stats.update();
      renderer.clear();

      renderer.render(scene, camera);

      this.lookAtPlane();
      // const delta = clock.getDelta();

      if (this.animatePlaneValue && this.animatePlaneValue >= 0) {
        this.distancePlane -= 0.1;
        this.onSlide();
      }
    },
    // 切割动画展示
    animateClipOnChange(val) {
      if (val) {
      } else {
        // this.distancePlane = 120;
        // this.onSlide();
      }
    },

    //删除场景中的数据传入数组[1,2,3]
    // 1:modelGroup;2:stenciGroup;3:poGroup;4:lineGroup
    deleteGroup(mdlList) {
      if (mdlList.length === 0) return;
      for (let i = 0; i < mdlList.length; i++) {
        if (mdlList[i] === 1) {
          if (mdlGroup) {
            mdlGroup.traverse(function (item) {
              if (item instanceof THREE.Mesh) {
                item.geometry.dispose(); //删除几何体
                item.material.dispose(); //删除材质
              }
            });
            scene.remove(mdlGroup);
          }
        } else if (mdlList[i] === 2) {
          if (stencilGroup) {
            stencilGroup.traverse(function (item) {
              if (item instanceof THREE.Mesh) {
                item.geometry.dispose(); //删除几何体
                item.material.dispose(); //删除材质
              }
            });
            scene.remove(stencilGroup);
          }
        } else if (mdlList[i] === 3) {
          if (poGroup) {
            poGroup.traverse(function (item) {
              if (item instanceof THREE.Mesh) {
                item.geometry.dispose(); //删除几何体
                item.material.dispose(); //删除材质
              }
            });
            scene.remove(poGroup);
          }
        } else if (mdlList[i] === 4) {
          if (lineGroup) {
            lineGroup.traverse(function (item) {
              if (item instanceof THREE.Mesh) {
                item.geometry.dispose(); //删除几何体
                item.material.dispose(); //删除材质
              }
            });
            scene.remove(lineGroup);
          }
        }
      }
    },
    async loadObjMdl(modelPath, modelNameArr) {
      // 格式化场景数据
      this.formatScene();
      this.centerVec = null;
      for (let i = 0; i < modelNameArr.length; i++) {
        const item = modelNameArr[i];
        const mtl = await new MTLLoader()
          .setPath(modelPath)
          .loadAsync(`${item}.mtl`);
        let obj = await new OBJLoader()
          .setMaterials(mtl)
          .setPath(modelPath)
          .loadAsync(`${item}.obj`);
        if (i === 0) {
          let objBbox = new THREE.Box3().setFromObject(obj); // 获取模型中心位置
          let positionX = (objBbox.min.x + objBbox.max.x) / 2;
          let positionY = (objBbox.min.y + objBbox.max.y) / 2;
          let positionZ = (objBbox.min.z + objBbox.max.z) / 2;
          let positonVec = new THREE.Vector3(positionX, positionY, positionZ);
          positonVec.multiplyScalar(-1);
          this.centerVec = positonVec.clone();
        }
        obj.scale.set(0.001, 0.001, 0.001);
        obj.name = item;
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.translate(
              this.centerVec.x,
              this.centerVec.y,
              this.centerVec.z
            );
            child.geometry.name = item;
          }
        });
        objAndMtls.push({
          obj,
        });
        mdlGroup.add(obj);
      }
      // this.initClipPlane();
      // this.clipMdl();
    },
    async loadGltfMdl(modelPath, modelNameArr) {
      this.formatScene();
      let gltfLoader = new GLTFLoader();
      let dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("draco/gltf/");
      dracoLoader.setDecoderConfig({ type: "js" });
      gltfLoader.setDRACOLoader(dracoLoader);
      if (modelNameArr.length === 0) return;
      gltfLoader.load(modelPath + modelNameArr[0] + ".gltf", (gltf) => {
        let gltfGroup = gltf.scene;
        let objBbox = new THREE.Box3().setFromObject(gltfGroup);
        let positionX = (objBbox.min.x + objBbox.max.x) / 2;
        let positionY = (objBbox.min.y + objBbox.max.y) / 2;
        let positionZ = (objBbox.min.z + objBbox.max.z) / 2;
        let positonVec = new THREE.Vector3(positionX, positionY, positionZ);
        positonVec.multiplyScalar(-1);
        this.centerVec = positonVec.clone(); //确定中心值
        //循环递归加载gltf数据
        for (let i = 0; i < modelNameArr.length; i++) {
          gltfLoader.load(modelPath + modelNameArr[i] + ".gltf", (gltf) => {
            let gltfGroup = gltf.scene;
            gltfGroup.name = modelNameArr[i];
            gltfGroup.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.geometry.translate(
                  this.centerVec.x,
                  this.centerVec.y,
                  this.centerVec.z
                );
                child.geometry.name = modelNameArr[i];
                child.scale.set(0.001, 0.001, 0.001);
                // child.material.side = THREE.DoubleSide;
                child.material.side = THREE.BackSide;
              }
            });
            objAndMtls.push({
              obj: gltfGroup,
            });
            mdlGroup.add(gltfGroup);
          });
        }
      });
    },

    formatScene() {
      this.deleteGroup([1, 2, 3, 4]);

      mdlGroup = new THREE.Group();
      poGroup = new THREE.Group();
      stencilGroup = new THREE.Group();
      lineGroup = new THREE.Group();

      scene.add(mdlGroup);
      scene.add(poGroup);
      scene.add(stencilGroup);
      scene.add(lineGroup);

      objAndMtls = [];
      clipPlanes = [];
    },
    initClipPlane(index) {
      // let planes = [[], [], []];
      let planes = [[]];
      let plane = null;
      switch (index) {
        case 1:
          plane = new THREE.Plane(
            new THREE.Vector3(-1, 0, 0),
            this.distancePlane
          );
          break;
        case 2:
          plane = new THREE.Plane(
            new THREE.Vector3(0, -1, 0),
            this.distancePlane
          );
          break;
        case 3:
          plane = new THREE.Plane(
            new THREE.Vector3(0, 0, -1),
            this.distancePlane
          );
          break;

        default:
          break;
      }
      // let plane0 = new THREE.Plane(new THREE.Vector3(-1, 0, 0), this.distancePlane);
      // let plane1 = new THREE.Plane(new THREE.Vector3(0, -1, 0), this.distancePlane);
      // let plane2 = new THREE.Plane(new THREE.Vector3(0, 0, -1), this.distancePlane);
      for (let i = 0; i < objAndMtls.length; i++) {
        planes[0].push(plane);
        // planes[0].push(plane0);
        // planes[1].push(plane1);
        // planes[2].push(plane2);
      }

      clipPlanes = planes;
      planeObjects = clipPlanes.map(() => []);
    },
    // 切割模型主函数
    clipMdl() {
      let clippingPlanes = [];
      clipPlanes.forEach((item) => {
        clippingPlanes = clippingPlanes.concat(item);
      });
      for (let x = 0; x < clipPlanes.length; x++) {
        for (let i = 0; i < objAndMtls.length; i++) {
          const layerModel = objAndMtls[i].obj;
          layerModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.clippingPlanes = clippingPlanes;
              // child.material.side = THREE.DoubleSide;
              child.castShadow = true;
              child.renderOrder = 6;
            }
          });

          // 下面是关于模板缓冲
          const planeGeom = new THREE.PlaneGeometry(1000, 1000); //
          const plane = clipPlanes[x][i];
          layerModel.children.forEach((_itemModel) => {
            // const _itemModel = itemModel as THREE.Mesh;
            const geometry = _itemModel.geometry.clone();

            const tempStencilGroup = this.createPlaneStencilGroup(
              geometry,
              plane,
              i + 2.2
            );
            tempStencilGroup.scale.set(0.001, 0.001, 0.001);
            stencilGroup.add(tempStencilGroup);
          });

          let result = [];
          clipPlanes.forEach((item, index) => {
            if (index !== x) {
              result = result.concat(item);
            }
          });
          // plane会被其他clipping planes裁剪
          const planeMat = new THREE.MeshStandardMaterial({
            // side: THREE.DoubleSide,
            color: layerModel.children[0].material.color,
            clippingPlanes: result,
            stencilWrite: true,
            stencilRef: 0,
            stencilFunc: THREE.NotEqualStencilFunc,
            stencilFail: THREE.ReplaceStencilOp,
            stencilZFail: THREE.ReplaceStencilOp,
            stencilZPass: THREE.ReplaceStencilOp,
          });
          const po = new THREE.Mesh(planeGeom, planeMat);
          po.onAfterRender = (renderer) => {
            renderer.clearStencil();
          };
          po.renderOrder = i + 2.2;
          poGroup.add(po);
          planeObjects[x].push(po);
        }
      }
    },
    // 构建模板缓冲的面
    createPlaneStencilGroup(layerModel, plane, renderOrder) {
      const group = new THREE.Group();
      const baseMat = new THREE.MeshBasicMaterial();
      baseMat.depthWrite = false;
      baseMat.depthTest = false;
      baseMat.colorWrite = false;
      baseMat.stencilWrite = true;
      baseMat.stencilFunc = THREE.AlwaysStencilFunc;

      const mat0 = baseMat.clone();
      mat0.side = THREE.BackSide;
      mat0.clippingPlanes = [plane];
      mat0.stencilFunc = THREE.AlwaysStencilFunc;
      mat0.stencilFail = THREE.IncrementWrapStencilOp;
      mat0.stencilZFail = THREE.IncrementWrapStencilOp;
      mat0.stencilZPass = THREE.IncrementWrapStencilOp;

      const mesh0 = new THREE.Mesh(layerModel, mat0);
      mesh0.renderOrder = renderOrder;
      group.add(mesh0);

      // front faces
      const mat1 = baseMat.clone();
      mat1.side = THREE.FrontSide;
      mat1.clippingPlanes = [plane];
      // DecrementWrapStencilOp将当前stencil value减少1
      mat1.stencilFail = THREE.DecrementWrapStencilOp;
      mat1.stencilZFail = THREE.DecrementWrapStencilOp;
      mat1.stencilZPass = THREE.DecrementWrapStencilOp;

      const mesh1 = new THREE.Mesh(layerModel, mat1);
      mesh1.renderOrder = renderOrder;

      group.add(mesh1);

      return group;
    },
    lookAtPlane() {
      const _lookAtPlane = () => {
        for (let x = 0; x < clipPlanes.length; x++) {
          for (let i = 0; i < objAndMtls.length; i++) {
            const plane = clipPlanes[x][i];
            const po = planeObjects[x][i];
            if (!po) return;

            plane.coplanarPoint(po.position);
            // mesh.lookAt起什么作用
            po.lookAt(
              po.position.x - plane.normal.x,
              po.position.y - plane.normal.y,
              po.position.z - plane.normal.z
            );
          }
        }
      };
      if (clipPlanes.length > 0) {
        _lookAtPlane();
      }
    },
    cesiumToolEvent(item) {
      switch (item.index) {
        case 1:
          this.isWireframe = !this.isWireframe;
          break;
        case 2:
          this.isAdjustHeightMdlTool = !this.isAdjustHeightMdlTool;
          break;
        case 3:
          this.isMdlBlowShow = !this.isMdlBlowShow;
          break;
        case 4:
          this.isClipBoxShow = !this.isClipBoxShow;
          if (this.isClipBoxShow) {
            this.initClipPlane(this.clipPlaneVlaue);
            this.clipMdl();
          } else {
            this.deleteGroup([2, 3]);
            poGroup = new THREE.Group();
            stencilGroup = new THREE.Group();
            scene.add(poGroup);
            scene.add(stencilGroup);
            mdlGroup.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material.clippingPlanes = "";
                child.castShadow = true;
              }
            });
            mdlGroup.visible = true;
            clipPlanes = [];
          }
          break;
        case 5:
          if (item.active) {
            this.mdlSelect();
          } else {
            renderer.domElement.removeEventListener(
              "click",
              this.mouseDownOnclick
            );
          }

          break;
        case 6:
          this.isLevelCtrlShow = !this.isLevelCtrlShow;
          break;
        case 7:
          this.resetMdl();
          break;
        case 8:
          // 修改模型透明度
          this.isMdlAlphaTool = !this.isMdlAlphaTool;
          console.log(mdlGroup);

          break;
        case 9:
          // 模型量算
          if (item.active) {
            this.mdlMeasure();
          } else {
            renderer.domElement.removeEventListener(
              "dblclick",
              this.mdlMeasureOnclick
            );
          }

          break;
        default:
          break;
      }
    },
    // 模型拾取
    mdlSelect() {
      raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      renderer.domElement.addEventListener("click", this.mouseDownOnclick);
    },
    // 模型拾取响应函数
    mouseDownOnclick(event) {
      let container = document.getElementById("cesiumContainer");
      this.mouse.x = (event.offsetX / container.clientWidth) * 2 - 1;
      this.mouse.y = -(event.offsetY / container.clientHeight) * 2 + 1;
      raycaster.setFromCamera(this.mouse, camera);
      const intersects = raycaster.intersectObjects(mdlGroup.children, true);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        this.mdlAttrParam.layer_number = obj.geometry.name;
        this.mdlAttrParam.geo_age = "";
        this.mdlAttrParam.layer_naming = "";
        this.mdlAttrParam.standard_number = "";
        this.mdlAttrParam.s3dm_stratclr = "";
        this.isGeoMdlShow = true;
        // this.$http
        //   .get("QueryStandardstratum", {
        //     params: {
        //       layerNumber: obj.geometry.name,
        //     },
        //   })
        //   .then((res) => {
        //     if (res.data.res[0]) {
        //       this.mdlAttrParam.layer_number = res.data.res[0].layer_number;
        //       this.mdlAttrParam.geo_age = res.data.res[0].geo_age;
        //       this.mdlAttrParam.layer_naming = res.data.res[0].layer_naming;
        //       this.mdlAttrParam.standard_number =
        //         res.data.res[0].standard_number;
        //       this.mdlAttrParam.s3dm_stratclr = this.getRValue(
        //         res.data.res[0].s3dm_stratclr
        //       );
        //     } else {
        //       this.mdlAttrParam.layer_number = obj.geometry.name;
        //       this.mdlAttrParam.geo_age = "";
        //       this.mdlAttrParam.layer_naming = "";
        //       this.mdlAttrParam.standard_number = "";
        //       this.mdlAttrParam.s3dm_stratclr = "";
        //     }
        //     this.isGeoMdlShow = true;
        //   })
        //   .catch((err) => {
        //     this.mdlAttrParam.layer_number = obj.geometry.name;
        //     this.mdlAttrParam.geo_age = "";
        //     this.mdlAttrParam.layer_naming = "";
        //     this.mdlAttrParam.standard_number = "";
        //     this.mdlAttrParam.s3dm_stratclr = "";
        //     this.isGeoMdlShow = true;
        //   });

        const originColor = obj.material.color.clone();
        obj.material.color.set("#00FF88");
        if (this.flashTimeOut_1) {
          clearTimeout(this.flashTimeOut_1);
          clearTimeout(this.flashTimeOut_2);
          clearTimeout(this.flashTimeOut_3);
          this.flashTimeOut_1 = null;
          this.flashTimeOut_2 = null;
          this.flashTimeOut_3 = null;
        }
        this.flashTimeOut_1 = setTimeout(() => {
          obj.material.color.set(originColor);
        }, 100);
        this.flashTimeOut_2 = setTimeout(() => {
          obj.material.color.set("#00FF88");
        }, 200);
        this.flashTimeOut_3 = setTimeout(() => {
          obj.material.color.set(originColor);
        }, 300);
        obj.material.needsUpdate = true;
      }
    },
    // 反演rgb
    getRValue(uniqueVlaue) {
      let r = 0,
        g = 0,
        b = 0;
      for (r = 0; r <= 255; r++) {
        for (g = 0; g <= 255; g++) {
          for (b = 0; b <= 255; b++) {
            if (r + g * 256 + b * 256 * 256 === uniqueVlaue) {
              return "rgb(" + r + "," + g + "," + b + ")";
            }
          }
        }
      }
    },
    // 模型量算
    mdlMeasure() {
      raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      this.selectPolyline = [];
      renderer.domElement.addEventListener(
        "dblclick",
        this.mdlMeasureOnclick,
        false
      );
    },
    // 模型量算响应函数
    mdlMeasureOnclick(event) {
      let container = document.getElementById("cesiumContainer");
      this.mouse.x = (event.offsetX / container.clientWidth) * 2 - 1;
      this.mouse.y = -(event.offsetY / container.clientHeight) * 2 + 1;
      raycaster.setFromCamera(this.mouse, camera);
      const intersects = raycaster.intersectObjects(mdlGroup.children, true);
      if (intersects.length > 0) {
        console.log(intersects[0].point);
        const point = intersects[0].point; //射线在模型表面拾取的点坐标
        this.selectPolyline.push(point);
      }
      if (this.selectPolyline.length === 2) {
        const material = new THREE.LineBasicMaterial({
          color: 0x0000ff,
          width: 2,
          depthTest: true,
        });
        const geometry = new THREE.BufferGeometry().setFromPoints(
          this.selectPolyline
        );
        const line = new THREE.Line(geometry, material);
        lineGroup.add(line);
        this.selectPolyline.shift();
      }
    },
    onSlideX() {
      if (clipPlanes.length !== 0) {
        clipPlanes[0].forEach((item) => {
          item.constant = this.distance.x;
        });
      }
    },
    onSlideY() {
      if (clipPlanes.length !== 0) {
        clipPlanes[1].forEach((item) => {
          item.constant = this.distance.y;
        });
      }
    },
    onSlideZ() {
      if (clipPlanes.length !== 0) {
        clipPlanes[2].forEach((item) => {
          item.constant = this.distance.z;
        });
      }
    },
    // 切割滑动
    onSlide() {
      if (this.clipPlaneVlaue === 1) {
        if (clipPlanes.length !== 0) {
          clipPlanes[0].forEach((item) => {
            item.constant = this.distancePlane;
          });
        }
      } else if (this.clipPlaneVlaue === 2) {
        clipPlanes[0].forEach((item) => {
          item.constant = this.distancePlane;
        });
      } else if (this.clipPlaneVlaue === 3) {
        clipPlanes[0].forEach((item) => {
          item.constant = this.distancePlane;
        });
      }
    },
    // 添加折现路径
    addPlaneRoute() {
      raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      this.selectPolyline = [];

      lineGroup && scene.remove(lineGroup);
      lineGroup = new THREE.Group();
      scene.add(lineGroup);
      renderer.domElement.addEventListener(
        "dblclick",
        this.addMdlRouteOnclick,
        false
      );
    },
    // 添加路径响应函数
    addMdlRouteOnclick(event) {
      let container = document.getElementById("cesiumContainer");
      this.mouse.x = (event.offsetX / container.clientWidth) * 2 - 1;
      this.mouse.y = -(event.offsetY / container.clientHeight) * 2 + 1;
      raycaster.setFromCamera(this.mouse, camera);
      const intersects = raycaster.intersectObjects(mdlGroup.children, true);
      if (intersects.length > 0) {
        const point = intersects[0].point; //射线在模型表面拾取的点坐标
        this.selectPolyline.push(point);
      }
      if (this.selectPolyline.length === 2) {
        // 构造剖切面
        const test = new THREE.Vector3(
          this.selectPolyline[1].x,
          this.selectPolyline[1].y,
          this.selectPolyline[1].z - 1
        );
        const normalize = this.selectPolyline[1]
          .clone()
          .sub(this.selectPolyline[0])
          .cross(test.sub(this.selectPolyline[0]))
          .normalize();
        console.log("第一个向量坐标：" + this.selectPolyline[0].x);
        console.log("第二个向量坐标：" + this.selectPolyline[1].x);
        console.log(
          "两点之间的向量1：" +
            this.selectPolyline[1].clone().sub(this.selectPolyline[0]).x
        );
        console.log("两点之间的向量2：" + normalize.x);
        const distance =
          -this.selectPolyline[0].dot(normalize) /
          Math.sqrt(
            normalize.x * normalize.x +
              normalize.y * normalize.y +
              normalize.z * normalize.z
          );

        const planex = new THREE.Plane(
          new THREE.Vector3(normalize.x, normalize.y, normalize.z),
          distance
        );
        clipPlanes.push([]);
        planeObjects = clipPlanes.map(() => []);

        for (let i = 0; i < objAndMtls.length; i++) {
          clipPlanes[clipPlanes.length - 1].push(planex);
        }

        const material = new THREE.LineBasicMaterial({
          color: 0x0000ff,
          depthTest: true,
        });
        const geometry = new THREE.BufferGeometry().setFromPoints(
          this.selectPolyline
        );
        const line = new THREE.Line(geometry, material);
        lineGroup.add(line);
        this.selectPolyline.shift();
      }
    },
    //自定义开始切割
    customStartClip() {
      // 去除双击事件
      renderer.domElement.removeEventListener(
        "dblclick",
        this.addMdlRouteOnclick
      );
      if (this.selectPolyline.length === 0) return;
      scene.remove(lineGroup); // 移除线
      lineGroup = null;
      this.clipMdl();
      mdlGroup.visible = false;
    },
    clearClip() {
      renderer.domElement.removeEventListener(
        "dblclick",
        this.addMdlRouteOnclick
      );
      this.deleteGroup([2, 3, 4]);

      poGroup = new THREE.Group();
      stencilGroup = new THREE.Group();

      scene.add(poGroup);
      scene.add(stencilGroup);
      lineGroup = null;

      mdlGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.clippingPlanes = "";
          child.castShadow = true;
        }
      });
      mdlGroup.visible = true;
      this.selectPolyline = [];

      clipPlanes = [];
    },
    // 切换剪切面
    changeClipValue(val) {
      // 切换的时候初始化plane
      switch (val) {
        case 1:
          camera.position.set(180, 0, 4);
          // camera.position.set(0, 0, 4);
          camera.up.set(0, 0, 1);
          // if (this.mdlName === "惠州全域三维地质模型") {
          this.minDistance = -120;
          this.maxDistance = 120;
          this.distancePlane = 120;
          // } else {
          //   this.minDistance = -10;
          //   this.maxDistance = 10;
          //   this.distancePlane = 10;
          // }
          break;
        case 2:
          camera.position.set(0, 180, 4);
          // camera.position.set(0, 0, 4);
          camera.up.set(0, 0, 1);
          // if (this.mdlName === "惠州全域三维地质模型") {
          this.minDistance = -120;
          this.maxDistance = 120;
          this.distancePlane = 120;
          // } else {
          //   this.minDistance = -10;
          //   this.maxDistance = 10;
          //   this.distancePlane = 10;
          // }
          break;
        case 3:
          camera.position.set(0, -4, 180);
          // camera.position.set(0, -4, 0);
          camera.up.set(0, 0, 1);
          // if (this.mdlName === "惠州全域三维地质模型") {
          this.minDistance = -5;
          this.maxDistance = 10;
          this.distancePlane = 10;
          // } else {
          //   this.minDistance = -5;
          //   this.maxDistance = 10;
          //   this.distancePlane = 10;
          // }
          break;
        default:
          break;
      }

      poGroup && scene.remove(poGroup);
      stencilGroup && scene.remove(stencilGroup);
      poGroup = new THREE.Group();
      stencilGroup = new THREE.Group();
      scene.add(poGroup);
      scene.add(stencilGroup);
      clipPlanes = [];
      this.distancePlane = 120;
      this.initClipPlane(val);
      this.clipMdl();
    },
    // 模型爆炸
    blastMdl() {
      this.moveSpeed = 0.1;
      //记录模型的中间层
      let timeInterval = setInterval(() => {
        let indexCenter = parseInt(mdlGroup.children.length / 2);
        let centerFlag = indexCenter;
        for (let i = 0; i < indexCenter; i++) {
          mdlGroup.children[i].position.z = centerFlag * this.moveSpeed;
          centerFlag--;
        }
        centerFlag = indexCenter;
        for (let i = mdlGroup.children.length - 1; i >= indexCenter; i--) {
          mdlGroup.children[i].position.z = -centerFlag * this.moveSpeed;
          centerFlag--;
        }
        this.moveSpeed += 0.05;
        if (this.moveSpeed >= 1) {
          clearInterval(timeInterval);
        }
      }, 80);
    },

    // 爆炸还原
    restoreMdl() {
      let mdlLength = mdlGroup.children.length;
      for (let i = 0; i < mdlLength; i++) {
        mdlGroup.children[i].position.z = 0;
      }
    },

    // 模型复原
    resetMdl() {
      this.restoreMdl();
      this.isWireframe = false;
      this.scaleValue = 10;
      this.alphaValue = 1;
      camera.position.set(0, 0, 180);
      // 切割还原
      this.distancePlane = 120;
      mdlGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.clippingPlanes = "";
          child.castShadow = true;
        }
      });
      mdlGroup.visible = true;
      this.deleteGroup([2, 3]);
      poGroup = new THREE.Group();
      stencilGroup = new THREE.Group();
      scene.add(poGroup);
      scene.add(stencilGroup);
      clipPlanes = [];
      this.selectPolyline = [];
      // 盒子影藏
      this.isClipBoxShow = false;
      this.isMdlAlphaTool = false;
      this.isAdjustHeightMdlTool = false;
      this.isMdlBlowShow = false;
      this.isLevelCtrlShow = false;
      // 还原状态
      eventVue.$emit("sendResetMdlInfo", false);
      // 移除模型事件
      renderer.domElement.removeEventListener("click", this.mouseDownOnclick);
      renderer.domElement.removeEventListener(
        "dblclick",
        this.addMdlRouteOnclick
      );
    },

    //模型层级显影
    geoMdlOnChange(item) {
      if (mdlGroup.children.length > 0) {
        mdlGroup.children.forEach((element) => {
          if (item.objName === element.name) {
            element.visible = item.isChecked;
          }
        });
      }
    },

    // 模型全显隐checked
    geoMdlIsShow(checked) {
      if (mdlGroup.children.length > 0) {
        mdlGroup.children.forEach((element) => {
          element.visible = checked;
        });
      }
    },

    //切换点击
    tabOnClick(tab) {
      this.deleteGroup([2, 3, 4]);
      poGroup = new THREE.Group();
      stencilGroup = new THREE.Group();
      lineGroup = new THREE.Group();

      scene.add(poGroup);
      scene.add(stencilGroup);
      scene.add(lineGroup);

      clipPlanes = [];
      planeObjects = null;
      this.selectPolyline = [];
      mdlGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.clippingPlanes = "";
        }
      });
      mdlGroup.visible = true;

      if (tab.label === "平面切割") {
        renderer.domElement.removeEventListener(
          "dblclick",
          this.addMdlRouteOnclick
        );
        this.distancePlane = 120;
        this.initClipPlane(this.clipPlaneVlaue);
        this.clipMdl();
      }
    },
    showPlaneOnChange(checked) {
      mdlGroup.visible = !checked;
    },
    // 关闭盒子
    colseMdlBoxOnclick() {
      this.mdlAttrParam.layer_number = "";
      this.mdlAttrParam.geo_age = "";
      this.mdlAttrParam.layer_naming = "";
      this.mdlAttrParam.standard_number = "";
      this.mdlAttrParam.s3dm_stratclr = "";
      this.isGeoMdlShow = false;
    },
  },
  mounted() {
    this.initScene();
    this.animate();
    this.isThreeTool = true;
    this.isClipBoxShow = false;
    this.isAdjustHeightMdlTool = false;
    this.isLevelCtrlShow = false;
    this.clipPlaneVlaue = 1;
    // this.mdlName = res.label;
    // if (res.label === "惠州全域三维地质模型") {
    this.minDistance = -120;
    this.maxDistance = 120;
    this.distancePlane = 120;
    let tempList = [];
    for (let i = 0; i < this.objNameList.length; i++) {
      tempList.push({
        objName: this.objNameList[i],
        isChecked: true,
      });
    }
    this.objGeoLevelList = tempList;

    //this.loadObjMdl(res.path, res.objNameList);
    this.loadGltfMdl("dracoGltf/", this.objNameList);
  },
  created() {},
  beforeDestroy() {
    this.deleteGroup([1, 2, 3, 4]);
    clipPlanes = [];
    objAndMtls = [];
    scene.dispose();
    controls.dispose();
    let gl = renderer.domElement.getContext("webgl");
    gl && gl.getExtension("WEBGL_lose_context").loseContext();
  },
};
</script> 


<style scoped>
.cesiumContainer {
  width: 100%;
  height: 100%;
  /* display: flex; */
}
.cesium_Aside {
  height: 100%;
  min-width: 300px;
  flex: 1;
  background-color: rgb(84, 92, 100);
}
.cesium_Container {
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  position: relative;
  /* flex: 7; */
}
.mdlHeight_box {
  height: 40px;
  width: 400px;
  /* background-color: antiquewhite; */
  position: absolute;
  top: 50px;
  left: 80px;
  border-radius: 5px;
}
.mdlAlpha_box {
  height: 40px;
  width: 400px;
  /* background-color: antiquewhite; */
  position: absolute;
  top: 50px;
  left: 300px;
  border-radius: 5px;
}
.controlGroup {
  box-sizing: border-box;
  width: 428px;
  padding: 10px;
  border-radius: 3%;
  position: absolute;
  top: 120px;
  left: 300px;
  background-color: #fff;
  box-shadow: 0 0 10px rgb(38, 50, 56);
}
.mdlBlow_box {
  box-sizing: border-box;
  /* width: 428px; */
  padding: 10px;
  border-radius: 3%;
  position: absolute;
  top: 70px;
  left: 300px;
  /* background-color: #fff; */
  box-shadow: 0 0 10px rgb(38, 50, 56);
}
.slide_box {
  margin-top: 10px;
}
.spanText {
  position: absolute;
  top: -2px;
  left: 0;
  width: 80px;
  text-align: center;
}
.checkboxGroup {
  padding-left: 80px;
}
.geoLevel_box {
  width: 150px;
  height: 600px;
  position: fixed;
  background-color: #fff;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
}
.geoLevel_box .geoLevel_ul {
  width: 100%;
  height: 95%;
  overflow-y: auto;
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.geoLevel_box .geoLevel_ul li {
  padding: 10px;
  margin-top: 2px;
}
.geoMdlAttr_box {
  width: 300px;
  height: 400px;
  z-index: 1;
  background-color: rgb(82, 86, 92);
  position: fixed;
  right: 10px;
  top: 100px;
}
.geoMdlAttr_box .geoMdlAttr_head_box {
  height: 35px;
  width: 100%;
  box-sizing: border-box;
  line-height: 35px;
  font-size: 14px;
  color: rgb(172, 174, 176);
  border-bottom: 2px solid rgb(94, 99, 106);
  font-weight: 900;
  letter-spacing: 1px;
  padding-left: 3px;
}
.geoMdlAttr_box .geoMdlAttr_close_span {
  position: absolute;
  right: 5px;
  font-size: 20px;
  cursor: pointer;
}
.geoMdlAttr_box .geoMdlAttr_close_span:hover {
  color: rgb(129, 211, 248);
}
.geoMdlAttr_content_box {
  padding: 8px;
  box-sizing: border-box;
}
.geoMdlAttr_content_box ul {
  padding: 0;
  margin: 0;
  list-style: none;
  color: rgb(172, 174, 176);
  font-size: 14px;
}
.geoMdlAttr_content_box ul li {
  height: 40px;
  border: 1px solid rgb(94, 99, 106);
  display: flex;
  line-height: 40px;
}
.geoMdlAttr_content_box ul li div {
  padding-left: 5px;
  flex: 1;
  border-right: 1px solid rgb(94, 99, 106);
}
.geoMdlAttr_content_box ul li:nth-child(1) div {
  background-color: rgb(102, 108, 115);
}
/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(310px);
  opacity: 0;
}
</style>
