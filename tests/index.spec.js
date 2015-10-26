'use strict';

var expect = require('expect.js');
var Dropdown = require('../');
var Menu = require('rc-menu');
import React from 'react';
import ReactDOM from 'react-dom';
var TestUtils = require('react-addons-test-utils');
var Simulate = TestUtils.Simulate;
require('../assets/index.less');
var $ = require('jquery');

describe('dropdown', function () {
  var div;
  beforeEach(function () {
    if (!div) {
      div = document.createElement('div');
      document.body.appendChild(div);
    }
  });

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('simply works', function () {
    var clicked;

    function onClick({key}) {
      clicked = key;
    }

    var menu = <Menu style={{width: 140}} onClick={onClick}>
      <Menu.Item key="1">
        <span className="my-menuitem">one</span>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="2">two</Menu.Item>
    </Menu>;
    var dropdown = ReactDOM.render(<Dropdown trigger="click" overlay={menu}>
      <button className="my-button">open</button>
    </Dropdown>, div);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'my-button')[0]).to.be.ok();
    expect(ReactDOM.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'rc-dropdown')[0])).not.to.be.ok();
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'my-button')[0]);
    expect($(ReactDOM.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'rc-dropdown')[0])).css('display')).not.to.be('none');
    expect(clicked).not.to.be.ok();
    Simulate.click($(dropdown.refs.tooltip.popupDomNode).find('.my-menuitem')[0]);
    expect(clicked).to.be('1');
    expect($(dropdown.refs.tooltip.popupDomNode).css('display')).to.be('none');
  });
});
