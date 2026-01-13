/**
 * 输入处理器
 */
export class InputHandler {
    constructor(scene) {
        this.scene = scene;
        this.keys = {
            left: false,
            right: false,
            space: false
        };
        this.lastSpaceState = false;
    }

    /**
     * 初始化输入监听
     */
    init() {
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    /**
     * 键盘按下
     */
    onKeyDown(e) {
        switch(e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                this.keys.left = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.keys.right = true;
                break;
            case 'Space':
                this.keys.space = true;
                break;
        }
    }

    /**
     * 键盘释放
     */
    onKeyUp(e) {
        switch(e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                this.keys.left = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.keys.right = false;
                break;
            case 'Space':
                this.keys.space = false;
                break;
        }
    }

    /**
     * 检查空格键是否刚刚按下
     */
    isSpaceJustPressed() {
        const pressed = this.keys.space && !this.lastSpaceState;
        this.lastSpaceState = this.keys.space;
        return pressed;
    }

    /**
     * 更新场景
     */
    update(scene) {
        if (this.keys.left) {
            scene.moveFruit(-1);
        }
        if (this.keys.right) {
            scene.moveFruit(1);
        }
        if (this.isSpaceJustPressed()) {
            scene.dropFruit();
        }
    }
}
