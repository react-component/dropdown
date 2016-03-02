/* eslint-disable func-names */
const expect = require('expect.js');
const Dropdown = require('../');
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import React from 'react';
import ReactDOM from 'react-dom';
const TestUtils = require('react-addons-test-utils');
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

    function onClick({ key }) {
      clicked = key;
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
    const dropdown = ReactDOM.render(<Dropdown trigger={['click']} overlay={menu}>
      <button className="my-button">open</button>
    </Dropdown>, div);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'my-button')[0]).to.be.ok();
    expect(ReactDOM.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(dropdown,
      'rc-dropdown')[0])).not.to.be.ok();
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'my-button')[0]);
    expect($(ReactDOM.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(dropdown,
      'rc-dropdown')[0])).css('display')).not.to.be('none');
    expect(clicked).not.to.be.ok();
    Simulate.click($(dropdown.getPopupDomNode()).find('.my-menuitem')[0]);
    expect(clicked).to.be('1');
    expect($(dropdown.getPopupDomNode()).css('display')).to.be('none');
  });
});
