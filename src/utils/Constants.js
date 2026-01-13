/**
 * 项目常量配置
 */
export const Constants = {
    // 渲染器配置
    RENDERER: {
        PIXEL_RATIO_LIMIT: 2,
        CLEAR_COLOR: 0x000000,
        ANTIALIAS: true,
        ALPHA: true
    },

    // 相机配置
    CAMERA: {
        FOV: 75,
        NEAR: 0.1,
        FAR: 1000,
        DEFAULT_POSITION: { x: 0, y: 0, z: 5 }
    },

    // 动画配置
    ANIMATION: {
        CUBE_ROTATION_SPEED: 0.01,
        INNER_CUBE_ROTATION_SPEED: 0.015
    }
};
