# 储研 Chuyan｜储能项目投资测算展示版

[English README](README.en.md) · [在线体验](https://wangweiyi-wwyz.github.io/Chuyan-demo/)

储研是一款面向储能项目初步投资分析的浏览器工具。你可以调整项目、收入、成本和融资假设，比较不同情景下的项目回报与现金流，并查看测算结果如何反映到财务报表中。

## 主要功能

- **参数测算**：录入建设与运营参数，设置收入、投资和运营成本、融资及税务假设。
- **三情景对比**：比较基准、乐观和悲观情景，通过交互图表查看差异。
- **财务明细**：查看利润表、现金流量表、资产负债表和偿债覆盖率（DSCR）等指标。
- **多端体验**：支持中英文、日间和夜间主题。桌面端采用侧栏导航，iPhone 端提供可折叠菜单和横向滚动表格。

## 如何使用

1. 打开在线展示站，从示例项目进入。
2. 调整项目参数和情景假设。
3. 在首页、情景分析和财务明细中查看更新后的结果。

在 iPhone 上，可用 Safari 打开展示站，选择「分享 → 添加到主屏幕」，之后通过储研图标启动。

## 本地运行

项目使用 HTML、CSS 和 JavaScript，无需安装前端依赖或执行构建。如果已安装 Python 3，在仓库根目录运行：

~~~sh
python -m http.server 8000 --bind 127.0.0.1
~~~

然后打开 [本地页面](http://localhost:8000/)。

## 代码入口

| 文件 | 用途 |
| --- | --- |
| `index.html`、`app.js` | 页面入口与应用交互 |
| `evaluation-core.js`、`finance-core.js`、`statements-core.js` | 投资评价、融资和报表计算 |
| `dashboard.js`、`decision-charts.js` | 工作台与分析图表 |
| `localization.js`、`locale-dictionary.js` | 中英文界面 |
| `mobile.css`、`mobile.js`、`manifest.webmanifest` | 移动端布局、导航及主屏幕入口 |
| `demo-mode.js` | 公开展示版的功能配置 |

在线展示由 GitHub Pages 从 `main` 分支根目录发布。

## 展示版范围

计算在浏览器内完成，项目数据保存在当前浏览器。Excel 参数导入及 Excel、Word 导出功能在公开展示版中暂未开放。示例和测算结果用于模型演示和初步分析。
