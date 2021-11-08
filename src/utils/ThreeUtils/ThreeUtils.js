/*
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-25 16:05:08
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-27 16:35:17
 */
import Axis from "cesium/Source/Scene/Axis";
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default class ThreeUtils {
    constructor() { }
    static initScene(container) {
        // 配置camera ,透视摄像机
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight,0.1, 10000000000);
        camera.position.set(40000, 4000, 4000);
        // 配置scene和光照
        const scene = new THREE.Scene();
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6) // 无方向的环境光
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        camera.add(dirLight);
        scene.add(camera);


        //辅助调试
        const axisHelper = new THREE.AxesHelper(250);
        scene.add(axisHelper);

        // render配置
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x263238);
        renderer.localClippingEnabled = true;
        container.appendChild(renderer.domElement);
        renderer.render(scene, camera);

        // 控制器添加
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 1.5;

        return {
            scene,
            camera,
            renderer,
            controls
        }
    }
    static getSphereCenter(tile) {
        if(!tile) {
            return false
        }else {
            return tile.cached.sphere.center
        }
    } 
}