# Three.js 学习项目

## 项目结构

```
threeJsLearning/
├── public/                 # 静态资源
│   └── index.html         # HTML 入口文件
├── src/                   # 源代码
│   ├── scenes/           # 场景类
│   │   └── BasicScene.js # 基础场景
│   ├── components/       # 可复用组件
│   │   └── Cube.js       # 立方体组件
│   ├── utils/            # 工具类
│   │   ├── Constants.js  # 常量配置
│   │   └── Logger.js     # 日志工具
│   ├── App.js            # 主应用类
│   └── main.js           # 入口文件
├── src/assets/           # 资源文件（纹理、模型等）
├── package.json          # 项目配置
└── README.md            # 项目说明
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 目录说明

- `src/scenes/` - 存放不同的场景实现，每个场景是一个独立的类
- `src/components/` - 存放可复用的 3D 组件（如 Cube、Sphere 等）
- `src/utils/` - 存放工具类和常量配置
- `src/assets/` - 存放纹理、3D 模型、音频等资源文件
- `public/` - 存放静态 HTML 文件和其他无需构建的资源

## 开发规范

- 使用 ES6+ 语法
- 每个类都有清晰的注释说明
- 资源使用后及时清理，避免内存泄漏
- 遵循单一职责原则
