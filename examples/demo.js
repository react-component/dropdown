"use strict"
// use jsx to render html, do not modify simple.html
require('rc-dropdown/assets/index.css');
require('./anim.css');

var React = require('react');
var Dropdown = require('../');
var packageJson = require('../package.json');

require('rc-menu/assets/index.css');
var Menu = require('rc-menu');
var MenuItem = Menu.Item;

function onVisibleChange (visible) {
  console.log('dropdown', visible);
}

class Demo extends React.Component {
  render() {
    var MyMenu = (
      <Menu prefixCls="rc-dropdown-menu">
        <MenuItem key="1">select all</MenuItem>
        <MenuItem key="2">select one</MenuItem>
      </Menu>
    );

    var demo = (<div>
      <h1>{packageJson.name}@{packageJson.version}</h1>
      <div style={{margin: 100}}>
        <Dropdown placement="bottom" trigger="['click']" onVisibleChange={onVisibleChange}
                  transitionName="zoom-down"
                  overlay={MyMenu}>
          <button type="button">dropdown</button>
        </Dropdown>
      </div>
    </div>);

    return demo;
  }
}

React.render(<Demo />, document.getElementById('__react-content'));