/*
 * @Descripttion: 所有cesium的工具类：包含各种cesium函数以及二次封装
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-19 11:04:04
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-24 16:44:23
 */
import ViewCesiumUtils from "./ViewCesiumUtils";
import DrawUtils from './DrawUtils'
import TransformUtils from "./TransformUtils";
export default class CesiumUtils {
    constructor() {
    }
    static viewCesiumUtils() {
        return new ViewCesiumUtils();
    }
    static drawUtils(viewer) {
        return new DrawUtils(viewer)
    }
    static initMap = ViewCesiumUtils.initCesium;
    static transformUtils(modelMatrix, boundingSphereCenter) {
        return new TransformUtils(modelMatrix, boundingSphereCenter);
    }
}