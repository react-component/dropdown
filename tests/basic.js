/* eslint-disable func-names */
import expect from 'expect.js';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils, { Simulate } from 'react-dom/test-utils';
import $ from 'jquery';
import Dropdown from '../src';
import '../assets/index.less';

describe('dropdown', () => {
  let div;
  beforeEach(() => {
    if (!div) {
      div = document.createElement('div');
      document.body.appendChild(div);
    }
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('default visible', () => {
    const dropdown = ReactDOM.render(
      <Dropdown overlay={<div className="check-for-visible">Test</div>} visible>
        <button className="my-button">open</button>
      </Dropdown>
      , div);
    expect(dropdown.getPopupDomNode()).to.be.ok();
  });

  it('simply works', () => {
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
    const dropdown = ReactDOM.render(
      <Dropdown trigger={['click']} overlay={menu} onOverlayClick={onOverlayClick}>
        <button className="my-button">open</button>
      </Dropdown>
      , div);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'my-button')[0]).to.be.ok();
    expect(ReactDOM.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(dropdown,
      'rc-dropdown')[0])).not.to.be.ok();
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'my-button')[0]);
    expect($(ReactDOM.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(dropdown,
      'rc-dropdown')[0])).css('display')).not.to.be('none');
    expect(clicked).not.to.be.ok();
    Simulate.click($(dropdown.getPopupDomNode()).find('.my-menuitem')[0]);
    expect(clicked).to.be('1');
    expect(overlayClicked).to.be('1');
    expect($(dropdown.getPopupDomNode()).css('display')).to.be('none');
  });

  it('re-align works', () => {
    const menu = (
      <Menu>
        <MenuItem key="1">one</MenuItem>
      </Menu>
    );
    const dropdown = ReactDOM.render(
      <Dropdown trigger={['click']} placement="bottomRight" overlay={menu}>
        <button className="my-btn" style={{ width: 500, height: 20, marginLeft: 100 }}>
          open
        </button>
      </Dropdown>
      , div);
    const myBtn = TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'my-btn')[0];
    const myBtnNode = ReactDOM.findDOMNode(myBtn);
    Simulate.click(myBtn);
    const targetOffset = $(myBtnNode).offset();
    const popupOffset = $(dropdown.getPopupDomNode()).offset();
    expect(popupOffset.left).to.be(targetOffset.left);
  });

  // https://github.com/ant-design/ant-design/issues/9559
  it('should have correct menu width when switch from shorter menu to longer', () => {
    class Example extends React.Component {
      state = { longList: true };
      getPopupDomNode() {
        return this.trigger.getPopupDomNode();
      }
      short = () => {
        this.setState({ longList: false });
      }
      long = () => {
        this.setState({ longList: true });
      }
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
            ref={node => { this.trigger = node; }}
            overlay={<Menu>{menuItems}</Menu>}
          >
            <button>
              Actions 111
            </button>
          </Dropdown>
        );
      }
    }
    const dropdown = ReactDOM.render(<Example />, div);
    const button = TestUtils.scryRenderedDOMComponentsWithTag(dropdown, 'button')[0];
    const buttonNode = ReactDOM.findDOMNode(button);
    Simulate.click(button);
    expect(dropdown.getPopupDomNode().offsetWidth).to.be.above(buttonNode.offsetWidth);
    dropdown.short();
    expect(dropdown.getPopupDomNode().offsetWidth).to.be(buttonNode.offsetWidth);
    dropdown.long();
    expect(dropdown.getPopupDomNode().offsetWidth).to.be.above(buttonNode.offsetWidth);
  });

  it('user pass minOverlayWidthMatchTrigger', () => {
    const overlay = <div style={{ width: 50 }}>Test</div>;
    const dropdown = ReactDOM.render(
      <Dropdown
        trigger={['click']}
        overlay={overlay}
        minOverlayWidthMatchTrigger={false}
      >
        <button style={{ width: 100 }} className="my-button">open</button>
      </Dropdown>
      , div);

    Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(dropdown, 'my-button'),
    );

    expect($(dropdown.getPopupDomNode()).width()).not.to.be(
      $(TestUtils.findRenderedDOMComponentWithClass(dropdown, 'my-button')).width()
    );
  });
});
