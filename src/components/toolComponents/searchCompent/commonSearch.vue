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
    <div class="commonSearchBox_left">
      <div>
        <el-radio v-model="radio" label="1">模糊查询</el-radio>
      </div>
      <div>
        <el-radio v-model="radio" label="2">图层查询</el-radio>
      </div>
      <div>
        <el-radio v-model="radio" label="3">空间检索</el-radio>
      </div>
    </div>
    <div class="commonSearchBox_right">
      <div v-show="radio == 1">
        <div class="vaguebox">
          <el-input
            v-model="vagueInput"
            placeholder="请输入钻孔编码断层地层"
            clearable
            suffix-icon="el-icon-search"
          ></el-input>
        </div>
        <div class="commonSearchBtn">
          <div @click="searchOnClick(1)">检索</div>
          <div @click="resetOnClick(1)">重置</div>
        </div>
      </div>

      <div v-show="radio == 2" class="layerSelectBox">
        <div>
          <span>图层选择：</span>
          <el-select
            v-model="layerSelectValue"
            placeholder="请选择图层"
            @change="layerSelectOnChange"
            clearable
          >
            <el-option
              v-for="item in layerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span>检索字段：</span>
          <el-select
            v-model="fieldSelectValue"
            placeholder="选择字段"
            @change="fieldSelectOnChange"
          >
            <el-option
              v-for="item in fieldOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span style="padding: 0 10px">=</span>
          <el-input class="fieldValueinput" v-model="fieldValue"></el-input>
        </div>
        <div class="commonSearchBtn">
          <div @click="searchOnClick(2)">检索</div>
          <div @click="resetOnClick(2)">重置</div>
        </div>
      </div>
      <div v-show="radio == 3">
        <div class="spaceSearchBox">
          <div>
            <span>空间位置</span>
            <el-select
              v-model="spaceSelectValue"
              placeholder="请选择方式"
              @change="spaceSelectOnChange"
            >
              <el-option
                v-for="item in spaceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="spaceSearchTool_box">
            <div class="spaceSearchTool_box_1" v-if="spaceSelectValue === '1'">
              <div>
                点<span
                  :class="[
                    'iconfont',
                    'icon-yuanquan',
                    { activeToolSpan: taggleIndex === 1 },
                  ]"
                  @click="taggleMapToolClick(1)"
                ></span>
              </div>
              <div>
                矩形<span
                  :class="[
                    'iconfont',
                    'icon-juxing',
                    { activeToolSpan: taggleIndex === 2 },
                  ]"
                  @click="taggleMapToolClick(2)"
                ></span>
              </div>
              <div>
                多边形<span
                  :class="[
                    'iconfont',
                    'icon-duobianxing',
                    { activeToolSpan: taggleIndex === 3 },
                  ]"
                  @click="taggleMapToolClick(3)"
                ></span>
              </div>
            </div>
            <div class="spaceSearchTool_box_2" v-if="spaceSelectValue === '2'">
              <v-region @values="regionChange"></v-region>
            </div>
            <div class="spaceSearchTool_box_3" v-if="spaceSelectValue === '3'">
              <div>
                <!-- <el-radio v-model="coordSelect"> </el-radio> -->
                <span>经度</span>
                <el-input
                  v-model="coordinateParams.lon"
                  :disabled="spaceDisabled1"
                  @input="changeOnInpnt1"
                ></el-input>
                <span>纬度</span>
                <el-input
                  v-model="coordinateParams.lat"
                  :disabled="spaceDisabled1"
                  @input="changeOnInpnt1"
                ></el-input>
              </div>
              <div>
                <!-- <el-radio v-model="coordSelect"></el-radio> -->
                <span>经距</span>
                <el-input
                  v-model="coordinateParams.coordX"
                  :disabled="spaceDisabled2"
                  @input="changeOnInpnt2"
                ></el-input>
                <span>纬距</span>
                <el-input
                  v-model="coordinateParams.coordY"
                  :disabled="spaceDisabled2"
                  @input="changeOnInpnt2"
                ></el-input>
              </div>
              <div>
                <!-- <el-radio v-model="coordSelect"></el-radio> -->
                <span>里程</span>
                <el-input
                  v-model="coordinateParams.mileage"
                  :disabled="spaceDisabled3"
                  @input="changeOnInpnt3"
                ></el-input>
                <span>偏距</span>
                <el-input
                  v-model="coordinateParams.offset"
                  :disabled="spaceDisabled3"
                  @input="changeOnInpnt3"
                ></el-input>
              </div>
              <div>
                <span>距离</span>
                <el-input v-model="bufferDistanceValue"></el-input>
                <span>缓冲区（单位： <i style="color: red">m</i>）</span>
              </div>
            </div>
          </div>
        </div>
        <div class="commonSearchBtn">
          <div @click="searchOnClick(2)">检索</div>
          <div @click="resetOnClick(2)">重置</div>
        </div>
      </div>
    </div>
    <!-- <div>
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
    </div> -->
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      vagueInput: "", // 模糊搜索的值
      layerOptions: [
        {
          label: "地层（岩体）分布",
          layer: "geostratumzone",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:geostratumzone&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:geostratumzone&maxFeatures=10000&outputFormat=application/json",
          value: "geostratumzone",
        },
        {
          label: "围岩蚀变地层",
          layer: "aterationp",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:aterationp&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:aterationp&maxFeatures=10000&outputFormat=application/json",
          value: "aterationp",
        },
        {
          label: "地层界线分布",
          layer: "geoboundzone",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:geoboundzone&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:geoboundzone&maxFeatures=10000&outputFormat=application/json",
          value: "geoboundzone",
        },
        {
          label: "断层构造分布",
          layer: "faultzone",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:faultzone&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:faultzone&maxFeatures=10000&outputFormat=application/json",
          value: "faultzone",
        },
        {
          label: "产状点",
          layer: "occurrence",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:occurrence&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:occurrence&maxFeatures=10000&outputFormat=application/json",
          value: "occurrence",
        },
        {
          label: "围岩蚀变点",
          layer: "alterationt",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:alterationt&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:alterationt&maxFeatures=10000&outputFormat=application/json",
          value: "alterationt",
        },
        {
          label: "地形地貌",
          layer: "landform",
          name: "landform",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:landform&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:landform&maxFeatures=10000&outputFormat=application/json",
          value: "landform",
        },
        {
          label: "矿产开发及采空区",
          layer: "minegoaf",
          name: "minegoaf",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:minegoaf&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:minegoaf&maxFeatures=10000&outputFormat=application/json",
          value: "minegoaf",
        },
        {
          label: "特殊岩体",
          layer: "specialrocksoil",
          name: "specialrocksoil",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:specialrocksoil&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:specialrocksoil&maxFeatures=10000&outputFormat=application/json",
          value: "specialrocksoil",
        },
        {
          label: "不良地质",
          layer: "unfavorablegeology",
          name: "unfavorablegeology",
          wmsUrl: "http://192.10.3.237/geoserver/crcc-dev/wms",
          attrUrl:
            "http://192.10.3.237/geoserver/wfs?request=describeFeatureType&typename=crcc-dev:faultzone&outputFormat=application/json",
          wfsUrl:
            "http://192.10.3.237/geoserver/crcc-dev/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crcc-dev:unfavorablegeology&maxFeatures=10000&outputFormat=application/json",
          value: "unfavorablegeology",
        },
      ],
      fieldOptions: [
        {
          label: "",
          value: "",
        },
      ],
      layerSelectValue: "",
      fieldSelectValue: "",
      fieldValue: "",
      spaceSelectValue: "1",
      spaceOptions: [
        {
          label: "地图选择",
          value: "1",
        },
        {
          label: "行政区",
          value: "2",
        },
        {
          label: "坐标位置",
          value: "3",
        },
      ],
      taggleIndex: 0,
      coordinateParams: {
        lon: "",
        lat: "",
        coordX: "",
        coordY: "",
        mileage: "",
        offset: "",
      },
      bufferDistanceValue: "",
      spaceDisabled1: false,
      spaceDisabled2: false,
      spaceDisabled3: false,
    };
  },
  methods: {
    // 检索
    searchOnClick(index) {
      // 模糊查询
      if (index === 1) {
        if (this.vagueInput !== "") {
          this.$http
            .get("/commonSearchByParams", {
              params: {
                holename: this.vagueInput,
              },
            })
            .then((res) => {
              this.$emit("sendSearachResultDataEvent", res.data.data);
            })
            .catch((err) => {
              this.$emit("sendSearachResultDataEvent", null);
            });
        }
      } else if (index === 2) {
        // if (this.layerSelectValue === "") return;
        // let layerItem = this.layerOptions.find((obj) => {
        //   if (obj.layer === this.layerSelectValue) {
        //     return obj;
        //   }
        // });
        // let tempLayreItem = JSON.parse(JSON.stringify(layerItem));
        // if (this.fieldSelectValue !== "" && this.fieldValue !== "") {
        //   tempLayreItem.cqlStr = `${this.fieldSelectValue} = ${this.fieldValue}`;
        //   this.$emit("sendLayerSearchInfo", tempLayreItem);
        //   console.log(tempLayreItem);
        // } else {
        //   this.$emit("sendLayerSearchInfo", tempLayreItem);
        //   console.log(tempLayreItem);
        // }
        this.searchByTC();
      }
    },
    // 图层查询
    searchByTC() {
      if (this.layerSelectValue === "") return;
      let layerItem = this.layerOptions.find((obj) => {
        if (obj.layer === this.layerSelectValue) {
          return obj;
        }
      });
      let tempLayreItem = JSON.parse(JSON.stringify(layerItem));
      let url = tempLayreItem.wfsUrl;
      let cqlStr = "";
      const reg = /^\d+$/; // 判断是否为数字
      const flag = reg.test(this.fieldValue);
      let tempStr = this.fieldValue;
      if (!flag) {
        tempStr = `'${tempStr}'`;
      }
      if (this.fieldSelectValue !== "" && this.fieldValue !== "") {
        cqlStr = `${this.fieldSelectValue}=${tempStr}`;
        url = url + "&cql_filter=" + cqlStr;
      }
      let sendData = [];
      this.$http(url).then((res) => {
        console.log(res.data);
        let featureList = res.data.features;
        for (let i = 0; i < featureList.length; i++) {
          for (let k in featureList[i].properties) {
            if (k.indexOf("id") >= 0) {
              let obj = {
                url: tempLayreItem.wmsUrl,
                layer: tempLayreItem.layer,
                cqlStr: cqlStr,
                label: `${k}=${featureList[i].properties[k]}`,
              };
              sendData.push(obj);
              break;
            }
          }
        }

        this.$emit("sendSearchInfoInwmsLayer", sendData);
      });

      // this.$emit("sendLayerSearchInfo", url, tempLayreItem.name);
    },

    resetOnClick(index) {
      if (index === 1) {
        this.vagueInput = "";
        this.$emit("sendResetInfoEvent", 0);
        this.$emit("sendResetInfoEvent", 1); // 隐藏对话框
      } else if (index === 2) {
        this.fieldOptions = [];
        this.fieldValue = "";
        this.layerSelectValue = "";
        this.fieldSelectValue = "";
        this.$emit("sendResetInfoEvent", 1); // 隐藏对话框
        this.$emit("sendResetInfoEvent", 2);
      }
    },
    layerSelectOnChange(val) {
      if (val === "") {
        this.fieldOptions = [];
        this.fieldSelectValue = "";
        this.fieldValue = "";
        return;
      }
      this.fieldValue = "";
      this.fieldSelectValue = "";
      this.fieldOptions = [];
      let url = "";
      for (let i = 0; i < this.layerOptions.length; i++) {
        if (this.layerOptions[i].layer === val) {
          url = this.layerOptions[i].attrUrl;
          break;
        }
      }

      this.$http.get(url).then((res) => {
        const tempData = res.data.featureTypes[0].properties;
        let resultData = [];
        for (let i = 0; i < tempData.length; i++) {
          let obj = {
            label: tempData[i].name,
            value: tempData[i].name,
          };
          resultData.push(obj);
        }
        this.fieldOptions = resultData;
      });
    },
    fieldSelectOnChange(val) {},

    // 一下操作都不会保留上一步的操作结果
    spaceSelectOnChange(val) {
      let valIndex = parseInt(val);
      switch (valIndex) {
        case 1:
          // 清除 2和3 的状态
          break;
        case 2:
          // 清除 2和3 的状态
          break;
        case 3:
          // 清除 2和3 的状态
          break;

        default:
          break;
      }
    },
    taggleMapToolClick(index) {
      if (this.taggleIndex === index) {
        this.taggleIndex = 0;
        // 清除响应绘图事件
        return;
      }
      this.taggleIndex = index;
      switch (index) {
        case 1:
          // 清除绘制状态
          // 点选操作
          break;
        case 2:
          // 清除绘制状态
          // 框选操作
          break;
        case 3:
          // 清除绘制状态
          // 多边形操作
          break;

        default:
          break;
      }
    },
    // 行政区划改变
    regionChange(data) {
      console.log(data);
    },
    // 切换选择有点啦
    changeOnInpnt1(val) {
      if (val === "") {
        this.spaceDisabled1 = false;
        this.spaceDisabled2 = false;
        this.spaceDisabled3 = false;
      } else {
        this.coordinateParams.coordX = "";
        this.coordinateParams.coordY = "";
        this.coordinateParams.mileage = "";
        this.coordinateParams.offset = "";
        this.spaceDisabled2 = true;
        this.spaceDisabled3 = true;
      }
    },
    changeOnInpnt2(val) {
      if (val === "") {
        this.spaceDisabled1 = false;
        this.spaceDisabled2 = false;
        this.spaceDisabled3 = false;
      } else {
        this.coordinateParams.lon = "";
        this.coordinateParams.lat = "";
        this.coordinateParams.mileage = "";
        this.coordinateParams.offset = "";
        this.spaceDisabled1 = true;
        this.spaceDisabled3 = true;
      }
    },
    changeOnInpnt3(val) {
      if (val === "") {
        this.spaceDisabled1 = false;
        this.spaceDisabled2 = false;
        this.spaceDisabled3 = false;
      } else {
        this.spaceDisabled1 = true;
        this.spaceDisabled2 = true;
        this.coordinateParams.lon = "";
        this.coordinateParams.lat = "";
        this.coordinateParams.coordX = "";
        this.coordinateParams.coordY = "";
      }
    },
  },
  watch: {
    radio(val) {
      this.$emit("sendResetInfoEvent", 1);
    },
  },
};
</script>
<style>
.commonSearchBox .vaguebox .el-input {
  width: 215px; /**sisi */
}
.layerSelectBox > div:nth-child(1) .el-input {
  width: 170px; /**sisi */
}
.layerSelectBox > div:nth-child(2) .el-select {
  width: 105px; /**sisi */
}
.layerSelectBox > div:nth-child(2) .fieldValueinput {
  width: 101px; /**sisi */
}
.spaceSearchTool_box_3 .el-input .el-input__inner {
  height: 30px;
}
</style>
<style scoped>
.commonSearchBox {
  width: 100%;
  height: 100%;
  display: flex;
}
.commonSearchBox_left {
  flex: 2;
  border-right: 1px dashed rgb(195, 198, 202);
}
.commonSearchBox_right {
  flex: 5;
}
.commonSearchBox_left > div {
  margin: 50px 0px 50px 30px;
}
.vaguebox {
  margin-top: 30px;
  margin-left: 15px; /**sisi */
}
.commonSearchBtn {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 300px;
  text-align: right;
}
.commonSearchBtn > div {
  display: inline-block;
  height: 40px;
  width: 100px;
  text-align: center;
  line-height: 40px;
  color: white;
  font-weight: 700;
  background-color: rgb(0, 140, 255);
  border-radius: 5px;
  cursor: pointer;
}
.commonSearchBtn > div:nth-child(1) {
  margin-right: 15px;
}

