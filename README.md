<div align="center">
  <h1>@rc-component/dropdown</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Part of the Ant Design ecosystem.</sub></p>
  <p>🔽 A trigger-driven dropdown component for React.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/dropdown"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/dropdown.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/dropdown"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/dropdown.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/dropdown/actions/workflows/ci.yml"><img alt="build status" src="https://github.com/react-component/dropdown/actions/workflows/ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/dropdown"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/dropdown/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/dropdown"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/dropdown?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>

## Highlights

- Built on `@rc-component/trigger`.
- Supports hover, click, context menu, and custom trigger actions.
- Accepts a React element or render function as dropdown overlay.
- Supports align point behavior and trigger-width matching.

## Install

```bash
npm install @rc-component/dropdown
```

## Usage

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

## Examples

Run the local dumi site:

```bash
npm install
npm start
```

Then open `http://localhost:8000`.

## API

Additional props are passed to the underlying [`@rc-component/trigger`](https://github.com/react-component/trigger) component.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| alignPoint | Align popup to the click point | boolean | false |
| animation | Popup animation name | string | - |
| arrow | Whether to show dropdown arrow | boolean | false |
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
| onOverlayClick | Callback when overlay is clicked | `(event: Event) => void` | - |
| onVisibleChange | Callback when visibility changes | `(visible: boolean) => void` | - |

## Development

```bash
npm install
npm start
```

The dumi site runs at `http://localhost:8000` by default.

```bash
npm test
npm run tsc
npm run lint
npm run compile
npm run build
```

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/dropdown is released under the [MIT](./LICENSE) license.
