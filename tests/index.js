/* eslint-disable func-names */
import 'core-js/es6/map';
import 'core-js/es6/set';
const expect = require('expect.js');
const Dropdown = require('../');
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import React from 'react';
import ReactDOM from 'react-dom';
const TestUtils = require('react-dom/test-utils');
const Simulate = TestUtils.Simulate;
require('../assets/index.less');
const $ = require('jquery');

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
});
