import * as THREE from 'three';
import { Fruit } from '../components/Fruit.js';

/**
 * 水果合成游戏场景
 */
export class FruitMergeScene {
    constructor(scene) {
        this.scene = scene;
        this.fruits = [];
        this.currentFruit = null;
        this.nextFruitType = 0;
        this.gameContainer = null;
        this.ground = null;
        this.containerWidth = 10;
        this.containerHeight = 15;
    }

    /**
     * 初始化场景
     */
    init() {
        this.createLighting();
        this.createContainer();
        this.createGround();
        this.createNewFruit();
    }

    /**
     * 创建灯光
     */
    createLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        this.scene.add(directionalLight);
    }

    /**
     * 创建游戏容器边界
     */
    createContainer() {
        const wallMaterial = new THREE.MeshBasicMaterial({
            color: 0x4CAF50,
            transparent: true,
            opacity: 0.3
        });

        const wallThickness = 0.2;

        // 左墙
        const leftWall = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, this.containerHeight, 1),
            wallMaterial
        );
        leftWall.position.set(-this.containerWidth / 2 - wallThickness / 2, this.containerHeight / 2, 0);
        this.scene.add(leftWall);

        // 右墙
        const rightWall = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, this.containerHeight, 1),
            wallMaterial
        );
        rightWall.position.set(this.containerWidth / 2 + wallThickness / 2, this.containerHeight / 2, 0);
        this.scene.add(rightWall);

        // 地面提示线
        const groundLine = new THREE.Mesh(
            new THREE.BoxGeometry(this.containerWidth, 0.1, 1),
            new THREE.MeshBasicMaterial({ color: 0x666666 })
        );
        groundLine.position.set(0, 0, 0);
        this.scene.add(groundLine);
    }

    /**
     * 创建地面（不可见，用于物理碰撞）
     */
    createGround() {
        this.ground = new THREE.Mesh(
            new THREE.BoxGeometry(this.containerWidth, 0.1, 1),
            new THREE.MeshBasicMaterial({ visible: false })
        );
        this.ground.position.set(0, 0, 0);
        this.scene.add(this.ground);
    }

    /**
     * 创建新水果（在顶部等待）
     */
    createNewFruit() {
        const fruit = new Fruit({
            type: this.nextFruitType,
            x: 0,
            y: this.containerHeight - 1,
            isPreview: true
        });
        this.currentFruit = fruit;
        this.scene.add(fruit.mesh);

        // 随机下一个水果类型（0-3）
        this.nextFruitType = Math.floor(Math.random() * 4);
        this.updateInfo();
    }

    /**
     * 掉落当前水果
     */
    dropFruit() {
        if (!this.currentFruit) return;

        this.currentFruit.setVelocity(0, -0.1);
        this.currentFruit.isPreview = false;
        this.fruits.push(this.currentFruit);
        this.currentFruit = null;

        // 创建新水果
        setTimeout(() => {
            this.createNewFruit();
        }, 500);
    }

    /**
     * 移动顶部水果
     */
    moveFruit(direction) {
        if (!this.currentFruit) return;

        const speed = 0.2;
        const newX = this.currentFruit.mesh.position.x + direction * speed;

        // 限制在容器范围内
        const minX = -this.containerWidth / 2 + 0.5;
        const maxX = this.containerWidth / 2 - 0.5;

        if (newX >= minX && newX <= maxX) {
            this.currentFruit.mesh.position.x = newX;
        }
    }

    /**
     * 更新动画
     */
    update() {
        // 更新所有掉落的水果
        this.fruits.forEach(fruit => {
            if (!fruit.isPreview) {
                this.updateFruitPhysics(fruit);
            }
        });

        // 检查水果碰撞和合成
        this.checkCollisions();
    }

    /**
     * 更新水果物理
     */
    updateFruitPhysics(fruit) {
        const gravity = 0.005;
        fruit.velocity.y -= gravity;

        const newY = fruit.mesh.position.y + fruit.velocity.y;

        // 检查与地面碰撞
        if (newY <= fruit.radius) {
            fruit.mesh.position.y = fruit.radius;
            fruit.velocity.y = 0;
            fruit.isResting = true;
        } else {
            fruit.mesh.position.y = newY;
            fruit.isResting = false;
        }

        // 检查与墙壁碰撞
        const wallX = this.containerWidth / 2 - fruit.radius;
        if (fruit.mesh.position.x > wallX) {
            fruit.mesh.position.x = wallX;
        } else if (fruit.mesh.position.x < -wallX) {
            fruit.mesh.position.x = -wallX;
        }

        // 检查与其他水果的碰撞
        this.fruits.forEach(otherFruit => {
            if (fruit !== otherFruit && otherFruit.isResting) {
                const dx = fruit.mesh.position.x - otherFruit.mesh.position.x;
                const dy = fruit.mesh.position.y - otherFruit.mesh.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = fruit.radius + otherFruit.radius;

                if (distance < minDistance) {
                    // 简单的碰撞响应
                    const angle = Math.atan2(dy, dx);
                    const overlap = minDistance - distance;
                    fruit.mesh.position.x += Math.cos(angle) * overlap;
                    fruit.mesh.position.y += Math.sin(angle) * overlap;
                    fruit.velocity.y = 0;
                    fruit.isResting = true;
                }
            }
        });
    }

    /**
     * 检查水果碰撞和合成
     */
    checkCollisions() {
        for (let i = 0; i < this.fruits.length; i++) {
            for (let j = i + 1; j < this.fruits.length; j++) {
                const fruit1 = this.fruits[i];
                const fruit2 = this.fruits[j];

                if (fruit1.isResting && fruit2.isResting &&
                    fruit1.type === fruit2.type && fruit1.type < 10) {
                    const distance = fruit1.mesh.position.distanceTo(fruit2.mesh.position);

                    if (distance < fruit1.radius + fruit2.radius - 0.1) {
                        this.mergeFruits(fruit1, fruit2, i, j);
                        return; // 一次只处理一个合成
                    }
                }
            }
        }
    }

    /**
     * 合并两个水果
     */
    mergeFruits(fruit1, fruit2, index1, index2) {
        // 计算新位置（中点）
        const newX = (fruit1.mesh.position.x + fruit2.mesh.position.x) / 2;
        const newY = (fruit1.mesh.position.y + fruit2.mesh.position.y) / 2;

        // 创建更高级的水果
        const newType = fruit1.type + 1;
        const newFruit = new Fruit({
            type: newType,
            x: newX,
            y: newY,
            isPreview: false
        });
        newFruit.isResting = true;

        // 移除旧水果
        this.scene.remove(fruit1.mesh);
        this.scene.remove(fruit2.mesh);
        fruit1.dispose();
        fruit2.dispose();

        // 添加新水果
        this.scene.add(newFruit.mesh);

        // 更新水果列表
        const higherIndex = Math.max(index1, index2);
        const lowerIndex = Math.min(index1, index2);
        this.fruits.splice(higherIndex, 1);
        this.fruits.splice(lowerIndex, 1, newFruit);
    }

    /**
     * 更新信息显示
     */
    updateInfo() {
        const fruitNames = ['葡萄', '樱桃', '橘子', '柠檬', '猕猴桃', '西红柿', '桃子', '菠萝', '椰子', '西瓜'];
        const infoEl = document.getElementById('info');
        if (infoEl) {
            infoEl.innerHTML = `水果合成游戏 - 下一个: ${fruitNames[this.nextFruitType] || '未知'}`;
        }
    }

    /**
     * 清理资源
     */
    dispose() {
        this.fruits.forEach(fruit => fruit.dispose());
        if (this.currentFruit) {
            this.currentFruit.dispose();
        }
    }
}
