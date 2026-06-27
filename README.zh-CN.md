<div align="center">
  <h1>@rc-component/dropdown</h1>
  <p><sub>Ant Design 生态的一部分。</sub></p>
  <img alt="Ant Design" height="32" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
  <p>⬇️ React 下拉菜单基础组件，基于 trigger 和 menu 能力构建。</p>
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
- 支持 hover, click, context menu, and custom trigger actions.
- Accepts a React element or render function as dropdown overlay.
- 支持 align point behavior and trigger-width matching.

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

Additional props are passed to the underlying [`@rc-component/trigger`](https://github.com/react-component/trigger) component.

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| alignPoint | Align popup to the click point | boolean | false |
| animation | Popup animation name | string | - |
| defaultVisible | Initial visible state | boolean | - |
| getPopupContainer | Container where dropdown is rendered | `(node: HTMLElement) => HTMLElement` | `() => document.body` |
| minOverlayWidthMatchTrigger | Whether overlay width should be at least trigger width | boolean | `true` unless `alignPoint` is set |
| openClassName | Class name added to trigger when dropdown is open | string | `${prefixCls}-open` |
| overlay | Dropdown overlay | `React.ReactElement \| (() => React.ReactElement)` | - |
| overlayClassName | Additional overlay class name | string | - |
| overlayStyle | Overlay style | `React.CSSProperties` | - |
| placement | Dropdown placement | string | `bottomLeft` |
| prefixCls | Component class name prefix | string | `rc-dropdown` |
| transitionName | Popup transition class name | string | - |
| trigger | Trigger action | `ActionType \| ActionType[]` | `['hover']` |
| visible | Controlled visible state | boolean | - |
| onOverlayClick | Callback when overlay is clicked | `(event: React.MouseEvent) => void` | - |
| onVisibleChange | Callback when visibility changes | `(visible: boolean) => void` | - |

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

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## 许可证

@rc-component/dropdown is released under the [MIT](./LICENSE) license.
