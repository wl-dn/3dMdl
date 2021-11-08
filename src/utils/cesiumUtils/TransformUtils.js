/*
 * @Descripttion: Cesium转换类
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-23 19:57:19
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-27 13:55:27
 */
import * as Cesium from "cesium"
export default class TransformUtils {
    constructor(modelMatrix, boundingSphereCenter) {
        this.boundingSphereCenter = boundingSphereCenter;  // 模型中心范围
        this.modelMatrix = modelMatrix; //模型的变换矩阵
    };
    /**
     * @descripttion: 平移矩阵
     * @param {*}lon：目标经度
     * @param {*}lat:目标纬度
     * @param {*}height：目标高度
     * @return {*} matrix4 平移变换仿射矩阵
     */
    translationMdl(lon, lat, height) {

        let translationMatrix = new Cesium.Matrix4()
        // 获取中心的弧度坐标
        const cartographicCenter = Cesium.Cartographic.fromCartesian(
            this.boundingSphereCenter
        )
      
        //构建模型世界中心坐标(从弧度坐标)
        const surface = Cesium.Cartesian3.fromRadians(
            cartographicCenter.longitude,
            cartographicCenter.latitude,
            cartographicCenter.height //应该是0
        )
        // 构建平移后的坐标
        const offset = Cesium.Cartesian3.fromDegrees(
            lon,
            lat,
            height
        )
        // 构建平移变换矩阵
        const translation = Cesium.Cartesian3.subtract(
            offset,
            surface,
            new Cesium.Cartesian3()
        );
        translationMatrix = Cesium.Matrix4.fromTranslation(translation, new Cesium.Matrix4());
        return translationMatrix
    }

    /**
     * @descripttion: 旋转矩阵
     * @param {*}rotateX:绕x轴旋转，类型：度
     * @param {*}rotateY:绕Y轴旋转，类型：度
     * @param {*}rotateZ:绕Z轴旋转，类型：度
     * @return {*}
     */
    rotationMdl(rotateX, rotateY, rotateZ) {
        let rotationMatrix = new Cesium.Matrix4();
        const rotateXMatrix = Cesium.Matrix3.fromRotationX(
            Cesium.Math.toRadians(rotateX)
        );
        const rotateYMatrix = Cesium.Matrix3.fromRotationY(
            Cesium.Math.toRadians(rotateY)
        );
        const rotateZMatrix = Cesium.Matrix3.fromRotationZ(
            Cesium.Math.toRadians(rotateZ)
        );
        const rotateMatrix3 = new Cesium.Matrix3();
        Cesium.Matrix3.multiply(rotateXMatrix, rotateYMatrix, rotateMatrix3);
        Cesium.Matrix3.multiply(rotateMatrix3, rotateZMatrix, rotateMatrix3);
        rotationMatrix = this._getRotateMatrix4(rotateMatrix3);
        return rotationMatrix
    }

    /**
     * @descripttion: 缩放矩阵
     * @param {*}scaleX:目标X缩放
     * @param {*}scaleY：目标Y缩放
     * @param {*}scaleZ:目标Z缩放
     * @return {*}
     */
    scaleMdl(scaleX, scaleY, scaleZ) {
        let scaleMatrix = new Cesium.Matrix4();
        // 构造本地矩阵
        const cartesianScale = new Cesium.Cartesian3(scaleX, scaleY, scaleZ);
        const localScaleM = Cesium.Matrix4.fromScale(
            cartesianScale,
            new Cesium.Matrix4()
        );
        // 构造世界坐标中心矩阵
        const backto_Matrix =
            Cesium.Matrix4.fromTranslation(this.boundingSphereCenter);
        // 构建返回的变换举证
        const moveto_vec = Cesium.Cartesian3.multiplyByScalar(
            this.boundingSphereCenter,
            -1,
            new Cesium.Cartesian3()
        );
        const moveto_Matrix = Cesium.Matrix4.fromTranslation(moveto_vec);

        // 矩阵计算，构建缩放矩阵
        const temp = Cesium.Matrix4.multiply(
            localScaleM,
            moveto_Matrix,
            new Cesium.Matrix4()
        );
        scaleMatrix = Cesium.Matrix4.multiply(
            backto_Matrix,
            temp,
            new Cesium.Matrix4()
        );
        return scaleMatrix;
    }

    /**
     * @descripttion: 构建旋转矩阵
     * @param {*} rotateM3：Cesium.Matrix3
     * @return {*}rotationMatrix
     */
    _getRotateMatrix4(rotateM3) {
        // 根据仿射变换矩阵获取左上角的3×3的旋转矩阵
        const tilesetMatRotation = Cesium.Matrix4.getMatrix3(
            this.modelMatrix,
            new Cesium.Matrix3()
        );

        // 计算逆矩阵
        const inverseTilesetMatRotation = Cesium.Matrix3.inverse(
            tilesetMatRotation,
            new Cesium.Matrix3()
        );
        // 获取矩阵的平移部分
        const tilesetMatTranslation = Cesium.Matrix4.getTranslation(
            this.modelMatrix,
            new Cesium.Cartesian3()
        );
        // 创建以tileset的中心为原点的坐标系
        // 构建原始中心到世界坐标中心的变换矩阵
        const originMat =
            Cesium.Transforms.eastNorthUpToFixedFrame(this.boundingSphereCenter);
        const originMatRotation = Cesium.Matrix4.getMatrix3(
            originMat,
            new Cesium.Matrix3()
        );
        const originMatTranslation = Cesium.Matrix4.getTranslation(
            originMat,
            new Cesium.Cartesian3()
        );

        // 从平移矩阵返回一个matrix4的矩阵
        const tilesetToOriginTranslation = Cesium.Matrix4.fromTranslation(
            // 为什么要subtract？
            // tileset减origin得到的矩阵能将模型负向移动origin的偏移量
            Cesium.Cartesian3.subtract(
                tilesetMatTranslation,
                originMatTranslation,
                new Cesium.Cartesian3()
            ),
            new Cesium.Matrix4()
        );
        // 从左上角代表的martix3旋转矩阵获取代表martix4的旋转矩阵
        const tilesetToOriginRotation = Cesium.Matrix4.fromRotationTranslation(
            Cesium.Matrix3.inverse(
                Cesium.Matrix3.multiply(
                    inverseTilesetMatRotation,
                    originMatRotation,
                    new Cesium.Matrix3()
                ),
                new Cesium.Matrix4()
            )
        );

        const rotateM4 = Cesium.Matrix4.fromRotationTranslation(rotateM3);

        // 转过去
        Cesium.Matrix4.multiply(originMat, rotateM4, originMat);
        // 调整角度
        Cesium.Matrix4.multiply(originMat, tilesetToOriginRotation, originMat);
        // 转回来
        Cesium.Matrix4.multiply(originMat, tilesetToOriginTranslation, originMat);

        return originMat;
    }

}