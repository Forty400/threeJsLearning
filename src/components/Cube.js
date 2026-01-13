import * as THREE from 'three';

/**
 * 立方体组件
 */
export class Cube {
    constructor(options = {}) {
        this.size = options.size || 1;
        this.color = options.color || 0xffffff;
        this.wireframe = options.wireframe || false;
        this.mesh = null;
    }

    /**
     * 创建立方体
     */
    create() {
        const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        const material = new THREE.MeshBasicMaterial({
            color: this.color,
            wireframe: this.wireframe
        });
        this.mesh = new THREE.Mesh(geometry, material);
        return this.mesh;
    }

    /**
     * 获取网格
     */
    getMesh() {
        if (!this.mesh) {
            this.create();
        }
        return this.mesh;
    }

    /**
     * 设置位置
     */
    setPosition(x, y, z) {
        if (this.mesh) {
            this.mesh.position.set(x, y, z);
        }
    }

    /**
     * 设置旋转速度
     */
    setRotationSpeed(x, y, z) {
        this.rotationSpeed = { x, y, z };
    }

    /**
     * 更新旋转
     */
    updateRotation() {
        if (this.mesh && this.rotationSpeed) {
            this.mesh.rotation.x += this.rotationSpeed.x;
            this.mesh.rotation.y += this.rotationSpeed.y;
            this.mesh.rotation.z += this.rotationSpeed.z;
        }
    }

    /**
     * 清理资源
     */
    dispose() {
        if (this.mesh) {
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
        }
    }
}
