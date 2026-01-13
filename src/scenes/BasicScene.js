import * as THREE from 'three';

/**
 * 基础场景类 - 包含旋转立方体示例
 */
export class BasicScene {
    constructor(scene) {
        this.scene = scene;
        this.cube = null;
        this.innerCube = null;
        this.axesHelper = null;
    }

    /**
     * 初始化场景
     */
    init() {
        this.createCube();
        this.createInnerCube();
        this.createAxesHelper();
    }

    /**
     * 创建外层线框立方体
     */
    createCube() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    /**
     * 创建内层实体立方体
     */
    createInnerCube() {
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: false
        });
        this.innerCube = new THREE.Mesh(geometry, material);
        this.scene.add(this.innerCube);
    }

    /**
     * 创建坐标轴辅助线
     */
    createAxesHelper() {
        this.axesHelper = new THREE.AxesHelper(5);
        this.scene.add(this.axesHelper);
    }

    /**
     * 更新动画
     */
    update() {
        if (this.cube) {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
        }

        if (this.innerCube) {
            this.innerCube.rotation.x -= 0.015;
            this.innerCube.rotation.y -= 0.015;
        }
    }

    /**
     * 清理资源
     */
    dispose() {
        if (this.cube) {
            this.cube.geometry.dispose();
            this.cube.material.dispose();
        }
        if (this.innerCube) {
            this.innerCube.geometry.dispose();
            this.innerCube.material.dispose();
        }
    }
}
