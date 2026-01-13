import * as THREE from 'three';

/**
 * 水果配置
 */
const FRUIT_CONFIG = [
    { radius: 0.3, color: 0x9b59b6 }, // 葡萄 - 紫色
    { radius: 0.4, color: 0xe74c3c }, // 樱桃 - 红色
    { radius: 0.5, color: 0xf39c12 }, // 橘子 - 橙色
    { radius: 0.6, color: 0xf1c40f }, // 柠檬 - 黄色
    { radius: 0.7, color: 0x8b4513 }, // 猕猴桃 - 棕色
    { radius: 0.8, color: 0xff6347 }, // 西红柿 - 番茄红
    { radius: 0.9, color: 0xffb6c1 }, // 桃子 - 粉色
    { radius: 1.0, color: 0xffd700 }, // 菠萝 - 金色
    { radius: 1.1, color: 0x8b4513 }, // 椰子 - 深棕色
    { radius: 1.2, color: 0x228b22 }  // 西瓜 - 绿色
];

/**
 * 水果类
 */
export class Fruit {
    constructor(options = {}) {
        this.type = options.type || 0;
        this.radius = FRUIT_CONFIG[this.type].radius;
        this.color = FRUIT_CONFIG[this.type].color;

        this.mesh = null;
        this.velocity = { x: 0, y: 0 };
        this.isPreview = options.isPreview || false;
        this.isResting = false;

        this.createMesh();

        if (options.x !== undefined) {
            this.mesh.position.x = options.x;
        }
        if (options.y !== undefined) {
            this.mesh.position.y = options.y;
        }
    }

    /**
     * 创建水果网格
     */
    createMesh() {
        const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: this.color,
            shininess: 30,
            specular: 0x444444
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.userData = { fruit: this };

        // 添加线框以便更好地观察
        const wireframe = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry),
            new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 })
        );
        this.mesh.add(wireframe);
    }

    /**
     * 设置速度
     */
    setVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
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
