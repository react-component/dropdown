/* eslint-disable react/button-has-type,react/no-find-dom-node,react/no-render-return-value,object-shorthand,func-names,max-len */
import React from 'react';
import { mount } from 'enzyme';
import Menu, { Divider, Item as MenuItem } from 'rc-menu';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { getPopupDomNode, sleep } from './utils';
import Dropdown from '../src';
import placements from '../src/placements';
import '../assets/index.less';

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
});

describe('Dropdown', () => {
  it('default visible', () => {
    const dropdown = mount(
      <Dropdown overlay={<div className="check-for-visible">Test</div>} visible>
        <button className="my-button">open</button>
      </Dropdown>,
    );
    expect(getPopupDomNode(dropdown) instanceof HTMLDivElement).toBeTruthy();
  });

  it('simply works', async () => {
    let clicked;
    let overlayClicked;

    function onClick({ key }) {
      clicked = key;
    }

    function onOverlayClick({ key }) {
      overlayClicked = key;
    }

    const menu = (
      <Menu style={{ width: 140 }} onClick={onClick}>
        <MenuItem key="1">
          <span className="my-menuitem">one</span>
        </MenuItem>
        <Divider />
        <MenuItem key="2">two</MenuItem>
      </Menu>
    );
    const dropdown = mount(
      <Dropdown trigger={['click']} overlay={menu} onOverlayClick={onOverlayClick}>
        <button className="my-button">open</button>
      </Dropdown>,
    );
    expect(dropdown.find('.my-button')).toBeTruthy();
    expect(dropdown.find('.rc-dropdown')).toBeTruthy();

    dropdown.find('.my-button').simulate('click');
    expect(clicked).toBeUndefined();
    expect(getPopupDomNode(dropdown).classList.contains('rc-dropdown-hidden')).toBe(false);

    dropdown.find('.my-menuitem').simulate('click');
    expect(clicked).toBe('1');
    expect(overlayClicked).toBe('1');
    expect(getPopupDomNode(dropdown).classList.contains('rc-dropdown-hidden')).toBe(true);
  });

  it('re-align works', async () => {
    const buttonStyle = { width: 600, height: 20, marginLeft: 100 };
    const menu = (
      <Menu>
        <MenuItem key="1">one</MenuItem>
      </Menu>
    );
    const dropdown = mount(
      <Dropdown trigger={['click']} placement="bottomRight" overlay={menu}>
        <button className="my-btn" style={buttonStyle}>
          open
        </button>
      </Dropdown>,
    );

    dropdown.find('.my-btn').simulate('click');
    await sleep(500);
    expect(getPopupDomNode(dropdown).getAttribute('style')).toEqual(
      expect.stringContaining(
        `left: -${999 - buttonStyle.width - placements.bottomLeft.offset[0]}px; top: -${
          999 - buttonStyle.height - placements.bottomLeft.offset[1]
        }px;`,
      ),
    );
  });

  // https://github.com/ant-design/ant-design/issues/9559
  it('should have correct menu width when switch from shorter menu to longer', async () => {
    class Example extends React.Component {
      state = { longList: true };

      getPopupDomNode() {
        return this.trigger.getPopupDomNode();
      }

      short = () => {
        this.setState({ longList: false });
      };

      long = () => {
        this.setState({ longList: true });
      };

      render() {
        const menuItems = [
          <MenuItem key="1">1st item</MenuItem>,
          <MenuItem key="2">2nd item</MenuItem>,
        ];
        if (this.state.longList) {
          menuItems.push(<MenuItem key="3">3rd LONG SUPER LONG item</MenuItem>);
        }
        return (
          <Dropdown
            trigger={['click']}
            ref={(node) => {
              this.trigger = node;
            }}
            overlay={<Menu>{menuItems}</Menu>}
          >
            <button>Actions 111</button>
          </Dropdown>
        );
      }
    }
    const dropdown = mount(<Example />);
    dropdown.find('button').simulate('click');
    await sleep(500);
    expect(getPopupDomNode(dropdown).getAttribute('style')).toEqual(
      expect.stringContaining(
        `left: -${999 - placements.bottomLeft.offset[0]}px; top: -${
          999 - placements.bottomLeft.offset[1]
        }px;`,
      ),
    );

    // Todo - offsetwidth
  });

  it('Test default minOverlayWidthMatchTrigger', async () => {
    const overlayWidth = 50;
    const overlay = <div style={{ width: overlayWidth }}>Test</div>;

    const dropdown = mount(
      <Dropdown trigger={['click']} overlay={overlay}>
        <button style={{ width: 100 }} className="my-button">
          open
        </button>
      </Dropdown>,
    );

    dropdown.find('.my-button').simulate('click');
    await sleep(500);
    expect(getPopupDomNode(dropdown).getAttribute('style')).toEqual(
      expect.stringContaining('min-width: 100px'),
    );
  });

  it('user pass minOverlayWidthMatchTrigger', async () => {
    const overlayWidth = 50;
    const overlay = <div style={{ width: overlayWidth }}>Test</div>;

    const dropdown = mount(
      <Dropdown trigger={['click']} overlay={overlay} minOverlayWidthMatchTrigger={false}>
        <button style={{ width: 100 }} className="my-button">
          open
        </button>
      </Dropdown>,
    );

    dropdown.find('.my-button').simulate('click');
    await sleep(500);
    expect(getPopupDomNode(dropdown).getAttribute('style')).not.toEqual(
      expect.stringContaining('min-width: 100px'),
    );
  });

  it('should support default openClassName', () => {
    const overlay = <div style={{ width: 50 }}>Test</div>;
    const dropdown = mount(
      <Dropdown trigger={['click']} overlay={overlay} minOverlayWidthMatchTrigger={false}>
        <button style={{ width: 100 }} className="my-button">
          open
        </button>
      </Dropdown>,
    );
    dropdown.find('.my-button').simulate('click');
    expect(dropdown.find('.my-button').prop('className')).toBe('my-button rc-dropdown-open');
    dropdown.find('.my-button').simulate('click');
    expect(dropdown.find('.my-button').prop('className')).toBe('my-button');
  });

  it('should support custom openClassName', async () => {
    const overlay = <div style={{ width: 50 }}>Test</div>;
    const dropdown = mount(
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

    dropdown.find('.my-button').simulate('click');
    expect(dropdown.find('.my-button').prop('className')).toBe('my-button opened');
    dropdown.find('.my-button').simulate('click');
    expect(dropdown.find('.my-button').prop('className')).toBe('my-button');
  });

  it('overlay callback', async () => {
    const overlay = <div style={{ width: 50 }}>Test</div>;
    const dropdown = mount(
      <Dropdown trigger={['click']} overlay={() => overlay}>
        <button className="my-button">open</button>
      </Dropdown>,
    );

    dropdown.find('.my-button').simulate('click');
    expect(getPopupDomNode(dropdown).classList.contains('rc-dropdown-hidden')).toBe(false);
  });

  it('should support arrow', async () => {
    const overlay = <div style={{ width: 50 }}>Test</div>;
    const dropdown = mount(
      <Dropdown arrow overlay={overlay} trigger={['click']}>
        <button style={{ width: 100 }} className="my-button">
          open
        </button>
      </Dropdown>,
    );

    dropdown.find('.my-button').simulate('click');
    await sleep(500);
    expect(getPopupDomNode(dropdown).classList.contains('rc-dropdown-show-arrow')).toBe(true);
    expect(
      getPopupDomNode(dropdown).firstElementChild.classList.contains('rc-dropdown-arrow'),
    ).toBe(true);
  });
});
