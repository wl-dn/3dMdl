/*
 * @Descripttion: 绘制类
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-23 14:46:59
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-24 21:28:38
 */
import * as Cesium from "cesium"
import * as  turf from "@turf/turf"
export default class DrawUtils {
    constructor(viewer) {
        this._viewer = viewer;
        this._excavateMinHeight = 9999 //最低挖掘海拔值
    }
    /**
     * @descripttion: 绘制点的entity
     * @param {*} position
     * @param {*} config
     * @return {*} pointGeometry
     */
    drawPointEntity(position, config) {
        config = config || {};
        let pointGeometry = this._viewer.entities.add({
            name: "点几何对象",
            position: Cesium.Cartesian3.fromDegrees(position[0], position[1], 0),
            // position: position,
            point: {
                color: Cesium.Color.SKYBLUE,
                pixelSize: 10,
                outlineColor: Cesium.Color.YELLOW,
                outlineWidth: 3,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
        })
        console.log(pointGeometry);
        return pointGeometry
    }
    /**
     * @descripttion: 绘制线entity
     * @param {*} positionLine
     * @param {*} config
     * @return {*}
     */
    drawPolyLineEntity(positionLine, config) {
        if (positionLine.length < 1) return;
        config = config || {};
        let polylineGeometry = this._viewer.entities.add({
            name: "线几何对象",
            polyline: {
                positions: positionLine,
                width: config.width ? config.width : 5.0,
                material: new Cesium.PolylineGlowMaterialProperty({
                    color: config.color ? new Cesium.Color.fromCssColorString(config.color) : Cesium.Color.GOLD,
                }),
                depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
                    color: config.color ? new Cesium.Color.fromCssColorString(config.color) : Cesium.Color.GOLD,
                }),
            }
        });
        return polylineGeometry;
    }
    /**
     * @descripttion: 绘制面entity
     * @param {*} positionPloygon
     * @param {*} config
     * @return {*}
     */
    drawPolygonEntity(positionPolygon, config) {
        if (positionPolygon.length < 2) return;
        config = config || {};
        var polygonGeometry = this._viewer.entities.add({
            id: "1-1",
            name: "面几何对象",
            polygon: {
                height: 0.1,
                hierarchy: new Cesium.PolygonHierarchy(positionPolygon),
                material: config.color ? new Cesium.Color.fromCssColorString(config.color).withAlpha(.2) : new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2),
                // perPositionHeight: true,
                outline: true,
                // 想设置outline，必须要有高度
                outlineWidth: 1
            }
        });
        return polygonGeometry;
    }
    /**
     * @descripttion: 获取根据id绘制多边形的数据
     * @param {*} pointsList
     * @return {*}
     */
    getPolygonListById(id, listData) {
        listData = listData || {};
        const entity = this._viewer.entities.getById(id);
        if (entity) {
            listData.positionData = entity.polygon.hierarchy['_value'].positions;
            listData.name = entity.name;
            return listData
        } else {
            return null;
        }
    }
    getPolygonDataByEntity(entity) {
        let listData = {};
        if (entity) {
            listData.positionData = entity.polygon.hierarchy['_value'].positions;
            listData.name = entity.name;
            return listData
        }
        else {
            return null;
        }
    }




    /**
     * @descripttion:地形挖掘，返回挖掘的实体entity
     * @param {*}  
     * points:挖掘面点数据[Cartesian3]
     * options:{
     *      bottomMaterial:底部材料图片
     *      wallMaterial：井面材质图片
     *      height: 挖掘深度
     *      lerpInterval:"没两点之间的差值个数"
     *      excavateMinHeight：最低挖掘海拔值
     *      minHeight：99999
     * 
     * }
     * @return {*}
     */
    drawTerrianDig(points, options = {}) {
        // 开启highDynamicRangeSupported
        if (points.length < 3 || options.lerpInterval < 0) return;
        // 构建裁剪面
        this._createClipTerrian(points);
        //获取最低点高度
        options.minHeight = this._getMinPointHeight(points, options.height)
        //创建井底部
        this._createBottomSurface(points, options.bottomMaterial, options.minHeight)

        //创建井壁
        this._createShaftWall(points, options.bottomMaterial, options.minHeight, options.lerpInterval)

    }
    // 构建裁剪面
    _createClipTerrian(points) {
        // 判断点的顺序是顺时针还是逆时针
        const isRight = this._judgeDirection(points);
        const tempLength = points.length;
        let clippingPlanes = [];
        for (let i = 0; i < tempLength; ++i) {
            const nextIndex = (i + 1) % tempLength

            // up指标准化后的一个Cartesian3坐标
            let up = Cesium.Cartesian3.normalize(points[i], new Cesium.Cartesian3())
            // right是一个向量，通过subtract相减两个坐标点
            let right = !isRight
                ? Cesium.Cartesian3.subtract(points[i], points[nextIndex], new Cesium.Cartesian3())
                : Cesium.Cartesian3.subtract(points[nextIndex], points[i], new Cesium.Cartesian3())
            // 向量标准化处理
            right = Cesium.Cartesian3.normalize(right, right)

            // 叉乘得到对应裁剪平面的法向量
            let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3())
            normal = Cesium.Cartesian3.normalize(normal, normal)
            clippingPlanes.push(new Cesium.ClippingPlane(normal, 0))
        }
        //创建地形裁剪
        this._viewer.scene.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
            planes: clippingPlanes,
            edgeWidth: 1,
            edgeColor: Cesium.Color.WHITE
        })
    }
    // 构建井底
    _createBottomSurface(points, bottomMaterial, minHeight) {
        const material = new Cesium.ImageMaterialProperty({
            image: bottomMaterial,
            repeat: new Cesium.Cartesian2(5, 5)
        })
        const bottomSurface = new Cesium.Entity({
            polygon: {
                hierarchy: new Cesium.PolygonHierarchy(points),
                height: minHeight,
                material
            }
        })

        this._viewer.entities.add(bottomSurface)
    }
    // 构建井壁
    _createShaftWall(points, wallMaterial, minHeight, lerpInter) {
        let lerpInterval = lerpInter,
            len = points.length,
            lerpPositions = []

        for (let i = 0; i < len; i++) {
            let nextIndex = (i + 1) % len
            let currRad = Cesium.Cartographic.fromCartesian(points[i])
            let nextRad = Cesium.Cartographic.fromCartesian(points[nextIndex])
            let position1 = [currRad.longitude, currRad.latitude]
            let position2 = [nextRad.longitude, nextRad.latitude]

            for (let j = 0; j < lerpInterval; j++) {
                // 经纬度设置插值
                let longitude = Cesium.Math.lerp(position1[0], position2[0], j / lerpInterval),
                    latitude = Cesium.Math.lerp(position1[1], position2[1], j / lerpInterval)
                lerpPositions.push(new Cesium.Cartographic(longitude, latitude))
            }
        }
        //增加开始点构造闭合环
        lerpPositions.push(lerpPositions[0].clone())
        this._createWellWall(lerpPositions, wallMaterial, minHeight)
    }
    // 构建墙体
    async _createWellWall(lerpPositions, wallMaterial, minHeight) {
        let wellPositions = [],
            maximumHeights = [],
            minimumHeights = []

        //根据采样地形高度更新坐标
        // 不更新的话，高度一般都是0
        console.log(lerpPositions);
        await Cesium.sampleTerrainMostDetailed(this._viewer.terrainProvider, lerpPositions)

        lerpPositions.forEach(lerpPosition => {
            const { longitude, latitude, height } = lerpPosition

            wellPositions.push(Cesium.Cartesian3.fromRadians(longitude, latitude, height))
            maximumHeights.push(height)
            minimumHeights.push(minHeight)
        })

        const material = new Cesium.ImageMaterialProperty({
            image: wallMaterial,
            repeat: new Cesium.Cartesian2(5, 5)
        })

        let wallEntity = new Cesium.Entity({
            wall: new Cesium.WallGraphics({
                positions: wellPositions,
                maximumHeights,
                minimumHeights,
                material
            })
        })
        this._viewer.entities.add(wallEntity)
    }
    /**
     * @descripttion: 判断点的顺势是顺时针还是逆时针
     * @param {*} points
     * @return {*} true or false
     */
    _judgeDirection(points) {
        let lonlat1 = Cesium.Cartographic.fromCartesian(points[0])
        let lonlat2 = Cesium.Cartographic.fromCartesian(points[1])
        let lonlat3 = Cesium.Cartographic.fromCartesian(points[2])
        let x1 = lonlat1.longitude,
            y1 = lonlat1.latitude,
            x2 = lonlat2.longitude,
            y2 = lonlat2.latitude,
            x3 = lonlat3.longitude,
            y3 = lonlat3.latitude,
            dirRes = (x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2)

        let isR = dirRes > 0
        return isR
    }
    _getMinPointHeight(points, height) {
        this._excavateMinHeight = 9999;
        points.forEach(point => {
            const Cartographic = Cesium.Cartographic.fromCartesian(point)
            if (Cartographic.height < this._excavateMinHeight) {
                this._excavateMinHeight = Cartographic.height
            }
        })

        //找出最低点的高度
        return this._excavateMinHeight - height;
        // this._targetHeight = this._excavateMinHeight - this._height
        // this.minHeight = this._targetHeight
    }

    /**
    * @descripttion: 生成点缓冲区
    * @param {*} 中心点坐标array
    * @param {*} 缓冲区半径int
    * @return {*} true or false
    */
    createPointBuffer(point, radis) {
        this.drawPointEntity(point);
        let pointF = turf.point(point);
        let buffered = turf.buffer(pointF, radis, { units: 'meters' });
        let coordinates = buffered.geometry.coordinates;
        let points = coordinates[0];
        let degreesArray = this._pointsToDegreesArray(points);
        this._addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
    }
    //添加缓冲区
    _addBufferPolyogn(positions) {
        this._viewer.entities.add({
            polygon: {
                hierarchy: new Cesium.PolygonHierarchy(positions),
                material: Cesium.Color.RED.withAlpha(0.6),
                classificationType: Cesium.ClassificationType.BOTH
            },
        });
    }
    _pointsToDegreesArray(points) {
        let degreesArray = [];
        points.map(item => {
            degreesArray.push(item[0]);
            degreesArray.push(item[1]);
        });
        return degreesArray;
    }

    /**
   * @descripttion: 生成点缓冲区
   * @param {*} 某一点的经纬度
   * @param {*} 另一点的经纬度
   * @return {*} true or false
   */
    // 计算经纬度之间的距离（m）
    caculateLL(lat1, lng1, lat2, lng2) {
        let radLat1 = (lat1 * Math.PI) / 180.0;
        let radLat2 = (lat2 * Math.PI) / 180.0;
        let a = radLat1 - radLat2;
        let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
        let s =
            2 *
            Math.asin(
                Math.sqrt(
                    Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) *
                    Math.cos(radLat2) *
                    Math.pow(Math.sin(b / 2), 2)
                )
            );
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10;
        return s;
    }


}