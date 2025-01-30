/* eslint-disable react/button-has-type,react/no-find-dom-node,react/no-render-return-value,object-shorthand,func-names,max-len */
import { act, fireEvent } from '@testing-library/react';
import type { MenuRef } from 'rc-menu';
import Menu, { Divider, Item as MenuItem } from 'rc-menu';
import { _rs } from 'rc-resize-observer';
import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';
import type { HTMLAttributes } from 'react';
import * as React from 'react';
import { createRef, forwardRef, useImperativeHandle } from 'react';
import Dropdown from '../src';
import { render, sleep } from './utils';

// Fix prettier rm this
console.log(!!React);

async function waitForTime() {
  for (let i = 0; i < 10; i += 1) {
    await act(async () => {
      jest.runAllTimers();
    });
  }
}

async function triggerResize(target: Element) {
  act(() => {
    _rs([{ target } as ResizeObserverEntry]);
  });

  await waitForTime();
}

spyElementPrototypes(HTMLElement, {
  offsetParent: {
    get: () => document.body,
  },
  offsetLeft: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
    },
  },
  offsetTop: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).marginTop) || 0;
    },
  },
  offsetHeight: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).height) || 0;
    },
  },
  offsetWidth: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).width) || 0;
    },
  },

  getBoundingClientRect: () => ({
    width: 100,
    height: 100,
  }),
});

