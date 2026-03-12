# 🍅 Vibe Pomodoro Clock

> 一个美观优雅的番茄工作法计时器，助你专注工作、提升效率。

[![License](https://img.shields.io/github/license/vibe-pomodoro-clock)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/vibe-pomodoro-clock)](https://github.com/vibe-pomodoro-clock/stargazers)

## ✨ 特性

- 🍅 **标准番茄计时** - 25 分钟工作 + 5 分钟休息
- ⏱️ **圆形进度条** - 可视化剩余时间
- 🔔 **智能提醒** - 浏览器通知 + 提示音
- 💾 **数据持久化** - 今日番茄数自动保存
- 🎨 **苹果风格设计** - 毛玻璃效果、桃红色调、简约高级

## 🛠️ 技术栈

- **React 19** - UI 框架
- **Vite 7** - 构建工具
- **Tailwind CSS** - 样式方案
- **ESLint** - 代码规范

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

## 📁 项目结构

```
src/
├── components/
│   ├── CircularProgress.jsx  # 圆形进度条
│   ├── Controls.jsx          # 控制按钮
│   ├── StatusBadge.jsx       # 状态标签
│   └── TomatoCounter.jsx     # 番茄计数
├── App.jsx                   # 主应用
├── index.css                 # 全局样式
└── main.jsx                  # 入口文件
```

## 🎯 使用方法

1. 点击 **开始** 按钮启动计时
2. 首次使用会请求通知权限，请允许
3. 25 分钟工作结束后会自动切换到 5 分钟休息
4. 休息结束后自动回到工作模式
5. 每日番茄数会自动保存，第二天自动重置

## 🔮 未来规划

- [ ] 自定义工作/休息时长
- [ ] 长休息机制（4 个番茄后）
- [ ] 主题切换（浅色/深色）
- [ ] 番茄历史记录统计
- [ ] 任务管理功能
- [ ] PWA 支持

## 📄 许可证

MIT License - see [LICENSE](LICENSE) for details.

---

Made with ❤️ for better focus and productivity.
