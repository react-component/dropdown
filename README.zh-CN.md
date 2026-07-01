<div align="center">
  <h1>@rc-component/dropdown</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Ant Design 生态的一部分。</sub></p>
  <p>🔽 ⬇️ React 下拉菜单基础组件，基于 trigger 和 menu 能力构建。</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/dropdown"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/dropdown.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/dropdown"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/dropdown.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/dropdown/actions/workflows/ci.yml"><img alt="build status" src="https://github.com/react-component/dropdown/actions/workflows/ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/dropdown"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/dropdown/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/dropdown"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/dropdown?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>

## 特性

- 基于 `@rc-component/trigger` 构建。
- 支持悬停、单击、上下文菜单和自定义触发操作。
- 接受 React 元素或渲染函数作为下拉覆盖。
- 支持对齐点行为和触发宽度匹配。

## 安装

```bash
npm install @rc-component/dropdown
```

## 使用

```tsx | pure
import Dropdown from '@rc-component/dropdown';
import '@rc-component/dropdown/assets/index.css';

export default function App() {
  return (
    <Dropdown overlay={<div>Dropdown content</div>} trigger={['click']}>
      <button type="button">Open</button>
    </Dropdown>
  );
}
```

## 示例

运行本地 dumi 站点：

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

## API

额外属性会透传给底层 [`@rc-component/trigger`](https://github.com/react-component/trigger) 组件。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| alignPoint | 将弹层窗口与点击点对齐 | boolean | false |
| animation | 弹层动画名称 | string | - |
| arrow | 是否显示下拉箭头 | boolean | false |
| getPopupContainer | 呈现下拉列表的容器 | `(node: HTMLElement) => HTMLElement` | `() => document.body` |
| minOverlayWidthMatchTrigger | 覆盖宽度是否至少应为触发宽度 | boolean | `true` 除非设置了 `alignPoint` |
| openClassName | 打开下拉菜单时添加到触发器的类名 | string | `${prefixCls}-open` |
| overlay | 下拉菜单内容 | `React.ReactElement \| (() => React.ReactElement)` | - |
| overlayClassName | 附加弹层类名 | string | - |
| overlayStyle | 叠加样式 | `React.CSSProperties` | - |
| placement | 下拉菜单位置 | string | `bottomLeft` |
| prefixCls | 组件类名前缀 | string | `rc-dropdown` |
| transitionName | 弹层过渡类名 | string | - |
| trigger | 触发动作 | `ActionType \| ActionType[]` | `['hover']` |
| visible | 受控可见状态 | boolean | - |
| onOverlayClick | 点击下拉菜单内容时的回调 | `(event: Event) => void` | - |
| onVisibleChange | 可见性变化时的回调 | `(visible: boolean) => void` | - |

## 本地开发

```bash
npm install
npm start
```

dumi 站点默认运行在 `http://localhost:8000`。

```bash
npm test
npm run tsc
npm run lint
npm run compile
npm run build
```

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/dropdown 基于 [MIT](./LICENSE) 许可证发布。
