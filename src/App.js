import * as THREE from 'three';
import { FruitMergeScene } from './scenes/FruitMergeScene.js';
import { InputHandler } from './InputHandler.js';
import { Constants } from './utils/Constants.js';

/**
 * 主应用类 - 管理 Three.js 应用的生命周期
 */
export class App {
    constructor() {
        this.container = document.body;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.currentScene = null;
        this.inputHandler = null;
    }

    /**
     * 启动应用
     */
    start() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initInput();
        this.addEventListeners();
        this.animate();
    }

    /**
     * 初始化渲染器
     */
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: Constants.RENDERER.ANTIALIAS,
            alpha: Constants.RENDERER.ALPHA
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, Constants.RENDERER.PIXEL_RATIO_LIMIT));
        this.renderer.setClearColor(Constants.RENDERER.CLEAR_COLOR);
        this.container.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化相机
     */
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            Constants.CAMERA.FOV,
            window.innerWidth / window.innerHeight,
            Constants.CAMERA.NEAR,
            Constants.CAMERA.FAR
        );
        this.camera.position.set(
            Constants.CAMERA.DEFAULT_POSITION.x,
            Constants.CAMERA.DEFAULT_POSITION.y,
            Constants.CAMERA.DEFAULT_POSITION.z
        );
    }

    /**
     * 初始化场景
     */
    initScene() {
        this.scene = new THREE.Scene();
        this.currentScene = new FruitMergeScene(this.scene);
        this.currentScene.init();
    }

    /**
     * 初始化输入
     */
    initInput() {
        this.inputHandler = new InputHandler(this.currentScene);
        this.inputHandler.init();
    }

    /**
     * 添加事件监听
     */
    addEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    /**
     * 窗口大小改变处理
     */
    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * 动画循环
     */
    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // 更新输入
        if (this.inputHandler) {
            this.inputHandler.update(this.currentScene);
        }

        // 更新场景
        if (this.currentScene) {
            this.currentScene.update();
        }

        this.renderer.render(this.scene, this.camera);
    }

    /**
     * 清理资源
     */
    dispose() {
        if (this.currentScene) {
            this.currentScene.dispose();
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}
