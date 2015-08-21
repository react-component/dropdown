'use strict';

var expect = require('expect.js');
var Dropdown = require('../');
var Menu = require('rc-menu');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
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
    React.unmountComponentAtNode(div);
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
    var dropdown = React.render(<Dropdown trigger="click" overlay={menu}>
      <button className="my-button">open</button>
    </Dropdown>, div);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'my-button')[0]).to.be.ok();
    expect(React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'rc-dropdown')[0])).not.to.be.ok();
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'my-button')[0]);
    expect($(React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(dropdown, 'rc-dropdown')[0])).css('display')).not.to.be('none');
    expect(clicked).not.to.be.ok();
    Simulate.click(TestUtils.scryRenderedDOMComponentsWithClass(dropdown.refs.tooltip.popupInstance, 'my-menuitem')[0]);
    expect(clicked).to.be('1');
    expect($(React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(dropdown.refs.tooltip.popupInstance, 'rc-dropdown')[0])).css('display')).to.be('none');
  });
});
