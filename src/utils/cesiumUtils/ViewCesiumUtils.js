/*
 * @Descripttion: cesium中viewer的类
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-19 11:05:19
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-23 14:54:33
 */
export default class ViewCesiumUtils {
    constructor() {
    }
    /**
     * @descripttion:初始化cesium
     * @param {void}
     * @return {void}
     */
    static initCesium(showWedgit) {
        let viewerOption = {
            geocoder: showWedgit, // 地理位置查询定位控件
            homeButton: showWedgit, // 默认相机位置控件
            timeline: showWedgit, // 时间滚动条控件
            navigationHelpButton: showWedgit, // 默认的相机控制提示控件
            sceneModePicker: showWedgit, // 切换2D、3D和Columbus View（CV）模式
            fullscreenButton: showWedgit, // 全屏控件
            creditsDisplay: showWedgit, //展示商标版权和数据源
            // scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存.与sceneModePiker不能共存
            baseLayerPicker: showWedgit, // 底图切换控件
            animation: showWedgit, // 控制场景动画的播放速度控件
        };
        return viewerOption;
    }
}