<div align="center">
  <h1>@rc-component/dropdown</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Part of the Ant Design ecosystem.</sub></p>
  <p>🔽 A trigger-driven dropdown component for React.</p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>

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