describe('dropdown', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('default visible', () => {
    const { container } = render(
      <Dropdown overlay={<div className="check-for-visible">Test</div>} visible>
        <button className="my-button">open</button>
      </Dropdown>,
    );
    expect(container instanceof HTMLDivElement).toBeTruthy();
    expect(
      container
        .querySelector('.my-button')
        ?.classList.contains('rc-dropdown-open'),
    ).toBeTruthy();
  });

  it('supports controlled visible prop', () => {
    const onVisibleChange = jest.fn();
    const { container } = render(
      <Dropdown
        overlay={<div className="check-for-visible">Test</div>}
        visible
        trigger={['click']}
        onVisibleChange={onVisibleChange}
      >
        <button className="my-button">open</button>
      </Dropdown>,
    );
    expect(container instanceof HTMLDivElement).toBeTruthy();
    expect(
      container
        .querySelector('.my-button')
        ?.classList.contains('rc-dropdown-open'),
    ).toBeTruthy();

    fireEvent.click(container.querySelector('.my-button'));
    expect(onVisibleChange).toHaveBeenCalledWith(false);
  });

  it('simply works', async () => {
    let clicked;

    function onClick({ key }) {
      clicked = key;
    }

    const onOverlayClick = jest.fn();

    const menu = (
      <Menu style={{ width: 140 }} onClick={onClick}>
        <MenuItem key="1">
          <span className="my-menuitem">one</span>
        </MenuItem>
        <Divider />
        <MenuItem key="2">two</MenuItem>
      </Menu>
    );
    const { container, baseElement } = render(
      <Dropdown
        trigger={['click']}
        overlay={menu}
        onOverlayClick={onOverlayClick}
      >
        <button className="my-button">open</button>
      </Dropdown>,
    );
    expect(container.querySelector('.my-button')).toBeTruthy();
    // should not display until be triggered
    expect(baseElement.querySelector('.rc-dropdown')).toBeFalsy();

    fireEvent.click(container.querySelector('.my-button'));
    expect(clicked).toBeUndefined();
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeFalsy();
    expect(container).toMatchSnapshot();

    fireEvent.click(baseElement.querySelector('.my-menuitem'));
    expect(clicked).toBe('1');
    expect(onOverlayClick).toHaveBeenCalled();
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeTruthy();
  });

  it('re-align works', async () => {
    jest.useFakeTimers();

    const onPopupAlign = jest.fn();

    const buttonStyle = { width: 600, height: 20, marginLeft: 100 };
    const menu = (
      <Menu>
        <MenuItem key="1">one</MenuItem>
      </Menu>
    );
    const { container } = render(
      <Dropdown
        trigger={['click']}
        placement="bottomRight"
        overlay={menu}
        onPopupAlign={onPopupAlign}
      >
        <button className="my-btn" style={buttonStyle}>
          open
        </button>
      </Dropdown>,
    );

    expect(onPopupAlign).not.toHaveBeenCalled();

    fireEvent.click(container.querySelector('.my-btn'));
    await waitForTime();

    expect(onPopupAlign).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('Test default minOverlayWidthMatchTrigger', async () => {
    jest.useFakeTimers();

    const overlayWidth = 50;
    const overlay = <div style={{ width: overlayWidth }}>Test</div>;

    const { container, baseElement } = render(
      <Dropdown trigger={['click']} overlay={overlay} visible>
        <button style={{ width: 100 }} className="my-button">
          open
        </button>
      </Dropdown>,
    );

    await triggerResize(container.querySelector('button'));

    expect(baseElement.querySelector('.rc-dropdown')).toHaveStyle({
      minWidth: '100px',
    });

    jest.useRealTimers();
  });

  it('user pass minOverlayWidthMatchTrigger', async () => {
    jest.useFakeTimers();

    const overlayWidth = 50;
    const overlay = <div style={{ width: overlayWidth }}>Test</div>;

    const { container, baseElement } = render(
      <Dropdown
        trigger={['click']}
        overlay={overlay}
        minOverlayWidthMatchTrigger={false}
        visible
      >
        <button style={{ width: 100 }} className="my-button">
          open
        </button>
      </Dropdown>,
    );

    await triggerResize(container.querySelector('button'));

    expect(baseElement.querySelector('.rc-dropdown')).not.toHaveStyle({
      minWidth: '100px',
    });

    jest.useRealTimers();
  });

  it('should support default openClassName', () => {
    const overlay = <div style={{ width: 50 }}>Test</div>;
    const { container } = render(
      <Dropdown
        trigger={['click']}
        overlay={overlay}
        minOverlayWidthMatchTrigger={false}
      >
        <button style={{ width: 100 }} className="my-button">
          open
        </button>
      </Dropdown>,
    );
    fireEvent.click(container.querySelector('.my-button'));
    expect(
      container
        .querySelector('.my-button')
        .classList.contains('rc-dropdown-open'),
    ).toBeTruthy();
    fireEvent.click(container.querySelector('.my-button'));
    expect(
      container
        .querySelector('.my-button')
        .classList.contains('rc-dropdown-open'),
    ).toBeFalsy();
  });

  it('should support custom openClassName', async () => {
    const overlay = <div style={{ width: 50 }}>Test</div>;
    const { container } = render(
      <Dropdown
        trigger={['click']}
        overlay={overlay}
        minOverlayWidthMatchTrigger={false}
        openClassName="opened"
      >
        <button style={{ width: 100 }} className="my-button">
          open
        </button>
      </Dropdown>,
    );

    fireEvent.click(container.querySelector('.my-button'));
    expect(
      container.querySelector('.my-button').classList.contains('opened'),
    ).toBeTruthy();
    fireEvent.click(container.querySelector('.my-button'));
    expect(
      container.querySelector('.my-button').classList.contains('opened'),
    ).toBeFalsy();
  });

  it('overlay callback', async () => {
    const overlay = <div style={{ width: 50 }}>Test</div>;
    const { container, baseElement } = render(
      <Dropdown trigger={['click']} overlay={() => overlay}>
        <button className="my-button">open</button>
      </Dropdown>,
    );

    fireEvent.click(container.querySelector('.my-button'));
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeFalsy();
  });

  it('should support arrow', async () => {
    const overlay = <div style={{ width: 50 }}>Test</div>;
    const { container, baseElement } = render(
      <Dropdown arrow overlay={overlay} trigger={['click']}>
        <button style={{ width: 100 }} className="my-button">
          open
        </button>
      </Dropdown>,
    );

    fireEvent.click(container.querySelector('.my-button'));
    await sleep(500);
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-show-arrow'),
    ).toBeTruthy();
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .firstElementChild.classList.contains('rc-dropdown-arrow'),
    ).toBeTruthy();
  });

  it('Keyboard navigation works', async () => {
    jest.useFakeTimers();

    const overlay = (
      <Menu>
        <MenuItem key="1">
          <span className="my-menuitem">one</span>
        </MenuItem>
        <MenuItem key="2">two</MenuItem>
      </Menu>
    );
    const { container, baseElement } = render(
      <Dropdown trigger={['click']} overlay={overlay}>
        <button className="my-button">open</button>
      </Dropdown>,
    );
    const trigger = container.querySelector('.my-button');

    // Open menu;
    fireEvent.click(trigger);
    await waitForTime();
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeFalsy();

    // Close menu with Esc
    fireEvent.keyDown(window, { key: 'Esc', keyCode: 27 });
    await waitForTime();
    expect(document.activeElement.className).toContain('my-button');

    // Open menu
    fireEvent.click(trigger);
    await waitForTime();
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeFalsy();

    // Focus menu with Tab
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 9 })); // Tab
    expect(document.activeElement.className).toContain('menu');

    // Close menu with Tab
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 9 })); // Tab
    await waitForTime();
    expect(document.activeElement.className).toContain('my-button');

    jest.useRealTimers();
  });

  it('Tab should close menu if overlay cannot be focused', async () => {
    jest.useFakeTimers();

    const Overlay = () => <div>test</div>;
    const { container, baseElement } = render(
      <Dropdown trigger={['click']} overlay={<Overlay />}>
        <button className="my-button">open</button>
      </Dropdown>,
    );
    const trigger = container.querySelector('.my-button');

    // Open menu;
    fireEvent.click(trigger);
    await waitForTime();
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeFalsy();

    // Close menu with Esc
    fireEvent.keyDown(window, { key: 'Esc', keyCode: 27 });
    await waitForTime();
    expect(document.activeElement.className).toContain('my-button');

    // Open menu
    fireEvent.click(trigger);
    await waitForTime();
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeFalsy();

    // Close menu with Tab
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 9 })); // Tab
    await waitForTime();
    expect(document.activeElement.className).toContain('my-button');

    jest.useRealTimers();
  });

  it('keyboard should work if menu is wrapped', async () => {
    const overlay = (
      <div>
        <Menu>
          <MenuItem key="1">
            <span className="my-menuitem">one</span>
          </MenuItem>
          <MenuItem key="2">two</MenuItem>
        </Menu>
      </div>
    );
    const { container, baseElement } = render(
      <Dropdown trigger={['click']} overlay={overlay}>
        <button className="my-button">open</button>
      </Dropdown>,
    );
    const trigger = container.querySelector('.my-button');

    // Open menu
    fireEvent.click(trigger);
    await sleep(200);
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeFalsy();

    // Close menu with Esc
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 })); // Esc
    await sleep(200);
    expect(document.activeElement.className).toContain('my-button');

    // Open menu
    fireEvent.click(trigger);
    await sleep(200);
    expect(
      baseElement
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeFalsy();

    // Focus menu with Tab
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 9 })); // Tab

    // Close menu with Tab
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 9 })); // Tab
    await sleep(200);
    expect(document.activeElement.className).toContain('my-button');
  });

  it('support Menu expandIcon', async () => {
    const props = {
      overlay: (
        <Menu expandIcon={<span id="customExpandIcon" />}>
          <Menu.Item key="1">foo</Menu.Item>
          <Menu.SubMenu title="SubMenu">
            <Menu.Item key="1">foo</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      ),
      visible: true,
      getPopupContainer: (node) => node,
    };

    const { container } = render(
      <Dropdown {...props}>
        <button type="button">button</button>
      </Dropdown>,
    );
    await sleep(500);
    expect(container.querySelector('#customExpandIcon')).toBeTruthy();
  });

  it('should support customized menuRef', async () => {
    const menuRef = createRef<MenuRef>();
    const props = {
      overlay: (
        <Menu ref={menuRef}>
          <Menu.Item key="1">foo</Menu.Item>
        </Menu>
      ),
      visible: true,
    };

    render(
      <Dropdown {...props}>
        <button type="button">button</button>
      </Dropdown>,
    );

    await sleep(500);
    expect(menuRef.current).toBeTruthy();
  });

  it('should support trigger which not support focus', async () => {
    jest.useFakeTimers();
    const Button = forwardRef<any, HTMLAttributes<HTMLButtonElement>>(
      (props, ref) => {
        useImperativeHandle(ref, () => ({
          foo: () => {},
        }));
        return (
          <button
            onClick={(e) => {
              props?.onClick?.(e);
            }}
          >
            trigger
          </button>
        );
      },
    );
    const { container, baseElement } = render(
      <Dropdown
        trigger={['click']}
        getPopupContainer={(node) => node}
        overlay={
          <Menu>
            <Menu.Item key="1">foo</Menu.Item>
          </Menu>
        }
      >
        <Button />
      </Dropdown>,
    );
    fireEvent.click(container.querySelector('button'));
    fireEvent.click(baseElement.querySelectorAll('li')[0]);

    jest.runAllTimers();
    jest.useRealTimers();
  });

  it('should support autoFocus', async () => {
    jest.useFakeTimers();

    const overlay = (
      <Menu>
        <MenuItem key="1">
          <span className="my-menuitem">one</span>
        </MenuItem>
        <MenuItem key="2">two</MenuItem>
      </Menu>
    );
    const { container } = render(
      <Dropdown autoFocus trigger={['click']} overlay={overlay}>
        <button className="my-button">open</button>
      </Dropdown>,
    );
    const trigger = container.querySelector('.my-button');

    // Open menu
    fireEvent.click(trigger);

    await waitForTime();

    expect(
      container
        .querySelector('.rc-dropdown')
        .classList.contains('rc-dropdown-hidden'),
    ).toBeFalsy();
    expect(document.activeElement.className).toContain('menu');

    // Close menu with Tab
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 9 })); // Tab

    await waitForTime();

    expect(document.activeElement.className).toContain('my-button');

    jest.useRealTimers();
  });

  it('children cannot be given ref should not throw', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const Component = () => <div>test</div>;

    render(
      <Dropdown overlay={<div>test</div>}>
        <Component />
      </Dropdown>,
    );
    expect(errorSpy).not.toHaveBeenCalledWith(
      expect.stringContaining(
        'Warning: Function components cannot be given refs',
      ),
      expect.anything(),
      expect.anything(),
    );
  });
});
