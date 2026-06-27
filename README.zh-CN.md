<div align="center">
  <h1>@rc-component/dropdown</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Ant Design 生态的一部分。</sub></p>
  <p>🔽 ⬇️ React 下拉菜单基础组件，基于 trigger 和 menu 能力构建。</p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>


<div align="center">

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url] [![build status][github-actions-image]][github-actions-url] [![Codecov][codecov-image]][codecov-url] [![bundle size][bundlephobia-image]][bundlephobia-url] [![dumi][dumi-image]][dumi-url]

</div>

[npm-image]: https://img.shields.io/npm/v/@rc-component/dropdown.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@rc-component/dropdown
[github-actions-image]: https://github.com/react-component/dropdown/actions/workflows/ci.yml/badge.svg
[github-actions-url]: https://github.com/react-component/dropdown/actions/workflows/ci.yml
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/dropdown/master.svg?style=flat-square
[codecov-url]: https://app.codecov.io/gh/react-component/dropdown
[download-image]: https://img.shields.io/npm/dm/@rc-component/dropdown.svg?style=flat-square
[download-url]: https://npmjs.org/package/@rc-component/dropdown
[bundlephobia-image]: https://img.shields.io/bundlephobia/minzip/%40rc-component%2Fdropdown?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/package/@rc-component/dropdown
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square
[dumi-url]: https://github.com/umijs/dumi

## 特性

- Built on `@rc-component/trigger`.
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
| 动画片 | 弹层动画名称 | string | - |
| defaultVisible | 初始可见状态 | boolean | - |
| getPopupContainer | 呈现下拉列表的容器 | `(node: HTMLElement) => HTMLElement` | `() => document.body` |
| minOverlayWidthMatchTrigger | 覆盖宽度是否至少应为触发宽度 | boolean | `true` 除非设置了 `alignPoint` |
| openClassName | 打开下拉菜单时添加到触发器的className称 | string | `${prefixCls}-open` |
| overlay | Dropdown overlay | `React.ReactElement \| (() => React.ReactElement)` | - |
| overlayClassName | 附加覆盖className称 | string | - |
| overlayStyle | 叠加样式 | `React.CSSProperties` | - |
| placement | Dropdown placement | string | `bottomLeft` |
| prefixCls | 组件className前缀 | string | `rc-dropdown` |
| transitionName | 弹层过渡className称 | string | - |
| 扳机 | 触发动作 | `ActionType \| ActionType[]` | `['hover']` |
| 可见的 | 受控可见状态 | boolean | - |
| onOverlayClick | 点击覆盖时的回调 | `(event: React.MouseEvent) => void` | - |
| onVisibleChange | 可见性变化时的回调 | `(visible: boolean) => void` | - |

## 本地开发

```bash
npm install
npm start
```

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