/* 模糊查询 */
.layerSelectBox > div {
  margin-left: 20px;
  margin-top: 20px;
}
.layerSelectBox > div:nth-child(1) .el-input {
  width: 300px;
}

/* 空间检索 */
.spaceSearchBox {
  margin: 20px 0 0 20px;
}
.spaceSearchBox > div:nth-child(1) .el-select {
  margin-left: 20px;
  width: 236px; /**sisi */
}
.spaceSearchBox .spaceSearchTool_box {
  margin-top: 20px;
}
.spaceSearchTool_box_1 {
  width: 300px;
  height: 80px;
  margin-left: 10px; /**sisi */
  display: flex;
}
.spaceSearchTool_box_1 > div {
  flex: 1;
}
.spaceSearchTool_box_1 > div span {
  display: inline-block;
  cursor: pointer;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: rgba(202, 203, 204, 0.5);
}
.activeToolSpan {
  color: white;
  background-color: rgb(0, 140, 255) !important;
}
/* 视线检索 */

.spaceSearchTool_box_2 {
  /* width: 320px;
  height: 80px; */
  /* margin-left: 80px; */
}

.v-region {
  /* width: 96px; */
}

/* 空间位置 */
.spaceSearchTool_box_3 {
  margin-left: 0px; /**sisi */
}
.spaceSearchTool_box_3 > div {
  margin-top: 10px;
  padding-bottom: 5px;
  border-bottom: 1px dashed rgb(195, 198, 202);
}
.spaceSearchTool_box_3 .el-input {
  width: 120px;
  margin-right: 10px;
  margin-left: 3px;
}
.spaceSearchTool_box_3 .el-radio {
  margin-right: 15px;
}
.spaceSearchTool_box_3 > div:nth-child(4) {
  /* margin-left: 39px; */
  border: none !important;
}
</style>
